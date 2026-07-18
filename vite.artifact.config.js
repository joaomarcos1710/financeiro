import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Build config used only to generate a self-contained single-file preview
// for sharing outside this environment. Not used for real deployment.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-artifact',
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
  },
})
