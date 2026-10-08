```tsx
"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  Globe2,
  Link2,
  Loader2,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

import { cn, getDomain, isValidUrl } from "@/lib/utils";

interface UrlInputProps {
  initialUrl?: string;
  onSubmit: (url: string) => void | Promise<void>;
  loading?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export default function UrlInput({
  initialUrl = "",
  onSubmit,
  loading = false,
  error,
  disabled = false,
  className,
}: UrlInputProps) {
  const [url, setUrl] = useState(initialUrl);
  const [validationError, setValidationError] =
    useState("");

  const [domain, setDomain] = useState("");

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  useEffect(() => {
    if (!url.trim()) {
      setDomain("");
      return;
    }

    setDomain(getDomain(url.trim()));
  }, [url]);

  function validateUrl(): boolean {
    const value = url.trim();

    if (!value) {
      setValidationError(
        "Please enter a URL to verify.",
      );
      return false;
    }

    if (!isValidUrl(value)) {
      setValidationError(
        "Please enter a valid HTTP or HTTPS URL.",
      );
      return false;
    }

    setValidationError("");
    return true;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!validateUrl()) {
      return;
    }

    await onSubmit(url.trim());
  }

  function handleClear() {
    if (loading || disabled) {
      return;
    }

    setUrl("");
    setDomain("");
    setValidationError("");
  }

  const displayError =
    validationError || error;

  const isValid =
    url.trim().length > 0 &&
    isValidUrl(url.trim());

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Globe2 size={19} />
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900">
            Verify a web source
          </h2>

          <p className="mt-1 text-sm leading-5 text-slate-500">
            Paste a webpage URL and TruthLens will analyze
            the claims and supporting evidence it can find.
          </p>
        </div>
      </div>

      {/* URL field */}
      <div className="mt-6">
        <label
          htmlFor="truthlens-url"
          className="mb-2 block text-sm font-semibold text-slate-800"
        >
          Website URL
        </label>

        <div className="relative">
          <Link2
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            id="truthlens-url"
            type="url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);

              if (validationError) {
                setValidationError("");
              }
            }}
            disabled={loading || disabled}
            placeholder="https://example.com/article"
            autoComplete="url"
            className={cn(
              "h-12 w-full rounded-xl border bg-slate-50 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400",
              "focus:bg-white focus:ring-4",
              displayError
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/10",
              "disabled:cursor-not-allowed disabled:opacity-60",
            )}
          />

          {url && !loading && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear URL"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Domain preview */}
        {domain && !displayError && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2.5">
            <Globe2
              size={15}
              className="shrink-0 text-indigo-500"
            />

            <span className="text-xs text-indigo-700">
              Source:
            </span>

            <span className="truncate text-xs font-semibold text-indigo-900">
              {domain}
            </span>

            {isValid && (
              <CheckCircle2
                size={15}
                className="ml-auto shrink-0 text-emerald-500"
              />
            )}
          </div>
        )}
      </div>

      {/* Error */}
      {displayError && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle
            size={17}
            className="mt-0.5 shrink-0"
          />

          <p>{displayError}</p>
        </div>
      )}

      {/* Privacy / analysis note */}
      {!displayError && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3">
            <ShieldCheck
              size={16}
              className="mt-0.5 shrink-0 text-slate-500"
            />

            <div>
              <p className="text-xs font-semibold text-slate-700">
                Source-aware analysis
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                The submitted URL remains associated with
                its source during verification.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3">
            <Search
              size={16}
              className="mt-0.5 shrink-0 text-slate-500"
            />

            <div>
              <p className="text-xs font-semibold text-slate-700">
                Evidence lookup
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Results can include evidence and sources
                returned by the verification backend.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleClear}
          disabled={
            loading ||
            disabled ||
            url.length === 0
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <X size={16} />
          Clear
        </button>

        <button
          type="submit"
          disabled={
            loading ||
            disabled ||
            !url.trim()
          }
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-sm transition",
            loading ||
              disabled ||
              !url.trim()
              ? "cursor-not-allowed bg-slate-300"
              : "bg-indigo-600 shadow-indigo-600/20 hover:bg-indigo-700 hover:shadow-md",
          )}
        >
          {loading ? (
            <>
              <Loader2
                size={17}
                className="animate-spin"
              />
              Verifying...
            </>
          ) : (
            <>
              <Search size={17} />
              Verify URL
            </>
          )}
        </button>
      </div>
    </form>
  );
}
```
