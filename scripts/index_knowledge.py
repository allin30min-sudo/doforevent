import os
import json
import re
from html import unescape

def extract_meta_content(html_content, name):
    pattern = f'<meta name="{name}" content="(.*?)"'
    match = re.search(pattern, html_content, re.IGNORECASE)
    if not match:
        pattern = f'<meta content="(.*?)" name="{name}"' # Alternate order
        match = re.search(pattern, html_content, re.IGNORECASE)
    return unescape(match.group(1)) if match else ""

def extract_tag_content(html_content, tag):
    pattern = f'<{tag}.*?>(.*?)</{tag}>'
    matches = re.findall(pattern, html_content, re.IGNORECASE | re.DOTALL)
    clean_matches = []
    for m in matches:
        # Remove nested tags
        m = re.sub('<[^>]+>', '', m)
        m = unescape(m).strip()
        if m: clean_matches.append(m)
    return clean_matches

def crawl_website(root_dir):
    knowledge_base = []
    exclude_dirs = {'.git', 'assets', 'admin', 'node_modules', '.gemini'}
    
    print(f"Starting crawl in: {root_dir}")
    
    for root, dirs, files in os.walk(root_dir):
        # Skip excluded directories
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        
        for file in files:
            if file.endswith('.html') and file != 'Website_Value_Proposal.html':
                filepath = os.path.join(root, file)
                rel_path = os.path.relpath(filepath, root_dir).replace('\\', '/')
                
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                        
                    title = extract_tag_content(content, 'title')
                    description = extract_meta_content(content, 'description')
                    h1_tags = extract_tag_content(content, 'h1')
                    h2_tags = extract_tag_content(content, 'h2')
                    
                    # Extract some core paragraphs for context (first 3)
                    paragraphs = extract_tag_content(content, 'p')[:5]
                    
                    entry = {
                        "url": rel_path,
                        "title": title[0] if title else file,
                        "description": description,
                        "headings": h1_tags + h2_tags,
                        "content": " ".join(paragraphs)
                    }
                    knowledge_base.append(entry)
                    print(f"Indexed: {rel_path}")
                except Exception as e:
                    print(f"Error indexing {rel_path}: {e}")

    return knowledge_base

if __name__ == "__main__":
    current_dir = os.getcwd()
    kb = crawl_website(current_dir)
    
    output_file = 'knowledge_base.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(kb, f, indent=4, ensure_ascii=False)
    
    print(f"\nSuccess! Indexed {len(kb)} pages into {output_file}")
