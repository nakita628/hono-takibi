import { Data } from 'effect'

/**
 * Error thrown when a database operation fails.
 */
export class DatabaseError extends Data.TaggedError('DatabaseError')<{
  readonly message: string
  readonly cause?: unknown
}> {}

/**
 * Error thrown when requested data is not found.
 */
export class DataNotFoundError extends Data.TaggedError('DataNotFoundError')<{
  readonly message: string
}> {}

/**
 * Error thrown when data validation fails.
 */
export class ValidationError extends Data.TaggedError('ValidationError')<{
  readonly message: string
}> {}
