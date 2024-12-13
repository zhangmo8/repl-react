import type React from "react"
import { useCallback, useEffect, useRef } from "react"

import { useImportMap } from "@/hooks/impormap"
import { transformCode } from "@/hooks/swc"
import logger from "@/utils/logger"
import basicTemplate from "./basic.html?raw"

interface Props {
  value: string
}

const Preview: React.FC<Props> = ({ value }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // function reload() {
  //   iframeRef.current?.contentWindow?.location.reload()
  // }

  async function executeCode() {
    if (!iframeRef.current) {
      logger.warn("iframe element is not yet available")
      return
    }

    try {
      const { transformedCode } = await transformCode(value)
      const iframeDoc = iframeRef.current.contentDocument
      if (!iframeDoc) {
        logger.warn(
          "iframe contentDocument is not available - this might happen if the iframe is not loaded or due to cross-origin restrictions",
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
          <script type="module">${transformedCode}</script>`,
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

  const cleanup = useCallback(() => {
    const iframeDocBody = iframeRef.current?.contentDocument?.body
    if (iframeDocBody) {
      iframeDocBody.innerHTML = ""
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
