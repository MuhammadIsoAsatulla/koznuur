import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (process.env.VERCEL === '1') {
    const base = process.env.VITE_API_BASE || loadEnv(mode, process.cwd()).VITE_API_BASE
    if (!base || new URL(base).protocol !== 'https:') {
      throw new Error('Set VITE_API_BASE to the public HTTPS inference API in Vercel project settings.')
    }
  }
  return {
    plugins: [react()],
    server: { port: 5173, host: true },
  }
})
