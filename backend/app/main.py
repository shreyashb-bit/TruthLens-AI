from fastapi import FastAPI
from backend.app.api.verify import router as verify_router

app = FastAPI(title="TruthCheck API")

app.include_router(verify_router)


@app.get("/")
def root():
    return {"message": "TruthCheck API is running"}