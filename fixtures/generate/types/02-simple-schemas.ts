declare const routes: import(
  '/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index',
  { with: { 'resolution-mode': 'import' } }
).OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/users': {
      $get: {
        input: {}
        output: { id: string; email: string; createdAt: string; name?: string | undefined }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/users': {
      $post: {
        input: { json: { email: string; name?: string | undefined } }
        output: { id: string; email: string; createdAt: string; name?: string | undefined }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/users/:userId': {
      $get:
        | {
            input: { param: { userId: string } }
            output: { id: string; email: string; createdAt: string; name?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
        | { input: { param: { userId: string } }; output: {}; outputFormat: string; status: 404 }
    }
  },
  '/'
>
export default routes
