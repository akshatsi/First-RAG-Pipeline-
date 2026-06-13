from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone
from src.config import PINECONE_API_KEY, PINECONE_INDEX_NAME

def get_vector_store() -> PineconeVectorStore:
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001",
        output_dimensionality=1024
    )
    pinecone_client = Pinecone(api_key=PINECONE_API_KEY)
    index = pinecone_client.Index(PINECONE_INDEX_NAME)
    return PineconeVectorStore(embedding=embeddings, index=index)
