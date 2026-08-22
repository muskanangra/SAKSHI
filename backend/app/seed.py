import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models import (
    District, Role, Permission, User
)

def seed_db(db: Session):
    print("🌱 Starting SAKSHI Database Seed Process...")

    # 1. Seed Roles
    roles_data = [
        ("CENTRAL_ADMIN", "Central System Administrator with system-wide oversight."),
        ("DISTRICT_ADMIN", "District Administrator with district security and management authority."),
        ("POLICE_OFFICER", "Police Officer handling FIR filing and initial response."),
        ("INVESTIGATION_OFFICER", "Investigating Officer handling case evidence and reports."),
        ("EVIDENCE_OFFICER", "Evidence Officer managing physical and digital evidence custody."),
        ("LEGAL_OFFICER", "Legal Officer filing court documents and legal reports."),
        ("WOMEN_SAFETY_OFFICER", "Specialized Officer managing Women Safety records."),
    ]
    
    role_map = {}
    for name, desc in roles_data:
        role = db.query(Role).filter_by(name=name).first()
        if not role:
            role = Role(name=name, description=desc, is_system_role=True)
            db.add(role)
            db.flush()
        role_map[name] = role
    print("  ✓ Roles seeded.")

    # 2. Seed Permissions
    permissions_data = [
        ("CASE_CREATE", "Create new case records", "case", "create"),
        ("CASE_VIEW", "View case details", "case", "view"),
        ("CASE_UPDATE", "Update case information", "case", "update"),
        ("CASE_TRANSFER", "Transfer case between districts", "case", "transfer"),
        ("FIR_CREATE", "File First Information Reports", "fir", "create"),
        ("FIR_VIEW", "View First Information Reports", "fir", "view"),
        ("DOCUMENT_CREATE", "Upload document metadata", "document", "create"),
        ("DOCUMENT_VIEW", "View document metadata", "document", "view"),
        ("DOCUMENT_DOWNLOAD", "Download document content", "document", "download"),
        ("DOCUMENT_VERSION_CREATE", "Create document version", "document", "version_create"),
        ("DOCUMENT_FINALIZE", "Mark document as finalized", "document", "finalize"),
        ("DOCUMENT_APPROVE", "Approve document changes", "document", "approve"),
        ("EVIDENCE_CREATE", "Register new evidence item", "evidence", "create"),
        ("EVIDENCE_VIEW", "View evidence and chain of custody", "evidence", "view"),
        ("LEGAL_CREATE", "File legal records and court submissions", "legal", "create"),
        ("WOMEN_SAFETY_CREATE", "Create Women Safety records", "women_safety", "create"),
        ("AUDIT_VIEW", "View system audit logs", "audit", "view"),
        ("SECURITY_ALERT_VIEW", "View security alerts", "security", "view"),
        ("SECURITY_ALERT_ESCALATE", "Escalate security alerts to Central Admin", "security", "escalate"),
        ("USER_CREATE", "Create system user accounts", "user", "create"),
        ("USER_MANAGE", "Manage user roles and permissions", "user", "manage"),
    ]

    perm_map = {}
    for name, desc, resource, action in permissions_data:
        perm = db.query(Permission).filter_by(name=name).first()
        if not perm:
            perm = Permission(name=name, description=desc, resource=resource, action=action)
            db.add(perm)
            db.flush()
        perm_map[name] = perm
    print("  ✓ Permissions seeded.")

    central_admin_role = role_map["CENTRAL_ADMIN"]
    all_perms = list(perm_map.values())
    for p in all_perms:
        if p not in central_admin_role.permissions:
            central_admin_role.permissions.append(p)
    print("  ✓ Role-Permission mappings assigned.")

    # 3. Seed Districts
    districts_data = [
        ("DST-DL-CENTRAL", "Central Delhi District", "Delhi", "Central Capital Jurisdiction"),
        ("DST-DL-SOUTH", "South Delhi District", "Delhi", "South Capital Jurisdiction"),
        ("DST-MH-MUMBAI", "Mumbai City District", "Maharashtra", "Financial Capital Jurisdiction"),
    ]

    district_map = {}
    for code, name, state, desc in districts_data:
        dist = db.query(District).filter_by(district_code=code).first()
        if not dist:
            dist = District(district_code=code, name=name, state=state, description=desc)
            db.add(dist)
            db.flush()
        district_map[code] = dist
    print("  ✓ Districts seeded.")

    # 4. Seed 7 Officer Test Accounts
    default_password_hash = hash_password("Sakshi@2026")
    users_data = [
        # (official_id, name, email, phone, role_name, district_code_or_None)
        ("CENTRAL-001", "Dr. Ananya Sundaram, IPS", "central.admin@sakshi.gov.in", "+919876543210", "CENTRAL_ADMIN", None),
        ("ADMIN-DL-01", "Sh. Rajeshwar Verma, IPS", "admin.centraldelhi@sakshi.gov.in", "+919876543211", "DISTRICT_ADMIN", "DST-DL-CENTRAL"),
        ("POLICE-DL-101", "Insp. Rajesh Kumar", "rajesh.kumar@sakshi.gov.in", "+919876543213", "POLICE_OFFICER", "DST-DL-CENTRAL"),
        ("INVESTIGATOR-DL-201", "Insp. Vikram Pratap Singh", "ananya.sen@sakshi.gov.in", "+919876543214", "INVESTIGATION_OFFICER", "DST-DL-CENTRAL"),
        ("EVIDENCE-DL-301", "Dr. Sameer Kulkarni", "suresh.nair@sakshi.gov.in", "+919876543215", "EVIDENCE_OFFICER", "DST-DL-CENTRAL"),
        ("LEGAL-DL-401", "Adv. Suresh Chandran", "meenakshi.s@sakshi.gov.in", "+919876543216", "LEGAL_OFFICER", "DST-DL-CENTRAL"),
        ("SAFETY-DL-501", "SI Meenakshi Sharma", "kavita.gupta@sakshi.gov.in", "+919876543217", "WOMEN_SAFETY_OFFICER", "DST-DL-CENTRAL"),
    ]

    for off_id, name, email, phone, r_name, d_code in users_data:
        usr = db.query(User).filter_by(official_id=off_id).first()
        if not usr:
            usr = User(
                official_id=off_id,
                full_name=name,
                email=email,
                phone=phone,
                password_hash=default_password_hash,
                role_id=role_map[r_name].id,
                district_id=district_map[d_code].id if d_code else None,
                is_active=True,
                is_verified=True,
                otp_enabled=True
            )
            db.add(usr)
        else:
            usr.password_hash = default_password_hash
            usr.full_name = name
        db.flush()
    print("  ✓ 7 Officer test accounts seeded/updated with bcrypt hashes.")

    db.commit()
    print("🎉 SAKSHI Database Seed Completed Successfully!")

if __name__ == "__main__":
    db = SessionLocal()
    try:
        seed_db(db)
    finally:
        db.close()
