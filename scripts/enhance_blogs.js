const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, '../content/blogs');
const keywords = "9anoun ai, 9anon ai, kanon ai, kanoun ai, qanon ai, qanoun ai";

if (!fs.existsSync(blogsDir)) {
    console.error(`Directory not found: ${blogsDir}`);
    process.exit(1);
}

const files = fs.readdirSync(blogsDir);
let updatedCount = 0;

files.forEach(file => {
    if (file.endsWith('.md')) {
        const filePath = path.join(blogsDir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Check if keywords already exist to avoid duplication
        if (!content.includes(keywords)) {
            // Append keywords at the end of the file in a hidden or unobtrusive way
            // Using a "Related Search Terms" section which is good for SEO

            const enhancement = `\n\n---\n\n### Related Search Terms\n${keywords}\n`;

            fs.appendFileSync(filePath, enhancement);
            console.log(`Updated: ${file}`);
            updatedCount++;
        } else {
            console.log(`Skipped (already primed): ${file}`);
        }
    }
});

console.log(`\nSuccess! Updated ${updatedCount} blog posts.`);
