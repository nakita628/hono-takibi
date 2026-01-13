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
  RemoveIndexSignature<{
    '/fizzbuzz': {
      $get:
        | {
            input: { query: { number: unknown; details?: string | undefined } }
            output: { result: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { number: unknown; details?: string | undefined } }
            output: { error?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  }>,
  '/'
>
export default routes
