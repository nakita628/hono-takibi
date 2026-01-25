/**
 * Error thrown when a database operation fails.
 */
export class DatabaseError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message)
    this.name = 'DatabaseError'
  }
}

/**
 * Error thrown when requested data is not found.
 */
export class DataNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DataNotFoundError'
  }
}

/**
 * Error thrown when data validation fails.
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}
