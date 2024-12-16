import type { Dispatch } from "react"

import "./styles.css"

const Header = ({
  theme,
  setTheme,
}: {
  theme: "light" | "dark"
  setTheme: Dispatch<"light" | "dark">
}) => {
  return (
    <header className="repl-header">
      <h3>React Playground</h3>

      <button
        type="button"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        Toggle Theme {theme}
      </button>
    </header>
  )
}

export default Header
