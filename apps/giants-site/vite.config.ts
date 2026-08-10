import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'plugin-inspect-react-code'

// https://vite.dev/config/
export default defineConfig({
  // Absolute base so hashed assets resolve on deep routes (e.g. /podcast/123)
  // when loaded or refreshed directly — a relative './' base makes the browser
  // request /podcast/assets/... which the SPA rewrite serves as HTML, blanking
  // the page. Site is served at the domain root, so '/' is correct.
  base: '/',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
