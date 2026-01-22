import { createRoute, z } from '@hono/zod-openapi'

const ErrorSchema = z
  .object({ message: z.string() })
  .openapi({ required: ['message'] })
  .openapi('Error')

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
    bbox: z
      .array(z.number())
      .exactOptional()
      .openapi({
        description:
          'A GeoJSON object MAY have a member named "bbox" to include information on the coordinate range for its Geometries, Features, or FeatureCollections. The value of the bbox member MUST be an array of length 2*n where n is the number of dimensions represented in the contained geometries, with all axes of the most southwesterly point followed by all axes of the more northeasterly point. The axes order of a bbox follows the axes order of geometries.\n',
      }),
  })
  .openapi({
    description:
      'GeoJSon object\nThe coordinate reference system for all GeoJSON coordinates is a geographic coordinate reference system, using the World Geodetic System 1984 (WGS 84) datum, with longitude and latitude units of decimal degrees. This is equivalent to the coordinate reference system identified by the Open Geospatial Consortium (OGC) URN An OPTIONAL third-position element SHALL be the height in meters above or below the WGS 84 reference ellipsoid. In the absence of elevation values, applications sensitive to height or depth SHOULD interpret positions as being at local ground or sea level.\n',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3' },
    required: ['type'],
    discriminator: { propertyName: 'type' },
  })
  .openapi('GeoJsonObject')

const GeometrySchema = GeoJsonObjectSchema.and(
  z
    .object({
      type: z.enum([
        'Point',
        'MultiPoint',
        'LineString',
        'MultiLineString',
        'Polygon',
        'MultiPolygon',
        'GeometryCollection',
      ]),
    })
    .openapi({ required: ['type'], discriminator: { propertyName: 'type' } }),
)
  .openapi({
    description: 'Abstract type for all GeoJSon object except Feature and FeatureCollection\n',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3' },
  })
  .openapi('Geometry')

const GeometryElementSchema = GeometrySchema.and(
  z
    .object({
      type: z.enum([
        'Point',
        'MultiPoint',
        'LineString',
        'MultiLineString',
        'Polygon',
        'MultiPolygon',
      ]),
    })
    .openapi({ required: ['type'], discriminator: { propertyName: 'type' } }),
)
  .openapi({
    description:
      "Abstract type for all GeoJSon 'Geometry' object the type of which is not 'GeometryCollection'\n",
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3' },
  })
  .openapi('GeometryElement')

const PositionSchema = z
  .array(z.number())
  .min(2)
  .max(3)
  .openapi({
    description:
      'GeoJSon fundamental geometry construct.\nA position is an array of numbers. There MUST be two or more elements. The first two elements are longitude and latitude, or easting and northing, precisely in that order and using decimal numbers. Altitude or elevation MAY be included as an optional third element.\nImplementations SHOULD NOT extend positions beyond three elements because the semantics of extra elements are unspecified and ambiguous. Historically, some implementations have used a fourth element to carry a linear referencing measure (sometimes denoted as "M") or a numerical timestamp, but in most situations a parser will not be able to properly interpret these values. The interpretation and meaning of additional elements is beyond the scope of this specification, and additional elements MAY be ignored by parsers.\n',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.1' },
  })
  .openapi('Position')

const LinearRingSchema = z
  .array(PositionSchema)
  .min(4)
  .openapi({
    description:
      'A linear ring is a closed LineString with four or more positions.\nThe first and last positions are equivalent, and they MUST contain identical values; their representation SHOULD also be identical.\nA linear ring is the boundary of a surface or the boundary of a hole in a surface.\nA linear ring MUST follow the right-hand rule with respect to the area it bounds, i.e., exterior rings are counterclockwise, and holes are clockwise.\n',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.6' },
  })
  .openapi('LinearRing')

const MultiPolygonSchema = GeometryElementSchema.and(
  z
    .object({ coordinates: z.array(z.array(LinearRingSchema)) })
    .openapi({ required: ['coordinates'] }),
)
  .openapi({
    description: 'GeoJSon geometry',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.7' },
  })
  .openapi('MultiPolygon')

const PolygonSchema = GeometryElementSchema.and(
  z.object({ coordinates: z.array(LinearRingSchema) }).openapi({ required: ['coordinates'] }),
)
  .openapi({
    description: 'GeoJSon geometry',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.6' },
  })
  .openapi('Polygon')

