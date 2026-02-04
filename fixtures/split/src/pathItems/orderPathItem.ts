import { z } from '@hono/zod-openapi'
import { OrderStatusSchema } from '../schemas'
import { OrderIdPathParamParamsSchema, TraceIdHeaderParamParamsSchema } from '../parameters'
import {
  DefaultErrorResponse,
  NotFoundResponse,
  OrderResponse,
  ValidationErrorResponse,
} from '../responses'

export const OrderPathItem = {
  get: {
    tags: ['Orders'],
    summary: 'Get order by id (reusable pathItem)',
    operationId: 'getOrderByIdPathItem',
    parameters: [OrderIdPathParamParamsSchema, TraceIdHeaderParamParamsSchema],
    responses: { 200: OrderResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
  },
  patch: {
    tags: ['Orders'],
    summary: 'Update order status (reusable pathItem)',
    operationId: 'updateOrderPathItem',
    parameters: [OrderIdPathParamParamsSchema, TraceIdHeaderParamParamsSchema],
    requestBody: {
      content: {
        'application/json': { schema: z.object({ status: OrderStatusSchema.exactOptional() }) },
      },
      required: true,
    },
    responses: {
      200: OrderResponse,
      400: ValidationErrorResponse,
      404: NotFoundResponse,
      default: DefaultErrorResponse,
    },
  },
}
