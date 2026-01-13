declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/resources': {
      $get: {
        input: { header: { 'X-Request-ID'?: string | undefined } }
        output: {
          id?: string | undefined
          name?: string | undefined
          data?: { [x: string]: unknown } | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/resources/:id': {
      $get:
        | {
            input: { param: { id: string } } & { header: { 'If-None-Match'?: string | undefined } }
            output: {
              id?: string | undefined
              name?: string | undefined
              data?: { [x: string]: unknown } | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } } & { header: { 'If-None-Match'?: string | undefined } }
            output: {}
            outputFormat: string
            status: 304
          }
      $put:
        | {
            input: { param: { id: string } } & { header: { 'If-Match': string } } & {
              json: {
                id?: string | undefined
                name?: string | undefined
                data?: { [x: string]: unknown } | undefined
              }
            }
            output: {
              id?: string | undefined
              name?: string | undefined
              data?: { [x: string]: unknown } | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } } & { header: { 'If-Match': string } } & {
              json: {
                id?: string | undefined
                name?: string | undefined
                data?: { [x: string]: unknown } | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 412
          }
    }
  } & {
    '/download/:id': {
      $get: { input: { param: { id: string } }; output: File; outputFormat: 'text'; status: 200 }
    }
  },
  '/'
>
export default routes
