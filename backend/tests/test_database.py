import pytest
import uuid
from datetime import datetime, timezone
from sqlalchemy.exc import IntegrityError
from app.models import (
    User, Role, District, Case, FIR, InvestigationRecord,
    Evidence, LegalRecord, Document, DocumentVersion, CaseTransfer,
    DocumentShare, AuditLog, SecurityAlert
)

def test_central_admin_null_district(db_session):
    """Central Admin can have NULL district_id."""
    central_role = db_session.query(Role).filter_by(name="CENTRAL_ADMIN").first()
    assert central_role is not None

    central_user = User(
        official_id=f"CENTRAL-TEST-{uuid.uuid4().hex[:6]}",
        full_name="Test Central Admin",
        email="central.test@sakshi.gov.in",
        password_hash="hash123",
        role_id=central_role.id,
        district_id=None
    )
    db_session.add(central_user)
    db_session.commit()

    assert central_user.district_id is None
    assert central_user.role.name == "CENTRAL_ADMIN"

def test_non_central_user_requires_district(db_session):
    """Non-Central Admin user requires district_id according to validation rule."""
    police_role = db_session.query(Role).filter_by(name="POLICE_OFFICER").first()
    assert police_role is not None

    invalid_user = User(
        official_id=f"POLICE-INVALID-{uuid.uuid4().hex[:6]}",
        full_name="Invalid Officer",
        password_hash="hash123",
        role=police_role,
        role_id=police_role.id,
        district_id=None
    )
    
    with pytest.raises(ValueError, match="must belong to a district"):
        invalid_user.validate_district_requirement()

def test_official_id_uniqueness(db_session):
    """official_id must be unique."""
    role = db_session.query(Role).first()
    district = db_session.query(District).first()

    unique_id = f"OFFICIAL-DUP-{uuid.uuid4().hex[:6]}"
    u1 = User(
        official_id=unique_id,
        full_name="User 1",
        password_hash="hash123",
        role_id=role.id,
        district_id=district.id
    )
    db_session.add(u1)
    db_session.commit()

    u2 = User(
        official_id=unique_id,
        full_name="User 2",
        password_hash="hash123",
        role_id=role.id,
        district_id=district.id
    )
    db_session.add(u2)
    with pytest.raises(IntegrityError):
        db_session.commit()
    db_session.rollback()

def test_case_and_fir_independence(db_session):
    """FIR can exist without Case, Case can exist without FIR."""
    district = db_session.query(District).first()
    user = db_session.query(User).filter(User.district_id != None).first()

    # 1. Standalone Case without FIR
    c_id = f"CASE-2026-{uuid.uuid4().hex[:6]}"
    standalone_case = Case(
        case_id=c_id,
        title="Standalone Fraud Case",
        district_id=district.id,
        created_by=user.id
    )
    db_session.add(standalone_case)
    db_session.commit()
    assert standalone_case.id is not None
    assert len(standalone_case.firs) == 0

    # 2. Standalone FIR without Case
    fir_code = f"FIR-2026-{uuid.uuid4().hex[:6]}"
    standalone_fir = FIR(
        fir_id=fir_code,
        case_id=None,
        district_id=district.id,
        created_by=user.id,
        police_station="Central PS",
        description="Reported incident"
    )
    db_session.add(standalone_fir)
    db_session.commit()
    assert standalone_fir.id is not None
    assert standalone_fir.case_id is None

def test_case_transfer_preserves_history(db_session):
    """Case transfer creates transfer record preserving history."""
    d1, d2 = db_session.query(District).limit(2).all()
    user = db_session.query(User).filter(User.district_id != None).first()

    c = Case(
        case_id=f"CASE-TR-{uuid.uuid4().hex[:6]}",
        title="Inter-District Case",
        district_id=d1.id,
        created_by=user.id
    )
    db_session.add(c)
    db_session.commit()

    # Transfer case from d1 to d2
    transfer = CaseTransfer(
        case_id=c.id,
        from_district_id=d1.id,
        to_district_id=d2.id,
        transferred_by=user.id,
        reason="Jurisdiction transfer"
    )
    c.district_id = d2.id
    db_session.add(transfer)
    db_session.commit()

    assert len(c.transfers) == 1
    assert c.transfers[0].from_district_id == d1.id
    assert c.transfers[0].to_district_id == d2.id
    assert c.district_id == d2.id

