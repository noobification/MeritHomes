import fs from 'fs';
import path from 'path';

const pagesDir = './src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Add import statement if missing
    if (!content.includes('HeroBackground')) {
        const lastImportIndex = content.lastIndexOf('import ');
        const endOfLastImport = content.indexOf('\n', lastImportIndex);
        content = content.slice(0, endOfLastImport + 1) + "import HeroBackground from '../components/HeroBackground';\n" + content.slice(endOfLastImport + 1);
    }

    // Match the inline video block wrapper and replace with <HeroBackground />
    const blockRegex = /<div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>[\s\S]*?<\/video>\s*<\/div>/g;

    if (blockRegex.test(content)) {
        content = content.replace(blockRegex, '<HeroBackground />');
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${file}`);
    }
}
