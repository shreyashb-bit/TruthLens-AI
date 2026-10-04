from fastapi import FastAPI

app = FastAPI(title="TruthCheck API")


@app.get("/")
def root():
    return {"message": "TruthCheck API is running"}