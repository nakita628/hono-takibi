import { z } from '@hono/zod-openapi'

export const UserIdParamParamsSchema = z.coerce
  .bigint()
  .pipe(z.int64())
  .openapi({
    param: { name: 'id', in: 'path', required: true, schema: { type: 'integer', format: 'int64' } },
  })

export type UserIdParamParams = z.infer<typeof UserIdParamParamsSchema>
