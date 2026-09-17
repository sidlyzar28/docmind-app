import UploadBox from "./components/UploadBox";

function DocumentIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h6" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 20h14" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.2 9.2 0 0 1-4-.9L3 21l1.9-4.4A8.3 8.3 0 0 1 3 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" />
      <path d="M8 12h.01" />
      <path d="M12 12h.01" />
      <path d="M16 12h.01" />
    </svg>
  );
}

function InsightIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19V9" />
      <path d="M10 19V5" />
      <path d="M16 19v-7" />
      <path d="M22 19V3" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#020817] text-white">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/[0.06] blur-3xl" />
        <div className="absolute left-[-250px] top-[400px] h-[500px] w-[500px] rounded-full bg-blue-500/[0.04] blur-3xl" />
        <div className="absolute right-[-250px] top-[500px] h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-3xl" />
      </div>

      {/* NAVIGATION */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">

        <a href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-400">
            <DocumentIcon />
          </div>

          <div>
            <div className="text-xl font-bold tracking-tight">
              Doc<span className="text-cyan-400">Mind</span>
            </div>

            <p className="text-[11px] text-slate-500">
              AI Document Intelligence
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-10 text-sm text-slate-400 md:flex">
          <a
            href="#features"
            className="transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="transition hover:text-white"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="transition hover:text-white"
          >
            About
          </a>
        </div>

        <a
          href="#upload"
          className="rounded-xl border border-cyan-400/60 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950"
        >
          Get Started →
        </a>
      </nav>

      {/* HERO */}
      <section className="relative">

        {/* Decorative left document */}
        <div className="pointer-events-none absolute left-[-90px] top-36 hidden rotate-[-12deg] opacity-30 lg:block">
          <div className="h-48 w-36 rounded-2xl border border-blue-400/30 bg-blue-400/[0.04] p-5 shadow-2xl">
            <div className="mb-5 h-2 w-20 rounded bg-blue-300/30" />
            <div className="mb-3 h-2 w-24 rounded bg-blue-300/20" />
            <div className="mb-3 h-2 w-16 rounded bg-blue-300/20" />
            <div className="mb-8 h-2 w-20 rounded bg-blue-300/20" />

            <div className="rounded-lg border border-cyan-400/20 px-3 py-2 text-center text-xs text-cyan-300">
              PDF
            </div>
          </div>
        </div>

        {/* Decorative right panel */}
        <div className="pointer-events-none absolute right-[-80px] top-48 hidden rotate-[8deg] opacity-50 lg:block">
          <div className="w-48 rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-4 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="text-cyan-400">
                <DocumentIcon />
              </div>
              <span className="text-sm text-slate-300">
                Summarize
              </span>
            </div>

            <div className="flex items-center gap-3 border-b border-slate-800 py-4">
              <div className="text-blue-400">
                <ChatIcon />
              </div>
              <span className="text-sm text-slate-300">
                Ask Questions
              </span>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <div className="text-purple-400">
                <InsightIcon />
              </div>
              <span className="text-sm text-slate-300">
                Extract Insights
              </span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-16 pt-24 text-center">

          {/* Badge */}
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/[0.06] px-5 py-2 text-sm text-cyan-300">
            <span>✦</span>
            AI-Powered Document Intelligence
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Understand your documents
            <span className="block text-cyan-400">
              instantly.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Upload a PDF, generate an AI-powered summary,
            extract important information, and ask questions
            about your document.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#upload"
              className="rounded-xl bg-cyan-400 px-8 py-3.5 font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-300"
            >
              Get Started →
            </a>

            <a
              href="#how-it-works"
              className="rounded-xl border border-slate-700 px-8 py-3.5 font-semibold text-white transition hover:border-slate-500 hover:bg-slate-900"
            >
              How It Works
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
            <span>✓ PDF Support</span>
            <span>✓ AI Summarization</span>
            <span>✓ Document Q&A</span>
            <span>✓ Powered by Gemini</span>
          </div>
        </div>
      </section>

      {/* UPLOAD */}
      <section
        id="upload"
        className="scroll-mt-10 px-6 pb-24"
      >
        <UploadBox />
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="mx-auto max-w-6xl scroll-mt-10 px-6 pb-24"
      >
        <div className="mb-12 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Features
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Everything you need to understand a document
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            DocMind combines document processing with generative AI
            to help you extract useful information faster.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {/* Upload */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-slate-900">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-400">
              <DocumentIcon />
            </div>

            <h3 className="text-xl font-semibold">
              Upload Documents
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Upload PDF documents and automatically extract
              their text for AI-powered analysis.
            </p>
          </div>

          {/* Q&A */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-900">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
              <ChatIcon />
            </div>

            <h3 className="text-xl font-semibold">
              Ask Questions
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Ask questions about the uploaded document and
              receive answers based on its content.
            </p>
          </div>

          {/* Insights */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-7 transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-slate-900">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-400/10 text-purple-400">
              <InsightIcon />
            </div>

            <h3 className="text-xl font-semibold">
              Generate Insights
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              Generate concise summaries and identify important
              information from your documents.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-y border-slate-900 bg-slate-950/70"
      >
        <div className="mx-auto max-w-6xl scroll-mt-10 px-6 py-24">

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              From PDF to answers in a few steps
            </h2>
          </div>

          <div className="relative mt-16 grid gap-12 md:grid-cols-3">

            {/* connecting lines */}
            <div className="absolute left-[20%] right-[20%] top-7 hidden h-px bg-slate-700 md:block" />

            {/* Step 1 */}
            <div className="relative z-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/50 bg-slate-950 font-bold text-cyan-400 shadow-lg shadow-cyan-500/10">
                01
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Upload
              </h3>

              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-400">
                Select a PDF document from your device.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/50 bg-slate-950 font-bold text-cyan-400 shadow-lg shadow-cyan-500/10">
                02
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Analyze
              </h3>

              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-400">
                DocMind extracts the text and sends it to Gemini
                for analysis.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/50 bg-slate-950 font-bold text-cyan-400 shadow-lg shadow-cyan-500/10">
                03
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                Understand
              </h3>

              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-400">
                Read the summary or ask questions about your
                document.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section
        id="about"
        className="mx-auto max-w-6xl scroll-mt-10 px-6 py-24"
      >
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 sm:p-10">

          <div className="grid gap-10 md:grid-cols-2 md:items-center">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                Built with modern technologies
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                A full-stack AI application
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                DocMind combines a modern web interface with a
                server-side document processing pipeline and
                generative AI.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">

              {[
                "Next.js",
                "React",
                "TypeScript",
                "Tailwind CSS",
                "PDF Parsing",
                "Gemini AI",
              ].map((technology) => (
                <div
                  key={technology}
                  className="flex items-center justify-center rounded-xl border border-slate-800 bg-slate-950 px-4 py-4 text-sm font-medium text-slate-300 transition hover:border-cyan-400/30"
                >
                  {technology}
                </div>
              ))}

            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900">

        <div className="mx-auto max-w-6xl px-6 py-12">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div>
              <div className="text-2xl font-bold">
                Doc<span className="text-cyan-400">Mind</span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                AI-powered document intelligence.
              </p>
            </div>

            <div className="flex flex-wrap gap-7 text-sm text-slate-500">
              <a href="#features" className="transition hover:text-white">
                Features
              </a>

              <a href="#how-it-works" className="transition hover:text-white">
                How It Works
              </a>

              <a href="#about" className="transition hover:text-white">
                About
              </a>
            </div>

          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-slate-900 pt-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 DocMind. All rights reserved.
            </p>

            <p className="text-slate-500">
              Made with{" "}
              <span className="text-red-400">♥</span>{" "}
              by{" "}
              <span className="font-semibold text-slate-300">
                Siddharth
              </span>
            </p>

          </div>

        </div>
      </footer>

    </main>
  );
}