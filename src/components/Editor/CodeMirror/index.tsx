import { type CompletionSource, autocompletion } from "@codemirror/autocomplete"
import { javascript } from "@codemirror/lang-javascript"
import { EditorState, type Extension } from "@codemirror/state"
import { EditorView, basicSetup } from "codemirror"
import { type FC, useEffect, useLayoutEffect, useRef } from "react"

import { replJSXCompletion } from "./autocompletion"
import { vitesse } from "./theme"

import "./styles.css"

export interface Props {
  code: string
  autoComplete?: CompletionSource[]
  cmExtensions?: Extension[]
  onChange?: (code: string) => void
  readonly?: boolean
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
      override: [replJSXCompletion, ...(props.autoComplete || [])],
    }),
    EditorView.editable.of(!props.readonly),
    EditorState.readOnly.of(props.readonly || false),
    ...(props.cmExtensions || []),
  ]

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useLayoutEffect(() => {
    if (containerRef.current && !editorRef.current) {
      editorRef.current = new EditorView({
        doc: props.code,
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

  useEffect(() => {
    const cur = editorRef.current?.state.doc.toString() || ""
    if (props.code !== cur) {
      editorRef.current?.dispatch({
        changes: {
          from: 0,
          to: cur.length,
          insert: props.code,
        },
      })
    }
  }, [props.code])

  return <div className="editor-container" ref={containerRef} />
}

export default CodeMirror
