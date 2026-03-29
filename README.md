# 🌸 Scentcepts — Luxury Perfume E-Commerce Platform

A full-stack e-commerce web application for a luxury perfume decant business. Customers can browse curated fragrances, purchase decants or full bottles, and place orders via WhatsApp. An admin dashboard provides inventory, order, and customer management.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Start the Database](#2-start-the-database)
  - [3. Start the Backend](#3-start-the-backend)
  - [4. Start the Frontend](#4-start-the-frontend)
- [Default Ports](#-default-ports)
- [API Endpoints](#-api-endpoints)
- [Environment Configuration](#-environment-configuration)
- [Troubleshooting](#-troubleshooting)

---

## 🛠 Tech Stack

| Layer      | Technology                                                      |
| ---------- | --------------------------------------------------------------- |
| Frontend   | React 19, Vite 8, Tailwind CSS 4, Zustand, React Router 7      |
| Backend    | Java (17+), Spring Boot 3.1.5, Spring Data JPA, Hibernate       |
| Database   | PostgreSQL 15                                                   |
| Container  | Docker & Docker Compose                                         |
| Build Tool | Maven (backend), npm (frontend)                                 |

---

## ✅ Prerequisites

Install the following software before running the project:

| Software         | Version   | Download Link                                                                                  |
| ---------------- | --------- | ---------------------------------------------------------------------------------------------- |
| **Git**          | 2.x+      | [https://git-scm.com/downloads](https://git-scm.com/downloads)                                |
| **Node.js**      | 18.x+     | [https://nodejs.org/en/download](https://nodejs.org/en/download)                               |
| **Java JDK**     | 17+       | [https://www.oracle.com/java/technologies/downloads/](https://www.oracle.com/java/technologies/downloads/) |
| **Maven**        | 3.8+      | [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)                 |
| **Docker**       | 20.x+     | [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/) |

> **Note:** Docker Desktop includes both Docker Engine and Docker Compose. Make sure Docker Desktop is **running** before proceeding.

### Verify installations

```bash
git --version
node --version
npm --version
java -version
mvn --version
docker --version
docker compose version
```

---

## 📁 Project Structure

```
scentscepts/
├── backend/                    # Spring Boot REST API
│   ├── src/main/java/com/scentcepts/
│   │   ├── config/             # CORS & data seeding
│   │   ├── controllers/        # REST endpoints
│   │   ├── models/             # JPA entities
│   │   ├── repositories/       # Spring Data JPA repos
│   │   └── services/           # Business logic
│   ├── src/main/resources/
│   │   └── application.yml     # DB connection & server config
│   └── pom.xml                 # Maven dependencies
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Route pages (shop + admin)
│   │   ├── store/              # Zustand state management
│   │   ├── App.jsx             # Router setup
│   │   └── index.css           # Tailwind CSS config
│   └── package.json            # npm dependencies
├── database/
│   └── init.sql                # PostgreSQL schema (auto-runs via Docker)
├── docker-compose.yml          # PostgreSQL container config
└── README.md                   # ← You are here
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/wilfredkimura/scentscepts.git
cd scentscepts
```

### 2. Start the Database

The PostgreSQL database runs inside a Docker container. The schema is automatically initialized from `database/init.sql`.

```bash
docker compose up -d
```

Verify it's running:

```bash
docker ps
```

You should see a container named `scentcepts_db` running on port **5433**.

> **Why port 5433?** The Docker container maps internal port 5432 → external port **5433** to avoid conflicts with any local PostgreSQL installation.

### 3. Start the Backend

```bash
cd backend
mvn spring-boot:run
```

Wait until you see:

```
Started ScentceptsApplication in X seconds
```

The backend will:
- Connect to the PostgreSQL database on `localhost:5433`
- Automatically seed sample product data (3 luxury fragrances) on first run
- Serve the REST API at `http://localhost:8080`

### 4. Start the Frontend

Open a **new terminal** window:

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at `http://localhost:5173`. Open this URL in your browser.

---

## 🌐 Default Ports

| Service   | URL                         |
| --------- | --------------------------- |
| Frontend  | http://localhost:5173       |
| Backend   | http://localhost:8080       |
| Database  | localhost:5433              |

---

## 📡 API Endpoints

### Products

| Method   | Endpoint               | Description              |
| -------- | ---------------------- | ------------------------ |
| `GET`    | `/api/products`        | List all products        |
| `GET`    | `/api/products/{id}`   | Get product by ID        |
| `POST`   | `/api/products`        | Create a new product     |
| `PUT`    | `/api/products/{id}`   | Update a product         |
| `DELETE` | `/api/products/{id}`   | Delete a product         |

### Orders

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| `GET`  | `/api/orders`   | List all orders    |
| `POST` | `/api/orders`   | Create a new order |

### Admin Stats

| Method | Endpoint            | Description                   |
| ------ | ------------------- | ----------------------------- |
| `GET`  | `/api/admin/stats`  | Get dashboard metrics         |

### Health Check

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| `GET`  | `/api/ping`   | Server health     |

---

## ⚙ Environment Configuration

### Backend — `backend/src/main/resources/application.yml`

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5433/scentcepts
    username: scentcepts_user
    password: scentcepts_password
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true

server:
  port: 8080
```

### Database — `docker-compose.yml`

```yaml
environment:
  POSTGRES_DB: scentcepts
  POSTGRES_USER: scentcepts_user
  POSTGRES_PASSWORD: scentcepts_password
ports:
  - "5433:5432"     # host:container
```

> If you change the database credentials, update **both** files to match.

---

## 🔧 Troubleshooting

### Port already in use (8080)

Another process is using port 8080. Find and kill it:

```bash
# Windows
netstat -ano | findstr :8080
taskkill /F /PID <PID>

# macOS / Linux
lsof -i :8080
kill -9 <PID>
```

### Docker container won't start

Make sure Docker Desktop is running, then:

```bash
docker compose down -v
docker compose up -d
```

The `-v` flag removes old volumes, giving you a fresh database.

### Backend can't connect to database

1. Confirm the Docker container is running: `docker ps`
2. Verify port **5433** is accessible: `docker logs scentcepts_db`
3. Ensure `application.yml` uses `localhost:5433` (not `5432`)

### Frontend shows blank white page

- Check the browser console (F12 → Console) for errors
- Make sure you ran `npm install` before `npm run dev`
- Try clearing the Vite cache: `rm -rf node_modules/.vite && npm run dev`

### `mvn` command not found

Maven needs to be on your system PATH:

1. Download Maven from [https://maven.apache.org/download.cgi](https://maven.apache.org/download.cgi)
2. Extract the archive
3. Add the `bin/` directory to your system PATH
4. Restart your terminal and verify: `mvn --version`

---

## 📄 License

This project is for educational purposes.
