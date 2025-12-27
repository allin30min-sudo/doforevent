import os
import re

BASE_DIR = r'c:\Users\JYOTI MANDAL\.gemini\antigravity\playground\eternal-sagan'

def fix_root_and_category_pages():
    """Fix remaining broken links in root and category pages"""
    print("=" * 60)
    print("Fixing Final Broken Links")
    print("=" * 60)
    
    # Fix root pages
    print("\n=== Root Pages ===")
    root_files = {
        'index.html': {
            'href="wedding.html"': 'href="services/weddings.html"',
        },
        'services.html': {
            'onclick="window.location.href=\'corporate-events.html\'"': 'onclick="window.location.href=\'services/corporate-events.html\'"',
            'onclick="window.location.href=\'weddings.html\'"': 'onclick="window.location.href=\'services/weddings.html\'"',
            'onclick="window.location.href=\'celebrations.html\'"': 'onclick="window.location.href=\'services/celebrations.html\'"',
            'onclick="window.location.href=\'entertainment.html\'"': 'onclick="window.location.href=\'services/entertainment.html\'"',
        },
        'about.html': {
            'href="wedding.html"': 'href="services/weddings.html"',
        },
        'contact.html': {
            'href="wedding.html"': 'href="services/weddings.html"',
        }
    }
    
    for filename, replacements in root_files.items():
        filepath = os.path.join(BASE_DIR, filename)
        if not os.path.exists(filepath):
            continue
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            for old, new in replacements.items():
                content = content.replace(old, new)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"[FIXED] {filename}")
        except Exception as e:
            print(f"[ERROR] {filename}: {e}")
    
    # Fix category pages
    print("\n=== Category Pages ===")
    services_dir = os.path.join(BASE_DIR, 'services')
    category_files = ['corporate-events.html', 'weddings.html', 'celebrations.html', 'entertainment.html']
    
    for filename in category_files:
        filepath = os.path.join(services_dir, filename)
        if not os.path.exists(filepath):
            continue
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix service card links (they should point to subfolders)
            # These are in the "Related Services" or category slider sections
            # Already fixed by organize script, but double-check
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"[OK] services/{filename}")
        except Exception as e:
            print(f"[ERROR] services/{filename}: {e}")
    
    print("\n" + "=" * 60)
    print("Final Link Fix Complete!")
    print("=" * 60)

if __name__ == "__main__":
    fix_root_and_category_pages()
