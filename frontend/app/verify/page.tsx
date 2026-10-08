"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Link2,
  Mic,
  Search,
  ShieldCheck,
  Upload,
} from "lucide-react";

type VerificationMode = "text" | "url" | "pdf" | "image" | "voice";

const modes = [
  {
    id: "text" as const,
    label: "Text",
    icon: FileText,
  },
  {
    id: "url" as const,
    label: "URL",
    icon: Link2,
  },
  {
    id: "pdf" as const,
    label: "PDF",
    icon: Upload,
  },
  {
    id: "image" as const,
    label: "Image",
    icon: ImageIcon,
  },
  {
    id: "voice" as const,
    label: "Voice",
    icon: Mic,
  },
];

export default function VerifyPage() {
  const [mode, setMode] = useState<VerificationMode>("text");
  const [claim, setClaim] = useState("");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);

    /*
      API integration will be connected here after
      frontend/lib/api.ts is created.

      Person 1 frontend should not directly modify
      Person 3's AI verification files.
    */

    setTimeout(() => {
      setIsVerifying(false);

      // Temporary navigation until API integration is connected.
      window.location.href = "/results";
    }, 1200);
  };

  const canVerify =
    mode === "text"
      ? claim.trim().length > 0
      : mode === "url"
        ? url.trim().length > 0
        : file !== null;

  const currentMode = modes.find((item) => item.id === mode);

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
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back Home
          </Link>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Page heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Search size={26} />
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Verify Information
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            Submit a claim, URL, document, image, or voice recording and let
            TruthLens analyze its credibility.
          </p>
        </div>

        {/* Verification card */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {/* Mode selector */}
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-800">
              Choose verification type
            </p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {modes.map((item) => {
                const Icon = item.icon;
                const active = mode === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setMode(item.id);
                      setFile(null);
                    }}
                    className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                      active
                        ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <Icon size={17} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input area */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {currentMode?.label} Verification
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  {mode === "text" &&
                    "Enter the claim you want TruthLens to verify."}

                  {mode === "url" &&
                    "Paste the URL of the webpage or news article."}

                  {mode === "pdf" &&
                    "Upload a PDF containing information or claims."}

                  {mode === "image" &&
                    "Upload an image containing the information you want to verify."}

                  {mode === "voice" &&
                    "Upload an audio recording containing the claim."}
                </p>
              </div>
            </div>

            {/* TEXT */}
            {mode === "text" && (
              <div>
                <textarea
                  value={claim}
                  onChange={(event) => setClaim(event.target.value)}
                  placeholder="Example: Scientists have discovered that drinking coffee increases life expectancy..."
                  rows={8}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />

                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>Enter a clear factual claim.</span>
                  <span>{claim.length} characters</span>
                </div>
              </div>
            )}

            {/* URL */}
            {mode === "url" && (
              <div>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
                  <Link2 size={19} className="mr-3 text-slate-400" />

                  <input
                    type="url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="https://example.com/news/article"
                    className="w-full bg-transparent py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Make sure the URL is publicly accessible.
                </p>
              </div>
            )}

            {/* FILE UPLOAD */}
            {(mode === "pdf" ||
              mode === "image" ||
              mode === "voice") && (
              <div>
                <label
                  htmlFor="verification-file"
                  className={`group flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition ${
                    file
                      ? "border-blue-300 bg-blue-50/50"
                      : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40"
                  }`}
                >
                  <input
                    id="verification-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept={
                      mode === "pdf"
                        ? ".pdf,application/pdf"
                        : mode === "image"
                          ? "image/*"
                          : "audio/*"
                    }
                  />

                  {file ? (
                    <>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
                        <CheckCircle2 size={27} />
                      </div>

                      <p className="mt-4 max-w-md truncate px-5 text-sm font-semibold text-slate-800">
                        {file.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>

                      <span className="mt-4 text-xs font-semibold text-blue-600">
                        Click to choose another file
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                        {mode === "pdf" && <FileText size={27} />}
                        {mode === "image" && <ImageIcon size={27} />}
                        {mode === "voice" && <Mic size={27} />}
                      </div>

                      <p className="mt-4 text-sm font-semibold text-slate-800">
                        Upload your {mode} file
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Drag & drop or click to browse
                      </p>

                      <span className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
                        Choose File
                      </span>
                    </>
                  )}
                </label>
              </div>
            )}
          </div>

          {/* Verification information */}
          <div className="mt-7 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <ShieldCheck size={17} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  What happens next?
                </p>

                <div className="mt-2 grid gap-2 text-xs text-slate-500 sm:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white font-bold text-blue-600 shadow-sm">
                      1
                    </span>
                    Extract claim
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white font-bold text-blue-600 shadow-sm">
                      2
                    </span>
                    Find evidence
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white font-bold text-blue-600 shadow-sm">
                      3
                    </span>
                    Generate verdict
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verify button */}
          <button
            type="button"
            disabled={!canVerify || isVerifying}
            onClick={handleVerify}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isVerifying ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Analyzing...
              </>
            ) : (
              <>
                <Search size={18} />
                Verify Information
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </div>

        {/* Trust note */}
        <div className="mx-auto mt-6 flex max-w-2xl items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
          <ShieldCheck className="mt-0.5 shrink-0 text-blue-600" size={18} />

          <p className="text-xs leading-5 text-slate-500">
            TruthLens provides an AI-assisted analysis based on available
            evidence and sources. Always review the evidence before making
            important decisions.
          </p>
        </div>
      </section>
    </main>
  );
}