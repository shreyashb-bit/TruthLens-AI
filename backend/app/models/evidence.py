from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from backend.app.models.user import Base


class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(Integer, primary_key=True, index=True)
    source = Column(String, nullable=False)
    content = Column(String, nullable=False)

    verification_id = Column(
        Integer,
        ForeignKey("verifications.id"),
        nullable=False
    )

    verification = relationship("Verification")