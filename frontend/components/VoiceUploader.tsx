```tsx
"use client";

import {
  useEffect,
  useState,
} from "react";
import {
  AudioLines,
  CheckCircle2,
  FileAudio,
  Info,
  Loader2,
  Play,
  Pause,
  X,
} from "lucide-react";

import UploadBox from "@/components/UploadBox";
import {
  cn,
  formatFileSize,
} from "@/lib/utils";

interface VoiceUploaderProps {
  file?: File | null;
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  className?: string;
}

export default function VoiceUploader({
  file = null,
  onFileSelect,
  onFileRemove,
  disabled = false,
  loading = false,
  error,
  className,
}: VoiceUploaderProps) {
  const [audioUrl, setAudioUrl] =
    useState<string | null>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [duration, setDuration] =
    useState<number | null>(null);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [audioElement, setAudioElement] =
    useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!file) {
      setAudioUrl(null);
      setDuration(null);
      setCurrentTime(0);
      setIsPlaying(false);
      return;
    }

    const objectUrl =
      URL.createObjectURL(file);

    setAudioUrl(objectUrl);

    const audio = new Audio(objectUrl);

    setAudioElement(audio);

    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata,
    );

    audio.addEventListener(
      "timeupdate",
      handleTimeUpdate,
    );

    audio.addEventListener(
      "ended",
      handleEnded,
    );

    return () => {
      audio.pause();

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata,
      );

      audio.removeEventListener(
        "timeupdate",
        handleTimeUpdate,
      );

      audio.removeEventListener(
        "ended",
        handleEnded,
      );

      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  function togglePlayback() {
    if (!audioElement || disabled || loading) {
      return;
    }

    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
      return;
    }

    void audioElement.play().then(() => {
      setIsPlaying(true);
    });
  }

  function handleRemove() {
    audioElement?.pause();
    setIsPlaying(false);
    setCurrentTime(0);

    onFileRemove?.();
  }

  function formatDuration(seconds: number | null) {
    if (
      seconds === null ||
      !Number.isFinite(seconds)
    ) {
      return "--:--";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds =
      Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  function handleSeek(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    if (!audioElement || !duration) {
      return;
    }

    const nextTime =
      Number(event.target.value);

    audioElement.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  return (
    <div className={cn("space-y-4", className)}>
      <UploadBox
        type="voice"
        file={file}
        onFileSelect={onFileSelect}
        onFileRemove={handleRemove}
        disabled={disabled}
        loading={loading}
        error={error}
      />

      {file && audioUrl && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <AudioLines size={20} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {file.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatFileSize(file.size)}
                    {" · "}
                    {formatDuration(duration)}
                  </p>
                </div>

                <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600 sm:mt-0">
                  <CheckCircle2 size={14} />
                  Audio ready
                </div>
              </div>

              {/* Player */}
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={togglePlayback}
                  disabled={
                    disabled || loading
                  }
                  aria-label={
                    isPlaying
                      ? "Pause audio"
                      : "Play audio"
                  }
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white shadow-sm transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isPlaying ? (
                    <Pause
                      size={17}
                      fill="currentColor"
                    />
                  ) : (
                    <Play
                      size={17}
                      fill="currentColor"
                    />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={currentTime}
                    onChange={handleSeek}
                    disabled={
                      !duration ||
                      disabled ||
                      loading
                    }
                    aria-label="Audio progress"
                    className="h-1.5 w-full cursor-pointer accent-purple-600 disabled:cursor-not-allowed"
                  />

                  <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                    <span>
                      {formatDuration(
                        currentTime,
                      )}
                    </span>

                    <span>
                      {formatDuration(duration)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {!disabled && !loading && (
              <button
                type="button"
                onClick={handleRemove}
                aria-label="Remove audio file"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={17} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Voice verification information */}
      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <Info
          size={16}
          className="mt-0.5 shrink-0 text-slate-400"
        />

        <div>
          <p className="text-xs font-semibold text-slate-700">
            Voice verification
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            TruthLens will use the uploaded audio as the
            input for its speech and claim-analysis
            pipeline. Clear speech generally produces
            better transcription results.
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs font-medium text-blue-700">
          <Loader2
            size={15}
            className="animate-spin"
          />
          Preparing your audio for verification...
        </div>
      )}
    </div>
  );
}
```
