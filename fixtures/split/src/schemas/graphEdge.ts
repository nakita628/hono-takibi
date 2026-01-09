import { z } from '@hono/zod-openapi'
import { GraphNodeSchema, type GraphNode } from './graphNode'
import { MetaSchema, type Meta } from './meta'

type GraphEdgeType = { to: GraphNode; weight?: number; meta?: Meta }

export const GraphEdgeSchema: z.ZodType<GraphEdgeType> = z
  .lazy(() =>
    z
      .object({
        to: GraphNodeSchema,
        weight: z.number().exactOptional(),
        meta: MetaSchema.exactOptional(),
      })
      .openapi({ required: ['to'] }),
  )
  .openapi('GraphEdge')

export type GraphEdge = z.infer<typeof GraphEdgeSchema>
