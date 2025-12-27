import os
import re

BASE_DIR = r'c:\Users\JYOTI MANDAL\.gemini\antigravity\playground\eternal-sagan\services'

# Map category pages to their service subfolder
CATEGORY_SERVICE_MAP = {
    'corporate-events.html': {
        'folder': 'corporate',
        'services': [
            'dealers-meet', 'product-launch', 'family-day', 'team-building',
            'annual-day', 'brand-promotion', 'road-show', 'college-events',
            'sports-events', 'exhibitions', 'conferences', 'brand-activation'
        ]
    },
    'weddings.html': {
        'folder': 'weddings',
        'services': [
            'wedding-decor', 'destination-wedding', 'luxury-wedding',
            'wedding-planning', 'pre-wedding', 'traditional-wedding'
        ]
    },
    'celebrations.html': {
        'folder': 'celebrations',
        'services': [
            'holi-celebration', 'diwali-celebrations', 'christmas-celebration',
            'independence-day', 'new-year-celebration'
        ]
    },
    'entertainment.html': {
        'folder': 'entertainment',
        'services': [
            'fashion-show', 'live-concerts', 'award-nights', 'carnival-events',
            'theme-party', 'games-activities', 'social-events'
        ]
    }
}

def fix_category_page(filename, folder, services):
    """Fix service card links in a category page"""
    filepath = os.path.join(BASE_DIR, filename)
    
    if not os.path.exists(filepath):
        print(f"[SKIP] {filename} - Not found")
        return False
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Fix each service link
        for service in services:
            # Pattern: onclick="window.location.href='service-name.html'"
            old_pattern = f"onclick=\"window.location.href='{service}.html'\""
            new_pattern = f"onclick=\"window.location.href='{folder}/{service}.html'\""
            content = content.replace(old_pattern, new_pattern)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"[FIXED] {filename}")
            return True
        else:
            print(f"[OK] {filename} - No changes needed")
            return False
            
    except Exception as e:
        print(f"[ERROR] {filename}: {e}")
        return False

def main():
    print("=" * 60)
    print("Fixing Service Card Links in Category Pages")
    print("=" * 60)
    
    fixed_count = 0
    
    for filename, config in CATEGORY_SERVICE_MAP.items():
        if fix_category_page(filename, config['folder'], config['services']):
            fixed_count += 1
    
    print("\n" + "=" * 60)
    print(f"Fixed {fixed_count} category pages")
    print("=" * 60)
    print("\nNow service cards will correctly link to:")
    print("  weddings.html → weddings/wedding-decor.html")
    print("  corporate-events.html → corporate/dealers-meet.html")
    print("  etc.")

if __name__ == "__main__":
    main()
