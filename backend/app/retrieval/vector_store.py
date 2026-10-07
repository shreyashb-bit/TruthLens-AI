# backend/app/ai/vector_store.py

from typing import List, Dict, Any

import numpy as np


class VectorStore:
    """
    Simple in-memory vector store for TruthLens-AI.

    Stores text, metadata, and embeddings and allows
    similarity-based retrieval.
    """

    def __init__(self):
        self.documents: List[Dict[str, Any]] = []

    def add_document(
        self,
        text: str,
        embedding: List[float],
        metadata: Dict[str, Any] | None = None,
    ) -> None:
        """
        Add a document and its embedding to the vector store.
        """

        document = {
            "text": text,
            "embedding": np.array(embedding, dtype=np.float32),
            "metadata": metadata or {},
        }

        self.documents.append(document)

    def add_documents(
        self,
        texts: List[str],
        embeddings: List[List[float]],
        metadata: List[Dict[str, Any]] | None = None,
    ) -> None:
        """
        Add multiple documents to the vector store.
        """

        if len(texts) != len(embeddings):
            raise ValueError(
                "Number of texts must match number of embeddings."
            )

        if metadata is None:
            metadata = [{} for _ in texts]

        if len(metadata) != len(texts):
            raise ValueError(
                "Number of metadata items must match number of texts."
            )

        for text, embedding, meta in zip(
            texts,
            embeddings,
            metadata,
        ):
            self.add_document(
                text=text,
                embedding=embedding,
                metadata=meta,
            )

    @staticmethod
    def cosine_similarity(
        query_vector: np.ndarray,
        document_vector: np.ndarray,
    ) -> float:
        """
        Calculate cosine similarity between two vectors.
        """

        query_norm = np.linalg.norm(query_vector)
        document_norm = np.linalg.norm(document_vector)

        if query_norm == 0 or document_norm == 0:
            return 0.0

        return float(
            np.dot(query_vector, document_vector)
            / (query_norm * document_norm)
        )

    def search(
        self,
        query_embedding: List[float],
        top_k: int = 5,
    ) -> List[Dict[str, Any]]:
        """
        Find the most similar documents to the query embedding.
        """

        if not self.documents:
            return []

        query_vector = np.array(
            query_embedding,
            dtype=np.float32,
        )

        results = []

        for document in self.documents:
            similarity = self.cosine_similarity(
                query_vector,
                document["embedding"],
            )

            results.append(
                {
                    "text": document["text"],
                    "metadata": document["metadata"],
                    "similarity": similarity,
                }
            )

        results.sort(
            key=lambda item: item["similarity"],
            reverse=True,
        )

        return results[:top_k]

    def clear(self) -> None:
        """
        Remove all documents from the vector store.
        """

        self.documents.clear()

    def count(self) -> int:
        """
        Return the number of stored documents.
        """

        return len(self.documents)


# Shared vector store instance
vector_store = VectorStore()