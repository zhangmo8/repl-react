import type { FC } from "react"
import { useContext } from "react"

import EditorContainer from "./components/Editor"
import Output from "./components/Output"
import SplitPane from "./components/SplitPanel"

import { ReplProvider } from "./ReplProvider"
import { ReplContext } from "./store"
import type { ReplProps } from "./store"

import "./repl.css"

interface Props extends ReplProps {
  /**
   * 如果为 true，Repl 自行包裹 ReplProvider 并自动提供 store
   * @default false
   */
  autoProvider?: boolean
}

const ReplContent: FC = () => {
  const context = useContext(ReplContext)
  if (!context) {
    throw new Error(
      "Repl must be wrapped with ReplProvider or enable autoProvider to provide the store.",
    )
  }

  return (
    <main className="react-repl">
      <SplitPane left={<EditorContainer />} right={<Output />} />
    </main>
  )
}

export const Repl: FC<Props> = ({ autoProvider = false, ...config }) => {
  if (autoProvider) {
    return (
      <ReplProvider config={config}>
        <ReplContent />
      </ReplProvider>
    )
  }

  return <ReplContent />
}
