# TruthLens-AI Setup Guide

## Requirements

- Python 3.13
- Tesseract OCR
- Git
- Internet connection

## Virtual Environment

Create the virtual environment:

python3.13 -m venv .venv

Activate it:

source .venv/bin/activate

## Install Dependencies

pip install pytesseract Pillow pypdf faster-whisper==1.1.1 av==18.1.0 requests beautifulsoup4 pytest

## Run Tests

From the backend folder:

pytest

All extraction module tests should pass successfully.

## Extraction Modules

- Image OCR
- PDF text extraction
- Audio transcription
- Webpage extraction
