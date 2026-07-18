import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Site publicado em https://joaomarcos1710.github.io/financeiro/
  base: '/financeiro/',
  plugins: [react()],
})
