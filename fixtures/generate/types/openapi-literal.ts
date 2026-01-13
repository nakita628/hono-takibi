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
    '/primitive': {
      $get: {
        input: {}
        output: { tuna_literal: 'tuna'; twelve_literal: 12; twobig_literal: 2; true_literal: true }
        outputFormat: 'json'
        status: 200
      }
    }
  }>,
  '/'
>
export default routes
