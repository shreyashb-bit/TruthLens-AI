"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  FileCheck2,
  FileText,
  Globe2,
  Image as ImageIcon,
  Link2,
  Mic,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Submit Information",
    description:
      "Enter a claim or provide a URL, PDF, image, or voice recording.",
    icon: Upload,
  },
  {
    number: "02",
    title: "Extract the Claim",
    description:
      "TruthLens processes the submitted content and identifies the claim that needs verification.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Find Evidence",
    description:
      "Relevant information and sources are retrieved to evaluate the claim.",
    icon: Search,
  },
  {
    number: "04",
    title: "Generate Verdict",
    description:
      "The evidence is analyzed and presented as a clear verdict with confidence and supporting sources.",
    icon: CheckCircle2,
  },
];

const inputTypes = [
  {
    title: "Text",
    description: "Paste a factual claim directly.",
    icon: FileText,
  },
  {
    title: "URL",
    description: "Analyze information from a webpage.",
    icon: Link2,
  },
  {
    title: "PDF",
    description: "Extract and verify claims from documents.",
    icon: FileCheck2,
  },
  {
    title: "Image",
    description: "Analyze claims contained in images.",
    icon: ImageIcon,
  },
  {
    title: "Voice",
    description: "Convert spoken information into verifiable claims.",
    icon: Mic,
  },
];

export default function AboutPage() {
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
            Verify a Claim
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:px-8 sm:py-24">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <BrainCircuit size={27} />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-blue-600">
            About TruthLens
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            Making information easier to verify.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            TruthLens is an AI-powered claim verification platform designed to
            help users understand whether information is supported by available
            evidence.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/verify"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Start Verification
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* What is TruthLens */}
      <section className="border-y border-slate-200 bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              The Idea
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Information moves fast.
              <br />
              Verification should too.
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              Online users encounter news, social media posts, forwarded
              messages, documents, images, and videos every day. Determining
              whether a claim is reliable can take significant time.
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              TruthLens provides an interface where users can submit different
              types of information and receive an evidence-oriented analysis
              instead of relying on a simple unexplained prediction.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard
                icon={BrainCircuit}
                title="AI Analysis"
                text="Intelligent processing of submitted information."
              />

              <InfoCard
                icon={Search}
                title="Evidence"
                text="Relevant information is used to evaluate claims."
              />

              <InfoCard
                icon={Globe2}
                title="Sources"
                text="Users can inspect supporting source information."
              />

              <InfoCard
                icon={ShieldCheck}
                title="Transparency"
                text="Results include confidence and explanation."
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              From information to insight
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              TruthLens organizes the verification process into understandable
              steps.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon size={21} />
                    </div>

                    <span className="text-xs font-bold text-slate-300">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Input types */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Multiple Inputs
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Verify information in different formats
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {inputTypes.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={19} />
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Sparkles size={22} />
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
            Built for explainable verification
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            The TruthLens frontend is designed around a simple principle:
            users should be able to understand not only the verdict, but also
            the evidence and sources behind it.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Tailwind CSS",
              "AI",
              "Evidence Retrieval",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Ready to check a claim?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Put TruthLens to work and explore the evidence behind the
            information you encounter.
          </p>

          <Link
            href="/verify"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Verify Information
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-bold text-slate-900">TruthLens AI</p>

          <div className="flex gap-5 text-xs text-slate-500">
            <Link href="/verify" className="hover:text-blue-600">
              Verify
            </Link>
            <Link href="/history" className="hover:text-blue-600">
              History
            </Link>
            <Link href="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function InfoCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
        <Icon size={19} />
      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-900">{title}</h3>

      <p className="mt-1 text-xs leading-5 text-slate-500">{text}</p>
    </div>
  );
}