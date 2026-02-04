import { z } from '@hono/zod-openapi'
import { IdSchema } from '../schemas'
import { UserIdUlidExample, UserIdUuidExample } from '../examples'

export const UserIdPathParamParamsSchema = IdSchema.openapi({
  param: {
    name: 'userId',
    in: 'path',
    required: true,
    schema: { $ref: '#/components/schemas/Id' },
    examples: { uuid: UserIdUuidExample, ulid: UserIdUlidExample },
  },
})

export type UserIdPathParamParams = z.infer<typeof UserIdPathParamParamsSchema>
