declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/items/:itemId': {
      $get: {
        input: { param: { itemId: number } } & { query: { fields?: string | undefined } } & {
          header: { version?: string | undefined }
        }
        output: { id: number; name: string; createdAt: string }
        outputFormat: 'json'
        status: 200
      }
      $put: {
        input: { param: { itemId: number } } & { header: { version: string } } & {
          json: { name?: string | undefined }
        }
        output: { id: number; name: string; createdAt: string }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { itemId: number } } & { header: { version?: string | undefined } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/items': {
      $get: {
        input: {
          query: {
            limit?: number | undefined
            offset?: number | undefined
            sort?: 'name' | 'created' | 'updated' | undefined
          }
        }
        output: { items: { id: number; name: string; createdAt: string }[]; total: number }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
