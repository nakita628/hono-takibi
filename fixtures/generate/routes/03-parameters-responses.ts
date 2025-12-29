import { createRoute, z } from '@hono/zod-openapi'

const ItemSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    price: z.float64().min(0).optional().openapi({ type: 'number', format: 'float64', minimum: 0 }),
    tags: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      description: { type: 'string' },
      price: { type: 'number', format: 'float64', minimum: 0 },
      tags: { type: 'array', items: { type: 'string' } },
    },
  })

const ItemListSchema = z
  .object({
    items: z
      .array(ItemSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/Item' } }),
    total: z.int64().openapi({ type: 'integer', format: 'int64' }),
    page: z.int32().openapi({ type: 'integer', format: 'int32' }),
    limit: z.int32().openapi({ type: 'integer', format: 'int32' }),
  })
  .openapi({
    type: 'object',
    required: ['items', 'total', 'page', 'limit'],
    properties: {
      items: { type: 'array', items: { $ref: '#/components/schemas/Item' } },
      total: { type: 'integer', format: 'int64' },
      page: { type: 'integer', format: 'int32' },
      limit: { type: 'integer', format: 'int32' },
    },
  })

const ErrorSchema = z
  .object({
    code: z.string().openapi({ type: 'string' }),
    message: z.string().openapi({ type: 'string' }),
    details: z.looseObject({}).openapi({ type: 'object', additionalProperties: true }),
  })
  .openapi({
    type: 'object',
    required: ['code', 'message'],
    properties: {
      code: { type: 'string' },
      message: { type: 'string' },
      details: { type: 'object', additionalProperties: true },
    },
  })

const PageParamParamsSchema = z
  .int32()
  .min(1)
  .default(1)
  .optional()
  .openapi({
    param: {
      name: 'page',
      in: 'query',
      description: 'Page number (1-indexed)',
      required: false,
      schema: { type: 'integer', format: 'int32', minimum: 1, default: 1 },
    },
    type: 'integer',
    format: 'int32',
    minimum: 1,
    default: 1,
  })

const LimitParamParamsSchema = z
  .int32()
  .min(1)
  .max(100)
  .default(20)
  .optional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      description: 'Items per page',
      required: false,
      schema: { type: 'integer', format: 'int32', minimum: 1, maximum: 100, default: 20 },
    },
    type: 'integer',
    format: 'int32',
    minimum: 1,
    maximum: 100,
    default: 20,
  })

const SortParamParamsSchema = z
  .string()
  .regex(/^[a-zA-Z_]+:(asc|desc)$/)
  .optional()
  .openapi({
    param: {
      name: 'sort',
      in: 'query',
      description: 'Sort field and direction',
      required: false,
      schema: { type: 'string', pattern: '^[a-zA-Z_]+:(asc|desc)$' },
    },
    type: 'string',
    pattern: '^[a-zA-Z_]+:(asc|desc)$',
  })

const ItemIdPathParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'itemId',
      in: 'path',
      description: 'Item identifier',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
    type: 'string',
    format: 'uuid',
  })

const IfMatchHeaderParamsSchema = z
  .string()
  .optional()
  .openapi({
    param: {
      name: 'If-Match',
      in: 'header',
      description: 'ETag for optimistic locking',
      required: false,
      schema: { type: 'string' },
    },
    type: 'string',
  })

const BadRequestResponse = {
  description: 'Invalid request parameters',
  content: { 'application/json': { schema: ErrorSchema } },
}

const UnauthorizedResponse = {
  description: 'Authentication required',
  content: { 'application/json': { schema: ErrorSchema } },
}

const NotFoundResponse = {
  description: 'Resource not found',
  content: { 'application/json': { schema: ErrorSchema } },
}

const PreconditionFailedResponse = {
  description: 'ETag mismatch',
  content: { 'application/json': { schema: ErrorSchema } },
}

const InternalErrorResponse = {
  description: 'Internal server error',
  content: { 'application/json': { schema: ErrorSchema } },
}

export const getItemsRoute = createRoute({
  method: 'get',
  path: '/items',
  operationId: 'listItems',
  request: {
    query: z.object({
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
      sort: SortParamParamsSchema,
    }),
  },
  responses: {
    200: {
      description: 'Paginated list of items',
      content: { 'application/json': { schema: ItemListSchema } },
    },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
    500: InternalErrorResponse,
  },
})

export const getItemsItemIdRoute = createRoute({
  method: 'get',
  path: '/items/{itemId}',
  operationId: 'getItem',
  request: { params: z.object({ itemId: ItemIdPathParamsSchema }) },
  responses: {
    200: { description: 'Item details', content: { 'application/json': { schema: ItemSchema } } },
    404: NotFoundResponse,
  },
})

export const deleteItemsItemIdRoute = createRoute({
  method: 'delete',
  path: '/items/{itemId}',
  operationId: 'deleteItem',
  request: {
    params: z.object({ itemId: ItemIdPathParamsSchema }),
    headers: z.object({ 'If-Match': IfMatchHeaderParamsSchema }),
  },
  responses: {
    204: { description: 'Item deleted' },
    404: NotFoundResponse,
    412: PreconditionFailedResponse,
  },
})
