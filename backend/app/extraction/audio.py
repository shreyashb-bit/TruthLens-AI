from faster_whisper import WhisperModel


model = WhisperModel("base")


def extract_text_from_audio(audio_path):
    segments, info = model.transcribe(audio_path)

    text = ""

    for segment in segments:
        text += segment.text + " "

    return text.strip()