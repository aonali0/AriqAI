# Ariq AI — Backend (FastAPI)

Handles the contact form: saves every submission to a database, and sends
**two emails** per submission:
1. **Lead notification** → to you (`BUSINESS_EMAIL`) with the customer's details.
2. **Acknowledgement** → to the customer, confirming their message was received.

## Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env` and fill in:
- `SMTP_HOST` / `SMTP_PORT` — e.g. `smtp.gmail.com` / `587`
- `SMTP_USER` / `SMTP_PASSWORD` — for Gmail, use an **App Password**
  (Google Account → Security → 2-Step Verification → App Passwords),
  not your regular password.
- `BUSINESS_EMAIL` — where YOU want to receive new leads.

## Run

```bash
uvicorn app.main:app --reload --port 8000
```

API docs (auto-generated): `http://localhost:8000/docs`

## Endpoint

`POST /api/contact`
```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "phone": "+1234567890",
  "company": "Acme Inc",
  "service": "AI Agent Development",
  "message": "We need an AI agent for customer support."
}
```

- Submissions are stored in SQLite (`ariq_ai.db`) by default — swap
  `DATABASE_URL` in `.env` for Postgres/MySQL in production.
- Emails are sent in a background task, so the customer gets an instant
  response even if SMTP is briefly slow.
- Includes a honeypot field (`website`) for basic bot protection.
