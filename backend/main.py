from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse

from datetime import datetime
import random

# Database (SQLite)
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, sessionmaker

# PDF + Graph
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import matplotlib.pyplot as plt

# ---------------------------
# APP SETUP
# ---------------------------
app = FastAPI(title="Water Quality Management Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# DATABASE SETUP
# ---------------------------
engine = create_engine("sqlite:///water_quality.db")
Base = declarative_base()
SessionLocal = sessionmaker(bind=engine)

# ---------------------------
# MODELS
# ---------------------------

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    password = Column(String)
    role = Column(String)


class SensorLog(Base):
    __tablename__ = "sensor_logs"

    id = Column(Integer, primary_key=True)
    ph = Column(Float)
    turbidity = Column(Float)
    tds = Column(Float)
    temperature = Column(Float)
    timestamp = Column(String)


Base.metadata.create_all(engine)

# ---------------------------
# INITIAL USERS (ONLY ONCE)
# ---------------------------
def seed_users():
    db = SessionLocal()
    if db.query(User).count() == 0:
        db.add(User(username="admin", password="admin123", role="Admin"))
        db.add(User(username="operator", password="operator123", role="Operator"))
        db.commit()
    db.close()

seed_users()

# ---------------------------
# LOGIN API
# ---------------------------
@app.post("/api/login")
def login(data: dict):
    db = SessionLocal()
    user = db.query(User).filter(
        User.username == data["username"],
        User.password == data["password"]
    ).first()
    db.close()

    if user:
        return {"status": "success", "role": user.role}

    return JSONResponse(status_code=401, content={"status": "failed"})


# ---------------------------
# ADMIN USER MANAGEMENT
# ---------------------------
@app.get("/api/users")
def get_users():
    db = SessionLocal()
    users = db.query(User).all()
    db.close()

    return [{"username": u.username, "role": u.role} for u in users]


@app.post("/api/users/add")
def add_user(data: dict):
    db = SessionLocal()
    db.add(User(**data))
    db.commit()
    db.close()
    return {"message": "User Added Successfully"}


# ---------------------------
# SENSOR SIMULATION + STORAGE
# ---------------------------
@app.get("/api/water/latest")
def latest_reading():
    # Generate values first (not ORM dependent)
    ph = round(random.uniform(6.5, 8.5), 2)
    turbidity = round(random.uniform(1, 10), 2)
    tds = round(random.uniform(100, 600), 2)
    temperature = round(random.uniform(20, 35), 2)
    timestamp = str(datetime.now())

    # Store in database
    db = SessionLocal()
    reading = SensorLog(
        ph=ph,
        turbidity=turbidity,
        tds=tds,
        temperature=temperature,
        timestamp=timestamp
    )
    db.add(reading)
    db.commit()
    db.close()

    # Return safe dictionary
    return {
        "ph": ph,
        "turbidity": turbidity,
        "tds": tds,
        "temperature": temperature,
        "timestamp": timestamp
    }

# ---------------------------
# HISTORY LOG API
# ---------------------------
@app.get("/api/water/history")
def get_history():
    db = SessionLocal()
    logs = db.query(SensorLog).order_by(SensorLog.id.desc()).limit(10).all()
    db.close()

    return [
        {
            "ph": l.ph,
            "turbidity": l.turbidity,
            "tds": l.tds,
            "temperature": l.temperature,
            "timestamp": l.timestamp
        }
        for l in logs
    ]


# ---------------------------
# ALERTS API (Unique Feature)
# ---------------------------
@app.get("/api/water/alerts")
def get_alerts():
    db = SessionLocal()
    latest = db.query(SensorLog).order_by(SensorLog.id.desc()).first()
    db.close()

    if not latest:
        return {"alert": "No Data Yet"}

    if latest.ph < 6.8 or latest.ph > 8.2:
        return {"alert": "DANGEROUS: pH out of range ❌"}

    if latest.turbidity > 7:
        return {"alert": "WARNING: High turbidity ⚠️"}

    return {"alert": "SAFE: Water quality normal ✅"}


# ---------------------------
# FULL PDF REPORT WITH GRAPH
# ---------------------------
@app.get("/api/report/full")
def generate_report():
    db = SessionLocal()
    logs = db.query(SensorLog).order_by(SensorLog.id.desc()).limit(10).all()
    db.close()

    if not logs:
        return {"error": "No sensor data available"}

    logs.reverse()

    ph_values = [l.ph for l in logs]

    # Graph
    plt.figure()
    plt.plot(ph_values)
    plt.title("pH Trend Report")
    plt.savefig("ph_graph.png")
    plt.close()

    filename = "Full_Water_Report.pdf"
    c = canvas.Canvas(filename, pagesize=letter)

    c.setFont("Helvetica-Bold", 18)
    c.drawString(150, 750, "Water Quality Full Report")

    c.setFont("Helvetica", 12)
    c.drawString(50, 720, f"Generated: {datetime.now()}")

    latest = logs[-1]
    c.drawString(50, 680, f"Latest pH: {latest.ph}")
    c.drawString(50, 660, f"Turbidity: {latest.turbidity}")
    c.drawString(50, 640, f"TDS: {latest.tds}")
    c.drawString(50, 620, f"Temperature: {latest.temperature}")

    # Insert Graph
    c.drawImage("ph_graph.png", 100, 350, width=400, height=250)

    c.drawString(50, 320, "Graph: Last 10 pH Readings")
    c.drawString(50, 280, "System: Water Quality Management Prototype")

    c.save()

    return FileResponse(filename, filename=filename)

@app.post("/api/users/delete")
def delete_user(data: dict):
    db = SessionLocal()
    user = db.query(User).filter(User.username == data["username"]).first()
    if user:
        db.delete(user)
        db.commit()
    db.close()
    return {"message": "User Deleted Successfully"}


# ---------------------------
# ROOT
# ---------------------------
@app.get("/")
def home():
    return {"message": "Advanced Water Quality Backend Running"}
