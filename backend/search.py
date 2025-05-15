import requests
from utils import SEARCH_ENGINE_API_KEY, CX

def fetch_search_results(query:str="image incident", num_results:int=10):
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": SEARCH_ENGINE_API_KEY,
        "cx": CX,
        "q": query,
        "num": num_results
    }

    response = requests.get(url, params=params)
    results = response.json().get("items", [])

    parsed_results = []
    for item in results:
        parsed_results.append({
            "title": item.get("title"),
            "snippet": item.get("snippet"),
            "link": item.get("link")
        })

    return parsed_results
