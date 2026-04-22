# 🌸 Scentcepts — Luxury Perfume Platform

A fully containerized, full-stack luxury perfume e-commerce application with a **WhatsApp checkout flow**, dynamic product catalog, and an admin command center.

> **Zero local dependencies.** Just install Docker, clone, and run.

---

## 🏗️ Tech Stack

| Layer      | Technology                               |
|------------|------------------------------------------|
| Frontend   | Next.js 16, React 19, TailwindCSS 4     |
| Backend    | Spring Boot 3.4.2, Spring Security 6     |
| Database   | PostgreSQL 15 (Docker container)         |
| Auth       | JWT (jjwt 0.11.5)                        |
| ORM        | Spring Data JPA + Flyway migrations      |
| Mappers    | MapStruct 1.6.3 + Lombok 1.18.36        |
| Infra      | Docker Compose (multi-stage builds)      |

---

## 🐳 Prerequisites

You need **only one thing** installed on your machine:

- [**Docker Desktop**](https://www.docker.com/products/docker-desktop/)

That's it. No Java, no Maven, no Node.js, no PostgreSQL.

### Installing Docker
1. Download [Docker Desktop](https://www.docker.com/products/docker-desktop/) for your OS.
2. Run the installer (enable **WSL 2** if prompted on Windows).
3. Restart your computer after installation.
4. Open Docker Desktop and ensure it's running.

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/wilfredkimura/scentscepts.git
cd scentscepts

# 2. Start everything
docker-compose up --build
```

That's it. Docker will:
- Build the **Spring Boot backend** using a multi-stage Maven → JRE Alpine image
- Build the **Next.js frontend** using a multi-stage Node → standalone production image
- Spin up a **PostgreSQL 15** database with persistent storage
- Run **Flyway migrations** to create all tables and seed sample products with images
- Wire all services together on an internal Docker network

Once you see all containers are up:

| Service     | URL                                    |
|-------------|----------------------------------------|
| 🖥️ Frontend | [http://localhost:3000](http://localhost:3000) |
| ⚙️ Backend  | [http://localhost:8080/api/v1](http://localhost:8080/api/v1) |
| 📖 Swagger  | [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html) |

---

## 🔧 Common Commands

```bash
# Start the full stack (first time or after code changes)
docker-compose up --build

# Start in the background (detached mode)
docker-compose up --build -d

# Stop all services
docker-compose down

# Stop and wipe the database (fresh start)
docker-compose down -v

# Rebuild only the frontend after UI changes
docker-compose up --build frontend -d

# Rebuild only the backend after API changes
docker-compose up --build backend -d

# View live logs
docker-compose logs -f

# View logs for a specific service
docker-compose logs -f backend
```

---

## 📦 Architecture

```
scentscepts/
├── backend/
│   ├── Dockerfile              # Multi-stage: Maven build → JRE runtime
│   ├── src/
│   │   └── main/resources/
│   │       ├── application.yml  # Spring config (env-var driven)
│   │       └── db/migration/    # Flyway SQL migrations (V1–V7)
│   └── pom.xml
├── frontend/
│   ├── Dockerfile              # Multi-stage: Node deps → build → standalone
│   ├── next.config.ts          # Standalone output + API proxy rewrites
│   └── src/
├── docker-compose.yml          # Orchestrates all 3 services
└── README.md
```

### Container Network

```
┌─────────────────────────────────────────────────┐
│              scentscepts-network                │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ frontend │  │ backend  │  │     db       │  │
│  │ :3000    │─→│ :8080    │─→│ :5432        │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
│       ↑              ↑              ↑           │
└───────┼──────────────┼──────────────┼───────────┘
        │              │              │
   localhost:3000  localhost:8080  localhost:5433
```

- Services communicate internally using Docker DNS (`backend:8080`, `db:5432`)
- The database port is mapped to **5433** on the host to avoid conflicts with any local PostgreSQL installation

---

## 🔒 Authentication & Roles

The API uses **JWT Bearer tokens** for security.

1. **Register**: `POST /api/v1/auth/register`
2. **Login**: `POST /api/v1/auth/login` → returns `{ token: "..." }`
3. **Use**: `Authorization: Bearer <token>` on protected endpoints

### Roles

| Role | Access |
|------|--------|
| `ROLE_USER`  | Browse catalog, manage cart, place orders, view profile |
| `ROLE_ADMIN` | Full admin dashboard — manage products, brands, users, orders |

> 👑 **First-user bootstrap**: The very first account registered on a fresh database is automatically promoted to `ROLE_ADMIN`. All subsequent registrations default to `ROLE_USER`.

---

## 🛒 Shopping Flow

1. Browse luxury perfumes on `/catalog`
2. Click **Add to Cart** on any product
3. Open the sliding cart drawer (top-right shopping bag icon)
4. Click **Checkout** and provide your delivery address
5. Click **Order via WhatsApp** — bridges your order to WhatsApp with a formatted receipt

---

## 📱 WhatsApp Configuration

To receive orders on your business WhatsApp number:

1. Open `frontend/src/lib/whatsapp.ts`
2. Update the `WHATSAPP_NUMBER` variable:
   ```typescript
   const WHATSAPP_NUMBER = "254716052342"; // International format, no + symbol
   ```
3. Rebuild the frontend: `docker-compose up --build frontend -d`

---

## 🌍 Environment Variables

All defaults work out of the box. Override via a `.env` file in the project root if needed:

```env
# Database
DB_URL=jdbc:postgresql://db:5432/scentcepts_db
DB_USER=scentcepts_user
DB_PASS=scentcepts

# JWT
JWT_SECRET=<your-256-bit-hex-secret>
JWT_EXPIRATION=86400000

# CORS
CORS_ORIGINS=http://localhost:3000

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## 🐛 Troubleshooting

### Port 3000 or 8080 already in use
**Fix**: Stop whatever is using the port, or change the port mapping in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Change host port
```

### Database won't start or has stale data
**Fix**: Wipe the volume and start fresh:
```bash
docker-compose down -v
docker-compose up --build
```

### Frontend shows "No products yet"
**Cause**: The database volume was wiped or Flyway migrations didn't seed data.  
**Fix**: Run `docker-compose down -v && docker-compose up --build` to get a fresh database with seeded products.

### Backend fails with Flyway checksum error
**Cause**: A migration file was modified after it was already applied.  
**Fix**: Wipe the database volume: `docker-compose down -v && docker-compose up --build`

---

## 📋 API Reference

Full interactive Swagger documentation:  
**[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)**

---

*Built with ❤️ for the Scentcepts luxury experience.*
