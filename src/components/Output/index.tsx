import { useContext, useMemo, useState } from "react"
import Preview from "./Preview"

import { ReplContext } from "@/store"
import "./styles.css"

const outputTabs = [
  { label: "Preview", value: "preview" },
  { label: "Compile", value: "compile" },
  { label: "AST", value: "ast" },
]

const Output = () => {
  const { state } = useContext(ReplContext)
  const { defaultCode = "", code = "", showAST, showCompile } = state
  const [activeTab, setActiveTab] =
    useState<(typeof outputTabs)[number]["value"]>("preview")

  const tabs = useMemo(() => {
    return outputTabs.filter((tab) => {
      if (!showAST && tab.value === "ast") return false
      if (!showCompile && tab.value === "compile") return false
      return true
    })
  }, [showAST, showCompile])

  return (
    <div className="repl-output-container">
      <div className="repl-output-tabs">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.value}
            className={`repl-tab-button ${activeTab === tab.value && "active"}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="repl-output-content">
        <Preview
          code={code || defaultCode}
          className={`repl-output-panel ${activeTab === "preview" && "repl-output-panel-active"}`}
        />
        <div
          className={`repl-output-panel ${activeTab === "compile" && "repl-output-panel-active"}`}
        >
          Compile output coming soon
        </div>
        <div
          className={`repl-output-panel ${activeTab === "ast" && "repl-output-panel-active"}`}
        >
          AST output coming soon
        </div>
      </div>
    </div>
  )
}

export default Output
