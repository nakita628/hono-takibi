declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.4/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/validate': {
      $post: {
        input: {
          json: {
            notSpecificValue?: any
            notString?: any
            notNumber?: any
            notNull?: any
            notArray?: any
            notObject?: any
            notInList?: any
            notBoolean?: any
            notInteger?: any
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  },
  '/'
>
export default routes
