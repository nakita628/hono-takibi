declare const routes: import(
  '/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index',
  { with: { 'resolution-mode': 'import' } }
).OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
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
    }
  } & {
    '/posts': {
      $get:
        | {
            input: { query: { page: unknown; rows: unknown } }
            output: { message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { query: { page: unknown; rows: unknown } }
            output: { message: string }
            outputFormat: 'json'
            status: 500
          }
        | {
            input: { query: { page: unknown; rows: unknown } }
            output: { id: string; post: string; createdAt: string; updatedAt: string }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/posts/:id': {
      $put:
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
        | {
            input: { param: { id: string } } & { json: { post: string } }
            output: {}
            outputFormat: string
            status: 204
          }
    }
  } & {
    '/posts/:id': {
      $delete:
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
        | { input: { param: { id: string } }; output: {}; outputFormat: string; status: 204 }
    }
  },
  '/'
>
export default routes
