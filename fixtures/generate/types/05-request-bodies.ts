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
            form: File | { file: File; description?: string | undefined }
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
              | { email: string; name?: string | undefined; password?: File | undefined }
              | { email: string; name?: string | undefined; password?: File | undefined }[]
          }
          output: {}
          outputFormat: string
          status: 201
        }
      }
    }
  >,
  '/'
>
export default routes
