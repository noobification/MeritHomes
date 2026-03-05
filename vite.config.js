import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), visualizer({ open: false, filename: 'bundle-analysis.html' })],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-gsap': ['gsap', '@gsap/react'],
          'vendor-motion': ['framer-motion'],
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
