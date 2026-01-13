declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/fizzbuzz': {
      $get:
        | {
            input: { query: { number: unknown; details?: string | undefined } }
            output: { result: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { number: unknown; details?: string | undefined } }
            output: { error?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  },
  '/'
>
export default routes
