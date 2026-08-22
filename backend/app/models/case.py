import uuid
from datetime import datetime
from sqlalchemy import String, Text, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base, utc_now

class Case(Base):
    __tablename__ = "cases"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    case_id: Mapped[str] = mapped_column(
        String(100), unique=True, index=True, nullable=False
    )
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    district_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("districts.id"), nullable=False, index=True
    )
    created_by: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=False
    )
    assigned_officer_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=True
    )

    status: Mapped[str] = mapped_column(
        String(50), default="OPEN", nullable=False, index=True
    )
    priority: Mapped[str] = mapped_column(String(50), default="MEDIUM", nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=utc_now, nullable=False, index=True
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=utc_now, onupdate=utc_now, nullable=False
    )
    closed_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    # Relationships
    district = relationship("District", back_populates="cases")
    creator = relationship("User", foreign_keys=[created_by])
    assigned_officer = relationship("User", foreign_keys=[assigned_officer_id])

    transfers = relationship("CaseTransfer", back_populates="case", cascade="all, delete-orphan")
    firs = relationship("FIR", back_populates="case")
    investigation_records = relationship("InvestigationRecord", back_populates="case")
    evidence_items = relationship("Evidence", back_populates="case")
    legal_records = relationship("LegalRecord", back_populates="case")
    documents = relationship("Document", back_populates="case")
    women_safety_records = relationship("WomenSafetyRecord", back_populates="case")
