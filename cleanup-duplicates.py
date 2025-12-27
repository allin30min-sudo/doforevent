import os
import shutil

BASE_DIR = r'c:\Users\JYOTI MANDAL\.gemini\antigravity\playground\eternal-sagan'

# Extra files found in root that need to be moved or deleted
EXTRA_FILES = {
    # These look like duplicates/old files - check if they're needed
    'carnival.html': 'services/entertainment/carnival-events.html',  # Duplicate?
    'christmas.html': 'services/celebrations/christmas-celebration.html',  # Duplicate?
    'diwali.html': 'services/celebrations/diwali-celebrations.html',  # Duplicate?
    'holi.html': 'services/celebrations/holi-celebration.html',  # Duplicate?
    'new-year.html': 'services/celebrations/new-year-celebration.html',  # Duplicate?
    'republic-day.html': 'services/celebrations/independence-day.html',  # Duplicate?
    'wedding.html': 'services/weddings.html',  # Duplicate?
}

def check_and_move_files():
    """Check if files are duplicates and move or delete them"""
    print("=" * 60)
    print("Checking Extra HTML Files in Root")
    print("=" * 60)
    
    for filename, possible_duplicate in EXTRA_FILES.items():
        src = os.path.join(BASE_DIR, filename)
        dst_path = os.path.join(BASE_DIR, possible_duplicate)
        
        if not os.path.exists(src):
            print(f"[SKIP] {filename} - Not found")
            continue
        
        # Check if the target file already exists
        if os.path.exists(dst_path):
            # Compare file sizes
            src_size = os.path.getsize(src)
            dst_size = os.path.getsize(dst_path)
            
            if src_size == dst_size:
                # Likely duplicate - delete the root file
                os.remove(src)
                print(f"[DELETE] {filename} - Duplicate of {possible_duplicate}")
            else:
                # Different sizes - backup the root file
                backup_dir = os.path.join(BASE_DIR, 'old_files')
                os.makedirs(backup_dir, exist_ok=True)
                backup_path = os.path.join(backup_dir, filename)
                shutil.move(src, backup_path)
                print(f"[BACKUP] {filename} -> old_files/ (different from {possible_duplicate})")
        else:
            # Target doesn't exist - this might be the actual file
            print(f"[KEEP] {filename} - Target {possible_duplicate} doesn't exist")

def main():
    check_and_move_files()
    
    print("\n" + "=" * 60)
    print("Cleanup Complete!")
    print("=" * 60)
    
    # List remaining files in root
    print("\nRemaining HTML files in root:")
    for file in os.listdir(BASE_DIR):
        if file.endswith('.html'):
            print(f"  - {file}")

if __name__ == "__main__":
    main()
