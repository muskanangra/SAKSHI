from datetime import datetime, timezone
import uuid
from pydantic import BaseModel, Field

class DeviceInfoSchema(BaseModel):
    make_model: str = Field(..., example="Axon Body-Worn Camera 3")
    serial_number: str = Field(..., example="AXN-49201-DL-88")
    firmware_version: str | None = Field(default="v4.2.1-sec", example="v4.2.1-sec")

class GeolocationSchema(BaseModel):
    latitude: float = Field(..., example=28.6139)
    longitude: float = Field(..., example=77.2090)
    address: str = Field(..., example="Connaught Place, Central Delhi, Delhi 110001")

class CustodianInfoSchema(BaseModel):
    official_id: str = Field(..., example="POLICE-DL-101")
    name: str = Field(..., example="Insp. Rajesh Kumar")
    rank: str = Field(..., example="Station House Officer")
    police_station: str = Field(..., example="Tilak Marg Police Station")

class NormalizedMetadataSchema(BaseModel):
    device: DeviceInfoSchema
    location: GeolocationSchema
    custodian: CustodianInfoSchema
    capture_timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    ingestion_timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    source_system: str = Field(..., example="eSakshya")  # eSakshya / CCTNS / ICJS / DIRECT_SEIZURE
    evidence_format: str = Field(..., example="CCTV_MP4")  # CCTV_MP4 / CDR_CSV / UFDR_MOBILE / AUDIO_WAV / FORENSIC_E01

class CanonicalEvidenceObject(BaseModel):
    eid: str = Field(..., example="EVD-2026-DL-9042")
    case_id: str | None = None
    fir_number: str = Field(..., example="FIR-2026-DL-0042")
    evidence_type: str = Field(..., example="DIGITAL")  # DIGITAL / PHYSICAL
    title: str = Field(..., example="CCTV Footages of Intersection 4")
    description: str = Field(..., example="High-definition 1080p surveillance video stream")
    file_name: str = Field(..., example="CCTV_Zone4_Subway_Entry.mp4")
    file_size_bytes: int = Field(..., example=104857600)
    mime_type: str = Field(..., example="video/mp4")
    sha256_hash: str = Field(..., example="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")
    metadata: NormalizedMetadataSchema
    bsa_section: str = Field(default="Section 57 BSA", example="Section 57 BSA")

class ESakshyaIngestRequest(BaseModel):
    officer_id: str = Field(..., example="POLICE-DL-101")
    fir_number: str = Field(..., example="FIR-2026-DL-0042")
    crime_scene_location: str = Field(..., example="Sector 4, Central Delhi")
    evidence_type: str = Field(default="DIGITAL", example="DIGITAL")
    title: str = Field(..., example="Crime Scene Photos & Video Stream")
    device_serial: str = Field(default="AXN-49201-DL-88", example="AXN-49201-DL-88")
    content_payload: str = Field(..., example="BASE64_OR_TEXT_CONTENT")

class CCTNSIngestRequest(BaseModel):
    fir_number: str = Field(..., example="FIR-2026-DL-0042")
    act_sections: list[str] = Field(default=["BNS Section 303", "BNS Section 111"], example=["BNS Section 303"])
    district_code: str = Field(default="DST-DL-CENTRAL", example="DST-DL-CENTRAL")
    complainant_name: str = Field(default="Sh. Vikram Malhotra", example="Sh. Vikram Malhotra")
    incident_date: str = Field(default="2026-08-20", example="2026-08-20")

class IngestResponse(BaseModel):
    status: str = "SUCCESS"
    canonical_object: CanonicalEvidenceObject
    message: str
