```tsx
"use client";

import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Globe2,
  ShieldCheck,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface SourceCardProps {
  source: {
    id?: string;
    title?: string;
    name?: string;
    url?: string;
    domain?: string;
    description?: string;
    publishedAt?: string;
    credibility?: number;
    verified?: boolean;
    sourceType?: string;
  };
  index?: number;
  compact?: boolean;
  className?: string;
}

function normalizeScore(
  value?: number,
): number | null {
  if (typeof value !== "number") {
    return null;
  }

  return Math.max(
    0,
    Math.min(100, value),
  );
}

function getCredibilityColor(
  score: number,
) {
  if (score >= 80) {
    return {
      text: "text-emerald-600",
      bar: "bg-emerald-500",
    };
  }

  if (score >= 60) {
    return {
      text: "text-amber-600",
      bar: "bg-amber-500",
    };
  }

  return {
    text: "text-red-600",
    bar: "bg-red-500",
  };
}

export default function SourceCard({
  source,
  index,
  compact = false,
  className,
}: SourceCardProps) {
  const name =
    source.name ||
    source.domain ||
    "Unknown source";

  const title =
    source.title ||
    name;

  const credibility =
    normalizeScore(
      source.credibility,
    );

  const credibilityColors =
    credibility !== null
      ? getCredibilityColor(
          credibility,
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
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
            {index + 1}
          </div>
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Globe2 size={18} />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="truncate text-xs font-bold text-blue-600">
              {source.domain || name}
            </span>

            {source.verified !== false && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">
                <CheckCircle2 size={10} />
                Verified
              </span>
            )}
          </div>

          <h3
            className={cn(
              "mt-1.5 font-bold leading-6 text-slate-900",
              compact
                ? "text-sm"
                : "text-sm sm:text-base",
            )}
          >
            {title}
          </h3>
        </div>
      </div>

      {/* Source metadata */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        {source.sourceType && (
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <BookOpen
              size={13}
              className="text-slate-400"
            />
            <span>
              {source.sourceType}
            </span>
          </div>
        )}

        {source.publishedAt && (
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <CalendarDays
              size={13}
              className="text-slate-400"
            />
            <span>
              {source.publishedAt}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      {source.description && (
        <p
          className={cn(
            "mt-4 leading-6 text-slate-500",
            compact
              ? "text-xs"
              : "text-sm",
          )}
        >
          {source.description}
        </p>
      )}

      {/* Credibility */}
      {credibility !== null &&
        credibilityColors && (
          <div className="mt-5 rounded-xl bg-slate-50 p-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={15}
                  className="text-slate-400"
                />

                <span className="text-xs font-semibold text-slate-600">
                  Source credibility
                </span>
              </div>

              <span
                className={cn(
                  "text-xs font-bold",
                  credibilityColors.text,
                )}
              >
                {Math.round(credibility)}%
              </span>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  credibilityColors.bar,
                )}
                style={{
                  width: `${credibility}%`,
                }}
              />
            </div>
          </div>
        )}

      {/* Footer */}
      <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100">
            <Globe2
              size={13}
              className="text-slate-400"
            />
          </div>

          <span className="truncate text-xs text-slate-500">
            {source.domain || name}
          </span>
        </div>

        {source.url && (
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-blue-600 transition hover:border-blue-200 hover:bg-blue-50"
          >
            Visit source
            <ArrowUpRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        )}
      </div>

      {source.url && (
        <p className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
          <ExternalLink size={10} />
          Opens the original source in a new tab
        </p>
      )}
    </article>
  );
}
```
