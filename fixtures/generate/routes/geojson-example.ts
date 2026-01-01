import { createRoute, z } from '@hono/zod-openapi'

const ErrorSchema = z
  .object({ message: z.string().openapi({ type: 'string' }) })
  .openapi({ type: 'object', properties: { message: { type: 'string' } }, required: ['message'] })
  .openapi('Error')

const GeoJsonObjectSchema = z
  .object({
    type: z
      .enum([
        'Feature',
        'FeatureCollection',
        'Point',
        'MultiPoint',
        'LineString',
        'MultiLineString',
        'Polygon',
        'MultiPolygon',
        'GeometryCollection',
      ])
      .openapi({
        type: 'string',
        enum: [
          'Feature',
          'FeatureCollection',
          'Point',
          'MultiPoint',
          'LineString',
          'MultiLineString',
          'Polygon',
          'MultiPolygon',
          'GeometryCollection',
        ],
      }),
    bbox: z
      .array(z.number().optional().openapi({ type: 'number' }))
      .optional()
      .openapi({
        description:
          'A GeoJSON object MAY have a member named "bbox" to include information on the coordinate range for its Geometries, Features, or FeatureCollections. The value of the bbox member MUST be an array of length 2*n where n is the number of dimensions represented in the contained geometries, with all axes of the most southwesterly point followed by all axes of the more northeasterly point. The axes order of a bbox follows the axes order of geometries.\n',
        type: 'array',
        items: { type: 'number' },
      }),
  })
  .openapi({
    description:
      'GeoJSon object\nThe coordinate reference system for all GeoJSON coordinates is a geographic coordinate reference system, using the World Geodetic System 1984 (WGS 84) datum, with longitude and latitude units of decimal degrees. This is equivalent to the coordinate reference system identified by the Open Geospatial Consortium (OGC) URN An OPTIONAL third-position element SHALL be the height in meters above or below the WGS 84 reference ellipsoid. In the absence of elevation values, applications sensitive to height or depth SHOULD interpret positions as being at local ground or sea level.\n',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3' },
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: [
          'Feature',
          'FeatureCollection',
          'Point',
          'MultiPoint',
          'LineString',
          'MultiLineString',
          'Polygon',
          'MultiPolygon',
          'GeometryCollection',
        ],
      },
      bbox: {
        description:
          'A GeoJSON object MAY have a member named "bbox" to include information on the coordinate range for its Geometries, Features, or FeatureCollections. The value of the bbox member MUST be an array of length 2*n where n is the number of dimensions represented in the contained geometries, with all axes of the most southwesterly point followed by all axes of the more northeasterly point. The axes order of a bbox follows the axes order of geometries.\n',
        type: 'array',
        items: { type: 'number' },
      },
    },
    required: ['type'],
    discriminator: { propertyName: 'type' },
  })
  .openapi('GeoJsonObject')

const GeometrySchema = z
  .intersection(
    GeoJsonObjectSchema,
    z
      .object({
        type: z
          .enum([
            'Point',
            'MultiPoint',
            'LineString',
            'MultiLineString',
            'Polygon',
            'MultiPolygon',
            'GeometryCollection',
          ])
          .openapi({
            type: 'string',
            enum: [
              'Point',
              'MultiPoint',
              'LineString',
              'MultiLineString',
              'Polygon',
              'MultiPolygon',
              'GeometryCollection',
            ],
          }),
      })
      .openapi({
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: [
              'Point',
              'MultiPoint',
              'LineString',
              'MultiLineString',
              'Polygon',
              'MultiPolygon',
              'GeometryCollection',
            ],
          },
        },
        required: ['type'],
        discriminator: { propertyName: 'type' },
      }),
  )
  .optional()
  .openapi({
    description: 'Abstract type for all GeoJSon object except Feature and FeatureCollection\n',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3' },
    allOf: [
      { $ref: '#/components/schemas/GeoJsonObject' },
      {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: [
              'Point',
              'MultiPoint',
              'LineString',
              'MultiLineString',
              'Polygon',
              'MultiPolygon',
              'GeometryCollection',
            ],
          },
        },
        required: ['type'],
        discriminator: { propertyName: 'type' },
      },
    ],
  })
  .openapi('Geometry')

