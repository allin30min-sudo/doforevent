import os
import re

BASE_DIR = r'c:\Users\JYOTI MANDAL\.gemini\antigravity\playground\eternal-sagan'

# City injection script template
CITY_INJECTION_SCRIPT = """
    <!-- City Name Injection -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const city = cityService.getSelectedCity();
            if (city) {
                // Update page title (h1)
                const pageTitle = document.querySelector('h1');
                if (pageTitle && !pageTitle.textContent.includes('—')) {
                    const originalText = pageTitle.textContent.trim();
                    pageTitle.textContent = `${originalText} — ${city}`;
                }

                // Update section titles (h2)
                document.querySelectorAll('h2').forEach(heading => {
                    const originalText = heading.textContent.trim();
                    if (!originalText.includes('—') && !originalText.includes('?')) {
                        heading.textContent = `${originalText} — ${city}`;
                    }
                });

                // Update service card headings (h3 in cards)
                document.querySelectorAll('.card h3, .service-card h3, .card h4, .service-card h4').forEach(heading => {
                    const originalText = heading.textContent.trim();
                    if (!originalText.includes('—')) {
                        heading.textContent = `${originalText} — ${city}`;
                    }
                });
            }
        });
    </script>"""

# Pages to update
PAGES_TO_UPDATE = [
    # Category pages
    'weddings.html',
    'celebrations.html',
    'entertainment.html',
    
    # Wedding services
    'wedding-decor.html',
    'destination-wedding.html',
    'luxury-wedding.html',
    'wedding-planning.html',
    'pre-wedding.html',
    'traditional-wedding.html',
    
    # Corporate services
    'dealers-meet.html',
    'product-launch.html',
    'family-day.html',
    'team-building.html',
    'annual-day.html',
    'brand-promotion.html',
    'road-show.html',
    'college-events.html',
    'sports-events.html',
    'exhibitions.html',
    'conferences.html',
    'brand-activation.html',
    
    # Celebration services
    'holi-celebration.html',
    'diwali-celebrations.html',
    'christmas-celebration.html',
    'independence-day.html',
    'new-year-celebration.html',
    
    # Entertainment services
    'fashion-show.html',
    'live-concerts.html',
    'award-nights.html',
    'carnival-events.html',
    'theme-party.html',
    'games-activities.html',
    'social-events.html'
]

def add_city_injection_script(filepath):
    """Add city injection script before closing body tag"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if city injection already added
        if 'City Name Injection' in content:
            print(f"[SKIP] {os.path.basename(filepath)} - Already has city injection")
            return True
        
        # Find pattern: </script>\n</body>
        pattern = r'(\s*<script src="script\.js"></script>\s*\n)(\s*</body>)'
        replacement = r'\1' + CITY_INJECTION_SCRIPT + '\n\\2'
        
        new_content = re.sub(pattern, replacement, content)
        
        if new_content == content:
            print(f"[ERROR] {os.path.basename(filepath)} - Pattern not found")
            return False
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"[DONE] {os.path.basename(filepath)} - City injection added")
        return True
        
    except Exception as e:
        print(f"[ERROR] {os.path.basename(filepath)} - {e}")
        return False

def main():
    print("=" * 60)
    print("Adding City Name Injection to Pages")
    print("=" * 60)
    
    success_count = 0
    total_count = len(PAGES_TO_UPDATE)
    
    for page in PAGES_TO_UPDATE:
        filepath = os.path.join(BASE_DIR, page)
        if os.path.exists(filepath):
            if add_city_injection_script(filepath):
                success_count += 1
        else:
            print(f"[MISSING] {page} - File not found")
    
    print("=" * 60)
    print(f"Completed: {success_count}/{total_count} pages updated")
    print("=" * 60)

if __name__ == "__main__":
    main()
