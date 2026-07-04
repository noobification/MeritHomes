// Prerenders every route to static HTML and generates sitemap.xml.
//
// Run after both client and SSR builds:
//   vite build
//   vite build --ssr src/entry-server.jsx --outDir dist-server
//   node scripts/prerender.mjs
//
// Uses React 19's prerender API (react-dom/static), which waits for all
// Suspense/lazy boundaries to resolve, so lazy-loaded sections are fully
// rendered into the HTML.
import { prerender } from 'react-dom/static';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const { createApp } = await import(
    pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href
);
const { ALL_ROUTES, SITE_URL } = await import(
    pathToFileURL(path.join(root, 'src', 'config', 'site.js')).href
);

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf-8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
    throw new Error('dist/index.html is missing <!--app-head--> / <!--app-html--> placeholders');
}

// React 19 hoists <title>/<meta>/<link> to the very front of the
// prerendered stream, before any structural markup. Split that leading
// run of head tags off so it can be injected into the template <head>.
const HEAD_TAGS_RE = /^(?:<title[^>]*>.*?<\/title>|<meta\s[^>]*\/?>|<link\s[^>]*\/?>)+/s;

async function renderRoute(url) {
    const { prelude } = await prerender(createApp(url), {
        onError(err) {
            console.error(`  render error on ${url}:`, err);
            throw err;
        },
    });
    const html = await new Response(prelude).text();

    const match = html.match(HEAD_TAGS_RE);
    if (!match) {
        throw new Error(`No hoisted head tags found for ${url} — is <Seo> missing on this page?`);
    }
    const head = match[0];
    const appHtml = html.slice(head.length);

    return template
        .replace('<!--app-head-->', head)
        .replace('<!--app-html-->', appHtml);
}

for (const route of ALL_ROUTES) {
    const html = await renderRoute(route);
    // Routes emit flat files (dist/hinsdale.html): Netlify's pretty URLs
    // serves them at /hinsdale with no trailing-slash redirect, so the
    // served URL matches the canonical exactly. /404 doubles as Netlify's
    // custom error page.
    const outFile = route === '/'
        ? path.join(dist, 'index.html')
        : path.join(dist, `${route.slice(1)}.html`);

    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, html);
    console.log(`prerendered ${route} -> ${path.relative(root, outFile)}`);
}

// sitemap.xml — every indexable route (404 excluded).
const today = new Date().toISOString().slice(0, 10);
const urls = ALL_ROUTES.filter((r) => r !== '/404')
    .map((r) => {
        const loc = r === '/' ? `${SITE_URL}/` : `${SITE_URL}${r}`;
        return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
    })
    .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`generated sitemap.xml (${ALL_ROUTES.length - 1} URLs)`);
