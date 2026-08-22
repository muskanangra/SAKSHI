import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_compliance_check_readiness():
    response = client.post("/api/v1/compliance/check-readiness", json={
        "evidence_id": "EVD-2026-DL-9042",
        "fir_number": "FIR-2026-DL-0042"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["evidence_id"] == "EVD-2026-DL-9042"
    assert data["readiness_score_percentage"] == 100.0
    assert data["compliance_status"] == "READY_FOR_COURT"

def test_compliance_generate_certificate():
    response = client.post("/api/v1/compliance/generate-certificate", json={
        "evidence_id": "EVD-2026-DL-9042",
        "certifying_officer_id": "LEGAL-DL-401"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["evidence_id"] == "EVD-2026-DL-9042"
    assert "CERT-BSA63-" in data["certificate_id"]
    assert len(data["digital_signature_hash"]) == 64

def test_graph_case_knowledge_graph():
    response = client.get("/api/v1/graph/case-graph/CASE-0042")
    assert response.status_code == 200
    data = response.json()
    assert data["case_id"] == "CASE-0042"
    assert data["total_nodes"] > 0
    assert data["total_edges"] > 0

def test_investigation_semantic_search():
    response = client.post("/api/v1/investigation/semantic-search", json={
        "query": "Where was the suspect recorded at 22:15?",
        "case_id": "CASE-0042"
    })
    assert response.status_code == 200
    data = response.json()
    assert "EVD-2026-DL-9041" in data["answer_summary"]
    assert len(data["citations"]) >= 1

def test_investigation_timeline():
    response = client.get("/api/v1/investigation/timeline/CASE-0042")
    assert response.status_code == 200
    data = response.json()
    assert data["total_events"] == 3

def test_investigation_anomalies():
    response = client.get("/api/v1/investigation/anomalies/CASE-0042")
    assert response.status_code == 200
    data = response.json()
    assert data["total_anomalies"] >= 1

def test_court_package_generate():
    response = client.post("/api/v1/court-package/generate", json={
        "case_id": "CASE-0042",
        "fir_number": "FIR-2026-DL-0042",
        "court_name": "Sessions Court, Central Delhi Judicial District",
        "prosecutor_name": "Adv. Suresh Chandran"
    })
    assert response.status_code == 200
    data = response.json()
    assert "PKG-COURT-2026-" in data["package_id"]
    assert data["total_annexures"] == 3
    assert len(data["package_hash"]) == 64
