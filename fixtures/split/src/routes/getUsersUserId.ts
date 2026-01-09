import { createRoute, z } from '@hono/zod-openapi'
import {
  IncludeQueryParamParamsSchema,
  TraceIdHeaderParamParamsSchema,
  UserIdPathParamParamsSchema,
} from '../parameters'
import { DefaultErrorResponse, NotFoundResponse, UserResponse } from '../responses'

export const getUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}',
  tags: ['Users'],
  summary: 'Get user by id',
  operationId: 'getUserById',
  request: {
    params: z.object({ userId: UserIdPathParamParamsSchema }),
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    query: z.object({ include: IncludeQueryParamParamsSchema }),
  },
  responses: { 200: UserResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
})
