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

const X_Request_IDHeader = z.uuid().optional().openapi({ type: 'string', format: 'uuid' })

const X_RateLimit_LimitHeader = z.int32().optional().openapi({ type: 'integer', format: 'int32' })

const X_RateLimit_RemainingHeader = z
  .int32()
  .optional()
  .openapi({ type: 'integer', format: 'int32' })

const X_RateLimit_ResetHeader = z.int64().optional().openapi({ type: 'integer', format: 'int64' })

const ETagHeader = z.string().optional().openapi({ type: 'string' })

const Last_ModifiedHeader = z.iso
  .datetime()
  .optional()
  .openapi({ type: 'string', format: 'date-time' })

const Cache_ControlHeader = z.string().optional().openapi({ type: 'string' })

const Content_DispositionHeader = z.string().optional().openapi({ type: 'string' })

const Content_LengthHeader = z.int64().optional().openapi({ type: 'integer', format: 'int64' })

const X_Checksum_SHA256Header = z.string().optional().openapi({ type: 'string' })

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
