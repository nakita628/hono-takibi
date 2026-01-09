import { z } from '@hono/zod-openapi'
import { GeoGraphSchema } from './geoGraph'

type GeoPointType = { lat: number; lng: number; graph?: z.infer<typeof GeoGraphSchema> }

export const GeoPointSchema: z.ZodType<GeoPointType> = z
  .lazy(() =>
    z
      .object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
        graph: GeoGraphSchema.exactOptional(),
      })
      .openapi({ required: ['lat', 'lng'] }),
  )
  .openapi('GeoPoint')

export type GeoPoint = z.infer<typeof GeoPointSchema>
