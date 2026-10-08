```tsx
"use client";

import {
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import {
  CheckCircle2,
  ImageIcon,
  Info,
  Loader2,
  X,
} from "lucide-react";

import UploadBox from "@/components/UploadBox";

import {
  cn,
  formatFileSize,
} from "@/lib/utils";

interface ImageUploaderProps {
  file?: File | null;
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  className?: string;
}

export default function ImageUploader({
  file = null,
  onFileSelect,
  onFileRemove,
  disabled = false,
  loading = false,
  error,
  className,
}: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const [dimensions, setDimensions] =
    useState<{
      width: number;
      height: number;
    } | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      setDimensions(null);
      return;
    }

    const objectUrl =
      URL.createObjectURL(file);

    setPreviewUrl(objectUrl);

    const image = new window.Image();

    image.onload = () => {
      setDimensions({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };

    image.src = objectUrl;

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  function handleRemove() {
    onFileRemove?.();
  }

  return (
    <div className={cn("space-y-4", className)}>
      <UploadBox
        type="image"
        file={file}
        onFileSelect={onFileSelect}
        onFileRemove={handleRemove}
        disabled={disabled}
        loading={loading}
        error={error}
      />

      {file && previewUrl && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ImageIcon size={19} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {file.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {formatFileSize(file.size)}

                  {dimensions && (
                    <>
                      {" · "}
                      {dimensions.width} ×{" "}
                      {dimensions.height}px
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1.5 text-xs font-semibold text-emerald-600 sm:flex">
                <CheckCircle2 size={14} />
                Ready
              </div>

              {!disabled && !loading && (
                <button
                  type="button"
                  onClick={handleRemove}
                  aria-label="Remove image"
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={17} />
                </button>
              )}
            </div>
          </div>

          {/* Image preview */}
          <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-slate-100 p-4 sm:min-h-[320px]">
            <div className="relative max-h-[420px] w-full overflow-hidden rounded-xl bg-white shadow-sm">
              <Image
                src={previewUrl}
                alt={`Preview of ${file.name}`}
                width={1200}
                height={800}
                unoptimized
                className="mx-auto max-h-[420px] w-auto max-w-full object-contain"
              />

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                  <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-blue-700 shadow-lg">
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Preparing image...
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-slate-100 px-5 py-4">
            <div className="flex items-start gap-3">
              <CheckCircle2
                size={16}
                className="mt-0.5 shrink-0 text-emerald-500"
              />

              <div>
                <p className="text-xs font-semibold text-slate-700">
                  Image ready for verification
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  TruthLens can use the uploaded image as
                  input for its image and claim-analysis
                  pipeline.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
        <Info
          size={16}
          className="mt-0.5 shrink-0 text-slate-400"
        />

        <div>
          <p className="text-xs font-semibold text-slate-700">
            Image verification
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Upload an image containing a claim,
            screenshot, infographic, or other information
            you want TruthLens to analyze.
          </p>
        </div>
      </div>
    </div>
  );
}
```
