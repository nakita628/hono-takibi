import { createRoute, z } from '@hono/zod-openapi'
import {
  DefaultErrorResponse,
  RateLimitedResponse,
  UnauthorizedResponse,
  UserListResponseResponse,
} from '../responses'
import {
  CursorQueryParamParamsSchema,
  IncludeQueryParamParamsSchema,
  LimitQueryParamParamsSchema,
  SearchFilterQueryParamParamsSchema,
  TraceIdHeaderParamParamsSchema,
} from '../parameters'

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  tags: ['Users'],
  summary: 'List users',
  operationId: 'listUsers',
  request: {
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    query: z.object({
      limit: LimitQueryParamParamsSchema,
      cursor: CursorQueryParamParamsSchema,
      include: IncludeQueryParamParamsSchema,
      filter: SearchFilterQueryParamParamsSchema,
    }),
  },
  responses: {
    200: UserListResponseResponse,
    401: UnauthorizedResponse,
    429: RateLimitedResponse,
    default: DefaultErrorResponse,
  },
})
