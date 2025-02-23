import { createRoute, z } from '@hono/zod-openapi'

const ErrorSchema = z.object({ message: z.string() }).openapi('Error')

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

const PositionSchema = z.array(z.number()).min(2).max(3).openapi('Position')

const LinearRingSchema = z.array(PositionSchema).min(4).openapi('LinearRing')

const MultiPolygonSchema = z
  .intersection(
    GeometryElementSchema,
    z.object({ coordinates: z.array(z.array(LinearRingSchema)) }),
  )
  .openapi('MultiPolygon')

const PolygonSchema = z
  .intersection(GeometryElementSchema, z.object({ coordinates: z.array(LinearRingSchema) }))
  .openapi('Polygon')

const PointSchema = z
  .intersection(
    GeometryElementSchema,
    z.object({ type: z.enum(['Point']), coordinates: PositionSchema }),
  )
  .openapi('Point')

const ProjectSchema = z
  .object({
    id: z.string().uuid(),
    polygon: z.union([MultiPolygonSchema, PolygonSchema]).optional(),
    centre: PointSchema.optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .openapi('Project')

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

const LineStringCoordinatesSchema = z.array(PositionSchema).min(2).openapi('LineStringCoordinates')

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

const GeometryCollectionSchema = z
  .intersection(GeometrySchema, z.object({ geometries: z.array(GeometryElementSchema) }))
  .openapi('GeometryCollection')

export const getRoute = createRoute({
  tags: ['Utility'],
  method: 'get',
  path: '/',
  summary: 'Ping endpoint',
  description: 'This endpoint is used to check if the server is working properly.',
  responses: {
    200: {
      description: 'If successful, returns a message',
      content: {
        'application/json': {
          schema: z.object({ message: z.string().openapi({ example: 'Pong' }) }),
        },
      },
    },
  },
})

export const getProjectsRoute = createRoute({
  tags: ['Projects'],
  method: 'get',
  path: '/projects',
  summary: 'Get projects related to a given chiban',
  description: 'Get projects related to a given chiban',
  request: { query: z.object({ chiban: z.string() }) },
  responses: {
    200: {
      description: 'If successful, returns a list of project information',
      content: { 'application/json': { schema: z.array(ProjectSchema) } },
    },
    400: {
      description: 'Invalid request',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    500: { description: 'Server error', content: { 'application/json': { schema: ErrorSchema } } },
  },
})