const GeometryElementSchema = z
  .intersection(
    GeometrySchema,
    z
      .object({
        type: z
          .enum(['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon'])
          .openapi({
            type: 'string',
            enum: [
              'Point',
              'MultiPoint',
              'LineString',
              'MultiLineString',
              'Polygon',
              'MultiPolygon',
            ],
          }),
      })
      .openapi({
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: [
              'Point',
              'MultiPoint',
              'LineString',
              'MultiLineString',
              'Polygon',
              'MultiPolygon',
            ],
          },
        },
        required: ['type'],
        discriminator: { propertyName: 'type' },
      }),
  )
  .optional()
  .openapi({
    description:
      "Abstract type for all GeoJSon 'Geometry' object the type of which is not 'GeometryCollection'\n",
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3' },
    allOf: [
      { $ref: '#/components/schemas/Geometry' },
      {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: [
              'Point',
              'MultiPoint',
              'LineString',
              'MultiLineString',
              'Polygon',
              'MultiPolygon',
            ],
          },
        },
        required: ['type'],
        discriminator: { propertyName: 'type' },
      },
    ],
  })
  .openapi('GeometryElement')

const PositionSchema = z
  .array(z.number().optional().openapi({ type: 'number' }))
  .min(2)
  .max(3)
  .optional()
  .openapi({
    description:
      'GeoJSon fundamental geometry construct.\nA position is an array of numbers. There MUST be two or more elements. The first two elements are longitude and latitude, or easting and northing, precisely in that order and using decimal numbers. Altitude or elevation MAY be included as an optional third element.\nImplementations SHOULD NOT extend positions beyond three elements because the semantics of extra elements are unspecified and ambiguous. Historically, some implementations have used a fourth element to carry a linear referencing measure (sometimes denoted as "M") or a numerical timestamp, but in most situations a parser will not be able to properly interpret these values. The interpretation and meaning of additional elements is beyond the scope of this specification, and additional elements MAY be ignored by parsers.\n',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.1' },
    type: 'array',
    minItems: 2,
    maxItems: 3,
    items: { type: 'number' },
  })
  .openapi('Position')

const LinearRingSchema = z
  .array(PositionSchema)
  .min(4)
  .optional()
  .openapi({
    description:
      'A linear ring is a closed LineString with four or more positions.\nThe first and last positions are equivalent, and they MUST contain identical values; their representation SHOULD also be identical.\nA linear ring is the boundary of a surface or the boundary of a hole in a surface.\nA linear ring MUST follow the right-hand rule with respect to the area it bounds, i.e., exterior rings are counterclockwise, and holes are clockwise.\n',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.6' },
    type: 'array',
    items: { $ref: '#/components/schemas/Position' },
    minItems: 4,
  })
  .openapi('LinearRing')

const MultiPolygonSchema = z
  .intersection(
    GeometryElementSchema,
    z
      .object({
        coordinates: z
          .array(
            z
              .array(LinearRingSchema)
              .openapi({ type: 'array', items: { $ref: '#/components/schemas/LinearRing' } }),
          )
          .optional()
          .openapi({
            type: 'array',
            items: { type: 'array', items: { $ref: '#/components/schemas/LinearRing' } },
          }),
      })
      .openapi({
        type: 'object',
        required: ['coordinates'],
        properties: {
          coordinates: {
            type: 'array',
            items: { type: 'array', items: { $ref: '#/components/schemas/LinearRing' } },
          },
        },
      }),
  )
  .optional()
  .openapi({
    description: 'GeoJSon geometry',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.7' },
    allOf: [
      { $ref: '#/components/schemas/GeometryElement' },
      {
        type: 'object',
        required: ['coordinates'],
        properties: {
          coordinates: {
            type: 'array',
            items: { type: 'array', items: { $ref: '#/components/schemas/LinearRing' } },
          },
        },
      },
    ],
  })
  .openapi('MultiPolygon')

const PolygonSchema = z
  .intersection(
    GeometryElementSchema,
    z
      .object({
        coordinates: z
          .array(LinearRingSchema)
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/LinearRing' } }),
      })
      .openapi({
        type: 'object',
        required: ['coordinates'],
        properties: {
          coordinates: { type: 'array', items: { $ref: '#/components/schemas/LinearRing' } },
        },
      }),
  )
  .optional()
  .openapi({
    description: 'GeoJSon geometry',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.6' },
    allOf: [
      { $ref: '#/components/schemas/GeometryElement' },
      {
        type: 'object',
        required: ['coordinates'],
        properties: {
          coordinates: { type: 'array', items: { $ref: '#/components/schemas/LinearRing' } },
        },
      },
    ],
  })
  .openapi('Polygon')

