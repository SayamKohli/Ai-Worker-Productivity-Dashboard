# 🏭 AI-Powered Worker Productivity Dashboard

## ⚠️ Note

Backend is hosted on Render free tier.  
First request may take 30–60 seconds due to cold start.

---

## 📌 Overview

This project is a full-stack web application that simulates a manufacturing factory environment where AI-powered CCTV systems generate structured worker activity events.

The system ingests these events, stores them, computes productivity metrics, and displays them in an interactive dashboard.

---

## 🧠 Architecture

```
AI Cameras (Edge)
        ↓
POST /events API
        ↓
Node.js Backend (Express)
        ↓
SQLite Database
        ↓
Metrics Engine
        ↓
GET /metrics API
        ↓
React Dashboard
```

---

## ⚙️ Tech Stack

### Frontend

* React (UI)
* Chart.js (visualization)
* Axios (API calls)

### Backend

* Node.js
* Express.js
* SQLite (sqlite3)

### DevOps

* Docker
* Docker Compose

---

## 📦 Database Schema

### Workers

| Field | Type |
| ----- | ---- |
| id    | TEXT |
| name  | TEXT |

### Workstations

| Field | Type |
| ----- | ---- |
| id    | TEXT |
| name  | TEXT |

### Events

| Field          | Type    |
| -------------- | ------- |
| timestamp      | TEXT    |
| worker_id      | TEXT    |
| workstation_id | TEXT    |
| event_type     | TEXT    |
| confidence     | REAL    |
| count          | INTEGER |

---

## 🔌 APIs

### POST /events

Ingest AI-generated events.

### POST /seed

Generates dummy data for:

* 6 workers
* 6 workstations
* ~200 events

### GET /metrics

Returns:

* Factory-level metrics
* Worker-level metrics
* Workstation-level metrics

---

## 📊 Metrics Definition

### Worker-Level

* Active Time → duration of "working" events
* Idle Time → duration of "idle" events
* Utilization → active / (active + idle)
* Units Produced → sum of product_count
* Units per Hour → units / active time

### Workstation-Level

* Occupancy Time → working duration
* Utilization → occupancy time
* Throughput → units / time

### Factory-Level

* Total Production → sum of all units
* Avg Utilization → avg(worker utilization)
* Avg Production Rate → avg(units/hour)

---

## ⏱️ Assumptions

* Events are sorted by timestamp before processing
* Duration is calculated between consecutive events
* product_count events are discrete and not time-based
* Missing or invalid data is ignored safely

---

## ⚠️ Edge Case Handling

### Intermittent Connectivity

* Events can be buffered and retried
* Timestamp ensures reconstruction of sequence

### Duplicate Events

* Can be handled via unique hash (worker_id + timestamp + event_type)

### Out-of-Order Events

* Events are sorted before computing metrics

---

## 🤖 AI Model Considerations

### Model Versioning

* Add `model_version` field to events
* Track performance per version

### Model Drift Detection

* Monitor:

  * confidence scores
  * output distribution
* Trigger alerts on deviation

### Retraining Trigger

* Low confidence trends
* Increased error rates
* periodic retraining schedule

---

## 📈 Scalability

### 5 → 100 Cameras

* Introduce message queue (Kafka / RabbitMQ)
* Async ingestion pipeline

### Multi-Site Deployment

* Multi-tenant architecture
* Separate DB per site
* Centralized analytics layer

---

## 🚀 Running Locally

### Backend

```bash
cd backend
npm install
node server.js
```

---

### Frontend

```bash
cd frontend
npm install
npm start
```

---

### Usage

1. Open UI → http://localhost:3001
2. Click **Seed Data**
3. Dashboard loads metrics

---

## 🐳 Docker Setup

### Run Full Application

```bash
docker-compose up --build
```

### Access

* Backend → http://localhost:3000
* Frontend → http://localhost:3001

---

## 🌐 Deployment

### Backend Deployment Options

* Render
* Railway
* EC2 (recommended for full control)

### Frontend Deployment

* Vercel
* Netlify

### Production Setup

* Use Nginx as reverse proxy
* Enable HTTPS
* Use environment variables for API URLs

---

## 💡 Design Decisions

* Metrics computed on-demand (GET /metrics)
* Keeps ingestion lightweight
* Avoids unnecessary DB writes

---

## 🎯 Future Improvements

* Real-time streaming via WebSockets
* Authentication & role-based access
* Advanced analytics (trend graphs)
* Alert system for low productivity

---

## ✅ Conclusion

This project demonstrates:

* Full-stack system design
* Real-time data ingestion patterns
* Analytical computation logic
* Scalable architecture thinking

## 🗄️ Database Choice: SQLite

### 📌 Why SQLite?

For this implementation, SQLite was chosen as the database due to:

* Lightweight and zero-configuration setup
* No external service dependency
* Fast local development and testing
* Suitable for small-scale, single-instance applications

SQLite stores data in a single file (`factory.db`), making it easy to manage and deploy without additional infrastructure.

---

### ⚙️ How It Works in This Project

* All data (workers, workstations, events) is stored in a local SQLite file
* The backend reads and writes directly to this file
* No separate database server is required

---

### ⚠️ Limitations

SQLite has certain limitations in cloud environments:

* File-based storage may be **ephemeral** (data can reset on redeploy)
* Not suitable for high concurrency or distributed systems
* Limited scalability compared to server-based databases

---

### 🧠 Production Consideration

In a real-world production system, SQLite would be replaced with a more robust database such as:

* PostgreSQL
* MySQL

This would provide:

* Persistent storage
* Better concurrency handling
* Horizontal scalability
* Backup and replication support

---

### 🚀 Future Upgrade Path

To scale this system:

1. Replace SQLite with PostgreSQL
2. Move database to a managed cloud service
3. Introduce connection pooling
4. Add indexing for faster queries

---

### ✅ Summary

SQLite was used to:

* Simplify setup and deployment
* Focus on core logic (event ingestion & metrics computation)
* Enable quick demonstration of functionality

This tradeoff ensures a working, testable system while keeping the architecture extensible for future scaling.

