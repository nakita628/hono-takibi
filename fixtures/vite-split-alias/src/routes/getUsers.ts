import { createRoute, z } from '@hono/zod-openapi'
import { LimitParamParamsSchema, PageParamParamsSchema } from '@/components/parameters'
import { UserListResponseResponse } from '@/components/responses'

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  summary: 'List users',
  operationId: 'listUsers',
  request: { query: z.object({ page: PageParamParamsSchema, limit: LimitParamParamsSchema }) },
  responses: { 200: UserListResponseResponse },
})
