import os
import re

BASE_DIR = r'c:\Users\JYOTI MANDAL\.gemini\antigravity\playground\eternal-sagan'

def fix_all_service_links(filepath):
    """Fix ALL occurrences of service links in a file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Replace ALL occurrences (not just first)
        # Category pages (parent directory for service pages in subfolders)
        content = re.sub(r'href="corporate-events\.html"', 'href="../corporate-events.html"', content)
        content = re.sub(r'href="weddings\.html"', 'href="../weddings.html"', content)
        content = re.sub(r'href="celebrations\.html"', 'href="../celebrations.html"', content)
        content = re.sub(r'href="entertainment\.html"', 'href="../entertainment.html"', content)
        
        # Services.html (two levels up for service pages)
        content = re.sub(r'href="services\.html"', 'href="../../services.html"', content)
        
        # Other service pages in same category folder
        # Corporate services
        corporate_services = [
            'dealers-meet', 'product-launch', 'family-day', 'team-building',
            'annual-day', 'brand-promotion', 'road-show', 'college-events',
            'sports-events', 'exhibitions', 'conferences', 'brand-activation'
        ]
        
        # Wedding services
        wedding_services = [
            'wedding-decor', 'destination-wedding', 'luxury-wedding',
            'wedding-planning', 'pre-wedding', 'traditional-wedding'
        ]
        
        # Celebration services
        celebration_services = [
            'holi-celebration', 'diwali-celebrations', 'christmas-celebration',
            'independence-day', 'new-year-celebration'
        ]
        
        # Entertainment services
        entertainment_services = [
            'fashion-show', 'live-concerts', 'award-nights', 'carnival-events',
            'theme-party', 'games-activities', 'social-events'
        ]
        
        # Fix links to services in OTHER categories (need to go up and into different folder)
        # For corporate pages linking to wedding services
        for service in wedding_services:
            content = re.sub(
                rf'href="{service}\.html"',
                f'href="../weddings/{service}.html"',
                content
            )
        
        # For corporate pages linking to celebration services
        for service in celebration_services:
            content = re.sub(
                rf'href="{service}\.html"',
                f'href="../celebrations/{service}.html"',
                content
            )
        
        # For corporate pages linking to entertainment services
        for service in entertainment_services:
            content = re.sub(
                rf'href="{service}\.html"',
                f'href="../entertainment/{service}.html"',
                content
            )
        
        # For wedding pages linking to corporate services
        for service in corporate_services:
            content = re.sub(
                rf'href="{service}\.html"',
                f'href="../corporate/{service}.html"',
                content
            )
        
        # Save only if changed
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
        
    except Exception as e:
        print(f"[ERROR] {os.path.basename(filepath)}: {e}")
        return False

def main():
    print("=" * 60)
    print("Comprehensive Link Fix - ALL Occurrences")
    print("=" * 60)
    
    services_dir = os.path.join(BASE_DIR, 'services')
    fixed_count = 0
    
    # Fix all service pages
    for category in ['corporate', 'weddings', 'celebrations', 'entertainment']:
        category_dir = os.path.join(services_dir, category)
        if os.path.exists(category_dir):
            print(f"\n=== services/{category}/ ===")
            for filename in os.listdir(category_dir):
                if filename.endswith('.html'):
                    filepath = os.path.join(category_dir, filename)
                    if fix_all_service_links(filepath):
                        print(f"[FIXED] {filename}")
                        fixed_count += 1
                    else:
                        print(f"[OK] {filename} - No changes needed")
    
    print("\n" + "=" * 60)
    print(f"Fixed {fixed_count} files")
    print("=" * 60)

if __name__ == "__main__":
    main()
