import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsConfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },

  plugins: [tsConfigPaths(), react(), tailwindcss()],
})
