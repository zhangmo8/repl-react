import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    exclude: ["typescript", "@swc/wasm-web"],
  },
  server: {
    headers: {
      "*.wasm": ["application/wasm"],
    },
  },
  build: {
    outDir: "build",
    target: "esnext",
    lib: {
      entry: {
        "repl-react": "./src/index.ts",
        "codemirror-editor": "./src/components/Editor/index.tsx",
      },
      formats: ["es"],
      fileName: () => "[name].js",
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ["react", "react-dom", "codemirror", "@swc/wasm-web"],
      output: {
        chunkFileNames: "chunks/[name]-[hash].js",
      },
    },
  },
})
