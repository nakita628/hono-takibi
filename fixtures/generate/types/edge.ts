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
      '/polymorphic': {
        $post: {
          input: {
            json:
              | ({ type: string } & { livesLeft?: number | undefined })
              | ({ type: string } & { barkLevel?: 'quiet' | 'normal' | 'loud' | undefined })
          }
          output: {}
          outputFormat: string
          status: 200
        }
      }
    } & {
      '/search': {
        $get: {
          input: { query: { q: string; filter?: string | string[] | undefined; exclude?: any } }
          output: {}
          outputFormat: string
          status: 200
        }
      }
    } & {
      '/multi-step': {
        $put: {
          input: {
            json: { id: string; metadata?: Record<string, string> | null | undefined } & {
              step?: number | undefined
            }
          }
          output: {}
          outputFormat: string
          status: 204
        }
      }
    }
  >,
  '/'
>
export default routes
