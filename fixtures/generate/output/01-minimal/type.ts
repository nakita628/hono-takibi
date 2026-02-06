declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/health': {
      $get: { input: {}; output: { status: string }; outputFormat: 'json'; status: 200 }
    }
  },
  '/'
>
export default routes
