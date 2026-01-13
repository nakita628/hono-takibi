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
    '/messages': {
      $post: {
        input: { json: unknown }
        output:
          | { type: 'text'; text: string }
          | { type: 'image'; url: string }
          | { type: 'video'; url: string; duration: number }
        outputFormat: 'json'
        status: 200
      }
    }
  }>,
  '/'
>
export default routes
