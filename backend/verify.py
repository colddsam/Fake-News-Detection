from google import genai
from google.genai import types
import requests
import os
import re
import json

from utils import GEMINI_API_KEY

client=genai.Client(api_key=GEMINI_API_KEY)

def generate_text_check_prompt(news_text:str="", search_results:list=[]):
    prompt = f"Check if this news is true: \"{news_text}\"\n\n"
    prompt += "Supporting search results:\n"

    for i, result in enumerate(search_results, 1):
        prompt += f"{i}. Title: {result['title']}\n"
        prompt += f"   Snippet: {result['snippet']}\n"
        prompt += f"   Link: {result['link']}\n\n"

    prompt += (
        "Analyze and respond in this exact JSON format:\n"
        "{\n"
        "  \"truth_score\": int (0-100),\n"
        "  \"verdict\": \"Likely True | Possibly Fake | Unverifiable\",\n"
        "  \"reason\": \"short explanation\",\n"
        "  \"evidence_links\": [\"link1\", \"link2\"]\n"
        "}"
    )
    return prompt

def generate_image_check_prompt(query:str="",search_results:list=[])->str:
    prompt = f"""This image has been claimed to show the following:
    "{query or 'No text claim provided'}"

    Based on the image and the recent news articles below and your existing data and knowledge, decide if this image is authentic and related to a real incident.

    News articles:
    """

    for i, result in enumerate(search_results, 1):
            prompt += f"{i}. {result['title']}\nSnippet: {result['snippet']}\nLink: {result['link']}\n\n"

    prompt += """
    Respond in this JSON format:
    {
      "truth_score": int (0-100),
      "verdict": "Likely True | Possibly Fake | Unverifiable",
      "reason": "short explanation",
      "evidence_links": ["link1", "link2"]
    }
    """
    return prompt

def generate_social_check_prompt(query:str="",search_results:list=[])->str:
    prompt = f"""This news has been claimed to show the following:
    "{query or 'No text claim provided'}"

    Based on the claim and the recent news articles below and your existing data and knowledge, decide if this claim is authentic and related to a real incident.

    News articles:
    """

    for i, result in enumerate(search_results, 1):
            prompt += f"{i}. {result['title']}\nSnippet: {result['snippet']}\nLink: {result['link']}\n\n"

    prompt += """
    Respond in this JSON format:
    {
      "truth_score": int (0-100),
      "verdict": "Likely True | Possibly Fake | Unverifiable",
      "reason": "short explanation",
      "evidence_links": ["link1", "link2"]
    }
    """
    return prompt

def extract_json(text:str=""):
    try:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            json_str = match.group(0)
            return json.loads(json_str)
    except Exception as e:
        return {"error": f"Failed to parse response: {str(e)}"}

def analyze_text_news(news_text, search_results):
    prompt = generate_text_check_prompt(news_text, search_results)

    response=client.models.generate_content(
    model="gemini-2.5-flash-preview-04-17", contents=prompt
    )
    

    try:
        result= extract_json(response.text)
        
    except:
        result = {"error": "Could not parse Gemini response."}
    return result

def analyze_image_news(image_path:str="",claim_text:str="",search_results:list=[]):
    ext=os.path.splitext(image_path)[-1][1:]
    with open(image_path, 'rb') as f:
        image_bytes = f.read()
        
    prompt=generate_image_check_prompt(query=claim_text,search_results=search_results)
    
    resultsGenAI=client.models.generate_content(
    model="gemini-2.5-flash-preview-04-17", contents=[types.Part.from_bytes(
        data=image_bytes,
        mime_type=f'image/{ext}',
      ),prompt]
    )
    
    resultJson = extract_json(resultsGenAI.text)
    
    return resultJson

def analyze_social_news(image_path:str="",claim_text:str="",search_results:list=[]):
    ext = os.path.splitext(image_path)[-1][1:] or "jpeg"
    
    if "?" in ext:
        ext = ext.split("?")[0]
    if ext.lower() not in ["jpg", "jpeg", "png", "webp"]:
            ext = "jpeg"
            
    image_bytes = requests.get(image_path).content
    image = types.Part.from_bytes(
      data=image_bytes, mime_type=f"image/{ext}"
    )
        
    prompt=generate_social_check_prompt(query=claim_text,search_results=search_results)
    
    resultsGenAI=client.models.generate_content(
    model="gemini-2.5-flash-preview-04-17", contents=[prompt,image]
    )
    
    resultJson = extract_json(resultsGenAI.text)
    
    return resultJson