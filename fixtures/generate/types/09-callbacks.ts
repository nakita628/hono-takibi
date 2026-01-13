declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/webhooks': {
      $post: {
        input: {
          json: {
            url: string
            events: (
              | 'order.created'
              | 'order.updated'
              | 'order.cancelled'
              | 'payment.success'
              | 'payment.failed'
              | 'user.created'
              | 'user.deleted'
            )[]
            secret?: string | undefined
          }
        }
        output: {
          id: string
          url: string
          events: string[]
          status: 'active' | 'inactive' | 'failed'
          createdAt?: string | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/subscriptions': {
      $post: {
        input: { json: { planId: string; paymentMethodId: string; callbackUrl: string } }
        output: {
          id: string
          planId: string
          status: 'active' | 'past_due' | 'cancelled' | 'expired'
          currentPeriodEnd?: string | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/jobs': {
      $post: {
        input: {
          json: {
            type: 'export' | 'import' | 'process'
            data?: { [x: string]: unknown } | undefined
            callbackUrl: string
          }
        }
        output: {
          id: string
          type: string
          status: 'queued' | 'running' | 'completed' | 'failed'
          progress?: number | undefined
        }
        outputFormat: 'json'
        status: 202
      }
    }
  } & {
    '/integrations/:integrationId/sync': {
      $post: {
        input: { param: { integrationId: string } }
        output: {}
        outputFormat: string
        status: 202
      }
    }
  },
  '/'
>
export default routes
