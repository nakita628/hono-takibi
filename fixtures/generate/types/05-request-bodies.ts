declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/users': {
      $post: {
        input: { json: { email: string; name?: string | undefined; password?: File | undefined } }
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
          form: { file: File; description?: string | undefined }
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
            | { email: string; name?: string | undefined; password?: File | undefined }[]
            | { email: string; name?: string | undefined; password?: File | undefined }
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
