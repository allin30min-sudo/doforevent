import os
import re

BASE_DIR = r'c:\Users\JYOTI MANDAL\.gemini\antigravity\playground\eternal-sagan'

# All pages with navbar
PAGES = ['index.html', 'services.html', 'about.html', 'gallery.html', 'contact.html']

def remove_city_selector_from_navbar(filepath):
    """Remove city selector button from navbar"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if city selector exists
        if 'id="navCitySelector"' not in content:
            print(f"[SKIP] {os.path.basename(filepath)} - No city selector found")
            return False
        
        # Remove the city selector div block
        pattern = r'\s*<!-- City Selector -->\s*<div class="city-selector-nav">.*?</div>\s*'
        new_content = re.sub(pattern, '\n                ', content, flags=re.DOTALL)
        
        if new_content == content:
            print(f"[ERROR] {os.path.basename(filepath)} - Could not remove city selector")
            return False
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"[REMOVED] {os.path.basename(filepath)} - City selector removed from navbar")
        return True
        
    except Exception as e:
        print(f"[ERROR] {os.path.basename(filepath)}: {e}")
        return False

def remove_city_selector_js(filepath):
    """Remove city selector JavaScript"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if JS exists
        if 'Navbar City Selector Handler' not in content:
            print(f"[SKIP] {os.path.basename(filepath)} - No city selector JS found")
            return False
        
        # Remove the script block
        pattern = r'\s*<script>\s*// Navbar City Selector Handler.*?</script>\s*'
        new_content = re.sub(pattern, '\n', content, flags=re.DOTALL)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"[REMOVED] {os.path.basename(filepath)} - City selector JS removed")
        return True
        
    except Exception as e:
        print(f"[ERROR] {os.path.basename(filepath)}: {e}")
        return False

def main():
    print("=" * 60)
    print("Removing City Selector from All Pages")
    print("=" * 60)
    
    navbar_count = 0
    js_count = 0
    
    for page in PAGES:
        filepath = os.path.join(BASE_DIR, page)
        
        if not os.path.exists(filepath):
            print(f"[SKIP] {page} - File not found")
            continue
        
        print(f"\n--- Processing {page} ---")
        
        # Remove from navbar
        if remove_city_selector_from_navbar(filepath):
            navbar_count += 1
        
        # Remove JavaScript
        if remove_city_selector_js(filepath):
            js_count += 1
    
    print("\n" + "=" * 60)
    print(f"COMPLETE!")
    print(f"  Navbar cleaned: {navbar_count}/{len(PAGES)} pages")
    print(f"  JavaScript removed: {js_count}/{len(PAGES)} pages")
    print("=" * 60)
    print("\nCity selector removed from navbar on all pages!")

if __name__ == "__main__":
    main()
