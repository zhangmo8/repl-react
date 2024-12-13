import { type FC, type PropsWithChildren, useEffect, useState } from "react"
import { DEFAULT_REPL_STATE, ReplContext, type ReplState } from "./store"
import { deserialize, serialize } from "./utils"

interface Props extends PropsWithChildren {
  config?: ReplState
}

export const ReplProvider: FC<Props> = ({ children, config = {} }) => {
  const value: ReplState = {
    ...DEFAULT_REPL_STATE,
    ...config,
  }

  const [state, setState] = useState<ReplState>(value)

  const onChangeCode = (code: string) => {
    setState({ ...state, code })
    history.replaceState({}, "", serialize(code))
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    try {
      const code = deserialize(location.hash)
      setState({ ...state, code })
    } catch (error) {
      setState({ ...state, code: state.defaultCode })
    }
  }, [])

  return (
    <ReplContext.Provider value={{ state, setState, onChangeCode }}>
      {children}
    </ReplContext.Provider>
  )
}
