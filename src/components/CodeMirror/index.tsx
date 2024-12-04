import { autocompletion } from "@codemirror/autocomplete"
import { javascript } from "@codemirror/lang-javascript"
import { EditorView, basicSetup } from "codemirror"
import { type FC, useLayoutEffect, useRef } from "react"

import { replJSXCompletion } from "./autocompletion"
import { vitesse } from "./theme"

import "./styles.css"

interface Props {
  value: string
  onChange?: (code: string) => void
}

const CodeMirror: FC<Props> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<EditorView | null>(null)

  const extensions = [
    basicSetup,
    vitesse,
    javascript({
      jsx: true,
    }),
    autocompletion({
      override: [replJSXCompletion],
    }),
  ]

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useLayoutEffect(() => {
    if (containerRef.current && !editorRef.current) {
      editorRef.current = new EditorView({
        doc: props.value,
        extensions,
        parent: containerRef.current,
        dispatch(tr) {
          editorRef.current?.update([tr])
          if (tr.docChanged) {
            props?.onChange?.(editorRef.current?.state.doc.toString() || "")
          }
        },
      })
    }
  }, [])

  return <div className="editor-container" ref={containerRef} />
}

export default CodeMirror
