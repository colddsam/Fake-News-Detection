import { NextResponse } from "next/server";
import { fetchSearchResults } from "@/lib/utils";
import { analyzeWithGemini, generateImageCheckPrompt } from "@/lib/gemini";
import { writeFile } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

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
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const query = formData.get("query") as string;

    if (!file) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join(tmpdir(), file.name);
    await writeFile(path, buffer);

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpeg";
    const mimeType = `image/${ext === "jpg" ? "jpeg" : ext}`;

    const base64Data = buffer.toString("base64");

    const searchResults = query ? await fetchSearchResults(query) : [];
    const prompt = generateImageCheckPrompt(query || "check if this incident fake or real?", searchResults);

    const result = await analyzeWithGemini(prompt, {
      mimeType,
      data: base64Data
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error verifying image news:", error);
    return NextResponse.json(
      { error: "Failed to process image verification request" },
      { status: 500 }
    );
  }
}

