/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Root-relative. Correct for localhost, for a Cloudflare *.pages.dev preview,
  // and for the production domain. Only a GitHub Pages *project* site would
  // need a subpath here.
  base: '/',
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
