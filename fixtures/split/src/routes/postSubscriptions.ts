import { createRoute, z } from '@hono/zod-openapi'
import { TraceIdHeaderParamParamsSchema } from '../parameters'
import { SubscriptionRequestRequestBody } from '../requestBodies'
import { DefaultErrorResponse, SubscriptionResponse, ValidationErrorResponse } from '../responses'
import { SubscriptionLifecycleCallback } from '../callbacks'

export const postSubscriptionsRoute = createRoute({
  method: 'post',
  path: '/subscriptions',
  tags: ['Subscriptions'],
  summary: 'Create webhook subscription',
  operationId: 'createSubscription',
  request: {
    headers: z.object({ 'x-trace-id': TraceIdHeaderParamParamsSchema }),
    body: SubscriptionRequestRequestBody,
  },
  responses: {
    201: SubscriptionResponse,
    400: ValidationErrorResponse,
    default: DefaultErrorResponse,
  },
  callbacks: { subscriptionEvents: SubscriptionLifecycleCallback },
})
