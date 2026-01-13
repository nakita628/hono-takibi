declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/products': {
      $get: {
        input: {}
        output: {
          id: string
          name: string
          description?: string | undefined
          price: number
          category: 'electronics' | 'clothing' | 'books' | 'home'
          tags?: string[] | undefined
          metadata?: { [x: string]: unknown } | undefined
          createdAt?: string | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
      $post:
        | {
            input: {
              json: {
                name: string
                description?: string | undefined
                price: number
                category: 'electronics' | 'clothing' | 'books' | 'home'
                tags?: string[] | undefined
              }
            }
            output: {
              id: string
              name: string
              description?: string | undefined
              price: number
              category: 'electronics' | 'clothing' | 'books' | 'home'
              tags?: string[] | undefined
              metadata?: { [x: string]: unknown } | undefined
              createdAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              json: {
                name: string
                description?: string | undefined
                price: number
                category: 'electronics' | 'clothing' | 'books' | 'home'
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
          description?: string | undefined
          price: number
          category: 'electronics' | 'clothing' | 'books' | 'home'
          tags?: string[] | undefined
          metadata?: { [x: string]: unknown } | undefined
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
