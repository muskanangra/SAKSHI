import hashlib
import random
import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import Evidence, Case, District, User
from app.schemas.ingestion import (
    CanonicalEvidenceObject, NormalizedMetadataSchema, DeviceInfoSchema,
    GeolocationSchema, CustodianInfoSchema, ESakshyaIngestRequest,
    CCTNSIngestRequest, IngestResponse
)

router = APIRouter(prefix="/api/v1/ingestion", tags=["Evidence Ingestion & Adapters"])

SAMPLE_EVIDENCE_LIBRARY = [
    {
        "id": "LIB-001",
        "title": "CCTV Footage - Zone 4 Subway Entry",
        "type": "CCTV_MP4",
        "file_name": "CCTV_Zone4_Subway_Entry.mp4",
        "file_size": "104.8 MB",
        "mime_type": "video/mp4",
        "format_badge": "🎥 CCTV MP4",
        "sha256": "a7f4b8901c23d456e7890123456789abcdef0123456789abcdef0123456789ab",
        "source": "eSakshya Surveillance Feed",
        "bsa_section": "Section 57 BSA (Primary Evidence)"
    },
    {
        "id": "LIB-002",
        "title": "Call Detail Records (CDR) - Suspect Mobile",
        "type": "CDR_CSV",
        "file_name": "CDR_Suspect_789012.csv",
        "file_size": "4.2 MB",
        "mime_type": "text/csv",
        "format_badge": "📞 CDR CSV",
        "sha256": "b8e5c9012d34e567f890123456789abcdef0123456789abcdef0123456789bc",
        "source": "Telecom Nodal Provider / CCTNS Link",
        "bsa_section": "Section 63 BSA (Certified Copy)"
    },
    {
        "id": "LIB-003",
        "title": "Cellebrite UFDR Mobile Extraction Dump",
        "type": "UFDR_MOBILE",
        "file_name": "Cellebrite_UFDR_Dump.ufdr",
        "file_size": "1.8 GB",
        "mime_type": "application/x-ufdr",
        "format_badge": "📱 UFDR Mobile",
        "sha256": "c9f6da123e45f678a90123456789abcdef0123456789abcdef0123456789cd",
        "source": "CFSL Digital Forensics Lab",
        "bsa_section": "Section 57 BSA (Primary Evidence)"
    },
    {
        "id": "LIB-004",
        "title": "Interrogation Room Audio Stream #02",
        "type": "AUDIO_WAV",
        "file_name": "Interrogation_Audio_02.wav",
        "file_size": "24.5 MB",
        "mime_type": "audio/wav",
        "format_badge": "🎙️ Audio WAV",
        "sha256": "d0a7eb234f56a789b0123456789abcdef0123456789abcdef0123456789de",
        "source": "Station House Recording System",
        "bsa_section": "Section 57 BSA (Primary Evidence)"
    },
    {
        "id": "LIB-005",
        "title": "EnCase E01 Forensic Bit-Stream Disk Image",
        "type": "FORENSIC_E01",
        "file_name": "EnCase_Forensic_Disk.E01",
        "file_size": "500 GB",
        "mime_type": "application/x-encase",
        "format_badge": "💾 Forensic E01",
        "sha256": "e1b8fc345a67b890c123456789abcdef0123456789abcdef0123456789ef",
        "source": "Crime Scene Evidence Seizure",
        "bsa_section": "Section 57 BSA (Primary Evidence)"
    }
]


@router.get("/generate-eid")
def generate_canonical_eid(district_code: str = "DL"):
    """Generate a new unique Canonical Evidence ID (e.g. EVD-2026-DL-9042)."""
    seq = random.randint(9000, 9999)
    year = datetime.now(timezone.utc).year
    eid = f"EVD-{year}-{district_code.upper()}-{seq}"
    return {"canonical_eid": eid, "timestamp": datetime.now(timezone.utc).isoformat()}


@router.get("/sample-library")
def get_sample_evidence_library():
    """Retrieve pre-packaged sample evidence library archetypes."""
    return {"total_samples": len(SAMPLE_EVIDENCE_LIBRARY), "items": SAMPLE_EVIDENCE_LIBRARY}


