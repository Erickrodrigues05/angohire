
import { Jimp } from 'jimp';

const inputPath = "C:/Users/HP/.gemini/antigravity/brain/f31bf93a-10b1-48d2-bfbe-1640d23a22b4/uploaded_image_1765064720323.png";
const outputPath = "C:/Users/HP/.gemini/antigravity/brain/f31bf93a-10b1-48d2-bfbe-1640d23a22b4/logo_transparent.png";

async function main() {
    try {
        console.log("Loading image...");
        const image = await Jimp.read(inputPath);

        console.log("Processing transparency...");
        const targetColor = { r: 255, g: 255, b: 255, a: 255 }; // White
        const threshold = 30; // Tolerance for compression artifacts

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];

            // Calculate distance from white
            const dist = Math.sqrt(
                Math.pow(r - targetColor.r, 2) +
                Math.pow(g - targetColor.g, 2) +
                Math.pow(b - targetColor.b, 2)
            );

            if (dist < threshold) {
                this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
            }
        });

        console.log("Saving...");
        await image.write(outputPath);
        console.log("Success: Image saved to " + outputPath);
    } catch (err) {
        console.error("Error:", err);
    }
}

main();
