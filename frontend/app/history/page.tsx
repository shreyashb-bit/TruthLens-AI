"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Filter,
  Image as ImageIcon,
  Link2,
  Mic,
  Search,
  ShieldCheck,
  Trash2,
  XCircle,
} from "lucide-react";

type Verdict = "TRUE" | "FALSE" | "MIXED" | "UNVERIFIED";
type VerificationType = "Text" | "URL" | "PDF" | "Image" | "Voice";

type HistoryItem = {
  id: string;
  claim: string;
  type: VerificationType;
  verdict: Verdict;
  confidence: number;
  date: string;
  time: string;
};

const initialHistory: HistoryItem[] = [
  {
    id: "TL-001",
    claim:
      "Regular physical activity can reduce the risk of several chronic diseases.",
    type: "Text",
    verdict: "TRUE",
    confidence: 91,
    date: "Oct 8, 2026",
    time: "7:42 PM",
  },
  {
    id: "TL-002",
    claim:
      "The Earth completes one rotation around the Sun every 24 hours.",
    type: "Text",
    verdict: "FALSE",
    confidence: 98,
    date: "Oct 8, 2026",
    time: "5:18 PM",
  },
  {
    id: "TL-003",
    claim:
      "https://example.com/technology/artificial-intelligence",
    type: "URL",
    verdict: "MIXED",
    confidence: 74,
    date: "Oct 7, 2026",
    time: "9:31 PM",
  },
  {
    id: "TL-004",
    claim:
      "Government health information document submitted for verification.",
    type: "PDF",
    verdict: "TRUE",
    confidence: 88,
    date: "Oct 7, 2026",
    time: "3:06 PM",
  },
  {
    id: "TL-005",
    claim:
      "Image containing a viral claim about a recent scientific discovery.",
    type: "Image",
    verdict: "UNVERIFIED",
    confidence: 42,
    date: "Oct 6, 2026",
    time: "8:14 PM",
  },
  {
    id: "TL-006",
    claim:
      "Voice recording containing a claim about current world events.",
    type: "Voice",
    verdict: "MIXED",
    confidence: 67,
    date: "Oct 5, 2026",
    time: "11:20 AM",
  },
];

const filters = ["All", "TRUE", "FALSE", "MIXED", "UNVERIFIED"] as const;

function getVerdictStyle(verdict: Verdict) {
  switch (verdict) {
    case "TRUE":
      return {
        label: "True",
        icon: CheckCircle2,
        className: "bg-emerald-50 text-emerald-700",
        iconClass: "text-emerald-600",
      };

    case "FALSE":
      return {
        label: "False",
        icon: XCircle,
        className: "bg-red-50 text-red-700",
        iconClass: "text-red-600",
      };

    case "MIXED":
      return {
        label: "Mixed",
        icon: Clock3,
        className: "bg-amber-50 text-amber-700",
        iconClass: "text-amber-600",
      };

    default:
      return {
        label: "Unverified",
        icon: Clock3,
        className: "bg-slate-100 text-slate-700",
        iconClass: "text-slate-500",
      };
  }
}

