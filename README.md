# repl-react

![NPM dev or peer Dependency Version](https://img.shields.io/npm/dependency-version/%40zhangmo8%2Frepl-react/dev/vite)

A online playground for react, inspired by [vue/repl](https://github.com/vuejs/repl) and [unocss/playground](https://github.com/unocss/unocss/tree/main/packages/playground).

Thanks to the open source of [vue/repl](https://github.com/vuejs/repl) and its maintainers, this project is built to provide a similar experience for react.

# @zhangmo8/repl-react

React REPL as a React component.

### Environment Support

vite v6.0.0+

Make sure your vite version is above 6. If not, there may be wasm errors in the local environment. However, it does not affect the effect after packaging. For details, you can check [here](
https://github.com/vitejs/vite/issues/8427).

## Usage

### 1. Wrap `<Repl />` with `ReplProvider` (recommended)

```tsx
import {
  Repl,
  ReplProvider,
  useReplStore,
} from "@zhangmo8/repl-react"

const Playground = () => (
  <ReplProvider config={{ defaultCode: "import React from 'react'" }}>
    <DemoControl />
    <Repl />
  </ReplProvider>
)

const DemoControl = () => {
  const { state, setState } = useReplStore()
  return (
    <div>
      <button onClick={() => setState({ ...state, showAST: !state.showAST })}>
        Toggle AST panel
      </button>
    </div>
  )
}
```

`ReplProvider` exposes the playground context, so any sibling or ancestor can safely call `useReplStore` to change visibility, code, etc. Use the `config` prop to bootstrap the REPL.

### 2. Use `<Repl autoProvider />` for quick demos

```tsx
import { Repl } from "@zhangmo8/repl-react"

const App = () => <Repl autoProvider theme="dark" />
```

The `autoProvider` flag defaults to `false`. When enabled, `<Repl>` renders its own `ReplProvider` internally so you can drop it straight into a page. **Warning:** because the provider is encapsulated, you cannot call `useReplStore` from outside and must rely on prop/config-driven inputs instead. If you need shared control, stick with an external `ReplProvider`.

### tips

If `<Repl>` is rendered without either `ReplProvider` or `autoProvider`, it throws immediately with an error explaining a provider is required. This guard prevents silent `undefined` context issues.
