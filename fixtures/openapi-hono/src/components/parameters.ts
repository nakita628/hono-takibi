import { z } from '@hono/zod-openapi'

export const PageParamParamsSchema = z.coerce
  .number()
  .pipe(z.int())
  .default(1)
  .exactOptional()
  .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } })

export const UserIdParamParamsSchema = z
  .int()
  .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } } })
