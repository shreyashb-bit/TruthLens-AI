from pypdf import PdfWriter
from app.extraction.pdf import extract_text_from_pdf


def test_pdf(tmp_path):
    pdf_path = tmp_path / "test.pdf"

    writer = PdfWriter()
    writer.add_blank_page(width=300, height=300)

    with open(pdf_path, "wb") as file:
        writer.write(file)

    text = extract_text_from_pdf(str(pdf_path))

    assert isinstance(text, str)