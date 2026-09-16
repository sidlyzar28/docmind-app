"use client";

import { useState } from "react";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

      console.log("Extracted text:", data.text);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while processing the PDF.");
    } finally {
      setLoading(false);
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
    </div>
  );
}