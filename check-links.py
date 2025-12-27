import os
import re
from pathlib import Path

BASE_DIR = r'c:\Users\JYOTI MANDAL\.gemini\antigravity\playground\eternal-sagan'

def check_file_exists(base_path, relative_path):
    """Check if a file exists relative to base path"""
    # Clean up the path
    relative_path = relative_path.strip('"\'')
    
    # Skip external URLs
    if relative_path.startswith(('http://', 'https://', 'tel:', 'mailto:', '#')):
        return True
    
    # Resolve the full path
    full_path = os.path.normpath(os.path.join(base_path, relative_path))
    return os.path.exists(full_path)

def check_html_file(filepath):
    """Check all links in an HTML file"""
    errors = []
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Get the directory of the file
        file_dir = os.path.dirname(filepath)
        
        # Find all href links
        href_pattern = r'href=["\']([^"\']+)["\']'
        hrefs = re.findall(href_pattern, content)
        
        for href in hrefs:
            if not check_file_exists(file_dir, href):
                errors.append(f"  [BROKEN HREF] {href}")
        
        # Find all src links (CSS, JS, images)
        src_pattern = r'src=["\']([^"\']+)["\']'
        srcs = re.findall(src_pattern, content)
        
        for src in srcs:
            if not check_file_exists(file_dir, src):
                errors.append(f"  [BROKEN SRC] {src}")
        
        # Find CSS links
        css_pattern = r'<link[^>]+href=["\']([^"\']+\.css)["\']'
        css_links = re.findall(css_pattern, content)
        
        for css in css_links:
            if not check_file_exists(file_dir, css):
                errors.append(f"  [BROKEN CSS] {css}")
        
    except Exception as e:
        errors.append(f"  [ERROR] Could not read file: {e}")
    
    return errors

def scan_all_html_files():
    """Scan all HTML files for broken links"""
    print("=" * 70)
    print("CHECKING ALL HTML FILES FOR BROKEN LINKS")
    print("=" * 70)
    
    total_files = 0
    total_errors = 0
    files_with_errors = []
    
    # Check root HTML files
    print("\n=== ROOT HTML FILES ===")
    root_files = ['index.html', 'services.html', 'about.html', 'gallery.html', 'contact.html']
    
    for filename in root_files:
        filepath = os.path.join(BASE_DIR, filename)
        if os.path.exists(filepath):
            total_files += 1
            errors = check_html_file(filepath)
            if errors:
                print(f"\n[ERRORS] {filename}")
                for error in errors:
                    print(error)
                    total_errors += 1
                files_with_errors.append(filename)
            else:
                print(f"[OK] {filename}")
    
    # Check services folder
    services_dir = os.path.join(BASE_DIR, 'services')
    
    print("\n=== SERVICES FOLDER ===")
    
    # Category pages
    category_files = ['city-categories.html', 'corporate-events.html', 'weddings.html', 
                     'celebrations.html', 'entertainment.html']
    
    for filename in category_files:
        filepath = os.path.join(services_dir, filename)
        if os.path.exists(filepath):
            total_files += 1
            errors = check_html_file(filepath)
            if errors:
                print(f"\n[ERRORS] services/{filename}")
                for error in errors:
                    print(error)
                    total_errors += 1
                files_with_errors.append(f"services/{filename}")
            else:
                print(f"[OK] services/{filename}")
    
    # Service pages in subfolders
    for category in ['corporate', 'weddings', 'celebrations', 'entertainment']:
        category_dir = os.path.join(services_dir, category)
        if os.path.exists(category_dir):
            print(f"\n--- services/{category}/ ---")
            for filename in os.listdir(category_dir):
                if filename.endswith('.html'):
                    filepath = os.path.join(category_dir, filename)
                    total_files += 1
                    errors = check_html_file(filepath)
                    if errors:
                        print(f"\n[ERRORS] services/{category}/{filename}")
                        for error in errors:
                            print(error)
                            total_errors += 1
                        files_with_errors.append(f"services/{category}/{filename}")
                    else:
                        print(f"[OK] services/{category}/{filename}")
    
    # Summary
    print("\n" + "=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"Total files checked: {total_files}")
    print(f"Files with errors: {len(files_with_errors)}")
    print(f"Total broken links: {total_errors}")
    
    if files_with_errors:
        print("\nFiles needing fixes:")
        for file in files_with_errors:
            print(f"  - {file}")
    else:
        print("\n✅ ALL LINKS ARE WORKING! No broken links found!")
    
    print("=" * 70)

if __name__ == "__main__":
    scan_all_html_files()
