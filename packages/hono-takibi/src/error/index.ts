import { Data } from 'effect'

export class GenerateError extends Data.TaggedError('GenerateError')<{
  readonly message: string
}> {}

export class FormatError extends Data.TaggedError('FormatError')<{
  readonly message: string
}> {}
