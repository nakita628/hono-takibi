import { z } from '@hono/zod-openapi'
import { IdSchema, type Id } from './id'
import { GraphEdgeSchema, type GraphEdge } from './graphEdge'
import { EntityRefSchema, type EntityRef } from './entityRef'

type GraphNodeType = { id: Id; edges?: GraphEdge[]; entity?: EntityRef }

export const GraphNodeSchema: z.ZodType<GraphNodeType> = z
  .lazy(() =>
    z
      .object({
        id: IdSchema,
        edges: z.array(GraphEdgeSchema).exactOptional(),
        entity: EntityRefSchema.exactOptional(),
      })
      .openapi({ required: ['id'] }),
  )
  .openapi('GraphNode')

export type GraphNode = z.infer<typeof GraphNodeSchema>
