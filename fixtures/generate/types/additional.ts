declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/passthrough': {
      $get: { input: {}; output: { test: string }; outputFormat: 'json'; status: 200 }
    }
  },
  '/'
>
export default routes
