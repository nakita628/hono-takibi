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
    bbox: z
      .array(z.number())
      .openapi({
        description:
          'A GeoJSON object MAY have a member named "bbox" to include information on the coordinate range for its Geometries, Features, or FeatureCollections. The value of the bbox member MUST be an array of length 2*n where n is the number of dimensions represented in the contained geometries, with all axes of the most southwesterly point followed by all axes of the more northeasterly point. The axes order of a bbox follows the axes order of geometries.\n',
      })
      .optional(),
  })
  .openapi({
    description:
      'GeoJSon object\nThe coordinate reference system for all GeoJSON coordinates is a geographic coordinate reference system, using the World Geodetic System 1984 (WGS 84) datum, with longitude and latitude units of decimal degrees. This is equivalent to the coordinate reference system identified by the Open Geospatial Consortium (OGC) URN An OPTIONAL third-position element SHALL be the height in meters above or below the WGS 84 reference ellipsoid. In the absence of elevation values, applications sensitive to height or depth SHOULD interpret positions as being at local ground or sea level.\n',
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
  .openapi({
    description: 'Abstract type for all GeoJSon object except Feature and FeatureCollection\n',
  })
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
  .openapi({
    description:
      "Abstract type for all GeoJSon 'Geometry' object the type of which is not 'GeometryCollection'\n",
  })
  .openapi('GeometryElement')

const PositionSchema = z
  .array(z.number())
  .min(2)
  .max(3)
  .openapi({
    description:
      'GeoJSon fundamental geometry construct.\nA position is an array of numbers. There MUST be two or more elements. The first two elements are longitude and latitude, or easting and northing, precisely in that order and using decimal numbers. Altitude or elevation MAY be included as an optional third element.\nImplementations SHOULD NOT extend positions beyond three elements because the semantics of extra elements are unspecified and ambiguous. Historically, some implementations have used a fourth element to carry a linear referencing measure (sometimes denoted as "M") or a numerical timestamp, but in most situations a parser will not be able to properly interpret these values. The interpretation and meaning of additional elements is beyond the scope of this specification, and additional elements MAY be ignored by parsers.\n',
  })
  .openapi('Position')

const LinearRingSchema = z
  .array(PositionSchema)
  .min(4)
  .openapi({
    description:
      'A linear ring is a closed LineString with four or more positions.\nThe first and last positions are equivalent, and they MUST contain identical values; their representation SHOULD also be identical.\nA linear ring is the boundary of a surface or the boundary of a hole in a surface.\nA linear ring MUST follow the right-hand rule with respect to the area it bounds, i.e., exterior rings are counterclockwise, and holes are clockwise.\n',
  })
  .openapi('LinearRing')

const MultiPolygonSchema = z
  .intersection(
    GeometryElementSchema,
    z.object({ coordinates: z.array(z.array(LinearRingSchema)) }),
  )
  .openapi({ description: 'GeoJSon geometry' })
  .openapi('MultiPolygon')

const PolygonSchema = z
  .intersection(GeometryElementSchema, z.object({ coordinates: z.array(LinearRingSchema) }))
  .openapi({ description: 'GeoJSon geometry' })
  .openapi('Polygon')

const PointSchema = z
  .intersection(
    GeometryElementSchema,
    z.object({ type: z.literal('Point'), coordinates: PositionSchema }),
  )
  .openapi({ description: 'GeoJSon geometry' })
  .openapi('Point')

const ProjectSchema = z
  .object({
    id: z.string().uuid().openapi({ description: 'Project ID' }),
    polygon: z
      .union([MultiPolygonSchema, PolygonSchema])
      .openapi({ description: 'Site polygon' })
      .optional(),
    centre: PointSchema.optional(),
    createdAt: z.string().datetime().openapi({ description: 'Site creation date and time' }),
    updatedAt: z.string().datetime().openapi({ description: 'Site last updated date and time' }),
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
  .openapi({ description: "GeoJSon 'Feature' object" })
  .openapi('Feature')

const FeatureCollectionSchema = z
  .intersection(GeoJsonObjectSchema, z.object({ features: z.array(FeatureSchema) }))
  .openapi({ description: "GeoJSon 'FeatureCollection' object" })
  .openapi('FeatureCollection')

const LineStringCoordinatesSchema = z
  .array(PositionSchema)
  .min(2)
  .openapi({
    description: 'GeoJSon fundamental geometry construct, array of two or more positions.\n',
  })
  .openapi('LineStringCoordinates')

const MultiPointSchema = z
  .intersection(GeometryElementSchema, z.object({ coordinates: z.array(PositionSchema) }))
  .openapi({ description: 'GeoJSon geometry' })
  .openapi('MultiPoint')

const LineStringSchema = z
  .intersection(GeometryElementSchema, z.object({ coordinates: LineStringCoordinatesSchema }))
  .openapi({ description: 'GeoJSon geometry' })
  .openapi('LineString')

const MultiLineStringSchema = z
  .intersection(
    GeometryElementSchema,
    z.object({ coordinates: z.array(LineStringCoordinatesSchema) }),
  )
  .openapi({ description: 'GeoJSon geometry' })
  .openapi('MultiLineString')

const GeometryCollectionSchema = z
  .intersection(GeometrySchema, z.object({ geometries: z.array(GeometryElementSchema) }))
  .openapi({
    description:
      'GeoJSon geometry collection\nGeometryCollections composed of a single part or a number of parts of a single type SHOULD be avoided when that single part or a single object of multipart type (MultiPoint, MultiLineString, or MultiPolygon) could be used instead.\n',
  })
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
