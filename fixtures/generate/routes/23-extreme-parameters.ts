import { createRoute, z } from '@hono/zod-openapi'

const ReusableIdParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'id',
      in: 'path',
      required: true,
      description: 'Resource identifier',
      schema: { type: 'string', format: 'uuid' },
      example: '550e8400-e29b-41d4-a716-446655440000',
    },
    type: 'string',
    format: 'uuid',
  })

const ReusablePaginationParamsSchema = z
  .object({
    page: z.int().min(1).default(1).openapi({ type: 'integer', minimum: 1, default: 1 }),
    limit: z
      .int()
      .min(1)
      .max(100)
      .default(20)
      .openapi({ type: 'integer', minimum: 1, maximum: 100, default: 20 }),
    cursor: z.string().openapi({ type: 'string' }),
  })
  .partial()
  .openapi({
    param: {
      name: 'pagination',
      in: 'query',
      style: 'deepObject',
      schema: {
        type: 'object',
        properties: {
          page: { type: 'integer', minimum: 1, default: 1 },
          limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
          cursor: { type: 'string' },
        },
      },
      examples: {
        firstPage: { value: { page: 1, limit: 20 } },
        cursorBased: { value: { cursor: 'eyJpZCI6MTAwfQ==', limit: 50 } },
      },
    },
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
      cursor: { type: 'string' },
    },
  })

