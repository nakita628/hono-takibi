declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/products': {
      $get: {
        input: {}
        output: {
          id: string
          name: string
          price: number
          category: 'electronics' | 'clothing' | 'books' | 'home'
          description?: string | undefined
          tags?: string[] | undefined
          metadata?:
            | {
                [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
              }
            | undefined
          createdAt?: string | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/products': {
      $post:
        | {
            input: {
              json: {
                name: string
                price: number
                category: 'electronics' | 'clothing' | 'books' | 'home'
                description?: string | undefined
                tags?: string[] | undefined
              }
            }
            output: {
              id: string
              name: string
              price: number
              category: 'electronics' | 'clothing' | 'books' | 'home'
              description?: string | undefined
              tags?: string[] | undefined
              metadata?:
                | {
                    [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
                  }
                | undefined
              createdAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              json: {
                name: string
                price: number
                category: 'electronics' | 'clothing' | 'books' | 'home'
                description?: string | undefined
                tags?: string[] | undefined
              }
            }
            output: {
              code: string
              message: string
              errors: {
                field?: string | undefined
                message?: string | undefined
                code?: string | undefined
              }[]
            }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/products/:productId': {
      $get: {
        input: { param: { productId: string } }
        output: {
          id: string
          name: string
          price: number
          category: 'electronics' | 'clothing' | 'books' | 'home'
          description?: string | undefined
          tags?: string[] | undefined
          metadata?:
            | {
                [x: string]: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/types').JSONValue
              }
            | undefined
          createdAt?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
