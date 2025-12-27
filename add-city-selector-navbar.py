import os
import re

BASE_DIR = r'c:\Users\JYOTI MANDAL\.gemini\antigravity\playground\eternal-sagan'

# Pages to update
PAGES = ['services.html', 'about.html', 'gallery.html', 'contact.html']

# City selector HTML to insert
CITY_SELECTOR_HTML = '''                
                <!-- City Selector -->
                <div class="city-selector-nav">
                    <button class="btn btn-outline" id="navCitySelector" style="display: flex; align-items: center; gap: var(--spacing-xs);">
                        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <span id="selectedCityName">Select City</span>
                    </button>
                </div>
                '''

# JavaScript to add before </body>
CITY_SELECTOR_JS = '''    
    <script>
        // Navbar City Selector Handler
        document.addEventListener('DOMContentLoaded', function() {
            const navCitySelector = document.getElementById('navCitySelector');
            const selectedCityName = document.getElementById('selectedCityName');
            
            // Update button text if city is already selected
            const currentCity = cityService.getSelectedCity();
            if (currentCity) {
                selectedCityName.textContent = currentCity;
            }
            
            // Open city modal when clicked
            if (navCitySelector) {
                navCitySelector.addEventListener('click', function() {
                    openCityModal();
                });
            }
            
            // Listen for city selection changes
            window.addEventListener('citySelected', function(e) {
                if (e.detail && e.detail.city) {
                    selectedCityName.textContent = e.detail.city;
                }
            });
        });
    </script>
'''

def add_city_selector_to_navbar(filepath):
    """Add city selector button to navbar"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already added
        if 'id="navCitySelector"' in content:
            print(f"[SKIP] {os.path.basename(filepath)} - Already has city selector")
            return False
        
        # Find the Get Quote button and add city selector before it
        pattern = r'(\s*<a href="contact\.html" class="btn btn-primary">Get Quote</a>)'
        replacement = CITY_SELECTOR_HTML + r'\1'
        
        new_content = re.sub(pattern, replacement, content)
        
        if new_content == content:
            print(f"[ERROR] {os.path.basename(filepath)} - Could not find Get Quote button")
            return False
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"[ADDED] {os.path.basename(filepath)} - City selector added to navbar")
        return True
        
    except Exception as e:
        print(f"[ERROR] {os.path.basename(filepath)}: {e}")
        return False

def add_city_selector_js(filepath):
    """Add city selector JavaScript before </body>"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already added
        if 'Navbar City Selector Handler' in content:
            print(f"[SKIP] {os.path.basename(filepath)} - Already has city selector JS")
            return False
        
        # Add before </body>
        pattern = r'(\s*</body>)'
        replacement = CITY_SELECTOR_JS + r'\1'
        
        new_content = re.sub(pattern, replacement, content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"[ADDED] {os.path.basename(filepath)} - City selector JS added")
        return True
        
    except Exception as e:
        print(f"[ERROR] {os.path.basename(filepath)}: {e}")
        return False

def main():
    print("=" * 60)
    print("Adding City Selector to All Pages")
    print("=" * 60)
    
    navbar_count = 0
    js_count = 0
    
    for page in PAGES:
        filepath = os.path.join(BASE_DIR, page)
        
        if not os.path.exists(filepath):
            print(f"[SKIP] {page} - File not found")
            continue
        
        print(f"\n--- Processing {page} ---")
        
        # Add to navbar
        if add_city_selector_to_navbar(filepath):
            navbar_count += 1
        
        # Add JavaScript
        if add_city_selector_js(filepath):
            js_count += 1
    
    print("\n" + "=" * 60)
    print(f"COMPLETE!")
    print(f"  Navbar updated: {navbar_count}/{len(PAGES)} pages")
    print(f"  JavaScript added: {js_count}/{len(PAGES)} pages")
    print("=" * 60)
    print("\nCity selector now available on all pages!")
    print("Users can select their city from navbar and see city-specific services.")

if __name__ == "__main__":
    main()
