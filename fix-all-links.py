import os
import re

BASE_DIR = r'c:\Users\JYOTI MANDAL\.gemini\antigravity\playground\eternal-sagan'

def fix_service_page_links(filepath, category):
    """Fix links in service pages (services/[category]/*.html)"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Fix category page links (they're in parent directory)
        replacements = {
            'href="corporate-events.html"': 'href="../corporate-events.html"',
            'href="weddings.html"': 'href="../weddings.html"',
            'href="celebrations.html"': 'href="../celebrations.html"',
            'href="entertainment.html"': 'href="../entertainment.html"',
            'href="services.html"': 'href="../../services.html"',
        }
        
        for old, new in replacements.items():
            content = content.replace(old, new)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
    except Exception as e:
        print(f"[ERROR] {os.path.basename(filepath)}: {e}")
        return False

def fix_root_page_links():
    """Fix links in root pages to point to services/ folder"""
    print("=== Fixing Root Pages ===")
    
    root_files = ['index.html', 'services.html', 'about.html', 'contact.html']
    
    for filename in root_files:
        filepath = os.path.join(BASE_DIR, filename)
        if not os.path.exists(filepath):
            continue
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix links to category pages
            replacements = {
                'href="corporate-events.html"': 'href="services/corporate-events.html"',
                'href="weddings.html"': 'href="services/weddings.html"',
                'href="celebrations.html"': 'href="services/celebrations.html"',
                'href="entertainment.html"': 'href="services/entertainment.html"',
            }
            
            for old, new in replacements.items():
                content = content.replace(old, new)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"[FIXED] {filename}")
        except Exception as e:
            print(f"[ERROR] {filename}: {e}")

def fix_category_page_links():
    """Fix links in category pages"""
    print("\n=== Fixing Category Pages ===")
    
    services_dir = os.path.join(BASE_DIR, 'services')
    category_files = ['corporate-events.html', 'weddings.html', 'celebrations.html', 'entertainment.html']
    
    for filename in category_files:
        filepath = os.path.join(services_dir, filename)
        if not os.path.exists(filepath):
            continue
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix links to other category pages (same directory)
            # No changes needed - they're already correct
            
            # Fix links to services.html (parent directory)
            content = content.replace('href="services.html"', 'href="../services.html"')
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            
            print(f"[FIXED] services/{filename}")
        except Exception as e:
            print(f"[ERROR] services/{filename}: {e}")

def main():
    print("=" * 60)
    print("Fixing All Broken Links")
    print("=" * 60)
    
    # Fix root pages
    fix_root_page_links()
    
    # Fix category pages
    fix_category_page_links()
    
    # Fix service pages
    print("\n=== Fixing Service Pages ===")
    services_dir = os.path.join(BASE_DIR, 'services')
    
    for category in ['corporate', 'weddings', 'celebrations', 'entertainment']:
        category_dir = os.path.join(services_dir, category)
        if os.path.exists(category_dir):
            print(f"\n--- services/{category}/ ---")
            for filename in os.listdir(category_dir):
                if filename.endswith('.html'):
                    filepath = os.path.join(category_dir, filename)
                    if fix_service_page_links(filepath, category):
                        print(f"[FIXED] services/{category}/{filename}")
    
    print("\n" + "=" * 60)
    print("Link Fixing Complete!")
    print("=" * 60)
    print("\nRun check-links.py again to verify all links are fixed.")

if __name__ == "__main__":
    main()
