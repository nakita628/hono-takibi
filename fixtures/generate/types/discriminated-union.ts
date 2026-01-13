declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/messages': {
      $post: {
        input: {
          json:
            | { type: 'text'; text: string }
            | { type: 'image'; url: string }
            | { type: 'video'; url: string; duration: number }
        }
        output:
          | { type: 'text'; text: string }
          | { type: 'image'; url: string }
          | { type: 'video'; url: string; duration: number }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
