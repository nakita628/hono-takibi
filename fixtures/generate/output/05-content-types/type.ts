declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/json': {
      $post: {
        input: { json: { name: string; value: number } }
        output: { id: number; name: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/form': {
      $post: {
        input: { json: { username: string; password: string } } & {
          form: { username: string; password: string }
        }
        output: { success: boolean }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/upload': {
      $post: {
        input: { form: { file: File; description?: string | undefined } }
        output: { url: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/text': {
      $post: { input: { json: string }; output: string; outputFormat: 'text'; status: 200 }
    }
  } & {
    '/multi-content': {
      $post: {
        input: { json: { data: string } } & { form: { data: string } }
        output: { received: boolean }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
