import { useReplStore } from "@/store"

import CodeMirror from "./CodeMirror"

const EditorContainer = () => {
  const { state, onChangeCode } = useReplStore()
  const { code = "" } = state

  return (
    <div>
      <CodeMirror code={code} onChange={onChangeCode} />
    </div>
  )
}

export default EditorContainer
