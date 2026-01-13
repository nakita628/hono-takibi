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
      '/stream': { $get: { input: {}; output: Response; outputFormat: 'json'; status: StatusCode } }
    } & {
      '/graphql': {
        $post: {
          input: {
            json:
              | string
              | {
                  query?: string | undefined
                  variables?: Record<string, never> | undefined
                  operationName?: string | undefined
                }
          }
          output: { data?: {} | undefined; errors?: {}[] | undefined }
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/grpc-gateway': {
        $post: { input: {}; output: Response; outputFormat: 'json'; status: StatusCode }
      }
    } & {
      '/deprecated-endpoint': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
    }
  >,
  '/'
>
export default routes
