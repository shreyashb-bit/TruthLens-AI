import requests
from bs4 import BeautifulSoup

def extract_webpage(url):
    response = requests.get(
        url,
        timeout=10,
        headers={"User-Agent": "Mozilla/5.0"}
    )
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")

    title = ""
    publisher = ""
    date = ""

    # Get title
    title_tag = soup.find("meta", property="og:title")
    if title_tag:
        title = title_tag.get("content", "")
    elif soup.title:
        title = soup.title.get_text(strip=True)

    # Get publisher
    publisher_tag = soup.find("meta", property="og:site_name")
    if publisher_tag:
        publisher = publisher_tag.get("content", "")

    # Get publication date
    date_tag = soup.find("meta", property="article:published_time")
    if date_tag:
        date = date_tag.get("content", "")

    # Get main webpage text
    main_content = soup.find("article") or soup.find("main")

    if main_content:
        text = main_content.get_text(separator=" ", strip=True)
    else:
        paragraphs = soup.find_all("p")
        text = " ".join(p.get_text(strip=True) for p in paragraphs)

    return {
        "title": title,
        "publisher": publisher,
        "date": date,
        "text": text
    }
    
