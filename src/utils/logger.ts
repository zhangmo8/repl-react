const PREFIX = "React-Repl:"

interface LoggerOptions {
  prefix?: string
}

class Logger {
  private prefix: string

  constructor(options: LoggerOptions = {}) {
    this.prefix = options.prefix || PREFIX
  }

  private formatMessage(message: string): string {
    return `${this.prefix} ${message}`
  }

  log(...args: any[]): void {
    if (args[0] && typeof args[0] === "string") {
      console.log(this.formatMessage(args[0]), ...args.slice(1))
    } else {
      console.log(...args)
    }
  }

  warn(...args: any[]): void {
    if (args[0] && typeof args[0] === "string") {
      console.warn(this.formatMessage(args[0]), ...args.slice(1))
    } else {
      console.warn(...args)
    }
  }

  error(...args: any[]): void {
    if (args[0] && typeof args[0] === "string") {
      console.error(this.formatMessage(args[0]), ...args.slice(1))
    } else {
      console.error(...args)
    }
  }
}

export const logger = new Logger()
export default logger
