from sqlalchemy import Column, Integer, String
from backend.app.models.user import Base


class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(Integer, primary_key=True, index=True)
    source = Column(String, nullable=False)
    content = Column(String, nullable=False)