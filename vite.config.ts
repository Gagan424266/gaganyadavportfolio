import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Project Pages: set VITE_BASE to "/your-repo-name/" in CI (see .github/workflows/deploy-pages.yml)
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
  build: {
    // GitHub User Pages can reliably publish from main + /docs (see repo Settings → Pages).
    outDir: 'docs',
    emptyOutDir: true,
  },
})
