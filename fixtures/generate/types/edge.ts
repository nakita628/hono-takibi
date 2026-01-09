declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/polymorphic': {
      $post: {
        input: {
          json:
            | ({ type: string } & { livesLeft?: number | undefined })
            | ({ type: string } & { barkLevel?: 'quiet' | 'normal' | 'loud' | undefined })
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/search': {
      $get: {
        input: { query: { q: string; filter?: string | string[] | undefined; exclude?: any } }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/multi-step': {
      $put: {
        input: {
          json: { id: string; metadata?: Record<string, string> | null | undefined } & {
            step?: number | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  },
  '/'
>
export default routes
