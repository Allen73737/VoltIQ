<div align="center">
  
  <br />
  <h1>⚡ VoltIQ - Grid Atelier</h1>
  <p><strong>Private energy intelligence for modern spaces.</strong></p>
  <p>A luxury-grade command center for electricity, appliances, costs, and operational clarity.</p>

  <p align="center">
    <a href="#features">Features</a> • 
    <a href="#tech-stack">Tech Stack</a> • 
    <a href="#quick-start">Quick Start</a> • 
    <a href="#deployment">Deployment</a>
  </p>
</div>

<br/>

## ✦ Elevate Your Energy Operations

VoltIQ packages appliance sessions, demand alerts, recommendations, and forecast exports into one premium command surface. Designed specifically for facilities teams, modern smart homes, workspaces, and apartment complex managers who demand both performance and aesthetic excellence.

**Why VoltIQ?**
- **Session Intelligence:** Start/stop appliance tracking with automatic duration and unit calculation.
- **Anomaly Alerts:** Peak demand, idle loads, and unusual draw surfaced before bills spike.
- **Enterprise-ready Architecture:** JWT auth, roles, clean APIs, PostgreSQL schema, and Dockerized delivery.
- **Ultra-Premium UI:** Immersive scroll-reactive parallax effects, smooth haptic button feedback, animated counters, and glassmorphic dashboards powered by Framer Motion.

---

## ✦ Tech Stack

Built like a real SaaS product.

**Frontend:**
- **Core:** React, Vite
- **Styling:** Tailwind CSS, Framer Motion (ultra-premium scroll reveals & luxury haptics)
- **Data Viz:** Recharts
- **Routing & Networking:** React Router, Axios
- **Icons:** Lucide React

**Backend:**
- **Core:** Java 17, Spring Boot 3
- **Security:** Spring Security, JWT Authentication
- **Persistence:** Hibernate/JPA, PostgreSQL
- **Real-Time:** WebSocket for live grid load updates

**DevOps & Delivery:**
- Docker & Docker Compose for isolated microservices
- Flyway for DB Migrations
- Render (Backend), Neon (DB), Vercel (Frontend) production ready configurations

---

## ✦ Quick Start

The fastest way to spin up the entire VoltIQ stack (Frontend, Backend, PostgreSQL) is using Docker Compose.

```bash
# Clone the repository
git clone https://github.com/Allen73737/VoltIQ.git
cd VoltIQ

# Boot the entire stack
docker compose up --build
```

> **Accessing the App:**
> Open `http://localhost:5173` in your browser.
> 
> **Demo Credentials:**
> - Email: `admin@voltiq.io`
> - Password: `password123`

---

## ✦ Manual Development

If you prefer to run services manually for active development:

### 1. Database
Ensure PostgreSQL is running locally on port `5432` with a database named `voltiq`, and user/password `voltiq`/`voltiq`.

### 2. Backend API
```bash
cd backend
./gradlew bootRun
```
The API will be available at `http://localhost:8080`.

### 3. Frontend Web App
```bash
cd frontend
npm install
npm run dev
```
The client will be available at `http://localhost:5173`.

---

## ✦ Core APIs & Architecture

VoltIQ calculates units automatically when an appliance session ends using the formula:
`units = power_rating_kw * usage_hours`

### REST Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register a new tenant workspace |
| `POST` | `/api/auth/login` | JWT authentication |
| `GET`  | `/api/dashboard` | Fetch aggregate energy statistics |
| `GET`  | `/api/appliances` | List registered appliances |
| `POST` | `/api/appliances/{id}/start`| Begin energy tracking session |
| `POST` | `/api/appliances/{id}/stop` | End session & calculate kWh |
| `GET`  | `/api/reports/export.csv` | Export usage data (CSV) |

### Real-Time WebSocket
- **Endpoint:** `/ws/live`
- **Broker Topic:** `/topic/energy`

---

## ✦ Deployment

Deployment configuration files are included out of the box for modern cloud providers:

- **`render.yaml`**: One-click blueprint for Render backend services.
- **Neon PostgreSQL**: Perfect serverless DB pairing. Set `DATABASE_URL` in your environment.
- **`frontend/vercel.json`**: SPA routing rewrite rules for seamless Vercel hosting.
- **Environment Variables**: See `frontend/.env.example` and `backend/.env.example` for required secrets.

Please refer to `DEPLOYMENT.md` for a comprehensive step-by-step production rollout guide.

<br />
<div align="center">
  <p><i>Crafted for the modern grid.</i></p>
</div>
