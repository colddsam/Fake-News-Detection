# main.py
from fastapi import FastAPI, Request,UploadFile,File,Form
from pydantic import BaseModel
from bs4 import BeautifulSoup
import requests
from search import fetch_search_results
from verify import analyze_text_news,analyze_image_news,analyze_social_news
import tempfile
import os

app = FastAPI()

class NewsInput(BaseModel):
    content: str

class SocialNewsInput(BaseModel):
    url:str
    claim:str="verify the claim and check if it is true?"

@app.post("/verify_image_news")
async def verify_news(file:UploadFile=File(...),query:str=Form(...)):
    filename=file.filename
    ext = os.path.splitext(filename)[-1]
    
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        tmp.write(await file.read())
        image_path = tmp.name
    
    
    search_results=fetch_search_results(query=query) if query else []
    
    result=analyze_image_news(image_path=image_path,claim_text=query or "check if this incident fake or real?",search_results=search_results)
    return result
    


@app.post("/verify_text_news")
async def verify_news(data: NewsInput):
    query = data.content
    search_results = fetch_search_results(query)
    result = analyze_text_news(query, search_results)
    return result

@app.post("/verify_social_news")
async def verify_news(data:SocialNewsInput):
    url=data.url
    claim=data.claim 
    
    response = requests.get(url, timeout=10)
    soup = BeautifulSoup(response.text, "html.parser")
    
    title = soup.title.string if soup.title else ""
    meta_desc = soup.find("meta", attrs={"name": "description"})
    meta_content = meta_desc["content"] if meta_desc else ""
    claim=title+"\n"+meta_content +"\n"+claim
    
    image_tag = soup.find("meta", property="og:image") or soup.find("img")
    image_url = image_tag["content"] if image_tag and "content" in image_tag.attrs else (
    image_tag["src"] if image_tag and "src" in image_tag.attrs else None
    )
    
    search_results=fetch_search_results(query=claim) if claim else []
    result=analyze_social_news(image_path=image_url,claim_text=claim,search_results=search_results)
    return result
    
    
    
    

