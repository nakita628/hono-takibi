import { z } from '@hono/zod-openapi'
import { GraphNodeSchema } from './graphNode'

type GeoGraphType = { nodes: z.infer<typeof GraphNodeSchema>[] }

export const GeoGraphSchema: z.ZodType<GeoGraphType> = z
  .lazy(() => z.object({ nodes: z.array(GraphNodeSchema) }).openapi({ required: ['nodes'] }))
  .openapi('GeoGraph')

export type GeoGraph = z.infer<typeof GeoGraphSchema>
