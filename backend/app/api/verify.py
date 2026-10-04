from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.config import get_db
from backend.app.models.verification import Verification
from backend.app.schemas.verification import (
    VerificationRequest,
    VerificationResponse
)

router = APIRouter()


def run_verification(text: str) -> str:
    """
    Temporary verification function.

    Later, this will be connected to
    Person 3's actual AI verification engine.
    """
    return "pending"


@router.post("/verify", response_model=VerificationResponse)
def verify_news(
    request: VerificationRequest,
    db: Session = Depends(get_db)
):
    try:
        # Check if news text is empty
        if not request.text.strip():
            raise HTTPException(
                status_code=400,
                detail="News text cannot be empty"
            )

        # Check minimum text length
        if len(request.text.strip()) < 10:
            raise HTTPException(
                status_code=400,
                detail="News text must contain at least 10 characters"
            )

        # Send news text to verification engine
        verdict = run_verification(request.text)

        # Save verification result in database
        verification = Verification(
            text=request.text,
            verdict=verdict
        )

        db.add(verification)
        db.commit()
        db.refresh(verification)

        return {
            "id": verification.id,
            "text": verification.text,
            "verdict": verification.verdict
        }

    except HTTPException:
        raise

    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail="Failed to process verification"
        )