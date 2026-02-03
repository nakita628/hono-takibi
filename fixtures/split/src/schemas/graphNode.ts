import { z } from '@hono/zod-openapi'
import { IdSchema } from './id'
import { GraphEdgeSchema } from './graphEdge'
import { EntityRefSchema } from './entityRef'

type GraphNodeType = {
  id: z.infer<typeof IdSchema>
  edges?: z.infer<typeof GraphEdgeSchema>[]
  entity?: z.infer<typeof EntityRefSchema>
}

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
