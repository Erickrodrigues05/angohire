
from PIL import Image
import os

# Paths
bg_path = r"C:/Users/HP/.gemini/antigravity/brain/f31bf93a-10b1-48d2-bfbe-1640d23a22b4/uploaded_image_1765063998827.jpg"
logo_path = r"c:/Users/HP/OneDrive/Ambiente de Trabalho/AngoHire/public/logo.png"
output_path = r"C:/Users/HP/.gemini/antigravity/brain/f31bf93a-10b1-48d2-bfbe-1640d23a22b4/angohire_social_post_v1.jpg"

try:
    # Load images
    bg = Image.open(bg_path).convert("RGBA")
    logo = Image.open(logo_path).convert("RGBA")

    # Resize logo to be subtle (e.g., 20% of background width)
    # But logo.png might be big, let's check dimensions first.
    bg_w, bg_h = bg.size
    
    target_logo_w = int(bg_w * 0.15) # 15% of width
    aspect_ratio = logo.width / logo.height
    target_logo_h = int(target_logo_w / aspect_ratio)
    
    logo = logo.resize((target_logo_w, target_logo_h), Image.Resampling.LANCZOS)

    # Position: Top Right with padding
    padding = int(bg_w * 0.05) # 5% padding
    x_pos = bg_w - target_logo_w - padding
    y_pos = padding

    # Composite
    bg.paste(logo, (x_pos, y_pos), logo)

    # Save as JPG (ignore transparency of BG since it should be opaque)
    bg = bg.convert("RGB")
    bg.save(output_path, quality=95)
    print(f"Success: Image saved to {output_path}")

except Exception as e:
    print(f"Error: {e}")
