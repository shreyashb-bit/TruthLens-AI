from app.extraction.audio import extract_text_from_audio


def test_audio():
    audio_path = "tests/sample_audio.m4a"

    text = extract_text_from_audio(audio_path)

    assert isinstance(text, str)
    assert len(text) > 0