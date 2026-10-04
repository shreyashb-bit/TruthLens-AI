from sqlalchemy import Column, Integer, String
from backend.app.models.user import Base


class Verification(Base):
    __tablename__ = "verifications"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    verdict = Column(String, nullable=False)