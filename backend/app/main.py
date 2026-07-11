import os
import logging
from fastapi import FastAPI, Depends, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from .database import Base, engine, get_db
from . import models
from .schemas import ContactCreate, ContactResponse
from .email_utils import send_lead_notification, send_customer_acknowledgement

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ariq_ai")

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Ariq AI API", version="1.0.0")

origins = os.getenv("FRONTEND_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _dispatch_emails(name, email, phone, company, service, message):
    """Runs in the background so the API responds instantly to the user."""
    try:
        send_lead_notification(name, email, phone, company, service, message)
    except Exception:
        logger.exception("Failed to send lead notification email")
    try:
        send_customer_acknowledgement(name, email)
    except Exception:
        logger.exception("Failed to send customer acknowledgement email")


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/contact", response_model=ContactResponse)
def submit_contact(
    payload: ContactCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    # Honeypot check — if this hidden field is filled, it's almost certainly a bot.
    if payload.website:
        return ContactResponse(success=True, message="Thank you! We'll be in touch soon.")

    try:
        entry = models.ContactSubmission(
            name=payload.name,
            email=payload.email,
            phone=payload.phone,
            company=payload.company,
            service=payload.service,
            message=payload.message,
        )
        db.add(entry)
        db.commit()
        db.refresh(entry)
    except Exception:
        db.rollback()
        logger.exception("Failed to save contact submission")
        raise HTTPException(status_code=500, detail="Something went wrong. Please try again.")

    background_tasks.add_task(
        _dispatch_emails,
        payload.name,
        payload.email,
        payload.phone,
        payload.company,
        payload.service,
        payload.message,
    )

    return ContactResponse(
        success=True,
        message="Thank you! Your message has been received — we'll be in touch within 24 hours.",
    )
