import initSwc, { transformSync } from "@swc/wasm-web"
import type React from "react"
import { useCallback, useEffect, useRef } from "react"

import { useImportMap } from "@/hooks/impormap"
import basicTemplate from "./basic.html?raw"

interface Props {
  value: string
}

const Preview: React.FC<Props> = ({ value }) => {
  const hasSwcInstance = useRef<boolean>(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // function reload() {
  //   iframeRef.current?.contentWindow?.location.reload()
  // }

  async function swcMount() {
    try {
      // 使用更可靠的方式初始化 SWC
      await initSwc({
        async instantiateWasm(info, receiveInstance) {
          try {
            const response = await fetch(
              "/node_modules/@swc/wasm-web/wasm_bg.wasm",
            )
            const wasmBytes = await response.arrayBuffer()
            return WebAssembly.instantiate(wasmBytes, info).then((instance) => {
              receiveInstance(instance)
              return instance
            })
          } catch (e) {
            console.error("Failed to instantiate WebAssembly:", e)
            throw e
          }
        },
      })
      hasSwcInstance.current = true
      executeCode()
    } catch (error) {
      console.error("React-Repl: Error in load swc:", error)
      if (iframeRef.current?.contentDocument) {
        iframeRef.current.contentDocument.body.innerHTML = `<pre style="color: red;">Failed to initialize SWC: ${error}</pre>`
      }
    }
  }

  function executeCode() {
    if (!iframeRef.current) {
      console.warn("React-Repl: iframe element is not yet available")
      return
    }

    if (!hasSwcInstance.current) {
      console.warn("React-Repl: swc instance is not yet available")
      return
    }

    try {
      const transformed = transformSync(value, {
        jsc: {
          parser: {
            syntax: "ecmascript",
            jsx: true,
          },
          target: "es2016",
          loose: false,
          minify: {
            compress: {
              arguments: false,
              arrows: true,
              booleans: true,
              booleans_as_integers: false,
              collapse_vars: true,
              comparisons: true,
              computed_props: true,
              conditionals: true,
              dead_code: true,
              directives: true,
              drop_console: false,
              drop_debugger: true,
              evaluate: true,
              expression: false,
              hoist_funs: false,
              hoist_props: true,
              hoist_vars: false,
              if_return: true,
              join_vars: true,
              keep_classnames: false,
              keep_fargs: true,
              keep_fnames: false,
              keep_infinity: false,
              loops: true,
              negate_iife: true,
              properties: true,
              reduce_funcs: false,
              reduce_vars: false,
              side_effects: true,
              switches: true,
              typeofs: true,
              unsafe: false,
              unsafe_arrows: false,
              unsafe_comps: false,
              unsafe_Function: false,
              unsafe_math: false,
              unsafe_symbols: false,
              unsafe_methods: false,
              unsafe_proto: false,
              unsafe_regexp: false,
              unsafe_undefined: false,
              unused: true,
              const_to_let: true,
              pristine_globals: true,
            },
            mangle: {
              toplevel: false,
              keep_classnames: false,
              keep_fnames: false,
              keep_private_props: false,
              ie8: false,
              safari10: false,
            },
          },
        },
        module: {
          type: "es6",
        },
        minify: true,
        isModule: true,
      }).code

      const iframeDoc = iframeRef.current.contentDocument
      if (!iframeDoc) {
        console.warn(
          "React-Repl: iframe contentDocument is not available - this might happen if the iframe is not loaded or due to cross-origin restrictions",
        )
        return
      }

      // Reset the iframe content
      iframeDoc.open()
      const htmlContent = basicTemplate
        .replace("<!--IMPORT_MAP-->", JSON.stringify(useImportMap()))
        .replace(
          "<!--PREVIEW-OPTIONS-PLACEHOLDER-HTML-->",
          `<div id="root"></div>
          <script type="module">${transformed}</script>`,
        )

      console.log("htmlContent", htmlContent)

      iframeDoc.write(htmlContent)
      iframeDoc.close()
    } catch (error) {
      console.error("React-Repl: Error in executeCode:", error)
      const iframeDoc = iframeRef.current?.contentDocument
      if (iframeDoc) {
        iframeDoc.body.innerHTML = `<pre style="color: red;">${error}</pre>`
      }
    }
  }

  const cleanup = useCallback(() => {
    const iframeDocBody = iframeRef.current?.contentDocument?.body
    if (iframeDocBody) {
      iframeDocBody.innerHTML = ""
    }
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!hasSwcInstance.current) {
      swcMount()
    }
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    executeCode()

    return cleanup
  }, [value])

  return (
    <iframe
      ref={iframeRef}
      title="preview"
      style={{ width: "100%", height: "100%", border: "none" }}
      sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
    />
  )
}

export default Preview