const PointSchema = GeometryElementSchema.and(
  z
    .object({ type: z.literal('Point'), coordinates: PositionSchema })
    .openapi({ required: ['type', 'coordinates'] }),
)
  .openapi({
    description: 'GeoJSon geometry',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.2' },
  })
  .openapi('Point')

const ProjectSchema = z
  .object({
    id: z.uuid().openapi({ description: 'Project ID' }),
    polygon: z
      .union([MultiPolygonSchema, PolygonSchema])
      .exactOptional()
      .openapi({ description: 'Polygon' }),
    centre: PointSchema.exactOptional().openapi({ description: 'Center coordinates' }),
    createdAt: z.iso.datetime().openapi({ description: 'Created date' }),
    updatedAt: z.iso.datetime().openapi({ description: 'Last updated date' }),
  })
  .openapi({ required: ['id', 'geojson', 'createdAt', 'updatedAt'] })
  .openapi('Project')

const FeatureSchema = GeoJsonObjectSchema.and(
  z
    .object({
      geometry: GeometrySchema.nullable(),
      properties: z.object({}).nullable(),
      id: z.xor([z.number(), z.string()]).exactOptional(),
    })
    .openapi({ required: ['geometry', 'properties'] }),
)
  .openapi({
    description: "GeoJSon 'Feature' object",
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.2' },
  })
  .openapi('Feature')

const FeatureCollectionSchema = GeoJsonObjectSchema.and(
  z.object({ features: z.array(FeatureSchema) }).openapi({ required: ['features'] }),
)
  .openapi({
    description: "GeoJSon 'FeatureCollection' object",
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.3' },
  })
  .openapi('FeatureCollection')

const LineStringCoordinatesSchema = z
  .array(PositionSchema)
  .min(2)
  .openapi({
    description: 'GeoJSon fundamental geometry construct, array of two or more positions.\n',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.4' },
  })
  .openapi('LineStringCoordinates')

const MultiPointSchema = GeometryElementSchema.and(
  z.object({ coordinates: z.array(PositionSchema) }).openapi({ required: ['coordinates'] }),
)
  .openapi({
    description: 'GeoJSon geometry',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.3' },
  })
  .openapi('MultiPoint')

const LineStringSchema = GeometryElementSchema.and(
  z.object({ coordinates: LineStringCoordinatesSchema }).openapi({ required: ['coordinates'] }),
)
  .openapi({
    description: 'GeoJSon geometry',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.4' },
  })
  .openapi('LineString')

const MultiLineStringSchema = GeometryElementSchema.and(
  z
    .object({ coordinates: z.array(LineStringCoordinatesSchema) })
    .openapi({ required: ['coordinates'] }),
)
  .openapi({
    description: 'GeoJSon geometry',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.5' },
  })
  .openapi('MultiLineString')

const GeometryCollectionSchema = GeometrySchema.and(
  z
    .object({ geometries: z.array(GeometryElementSchema).min(0) })
    .openapi({ required: ['geometries'] }),
)
  .openapi({
    description:
      'GeoJSon geometry collection\nGeometryCollections composed of a single part or a number of parts of a single type SHOULD be avoided when that single part or a single object of multipart type (MultiPoint, MultiLineString, or MultiPolygon) could be used instead.\n',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.8' },
  })
  .openapi('GeometryCollection')

export const getRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Utility'],
  summary: 'Ping endpoint',
  description: 'This endpoint is used to check if the server is working.',
  responses: {
    200: {
      description: 'Success, return message',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'Pong' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const getProjectsRoute = createRoute({
  method: 'get',
  path: '/projects',
  tags: ['Projects'],
  summary: 'Get the site associated with a given lot number',
  description: 'Update the content of an existing post identified by its unique ID.',
  request: {
    query: z.object({
      chiban: z
        .string()
        .openapi({ param: { in: 'query', name: 'chiban', required: true, description: 'Chiban' } }),
    }),
  },
  responses: {
    200: {
      description: 'Success, return list of projects',
      content: { 'application/json': { schema: z.array(ProjectSchema) } },
    },
    400: {
      description: 'Invalid request',
      content: {
        'application/json': { schema: ErrorSchema, example: { message: 'Chiban is required' } },
      },
    },
    500: {
      description: 'Server error',
      content: {
        'application/json': {
          schema: ErrorSchema,
          example: { message: 'An unexpected error has occurred. Please try again later.' },
        },
      },
    },
  },
})
