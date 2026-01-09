import { z } from '@hono/zod-openapi'
import { IdSchema } from './id'
import { MetaSchema } from './meta'

type EntityType = { id: z.infer<typeof IdSchema>; meta: z.infer<typeof MetaSchema> }

export const EntitySchema: z.ZodType<EntityType> = z
  .object({ id: IdSchema, meta: MetaSchema })
  .openapi({ required: ['id', 'meta'] })
  .openapi('Entity')

export type Entity = z.infer<typeof EntitySchema>
