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

- **Docker Desktop** (Must be running)
- **Node.js** (v18+ for the frontend)
- **JDK 21** (Exactly Java 21)

### ☕ Setting up JDK 21

> ⚠️ **Important — Java Version**
> The project requires **exactly JDK 21**. A newer Java version (Java 22+) will cause a `TypeTag :: UNKNOWN` crash in the Lombok annotation processor during compilation.

**Installing JDK 21 (No Admin Required):**

Run the following in PowerShell to automatically download and extract JDK 21 to your user profile:

```powershell
$jdkDir = "$env:USERPROFILE\.jdks\temurin-21"
New-Item -ItemType Directory -Path $jdkDir -Force
$url = "https://api.adoptium.net/v3/binary/latest/21/ga/windows/x64/jdk/hotspot/normal/eclipse"
Invoke-WebRequest -Uri $url -OutFile "$env:TEMP\jdk21.zip"
Expand-Archive "$env:TEMP\jdk21.zip" -DestinationPath "$env:TEMP\jdk21_ext" -Force
Copy-Item "$env:TEMP\jdk21_ext\*\*" -Destination $jdkDir -Recurse -Force
```

**Setting JDK 21 as Default (If you have newer JDKs installed):**

If your system defaults to a newer JDK like Java 22 or 23, you must override it to use Java 21 for this project. Run this in your current PowerShell session before building:

```powershell
# Point JAVA_HOME to the downloaded JDK 21 directory
$env:JAVA_HOME = "$env:USERPROFILE\.jdks\temurin-21"

# Prepend it to the PATH so it takes priority over other installed Java versions
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"

# Verify the version
java -version
```

---

## 📦 Port Assignments & Avoiding PostgreSQL Conflicts

| Service    | Port | URL                                       |
|------------|------|-------------------------------------------|
| Frontend   | 3000 | http://localhost:3000                     |
| Backend API| 8080 | http://localhost:8080/api/v1              |
| Swagger UI | 8080 | http://localhost:8080/swagger-ui.html     |
| PostgreSQL | **5433** | `localhost:5433`                          |

### 🐘 Why Port 5433 for the Database?
By default, PostgreSQL runs on port `5432`. However, if you have a **native PostgreSQL service installed directly on your Windows machine**, it will aggressively claim port `5432`.

When the Spring Boot application tries to connect to `localhost:5432`, it may erroneously connect to your native Windows database instead of the Docker container, leading to `FATAL: password authentication failed for user "scentcepts_user"` errors. 

To eliminate this conflict, we run the Docker database on **port 5433**, ensuring the backend can safely reach the correct, functionally isolated database container every time without failure.

---

## 🚀 Manual Installation & Start Guide

Follow these steps exactly to run the project. 

### 1. Start the Database Environment
Ensure Docker Desktop is open and running, then start the PostgreSQL container from the root directory of the project:

```bash
docker-compose up -d db
```

*The database will initialize on port `5433` and automatically provision the `scentcepts_user`.*

### 2. Build & Start the Backend (Spring Boot)
Ensure your PowerShell session has JDK 21 set as the default (as explained in the prerequisites). Build the Java application and start it:

```powershell
cd backend
./mvnw clean package -DskipTests
java -jar target/scentcepts-0.0.1-SNAPSHOT.jar
```
*Wait for the log output: `Started ScentceptsApplication in X.XXX seconds`*

### 3. Start the Frontend (Next.js)
Open a **new** terminal window, navigate to the frontend directory, install dependencies, and run the dev server:

```powershell
cd frontend
npm install
npm run dev
```

The application is now accessible at [http://localhost:3000](http://localhost:3000).

---

## 🌍 Environment Variables

You can override these in your environment or a `.env` file if needed (the defaults usually work out of the box):

```env
# Database (Note the 5433 port)
DB_URL=jdbc:postgresql://localhost:5433/scentcepts_db
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

## 📱 WhatsApp Configuration

To receive orders on your business WhatsApp number, you need to configure the recipient phone:

1. Open the file: `frontend/src/lib/whatsapp.ts`
2. Locate the `WHATSAPP_NUMBER` variable:
   ```typescript
   const WHATSAPP_NUMBER = "254716052342"; // Your number here (International format, no + symbol)
   ```
3. Replace the placeholder digits with your own number (e.g., `254...`).
4. **Checkout UI**: When a user inputs their address and taps **Order via WhatsApp**, the `CheckoutForm.tsx` securely packages the cart data and opens WhatsApp with a pre-formatted message directed to this number.

---

## 🔒 Authentication & Roles

The API leverages **JWT Bearer tokens** for security. 

1. Register: `POST /api/v1/auth/register`
2. Login: `POST /api/v1/auth/login` → receive `{ token: "..." }`
3. Use: `Authorization: Bearer <token>` on protected endpoints

### Active Roles
| Role | Access |
|------|--------|
| `ROLE_USER` | View cart, past orders, and manage public profile |
| `ROLE_ADMIN` | Navigate `/api/v1/admin/**` (user management, global stats, soft deletes) |

> 👑 **Initial Setup & Automatic Admin Access**: The backend implements a "bootstrap" mechanism for the very first user. The **first person to register an account** on a fresh database is automatically assigned the `ROLE_ADMIN` role. Everyone who registers after the first account will automatically default to `ROLE_USER`.

---

## 🛒 Shopping Flow

1. Browse luxury perfumes on `/catalog`.
2. Click **Add to Cart** on any desired product.
3. Open the sliding cart drawer (top-right).
4. Click **Checkout** and provide your delivery details.
5. Click **Order via WhatsApp** — This instantly bridges the order to WhatsApp with a professional itemized receipt.

---

## 🐛 Troubleshooting

### `TypeTag :: UNKNOWN` compile error
**Cause:** You are executing the build using Java 22 or newer.  
**Fix:** Switch your terminal to Java 21:  
`$env:JAVA_HOME = "$env:USERPROFILE\.jdks\temurin-21"`  
`$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"`

### Password authentication failed for user "scentcepts_user"
**Cause:** The backend connected to a native Windows installation of PostgreSQL instead of Docker.  
**Fix:** Ensure your `application.yml` and `docker-compose.yml` reflect port `5433` (see Port Assignments). Rebuild and restart.

### IDE shows errors in `target/generated-sources/`
**Cause:** Residual MapStruct generated files from an older configuration.  
**Fix:** Run `./mvnw clean compile` to freshly overwrite the generated implementation classes.

---

## 📋 API Reference

Full interactive Swagger documentation is available at:  
**[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)**

*Built with ❤️ for the Scentcepts luxury experience.*
