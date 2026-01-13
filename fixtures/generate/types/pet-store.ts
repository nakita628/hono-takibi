declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/pet': {
      $put:
        | {
            input: {
              json: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            } & {
              form: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            }
            output: {
              id?: bigint | undefined
              name: string
              category?: { id?: bigint | undefined; name?: string | undefined } | undefined
              photoUrls: string[]
              tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
              status?: 'available' | 'pending' | 'sold' | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            } & {
              form: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            }
            output: {
              id?: bigint | undefined
              name: string
              category?: { id?: bigint | undefined; name?: string | undefined } | undefined
              photoUrls: string[]
              tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
              status?: 'available' | 'pending' | 'sold' | undefined
            }
            outputFormat: 'text'
            status: 200
          }
        | {
            input: {
              json: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            } & {
              form: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 400
          }
        | {
            input: {
              json: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            } & {
              form: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 404
          }
        | {
            input: {
              json: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            } & {
              form: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 422
          }
      $post:
        | {
            input: {
              json: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            } & {
              form: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            }
            output: {
              id?: bigint | undefined
              name: string
              category?: { id?: bigint | undefined; name?: string | undefined } | undefined
              photoUrls: string[]
              tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
              status?: 'available' | 'pending' | 'sold' | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            } & {
              form: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            }
            output: {
              id?: bigint | undefined
              name: string
              category?: { id?: bigint | undefined; name?: string | undefined } | undefined
              photoUrls: string[]
              tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
              status?: 'available' | 'pending' | 'sold' | undefined
            }
            outputFormat: 'text'
            status: 200
          }
        | {
            input: {
              json: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            } & {
              form: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 400
          }
        | {
            input: {
              json: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            } & {
              form: {
                id?: bigint | undefined
                name: string
                category?: { id?: bigint | undefined; name?: string | undefined } | undefined
                photoUrls: string[]
                tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
                status?: 'available' | 'pending' | 'sold' | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 422
          }
    }
  } & {
    '/pet/findByStatus': {
      $get:
        | {
            input: { query: { status?: 'available' | 'pending' | 'sold' | undefined } }
            output: {
              id?: bigint | undefined
              name: string
              category?: { id?: bigint | undefined; name?: string | undefined } | undefined
              photoUrls: string[]
              tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
              status?: 'available' | 'pending' | 'sold' | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { status?: 'available' | 'pending' | 'sold' | undefined } }
            output: {
              id?: bigint | undefined
              name: string
              category?: { id?: bigint | undefined; name?: string | undefined } | undefined
              photoUrls: string[]
              tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
              status?: 'available' | 'pending' | 'sold' | undefined
            }[]
            outputFormat: 'text'
            status: 200
          }
        | {
            input: { query: { status?: 'available' | 'pending' | 'sold' | undefined } }
            output: {}
            outputFormat: string
            status: 400
          }
    }
  } & {
    '/pet/findByTags': {
      $get:
        | {
            input: { query: { tags?: string[] | undefined } }
            output: {
              id?: bigint | undefined
              name: string
              category?: { id?: bigint | undefined; name?: string | undefined } | undefined
              photoUrls: string[]
              tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
              status?: 'available' | 'pending' | 'sold' | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { tags?: string[] | undefined } }
            output: {
              id?: bigint | undefined
              name: string
              category?: { id?: bigint | undefined; name?: string | undefined } | undefined
              photoUrls: string[]
              tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
              status?: 'available' | 'pending' | 'sold' | undefined
            }[]
            outputFormat: 'text'
            status: 200
          }
        | {
            input: { query: { tags?: string[] | undefined } }
            output: {}
            outputFormat: string
            status: 400
          }
    }
  } & {
    '/pet/:petId': {
      $get:
        | {
            input: { param: { petId: bigint } }
            output: {
              id?: bigint | undefined
              name: string
              category?: { id?: bigint | undefined; name?: string | undefined } | undefined
              photoUrls: string[]
              tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
              status?: 'available' | 'pending' | 'sold' | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { petId: bigint } }
            output: {
              id?: bigint | undefined
              name: string
              category?: { id?: bigint | undefined; name?: string | undefined } | undefined
              photoUrls: string[]
              tags?: { id?: bigint | undefined; name?: string | undefined }[] | undefined
              status?: 'available' | 'pending' | 'sold' | undefined
            }
            outputFormat: 'text'
            status: 200
          }
        | { input: { param: { petId: bigint } }; output: {}; outputFormat: string; status: 400 }
        | { input: { param: { petId: bigint } }; output: {}; outputFormat: string; status: 404 }
      $post: {
        input: { param: { petId: bigint } } & {
          query: { name?: string | undefined; status?: string | undefined }
        }
        output: {}
        outputFormat: string
        status: 400
      }
      $delete: {
        input: { param: { petId: bigint } } & { header: { api_key?: string | undefined } }
        output: {}
        outputFormat: string
        status: 400
      }
    }
  } & {
    '/pet/:petId/uploadImage': {
      $post: {
        input: { param: { petId: bigint } } & { query: { additionalMetadata?: string | undefined } }
        output: {
          code?: number | undefined
          type?: string | undefined
          message?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/store/inventory': {
      $get: { input: {}; output: { [x: string]: number }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/store/order': {
      $post:
        | {
            input: {
              json: {
                id?: bigint | undefined
                petId?: bigint | undefined
                quantity?: number | undefined
                shipDate?: string | undefined
                status?: 'placed' | 'approved' | 'delivered' | undefined
                complete?: boolean | undefined
              }
            } & {
              form: {
                id?: bigint | undefined
                petId?: bigint | undefined
                quantity?: number | undefined
                shipDate?: string | undefined
                status?: 'placed' | 'approved' | 'delivered' | undefined
                complete?: boolean | undefined
              }
            }
            output: {
              id?: bigint | undefined
              petId?: bigint | undefined
              quantity?: number | undefined
              shipDate?: string | undefined
              status?: 'placed' | 'approved' | 'delivered' | undefined
              complete?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                id?: bigint | undefined
                petId?: bigint | undefined
                quantity?: number | undefined
                shipDate?: string | undefined
                status?: 'placed' | 'approved' | 'delivered' | undefined
                complete?: boolean | undefined
              }
            } & {
              form: {
                id?: bigint | undefined
                petId?: bigint | undefined
                quantity?: number | undefined
                shipDate?: string | undefined
                status?: 'placed' | 'approved' | 'delivered' | undefined
                complete?: boolean | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 400
          }
        | {
            input: {
              json: {
                id?: bigint | undefined
                petId?: bigint | undefined
                quantity?: number | undefined
                shipDate?: string | undefined
                status?: 'placed' | 'approved' | 'delivered' | undefined
                complete?: boolean | undefined
              }
            } & {
              form: {
                id?: bigint | undefined
                petId?: bigint | undefined
                quantity?: number | undefined
                shipDate?: string | undefined
                status?: 'placed' | 'approved' | 'delivered' | undefined
                complete?: boolean | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 422
          }
    }
  } & {
    '/store/order/:orderId': {
      $get:
        | {
            input: { param: { orderId: bigint } }
            output: {
              id?: bigint | undefined
              petId?: bigint | undefined
              quantity?: number | undefined
              shipDate?: string | undefined
              status?: 'placed' | 'approved' | 'delivered' | undefined
              complete?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { orderId: bigint } }
            output: {
              id?: bigint | undefined
              petId?: bigint | undefined
              quantity?: number | undefined
              shipDate?: string | undefined
              status?: 'placed' | 'approved' | 'delivered' | undefined
              complete?: boolean | undefined
            }
            outputFormat: 'text'
            status: 200
          }
        | { input: { param: { orderId: bigint } }; output: {}; outputFormat: string; status: 400 }
        | { input: { param: { orderId: bigint } }; output: {}; outputFormat: string; status: 404 }
      $delete:
        | { input: { param: { orderId: bigint } }; output: {}; outputFormat: string; status: 400 }
        | { input: { param: { orderId: bigint } }; output: {}; outputFormat: string; status: 404 }
    }
  } & {
    '/user': {
      $post:
        | {
            input: {
              json: {
                id?: bigint | undefined
                username?: string | undefined
                firstName?: string | undefined
                lastName?: string | undefined
                email?: string | undefined
                password?: string | undefined
                phone?: string | undefined
                userStatus?: number | undefined
              }
            } & {
              form: {
                id?: bigint | undefined
                username?: string | undefined
                firstName?: string | undefined
                lastName?: string | undefined
                email?: string | undefined
                password?: string | undefined
                phone?: string | undefined
                userStatus?: number | undefined
              }
            }
            output: {
              id?: bigint | undefined
              username?: string | undefined
              firstName?: string | undefined
              lastName?: string | undefined
              email?: string | undefined
              password?: string | undefined
              phone?: string | undefined
              userStatus?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                id?: bigint | undefined
                username?: string | undefined
                firstName?: string | undefined
                lastName?: string | undefined
                email?: string | undefined
                password?: string | undefined
                phone?: string | undefined
                userStatus?: number | undefined
              }
            } & {
              form: {
                id?: bigint | undefined
                username?: string | undefined
                firstName?: string | undefined
                lastName?: string | undefined
                email?: string | undefined
                password?: string | undefined
                phone?: string | undefined
                userStatus?: number | undefined
              }
            }
            output: {
              id?: bigint | undefined
              username?: string | undefined
              firstName?: string | undefined
              lastName?: string | undefined
              email?: string | undefined
              password?: string | undefined
              phone?: string | undefined
              userStatus?: number | undefined
            }
            outputFormat: 'text'
            status: 200
          }
    }
  } & {
    '/user/createWithList': {
      $post:
        | {
            input: {
              json: {
                id?: bigint | undefined
                username?: string | undefined
                firstName?: string | undefined
                lastName?: string | undefined
                email?: string | undefined
                password?: string | undefined
                phone?: string | undefined
                userStatus?: number | undefined
              }[]
            }
            output: {
              id?: bigint | undefined
              username?: string | undefined
              firstName?: string | undefined
              lastName?: string | undefined
              email?: string | undefined
              password?: string | undefined
              phone?: string | undefined
              userStatus?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                id?: bigint | undefined
                username?: string | undefined
                firstName?: string | undefined
                lastName?: string | undefined
                email?: string | undefined
                password?: string | undefined
                phone?: string | undefined
                userStatus?: number | undefined
              }[]
            }
            output: {
              id?: bigint | undefined
              username?: string | undefined
              firstName?: string | undefined
              lastName?: string | undefined
              email?: string | undefined
              password?: string | undefined
              phone?: string | undefined
              userStatus?: number | undefined
            }
            outputFormat: 'text'
            status: 200
          }
        | {
            input: {
              json: {
                id?: bigint | undefined
                username?: string | undefined
                firstName?: string | undefined
                lastName?: string | undefined
                email?: string | undefined
                password?: string | undefined
                phone?: string | undefined
                userStatus?: number | undefined
              }[]
            }
            output: {}
            outputFormat: string
            status: 200
          }
    }
  } & {
    '/user/login': {
      $get:
        | {
            input: { query: { username?: string | undefined; password?: string | undefined } }
            output: string
            outputFormat: 'text'
            status: 200
          }
        | {
            input: { query: { username?: string | undefined; password?: string | undefined } }
            output: string
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { username?: string | undefined; password?: string | undefined } }
            output: {}
            outputFormat: string
            status: 400
          }
    }
  } & { '/user/logout': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/user/:username': {
      $get:
        | {
            input: { param: { username: string } }
            output: {
              id?: bigint | undefined
              username?: string | undefined
              firstName?: string | undefined
              lastName?: string | undefined
              email?: string | undefined
              password?: string | undefined
              phone?: string | undefined
              userStatus?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { username: string } }
            output: {
              id?: bigint | undefined
              username?: string | undefined
              firstName?: string | undefined
              lastName?: string | undefined
              email?: string | undefined
              password?: string | undefined
              phone?: string | undefined
              userStatus?: number | undefined
            }
            outputFormat: 'text'
            status: 200
          }
        | { input: { param: { username: string } }; output: {}; outputFormat: string; status: 400 }
        | { input: { param: { username: string } }; output: {}; outputFormat: string; status: 404 }
      $put: {
        input: { param: { username: string } } & {
          json: {
            id?: bigint | undefined
            username?: string | undefined
            firstName?: string | undefined
            lastName?: string | undefined
            email?: string | undefined
            password?: string | undefined
            phone?: string | undefined
            userStatus?: number | undefined
          }
        } & {
          form: {
            id?: bigint | undefined
            username?: string | undefined
            firstName?: string | undefined
            lastName?: string | undefined
            email?: string | undefined
            password?: string | undefined
            phone?: string | undefined
            userStatus?: number | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
      $delete:
        | { input: { param: { username: string } }; output: {}; outputFormat: string; status: 400 }
        | { input: { param: { username: string } }; output: {}; outputFormat: string; status: 404 }
    }
  },
  '/'
>
export default routes
