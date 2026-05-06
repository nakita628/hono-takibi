declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/users': {
      $get: {
        input: { query: { cursor?: string | undefined; limit?: number | undefined } }
        output: { items: { id: string; name: string }[]; nextCursor?: string | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/posts': {
      $get: {
        input: { query: { cursor?: string | undefined } }
        output: { items: { id: string; title: string }[]; nextCursor?: string | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/health': {
      $get: { input: {}; output: { status: string }; outputFormat: 'json'; status: 200 }
    }
  },
  '/'
>
export default routes
