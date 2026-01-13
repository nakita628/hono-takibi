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
        $get: {
          input: {}
          output: { id: string; email: string; createdAt: string; name?: string | undefined }[]
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/users': {
        $post: {
          input: { json: { email: string; name?: string | undefined } }
          output: { id: string; email: string; createdAt: string; name?: string | undefined }
          outputFormat: 'json'
          status: 201
        }
      }
    } & {
      '/users/:userId': {
        $get:
          | {
              input: { param: { userId: string } }
              output: { id: string; email: string; createdAt: string; name?: string | undefined }
              outputFormat: 'json'
              status: 200
            }
          | { input: { param: { userId: string } }; output: {}; outputFormat: string; status: 404 }
      }
    }
  >,
  '/'
>
export default routes
