# VoltIQ - Smart Energy Consumption Analytics Platform

VoltIQ is a premium full-stack smart electricity monitoring SaaS dashboard for homes, hostels, offices, apartments, and facilities teams.

## Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Recharts, React Router, Axios, Lucide React
- Backend: Java 17, Spring Boot, Spring Security, JWT, Hibernate/JPA, WebSocket, PostgreSQL
- Delivery: Docker Compose with PostgreSQL, backend API, and frontend web app

## Run Locally

```bash
docker compose up --build
```

Open `http://localhost:5173`.

## Deploy

Deployment files are included for Render + Vercel:

- `render.yaml` creates the Render backend service and PostgreSQL database.
- `frontend/vercel.json` supports Vercel SPA routing.
- `frontend/.env.example` and `backend/.env.example` document required env vars.

See `DEPLOYMENT.md` for the full step-by-step guide.

Demo credentials:

- Email: `admin@voltiq.io`
- Password: `password123`

## Manual Development

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
./gradlew bootRun
```

The backend expects PostgreSQL at `jdbc:postgresql://localhost:5432/voltiq` with user/password `voltiq`.

## Core APIs

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/dashboard`
- `GET /api/appliances`
- `POST /api/appliances`
- `POST /api/appliances/{id}/start`
- `POST /api/appliances/{id}/stop`
- `GET /api/reports/export.csv`
- `GET /api/reports/export.pdf`
- WebSocket endpoint: `/ws/live`, broker topic `/topic/energy`

## Database

Flyway creates enterprise tables for:

- `users`
- `appliances`
- `usage_logs`
- `reports`
- `alerts`
- `sessions`

Appliance sessions calculate units automatically when stopped:

```text
units = power_rating_kw * usage_hours
```
