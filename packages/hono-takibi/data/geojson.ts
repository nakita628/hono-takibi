import type { OpenAPISpec } from '../src/types'

export const geojsonOpenAPI: OpenAPISpec = {
  openapi: '3.0.0',
  info: {
    version: '1.0.1',
    title: 'GeoJSON format',
    description:
      "This document defines the GeoJSON format as an OpenAPI. It contains the definitions for 'Feature' object and 'FeatureCollection' objects, as well as the definitions for all 'Geometry' objects. It conforms with the 'RFC-7946' standard from IETF (August 2016 version)\nKudos to @bubbobne and @idkw whose code helped me not start from scratch https://gist.github.com/bubbobne/fe5f2db65acf039be6a9fd92fc9c7233\n",
    termsOfService: 'no',
    contact: {
      name: 'Zitoun',
      email: 'zitoun@gmail.com',
    },
    license: {
      name: 'GPLv3',
      url: 'https://www.gnu.org/licenses/gpl-3.0.html',
    },
  },
  externalDocs: {
    description: 'Official GeoJSON specification – IETF RFC-7946 (August 2016)',
    url: 'https://tools.ietf.org/html/rfc7946',
  },
  security: [
    {
      UserSecurity: [],
    },
  ],
  servers: [
    {
      url: 'http://myHost/',
    },
  ],
  paths: {
    '/geometry': {
      get: {
        summary: 'Get an array of GeoJSON Geometry objects',
        responses: {
          '200': {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/GeometryCollection',
                  },
                },
              },
            },
          },
          '400': {
            $ref: '#/components/responses/Error400BadRequest',
          },
          '401': {
            $ref: '#/components/responses/Error401Unauthorized',
          },
          '500': {
            $ref: '#/components/responses/Error500InternalServerError',
          },
        },
      },
      post: {
        summary: 'Create new GeoJSON Geometry object',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Geometry',
              },
            },
          },
          required: true,
        },
        responses: {
          '201': {
            description: 'New GeoJSON Geometry object created',
          },
          '400': {
            $ref: '#/components/responses/Error400BadRequest',
          },
          '401': {
            $ref: '#/components/responses/Error401Unauthorized',
          },
          '403': {
            $ref: '#/components/responses/Error403Forbidden',
          },
          '500': {
            $ref: '#/components/responses/Error500InternalServerError',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      GeoJsonObject: {
        description:
          'GeoJSon object\nThe coordinate reference system for all GeoJSON coordinates is a geographic coordinate reference system, using the World Geodetic System 1984 (WGS 84) datum, with longitude and latitude units of decimal degrees. This is equivalent to the coordinate reference system identified by the Open Geospatial Consortium (OGC) URN An OPTIONAL third-position element SHALL be the height in meters above or below the WGS 84 reference ellipsoid. In the absence of elevation values, applications sensitive to height or depth SHOULD interpret positions as being at local ground or sea level.\n',
        externalDocs: {
          url: 'https://tools.ietf.org/html/rfc7946#section-3',
        },
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
            items: {
              type: 'number',
            },
          },
        },
        required: ['type'],
        discriminator: {
          propertyName: 'type',
        },
      },
      Geometry: {
        description: 'Abstract type for all GeoJSon object except Feature and FeatureCollection\n',
        externalDocs: {
          url: 'https://tools.ietf.org/html/rfc7946#section-3',
        },
        allOf: [
          {
            $ref: '#/components/schemas/GeoJsonObject',
          },
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
            discriminator: {
              propertyName: 'type',
            },
          },
        ],
      },
      GeometryElement: {
        description:
          "Abstract type for all GeoJSon 'Geometry' object the type of which is not 'GeometryCollection'\n",
        externalDocs: {
          url: 'https://tools.ietf.org/html/rfc7946#section-3',
        },
        allOf: [
          {
            $ref: '#/components/schemas/Geometry',
          },
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
            discriminator: {
              propertyName: 'type',
            },
          },
        ],
      },
      Feature: {
        description: "GeoJSon 'Feature' object",
        externalDocs: {
          url: 'https://tools.ietf.org/html/rfc7946#section-3.2',
        },
        allOf: [
          {
            $ref: '#/components/schemas/GeoJsonObject',
          },
          {
            type: 'object',
            required: ['geometry', 'properties'],
            properties: {
              geometry: {
                allOf: [
                  {
                    nullable: true,
                  },
                  {
                    $ref: '#/components/schemas/Geometry',
                  },
                ],
              },
              properties: {
                type: 'object',
                nullable: true,
              },
              id: {
                oneOf: [
                  {
                    type: 'number',
                  },
                  {
                    type: 'string',
                  },
                ],
              },
            },
          },
        ],
      },
      FeatureCollection: {
        description: "GeoJSon 'FeatureCollection' object",
        externalDocs: {
          url: 'https://tools.ietf.org/html/rfc7946#section-3.3',
        },
        allOf: [
          {
            $ref: '#/components/schemas/GeoJsonObject',
          },
          {
            type: 'object',
            required: ['features'],
            properties: {
              features: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Feature',
                },
              },
            },
          },
        ],
      },
      Position: {
        description:
          'GeoJSon fundamental geometry construct.\nA position is an array of numbers. There MUST be two or more elements. The first two elements are longitude and latitude, or easting and northing, precisely in that order and using decimal numbers. Altitude or elevation MAY be included as an optional third element.\nImplementations SHOULD NOT extend positions beyond three elements because the semantics of extra elements are unspecified and ambiguous. Historically, some implementations have used a fourth element to carry a linear referencing measure (sometimes denoted as "M") or a numerical timestamp, but in most situations a parser will not be able to properly interpret these values. The interpretation and meaning of additional elements is beyond the scope of this specification, and additional elements MAY be ignored by parsers.\n',
        externalDocs: {
          url: 'https://tools.ietf.org/html/rfc7946#section-3.1.1',
        },
        type: 'array',
        minItems: 2,
        maxItems: 3,
        items: {
          type: 'number',
        },
      },
      LineStringCoordinates: {
        description: 'GeoJSon fundamental geometry construct, array of two or more positions.\n',
        externalDocs: {
          url: 'https://tools.ietf.org/html/rfc7946#section-3.1.4',
        },
        type: 'array',
        items: {
          $ref: '#/components/schemas/Position',
        },
        minItems: 2,
      },
      LinearRing: {
        description:
          'A linear ring is a closed LineString with four or more positions.\nThe first and last positions are equivalent, and they MUST contain identical values; their representation SHOULD also be identical.\nA linear ring is the boundary of a surface or the boundary of a hole in a surface.\nA linear ring MUST follow the right-hand rule with respect to the area it bounds, i.e., exterior rings are counterclockwise, and holes are clockwise.\n',
        externalDocs: {
          url: 'https://tools.ietf.org/html/rfc7946#section-3.1.6',
        },
        type: 'array',
        items: {
          $ref: '#/components/schemas/Position',
        },
        minItems: 4,
      },
      Point: {
        description: 'GeoJSon geometry',
        externalDocs: {
          url: 'https://tools.ietf.org/html/rfc7946#section-3.1.2',
        },
        allOf: [
          {
            $ref: '#/components/schemas/GeometryElement',
          },
          {
            type: 'object',
            required: ['type', 'coordinates'],
            properties: {
              type: {
                type: 'string',
                enum: ['Point'],
              },
              coordinates: {
                $ref: '#/components/schemas/Position',
              },
            },
          },
        ],
      },
      MultiPoint: {
        description: 'GeoJSon geometry',
        externalDocs: {
          url: 'https://tools.ietf.org/html/rfc7946#section-3.1.3',
        },
        allOf: [
          {
            $ref: '#/components/schemas/GeometryElement',
          },
          {
            type: 'object',
            required: ['coordinates'],
            properties: {
              coordinates: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Position',
                },
              },
            },
          },
        ],
      },
      LineString: {
        description: 'GeoJSon geometry',
        externalDocs: {
          url: 'https://tools.ietf.org/html/rfc7946#section-3.1.4',
        },
        allOf: [
          {
            $ref: '#/components/schemas/GeometryElement',
          },
          {
            type: 'object',
            required: ['coordinates'],
            properties: {
              coordinates: {
                $ref: '#/components/schemas/LineStringCoordinates',
              },
            },
          },
        ],
      },
      MultiLineString: {
        description: 'GeoJSon geometry',
        externalDocs: {
          url: 'https://tools.ietf.org/html/rfc7946#section-3.1.5',
        },
        allOf: [
          {
            $ref: '#/components/schemas/GeometryElement',
          },
          {
            type: 'object',
            required: ['coordinates'],
            properties: {
              coordinates: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/LineStringCoordinates',
                },
              },
            },
          },
        ],
      },
      Polygon: {
        description: 'GeoJSon geometry',
        externalDocs: {
          url: 'https://tools.ietf.org/html/rfc7946#section-3.1.6',
        },
        allOf: [
          {
            $ref: '#/components/schemas/GeometryElement',
          },
          {
            type: 'object',
            required: ['coordinates'],
            properties: {
              coordinates: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/LinearRing',
                },
              },
            },
          },
        ],
      },
      MultiPolygon: {
        description: 'GeoJSon geometry',
        externalDocs: {
          url: 'https://tools.ietf.org/html/rfc7946#section-3.1.7',
        },
        allOf: [
          {
            $ref: '#/components/schemas/GeometryElement',
          },
          {
            type: 'object',
            required: ['coordinates'],
            properties: {
              coordinates: {
                type: 'array',
                items: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/LinearRing',
                  },
                },
              },
            },
          },
        ],
      },
      GeometryCollection: {
        type: 'object',
        description:
          'GeoJSon geometry collection\nGeometryCollections composed of a single part or a number of parts of a single type SHOULD be avoided when that single part or a single object of multipart type (MultiPoint, MultiLineString, or MultiPolygon) could be used instead.\n',
        externalDocs: {
          url: 'https://tools.ietf.org/html/rfc7946#section-3.1.8',
        },
        allOf: [
          {
            $ref: '#/components/schemas/Geometry',
          },
          {
            type: 'object',
            required: ['geometries'],
            properties: {
              geometries: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/GeometryElement',
                },
                minItems: 0,
              },
            },
          },
        ],
      },
    },
    responses: {
      Error400BadRequest: {
        description: 'The JSON is not valid.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status_code: {
                  type: 'integer',
                  enum: [400],
                },
                message: {
                  type: 'string',
                  enum: ['The JSON is not valid.'],
                },
              },
            },
          },
        },
      },
      Error401Unauthorized: {
        description: 'The request requires an user authentication.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status_code: {
                  type: 'integer',
                  enum: [401],
                },
                message: {
                  type: 'string',
                  enum: ['The request requires an user authentication.'],
                },
              },
            },
          },
        },
      },
      Error403Forbidden: {
        description: 'The access is not allowed.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status_code: {
                  type: 'integer',
                  enum: [403],
                },
                message: {
                  type: 'string',
                  enum: ['The access is not allowed.'],
                },
              },
            },
          },
        },
      },
      Error404NotFound: {
        description: 'The resource was not found.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status_code: {
                  type: 'integer',
                  enum: [404],
                },
                message: {
                  type: 'string',
                  enum: ['The resource was not found.'],
                },
              },
            },
          },
        },
      },
      Error405MethodNotAllowed: {
        description: 'Request method is not supported for the requested resource.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status_code: {
                  type: 'integer',
                  enum: [405],
                },
                message: {
                  type: 'string',
                  enum: ['Request method is not supported for the requested resource.'],
                },
              },
            },
          },
        },
      },
      Error406NotAcceptable: {
        description: 'Headers sent in the request are not compatible with the service.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status_code: {
                  type: 'integer',
                  enum: [406],
                },
                message: {
                  type: 'string',
                  enum: ['Headers sent in the request are not compatible with the service.'],
                },
              },
            },
          },
        },
      },
      Error408RequestTimeout: {
        description:
          'The client did not produce a request within the time that the server was prepared to wait. The client may repeat the request without modifications at any later time.\n',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status_code: {
                  type: 'integer',
                  enum: [408],
                },
                message: {
                  type: 'string',
                  enum: [
                    'The client did not produce a request within the time that the server was prepared to wait. The client may repeat the request without modifications at any later time.',
                  ],
                },
              },
            },
          },
        },
      },
      Error410Gone: {
        description:
          'The requested resource is no longer available and will not be available again. The resource should be purged from the client system.\n',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status_code: {
                  type: 'integer',
                  enum: [410],
                },
                message: {
                  type: 'string',
                  enum: [
                    'The requested resource is no longer available and will not be available again. The resource should be purged from the client system.',
                  ],
                },
              },
            },
          },
        },
      },
      Error423Locked: {
        description: 'The resource that is being accessed is locked.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status_code: {
                  type: 'integer',
                  enum: [423],
                },
                message: {
                  type: 'string',
                  enum: ['The resource that is being accessed is locked.'],
                },
              },
            },
          },
        },
      },
      Error429TooManyRequests: {
        description: 'The user has sent too many requests in a short period.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status_code: {
                  type: 'integer',
                  enum: [429],
                },
                message: {
                  type: 'string',
                  enum: ['The user has sent too many requests in a short period.'],
                },
              },
            },
          },
        },
      },
      Error500InternalServerError: {
        description: 'An unexpected error occured.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status_code: {
                  type: 'integer',
                  enum: [500],
                },
                message: {
                  type: 'string',
                  enum: ['An unexpected error occured.'],
                },
              },
            },
          },
        },
      },
      Error503ServiceUnavailable: {
        description: 'The server is currently unable to handle the request.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                status_code: {
                  type: 'integer',
                  enum: [503],
                },
                message: {
                  type: 'string',
                  enum: ['The server is currently unable to handle the request.'],
                },
              },
            },
          },
        },
      },
    },
    securitySchemes: {
      UserSecurity: {
        type: 'http',
        scheme: 'basic',
      },
    },
  },
}
