declare const routes: import(
  '/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index',
  { with: { 'resolution-mode': 'import' } }
).OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/stream': {
      $get: {
        input: {}
        output: Response
        outputFormat: 'json'
        status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').StatusCode
      }
    }
  } & {
    '/graphql': {
      $post: {
        input: {
          json:
            | string
            | {
                query?: string | undefined
                variables?: Record<string, never> | undefined
                operationName?: string | undefined
              }
        }
        output: { data?: {} | undefined; errors?: {}[] | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/grpc-gateway': {
      $post: {
        input: {}
        output: Response
        outputFormat: 'json'
        status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').StatusCode
      }
    }
  } & {
    '/deprecated-endpoint': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  },
  '/'
>
export default routes
