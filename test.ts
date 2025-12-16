import { createRoute, z } from '@hono/zod-openapi'

const UserIdSchema = z
  .uuid()
  .openapi({ param: { in: 'path', name: 'id', required: true } })
  .openapi('UserId')

const PageLimitSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .openapi({ param: { in: 'query', name: 'limit', required: false } })
  .openapi('PageLimit')

const RequestIdSchema = z
  .string()
  .openapi({ param: { in: 'header', name: 'X-Request-Id', required: false } })
  .openapi('RequestId')

export const getUsersIdRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  responses: { 200: { description: 'OK' } },
})
