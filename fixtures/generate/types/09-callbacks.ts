declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
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
            callbackUrl: string
            data?: Record<string, never> | undefined
          }
        }
        output: {
          id: string
          type: string
          status: 'failed' | 'queued' | 'running' | 'completed'
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
