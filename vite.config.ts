import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    // यहाँ मैंने base वाली लाइन जोड़ दी है ताकि GitHub Pages पर वेबसाइट दिखने लगे
    base: './', 
    
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'], // ज़रूरी एसेट्स
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        },
        manifest: {
          name: 'Vedic Math Calculator',
          short_name: 'VedicCalc',
          description: 'A powerful math calculator for Indian curriculum.',
          theme_color: '#1a202c', // डार्क थीम के हिसाब से बेहतर कलर
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              // यहाँ चेक करें कि फाइल का नाम और फोल्डर सही है
              src: 'icon-512.png', // svg की जगह png अक्सर ज़्यादा बेहतर काम करता है APK के लिए
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
