```tsx
"use client";

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  ExternalLink,
  FileText,
  Info,
  Search,
  ShieldAlert,
  Sparkles,
  XCircle,
} from "lucide-react";
import { useState } from "react";

import VerdictBadge from "@/components/VerdictBadge";

import {
  cn,
  formatConfidence,
  normalizeConfidence,
  truncateText,
} from "@/lib/utils";

import type {
  Claim,
  Verdict,
} from "@/types/verification";

interface ClaimCardProps {
  claim: Claim;
  index?: number;
  defaultExpanded?: boolean;
  className?: string;
  onViewEvidence?: (claim: Claim) => void;
}

const verdictIcons: Record<
  Verdict,
  typeof CheckCircle2
> = {
  true: CheckCircle2,
  mostly_true: CheckCircle2,
  partially_true: Info,
  misleading: AlertTriangle,
  mixed: AlertTriangle,
  false: XCircle,
  unverified: CircleHelp,
};

const verdictIconColors: Record<
  Verdict,
  string
> = {
  true: "text-emerald-600",
  mostly_true: "text-green-600",
  partially_true: "text-lime-600",
  misleading: "text-amber-600",
  mixed: "text-orange-600",
  false: "text-red-600",
  unverified: "text-slate-500",
};

function getConfidenceColor(
  confidence: number,
): string {
  const normalized =
    normalizeConfidence(confidence);

  if (normalized >= 80) {
    return "bg-emerald-500";
  }

  if (normalized >= 60) {
    return "bg-amber-500";
  }

  return "bg-red-500";
}

function getConfidenceTextColor(
  confidence: number,
): string {
  const normalized =
    normalizeConfidence(confidence);

  if (normalized >= 80) {
    return "text-emerald-600";
  }

  if (normalized >= 60) {
    return "text-amber-600";
  }

  return "text-red-600";
}

export default function ClaimCard({
  claim,
  index,
  defaultExpanded = false,
  className,
  onViewEvidence,
}: ClaimCardProps) {
  const [expanded, setExpanded] =
    useState(defaultExpanded);

  const Icon =
    verdictIcons[claim.verdict] ??
    CircleHelp;

  const iconColor =
    verdictIconColors[claim.verdict] ??
    "text-slate-500";

  const confidence =
    normalizeConfidence(claim.confidence);

  const evidenceCount =
    claim.evidence?.length ?? 0;

  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition",
        "hover:border-slate-300 hover:shadow-md",
        className,
      )}
    >
      {/* Card header */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-3">
          {/* Number */}
          {index !== undefined && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">
              {index + 1}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <VerdictBadge
                verdict={claim.verdict}
              />

              {claim.category && (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                  {claim.category}
                </span>
              )}
            </div>

            <div className="mt-4 flex items-start gap-2.5">
              <Icon
                size={19}
                className={cn(
                  "mt-1 shrink-0",
                  iconColor,
                )}
              />

              <blockquote className="text-[15px] font-semibold leading-7 text-slate-900 sm:text-base">
                “{claim.text}”
              </blockquote>
            </div>
          </div>
        </div>

        {/* Confidence */}
        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles
                size={15}
                className="text-blue-500"
              />

              <span className="text-xs font-semibold text-slate-600">
                Confidence
              </span>
            </div>

            <span
              className={cn(
                "text-sm font-bold",
                getConfidenceTextColor(
                  confidence,
                ),
              )}
            >
              {formatConfidence(confidence)}
            </span>
          </div>

          <div
            className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200"
            aria-label={`Confidence ${formatConfidence(
              confidence,
            )}`}
          >
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                getConfidenceColor(
                  confidence,
                ),
              )}
              style={{
                width: `${confidence}%`,
              }}
            />
          </div>
        </div>

        {/* Explanation */}
        {claim.explanation && (
          <div className="mt-5">
            <div className="flex items-center gap-2">
              <FileText
                size={15}
                className="text-slate-400"
              />

              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Analysis
              </h3>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {expanded
                ? claim.explanation
                : truncateText(
                    claim.explanation,
                    220,
                  )}
            </p>
          </div>
        )}
      </div>

      {/* Expandable details */}
      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-5 sm:px-6">
          {/* Reasoning */}
          {claim.reasoning && (
            <div>
              <div className="flex items-center gap-2">
                <Search
                  size={15}
                  className="text-blue-500"
                />

                <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                  Verification reasoning
                </h3>
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {claim.reasoning}
              </p>
            </div>
          )}

          {/* Evidence summary */}
          {claim.evidenceSummary && (
            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-start gap-2.5">
                <ShieldAlert
                  size={17}
                  className="mt-0.5 shrink-0 text-blue-600"
                />

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-blue-700">
                    Evidence summary
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-blue-900/80">
                    {claim.evidenceSummary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Evidence list */}
          {evidenceCount > 0 && (
            <div className="mt-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FileText
                    size={15}
                    className="text-slate-400"
                  />

                  <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Supporting evidence
                  </h3>
                </div>

                <span className="text-xs font-medium text-slate-400">
                  {evidenceCount}{" "}
                  {evidenceCount === 1
                    ? "source"
                    : "sources"}
                </span>
              </div>

              <div className="mt-3 space-y-2">
                {claim.evidence
                  .slice(0, 3)
                  .map((evidence, evidenceIndex) => (
                    <div
                      key={
                        evidence.id ??
                        `${claim.id}-evidence-${evidenceIndex}`
                      }
                      className="rounded-xl border border-slate-200 bg-white p-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-bold text-slate-500">
                          {evidenceIndex + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-700">
                            {evidence.title ||
                              "Evidence source"}
                          </p>

                          {evidence.snippet && (
                            <p className="mt-1.5 text-xs leading-5 text-slate-500">
                              {truncateText(
                                evidence.snippet,
                                180,
                              )}
                            </p>
                          )}

                          {evidence.url && (
                            <a
                              href={evidence.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                            >
                              View source
                              <ExternalLink
                                size={11}
                              />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* No evidence */}
          {evidenceCount === 0 && (
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
              <AlertTriangle
                size={17}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <div>
                <p className="text-xs font-bold text-amber-800">
                  Limited evidence
                </p>

                <p className="mt-1 text-xs leading-5 text-amber-700/80">
                  No supporting evidence was attached to
                  this claim in the returned result.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>
            {evidenceCount}{" "}
            {evidenceCount === 1
              ? "evidence item"
              : "evidence items"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onViewEvidence &&
            evidenceCount > 0 && (
              <button
                type="button"
                onClick={() =>
                  onViewEvidence(claim)
                }
                className="inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
              >
                View evidence
                <ArrowRight size={14} />
              </button>
            )}

          <button
            type="button"
            onClick={() =>
              setExpanded((value) => !value)
            }
            aria-expanded={expanded}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            {expanded ? (
              <>
                Hide details
                <ChevronUp size={14} />
              </>
            ) : (
              <>
                Details
                <ChevronDown size={14} />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
```
