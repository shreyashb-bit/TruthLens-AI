```ts
import type {
  ApiResponse,
  VerificationHistoryItem,
  VerificationJob,
  VerificationRequest,
  VerificationResult,
} from "@/types/verification";

/**
 * Backend base URL.
 *
 * Set NEXT_PUBLIC_API_URL in frontend/.env.local when the backend
 * runs separately from the Next.js frontend.
 *
 * Example:
 * NEXT_PUBLIC_API_URL=http://localhost:8000
 */
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Remove a trailing slash so endpoint construction stays predictable.
 */
const API_URL = API_BASE_URL.replace(/\/$/, "");

/**
 * Default request timeout.
 */
const DEFAULT_TIMEOUT = 60_000;

/**
 * Error thrown when the backend cannot be reached or returns an error.
 */
export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(
    message: string,
    status = 500,
    details?: unknown,
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

/**
 * Generic JSON request helper.
 *
 * This is intentionally kept in one place so the individual API
 * functions remain small and easy to replace if Person 3 changes
 * the backend endpoint names.
 */
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  timeout = DEFAULT_TIMEOUT,
): Promise<T> {
  const controller = new AbortController();

  const timeoutId = window.setTimeout(
    () => controller.abort(),
    timeout,
  );

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...options.headers,
      },
    });

    const contentType =
      response.headers.get("content-type") || "";

    let payload: unknown = null;

    if (contentType.includes("application/json")) {
      try {
        payload = await response.json();
      } catch {
        payload = null;
      }
    } else {
      try {
        payload = await response.text();
      } catch {
        payload = null;
      }
    }

    if (!response.ok) {
      const message =
        typeof payload === "object" &&
        payload !== null &&
        "message" in payload &&
        typeof payload.message === "string"
          ? payload.message
          : typeof payload === "object" &&
              payload !== null &&
              "detail" in payload &&
              typeof payload.detail === "string"
            ? payload.detail
            : `Request failed with status ${response.status}.`;

      throw new ApiError(
        message,
        response.status,
        payload,
      );
    }

    return payload as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      throw new ApiError(
        "The request timed out. Please try again.",
        408,
      );
    }

    throw new ApiError(
      "Unable to connect to the verification service. Please try again.",
      503,
      error,
    );
  } finally {
    window.clearTimeout(timeoutId);
  }
}

/**
 * Normalize an API response that may either be:
 *
 * 1. { success: true, data: ... }
 * 2. { data: ... }
 * 3. the actual object directly
 *
 * This gives the frontend some tolerance while the backend contract
 * is being finalized.
 */
function unwrapResponse<T>(
  payload: ApiResponse<T> | T,
): T {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "data" in payload &&
    payload.data !== undefined
  ) {
    return payload.data as T;
  }

  return payload as T;
}

/**
 * Build a FormData object for verification submissions.
 */
function buildVerificationFormData(
  requestData: VerificationRequest,
): FormData {
  const formData = new FormData();

  formData.append("type", requestData.type);

  if (requestData.text) {
    formData.append("text", requestData.text);
  }

  if (requestData.url) {
    formData.append("url", requestData.url);
  }

  if (requestData.file) {
    formData.append("file", requestData.file);
  }

  return formData;
}

/**
 * Start a verification.
 *
 * IMPORTANT:
 * The endpoint below is the frontend's integration point.
 * If the existing Person 3 backend uses a different route,
 * change this single endpoint rather than modifying components.
 */
export async function submitVerification(
  requestData: VerificationRequest,
): Promise<VerificationJob> {
  const formData =
    buildVerificationFormData(requestData);

  const response = await request<
    ApiResponse<VerificationJob> | VerificationJob
  >("/api/verify", {
    method: "POST",
    body: formData,
  });

  return unwrapResponse(response);
}

/**
 * Fetch a completed verification by ID.
 */
export async function getVerification(
  verificationId: string,
): Promise<VerificationResult> {
  const response = await request<
    ApiResponse<VerificationResult> | VerificationResult
  >(
    `/api/verify/${encodeURIComponent(
      verificationId,
    )}`,
  );

  return unwrapResponse(response);
}

/**
 * Fetch the current state of a verification job.
 *
 * Useful when the backend processes PDFs, images, or voice
 * asynchronously.
 */
export async function getVerificationJob(
  jobId: string,
): Promise<VerificationJob> {
  const response = await request
```
