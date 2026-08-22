from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_generate_eid():
    response = client.get("/api/v1/ingestion/generate-eid?district_code=DL")
    assert response.status_code == 200
    data = response.json()
    assert "canonical_eid" in data
    assert data["canonical_eid"].startswith("EVD-2026-DL-")

def test_get_sample_library():
    response = client.get("/api/v1/ingestion/sample-library")
    assert response.status_code == 200
    data = response.json()
    assert data["total_samples"] == 5
    assert len(data["items"]) == 5
    formats = [item["type"] for item in data["items"]]
    assert "CCTV_MP4" in formats
    assert "CDR_CSV" in formats
    assert "UFDR_MOBILE" in formats
    assert "AUDIO_WAV" in formats
    assert "FORENSIC_E01" in formats

def test_ingest_from_esakshya():
    payload = {
        "officer_id": "POLICE-DL-101",
        "fir_number": "FIR-2026-DL-0042",
        "crime_scene_location": "Sector 4, Central Delhi",
        "evidence_type": "DIGITAL",
        "title": "Crime Scene Video Stream",
        "device_serial": "AXN-49201-DL-88",
        "content_payload": "ESAKSHYA_SAMPLE_VIDEO_BYTES_STREAM"
    }
    response = client.post("/api/v1/ingestion/esakshya", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    assert data["canonical_object"]["eid"].startswith("EVD-2026-DL-")
    assert data["canonical_object"]["metadata"]["source_system"] == "eSakshya"

def test_ingest_from_cctns_icjs():
    payload = {
        "fir_number": "FIR-2026-DL-0042",
        "act_sections": ["BNS Section 303"],
        "district_code": "DST-DL-CENTRAL",
        "complainant_name": "Sh. Vikram Malhotra",
        "incident_date": "2026-08-20"
    }
    response = client.post("/api/v1/ingestion/cctns-icjs", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SUCCESS"
    assert data["canonical_object"]["eid"].startswith("EVD-2026-DL-")
    assert data["canonical_object"]["metadata"]["source_system"] == "CCTNS/ICJS"
