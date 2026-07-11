# Ariq AI — Website (Part 1 of 3)

This is **Part 1**: project foundation + the animated Hero and Services sections
(the highest-impact, most visual part of the site).

## What's included in Part 1
- Vite + React 18 + Tailwind CSS setup, fully configured with Ariq AI's brand
  tokens (colors, fonts, gradients) derived from your logo/poster.
- **Navbar** — glass effect on scroll, mobile menu.
- **Hero** — orchestrated load animation, signature animated "neural
  constellation" canvas background (echoes the spark/data-node motif in your
  logo), floating device/orbit graphic, stats.
- **Services** — 4 service cards (Web, Mobile, AI Agents, Systems) with
  scroll-reveal + hover animations.
- Fully responsive (mobile → desktop), reduced-motion support, keyboard
  focus states.

## Coming in Part 2
Process/How-we-work section, About section, Testimonials/Portfolio
placeholder, and a final CTA section.

## Coming in Part 3
Full **FastAPI backend**: contact form endpoint, SMTP email sending,
database storage (SQLAlchemy), the **Contact form UI** wired to it, Footer,
and run/deploy instructions for the whole stack.

## How to run this part

```bash
cd frontend
npm install
npm run dev
```

Open the local URL it prints (usually `http://localhost:5173`).

## Notes
- `src/assets/logo.png` — your logo, already wired into the Navbar.
- `src/assets/poster-reference.png` — kept for reference, not used directly.
- Colors/fonts are centralized in `tailwind.config.js` — easy to tweak later.
