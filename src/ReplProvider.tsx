import { type FC, type PropsWithChildren, useEffect, useState } from "react"
import { DEFAULT_REPL_STATE, ReplContext, type ReplState } from "./store"
import { debounce, deserialize, serialize } from "./utils"

const THEME = "data-repl-theme"

interface Props extends PropsWithChildren {
  config?: ReplState
}

export const ReplProvider: FC<Props> = ({ children, config = {} }) => {
  const value: ReplState = {
    ...DEFAULT_REPL_STATE,
    ...config,
  }

  const [state, setState] = useState<ReplState>(value)

  const onChangeCode = debounce((code: string) => {
    setState({ ...state, code })
    history.replaceState({}, "", serialize(code))
  }, 300)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    try {
      const code = deserialize(location.hash)
      setState({ ...state, code })
    } catch (error) {
      setState({ ...state, code: state.defaultCode })
    }
  }, [])

  useEffect(() => {
    if (window.document.documentElement) {
      window.document.documentElement.setAttribute(
        THEME,
        state.theme || "light",
      )
    }
  }, [state.theme])

  useEffect(() => {
    const value: ReplState = {
      ...state,
      ...config,
    }

    setState(value)
  }, [config])

  return (
    <ReplContext.Provider value={{ state, setState, onChangeCode }}>
      {children}
    </ReplContext.Provider>
  )
}
