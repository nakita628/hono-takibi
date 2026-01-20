import { createRoute, z } from '@hono/zod-openapi'

const ItemSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().exactOptional(),
    price: z.float64().min(0).exactOptional(),
    tags: z.array(z.string()).exactOptional(),
  })
  .openapi({ required: ['id', 'name'] })
  .readonly()
  .openapi('Item')

const ItemListSchema = z
  .object({ items: z.array(ItemSchema), total: z.int64(), page: z.int32(), limit: z.int32() })
  .openapi({ required: ['items', 'total', 'page', 'limit'] })
  .readonly()
  .openapi('ItemList')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string(), details: z.looseObject({}).exactOptional() })
  .openapi({ required: ['code', 'message'] })
  .readonly()
  .openapi('Error')

const PageParamParamsSchema = z
  .int32()
  .min(1)
  .default(1)
  .exactOptional()
  .openapi({
    param: {
      name: 'page',
      in: 'query',
      description: 'Page number (1-indexed)',
      required: false,
      schema: { type: 'integer', format: 'int32', minimum: 1, default: 1 },
    },
  })
  .readonly()

const LimitParamParamsSchema = z
  .int32()
  .min(1)
  .max(100)
  .default(20)
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      description: 'Items per page',
      required: false,
      schema: { type: 'integer', format: 'int32', minimum: 1, maximum: 100, default: 20 },
    },
  })
  .readonly()

const SortParamParamsSchema = z
  .string()
  .regex(/^[a-zA-Z_]+:(asc|desc)$/)
  .exactOptional()
  .openapi({
    param: {
      name: 'sort',
      in: 'query',
      description: 'Sort field and direction',
      required: false,
      schema: { type: 'string', pattern: '^[a-zA-Z_]+:(asc|desc)$' },
    },
  })
  .readonly()

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
  })
  .readonly()

const IfMatchHeaderParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: {
      name: 'If-Match',
      in: 'header',
      description: 'ETag for optimistic locking',
      required: false,
      schema: { type: 'string' },
    },
  })
  .readonly()

const BadRequestResponse = {
  description: 'Invalid request parameters',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

const UnauthorizedResponse = {
  description: 'Authentication required',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

const NotFoundResponse = {
  description: 'Resource not found',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

const PreconditionFailedResponse = {
  description: 'ETag mismatch',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

const InternalErrorResponse = {
  description: 'Internal server error',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

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
} as const)

export const getItemsItemIdRoute = createRoute({
  method: 'get',
  path: '/items/{itemId}',
  operationId: 'getItem',
  request: { params: z.object({ itemId: ItemIdPathParamsSchema }) },
  responses: {
    200: { description: 'Item details', content: { 'application/json': { schema: ItemSchema } } },
    404: NotFoundResponse,
  },
} as const)

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
} as const)
