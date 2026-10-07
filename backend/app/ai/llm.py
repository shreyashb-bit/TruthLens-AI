# backend/app/ai/llm.py

import os
from typing import Optional

from dotenv import load_dotenv

load_dotenv()


class LLMClient:
    """
    Wrapper around the LLM used by TruthLens-AI.

    Keeps LLM-related code in one place so that the rest of
    the application does not depend directly on a specific provider.
    """

    def __init__(self):
        self.api_key = os.getenv("LLM_API_KEY")
        self.model = os.getenv("LLM_MODEL", "default")

        if not self.api_key:
            raise ValueError(
                "LLM_API_KEY is not set. "
                "Add it to your .env file."
            )

    def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        temperature: float = 0.2,
    ) -> str:
        """
        Generate a response from the LLM.

        This method will be connected to the selected LLM provider.
        """

        # Provider API call will be implemented here.
        raise NotImplementedError(
            "LLM provider integration has not been configured yet."
        )


# Create a reusable client
llm_client = None


def get_llm_client() -> LLMClient:
    """
    Return the shared LLM client.
    """

    global llm_client

    if llm_client is None:
        llm_client = LLMClient()

    return llm_client


def generate_text(
    prompt: str,
    system_prompt: Optional[str] = None,
    temperature: float = 0.2,
) -> str:
    """
    Convenience function for generating text.
    """

    client = get_llm_client()

    return client.generate(
        prompt=prompt,
        system_prompt=system_prompt,
        temperature=temperature,
    )