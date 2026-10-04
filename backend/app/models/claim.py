from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from backend.app.models.user import Base


class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    claim = Column(String, nullable=False)
    verdict = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)

    verification_id = Column(
        Integer,
        ForeignKey("verifications.id"),
        nullable=False
    )

    verification = relationship("Verification")