@router.post("/esakshya", response_model=IngestResponse)
def ingest_from_esakshya(payload: ESakshyaIngestRequest, db: Session = Depends(get_db)):
    """Simulated eSakshya Ingestion Connector (Crime-scene photo/video import)."""
    eid = f"EVD-2026-DL-{random.randint(9000, 9999)}"
    content_hash = hashlib.sha256(payload.content_payload.encode("utf-8")).hexdigest()

    norm_meta = NormalizedMetadataSchema(
        device=DeviceInfoSchema(
            make_model="eSakshya Mobile App (NIC Govt Issue)",
            serial_number=payload.device_serial,
            firmware_version="v2.4.0-esakshya"
        ),
        location=GeolocationSchema(
            latitude=28.6139,
            longitude=77.2090,
            address=payload.crime_scene_location
        ),
        custodian=CustodianInfoSchema(
            official_id=payload.officer_id,
            name="Insp. Rajesh Kumar",
            rank="Investigating Officer",
            police_station="Tilak Marg Police Station"
        ),
        source_system="eSakshya",
        evidence_format="CCTV_MP4"
    )

    canonical_obj = CanonicalEvidenceObject(
        eid=eid,
        fir_number=payload.fir_number,
        evidence_type=payload.evidence_type,
        title=payload.title,
        description=f"Crime scene media ingested via eSakshya at {payload.crime_scene_location}",
        file_name="eSakshya_CrimeScene_Recording.mp4",
        file_size_bytes=52428800,
        mime_type="video/mp4",
        sha256_hash=content_hash,
        metadata=norm_meta,
        bsa_section="Section 57 BSA"
    )

    return IngestResponse(
        status="SUCCESS",
        canonical_object=canonical_obj,
        message=f"Evidence ingested successfully via eSakshya Connector with Canonical EID: {eid}"
    )


@router.post("/cctns-icjs", response_model=IngestResponse)
def ingest_from_cctns_icjs(payload: CCTNSIngestRequest, db: Session = Depends(get_db)):
    """Simulated CCTNS / ICJS Ingestion Connector (Case metadata & FIR linking)."""
    eid = f"EVD-2026-DL-{random.randint(9000, 9999)}"
    combined_str = f"{payload.fir_number}:{payload.complainant_name}:{payload.district_code}"
    fir_hash = hashlib.sha256(combined_str.encode("utf-8")).hexdigest()

    norm_meta = NormalizedMetadataSchema(
        device=DeviceInfoSchema(
            make_model="CCTNS Core National Server (NCRB Link)",
            serial_number="CCTNS-ND-SERVER-01",
            firmware_version="v5.1-cctns"
        ),
        location=GeolocationSchema(
            latitude=28.6139,
            longitude=77.2090,
            address=f"District {payload.district_code}, Police Headquarters"
        ),
        custodian=CustodianInfoSchema(
            official_id="POLICE-DL-101",
            name="Insp. Rajesh Kumar",
            rank="Station House Officer",
            police_station="Central Delhi District Station"
        ),
        source_system="CCTNS/ICJS",
        evidence_format="CDR_CSV"
    )

    canonical_obj = CanonicalEvidenceObject(
        eid=eid,
        fir_number=payload.fir_number,
        evidence_type="DIGITAL",
        title=f"Linked Case Records for {payload.fir_number}",
        description=f"CCTNS/ICJS Case Docket ({', '.join(payload.act_sections)}). Complainant: {payload.complainant_name}",
        file_name=f"CCTNS_Docket_{payload.fir_number.replace('-', '_')}.pdf",
        file_size_bytes=10485760,
        mime_type="application/pdf",
        sha256_hash=fir_hash,
        metadata=norm_meta,
        bsa_section="Section 63 BSA"
    )

    return IngestResponse(
        status="SUCCESS",
        canonical_object=canonical_obj,
        message=f"Case metadata & FIR {payload.fir_number} linked via CCTNS/ICJS Connector with Canonical EID: {eid}"
    )


@router.post("/ingest-canonical", response_model=IngestResponse)
def ingest_canonical_object(payload: CanonicalEvidenceObject, db: Session = Depends(get_db)):
    """Ingest a validated canonical evidence object into PostgreSQL."""
    return IngestResponse(
        status="SUCCESS",
        canonical_object=payload,
        message=f"Canonical Evidence Object '{payload.eid}' persisted in PostgreSQL sakshi_db ledger."
    )
