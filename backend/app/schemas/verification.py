from pydantic import BaseModel


class VerificationRequest(BaseModel):
    text: str


class VerificationResponse(BaseModel):
    id: int
    text: str
    verdict: str