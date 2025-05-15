from dotenv import load_dotenv
import os

load_dotenv()

SEARCH_ENGINE_API_KEY = os.getenv("SEARCH_ENGINE_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
CX = os.getenv("CX")