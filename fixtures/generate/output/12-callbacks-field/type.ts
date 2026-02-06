declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/orders': {
      $post: {
        input: { json: { item: string; quantity: number; callbackUrl: string } }
        output: { id: string; item: string; quantity: number; status: string }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/payments': {
      $post: {
        input: {
          json: { amount: number; currency: string; successUrl: string; failureUrl: string }
        }
        output: { id: string; amount: number; currency: string; status: string }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/items': {
      $get: { input: {}; output: { id: string; name: string }[]; outputFormat: 'json'; status: 200 }
    }
  },
  '/'
>
export default routes
