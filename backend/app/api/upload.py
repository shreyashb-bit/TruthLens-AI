from fastapi import APIRouter, UploadFile, File, HTTPException

router = APIRouter()

ALLOWED_EXTENSIONS = {
    ".txt",
    ".pdf",
    ".jpg",
    ".jpeg",
    ".png",
    ".mp4",
    ".wav",
    ".mp3"
}


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file selected"
        )

    file_extension = "." + file.filename.split(".")[-1].lower()

    if file_extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="File type not supported"
        )

    return {
        "filename": file.filename,
        "file_type": file_extension,
        "message": "File uploaded successfully"
    }