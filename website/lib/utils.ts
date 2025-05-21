import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const SEARCH_ENGINE_API_KEY = process.env.SEARCH_ENGINE_API_KEY;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const CX = process.env.CX;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}

export async function fetchSearchResults(query: string = "image incident", numResults: number = 20): Promise<SearchResult[]> {
  const url = "https://www.googleapis.com/customsearch/v1";
  const params = new URLSearchParams({
    key: SEARCH_ENGINE_API_KEY!,
    cx: CX!,
    q: query,
    num: numResults.toString()
  });

  const response = await fetch(`${url}?${params.toString()}`);
  const data = await response.json();
  const results = data.items || [];

  return results.map((item: any) => ({
    title: item.title,
    snippet: item.snippet,
    link: item.link
  }));
}