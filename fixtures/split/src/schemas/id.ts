import { z } from '@hono/zod-openapi'
import { UuidSchema } from './uuid'
import { UlidSchema } from './ulid'

type IdType = z.infer<typeof UuidSchema> | z.infer<typeof UlidSchema>

export const IdSchema: z.ZodType<IdType> = z
  .xor([UuidSchema, UlidSchema])
  .openapi({ description: 'Primary identifier (uuid or ulid) - used everywhere' })
  .openapi('Id')

export type Id = z.infer<typeof IdSchema>
