import { z } from '@hono/zod-openapi'

/**
 * Makes RFC 7807 Problem Details error response.
 */
export const makeProblemDetails = (
  errors: Array<{ path: string; message: string }>,
): { message: string } => {
  const message = errors.map((e) => `${e.path}: ${e.message}`).join(', ')
  return { message }
}

/**
 * Converts Zod errors to a standardized format.
 */
export const makeZodErrors = (error: z.ZodError): Array<{ path: string; message: string }> => {
  return error.errors.map((e) => ({
    path: e.path.join('.'),
    message: e.message,
  }))
}

/**
 * Configures custom error messages.
 */
export const configureCustomErrors = (): void => {
  // Custom error configuration can be added here
}
