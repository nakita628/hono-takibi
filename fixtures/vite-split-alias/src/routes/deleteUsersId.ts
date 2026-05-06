import { createRoute, z } from '@hono/zod-openapi'
import { UserIdParamParamsSchema } from '@/components/parameters'

export const deleteUsersIdRoute = createRoute({
  method: 'delete',
  path: '/users/{id}',
  summary: 'Delete user',
  operationId: 'deleteUser',
  request: { params: z.object({ id: UserIdParamParamsSchema }) },
  responses: { 204: { description: 'Deleted' } },
})
