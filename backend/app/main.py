from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from backend.app.api.verify import router as verify_router
from backend.app.api.health import router as health_router
from backend.app.api.upload import router as upload_router
from backend.app.api.history import router as history_router

app = FastAPI(title="TruthCheck API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(verify_router)
app.include_router(health_router)
app.include_router(upload_router)
app.include_router(history_router)


@app.get("/")
def root():
    return {"message": "TruthCheck API is running"}