import { NextResponse } from "next/server";
import { fetchSearchResults } from "@/lib/utils";
import { analyzeWithGemini, generateTextCheckPrompt } from "@/lib/gemini";
const ALLOWED_ORIGINS = [
  process.env.EXTENSION!,
  process.env.BROWSER!
];


export async function POST(request: Request) {
  
  try {
    const origin = request.headers.get("origin");

    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const searchResults = await fetchSearchResults(content);
    const prompt = generateTextCheckPrompt(content, searchResults);

    const result = await analyzeWithGemini(prompt);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error verifying text news:", error);
    return NextResponse.json(
      { error: "Failed to process text verification request" },
      { status: 500 }
    );
  }
}