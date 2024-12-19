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

## Basic Usage

```javascript
import { Repl, useReplStore } from '@zhangmo8/repl-react'

const Demo = () => {
  const { state, setState } = useReplStore()
  return (
    <div>
      <Repl />
      <p>Code: {state.code}</p>
    </div>
  )
}
```
