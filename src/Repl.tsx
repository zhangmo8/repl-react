import type { FC } from "react"

import EditorContainer from "./components/Editor"
import Output from "./components/Output"
import SplitPane from "./components/SplitPanel"

import { ReplProvider } from "./ReplProvider"
import type { ReplProps } from "./store"

import "./repl.css"

export const Repl: FC<ReplProps> = (props) => {
  return (
    <ReplProvider config={props}>
      <main className="react-repl">
        <SplitPane left={<EditorContainer />} right={<Output />} />
      </main>
    </ReplProvider>
  )
}
