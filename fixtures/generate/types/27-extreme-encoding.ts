declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
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
            output: {
              data?: { [x: string]: unknown } | undefined
              meta?: { [x: string]: unknown } | undefined
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
            output: {
              data?: { [x: string]: unknown } | undefined
              meta?: { [x: string]: unknown } | undefined
            }
            outputFormat: 'text'
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
            output: {
              data?: { [x: string]: unknown } | undefined
              meta?: { [x: string]: unknown } | undefined
            }
            outputFormat: 'text'
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
            output: string
            outputFormat: 'text'
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
            output: string
            outputFormat: 'text'
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
            output: string
            outputFormat: 'text'
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
            output: File
            outputFormat: 'text'
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
            output: {
              data?: { [x: string]: unknown } | { [x: string]: unknown }[] | undefined
              included?: { [x: string]: unknown }[] | undefined
              meta?: { [x: string]: unknown } | undefined
              links?: { [x: string]: unknown } | undefined
              jsonapi?: { version?: string | undefined } | undefined
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
            output: {
              _links?: { self?: { href?: string | undefined } | undefined } | undefined
              _embedded?: { [x: string]: unknown } | undefined
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
            output: {
              type?: string | undefined
              title?: string | undefined
              status?: number | undefined
              detail?: string | undefined
              instance?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/binary-variations': {
      $post: {
        input: {
          json:
            | File
            | {
                data?: string | undefined
                filename?: string | undefined
                mimeType?: string | undefined
              }
        }
        output: {}
        outputFormat: string
        status: 200
      }
    }
  } & {
    '/streaming': {
      $get:
        | { input: {}; output: string; outputFormat: 'text'; status: 200 }
        | { input: {}; output: string; outputFormat: 'text'; status: 200 }
        | {
            input: {}
            output: {
              id?: string | undefined
              data?: { [x: string]: unknown } | undefined
              timestamp?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
      $post: { input: { json: string | File }; output: {}; outputFormat: string; status: 200 }
    }
  } & {
    '/url-encoded-complex': {
      $post: {
        input: {
          json: {
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
        } & {
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
        output: {
          data?: { [x: string]: unknown } | undefined
          meta?: { [x: string]: unknown } | undefined
        }
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
  },
  '/'
>
export default routes
