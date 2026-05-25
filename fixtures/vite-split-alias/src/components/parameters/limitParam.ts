import { z } from '@hono/zod-openapi'

export const LimitParamParamsSchema = z.coerce
  .number()
  .int().min(1).max(100)
  .default(20)
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', default: 20, minimum: 1, maximum: 100 },
    },
  })

export type LimitParamParams = z.infer<typeof LimitParamParamsSchema>
