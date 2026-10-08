```tsx
"use client";

import {
  AlertTriangle,
  CheckCircle2,
  CircleHelp,
  Info,
  XCircle,
} from "lucide-react";

import { cn, getVerdictLabel } from "@/lib/utils";

import type { Verdict } from "@/types/verification";

interface VerdictBadgeProps {
  verdict: Verdict;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

const verdictStyles: Record<
  Verdict,
  {
    className: string;
    iconClassName: string;
  }
> = {
  true: {
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    iconClassName: "text-emerald-600",
  },

  mostly_true: {
    className:
      "border-green-200 bg-green-50 text-green-700",
    iconClassName: "text-green-600",
  },

  partially_true: {
    className:
      "border-lime-200 bg-lime-50 text-lime-700",
    iconClassName: "text-lime-600",
  },

  misleading: {
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
    iconClassName: "text-amber-600",
  },

  mixed: {
    className:
      "border-orange-200 bg-orange-50 text-orange-700",
    iconClassName: "text-orange-600",
  },

  false: {
    className:
      "border-red-200 bg-red-50 text-red-700",
    iconClassName: "text-red-600",
  },

  unverified: {
    className:
      "border-slate-200 bg-slate-100 text-slate-600",
    iconClassName: "text-slate-500",
  },
};

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

const sizeStyles = {
  sm: {
    wrapper:
      "gap-1 px-2 py-1 text-[10px]",
    icon: 12,
  },

  md: {
    wrapper:
      "gap-1.5 px-2.5 py-1.5 text-xs",
    icon: 14,
  },

  lg: {
    wrapper:
      "gap-2 px-3 py-2 text-sm",
    icon: 16,
  },
} as const;

export default function VerdictBadge({
  verdict,
  size = "md",
  showIcon = true,
  className,
}: VerdictBadgeProps) {
  const style =
    verdictStyles[verdict] ??
    verdictStyles.unverified;

  const Icon =
    verdictIcons[verdict] ??
    CircleHelp;

  const sizeStyle =
    sizeStyles[size];

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full border font-bold leading-none",
        style.className,
        sizeStyle.wrapper,
        className,
      )}
    >
      {showIcon && (
        <Icon
          size={sizeStyle.icon}
          className={cn(
            "shrink-0",
            style.iconClassName,
          )}
          aria-hidden="true"
        />
      )}

      <span>
        {getVerdictLabel(verdict)}
      </span>
    </span>
  );
}
```
