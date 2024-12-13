import type { CompletionSource } from "@codemirror/autocomplete"

export const replJSXCompletion: CompletionSource = (context) => {
  const word = context.matchBefore(/\w*/)
  if (!word) return null
  if (word.from === word.to && !context.explicit) return null

  const reactCompletions = [
    { label: "useState", type: "function", info: "React Hook" },
    { label: "useEffect", type: "function", info: "React Hook" },
    { label: "useRef", type: "function", info: "React Hook" },
    { label: "useCallback", type: "function", info: "React Hook" },
    { label: "useMemo", type: "function", info: "React Hook" },
    { label: "useContext", type: "function", info: "React Hook" },
    { label: "div", type: "tag", info: "HTML element" },
    { label: "span", type: "tag", info: "HTML element" },
    { label: "p", type: "tag", info: "HTML element" },
    { label: "button", type: "tag", info: "HTML element" },
    { label: "input", type: "tag", info: "HTML element" },
    { label: "form", type: "tag", info: "HTML element" },
  ]

  return {
    from: word.from,
    options: reactCompletions,
  }
}
