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

- [**Docker Desktop**](https://www.docker.com/products/docker-desktop/) (Must be running)
- [**Node.js**](https://nodejs.org/) (v18+ for the frontend)
- [**JDK 21**](https://www.oracle.com/java/technologies/downloads/#java21) (Exactly Java 21)
- [**Maven**](https://maven.apache.org/download.cgi) (Required to build the backend)

### 🐳 Setting up Docker (If you do not have Docker Desktop then do this below)

1. Visit the [Docker Desktop](https://www.docker.com/products/docker-desktop/) download page.
2. Download the installer for Windows.
3. Run the installer and ensure the **WSL 2** option is checked if prompted.
4. After installation, **restart your computer**.
5. After restarting, open a terminal and run `wsl --update` to ensure your WSL kernel is up to date.
   - *Tip: Docker Desktop may automatically show a popup with an "Update" button when you first launch it—you can click that instead.*
6. Ensure Docker Desktop is running before starting the project.

### 🟢 Setting up Node.js (If you do not have Node.js then do this below)

1. Visit the [Node.js Official Website](https://nodejs.org/).
2. Download the **LTS (Long Term Support)** version for Windows.
3. Run the installer and follow the default prompts.
4. Verify by opening a terminal and typing `node -v`.

### ☕ Setting up JDK 21 (If you do not have JDK 21 then do this below)

> ⚠️ **Important — Java Version**
> The project requires **exactly JDK 21**. A newer Java version (Java 22+) will cause a `TypeTag :: UNKNOWN` crash in the Lombok annotation processor during compilation.

**Option 1: (Recommended) Install from Oracle Repository**
1. Visit the [Oracle Java 21 Downloads](https://www.oracle.com/java/technologies/downloads/#java21) page.
2. Download the **x64 Installer** for Windows.
3. Run the installer and follow the default prompts.

**Option 2: (No Admin Required) PowerShell Script**
If you don't have administrator rights, run the following in PowerShell to automatically download and extract JDK 21 to your user profile:

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

### 🐦 Setting up Maven (If you do not have Maven then do this below)

1. Download the latest Maven binary zip archive from [maven.apache.org](https://maven.apache.org/download.cgi).
2. Extract the downloaded `.zip` file to a permanent location on your computer, for example: `C:\Program Files\maven`.
3. Add Maven to your System PATH so you can use the `mvn` command from any terminal:
   - Search for **"Environment Variables"** in your Windows Start Menu and select **Edit the system environment variables**.
   - Click the **Environment Variables...** button at the bottom.
   - Under the "System variables" section, click **New** and add:
     - Variable name: `MAVEN_HOME`
     - Variable value: `C:\Program Files\maven\apache-maven-x.x.x` *(adjust to exactly match your extracted folder name)*
   - Still under the **System variables** find the variable named **Path**.
   - **Select the Path variable** by clicking on it, then click the **Edit** button.
   - Open your File Explorer, go to the `bin` folder inside your Maven directory (e.g., `C:\Program Files\maven\apache-maven-x.x.x\bin`), and **copy the full path** from the address bar.
   - Click **New** in the Edit environment variable window and paste the path.
   - **IMPORTANT:** Ensure there are **no quotation marks** around the path you just pasted. If it looks like `"C:\Program Files\maven\apache-maven-x.x.x\bin"`, remove the `"` characters so it is just `C:\Program Files\maven\apache-maven-x.x.x\bin`.
   - Click **OK** on all windows to cleanly apply the changes.
4. To verify, open a completely **new** PowerShell window and type:
   ```powershell
   mvn -version
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

## 🗄️ Manual Database Setup (Non-Docker)

If you have chosen not to use Docker, you must manually install and configure PostgreSQL natively on your Windows machine.

### 🐘 Installing PostgreSQL Natively
1. Download the PostgreSQL Interactive Installer for Windows from [postgresql.org/download/windows](https://www.postgresql.org/download/windows/).
2. Run the downloaded installer and advance through the setup using the default options. 
3. **Important:** When prompted to create a password for the `postgres` superuser, make sure to remember it! You will need this password for the next step.
4. Leave the default port port as `5432` during installation.

### 🗃️ Provisioning the Database
**First before doing anything else**:

1. Open your Windows Start Menu and search for **"SQL Shell (psql)"**.
2. Open the application and press Enter through the default prompts until it asks for your `postgres` password. Enter your password.
3. Copy and paste these exact SQL commands into the shell and hit Enter:

```sql
-- 1. Create the application user
CREATE USER scentcepts_user WITH PASSWORD 'scentcepts';

-- 2. Create the database owned by that user
CREATE DATABASE scentcepts_db OWNER scentcepts_user;

-- 3. Grant privileges
GRANT ALL PRIVILEGES ON DATABASE scentcepts_db TO scentcepts_user;

-- 4. Connect to the database and grant schema rights
\c scentcepts_db
GRANT ALL ON SCHEMA public TO scentcepts_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO scentcepts_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO scentcepts_user;
```

---

## 🚀 Manual Installation & Start Guide

Follow these steps exactly to run the project. 

### 1. Start the Database Environment
> ⚠️ **CRITICAL:** You MUST ensure the **Docker Desktop application is completely open and running** on your system before typing this command, otherwise it will fail.

Start the PostgreSQL container from the root directory of the project:

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
