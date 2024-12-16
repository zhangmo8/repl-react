import type { Dispatch } from "react"

import Github from "../icons/github"
import Logo from "../icons/logo"
import Moon from "../icons/moon"
import Sun from "../icons/sun"

import Button from "../Button"

import "./styles.css"

const Header = ({
  theme,
  setTheme,
}: {
  theme: "light" | "dark"
  setTheme: Dispatch<"light" | "dark">
}) => {
  return (
    <header className="playground-header">
      <h3 className="playground-header-title">
        <div className="playground-header-logo">
          <Logo />
        </div>
        React Playground
      </h3>

      <div className="playground-header-actions">
        <Button
          onClick={() => window.open("https://github.com/zhangmo8/repl-react")}
        >
          <Github />
        </Button>
        <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <Sun /> : <Moon />}
        </Button>
      </div>
    </header>
  )
}

export default Header