export const getAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10Route = createRoute({
  method: 'get',
  path: '/a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}',
  operationId: 'getManyPathParams',
  request: {
    params: z.object({
      p1: z
        .string()
        .openapi({
          param: { name: 'p1', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
      p2: z
        .int()
        .openapi({
          param: { name: 'p2', in: 'path', required: true, schema: { type: 'integer' } },
          type: 'integer',
        }),
      p3: z
        .uuid()
        .openapi({
          param: {
            name: 'p3',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
      p4: z.iso
        .date()
        .openapi({
          param: {
            name: 'p4',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'date' },
          },
          type: 'string',
          format: 'date',
        }),
      p5: z
        .number()
        .openapi({
          param: { name: 'p5', in: 'path', required: true, schema: { type: 'number' } },
          type: 'number',
        }),
      p6: z
        .boolean()
        .openapi({
          param: { name: 'p6', in: 'path', required: true, schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      p7: z
        .enum(['a', 'b', 'c'])
        .openapi({
          param: {
            name: 'p7',
            in: 'path',
            required: true,
            schema: { type: 'string', enum: ['a', 'b', 'c'] },
          },
          type: 'string',
          enum: ['a', 'b', 'c'],
        }),
      p8: z
        .int64()
        .openapi({
          param: {
            name: 'p8',
            in: 'path',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
          type: 'integer',
          format: 'int64',
        }),
      p9: z
        .string()
        .regex(/^[a-z]+$/)
        .openapi({
          param: {
            name: 'p9',
            in: 'path',
            required: true,
            schema: { type: 'string', pattern: '^[a-z]+$' },
          },
          type: 'string',
          pattern: '^[a-z]+$',
        }),
      p10: z
        .string()
        .openapi({
          param: { name: 'p10', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: { 200: { description: 'OK' } },
})

export const getQueryStylesRoute = createRoute({
  method: 'get',
  path: '/query-styles',
  operationId: 'getQueryStyles',
  request: {
    query: z.object({
      formExplode: z
        .array(
          z
            .string()
            .optional()
            .openapi({
              param: {
                name: 'formExplode',
                in: 'query',
                style: 'form',
                explode: true,
                schema: { type: 'array', items: { type: 'string' } },
              },
              type: 'string',
            }),
        )
        .optional()
        .openapi({
          param: {
            name: 'formExplode',
            in: 'query',
            style: 'form',
            explode: true,
            schema: { type: 'array', items: { type: 'string' } },
          },
          type: 'array',
          items: { type: 'string' },
        }),
      formNoExplode: z
        .array(
          z
            .string()
            .optional()
            .openapi({
              param: {
                name: 'formNoExplode',
                in: 'query',
                style: 'form',
                explode: false,
                schema: { type: 'array', items: { type: 'string' } },
              },
              type: 'string',
            }),
        )
        .optional()
        .openapi({
          param: {
            name: 'formNoExplode',
            in: 'query',
            style: 'form',
            explode: false,
            schema: { type: 'array', items: { type: 'string' } },
          },
          type: 'array',
          items: { type: 'string' },
        }),
      spaceDelimited: z
        .array(
          z
            .int()
            .optional()
            .openapi({
              param: {
                name: 'spaceDelimited',
                in: 'query',
                style: 'spaceDelimited',
                explode: false,
                schema: { type: 'array', items: { type: 'integer' } },
              },
              type: 'integer',
            }),
        )
        .optional()
        .openapi({
          param: {
            name: 'spaceDelimited',
            in: 'query',
            style: 'spaceDelimited',
            explode: false,
            schema: { type: 'array', items: { type: 'integer' } },
          },
          type: 'array',
          items: { type: 'integer' },
        }),
      pipeDelimited: z
        .array(
          z
            .string()
            .optional()
            .openapi({
              param: {
                name: 'pipeDelimited',
                in: 'query',
                style: 'pipeDelimited',
                explode: false,
                schema: { type: 'array', items: { type: 'string' } },
              },
              type: 'string',
            }),
        )
        .optional()
        .openapi({
          param: {
            name: 'pipeDelimited',
            in: 'query',
            style: 'pipeDelimited',
            explode: false,
            schema: { type: 'array', items: { type: 'string' } },
          },
          type: 'array',
          items: { type: 'string' },
        }),
      deepObject: z
        .object({
          level1: z
            .object({
              level2: z
                .object({ value: z.string().openapi({ type: 'string' }) })
                .partial()
                .openapi({ type: 'object', properties: { value: { type: 'string' } } }),
            })
            .openapi({
              type: 'object',
              properties: { level2: { type: 'object', properties: { value: { type: 'string' } } } },
            }),
          array: z
            .array(z.string().optional().openapi({ type: 'string' }))
            .optional()
            .openapi({ type: 'array', items: { type: 'string' } }),
        })
        .openapi({
          param: {
            name: 'deepObject',
            in: 'query',
            style: 'deepObject',
            explode: true,
            schema: {
              type: 'object',
              properties: {
                level1: {
                  type: 'object',
                  properties: {
                    level2: { type: 'object', properties: { value: { type: 'string' } } },
                  },
                },
                array: { type: 'array', items: { type: 'string' } },
              },
            },
          },
          type: 'object',
          properties: {
            level1: {
              type: 'object',
              properties: { level2: { type: 'object', properties: { value: { type: 'string' } } } },
            },
            array: { type: 'array', items: { type: 'string' } },
          },
        }),
      formObject: z
        .object({
          key1: z.string().openapi({ type: 'string' }),
          key2: z.int().openapi({ type: 'integer' }),
        })
        .partial()
        .openapi({
          param: {
            name: 'formObject',
            in: 'query',
            style: 'form',
            explode: true,
            schema: {
              type: 'object',
              properties: { key1: { type: 'string' }, key2: { type: 'integer' } },
            },
          },
          type: 'object',
          properties: { key1: { type: 'string' }, key2: { type: 'integer' } },
        }),
      formObjectNoExplode: z
        .object({
          a: z.string().openapi({ type: 'string' }),
          b: z.string().openapi({ type: 'string' }),
        })
        .partial()
        .openapi({
          param: {
            name: 'formObjectNoExplode',
            in: 'query',
            style: 'form',
            explode: false,
            schema: {
              type: 'object',
              properties: { a: { type: 'string' }, b: { type: 'string' } },
            },
          },
          type: 'object',
          properties: { a: { type: 'string' }, b: { type: 'string' } },
        }),
      allowEmpty: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'allowEmpty',
            in: 'query',
            allowEmptyValue: true,
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      allowReserved: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'allowReserved',
            in: 'query',
            allowReserved: true,
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      complexDeep: z
        .object({
          filters: z
            .object({
              status: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
              dateRange: z
                .object({
                  from: z.iso.date().openapi({ type: 'string', format: 'date' }),
                  to: z.iso.date().openapi({ type: 'string', format: 'date' }),
                })
                .partial()
                .openapi({
                  type: 'object',
                  properties: {
                    from: { type: 'string', format: 'date' },
                    to: { type: 'string', format: 'date' },
                  },
                }),
            })
            .openapi({
              type: 'object',
              properties: {
                status: { type: 'array', items: { type: 'string' } },
                dateRange: {
                  type: 'object',
                  properties: {
                    from: { type: 'string', format: 'date' },
                    to: { type: 'string', format: 'date' },
                  },
                },
              },
            }),
          pagination: z
            .object({
              page: z.int().openapi({ type: 'integer' }),
              limit: z.int().openapi({ type: 'integer' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: { page: { type: 'integer' }, limit: { type: 'integer' } },
            }),
          sort: z
            .array(
              z
                .object({
                  field: z.string().openapi({ type: 'string' }),
                  order: z.enum(['asc', 'desc']).openapi({ type: 'string', enum: ['asc', 'desc'] }),
                })
                .partial()
                .openapi({
                  type: 'object',
                  properties: {
                    field: { type: 'string' },
                    order: { type: 'string', enum: ['asc', 'desc'] },
                  },
                }),
            )
            .optional()
            .openapi({
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  order: { type: 'string', enum: ['asc', 'desc'] },
                },
              },
            }),
        })
        .openapi({
          param: {
            name: 'complexDeep',
            in: 'query',
            style: 'deepObject',
            schema: {
              type: 'object',
              properties: {
                filters: {
                  type: 'object',
                  properties: {
                    status: { type: 'array', items: { type: 'string' } },
                    dateRange: {
                      type: 'object',
                      properties: {
                        from: { type: 'string', format: 'date' },
                        to: { type: 'string', format: 'date' },
                      },
                    },
                  },
                },
                pagination: {
                  type: 'object',
                  properties: { page: { type: 'integer' }, limit: { type: 'integer' } },
                },
                sort: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      field: { type: 'string' },
                      order: { type: 'string', enum: ['asc', 'desc'] },
                    },
                  },
                },
              },
            },
          },
          type: 'object',
          properties: {
            filters: {
              type: 'object',
              properties: {
                status: { type: 'array', items: { type: 'string' } },
                dateRange: {
                  type: 'object',
                  properties: {
                    from: { type: 'string', format: 'date' },
                    to: { type: 'string', format: 'date' },
                  },
                },
              },
            },
            pagination: {
              type: 'object',
              properties: { page: { type: 'integer' }, limit: { type: 'integer' } },
            },
            sort: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  order: { type: 'string', enum: ['asc', 'desc'] },
                },
              },
            },
          },
        }),
    }),
  },
  responses: { 200: { description: 'OK' } },
})

export const getPathStylesSimpleLabelMatrixRoute = createRoute({
  method: 'get',
  path: '/path-styles/{simple}/{label}/{matrix}',
  operationId: 'getPathStyles',
  request: {
    params: z.object({
      simple: z
        .array(
          z
            .string()
            .openapi({
              param: {
                name: 'simple',
                in: 'path',
                required: true,
                style: 'simple',
                explode: false,
                schema: { type: 'array', items: { type: 'string' } },
              },
              type: 'string',
            }),
        )
        .openapi({
          param: {
            name: 'simple',
            in: 'path',
            required: true,
            style: 'simple',
            explode: false,
            schema: { type: 'array', items: { type: 'string' } },
          },
          type: 'array',
          items: { type: 'string' },
        }),
      label: z
        .array(
          z
            .string()
            .openapi({
              param: {
                name: 'label',
                in: 'path',
                required: true,
                style: 'label',
                explode: false,
                schema: { type: 'array', items: { type: 'string' } },
              },
              type: 'string',
            }),
        )
        .openapi({
          param: {
            name: 'label',
            in: 'path',
            required: true,
            style: 'label',
            explode: false,
            schema: { type: 'array', items: { type: 'string' } },
          },
          type: 'array',
          items: { type: 'string' },
        }),
      matrix: z
        .object({
          x: z.int().openapi({ type: 'integer' }),
          y: z.int().openapi({ type: 'integer' }),
        })
        .partial()
        .openapi({
          param: {
            name: 'matrix',
            in: 'path',
            required: true,
            style: 'matrix',
            explode: false,
            schema: {
              type: 'object',
              properties: { x: { type: 'integer' }, y: { type: 'integer' } },
            },
          },
          type: 'object',
          properties: { x: { type: 'integer' }, y: { type: 'integer' } },
        }),
    }),
  },
  responses: { 200: { description: 'OK' } },
})

export const getHeaderStylesRoute = createRoute({
  method: 'get',
  path: '/header-styles',
  operationId: 'getHeaderStyles',
  request: {
    headers: z.object({
      'X-Simple-Array': z
        .array(
          z
            .string()
            .optional()
            .openapi({
              param: {
                name: 'X-Simple-Array',
                in: 'header',
                style: 'simple',
                explode: false,
                schema: { type: 'array', items: { type: 'string' } },
              },
              type: 'string',
            }),
        )
        .optional()
        .openapi({
          param: {
            name: 'X-Simple-Array',
            in: 'header',
            style: 'simple',
            explode: false,
            schema: { type: 'array', items: { type: 'string' } },
          },
          type: 'array',
          items: { type: 'string' },
        }),
      'X-Simple-Array-Exploded': z
        .array(
          z
            .string()
            .optional()
            .openapi({
              param: {
                name: 'X-Simple-Array-Exploded',
                in: 'header',
                style: 'simple',
                explode: true,
                schema: { type: 'array', items: { type: 'string' } },
              },
              type: 'string',
            }),
        )
        .optional()
        .openapi({
          param: {
            name: 'X-Simple-Array-Exploded',
            in: 'header',
            style: 'simple',
            explode: true,
            schema: { type: 'array', items: { type: 'string' } },
          },
          type: 'array',
          items: { type: 'string' },
        }),
      'X-Object-Header': z
        .object({
          key1: z.string().openapi({ type: 'string' }),
          key2: z.string().openapi({ type: 'string' }),
        })
        .partial()
        .openapi({
          param: {
            name: 'X-Object-Header',
            in: 'header',
            style: 'simple',
            explode: false,
            schema: {
              type: 'object',
              properties: { key1: { type: 'string' }, key2: { type: 'string' } },
            },
          },
          type: 'object',
          properties: { key1: { type: 'string' }, key2: { type: 'string' } },
        }),
      'X-Custom-1': z
        .string()
        .optional()
        .openapi({
          param: { name: 'X-Custom-1', in: 'header', schema: { type: 'string' } },
          type: 'string',
        }),
      'X-Custom-2': z
        .int()
        .optional()
        .openapi({
          param: { name: 'X-Custom-2', in: 'header', schema: { type: 'integer' } },
          type: 'integer',
        }),
      'X-Custom-3': z
        .boolean()
        .optional()
        .openapi({
          param: { name: 'X-Custom-3', in: 'header', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      'X-Custom-4': z
        .number()
        .optional()
        .openapi({
          param: { name: 'X-Custom-4', in: 'header', schema: { type: 'number' } },
          type: 'number',
        }),
      'X-Custom-5': z.iso
        .datetime()
        .optional()
        .openapi({
          param: {
            name: 'X-Custom-5',
            in: 'header',
            schema: { type: 'string', format: 'date-time' },
          },
          type: 'string',
          format: 'date-time',
        }),
      Accept: z
        .string()
        .optional()
        .openapi({
          param: { name: 'Accept', in: 'header', schema: { type: 'string' } },
          type: 'string',
        }),
      'Accept-Language': z
        .string()
        .optional()
        .openapi({
          param: { name: 'Accept-Language', in: 'header', schema: { type: 'string' } },
          type: 'string',
        }),
      'Accept-Encoding': z
        .string()
        .optional()
        .openapi({
          param: { name: 'Accept-Encoding', in: 'header', schema: { type: 'string' } },
          type: 'string',
        }),
      'Cache-Control': z
        .string()
        .optional()
        .openapi({
          param: { name: 'Cache-Control', in: 'header', schema: { type: 'string' } },
          type: 'string',
        }),
      'If-Match': z
        .string()
        .optional()
        .openapi({
          param: { name: 'If-Match', in: 'header', schema: { type: 'string' } },
          type: 'string',
        }),
      'If-None-Match': z
        .string()
        .optional()
        .openapi({
          param: { name: 'If-None-Match', in: 'header', schema: { type: 'string' } },
          type: 'string',
        }),
      'If-Modified-Since': z.iso
        .datetime()
        .optional()
        .openapi({
          param: {
            name: 'If-Modified-Since',
            in: 'header',
            schema: { type: 'string', format: 'date-time' },
          },
          type: 'string',
          format: 'date-time',
        }),
      'If-Unmodified-Since': z.iso
        .datetime()
        .optional()
        .openapi({
          param: {
            name: 'If-Unmodified-Since',
            in: 'header',
            schema: { type: 'string', format: 'date-time' },
          },
          type: 'string',
          format: 'date-time',
        }),
      Authorization: z
        .string()
        .optional()
        .openapi({
          param: { name: 'Authorization', in: 'header', schema: { type: 'string' } },
          type: 'string',
        }),
      'X-Request-ID': z
        .uuid()
        .optional()
        .openapi({
          param: { name: 'X-Request-ID', in: 'header', schema: { type: 'string', format: 'uuid' } },
          type: 'string',
          format: 'uuid',
        }),
      'X-Correlation-ID': z
        .string()
        .optional()
        .openapi({
          param: { name: 'X-Correlation-ID', in: 'header', schema: { type: 'string' } },
          type: 'string',
        }),
      'X-Forwarded-For': z
        .string()
        .optional()
        .openapi({
          param: { name: 'X-Forwarded-For', in: 'header', schema: { type: 'string' } },
          type: 'string',
        }),
      'X-Real-IP': z
        .string()
        .optional()
        .openapi({
          param: { name: 'X-Real-IP', in: 'header', schema: { type: 'string' } },
          type: 'string',
        }),
      'User-Agent': z
        .string()
        .optional()
        .openapi({
          param: { name: 'User-Agent', in: 'header', schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: { 200: { description: 'OK' } },
})

export const getCookieStylesRoute = createRoute({
  method: 'get',
  path: '/cookie-styles',
  operationId: 'getCookieStyles',
  request: {
    cookies: z.object({
      session_id: z
        .string()
        .optional()
        .openapi({
          param: { name: 'session_id', in: 'cookie', schema: { type: 'string' } },
          type: 'string',
        }),
      preferences: z
        .object({
          theme: z.string().openapi({ type: 'string' }),
          language: z.string().openapi({ type: 'string' }),
        })
        .partial()
        .openapi({
          param: {
            name: 'preferences',
            in: 'cookie',
            style: 'form',
            explode: true,
            schema: {
              type: 'object',
              properties: { theme: { type: 'string' }, language: { type: 'string' } },
            },
          },
          type: 'object',
          properties: { theme: { type: 'string' }, language: { type: 'string' } },
        }),
      user_id: z
        .uuid()
        .optional()
        .openapi({
          param: { name: 'user_id', in: 'cookie', schema: { type: 'string', format: 'uuid' } },
          type: 'string',
          format: 'uuid',
        }),
      access_token: z
        .string()
        .optional()
        .openapi({
          param: { name: 'access_token', in: 'cookie', schema: { type: 'string' } },
          type: 'string',
        }),
      refresh_token: z
        .string()
        .optional()
        .openapi({
          param: { name: 'refresh_token', in: 'cookie', schema: { type: 'string' } },
          type: 'string',
        }),
      consent: z
        .boolean()
        .optional()
        .openapi({
          param: { name: 'consent', in: 'cookie', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      tracking_id: z
        .string()
        .optional()
        .openapi({
          param: { name: 'tracking_id', in: 'cookie', schema: { type: 'string' } },
          type: 'string',
        }),
      cart_id: z
        .string()
        .optional()
        .openapi({
          param: { name: 'cart_id', in: 'cookie', schema: { type: 'string' } },
          type: 'string',
        }),
      visited: z
        .array(
          z
            .string()
            .optional()
            .openapi({
              param: {
                name: 'visited',
                in: 'cookie',
                schema: { type: 'array', items: { type: 'string' } },
              },
              type: 'string',
            }),
        )
        .optional()
        .openapi({
          param: {
            name: 'visited',
            in: 'cookie',
            schema: { type: 'array', items: { type: 'string' } },
          },
          type: 'array',
          items: { type: 'string' },
        }),
    }),
  },
  responses: { 200: { description: 'OK' } },
})

export const getManyQueryParamsRoute = createRoute({
  method: 'get',
  path: '/many-query-params',
  operationId: 'getManyQueryParams',
  request: {
    query: z.object({
      q: z
        .string()
        .optional()
        .openapi({ param: { name: 'q', in: 'query', schema: { type: 'string' } }, type: 'string' }),
      page: z
        .int()
        .optional()
        .openapi({
          param: { name: 'page', in: 'query', schema: { type: 'integer' } },
          type: 'integer',
        }),
      limit: z
        .int()
        .optional()
        .openapi({
          param: { name: 'limit', in: 'query', schema: { type: 'integer' } },
          type: 'integer',
        }),
      offset: z
        .int()
        .optional()
        .openapi({
          param: { name: 'offset', in: 'query', schema: { type: 'integer' } },
          type: 'integer',
        }),
      sort: z
        .string()
        .optional()
        .openapi({
          param: { name: 'sort', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      order: z
        .enum(['asc', 'desc'])
        .optional()
        .openapi({
          param: { name: 'order', in: 'query', schema: { type: 'string', enum: ['asc', 'desc'] } },
          type: 'string',
          enum: ['asc', 'desc'],
        }),
      fields: z
        .array(
          z
            .string()
            .optional()
            .openapi({
              param: {
                name: 'fields',
                in: 'query',
                schema: { type: 'array', items: { type: 'string' } },
              },
              type: 'string',
            }),
        )
        .optional()
        .openapi({
          param: {
            name: 'fields',
            in: 'query',
            schema: { type: 'array', items: { type: 'string' } },
          },
          type: 'array',
          items: { type: 'string' },
        }),
      include: z
        .array(
          z
            .string()
            .optional()
            .openapi({
              param: {
                name: 'include',
                in: 'query',
                schema: { type: 'array', items: { type: 'string' } },
              },
              type: 'string',
            }),
        )
        .optional()
        .openapi({
          param: {
            name: 'include',
            in: 'query',
            schema: { type: 'array', items: { type: 'string' } },
          },
          type: 'array',
          items: { type: 'string' },
        }),
      exclude: z
        .array(
          z
            .string()
            .optional()
            .openapi({
              param: {
                name: 'exclude',
                in: 'query',
                schema: { type: 'array', items: { type: 'string' } },
              },
              type: 'string',
            }),
        )
        .optional()
        .openapi({
          param: {
            name: 'exclude',
            in: 'query',
            schema: { type: 'array', items: { type: 'string' } },
          },
          type: 'array',
          items: { type: 'string' },
        }),
      filter: z
        .object({})
        .openapi({
          param: { name: 'filter', in: 'query', style: 'deepObject', schema: { type: 'object' } },
          type: 'object',
        }),
      status: z
        .array(
          z
            .string()
            .optional()
            .openapi({
              param: {
                name: 'status',
                in: 'query',
                schema: { type: 'array', items: { type: 'string' } },
              },
              type: 'string',
            }),
        )
        .optional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            schema: { type: 'array', items: { type: 'string' } },
          },
          type: 'array',
          items: { type: 'string' },
        }),
      type: z
        .string()
        .optional()
        .openapi({
          param: { name: 'type', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      category: z
        .string()
        .optional()
        .openapi({
          param: { name: 'category', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      tags: z
        .array(
          z
            .string()
            .optional()
            .openapi({
              param: {
                name: 'tags',
                in: 'query',
                schema: { type: 'array', items: { type: 'string' } },
              },
              type: 'string',
            }),
        )
        .optional()
        .openapi({
          param: {
            name: 'tags',
            in: 'query',
            schema: { type: 'array', items: { type: 'string' } },
          },
          type: 'array',
          items: { type: 'string' },
        }),
      minPrice: z.coerce
        .number()
        .optional()
        .openapi({
          param: { name: 'minPrice', in: 'query', schema: { type: 'number' } },
          type: 'number',
        }),
      maxPrice: z.coerce
        .number()
        .optional()
        .openapi({
          param: { name: 'maxPrice', in: 'query', schema: { type: 'number' } },
          type: 'number',
        }),
      minDate: z.iso
        .date()
        .optional()
        .openapi({
          param: { name: 'minDate', in: 'query', schema: { type: 'string', format: 'date' } },
          type: 'string',
          format: 'date',
        }),
      maxDate: z.iso
        .date()
        .optional()
        .openapi({
          param: { name: 'maxDate', in: 'query', schema: { type: 'string', format: 'date' } },
          type: 'string',
          format: 'date',
        }),
      active: z
        .stringbool()
        .optional()
        .openapi({
          param: { name: 'active', in: 'query', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      verified: z
        .stringbool()
        .optional()
        .openapi({
          param: { name: 'verified', in: 'query', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      featured: z
        .stringbool()
        .optional()
        .openapi({
          param: { name: 'featured', in: 'query', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      promoted: z
        .stringbool()
        .optional()
        .openapi({
          param: { name: 'promoted', in: 'query', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      archived: z
        .stringbool()
        .optional()
        .openapi({
          param: { name: 'archived', in: 'query', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      deleted: z
        .stringbool()
        .optional()
        .openapi({
          param: { name: 'deleted', in: 'query', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      createdBy: z
        .string()
        .optional()
        .openapi({
          param: { name: 'createdBy', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      updatedBy: z
        .string()
        .optional()
        .openapi({
          param: { name: 'updatedBy', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      ownerId: z
        .string()
        .optional()
        .openapi({
          param: { name: 'ownerId', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      groupId: z
        .string()
        .optional()
        .openapi({
          param: { name: 'groupId', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      teamId: z
        .string()
        .optional()
        .openapi({
          param: { name: 'teamId', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      projectId: z
        .string()
        .optional()
        .openapi({
          param: { name: 'projectId', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      workspaceId: z
        .string()
        .optional()
        .openapi({
          param: { name: 'workspaceId', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      organizationId: z
        .string()
        .optional()
        .openapi({
          param: { name: 'organizationId', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      locale: z
        .string()
        .optional()
        .openapi({
          param: { name: 'locale', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      timezone: z
        .string()
        .optional()
        .openapi({
          param: { name: 'timezone', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      currency: z
        .string()
        .optional()
        .openapi({
          param: { name: 'currency', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      format: z
        .string()
        .optional()
        .openapi({
          param: { name: 'format', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      version: z
        .string()
        .optional()
        .openapi({
          param: { name: 'version', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      beta: z
        .stringbool()
        .optional()
        .openapi({
          param: { name: 'beta', in: 'query', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      debug: z
        .stringbool()
        .optional()
        .openapi({
          param: { name: 'debug', in: 'query', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      trace: z
        .stringbool()
        .optional()
        .openapi({
          param: { name: 'trace', in: 'query', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      verbose: z
        .stringbool()
        .optional()
        .openapi({
          param: { name: 'verbose', in: 'query', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      callback: z
        .string()
        .optional()
        .openapi({
          param: { name: 'callback', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      jsonp: z
        .string()
        .optional()
        .openapi({
          param: { name: 'jsonp', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      envelope: z
        .stringbool()
        .optional()
        .openapi({
          param: { name: 'envelope', in: 'query', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      pretty: z
        .stringbool()
        .optional()
        .openapi({
          param: { name: 'pretty', in: 'query', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      compress: z
        .stringbool()
        .optional()
        .openapi({
          param: { name: 'compress', in: 'query', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      cache: z
        .stringbool()
        .optional()
        .openapi({
          param: { name: 'cache', in: 'query', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
      timeout: z
        .int()
        .optional()
        .openapi({
          param: { name: 'timeout', in: 'query', schema: { type: 'integer' } },
          type: 'integer',
        }),
    }),
  },
  responses: { 200: { description: 'OK' } },
})

export const getParameterContentRoute = createRoute({
  method: 'get',
  path: '/parameter-content',
  operationId: 'getParameterContent',
  request: {
    query: z.object({
      jsonFilter: z
        .object({
          field: z.string().openapi({ type: 'string' }),
          operator: z.string().openapi({ type: 'string' }),
          value: z.string().openapi({ type: 'string' }),
        })
        .partial()
        .openapi({
          param: {
            name: 'jsonFilter',
            in: 'query',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    field: { type: 'string' },
                    operator: { type: 'string' },
                    value: { type: 'string' },
                  },
                },
              },
            },
          },
          type: 'object',
          properties: {
            field: { type: 'string' },
            operator: { type: 'string' },
            value: { type: 'string' },
          },
        }),
      complexQuery: z
        .object({
          filters: z
            .array(
              z
                .object({
                  field: z.string().openapi({ type: 'string' }),
                  op: z.string().openapi({ type: 'string' }),
                  val: z.any(),
                })
                .partial()
                .openapi({
                  type: 'object',
                  properties: { field: { type: 'string' }, op: { type: 'string' }, val: {} },
                }),
            )
            .openapi({
              type: 'array',
              items: {
                type: 'object',
                properties: { field: { type: 'string' }, op: { type: 'string' }, val: {} },
              },
            }),
          logic: z.enum(['and', 'or']).openapi({ type: 'string', enum: ['and', 'or'] }),
        })
        .partial()
        .openapi({
          param: {
            name: 'complexQuery',
            in: 'query',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    filters: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: { field: { type: 'string' }, op: { type: 'string' }, val: {} },
                      },
                    },
                    logic: { type: 'string', enum: ['and', 'or'] },
                  },
                },
              },
            },
          },
          type: 'object',
          properties: {
            filters: {
              type: 'array',
              items: {
                type: 'object',
                properties: { field: { type: 'string' }, op: { type: 'string' }, val: {} },
              },
            },
            logic: { type: 'string', enum: ['and', 'or'] },
          },
        }),
    }),
    headers: z.object({
      'X-Metadata': z
        .object({
          requestId: z.string().openapi({ type: 'string' }),
          timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
          source: z.string().openapi({ type: 'string' }),
        })
        .partial()
        .openapi({
          param: {
            name: 'X-Metadata',
            in: 'header',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    requestId: { type: 'string' },
                    timestamp: { type: 'string', format: 'date-time' },
                    source: { type: 'string' },
                  },
                },
              },
            },
          },
          type: 'object',
          properties: {
            requestId: { type: 'string' },
            timestamp: { type: 'string', format: 'date-time' },
            source: { type: 'string' },
          },
        }),
    }),
  },
  responses: { 200: { description: 'OK' } },
})

export const getDeprecatedParamsRoute = createRoute({
  method: 'get',
  path: '/deprecated-params',
  operationId: 'getDeprecatedParams',
  request: {
    query: z.object({
      oldParam: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'oldParam',
            in: 'query',
            deprecated: true,
            schema: { type: 'string' },
            description: 'This parameter is deprecated',
          },
          type: 'string',
        }),
      legacyFilter: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'legacyFilter',
            in: 'query',
            deprecated: true,
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      newParam: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'newParam',
            in: 'query',
            schema: { type: 'string' },
            description: 'Use this instead of oldParam',
          },
          type: 'string',
        }),
    }),
    headers: z.object({
      'X-Legacy-Header': z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'X-Legacy-Header',
            in: 'header',
            deprecated: true,
            schema: { type: 'string' },
          },
          type: 'string',
        }),
    }),
  },
  responses: { 200: { description: 'OK' } },
})

export const getExamplesParamsRoute = createRoute({
  method: 'get',
  path: '/examples-params',
  operationId: 'getExamplesParams',
  request: {
    query: z.object({
      status: z
        .enum(['active', 'inactive', 'pending'])
        .optional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            schema: { type: 'string', enum: ['active', 'inactive', 'pending'] },
            examples: {
              active: { summary: 'Active status', value: 'active' },
              inactive: { summary: 'Inactive status', value: 'inactive' },
              pending: { summary: 'Pending status', value: 'pending' },
            },
          },
          type: 'string',
          enum: ['active', 'inactive', 'pending'],
        }),
      ids: z
        .array(
          z
            .uuid()
            .optional()
            .openapi({
              param: {
                name: 'ids',
                in: 'query',
                schema: { type: 'array', items: { type: 'string', format: 'uuid' } },
                examples: {
                  single: { summary: 'Single ID', value: ['550e8400-e29b-41d4-a716-446655440000'] },
                  multiple: {
                    summary: 'Multiple IDs',
                    value: [
                      '550e8400-e29b-41d4-a716-446655440000',
                      '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
                      '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
                    ],
                  },
                },
              },
              type: 'string',
              format: 'uuid',
            }),
        )
        .optional()
        .openapi({
          param: {
            name: 'ids',
            in: 'query',
            schema: { type: 'array', items: { type: 'string', format: 'uuid' } },
            examples: {
              single: { summary: 'Single ID', value: ['550e8400-e29b-41d4-a716-446655440000'] },
              multiple: {
                summary: 'Multiple IDs',
                value: [
                  '550e8400-e29b-41d4-a716-446655440000',
                  '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
                  '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
                ],
              },
            },
          },
          type: 'array',
          items: { type: 'string', format: 'uuid' },
        }),
      filter: z
        .object({
          status: z.string().openapi({ type: 'string' }),
          date: z.iso.date().openapi({ type: 'string', format: 'date' }),
        })
        .partial()
        .openapi({
          param: {
            name: 'filter',
            in: 'query',
            style: 'deepObject',
            schema: {
              type: 'object',
              properties: { status: { type: 'string' }, date: { type: 'string', format: 'date' } },
            },
            examples: {
              simpleFilter: { summary: 'Simple filter', value: { status: 'active' } },
              dateFilter: {
                summary: 'Date filter',
                value: { status: 'active', date: '2024-01-15' },
              },
            },
          },
          type: 'object',
          properties: { status: { type: 'string' }, date: { type: 'string', format: 'date' } },
        }),
    }),
  },
  responses: { 200: { description: 'OK' } },
})
