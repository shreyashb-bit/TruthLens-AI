```ts
export type VerificationInputType =
  | "text"
  | "url"
  | "pdf"
  | "image"
  | "voice";

export type Verdict =
  | "true"
  | "mostly_true"
  | "partially_true"
  | "misleading"
  | "false"
  | "unverified"
  | "mixed";

export type VerificationStatus =
  | "idle"
  | "uploading"
  | "processing"
  | "completed"
  | "failed";

export interface VerificationRequest {
  type: VerificationInputType;
  text?: string;
  url?: string;
  file?: File;
}

export interface Evidence {
  id: string;
  title: string;
  description: string;
  sourceUrl?: string;
  sourceName?: string;
  publishedAt?: string;
  relevanceScore?: number;
  supportsClaim?: boolean;
}

export interface Source {
  id: string;
  name: string;
  url: string;
  domain?: string;
  title?: string;
  credibilityScore?: number;
  publishedAt?: string;
  snippet?: string;
}

export interface Claim {
  id: string;
  text: string;
  verdict?: Verdict;
  confidence?: number;
  explanation?: string;
  evidence?: Evidence[];
  sources?: Source[];
}

export interface VerificationResult {
  id: string;
  inputType: VerificationInputType;
  originalInput?: string;
  title?: string;
  summary?: string;
  verdict: Verdict;
  confidence: number;
  claims: Claim[];
  evidence: Evidence[];
  sources: Source[];
  createdAt: string;
  processingTimeMs?: number;
}

export interface VerificationJob {
  id: string;
  status: VerificationStatus;
  progress: number;
  message?: string;
  result?: VerificationResult;
  error?: string;
}

export interface VerificationHistoryItem {
  id: string;
  inputType: VerificationInputType;
  title: string;
  preview?: string;
  verdict: Verdict;
  confidence: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```
