declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/boolean': {
      $get: { input: {}; output: { isActive: boolean }; outputFormat: 'json'; status: 200 }
    }
  },
  '/'
>
export default routes
