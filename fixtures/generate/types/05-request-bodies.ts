declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.4/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/users': {
      $post: {
        input: {
          json: {
            email: string
            name?: string | undefined
            password?:
              | import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.4/node_modules/zod/v4/core/schemas').File
              | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 201
      }
    }
  } & {
    '/users/:userId': {
      $put: {
        input: { param: { userId: string } } & {
          json: { email: string; name: string; role?: 'admin' | 'user' | 'guest' | undefined }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/users/:userId': {
      $patch: {
        input: { param: { userId: string } } & {
          json: {
            email?: string | undefined
            name?: string | undefined
            role?: 'admin' | 'user' | 'guest' | undefined
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/users/:userId/avatar': {
      $post: {
        input: { param: { userId: string } } & {
          form:
            | import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.4/node_modules/zod/v4/core/schemas').File
            | {
                file: import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.4/node_modules/zod/v4/core/schemas').File
                description?: string | undefined
              }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/bulk/users': {
      $post: {
        input: {
          json:
            | {
                email: string
                name?: string | undefined
                password?:
                  | import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.4/node_modules/zod/v4/core/schemas').File
                  | undefined
              }
            | {
                email: string
                name?: string | undefined
                password?:
                  | import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.4/node_modules/zod/v4/core/schemas').File
                  | undefined
              }[]
        }
        output: {}
        outputFormat: string
        status: 201
      }
    }
  },
  '/'
>
export default routes
