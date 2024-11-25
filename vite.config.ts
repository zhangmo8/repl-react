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
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "repl-react",
      fileName: (format) => `repl-react.${format}.js`,
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        dir: "build",
        chunkFileNames: "chunks/[name]-[hash].js",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
})
