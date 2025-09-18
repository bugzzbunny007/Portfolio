// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Import the new Vite plugin
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // Add the Vite plugin
  ],
  base: process.env.VITE_BASE_PATH || "/Portfolio/", // Use environment variable or default to "/Portfolio/"
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
