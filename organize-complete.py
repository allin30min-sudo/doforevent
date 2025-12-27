import os
import shutil

BASE_DIR = r'c:\Users\JYOTI MANDAL\.gemini\antigravity\playground\eternal-sagan'

# Complete folder structure
FOLDERS = {
    'assets': {
        'css': [],
        'js': [],
        'images': []
    },
    'services': {
        'corporate': [],
        'weddings': [],
        'celebrations': [],
        'entertainment': []
    }
}

# Files to move
FILE_MOVES = {
    'assets/css': ['styles.css'],
    'assets/js': [
        'script.js', 'city-data.js', 'city-service.js', 
        'service-search.js', 'city-modal.js', 'whatsapp-quote.js'
    ]
}

def create_complete_structure():
    """Create complete folder structure"""
    print("=== Creating Folder Structure ===")
    
    # Create assets folders
    for folder in ['assets', 'assets/css', 'assets/js', 'assets/images']:
        path = os.path.join(BASE_DIR, folder)
        os.makedirs(path, exist_ok=True)
        print(f"[CREATE] {folder}/")
    
    # Services folders already created
    print("[EXISTS] services/ (already created)")

def move_assets():
    """Move CSS and JS files to assets folder"""
    print("\n=== Moving Assets ===")
    moved = 0
    
    for dest_folder, files in FILE_MOVES.items():
        for filename in files:
            src = os.path.join(BASE_DIR, filename)
            dst = os.path.join(BASE_DIR, dest_folder, filename)
            
            if os.path.exists(src):
                shutil.move(src, dst)
                print(f"[MOVE] {filename} -> {dest_folder}/")
                moved += 1
            else:
                print(f"[SKIP] {filename} - Not found")
    
    return moved

def update_root_html_files():
    """Update index.html, services.html, about.html, gallery.html, contact.html"""
    print("\n=== Updating Root HTML Files ===")
    
    root_files = ['index.html', 'services.html', 'about.html', 'gallery.html', 'contact.html']
    
    for filename in root_files:
        filepath = os.path.join(BASE_DIR, filename)
        if os.path.exists(filepath):
            update_root_file_paths(filepath)
            print(f"[UPDATE] {filename}")

def update_root_file_paths(filepath):
    """Update paths in root HTML files"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Update CSS
        content = content.replace('href="styles.css"', 'href="assets/css/styles.css"')
        
        # Update JS files
        js_files = {
            'script.js': 'assets/js/script.js',
            'city-data.js': 'assets/js/city-data.js',
            'city-service.js': 'assets/js/city-service.js',
            'service-search.js': 'assets/js/service-search.js',
            'city-modal.js': 'assets/js/city-modal.js',
            'whatsapp-quote.js': 'assets/js/whatsapp-quote.js'
        }
        
        for old, new in js_files.items():
            content = content.replace(f'src="{old}"', f'src="{new}"')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
    except Exception as e:
        print(f"[ERROR] {os.path.basename(filepath)}: {e}")
        return False

def update_services_files():
    """Update all files in services/ folder"""
    print("\n=== Updating Services Files ===")
    
    services_dir = os.path.join(BASE_DIR, 'services')
    
    # Update category pages (in services/)
    category_files = ['corporate-events.html', 'weddings.html', 'celebrations.html', 'entertainment.html']
    for filename in category_files:
        filepath = os.path.join(services_dir, filename)
        if os.path.exists(filepath):
            update_service_category_paths(filepath)
            print(f"[UPDATE] services/{filename}")
    
    # Update service pages (in services/[category]/)
    for category in ['corporate', 'weddings', 'celebrations', 'entertainment']:
        category_dir = os.path.join(services_dir, category)
        if os.path.exists(category_dir):
            for filename in os.listdir(category_dir):
                if filename.endswith('.html'):
                    filepath = os.path.join(category_dir, filename)
                    update_service_page_paths(filepath)
                    print(f"[UPDATE] services/{category}/{filename}")

def update_service_category_paths(filepath):
    """Update paths for category pages (services/*.html)"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Update CSS (one level up)
        content = content.replace('href="../styles.css"', 'href="../assets/css/styles.css"')
        
        # Update JS files
        js_files = ['script.js', 'city-data.js', 'city-service.js', 'service-search.js', 'city-modal.js', 'whatsapp-quote.js']
        for js_file in js_files:
            content = content.replace(f'src="../{js_file}"', f'src="../assets/js/{js_file}"')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
    except Exception as e:
        print(f"[ERROR] {os.path.basename(filepath)}: {e}")
        return False

def update_service_page_paths(filepath):
    """Update paths for service pages (services/[category]/*.html)"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Update CSS (two levels up)
        content = content.replace('href="../../styles.css"', 'href="../../assets/css/styles.css"')
        
        # Update JS files
        js_files = ['script.js', 'city-data.js', 'city-service.js', 'service-search.js', 'city-modal.js', 'whatsapp-quote.js']
        for js_file in js_files:
            content = content.replace(f'src="../../{js_file}"', f'src="../../assets/js/{js_file}"')
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return True
    except Exception as e:
        print(f"[ERROR] {os.path.basename(filepath)}: {e}")
        return False

def main():
    print("=" * 60)
    print("Complete File Organization - Assets + Services")
    print("=" * 60)
    
    # Step 1: Create folders
    create_complete_structure()
    
    # Step 2: Move assets
    moved = move_assets()
    
    # Step 3: Update root HTML files
    update_root_html_files()
    
    # Step 4: Update services files
    update_services_files()
    
    print("\n" + "=" * 60)
    print(f"COMPLETE! Moved {moved} asset files")
    print("=" * 60)
    print("\nFinal Structure:")
    print("  eternal-sagan/")
    print("  ├── index.html")
    print("  ├── services.html")
    print("  ├── about.html")
    print("  ├── gallery.html")
    print("  ├── contact.html")
    print("  ├── assets/")
    print("  │   ├── css/")
    print("  │   │   └── styles.css")
    print("  │   ├── js/")
    print("  │   │   ├── script.js")
    print("  │   │   ├── city-data.js")
    print("  │   │   ├── city-service.js")
    print("  │   │   ├── service-search.js")
    print("  │   │   ├── city-modal.js")
    print("  │   │   └── whatsapp-quote.js")
    print("  │   └── images/")
    print("  └── services/")
    print("      ├── corporate-events.html")
    print("      ├── weddings.html")
    print("      ├── celebrations.html")
    print("      ├── entertainment.html")
    print("      ├── corporate/ (12 files)")
    print("      ├── weddings/ (6 files)")
    print("      ├── celebrations/ (5 files)")
    print("      └── entertainment/ (7 files)")

if __name__ == "__main__":
    main()
