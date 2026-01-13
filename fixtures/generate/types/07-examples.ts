import type { OpenAPIHono } from '@hono/zod-openapi'

type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K]: T[K]
}

declare const routes: OpenAPIHono<
  Env,
  RemoveIndexSignature<
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
            metadata?: { [x: string]: JSONValue } | undefined
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
                metadata?: { [x: string]: JSONValue } | undefined
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
            metadata?: { [x: string]: JSONValue } | undefined
            createdAt?: string | undefined
          }
          outputFormat: 'json'
          status: 200
        }
      }
    }
  >,
  '/'
>
export default routes
