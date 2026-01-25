import type { Hono } from 'hono'

export type Todo = {
  id: string
  content: string
  completed: number
  createdAt: string
  updatedAt: string
}

export type AppType = Hono<
  object,
  {
    '/api': { $get: { output: { message: string }; outputFormat: 'json'; status: 200 } }
    '/api/todo': {
      $get: {
        input: { query?: { limit?: number; offset?: number } }
        output: Todo[]
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { json: { content: string } }
        output: { message: string }
        outputFormat: 'json'
        status: 201
      }
    }
    '/api/todo/:id': {
      $get: {
        input: { param: { id: string } }
        output: Todo
        outputFormat: 'json'
        status: 200
      }
      $put: {
        input: { param: { id: string }; json: { content?: string; completed?: number } }
        output: undefined
        outputFormat: 'json'
        status: 204
      }
      $delete: {
        input: { param: { id: string } }
        output: undefined
        outputFormat: 'json'
        status: 204
      }
    }
  }
>
