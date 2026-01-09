import { createRoute, z } from '@hono/zod-openapi'
import {
  BuyerIdQueryParamParamsSchema,
  CursorQueryParamParamsSchema,
  IncludeQueryParamParamsSchema,
  LimitQueryParamParamsSchema,
  SearchFilterQueryParamParamsSchema,
  TraceIdHeaderParamParamsSchema,
} from '../parameters'
import { DefaultErrorResponse, OrderListResponse, UnauthorizedResponse } from '../responses'

export const getOrdersRoute = createRoute({
  method: 'get',
  path: '/orders',
  tags: ['Orders'],
  summary: 'List orders',
  operationId: 'listOrders',
  request: {
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    query: z.object({
      limit: LimitQueryParamParamsSchema,
      cursor: CursorQueryParamParamsSchema,
      buyerId: BuyerIdQueryParamParamsSchema,
      include: IncludeQueryParamParamsSchema,
      filter: SearchFilterQueryParamParamsSchema,
    }),
  },
  responses: { 200: OrderListResponse, 401: UnauthorizedResponse, default: DefaultErrorResponse },
})
