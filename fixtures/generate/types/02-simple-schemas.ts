declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/users': {
      $get: {
        input: {}
        output: { id: string; email: string; name?: string | undefined; createdAt: string }[]
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { json: { email: string; name?: string | undefined } }
        output: { id: string; email: string; name?: string | undefined; createdAt: string }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/users/:userId': {
      $get:
        | {
            input: { param: { userId: string } }
            output: { id: string; email: string; name?: string | undefined; createdAt: string }
            outputFormat: 'json'
            status: 200
          }
        | { input: { param: { userId: string } }; output: {}; outputFormat: string; status: 404 }
    }
  },
  '/'
>
export default routes
