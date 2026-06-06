declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/items': {
      $post: {
        input: { json: { id: string; name: string } }
        output: { id: string; name: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & { '/ping': { $get: { input: {}; output: string; outputFormat: 'text'; status: 200 } } },
  '/'
>
export default routes
