import { z } from '@hono/zod-openapi'
import { GraphNodeSchema, type GraphNode } from './graphNode'

type GeoGraphType = { nodes: GraphNode[] }

export const GeoGraphSchema: z.ZodType<GeoGraphType> = z
  .lazy(() => z.object({ nodes: z.array(GraphNodeSchema) }).openapi({ required: ['nodes'] }))
  .openapi('GeoGraph')

export type GeoGraph = z.infer<typeof GeoGraphSchema>
