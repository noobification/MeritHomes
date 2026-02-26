import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePluginPrerender } from 'vite-plugin-prerender'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginPrerender({
      staticDir: path.join(import.meta.dirname || '.', 'dist'),
      routes: ['/'],
      renderer: 'puppeteer',
      renderAfterDocumentEvent: 'app-rendered',
      postProcess(renderedRoute) {
        // Remove any client-side script tags that could cause hydration mismatch
        renderedRoute.html = renderedRoute.html.replace(
          /<script\b[^>]*type="module"[^>]*><\/script>/gi,
          ''
        );
        return renderedRoute;
      }
    })
  ],
})
