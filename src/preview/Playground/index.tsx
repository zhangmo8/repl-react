import { useState } from "react"
import { Repl } from "../../Repl"
import Header from "../Header"
import "./styles.css"

function Playground() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Repl theme={theme} />
    </>
  )
}

export default Playground
