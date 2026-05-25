import { z } from '@hono/zod-openapi'

export const PageParamParamsSchema = z.coerce
  .number()
  .int().min(1)
  .default(1)
  .exactOptional()
  .openapi({
    param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1, minimum: 1 } },
  })

export type PageParamParams = z.infer<typeof PageParamParamsSchema>
