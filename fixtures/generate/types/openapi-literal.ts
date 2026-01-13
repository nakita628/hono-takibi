declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/primitive': {
      $get: {
        input: {}
        output: { tuna_literal: 'tuna'; twelve_literal: 12; twobig_literal: 2; true_literal: true }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
