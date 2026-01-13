declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
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
              total: bigint
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
              details?: { [x: string]: unknown } | undefined
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
              details?: { [x: string]: unknown } | undefined
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
              details?: { [x: string]: unknown } | undefined
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
              details?: { [x: string]: unknown } | undefined
            }
            outputFormat: 'json'
            status: 404
          }
      $delete:
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
              details?: { [x: string]: unknown } | undefined
            }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { itemId: string } } & { header: { 'If-Match'?: string | undefined } }
            output: {
              code: string
              message: string
              details?: { [x: string]: unknown } | undefined
            }
            outputFormat: 'json'
            status: 412
          }
    }
  },
  '/'
>
export default routes
