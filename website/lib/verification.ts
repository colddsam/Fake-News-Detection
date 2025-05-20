interface VerificationResult {
  title: string;
  truth_score: number;
  verdict: string;
  reason: string;
  evidence_links: string[];
}

export async function verifyTextNews(content: string): Promise<VerificationResult> {
  try {
    const response = await fetch("/api/verify_text_news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Text verification failed:", error);
    throw new Error("Failed to verify text content");
  }
}

export async function verifyImageNews(file: File, claim: string): Promise<VerificationResult> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("claim", claim);

    const response = await fetch("/api/verify_image_news", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Image verification failed:", error);
    throw new Error("Failed to verify image content");
  }
}

export async function verifySocialNews(url: string, claim: string,type: "text" | "image"): Promise<VerificationResult> {
  try {
    const response = await fetch("/api/verify_social_news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, claim,type }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Social media verification failed:", error);
    throw new Error("Failed to verify social media content");
  }
}