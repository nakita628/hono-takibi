import { createRoute, z } from '@hono/zod-openapi'

export const testSchema = z.object({ test: z.string() }).openapi('Test')

export const postTestRoute = createRoute({
  method: 'post',
  path: '/test',
  summary: 'Test endpoint',
  request: { body: { required: true, content: { 'application/json': { schema: testSchema } } } },
  responses: { 200: { description: 'Successful test' } },
})
