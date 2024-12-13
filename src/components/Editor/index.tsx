import { ReplContext } from "@/store"
import { useContext } from "react"

import CodeMirror from "./CodeMirror"

const EditorContainer = () => {
  const { state, setState } = useContext(ReplContext)
  const { code = "" } = state

  const onChange = (code: string) => {
    setState({ ...state, code })
  }

  return (
    <div>
      <CodeMirror code={code} onChange={onChange} />
    </div>
  )
}

export default EditorContainer
