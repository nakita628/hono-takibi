declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/': { $get: { input: {}; output: { message: string }; outputFormat: 'json'; status: 200 } }
  } & {
    '/todo': {
      $get:
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: {
              id: string
              content: string
              completed: number
              createdAt: string
              updatedAt: string
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: { message: string }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: { message: string }
            outputFormat: 'json'
            status: 422
          }
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: { message: string }
            outputFormat: 'json'
            status: 500
          }
        | {
            input: { query: { limit?: number | undefined; offset?: number | undefined } }
            output: { message: string; retryAfter?: string | undefined }
            outputFormat: 'json'
            status: 503
          }
      $post:
        | {
            input: { json: { content: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: { json: { content: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 422
          }
        | {
            input: { json: { content: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 500
          }
        | {
            input: { json: { content: string } }
            output: { message: string; retryAfter?: string | undefined }
            outputFormat: 'json'
            status: 503
          }
    }
  } & {
    '/todo/:id': {
      $get:
        | {
            input: { param: { id: string } }
            output: {
              id: string
              content: string
              completed: number
              createdAt: string
              updatedAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { id: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 422
          }
        | {
            input: { param: { id: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 500
          }
        | {
            input: { param: { id: string } }
            output: { message: string; retryAfter?: string | undefined }
            outputFormat: 'json'
            status: 503
          }
      $put:
        | {
            input: { param: { id: string } } & {
              json: { content?: string | undefined; completed?: number | undefined }
            }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { param: { id: string } } & {
              json: { content?: string | undefined; completed?: number | undefined }
            }
            output: { message: string }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { id: string } } & {
              json: { content?: string | undefined; completed?: number | undefined }
            }
            output: { message: string }
            outputFormat: 'json'
            status: 422
          }
        | {
            input: { param: { id: string } } & {
              json: { content?: string | undefined; completed?: number | undefined }
            }
            output: { message: string }
            outputFormat: 'json'
            status: 500
          }
        | {
            input: { param: { id: string } } & {
              json: { content?: string | undefined; completed?: number | undefined }
            }
            output: { message: string; retryAfter?: string | undefined }
            outputFormat: 'json'
            status: 503
          }
      $delete:
        | { input: { param: { id: string } }; output: {}; outputFormat: string; status: 204 }
        | {
            input: { param: { id: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { id: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 422
          }
        | {
            input: { param: { id: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 500
          }
        | {
            input: { param: { id: string } }
            output: { message: string; retryAfter?: string | undefined }
            outputFormat: 'json'
            status: 503
          }
    }
  },
  '/'
>
export default routes
