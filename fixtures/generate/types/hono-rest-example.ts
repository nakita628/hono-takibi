declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/': { $get: { input: {}; output: { message: string }; outputFormat: 'json'; status: 200 } }
  } & {
    '/posts': {
      $post:
        | {
            input: { json: { post: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: { json: { post: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { json: { post: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 500
          }
      $get:
        | {
            input: { query: { page: number; rows: number } }
            output: { id: string; post: string; createdAt: string; updatedAt: string }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { page: number; rows: number } }
            output: { message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { query: { page: number; rows: number } }
            output: { message: string }
            outputFormat: 'json'
            status: 500
          }
    }
  } & {
    '/posts/:id': {
      $put:
        | {
            input: { param: { id: string } } & { json: { post: string } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { param: { id: string } } & { json: { post: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { id: string } } & { json: { post: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 500
          }
      $delete:
        | { input: { param: { id: string } }; output: {}; outputFormat: string; status: 204 }
        | {
            input: { param: { id: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { id: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 500
          }
    }
  },
  '/'
>
export default routes
