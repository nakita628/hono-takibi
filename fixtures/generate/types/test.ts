declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/hono': { $get: { input: {}; output: { message: string }; outputFormat: 'json'; status: 200 } }
  } & {
    '/hono-x': {
      $get: { input: {}; output: { message: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/zod-openapi-hono': {
      $get: { input: {}; output: { message: string }; outputFormat: 'json'; status: 200 }
    }
  },
  '/'
>
export default routes
