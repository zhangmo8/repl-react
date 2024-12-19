import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base: "./",
  publicDir: "./public-preview",
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@swc/wasm-web": "@swc/wasm-web/wasm.js",
    },
  },
  optimizeDeps: {
    exclude: ["@swc/wasm-web"],
    esbuildOptions: {
      supported: {
        "top-level-await": true,
      },
    },
  },
  build: {
    target: "esnext",
    commonjsOptions: {
      ignore: ["typescript"],
    },
    rollupOptions: {
      output: {
        format: "es",
      },
    },
  },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
})
