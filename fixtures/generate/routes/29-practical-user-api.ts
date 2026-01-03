import { createRoute, z } from '@hono/zod-openapi'

const UserSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid', description: 'ユーザーID' }),
    email: z.email().openapi({ type: 'string', format: 'email', description: 'メールアドレス' }),
    name: z.string().openapi({ type: 'string', description: '表示名' }),
    avatarUrl: z
      .url()
      .exactOptional()
      .openapi({ type: 'string', format: 'uri', description: 'アバター画像URL' }),
    status: z
      .enum(['active', 'inactive', 'suspended'])
      .openapi({
        type: 'string',
        enum: ['active', 'inactive', 'suspended'],
        description: 'ステータス',
      }),
    role: z
      .enum(['user', 'admin'])
      .default('user')
      .exactOptional()
      .openapi({ type: 'string', enum: ['user', 'admin'], default: 'user', description: 'ロール' }),
    lastLoginAt: z.iso
      .datetime()
      .exactOptional()
      .openapi({ type: 'string', format: 'date-time', description: '最終ログイン日時' }),
    createdAt: z.iso
      .datetime()
      .openapi({ type: 'string', format: 'date-time', description: '作成日時' }),
    updatedAt: z.iso
      .datetime()
      .exactOptional()
      .openapi({ type: 'string', format: 'date-time', description: '更新日時' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'email', 'name', 'status', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid', description: 'ユーザーID' },
      email: { type: 'string', format: 'email', description: 'メールアドレス' },
      name: { type: 'string', description: '表示名' },
      avatarUrl: { type: 'string', format: 'uri', description: 'アバター画像URL' },
      status: {
        type: 'string',
        enum: ['active', 'inactive', 'suspended'],
        description: 'ステータス',
      },
      role: { type: 'string', enum: ['user', 'admin'], default: 'user', description: 'ロール' },
      lastLoginAt: { type: 'string', format: 'date-time', description: '最終ログイン日時' },
      createdAt: { type: 'string', format: 'date-time', description: '作成日時' },
      updatedAt: { type: 'string', format: 'date-time', description: '更新日時' },
    },
  })
  .openapi('User')

const RegisterRequestSchema = z
  .object({
    email: z.email().openapi({ type: 'string', format: 'email' }),
    password: z
      .string()
      .min(8)
      .openapi({
        type: 'string',
        format: 'password',
        minLength: 8,
        description: '8文字以上、大文字・小文字・数字を含む',
      }),
    name: z.string().min(1).max(100).openapi({ type: 'string', minLength: 1, maxLength: 100 }),
  })
  .openapi({
    type: 'object',
    required: ['email', 'password', 'name'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: {
        type: 'string',
        format: 'password',
        minLength: 8,
        description: '8文字以上、大文字・小文字・数字を含む',
      },
      name: { type: 'string', minLength: 1, maxLength: 100 },
    },
  })
  .openapi('RegisterRequest')

const LoginRequestSchema = z
  .object({
    email: z.email().openapi({ type: 'string', format: 'email' }),
    password: z.string().openapi({ type: 'string', format: 'password' }),
  })
  .openapi({
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', format: 'password' },
    },
  })
  .openapi('LoginRequest')

const AuthResponseSchema = z
  .object({
    accessToken: z.string().openapi({ type: 'string', description: 'JWTアクセストークン' }),
    refreshToken: z.string().openapi({ type: 'string', description: 'リフレッシュトークン' }),
    expiresIn: z
      .int()
      .exactOptional()
      .openapi({ type: 'integer', description: 'アクセストークンの有効期限（秒）', example: 3600 }),
    user: UserSchema,
  })
  .openapi({
    type: 'object',
    required: ['accessToken', 'refreshToken', 'user'],
    properties: {
      accessToken: { type: 'string', description: 'JWTアクセストークン' },
      refreshToken: { type: 'string', description: 'リフレッシュトークン' },
      expiresIn: {
        type: 'integer',
        description: 'アクセストークンの有効期限（秒）',
        example: 3600,
      },
      user: { $ref: '#/components/schemas/User' },
    },
  })
  .openapi('AuthResponse')

const UpdateUserRequestSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .max(100)
      .exactOptional()
      .openapi({ type: 'string', minLength: 1, maxLength: 100 }),
    status: z
      .enum(['active', 'inactive', 'suspended'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['active', 'inactive', 'suspended'] }),
    role: z
      .enum(['user', 'admin'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['user', 'admin'] }),
  })
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 100 },
      status: { type: 'string', enum: ['active', 'inactive', 'suspended'] },
      role: { type: 'string', enum: ['user', 'admin'] },
    },
  })
  .openapi('UpdateUserRequest')

const UpdateProfileRequestSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .max(100)
      .exactOptional()
      .openapi({ type: 'string', minLength: 1, maxLength: 100 }),
  })
  .openapi({
    type: 'object',
    properties: { name: { type: 'string', minLength: 1, maxLength: 100 } },
  })
  .openapi('UpdateProfileRequest')

const PaginationSchema = z
  .object({
    page: z.int().openapi({ type: 'integer', description: '現在のページ' }),
    limit: z.int().openapi({ type: 'integer', description: '1ページあたりの件数' }),
    total: z.int().openapi({ type: 'integer', description: '総件数' }),
    totalPages: z.int().openapi({ type: 'integer', description: '総ページ数' }),
  })
  .openapi({
    type: 'object',
    required: ['page', 'limit', 'total', 'totalPages'],
    properties: {
      page: { type: 'integer', description: '現在のページ' },
      limit: { type: 'integer', description: '1ページあたりの件数' },
      total: { type: 'integer', description: '総件数' },
      totalPages: { type: 'integer', description: '総ページ数' },
    },
  })
  .openapi('Pagination')

const UserListResponseSchema = z
  .object({
    data: z
      .array(UserSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/User' } }),
    pagination: PaginationSchema,
  })
  .openapi({
    type: 'object',
    required: ['data', 'pagination'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/User' } },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  })
  .openapi('UserListResponse')

const ErrorSchema = z
  .object({
    code: z.string().openapi({ type: 'string', description: 'エラーコード' }),
    message: z.string().openapi({ type: 'string', description: 'エラーメッセージ' }),
    details: z
      .array(
        z
          .object({
            field: z.string().exactOptional().openapi({ type: 'string' }),
            message: z.string().exactOptional().openapi({ type: 'string' }),
          })
          .openapi({
            type: 'object',
            properties: { field: { type: 'string' }, message: { type: 'string' } },
          }),
      )
      .exactOptional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: { field: { type: 'string' }, message: { type: 'string' } },
        },
      }),
  })
  .openapi({
    type: 'object',
    required: ['code', 'message'],
    properties: {
      code: { type: 'string', description: 'エラーコード' },
      message: { type: 'string', description: 'エラーメッセージ' },
      details: {
        type: 'array',
        items: {
          type: 'object',
          properties: { field: { type: 'string' }, message: { type: 'string' } },
        },
      },
    },
  })
  .openapi('Error')

const UserIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'userId',
      in: 'path',
      required: true,
      description: 'ユーザーID',
      schema: { type: 'string', format: 'uuid' },
    },
    type: 'string',
    format: 'uuid',
  })

const PageParamParamsSchema = z
  .int()
  .min(1)
  .default(1)
  .exactOptional()
  .openapi({
    param: {
      name: 'page',
      in: 'query',
      description: 'ページ番号',
      schema: { type: 'integer', minimum: 1, default: 1 },
    },
    type: 'integer',
    minimum: 1,
    default: 1,
  })

const LimitParamParamsSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .exactOptional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      description: '1ページあたりの件数',
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
    },
    type: 'integer',
    minimum: 1,
    maximum: 100,
    default: 20,
  })

const SortParamParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: {
      name: 'sort',
      in: 'query',
      description: 'ソート順（例：createdAt:desc, name:asc）',
      schema: { type: 'string' },
    },
    type: 'string',
  })

const BearerAuthSecurityScheme = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  description: 'JWT Bearer トークン',
}

const BadRequestResponse = {
  description: 'リクエストが不正です',
  content: {
    'application/json': {
      schema: ErrorSchema,
      example: { code: 'BAD_REQUEST', message: 'リクエストパラメータが不正です' },
    },
  },
}

const UnauthorizedResponse = {
  description: '認証が必要です',
  content: {
    'application/json': {
      schema: ErrorSchema,
      example: { code: 'UNAUTHORIZED', message: '認証が必要です' },
    },
  },
}

