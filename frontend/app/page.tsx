"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Image as ImageIcon,
  Link2,
  Mic,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react";

const verificationModes = [
  {
    icon: Search,
    title: "Text Verification",
    description:
      "Paste a claim or statement and let TruthLens analyze its credibility.",
    href: "/verify?mode=text",
  },
  {
    icon: Link2,
    title: "URL Verification",
    description:
      "Submit a webpage or news URL to analyze claims and supporting sources.",
    href: "/verify?mode=url",
  },
  {
    icon: FileCheck2,
    title: "PDF Verification",
    description:
      "Upload a PDF and extract claims for automated fact verification.",
    href: "/verify?mode=pdf",
  },
  {
    icon: ImageIcon,
    title: "Image Verification",
    description:
      "Upload an image containing a claim and analyze its information.",
    href: "/verify?mode=image",
  },
  {
    icon: Mic,
    title: "Voice Verification",
    description:
      "Upload or record audio and convert spoken claims into verifiable text.",
    href: "/verify?mode=voice",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "AI-Powered Verification",
    description:
      "Analyze claims using an intelligent verification pipeline designed for reliable results.",
  },
  {
    icon: Search,
    title: "Evidence-Based Results",
    description:
      "Go beyond a simple verdict by presenting evidence and relevant sources.",
  },
  {
    icon: Zap,
    title: "Fast Analysis",
    description:
      "Submit content and follow the verification process in a clean, real-time interface.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <ShieldCheck size={23} strokeWidth={2.2} />
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight text-slate-900">
                TruthLens
              </p>
              <p className="-mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                AI Verification
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <Link
              href="/verify"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Verify
            </Link>

            <Link
              href="/history"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              History
            </Link>

            <Link
              href="/dashboard"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Dashboard
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              About
            </Link>
          </div>

          <Link
            href="/verify"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Verify a Claim
            <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute left-1/2 top-0 -z-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-8 sm:pb-24 sm:pt-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles size={15} />
              AI-Powered Information Verification
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Don't just read a claim.
              <span className="block text-blue-600">
                Verify what&apos;s true.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              TruthLens uses AI to analyze claims, find supporting evidence,
              evaluate sources, and provide an understandable verification
              result.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/verify"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 sm:w-auto"
              >
                <Search size={18} />
                Start Verification
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/about"
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
              >
                Learn How It Works
              </Link>
            </div>
          </div>

          {/* Hero verification card */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/60">
              <div className="rounded-xl bg-slate-50 p-5 sm:p-7">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Claim Verification
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Analyze information before you trust or share it.
                    </p>
                  </div>

                  <div className="hidden rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-500 shadow-sm sm:block">
                    TruthLens AI
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-sm leading-6 text-slate-600">
                    “The claim submitted for verification will be analyzed
                    against available evidence and relevant sources.”
                  </p>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-medium text-slate-400">
                      CLAIM
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-800">
                      Extracted
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-medium text-slate-400">
                      EVIDENCE
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-800">
                      Analyzed
                    </p>
                  </div>

                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-xs font-medium text-blue-500">
                      VERDICT
                    </p>
                    <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-blue-700">
                      <CheckCircle2 size={16} />
                      Verified
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification modes */}
      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Verify Anything
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Multiple ways to check information
            </h2>

            <p className="mt-4 text-slate-600">
              Choose the input format that matches the information you want to
              verify.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {verificationModes.map((mode) => {
              const Icon = mode.icon;

              return (
                <Link
                  key={mode.title}
                  href={mode.href}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/60"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    {mode.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {mode.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600">
                    Verify
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                Why TruthLens
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                From claim to evidence to verdict.
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-slate-600">
                TruthLens is designed to make information verification
                understandable instead of simply returning a black-box
                prediction.
              </p>

              <Link
                href="/verify"
                className="mt-7 inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700"
              >
                Try TruthLens
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <Icon size={21} />
                    </div>

                    <h3 className="mt-5 font-bold text-slate-900">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-12 shadow-sm sm:px-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Upload size={25} />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">
              Ready to verify a claim?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              Submit text, URLs, PDFs, images, or voice input and see how
              TruthLens evaluates the information.
            </p>

            <Link
              href="/verify"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Start Verification
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-bold text-slate-900">TruthLens AI</p>
            <p className="mt-1 text-xs text-slate-500">
              AI-powered claim verification and evidence analysis.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-slate-500">
            <Link href="/verify" className="hover:text-blue-600">
              Verify
            </Link>
            <Link href="/history" className="hover:text-blue-600">
              History
            </Link>
            <Link href="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}