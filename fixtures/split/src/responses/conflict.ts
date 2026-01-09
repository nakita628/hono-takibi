import { z } from '@hono/zod-openapi'
import { TraceIdHeaderHeaderSchema } from '../headers'
import { ProblemDetailsSchema } from '../schemas'

export const ConflictResponse = {
  description: 'Conflict',
  headers: z.object({ 'x-trace-id': TraceIdHeaderHeaderSchema }),
  content: { 'application/problem+json': { schema: ProblemDetailsSchema } },
}
