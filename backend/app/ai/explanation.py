# backend/app/ai/explanation.py

from typing import List, Dict, Any


def generate_explanation(
    claim: str,
    verdict: str,
    confidence: float,
    evidence: List[Dict[str, Any]],
) -> str:
    """
    Generate a human-readable explanation for the verification result.
    """

    verdict = verdict.upper()

    if verdict == "TRUE":
        explanation = (
            f"The claim appears to be TRUE with {confidence:.0%} confidence. "
            "The available evidence supports the main statement."
        )

    elif verdict == "FALSE":
        explanation = (
            f"The claim appears to be FALSE with {confidence:.0%} confidence. "
            "The available evidence contradicts the main statement."
        )

    elif verdict == "MISLEADING":
        explanation = (
            f"The claim appears to be MISLEADING with {confidence:.0%} confidence. "
            "Although part of the claim may be correct, the evidence suggests "
            "that important context is missing or the statement is presented "
            "in a misleading way."
        )

    else:
        explanation = (
            f"The claim could not be confidently classified. "
            f"Current confidence: {confidence:.0%}."
        )

    # Add evidence summary
    if evidence:
        explanation += "\n\nEvidence considered:\n"

        for i, item in enumerate(evidence[:3], start=1):
            source = item.get("source", "Unknown source")
            summary = item.get("summary", item.get("text", ""))

            if summary:
                explanation += f"{i}. {source}: {summary}\n"
            else:
                explanation += f"{i}. {source}\n"

    else:
        explanation += (
            "\n\nNo supporting evidence was available, so the result "
            "should be treated with caution."
        )

    return explanation