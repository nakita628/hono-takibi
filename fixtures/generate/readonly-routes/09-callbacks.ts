import { createRoute, z } from '@hono/zod-openapi'

const WebhookRegistrationSchema = z
  .object({
    url: z.url(),
    events: z.array(
      z.enum([
        'order.created',
        'order.updated',
        'order.cancelled',
        'payment.success',
        'payment.failed',
        'user.created',
        'user.deleted',
      ]),
    ),
    secret: z.string().exactOptional().openapi({ description: 'Shared secret for HMAC signature' }),
  })
  .openapi({ required: ['url', 'events'] })
  .readonly()
  .openapi('WebhookRegistration')

const WebhookSchema = z
  .object({
    id: z.uuid(),
    url: z.url(),
    events: z.array(z.string()),
    status: z.enum(['active', 'inactive', 'failed']),
    createdAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'url', 'events', 'status'] })
  .readonly()
  .openapi('Webhook')

const CreateSubscriptionInputSchema = z
  .object({ planId: z.string(), paymentMethodId: z.string(), callbackUrl: z.url() })
  .openapi({ required: ['planId', 'paymentMethodId', 'callbackUrl'] })
  .readonly()
  .openapi('CreateSubscriptionInput')

const SubscriptionSchema = z
  .object({
    id: z.uuid(),
    planId: z.string(),
    status: z.enum(['active', 'past_due', 'cancelled', 'expired']),
    currentPeriodEnd: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'planId', 'status'] })
  .readonly()
  .openapi('Subscription')

const CreateJobInputSchema = z
  .object({
    type: z.enum(['export', 'import', 'process']),
    data: z.object({}).exactOptional(),
    callbackUrl: z.url(),
  })
  .openapi({ required: ['type', 'callbackUrl'] })
  .readonly()
  .openapi('CreateJobInput')

const JobSchema = z
  .object({
    id: z.uuid(),
    type: z.string(),
    status: z.enum(['queued', 'running', 'completed', 'failed']),
    progress: z.int().min(0).max(100).exactOptional(),
  })
  .openapi({ required: ['id', 'type', 'status'] })
  .readonly()
  .openapi('Job')

const WebhookPayloadSchema = z
  .object({
    id: z.uuid(),
    type: z.string(),
    timestamp: z.iso.datetime(),
    data: z.object({}),
    signature: z.string().exactOptional().openapi({ description: 'HMAC-SHA256 signature' }),
  })
  .openapi({ required: ['id', 'type', 'timestamp', 'data'] })
  .readonly()
  .openapi('WebhookPayload')

const PaymentEventSchema = z
  .object({
    subscriptionId: z.uuid(),
    amount: z.float64(),
    currency: z.string().exactOptional(),
    status: z.enum(['success', 'failed']),
    failureReason: z.string().exactOptional(),
    timestamp: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['subscriptionId', 'amount', 'status'] })
  .readonly()
  .openapi('PaymentEvent')

const JobProgressSchema = z
  .object({
    jobId: z.uuid(),
    progress: z.int().min(0).max(100),
    message: z.string().exactOptional(),
    timestamp: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['jobId', 'progress'] })
  .readonly()
  .openapi('JobProgress')

const JobResultSchema = z
  .object({
    jobId: z.uuid(),
    status: z.enum(['completed', 'failed']),
    result: z.object({}).exactOptional(),
    error: z
      .object({ code: z.string().exactOptional(), message: z.string().exactOptional() })
      .exactOptional(),
    completedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['jobId', 'status'] })
  .readonly()
  .openapi('JobResult')

const GenericWebhookCallback = {
  '{$request.body#/url}': {
    post: {
      summary: 'Webhook event notification',
      operationId: 'webhookCallback',
      requestBody: {
        content: { 'application/json': { schema: WebhookPayloadSchema } },
        required: true,
      },
      responses: {
        200: { description: 'Webhook received' },
        400: { description: 'Invalid payload' },
        401: { description: 'Invalid signature' },
      },
    },
  },
} as const

const PaymentSuccessCallback = {
  '{$request.body#/callbackUrl}/payment/success': {
    post: {
      operationId: 'onPaymentSuccess',
      requestBody: { content: { 'application/json': { schema: PaymentEventSchema } } },
      responses: { 200: { description: 'Acknowledged' } },
    },
  },
} as const

