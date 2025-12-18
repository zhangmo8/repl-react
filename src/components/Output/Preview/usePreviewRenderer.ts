import { useCallback, useEffect, useRef, useState } from "react"

import logger from "@/utils/logger"
import basicTemplate from "./basic.html?raw"
import { useImportMap } from "@/hooks/impormap"

interface Options {
  iframeRef: React.RefObject<HTMLIFrameElement | null>
  code: string
  builtinImportMap: string
}

export const usePreviewRenderer = ({
  iframeRef,
  code,
  builtinImportMap,
}: Options) => {
  const prevImportMapRef = useRef("")
  const [previewError, setPreviewError] = useState<string | null>(null)

  const reloadIframe = useCallback(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.location.reload()
    }
  }, [iframeRef])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type !== "preview-error") return
      const { message, stack, filename, lineno, colno } = event.data.error || {}
      const lines = []
      if (message) lines.push(message)
      if (filename) lines.push(`at ${filename}:${lineno}:${colno}`)
      if (stack) lines.push(stack)
      setPreviewError(lines.join("\n"))
    }

    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  useEffect(() => {
    setPreviewError(null)
    const execute = async () => {
      if (!iframeRef.current) {
        logger.warn("iframe element is not yet available")
        return
      }

      try {
        const iframeDoc = iframeRef.current.contentDocument
        if (!iframeDoc) {
          logger.warn(
            "iframe contentDocument is not available - this might happen if the iframe is not loaded or due to cross-origin restrictions",
          )
          return
        }

        if (!code) {
          iframeDoc.body.innerHTML = ""
          return
        }

        const currentImportMap =
          builtinImportMap || JSON.stringify(useImportMap(), null, 2)
        if (prevImportMapRef.current !== currentImportMap) {
          prevImportMapRef.current = currentImportMap
          reloadIframe()
          await new Promise((resolve) => setTimeout(resolve, 100))
        }

        iframeDoc.open()
        const htmlContent = basicTemplate
          .replace("<!-- IMPORT_MAP -->", currentImportMap)
          .replace(
            "<!--PREVIEW-OPTIONS-PLACEHOLDER-HTML-->",
            `<div id="root"></div>
          <script type="module">${code}</script>`,
          )

        iframeDoc.write(htmlContent)
        iframeDoc.close()
      } catch (error) {
        logger.error("Error in executeCode:", error)
        const iframeDoc = iframeRef.current?.contentDocument
        if (iframeDoc) {
          iframeDoc.body.innerHTML = `<pre style="color: red;">${error}</pre>`
        }
      }
    }

    execute()

    return () => {
      const iframeDocBody = iframeRef.current?.contentDocument?.body
      if (iframeDocBody) {
        iframeDocBody.innerHTML = ""
      }
    }
  }, [builtinImportMap, code, iframeRef, reloadIframe])

  return { previewError }
}
