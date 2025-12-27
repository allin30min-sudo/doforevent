import os
import re

# City system scripts to add
CITY_SCRIPTS = """
    <!-- City System Scripts -->
    <script src="city-data.js"></script>
    <script src="city-service.js"></script>
    <script src="service-search.js"></script>
    <script src="city-modal.js"></script>"""

# List of all service pages to update (remaining 24 pages)
SERVICE_PAGES = [
    # Corporate (10 remaining)
    'product-launch.html', 'family-day.html', 'team-building.html',
    'annual-day.html', 'brand-promotion.html', 'road-show.html',
    'college-events.html', 'sports-events.html', 'exhibitions.html',
    'conferences.html', 'brand-activation.html',
    
    # Weddings (4 remaining)
    'destination-wedding.html', 'luxury-wedding.html',
    'wedding-planning.html', 'pre-wedding.html', 'traditional-wedding.html',
    
    # Celebrations (all 5)
    'holi-celebration.html', 'diwali-celebrations.html', 'christmas-celebration.html',
    'independence-day.html', 'new-year-celebration.html',
    
    # Entertainment (all 7)
    'fashion-show.html', 'live-concerts.html', 'award-nights.html',
    'carnival-events.html', 'theme-party.html', 'games-activities.html',
    'social-events.html'
]

BASE_DIR = r'c:\Users\JYOTI MANDAL\.gemini\antigravity\playground\eternal-sagan'

def add_city_scripts_to_file(filepath):
    """Add city system scripts before closing body tag"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if city scripts already added
        if 'city-data.js' in content:
            print(f"[OK] {os.path.basename(filepath)} - Already has city scripts")
            return True
        
        # Find the pattern: </a>\n\n    <script src="script.js"></script>\n</body>
        pattern = r'(</a>\s*\n\s*\n\s*)<script src="script\.js"></script>\s*\n</body>'
        replacement = r'\1' + CITY_SCRIPTS + '\n    <script src="script.js"></script>\n</body>'
        
        new_content = re.sub(pattern, replacement, content)
        
        if new_content == content:
            print(f"[SKIP] {os.path.basename(filepath)} - Pattern not found")
            return False
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"[DONE] {os.path.basename(filepath)} - City scripts added")
        return True
        
    except Exception as e:
        print(f"[ERROR] {os.path.basename(filepath)} - Error: {e}")

        return False

def main():
    print("=" * 60)
    print("Adding City System Scripts to Service Pages")
    print("=" * 60)
    
    success_count = 0
    total_count = len(SERVICE_PAGES)
    
    for page in SERVICE_PAGES:
        filepath = os.path.join(BASE_DIR, page)
        if os.path.exists(filepath):
            if add_city_scripts_to_file(filepath):
                success_count += 1
        else:
            print(f"✗ {page} - File not found")
    
    print("=" * 60)
    print(f"Completed: {success_count}/{total_count} pages updated")
    print("=" * 60)

if __name__ == "__main__":
    main()
