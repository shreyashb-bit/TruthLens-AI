```tsx id="d4kz8p"
"use client";

import {
  useEffect,
  useState,
} from "react";
import {
  CheckCircle2,
  FileCheck2,
  FileText,
  Info,
  Loader2,
  X,
} from "lucide-react";

import UploadBox from "@/components/UploadBox";

import {
  cn,
  formatFileSize,
} from "@/lib/utils";

interface PdfUploaderProps {
  file?: File | null;
  onFileSelect: (file: File) => void;
  onFileRemove?: () => void;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  className?: string;
}

export default function PdfUploader({
  file = null,
  onFileSelect,
  onFileRemove,
  disabled = false,
  loading = false,
  error,
  className,
}: PdfUploaderProps) {
  const [pageCount, setPageCount] =
    useState<number | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPageCount(null);
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    // Browser PDF metadata is not consistently available
    // without a PDF parsing library. We therefore leave
    // pageCount unknown and let the backend handle extraction.
    setPageCount(null);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  function handleRemove() {
    onFileRemove?.();
  }

  return (
    <div className={cn("space-y-4", className)}>
      <UploadBox
        type="pdf"
        file={file}
        onFileSelect={onFileSelect}
        onFileRemove={handleRemove}
        disabled={disabled}
        loading={loading}
        error={error}
      />

      {file && previewUrl && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <FileCheck2 size={22} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {file.name}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                    <span>
                      {formatFileSize(file.size)}
                    </span>

                    <span className="text-slate-300">
                      •
                    </span>

                    <span>PDF document</span>

                    {pageCount !== null && (
                      <>
                        <span className="text-slate-300">
                          •
                        </span>

                        <span>
                          {pageCount}{" "}
                          {pageCount === 1
                            ? "page"
                            : "pages"}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  <CheckCircle2 size={14} />
                  Ready
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-2">
                    <FileText
                      size={15}
                      className="text-slate-400"
                    />

                    <span className="text-xs font-semibold text-slate-700">
                      Document analysis
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Claims and relevant text can be
                    extracted from the document for
                    verification.
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-3">
                  <div className="flex items-center gap-2">
                    <FileCheck2
                      size={15}
                      className="text-blue-600"
                    />

                    <span className="text-xs font-semibold text-blue-700">
                      Verification
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-blue-600/80">
                    The extracted information will be
                    evaluated against available evidence.
                  </p>
                </div>
              </div>
            </div>

            {!disabled && !loading && (
              <button
                type="button"
                onClick={handleRemove}
                aria-l
```
