"use client";

import { useState } from "react";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [documentText, setDocumentText] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [asking, setAsking] = useState(false);

  async function handleUpload() {
    if (!file) {
      setMessage("Please select a PDF first.");
      return;
    }

    setLoading(true);
    setMessage("");

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
  `Success! ${data.filename} was processed successfully.`
);

setSummary(data.summary);
setDocumentText(data.text);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while processing the PDF.");
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
    setAnswer("Something went wrong while answering your question.");
  } finally {
    setAsking(false);
  }
}


  return (
    <div className="mt-10 w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">
          Upload your document
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Select a PDF and let DocMind analyze it.
        </p>
      </div>

      <div className="mt-6">
        <input
          type="file"
          accept="application/pdf"
          onChange={(event) => {
            setFile(event.target.files?.[0] || null);
            setMessage("");
          }}
          className="block w-full cursor-pointer rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-300"
        />
      </div>

      {file && (
        <p className="mt-3 text-sm text-cyan-400">
          Selected: {file.name}
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Processing..." : "Upload & Analyze"}
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-slate-300">
          {message}
        </p>
      )}
      {summary && (
  <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-6 text-left">
    <h2 className="text-2xl font-semibold text-cyan-400">
      AI Analysis
    </h2>

    <div className="mt-4 whitespace-pre-wrap leading-7 text-slate-300">
      {summary}
    </div>
  </div>
)}
{documentText && (
  <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-6 text-left">
    <h2 className="text-2xl font-semibold text-cyan-400">
      Ask Questions
    </h2>

    <p className="mt-2 text-sm text-slate-400">
      Ask anything about the uploaded document.
    </p>

    <textarea
      value={question}
      onChange={(event) => setQuestion(event.target.value)}
      placeholder="e.g. What are the main findings?"
      className="mt-4 min-h-32 w-full rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm text-white outline-none focus:border-cyan-400"
    />

    <button
      onClick={askQuestion}
      disabled={asking}
      className="mt-4 w-full rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {asking ? "Thinking..." : "Ask AI"}
    </button>

    {answer && (
      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h3 className="font-semibold text-cyan-400">
          AI Answer
        </h3>

        <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-300">
          {answer}
        </p>
      </div>
    )}
  </div>
)}
    </div>
  );
}