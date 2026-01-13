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
      '/encoding-test': {
        $post: {
          input: {
            form: {
              simpleString?: string | undefined
              arrayExplode?: string[] | undefined
              arrayNoExplode?: string[] | undefined
              objectForm?: { key1?: string | undefined; key2?: number | undefined } | undefined
              objectDeepObject?: { nested?: { deep?: string | undefined } | undefined } | undefined
              imageFile?: File | undefined
              documentFile?: File | undefined
              jsonString?: { data?: string | undefined } | undefined
              base64Data?: string | undefined
              multipleFiles?: File[] | undefined
              complexNested?:
                | {
                    level1?:
                      | {
                          level2?:
                            | { value?: string | undefined; array?: number[] | undefined }
                            | undefined
                        }
                      | undefined
                  }
                | undefined
              arrayOfObjects?: { id?: number | undefined; name?: string | undefined }[] | undefined
              partWithHeaders?: string | undefined
            }
          }
          output: {}
          outputFormat: string
          status: 200
        }
      }
    } & {
      '/content-negotiation': {
        $get:
          | {
              input: {
                header: {
                  Accept?: string | undefined
                  'Accept-Language'?: string | undefined
                  'Accept-Encoding'?: string | undefined
                  'Accept-Charset'?: string | undefined
                }
              }
              output: Response
              outputFormat: 'json'
              status: StatusCode
            }
          | {
              input: {
                header: {
                  Accept?: string | undefined
                  'Accept-Language'?: string | undefined
                  'Accept-Encoding'?: string | undefined
                  'Accept-Charset'?: string | undefined
                }
              }
              output:
                | string
                | {
                    readonly type: string
                    readonly size: number
                    readonly lastModified: number
                    readonly name: string
                    readonly webkitRelativePath: string
                    slice: never
                  }
                | { data?: {} | undefined; meta?: {} | undefined }
                | {
                    data?: {} | {}[] | undefined
                    included?: {}[] | undefined
                    meta?: {} | undefined
                    links?: {} | undefined
                    jsonapi?: { version?: string | undefined } | undefined
                  }
                | {
                    _links?: { self?: { href?: string | undefined } | undefined } | undefined
                    _embedded?: {} | undefined
                  }
                | {
                    type?: string | undefined
                    title?: string | undefined
                    status?: number | undefined
                    detail?: string | undefined
                    instance?: string | undefined
                  }
              outputFormat: 'json'
              status: 200
            }
          | {
              input: {
                header: {
                  Accept?: string | undefined
                  'Accept-Language'?: string | undefined
                  'Accept-Encoding'?: string | undefined
                  'Accept-Charset'?: string | undefined
                }
              }
              output:
                | string
                | File
                | {
                    data?: Record<string, never> | undefined
                    meta?: Record<string, never> | undefined
                  }
                | {
                    data?: Record<string, never> | Record<string, never>[] | undefined
                    included?: Record<string, never>[] | undefined
                    meta?: Record<string, never> | undefined
                    links?: Record<string, never> | undefined
                    jsonapi?: { version?: string | undefined } | undefined
                  }
                | {
                    _links?: { self?: { href?: string | undefined } | undefined } | undefined
                    _embedded?: Record<string, never> | undefined
                  }
                | {
                    type?: string | undefined
                    title?: string | undefined
                    status?: number | undefined
                    detail?: string | undefined
                    instance?: string | undefined
                  }
              outputFormat: 'text'
              status: 200
            }
      }
    } & {
      '/binary-variations': {
        $post: {
          input: {
            json:
              | string
              | File
              | {
                  data?: string | undefined
                  filename?: string | undefined
                  mimeType?: string | undefined
                }
              | { part1?: File | undefined; part2?: File | undefined; part3?: File | undefined }
          }
          output: {}
          outputFormat: string
          status: 200
        }
      }
    } & {
      '/streaming': {
        $get:
          | { input: {}; output: Response; outputFormat: 'json'; status: StatusCode }
          | {
              input: {}
              output:
                | string
                | {
                    id?: string | undefined
                    data?: {} | undefined
                    timestamp?: string | undefined
                  }[]
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/streaming': { $post: { input: {}; output: {}; outputFormat: string; status: 200 } }
    } & {
      '/url-encoded-complex': {
        $post: {
          input: {
            form: {
              string?: string | undefined
              number?: number | undefined
              boolean?: boolean | undefined
              arrayDefault?: string[] | undefined
              arrayExplode?: number[] | undefined
              nested?:
                | { key1?: string | undefined; key2?: { subkey?: string | undefined } | undefined }
                | undefined
              specialChars?: string | undefined
              unicode?: string | undefined
              emptyString?: string | undefined
              multiValue?: string[] | undefined
            }
          }
          output: {}
          outputFormat: string
          status: 200
        }
      }
    } & {
      '/response-encoding': {
        $get: {
          input: {}
          output: { data?: {} | undefined; meta?: {} | undefined }
          outputFormat: 'json'
          status: 200
        }
      }
    } & {
      '/schema-encoding': {
        $post: {
          input: {
            json: {
              base64Field?: string | undefined
              base64urlField?: string | undefined
              jsonString?: string | undefined
              xmlString?: string | undefined
              embeddedJson?: string | undefined
              binaryData?: string | undefined
              imageData?: string | undefined
            }
          }
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
