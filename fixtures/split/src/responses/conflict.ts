import { z } from '@hono/zod-openapi'
import { ProblemDetailsSchema } from '../schemas'
import { TraceIdHeaderHeaderSchema } from '../headers'

export const ConflictResponse = {
  description: 'Conflict',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/problem+json': { schema: ProblemDetailsSchema } },
}
