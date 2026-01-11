declare const routes: import(
  '/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index',
  { with: { 'resolution-mode': 'import' } }
).OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/resources': {
      $get: {
        input: { header: { 'X-Request-ID'?: string | undefined } }
        output: { id?: string | undefined; name?: string | undefined; data?: {} | undefined }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/resources/:id': {
      $get:
        | {
            input: { param: { id: string } } & { header: { 'If-None-Match'?: string | undefined } }
            output: { id?: string | undefined; name?: string | undefined; data?: {} | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } } & { header: { 'If-None-Match'?: string | undefined } }
            output: {}
            outputFormat: string
            status: 304
          }
    }
  } & {
    '/resources/:id': {
      $put:
        | {
            input: { param: { id: string } } & { header: { 'If-Match': string } } & {
              json: {
                id?: string | undefined
                name?: string | undefined
                data?: Record<string, never> | undefined
              }
            }
            output: { id?: string | undefined; name?: string | undefined; data?: {} | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } } & { header: { 'If-Match': string } } & {
              json: {
                id?: string | undefined
                name?: string | undefined
                data?: Record<string, never> | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 412
          }
    }
  } & {
    '/download/:id': {
      $get: {
        input: { param: { id: string } }
        output: Response
        outputFormat: 'json'
        status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').StatusCode
      }
    }
  },
  '/'
>
export default routes
