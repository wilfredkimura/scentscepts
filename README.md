# 🌸 Scentcepts — Luxury Perfume Platform

A full-stack luxury perfume e-commerce application with a **WhatsApp checkout flow**, premium 16:9 gallery layout, and a Society Profile page.

---

## 🏗️ Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | Next.js 16, React 19, TailwindCSS 4     |
| Backend  | Spring Boot 3.4.2, Spring Security 6     |
| Database | PostgreSQL 15 (via Docker)              |
| Auth     | JWT (jjwt 0.11.5)                       |
| ORM      | Spring Data JPA + Flyway migrations     |
| Mappers  | MapStruct 1.6.3 + Lombok 1.18.36        |

---

## ⚙️ Prerequisites

Before running the project, ensure the following are installed:

| Tool | Version | Notes |
|------|---------|-------|
| **Docker Desktop** | Latest | Must be running |
| **Node.js** | 18+ | For the frontend |
| **JDK 21** | Eclipse Temurin 21 (LTS) | ⚠️ **Do NOT use Java 22+**; Lombok is incompatible |
| PowerShell | 5.1+ | Included with Windows |

> ⚠️ **Important — Java Version**
> The project requires **exactly JDK 21**. Java 22/23/26 will cause a
> `TypeTag :: UNKNOWN` crash in the Lombok annotation processor.
> Set your `JAVA_HOME` to a JDK 21 installation before running.

### Installing JDK 21 (no admin required)

```powershell
$jdkDir = "$env:USERPROFILE\.jdks\temurin-21"
New-Item -ItemType Directory -Path $jdkDir -Force
$url = "https://api.adoptium.net/v3/binary/latest/21/ga/windows/x64/jdk/hotspot/normal/eclipse"
Invoke-WebRequest -Uri $url -OutFile "$env:TEMP\jdk21.zip"
Expand-Archive "$env:TEMP\jdk21.zip" -DestinationPath "$env:TEMP\jdk21_ext" -Force
Copy-Item "$env:TEMP\jdk21_ext\*\*" -Destination $jdkDir -Recurse -Force
```

---

## 🚀 Quick Start (Recommended)

The project includes a startup script that **checks for port conflicts** before launching:

```powershell
cd scentcepts
./start.ps1
```

The script will:
1. ✅ Verify JDK 21 is available
2. ✅ Confirm Docker is running
3. ✅ Check ports **8080**, **3000**, and **5432** are free
4. 🐘 Start PostgreSQL (Docker)
5. 🍃 Start the Spring Boot API
6. ⚛️  Start the Next.js frontend

---

## 📱 WhatsApp Configuration

To receive orders on your business WhatsApp number, you need to configure the recipient phone number:

