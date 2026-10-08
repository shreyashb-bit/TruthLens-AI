# TruthLens-AI Architecture

## Overview

TruthLens-AI is a multimodal misinformation verification system. It accepts information from different sources such as images, PDFs, audio files, and webpages.

## Multimodal Extraction Layer

The extraction layer converts different input formats into text that can be processed by the verification system.

### 1. Image / Screenshot
`ocr.py`

Uses Tesseract OCR to extract text from images and screenshots.

### 2. PDF
`pdf.py`

Extracts text from PDF documents using PyPDF.

### 3. Audio
`audio.py`

Uses Faster-Whisper to convert speech from audio files into text.

### 4. Webpage
`webpage.py`

Extracts webpage title, publisher, publication date, and main text.

## Processing Flow

User Input → Multimodal Extraction → Extracted Text → Claim Verification → Evidence / Result

## Project Files

- `backend/app/extraction/ocr.py`
- `backend/app/extraction/pdf.py`
- `backend/app/extraction/audio.py`
- `backend/app/extraction/webpage.py`
- `backend/tests/`
- `data/sample_claims/`
- `data/sample_documents/`
