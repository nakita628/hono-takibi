declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/users': {
      $get: {
        input: { query: { limit?: number | undefined } }
        output: { id: string; name: string; email: string }[]
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { json: { name: string; email: string } }
        output: { id: string; name: string; email: string }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/users/:id': {
      $get: {
        input: { param: { id: string } }
        output: { id: string; name: string; email: string }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
