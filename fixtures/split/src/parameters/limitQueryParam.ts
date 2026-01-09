import { z } from '@hono/zod-openapi'

export const LimitQueryParamParamsSchema = z
  .int()
  .min(1)
  .max(200)
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      required: false,
      schema: { type: 'integer', minimum: 1, maximum: 200 },
      example: 50,
    },
  })

export type LimitQueryParamParams = z.infer<typeof LimitQueryParamParamsSchema>
