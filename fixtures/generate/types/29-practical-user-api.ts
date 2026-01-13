declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/auth/register': {
      $post:
        | {
            input: { json: { email: string; password: string; name: string } }
            output: {
              accessToken: string
              refreshToken: string
              user: {
                id: string
                email: string
                name: string
                status: 'active' | 'inactive' | 'suspended'
                createdAt: string
                avatarUrl?: string | undefined
                role?: 'user' | 'admin' | undefined
                lastLoginAt?: string | undefined
                updatedAt?: string | undefined
              }
              expiresIn?: number | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: { json: { email: string; password: string; name: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { json: { email: string; password: string; name: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 409
          }
    }
  } & {
    '/auth/login': {
      $post:
        | {
            input: { json: { email: string; password: string } }
            output: {
              accessToken: string
              refreshToken: string
              user: {
                id: string
                email: string
                name: string
                status: 'active' | 'inactive' | 'suspended'
                createdAt: string
                avatarUrl?: string | undefined
                role?: 'user' | 'admin' | undefined
                lastLoginAt?: string | undefined
                updatedAt?: string | undefined
              }
              expiresIn?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { json: { email: string; password: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/auth/refresh': {
      $post:
        | {
            input: { json: { refreshToken: string } }
            output: {
              accessToken: string
              refreshToken: string
              user: {
                id: string
                email: string
                name: string
                status: 'active' | 'inactive' | 'suspended'
                createdAt: string
                avatarUrl?: string | undefined
                role?: 'user' | 'admin' | undefined
                lastLoginAt?: string | undefined
                updatedAt?: string | undefined
              }
              expiresIn?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { json: { refreshToken: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/auth/logout': {
      $post:
        | {
            input: {}
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/auth/password/forgot': {
      $post: {
        input: { json: { email: string } }
        output: { message?: string | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/auth/password/reset': {
      $post:
        | {
            input: { json: { token: string; password: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { json: { token: string; password: string } }
            output: {}
            outputFormat: string
            status: 200
          }
    }
  } & {
    '/users': {
      $get:
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                sort?: string | undefined
                search?: string | undefined
                status?: 'active' | 'inactive' | 'suspended' | undefined
              }
            }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
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
                search?: string | undefined
                status?: 'active' | 'inactive' | 'suspended' | undefined
              }
            }
            output: {
              data: {
                id: string
                email: string
                name: string
                status: 'active' | 'inactive' | 'suspended'
                createdAt: string
                avatarUrl?: string | undefined
                role?: 'user' | 'admin' | undefined
                lastLoginAt?: string | undefined
                updatedAt?: string | undefined
              }[]
              pagination: { page: number; limit: number; total: number; totalPages: number }
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
                search?: string | undefined
                status?: 'active' | 'inactive' | 'suspended' | undefined
              }
            }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 403
          }
    }
  } & {
    '/users/:userId': {
      $get:
        | {
            input: { param: { userId: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { userId: string } }
            output: {
              id: string
              email: string
              name: string
              status: 'active' | 'inactive' | 'suspended'
              createdAt: string
              avatarUrl?: string | undefined
              role?: 'user' | 'admin' | undefined
              lastLoginAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { userId: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/users/:userId': {
      $patch:
        | {
            input: { param: { userId: string } } & {
              json: {
                name?: string | undefined
                status?: 'active' | 'inactive' | 'suspended' | undefined
                role?: 'user' | 'admin' | undefined
              }
            }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { userId: string } } & {
              json: {
                name?: string | undefined
                status?: 'active' | 'inactive' | 'suspended' | undefined
                role?: 'user' | 'admin' | undefined
              }
            }
            output: {
              id: string
              email: string
              name: string
              status: 'active' | 'inactive' | 'suspended'
              createdAt: string
              avatarUrl?: string | undefined
              role?: 'user' | 'admin' | undefined
              lastLoginAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { userId: string } } & {
              json: {
                name?: string | undefined
                status?: 'active' | 'inactive' | 'suspended' | undefined
                role?: 'user' | 'admin' | undefined
              }
            }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/users/:userId': {
      $delete:
        | {
            input: { param: { userId: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { userId: string } }; output: {}; outputFormat: string; status: 204 }
        | {
            input: { param: { userId: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/users/me': {
      $get:
        | {
            input: {}
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: {
              id: string
              email: string
              name: string
              status: 'active' | 'inactive' | 'suspended'
              createdAt: string
              avatarUrl?: string | undefined
              role?: 'user' | 'admin' | undefined
              lastLoginAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/users/me': {
      $patch:
        | {
            input: { json: { name?: string | undefined } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { json: { name?: string | undefined } }
            output: {
              id: string
              email: string
              name: string
              status: 'active' | 'inactive' | 'suspended'
              createdAt: string
              avatarUrl?: string | undefined
              role?: 'user' | 'admin' | undefined
              lastLoginAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/users/me/password': {
      $put:
        | {
            input: { json: { currentPassword: string; newPassword: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { json: { currentPassword: string; newPassword: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { json: { currentPassword: string; newPassword: string } }
            output: {}
            outputFormat: string
            status: 200
          }
    }
  } & {
    '/users/me/avatar': {
      $put:
        | {
            input: {
              form: {
                file: import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.5/node_modules/zod/v4/core/schemas').File
              }
            }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              form: {
                file: import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.5/node_modules/zod/v4/core/schemas').File
              }
            }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              form: {
                file: import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.5/node_modules/zod/v4/core/schemas').File
              }
            }
            output: { avatarUrl?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/users/me/avatar': {
      $delete:
        | {
            input: {}
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
    }
  },
  '/'
>
export default routes
