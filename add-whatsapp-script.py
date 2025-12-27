import os
import re

BASE_DIR = r'c:\Users\JYOTI MANDAL\.gemini\antigravity\playground\eternal-sagan'

# All service pages that have packages
SERVICE_PAGES = [
    # Corporate services (12)
    'dealers-meet.html', 'product-launch.html', 'family-day.html',
    'team-building.html', 'annual-day.html', 'brand-promotion.html',
    'road-show.html', 'college-events.html', 'sports-events.html',
    'exhibitions.html', 'conferences.html', 'brand-activation.html',
    
    # Wedding services (6)
    'wedding-decor.html', 'destination-wedding.html', 'luxury-wedding.html',
    'wedding-planning.html', 'pre-wedding.html', 'traditional-wedding.html',
    
    # Celebration services (5)
    'holi-celebration.html', 'diwali-celebrations.html', 'christmas-celebration.html',
    'independence-day.html', 'new-year-celebration.html',
    
    # Entertainment services (7)
    'fashion-show.html', 'live-concerts.html', 'award-nights.html',
    'carnival-events.html', 'theme-party.html', 'games-activities.html',
    'social-events.html'
]

def add_whatsapp_script(filepath):
    """Add whatsapp-quote.js script before city scripts"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already added
        if 'whatsapp-quote.js' in content:
            print(f"[SKIP] {os.path.basename(filepath)} - Already has WhatsApp script")
            return True
        
        # Find the city scripts section and add whatsapp script before it
        pattern = r'(\s*<!-- City System Scripts -->)'
        replacement = r'    <script src="whatsapp-quote.js"></script>\n\n\1'
        
        new_content = re.sub(pattern, replacement, content)
        
        if new_content == content:
            print(f"[ERROR] {os.path.basename(filepath)} - Pattern not found")
            return False
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"[DONE] {os.path.basename(filepath)} - WhatsApp script added")
        return True
        
    except Exception as e:
        print(f"[ERROR] {os.path.basename(filepath)} - {e}")
        return False

def main():
    print("=" * 60)
    print("Adding WhatsApp Quote Script to Service Pages")
    print("=" * 60)
    
    success_count = 0
    
    for filename in SERVICE_PAGES:
        filepath = os.path.join(BASE_DIR, filename)
        if os.path.exists(filepath):
            if add_whatsapp_script(filepath):
                success_count += 1
        else:
            print(f"[MISSING] {filename}")
    
    print("=" * 60)
    print(f"Completed: {success_count}/{len(SERVICE_PAGES)} files updated")
    print("=" * 60)

if __name__ == "__main__":
    main()
