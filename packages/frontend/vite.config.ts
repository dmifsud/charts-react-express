import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const API_URL = 'http://localhost:3210'; // TODO: use env variables

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
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@services": path.resolve(__dirname, "./src/services"),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
});
