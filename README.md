# Ariq AI — Full Website (Complete: Parts 1–3)

A fully custom, animated marketing website for Ariq AI, with a working
contact form backed by FastAPI, SMTP email, and a database.

## Structure
```
ariq-ai/
├── frontend/   React + Vite + Tailwind + Framer Motion
└── backend/    FastAPI + SQLAlchemy + SMTP
```

## Quick Start (run both together)

**1. Backend:**
```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # then fill in your SMTP details
uvicorn app.main:app --reload --port 8000
```

**2. Frontend** (new terminal):
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The frontend is pre-configured (via
`vite.config.js`) to proxy `/api/*` requests to the backend at
`localhost:8000` — no extra setup needed in dev.

## What's included
- **Frontend**: Navbar, Hero (animated), Services, Process, About, Why Us,
  CTA, **Contact form** (wired live to the backend), Footer. Fully
  responsive, custom fonts (Clash Display + General Sans), brand colors
  from your logo.
- **Backend**: `POST /api/contact` — validates input, saves to database,
  sends a **lead notification email to you** and an **acknowledgement
  email to the customer**, via SMTP. Includes basic bot protection
  (honeypot field).

## Before going live
1. Fill in real SMTP credentials in `backend/.env`.
2. Update `hello@ariqai.com` / phone number in `frontend/src/components/Footer.jsx`
   with your real contact details.
3. Swap SQLite for Postgres/MySQL in `backend/.env` if you expect real traffic.
4. Deploy backend (Railway/Render/VPS) and frontend (Vercel/Netlify), then
   update `FRONTEND_ORIGINS` in the backend `.env` and the API URL in the
   frontend accordingly.

Each part's own README (`frontend/README.md`, `backend/README.md`) has
more detail.
