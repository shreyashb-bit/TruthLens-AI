```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  ACCEPTED_FILE_TYPES,
  VERDICT_CONFIG,
} from "@/lib/constants";

import type {
  Verdict,
  VerificationInputType,
} from "@/types/verification";

/**
 * Merge Tailwind classes safely.
 *
 * Usage:
 * cn("px-4", condition && "bg-blue-500")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as a percentage.
 *
 * Example:
 * formatConfidence(0.82) -> "82%"
 * formatConfidence(82)   -> "82%"
 */
export function formatConfidence(value: number): string {
  const normalized = value <= 1 ? value * 100 : value;

  return `${Math.round(
    Math.min(100, Math.max(0, normalized)),
  )}%`;
}

/**
 * Convert a confidence value to a number between 0 and 100.
 */
export function normalizeConfidence(value: number): number {
  const normalized = value <= 1 ? value * 100 : value;

  return Math.min(100, Math.max(0, normalized));
}

/**
 * Return a human-readable verdict label.
 */
export function getVerdictLabel(verdict: Verdict): string {
  return VERDICT_CONFIG[verdict]?.label ?? "Unverified";
}

/**
 * Return a short verdict label.
 */
export function getShortVerdictLabel(verdict: Verdict): string {
  return VERDICT_CONFIG[verdict]?.shortLabel ?? "Unverified";
}

/**
 * Return a Tailwind class string for a verdict badge.
 */
export function getVerdictClassName(verdict: Verdict): string {
  return (
    VERDICT_CONFIG[verdict]?.className ??
    "border-slate-200 bg-slate-100 text-slate-700"
  );
}

/**
 * Check whether a value is a supported verification mode.
 */
export function isVerificationInputType(
  value: string | null | undefined,
): value is VerificationInputType {
  return (
    value === "text" ||
    value === "url" ||
    value === "pdf" ||
    value === "image" ||
    value === "voice"
  );
}

/**
 * Format bytes into a human-readable file size.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return "0 By
```
