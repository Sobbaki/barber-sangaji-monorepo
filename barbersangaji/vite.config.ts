import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    TanStackRouterVite()
  ],
  // Mengatur base ke '/' memastikan Vercel mencari aset (JS/CSS) 
  // langsung di root directory, bukan di sub-folder /sangaji/
  base: '/',
})