import { createRoute, z } from '@hono/zod-openapi'
import { TraceIdHeaderParamParamsSchema } from '../parameters'
import { CreateOrderRequestRequestBody } from '../requestBodies'
import { DefaultErrorResponse, OrderResponse, ValidationErrorResponse } from '../responses'
import { OrderCreatedCallback } from '../callbacks'

export const postOrdersRoute = createRoute({
  method: 'post',
  path: '/orders',
  tags: ['Orders'],
  summary: 'Create order (and optionally trigger callback)',
  operationId: 'createOrder',
  request: {
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    body: CreateOrderRequestRequestBody,
  },
  responses: { 201: OrderResponse, 400: ValidationErrorResponse, default: DefaultErrorResponse },
  orderEvents: OrderCreatedCallback,
})
