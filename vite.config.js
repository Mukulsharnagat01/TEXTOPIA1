import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  envPrefix: ['VITE_', 'REACT_APP_'],
  build: {
    chunkSizeWarningLimit: 1000, // Increase from 500 to 1000 kB
  }
})
