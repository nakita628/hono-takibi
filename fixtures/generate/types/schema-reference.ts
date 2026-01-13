declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/example': {
      $get: {
        input: {}
        output: {
          b: { id: string; message?: string | undefined }
          c: { count?: number | undefined; flag?: boolean | undefined }
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
