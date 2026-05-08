declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/items': {
      $get: {
        input: { query: { limit?: number | undefined; cursor?: string | undefined } }
        output: { items: { id: string; name: string }[]; nextCursor?: string | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/feeds': {
      $get: {
        input: {}
        output: { items: { id: string; name: string }[]; nextCursor?: string | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/users/:userId/posts': {
      $get: {
        input: { param: { userId: string } } & { query: { cursor?: string | undefined } }
        output: { items: { id: string; name: string }[]; nextCursor?: string | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
