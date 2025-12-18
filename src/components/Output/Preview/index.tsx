import type React from "react"
import { useEffect, useRef, useState } from "react"

import "./styles.css"
import { usePreviewRenderer } from "./usePreviewRenderer"

interface Props {
  className?: string
  code: string
  builtinImportMap: string
  errorMessage?: string
}

const Preview: React.FC<Props> = ({
  code,
  className,
  builtinImportMap,
  errorMessage,
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const { previewError } = usePreviewRenderer({ iframeRef, code, builtinImportMap })
  const displayError = errorMessage || previewError
  const [errorVisible, setErrorVisible] = useState(true)

  useEffect(() => {
    if (displayError) {
      setErrorVisible(true)
    }
  }, [displayError])

  const showError = Boolean(displayError) && errorVisible

  const handleCloseError = () => {
    setErrorVisible(false)
  }

  return (
    <div className={`react-repl-iframe-container ${className}`}>
      <iframe
        ref={iframeRef}
        title="preview"
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
      />
      {showError && (
        <div className="react-repl-iframe-error">
          <pre>{displayError}</pre>
          <button
            type="button"
            className="react-repl-iframe-error-close"
            onClick={handleCloseError}
            aria-label="Dismiss preview error"
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}

export default Preview
