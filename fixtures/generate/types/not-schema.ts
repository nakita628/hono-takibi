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
    '/validate': {
      $post: {
        input: {
          json: {
            notSpecificValue?: any
            notString?: any
            notNumber?: any
            notNull?: any
            notArray?: any
            notObject?: any
            notInList?: any
            notBoolean?: any
            notInteger?: any
          }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  }>,
  '/'
>
export default routes
