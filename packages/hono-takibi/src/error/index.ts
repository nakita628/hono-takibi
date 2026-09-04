import { Data } from 'effect'

/**
 * A generator refused the work it was given — an empty section, an output path that
 * does not fit the mode, a document that says nothing to write.
 *
 * Distinct from `PlatformError` (the filesystem said no) and `FormatError` (oxfmt
 * rejected the source): this one is always the caller's input, and the CLI renders
 * its message as-is.
 */
export class GenerateError extends Data.TaggedError('GenerateError')<{
  readonly message: string
}> {}
