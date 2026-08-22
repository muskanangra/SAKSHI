from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from datetime import datetime, timezone
import uuid

from app.core.database import get_db
from app.core.security import verify_password, hash_password, create_access_token, decode_access_token
from app.models import User, Role, District
from app.schemas.auth import LoginRequest, SignupRequest, TokenResponse, UserProfileResponse

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])

ROLE_TITLE_MAP = {
    "CENTRAL_ADMIN": "Director General (National Crime & Judicial Coordination)",
    "DISTRICT_ADMIN": "Deputy Commissioner of Police (District Operations)",
    "POLICE_OFFICER": "Station House & Senior Police Officer",
    "INVESTIGATION_OFFICER": "Senior Investigating Officer",
    "EVIDENCE_OFFICER": "Chief Forensic Scientist & Malkhana Custodian",
    "LEGAL_OFFICER": "Special Public Prosecutor",
    "WOMEN_SAFETY_OFFICER": "Helpline & Rapid Response Record In-Charge",
}

def build_user_response(user: User) -> UserProfileResponse:
    r_name = user.role.name if user.role else "UNKNOWN"
    d_code = user.district.district_code if user.district else None
    d_name = user.district.name if user.district else None

    return UserProfileResponse(
        id=user.id,
        official_id=user.official_id,
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
        role_name=r_name,
        role_title=ROLE_TITLE_MAP.get(r_name, r_name),
        district_id=user.district_id,
        district_code=d_code,
        district_name=d_name,
        is_active=user.is_active
    )

@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    """Authenticate user with official ID and password."""
    user = db.query(User).filter(User.official_id == payload.official_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Official ID or Password"
        )
    
    if not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Official ID or Password"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive. Contact Central Admin."
        )

    # Generate token first
    token = create_access_token(data={"sub": str(user.id), "official_id": user.official_id, "role": user.role.name})
    user_response = build_user_response(user)

    # Optional background/safe update of last_login_at without blocking auth response
    try:
        user.last_login_at = datetime.now(timezone.utc)
        db.commit()
    except Exception:
        db.rollback()

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=user_response
    )

@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    """Register a new official officer user."""
    existing = db.query(User).filter(User.official_id == payload.official_id).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Official ID '{payload.official_id}' already registered."
        )
    
    role = db.query(Role).filter(Role.name == payload.role_name).first()
    if not role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Role '{payload.role_name}' does not exist."
        )
    
    district = None
    if payload.district_code:
        district = db.query(District).filter(District.district_code == payload.district_code).first()
        if not district:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"District code '{payload.district_code}' does not exist."
            )
    
    if role.name != "CENTRAL_ADMIN" and not district:
        # Fallback default district to Central Delhi if not specified
        district = db.query(District).filter(District.district_code == "DST-DL-CENTRAL").first()

    new_user = User(
        official_id=payload.official_id,
        password_hash=hash_password(payload.password),
        full_name=payload.full_name,
        email=payload.email,
        phone=payload.phone,
        role_id=role.id,
        district_id=district.id if district else None,
        is_active=True,
        is_verified=True,
        otp_enabled=True
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token(data={"sub": str(new_user.id), "official_id": new_user.official_id, "role": role.name})
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=build_user_response(new_user)
    )

@router.get("/me", response_model=UserProfileResponse)
def get_current_user(authorization: str = Header(...), db: Session = Depends(get_db)):
    """Fetch current user profile from Bearer token."""
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token header format")
    
    token = authorization.split(" ")[1]
    payload = decode_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired or invalid")
    
    user = db.query(User).filter(User.id == uuid.UUID(payload["sub"])).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    return build_user_response(user)
