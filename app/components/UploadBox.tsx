"use client";

import { DragEvent, useRef, useState } from "react";

function DocumentIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
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

function CloudUploadIcon() {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.7-9" />
      <path d="M16 16l4-4 4 4" />
      <path d="M20 12v8" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.3 5.7L5 10l5.7 1.3L12 17l1.3-5.7L19 10l-5.7-1.3L12 3Z" />
      <path d="m19 16-.6 2.4L16 19l2.4.6L19 22l.6-2.4L22 19l-2.4-.6L19 16Z" />
    </svg>
  );
}

const MAX_FILE_SIZE = 20 * 1024 * 1024;

export default function UploadBox() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [documentText, setDocumentText] = useState("");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);

  const [dragging, setDragging] = useState(false);

  function selectFile(selectedFile: File | null) {
    if (!selectedFile) {
      return;
    }

    setMessage("");
    setSummary("");
    setAnswer("");

    if (selectedFile.type !== "application/pdf") {
      setFile(null);
      setMessage("Please select a PDF file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFile(null);
      setMessage("The PDF must be smaller than 20 MB.");
      return;
    }

    setFile(selectedFile);
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile = event.target.files?.[0] || null;
    selectFile(selectedFile);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);

    const droppedFile = event.dataTransfer.files?.[0] || null;
    selectFile(droppedFile);
  }

  async function handleUpload() {
    if (!file) {
      setMessage("Please select a PDF first.");
      return;
    }

    setLoading(true);
    setMessage("");
    setSummary("");
    setAnswer("");

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setMessage(
        `${data.filename} was analyzed successfully.`
      );

      setSummary(data.summary);
      setDocumentText(data.text);
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while processing the PDF."
      );
    } finally {
      setLoading(false);
    }
  }

  async function askQuestion() {
    if (!documentText) {
      setAnswer("Please upload a PDF first.");
      return;
    }

    if (!question.trim()) {
      setAnswer("Please enter a question.");
      return;
    }

    setAsking(true);
    setAnswer("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentText,
          question,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Question failed");
      }

      setAnswer(data.answer);
    } catch (error) {
      console.error(error);

      setAnswer(
        "Something went wrong while answering your question."
      );
    } finally {
      setAsking(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">

      {/* Main upload card */}
      <div className="rounded-3xl border border-slate-700/80 bg-slate-900/60 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur sm:p-8">

        {/* Heading */}
        <div className="mb-6 flex items-center gap-4 text-left">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
            <DocumentIcon />
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Upload your document
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Upload a PDF to generate an AI summary and ask
              questions about its contents.
            </p>
          </div>

        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Drop zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group flex min-h-[230px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-10 text-center transition ${
            dragging
              ? "border-cyan-400 bg-cyan-400/10"
              : "border-slate-600 bg-slate-950/50 hover:border-cyan-400/50 hover:bg-slate-950"
          }`}
        >

          <div
            className={`mb-5 transition ${
              dragging
                ? "scale-110 text-cyan-300"
                : "text-blue-300 group-hover:text-cyan-300"
            }`}
          >
            <CloudUploadIcon />
          </div>

          <h3 className="text-lg font-semibold text-slate-200">
            Drag & drop your PDF here
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            or{" "}
            <span className="font-medium text-cyan-400">
              click to browse
            </span>
          </p>

          <p className="mt-4 text-xs text-slate-600">
            Only PDF files are supported · Max 20 MB
          </p>

        </div>

        {/* Selected file */}
        {file && (
          <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] px-4 py-3">

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-cyan-300">
                {file.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setFile(null);
                setMessage("");
                setSummary("");
                setDocumentText("");
                setAnswer("");
                setQuestion("");
              }}
              className="shrink-0 text-xs text-slate-500 transition hover:text-red-400"
            >
              Remove
            </button>

          </div>
        )}

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3.5 font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <SparkleIcon />

          {loading
            ? "Analyzing document..."
            : "Upload & Analyze"}
        </button>

        {/* Status */}
        {message && (
          <p className="mt-4 text-center text-sm text-slate-400">
            {message}
          </p>
        )}

        {/* AI SUMMARY */}
        {summary && (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-left shadow-lg">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                <SparkleIcon />
              </div>

              <div>
                <h2 className="text-xl font-bold text-cyan-300">
                  AI Analysis
                </h2>

                <p className="text-xs text-slate-500">
                  Generated from your document
                </p>
              </div>
            </div>

            <div className="mt-5 whitespace-pre-wrap leading-7 text-slate-300">
              {summary}
            </div>

          </div>
        )}

        {/* Q&A */}
        {documentText && (
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-left shadow-lg">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-400/10 text-blue-400">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.2 9.2 0 0 1-4-.9L3 21l1.9-4.4A8.3 8.3 0 0 1 3 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" />
                </svg>
              </div>

              <div>
                <h2 className="text-xl font-bold text-cyan-300">
                  Ask Questions
                </h2>

                <p className="text-xs text-slate-500">
                  Ask about the uploaded document
                </p>
              </div>

            </div>

            <textarea
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
              placeholder="What are the main findings?"
              className="mt-5 min-h-32 w-full resize-y rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/60"
            />

            <button
              onClick={askQuestion}
              disabled={asking}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {asking ? "Thinking..." : "Ask AI"}
            </button>

            {answer && (
              <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900 p-5">

                <p className="text-sm font-semibold text-cyan-300">
                  AI Answer
                </p>

                <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-300">
                  {answer}
                </p>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}