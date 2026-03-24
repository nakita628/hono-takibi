declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/todos': {
      $get: {
        input: { query: { limit?: number | undefined; offset?: number | undefined } }
        output: {
          total: number
          items: {
            id: number
            title: string
            description?: string | undefined
            completed: boolean
            createdAt: string
            updatedAt: string
          }[]
        }
        outputFormat: 'json'
        status: 200
      }
      $post:
        | {
            input: { json: { title: string; description?: string | undefined } }
            output: {
              id: number
              title: string
              description?: string | undefined
              completed: boolean
              createdAt: string
              updatedAt: string
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: { json: { title: string; description?: string | undefined } }
            output: { message: string; code?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/todos/:id': {
      $get:
        | {
            input: { param: { id: number } }
            output: {
              id: number
              title: string
              description?: string | undefined
              completed: boolean
              createdAt: string
              updatedAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: number } }
            output: { message: string; code?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $patch:
        | {
            input: { param: { id: number } } & {
              json: {
                title?: string | undefined
                description?: string | undefined
                completed?: boolean | undefined
              }
            }
            output: {
              id: number
              title: string
              description?: string | undefined
              completed: boolean
              createdAt: string
              updatedAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: number } } & {
              json: {
                title?: string | undefined
                description?: string | undefined
                completed?: boolean | undefined
              }
            }
            output: { message: string; code?: string | undefined }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { id: number } } & {
              json: {
                title?: string | undefined
                description?: string | undefined
                completed?: boolean | undefined
              }
            }
            output: { message: string; code?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $delete:
        | { input: { param: { id: number } }; output: {}; outputFormat: string; status: 204 }
        | {
            input: { param: { id: number } }
            output: { message: string; code?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/health': { $get: { input: {}; output: { status: 'ok' }; outputFormat: 'json'; status: 200 } }
  },
  '/'
>
export default routes
