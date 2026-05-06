import { createRoute, z } from '@hono/zod-openapi'
import { UserIdParamParamsSchema } from '@/components/parameters'
import { UserSchema, UserUpdateSchema } from '~/components/schemas'

export const putUsersIdRoute = createRoute({
  method: 'put',
  path: '/users/{id}',
  summary: 'Update user',
  operationId: 'updateUser',
  request: {
    params: z.object({ id: UserIdParamParamsSchema }),
    body: { content: { 'application/json': { schema: UserUpdateSchema } }, required: true },
  },
  responses: {
    200: { description: 'Updated', content: { 'application/json': { schema: UserSchema } } },
  },
})
