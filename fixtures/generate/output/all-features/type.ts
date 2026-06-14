declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/minimal/health': {
      $get: { input: {}; output: { status: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/allExports/users': {
      $get: {
        input: { query: { page?: number | undefined } }
        output: { id: number; name: string; email: string }[]
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { json: { name: string; email: string } }
        output: { id: number; name: string; email: string }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/allExports/users/:id': {
      $get: {
        input: { param: { id: number } }
        output: { id: number; name: string; email: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/circularRefs/tree': {
      $get: {
        input: {}
        output: { id: number; value: string; children?: unknown[] | undefined }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { json: { id: number; value: string; children?: unknown[] | undefined } }
        output: { id: number; value: string; children?: unknown[] | undefined }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/circularRefs/graph': {
      $get: {
        input: {}
        output: {
          id: number
          ref?:
            | { id: number; ref?: { id: number; ref?: unknown | undefined } | undefined }
            | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/securitySchemes/public': {
      $get: { input: {}; output: { message: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/securitySchemes/bearer-protected': {
      $get: { input: {}; output: { data: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/securitySchemes/api-key-protected': {
      $get: { input: {}; output: { data: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/securitySchemes/basic-protected': {
      $get: { input: {}; output: { data: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/securitySchemes/oauth-protected': {
      $get: { input: {}; output: { data: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/securitySchemes/multi-auth': {
      $get: { input: {}; output: { data: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/contentTypes/json': {
      $post: {
        input: { json: { name: string; value: number } }
        output: { id: number; name: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/contentTypes/form': {
      $post: {
        input: { json: { username: string; password: string } } & {
          form: { username: string; password: string }
        }
        output: { success: boolean }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/contentTypes/upload': {
      $post: {
        input: { form: { file: File; description?: string | undefined } }
        output: { url: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/contentTypes/text': {
      $post: { input: { json: string }; output: string; outputFormat: 'text'; status: 200 }
    }
  } & {
    '/contentTypes/multi-content': {
      $post: {
        input: { json: { data: string } } & { form: { data: string } }
        output: { received: boolean }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/parametersMerge/items/:itemId': {
      $get: {
        input: { param: { itemId: number } } & { query: { fields?: string | undefined } } & {
          header: { version?: string | undefined }
        }
        output: { id: number; name: string; createdAt: string }
        outputFormat: 'json'
        status: 200
      }
      $put: {
        input: { param: { itemId: number } } & { header: { version: string } } & {
          json: { name?: string | undefined }
        }
        output: { id: number; name: string; createdAt: string }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { itemId: number } } & { header: { version?: string | undefined } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/parametersMerge/items': {
      $get: {
        input: {
          query: {
            limit?: number | undefined
            offset?: number | undefined
            sort?: 'name' | 'created' | 'updated' | undefined
          }
        }
        output: { items: { id: number; name: string; createdAt: string }[]; total: number }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/schemaEdgeCases/nullable': {
      $post: {
        input: {
          json: {
            name: string
            nickname?: (string | null) | undefined
            age?: (number | null) | undefined
            tags?: (string[] | null) | undefined
          }
        }
        output: {
          name: string
          nickname?: (string | null) | undefined
          age?: (number | null) | undefined
          tags?: (string[] | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/schemaEdgeCases/discriminated': {
      $post: {
        input: {
          json:
            | { kind: 'circle'; radius: number }
            | { kind: 'rectangle'; width: number; height: number }
        }
        output:
          | { kind: 'circle'; radius: number }
          | { kind: 'rectangle'; width: number; height: number }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/schemaEdgeCases/composed': {
      $get: {
        input: {}
        output: {
          id: number
          createdAt: string
          name: string
          description?: string | undefined
          extra?: boolean | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/schemaEdgeCases/deep-nested': {
      $get: {
        input: {}
        output: { level2: { level3: { value: string } } }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/schemaEdgeCases/additional-props': {
      $get: { input: {}; output: { [x: string]: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/callbacksLinks/subscriptions': {
      $post: {
        input: { json: { callbackUrl: string; events: ('created' | 'updated' | 'deleted')[] } }
        output: {
          id: string
          callbackUrl: string
          events: string[]
          status: 'active' | 'paused' | 'cancelled'
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/callbacksLinks/subscriptions/:id': {
      $get: {
        input: { param: { id: string } }
        output: {
          id: string
          callbackUrl: string
          events: string[]
          status: 'active' | 'paused' | 'cancelled'
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: { input: { param: { id: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/callbacksLinks/webhooks/test': {
      $post: {
        input: { json: { url: string } }
        output: { sent: boolean }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/crudRefs/posts': {
      $get: {
        input: { query: { page?: number | undefined; limit?: number | undefined } }
        output: {
          posts: {
            id: number
            title: string
            body: string
            author: { id: number; name: string; avatarUrl?: string | undefined }
            tags?: { id: number; name: string; slug: string }[] | undefined
            createdAt: string
            updatedAt: string
          }[]
          total: number
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { json: { title: string; body: string; tagIds?: number[] | undefined } }
        output: {
          id: number
          title: string
          body: string
          author: { id: number; name: string; avatarUrl?: string | undefined }
          tags?: { id: number; name: string; slug: string }[] | undefined
          createdAt: string
          updatedAt: string
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/crudRefs/posts/:id': {
      $get: {
        input: { param: { id: number } }
        output: {
          id: number
          title: string
          body: string
          author: { id: number; name: string; avatarUrl?: string | undefined }
          tags?: { id: number; name: string; slug: string }[] | undefined
          createdAt: string
          updatedAt: string
        }
        outputFormat: 'json'
        status: 200
      }
      $put: {
        input: { param: { id: number } } & {
          json: {
            title?: string | undefined
            body?: string | undefined
            tagIds?: number[] | undefined
          }
        }
        output: {
          id: number
          title: string
          body: string
          author: { id: number; name: string; avatarUrl?: string | undefined }
          tags?: { id: number; name: string; slug: string }[] | undefined
          createdAt: string
          updatedAt: string
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: { input: { param: { id: number } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/crudRefs/posts/:id/comments': {
      $get: {
        input: { param: { id: number } }
        output: {
          id: number
          body: string
          author: { id: number; name: string; avatarUrl?: string | undefined }
          createdAt: string
        }[]
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { id: number } } & { json: { body: string } }
        output: {
          id: number
          body: string
          author: { id: number; name: string; avatarUrl?: string | undefined }
          createdAt: string
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/crudRefs/tags': {
      $get: {
        input: {}
        output: { id: number; name: string; slug: string }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/comprehensive/users': {
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
    '/comprehensive/users/:userId': {
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
    '/comprehensive/products': {
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
    '/comprehensive/products/:productId': {
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
    '/comprehensive/products/:productId/reviews': {
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
    '/comprehensive/orders': {
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
    '/comprehensive/orders/:orderId': {
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
    '/comprehensive/categories': {
      $get: {
        input: {}
        output: { id: number; name: string; parentId?: (number | null) | undefined }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/comprehensive/upload/image': {
      $post: {
        input: { form: { image: File; alt?: string | undefined } }
        output: { url: string; width: number; height: number }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/compositionKeywords/one-of': {
      $post: {
        input: {
          json:
            | { type: 'credit_card'; cardNumber: string; expiry: string }
            | { type: 'bank_transfer'; bankCode: string; accountNumber: string }
        }
        output:
          | { type: 'credit_card'; cardNumber: string; expiry: string }
          | { type: 'bank_transfer'; bankCode: string; accountNumber: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/compositionKeywords/any-of': {
      $post: {
        input: { json: { keyword: string } | { category: number } }
        output: { keyword: string } | { category: number }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/compositionKeywords/all-of': {
      $post: {
        input: {
          json: {
            name: string
            email: string
            employeeId: number
            department?: string | undefined
            startDate?: string | undefined
          }
        }
        output: {
          name: string
          email: string
          employeeId: number
          department?: string | undefined
          startDate?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/compositionKeywords/not': {
      $post: {
        input: { json: { [x: string]: unknown } }
        output: { [x: string]: unknown }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/compositionKeywords/not-ref': {
      $get: { input: {}; output: { [x: string]: unknown }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/compositionKeywords/not-enum': {
      $get: { input: {}; output: { [x: string]: unknown }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/compositionKeywords/not-const': {
      $get: { input: {}; output: { [x: string]: unknown }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/compositionKeywords/not-composition': {
      $get: { input: {}; output: { [x: string]: unknown }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/compositionKeywords/all-of-sibling': {
      $get: {
        input: {}
        output: { id: number; createdAt: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/compositionKeywords/nullable-one-of': {
      $get: {
        input: {}
        output:
          | { type: 'credit_card'; cardNumber: string; expiry: string }
          | { type: 'bank_transfer'; bankCode: string; accountNumber: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/compositionKeywords/any-of-three': {
      $get: { input: {}; output: string | number | string; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/compositionKeywords/any-of-ref': {
      $get: {
        input: {}
        output:
          | { name: string; purring?: boolean | undefined }
          | { name: string; barkVolume?: number | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/callbacksField/orders': {
      $post: {
        input: { json: { item: string; quantity: number; callbackUrl: string } }
        output: { id: string; item: string; quantity: number; status: string }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/callbacksField/payments': {
      $post: {
        input: {
          json: { amount: number; currency: string; successUrl: string; failureUrl: string }
        }
        output: { id: string; amount: number; currency: string; status: string }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/callbacksField/items': {
      $get: { input: {}; output: { id: string; name: string }[]; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/arrayObjectConstraints/tags': {
      $get: {
        input: {}
        output: { tags: string[]; ids: number[]; labels: string[] }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: {
          json: {
            metadata: { key?: string | undefined; value?: string | undefined }
            config?: { name?: string | undefined } | undefined
            limited?: { a?: string | undefined; b?: string | undefined } | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 201
      }
    }
  } & {
    '/arrayObjectConstraints/settings': {
      $get: {
        input: { query: { filter?: string | undefined } }
        output: { [x: string]: string }
        outputFormat: 'json'
        status: 200
      }
      $put: { input: { json: { avatar: string } }; output: {}; outputFormat: string; status: 200 }
    }
  } & {
    '/arrayObjectConstraints/config': {
      $post: {
        input: {
          json: {
            data: { [x: string]: string }
            headers?: { [x: string]: unknown } | undefined
            keys?: { [x: string]: string } | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 201
      }
    }
  } & {
    '/arrayObjectConstraints/payment': {
      $post: {
        input: {
          json: {
            creditCard?: string | undefined
            billingAddress?: string | undefined
            email?: string | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 201
      }
    }
  } & {
    '/trailingSlash/api/reverseChiban/': {
      $get: { input: {}; output: { result: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/trailingSlash/api/reverseChiban': {
      $get: { input: {}; output: { result: string }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/trailingSlash/posts/': {
      $get: {
        input: { query: { limit?: number | undefined } }
        output: { items: string[]; total: number }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { json: { title: string } }
        output: { id: number; title: string }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/trailingSlash/users/:id/': {
      $get: {
        input: { param: { id: string } }
        output: { id: string; name: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/trailingSlash/items/': {
      $get: { input: {}; output: { items: string[] }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/readonlyRef/users': {
      $get: {
        input: {}
        output: { users: { id: string; name: string; email: string }[]; total: number }
        outputFormat: 'json'
        status: 200
      }
      $post:
        | {
            input: { json: { name: string; email: string } }
            output: { id: string; name: string; email: string }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: { json: { name: string; email: string } }
            output: { code: number; message: string }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/readonlyRef/users/:id': {
      $get:
        | {
            input: { param: { id: string } }
            output: { id: string; name: string; email: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } }
            output: { code: number; message: string }
            outputFormat: 'json'
            status: 404
          }
      $put: {
        input: { param: { id: string } } & {
          json: { name?: string | undefined; email?: string | undefined }
        }
        output: { id: string; name: string; email: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/readonlyRef/items': {
      $get:
        | { input: {}; output: { id: number; title: string }[]; outputFormat: 'json'; status: 200 }
        | {
            input: {}
            output: { code: number; message: string }
            outputFormat: 'json'
            status: 500
          }
    }
  } & {
    '/trailingSlashReal/api/reverseGeocode/': {
      $get: {
        input: {
          query: {
            callback?: string | undefined
            search_type?: '0' | '1' | '2' | undefined
            lat?: number | undefined
            lon?: number | undefined
            polygon?: string | undefined
            radius?: number | undefined
            include_shape?: boolean | undefined
            include_count?: boolean | undefined
            limit?: number | undefined
            offset?: number | undefined
          }
        }
        output: {
          status: 'success' | 'zero results' | 'error'
          results: { region: string; city: string; code: string; lat: string; lon: string }[]
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/trailingSlashReal/api/v2/public/booking/account/register/oauth/': {
      $post:
        | {
            input: {
              json: { account: { [x: string]: unknown }; profile: { [x: string]: unknown } }
            }
            output: { message: string; provisionalId?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: { account: { [x: string]: unknown }; profile: { [x: string]: unknown } }
            }
            output: { message: string; provisionalId?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/trailingSlashReal/api/v2/public/booking/account/register/email': {
      $post: {
        input: { json: { email: string } }
        output: { message: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/defaultResponse/items': {
      $post: {
        input: { json: { id: string; name: string } }
        output: { id: string; name: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/defaultResponse/ping': {
      $get: { input: {}; output: string; outputFormat: 'text'; status: 200 }
    }
  } & {
    '/complexSchemas/expressions': {
      $post: {
        input: {
          json:
            | { type: 'literal'; value: string | number | boolean }
            | { type: 'unary'; operator: '-' | '!'; operand: unknown }
            | { type: 'binary'; operator: '+' | '-' | '*' | '/'; left: unknown; right: unknown }
        }
        output:
          | { type: 'literal'; value: string | number | boolean }
          | { type: 'unary'; operator: '-' | '!'; operand: unknown }
          | { type: 'binary'; operator: '+' | '-' | '*' | '/'; left: unknown; right: unknown }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/complexSchemas/shapes': {
      $post: {
        input: {
          json:
            | { kind: 'circle'; radius: number }
            | { kind: 'rectangle'; width: number; height: number }
            | { kind: 'triangle'; base: number; height: number }
            | { kind: 'polygon'; sides: number; sideLength: number }
            | { kind: 'ellipse'; semiMajor: number; semiMinor: number }
        }
        output:
          | { kind: 'circle'; radius: number }
          | { kind: 'rectangle'; width: number; height: number }
          | { kind: 'triangle'; base: number; height: number }
          | { kind: 'polygon'; sides: number; sideLength: number }
          | { kind: 'ellipse'; semiMajor: number; semiMinor: number }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/complexSchemas/documents': {
      $post: {
        input: {
          json:
            | {
                id: string
                title: string
                createdAt: string
                docType: 'article'
                body: string
                wordCount?: number | undefined
              }
            | {
                id: string
                title: string
                createdAt: string
                docType: 'spreadsheet'
                rows: number
                columns: number
              }
        }
        output:
          | {
              id: string
              title: string
              createdAt: string
              docType: 'article'
              body: string
              wordCount?: number | undefined
            }
          | {
              id: string
              title: string
              createdAt: string
              docType: 'spreadsheet'
              rows: number
              columns: number
            }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/complexSchemas/configs': {
      $post: {
        input: {
          json: {
            version: number
            host: string
            port: number
            tlsEnabled: boolean
            certPath?: string | undefined
          }
        }
        output: {
          version: number
          host: string
          port: number
          tlsEnabled: boolean
          certPath?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/complexSchemas/nullable-union': {
      $get: {
        input: {}
        output:
          | { status: 'success'; data: { [x: string]: unknown } }
          | { status: 'error'; message: string; code?: number | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/complexSchemas/nested-circular': {
      $get: {
        input: {}
        output: {
          id: number
          name: string
          parent?: unknown | undefined
          children?: unknown[] | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/vendorExtensions/users': {
      $post: {
        input: {
          json: { email: string; username: string; price: number; tags?: string[] | undefined }
        }
        output: { id: string; email: string; username: string }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/vendorExtensions/users/:userId': {
      $get: {
        input: { param: { userId: string } }
        output: { id: string; email: string; username: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/vendorExtensions/posts': {
      $post: {
        input: { json: { authorId: string; title: string; quantity: number } }
        output: { id: string; authorId: string; title: string }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/vendorExtensions/transforms': {
      $post: {
        input: {
          json: {
            trimmed: string
            lowered: string
            uppered: string
            normalized: string
            lowercased: string
            uppercased: string
            startsWithHttps: string
            endsWithTest: string
            includesSlug: string
            emailNormalized: string
            allChained: string
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/vendorExtensions/coerce': {
      $post: {
        input: {
          json: {
            asString: string
            asDate: string
            asNumber: number
            asInt: number
            asBool: boolean
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/vendorExtensions/replacements': {
      $post: {
        input: {
          json: {
            codecDate: string
            transformed: string
            piped: string
            preprocessed: string
            asStringBool: boolean
            asStringBoolCustom: boolean
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/vendorExtensions/formats': {
      $post: {
        input: {
          json: {
            emailHtml5: string
            customEmail: string
            uuidV8: string
            httpsUrl: string
            hostScopedUrl: string
            preciseDatetime: string
            localDatetime: string
            colonMac: string
            dotMac: string
            hs256Jwt: string
            sha256Hash: string
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/vendorExtensions/custom': {
      $post: {
        input: {
          json: {
            password: string
            normalizedEmail: string
            config: { name?: string | undefined }
            greeting: string
            retries: number
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/vendorExtensions/messages': {
      $post: {
        input: {
          json: {
            username: string
            code: string
            slug: string
            age: number
            score: number
            count: number
            active: boolean
            tags: string[]
            pin: number[]
            role: 'admin' | 'editor' | 'viewer'
            priority: 1 | 2 | 3
            color: 'red'
            kind: string
            uniqueTags: string[]
            namespaced: { a?: string | undefined; b?: string | undefined; c?: string | undefined }
            prefixed: { [x: string]: unknown }
            payload: string
            token?: string | undefined
            tokenLabel?: string | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/vendorExtensions/composition': {
      $post: {
        input: { json: { [x: string]: unknown } | { [x: string]: unknown } }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/vendorExtensions/conditional': {
      $post: {
        input: { json: { kind: 'premium' | 'basic'; feature?: string | undefined } }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/vendorExtensions/applicators': {
      $post: {
        input: { json: { tuple: boolean[]; list: string[]; meta: { id?: string | undefined } } }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/pagination/items': {
      $get: {
        input: { query: { limit?: number | undefined; cursor?: string | undefined } }
        output: { items: { id: string; name: string }[]; nextCursor?: string | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/pagination/feeds': {
      $get: {
        input: {}
        output: { items: { id: string; name: string }[]; nextCursor?: string | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/pagination/users/:userId/posts': {
      $get: {
        input: { param: { userId: string } } & { query: { cursor?: string | undefined } }
        output: { items: { id: string; name: string }[]; nextCursor?: string | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
