import { createRoute } from '@hono/zod-openapi'
import { UserSchema } from '../components/schemas'
import { CreateUserBodyRequestBody } from '../components/request-bodies'
import { GetUserLinkLink } from '../components/links'

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  operationId: 'createUser',
  request: { body: CreateUserBodyRequestBody },
  responses: {
    201: {
      description: 'Created',
      content: { 'application/json': { schema: UserSchema } },
      links: { GetUser: GetUserLinkLink },
    },
  },
})
