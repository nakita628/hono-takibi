declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  { '/example': { $get: { input: {}; output: { a: string }; outputFormat: 'json'; status: 200 } } },
  '/'
>
export default routes
