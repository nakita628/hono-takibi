import { createRoute, z } from '@hono/zod-openapi'

export const HonoSchema = z
  .object({ hono: z.enum(['Hono', 'HonoX', 'ZodOpenAPIHono']) })
  .openapi('Hono')

export type Hono = z.infer<typeof HonoSchema>

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
