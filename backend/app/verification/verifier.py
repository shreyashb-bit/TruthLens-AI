# backend/app/ai/verifier.py

import json
from typing import List, Dict, Any

from app.ai.llm import generate_text


VALID_VERDICTS = {
    "TRUE",
    "FALSE",
    "MISLEADING",
    "UNCERTAIN",
}


SYSTEM_PROMPT = """
You are TruthLens-AI, an AI fact-checking assistant.

Your task is to evaluate a claim using ONLY the evidence provided.

Rules:
1. Do not use outside knowledge.
2. Do not assume that a claim is true because it sounds plausible.
3. Identify whether the evidence supports, contradicts, or partially supports the claim.
4. If the evidence is insufficient, return UNCERTAIN.
5. A claim is MISLEADING when it contains some truth but presents
   incomplete, exaggerated, or misleading information.
6. Return a confidence score between 0 and 1.
7. Give a short factual reasoning.

Return ONLY valid JSON in this format:

{
    "verdict": "TRUE | FALSE | MISLEADING | UNCERTAIN",
    "confidence": 0.0,
    "reasoning": "Short explanation"
}
"""


def _build_evidence_text(
    evidence: List[Dict[str, Any]]
) -> str:
    """
    Convert retrieved evidence into a format suitable for the LLM.
    """

    if not evidence:
        return "No evidence was found."

    evidence_parts = []

    for index, item in enumerate(evidence, start=1):
        title = item.get("title", "")
        source = item.get("source", "")
        url = item.get("url", "")
        text = item.get(
            "content",
            item.get(
                "text",
                item.get("summary", "")
            )
        )

        evidence_parts.append(
            f"""
Evidence {index}
Title: {title}
Source: {source}
URL: {url}
Content: {text}
"""
        )

    return "\n".join(evidence_parts)


def _parse_response(response: str) -> Dict[str, Any]:
    """
    Parse and validate the LLM response.
    """

    try:
        result = json.loads(response)

    except json.JSONDecodeError:
        return {
            "verdict": "UNCERTAIN",
            "confidence": 0.0,
            "reasoning": (
                "The verification model returned an invalid response."
            ),
        }

    verdict = str(
        result.get("verdict", "UNCERTAIN")
    ).upper()

    if verdict not in VALID_VERDICTS:
        verdict = "UNCERTAIN"

    try:
        confidence = float(
            result.get("confidence", 0.0)
        )
    except (TypeError, ValueError):
        confidence = 0.0

    # Keep confidence between 0 and 1
    confidence = max(
        0.0,
        min(1.0, confidence)
    )

    reasoning = str(
        result.get(
            "reasoning",
            "No reasoning was provided."
        )
    )

    return {
        "verdict": verdict,
        "confidence": confidence,
        "reasoning": reasoning,
    }


def verify_claim(
    claim: str,
    evidence: List[Dict[str, Any]],
) -> Dict[str, Any]:
    """
    Verify a claim against retrieved evidence.

    Returns:
        {
            "claim": str,
            "verdict": str,
            "confidence": float,
            "reasoning": str,
            "evidence": list
        }
    """

    evidence_text = _build_evidence_text(evidence)

    prompt = f"""
Evaluate the following claim using the provided evidence.

CLAIM:
{claim}

EVIDENCE:
{evidence_text}

Determine whether the claim is:

TRUE
FALSE
MISLEADING
UNCERTAIN

Return ONLY JSON.
"""

    try:
        response = generate_text(
            prompt=prompt,
            system_prompt=SYSTEM_PROMPT,
            temperature=0.0,
        )

        result = _parse_response(response)

    except Exception as error:
        result = {
            "verdict": "UNCERTAIN",
            "confidence": 0.0,
            "reasoning": (
                f"Verification could not be completed: {str(error)}"
            ),
        }

    return {
        "claim": claim,
        "verdict": result["verdict"],
        "confidence": result["confidence"],
        "reasoning": result["reasoning"],
        "evidence": evidence,
    }


def verify(
    claim: str,
    evidence: List[Dict[str, Any]],
) -> Dict[str, Any]:
    """
    Short convenience function for claim verification.
    """

    return verify_claim(
        claim=claim,
        evidence=evidence,
    )