import { useState } from "react"
import { Repl } from "../Repl"

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  return (
    <>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme {theme}
      </button>
      <Repl theme={theme} />
    </>
  )
}

export default App
