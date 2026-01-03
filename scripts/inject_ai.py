import os

def inject_assistant():
    files_updated = 0
    css_tag = '\n    <link rel="stylesheet" href="assets/css/ai-assistant.css">'
    js_tag = '\n    <script src="assets/js/ai-assistant.js" defer></script>\n'
    
    # Path correction logic if in subfolders
    # Since assets/ is in the root, it should be /assets/ if we want it to work everywhere easily
    # Or we can use relative paths based on depth
    
    for root, dirs, files in os.walk('.'):
        if 'admin' in root or '.git' in root or 'node_modules' in root:
            continue
            
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                depth = root.count(os.sep)
                prefix = '../' * depth
                
                # Check if already injected
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if 'ai-assistant.js' in content:
                    print(f"Skipping (Already Injected): {filepath}")
                    continue

                # Prepare depth-aware tags
                f_css = css_tag.replace('assets/', prefix + 'assets/')
                f_js = js_tag.replace('assets/', prefix + 'assets/')

                # Inject CSS in head
                if '</head>' in content:
                    content = content.replace('</head>', f_css + '\n</head>')
                
                # Inject JS before body end
                if '</body>' in content:
                    content = content.replace('</body>', f_js + '</body>')
                
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                print(f"Injected into: {filepath}")
                files_updated += 1

    print(f"\nSuccess! AI Assistant injected into {files_updated} files.")

if __name__ == "__main__":
    inject_assistant()
