# backend/app/ai/source_analyzer.py

from typing import List, Dict, Any
from urllib.parse import urlparse


# Sources that are generally considered high-authority
HIGH_AUTHORITY_DOMAINS = {
    "gov",
    "gov.in",
    "edu",
    "ac.in",
    "who.int",
    "un.org",
    "nasa.gov",
    "cdc.gov",
    "nih.gov",
}


# Known news / information domains
NEWS_DOMAINS = {
    "reuters.com",
    "apnews.com",
    "bbc.com",
    "bbc.co.uk",
    "theguardian.com",
    "nytimes.com",
}


def extract_domain(url: str) -> str:
    """
    Extract the domain name from a URL.
    """

    if not url:
        return ""

    try:
        domain = urlparse(url).netloc.lower()

        # Remove www.
        if domain.startswith("www."):
            domain = domain[4:]

        return domain

    except Exception:
        return ""


def get_domain_type(domain: str) -> str:
    """
    Classify a domain based on its characteristics.
    """

    if not domain:
        return "unknown"

    # Government / educational domains
    if (
        domain.endswith(".gov")
        or domain.endswith(".gov.in")
        or domain.endswith(".edu")
        or domain.endswith(".ac.in")
    ):
        return "official"

    # Known high-authority organizations
    if domain in HIGH_AUTHORITY_DOMAINS:
        return "official"

    # Known news organizations
    if domain in NEWS_DOMAINS:
        return "news"

    # Social media
    social_domains = {
        "facebook.com",
        "x.com",
        "twitter.com",
        "instagram.com",
        "youtube.com",
        "tiktok.com",
    }

    if domain in social_domains:
        return "social"

    return "general"


def calculate_source_score(
    url: str,
    title: str = "",
    content: str = "",
) -> float:
    """
    Calculate a basic credibility score for a source.

    Score range: 0.0 - 1.0
    """

    domain = extract_domain(url)
    domain_type = get_domain_type(domain)

    if domain_type == "official":
        score = 0.90

    elif domain_type == "news":
        score = 0.80

    elif domain_type == "social":
        score = 0.30

    elif domain_type == "general":
        score = 0.60

    else:
        score = 0.40

    # Small bonus for having useful metadata
    if title:
        score += 0.03

    if content and len(content) > 200:
        score += 0.02

    return min(score, 1.0)


def analyze_source(
    source: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Analyze one source and return credibility information.
    """

    url = source.get("url", "")
    title = source.get("title", "")
    content = source.get(
        "content",
        source.get("text", "")
    )

    domain = extract_domain(url)
    domain_type = get_domain_type(domain)

    credibility_score = calculate_source_score(
        url=url,
        title=title,
        content=content,
    )

    return {
        "url": url,
        "domain": domain,
        "domain_type": domain_type,
        "credibility_score": credibility_score,
        "is_official": domain_type == "official",
        "is_news": domain_type == "news",
        "is_social": domain_type == "social",
    }


def analyze_sources(
    sources: List[Dict[str, Any]]
) -> List[Dict[str, Any]]:
    """
    Analyze multiple sources and rank them by credibility.
    """

    analyzed_sources = []

    for source in sources:
        analysis = analyze_source(source)

        # Keep the original source information
        combined = {
            **source,
            **analysis,
        }

        analyzed_sources.append(combined)

    # Highest credibility first
    analyzed_sources.sort(
        key=lambda item: item.get(
            "credibility_score",
            0.0
        ),
        reverse=True,
    )

    return analyzed_sources