````md
# Water Quality Management System Dashboard

A full-stack **IoT Water Quality Monitoring & Management Platform** built with **React + FastAPI**, designed to simulate real-time sensor monitoring, analytics, alerts, reporting, and administrative control.

This project is developed as part of an **EPICS / Academic Prototype**, with future scope for real-world IoT hardware integration.

---

## Live Deployment

### Frontend (Vercel)

https://water-quality-management.vercel.app

### Backend API (Render)

https://water-quality-management.onrender.com

### API Documentation (Swagger)

https://water-quality-management.onrender.com/docs

---

## Project Overview

The **Water Quality Management System** provides a modern dashboard for monitoring critical water parameters:

- pH Level  
- Turbidity (NTU)  
- Total Dissolved Solids (TDS)  
- Temperature (°C)

The platform demonstrates how IoT-based water monitoring systems can be managed through a centralized SaaS-style interface.

---

## Key Features

### Real-Time Monitoring Dashboard

- Live sensor readings updated every 2 seconds  
- KPI metric cards with professional UI  
- Trend visualization using interactive charts  

---

### Water Quality Alert System

Automatic classification of water conditions:

- **Safe** → Normal range  
- **Warning** → High turbidity detected  
- **Dangerous** → pH outside acceptable limits  

---

### Multi-Module Commercial Dashboard

The application includes complete working modules:

- Dashboard  
- Devices Monitoring  
- Analytics & AI Insights  
- Sensor Logs History  
- Maintenance Scheduling  
- Reports Center  
- System Information Panel  
- Settings + Dark Mode Toggle  

---

### PDF Report Generation

- Downloadable water quality reports  
- Latest readings + summary analytics  
- Designed for municipal and industrial documentation workflows  

---

### Role-Based Authentication

Supported login roles:

| Role      | Username   | Password     |
|----------|-----------|-------------|
| Admin     | admin      | admin123     |
| Operator  | operator   | operator123  |

---

### Admin User Management

Admin users can:

- View registered system accounts  
- Add new operator users  
- Delete users dynamically  

---

### Dark Mode Support

- Fully functional dark/light theme toggle  
- Enhances usability and commercial UI experience  

---

## Technology Stack

### Frontend

- React.js  
- Material UI (MUI)  
- Recharts (Data Visualization)  
- Framer Motion (Animations & Page Transitions)  

### Backend

- FastAPI (Python)  
- SQLAlchemy ORM  
- SQLite Database (Prototype Storage)  
- ReportLab + Matplotlib (PDF Reporting Engine)  

### Deployment

- Vercel (Frontend Hosting)  
- Render (Backend API Hosting)  

---

## Project Structure

```bash
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
````

---

## Local Setup Guide

Follow these steps to run the project locally.

---

## Backend Setup (FastAPI)

### Step 1: Navigate to backend folder

```bash
cd backend
```

### Step 2: Install dependencies

```bash
py -m pip install -r requirements.txt
```

### Step 3: Start FastAPI server

```bash
py -m uvicorn main:app --reload
```

Backend will run at:

```
http://127.0.0.1:8000
```

Swagger Docs:

```
http://127.0.0.1:8000/docs
```

---

## Frontend Setup (React)

### Step 1: Navigate to frontend folder

```bash
cd frontend
```

### Step 2: Install required packages

```bash
npm install
```

### Step 3: Start the React development server

```bash
npm start
```

Frontend will run at:

```
http://localhost:3000
```

---

## API Endpoints

| Endpoint             | Method | Description                 |
| -------------------- | ------ | --------------------------- |
| `/api/water/latest`  | GET    | Latest live sensor reading  |
| `/api/water/history` | GET    | Recent sensor history logs  |
| `/api/water/alerts`  | GET    | Current water safety alert  |
| `/api/report/full`   | GET    | Download full PDF report    |
| `/api/users`         | GET    | List all users (Admin only) |
| `/api/users/add`     | POST   | Add new operator user       |
| `/api/users/delete`  | POST   | Delete user account         |

---

## Future Enhancements (Phase 2)

This platform is designed for expansion into a real-world IoT deployment:

* ESP32 / Arduino hardware sensor integration
* PostgreSQL cloud database migration
* JWT Authentication + Secure Login
* Multi-device monitoring at scale
* AI-based Water Quality Index (WQI) prediction
* Mobile companion application

---

## Academic & Industry Relevance

This project demonstrates:

* Full-stack engineering skills
* Real-time IoT monitoring simulation
* Professional analytics dashboard design
* Role-based administration
* Cloud deployment workflow (Render + Vercel)

---

## Developed By

**Shashank Hariharan**
EPICS Project – Water Quality Management System
2026

---

## License

This project is developed for educational and prototype purposes.
Commercial deployment requires additional security, compliance, and scalability improvements.

---

## Final Note

This is a fully deployable prototype representing a complete end-to-end **IoT Monitoring SaaS Dashboard**, with Phase 2 hardware integration planned.

```