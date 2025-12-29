import { createRoute, z } from '@hono/zod-openapi'

const WebhookRegistrationSchema = z
  .object({
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    events: z
      .array(
        z
          .enum([
            'order.created',
            'order.updated',
            'order.cancelled',
            'payment.success',
            'payment.failed',
            'user.created',
            'user.deleted',
          ])
          .openapi({
            type: 'string',
            enum: [
              'order.created',
              'order.updated',
              'order.cancelled',
              'payment.success',
              'payment.failed',
              'user.created',
              'user.deleted',
            ],
          }),
      )
      .optional()
      .openapi({
        type: 'array',
        items: {
          type: 'string',
          enum: [
            'order.created',
            'order.updated',
            'order.cancelled',
            'payment.success',
            'payment.failed',
            'user.created',
            'user.deleted',
          ],
        },
      }),
    secret: z
      .string()
      .optional()
      .openapi({ type: 'string', description: 'Shared secret for HMAC signature' }),
  })
  .openapi({
    type: 'object',
    required: ['url', 'events'],
    properties: {
      url: { type: 'string', format: 'uri' },
      events: {
        type: 'array',
        items: {
          type: 'string',
          enum: [
            'order.created',
            'order.updated',
            'order.cancelled',
            'payment.success',
            'payment.failed',
            'user.created',
            'user.deleted',
          ],
        },
      },
      secret: { type: 'string', description: 'Shared secret for HMAC signature' },
    },
  })
  .openapi('WebhookRegistration')

const WebhookSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    url: z.url().openapi({ type: 'string', format: 'uri' }),
    events: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    status: z
      .enum(['active', 'inactive', 'failed'])
      .openapi({ type: 'string', enum: ['active', 'inactive', 'failed'] }),
    createdAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'url', 'events', 'status'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      url: { type: 'string', format: 'uri' },
      events: { type: 'array', items: { type: 'string' } },
      status: { type: 'string', enum: ['active', 'inactive', 'failed'] },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Webhook')

const CreateSubscriptionInputSchema = z
  .object({
    planId: z.string().openapi({ type: 'string' }),
    paymentMethodId: z.string().openapi({ type: 'string' }),
    callbackUrl: z.url().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    required: ['planId', 'paymentMethodId', 'callbackUrl'],
    properties: {
      planId: { type: 'string' },
      paymentMethodId: { type: 'string' },
      callbackUrl: { type: 'string', format: 'uri' },
    },
  })
  .openapi('CreateSubscriptionInput')

const SubscriptionSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    planId: z.string().openapi({ type: 'string' }),
    status: z
      .enum(['active', 'past_due', 'cancelled', 'expired'])
      .openapi({ type: 'string', enum: ['active', 'past_due', 'cancelled', 'expired'] }),
    currentPeriodEnd: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'planId', 'status'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      planId: { type: 'string' },
      status: { type: 'string', enum: ['active', 'past_due', 'cancelled', 'expired'] },
      currentPeriodEnd: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Subscription')

const CreateJobInputSchema = z
  .object({
    type: z
      .enum(['export', 'import', 'process'])
      .openapi({ type: 'string', enum: ['export', 'import', 'process'] }),
    data: z.object({}).openapi({ type: 'object' }),
    callbackUrl: z.url().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'callbackUrl'],
    properties: {
      type: { type: 'string', enum: ['export', 'import', 'process'] },
      data: { type: 'object' },
      callbackUrl: { type: 'string', format: 'uri' },
    },
  })
  .openapi('CreateJobInput')

const JobSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    type: z.string().openapi({ type: 'string' }),
    status: z
      .enum(['queued', 'running', 'completed', 'failed'])
      .openapi({ type: 'string', enum: ['queued', 'running', 'completed', 'failed'] }),
    progress: z
      .int()
      .min(0)
      .max(100)
      .optional()
      .openapi({ type: 'integer', minimum: 0, maximum: 100 }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'type', 'status'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      type: { type: 'string' },
      status: { type: 'string', enum: ['queued', 'running', 'completed', 'failed'] },
      progress: { type: 'integer', minimum: 0, maximum: 100 },
    },
  })
  .openapi('Job')

const WebhookPayloadSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    type: z.string().openapi({ type: 'string' }),
    timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    data: z.object({}).openapi({ type: 'object' }),
    signature: z
      .string()
      .optional()
      .openapi({ type: 'string', description: 'HMAC-SHA256 signature' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'type', 'timestamp', 'data'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      type: { type: 'string' },
      timestamp: { type: 'string', format: 'date-time' },
      data: { type: 'object' },
      signature: { type: 'string', description: 'HMAC-SHA256 signature' },
    },
  })
  .openapi('WebhookPayload')

