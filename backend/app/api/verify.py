from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.config import get_db
from backend.app.models.verification import Verification
from backend.app.schemas.verification import VerificationRequest

router = APIRouter()


@router.post("/verify")
def verify_news(
    request: VerificationRequest,
    db: Session = Depends(get_db)
):
    try:
        verification = Verification(
            text=request.text,
            verdict="pending"
        )

        db.add(verification)
        db.commit()
        db.refresh(verification)

        return {
            "id": verification.id,
            "text": verification.text,
            "verdict": verification.verdict
        }

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Failed to save verification"
        )
