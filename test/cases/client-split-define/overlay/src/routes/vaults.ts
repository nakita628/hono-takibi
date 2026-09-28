import { createRoute, defineOpenAPIRoute, z } from '@hono/zod-openapi'

import { VaultSchema } from '../components'

export const getVaultsRoute = defineOpenAPIRoute({
  route: createRoute({
    method: 'get',
    path: '/vaults',
    responses: {
      200: { description: 'ok', content: { 'application/json': { schema: z.array(VaultSchema) } } },
    },
  }),
  handler: async (c) => c.json([{ id: 1, name: 'personal' }], 200),
  addRoute: true,
})

export const postVaultsRoute = defineOpenAPIRoute({
  route: createRoute({
    method: 'post',
    path: '/vaults',
    request: {
      body: {
        content: {
          'application/json': {
            schema: z.object({ name: z.string() }).openapi({ required: ['name'] }),
          },
        },
        required: true,
      },
    },
    responses: {
      201: { description: 'created', content: { 'application/json': { schema: VaultSchema } } },
    },
  }),
  handler: async (c) => c.json({ id: 2, name: c.req.valid('json').name }, 201),
  addRoute: true,
})

export const getVaultsIdRoute = defineOpenAPIRoute({
  route: createRoute({
    method: 'get',
    path: '/vaults/{id}',
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
      200: { description: 'ok', content: { 'application/json': { schema: VaultSchema } } },
    },
  }),
  handler: async (c) => c.json({ id: c.req.valid('param').id, name: 'personal' }, 200),
  addRoute: true,
})
