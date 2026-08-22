from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID

class LoginRequest(BaseModel):
    official_id: str
    password: str

class SignupRequest(BaseModel):
    official_id: str
    password: str
    full_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    role_name: str
    district_code: Optional[str] = None

class UserProfileResponse(BaseModel):
    id: UUID
    official_id: str
    full_name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    role_name: str
    role_title: str
    district_id: Optional[UUID] = None
    district_code: Optional[str] = None
    district_name: Optional[str] = None
    is_active: bool

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserProfileResponse
