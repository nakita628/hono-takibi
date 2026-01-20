import { createRoute, z } from '@hono/zod-openapi'

const ResourceSchema = z
  .object({
    id: z.string().exactOptional(),
    name: z.string().exactOptional(),
    data: z.object({}).exactOptional(),
  })
  .readonly()
  .openapi('Resource')

const XRequestIDHeaderSchema = z
  .uuid()
  .openapi({
    description: 'Unique request identifier for tracing',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  .readonly()

const XRateLimitLimitHeaderSchema = z
  .int32()
  .openapi({ description: 'Maximum requests per time window', example: 1000 })
  .readonly()

const XRateLimitRemainingHeaderSchema = z
  .int32()
  .openapi({ description: 'Remaining requests in current window', example: 999 })
  .readonly()

const XRateLimitResetHeaderSchema = z
  .int64()
  .openapi({ description: 'Unix timestamp when rate limit resets', example: 1640995200 })
  .readonly()

const ETagHeaderSchema = z
  .string()
  .openapi({
    description: 'Entity tag for cache validation',
    example: '"33a64df551425fcc55e4d42a148795d9f25f89d4"',
  })
  .readonly()

const LastModifiedHeaderSchema = z.iso
  .datetime()
  .exactOptional()
  .openapi({ description: 'Last modification timestamp', example: '2024-01-15T10:30:00Z' })
  .readonly()

const CacheControlHeaderSchema = z
  .string()
  .exactOptional()
  .openapi({ description: 'Caching directives', example: 'max-age=3600, must-revalidate' })
  .readonly()

const ContentDispositionHeaderSchema = z
  .string()
  .openapi({
    description: 'Content disposition for downloads',
    example: 'attachment; filename="document.pdf"',
  })
  .readonly()

const ContentLengthHeaderSchema = z
  .int64()
  .openapi({ description: 'Size in bytes', example: 1048576 })
  .readonly()

const XChecksumSHA256HeaderSchema = z
  .string()
  .exactOptional()
  .openapi({
    description: 'SHA256 checksum of content',
    example: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  })
  .readonly()

export const getResourcesRoute = createRoute({
  method: 'get',
  path: '/resources',
  operationId: 'listResources',
  request: {
    headers: z.object({
      'X-Request-ID': z
        .uuid()
        .exactOptional()
        .openapi({
          param: {
            name: 'X-Request-ID',
            in: 'header',
            required: false,
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'List of resources',
      headers: z.object({
        'X-Request-ID': XRequestIDHeaderSchema,
        'X-RateLimit-Limit': XRateLimitLimitHeaderSchema,
        'X-RateLimit-Remaining': XRateLimitRemainingHeaderSchema,
        'X-RateLimit-Reset': XRateLimitResetHeaderSchema,
      }),
      content: { 'application/json': { schema: z.array(ResourceSchema) } },
    },
  },
} as const)

export const getResourcesIdRoute = createRoute({
  method: 'get',
  path: '/resources/{id}',
  operationId: 'getResource',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
    headers: z.object({
      'If-None-Match': z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'If-None-Match',
            in: 'header',
            required: false,
            schema: { type: 'string' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'Resource details',
      headers: z.object({
        ETag: ETagHeaderSchema,
        'Last-Modified': LastModifiedHeaderSchema,
        'Cache-Control': CacheControlHeaderSchema,
      }),
      content: { 'application/json': { schema: ResourceSchema } },
    },
    304: { description: 'Not modified', headers: z.object({ ETag: ETagHeaderSchema }) },
  },
} as const)

export const putResourcesIdRoute = createRoute({
  method: 'put',
  path: '/resources/{id}',
  operationId: 'updateResource',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
    headers: z.object({
      'If-Match': z.string().openapi({
        param: { name: 'If-Match', in: 'header', required: true, schema: { type: 'string' } },
      }),
    }),
    body: { content: { 'application/json': { schema: ResourceSchema } } },
  },
  responses: {
    200: {
      description: 'Resource updated',
      headers: z.object({ ETag: ETagHeaderSchema, 'X-Request-ID': XRequestIDHeaderSchema }),
      content: { 'application/json': { schema: ResourceSchema } },
    },
    412: {
      description: 'Precondition failed',
      headers: z.object({ 'X-Request-ID': XRequestIDHeaderSchema }),
    },
  },
} as const)

export const getDownloadIdRoute = createRoute({
  method: 'get',
  path: '/download/{id}',
  operationId: 'downloadFile',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: {
      description: 'File download',
      headers: z.object({
        'Content-Disposition': ContentDispositionHeaderSchema,
        'Content-Length': ContentLengthHeaderSchema,
        'X-Checksum-SHA256': XChecksumSHA256HeaderSchema,
      }),
      content: { 'application/octet-stream': { schema: z.file() } },
    },
  },
} as const)