const PaymentFailedCallback = {
  '{$request.body#/callbackUrl}/payment/failed': {
    post: {
      operationId: 'onPaymentFailed',
      requestBody: { content: { 'application/json': { schema: PaymentEventSchema } } },
      responses: { 200: { description: 'Acknowledged' } },
    },
  },
} as const

const SubscriptionRenewedCallback = {
  '{$request.body#/callbackUrl}/subscription/renewed': {
    post: {
      operationId: 'onSubscriptionRenewed',
      requestBody: {
        content: {
          'application/json': {
            schema: z.object({
              subscriptionId: z.uuid().exactOptional(),
              newPeriodEnd: z.iso.datetime().exactOptional(),
            }),
          },
        },
      },
      responses: { 200: { description: 'Acknowledged' } },
    },
  },
} as const

const SubscriptionCancelledCallback = {
  '{$request.body#/callbackUrl}/subscription/cancelled': {
    post: {
      operationId: 'onSubscriptionCancelled',
      requestBody: {
        content: {
          'application/json': {
            schema: z.object({
              subscriptionId: z.uuid().exactOptional(),
              cancelledAt: z.iso.datetime().exactOptional(),
              reason: z.string().exactOptional(),
            }),
          },
        },
      },
      responses: { 200: { description: 'Acknowledged' } },
    },
  },
} as const

const JobProgressCallback = {
  '{$request.body#/callbackUrl}/job/progress': {
    post: {
      operationId: 'onJobProgress',
      requestBody: { content: { 'application/json': { schema: JobProgressSchema } } },
      responses: { 200: { description: 'Acknowledged' } },
    },
  },
} as const

const JobCompleteCallback = {
  '{$request.body#/callbackUrl}/job/complete': {
    post: {
      operationId: 'onJobComplete',
      requestBody: { content: { 'application/json': { schema: JobResultSchema } } },
      responses: { 200: { description: 'Acknowledged' } },
    },
  },
} as const

const JobErrorCallback = {
  '{$request.body#/callbackUrl}/job/error': {
    post: {
      operationId: 'onJobError',
      requestBody: { content: { 'application/json': { schema: JobResultSchema } } },
      responses: { 200: { description: 'Acknowledged' } },
    },
  },
} as const

export const postWebhooksRoute = createRoute({
  method: 'post',
  path: '/webhooks',
  summary: 'Register a webhook endpoint',
  operationId: 'registerWebhook',
  request: {
    body: {
      content: { 'application/json': { schema: WebhookRegistrationSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Webhook registered',
      content: { 'application/json': { schema: WebhookSchema } },
    },
  },
  onEvent: GenericWebhookCallback,
} as const)

export const postSubscriptionsRoute = createRoute({
  method: 'post',
  path: '/subscriptions',
  summary: 'Create a subscription with payment callbacks',
  operationId: 'createSubscription',
  request: {
    body: {
      content: { 'application/json': { schema: CreateSubscriptionInputSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Subscription created',
      content: { 'application/json': { schema: SubscriptionSchema } },
    },
  },
  paymentSuccess: PaymentSuccessCallback,
  paymentFailed: PaymentFailedCallback,
  subscriptionRenewed: SubscriptionRenewedCallback,
  subscriptionCancelled: SubscriptionCancelledCallback,
} as const)

export const postJobsRoute = createRoute({
  method: 'post',
  path: '/jobs',
  summary: 'Create an async job with progress callbacks',
  operationId: 'createJob',
  request: {
    body: { content: { 'application/json': { schema: CreateJobInputSchema } }, required: true },
  },
  responses: {
    202: { description: 'Job accepted', content: { 'application/json': { schema: JobSchema } } },
  },
  onProgress: JobProgressCallback,
  onComplete: JobCompleteCallback,
  onError: JobErrorCallback,
} as const)

export const postIntegrationsIntegrationIdSyncRoute = createRoute({
  method: 'post',
  path: '/integrations/{integrationId}/sync',
  summary: 'Trigger data sync with callbacks',
  operationId: 'triggerSync',
  request: {
    params: z.object({
      integrationId: z.uuid().openapi({
        param: {
          name: 'integrationId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: { 202: { description: 'Sync started' } },
} as const)
