import { Context, Data, Effect } from 'effect'
import { format } from 'oxfmt'
import type { FormatConfig } from 'oxfmt'

/** oxfmt rejected the source it was handed. */
export class FormatError extends Data.TaggedError('FormatError')<{
  readonly message: string
}> {}

const defaultConfig = {
  printWidth: 100,
  singleQuote: true,
  semi: false,
}

/**
 * The oxfmt options every generated file is formatted with.
 *
 * A `Reference` rather than module state: the default is what a program gets without
 * saying anything, and a config file's `format` block overrides it for that program
 * only — two runs in one process cannot leak options into each other.
 */
export const FormatOptions = Context.Reference<FormatConfig>('hono-takibi/FormatOptions', {
  defaultValue: () => defaultConfig,
})

/** Formats generated TypeScript with the options in scope. */
export function fmt(input: string) {
  return Effect.gen(function* () {
    const config = yield* FormatOptions
    // `tryPromise`, not `promise`: oxfmt is a third-party formatter fed generated
    // source, so a rejection belongs in the error channel. As a defect it would walk
    // past the `orElseSucceed` that keeps a merged app file when the merge will not
    // parse, and past the CLI's `mapError`.
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
