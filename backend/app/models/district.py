import uuid
from datetime import datetime
from sqlalchemy import String, Text, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base, utc_now

class District(Base):
    __tablename__ = "districts"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    district_code: Mapped[str] = mapped_column(
        String(50), unique=True, index=True, nullable=False
    )
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    state: Mapped[str] = mapped_column(String(100), nullable=False, default="Delhi")
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=utc_now, nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=utc_now, onupdate=utc_now, nullable=False
    )

    # Relationships
    users = relationship("User", back_populates="district")
    cases = relationship("Case", back_populates="district")
    firs = relationship("FIR", back_populates="district")
    investigation_records = relationship("InvestigationRecord", back_populates="district")
    evidence_items = relationship("Evidence", back_populates="district")
    legal_records = relationship("LegalRecord", back_populates="district")
    documents = relationship("Document", back_populates="district")
    women_safety_records = relationship("WomenSafetyRecord", back_populates="district")
    security_alerts = relationship("SecurityAlert", back_populates="district")
