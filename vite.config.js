import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-gsap': ['gsap', '@gsap/react'],
          'vendor-spline': ['@splinetool/react-spline', '@splinetool/runtime'],
          'vendor-motion': ['framer-motion'],
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
