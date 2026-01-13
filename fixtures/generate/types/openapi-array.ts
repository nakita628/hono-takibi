declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/array': {
      $get: {
        input: {}
        output: {
          string_array: string[]
          equivalent: string[]
          string_optional_array: string[]
          nonempty: string[]
          min5: string[]
          max5: string[]
          length5: string[]
          string_array_optional?: string[] | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
