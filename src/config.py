import os
from dotenv import load_dotenv

load_dotenv()

_api_key = os.getenv("PINECONE_API_KEY")
_index_name = os.getenv("PINECONE_INDEX_NAME")

if not _api_key:
    raise ValueError("PINECONE_API_KEY not found in environment variables")
if not _index_name:
    raise ValueError("PINECONE_INDEX_NAME not found in environment variables")

PINECONE_API_KEY: str = _api_key
PINECONE_INDEX_NAME: str = _index_name
