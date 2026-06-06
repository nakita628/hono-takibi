declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/posts': {
      $get: {
        input: { query: { page?: number | undefined; limit?: number | undefined } }
        output: {
          posts: {
            id: number
            title: string
            body: string
            author: { id: number; name: string; avatarUrl?: string | undefined }
            tags?: { id: number; name: string; slug: string }[] | undefined
            createdAt: string
            updatedAt: string
          }[]
          total: number
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { json: { title: string; body: string; tagIds?: number[] | undefined } }
        output: {
          id: number
          title: string
          body: string
          author: { id: number; name: string; avatarUrl?: string | undefined }
          tags?: { id: number; name: string; slug: string }[] | undefined
          createdAt: string
          updatedAt: string
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/posts/:id': {
      $get: {
        input: { param: { id: number } }
        output: {
          id: number
          title: string
          body: string
          author: { id: number; name: string; avatarUrl?: string | undefined }
          tags?: { id: number; name: string; slug: string }[] | undefined
          createdAt: string
          updatedAt: string
        }
        outputFormat: 'json'
        status: 200
      }
      $put: {
        input: { param: { id: number } } & {
          json: {
            title?: string | undefined
            body?: string | undefined
            tagIds?: number[] | undefined
          }
        }
        output: {
          id: number
          title: string
          body: string
          author: { id: number; name: string; avatarUrl?: string | undefined }
          tags?: { id: number; name: string; slug: string }[] | undefined
          createdAt: string
          updatedAt: string
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: { input: { param: { id: number } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/posts/:id/comments': {
      $get: {
        input: { param: { id: number } }
        output: {
          id: number
          body: string
          author: { id: number; name: string; avatarUrl?: string | undefined }
          createdAt: string
        }[]
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { id: number } } & { json: { body: string } }
        output: {
          id: number
          body: string
          author: { id: number; name: string; avatarUrl?: string | undefined }
          createdAt: string
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/tags': {
      $get: {
        input: {}
        output: { id: number; name: string; slug: string }[]
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
