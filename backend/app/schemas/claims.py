from pydantic import BaseModel


class Claim(BaseModel):
    claim: str
    verdict: str
    confidence: float