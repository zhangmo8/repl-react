import { useState } from "react"
import { Repl } from "../../Repl"
import Header from "../Header"
import "./styles.css"

function Playground() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Repl autoProvider theme={theme} />
    </>
  )
}

export default Playground
