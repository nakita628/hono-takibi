import { createRoute, z } from '@hono/zod-openapi'

const ResourceSchema = z
  .object({
    id: z.string().optional().openapi({ type: 'string' }),
    name: z.string().optional().openapi({ type: 'string' }),
    data: z.object({}).openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    properties: { id: { type: 'string' }, name: { type: 'string' }, data: { type: 'object' } },
  })
  .openapi('Resource')

const XRequestIDHeader = z
  .uuid()
  .openapi({
    description: 'Unique request identifier for tracing',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: 'string',
    format: 'uuid',
  })

const XRateLimitLimitHeader = z
  .int32()
  .openapi({
    description: 'Maximum requests per time window',
    example: 1000,
    type: 'integer',
    format: 'int32',
  })

const XRateLimitRemainingHeader = z
  .int32()
  .openapi({
    description: 'Remaining requests in current window',
    example: 999,
    type: 'integer',
    format: 'int32',
  })

const XRateLimitResetHeader = z
  .int64()
  .openapi({
    description: 'Unix timestamp when rate limit resets',
    example: 1640995200,
    type: 'integer',
    format: 'int64',
  })

const ETagHeader = z
  .string()
  .openapi({
    description: 'Entity tag for cache validation',
    example: '"33a64df551425fcc55e4d42a148795d9f25f89d4"',
    type: 'string',
  })

const LastModifiedHeader = z.iso
  .datetime()
  .optional()
  .openapi({
    description: 'Last modification timestamp',
    example: '2024-01-15T10:30:00Z',
    type: 'string',
    format: 'date-time',
  })

const CacheControlHeader = z
  .string()
  .optional()
  .openapi({
    description: 'Caching directives',
    example: 'max-age=3600, must-revalidate',
    type: 'string',
  })

const ContentDispositionHeader = z
  .string()
  .openapi({
    description: 'Content disposition for downloads',
    example: 'attachment; filename="document.pdf"',
    type: 'string',
  })

const ContentLengthHeader = z
  .int64()
  .openapi({ description: 'Size in bytes', example: 1048576, type: 'integer', format: 'int64' })

const XChecksumSHA256Header = z
  .string()
  .optional()
  .openapi({
    description: 'SHA256 checksum of content',
    example: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    type: 'string',
  })

export const getResourcesRoute = createRoute({
  method: 'get',
  path: '/resources',
  operationId: 'listResources',
  request: {
    headers: z.object({
      'X-Request-ID': z
        .uuid()
        .optional()
        .openapi({
          param: {
            name: 'X-Request-ID',
            in: 'header',
            required: false,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: {
      description: 'List of resources',
      content: {
        'application/json': {
          schema: z
            .array(ResourceSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Resource' } }),
        },
      },
    },
  },
})

export const getResourcesIdRoute = createRoute({
  method: 'get',
  path: '/resources/{id}',
  operationId: 'getResource',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({
          param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
    headers: z.object({
      'If-None-Match': z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'If-None-Match',
            in: 'header',
            required: false,
            schema: { type: 'string' },
          },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: 'Resource details',
      content: { 'application/json': { schema: ResourceSchema } },
    },
    304: { description: 'Not modified' },
  },
})

export const putResourcesIdRoute = createRoute({
  method: 'put',
  path: '/resources/{id}',
  operationId: 'updateResource',
  request: { body: { content: { 'application/json': { schema: ResourceSchema } } } },
  responses: {
    200: {
      description: 'Resource updated',
      content: { 'application/json': { schema: ResourceSchema } },
    },
    412: { description: 'Precondition failed' },
  },
})

export const getDownloadIdRoute = createRoute({
  method: 'get',
  path: '/download/{id}',
  operationId: 'downloadFile',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({
          param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: {
    200: {
      description: 'File download',
      content: {
        'application/octet-stream': {
          schema: z.file().optional().openapi({ type: 'string', format: 'binary' }),
        },
      },
    },
  },
})
