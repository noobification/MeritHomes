// Generates static image assets referenced in page metadata:
//   public/og-image.jpg        1200x630 social share image
//   public/apple-touch-icon.png 180x180 rasterized from favicon.svg
// Run: node scripts/generate-assets.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (p) => path.join(root, 'public', p);

const SOURCE_PHOTO = pub('portfolio/media__1771989271639.jpg');

await sharp(SOURCE_PHOTO)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(pub('og-image.jpg'));
console.log('wrote public/og-image.jpg');

await sharp(pub('favicon.svg'), { density: 300 })
    .resize(180, 180, { fit: 'contain', background: '#0a0a0a' })
    .png()
    .toFile(pub('apple-touch-icon.png'));
console.log('wrote public/apple-touch-icon.png');
