import CodeMirror from "./components/CodeMirror"
import Preview from "./components/Preview"
import SplitPane from "./components/SplitPanel"

import Hello from "./template/hello?raw"

import "./repl.css"
import { useState } from "react"

export const ReplReact = () => {
  const [code, setCode] = useState(Hello)

  const handleCodeChange = (newCode: string) => {
    console.log("qwefqwe")

    setCode(newCode)
  }

  return (
    <div className="react-repl">
      <SplitPane
        left={<CodeMirror value={code} onChange={handleCodeChange} />}
        right={<Preview value={code} />}
      />
    </div>
  )
}
