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
      '/extreme-responses': {
        $get:
          | { input: {}; output: Response; outputFormat: 'json'; status: StatusCode }
          | { input: {}; output: {}; outputFormat: string; status: InfoStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: SuccessStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: RedirectStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ClientErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: ServerErrorStatusCode }
          | { input: {}; output: {}; outputFormat: string; status: 100 }
          | { input: {}; output: {}; outputFormat: string; status: 101 }
          | { input: {}; output: {}; outputFormat: string; status: 102 }
          | { input: {}; output: {}; outputFormat: string; status: 103 }
          | {
              input: {}
              output:
                | string
                | {}
                | {
                    readonly type: string
                    readonly size: number
                    readonly lastModified: number
                    readonly name: string
                    readonly webkitRelativePath: string
                    slice: never
                  }
              outputFormat: 'json'
              status: 200
            }
          | {
              input: {}
              output: string | Record<string, never> | File
              outputFormat: 'text'
              status: 200
            }
          | { input: {}; output: {}; outputFormat: string; status: 201 }
          | { input: {}; output: {}; outputFormat: string; status: 202 }
          | { input: {}; output: {}; outputFormat: string; status: 203 }
          | { input: {}; output: {}; outputFormat: string; status: 204 }
          | { input: {}; output: {}; outputFormat: string; status: 205 }
          | { input: {}; output: {}; outputFormat: string; status: 206 }
          | { input: {}; output: {}; outputFormat: string; status: 207 }
          | { input: {}; output: {}; outputFormat: string; status: 208 }
          | { input: {}; output: {}; outputFormat: string; status: 226 }
          | { input: {}; output: {}; outputFormat: string; status: 300 }
          | { input: {}; output: {}; outputFormat: string; status: 301 }
          | { input: {}; output: {}; outputFormat: string; status: 302 }
          | { input: {}; output: {}; outputFormat: string; status: 303 }
          | { input: {}; output: {}; outputFormat: string; status: 304 }
          | { input: {}; output: {}; outputFormat: string; status: 305 }
          | { input: {}; output: {}; outputFormat: string; status: 307 }
          | { input: {}; output: {}; outputFormat: string; status: 308 }
          | { input: {}; output: {}; outputFormat: string; status: 400 }
          | { input: {}; output: {}; outputFormat: string; status: 401 }
          | { input: {}; output: {}; outputFormat: string; status: 402 }
          | { input: {}; output: {}; outputFormat: string; status: 403 }
          | { input: {}; output: {}; outputFormat: string; status: 404 }
          | { input: {}; output: {}; outputFormat: string; status: 405 }
          | { input: {}; output: {}; outputFormat: string; status: 406 }
          | { input: {}; output: {}; outputFormat: string; status: 407 }
          | { input: {}; output: {}; outputFormat: string; status: 408 }
          | { input: {}; output: {}; outputFormat: string; status: 409 }
          | { input: {}; output: {}; outputFormat: string; status: 410 }
          | { input: {}; output: {}; outputFormat: string; status: 411 }
          | { input: {}; output: {}; outputFormat: string; status: 412 }
          | { input: {}; output: {}; outputFormat: string; status: 413 }
          | { input: {}; output: {}; outputFormat: string; status: 414 }
          | { input: {}; output: {}; outputFormat: string; status: 415 }
          | { input: {}; output: {}; outputFormat: string; status: 416 }
          | { input: {}; output: {}; outputFormat: string; status: 417 }
          | { input: {}; output: {}; outputFormat: string; status: 418 }
          | { input: {}; output: {}; outputFormat: string; status: 421 }
          | { input: {}; output: {}; outputFormat: string; status: 422 }
          | { input: {}; output: {}; outputFormat: string; status: 423 }
          | { input: {}; output: {}; outputFormat: string; status: 424 }
          | { input: {}; output: {}; outputFormat: string; status: 425 }
          | { input: {}; output: {}; outputFormat: string; status: 426 }
          | { input: {}; output: {}; outputFormat: string; status: 428 }
          | { input: {}; output: {}; outputFormat: string; status: 429 }
          | { input: {}; output: {}; outputFormat: string; status: 431 }
          | { input: {}; output: {}; outputFormat: string; status: 451 }
          | { input: {}; output: {}; outputFormat: string; status: 500 }
          | { input: {}; output: {}; outputFormat: string; status: 501 }
          | { input: {}; output: {}; outputFormat: string; status: 502 }
          | { input: {}; output: {}; outputFormat: string; status: 503 }
          | { input: {}; output: {}; outputFormat: string; status: 504 }
          | { input: {}; output: {}; outputFormat: string; status: 505 }
          | { input: {}; output: {}; outputFormat: string; status: 506 }
          | { input: {}; output: {}; outputFormat: string; status: 507 }
          | { input: {}; output: {}; outputFormat: string; status: 508 }
          | { input: {}; output: {}; outputFormat: string; status: 510 }
          | { input: {}; output: {}; outputFormat: string; status: 511 }
          | {
              input: {}
              output: { code?: number | undefined; message?: string | undefined }
              outputFormat: 'json'
              status: -1
            }
      }
    } & {
      '/multipart-variations': {
        $post: {
          input: {
            form:
              | Record<string, never>
              | { file?: File | undefined; metadata?: string | undefined }
              | { parts?: File[] | undefined }
              | { root?: string | undefined; attachments?: File[] | undefined }
              | { text?: string | undefined; html?: string | undefined }
              | { field1?: string | undefined; field2?: string[] | undefined }
          }
          output: {}
          outputFormat: string
          status: 200
        }
      }
    } & {
      '/charset-variations': {
        $post: {
          input: { form: string | Record<string, never> } & { json: string | Record<string, never> }
          output: {}
          outputFormat: string
          status: 200
        }
      }
    }
  >,
  '/'
>
export default routes
