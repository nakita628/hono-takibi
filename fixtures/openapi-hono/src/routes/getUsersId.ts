import { createRoute, z } from '@hono/zod-openapi'
import { UserSchema } from '../components/schemas'
import { UserIdParamParamsSchema } from '../components/parameters'
import { XRequestIdHeaderSchema } from '../components/headers'

export const getUsersIdRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  operationId: 'getUserById',
  request: { params: z.object({ id: UserIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'OK',
      headers: z.object({ 'X-Request-Id': XRequestIdHeaderSchema }),
      content: { 'application/json': { schema: UserSchema } },
    },
  },
  security: [{ BearerAuth: [] }],
})
