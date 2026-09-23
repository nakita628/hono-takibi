import { Context, Effect } from 'effect'
import { format } from 'oxfmt'
import type { FormatConfig } from 'oxfmt'

import { FormatError } from '../error/index.js'

const defaultConfig = {
  printWidth: 100,
  singleQuote: true,
  semi: false,
} as const

export const FormatOptions = Context.Reference<FormatConfig>('hono-takibi/FormatOptions', {
  defaultValue: () => defaultConfig,
})

export function fmt(input: string) {
  return Effect.gen(function* () {
    const config = yield* FormatOptions
    const { code, errors } = yield* Effect.tryPromise({
      try: () => format('<stdin>.ts', input, { ...defaultConfig, ...config }),
      catch: (cause) =>
        new FormatError({ message: cause instanceof Error ? cause.message : String(cause) }),
    })
    if (errors.length > 0) {
      return yield* new FormatError({ message: errors.map((error) => error.message).join('\n') })
    }
    return code
  })
}
