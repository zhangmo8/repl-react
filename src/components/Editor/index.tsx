import { ReplContext } from "@/store"
import { useContext } from "react"

import CodeMirror from "./CodeMirror"

const EditorContainer = () => {
  const { state, onChangeCode } = useContext(ReplContext)
  const { code = "" } = state

  return (
    <div>
      <CodeMirror code={code} onChange={onChangeCode} />
    </div>
  )
}

export default EditorContainer
