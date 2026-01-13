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
      '/hono': {
        $get: { input: {}; output: { message: string }; outputFormat: 'json'; status: 200 }
      }
    } & {
      '/hono-x': {
        $get: { input: {}; output: { message: string }; outputFormat: 'json'; status: 200 }
      }
    } & {
      '/zod-openapi-hono': {
        $get: { input: {}; output: { message: string }; outputFormat: 'json'; status: 200 }
      }
    }
  >,
  '/'
>
export default routes
