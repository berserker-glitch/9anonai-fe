const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const inputFile = path.join(publicDir, '9anon-logo.png');
const outputFile = path.join(publicDir, '9anon-logo.webp');

async function optimize() {
    if (!fs.existsSync(inputFile)) {
        console.error('Input file not found:', inputFile);
        return;
    }

    try {
        const metadata = await sharp(inputFile).metadata();
        console.log(`Input: ${metadata.width}x${metadata.height}, ${metadata.format}`);

        // Resize to 140x140 (2x for 70px display) and convert to WebP
        await sharp(inputFile)
            .resize(140, 140, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .webp({ quality: 80, lossless: true })
            .toFile(outputFile);

        console.log('Optimized image created:', outputFile);
    } catch (err) {
        console.error('Error optimizing image:', err);
    }
}

optimize();
