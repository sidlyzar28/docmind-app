import { NextResponse } from "next/server";
import { getData } from "pdf-parse/worker";
import { PDFParse } from "pdf-parse";
import { GoogleGenAI } from "@google/genai";

PDFParse.setWorker(getData());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No PDF file uploaded" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Extract text from PDF
    const parser = new PDFParse({ data: buffer });

    const result = await parser.getText();

    await parser.destroy();

    const documentText = result.text;

    if (!documentText.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from this PDF." },
        { status: 400 }
      );
    }

    // Limit text for our first MVP
    const limitedText = documentText.slice(0, 30000);
    
    console.log(
  "Gemini key loaded:",
  process.env.GEMINI_API_KEY ? "YES" : "NO"
);

    // Send extracted text to Gemini
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `
You are DocMind, an AI document analysis assistant.

Analyze the following document and provide a concise summary.

Return your answer using these sections:

## Summary
Give a clear 3-5 paragraph summary.

## Key Points
Give 5-8 important points.

## Important Information
Mention important names, dates, numbers, findings, or conclusions if present.

DOCUMENT:
${limitedText}
      `,
    });

    const summary = response.text;

    return NextResponse.json({
  success: true,
  filename: file.name,
  summary,
  text: documentText,
});
  } catch (error) {
    console.error("PDF processing error:", error);

    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 }
    );
  }
}