"""
TruthLens AI - Claim Extractor

Purpose:
    Extract individual, verifiable factual claims from user-provided text.

Input:
    Raw text from:
    - WhatsApp messages
    - Screenshots/OCR
    - PDFs
    - Voice transcription
    - Web pages

Output:
    A list of structured claims that can be passed to the
    verification/RAG pipeline.
"""

import json
import re
from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


# ============================================================
# DATA MODELS
# ============================================================

class Claim(BaseModel):
    """Represents a single factual claim."""

    id: str
    text: str
    category: str = "general"
    importance: str = "medium"
    is_verifiable: bool = True


class ClaimExtractionResult(BaseModel):
    """Final result returned by the claim extractor."""

    claims: List[Claim] = Field(default_factory=list)
    original_text: str = ""


# ============================================================
# CLAIM EXTRACTOR
# ============================================================

class ClaimExtractor:
    """
    Extracts factual claims from text.

    The extractor can use an LLM when a callable LLM function
    is provided. If an LLM is unavailable, it falls back to
    rule-based extraction.
    """

    CATEGORIES = {
        "health",
        "government",
        "politics",
        "finance",
        "education",
        "technology",
        "science",
        "business",
        "crime",
        "weather",
        "social",
        "general",
    }

    IMPORTANCE_LEVELS = {
        "low",
        "medium",
        "high",
    }

    def __init__(self, llm_function=None):
        """
        Args:
            llm_function:
                Optional function that accepts a prompt string
                and returns an LLM response as a string.

                Example:
                    extractor = ClaimExtractor(
                        llm_function=generate_text
                    )
        """
        self.llm_function = llm_function

    # ========================================================
    # PUBLIC METHOD
    # ========================================================

    def extract(self, text: str) -> ClaimExtractionResult:
        """
        Extract factual claims from the supplied text.

        Args:
            text: Raw input text.

        Returns:
            ClaimExtractionResult
        """

        if not text or not text.strip():
            return ClaimExtractionResult(
                claims=[],
                original_text=""
            )

        cleaned_text = self._clean_text(text)

        # Try LLM extraction first
        if self.llm_function:
            try:
                claims = self._extract_with_llm(cleaned_text)

                if claims:
                    return ClaimExtractionResult(
                        claims=claims,
                        original_text=text
                    )

            except Exception as error:
                print(
                    f"[ClaimExtractor] LLM extraction failed: {error}"
                )

        # Fallback to rule-based extraction
        claims = self._extract_with_rules(cleaned_text)

        return ClaimExtractionResult(
            claims=claims,
            original_text=text
        )

    # ========================================================
    # LLM EXTRACTION
    # ========================================================

    def _extract_with_llm(self, text: str) -> List[Claim]:
        """Extract claims using an LLM."""

        prompt = f"""
You are the claim extraction module of TruthLens AI,
a misinformation and fact-checking system.

Your task is to extract ONLY factual claims that can
potentially be verified using reliable external sources.

Input text:
----------------
{text}
----------------

Rules:

1. Extract each distinct factual claim separately.
2. Do not combine unrelated claims.
3. Do not extract opinions.
4. Do not extract emotions.
5. Do not extract questions unless they contain a factual claim.
6. Do not extract greetings or casual conversation.
7. Preserve the original meaning of the claim.
8. Do not invent information.
9. A claim should be something that can be checked against evidence.
10. Identify the most appropriate category.
11. Assign importance:
    - high: potentially harmful or highly significant
    - medium: meaningful factual information
    - low: minor factual information

Possible categories:
health, government, politics, finance, education,
technology, science, business, crime, weather,
social, general

Return ONLY valid JSON.

Expected format:

{{
    "claims": [
        {{
            "text": "The exact factual claim",
            "category": "health",
            "importance": "high",
            "is_verifiable": true
        }}
    ]
}}
"""

        response = self.llm_function(prompt)

        if not response:
            return []

        data = self._parse_json(response)

        if not data:
            return []

        raw_claims = data.get("claims", [])

        claims = []

        for index, item in enumerate(raw_claims, start=1):

            if not isinstance(item, dict):
                continue

            claim_text = str(
                item.get("text", "")
            ).strip()

            if not claim_text:
                continue

            category = str(
                item.get("category", "general")
            ).lower().strip()

            importance = str(
                item.get("importance", "medium")
            ).lower().strip()

            is_verifiable = bool(
                item.get("is_verifiable", True)
            )

            if category not in self.CATEGORIES:
                category = "general"

            if importance not in self.IMPORTANCE_LEVELS:
                importance = "medium"

            claims.append(
                Claim(
                    id=f"claim_{index}",
                    text=claim_text,
                    category=category,
                    importance=importance,
                    is_verifiable=is_verifiable,
                )
            )

        return claims

    # ========================================================
    # RULE-BASED FALLBACK
    # ========================================================

    def _extract_with_rules(self, text: str) -> List[Claim]:
        """
        Basic fallback extractor.

        This is NOT intended to replace the LLM.
        It ensures the application still works if the LLM
        is temporarily unavailable.
        """

        sentences = self._split_sentences(text)

        claims = []

        for sentence in sentences:

            sentence = sentence.strip()

            if not sentence:
                continue

            if not self._looks_like_claim(sentence):
                continue

            category = self._detect_category(sentence)

            importance = self._estimate_importance(
                sentence
            )

            claims.append(
                Claim(
                    id=f"claim_{len(claims) + 1}",
                    text=sentence,
                    category=category,
                    importance=importance,
                    is_verifiable=True,
                )
            )

        return claims

    # ========================================================
    # TEXT CLEANING
    # ========================================================

    def _clean_text(self, text: str) -> str:
        """Clean OCR/WhatsApp/transcription noise."""

        text = text.replace("\x00", " ")

        # Remove excessive whitespace
        text = re.sub(r"[ \t]+", " ", text)

        # Remove excessive blank lines
        text = re.sub(r"\n{3,}", "\n\n", text)

        return text.strip()

    # ========================================================
    # SENTENCE SPLITTING
    # ========================================================

    def _split_sentences(self, text: str) -> List[str]:
        """
        Split text into approximately sentence-sized units.

        Handles common punctuation used in English and
        Indian WhatsApp messages.
        """

        # Replace line breaks with spaces
        text = text.replace("\n", " ")

        sentences = re.split(
            r"(?<=[.!?])\s+",
            text
        )

        return [
            sentence.strip()
            for sentence in sentences
            if sentence.strip()
        ]

    # ========================================================
    # CLAIM DETECTION
    # ========================================================

    def _looks_like_claim(self, sentence: str) -> bool:
        """Determine whether a sentence appears factual."""

        lower = sentence.lower().strip()

        # Ignore very short text
        if len(lower.split()) < 4:
            return False

        # Ignore questions
        if lower.endswith("?"):
            return False

        # Ignore common conversational text
        ignored_patterns = [
            r"^hello\b",
            r"^hi\b",
            r"^hey\b",
            r"^good morning\b",
            r"^good evening\b",
            r"^thank you\b",
            r"^thanks\b",
            r"^please\b",
            r"^i think\b",
            r"^i feel\b",
            r"^in my opinion\b",
            r"^i believe\b",
        ]

        for pattern in ignored_patterns:
            if re.search(pattern, lower):
                return False

        # Look for indicators of factual information
        factual_indicators = [
            r"\bis\b",
            r"\bare\b",
            r"\bwas\b",
            r"\bwere\b",
            r"\bhas\b",
            r"\bhave\b",
            r"\bhad\b",
            r"\bwill\b",
            r"\bcan\b",
            r"\bcannot\b",
            r"\bcauses\b",
            r"\bcaused\b",
            r"\bincreases\b",
            r"\bdecreases\b",
            r"\bannounced\b",
            r"\blaunched\b",
            r"\bintroduced\b",
            r"\bapproved\b",
            r"\bbanned\b",
            r"\breported\b",
            r"\baccording to\b",
            r"\bgovernment\b",
            r"\bpercent\b",
            r"%"
        ]

        return any(
            re.search(pattern, lower)
            for pattern in factual_indicators
        )

    # ========================================================
    # CATEGORY DETECTION
    # ========================================================

    def _detect_category(self, text: str) -> str:
        """Detect an approximate claim category."""

        lower = text.lower()

        category_keywords = {
            "health": [
                "health",
                "medicine",
                "disease",
                "doctor",
                "hospital",
                "covid",
                "cancer",
                "virus",
                "vaccine",
                "symptom",
            ],

            "government": [
                "government",
                "minister",
                "scheme",
                "yojana",
                "law",
                "policy",
                "parliament",
                "government scheme",
            ],

            "politics": [
                "election",
                "party",
                "prime minister",
                "chief minister",
                "vote",
                "politician",
                "president",
            ],

            "finance": [
                "bank",
                "money",
                "loan",
                "tax",
                "stock",
                "share",
                "investment",
                "interest rate",
                "rupee",
            ],

            "education": [
                "school",
                "college",
                "university",
                "exam",
                "student",
                "education",
                "result",
            ],

            "technology": [
                "ai",
                "artificial intelligence",
                "software",
                "computer",
                "iphone",
                "android",
                "technology",
                "internet",
            ],

            "science": [
                "scientist",
                "research",
                "study",
                "experiment",
                "space",
                "nasa",
                "physics",
                "biology",
            ],

            "business": [
                "company",
                "business",
                "startup",
                "ceo",
                "market",
                "product",
                "sales",
            ],

            "crime": [
                "police",
                "crime",
                "arrested",
                "murder",
                "fraud",
                "criminal",
            ],

            "weather": [
                "rain",
                "storm",
                "cyclone",
                "temperature",
                "weather",
                "flood",
                "heatwave",
            ],
        }

        for category, keywords in category_keywords.items():

            for keyword in keywords:

                if keyword in lower:
                    return category

        return "general"

    # ========================================================
    # IMPORTANCE
    # ========================================================

    def _estimate_importance(self, text: str) -> str:
        """Estimate the importance of a claim."""

        lower = text.lower()

        high_risk_keywords = [
            "death",
            "die",
            "cancer",
            "disease",
            "medicine",
            "vaccine",
            "government",
            "election",
            "war",
            "terror",
            "fraud",
            "scam",
            "money",
            "bank",
            "emergency",
            "danger",
        ]

        for keyword in high_risk_keywords:

            if keyword in lower:
                return "high"

        if any(
            char.isdigit()
            for char in text
        ):
            return "medium"

        return "low"

    # ========================================================
    # JSON PARSER
    # ========================================================

    def _parse_json(
        self,
        response: str
    ) -> Optional[Dict[str, Any]]:
        """
        Safely parse JSON returned by an LLM.

        Handles responses wrapped in ```json ... ```
        """

        response = response.strip()

        # Remove markdown code fences
        response = re.sub(
            r"^```json\s*",
            "",
            response,
            flags=re.IGNORECASE
        )

        response = re.sub(
            r"^```\s*",
            "",
            response
        )

        response = re.sub(
            r"\s*```$",
            "",
            response
        )

        try:
            return json.loads(response)

        except json.JSONDecodeError:

            # Try to find JSON object inside response
            match = re.search(
                r"\{.*\}",
                response,
                flags=re.DOTALL
            )

            if not match:
                return None

            try:
                return json.loads(match.group(0))

            except json.JSONDecodeError:
                return None


# ============================================================
# SIMPLE FUNCTION FOR OTHER MODULES
# ============================================================

def extract_claims(
    text: str,
    llm_function=None
) -> List[Claim]:
    """
    Convenience function.

    Example:

        claims = extract_claims(
            "The government launched a new scheme."
        )

        for claim in claims:
            print(claim.text)
    """

    extractor = ClaimExtractor(
        llm_function=llm_function
    )

    result = extractor.extract(text)

    return result.claims