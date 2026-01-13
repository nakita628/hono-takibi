declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/products': {
      $get:
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                q?: string | undefined
                category?:
                  | 'electronics'
                  | 'clothing'
                  | 'books'
                  | 'home'
                  | 'sports'
                  | 'toys'
                  | undefined
              }
            } & { header: { 'Accept-Language'?: string | undefined } }
            output: {
              items: {
                id: string
                sku?: string | undefined
                name: string
                description?: string | undefined
                price: { amount: number; currency: string }
                category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                tags?: string[] | undefined
                inventory?: number | undefined
                images?: string[] | undefined
                metadata?: { [x: string]: string } | undefined
                status?: 'draft' | 'active' | 'archived' | undefined
                createdAt?: string | undefined
                updatedAt?: string | undefined
              }[]
              pagination: {
                page: number
                limit: number
                total: bigint
                totalPages: number
                hasNext?: boolean | undefined
                hasPrevious?: boolean | undefined
              }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                q?: string | undefined
                category?:
                  | 'electronics'
                  | 'clothing'
                  | 'books'
                  | 'home'
                  | 'sports'
                  | 'toys'
                  | undefined
              }
            } & { header: { 'Accept-Language'?: string | undefined } }
            output: {
              code: string
              message: string
              target?: string | undefined
              details?:
                | {
                    code?: string | undefined
                    message?: string | undefined
                    target?: string | undefined
                  }[]
                | undefined
              traceId?: string | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                q?: string | undefined
                category?:
                  | 'electronics'
                  | 'clothing'
                  | 'books'
                  | 'home'
                  | 'sports'
                  | 'toys'
                  | undefined
              }
            } & { header: { 'Accept-Language'?: string | undefined } }
            output: {
              code: string
              message: string
              target?: string | undefined
              details?:
                | {
                    code?: string | undefined
                    message?: string | undefined
                    target?: string | undefined
                  }[]
                | undefined
              traceId?: string | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                q?: string | undefined
                category?:
                  | 'electronics'
                  | 'clothing'
                  | 'books'
                  | 'home'
                  | 'sports'
                  | 'toys'
                  | undefined
              }
            } & { header: { 'Accept-Language'?: string | undefined } }
            output: {
              code: string
              message: string
              target?: string | undefined
              details?:
                | {
                    code?: string | undefined
                    message?: string | undefined
                    target?: string | undefined
                  }[]
                | undefined
              traceId?: string | undefined
            }
            outputFormat: 'json'
            status: 429
          }
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                q?: string | undefined
                category?:
                  | 'electronics'
                  | 'clothing'
                  | 'books'
                  | 'home'
                  | 'sports'
                  | 'toys'
                  | undefined
              }
            } & { header: { 'Accept-Language'?: string | undefined } }
            output: {
              code: string
              message: string
              target?: string | undefined
              details?:
                | {
                    code?: string | undefined
                    message?: string | undefined
                    target?: string | undefined
                  }[]
                | undefined
              traceId?: string | undefined
            }
            outputFormat: 'json'
            status: 500
          }
      $post:
        | {
            input: {
              json: {
                sku?: string | undefined
                name: string
                description?: string | undefined
                price: { amount: number; currency: string }
                category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                tags?: string[] | undefined
                inventory?: number | undefined
                images?: string[] | undefined
              }
            }
            output: {
              id: string
              sku?: string | undefined
              name: string
              description?: string | undefined
              price: { amount: number; currency: string }
              category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
              tags?: string[] | undefined
              inventory?: number | undefined
              images?: string[] | undefined
              metadata?: { [x: string]: string } | undefined
              status?: 'draft' | 'active' | 'archived' | undefined
              createdAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              json: {
                sku?: string | undefined
                name: string
                description?: string | undefined
                price: { amount: number; currency: string }
                category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                tags?: string[] | undefined
                inventory?: number | undefined
                images?: string[] | undefined
              }
            }
            output: {
              code: string
              message: string
              target?: string | undefined
              details?:
                | {
                    code?: string | undefined
                    message?: string | undefined
                    target?: string | undefined
                  }[]
                | undefined
              traceId?: string | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                sku?: string | undefined
                name: string
                description?: string | undefined
                price: { amount: number; currency: string }
                category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                tags?: string[] | undefined
                inventory?: number | undefined
                images?: string[] | undefined
              }
            }
            output: {
              code: string
              message: string
              target?: string | undefined
              details?:
                | {
                    code?: string | undefined
                    message?: string | undefined
                    target?: string | undefined
                  }[]
                | undefined
              traceId?: string | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                sku?: string | undefined
                name: string
                description?: string | undefined
                price: { amount: number; currency: string }
                category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                tags?: string[] | undefined
                inventory?: number | undefined
                images?: string[] | undefined
              }
            }
            output: {
              code: string
              message: string
              target?: string | undefined
              details?:
                | {
                    code?: string | undefined
                    message?: string | undefined
                    target?: string | undefined
                  }[]
                | undefined
              traceId?: string | undefined
            }
            outputFormat: 'json'
            status: 403
          }
        | {
            input: {
              json: {
                sku?: string | undefined
                name: string
                description?: string | undefined
                price: { amount: number; currency: string }
                category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                tags?: string[] | undefined
                inventory?: number | undefined
                images?: string[] | undefined
              }
            }
            output: {
              code: string
              message: string
              target?: string | undefined
              details?:
                | {
                    code?: string | undefined
                    message?: string | undefined
                    target?: string | undefined
                  }[]
                | undefined
              traceId?: string | undefined
            }
            outputFormat: 'json'
            status: 409
          }
    }
  } & {
    '/products/:productId': {
      $get:
        | {
            input: { param: { productId: string } } & {
              header: { 'If-None-Match'?: string | undefined }
            }
            output: {
              id: string
              sku?: string | undefined
              name: string
              description?: string | undefined
              price: { amount: number; currency: string }
              category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
              tags?: string[] | undefined
              inventory?: number | undefined
              images?: string[] | undefined
              metadata?: { [x: string]: string } | undefined
              status?: 'draft' | 'active' | 'archived' | undefined
              createdAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { productId: string } } & {
              header: { 'If-None-Match'?: string | undefined }
            }
            output: {}
            outputFormat: string
            status: 304
          }
        | {
            input: { param: { productId: string } } & {
              header: { 'If-None-Match'?: string | undefined }
            }
            output: {
              code: string
              message: string
              target?: string | undefined
              details?:
                | {
                    code?: string | undefined
                    message?: string | undefined
                    target?: string | undefined
                  }[]
                | undefined
              traceId?: string | undefined
            }
            outputFormat: 'json'
            status: 404
          }
      $put:
        | {
            input: { param: { productId: string } } & {
              header: { 'If-Match'?: string | undefined }
            } & {
              json: {
                sku?: string | undefined
                name: string
                description?: string | undefined
                price: { amount: number; currency: string }
                category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                tags?: string[] | undefined
                inventory?: number | undefined
                images?: string[] | undefined
                status?: 'draft' | 'active' | 'archived' | undefined
              }
            }
            output: {
              id: string
              sku?: string | undefined
              name: string
              description?: string | undefined
              price: { amount: number; currency: string }
              category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
              tags?: string[] | undefined
              inventory?: number | undefined
              images?: string[] | undefined
              metadata?: { [x: string]: string } | undefined
              status?: 'draft' | 'active' | 'archived' | undefined
              createdAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { productId: string } } & {
              header: { 'If-Match'?: string | undefined }
            } & {
              json: {
                sku?: string | undefined
                name: string
                description?: string | undefined
                price: { amount: number; currency: string }
                category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                tags?: string[] | undefined
                inventory?: number | undefined
                images?: string[] | undefined
                status?: 'draft' | 'active' | 'archived' | undefined
              }
            }
            output: {
              code: string
              message: string
              target?: string | undefined
              details?:
                | {
                    code?: string | undefined
                    message?: string | undefined
                    target?: string | undefined
                  }[]
                | undefined
              traceId?: string | undefined
            }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { productId: string } } & {
              header: { 'If-Match'?: string | undefined }
            } & {
              json: {
                sku?: string | undefined
                name: string
                description?: string | undefined
                price: { amount: number; currency: string }
                category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                tags?: string[] | undefined
                inventory?: number | undefined
                images?: string[] | undefined
                status?: 'draft' | 'active' | 'archived' | undefined
              }
            }
            output: {
              code: string
              message: string
              target?: string | undefined
              details?:
                | {
                    code?: string | undefined
                    message?: string | undefined
                    target?: string | undefined
                  }[]
                | undefined
              traceId?: string | undefined
            }
            outputFormat: 'json'
            status: 409
          }
        | {
            input: { param: { productId: string } } & {
              header: { 'If-Match'?: string | undefined }
            } & {
              json: {
                sku?: string | undefined
                name: string
                description?: string | undefined
                price: { amount: number; currency: string }
                category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'toys'
                tags?: string[] | undefined
                inventory?: number | undefined
                images?: string[] | undefined
                status?: 'draft' | 'active' | 'archived' | undefined
              }
            }
            output: {
              code: string
              message: string
              target?: string | undefined
              details?:
                | {
                    code?: string | undefined
                    message?: string | undefined
                    target?: string | undefined
                  }[]
                | undefined
              traceId?: string | undefined
            }
            outputFormat: 'json'
            status: 412
          }
      $delete:
        | {
            input: { param: { productId: string } } & {
              header: { 'If-Match'?: string | undefined }
            }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { param: { productId: string } } & {
              header: { 'If-Match'?: string | undefined }
            }
            output: {
              code: string
              message: string
              target?: string | undefined
              details?:
                | {
                    code?: string | undefined
                    message?: string | undefined
                    target?: string | undefined
                  }[]
                | undefined
              traceId?: string | undefined
            }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { productId: string } } & {
              header: { 'If-Match'?: string | undefined }
            }
            output: {
              code: string
              message: string
              target?: string | undefined
              details?:
                | {
                    code?: string | undefined
                    message?: string | undefined
                    target?: string | undefined
                  }[]
                | undefined
              traceId?: string | undefined
            }
            outputFormat: 'json'
            status: 412
          }
    }
  } & {
    '/orders': {
      $post: {
        input: {
          json: {
            items: { productId: string; quantity: number }[]
            shippingAddress: {
              street: string
              city: string
              state?: string | undefined
              postalCode?: string | undefined
              country: string
            }
            billingAddress?:
              | {
                  street: string
                  city: string
                  state?: string | undefined
                  postalCode?: string | undefined
                  country: string
                }
              | undefined
            callbackUrl?: string | undefined
          }
        }
        output: {
          id: string
          customerId: string
          items: {
            productId: string
            productName?: string | undefined
            quantity: number
            price: { amount: number; currency: string }
          }[]
          status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          total: { amount: number; currency: string }
          shippingAddress?:
            | {
                street: string
                city: string
                state?: string | undefined
                postalCode?: string | undefined
                country: string
              }
            | undefined
          billingAddress?:
            | {
                street: string
                city: string
                state?: string | undefined
                postalCode?: string | undefined
                country: string
              }
            | undefined
          createdAt?: string | undefined
          updatedAt?: string | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/webhooks': {
      $post: {
        input: { json: { url: string; events: string[]; secret?: string | undefined } }
        output: {
          id: string
          url: string
          events: (
            | 'product.created'
            | 'product.updated'
            | 'product.deleted'
            | 'order.created'
            | 'order.updated'
            | 'order.shipped'
            | 'order.delivered'
          )[]
          secret?: string | undefined
          status?: 'active' | 'inactive' | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  },
  '/'
>
export default routes
