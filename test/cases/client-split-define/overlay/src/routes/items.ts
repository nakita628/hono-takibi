import { createRoute, defineOpenAPIRoute, z } from '@hono/zod-openapi'

import { ItemSchema } from '../components'

export const getItemsRoute = defineOpenAPIRoute({
  route: createRoute({
    method: 'get',
    path: '/items',
    request: {
      query: z.object({
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' &&
              /^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val) &&
              (!/^-?\d+$/.test(val) || Number.isSafeInteger(Number(val)))
                ? Number(val)
                : val,
            z.int(),
          )
          .exactOptional()
          .openapi({
            param: { name: 'limit', in: 'query', schema: { type: 'integer' }, required: false },
          }),
      }),
    },
    responses: {
      200: { description: 'ok', content: { 'application/json': { schema: z.array(ItemSchema) } } },
    },
  }),
  handler: async (c) => c.json([{ id: 1, title: 'first' }], 200),
  addRoute: true,
})

export const postItemsIdSharesRoute = defineOpenAPIRoute({
  route: createRoute({
    method: 'post',
    path: '/items/{id}/shares',
    request: {
      params: z.object({
        id: z
          .preprocess(
            (val) =>
              typeof val === 'string' &&
              /^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val) &&
              (!/^-?\d+$/.test(val) || Number.isSafeInteger(Number(val)))
                ? Number(val)
                : val,
            z.int(),
          )
          .openapi({
            param: { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
          }),
      }),
    },
    responses: {
      201: { description: 'created', content: { 'application/json': { schema: ItemSchema } } },
    },
  }),
  handler: async (c) => c.json({ id: c.req.valid('param').id, title: 'shared' }, 201),
  addRoute: true,
})
