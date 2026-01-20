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
  })
  .readonly()

const ReusablePaginationParamsSchema = z
  .object({
    page: z.int().min(1).default(1).exactOptional(),
    limit: z.int().min(1).max(100).default(20).exactOptional(),
    cursor: z.string().exactOptional(),
  })
  .exactOptional()
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
  })
  .readonly()

export const getAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10Route = createRoute({
  method: 'get',
  path: '/a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}',
  operationId: 'getManyPathParams',
  request: {
    params: z.object({
      p1: z
        .string()
        .openapi({ param: { name: 'p1', in: 'path', required: true, schema: { type: 'string' } } }),
      p2: z.int().openapi({
        param: { name: 'p2', in: 'path', required: true, schema: { type: 'integer' } },
      }),
      p3: z.uuid().openapi({
        param: {
          name: 'p3',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
      p4: z.iso.date().openapi({
        param: {
          name: 'p4',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'date' },
        },
      }),
      p5: z
        .number()
        .openapi({ param: { name: 'p5', in: 'path', required: true, schema: { type: 'number' } } }),
      p6: z.boolean().openapi({
        param: { name: 'p6', in: 'path', required: true, schema: { type: 'boolean' } },
      }),
      p7: z.enum(['a', 'b', 'c']).openapi({
        param: {
          name: 'p7',
          in: 'path',
          required: true,
          schema: { type: 'string', enum: ['a', 'b', 'c'] },
        },
      }),
      p8: z.int64().openapi({
        param: {
          name: 'p8',
          in: 'path',
          required: true,
          schema: { type: 'integer', format: 'int64' },
        },
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
        }),
      p10: z.string().openapi({
        param: { name: 'p10', in: 'path', required: true, schema: { type: 'string' } },
      }),
    }),
  },
  responses: { 200: { description: 'OK' } },
} as const)

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
            .exactOptional()
            .openapi({
              param: {
                name: 'formExplode',
                in: 'query',
                style: 'form',
                explode: true,
                schema: { type: 'array', items: { type: 'string' } },
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'formExplode',
            in: 'query',
            style: 'form',
            explode: true,
            schema: { type: 'array', items: { type: 'string' } },
          },
        }),
      formNoExplode: z
        .array(
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'formNoExplode',
                in: 'query',
                style: 'form',
                explode: false,
                schema: { type: 'array', items: { type: 'string' } },
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'formNoExplode',
            in: 'query',
            style: 'form',
            explode: false,
            schema: { type: 'array', items: { type: 'string' } },
          },
        }),
      spaceDelimited: z
        .array(
          z
            .int()
            .exactOptional()
            .openapi({
              param: {
                name: 'spaceDelimited',
                in: 'query',
                style: 'spaceDelimited',
                explode: false,
                schema: { type: 'array', items: { type: 'integer' } },
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'spaceDelimited',
            in: 'query',
            style: 'spaceDelimited',
            explode: false,
            schema: { type: 'array', items: { type: 'integer' } },
          },
        }),
      pipeDelimited: z
        .array(
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'pipeDelimited',
                in: 'query',
                style: 'pipeDelimited',
                explode: false,
                schema: { type: 'array', items: { type: 'string' } },
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'pipeDelimited',
            in: 'query',
            style: 'pipeDelimited',
            explode: false,
            schema: { type: 'array', items: { type: 'string' } },
          },
        }),
      deepObject: z
        .object({
          level1: z
            .object({ level2: z.object({ value: z.string().exactOptional() }).exactOptional() })
            .exactOptional(),
          array: z.array(z.string()).exactOptional(),
        })
        .exactOptional()
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
        }),
      formObject: z
        .object({ key1: z.string().exactOptional(), key2: z.int().exactOptional() })
        .exactOptional()
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
        }),
      formObjectNoExplode: z
        .object({ a: z.string().exactOptional(), b: z.string().exactOptional() })
        .exactOptional()
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
        }),
      allowEmpty: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'allowEmpty',
            in: 'query',
            allowEmptyValue: true,
            schema: { type: 'string' },
          },
        }),
      allowReserved: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'allowReserved',
            in: 'query',
            allowReserved: true,
            schema: { type: 'string' },
          },
        }),
      complexDeep: z
        .object({
          filters: z
            .object({
              status: z.array(z.string()).exactOptional(),
              dateRange: z
                .object({ from: z.iso.date().exactOptional(), to: z.iso.date().exactOptional() })
                .exactOptional(),
            })
            .exactOptional(),
          pagination: z
            .object({ page: z.int().exactOptional(), limit: z.int().exactOptional() })
            .exactOptional(),
          sort: z
            .array(
              z.object({
                field: z.string().exactOptional(),
                order: z.enum(['asc', 'desc']).exactOptional(),
              }),
            )
            .exactOptional(),
        })
        .exactOptional()
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
        }),
    }),
  },
  responses: { 200: { description: 'OK' } },
} as const)

