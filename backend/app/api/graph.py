from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.database import get_db

router = APIRouter(prefix="/api/v1/graph", tags=["Evidence Knowledge Graph"])

class GraphNode(BaseModel):
    id: str
    label: str
    category: str  # PERSON / DEVICE / FILE / LOCATION / EVENT
    subtitle: str
    evidence_citation_eid: str

class GraphEdge(BaseModel):
    id: str
    source: str
    target: str
    relationship: str
    confidence_score: float

class EvidenceGraphResponse(BaseModel):
    case_id: str
    total_nodes: int
    total_edges: int
    nodes: list[GraphNode]
    edges: list[GraphEdge]


@router.get("/case-graph/{case_id}", response_model=EvidenceGraphResponse)
def get_case_knowledge_graph(case_id: str, db: Session = Depends(get_db)):
    """Fetch entity-relationship knowledge graph linking persons, devices, files, and locations."""
    nodes = [
        GraphNode(id="N-1", label="Case FIR-2026-DL-0042", category="EVENT", subtitle="Central Delhi Theft & Cyber Crime", evidence_citation_eid="CASE-0042"),
        GraphNode(id="N-2", label="Insp. Vikram Pratap Singh", category="PERSON", subtitle="Investigating Officer (IO)", evidence_citation_eid="OFFICER-DL-8842"),
        GraphNode(id="N-3", label="Suspect: Rajesh @ Rocky", category="PERSON", subtitle="Primary Accused (Age 32)", evidence_citation_eid="EVD-2026-DL-9042"),
        GraphNode(id="N-4", label="Axon Body Camera #04", category="DEVICE", subtitle="SN: AXN-49201-DL-88", evidence_citation_eid="EVD-2026-DL-9041"),
        GraphNode(id="N-5", label="CCTV Video Recording (MP4)", category="FILE", subtitle="Hash: a7f4b890...", evidence_citation_eid="EVD-2026-DL-9041"),
        GraphNode(id="N-6", label="Sector 4 Subway Intersection", category="LOCATION", subtitle="28.6139° N, 77.2090° E", evidence_citation_eid="EVD-2026-DL-9041"),
        GraphNode(id="N-7", label="Cellebrite Mobile Dump (UFDR)", category="FILE", subtitle="Hash: c9f6da12...", evidence_citation_eid="EVD-2026-DL-1049"),
    ]

    edges = [
        GraphEdge(id="E-1", source="N-[#1]", target="N-2", relationship="INVESTIGATED_BY", confidence_score=1.0),
        GraphEdge(id="E-2", source="N-3", target="N-[#1]", relationship="ACCUSED_IN", confidence_score=0.95),
        GraphEdge(id="E-3", source="N-4", target="N-[#5]", relationship="CAPTURED_FILE", confidence_score=1.0),
        GraphEdge(id="E-4", source="N-5", target="N-6", relationship="RECORDED_AT", confidence_score=0.98),
        GraphEdge(id="E-5", source="N-3", target="N-7", relationship="OWNED_MOBILE_DEVICE", confidence_score=0.92),
    ]

    return EvidenceGraphResponse(
        case_id=case_id,
        total_nodes=len(nodes),
        total_edges=len(edges),
        nodes=nodes,
        edges=edges
    )