1. Open the file: [whatsapp.ts](file:///c:/Users/kimura/Documents/scentcepts/scentcepts/frontend/src/lib/whatsapp.ts)
2. Locate the `WHATSAPP_NUMBER` variable at the top of the file:
   ```typescript
   const WHATSAPP_NUMBER = "254716052342"; // Your number here (International format, no + symbol)
   ```
3. Replace the placeholder digits with your own number (e.g., `254...`).
4. **Checkout UI**: The checkout logic that triggers the WhatsApp message is located in [CheckoutForm.tsx](file:///c:/Users/kimura/Documents/scentcepts/scentcepts/frontend/src/components/CheckoutForm.tsx). It packages your cart data and redirects you to the WhatsApp link using the formatted message.

---

## 📦 Port Assignments

| Service    | Port | URL                                       |
|------------|------|-------------------------------------------|
| Frontend   | 3000 | http://localhost:3000                     |
| Backend API| 8080 | http://localhost:8080/api/v1              |
| Swagger UI | 8080 | http://localhost:8080/swagger-ui.html     |
| PostgreSQL | 5432 | `localhost:5432`                          |

> If any port is occupied, `start.ps1` will tell you exactly which process is using it
> and how to free it or reconfigure the service.

---

## 🗄️ Database Setup

> **Using Docker (recommended)?** Skip this — `docker-compose up -d db` handles everything automatically.

If you are **connecting to an existing PostgreSQL instance** (local install or remote server), run these SQL commands once as the `postgres` superuser:

```sql
-- 1. Create the application user
CREATE USER scentcepts_user WITH PASSWORD 'scentcepts';

-- 2. Create the database owned by that user
CREATE DATABASE scentcepts_db OWNER scentcepts_user;

-- 3. Grant all privileges on the database
GRANT ALL PRIVILEGES ON DATABASE scentcepts_db TO scentcepts_user;

-- 4. Connect to the new database, then grant schema rights
\c scentcepts_db

GRANT ALL ON SCHEMA public TO scentcepts_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT ALL ON TABLES TO scentcepts_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT ALL ON SEQUENCES TO scentcepts_user;
```

Run it from the terminal:

```bash
# Linux / macOS
psql -U postgres -f setup-db.sql

# Windows (PowerShell)
psql -U postgres -c "CREATE USER scentcepts_user WITH PASSWORD 'scentcepts';"
psql -U postgres -c "CREATE DATABASE scentcepts_db OWNER scentcepts_user;"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE scentcepts_db TO scentcepts_user;"
psql -U postgres -d scentcepts_db -c "GRANT ALL ON SCHEMA public TO scentcepts_user;"
```

**Connection details:**

| Property | Value             |
|----------|-------------------|
| Host     | `localhost`       |
| Port     | `5432`            |
| Database | `scentcepts_db`   |
| Username | `scentcepts_user` |
| Password | `scentcepts`      |

> Override with env vars `DB_URL`, `DB_USER`, `DB_PASS` for staging/production.

---

## 🛠️ Manual Start (Step by Step)

If you prefer to start services manually:

### 1. Set JAVA_HOME to JDK 21

```powershell
$env:JAVA_HOME = "$env:USERPROFILE\.jdks\temurin-21"
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
```

### 2. Start the Database

```powershell
docker-compose up -d db
```

Wait for it to be ready:
```powershell
docker exec scentcepts-db-1 pg_isready -U scentcepts_user -d scentcepts_db
```

### 3. Build & Start the Backend

```powershell
cd backend
./mvnw package -DskipTests
java -jar target/scentcepts-0.0.1-SNAPSHOT.jar
```

Backend is ready when you see:
```
Started ScentceptsApplication in X.XXX seconds
```

### 4. Start the Frontend

In a new terminal:
```powershell
cd frontend
npm install
npm run dev
```

---

## 🔒 Authentication

The API uses **JWT Bearer tokens**. 

1. Register: `POST /api/v1/auth/register`
2. Login: `POST /api/v1/auth/login` → receive `{ token: "..." }`
3. Use: `Authorization: Bearer <token>` on protected endpoints

### Roles
| Role | Access |
|------|--------|
| `ROLE_USER` | Cart, orders, profile |
| `ROLE_ADMIN` | `/api/v1/admin/**` — user management, stats, trash |

---

## 🌍 Environment Variables

Override these in your environment or a `.env` file:

```env
# Database
DB_URL=jdbc:postgresql://localhost:5432/scentcepts_db
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

## 🛒 Shopping Flow

1. Browse products on `/catalog`
2. Click **Add to Cart** on any product
3. Open the cart drawer (top-right)
4. Click **Checkout** → fill in Name, Phone, and Address
5. Click **Order via WhatsApp** → opens WhatsApp with a pre-formatted order summary

---

## 🗂️ Project Structure

```
scentcepts/
├── start.ps1              # 🚀 One-command dev launcher (with port checks)
├── docker-compose.yml     # DB + optional full-stack container setup
├── backend/
│   ├── .mvn/jvm.config    # JVM flags for Lombok on Java 21
│   ├── src/main/
│   │   ├── java/com/scentcepts/app/
│   │   │   ├── controller/    # REST endpoints
│   │   │   ├── service/       # Business logic
│   │   │   ├── entity/        # JPA entities
│   │   │   ├── dto/           # Data Transfer Objects
│   │   │   ├── mapper/        # MapStruct mappers
│   │   │   ├── repository/    # Spring Data JPA repos
│   │   │   ├── security/      # JWT filter + config
│   │   │   └── config/        # CORS, Security beans
│   │   └── resources/
│   │       ├── application.yml
│   │       └── db/migration/  # Flyway SQL migrations (V1–V6)
│   └── pom.xml
└── frontend/
    ├── src/app/           # Next.js App Router pages
    ├── src/components/    # Reusable UI components
    ├── src/hooks/         # useCart, useAuth
    └── src/lib/           # api.ts, whatsapp.ts
```

---

## 🐛 Common Issues

### `TypeTag :: UNKNOWN` compile error
**Cause:** You're using Java 22+ which is incompatible with Lombok 1.18.36.  
**Fix:** Switch to JDK 21: `$env:JAVA_HOME = "$env:USERPROFILE\.jdks\temurin-21"`

### Port already in use
**Fix:** Run `./start.ps1` — it detects conflicts and tells you exactly which process to stop.

### Backend fails to connect to database
**Fix:** Ensure the Docker container is running: `docker-compose up -d db`  
Then verify: `docker exec scentcepts-db-1 pg_isready -U scentcepts_user -d scentcepts_db`

### IDE shows errors in `target/generated-sources/`
**Cause:** Stale MapStruct generated files from a previous build.  
**Fix:** Run `./mvnw clean compile` to regenerate them — these are not source files.

### Frontend can't reach the API
**Fix:** Ensure `NEXT_PUBLIC_API_URL=http://localhost:8080` is set (already defaulted in `.env.local`).

---

## 📋 API Reference

Full interactive docs available at: **http://localhost:8080/swagger-ui.html**

Key endpoints:

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/v1/auth/register` | None | Create account |
| POST | `/api/v1/auth/login` | None | Get JWT token |
| GET | `/api/v1/products` | None | List products |
| GET | `/api/v1/brands` | None | List brands |
| GET | `/api/v1/admin/stats` | ADMIN | Business metrics |
| GET | `/api/v1/admin/users` | ADMIN | All users |

---

*Built with ❤️ for the Scentcepts luxury experience.*
