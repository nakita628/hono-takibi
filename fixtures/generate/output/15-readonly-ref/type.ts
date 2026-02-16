declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/users': {
      $get: {
        input: {}
        output: { users: { id: string; name: string; email: string }[]; total: number }
        outputFormat: 'json'
        status: 200
      }
      $post:
        | {
            input: { json: { name: string; email: string } }
            output: { id: string; name: string; email: string }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: { json: { name: string; email: string } }
            output: { code: number; message: string }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/users/:id': {
      $get:
        | {
            input: { param: { id: string } }
            output: { id: string; name: string; email: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { id: string } }
            output: { code: number; message: string }
            outputFormat: 'json'
            status: 404
          }
      $put: {
        input: { param: { id: string } } & {
          json: { name?: string | undefined; email?: string | undefined }
        }
        output: { id: string; name: string; email: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/items': {
      $get:
        | { input: {}; output: { id: number; title: string }[]; outputFormat: 'json'; status: 200 }
        | {
            input: {}
            output: { code: number; message: string }
            outputFormat: 'json'
            status: 500
          }
    }
  },
  '/'
>
export default routes