function getTypeIcon(type: VerificationType) {
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

export default function HistoryPage() {
  const [history, setHistory] = useState(initialHistory);
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesFilter =
        activeFilter === "All" || item.verdict === activeFilter;

      const matchesSearch =
        searchQuery.trim() === "" ||
        item.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [history, activeFilter, searchQuery]);

  const clearHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your verification history?"
    );

    if (confirmed) {
      setHistory([]);
    }
  };

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
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
            >
              <ArrowLeft size={16} />
              Back Home
            </Link>

            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Your Activity
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Verification History
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Review claims you previously submitted and quickly revisit their
              verification results.
            </p>
          </div>

          {history.length > 0 && (
            <button
              type="button"
              onClick={clearHistory}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-red-100 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={16} />
              Clear History
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Checks"
            value={history.length}
            icon={Search}
          />

          <StatCard
            label="Likely True"
            value={history.filter((item) => item.verdict === "TRUE").length}
            icon={CheckCircle2}
          />

          <StatCard
            label="Likely False"
            value={history.filter((item) => item.verdict === "FALSE").length}
            icon={XCircle}
          />

          <StatCard
            label="Avg. Confidence"
            value={
              history.length
                ? `${Math.round(
                    history.reduce(
                      (total, item) => total + item.confidence,
                      0
                    ) / history.length
                  )}%`
                : "0%"
            }
            icon={ShieldCheck}
          />
        </div>

        {/* Search + filters */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="flex w-full items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 lg:max-w-md">
              <Search size={18} className="mr-3 text-slate-400" />

              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search verification history..."
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <Filter size={16} className="mr-1 shrink-0 text-slate-400" />

              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {filter === "All" ? "All Results" : filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* History list */}
        <div className="mt-6">
          {filteredHistory.length > 0 ? (
            <div className="space-y-3">
              {filteredHistory.map((item) => {
                const verdictStyle = getVerdictStyle(item.verdict);
                const VerdictIcon = verdictStyle.icon;
                const TypeIcon = getTypeIcon(item.type);

                return (
                  <div
                    key={item.id}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:p-6"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                      {/* Type icon */}
                      <div className="flex shrink-0 items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <TypeIcon size={20} />
                        </div>

                        <div className="lg:hidden">
                          <p className="text-xs font-semibold text-slate-400">
                            {item.id}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {item.type} verification
                          </p>
                        </div>
                      </div>

                      {/* Claim */}
                      <div className="min-w-0 flex-1">
                        <div className="hidden items-center gap-2 lg:flex">
                          <span className="text-xs font-semibold text-slate-400">
                            {item.id}
                          </span>

                          <span className="h-1 w-1 rounded-full bg-slate-300" />

                          <span className="text-xs text-slate-500">
                            {item.type} verification
                          </span>
                        </div>

                        <p className="mt-1 line-clamp-2 text-sm font-semibold leading-6 text-slate-800">
                          {item.claim}
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                          <span className="inline-flex items-center gap-1">
                            <CalendarDays size={13} />
                            {item.date}
                          </span>

                          <span className="inline-flex items-center gap-1">
                            <Clock3 size={13} />
                            {item.time}
                          </span>
                        </div>
                      </div>

                      {/* Verdict */}
                      <div
                        className={`flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${verdictStyle.className}`}
                      >
                        <VerdictIcon
                          size={15}
                          className={verdictStyle.iconClass}
                        />
                        {verdictStyle.label}
                      </div>

                      {/* Confidence */}
                      <div className="w-full shrink-0 lg:w-28">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">
                            Confidence
                          </span>

                          <span className="text-xs font-bold text-slate-700">
                            {item.confidence}%
                          </span>
                        </div>

                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{
                              width: `${item.confidence}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Result link */}
                      <Link
                        href={`/results?id=${item.id}`}
                        className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        View
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              searchQuery={searchQuery}
              activeFilter={activeFilter}
            />
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center sm:p-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
            <Search size={22} />
          </div>

          <h2 className="mt-4 text-xl font-bold text-slate-900">
            Have something else to verify?
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
            Submit another claim, URL, document, image, or voice recording to
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

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={19} />
        </div>
      </div>

      <p className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}

function EmptyState({
  searchQuery,
  activeFilter,
}: {
  searchQuery: string;
  activeFilter: string;
}) {
  const hasFilter = searchQuery || activeFilter !== "All";

  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        {hasFilter ? <Search size={25} /> : <Clock3 size={25} />}
      </div>

      <h2 className="mt-5 text-lg font-bold text-slate-900">
        {hasFilter ? "No matching results" : "No verification history"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {hasFilter
          ? "Try changing your search or selecting a different filter."
          : "Your completed verification requests will appear here."}
      </p>

      {!hasFilter && (
        <Link
          href="/verify"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          Verify Your First Claim
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
