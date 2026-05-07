import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Source lives in site/ so the repo root has no index.html (GitHub User Pages was serving that dev file).
export default defineConfig({
  root: path.resolve(__dirname, 'site'),
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
  build: {
    outDir: path.resolve(__dirname, 'docs'),
    emptyOutDir: true,
  },
})
