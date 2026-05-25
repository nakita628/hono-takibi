import { createRoute, z } from '@hono/zod-openapi'
import { UserListResponseResponse } from '@/components/responses'
import { LimitParamParamsSchema, PageParamParamsSchema } from '@/components/parameters'

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  summary: 'List users',
  operationId: 'listUsers',
  request: { query: z.object({ page: PageParamParamsSchema, limit: LimitParamParamsSchema }) },
  responses: { 200: UserListResponseResponse },
})
