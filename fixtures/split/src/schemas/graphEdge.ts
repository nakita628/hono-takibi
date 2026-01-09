import { z } from '@hono/zod-openapi'
import { GraphNodeSchema } from './graphNode'
import { MetaSchema } from './meta'

type GraphEdgeType = {
  to: z.infer<typeof GraphNodeSchema>
  weight?: number
  meta?: z.infer<typeof MetaSchema>
}

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
