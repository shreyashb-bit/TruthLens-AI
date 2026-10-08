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
  ClipboardPaste,
  Loader2,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface TextVerifierProps {
  initialText?: string;
  onSubmit: (text: string) => void | Promise<void>;
  loading?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const MIN_LENGTH = 10;
const MAX_LENGTH = 5000;

export default function TextVerifier({
  initialText = "",
  onSubmit,
  loading = false,
  error,
  disabled = false,
  className,
}: TextVerifierProps) {
  const [text, setText] =
    useState(initialText);

  const [validationError, setValidationError] =
    useState("");

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const characterCount = text.length;

  const canSubmit =
    text.trim().length >= MIN_LENGTH &&
    text.trim().length <= MAX_LENGTH &&
    !loading &&
    !disabled;

  function validate(): boolean {
    const trimmedText = text.trim();

    if (!trimmedText) {
      setValidationError(
        "Please enter a claim to verify.",
      );
      return false;
    }

    if (trimmedText.length < MIN_LENGTH) {
      setValidationError(
        `Please enter at least ${MIN_LENGTH} characters.`,
      );
      return false;
    }

    if (trimmedText.length > MAX_LENGTH) {
      setValidationError(
        `Your claim is too long. Please keep it under ${MAX_LENGTH.toLocaleString()} characters.`,
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

    if (!validate()) {
      return;
    }

    await onSubmit(text.trim());
  }

  async function handlePaste() {
    try {
      const clipboardText =
        await navigator.clipboard.readText();

      if (!clipboardText) {
        return;
      }

      setText(clipboardText);
      setValidationError("");
    } catch {
      setValidationError(
        "Unable to access your clipboard. Please paste the text manually.",
      );
    }
  }

  function handleClear() {
    if (loading || disabled) {
      return;
    }

    setText("");
    setValidationError("");
  }

  const displayError =
    validationError || error;

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6",
        className,
      )}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Sparkles size={19} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">
              Verify a text claim
            </h2>

            <p className="mt-1 text-sm leading-5 text-slate-500">
              Enter a statement, claim, or piece of
              information you want TruthLens to analyze.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePaste}
          disabled={loading || disabled}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ClipboardPaste size={15} />
          Paste
        </button>
      </div>

      {/* Text area */}
      <div className="relative mt-6">
        <label
          htmlFor="truthlens-claim"
          className="mb-2 block text-sm font-semibold text-slate-800"
        >
          Your claim
        </label>

        <textarea
          id="truthlens-claim"
          value={text}
          onChange={(event) => {
            setText(event.target.value);

            if (validationError) {
              setValidationError("");
            }
          }}
          disabled={loading || disabled}
          maxLength={MAX_LENGTH}
          rows={8}
          placeholder="Example: Scientists have discovered that drinking coffee every day significantly increases life expectancy."
          className={cn(
            "min-h-[190px] w-full resize-y rounded-xl border bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400",
            "focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10",
            displayError
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
              : "border-slate-200",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        />

        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            Minimum {MIN_LENGTH} characters
          </p>

          <p
            className={cn(
              "text-xs font-medium",
              characterCount > MAX_LENGTH * 0.9
                ? "text-amber-600"
                : "text-slate-400",
            )}
          >
            {characterCount.toLocaleString()} /{" "}
            {MAX_LENGTH.toLocaleString()}
          </p>
        </div>
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

      {/* Helpful hint */}
      {!displayError && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-500">
          <CheckCircle2
            size={15}
            className="mt-0.5 shrink-0 text-slate-400"
          />

          <p>
            For better results, submit a specific factual
            claim rather than a question or opinion.
          </p>
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
            text.length === 0
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={16} />
          Clear
        </button>

        <button
          type="submit"
          disabled={!canSubmit}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-sm transition",
            canSubmit
              ? "bg-blue-600 shadow-blue-600/20 hover:bg-blue-700 hover:shadow-md"
              : "cursor-not-allowed bg-slate-300",
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
              Verify Claim
            </>
          )}
        </button>
      </div>
    </form>
  );
}
```
