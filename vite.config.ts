import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ VERY IMPORTANT FOR PRODUCTION

  server: {
    proxy: {
      '/api': {
        target: 'https://sbookmark-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'https://sbookmark-backend.onrender.com',
        changeOrigin: true,
      }
    }
  }
})