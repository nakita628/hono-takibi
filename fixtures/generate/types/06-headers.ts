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
      '/resources': {
        $get: {
          input: { header: { 'X-Request-ID'?: string | undefined } }
          output: { id?: string | undefined; name?: string | undefined; data?: {} | undefined }[]
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/resources/:id': {
        $get:
          | {
              input: { param: { id: string } } & {
                header: { 'If-None-Match'?: string | undefined }
              }
              output: { id?: string | undefined; name?: string | undefined; data?: {} | undefined }
              outputFormat: 'json'
              status: 200
            }
          | {
              input: { param: { id: string } } & {
                header: { 'If-None-Match'?: string | undefined }
              }
              output: {}
              outputFormat: string
              status: 304
            }
      }
    } & {
      '/resources/:id': {
        $put:
          | {
              input: { param: { id: string } } & { header: { 'If-Match': string } } & {
                json: {
                  id?: string | undefined
                  name?: string | undefined
                  data?: Record<string, never> | undefined
                }
              }
              output: { id?: string | undefined; name?: string | undefined; data?: {} | undefined }
              outputFormat: 'json'
              status: 200
            }
          | {
              input: { param: { id: string } } & { header: { 'If-Match': string } } & {
                json: {
                  id?: string | undefined
                  name?: string | undefined
                  data?: Record<string, never> | undefined
                }
              }
              output: {}
              outputFormat: string
              status: 412
            }
      }
    } & {
      '/download/:id': {
        $get: {
          input: { param: { id: string } }
          output: Response
          outputFormat: 'json'
          status: StatusCode
        }
      }
    }
  >,
  '/'
>
export default routes
