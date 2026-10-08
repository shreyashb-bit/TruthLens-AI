```tsx
"use client";

import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  File,
  FileAudio,
  FileImage,
  FileText,
  Loader2,
  UploadCloud,
  X,
} from "lucide-react";

import {
  ACCEPTED_FILE_TYPES,
} from "@/lib/constants";

import {
  cn,
  formatFileSize,
  validateFile,
} from "@/lib/utils";

type UploadType = "pdf" | "image" | "voice";

interface UploadBoxProps {
  type: UploadType;
  file?: File | null;
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  className?: string;
}

const CONFIG = {
  pdf: {
    title: "Upload a PDF",
    description:
      "Drag and drop your PDF here, or browse your files.",
    formats: "PDF",
    icon: FileText,
    colorClass:
      "bg-red-50 text-red-600 border-red-100",
  },

  image: {
    title: "Upload an image",
    description:
      "Drag and drop an image here, or browse your files.",
    formats: "JPG, PNG, WEBP",
    icon: FileImage,
    colorClass:
      "bg-blue-50 text-blue-600 border-blue-100",
  },

  voice: {
    title: "Upload an audio file",
    description:
      "Drag and drop your audio here, or browse your files.",
    formats: "MP3, WAV, M4A, OGG, WEBM",
    icon: FileAudio,
    colorClass:
      "bg-purple-50 text-purple-600 border-purple-100",
  },
} as const;

export default function UploadBox({
  type,
  file,
  onFileSelect,
  onFileRemove,
  disabled = false,
  loading = false,
  error,
  className,
}: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] =
    useState(false);

  const config = CONFIG[type];
  const Icon = config.icon;

  const accept =
    ACCEPTED_FILE_TYPES[type].extensions.join(",");

  function handleFile(fileToValidate: File) {
    const validationError = validateFile(
      fileToValidate,
      type,
    );

    if (validationError) {
      return;
    }

    onFileSelect(fileToValidate);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    handleFile(selectedFile);

    // Reset the input so the same file can be selected again.
    event.target.value = "";
  }

  function handleDragOver(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();

    if (disabled || loading) {
      return;
    }

    setIsDragging(true);
  }

  function handleDragLeave(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();

    setIsDragging(false);
  }

  function handleDrop(
    event: DragEvent<HTMLDivElement>,
  ) {
    event.preventDefault();

    setIsDragging(false);

    if (disabled || loading) {
      return;
    }

    const droppedFile =
      event.dataTransfer.files?.[0];

    if (!droppedFile) {
      return;
    }

    handleFile(droppedFile);
  }

  function handleBrowse() {
    if (disabled || loading) {
      return;
    }

    inputRef.current?.click();
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>,
  ) {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      handleBrowse();
    }
  }

  if (file) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-slate-200 bg-white p-5",
          className,
        )}
      >
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border",
              config.colorClass,
            )}
          >
            <Icon size={22} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              {file.name}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {formatFileSize(file.size)}
            </p>

            {loading && (
              <div className="mt-3 flex items-center gap-2 text-xs font-medium text-blue-600">
                <Loader2
                  size={14}
                  className="animate-spin"
                />
                Preparing file...
              </div>
            )}

            {!loading && (
              <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                <CheckCircle2 size={14} />
                File ready for verification
              </div>
            )}
          </div>

          {!disabled && !loading && (
            <button
              type="button"
              onClick={onFileRemove}
              aria-label={`Remove ${file.name}`}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled || loading}
      />

      <div
        role="button"
        tabIndex={
          disabled || loading ? -1 : 0
        }
        aria-label={config.title}
        onClick={handleBrowse}
        onKeyDown={handleKeyDown}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "group cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-200 bg-slate-50/70 hover:border-blue-300 hover:bg-blue-50/40",
          disabled &&
            "cursor-not-allowed opacity-60",
          loading &&
            "cursor-wait opacity-70",
        )}
      >
        <div
          className={cn(
            "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border transition",
            config.colorClass,
            "group-hover:scale-105",
          )}
        >
          {loading ? (
            <Loader2
              size={25}
              className="animate-spin"
            />
          ) : isDragging ? (
            <UploadCloud
              size={25}
              className="text-blue-600"
            />
          ) : (
            <Icon size={25} />
          )}
        </div>

        <h3 className="mt-5 text-sm font-bold text-slate-900">
          {isDragging
            ? "Drop your file here"
            : config.title}
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          {config.description}
        </p>

        <span className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition group-hover:border-blue-200 group-hover:text-blue-600">
          <UploadCloud size={16} />
          Browse files
        </span>

        <p className="mt-4 text-xs text-slate-400">
          Supported: {config.formats} · Max{" "}
          {ACCEPTED_FILE_TYPES[type].maxSizeMB} MB
        </p>
      </div>

      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle
            size={17}
            className="mt-0.5 shrink-0"
          />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
```
