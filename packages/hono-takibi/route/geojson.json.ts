import { createRoute, z } from '@hono/zod-openapi'

const GeoJsonObjectSchema = z
  .object({
    type: z.enum([
      'Feature',
      'FeatureCollection',
      'Point',
      'MultiPoint',
      'LineString',
      'MultiLineString',
      'Polygon',
      'MultiPolygon',
      'GeometryCollection',
    ]),
    bbox: z.array(z.number()).optional(),
  })
  .openapi('GeoJsonObject')

const GeometrySchema = z
  .intersection(
    GeoJsonObjectSchema,
    z.object({
      type: z.enum([
        'Point',
        'MultiPoint',
        'LineString',
        'MultiLineString',
        'Polygon',
        'MultiPolygon',
        'GeometryCollection',
      ]),
    }),
  )
  .openapi('Geometry')

const GeometryElementSchema = z
  .intersection(
    GeometrySchema,
    z.object({
      type: z.enum([
        'Point',
        'MultiPoint',
        'LineString',
        'MultiLineString',
        'Polygon',
        'MultiPolygon',
      ]),
    }),
  )
  .openapi('GeometryElement')

const FeatureSchema = z
  .intersection(
    GeoJsonObjectSchema,
    z.object({
      geometry: GeometrySchema.nullable(),
      properties: z.object({}),
      id: z.union([z.number(), z.string()]).optional(),
    }),
  )
  .openapi('Feature')

const FeatureCollectionSchema = z
  .intersection(GeoJsonObjectSchema, z.object({ features: z.array(FeatureSchema) }))
  .openapi('FeatureCollection')

const PositionSchema = z.array(z.number()).min(2).max(3).openapi('Position')

const LineStringCoordinatesSchema = z.array(PositionSchema).min(2).openapi('LineStringCoordinates')

const LinearRingSchema = z.array(PositionSchema).min(4).openapi('LinearRing')

const PointSchema = z
  .intersection(
    GeometryElementSchema,
    z.object({ type: z.enum(['Point']), coordinates: PositionSchema }),
  )
  .openapi('Point')

const MultiPointSchema = z
  .intersection(GeometryElementSchema, z.object({ coordinates: z.array(PositionSchema) }))
  .openapi('MultiPoint')

const LineStringSchema = z
  .intersection(GeometryElementSchema, z.object({ coordinates: LineStringCoordinatesSchema }))
  .openapi('LineString')

const MultiLineStringSchema = z
  .intersection(
    GeometryElementSchema,
    z.object({ coordinates: z.array(LineStringCoordinatesSchema) }),
  )
  .openapi('MultiLineString')

const PolygonSchema = z
  .intersection(GeometryElementSchema, z.object({ coordinates: z.array(LinearRingSchema) }))
  .openapi('Polygon')

const MultiPolygonSchema = z
  .intersection(
    GeometryElementSchema,
    z.object({ coordinates: z.array(z.array(LinearRingSchema)) }),
  )
  .openapi('MultiPolygon')

const GeometryCollectionSchema = z
  .intersection(GeometrySchema, z.object({ geometries: z.array(GeometryElementSchema) }))
  .openapi('GeometryCollection')

export const getGeometryRoute = createRoute({
  method: 'get',
  path: '/geometry',
  summary: 'Get an array of GeoJSON Geometry objects',
  responses: {
    200: {
      description: 'Successful response',
      content: { 'application/json': { schema: z.array(GeometryCollectionSchema) } },
    },
    400: { description: '' },
    401: { description: '' },
    500: { description: '' },
  },
})

export const postGeometryRoute = createRoute({
  method: 'post',
  path: '/geometry',
  summary: 'Create new GeoJSON Geometry object',
  request: {
    body: { required: true, content: { 'application/json': { schema: GeometrySchema } } },
  },
  responses: {
    201: { description: 'New GeoJSON Geometry object created' },
    400: { description: '' },
    401: { description: '' },
    403: { description: '' },
    500: { description: '' },
  },
})
