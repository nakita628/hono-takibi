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

const X_Request_IDHeaderSchema = z
  .uuid()
  .openapi({
    type: 'string',
    format: 'uuid',
    description: 'Unique request identifier for tracing',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })

const X_RateLimit_LimitHeaderSchema = z
  .int32()
  .openapi({
    type: 'integer',
    format: 'int32',
    description: 'Maximum requests per time window',
    example: 1000,
  })

const X_RateLimit_RemainingHeaderSchema = z
  .int32()
  .openapi({
    type: 'integer',
    format: 'int32',
    description: 'Remaining requests in current window',
    example: 999,
  })

const X_RateLimit_ResetHeaderSchema = z
  .int64()
  .openapi({
    type: 'integer',
    format: 'int64',
    description: 'Unix timestamp when rate limit resets',
    example: 1640995200,
  })

const ETagHeaderSchema = z
  .string()
  .openapi({
    type: 'string',
    description: 'Entity tag for cache validation',
    example: '"33a64df551425fcc55e4d42a148795d9f25f89d4"',
  })

const Last_ModifiedHeaderSchema = z.iso
  .datetime()
  .optional()
  .openapi({
    type: 'string',
    format: 'date-time',
    description: 'Last modification timestamp',
    example: '2024-01-15T10:30:00Z',
  })

const Cache_ControlHeaderSchema = z
  .string()
  .optional()
  .openapi({
    type: 'string',
    description: 'Caching directives',
    example: 'max-age=3600, must-revalidate',
  })

const Content_DispositionHeaderSchema = z
  .string()
  .openapi({
    type: 'string',
    description: 'Content disposition for downloads',
    example: 'attachment; filename="document.pdf"',
  })

const Content_LengthHeaderSchema = z
  .int64()
  .openapi({ type: 'integer', format: 'int64', description: 'Size in bytes', example: 1048576 })

const X_Checksum_SHA256HeaderSchema = z
  .string()
  .optional()
  .openapi({
    type: 'string',
    description: 'SHA256 checksum of content',
    example: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
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
