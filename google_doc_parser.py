import urllib.request
import re


def parse_google_doc_grid(url: str) -> None:
    """Parse Google Doc URL and print character grid."""
    # Convert published URL to plain text export
    if '/document/d/e/' in url and '/pub' in url:
        # Extract document ID from published URL
        doc_id = re.search(r'/document/d/e/([a-zA-Z0-9-_]+)', url).group(1)
        url = f"https://docs.google.com/document/d/e/{doc_id}/pub?output=txt"
    elif '/document/d/' in url:
        doc_id = re.search(r'/document/d/([a-zA-Z0-9-_]+)', url).group(1)
        url = f"https://docs.google.com/document/d/{doc_id}/export?format=txt"
    
    print(f"Fetching from: {url}")
    
    # Fetch content
    with urllib.request.urlopen(url) as response:
        content = response.read().decode('utf-8')
    
    print(f"Content preview: {content[:200]}...")
    grid_data = {}
    
    for line in content.strip().split('\n'):
        line = line.strip()
        if not line:
            continue
            
        # Match patterns: U+hex x y OR char x y
        if match := re.match(r'U\+([0-9A-Fa-f]+)[\s,\t]+(\d+)[\s,\t]+(\d+)', line):
            char = chr(int(match.group(1), 16))
            x, y = int(match.group(2)), int(match.group(3))
            grid_data[(x, y)] = char
        elif match := re.match(r'([^\s,\t]+)[\s,\t]+(\d+)[\s,\t]+(\d+)', line):
            char = match.group(1)
            if char.startswith('U+'):
                char = chr(int(char[2:], 16))
            x, y = int(match.group(2)), int(match.group(3))
            grid_data[(x, y)] = char
    
    # Print grid
    if not grid_data:
        print("No data found")
        return
        
    x_coords = [pos[0] for pos in grid_data.keys()]
    y_coords = [pos[1] for pos in grid_data.keys()]
    
    for y in range(min(y_coords), max(y_coords) + 1):
        row = [grid_data.get((x, y), ' ') for x in range(min(x_coords), max(x_coords) + 1)]
        print(''.join(row))


if __name__ == "__main__":
    # Test with actual URL
    url = "https://docs.google.com/document/d/e/2PACX-1vRPzbNQcx5UriHSbZ-9vmsTow_R6RRe7eyAU60xIF9Dlz-vaHiHNO2TKgDi7jy4ZpTpNqM7EvEcfr_p/pub"
    print("Running with provided URL:")
    parse_google_doc_grid(url)
    
    print("\nTest (letter F):")
    test_data = {(0,0):'█',(1,0):'▀',(2,0):'▀',(3,0):'▀',(0,1):'█',(1,1):'▀',(2,1):'▀',(0,2):'█'}
    for y in range(3):
        print(''.join(test_data.get((x,y),' ') for x in range(4)))
