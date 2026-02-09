# 🌊 Water Quality Management System Dashboard

A full-stack **Water Quality Monitoring & Management Platform** built using **React + FastAPI**, designed to simulate real-time IoT-based water quality device monitoring with analytics, alerts, reporting, and admin user management.

This project is developed as part of an **EPICS / Academic Prototype**, with future scope for real hardware integration.

---

## 🚀 Live Deployment

### ✅ Frontend (Vercel)

🔗 [https://water-quality-management.vercel.app](https://water-quality-management.vercel.app)

### ✅ Backend API (Render)

🔗 [https://water-quality-management.onrender.com](https://water-quality-management.onrender.com)

### API Documentation (Swagger)

🔗 [https://water-quality-management.onrender.com/docs](https://water-quality-management.onrender.com/docs)

---

## 📌 Project Overview

The **Water Quality Management System** provides a professional dashboard for monitoring water parameters such as:

* pH Level
* Turbidity (NTU)
* Total Dissolved Solids (TDS)
* Temperature (°C)

The platform supports:

* Real-time sensor simulation
* Alert generation
* PDF report download
* Admin user management panel
* Multi-role login system

---

## ✨ Key Features

### 📊 Real-Time Monitoring Dashboard

* Live sensor readings updated every 2 seconds
* Interactive KPI cards
* Trend graph visualization using Recharts

---

### 🚨 Water Quality Alerts System

Automatically detects unsafe water conditions:

* **SAFE**: Normal water quality
* **WARNING**: High turbidity
* **DANGEROUS**: pH out of acceptable range

---

### 📄 Automated PDF Report Generation

* Generates a downloadable water quality report
* Includes latest readings and analytics summary
* Designed for municipal / industrial documentation use

---

### 👤 Role-Based Authentication

Login roles supported:

| Role     | Username | Password    |
| -------- | -------- | ----------- |
| Admin    | admin    | admin123    |
| Operator | operator | operator123 |

---

### 🛠 Admin User Management Panel

Admin users can:

* View registered system users
* Add new operator accounts
* Delete users dynamically

---

### 🌐 Cloud Deployment Ready

* Frontend deployed via **Vercel**
* Backend deployed via **Render**
* APIs accessible globally

---

## 🏗 Tech Stack

### Frontend

* React.js
* Material UI (MUI)
* Recharts (Graph Visualization)
* Axios / Fetch API

### Backend

* FastAPI (Python)
* SQLAlchemy ORM
* SQLite Database (Prototype Storage)
* ReportLab + Matplotlib (PDF Reports)

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## 📂 Project Structure

```
Water-quality-Management/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── runtime.txt
│   └── water_quality.db
│
├── frontend/
│   ├── src/
│   │   └── App.js
│   ├── package.json
│   └── public/
│
└── README.md
```

---

## ⚙️ Local Setup Instructions

---

## 🔥 Backend Setup (FastAPI)

### Step 1: Go to backend folder

```bash
cd backend
```

### Step 2: Install dependencies

```bash
py -m pip install -r requirements.txt
```

### Step 3: Run server

```bash
py -m uvicorn main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

Swagger Docs:

```
http://localhost:8000/docs
```

---

## 🌐 Frontend Setup (React)

### Step 1: Go to frontend folder

```bash
cd frontend
```

### Step 2: Install packages

```bash
npm install
```

### Step 3: Start React app

```bash
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🔌 API Endpoints

| Endpoint             | Method | Description          |
| -------------------- | ------ | -------------------- |
| `/api/water/latest`  | GET    | Live sensor data     |
| `/api/water/history` | GET    | Last 10 logs         |
| `/api/water/alerts`  | GET    | Current alert status |
| `/api/report/full`   | GET    | Download PDF report  |
| `/api/users`         | GET    | View users (Admin)   |
| `/api/users/add`     | POST   | Add new user         |
| `/api/users/delete`  | POST   | Delete user          |

---

## 📈 Future Enhancements (Phase 2)

This system is designed for future expansion:

* Real IoT sensor integration (ESP32, Arduino)
* Cloud database migration (PostgreSQL)
* JWT Authentication
* Multi-device monitoring support
* Water Quality Index (WQI) ML prediction
* Mobile app companion

---

## 🎯 Academic Relevance

This project demonstrates:

* Full-stack development skills
* IoT monitoring system simulation
* Real-time analytics dashboards
* Role-based administration
* Cloud deployment workflow

---

## 👨‍💻 Developed By

**Shashank Hariharan**
EPICS Project – Water Quality Management System
2026

---

## 📜 License

This project is for educational and prototype purposes.
Commercial deployment requires additional security and compliance enhancements.

---

# ✅ Final Note

This is a fully deployable professional prototype that represents **50–80% completion**, with hardware integration planned in Phase 2.
