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
      '/': { $get: { input: {}; output: { message: string }; outputFormat: 'json'; status: 200 } }
    } & {
      '/posts': {
        $get:
          | {
              input: { query: { page: unknown; rows: unknown } }
              output: { id: string; post: string; createdAt: string; updatedAt: string }[]
              outputFormat: 'json'
              status: 200
            }
          | {
              input: { query: { page: unknown; rows: unknown } }
              output: { message: string }
              outputFormat: 'json'
              status: 400
            }
          | {
              input: { query: { page: unknown; rows: unknown } }
              output: { message: string }
              outputFormat: 'json'
              status: 500
            }
      }
    } & {
      '/posts': {
        $post:
          | {
              input: { json: { post: string } }
              output: { message: string }
              outputFormat: 'json'
              status: 400
            }
          | {
              input: { json: { post: string } }
              output: { message: string }
              outputFormat: 'json'
              status: 500
            }
          | {
              input: { json: { post: string } }
              output: { message: string }
              outputFormat: 'json'
              status: 201
            }
      }
    } & {
      '/posts/:id': {
        $put:
          | {
              input: { param: { id: string } } & { json: { post: string } }
              output: { message: string }
              outputFormat: 'json'
              status: 400
            }
          | {
              input: { param: { id: string } } & { json: { post: string } }
              output: { message: string }
              outputFormat: 'json'
              status: 500
            }
          | {
              input: { param: { id: string } } & { json: { post: string } }
              output: {}
              outputFormat: string
              status: 204
            }
      }
    } & {
      '/posts/:id': {
        $delete:
          | {
              input: { param: { id: string } }
              output: { message: string }
              outputFormat: 'json'
              status: 400
            }
          | {
              input: { param: { id: string } }
              output: { message: string }
              outputFormat: 'json'
              status: 500
            }
          | { input: { param: { id: string } }; output: {}; outputFormat: string; status: 204 }
      }
    }
  >,
  '/'
>
export default routes