const PointSchema = z
  .intersection(
    GeometryElementSchema,
    z
      .object({
        type: z.literal('Point').openapi({ type: 'string', enum: ['Point'] }),
        coordinates: PositionSchema,
      })
      .openapi({
        type: 'object',
        required: ['type', 'coordinates'],
        properties: {
          type: { type: 'string', enum: ['Point'] },
          coordinates: { $ref: '#/components/schemas/Position' },
        },
      }),
  )
  .optional()
  .openapi({
    description: 'GeoJSon geometry',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.2' },
    allOf: [
      { $ref: '#/components/schemas/GeometryElement' },
      {
        type: 'object',
        required: ['type', 'coordinates'],
        properties: {
          type: { type: 'string', enum: ['Point'] },
          coordinates: { $ref: '#/components/schemas/Position' },
        },
      },
    ],
  })
  .openapi('Point')

const ProjectSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid', description: 'Project ID' }),
    polygon: z
      .union([MultiPolygonSchema, PolygonSchema])
      .optional()
      .openapi({
        anyOf: [
          { $ref: '#/components/schemas/MultiPolygon' },
          { $ref: '#/components/schemas/Polygon' },
        ],
        description: 'Polygon',
      }),
    centre: PointSchema.optional().openapi({
      $ref: '#/components/schemas/Point',
      description: 'Center coordinates',
    }),
    createdAt: z.iso
      .datetime()
      .openapi({ type: 'string', format: 'date-time', description: 'Created date' }),
    updatedAt: z.iso
      .datetime()
      .openapi({ type: 'string', format: 'date-time', description: 'Last updated date' }),
  })
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid', description: 'Project ID' },
      polygon: {
        anyOf: [
          { $ref: '#/components/schemas/MultiPolygon' },
          { $ref: '#/components/schemas/Polygon' },
        ],
        description: 'Polygon',
      },
      centre: { $ref: '#/components/schemas/Point', description: 'Center coordinates' },
      createdAt: { type: 'string', format: 'date-time', description: 'Created date' },
      updatedAt: { type: 'string', format: 'date-time', description: 'Last updated date' },
    },
    required: ['id', 'geojson', 'createdAt', 'updatedAt'],
  })
  .openapi('Project')

const FeatureSchema = z
  .intersection(
    GeoJsonObjectSchema,
    z
      .object({
        geometry: GeometrySchema.nullable(),
        properties: z.object({}).nullable().openapi({ type: 'object' }),
        id: z
          .union([
            z.number().optional().openapi({ type: 'number' }),
            z.string().optional().openapi({ type: 'string' }),
          ])
          .optional()
          .openapi({ oneOf: [{ type: 'number' }, { type: 'string' }] }),
      })
      .openapi({
        type: 'object',
        required: ['geometry', 'properties'],
        properties: {
          geometry: { allOf: [{ nullable: true }, { $ref: '#/components/schemas/Geometry' }] },
          properties: { type: 'object', nullable: true },
          id: { oneOf: [{ type: 'number' }, { type: 'string' }] },
        },
      }),
  )
  .optional()
  .openapi({
    description: "GeoJSon 'Feature' object",
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.2' },
    allOf: [
      { $ref: '#/components/schemas/GeoJsonObject' },
      {
        type: 'object',
        required: ['geometry', 'properties'],
        properties: {
          geometry: { allOf: [{ nullable: true }, { $ref: '#/components/schemas/Geometry' }] },
          properties: { type: 'object', nullable: true },
          id: { oneOf: [{ type: 'number' }, { type: 'string' }] },
        },
      },
    ],
  })
  .openapi('Feature')

const FeatureCollectionSchema = z
  .intersection(
    GeoJsonObjectSchema,
    z
      .object({
        features: z
          .array(FeatureSchema)
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Feature' } }),
      })
      .openapi({
        type: 'object',
        required: ['features'],
        properties: {
          features: { type: 'array', items: { $ref: '#/components/schemas/Feature' } },
        },
      }),
  )
  .optional()
  .openapi({
    description: "GeoJSon 'FeatureCollection' object",
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.3' },
    allOf: [
      { $ref: '#/components/schemas/GeoJsonObject' },
      {
        type: 'object',
        required: ['features'],
        properties: {
          features: { type: 'array', items: { $ref: '#/components/schemas/Feature' } },
        },
      },
    ],
  })
  .openapi('FeatureCollection')

const LineStringCoordinatesSchema = z
  .array(PositionSchema)
  .min(2)
  .optional()
  .openapi({
    description: 'GeoJSon fundamental geometry construct, array of two or more positions.\n',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.4' },
    type: 'array',
    items: { $ref: '#/components/schemas/Position' },
    minItems: 2,
  })
  .openapi('LineStringCoordinates')

