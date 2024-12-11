import CodeMirror from "./components/CodeMirror"
import Preview from "./components/Preview"
import SplitPane from "./components/SplitPanel"

import Hello from "./template/hello?raw"

import "./repl.css"
import { useState } from "react"

export const ReplReact = () => {
  const [code, setCode] = useState(Hello)

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
  }

  return (
    <main className="react-repl">
      <SplitPane
        left={<CodeMirror value={code} onChange={handleCodeChange} />}
        right={<Preview value={code} />}
      />
    </main>
  )
}
