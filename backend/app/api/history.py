from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config import get_db
from app.models.verification import Verification

router = APIRouter()


@router.get("/history")
def get_history(db: Session = Depends(get_db)):
    records = (
        db.query(Verification)
        .order_by(Verification.id.desc())
        .all()
    )

    return {
        "history": [
            {
                "id": record.id,
                "text": record.text,
                "verdict": record.verdict
            }
            for record in records
        ]
    }