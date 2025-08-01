import { createRoute, z } from '@hono/zod-openapi'
import { boolean } from '../src/generator/zod/z'

const HonoSchema = z.object({ hono: z.enum(['Hono', 'HonoX', 'ZodOpenAPIHono']) }).openapi('Hono')

export const postHonoRoute = createRoute({
  tags: ['Hono'],
  method: 'post',
  path: '/hono',
  operationId: 'HonoService_create',
  request: { body: { required: true, content: { 'application/json': { schema: HonoSchema } } } },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: HonoSchema } },
    },
  },
})
