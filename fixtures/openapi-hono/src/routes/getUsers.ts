import { createRoute, z } from '@hono/zod-openapi'
import { PageParamParamsSchema } from '../components/parameters'
import { UserListResponseResponse } from '../components/responses'

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'getUsers',
  request: { query: z.object({ page: PageParamParamsSchema }) },
  responses: { 200: UserListResponseResponse },
})
