# repl-react

A online playground for react, inspired by [vue/repl](https://github.com/vuejs/repl) and [unocss/playground](https://github.com/unocss/unocss/tree/main/packages/playground).

Thanks to the open source of [vue/repl](https://github.com/vuejs/repl) and its maintainers, this project is built to provide a similar experience for react.

# @zhangmo8/repl-react

React REPL as a React component.

## Basic Usage

```ts
// vite.config.ts
import { defineConfig } from 'vite'
export default defineConfig({
  optimizeDeps: {
    exclude: ['@zhangmo8/repl-react'],
  },
  // ...
})
```

```javascript
import { Repl } from '@zhangmo8/repl-react'

<Repl />
```