export const getPathStylesSimpleLabelMatrixRoute = createRoute({
  method: 'get',
  path: '/path-styles/{simple}/{label}/{matrix}',
  operationId: 'getPathStyles',
  request: {
    params: z.object({
      simple: z
        .array(
          z.string().openapi({
            param: {
              name: 'simple',
              in: 'path',
              required: true,
              style: 'simple',
              explode: false,
              schema: { type: 'array', items: { type: 'string' } },
            },
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
        }),
      label: z
        .array(
          z.string().openapi({
            param: {
              name: 'label',
              in: 'path',
              required: true,
              style: 'label',
              explode: false,
              schema: { type: 'array', items: { type: 'string' } },
            },
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
        }),
      matrix: z.object({ x: z.int().exactOptional(), y: z.int().exactOptional() }).openapi({
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
      }),
    }),
  },
  responses: { 200: { description: 'OK' } },
} as const)

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
            .exactOptional()
            .openapi({
              param: {
                name: 'X-Simple-Array',
                in: 'header',
                style: 'simple',
                explode: false,
                schema: { type: 'array', items: { type: 'string' } },
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'X-Simple-Array',
            in: 'header',
            style: 'simple',
            explode: false,
            schema: { type: 'array', items: { type: 'string' } },
          },
        }),
      'X-Simple-Array-Exploded': z
        .array(
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'X-Simple-Array-Exploded',
                in: 'header',
                style: 'simple',
                explode: true,
                schema: { type: 'array', items: { type: 'string' } },
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'X-Simple-Array-Exploded',
            in: 'header',
            style: 'simple',
            explode: true,
            schema: { type: 'array', items: { type: 'string' } },
          },
        }),
      'X-Object-Header': z
        .object({ key1: z.string().exactOptional(), key2: z.string().exactOptional() })
        .exactOptional()
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
        }),
      'X-Custom-1': z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'X-Custom-1', in: 'header', schema: { type: 'string' } } }),
      'X-Custom-2': z
        .int()
        .exactOptional()
        .openapi({ param: { name: 'X-Custom-2', in: 'header', schema: { type: 'integer' } } }),
      'X-Custom-3': z
        .boolean()
        .exactOptional()
        .openapi({ param: { name: 'X-Custom-3', in: 'header', schema: { type: 'boolean' } } }),
      'X-Custom-4': z
        .number()
        .exactOptional()
        .openapi({ param: { name: 'X-Custom-4', in: 'header', schema: { type: 'number' } } }),
      'X-Custom-5': z.iso
        .datetime()
        .exactOptional()
        .openapi({
          param: {
            name: 'X-Custom-5',
            in: 'header',
            schema: { type: 'string', format: 'date-time' },
          },
        }),
      Accept: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'Accept', in: 'header', schema: { type: 'string' } } }),
      'Accept-Language': z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'Accept-Language', in: 'header', schema: { type: 'string' } } }),
      'Accept-Encoding': z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'Accept-Encoding', in: 'header', schema: { type: 'string' } } }),
      'Cache-Control': z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'Cache-Control', in: 'header', schema: { type: 'string' } } }),
      'If-Match': z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'If-Match', in: 'header', schema: { type: 'string' } } }),
      'If-None-Match': z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'If-None-Match', in: 'header', schema: { type: 'string' } } }),
      'If-Modified-Since': z.iso
        .datetime()
        .exactOptional()
        .openapi({
          param: {
            name: 'If-Modified-Since',
            in: 'header',
            schema: { type: 'string', format: 'date-time' },
          },
        }),
      'If-Unmodified-Since': z.iso
        .datetime()
        .exactOptional()
        .openapi({
          param: {
            name: 'If-Unmodified-Since',
            in: 'header',
            schema: { type: 'string', format: 'date-time' },
          },
        }),
      Authorization: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'Authorization', in: 'header', schema: { type: 'string' } } }),
      'X-Request-ID': z
        .uuid()
        .exactOptional()
        .openapi({
          param: { name: 'X-Request-ID', in: 'header', schema: { type: 'string', format: 'uuid' } },
        }),
      'X-Correlation-ID': z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'X-Correlation-ID', in: 'header', schema: { type: 'string' } } }),
      'X-Forwarded-For': z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'X-Forwarded-For', in: 'header', schema: { type: 'string' } } }),
      'X-Real-IP': z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'X-Real-IP', in: 'header', schema: { type: 'string' } } }),
      'User-Agent': z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'User-Agent', in: 'header', schema: { type: 'string' } } }),
    }),
  },
  responses: { 200: { description: 'OK' } },
} as const)

