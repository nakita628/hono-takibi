import { z } from '@hono/zod-openapi'
import { IdSchema } from '../schemas'

export const UserIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'userId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
    examples: {
      uuid: { $ref: '#/components/examples/UserIdUuid' },
      ulid: { $ref: '#/components/examples/UserIdUlid' },
    },
  },
})

export type UserIdPathParamParams = z.infer<typeof UserIdPathParamParamsSchema>