const MultiPointSchema = z
  .intersection(
    GeometryElementSchema,
    z
      .object({
        coordinates: z
          .array(PositionSchema)
          .openapi({ type: 'array', items: { $ref: '#/components/schemas/Position' } }),
      })
      .openapi({
        type: 'object',
        required: ['coordinates'],
        properties: {
          coordinates: { type: 'array', items: { $ref: '#/components/schemas/Position' } },
        },
      }),
  )
  .optional()
  .openapi({
    description: 'GeoJSon geometry',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.3' },
    allOf: [
      { $ref: '#/components/schemas/GeometryElement' },
      {
        type: 'object',
        required: ['coordinates'],
        properties: {
          coordinates: { type: 'array', items: { $ref: '#/components/schemas/Position' } },
        },
      },
    ],
  })
  .openapi('MultiPoint')

const LineStringSchema = z
  .intersection(
    GeometryElementSchema,
    z
      .object({ coordinates: LineStringCoordinatesSchema })
      .openapi({
        type: 'object',
        required: ['coordinates'],
        properties: { coordinates: { $ref: '#/components/schemas/LineStringCoordinates' } },
      }),
  )
  .optional()
  .openapi({
    description: 'GeoJSon geometry',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.4' },
    allOf: [
      { $ref: '#/components/schemas/GeometryElement' },
      {
        type: 'object',
        required: ['coordinates'],
        properties: { coordinates: { $ref: '#/components/schemas/LineStringCoordinates' } },
      },
    ],
  })
  .openapi('LineString')

const MultiLineStringSchema = z
  .intersection(
    GeometryElementSchema,
    z
      .object({
        coordinates: z
          .array(LineStringCoordinatesSchema)
          .openapi({
            type: 'array',
            items: { $ref: '#/components/schemas/LineStringCoordinates' },
          }),
      })
      .openapi({
        type: 'object',
        required: ['coordinates'],
        properties: {
          coordinates: {
            type: 'array',
            items: { $ref: '#/components/schemas/LineStringCoordinates' },
          },
        },
      }),
  )
  .optional()
  .openapi({
    description: 'GeoJSon geometry',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.5' },
    allOf: [
      { $ref: '#/components/schemas/GeometryElement' },
      {
        type: 'object',
        required: ['coordinates'],
        properties: {
          coordinates: {
            type: 'array',
            items: { $ref: '#/components/schemas/LineStringCoordinates' },
          },
        },
      },
    ],
  })
  .openapi('MultiLineString')

const GeometryCollectionSchema = z
  .intersection(
    GeometrySchema,
    z
      .object({
        geometries: z
          .array(GeometryElementSchema)
          .min(0)
          .openapi({
            type: 'array',
            items: { $ref: '#/components/schemas/GeometryElement' },
            minItems: 0,
          }),
      })
      .openapi({
        type: 'object',
        required: ['geometries'],
        properties: {
          geometries: {
            type: 'array',
            items: { $ref: '#/components/schemas/GeometryElement' },
            minItems: 0,
          },
        },
      }),
  )
  .openapi({
    type: 'object',
    description:
      'GeoJSon geometry collection\nGeometryCollections composed of a single part or a number of parts of a single type SHOULD be avoided when that single part or a single object of multipart type (MultiPoint, MultiLineString, or MultiPolygon) could be used instead.\n',
    externalDocs: { url: 'https://tools.ietf.org/html/rfc7946#section-3.1.8' },
    allOf: [
      { $ref: '#/components/schemas/Geometry' },
      {
        type: 'object',
        required: ['geometries'],
        properties: {
          geometries: {
            type: 'array',
            items: { $ref: '#/components/schemas/GeometryElement' },
            minItems: 0,
          },
        },
      },
    ],
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
            .object({ message: z.string().openapi({ type: 'string', example: 'Pong' }) })
            .openapi({
              type: 'object',
              properties: { message: { type: 'string', example: 'Pong' } },
              required: ['message'],
            }),
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
        .openapi({
          param: {
            in: 'query',
            name: 'chiban',
            required: true,
            schema: { type: 'string' },
            description: 'Chiban',
          },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: 'Success, return list of projects',
      content: {
        'application/json': {
          schema: z
            .array(ProjectSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Project' } }),
        },
      },
    },
    400: {
      description: 'Invalid request',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    500: { description: 'Server error', content: { 'application/json': { schema: ErrorSchema } } },
  },
})