export const getCookieStylesRoute = createRoute({
  method: 'get',
  path: '/cookie-styles',
  operationId: 'getCookieStyles',
  request: {
    cookies: z.object({
      session_id: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'session_id', in: 'cookie', schema: { type: 'string' } } }),
      preferences: z
        .object({ theme: z.string().exactOptional(), language: z.string().exactOptional() })
        .exactOptional()
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
        }),
      user_id: z
        .uuid()
        .exactOptional()
        .openapi({
          param: { name: 'user_id', in: 'cookie', schema: { type: 'string', format: 'uuid' } },
        }),
      access_token: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'access_token', in: 'cookie', schema: { type: 'string' } } }),
      refresh_token: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'refresh_token', in: 'cookie', schema: { type: 'string' } } }),
      consent: z
        .boolean()
        .exactOptional()
        .openapi({ param: { name: 'consent', in: 'cookie', schema: { type: 'boolean' } } }),
      tracking_id: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'tracking_id', in: 'cookie', schema: { type: 'string' } } }),
      cart_id: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'cart_id', in: 'cookie', schema: { type: 'string' } } }),
      visited: z
        .array(
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'visited',
                in: 'cookie',
                schema: { type: 'array', items: { type: 'string' } },
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'visited',
            in: 'cookie',
            schema: { type: 'array', items: { type: 'string' } },
          },
        }),
    }),
  },
  responses: { 200: { description: 'OK' } },
} as const)

export const getManyQueryParamsRoute = createRoute({
  method: 'get',
  path: '/many-query-params',
  operationId: 'getManyQueryParams',
  request: {
    query: z.object({
      q: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'q', in: 'query', schema: { type: 'string' } } }),
      page: z
        .int()
        .exactOptional()
        .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer' } } }),
      limit: z
        .int()
        .exactOptional()
        .openapi({ param: { name: 'limit', in: 'query', schema: { type: 'integer' } } }),
      offset: z
        .int()
        .exactOptional()
        .openapi({ param: { name: 'offset', in: 'query', schema: { type: 'integer' } } }),
      sort: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'sort', in: 'query', schema: { type: 'string' } } }),
      order: z
        .enum(['asc', 'desc'])
        .exactOptional()
        .openapi({
          param: { name: 'order', in: 'query', schema: { type: 'string', enum: ['asc', 'desc'] } },
        }),
      fields: z
        .array(
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'fields',
                in: 'query',
                schema: { type: 'array', items: { type: 'string' } },
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'fields',
            in: 'query',
            schema: { type: 'array', items: { type: 'string' } },
          },
        }),
      include: z
        .array(
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'include',
                in: 'query',
                schema: { type: 'array', items: { type: 'string' } },
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'include',
            in: 'query',
            schema: { type: 'array', items: { type: 'string' } },
          },
        }),
      exclude: z
        .array(
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'exclude',
                in: 'query',
                schema: { type: 'array', items: { type: 'string' } },
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'exclude',
            in: 'query',
            schema: { type: 'array', items: { type: 'string' } },
          },
        }),
      filter: z
        .object({})
        .exactOptional()
        .openapi({
          param: { name: 'filter', in: 'query', style: 'deepObject', schema: { type: 'object' } },
        }),
      status: z
        .array(
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'status',
                in: 'query',
                schema: { type: 'array', items: { type: 'string' } },
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            schema: { type: 'array', items: { type: 'string' } },
          },
        }),
      type: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'type', in: 'query', schema: { type: 'string' } } }),
      category: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'category', in: 'query', schema: { type: 'string' } } }),
      tags: z
        .array(
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'tags',
                in: 'query',
                schema: { type: 'array', items: { type: 'string' } },
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'tags',
            in: 'query',
            schema: { type: 'array', items: { type: 'string' } },
          },
        }),
      minPrice: z.coerce
        .number()
        .exactOptional()
        .openapi({ param: { name: 'minPrice', in: 'query', schema: { type: 'number' } } }),
      maxPrice: z.coerce
        .number()
        .exactOptional()
        .openapi({ param: { name: 'maxPrice', in: 'query', schema: { type: 'number' } } }),
      minDate: z.iso
        .date()
        .exactOptional()
        .openapi({
          param: { name: 'minDate', in: 'query', schema: { type: 'string', format: 'date' } },
        }),
      maxDate: z.iso
        .date()
        .exactOptional()
        .openapi({
          param: { name: 'maxDate', in: 'query', schema: { type: 'string', format: 'date' } },
        }),
      active: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'active', in: 'query', schema: { type: 'boolean' } } }),
      verified: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'verified', in: 'query', schema: { type: 'boolean' } } }),
      featured: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'featured', in: 'query', schema: { type: 'boolean' } } }),
      promoted: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'promoted', in: 'query', schema: { type: 'boolean' } } }),
      archived: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'archived', in: 'query', schema: { type: 'boolean' } } }),
      deleted: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'deleted', in: 'query', schema: { type: 'boolean' } } }),
      createdBy: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'createdBy', in: 'query', schema: { type: 'string' } } }),
      updatedBy: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'updatedBy', in: 'query', schema: { type: 'string' } } }),
      ownerId: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'ownerId', in: 'query', schema: { type: 'string' } } }),
      groupId: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'groupId', in: 'query', schema: { type: 'string' } } }),
      teamId: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'teamId', in: 'query', schema: { type: 'string' } } }),
      projectId: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'projectId', in: 'query', schema: { type: 'string' } } }),
      workspaceId: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'workspaceId', in: 'query', schema: { type: 'string' } } }),
      organizationId: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'organizationId', in: 'query', schema: { type: 'string' } } }),
      locale: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'locale', in: 'query', schema: { type: 'string' } } }),
      timezone: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'timezone', in: 'query', schema: { type: 'string' } } }),
      currency: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'currency', in: 'query', schema: { type: 'string' } } }),
      format: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'format', in: 'query', schema: { type: 'string' } } }),
      version: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'version', in: 'query', schema: { type: 'string' } } }),
      beta: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'beta', in: 'query', schema: { type: 'boolean' } } }),
      debug: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'debug', in: 'query', schema: { type: 'boolean' } } }),
      trace: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'trace', in: 'query', schema: { type: 'boolean' } } }),
      verbose: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'verbose', in: 'query', schema: { type: 'boolean' } } }),
      callback: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'callback', in: 'query', schema: { type: 'string' } } }),
      jsonp: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'jsonp', in: 'query', schema: { type: 'string' } } }),
      envelope: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'envelope', in: 'query', schema: { type: 'boolean' } } }),
      pretty: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'pretty', in: 'query', schema: { type: 'boolean' } } }),
      compress: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'compress', in: 'query', schema: { type: 'boolean' } } }),
      cache: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'cache', in: 'query', schema: { type: 'boolean' } } }),
      timeout: z
        .int()
        .exactOptional()
        .openapi({ param: { name: 'timeout', in: 'query', schema: { type: 'integer' } } }),
    }),
  },
  responses: { 200: { description: 'OK' } },
} as const)

