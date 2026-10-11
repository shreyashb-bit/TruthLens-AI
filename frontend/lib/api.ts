import type {
  ApiResponse,
  VerificationHistoryItem,
  VerificationJob,
  VerificationRequest,
  VerificationResult,
} from "@/types/verification";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "");
const RESULT_STORAGE_KEY = "truthlens:results";
const HISTORY_STORAGE_KEY = "truthlens:history";

type BackendVerification = { id: number | string; text: string; verdict: string };
type BackendHistory = { history?: BackendVerification[] };

export class ApiError extends Error {
  constructor(message: string, public status = 500, public details?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: { Accept: "application/json", ...options.headers },
      signal: AbortSignal.timeout(60_000),
    });
  } catch (error) {
    throw new ApiError(error instanceof Error && error.name === "TimeoutError"
      ? "The request timed out. Please try again."
      : `Unable to connect to the verification service at ${API_URL}.`, 503, error);
  }

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload && typeof payload === "object"
      ? ("detail" in payload && typeof payload.detail === "string" ? payload.detail
        : "message" in payload && typeof payload.message === "string" ? payload.message : null)
      : null;
    throw new ApiError(message || `Request failed with status ${response.status}.`, response.status, payload);
  }
  return payload as T;
}

function readStoredResults(): VerificationResult[] {
  try {
    return JSON.parse(localStorage.getItem(RESULT_STORAGE_KEY) || "[]") as VerificationResult[];
  } catch {
    return [];
  }
}

function saveResult(result: VerificationResult): void {
  const results = [result, ...readStoredResults().filter((item) => item.id !== result.id)].slice(0, 100);
  localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(results));
}

function mapVerdict(verdict: string): VerificationResult["verdict"] {
  const normalized = verdict.toLowerCase().replace(/[ -]/g, "_");
  if (["true", "mostly_true", "partially_true", "misleading", "false", "unverified", "mixed"].includes(normalized)) {
    return normalized as VerificationResult["verdict"];
  }
  return "unverified";
}

function toResult(record: BackendVerification, inputType: VerificationRequest["type"]): VerificationResult {
  const createdAt = new Date().toISOString();
  return {
    id: String(record.id),
    inputType,
    originalInput: record.text,
    title: record.text,
    summary: record.verdict.toLowerCase() === "pending"
      ? "The backend accepted this claim, but its verification engine returned a pending verdict."
      : `Backend verdict: ${record.verdict}. Review the evidence before relying on this result.`,
    verdict: mapVerdict(record.verdict),
    confidence: 0,
    claims: [{ id: `${record.id}-claim`, text: record.text, verdict: mapVerdict(record.verdict), confidence: 0 }],
    evidence: [],
    sources: [],
    createdAt,
  };
}

/** Uses the existing FastAPI /verify JSON contract for claims and URLs. */
export async function submitVerification(requestData: VerificationRequest): Promise<VerificationJob> {
  let record: BackendVerification;
  let input = requestData.text?.trim() || "";

  if (requestData.type === "text" || requestData.type === "url") {
    if (requestData.type === "url") input = requestData.url?.trim() || "";
    if (!input) throw new ApiError("Enter a claim or URL to verify.", 400);
    record = await request<BackendVerification>("/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });
  } else {
    if (!requestData.file) throw new ApiError("Choose a file to upload.", 400);
    const form = new FormData();
    form.append("file", requestData.file);
    const uploaded = await request<{ filename: string; message: string }>("/upload", { method: "POST", body: form });
    const id = `upload-${Date.now()}`;
    record = { id, text: `${uploaded.filename} — ${uploaded.message}`, verdict: "unverified" };
  }

  const result = toResult(record, requestData.type);
  saveResult(result);
  return { id: result.id, status: "completed", progress: 100, result };
}

export async function getVerification(verificationId: string): Promise<VerificationResult> {
  const result = readStoredResults().find((item) => item.id === verificationId);
  if (!result) throw new ApiError("This result is not available in this browser session.", 404);
  return result;
}

export async function getVerificationJob(jobId: string): Promise<VerificationJob> {
  const result = await getVerification(jobId);
  return { id: result.id, status: "completed", progress: 100, result };
}

export async function getVerificationHistory(): Promise<VerificationHistoryItem[]> {
  const payload = await request<BackendHistory | ApiResponse<BackendHistory>>("/history");
  const wrapped = payload as ApiResponse<BackendHistory>;
  const data: BackendHistory = wrapped.data ?? payload as BackendHistory;
  const entries = data.history || [];
  const results = readStoredResults();
  const mapped = entries.map((entry) => {
    const id = String(entry.id);
    const result = results.find((item) => item.id === id);
    return {
      id,
      inputType: result?.inputType || "text",
      title: entry.text,
      preview: entry.text,
      verdict: mapVerdict(entry.verdict),
      confidence: result?.confidence || 0,
      createdAt: result?.createdAt || new Date().toISOString(),
    } satisfies VerificationHistoryItem;
  });
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(mapped));
  return mapped;
}

export function getLocalVerificationHistory(): VerificationHistoryItem[] {
  return readStoredResults().map((result) => ({
    id: result.id,
    inputType: result.inputType,
    title: result.title || result.originalInput || "Verification",
    preview: result.originalInput,
    verdict: result.verdict,
    confidence: result.confidence,
    createdAt: result.createdAt,
  }));
}
