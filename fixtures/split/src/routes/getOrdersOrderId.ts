import { createRoute, z } from '@hono/zod-openapi'
import {
  IncludeQueryParamParamsSchema,
  OrderIdPathParamParamsSchema,
  TraceIdHeaderParamParamsSchema,
} from '../parameters'
import { DefaultErrorResponse, NotFoundResponse, OrderResponseResponse } from '../responses'

export const getOrdersOrderIdRoute = createRoute({
  method: 'get',
  path: '/orders/{orderId}',
  tags: ['Orders'],
  summary: 'Get order by id',
  operationId: 'getOrderById',
  request: {
    params: z.object({ orderId: OrderIdPathParamParamsSchema }),
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    query: z.object({ include: IncludeQueryParamParamsSchema }),
  },
  responses: { 200: OrderResponseResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
})
