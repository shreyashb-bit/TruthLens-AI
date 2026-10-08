from app.extraction.webpage import extract_webpage


def test_webpage():
    url = "https://en.wikipedia.org/wiki/Artificial_intelligence"

    result = extract_webpage(url)

    assert isinstance(result, dict)
    assert "title" in result
    assert "publisher" in result
    assert "date" in result
    assert "text" in result
    assert len(result["text"]) > 0