import os
import re

BASE_DIR = r'c:\Users\JYOTI MANDAL\.gemini\antigravity\playground\eternal-sagan'

# All HTML files that need updating
FILES_TO_UPDATE = [
    'corporate-events.html', 'weddings.html', 'celebrations.html', 'entertainment.html',
    'wedding-decor.html', 'destination-wedding.html', 'luxury-wedding.html',
    'wedding-planning.html', 'pre-wedding.html', 'traditional-wedding.html',
    'dealers-meet.html', 'product-launch.html', 'family-day.html',
    'team-building.html', 'annual-day.html', 'brand-promotion.html',
    'road-show.html', 'college-events.html', 'sports-events.html',
    'exhibitions.html', 'conferences.html', 'brand-activation.html',
    'holi-celebration.html', 'diwali-celebrations.html', 'christmas-celebration.html',
    'independence-day.html', 'new-year-celebration.html',
    'fashion-show.html', 'live-concerts.html', 'award-nights.html',
    'carnival-events.html', 'theme-party.html', 'games-activities.html',
    'social-events.html'
]

def fix_h4_selector(filepath):
    """Add h4 selector to city injection script"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already fixed
        if ".card h4" in content:
            print(f"[SKIP] {os.path.basename(filepath)} - Already has h4 selector")
            return True
        
        # Replace the selector
        old_selector = "document.querySelectorAll('.card h3, .service-card h3')"
        new_selector = "document.querySelectorAll('.card h3, .service-card h3, .card h4, .service-card h4')"
        
        new_content = content.replace(old_selector, new_selector)
        
        if new_content == content:
            print(f"[SKIP] {os.path.basename(filepath)} - No changes needed")
            return True
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"[DONE] {os.path.basename(filepath)} - Added h4 selector")
        return True
        
    except Exception as e:
        print(f"[ERROR] {os.path.basename(filepath)} - {e}")
        return False

def main():
    print("=" * 60)
    print("Fixing h4 Selector in City Injection Scripts")
    print("=" * 60)
    
    success_count = 0
    
    for filename in FILES_TO_UPDATE:
        filepath = os.path.join(BASE_DIR, filename)
        if os.path.exists(filepath):
            if fix_h4_selector(filepath):
                success_count += 1
        else:
            print(f"[MISSING] {filename}")
    
    print("=" * 60)
    print(f"Completed: {success_count}/{len(FILES_TO_UPDATE)} files updated")
    print("=" * 60)

if __name__ == "__main__":
    main()
