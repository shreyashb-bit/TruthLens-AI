from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from backend.app.models.user import Base


class Verification(Base):
    __tablename__ = "verifications"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    verdict = Column(String, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    user = relationship("User")