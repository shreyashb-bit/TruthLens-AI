```tsx
"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Globe2,
  Quote,
  ShieldCheck,
} from "lucide-react";

import { cn, truncateText } from "@/lib/utils";

import type { Evidence } from "@/types/verification";

interface EvidenceCardProps {
  evidence: Evidence;
  index?: number;
  compact?: boolean;
  className?: string;
}

export default function EvidenceCard({
  evidence,
  index,
  compact = false,
  className,
}: EvidenceCardProps) {
  const sourceName =
    evidence.sourceName ||
    evidence.domain ||
    "Unknown source";

  const relevance =
    typeof evidence.relevance === "number"
      ? Math.max(
          0,
          Math.min(100, evidence.relevance),
        )
      : null;

  return (
    <article
      className={cn(
        "group rounded-2xl border border-slate-200 bg-white shadow-sm transition",
        "hover:border-blue-200 hover:shadow-md",
        compact ? "p-4" : "p-5 sm:p-6",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        {index !== undefined ? (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-600">
            {index + 1}
          </div>
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <FileText size={17} />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Globe2
                size={13}
                className="text-slate-400"
              />
              {sourceName}
            </span>

            {evidence.verified !== false && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                <CheckCircle2 size={11} />
                Verified source
              </span>
            )}
          </div>

          {evidence.title && (
            <h3
              className={cn(
                "mt-2 font-bold leading-6 text-slate-900",
                compact
                  ? "text-sm"
                  : "text-sm sm:text-base",
              )}
            >
              {evidence.title}
            </h3>
          )}

          {evidence.publishedAt && (
            <p className="mt-1 text-xs text-slate-400">
              Published{" "}
              {evidence.publishedAt}
            </p>
          )}
        </div>
      </div>

      {/* Relevance */}
      {relevance !== null && (
        <div className="mt-4 rounded-xl bg-slate-50 p-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-500">
              Relevance
            </span>

            <span className="text-xs font-bold text-blue-600">
              {Math.round(relevance)}%
            </span>
          </div>

          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-500"
              style={{
                width: `${relevance}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Evidence snippet */}
      {evidence.snippet && (
        <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
          <div className="flex items-start gap-2.5">
            <Quote
              size={16}
              className="mt-0.5 shrink-0 text-slate-300"
            />

            <p
              className={cn(
                "leading-6 text-slate-600",
                compact
                  ? "text-xs"
                  : "text-sm",
              )}
            >
              {truncateText(
                evidence.snippet,
                compact ? 220 : 420,
              )}
            </p>
          </div>
        </div>
      )}

      {/* Why this evidence matters */}
      {evidence.relevanceReason && (
        <div className="mt-4 flex items-start gap-2.5">
          <ShieldCheck
            size={16}
            className="mt-0.5 shrink-0 text-blue-500"
          />

          <div>
            <p className="text-xs font-bold text-slate-700">
              Why this matters
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {evidence.relevanceReason}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        className={cn(
          "mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4",
          "sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100">
            <Globe2
              size={13}
              className="text-slate-400"
            />
          </div>

          <span className="truncate text-xs text-slate-500">
            {evidence.domain ||
              sourceName}
          </span>
        </div>

        {evidence.url && (
          <a
            href={evidence.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-blue-600 transition hover:border-blue-200 hover:bg-blue-50"
          >
            Open source
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        )}
      </div>

      {/* Accessibility/source hint */}
      {evidence.url && (
        <p className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
          <ExternalLink size={10} />
          Opens the original source in a new tab
        </p>
      )}
    </article>
  );
}
```
