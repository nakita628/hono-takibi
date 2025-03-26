import { createRoute, z } from '@hono/zod-openapi'

const aSchema = z.object({ a: z.string().openapi({ example: 'a' }) }).openapi('A')

const bSchema = z.object({ b: z.string().openapi({ example: 'b' }) }).openapi('B')

const cSchema = z.object({ c: z.string().openapi({ example: 'c' }) }).openapi('C')

const dSchema = z.object({ d: z.string().openapi({ example: 'd' }) }).openapi('D')

const eSchema = z.object({ e: z.string().openapi({ example: 'e' }) }).openapi('E')

export const getExampleRoute = createRoute({
  tags: [],
  method: 'get',
  path: '/example',
  summary: 'Get example data',
  responses: { 200: { description: 'OK', content: { 'application/json': { schema: aSchema } } } },
})
