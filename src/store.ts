import template from "@/template/hello.tsx?raw"
import type { CompletionSource } from "@codemirror/autocomplete"
import type { Extension } from "@codemirror/state"
import { type Dispatch, createContext, useContext } from "react"

export interface ReplState {
  /**
   * The code displayed when it is passed in as a prop
   */
  defaultCode?: string

  /**
   * The code
   */
  code?: string

  /**
   * Importmap you need to inject
   */
  builtinImportMap?: Record<string, string>

  /**
   * Whether the code is loading
   */
  // loading?: boolean

  /**
   * Show the compiled panel. It will be show the compiled code
   * @default true
   */
  showCompile?: boolean

  /**
   * Show the ast panel. It will be show the ast tree.
   * @default true
   */
  showAST?: boolean

  /**
   * Show the compiled import map. It will be show your import map
   * @default true
   */
  showImportMap?: boolean

  /**
   * Show the error information.
   * @default true
   */
  // showError?: boolean

  /**
   * Some options if you need custom codeMirror
   */
  codeMirrorOptions?: {
    extensions?: Extension[]
    autoComplete?: CompletionSource[]
  }

  previewOptions?: {
    headHTML?: string
    bodyHTML?: string
    placeholderHTML?: string
    customCode?: {
      importCode?: string
      useCode?: string
    }
  }
}

export const DEFAULT_REPL_STATE: ReplState = {
  showCompile: true,
  showAST: true,
  showImportMap: true,
  defaultCode: template,
}

export const ReplContext = createContext<{
  state: ReplState
  setState: Dispatch<ReplState>
}>({
  state: DEFAULT_REPL_STATE,
  setState: () => {},
})

export const useReplStore = () => {
  const context = useContext(ReplContext)
  if (!context) {
    throw new Error("useReplStore must be used within a ReplProvider")
  }
  return context
}
