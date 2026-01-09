declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/primitive': {
      $get: {
        input: {}
        output: { tuna_literal: 'tuna'; twelve_literal: 12; twobig_literal: 2; true_literal: true }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
