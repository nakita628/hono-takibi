import { createRoute, z } from '@hono/zod-openapi'
import { DefaultErrorResponse, NotFoundResponse, UserResponseResponse } from '../responses'
import {
  IncludeQueryParamParamsSchema,
  TraceIdHeaderParamParamsSchema,
  UserIdPathParamParamsSchema,
} from '../parameters'

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
  responses: { 200: UserResponseResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
})
