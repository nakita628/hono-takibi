declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/example': {
      $get: {
        input: {}
        output: {
          b: { id: string; message?: string | undefined }
          c: { count?: number | undefined; flag?: boolean | undefined }
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
