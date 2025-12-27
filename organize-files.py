import os
import shutil

BASE_DIR = r'c:\Users\JYOTI MANDAL\.gemini\antigravity\playground\eternal-sagan'

# Folder structure to create
FOLDER_STRUCTURE = {
    'services': {
        'corporate': [
            'dealers-meet.html', 'product-launch.html', 'family-day.html',
            'team-building.html', 'annual-day.html', 'brand-promotion.html',
            'road-show.html', 'college-events.html', 'sports-events.html',
            'exhibitions.html', 'conferences.html', 'brand-activation.html'
        ],
        'weddings': [
            'wedding-decor.html', 'destination-wedding.html', 'luxury-wedding.html',
            'wedding-planning.html', 'pre-wedding.html', 'traditional-wedding.html'
        ],
        'celebrations': [
            'holi-celebration.html', 'diwali-celebrations.html', 'christmas-celebration.html',
            'independence-day.html', 'new-year-celebration.html'
        ],
        'entertainment': [
            'fashion-show.html', 'live-concerts.html', 'award-nights.html',
            'carnival-events.html', 'theme-party.html', 'games-activities.html',
            'social-events.html'
        ]
    }
}

# Category pages (stay in services/)
CATEGORY_PAGES = [
    'corporate-events.html',
    'weddings.html',
    'celebrations.html',
    'entertainment.html'
]

def create_folders():
    """Create folder structure"""
    services_dir = os.path.join(BASE_DIR, 'services')
    os.makedirs(services_dir, exist_ok=True)
    print(f"[CREATE] services/")
    
    for subfolder in FOLDER_STRUCTURE['services'].keys():
        subfolder_path = os.path.join(services_dir, subfolder)
        os.makedirs(subfolder_path, exist_ok=True)
        print(f"[CREATE] services/{subfolder}/")

def move_files():
    """Move files to their respective folders"""
    moved_count = 0
    
    # Move category pages to services/
    print("\n--- Moving Category Pages ---")
    for page in CATEGORY_PAGES:
        src = os.path.join(BASE_DIR, page)
        dst = os.path.join(BASE_DIR, 'services', page)
        if os.path.exists(src):
            shutil.move(src, dst)
            print(f"[MOVE] {page} -> services/")
            moved_count += 1
        else:
            print(f"[SKIP] {page} - Not found")
    
    # Move service pages to services/[category]/
    print("\n--- Moving Service Pages ---")
    for category, files in FOLDER_STRUCTURE['services'].items():
        for filename in files:
            src = os.path.join(BASE_DIR, filename)
            dst = os.path.join(BASE_DIR, 'services', category, filename)
            if os.path.exists(src):
                shutil.move(src, dst)
                print(f"[MOVE] {filename} -> services/{category}/")
                moved_count += 1
            else:
                print(f"[SKIP] {filename} - Not found")
    
    return moved_count

def update_file_paths():
    """Update all href and src paths in moved files"""
    print("\n--- Updating File Paths ---")
    
    services_dir = os.path.join(BASE_DIR, 'services')
    
    # Update category pages (in services/)
    for page in CATEGORY_PAGES:
        filepath = os.path.join(services_dir, page)
        if os.path.exists(filepath):
            update_paths_in_file(filepath, '../')
            print(f"[UPDATE] services/{page}")
    
    # Update service pages (in services/[category]/)
    for category, files in FOLDER_STRUCTURE['services'].items():
        for filename in files:
            filepath = os.path.join(services_dir, category, filename)
            if os.path.exists(filepath):
                update_paths_in_file(filepath, '../../')
                print(f"[UPDATE] services/{category}/{filename}")

def update_paths_in_file(filepath, prefix):
    """Update paths in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Update CSS
        content = content.replace('href="styles.css"', f'href="{prefix}styles.css"')
        
        # Update JS files
        js_files = ['script.js', 'city-data.js', 'city-service.js', 'service-search.js', 
                    'city-modal.js', 'whatsapp-quote.js']
        for js_file in js_files:
            content = content.replace(f'src="{js_file}"', f'src="{prefix}{js_file}"')
        
        # Update navigation links
        nav_links = {
            'href="index.html"': f'href="{prefix}index.html"',
            'href="services.html"': f'href="{prefix}services.html"',
            'href="about.html"': f'href="{prefix}about.html"',
            'href="gallery.html"': f'href="{prefix}gallery.html"',
            'href="contact.html"': f'href="{prefix}contact.html"'
        }
        for old, new in nav_links.items():
            content = content.replace(old, new)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
    except Exception as e:
        print(f"[ERROR] {os.path.basename(filepath)}: {e}")
        return False

def main():
    print("=" * 60)
    print("Organizing Files into Folder Structure")
    print("=" * 60)
    
    # Step 1: Create folders
    print("\n=== Step 1: Creating Folders ===")
    create_folders()
    
    # Step 2: Move files
    print("\n=== Step 2: Moving Files ===")
    moved_count = move_files()
    
    # Step 3: Update paths
    print("\n=== Step 3: Updating File Paths ===")
    update_file_paths()
    
    print("\n" + "=" * 60)
    print(f"COMPLETE! Moved {moved_count} files")
    print("=" * 60)
    print("\nNew Structure:")
    print("  eternal-sagan/")
    print("  ├── index.html")
    print("  ├── services.html")
    print("  ├── about.html")
    print("  ├── gallery.html")
    print("  ├── contact.html")
    print("  ├── styles.css")
    print("  ├── script.js")
    print("  ├── city-*.js")
    print("  └── services/")
    print("      ├── corporate-events.html")
    print("      ├── weddings.html")
    print("      ├── celebrations.html")
    print("      ├── entertainment.html")
    print("      ├── corporate/")
    print("      │   ├── dealers-meet.html")
    print("      │   ├── product-launch.html")
    print("      │   └── ... (12 files)")
    print("      ├── weddings/")
    print("      │   ├── wedding-decor.html")
    print("      │   └── ... (6 files)")
    print("      ├── celebrations/")
    print("      │   ├── holi-celebration.html")
    print("      │   └── ... (5 files)")
    print("      └── entertainment/")
    print("          ├── fashion-show.html")
    print("          └── ... (7 files)")

if __name__ == "__main__":
    main()
