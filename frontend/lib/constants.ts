```ts
import {
  FileCheck2,
  FileText,
  Image as ImageIcon,
  Link2,
  Mic,
  Search,
  LayoutDashboard,
  History,
  Info,
  ShieldCheck,
} from "lucide-react";

import type {
  Verdict,
  VerificationInputType,
} from "@/types/verification";

export const APP_NAME = "TruthLens";
export const APP_TAGLINE = "AI-Powered Information Verification";

export const NAV_ITEMS = [
  {
    label: "Verify",
    href: "/verify",
    icon: Search,
  },
  {
    label: "History",
    href: "/history",
    icon: History,
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "About",
    href: "/about",
    icon: Info,
  },
];

export const VERIFICATION_MODES: {
  type: VerificationInputType;
  label: string;
  description: string;
  icon: typeof Search;
  href: string;
}[] = [
  {
    type: "text",
    label: "Text",
    description: "Paste a claim or statement",
    icon: FileText,
    href: "/verify?mode=text",
  },
  {
    type: "url",
    label: "URL",
    description: "Verify information from a webpage",
    icon: Link2,
    href: "/verify?mode=url",
  },
  {
    type: "pdf",
    label: "PDF",
    description: "Analyze claims inside a PDF",
    icon: FileCheck2,
    href: "/verify?mode=pdf",
  },
  {
    type: "image",
    label: "Image",
    description: "Verify information from an image",
    icon: ImageIcon,
    href: "/verify?mode=image",
  },
  {
    type: "voice",
    label: "Voice",
    description: "Verify spoken information",
    icon: Mic,
    href: "/verify?mode=voice",
  },
];

export const VERDICT_CONFIG: Record<
  Verdict,
  {
    label: string;
    shortLabel: string;
    description: string;
    className: string;
    iconClassName: string;
  }
> = {
  true: {
    label: "True",
    shortLabel: "True",
    description: "The available evidence strongly supports this claim.",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconClassName: "text-emerald-600",
  },

  mostly_true: {
    label: "Mostly True",
    shortLabel: "Mostly True",
    description:
      "The claim is generally supported, but some details may require context.",
    className: "bg-green-50 text-green-700 border-green-200",
    iconClassName: "text-green-600",
  },

  partially_true: {
    label: "Partially True",
    shortLabel: "Partial",
    description:
      "Parts of the claim are supported, while other parts are inaccurate or incomplete.",
    className: "bg-lime-50 text-lime-700 border-lime-200",
    iconClassName: "text-lime-600",
  },

  misleading: {
    label: "Misleading",
    shortLabel: "Misleading",
    description:
      "The claim contains information that can create a misleading impression.",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    iconClassName: "text-amber-600",
  },

  mixed: {
    label: "Mixed",
    shortLabel: "Mixed",
    description:
      "The evidence contains both supporting and contradicting information.",
    className: "bg-orange-50 text-orange-700 border-orange-200",
    iconClassName: "text-orange-600",
  },

  false: {
    label: "False",
    shortLabel: "False",
    description: "The available evidence contradicts this claim.",
    className: "bg-red-50 text-red-700 border-red-200",
    iconClassName: "text-red-600",
  },

  unverified: {
    label: "Unverified",
    shortLabel: "Unverified",
    description:
      "There is not enough reliable evidence to determine whether this claim is true.",
    className: "bg-slate-100 text-slate-700 border-slate-200",
    iconClassName: "text-slate-500",
  },
};

export const ACCEPTED_FILE_TYPES = {
  pdf: {
    accept: {
      "application/pdf": [".pdf"],
    },
    extensions: [".pdf"],
    maxSizeMB: 20,
  },

  image: {
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    extensions: [".jpg", ".jpeg", ".png", ".webp"],
    maxSizeMB: 10,
  },

  voice: {
    accept: {
      "audio/mpeg": [".mp3"],
      "audio/wav": [".wav"],
      "audio/mp4": [".m4a"],
      "audio/ogg": [".ogg"],
      "audio/webm": [".webm"],
    },
    extensions: [".mp3", ".wav", ".m4a", ".ogg", ".webm"],
    maxSizeMB: 25,
  },
} as const;

export const VERIFICATION_STEPS = [
  {
    id: "upload",
    label: "Input",
    description: "Receiving your content",
  },
  {
    id: "extract",
    label: "Extract",
    description: "Identifying claims",
  },
  {
    id: "research",
    label: "Research",
    description: "Finding relevant evidence",
  },
  {
    id: "analyze",
    label: "Analyze",
    description: "Evaluating the evidence",
  },
  {
    id: "result",
    label: "Result",
    description: "Preparing your verdict",
  },
];

export const DASHBOARD_STATS = {
  totalVerifications: 0,
  trueClaims: 0,
  falseClaims: 0,
  averageConfidence: 0,
};

export const BRAND = {
  name: APP_NAME,
  tagline: APP_TAGLINE,
  icon: ShieldCheck,
  primaryColor: "#2563eb",
};
```
