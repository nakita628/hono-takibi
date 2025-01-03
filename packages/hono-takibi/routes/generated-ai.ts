import { createRoute, z } from '@hono/zod-openapi'

const todoSchema = z.object({
  id: z.string().openapi({ example: '123e4567-e89b-12d3-a456-426614174000' }),
  title: z.string().openapi({ example: '買い物へ行く' }),
  description: z.string().openapi({ example: '牛乳、パン、卵を購入' }).optional(),
  completed: z.boolean().optional(),
  createdAt: z.string().datetime().openapi({ example: '2024-01-01T12:00:00Z' }).optional(),
  updatedAt: z.string().datetime().openapi({ example: '2024-01-02T09:15:00Z' }).optional(),
})

const todoCreateRequestSchema = z.object({
  title: z.string().openapi({ example: '買い物へ行く' }),
  description: z.string().openapi({ example: '牛乳、パン、卵を購入' }).optional(),
  completed: z.boolean().optional(),
})

const todoUpdateRequestSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
})

const errorResponseSchema = z.object({
  code: z.number().int().openapi({ example: 400 }),
  message: z.string().openapi({ example: 'Invalid request' }),
})

export const schemas = {
  todoSchema,
  todoCreateRequestSchema,
  todoUpdateRequestSchema,
  errorResponseSchema,
}

export const getTodosRoute = createRoute({
  tags: ['Todos'],
  method: 'get',
  path: '/todos',
  summary: 'Todo一覧の取得',
  description: '登録されているTodoをすべて取得します。',
  responses: {
    200: {
      description: 'Todoの配列が返却されます。',
      content: { 'application/json': { schema: z.array(todoSchema) } },
    },
    500: {
      description: 'サーバーエラー',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
  },
})

export const postTodosRoute = createRoute({
  tags: ['Todos'],
  method: 'post',
  path: '/todos',
  summary: 'Todoの新規作成',
  description: 'Todoを新しく登録します。',
  request: {
    body: { required: true, content: { 'application/json': { schema: todoCreateRequestSchema } } },
  },
  responses: {
    201: {
      description: '新規作成されたTodoを返却します。',
      content: { 'application/json': { schema: todoSchema } },
    },
    400: {
      description: 'リクエスト不正',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
    500: {
      description: 'サーバーエラー',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
  },
})

export const getTodosTodoIdRoute = createRoute({
  tags: ['Todos'],
  method: 'get',
  path: '/todos/{todoId}',
  summary: 'Todoの取得',
  description: '指定したIDのTodoを取得します。',
  request: { params: z.object({ todoId: z.string() }) },
  responses: {
    200: {
      description: 'Todoオブジェクトを返却します。',
      content: { 'application/json': { schema: todoSchema } },
    },
    404: {
      description: '指定したIDのTodoが存在しません。',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
    500: {
      description: 'サーバーエラー',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
  },
})

export const putTodosTodoIdRoute = createRoute({
  tags: ['Todos'],
  method: 'put',
  path: '/todos/{todoId}',
  summary: 'Todoの更新',
  description: '指定したIDのTodoを更新します。',
  request: {
    body: { required: true, content: { 'application/json': { schema: todoUpdateRequestSchema } } },
    params: z.object({ todoId: z.string() }),
  },
  responses: {
    200: {
      description: '更新されたTodoを返却します。',
      content: { 'application/json': { schema: todoSchema } },
    },
    400: {
      description: 'リクエスト不正',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
    404: {
      description: '指定したIDのTodoが存在しません。',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
    500: {
      description: 'サーバーエラー',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
  },
})

export const deleteTodosTodoIdRoute = createRoute({
  tags: ['Todos'],
  method: 'delete',
  path: '/todos/{todoId}',
  summary: 'Todoの削除',
  description: '指定したIDのTodoを削除します。',
  request: { params: z.object({ todoId: z.string() }) },
  responses: {
    204: { description: '削除に成功しました（レスポンスボディはありません）。' },
    404: {
      description: '指定したIDのTodoが存在しません。',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
    500: {
      description: 'サーバーエラー',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
  },
})
