from fastapi import APIRouter

router = APIRouter()


@router.get("/verify")
def verify_news():
    return {"message": "News verification endpoint is working"}