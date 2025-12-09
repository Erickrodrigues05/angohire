
const Jimp = require('jimp');
const path = require('path');

const bgPath = "C:/Users/HP/.gemini/antigravity/brain/f31bf93a-10b1-48d2-bfbe-1640d23a22b4/uploaded_image_1765063998827.jpg";
const logoPath = "c:/Users/HP/OneDrive/Ambiente de Trabalho/AngoHire/public/logo.png";
const outputPath = "C:/Users/HP/.gemini/antigravity/brain/f31bf93a-10b1-48d2-bfbe-1640d23a22b4/angohire_social_post_v1.jpg";

async function main() {
    try {
        console.log("Loading images...");
        const bg = await Jimp.read(bgPath);
        const logo = await Jimp.read(logoPath);

        console.log("Resizing logo...");
        // Resize logo to 20% of BG width (increased from 15% for visibility)
        const targetW = bg.bitmap.width * 0.20;
        logo.resize(targetW, Jimp.AUTO);

        // Position: Top Right with 5% padding
        const padding = bg.bitmap.width * 0.05;
        const x = bg.bitmap.width - targetW - padding;
        const y = padding;

        console.log("Compositing...");
        bg.composite(logo, x, y);

        console.log("Saving...");
        await bg.writeAsync(outputPath);
        console.log("Success: Image saved to " + outputPath);
    } catch (err) {
        console.error("Error:", err);
    }
}

main();
