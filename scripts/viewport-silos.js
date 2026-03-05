import fs from 'fs';
import path from 'path';

const pagesDir = './src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx') && f !== 'Home.jsx');

for (const file of files) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    let modified = false;

    if (!content.includes('ViewportTrigger')) {
        // 1. Refactor LineArtConstruction import to be lazy and add ViewportTrigger import
        if (content.includes("import LineArtConstruction from '../components/LineArtConstruction';")) {
            content = content.replace(
                "import LineArtConstruction from '../components/LineArtConstruction';",
                "const LineArtConstruction = lazy(() => import('../components/LineArtConstruction'));\nimport ViewportTrigger from '../components/ViewportTrigger';"
            );
            modified = true;
        } else if (content.includes("import ViewportTrigger")) {
            // Do nothing
        } else {
            // Catch all if for some reason the static import isn't exactly matching
            const lastImportIndex = content.lastIndexOf('import ');
            const endOfLastImport = content.indexOf('\n', lastImportIndex);
            content = content.slice(0, endOfLastImport + 1) + "import ViewportTrigger from '../components/ViewportTrigger';\n" + content.slice(endOfLastImport + 1);
            modified = true;
        }

        // 2. Replace <Suspense> wrapping lazy components with <ViewportTrigger>
        if (content.match(/<Suspense fallback=\{([^}]+)\}>/g)) {
            content = content.replace(/<Suspense fallback=\{([^}]+)\}>/g, '<ViewportTrigger fallback={$1}>');
            content = content.replace(/<\/Suspense>/g, '</ViewportTrigger>');
            modified = true;
        }

        // 3. Wrap naked LineArtConstruction
        if (content.includes('<LineArtConstruction />')) {
            content = content.replace(/<LineArtConstruction \/>/g, '<ViewportTrigger fallback={<div className="h-screen bg-background" />}><LineArtConstruction /></ViewportTrigger>');
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`Updated ${file}`);
        }
    }
}
