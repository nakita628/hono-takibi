import { createRoute, z } from '@hono/zod-openapi'

export const postAuthLoginRoute = createRoute({
  tags: [],
  method: 'post',
  path: '/auth/login',
  summary: 'ユーザー認証（ログイン）と2段階認証開始',
  description:
    'ユーザー名とパスワードによる認証を行い、認証成功の場合は2段階認証用の一時トークンを返却します。',
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: z.object({
            username: z.string().openapi({ example: 'user@example.com' }),
            password: z.string().openapi({ example: 'password123' }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: '認証成功、2段階認証コードの入力が必要',
      content: {
        'application/json': {
          schema: z
            .object({
              temp_token: z.string(),
              message: z.string().openapi({ example: '2段階認証コードの入力が必要です。' }),
            })
            .partial(),
        },
      },
    },
    401: { description: '認証失敗（無効なユーザー名またはパスワード）' },
  },
})

export const postAuthVerify2faRoute = createRoute({
  tags: [],
  method: 'post',
  path: '/auth/verify-2fa',
  summary: '2段階認証コードの検証とJWT発行',
  description:
    '一時トークンと2段階認証コードを受け取り、コードが正しければJWT形式のアクセストークンを返却します。',
  request: {
    body: {
      required: true,
      content: {
        'application/json': { schema: z.object({ temp_token: z.string(), code: z.string() }) },
      },
    },
  },
  responses: {
    200: {
      description: '2段階認証成功、JWTアクセストークン発行',
      content: {
        'application/json': {
          schema: z
            .object({
              access_token: z.string(),
              token_type: z.string().openapi({ example: 'Bearer' }),
            })
            .partial(),
        },
      },
    },
    401: { description: '2段階認証失敗（無効なコードまたは一時トークン）' },
  },
})

export const getProtectedRoute = createRoute({
  tags: [],
  method: 'get',
  path: '/protected',
  summary: 'JWT認証が必要な保護されたエンドポイント',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'アクセストークンが有効な場合の正常なレスポンス',
      content: {
        'application/json': {
          schema: z
            .object({
              data: z.string().openapi({ example: '保護されたデータへのアクセスに成功しました。' }),
            })
            .partial(),
        },
      },
    },
    401: { description: 'アクセストークンが無効または存在しない場合' },
  },
})
