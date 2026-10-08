```tsx id="h4q1kp"
"use client";

import {
  Check,
  Circle,
  FileSearch,
  Loader2,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface VerificationStep {
  id: string;
  label: string;
  description?: string;
}

interface VerificationProgressProps {
  steps?: VerificationStep[];
  currentStep?: number;
  completed?: boolean;
  title?: string;
  description?: string;
  className?: string;
}

const defaultSteps: VerificationStep[] = [
  {
    id: "input",
    label: "Processing input",
    description:
      "Preparing your content for analysis",
  },
  {
    id: "claims",
    label: "Identifying claims",
    description:
      "Finding factual claims that can be checked",
  },
  {
    id: "evidence",
    label: "Gathering evidence",
    description:
      "Looking for relevant supporting information",
  },
  {
    id: "analysis",
    label: "Analyzing evidence",
    description:
      "Comparing the claim against available evidence",
  },
  {
    id: "verdict",
    label: "Generating verdict",
    description:
      "Preparing the final verification result",
  },
];

const stepIcons = [
  FileSearch,
  Sparkles,
  Search,
  ShieldCheck,
  Check,
];

export default function VerificationProgress({
  steps = defaultSteps,
  currentStep = 0,
  completed = false,
  title = "Verifying your claim",
  description = "TruthLens is analyzing the submitted information. This may take a moment.",
  className,
}: VerificationProgressProps) {
  const safeCurrentStep = Math.max(
    0,
    Math.min(
      currentStep,
      Math.max(steps.length - 1, 0),
    ),
  );

  return (
    <section
      aria-live="polite"
      className={cn(
        "mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8",
        className,
      )}
    >
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          {completed ? (
            <Check size={26} />
          ) : (
            <Loader2
              size={25}
              className="animate-spin"
            />
          )}
        </div>

        <h2 className="mt-5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {completed
            ? "Verification complete"
            : title}
        </h2>

        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
          {completed
            ? "Your verification results are ready to review."
            : description}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">
            Progress
          </span>

          <span className="text-xs font-bold text-blue-600">
            {completed
              ? 100
              : Math.round(
                  (safeCurrentStep /
                    Math.max(
                      steps.length - 1,
                      1,
                    )) *
                    100,
                )}
            %
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700 ease-out"
            style={{
              width: `${
                completed
                  ? 100
                  : Math.max(
                      8,
                      (safeCurrentStep /
                        Math.max(
                          steps.length - 1,
                          1,
                        )) *
                        100,
                    )
              }%`,
            }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="mt-8">
        <div className="relative">
          {/* Connecting line */}
          {steps.length > 1 && (
            <div
              className="absolute left-[19px] top-5 hidden h-[calc(100%-40px)] w-px bg-slate-200 sm:block"
              aria-hidden="true"
            />
          )}

          <div className="space-y-5">
            {steps.map((step, index) => {
              const isCompleted =
                completed ||
                index < safeCurrentStep;

              const isCurrent =
                !completed &&
                index === safeCurrentStep;

              const StepIcon =
                stepIcons[index] ??
                Circle;

              return (
                <div
                  key={step.id}
                  className="relative flex items-start gap-4"
                >
                  {/* Step icon */}
                  <div
                    className={cn(
                      "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-all duration-300",
                      isCompleted &&
                        "border-emerald-500 bg-emerald-50 text-emerald-600",
                      isCurrent &&
                        "border-blue-500 bg-blue-50 text-blue-600",
                      !isCompleted &&
                        !isCurrent &&
                        "border-slate-200 text-slate-300",
                    )}
                  >
                    {isCompleted ? (
                      <Check size={17} />
                    ) : isCurrent ? (
                      <StepIcon
                        size={17}
                        className={
                          isCurrent
                            ? "animate-pulse"
                            : ""
                        }
                      />
                    ) : (
                      <Circle size={15} />
                    )}
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <p
                        className={cn(
                          "text-sm font-bold",
                          isCompleted &&
                            "text-emerald-700",
                          isCurrent &&
                            "text-blue-700",
                          !isCompleted &&
                            !isCurrent &&
                            "text-slate-400",
                        )}
                      >
                        {step.label}
                      </p>

                      {isCurrent && (
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-600">
                          <Loader2
                            size={10}
                            className="animate-spin"
                          />
                          In progress
                        </span>
                      )}

                      {isCompleted && (
                        <span className="text-[10px] font-semibold text-emerald-500">
                          Complete
                        </span>
                      )}
                    </div>

                    {step.description && (
                      <p
                        className={cn(
                          "mt-1 text-xs leading-5",
                          isCurrent
                            ? "text-slate-500"
                            : "text-slate-400",
                        )}
                      >
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck
            size={17}
            className="mt-0.5 shrink-0 text-slate-400"
          />

          <div>
            <p className="text-xs font-semibold text-slate-700">
              Evidence-first verification
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Results are presented with supporting evidence
              and sources whenever they are available.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```
