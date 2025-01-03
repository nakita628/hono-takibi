import { createRoute, z } from '@hono/zod-openapi'

const errorResponseSchema = z.object({
  code: z.number().int().openapi({ example: 401 }),
  message: z.string().openapi({ example: 'Invalid or missing token.' }),
})

export const schemas = {
  errorResponseSchema,
}

export const getPublicRoute = createRoute({
  tags: ['Public'],
  method: 'get',
  path: '/public',
  summary: 'Public endpoint',
  description: 'このエンドポイントには JWT は不要です',
  security: [],
  responses: {
    200: {
      description: 'OK (認証不要)',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string().openapi({ example: 'This endpoint is public.' }).optional(),
          }),
        },
      },
    },
    500: {
      description: 'サーバーエラー',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
  },
})

export const getPrivateRoute = createRoute({
  tags: ['Private'],
  method: 'get',
  path: '/private',
  summary: 'Private endpoint',
  description: 'このエンドポイントには有効な JWT (Bearer Token) が必要です',
  security: [{ JWTAuth: [] }],
  responses: {
    200: {
      description: 'OK (JWT 認証必須)',
      content: {
        'application/json': {
          schema: z.object({
            message: z
              .string()
              .openapi({ example: 'Private endpoint, token required.' })
              .optional(),
          }),
        },
      },
    },
    401: {
      description: '認証エラー（トークンなし/不正）',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
    500: {
      description: 'サーバーエラー',
      content: { 'application/json': { schema: errorResponseSchema } },
    },
  },
})
