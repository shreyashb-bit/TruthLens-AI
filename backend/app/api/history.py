from fastapi import APIRouter

router = APIRouter()


@router.get("/history")
def get_history():
    return {
        "message": "Verification history endpoint is working",
        "history": []
    }