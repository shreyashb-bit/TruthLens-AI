from pydantic import BaseModel


class VerificationRequest(BaseModel):
    text: str


class VerificationResponse(BaseModel):
    message: str
    verdict: str