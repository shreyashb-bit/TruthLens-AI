"use client";

import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  FileText,
  Filter,
  Image as ImageIcon,
  Link2,
  Mic,
  Search,
  ShieldCheck,
  TrendingUp,
  XCircle,
} from "lucide-react";

const weeklyData = [
  { day: "Mon", value: 4 },
  { day: "Tue", value: 7 },
  { day: "Wed", value: 5 },
  { day: "Thu", value: 9 },
  { day: "Fri", value: 6 },
  { day: "Sat", value: 11 },
  { day: "Sun", value: 8 },
];

const recentChecks = [
  {
    id: "TL-001",
    claim:
      "Regular physical activity can reduce the risk of several chronic diseases.",
    type: "Text",
    verdict: "TRUE",
    confidence: 91,
    time: "12 min ago",
  },
  {
    id: "TL-002",
    claim:
      "The Earth completes one rotation around the Sun every 24 hours.",
    type: "Text",
    verdict: "FALSE",
    confidence: 98,
    time: "2 hrs ago",
  },
  {
    id: "TL-003",
    claim: "Technology article submitted for verification.",
    type: "URL",
    verdict: "MIXED",
    confidence: 74,
    time: "Yesterday",
  },
  {
    id: "TL-004",
    claim: "Health information document submitted for analysis.",
    type: "PDF",
    verdict: "TRUE",
    confidence: 88,
    time: "Yesterday",
  },
];

const inputBreakdown = [
  { label: "Text", value: 42, icon: FileText },
  { label: "URL", value: 24, icon: Link2 },
  { label: "PDF", value: 16, icon: FileText },
  { label: "Image", value: 11, icon: ImageIcon },
  { label: "Voice", value: 7, icon: Mic },
];

function verdictStyle(verdict: string) {
  if (verdict === "TRUE") {
    return {
      label: "True",
      icon: CheckCircle2,
      style: "bg-emerald-50 text-emerald-700",
    };
  }

  if (verdict === "FALSE") {
    return {
      label: "False",
      icon: XCircle,
      style: "bg-red-50 text-red-700",
    };
  }

  return {
    label: "Mixed",
    icon: Clock3,
    style: "bg-amber-50 text-amber-700",
  };
}

function typeIcon(type: string) {
  switch (type) {
    case "URL":
      return Link2;
    case "PDF":
      return FileText;
    case "Image":
      return ImageIcon;
    case "Voice":
      return Mic;
    default:
      return FileText;
  }
}

