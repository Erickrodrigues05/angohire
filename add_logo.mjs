
import { Jimp } from 'jimp';

// Paths
const bgPath = "C:/Users/HP/.gemini/antigravity/brain/f31bf93a-10b1-48d2-bfbe-1640d23a22b4/auto_sender_portuguese_base_1765067755376.png";
const logoPath = "C:/Users/HP/.gemini/antigravity/brain/f31bf93a-10b1-48d2-bfbe-1640d23a22b4/logo_transparent.png";
const outputPath = "C:/Users/HP/.gemini/antigravity/brain/f31bf93a-10b1-48d2-bfbe-1640d23a22b4/feature_automation_post.jpg";

async function main() {
    try {
        console.log("Loading images...");
        const bg = await Jimp.read(bgPath);
        const logo = await Jimp.read(logoPath);

        console.log("Resizing logo...");
        // Resize logo to 25% of BG width for good visibility
        const targetW = bg.bitmap.width * 0.25;
        logo.resize({ w: targetW });

        // Position: Top Right with 5% padding
        const padding = bg.bitmap.width * 0.05;
        const x = bg.bitmap.width - targetW - padding;
        const y = padding;

        console.log("Compositing...");
        bg.composite(logo, x, y);

        console.log("Saving...");
        await bg.write(outputPath);
        console.log("Success: Image saved to " + outputPath);
    } catch (err) {
        console.error("Error:", err);
    }
}

main();
