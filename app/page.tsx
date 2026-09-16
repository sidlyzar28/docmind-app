import UploadBox from "./components/UploadBox";
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-2xl font-bold">
          Doc<span className="text-cyan-400">Mind</span>
        </div>

        <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800">
          Sign In
        </button>
      </nav>

      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-24 text-center">
        <div className="mb-6 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
          AI-Powered Document Intelligence
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
          Understand your documents
          <span className="text-cyan-400"> instantly.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Upload a PDF, summarize it, extract important information,
          and ask questions using AI.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300">
            Get Started
          </button>

          <button className="rounded-xl border border-slate-700 px-6 py-3 font-semibold hover:bg-slate-800">
            View Demo
          </button>
        </div>
      <UploadBox />
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-20 md:grid-cols-3">
        <Feature
          title="Upload Documents"
          description="Upload PDF documents and extract their content automatically."
        />

        <Feature
          title="Ask Questions"
          description="Ask questions and get AI-powered answers from your documents."
        />

        <Feature
          title="Generate Insights"
          description="Summarize documents and extract the information that matters."
        />
      </section>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-3 leading-7 text-slate-400">
        {description}
      </p>
    </div>
  );
}