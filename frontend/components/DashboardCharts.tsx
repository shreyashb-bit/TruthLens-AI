```tsx
"use client";

import {
  Activity,
  BarChart3,
  CheckCircle2,
  CircleHelp,
  FileText,
  TrendingUp,
  XCircle,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface VerdictBreakdown {
  label: string;
  value: number;
  color: string;
  icon?: "true" | "false" | "unverified";
}

interface ActivityPoint {
  label: string;
  value: number;
}

interface DashboardChartsProps {
  verdicts?: VerdictBreakdown[];
  activity?: ActivityPoint[];
  totalVerifications?: number;
  averageConfidence?: number;
  className?: string;
}

const defaultVerdicts: VerdictBreakdown[] = [
  {
    label: "True",
    value: 42,
    color: "#10b981",
    icon: "true",
  },
  {
    label: "False",
    value: 18,
    color: "#ef4444",
    icon: "false",
  },
  {
    label: "Unverified",
    value: 9,
    color: "#94a3b8",
    icon: "unverified",
  },
];

const defaultActivity: ActivityPoint[] = [
  { label: "Mon", value: 8 },
  { label: "Tue", value: 12 },
  { label: "Wed", value: 7 },
  { label: "Thu", value: 15 },
  { label: "Fri", value: 11 },
  { label: "Sat", value: 18 },
  { label: "Sun", value: 14 },
];

function getVerdictIcon(
  icon?: VerdictBreakdown["icon"],
) {
  if (icon === "true") {
    return CheckCircle2;
  }

  if (icon === "false") {
    return XCircle;
  }

  return CircleHelp;
}

function DonutChart({
  data,
}: {
  data: VerdictBreakdown[];
}) {
  const total = data.reduce(
    (sum, item) => sum + Math.max(item.value, 0),
    0,
  );

  if (total === 0) {
    return (
      <div className="flex h-48 items-center justify-center">
        <div className="flex h-36 w-36 items-center justify-center rounded-full border-[18px] border-slate-100">
          <span className="text-xs font-semibold text-slate-400">
            No data
          </span>
        </div>
      </div>
    );
  }

  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  let accumulated = 0;

  return (
    <div className="relative flex h-48 items-center justify-center">
      <svg
        viewBox="0 0 120 120"
        className="h-44 w-44 -rotate-90"
        role="img"
        aria-label="Verification verdict distribution"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="16"
        />

        {data.map((item) => {
          const value = Math.max(item.value, 0);
          const percentage = value / total;
          const dashLength =
            percentage * circumference;

          const dashOffset =
            -accumulated * circumference;

          accumulated += percentage;

          return (
            <circle
              key={item.label}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="16"
              strokeDasharray={`${dashLength} ${
                circumference - dashLength
              }`}
              strokeDashoffset={dashOffset}
              strokeLinecap="butt"
            />
          );
        })}
      </svg>

      <div className="absolute text-center">
        <p className="text-2xl font-bold tracking-tight text-slate-900">
          {total}
        </p>

        <p className="mt-0.5 text-[11px] font-medium text-slate-400">
          checks
        </p>
      </div>
    </div>
  );
}

function ActivityChart({
  data,
}: {
  data: ActivityPoint[];
}) {
  const maxValue = Math.max(
    ...data.map((item) => item.value),
    1,
  );

  const chartWidth = 600;
  const chartHeight = 220;
  const paddingX = 28;
  const paddingY = 20;

  const usableWidth =
    chartWidth - paddingX * 2;

  const usableHeight =
    chartHeight - paddingY * 2;

  const points = data.map(
    (item, index) => {
      const x =
        data.length === 1
          ? chartWidth / 2
          : paddingX +
            (index / (data.length - 1)) *
              usableWidth;

      const y =
        chartHeight -
        paddingY -
        (item.value / maxValue) *
          usableHeight;

      return {
        ...item,
        x,
        y,
      };
    },
  );

  const linePath = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x} ${
          point.y
        }`,
    )
    .join(" ");

  const areaPath = [
    `M ${points[0]?.x ?? paddingX} ${
      chartHeight - paddingY
    }`,
    ...points.map(
      (point) =>
        `L ${point.x} ${point.y}`,
    ),
    `L ${
      points[points.length - 1]?.x ??
      chartWidth - paddingX
    } ${chartHeight - paddingY}`,
    "Z",
  ].join(" ");

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="h-56 w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Verification activity chart"
      >
        {/* Horizontal grid */}
        {[0, 1, 2, 3, 4].map(
          (line) => {
            const y =
              paddingY +
              (line / 4) *
                usableHeight;

            return (
              <line
                key={line}
                x1={paddingX}
                x2={
                  chartWidth - paddingX
                }
                y1={y}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="4 5"
              />
            );
          },
        )}

        {/* Area */}
        <path
          d={areaPath}
          fill="url(#activityGradient)"
          opacity="0.9"
        />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {points.map((point) => (
          <g key={point.label}>
            <circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill="white"
              stroke="#2563eb"
              strokeWidth="3"
            />

            <text
              x={point.x}
              y={chartHeight - 2}
              textAnchor="middle"
              fontSize="11"
              fill="#94a3b8"
            >
              {point.label}
            </text>
          </g>
        ))}

        <defs>
          <linearGradient
            id="activityGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#3b82f6"
              stopOpacity="0.20"
            />

            <stop
              offset="100%"
              stopColor="#3b82f6"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function DashboardCharts({
  verdicts = defaultVerdicts,
  activity = defaultActivity,
  totalVerifications,
  averageConfidence,
  className,
}: DashboardChartsProps) {
  const calculatedTotal =
    verdicts.reduce(
      (sum, item) =>
        sum + Math.max(item.value, 0),
      0,
    );

  const total =
    totalVerifications ??
    calculatedTotal;

  return (
    <section
      className={cn(
        "grid gap-5 lg:grid-cols-5",
        className,
      )}
    >
      {/* Verdict distribution */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <BarChart3 size={17} />
              </div>

              <h2 className="text-sm font-bold text-slate-900">
                Verdict distribution
              </h2>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              How your verification results are
              distributed.
            </p>
          </div>
        </div>

        <DonutChart data={verdicts} />

        <div className="mt-2 space-y-3">
          {verdicts.map((item) => {
            const percentage =
              total > 0
                ? Math.round(
                    (item.value / total) *
                      100,
                  )
                : 0;

            const Icon =
              getVerdictIcon(item.icon);

            return (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        item.color,
                    }}
                  />

                  <Icon
                    size={14}
                    className="text-slate-400"
                  />

                  <span className="text-xs font-medium text-slate-600">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">
                    {item.value}
                  </span>

                  <span className="w-9 text-right text-[10px] text-slate-400">
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Activity size={17} />
              </div>

              <h2 className="text-sm font-bold text-slate-900">
                Verification activity
              </h2>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Number of verification checks over the
              selected period.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-700">
            <TrendingUp size={12} />
            Activity overview
          </div>
        </div>

        <div className="mt-5">
          {activity.length > 0 ? (
            <ActivityChart data={activity} />
          ) : (
            <div className="flex h-56 items-center justify-center">
              <div className="text-center">
                <FileText
                  size={24}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-2 text-sm font-semibold text-slate-500">
                  No activity yet
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Verification activity will appear here.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Total checks
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {total}
            </p>
          </div>

          {averageConfidence !== undefined && (
            <div className="text-right">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                Avg. confidence
              </p>

              <p className="mt-1 text-lg font-bold text-blue-600">
                {Math.round(
                  Math.max(
                    0,
                    Math.min(
                      100,
                      averageConfidence,
                    ),
                  ),
                )}
                %
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```
