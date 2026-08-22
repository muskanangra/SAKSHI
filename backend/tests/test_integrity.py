from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_calculate_hash():
    response = client.post("/api/v1/integrity/calculate-hash", json={"content": "SAKSHI Test Evidence Payload"})
    assert response.status_code == 200
    data = response.json()
    assert "sha256_hash" in data
    assert data["calculation_time_ms"] >= 0
    assert len(data["sha256_hash"]) == 64

def test_get_chain_of_custody():
    response = client.get("/api/v1/integrity/chain/EVID-DL-2026-9041")
    assert response.status_code == 200
    data = response.json()
    assert data["evidence_id"] == "EVID-DL-2026-9041"
    assert len(data["blocks"]) >= 1
    assert data["is_chain_unbroken"] is True

def test_simulate_tamper():
    response = client.post("/api/v1/integrity/simulate-tamper", json={"evidence_id": "EVID-DL-2026-9041"})
    assert response.status_code == 200
    data = response.json()
    assert data["is_tampered"] is True
    assert data["original_hash"] != data["tampered_hash"]
    assert data["alarm_status"] == "CRYPTOGRAPHIC_HASH_MISMATCH_ALARM"

def test_get_bsa_provenance():
    response = client.get("/api/v1/integrity/provenance/EVID-DL-2026-PRIM-001")
    assert response.status_code == 200
    data = response.json()
    assert data["bsa_classification"] == "PRIMARY_EVIDENCE"
    assert data["hash_match"] is True

def test_verify_all_system_integrity():
    response = client.post("/api/v1/integrity/verify-all")
    assert response.status_code == 200
    data = response.json()
    assert data["total_evidence_records"] >= 1
    assert data["system_integrity_percentage"] == 100.0
