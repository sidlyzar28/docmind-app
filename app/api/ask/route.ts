import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const documentText = body.documentText;
    const question = body.question;

    if (!documentText) {
      return NextResponse.json(
        { error: "Document text is missing." },
        { status: 400 }
      );
    }

    if (!question || !question.trim()) {
      return NextResponse.json(
        { error: "Please enter a question." },
        { status: 400 }
      );
    }

    const limitedText = documentText.slice(0, 30000);

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `
You are DocMind, an AI document question-answering assistant.

Answer the user's question using ONLY the information contained in the document below.

If the answer cannot be found in the document, clearly say:
"I couldn't find that information in the document."

Do not invent or assume information.

DOCUMENT:
${limitedText}

USER QUESTION:
${question}
      `,
    });

    const answer = response.text;

    return NextResponse.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Q&A error:", error);

    return NextResponse.json(
      { error: "Failed to answer the question." },
      { status: 500 }
    );
  }
}