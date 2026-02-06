declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/users': {
      $get: {
        input: { query: { page?: number | undefined; limit?: number | undefined } }
        output: {
          users: {
            id: number
            name: string
            email: string
            role: 'admin' | 'customer'
            address?:
              | {
                  street: string
                  city: string
                  state?: string | undefined
                  zip?: string | undefined
                  country: string
                }
              | undefined
            createdAt: string
          }[]
          total: number
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: {
          json: {
            name: string
            email: string
            password: string
            role?: 'admin' | 'customer' | undefined
            address?:
              | {
                  street: string
                  city: string
                  state?: string | undefined
                  zip?: string | undefined
                  country: string
                }
              | undefined
          }
        }
        output: {
          id: number
          name: string
          email: string
          role: 'admin' | 'customer'
          address?:
            | {
                street: string
                city: string
                state?: string | undefined
                zip?: string | undefined
                country: string
              }
            | undefined
          createdAt: string
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/users/:userId': {
      $get:
        | {
            input: { param: { userId: number } }
            output: {
              id: number
              name: string
              email: string
              role: 'admin' | 'customer'
              address?:
                | {
                    street: string
                    city: string
                    state?: string | undefined
                    zip?: string | undefined
                    country: string
                  }
                | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { userId: number } }
            output: { code: number; message: string }
            outputFormat: 'json'
            status: 404
          }
      $put: {
        input: { param: { userId: number } } & {
          json: {
            name?: string | undefined
            email?: string | undefined
            address?:
              | {
                  street: string
                  city: string
                  state?: string | undefined
                  zip?: string | undefined
                  country: string
                }
              | undefined
          }
        }
        output: {
          id: number
          name: string
          email: string
          role: 'admin' | 'customer'
          address?:
            | {
                street: string
                city: string
                state?: string | undefined
                zip?: string | undefined
                country: string
              }
            | undefined
          createdAt: string
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { userId: number } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/products': {
      $get: {
        input: {
          query: {
            page?: number | undefined
            limit?: number | undefined
            category?: string | undefined
            minPrice?: number | undefined
            maxPrice?: number | undefined
          }
        }
        output: {
          products: {
            id: number
            name: string
            description?: string | undefined
            price: number
            category: { id: number; name: string; parentId?: (number | null) | undefined }
            tags?: string[] | undefined
            inStock: boolean
            createdAt: string
          }[]
          total: number
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: {
          json: {
            name: string
            description?: string | undefined
            price: number
            categoryId: number
            tags?: string[] | undefined
          }
        }
        output: {
          id: number
          name: string
          description?: string | undefined
          price: number
          category: { id: number; name: string; parentId?: (number | null) | undefined }
          tags?: string[] | undefined
          inStock: boolean
          createdAt: string
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/products/:productId': {
      $get:
        | {
            input: { param: { productId: number } }
            output: {
              id: number
              name: string
              description?: string | undefined
              price: number
              category: { id: number; name: string; parentId?: (number | null) | undefined }
              tags?: string[] | undefined
              inStock: boolean
              createdAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { productId: number } }
            output: { code: number; message: string }
            outputFormat: 'json'
            status: 404
          }
      $put: {
        input: { param: { productId: number } } & {
          json: {
            name?: string | undefined
            description?: string | undefined
            price?: number | undefined
            categoryId?: number | undefined
            tags?: string[] | undefined
          }
        }
        output: {
          id: number
          name: string
          description?: string | undefined
          price: number
          category: { id: number; name: string; parentId?: (number | null) | undefined }
          tags?: string[] | undefined
          inStock: boolean
          createdAt: string
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/products/:productId/reviews': {
      $get: {
        input: { param: { productId: number } }
        output: {
          id: number
          rating: number
          comment?: string | undefined
          author: {
            id: number
            name: string
            email: string
            role: 'admin' | 'customer'
            address?:
              | {
                  street: string
                  city: string
                  state?: string | undefined
                  zip?: string | undefined
                  country: string
                }
              | undefined
            createdAt: string
          }
          createdAt: string
        }[]
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { productId: number } } & {
          json: { rating: number; comment?: string | undefined }
        }
        output: {
          id: number
          rating: number
          comment?: string | undefined
          author: {
            id: number
            name: string
            email: string
            role: 'admin' | 'customer'
            address?:
              | {
                  street: string
                  city: string
                  state?: string | undefined
                  zip?: string | undefined
                  country: string
                }
              | undefined
            createdAt: string
          }
          createdAt: string
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/orders': {
      $get: {
        input: {
          query: {
            page?: number | undefined
            limit?: number | undefined
            status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | undefined
          }
        }
        output: {
          orders: {
            id: number
            user: {
              id: number
              name: string
              email: string
              role: 'admin' | 'customer'
              address?:
                | {
                    street: string
                    city: string
                    state?: string | undefined
                    zip?: string | undefined
                    country: string
                  }
                | undefined
              createdAt: string
            }
            items: {
              product: {
                id: number
                name: string
                description?: string | undefined
                price: number
                category: { id: number; name: string; parentId?: (number | null) | undefined }
                tags?: string[] | undefined
                inStock: boolean
                createdAt: string
              }
              quantity: number
              price: number
            }[]
            status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
            totalPrice: number
            shippingAddress: {
              street: string
              city: string
              state?: string | undefined
              zip?: string | undefined
              country: string
            }
            createdAt: string
          }[]
          total: number
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: {
          json: {
            items: { productId: number; quantity: number }[]
            shippingAddress: {
              street: string
              city: string
              state?: string | undefined
              zip?: string | undefined
              country: string
            }
            callbackUrl?: string | undefined
          }
        }
        output: {
          id: number
          user: {
            id: number
            name: string
            email: string
            role: 'admin' | 'customer'
            address?:
              | {
                  street: string
                  city: string
                  state?: string | undefined
                  zip?: string | undefined
                  country: string
                }
              | undefined
            createdAt: string
          }
          items: {
            product: {
              id: number
              name: string
              description?: string | undefined
              price: number
              category: { id: number; name: string; parentId?: (number | null) | undefined }
              tags?: string[] | undefined
              inStock: boolean
              createdAt: string
            }
            quantity: number
            price: number
          }[]
          status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          totalPrice: number
          shippingAddress: {
            street: string
            city: string
            state?: string | undefined
            zip?: string | undefined
            country: string
          }
          createdAt: string
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/orders/:orderId': {
      $get:
        | {
            input: { param: { orderId: number } }
            output: {
              id: number
              user: {
                id: number
                name: string
                email: string
                role: 'admin' | 'customer'
                address?:
                  | {
                      street: string
                      city: string
                      state?: string | undefined
                      zip?: string | undefined
                      country: string
                    }
                  | undefined
                createdAt: string
              }
              items: {
                product: {
                  id: number
                  name: string
                  description?: string | undefined
                  price: number
                  category: { id: number; name: string; parentId?: (number | null) | undefined }
                  tags?: string[] | undefined
                  inStock: boolean
                  createdAt: string
                }
                quantity: number
                price: number
              }[]
              status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
              totalPrice: number
              shippingAddress: {
                street: string
                city: string
                state?: string | undefined
                zip?: string | undefined
                country: string
              }
              createdAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { orderId: number } }
            output: { code: number; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/categories': {
      $get: {
        input: {}
        output: { id: number; name: string; parentId?: (number | null) | undefined }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/upload/image': {
      $post: {
        input: { form: { image: File; alt?: string | undefined } }
        output: { url: string; width: number; height: number }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
