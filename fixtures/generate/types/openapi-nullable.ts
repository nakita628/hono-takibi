declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/nullable': { $get: { input: {}; output: string | null; outputFormat: 'json'; status: 200 } }
  },
  '/'
>
export default routes
