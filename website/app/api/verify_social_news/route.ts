import { NextResponse } from "next/server";
import { JSDOM } from 'jsdom';
import { fetchSearchResults } from "@/lib/utils";
import { analyzeWithGemini, generateImageCheckPrompt, generateTextCheckPrompt } from "@/lib/gemini";


export async function POST(request: Request) {
  try {
    const { url, claim = "verify the claim and check if it is true?",type="text" } = await request.json();

    const response = await fetch(url);
    const html = await response.text();
    
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const title = doc.title || "";
    const metaDesc = doc.querySelector('meta[name="description"]');
    const metaContent = metaDesc?.getAttribute("content") || "";
    const fullClaim = `${title}\n${metaContent}\n${claim}`;

    const imageTag = doc.querySelector('meta[property="og:image"]') || doc.querySelector("img");
    const imageUrl = imageTag?.getAttribute("content") || imageTag?.getAttribute("src") || "";

    const searchResults = await fetchSearchResults(fullClaim);
    let prompt;
    if (type == "image") {
      prompt = generateImageCheckPrompt(fullClaim, searchResults);
      
    }
    else {
      prompt=generateTextCheckPrompt(fullClaim,searchResults);
    }

    let result;

    if (imageUrl && type=="image" ) {
      const imageResponse = await fetch(imageUrl);
      const imageBuffer = await imageResponse.arrayBuffer();
      const base64Data = Buffer.from(imageBuffer).toString('base64');
      
      const supportedTypes = ['jpeg', 'png', 'webp'];
      const ext = imageUrl.split('.').pop()?.split('?')[0].toLowerCase() || 'jpeg';
      const finalExt = supportedTypes.includes(ext) ? ext : 'jpeg';
      const mimeType = `image/${finalExt}`;
      

      result= await analyzeWithGemini(prompt, {
        mimeType,
        data: base64Data
      });
    } else {
      result = await analyzeWithGemini(prompt);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error verifying social news:", error);
    return NextResponse.json(
      { error: "Failed to process social media verification request" },
      { status: 500 }
    );
  }
}