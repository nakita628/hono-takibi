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
  .openapi('Item')

const ItemListSchema = z
  .object({ items: z.array(ItemSchema), total: z.int64(), page: z.int32(), limit: z.int32() })
  .openapi({ required: ['items', 'total', 'page', 'limit'] })
  .openapi('ItemList')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string(), details: z.looseObject({}).exactOptional() })
  .openapi({ required: ['code', 'message'] })
  .openapi('Error')

const PageParamParamsSchema = z
  .int32()
  .min(1)
  .default(1)
  .exactOptional()
  .openapi({
    param: { name: 'page', in: 'query', description: 'Page number (1-indexed)', required: false },
  })

const LimitParamParamsSchema = z
  .int32()
  .min(1)
  .max(100)
  .default(20)
  .exactOptional()
  .openapi({
    param: { name: 'limit', in: 'query', description: 'Items per page', required: false },
  })

const SortParamParamsSchema = z
  .string()
  .regex(/^[a-zA-Z_]+:(asc|desc)$/)
  .exactOptional()
  .openapi({
    param: { name: 'sort', in: 'query', description: 'Sort field and direction', required: false },
  })

const ItemIdPathParamsSchema = z
  .uuid()
  .openapi({
    param: { name: 'itemId', in: 'path', description: 'Item identifier', required: true },
  })

const IfMatchHeaderParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: {
      name: 'If-Match',
      in: 'header',
      description: 'ETag for optimistic locking',
      required: false,
    },
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
