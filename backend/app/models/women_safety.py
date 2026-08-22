import uuid
from datetime import datetime
from sqlalchemy import String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.models.base import Base, utc_now

class WomenSafetyRecord(Base):
    __tablename__ = "women_safety_records"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    ws_id: Mapped[str] = mapped_column(
        String(100), unique=True, index=True, nullable=False
    )
    district_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("districts.id"), nullable=False, index=True
    )
    caller_name: Mapped[str] = mapped_column(String(150), nullable=False)
    caller_phone: Mapped[str] = mapped_column(String(50), nullable=False)
    call_time: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False
    )
    call_location: Mapped[str] = mapped_column(Text, nullable=False)

    receiving_officer_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=False
    )
    dispatched_officer_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=True
    )
    vehicle_identifier: Mapped[str | None] = mapped_column(String(100), nullable=True)
    case_incharge_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id"), nullable=True
    )

    dispatch_time: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    arrival_time: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    fir_filed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    fir_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("firs.id"), nullable=True
    )
    case_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("cases.id"), nullable=True
    )

    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=utc_now, nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=utc_now, onupdate=utc_now, nullable=False
    )

    # Relationships
    district = relationship("District", back_populates="women_safety_records")
    receiving_officer = relationship("User", foreign_keys=[receiving_officer_id])
    dispatched_officer = relationship("User", foreign_keys=[dispatched_officer_id])
    case_incharge = relationship("User", foreign_keys=[case_incharge_id])
    fir = relationship("FIR", back_populates="women_safety_records")
    case = relationship("Case", back_populates="women_safety_records")
