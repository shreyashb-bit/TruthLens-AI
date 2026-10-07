# backend/app/ai/date_checker.py

from datetime import datetime, timezone
from typing import Dict, Any, Optional

from dateutil import parser


def parse_date(date_value: Any) -> Optional[datetime]:
    """
    Convert a date string into a datetime object.
    """

    if not date_value:
        return None

    try:
        date = parser.parse(str(date_value))

        # Make timezone-aware if necessary
        if date.tzinfo is None:
            date = date.replace(tzinfo=timezone.utc)

        return date

    except (ValueError, TypeError, OverflowError):
        return None


def calculate_age_days(
    date_value: Any
) -> Optional[int]:
    """
    Calculate how many days old a source is.
    """

    date = parse_date(date_value)

    if date is None:
        return None

    now = datetime.now(timezone.utc)

    difference = now - date

    return max(0, difference.days)


def get_date_status(
    date_value: Any,
    recent_days: int = 30,
    old_days: int = 365,
) -> str:
    """
    Classify the freshness of a source.

    Returns:
        RECENT
        AGING
        OLD
        UNKNOWN
        FUTURE
    """

    date = parse_date(date_value)

    if date is None:
        return "UNKNOWN"

    now = datetime.now(timezone.utc)

    # Handle future dates
    if date > now:
        return "FUTURE"

    age_days = (now - date).days

    if age_days <= recent_days:
        return "RECENT"

    if age_days <= old_days:
        return "AGING"

    return "OLD"


def calculate_freshness_score(
    date_value: Any,
) -> float:
    """
    Calculate a freshness score between 0 and 1.
    """

    age_days = calculate_age_days(date_value)

    if age_days is None:
        return 0.5

    if age_days <= 7:
        return 1.0

    if age_days <= 30:
        return 0.9

    if age_days <= 90:
        return 0.75

    if age_days <= 180:
        return 0.60

    if age_days <= 365:
        return 0.45

    if age_days <= 730:
        return 0.30

    return 0.20


def check_source_date(
    source: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Analyze the publication date of a source.
    """

    date_value = (
        source.get("published_date")
        or source.get("published_at")
        or source.get("date")
    )

    status = get_date_status(date_value)
    age_days = calculate_age_days(date_value)
    freshness_score = calculate_freshness_score(date_value)

    return {
        "published_date": date_value,
        "age_days": age_days,
        "date_status": status,
        "freshness_score": freshness_score,
    }


def check_sources_dates(
    sources: list[Dict[str, Any]]
) -> list[Dict[str, Any]]:
    """
    Analyze dates for multiple sources.
    """

    checked_sources = []

    for source in sources:

        date_info = check_source_date(source)

        checked_source = {
            **source,
            **date_info,
        }

        checked_sources.append(checked_source)

    return checked_sources