import { createRoute, z } from '@hono/zod-openapi'
import { UserIdParamParamsSchema } from '@/components/parameters'
import { XRequestIdHeaderSchema } from '~/components/headers'
import { ErrorSchema, UserSchema } from '~/components/schemas'

export const getUsersIdRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  summary: 'Get user by id',
  operationId: 'getUserById',
  request: { params: z.object({ id: UserIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'OK',
      headers: z.object({ 'X-Request-Id': XRequestIdHeaderSchema }),
      content: { 'application/json': { schema: UserSchema } },
    },
    404: { description: 'Not found', content: { 'application/json': { schema: ErrorSchema } } },
  },
  security: [{ BearerAuth: [] }, { ApiKeyAuth: [] }],
})
