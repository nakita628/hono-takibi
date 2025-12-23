import { createRoute, z } from '@hono/zod-openapi'

const ASchema = z
  .object({ a: z.string().optional().openapi({ type: 'string', example: 'a' }) })
  .optional()
  .openapi({ type: 'object', properties: { a: { type: 'string', example: 'a' } } })
  .openapi('A')

const BSchema = z
  .object({ b: z.string().optional().openapi({ type: 'string', example: 'b' }) })
  .optional()
  .openapi({ type: 'object', properties: { b: { type: 'string', example: 'b' } } })
  .openapi('B')

const CSchema = z
  .object({ c: z.string().optional().openapi({ type: 'string', example: 'c' }) })
  .optional()
  .openapi({ type: 'object', properties: { c: { type: 'string', example: 'c' } } })
  .openapi('C')

const DSchema = z
  .object({ d: z.string().optional().openapi({ type: 'string', example: 'd' }) })
  .optional()
  .openapi({ type: 'object', properties: { d: { type: 'string', example: 'd' } } })
  .openapi('D')

const ESchema = z
  .object({ e: z.string().optional().openapi({ type: 'string', example: 'e' }) })
  .optional()
  .openapi({ type: 'object', properties: { e: { type: 'string', example: 'e' } } })
  .openapi('E')

export const getExampleRoute = createRoute({
  method: 'get',
  path: '/example',
  summary: 'Get example data',
  responses: { 200: { description: 'OK', content: { 'application/json': { schema: ASchema } } } },
})
