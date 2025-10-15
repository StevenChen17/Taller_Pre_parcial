// C:\Users\Steven Chen\OneDrive\桌面\Taller_Pre_Parcial\frontend\vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Configuración del proxy para redirigir peticiones /api a tu servidor Express
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // El puerto de tu Express
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), 
      },
    },
    port: 5173,
  },
});