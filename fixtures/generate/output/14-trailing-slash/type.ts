declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/api/reverseChiban/': {
      $get: { input: {}; output: { result: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/api/reverseChiban': {
      $get: { input: {}; output: { result: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/posts/': {
      $get: {
        input: { query: { limit?: number | undefined } }
        output: { items: string[]; total: number }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { json: { title: string } }
        output: { id: number; title: string }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/users/:id/': {
      $get: {
        input: { param: { id: string } }
        output: { id: string; name: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/items/': {
      $get: { input: {}; output: { items: string[] }; outputFormat: 'json'; status: 200 }
    }
  },
  '/'
>
export default routes
