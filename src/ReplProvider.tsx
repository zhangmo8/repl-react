import { type FC, type PropsWithChildren, useState } from "react"
import { DEFAULT_REPL_STATE, ReplContext, type ReplState } from "./store"

interface Props extends PropsWithChildren {
  config?: ReplState
}

export const ReplProvider: FC<Props> = ({ children, config = {} }) => {
  const value: ReplState = {
    ...DEFAULT_REPL_STATE,
    ...config,
  }

  const [state, setState] = useState<ReplState>(value)

  return (
    <ReplContext.Provider value={{ state, setState }}>
      {children}
    </ReplContext.Provider>
  )
}
