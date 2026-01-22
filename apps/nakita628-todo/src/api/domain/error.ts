/**
 * Error thrown when a database operation fails.
 *
 * ```mermaid
 * classDiagram
 *   Error <|-- DatabaseError
 *   Error <|-- DataNotFoundError
 *   Error <|-- ValidationError
 *   class DatabaseError {
 *     +string message
 *     +unknown cause
 *   }
 *   class DataNotFoundError {
 *     +string message
 *   }
 *   class ValidationError {
 *     +string message
 *   }
 * ```
 *
 * @remarks
 * This error wraps underlying database errors and provides
 * a consistent interface for error handling.
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
 *
 * @remarks
 * This error is typically used when a query returns no results
 * for a specific identifier.
 */
export class DataNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'DataNotFoundError'
  }
}

/**
 * Error thrown when data validation fails.
 *
 * @remarks
 * This error indicates that data retrieved from the database
 * does not match the expected schema.
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}