export const getParameterContentRoute = createRoute({
  method: 'get',
  path: '/parameter-content',
  operationId: 'getParameterContent',
  request: {
    query: z.object({
      jsonFilter: z
        .object({
          field: z.string().exactOptional(),
          operator: z.string().exactOptional(),
          value: z.string().exactOptional(),
        })
        .exactOptional()
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
        }),
      complexQuery: z
        .object({
          filters: z
            .array(
              z.object({
                field: z.string().exactOptional(),
                op: z.string().exactOptional(),
                val: z.any().exactOptional(),
              }),
            )
            .exactOptional(),
          logic: z.enum(['and', 'or']).exactOptional(),
        })
        .exactOptional()
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
        }),
    }),
    headers: z.object({
      'X-Metadata': z
        .object({
          requestId: z.string().exactOptional(),
          timestamp: z.iso.datetime().exactOptional(),
          source: z.string().exactOptional(),
        })
        .exactOptional()
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
        }),
    }),
  },
  responses: { 200: { description: 'OK' } },
} as const)

export const getDeprecatedParamsRoute = createRoute({
  method: 'get',
  path: '/deprecated-params',
  operationId: 'getDeprecatedParams',
  request: {
    query: z.object({
      oldParam: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'oldParam',
            in: 'query',
            deprecated: true,
            schema: { type: 'string' },
            description: 'This parameter is deprecated',
          },
        }),
      legacyFilter: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'legacyFilter',
            in: 'query',
            deprecated: true,
            schema: { type: 'string' },
          },
        }),
      newParam: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'newParam',
            in: 'query',
            schema: { type: 'string' },
            description: 'Use this instead of oldParam',
          },
        }),
    }),
    headers: z.object({
      'X-Legacy-Header': z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'X-Legacy-Header',
            in: 'header',
            deprecated: true,
            schema: { type: 'string' },
          },
        }),
    }),
  },
  responses: { 200: { description: 'OK' } },
} as const)

export const getExamplesParamsRoute = createRoute({
  method: 'get',
  path: '/examples-params',
  operationId: 'getExamplesParams',
  request: {
    query: z.object({
      status: z
        .enum(['active', 'inactive', 'pending'])
        .exactOptional()
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
        }),
      ids: z
        .array(
          z
            .uuid()
            .exactOptional()
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
            }),
        )
        .exactOptional()
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
        }),
      filter: z
        .object({ status: z.string().exactOptional(), date: z.iso.date().exactOptional() })
        .exactOptional()
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
        }),
    }),
  },
  responses: { 200: { description: 'OK' } },
} as const)
