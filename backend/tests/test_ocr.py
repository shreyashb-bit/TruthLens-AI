from PIL import Image, ImageDraw
from app.extraction.ocr import extract_text_from_image


def test_ocr(tmp_path):
    image_path = tmp_path / "test.png"

    image = Image.new("RGB", (500, 100), "white")
    draw = ImageDraw.Draw(image)
    draw.text((20, 30), "TruthLens Test", fill="black")
    image.save(image_path)

    text = extract_text_from_image(str(image_path))

    assert isinstance(text, str)
    assert len(text) > 0