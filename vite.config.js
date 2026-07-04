import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), visualizer({ open: false, filename: 'bundle-analysis.html' })],
  build: {
    rollupOptions: {
      output: {
        // manualChunks only applies to the client bundle; the SSR build
        // (used by scripts/prerender.mjs) keeps deps external.
        ...(isSsrBuild ? {} : {
          manualChunks: {
            'vendor-gsap': ['gsap', '@gsap/react'],
            'vendor-motion': ['framer-motion'],
          }
        })
      }
    },
    chunkSizeWarningLimit: 1000
  }
}))
