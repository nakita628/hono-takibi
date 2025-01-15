import { createRoute, z } from '@hono/zod-openapi'

const errorSchema = z.object({ message: z.string() }).openapi('Error')

const geoJsonObjectSchema = z
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

const geometrySchema = z
  .intersection(
    geoJsonObjectSchema,
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

const geometryElementSchema = z
  .intersection(
    geometrySchema,
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

const positionSchema = z.array(z.number()).openapi('Position')

const linearRingSchema = z.array(positionSchema).openapi('LinearRing')

const multiPolygonSchema = z
  .intersection(
    geometryElementSchema,
    z.object({ coordinates: z.array(z.array(linearRingSchema)) }),
  )
  .openapi('MultiPolygon')

const polygonSchema = z
  .intersection(geometryElementSchema, z.object({ coordinates: z.array(linearRingSchema) }))
  .openapi('Polygon')

const pointSchema = z
  .intersection(
    geometryElementSchema,
    z.object({ type: z.enum(['Point']), coordinates: positionSchema }),
  )
  .openapi('Point')

const projectSchema = z
  .object({
    id: z.string().uuid(),
    polygon: z.union([multiPolygonSchema, polygonSchema]).optional(),
    centre: pointSchema.optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .openapi('Project')

const featureSchema = z
  .intersection(
    geoJsonObjectSchema,
    z.object({
      geometry: geometrySchema.nullable(),
      properties: z.object({}),
      id: z.union([z.number(), z.string()]).optional(),
    }),
  )
  .openapi('Feature')

const featureCollectionSchema = z
  .intersection(geoJsonObjectSchema, z.object({ features: z.array(featureSchema) }))
  .openapi('FeatureCollection')

const lineStringCoordinatesSchema = z.array(positionSchema).openapi('LineStringCoordinates')

const multiPointSchema = z
  .intersection(geometryElementSchema, z.object({ coordinates: z.array(positionSchema) }))
  .openapi('MultiPoint')

const lineStringSchema = z
  .intersection(geometryElementSchema, z.object({ coordinates: lineStringCoordinatesSchema }))
  .openapi('LineString')

const multiLineStringSchema = z
  .intersection(
    geometryElementSchema,
    z.object({ coordinates: z.array(lineStringCoordinatesSchema) }),
  )
  .openapi('MultiLineString')

const geometryCollectionSchema = z
  .intersection(geometrySchema, z.object({ geometries: z.array(geometryElementSchema) }))
  .openapi('GeometryCollection')

export const getRoute = createRoute({
  tags: ['Utility'],
  method: 'get',
  path: '/',
  summary: 'Ping endpoint',
  description: 'This endpoint is used to check if the server is working.',
  responses: {
    200: {
      description: 'Success, return message',
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
  summary: 'Get the site associated with a given lot number',
  description: 'Update the content of an existing post identified by its unique ID.',
  request: { query: z.object({ chiban: z.string() }) },
  responses: {
    200: {
      description: 'Success, return list of projects',
      content: { 'application/json': { schema: z.array(projectSchema) } },
    },
    400: {
      description: 'Invalid request',
      content: { 'application/json': { schema: errorSchema } },
    },
    500: { description: 'Server error', content: { 'application/json': { schema: errorSchema } } },
  },
})
