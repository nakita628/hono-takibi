import { createRoute, z } from '@hono/zod-openapi'
import {
  DefaultErrorResponse,
  SubscriptionResponseResponse,
  ValidationErrorResponse,
} from '../responses'
import { TraceIdHeaderParamParamsSchema } from '../parameters'
import { SubscriptionRequestRequestBody } from '../requestBodies'
import { SubscriptionLifecycleCallbackCallback } from '../callbacks'

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
    201: SubscriptionResponseResponse,
    400: ValidationErrorResponse,
    default: DefaultErrorResponse,
  },
  callbacks: { subscriptionEvents: SubscriptionLifecycleCallbackCallback },
})
