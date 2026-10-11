import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ACCEPTED_FILE_TYPES, VERDICT_CONFIG } from "@/lib/constants";
import type { Verdict, VerificationInputType } from "@/types/verification";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatConfidence(value: number): string {
  const normalized = value <= 1 ? value * 100 : value;
  return `${Math.round(Math.min(100, Math.max(0, normalized)))}%`;
}

export function normalizeConfidence(value: number): number {
  const normalized = value <= 1 ? value * 100 : value;
  return Math.min(100, Math.max(0, normalized));
}

export function getVerdictLabel(verdict: Verdict): string {
  return VERDICT_CONFIG[verdict]?.label ?? "Unverified";
}

export function getShortVerdictLabel(verdict: Verdict): string {
  return VERDICT_CONFIG[verdict]?.shortLabel ?? "Unverified";
}

export function getVerdictClassName(verdict: Verdict): string {
  return VERDICT_CONFIG[verdict]?.className ?? "border-slate-200 bg-slate-100 text-slate-700";
}

export function isVerificationInputType(value: string | null | undefined): value is VerificationInputType {
  return value === "text" || value === "url" || value === "pdf" || value === "image" || value === "voice";
}

export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB"];
  const unit = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** unit).toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
}

export function getDomain(value: string): string {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
}

export function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function truncateText(value: string, maxLength = 180): string {
  return value.length <= maxLength ? value : `${value.slice(0, maxLength).trimEnd()}…`;
}

export function validateFile(file: File, type: "pdf" | "image" | "voice"): string | null {
  const config = ACCEPTED_FILE_TYPES[type];
  const extension = `.${file.name.split(".").pop()?.toLowerCase() || ""}`;
  if (!(config.extensions as readonly string[]).includes(extension)) {
    return `Choose a supported ${type} file (${config.extensions.join(", " )}).`;
  }
  if (file.size > config.maxSizeMB * 1024 * 1024) {
    return `The file must be smaller than ${config.maxSizeMB} MB.`;
  }
  return null;
}
