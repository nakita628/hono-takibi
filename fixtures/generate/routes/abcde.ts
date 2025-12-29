import { createRoute, z } from '@hono/zod-openapi'

const ASchema = z
  .object({ a: z.string().openapi({ type: 'string', example: 'a' }) })
  .openapi({ type: 'object', required: ['a'], properties: { a: { type: 'string', example: 'a' } } })

const BSchema = z
  .object({ b: z.string().openapi({ type: 'string', example: 'b' }) })
  .openapi({ type: 'object', required: ['b'], properties: { b: { type: 'string', example: 'b' } } })

const CSchema = z
  .object({ c: z.string().openapi({ type: 'string', example: 'c' }) })
  .openapi({ type: 'object', required: ['c'], properties: { c: { type: 'string', example: 'c' } } })

const DSchema = z
  .object({ d: z.string().openapi({ type: 'string', example: 'd' }) })
  .openapi({ type: 'object', required: ['d'], properties: { d: { type: 'string', example: 'd' } } })

const ESchema = z
  .object({ e: z.string().openapi({ type: 'string', example: 'e' }) })
  .openapi({ type: 'object', required: ['e'], properties: { e: { type: 'string', example: 'e' } } })

export const getExampleRoute = createRoute({
  method: 'get',
  path: '/example',
  summary: 'Get example data',
  responses: { 200: { description: 'OK', content: { 'application/json': { schema: ASchema } } } },
})
