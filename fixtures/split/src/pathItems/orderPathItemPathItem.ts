import { z } from '@hono/zod-openapi'
import { OrderStatusSchema } from '../schemas'
import { OrderIdPathParamParamsSchema, TraceIdHeaderParamParamsSchema } from '../parameters'
import {
  DefaultErrorResponse,
  NotFoundResponse,
  OrderResponseResponse,
  ValidationErrorResponse,
} from '../responses'

export const OrderPathItemPathItem = {
  get: {
    tags: ['Orders'],
    summary: 'Get order by id (reusable pathItem)',
    operationId: 'getOrderByIdPathItem',
    parameters: [OrderIdPathParamParamsSchema, TraceIdHeaderParamParamsSchema],
    responses: { 200: OrderResponseResponse, 404: NotFoundResponse, default: DefaultErrorResponse },
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
      200: OrderResponseResponse,
      400: ValidationErrorResponse,
      404: NotFoundResponse,
      default: DefaultErrorResponse,
    },
  },
}
