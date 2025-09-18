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
  base: "/Portfolio",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