const ForbiddenResponse = {
  description: 'アクセス権限がありません',
  content: {
    'application/json': {
      schema: ErrorSchema,
      example: { code: 'FORBIDDEN', message: 'このリソースへのアクセス権限がありません' },
    },
  },
}

const NotFoundResponse = {
  description: 'リソースが見つかりません',
  content: {
    'application/json': {
      schema: ErrorSchema,
      example: { code: 'NOT_FOUND', message: '指定されたリソースが見つかりません' },
    },
  },
}

export const postAuthRegisterRoute = createRoute({
  method: 'post',
  path: '/auth/register',
  tags: ['Authentication'],
  summary: '新規ユーザー登録',
  description: 'メールアドレスとパスワードで新規ユーザーを登録します',
  operationId: 'registerUser',
  request: {
    body: {
      content: {
        'application/json': {
          schema: RegisterRequestSchema,
          example: { email: 'user@example.com', password: 'SecurePass123!', name: '山田太郎' },
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: '登録成功',
      content: { 'application/json': { schema: AuthResponseSchema } },
    },
    400: BadRequestResponse,
    409: {
      description: 'メールアドレスが既に使用されています',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const postAuthLoginRoute = createRoute({
  method: 'post',
  path: '/auth/login',
  tags: ['Authentication'],
  summary: 'ログイン',
  description: 'メールアドレスとパスワードで認証し、JWTトークンを取得します',
  operationId: 'loginUser',
  request: {
    body: { content: { 'application/json': { schema: LoginRequestSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'ログイン成功',
      content: { 'application/json': { schema: AuthResponseSchema } },
    },
    401: { description: '認証失敗', content: { 'application/json': { schema: ErrorSchema } } },
  },
})

export const postAuthRefreshRoute = createRoute({
  method: 'post',
  path: '/auth/refresh',
  tags: ['Authentication'],
  summary: 'トークンリフレッシュ',
  description: 'リフレッシュトークンを使用して新しいアクセストークンを取得します',
  operationId: 'refreshToken',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ refreshToken: z.string().openapi({ type: 'string' }) })
            .openapi({
              type: 'object',
              required: ['refreshToken'],
              properties: { refreshToken: { type: 'string' } },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'トークン更新成功',
      content: { 'application/json': { schema: AuthResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
})

export const postAuthLogoutRoute = createRoute({
  method: 'post',
  path: '/auth/logout',
  tags: ['Authentication'],
  summary: 'ログアウト',
  operationId: 'logoutUser',
  responses: { 204: { description: 'ログアウト成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postAuthPasswordForgotRoute = createRoute({
  method: 'post',
  path: '/auth/password/forgot',
  tags: ['Authentication'],
  summary: 'パスワードリセット要求',
  description: 'パスワードリセット用のメールを送信します',
  operationId: 'forgotPassword',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ email: z.email().openapi({ type: 'string', format: 'email' }) })
            .openapi({
              type: 'object',
              required: ['email'],
              properties: { email: { type: 'string', format: 'email' } },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'リセットメール送信成功',
      content: {
        'application/json': {
          schema: z
            .object({
              message: z
                .string()
                .exactOptional()
                .openapi({ type: 'string', example: 'パスワードリセット用のメールを送信しました' }),
            })
            .openapi({
              type: 'object',
              properties: {
                message: { type: 'string', example: 'パスワードリセット用のメールを送信しました' },
              },
            }),
        },
      },
    },
  },
})

export const postAuthPasswordResetRoute = createRoute({
  method: 'post',
  path: '/auth/password/reset',
  tags: ['Authentication'],
  summary: 'パスワードリセット実行',
  operationId: 'resetPassword',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              token: z.string().openapi({ type: 'string', description: 'リセットトークン' }),
              password: z
                .string()
                .min(8)
                .openapi({ type: 'string', format: 'password', minLength: 8 }),
            })
            .openapi({
              type: 'object',
              required: ['token', 'password'],
              properties: {
                token: { type: 'string', description: 'リセットトークン' },
                password: { type: 'string', format: 'password', minLength: 8 },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: { 200: { description: 'パスワードリセット成功' }, 400: BadRequestResponse },
})

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  tags: ['Users'],
  summary: 'ユーザー一覧取得',
  description: 'ページネーション付きでユーザー一覧を取得します（管理者のみ）',
  operationId: 'listUsers',
  request: {
    query: z.object({
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
      sort: SortParamParamsSchema,
      search: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'search',
            in: 'query',
            description: '名前またはメールで検索',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      status: z
        .enum(['active', 'inactive', 'suspended'])
        .exactOptional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            description: 'ステータスでフィルタ',
            schema: { type: 'string', enum: ['active', 'inactive', 'suspended'] },
          },
          type: 'string',
          enum: ['active', 'inactive', 'suspended'],
        }),
    }),
  },
  responses: {
    200: {
      description: 'ユーザー一覧',
      content: { 'application/json': { schema: UserListResponseSchema } },
    },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/users/{userId}',
  tags: ['Users'],
  summary: 'ユーザー詳細取得',
  operationId: 'getUser',
  request: { params: z.object({ userId: UserIdParamParamsSchema }) },
  responses: {
    200: { description: 'ユーザー詳細', content: { 'application/json': { schema: UserSchema } } },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteUsersUserIdRoute = createRoute({
  method: 'delete',
  path: '/users/{userId}',
  tags: ['Users'],
  summary: 'ユーザー削除',
  operationId: 'deleteUser',
  request: { params: z.object({ userId: UserIdParamParamsSchema }) },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse, 404: NotFoundResponse },
  security: [{ bearerAuth: [] }],
})

export const patchUsersUserIdRoute = createRoute({
  method: 'patch',
  path: '/users/{userId}',
  tags: ['Users'],
  summary: 'ユーザー情報更新',
  operationId: 'updateUser',
  request: {
    body: { content: { 'application/json': { schema: UpdateUserRequestSchema } }, required: true },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: UserSchema } } },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getUsersMeRoute = createRoute({
  method: 'get',
  path: '/users/me',
  tags: ['Profile'],
  summary: '現在のユーザー情報取得',
  operationId: 'getCurrentUser',
  responses: {
    200: {
      description: '現在のユーザー情報',
      content: { 'application/json': { schema: UserSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const patchUsersMeRoute = createRoute({
  method: 'patch',
  path: '/users/me',
  tags: ['Profile'],
  summary: '現在のユーザー情報更新',
  operationId: 'updateCurrentUser',
  request: {
    body: {
      content: { 'application/json': { schema: UpdateProfileRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: UserSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putUsersMePasswordRoute = createRoute({
  method: 'put',
  path: '/users/me/password',
  tags: ['Profile'],
  summary: 'パスワード変更',
  operationId: 'changePassword',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              currentPassword: z.string().openapi({ type: 'string', format: 'password' }),
              newPassword: z
                .string()
                .min(8)
                .openapi({ type: 'string', format: 'password', minLength: 8 }),
            })
            .openapi({
              type: 'object',
              required: ['currentPassword', 'newPassword'],
              properties: {
                currentPassword: { type: 'string', format: 'password' },
                newPassword: { type: 'string', format: 'password', minLength: 8 },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: 'パスワード変更成功' },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putUsersMeAvatarRoute = createRoute({
  method: 'put',
  path: '/users/me/avatar',
  tags: ['Profile'],
  summary: 'アバター画像アップロード',
  operationId: 'uploadAvatar',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z
            .object({
              file: z
                .file()
                .openapi({
                  type: 'string',
                  format: 'binary',
                  description: '画像ファイル（JPEG, PNG, GIF、最大5MB）',
                }),
            })
            .openapi({
              type: 'object',
              required: ['file'],
              properties: {
                file: {
                  type: 'string',
                  format: 'binary',
                  description: '画像ファイル（JPEG, PNG, GIF、最大5MB）',
                },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'アップロード成功',
      content: {
        'application/json': {
          schema: z
            .object({
              avatarUrl: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
            })
            .openapi({
              type: 'object',
              properties: { avatarUrl: { type: 'string', format: 'uri' } },
            }),
        },
      },
    },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteUsersMeAvatarRoute = createRoute({
  method: 'delete',
  path: '/users/me/avatar',
  tags: ['Profile'],
  summary: 'アバター画像削除',
  operationId: 'deleteAvatar',
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})
