import { createRoute, z } from '@hono/zod-openapi'

export const getApiReverseGeocodeIndexRoute = createRoute({
  method: 'get',
  path: '/api/reverseGeocode/',
  summary: 'Reverse geocode lookup',
  operationId: 'getApiReverseGeocodeIndex',
  request: {
    query: z.object({
      callback: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'callback',
            in: 'query',
            description: 'Callback function name for JSONP',
            required: false,
            schema: { type: 'string' },
          },
        }),
      search_type: z
        .enum(['0', '1', '2'])
        .default('0')
        .exactOptional()
        .openapi({
          param: {
            name: 'search_type',
            in: 'query',
            description: 'Search type',
            required: false,
            schema: { type: 'string', enum: ['0', '1', '2'], default: '0' },
          },
        }),
      lat: z.coerce
        .number()
        .exactOptional()
        .openapi({
          param: {
            name: 'lat',
            in: 'query',
            description: 'Latitude',
            required: false,
            schema: { type: 'number', format: 'double' },
          },
        }),
      lon: z.coerce
        .number()
        .exactOptional()
        .openapi({
          param: {
            name: 'lon',
            in: 'query',
            description: 'Longitude',
            required: false,
            schema: { type: 'number', format: 'double' },
          },
        }),
      polygon: z
        .string()
        .regex(/^(\d+\.\d+,\d+\.\d+,)*\d+\.\d+,\d+\.\d+$/)
        .exactOptional()
        .openapi({
          param: {
            name: 'polygon',
            in: 'query',
            description: 'Polygon coordinates',
            required: false,
            schema: {
              type: 'string',
              pattern: '^(\\d+\\.\\d+,\\d+\\.\\d+,)*\\d+\\.\\d+,\\d+\\.\\d+$',
            },
          },
        }),
      radius: z
        .int()
        .max(200)
        .exactOptional()
        .openapi({
          param: {
            name: 'radius',
            in: 'query',
            description: 'Search radius in meters',
            required: false,
            schema: { type: 'integer', maximum: 200 },
          },
        }),
      include_shape: z
        .stringbool()
        .default(false)
        .exactOptional()
        .openapi({
          param: {
            name: 'include_shape',
            in: 'query',
            description: 'Include shape data',
            required: false,
            schema: { type: 'boolean', default: false },
          },
        }),
      include_count: z
        .stringbool()
        .default(false)
        .exactOptional()
        .openapi({
          param: {
            name: 'include_count',
            in: 'query',
            description: 'Include total count',
            required: false,
            schema: { type: 'boolean', default: false },
          },
        }),
      limit: z
        .int()
        .max(50)
        .default(10)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            description: 'Number of results',
            required: false,
            schema: { type: 'integer', default: 10, maximum: 50 },
          },
        }),
      offset: z
        .int()
        .default(0)
        .exactOptional()
        .openapi({
          param: {
            name: 'offset',
            in: 'query',
            description: 'Result offset',
            required: false,
            schema: { type: 'integer', default: 0 },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: z
            .object({
              status: z.enum(['success', 'zero results', 'error']),
              results: z.array(
                z
                  .object({
                    region: z.string(),
                    city: z.string(),
                    code: z.string(),
                    lat: z.string(),
                    lon: z.string(),
                  })
                  .openapi({ required: ['region', 'city', 'code', 'lat', 'lon'] }),
              ),
            })
            .openapi({ required: ['status', 'results'] }),
        },
      },
    },
  },
})

export const postApiV2PublicBookingAccountRegisterOauthIndexRoute = createRoute({
  method: 'post',
  path: '/api/v2/public/booking/account/register/oauth/',
  tags: ['v2/public/booking/account/register/oauth'],
  operationId: 'postApiV2PublicBookingAccountRegisterOauthIndex',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ account: z.object({}), profile: z.object({}) })
            .openapi({ required: ['account', 'profile'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Default Response',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string(), provisionalId: z.string().exactOptional() })
            .openapi({ required: ['message'] }),
        },
      },
    },
    404: {
      description: 'Default Response',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string(), provisionalId: z.string().exactOptional() })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const postApiV2PublicBookingAccountRegisterEmailRoute = createRoute({
  method: 'post',
  path: '/api/v2/public/booking/account/register/email',
  tags: ['v2/public/booking/account/register/email'],
  summary: 'Send registration URL via email',
  operationId: 'postApiV2PublicBookingAccountRegisterEmail',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({ email: z.email() }).openapi({ required: ['email'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Default Response',
      content: {
        'application/json': {
          schema: z.object({ message: z.string() }).openapi({ required: ['message'] }),
        },
      },
    },
  },
})
