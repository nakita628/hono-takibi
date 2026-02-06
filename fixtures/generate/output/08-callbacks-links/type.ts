declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/subscriptions': {
      $post: {
        input: { json: { callbackUrl: string; events: ('created' | 'updated' | 'deleted')[] } }
        output: {
          id: string
          callbackUrl: string
          events: string[]
          status: 'active' | 'paused' | 'cancelled'
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/subscriptions/:id': {
      $get: {
        input: { param: { id: string } }
        output: {
          id: string
          callbackUrl: string
          events: string[]
          status: 'active' | 'paused' | 'cancelled'
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: { input: { param: { id: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/webhooks/test': {
      $post: {
        input: { json: { url: string } }
        output: { sent: boolean }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
