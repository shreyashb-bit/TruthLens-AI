import os
import pytesseract
from PIL import Image


def extract_text_from_image(image_path):
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")

    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)

    return text