const PaymentEventSchema = z
  .object({
    subscriptionId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    amount: z.float64().openapi({ type: 'number', format: 'float64' }),
    currency: z.string().optional().openapi({ type: 'string' }),
    status: z.enum(['success', 'failed']).openapi({ type: 'string', enum: ['success', 'failed'] }),
    failureReason: z.string().optional().openapi({ type: 'string' }),
    timestamp: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['subscriptionId', 'amount', 'status'],
    properties: {
      subscriptionId: { type: 'string', format: 'uuid' },
      amount: { type: 'number', format: 'float64' },
      currency: { type: 'string' },
      status: { type: 'string', enum: ['success', 'failed'] },
      failureReason: { type: 'string' },
      timestamp: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('PaymentEvent')

const JobProgressSchema = z
  .object({
    jobId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    progress: z.int().min(0).max(100).openapi({ type: 'integer', minimum: 0, maximum: 100 }),
    message: z.string().optional().openapi({ type: 'string' }),
    timestamp: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['jobId', 'progress'],
    properties: {
      jobId: { type: 'string', format: 'uuid' },
      progress: { type: 'integer', minimum: 0, maximum: 100 },
      message: { type: 'string' },
      timestamp: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('JobProgress')

const JobResultSchema = z
  .object({
    jobId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    status: z
      .enum(['completed', 'failed'])
      .openapi({ type: 'string', enum: ['completed', 'failed'] }),
    result: z.object({}).openapi({ type: 'object' }),
    error: z
      .object({
        code: z.string().openapi({ type: 'string' }),
        message: z.string().openapi({ type: 'string' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: { code: { type: 'string' }, message: { type: 'string' } },
      }),
    completedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['jobId', 'status'],
    properties: {
      jobId: { type: 'string', format: 'uuid' },
      status: { type: 'string', enum: ['completed', 'failed'] },
      result: { type: 'object' },
      error: {
        type: 'object',
        properties: { code: { type: 'string' }, message: { type: 'string' } },
      },
      completedAt: { type: 'string', format: 'date-time' },
    },
  })
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
        '200': { description: 'Webhook received' },
        '400': { description: 'Invalid payload' },
        '401': { description: 'Invalid signature' },
      },
    },
  },
}

const PaymentSuccessCallback = {
  '{$request.body#/callbackUrl}/payment/success': {
    post: {
      operationId: 'onPaymentSuccess',
      requestBody: { content: { 'application/json': { schema: PaymentEventSchema } } },
      responses: { '200': { description: 'Acknowledged' } },
    },
  },
}

const PaymentFailedCallback = {
  '{$request.body#/callbackUrl}/payment/failed': {
    post: {
      operationId: 'onPaymentFailed',
      requestBody: { content: { 'application/json': { schema: PaymentEventSchema } } },
      responses: { '200': { description: 'Acknowledged' } },
    },
  },
}

const SubscriptionRenewedCallback = {
  '{$request.body#/callbackUrl}/subscription/renewed': {
    post: {
      operationId: 'onSubscriptionRenewed',
      requestBody: {
        content: {
          'application/json': {
            schema: z
              .object({
                subscriptionId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
                newPeriodEnd: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
              })
              .partial()
              .openapi({
                type: 'object',
                properties: {
                  subscriptionId: { type: 'string', format: 'uuid' },
                  newPeriodEnd: { type: 'string', format: 'date-time' },
                },
              }),
          },
        },
      },
      responses: { '200': { description: 'Acknowledged' } },
    },
  },
}

const SubscriptionCancelledCallback = {
  '{$request.body#/callbackUrl}/subscription/cancelled': {
    post: {
      operationId: 'onSubscriptionCancelled',
      requestBody: {
        content: {
          'application/json': {
            schema: z
              .object({
                subscriptionId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
                cancelledAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
                reason: z.string().openapi({ type: 'string' }),
              })
              .partial()
              .openapi({
                type: 'object',
                properties: {
                  subscriptionId: { type: 'string', format: 'uuid' },
                  cancelledAt: { type: 'string', format: 'date-time' },
                  reason: { type: 'string' },
                },
              }),
          },
        },
      },
      responses: { '200': { description: 'Acknowledged' } },
    },
  },
}

const JobProgressCallback = {
  '{$request.body#/callbackUrl}/job/progress': {
    post: {
      operationId: 'onJobProgress',
      requestBody: { content: { 'application/json': { schema: JobProgressSchema } } },
      responses: { '200': { description: 'Acknowledged' } },
    },
  },
}

const JobCompleteCallback = {
  '{$request.body#/callbackUrl}/job/complete': {
    post: {
      operationId: 'onJobComplete',
      requestBody: { content: { 'application/json': { schema: JobResultSchema } } },
      responses: { '200': { description: 'Acknowledged' } },
    },
  },
}

const JobErrorCallback = {
  '{$request.body#/callbackUrl}/job/error': {
    post: {
      operationId: 'onJobError',
      requestBody: { content: { 'application/json': { schema: JobResultSchema } } },
      responses: { '200': { description: 'Acknowledged' } },
    },
  },
}

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
  callbacks: { onEvent: GenericWebhookCallbacks },
})

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
  callbacks: {
    paymentSuccess: PaymentSuccessCallbacks,
    paymentFailed: PaymentFailedCallbacks,
    subscriptionRenewed: SubscriptionRenewedCallbacks,
    subscriptionCancelled: SubscriptionCancelledCallbacks,
  },
})

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
  callbacks: {
    onProgress: JobProgressCallbacks,
    onComplete: JobCompleteCallbacks,
    onError: JobErrorCallbacks,
  },
})

export const postIntegrationsIntegrationIdSyncRoute = createRoute({
  method: 'post',
  path: '/integrations/{integrationId}/sync',
  summary: 'Trigger data sync with callbacks',
  operationId: 'triggerSync',
  request: {
    params: z.object({
      integrationId: z
        .uuid()
        .openapi({
          param: {
            name: 'integrationId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: { 202: { description: 'Sync started' } },
  callbacks: {
    syncStarted: {
      '{$request.body#/callbackUrl}/sync/started': {
        post: {
          operationId: 'onSyncStarted',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    syncId: { type: 'string' },
                    startedAt: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
          responses: { '200': { description: 'Callback acknowledged' } },
        },
      },
    },
    syncCompleted: {
      '{$request.body#/callbackUrl}/sync/completed': {
        post: {
          operationId: 'onSyncCompleted',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    syncId: { type: 'string' },
                    recordsProcessed: { type: 'integer' },
                    completedAt: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
          responses: { '200': { description: 'Callback acknowledged' } },
        },
      },
    },
  },
})
