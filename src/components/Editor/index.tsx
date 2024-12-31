import { useReplStore } from "@/store"
import { useCallback, useMemo, useState } from "react"

import Tabs from "../Tabs"
import CodeMirror from "./CodeMirror"

const EditorContainer = () => {
  const editorTabs = [
    { label: "Root.jsx", value: "root" },
    // { label: "index.css", value: "css" },
    { label: "ImportMap", value: "importMap" },
  ]

  const { state, onChangeCode, onChangeImportMap } = useReplStore()
  const [activeTab, setActiveTab] = useState<string>("root")

  const handleImportMapChange = useCallback(
    (importMapCode: string) => {
      try {
        onChangeImportMap!(importMapCode)
      } catch (error) {
        console.error("Invalid JSON format for import map", error)
      }
    },
    [onChangeImportMap],
  )

  const onCodeMirrorChange = (code: string) => {
    switch (activeTab) {
      case "root":
        onChangeCode(code)
        break

      case "importMap":
        handleImportMapChange(code)
        break

      default:
        break
    }
  }

  const activeFileCode = useMemo(() => {
    switch (activeTab) {
      case "root":
        return state.code || ""
      case "importMap":
        return state.builtinImportMap || ""
      default:
        return ""
    }
  }, [activeTab, state])

  return (
    <div>
      <Tabs tabs={editorTabs} activeTab={activeTab} onChange={setActiveTab} />
      <CodeMirror
        key={activeTab}
        code={activeFileCode}
        onChange={onCodeMirrorChange}
      />
    </div>
  )
}

export default EditorContainer
