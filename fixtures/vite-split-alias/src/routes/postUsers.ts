import { createRoute, z } from '@hono/zod-openapi'
import { UserSchema } from '~/components/schemas'
import { XRequestIdHeaderSchema } from '~/components/headers'
import { CreateUserBodyRequestBody } from '~/components/requestBodies'
import { UserExampleExample } from '~/components/examples'
import { GetUserLinkLink } from '@/components/links'

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  summary: 'Create user',
  operationId: 'createUser',
  request: { body: CreateUserBodyRequestBody },
  responses: {
    201: {
      description: 'Created',
      headers: z.object({ 'X-Request-Id': XRequestIdHeaderSchema }),
      content: {
        'application/json': { schema: UserSchema, examples: { Alice: UserExampleExample } },
      },
      links: { GetUser: GetUserLinkLink },
    },
  },
})
