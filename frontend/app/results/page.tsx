"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Info,
  Search,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";

type Verdict = "TRUE" | "FALSE" | "MIXED" | "UNVERIFIED";

const result = {
  verdict: "TRUE" as Verdict,
  confidence: 91,
  claim:
    "Regular physical activity can reduce the risk of several chronic diseases and improve overall health.",
  summary:
    "The claim is supported by evidence from established health organizations and scientific research. Regular physical activity is associated with lower risks of several chronic conditions.",
  evidence: [
    {
      title: "Physical Activity and Health",
      description:
        "Research consistently links regular physical activity with improved cardiovascular health and reduced risk of chronic diseases.",
      relevance: 94,
    },
    {
      title: "Health Benefits of Physical Activity",
      description:
        "Health guidance supports regular physical activity as an important part of maintaining physical and mental wellbeing.",
      relevance: 89,
    },
    {
      title: "Physical Activity Guidelines",
      description:
        "Evidence-based recommendations encourage adults to participate in regular moderate or vigorous physical activity.",
      relevance: 86,
    },
  ],
  sources: [
    {
      name: "World Health Organization",
      url: "https://www.who.int",
      type: "Health Organization",
    },
    {
      name: "Centers for Disease Control and Prevention",
      url: "https://www.cdc.gov",
      type: "Government Health Source",
    },
    {
      name: "Scientific Research",
      url: "#",
      type: "Research Source",
    },
  ],
};

function getVerdictStyles(verdict: Verdict) {
  switch (verdict) {
    case "TRUE":
      return {
        label: "Likely True",
        icon: CheckCircle2,
        container: "border-emerald-200 bg-emerald-50",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        text: "text-emerald-700",
      };

    case "FALSE":
      return {
        label: "Likely False",
        icon: XCircle,
        container: "border-red-200 bg-red-50",
        iconBg: "bg-red-100",
        iconColor: "text-red-600",
        text: "text-red-700",
      };

    case "MIXED":
      return {
        label: "Partially True",
        icon: Info,
        container: "border-amber-200 bg-amber-50",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        text: "text-amber-700",
      };

    default:
      return {
        label: "Unverified",
        icon: Info,
        container: "border-slate-200 bg-slate-50",
        iconBg: "bg-slate-100",
        iconColor: "text-slate-600",
        text: "text-slate-700",
      };
  }
}

export default function ResultsPage() {
  const verdictStyle = getVerdictStyles(result.verdict);
  const VerdictIcon = verdictStyle.icon;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <ShieldCheck size={22} />
            </div>

            <div>
              <p className="font-bold text-slate-900">TruthLens</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-400">
                AI Verification
              </p>
            </div>
          </Link>

          <Link
            href="/verify"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <Search size={16} />
            New Verification
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        {/* Back */}
        <Link
          href="/verify"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to verification
        </Link>

        {/* Heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
            <Sparkles size={16} />
            Verification Complete
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Verification Results
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Here&apos;s what TruthLens found about the submitted claim.
          </p>
        </div>

        {/* Claim */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <FileText size={18} className="text-blue-600" />
            Submitted Claim
          </div>

          <blockquote className="mt-4 border-l-4 border-blue-500 pl-4 text-base font-medium leading-7 text-slate-700 sm:text-lg">
            “{result.claim}”
          </blockquote>
        </div>

        {/* Main result grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Verdict */}
          <div
            className={`rounded-2xl border p-6 shadow-sm ${verdictStyle.container}`}
          >
            <p className="text-sm font-semibold text-slate-600">
              TruthLens Verdict
            </p>

            <div className="mt-5 flex items-center gap-4">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${verdictStyle.iconBg}`}
              >
                <VerdictIcon
                  size={36}
                  className={verdictStyle.iconColor}
                />
              </div>

              <div>
                <h2
                  className={`text-2xl font-bold ${verdictStyle.text}`}
                >
                  {verdictStyle.label}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Based on available evidence
                </p>
              </div>
            </div>

            {/* Confidence */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">
                  Confidence
                </span>

                <span className="text-lg font-bold text-slate-900">
                  {result.confidence}%
                </span>
              </div>

              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/80">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${result.confidence}%` }}
                />
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Confidence represents how strongly the available evidence
                supports the generated verdict.
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <ShieldCheck size={19} />
              </div>

              <h2 className="font-bold text-slate-900">
                AI Analysis Summary
              </h2>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              {result.summary}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">
                  VERDICT
                </p>
                <p className="mt-2 text-sm font-bold text-slate-800">
                  {result.verdict}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">
                  CONFIDENCE
                </p>
                <p className="mt-2 text-sm font-bold text-slate-800">
                  {result.confidence}%
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">
                  EVIDENCE
                </p>
                <p className="mt-2 text-sm font-bold text-slate-800">
                  {result.evidence.length} sources
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Evidence */}
        <section className="mt-8">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Evidence
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              Supporting Evidence
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Evidence identified during the verification process.
            </p>
          </div>

          <div className="space-y-4">
            {result.evidence.map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:p-6"
              >
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row">
                      <h3 className="font-bold text-slate-900">
                        {item.title}
                      </h3>

                      <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {item.relevance}% relevant
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${item.relevance}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="mt-10">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Sources
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              Sources Used
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review the sources behind this verification.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {result.sources.map((source) => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Link2Icon />
                  </div>

                  <ExternalLink
                    size={16}
                    className="text-slate-300 transition group-hover:text-blue-500"
                  />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  {source.name}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {source.type}
                </p>

                <div className="mt-4 text-xs font-semibold text-blue-600">
                  View source →
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="mt-10 flex gap-3 rounded-2xl border border-slate-200 bg-white p-5">
          <Info className="mt-0.5 shrink-0 text-slate-400" size={18} />

          <div>
            <p className="text-sm font-semibold text-slate-800">
              Verification note
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              AI verification is an assistance tool, not an absolute guarantee
              of truth. Consider the evidence, source quality, and context
              before relying on a result.
            </p>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/verify"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <Search size={17} />
            Verify Another Claim
          </Link>

          <Link
            href="/history"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View History
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}

function Link2Icon() {
  return <ExternalLink size={19} />;
}