import { Data } from 'effect'

export class DatabaseError extends Data.TaggedError('DatabaseError')<{
  readonly message: string
}> {}

export class NotFoundError extends Data.TaggedError('NotFoundError')<{
  readonly message: string
}> {}

export class ContractViolationError extends Data.TaggedError('ContractViolationError')<{
  readonly message: string
}> {}

export class ConflictError extends Data.TaggedError('ConflictError')<{
  readonly message: string
}> {}

export class UnauthorizedError extends Data.TaggedError('UnauthorizedError')<{
  readonly message: string
}> {}
