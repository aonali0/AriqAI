import os
import socket
import smtplib
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger("ariq_ai.email")

# Render's network has broken/unreliable IPv6 routing, which makes smtplib
# randomly pick an IPv6 address for smtp.gmail.com and fail with
# "Network is unreachable". Forcing IPv4-only DNS resolution fixes it.
_orig_getaddrinfo = socket.getaddrinfo


def _ipv4_only_getaddrinfo(host, port, family=0, type=0, proto=0, flags=0):
    return _orig_getaddrinfo(host, port, socket.AF_INET, type, proto, flags)


socket.getaddrinfo = _ipv4_only_getaddrinfo

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
SMTP_FROM_NAME = os.getenv("SMTP_FROM_NAME", "Ariq AI")
BUSINESS_EMAIL = os.getenv("BUSINESS_EMAIL")


def _send(to_email: str, subject: str, html_body: str, text_body: str, reply_to: str | None = None):
    """Low-level SMTP sender. Raises on failure so callers can log it."""
    if not all([SMTP_HOST, SMTP_USER, SMTP_PASSWORD, to_email]):
        logger.warning("SMTP not configured — skipping email send to %s", to_email)
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{SMTP_FROM_NAME} <{SMTP_USER}>"
    msg["To"] = to_email
    if reply_to:
        msg["Reply-To"] = reply_to

    msg.attach(MIMEText(text_body, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.sendmail(SMTP_USER, to_email, msg.as_string())


def send_lead_notification(name: str, email: str, phone: str, company: str, service: str, message: str):
    """Email #1 — goes to YOU (BUSINESS_EMAIL) when a customer submits the form."""
    subject = f"New Inquiry: {name}" + (f" — {service}" if service else "")
    text = f"""New Lead from Ariq AI Website

Name: {name}
Email: {email}
Phone: {phone or '—'}
Company: {company or '—'}
Service: {service or '—'}

Message:
{message}
"""
    html = f"""
    <div style="font-family:sans-serif;max-width:560px;margin:auto;color:#1a1a1a">
      <h2 style="color:#3B7CFF">New Lead from Ariq AI Website</h2>
      <table style="width:100%;border-collapse:collapse;margin-top:12px">
        <tr><td style="padding:6px 0;color:#555;width:120px"><b>Name</b></td><td>{name}</td></tr>
        <tr><td style="padding:6px 0;color:#555"><b>Email</b></td><td>{email}</td></tr>
        <tr><td style="padding:6px 0;color:#555"><b>Phone</b></td><td>{phone or '—'}</td></tr>
        <tr><td style="padding:6px 0;color:#555"><b>Company</b></td><td>{company or '—'}</td></tr>
        <tr><td style="padding:6px 0;color:#555"><b>Service</b></td><td>{service or '—'}</td></tr>
      </table>
      <p style="margin-top:16px;color:#555"><b>Message:</b></p>
      <p style="background:#f5f5f5;padding:14px;border-radius:8px;white-space:pre-wrap">{message}</p>
    </div>
    """
    _send(BUSINESS_EMAIL, subject, html, text, reply_to=email)


def send_customer_acknowledgement(name: str, email: str):
    """Email #2 — goes to the CUSTOMER confirming their submission was received."""
    first_name = name.split()[0]
    subject = "We've received your message — Ariq AI"
    text = f"""Thanks for reaching out, {first_name}!

We've received your message and our team is already looking into it.
You can expect to hear back from us within 24 hours.

In the meantime, feel free to reply directly to this email if you'd
like to add any more details.

— The Ariq AI Team
"""
    html = f"""
    <div style="font-family:sans-serif;max-width:560px;margin:auto;color:#1a1a1a">
      <h2 style="color:#3B7CFF">Thanks for reaching out, {first_name}!</h2>
      <p style="color:#333;line-height:1.6">
        We've received your message and our team is already looking into it.
        You can expect to hear back from us within <b>24 hours</b>.
      </p>
      <p style="color:#333;line-height:1.6">
        In the meantime, feel free to reply directly to this email if you'd
        like to add any more details.
      </p>
      <p style="margin-top:24px;color:#999;font-size:13px">— The Ariq AI Team</p>
    </div>
    """
    _send(email, subject, html, text)