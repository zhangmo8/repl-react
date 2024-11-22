import CodeMirror from "./components/CodeMirror"
import SplitPane from "./components/SplitPanel"

import "./repl.css"

export const ReplReact = () => {
  const code = `const App = () => {
  return <div>hello world</div>
}  
`
  return (
    <div className="react-repl">
      <SplitPane left={<CodeMirror value={code} />} right={<div>Right</div>} />
    </div>
  )
}
