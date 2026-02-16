import { createRoute, z } from '@hono/zod-openapi'

const ItemSchema = z
  .object({ id: z.int(), name: z.string(), createdAt: z.iso.datetime() })
  .openapi({ required: ['id', 'name', 'createdAt'] })
  .openapi('Item')

const ItemUpdateSchema = z.object({ name: z.string().exactOptional() }).openapi('ItemUpdate')

const LimitParamParamsSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', default: 20, minimum: 1, maximum: 100 },
    },
  })

const OffsetParamParamsSchema = z
  .int()
  .min(0)
  .default(0)
  .exactOptional()
  .openapi({
    param: { name: 'offset', in: 'query', schema: { type: 'integer', default: 0, minimum: 0 } },
  })

export const getItemsItemIdRoute = createRoute({
  method: 'get',
  path: '/items/{itemId}',
  operationId: 'getItem',
  request: {
    params: z.object({
      itemId: z
        .int()
        .openapi({
          param: { name: 'itemId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    headers: z.object({
      version: z
        .string()
        .default('1')
        .exactOptional()
        .openapi({
          param: { name: 'version', in: 'header', schema: { type: 'string', default: '1' } },
        }),
    }),
    query: z.object({
      fields: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'fields', in: 'query', schema: { type: 'string' } } }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ItemSchema } } },
  },
})

export const putItemsItemIdRoute = createRoute({
  method: 'put',
  path: '/items/{itemId}',
  operationId: 'updateItem',
  request: {
    params: z.object({
      itemId: z
        .int()
        .openapi({
          param: { name: 'itemId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    headers: z.object({
      version: z
        .string()
        .openapi({
          param: { name: 'version', in: 'header', required: true, schema: { type: 'string' } },
        }),
    }),
    body: { content: { 'application/json': { schema: ItemUpdateSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ItemSchema } } },
  },
})

export const deleteItemsItemIdRoute = createRoute({
  method: 'delete',
  path: '/items/{itemId}',
  operationId: 'deleteItem',
  request: {
    params: z.object({
      itemId: z
        .int()
        .openapi({
          param: { name: 'itemId', in: 'path', required: true, schema: { type: 'integer' } },
        }),
    }),
    headers: z.object({
      version: z
        .string()
        .default('1')
        .exactOptional()
        .openapi({
          param: { name: 'version', in: 'header', schema: { type: 'string', default: '1' } },
        }),
    }),
  },
  responses: { 204: { description: 'Deleted' } },
})

export const getItemsRoute = createRoute({
  method: 'get',
  path: '/items',
  operationId: 'listItems',
  request: {
    query: z.object({
      limit: LimitParamParamsSchema,
      offset: OffsetParamParamsSchema,
      sort: z
        .enum(['name', 'created', 'updated'])
        .exactOptional()
        .openapi({
          param: {
            name: 'sort',
            in: 'query',
            schema: { type: 'string', enum: ['name', 'created', 'updated'] },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ items: z.array(ItemSchema), total: z.int() })
            .openapi({ required: ['items', 'total'] }),
        },
      },
    },
  },
})
