import { useCallback, useEffect, useMemo, useState } from "react"

import CodeMirror from "@/components/Editor/CodeMirror"
import { type OutputCode, transformCode } from "@/hooks/swc"
import { useReplStore } from "@/store"
import Tabs from "@/components/Tabs"

import Preview from "./Preview"
import "./styles.css"

const outputTabs = [
  { label: "Preview", value: "preview" },
  { label: "Compile", value: "compile" },
  { label: "AST", value: "ast" },
]

const Output = () => {
  const { state } = useReplStore()
  const { code = "", builtinImportMap, showAST, showCompile } = state
  const [activeTab, setActiveTab] =
    useState<(typeof outputTabs)[number]["value"]>("preview")

  const [outputCode, setOutputCode] = useState<OutputCode>({
    transformedCode: "",
    compiledCode: "",
    ast: "",
  })
  const [transformError, setTransformError] = useState<string | null>(null)

  const tabs = useMemo(() => {
    return outputTabs.filter((tab) => {
      if (!showAST && tab.value === "ast") return false
      if (!showCompile && tab.value === "compile") return false
      return true
    })
  }, [showAST, showCompile])

  const transformOutput = useCallback(async (code: string) => {
    try {
      const _code = await transformCode(code)
      setOutputCode(_code)
      setTransformError(null)
    } catch (error) {
      const message =
        error instanceof Error ? `${error.name}: ${error.message}` : String(error)
      setTransformError(message)
      setOutputCode({
        transformedCode: "",
        compiledCode: "",
        ast: "",
      })
    }
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (code) transformOutput(code)
  }, [code])

  const previewCode = transformError ? "" : outputCode.transformedCode

  return (
    <div className="repl-output-container">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <div className="repl-output-content">
        <Preview
          builtinImportMap={builtinImportMap}
          code={previewCode}
          errorMessage={transformError || undefined}
          className={`repl-output-panel${activeTab === "preview" ? " repl-output-panel-active" : ""}`}
        />
        <div
          className={`repl-output-panel${activeTab !== "preview" ? " repl-output-panel-active" : ""}`}
        >
          <CodeMirror
            readonly
            code={
              activeTab === "compile"
                ? outputCode?.compiledCode
                : outputCode?.ast
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Output
