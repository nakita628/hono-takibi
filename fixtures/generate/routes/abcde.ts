import { createRoute, z } from '@hono/zod-openapi'

const ASchema = z
  .object({ a: z.string().openapi({ example: 'a' }) })
  .openapi({ required: ['a'] })
  .openapi('A')

const BSchema = z
  .object({ b: z.string().openapi({ example: 'b' }) })
  .openapi({ required: ['b'] })
  .openapi('B')

const CSchema = z
  .object({ c: z.string().openapi({ example: 'c' }) })
  .openapi({ required: ['c'] })
  .openapi('C')

const DSchema = z
  .object({ d: z.string().openapi({ example: 'd' }) })
  .openapi({ required: ['d'] })
  .openapi('D')

const ESchema = z
  .object({ e: z.string().openapi({ example: 'e' }) })
  .openapi({ required: ['e'] })
  .openapi('E')

export const getExampleRoute = createRoute({
  method: 'get',
  path: '/example',
  summary: 'Get example data',
  responses: { 200: { description: 'OK', content: { 'application/json': { schema: ASchema } } } },
})
