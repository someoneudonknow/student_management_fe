import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',  // jsdom to simulate browser environment
  },
})
