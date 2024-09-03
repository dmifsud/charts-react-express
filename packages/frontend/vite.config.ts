import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API_URL = 'http://localhost:3210/'; // TODO: use env variables

// https://vitejs.dev/config/
export default defineConfig({
  // TODO: implement PROD and DEV builds based on environment mode
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
      },
    }
  }
});
