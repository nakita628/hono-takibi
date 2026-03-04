import type { z } from '@hono/zod-openapi'

/**
 * Format Zod validation errors into RFC 7807 Problem Details
 * aligned with ValidationErrorSchema ({pointer, detail}).
 * @see https://datatracker.ietf.org/doc/html/rfc7807
 */
export function formatZodErrors(result: { error: z.ZodError }) {
  return {
    type: 'about:blank',
    title: 'Unprocessable Content',
    status: 422,
    detail: 'Request validation failed',
    errors: result.error.issues.map((issue) => ({
      pointer: issue.path.length > 0 ? `/${issue.path.join('/')}` : '/body',
      detail: issue.message,
    })),
  } as const
}
