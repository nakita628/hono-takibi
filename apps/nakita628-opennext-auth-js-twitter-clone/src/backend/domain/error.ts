import { Data } from 'effect'

/** Raised when a database operation fails (connection, query, constraint). */
export class DatabaseError extends Data.TaggedError('DatabaseError')<{
  readonly message: string
}> {}

/** Raised when a requested resource does not exist. */
export class NotFoundError extends Data.TaggedError('NotFoundError')<{
  readonly message: string
}> {}

/** Raised when output data fails schema validation. */
export class ValidationError extends Data.TaggedError('ValidationError')<{
  readonly message: string
}> {}

/** Raised when a unique constraint is violated (e.g. duplicate email). */
export class ConflictError extends Data.TaggedError('ConflictError')<{
  readonly message: string
}> {}

/** Raised when a request lacks valid authentication credentials. */
export class UnauthorizedError extends Data.TaggedError('UnauthorizedError')<{
  readonly message: string
}> {}
