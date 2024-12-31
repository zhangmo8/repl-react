import { type FC, type PropsWithChildren, useEffect, useState } from "react"
import { useImportMap } from "./hooks/impormap"
import {
  DEFAULT_REPL_STATE,
  ReplContext,
  type ReplProps,
  type ReplState,
} from "./store"
import { debounce, deserialize, serialize } from "./utils"
import logger from "./utils/logger"

const THEME = "data-repl-theme"

interface Props extends PropsWithChildren {
  config?: ReplProps
}

export const ReplProvider: FC<Props> = ({ children, config = {} }) => {
  const value: ReplState = {
    ...DEFAULT_REPL_STATE,
    ...config,
  }

  const [state, setState] = useState<ReplState>(value)

  const onChangeCode = debounce((code: string) => {
    setState((preValue) => {
      history.replaceState(
        {},
        "",
        serialize({ root: code, importMap: preValue.builtinImportMap }),
      )

      return {
        ...preValue,
        code,
      }
    })
  }, 300)

  const onChangeImportMap = debounce((importMap: string) => {
    setState((preValue) => {
      history.replaceState(
        {},
        "",
        serialize({ root: preValue.code, importMap }),
      )

      return {
        ...preValue,
        builtinImportMap: importMap,
      }
    })
  }, 300)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    try {
      const { root: code, importMap } = deserialize(location.hash)

      setState({
        ...state,
        code,
        builtinImportMap: importMap || JSON.stringify(useImportMap(), null, 2),
      })
    } catch (error) {
      logger.error("Hash deserialization error", error)

      setState({
        ...state,
        code: state.defaultCode,
        builtinImportMap: JSON.stringify(useImportMap(), null, 2),
      })
    }
  }, [])

  useEffect(() => {
    if (window.document.documentElement) {
      window.document.documentElement.setAttribute(
        THEME,
        config.theme || "light",
      )
    }
  }, [config.theme])

  return (
    <ReplContext.Provider
      value={{ state, setState, onChangeCode, onChangeImportMap }}
    >
      {children}
    </ReplContext.Provider>
  )
}
