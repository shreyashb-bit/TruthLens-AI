# backend/app/ai/search.py

import os
from typing import List, Dict, Any

import requests
from dotenv import load_dotenv

load_dotenv()


class SearchClient:
    """
    Search client used by TruthLens-AI to retrieve web evidence.
    """

    def __init__(self):
        self.api_key = os.getenv("SEARCH_API_KEY")
        self.search_url = os.getenv(
            "SEARCH_API_URL",
            "https://api.tavily.com/search"
        )

        if not self.api_key:
            raise ValueError(
                "SEARCH_API_KEY is not set. "
                "Add it to your .env file."
            )

    def search(
        self,
        query: str,
        max_results: int = 5,
    ) -> List[Dict[str, Any]]:
        """
        Search the web and return relevant results.
        """

        payload = {
            "api_key": self.api_key,
            "query": query,
            "search_depth": "advanced",
            "max_results": max_results,
            "include_answer": False,
            "include_raw_content": False,
        }

        response = requests.post(
            self.search_url,
            json=payload,
            timeout=30,
        )

        response.raise_for_status()

        data = response.json()

        results = []

        for item in data.get("results", []):
            results.append(
                {
                    "title": item.get("title", ""),
                    "url": item.get("url", ""),
                    "content": item.get("content", ""),
                    "score": item.get("score", 0.0),
                }
            )

        return results


search_client = None


def get_search_client() -> SearchClient:
    """
    Return a reusable search client.
    """

    global search_client

    if search_client is None:
        search_client = SearchClient()

    return search_client


def search_web(
    query: str,
    max_results: int = 5,
) -> List[Dict[str, Any]]:
    """
    Convenience function for web searching.
    """

    client = get_search_client()

    return client.search(
        query=query,
        max_results=max_results,
    )