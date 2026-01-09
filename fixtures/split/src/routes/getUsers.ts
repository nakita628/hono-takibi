import { createRoute, z } from '@hono/zod-openapi'
import {
  CursorQueryParamParamsSchema,
  IncludeQueryParamParamsSchema,
  LimitQueryParamParamsSchema,
  SearchFilterQueryParamParamsSchema,
  TraceIdHeaderParamParamsSchema,
} from '../parameters'
import {
  DefaultErrorResponse,
  RateLimitedResponse,
  UnauthorizedResponse,
  UserListResponse,
} from '../responses'

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
    200: UserListResponse,
    401: UnauthorizedResponse,
    429: RateLimitedResponse,
    default: DefaultErrorResponse,
  },
})
