import type { z } from '@hono/zod-openapi'
import { CursorSchema } from '../schemas'

export const CursorQueryParamParamsSchema = CursorSchema.exactOptional().openapi({
  param: {
    name: 'cursor',
    in: 'query',
    required: false,
    schema: { $ref: '#/components/schemas/Cursor' },
  },
})

export type CursorQueryParamParams = z.infer<typeof CursorQueryParamParamsSchema>
