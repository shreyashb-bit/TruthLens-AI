# TruthLens-AI API Documentation

## Multimodal Extraction Modules

The extraction layer provides functions for converting different input types into text.

### OCR

File:
`backend/app/extraction/ocr.py`

Function:
`extract_text_from_image(image_path)`

Input:
- Path to an image or screenshot.

Output:
- Extracted text as a string.

### PDF

File:
`backend/app/extraction/pdf.py`

Function:
`extract_text_from_pdf(pdf_path)`

Input:
- Path to a PDF file.

Output:
- Extracted PDF text as a string.

### Audio

File:
`backend/app/extraction/audio.py`

Function:
`extract_text_from_audio(audio_path)`

Input:
- Path to an audio file.

Output:
- Transcribed speech as a string.

### Webpage

File:
`backend/app/extraction/webpage.py`

Function:
`extract_webpage(url)`

Input:
- Webpage URL.

Output:
- Dictionary containing:
  - `title`
  - `publisher`
  - `date`
  - `text`

## Testing

Extraction modules are tested using Pytest in:

`backend/tests/`
