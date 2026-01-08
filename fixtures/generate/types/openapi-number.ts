declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.4/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/number': {
      $get: {
        input: {}
        output: {
          gt5_number: number
          gte5_number: number
          lt5_number: number
          lte5_number: number
          int_number: number
          positive_number: number
          nonnegative_number: number
          negative_number: number
          nonpositive_number: number
          multipleOf5_number: number
          finite_number: number
          safe_number: number
          message_number: number
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
