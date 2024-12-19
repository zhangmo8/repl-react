import fs from "node:fs"
import path, { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { type Plugin, mergeConfig } from "vite"
import dts from "vite-plugin-dts"

import baseConfig from "./vite.preview.config"

/**
 * Patch generated entries and import their corresponding CSS files.
 */
const patchCssFiles: Plugin = {
  name: "patch-css",
  apply: "build",
  writeBundle() {
    //  inject css imports to the files
    const outDir = path.resolve("build")
    ;["repl-react", "codemirror-editor"].forEach((file) => {
      const filePath = path.resolve(outDir, `${file}.js`)
      const content = fs.readFileSync(filePath, "utf-8")
      fs.writeFileSync(filePath, `import './${file}.css'\n${content}`)
    })
  },
}

// https://vite.dev/config/
export default mergeConfig(baseConfig, {
  plugins: [
    react(),
    dts({
      rollupTypes: true,
      insertTypesEntry: true,
      entryRoot: "src",
      exclude: ["**/*.test.ts", "**/*.test.tsx"],
    }),
    patchCssFiles,
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    exclude: ["typescript"],
  },
  server: {
    headers: {
      "*.wasm": ["application/wasm"],
    },
  },
  build: {
    outDir: "build",
    target: "esnext",
    minify: false,
    lib: {
      entry: {
        "repl-react": "./src/index.ts",
        "codemirror-editor": "./src/components/Editor/CodeMirror/index.tsx",
      },
      formats: ["es"],
      fileName: () => "[name].js",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        chunkFileNames: "chunks/[name]-[hash].js",
      },
    },
  },
})
