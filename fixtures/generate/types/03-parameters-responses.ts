declare const routes: import(
  '/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index',
  { with: { 'resolution-mode': 'import' } }
).OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/items': {
      $get:
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                sort?: string | undefined
              }
            }
            output: {
              items: {
                id: string
                name: string
                description?: string | undefined
                price?: number | undefined
                tags?: string[] | undefined
              }[]
              total: never
              page: number
              limit: number
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                sort?: string | undefined
              }
            }
            output: {
              code: string
              message: string
              details?:
                | {
                    [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                sort?: string | undefined
              }
            }
            output: {
              code: string
              message: string
              details?:
                | {
                    [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                sort?: string | undefined
              }
            }
            output: {
              code: string
              message: string
              details?:
                | {
                    [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 500
          }
    }
  } & {
    '/items/:itemId': {
      $get:
        | {
            input: { param: { itemId: string } }
            output: {
              id: string
              name: string
              description?: string | undefined
              price?: number | undefined
              tags?: string[] | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { itemId: string } }
            output: {
              code: string
              message: string
              details?:
                | {
                    [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/items/:itemId': {
      $delete:
        | {
            input: { param: { itemId: string } } & { header: { 'If-Match'?: string | undefined } }
            output: {
              code: string
              message: string
              details?:
                | {
                    [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { itemId: string } } & { header: { 'If-Match'?: string | undefined } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { param: { itemId: string } } & { header: { 'If-Match'?: string | undefined } }
            output: {
              code: string
              message: string
              details?:
                | {
                    [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                  }
                | undefined
            }
            outputFormat: 'json'
            status: 412
          }
    }
  },
  '/'
>
export default routes
