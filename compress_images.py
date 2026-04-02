import os
from PIL import Image

def compress_images(directory):
    for f in os.listdir(directory):
        if f.lower().endswith(('.jpeg', '.jpg', '.png')):
            p = os.path.join(directory, f)
            size = os.path.getsize(p)
            if size > 1024 * 1024: # > 1MB
                print(f"Compressing {f} ({size/1024/1024:.2f} MB)...")
                try:
                    with Image.open(p) as img:
                        # Convert to RGB for JPEGs
                        if img.mode != 'RGB' and f.lower().endswith(('.jpeg', '.jpg')):
                            img = img.convert('RGB')
                        
                        # Resize if too large
                        original_size = img.size
                        if max(original_size) > 2000:
                            img.thumbnail((2000, 2000), Image.Resampling.LANCZOS)
                            print(f"  -> Resized from {original_size} to {img.size}")
                        
                        # Save optimized
                        img.save(p, optimize=True, quality=80)
                    
                    new_size = os.path.getsize(p)
                    print(f"  -> Success: {new_size/1024/1024:.2f} MB (Reduced by {(1 - new_size/size)*100:.1f}%)")
                except Exception as e:
                    print(f"  -> Error compressing {f}: {str(e)}")

if __name__ == "__main__":
    compress_images(r"app\public\images")
