from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.core.config import settings
from app.core.database import get_db
from app.api import (
    auth_router,
    integrity_router,
    ingestion_router,
    compliance_router,
    graph_router,
    investigation_router,
    court_package_router,
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend API for SAKSHI - Secure Audit & Kernel for Shared High-integrity Investigations"
)

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5180", "http://localhost:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all masterplan API routers
app.include_router(auth_router)
app.include_router(integrity_router)
app.include_router(ingestion_router)
app.include_router(compliance_router)
app.include_router(graph_router)
app.include_router(investigation_router)
app.include_router(court_package_router)

@app.get("/")
def root():
    return {
        "status": "online",
        "system": "SAKSHI Evidence Intelligence & Court-Readiness Engine",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT
    }

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT 1")).scalar()
        return {
            "status": "healthy",
            "database": "connected" if result == 1 else "error",
            "environment": settings.ENVIRONMENT
        }
    except Exception as e:
        return {
            "status": "degraded",
            "database": "error",
            "error": str(e)
        }
