# backend/app/ai/verdict.py

from typing import List, Dict, Any


VALID_VERDICTS = {
    "TRUE",
    "FALSE",
    "MISLEADING",
    "UNCERTAIN",
}


def calculate_evidence_quality(
    evidence: List[Dict[str, Any]]
) -> float:
    """
    Calculate the overall quality of the retrieved evidence.

    Combines:
    - relevance
    - source credibility
    - freshness
    """

    if not evidence:
        return 0.0

    scores = []

    for item in evidence:
        relevance = float(
            item.get("similarity", 0.0)
        )

        credibility = float(
            item.get("credibility_score", 0.5)
        )

        freshness = float(
            item.get("freshness_score", 0.5)
        )

        # Weighted evidence quality
        score = (
            relevance * 0.50
            + credibility * 0.30
            + freshness * 0.20
        )

        scores.append(score)

    return sum(scores) / len(scores)


def adjust_confidence(
    model_confidence: float,
    evidence_quality: float,
) -> float:
    """
    Adjust model confidence according to evidence quality.
    """

    model_confidence = max(
        0.0,
        min(1.0, model_confidence)
    )

    evidence_quality = max(
        0.0,
        min(1.0, evidence_quality)
    )

    # Evidence quality has a strong influence on final confidence.
    final_confidence = (
        model_confidence * 0.70
        + evidence_quality * 0.30
    )

    return round(final_confidence, 3)


def generate_verdict(
    verification_result: Dict[str, Any],
    evidence: List[Dict[str, Any]],
) -> Dict[str, Any]:
    """
    Generate the final TruthLens-AI verdict.

    Parameters:
        verification_result:
            Result returned by verifier.py.

        evidence:
            Evidence after source and date analysis.
    """

    model_verdict = str(
        verification_result.get(
            "verdict",
            "UNCERTAIN"
        )
    ).upper()

    model_confidence = float(
        verification_result.get(
            "confidence",
            0.0
        )
    )

    reasoning = verification_result.get(
        "reasoning",
        ""
    )

    if model_verdict not in VALID_VERDICTS:
        model_verdict = "UNCERTAIN"

    # Calculate evidence quality
    evidence_quality = calculate_evidence_quality(
        evidence
    )

    # Adjust confidence
    final_confidence = adjust_confidence(
        model_confidence=model_confidence,
        evidence_quality=evidence_quality,
    )

    # If evidence quality is extremely low,
    # don't make a strong claim.
    if evidence_quality < 0.30:
        final_verdict = "UNCERTAIN"
        final_confidence = min(
            final_confidence,
            0.50
        )
    else:
        final_verdict = model_verdict

    return {
        "verdict": final_verdict,
        "confidence": final_confidence,
        "evidence_quality": round(
            evidence_quality,
            3
        ),
        "reasoning": reasoning,
        "evidence_count": len(evidence),
        "evidence": evidence,
    }


def get_verdict_label(
    verdict: str
) -> str:
    """
    Convert a verdict into a user-friendly label.
    """

    labels = {
        "TRUE": "Likely True",
        "FALSE": "Likely False",
        "MISLEADING": "Misleading",
        "UNCERTAIN": "Insufficient Evidence",
    }

    return labels.get(
        verdict.upper(),
        "Insufficient Evidence"
    )


def get_confidence_label(
    confidence: float
) -> str:
    """
    Convert confidence score into a readable label.
    """

    if confidence >= 0.85:
        return "Very High"

    if confidence >= 0.70:
        return "High"

    if confidence >= 0.50:
        return "Moderate"

    if confidence >= 0.30:
        return "Low"

    return "Very Low"