import { GEMINI_API_KEY } from "./utils";

const GEMINI_API_URL = process.env.GEMINI_API_URL!;

interface GeminiResponse {
  title: string;
  truth_score: number;
  verdict: string;
  reason: string;
  evidence_links: string[];
}

type GeminiPart = {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
};

type GeminiContent = {
  role: "user" | "model";
  parts: GeminiPart[];
};

export async function analyzeWithGemini(prompt: string, imageData?: { mimeType: string; data: string }): Promise<GeminiResponse> {
  const content: GeminiContent = {
    role: "user",
    parts: []
  };

  if (imageData) {
    content.parts.push({
      inlineData: {
        mimeType: imageData.mimeType,
        data: imageData.data
      }
    });
  }

  content.parts.push({
    text: prompt
  });

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [content],
        generationConfig: {
          response_mime_type: "application/json"
        }
      })
    });

    const data = await response.json();
    console.log("Full API response:", data);
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return extractJson(responseText);
  } catch (error) {
    console.error("Gemini API error:", error);
    return {
      title:"Error",
      truth_score: 0,
      verdict: "Error",
      reason: error instanceof Error ? error.message : "API request failed",
      evidence_links: []
    };
  }
}
  
  function extractJson(text: string): GeminiResponse {
    try {
      return JSON.parse(text);
    } catch (directError) {
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (extractError) {
        console.error("JSON extraction failed:", text);
      }
    }
  
    return {
      title:"Error",
      truth_score: 0,
      verdict: "Error",
      reason: "Could not parse response",
      evidence_links: []
    };
  }

export function generateTextCheckPrompt(newsText: string, searchResults: any[]): string {
    let prompt = `Analyze this news claim and your existing data and knowledge.The respond STRICTLY in JSON format:\n\n`;
    prompt += `Claim: "${newsText}"\n\n`;
  
    if (searchResults.length > 0) {
      prompt += `Supporting search results:\n`;
      searchResults.forEach((result, i) => {
        prompt += `${i + 1}. ${result.title}\n${result.snippet}\n${result.link}\n\n`;
      });
    }
  
    prompt += `\nJSON Response Format:
    {
      "title": "string (short title according to the query)",
      "truth_score": "number (0-100)",
      "verdict": "Likely True | Possibly Fake | Unverifiable",
      "reason": "string (detailed analysis)",
      "evidence_links": ["url1", "url2"]
    }`;
  
    return prompt;
  }

export function generateImageCheckPrompt(query: string, searchResults: any[]): string {
  let prompt = `This image has been claimed to show the following:
"${query || 'No text claim provided'}"

Based on the image and the recent news articles below and your existing data and knowledge, decide if this image is authentic and related to a real incident or the subject it want to verifying.

News articles:\n`;

  searchResults.forEach((result, i) => {
    prompt += `${i + 1}. ${result.title}\nSnippet: ${result.snippet}\nLink: ${result.link}\n\n`;
  });

  prompt += `Respond in this JSON format:
{
  "title": "string (short title according to the query)",
  "truth_score": int (0-100),
  "verdict": "Likely True | Possibly Fake | Unverifiable",
  "reason": "short explanation",
  "evidence_links": ["link1", "link2"]
}`;

  return prompt;
}