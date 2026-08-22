from app.api.auth import router as auth_router
from app.api.integrity import router as integrity_router
from app.api.ingestion import router as ingestion_router
from app.api.compliance import router as compliance_router
from app.api.graph import router as graph_router
from app.api.investigation import router as investigation_router
from app.api.court_package import router as court_package_router

__all__ = [
    "auth_router",
    "integrity_router",
    "ingestion_router",
    "compliance_router",
    "graph_router",
    "investigation_router",
    "court_package_router",
]
