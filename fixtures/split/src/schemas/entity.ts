import { z } from '@hono/zod-openapi'
import { IdSchema, type Id } from './id'
import { MetaSchema, type Meta } from './meta'

type EntityType = { id: Id; meta: Meta }

export const EntitySchema: z.ZodType<EntityType> = z
  .object({ id: IdSchema, meta: MetaSchema })
  .openapi({ required: ['id', 'meta'] })
  .openapi('Entity')

export type Entity = z.infer<typeof EntitySchema>
