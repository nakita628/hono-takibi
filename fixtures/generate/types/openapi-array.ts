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
    '/array': {
      $get: {
        input: {}
        output: {
          string_array: string[]
          equivalent: string[]
          string_optional_array: string[]
          nonempty: string[]
          min5: string[]
          max5: string[]
          length5: string[]
          string_array_optional?: string[] | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  }>,
  '/'
>
export default routes
