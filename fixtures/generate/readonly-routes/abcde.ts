import { createRoute, z } from '@hono/zod-openapi'

const ASchema = z
  .object({ a: z.string().openapi({ example: 'a' }) })
  .openapi({ required: ['a'] })
  .readonly()
  .openapi('A')

const BSchema = z
  .object({ b: z.string().openapi({ example: 'b' }) })
  .openapi({ required: ['b'] })
  .readonly()
  .openapi('B')

const CSchema = z
  .object({ c: z.string().openapi({ example: 'c' }) })
  .openapi({ required: ['c'] })
  .readonly()
  .openapi('C')

const DSchema = z
  .object({ d: z.string().openapi({ example: 'd' }) })
  .openapi({ required: ['d'] })
  .readonly()
  .openapi('D')

const ESchema = z
  .object({ e: z.string().openapi({ example: 'e' }) })
  .openapi({ required: ['e'] })
  .readonly()
  .openapi('E')

export const getExampleRoute = createRoute({
  method: 'get',
  path: '/example',
  summary: 'Get example data',
  responses: { 200: { description: 'OK', content: { 'application/json': { schema: ASchema } } } },
} as const)
