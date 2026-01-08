declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.4/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/messages': {
      $post: {
        input: { json: unknown }
        output:
          | { type: 'text'; text: string }
          | { type: 'image'; url: string }
          | { type: 'video'; url: string; duration: number }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
