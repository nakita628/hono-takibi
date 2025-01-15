import { createRoute, z } from '@hono/zod-openapi'

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

const positionSchema = z.array(z.number()).openapi('Position')

const lineStringCoordinatesSchema = z.array(positionSchema).openapi('LineStringCoordinates')

const linearRingSchema = z.array(positionSchema).openapi('LinearRing')

const pointSchema = z
  .intersection(
    geometryElementSchema,
    z.object({ type: z.enum(['Point']), coordinates: positionSchema }),
  )
  .openapi('Point')

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

const polygonSchema = z
  .intersection(geometryElementSchema, z.object({ coordinates: z.array(linearRingSchema) }))
  .openapi('Polygon')

const multiPolygonSchema = z
  .intersection(
    geometryElementSchema,
    z.object({ coordinates: z.array(z.array(linearRingSchema)) }),
  )
  .openapi('MultiPolygon')

const geometryCollectionSchema = z.object({}).openapi('GeometryCollection')

export const getGeometryRoute = createRoute({
  tags: [],
  method: 'get',
  path: '/geometry',
  summary: 'Get an array of GeoJSON Geometry objects',
  responses: {
    200: {
      description: 'Successful response',
      content: { 'application/json': { schema: z.array(geometryCollectionSchema) } },
    },
    400: { description: '' },
    401: { description: '' },
    500: { description: '' },
  },
})

export const postGeometryRoute = createRoute({
  tags: [],
  method: 'post',
  path: '/geometry',
  summary: 'Create new GeoJSON Geometry object',
  request: {
    body: { required: true, content: { 'application/json': { schema: geometrySchema } } },
  },
  responses: {
    201: { description: 'New GeoJSON Geometry object created' },
    400: { description: '' },
    401: { description: '' },
    403: { description: '' },
    500: { description: '' },
  },
})
