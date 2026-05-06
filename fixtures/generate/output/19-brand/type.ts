declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/users': {
      $post: {
        input: {
          json: { email: string; username: string; price: number; tags?: string[] | undefined }
        }
        output: { id: string; email: string; username: string }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/users/:userId': {
      $get: {
        input: { param: { userId: string } }
        output: { id: string; email: string; username: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/posts': {
      $post: {
        input: { json: { authorId: string; title: string; quantity: number } }
        output: { id: string; authorId: string; title: string }
        outputFormat: 'json'
        status: 201
      }
    }
  },
  '/'
>
export default routes
