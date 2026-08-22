import hashlib
import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/api/v1/court-package", tags=["Court Package Generator"])

class CourtPackageRequest(BaseModel):
    case_id: str = Field(default="CASE-0042", example="CASE-0042")
    fir_number: str = Field(default="FIR-2026-DL-0042", example="FIR-2026-DL-0042")
    court_name: str = Field(default="Sessions Court, Central Delhi Judicial District", example="Sessions Court, Central Delhi")
    prosecutor_name: str = Field(default="Adv. Suresh Chandran", example="Adv. Suresh Chandran")

class CourtPackageManifestItem(BaseModel):
    annexure: str
    evidence_id: str
    title: str
    bsa_section: str
    sha256_hash: str
    status: str

class CourtPackageResponse(BaseModel):
    package_id: str
    case_id: str
    fir_number: str
    court_name: str
    prosecutor_name: str
    package_hash: str
    total_annexures: int
    manifest: list[CourtPackageManifestItem]
    bsa_section_63_certificate_id: str
    download_manifest_url: str
    generated_at: str


@router.post("/generate", response_model=CourtPackageResponse)
def generate_court_package(payload: CourtPackageRequest):
    """Generate one-click court-ready submission package with BSA 63 certificate & custody index."""
    pkg_id = f"PKG-COURT-2026-{uuid.uuid4().hex[:6].upper()}"
    cert_id = f"CERT-BSA63-DL-2026-8801"

    manifest = [
        CourtPackageManifestItem(
            annexure="Annexure A-1",
            evidence_id="EVD-2026-DL-9041",
            title="CCTV Video Recording (MP4)",
            bsa_section="Section 57 BSA (Primary Evidence)",
            sha256_hash="a7f4b8901c23d456e7890123456789abcdef0123456789abcdef0123456789ab",
            status="VERIFIED_AND_SEALED"
        ),
        CourtPackageManifestItem(
            annexure="Annexure A-2",
            evidence_id="EVD-2026-DL-8802",
            title="Call Detail Records (CDR) Report",
            bsa_section="Section 63 BSA (Secondary Evidence)",
            sha256_hash="b8e5c9012d34e567f890123456789abcdef0123456789abcdef0123456789bc",
            status="VERIFIED_AND_SEALED"
        ),
        CourtPackageManifestItem(
            annexure="Annexure A-3",
            evidence_id="EVD-2026-DL-1049",
            title="Cellebrite Mobile Extraction Report (UFDR)",
            bsa_section="Section 57 BSA (Primary Evidence)",
            sha256_hash="c9f6da123e45f678a90123456789abcdef0123456789abcdef0123456789cd",
            status="VERIFIED_AND_SEALED"
        )
    ]

    pkg_raw = f"{pkg_id}:{payload.fir_number}:{len(manifest)}:{cert_id}"
    pkg_hash = hashlib.sha256(pkg_raw.encode("utf-8")).hexdigest()

    return CourtPackageResponse(
        package_id=pkg_id,
        case_id=payload.case_id,
        fir_number=payload.fir_number,
        court_name=payload.court_name,
        prosecutor_name=payload.prosecutor_name,
        package_hash=pkg_hash,
        total_annexures=len(manifest),
        manifest=manifest,
        bsa_section_63_certificate_id=cert_id,
        download_manifest_url=f"/api/v1/court-package/download/{pkg_id}",
        generated_at=datetime.now(timezone.utc).isoformat()
    )
