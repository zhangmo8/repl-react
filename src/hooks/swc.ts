import logger from "@/utils/logger"
import * as swc from "@swc/wasm-web"
import type { Options } from "@swc/wasm-web"

const SWC_COMPILER_CONFIG: Options = {
  jsc: {
    parser: {
      syntax: "ecmascript",
      jsx: true,
    },
    target: "es2016",
    loose: false,
    minify: {
      compress: false,
      mangle: false,
    },
  },
  module: {
    type: "es6",
  },
  minify: false,
  isModule: true,
}

const SWC_PREVIEW_CONFIG: Options = {
  jsc: {
    parser: {
      syntax: "ecmascript",
      jsx: true,
    },
    target: "es5",
    loose: false,
    minify: {
      compress: {
        arguments: false,
        arrows: true,
        booleans: true,
        booleans_as_integers: false,
        collapse_vars: true,
        comparisons: true,
        computed_props: true,
        conditionals: true,
        dead_code: true,
        directives: true,
        drop_console: false,
        drop_debugger: true,
        evaluate: true,
        expression: false,
        hoist_funs: false,
        hoist_props: true,
        hoist_vars: false,
        if_return: true,
        join_vars: true,
        keep_classnames: false,
        keep_fargs: true,
        keep_fnames: false,
        keep_infinity: false,
        loops: true,
        negate_iife: true,
        properties: true,
        reduce_funcs: false,
        reduce_vars: false,
        side_effects: true,
        switches: true,
        typeofs: true,
        unsafe: false,
        unsafe_arrows: false,
        unsafe_comps: false,
        unsafe_math: false,
        unsafe_symbols: false,
        unsafe_methods: false,
        unsafe_proto: false,
        unsafe_regexp: false,
        unsafe_undefined: false,
        unused: true,
      },
      mangle: {
        toplevel: false,
        keep_classnames: false,
        keep_fnames: false,
        keep_private_props: false,
        ie8: false,
        safari10: false,
      },
    },
  },
  module: {
    type: "es6",
  },
  minify: true,
  isModule: true,
}

let swcInstance: typeof swc | null = null

export async function initSwc() {
  if (!swcInstance) {
    try {
      if (!swcInstance) {
        await swc.default()
        swcInstance = swc
        logger.log("SWC initialized successfully")
      }
    } catch (error) {
      logger.error("Failed to initialize SWC:", error)
      throw error
    }
  }
  return swcInstance
}

export async function transformCode(
  code: string,
): Promise<{ transformedCode: string; compiledCode: string }> {
  try {
    const instance = await initSwc()
    if (!instance) {
      throw new Error("SWC instance not initialized")
    }

    const res = await Promise.all([
      instance.transform(code, SWC_PREVIEW_CONFIG),
      instance.transform(code, SWC_COMPILER_CONFIG),
    ])

    return {
      transformedCode: res[0].code,
      compiledCode: res[1].code,
    }
  } catch (error) {
    logger.error("Transform error:", error)
    throw error
  }
}

export async function parse(code: string) {
  try {
    const instance = await initSwc()
    if (!instance) {
      throw new Error("SWC instance not initialized")
    }

    const AST = instance.parseSync(code, {
      syntax: "ecmascript",
      jsx: true,
      target: "es2016",
    })

    return AST
  } catch (error) {
    logger.error("Parse error:", error)
    throw error
  }
}