export default function DashboardPage() {
  const maxValue = Math.max(...weeklyData.map((item) => item.value));

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
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
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Search size={16} />
            New Verification
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-8 sm:py-12">
        {/* Heading */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back Home
          </Link>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Analytics
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Verification Dashboard
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Overview of your TruthLens verification activity.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500">
              <Activity size={15} />
              Last 7 days
            </div>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            label="Total Verifications"
            value="50"
            change="+18%"
            icon={Search}
          />

          <MetricCard
            label="Likely True"
            value="31"
            change="+12%"
            icon={CheckCircle2}
          />

          <MetricCard
            label="Likely False"
            value="8"
            change="+5%"
            icon={XCircle}
          />

          <MetricCard
            label="Avg. Confidence"
            value="84%"
            change="+7%"
            icon={TrendingUp}
          />
        </div>

        {/* Main charts */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Weekly activity */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 size={18} className="text-blue-600" />

                  <h2 className="font-bold text-slate-900">
                    Verification Activity
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Number of verifications completed each day.
                </p>
              </div>

              <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                50 total
              </span>
            </div>

            <div className="mt-8 flex h-64 items-end justify-between gap-3">
              {weeklyData.map((item) => {
                const height = `${(item.value / maxValue) * 100}%`;

                return (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                  >
                    <span className="text-xs font-semibold text-slate-500">
                      {item.value}
                    </span>

                    <div className="flex h-full w-full items-end">
                      <div
                        className="w-full rounded-t-xl bg-blue-500 transition hover:bg-blue-600"
                        style={{ height }}
                      />
                    </div>

                    <span className="text-xs text-slate-400">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verdict breakdown */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-blue-600" />

              <h2 className="font-bold text-slate-900">
                Verdict Breakdown
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Distribution of verification results.
            </p>

            <div className="mt-8 flex items-center justify-center">
              <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-slate-100">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(#10b981 0deg 223deg, #ef4444 223deg 281deg, #f59e0b 281deg 340deg, #cbd5e1 340deg 360deg)",
                  }}
                />

                <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-2xl font-bold text-slate-900">
                    50
                  </span>

                  <span className="text-xs text-slate-400">checks</span>
                </div>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              <BreakdownRow
                label="True"
                value="31"
                percentage="62%"
                className="bg-emerald-500"
              />

              <BreakdownRow
                label="False"
                value="8"
                percentage="16%"
                className="bg-red-500"
              />

              <BreakdownRow
                label="Mixed"
                value="8"
                percentage="16%"
                className="bg-amber-500"
              />

              <BreakdownRow
                label="Unverified"
                value="3"
                percentage="6%"
                className="bg-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Secondary analytics */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Input breakdown */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-blue-600" />

              <h2 className="font-bold text-slate-900">
                Input Type Breakdown
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              What types of information are being verified?
            </p>

            <div className="mt-7 space-y-5">
              {inputBreakdown.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon size={15} className="text-slate-400" />
                        <span className="text-sm font-medium text-slate-700">
                          {item.label}
                        </span>
                      </div>

                      <span className="text-xs font-bold text-slate-600">
                        {item.value}%
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Accuracy / confidence */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-blue-600" />

              <h2 className="font-bold text-slate-900">
                Verification Quality
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Current performance indicators.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <QualityCard
                title="Average Confidence"
                value="84%"
                description="Across all completed checks"
              />

              <QualityCard
                title="High Confidence"
                value="76%"
                description="Results above 80% confidence"
              />

              <QualityCard
                title="Evidence Found"
                value="92%"
                description="Checks with supporting evidence"
              />

              <QualityCard
                title="Sources Used"
                value="137"
                description="Sources referenced so far"
              />
            </div>
          </div>
        </div>

        {/* Recent verifications */}
        <section className="mt-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Recent Activity
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                Recent Verifications
              </h2>
            </div>

            <Link
              href="/history"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View all history
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="divide-y divide-slate-100">
              {recentChecks.map((item) => {
                const style = verdictStyle(item.verdict);
                const VerdictIcon = style.icon;
                const TypeIcon = typeIcon(item.type);

                return (
                  <div
                    key={item.id}
                    className="p-5 transition hover:bg-slate-50 sm:p-6"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <TypeIcon size={18} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400">
                            {item.id}
                          </span>

                          <span className="text-xs text-slate-400">
                            • {item.type}
                          </span>
                        </div>

                        <p className="mt-1 line-clamp-1 text-sm font-semibold text-slate-800">
                          {item.claim}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {item.time}
                        </p>
                      </div>

                      <div
                        className={`flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${style.style}`}
                      >
                        <VerdictIcon size={14} />
                        {style.label}
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400">
                          Confidence
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-800">
                          {item.confidence}%
                        </p>
                      </div>

                      <Link
                        href={`/results?id=${item.id}`}
                        className="flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-7 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Verify something new
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
            Check a claim, URL, document, image, or voice recording with
            TruthLens.
          </p>

          <Link
            href="/verify"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Start Verification
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}

function MetricCard({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={19} />
        </div>

        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
          {change}
        </span>
      </div>

      <p className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  percentage,
  className,
}: {
  label: string;
  value: string;
  percentage: string;
  className: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`h-2.5 w-2.5 rounded-full ${className}`} />

      <span className="flex-1 text-xs font-medium text-slate-600">
        {label}
      </span>

      <span className="text-xs font-bold text-slate-800">{value}</span>

      <span className="w-9 text-right text-xs text-slate-400">
        {percentage}
      </span>
    </div>
  );
}

function QualityCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-500">{title}</p>

      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>

      <p className="mt-1 text-[11px] leading-5 text-slate-400">
        {description}
      </p>
    </div>
  );
}