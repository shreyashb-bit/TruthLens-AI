"""
TruthLens AI - Embeddings

Purpose:
    Convert claims and evidence into numerical vectors
    that can be used for semantic similarity search.

Used by:
    - claim verification
    - RAG pipeline
    - vector store
    - evidence retrieval

Default model:
    sentence-transformers/all-MiniLM-L6-v2

This model is lightweight and suitable for development/testing.
"""

from typing import List, Union

import numpy as np


class EmbeddingService:
    """
    Service for generating text embeddings.
    """

    def __init__(
        self,
        model_name: str = "sentence-transformers/all-MiniLM-L6-v2",
    ):
        self.model_name = model_name
        self.model = None

    # =========================================================
    # LOAD MODEL
    # =========================================================

    def load_model(self):
        """
        Load the embedding model only when needed.

        Lazy loading prevents the model from being loaded
        when this module is simply imported.
        """

        if self.model is not None:
            return self.model

        try:
            from sentence_transformers import SentenceTransformer

            self.model = SentenceTransformer(
                self.model_name
            )

            return self.model

        except ImportError as error:
            raise ImportError(
                "sentence-transformers is not installed. "
                "Install it using:\n"
                "pip install sentence-transformers"
            ) from error

    # =========================================================
    # SINGLE TEXT
    # =========================================================

    def embed_text(
        self,
        text: str,
    ) -> List[float]:
        """
        Convert one piece of text into an embedding vector.

        Example:

            vector = service.embed_text(
                "The government launched a new scheme."
            )
        """

        if not text or not text.strip():
            raise ValueError(
                "Text cannot be empty."
            )

        model = self.load_model()

        embedding = model.encode(
            text,
            normalize_embeddings=True,
        )

        return embedding.tolist()

    # =========================================================
    # MULTIPLE TEXTS
    # =========================================================

    def embed_texts(
        self,
        texts: List[str],
    ) -> List[List[float]]:
        """
        Convert multiple texts into embedding vectors.

        Example:

            vectors = service.embed_texts([
                "Government launched a scheme.",
                "New education policy was announced."
            ])
        """

        if not texts:
            return []

        cleaned_texts = [
            text.strip()
            for text in texts
            if text and text.strip()
        ]

        if not cleaned_texts:
            return []

        model = self.load_model()

        embeddings = model.encode(
            cleaned_texts,
            normalize_embeddings=True,
        )

        return embeddings.tolist()

    # =========================================================
    # NUMPY VERSION
    # =========================================================

    def embed_text_numpy(
        self,
        text: str,
    ) -> np.ndarray:
        """
        Return a NumPy embedding vector.

        Useful for similarity calculations.
        """

        vector = self.embed_text(text)

        return np.array(
            vector,
            dtype=np.float32,
        )

    # =========================================================
    # SIMILARITY
    # =========================================================

    def cosine_similarity(
        self,
        vector_a: Union[List[float], np.ndarray],
        vector_b: Union[List[float], np.ndarray],
    ) -> float:
        """
        Calculate cosine similarity between two vectors.

        Returns a value approximately between -1 and 1.

        Higher value = more semantically similar.
        """

        a = np.asarray(
            vector_a,
            dtype=np.float32,
        )

        b = np.asarray(
            vector_b,
            dtype=np.float32,
        )

        if a.size == 0 or b.size == 0:
            raise ValueError(
                "Vectors cannot be empty."
            )

        if a.shape != b.shape:
            raise ValueError(
                "Vectors must have the same dimensions."
            )

        denominator = (
            np.linalg.norm(a)
            * np.linalg.norm(b)
        )

        if denominator == 0:
            return 0.0

        similarity = np.dot(a, b) / denominator

        return float(similarity)

    # =========================================================
    # FIND MOST SIMILAR
    # =========================================================

    def find_most_similar(
        self,
        query: str,
        documents: List[str],
        top_k: int = 5,
    ) -> List[dict]:
        """
        Find the most semantically similar documents
        to a query.

        This is useful for selecting relevant evidence.
        """

        if not query.strip():
            return []

        if not documents:
            return []

        query_vector = self.embed_text(
            query
        )

        document_vectors = self.embed_texts(
            documents
        )

        results = []

        for index, vector in enumerate(
            document_vectors
        ):
            score = self.cosine_similarity(
                query_vector,
                vector,
            )

            results.append(
                {
                    "index": index,
                    "text": documents[index],
                    "score": score,
                }
            )

        results.sort(
            key=lambda item: item["score"],
            reverse=True,
        )

        return results[:top_k]


# ============================================================
# DEFAULT SERVICE
# ============================================================

embedding_service = EmbeddingService()


# ============================================================
# CONVENIENCE FUNCTIONS
# ============================================================

def generate_embedding(
    text: str,
) -> List[float]:
    """
    Generate an embedding for a single text.
    """

    return embedding_service.embed_text(
        text
    )


def generate_embeddings(
    texts: List[str],
) -> List[List[float]]:
    """
    Generate embeddings for multiple texts.
    """

    return embedding_service.embed_texts(
        texts
    )


def calculate_similarity(
    vector_a: List[float],
    vector_b: List[float],
) -> float:
    """
    Calculate semantic similarity between
    two embedding vectors.
    """

    return embedding_service.cosine_similarity(
        vector_a,
        vector_b,
    )