def test_document_versioning_and_uniqueness(db_session):
    """Document versions increment and enforce uniqueness per document."""
    district = db_session.query(District).first()
    user = db_session.query(User).filter(User.district_id != None).first()

    doc = Document(
        document_id=f"DOC-2026-{uuid.uuid4().hex[:6]}",
        district_id=district.id,
        created_by=user.id,
        document_type="INVESTIGATION_REPORT",
        title="Charge Sheet Draft",
        storage_key="s3://sakshi/docs/v1.pdf",
        mime_type="application/pdf",
        file_size=1024
    )
    db_session.add(doc)
    db_session.commit()

    v1 = DocumentVersion(
        document_id=doc.id,
        version_number=1,
        storage_key="s3://sakshi/docs/v1.pdf",
        file_hash="hash_sha256_v1",
        file_size=1024,
        mime_type="application/pdf",
        created_by=user.id
    )
    db_session.add(v1)
    db_session.commit()

    doc.current_version_id = v1.id
    db_session.commit()

    v2 = DocumentVersion(
        document_id=doc.id,
        version_number=2,
        storage_key="s3://sakshi/docs/v2.pdf",
        file_hash="hash_sha256_v2",
        file_size=2048,
        mime_type="application/pdf",
        created_by=user.id
    )
    db_session.add(v2)
    db_session.commit()

    assert len(doc.versions) == 2

    # Duplicate version 1 on same document should fail
    v1_dup = DocumentVersion(
        document_id=doc.id,
        version_number=1,
        storage_key="s3://sakshi/docs/v1_dup.pdf",
        file_hash="hash_dup",
        file_size=1024,
        mime_type="application/pdf",
        created_by=user.id
    )
    db_session.add(v1_dup)
    with pytest.raises(IntegrityError):
        db_session.commit()
    db_session.rollback()

def test_audit_log_hash_chain(db_session):
    """Audit log computes SHA-256 event hash and links previous hash."""
    user = db_session.query(User).first()
    
    event_id1 = uuid.uuid4()
    ts1 = datetime.now(timezone.utc).isoformat()
    h1 = AuditLog.compute_hash(
        event_id=str(event_id1),
        actor_user_id=str(user.id),
        action="CASE_VIEW",
        resource_type="case",
        resource_id="CASE-001",
        timestamp_str=ts1,
        previous_hash=None
    )

    log1 = AuditLog(
        event_id=event_id1,
        actor_user_id=user.id,
        action="CASE_VIEW",
        resource_type="case",
        resource_id="CASE-001",
        previous_hash=None,
        event_hash=h1
    )
    db_session.add(log1)
    db_session.commit()

    event_id2 = uuid.uuid4()
    ts2 = datetime.now(timezone.utc).isoformat()
    h2 = AuditLog.compute_hash(
        event_id=str(event_id2),
        actor_user_id=str(user.id),
        action="DOCUMENT_DOWNLOAD",
        resource_type="document",
        resource_id="DOC-001",
        timestamp_str=ts2,
        previous_hash=h1
    )

    log2 = AuditLog(
        event_id=event_id2,
        actor_user_id=user.id,
        action="DOCUMENT_DOWNLOAD",
        resource_type="document",
        resource_id="DOC-001",
        previous_hash=h1,
        event_hash=h2
    )
    db_session.add(log2)
    db_session.commit()

    assert log2.previous_hash == log1.event_hash
    assert len(log1.event_hash) == 64
