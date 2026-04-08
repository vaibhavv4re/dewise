import re
import base64
import os

def extract_images():
    # Use absolute path for robustness
    html_path = r'd:\Projects\dewise\dewise.html'
    output_dir = r'd:\Projects\dewise\images'
    
    if not os.path.exists(html_path):
        print(f"Error: {html_path} path not found")
        return

    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the EQUIP_DATA array block
    match = re.search(r'const EQUIP_DATA = \[(.*?)\];', content, re.DOTALL)
    if not match:
        print("EQUIP_DATA not found")
        return

    array_content = match.group(1)
    
    # Split by object pattern
    # Objects look like {name:'...',src:'data:image/jpeg;base64,...'}
    items = re.findall(r'\{.*?src:\'(.*?)\'\}', array_content, re.DOTALL)
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for i, data_uri in enumerate(items):
        # Extract base64 part
        if ',' in data_uri:
            header, encoded = data_uri.split(',', 1)
            # Default extension
            ext = 'jpg'
            if 'png' in header: ext = 'png'
            elif 'gif' in header: ext = 'gif'
            
            try:
                img_data = base64.b64decode(encoded)
                filename = os.path.join(output_dir, f'equip-{i}.{ext}')
                with open(filename, 'wb') as f:
                    f.write(img_data)
                print(f"Saved {filename}")
            except Exception as e:
                print(f"Error saving image {i}: {e}")

if __name__ == "__main__":
    extract_images()
