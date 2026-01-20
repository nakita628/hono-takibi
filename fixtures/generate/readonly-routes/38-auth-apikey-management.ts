import { createRoute, z } from '@hono/zod-openapi'

const ApiKeySchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().exactOptional(),
    prefix: z.string().openapi({ example: 'sk_live_' }),
    maskedKey: z.string().exactOptional().openapi({ example: 'sk_live_****abcd' }),
    status: z.enum(['active', 'revoked', 'expired']),
    environment: z.enum(['production', 'staging', 'development', 'test']),
    scopes: z.array(z.string()).exactOptional(),
    expiresAt: z.iso.datetime().exactOptional(),
    lastUsedAt: z.iso.datetime().exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'name', 'prefix', 'status', 'environment', 'createdAt'] })
  .readonly()
  .openapi('ApiKey')

const ApiKeyWithSecretSchema = ApiKeySchema.and(
  z
    .object({ secretKey: z.string().openapi({ example: 'sk_live_1234567890abcdef' }) })
    .openapi({ required: ['secretKey'] }),
)
  .readonly()
  .openapi('ApiKeyWithSecret')

const CreateApiKeyRequestSchema = z
  .object({
    name: z.string().min(1).max(200),
    description: z.string().exactOptional(),
    environment: z.enum(['production', 'staging', 'development', 'test']),
    scopes: z.array(z.string()).exactOptional(),
    expiresAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['name', 'environment'] })
  .readonly()
  .openapi('CreateApiKeyRequest')

const UpdateApiKeyRequestSchema = z
  .object({
    name: z.string().exactOptional(),
    description: z.string().exactOptional(),
    scopes: z.array(z.string()).exactOptional(),
  })
  .readonly()
  .openapi('UpdateApiKeyRequest')

const ApiKeyRotationResultSchema = z
  .object({ newKey: ApiKeyWithSecretSchema, oldKeyExpiresAt: z.iso.datetime() })
  .openapi({ required: ['newKey', 'oldKeyExpiresAt'] })
  .readonly()
  .openapi('ApiKeyRotationResult')

const UsageDataSchema = z
  .object({
    from: z.iso.date(),
    to: z.iso.date(),
    dataPoints: z.array(
      z.object({
        timestamp: z.iso.datetime().exactOptional(),
        requests: z.int().exactOptional(),
        successCount: z.int().exactOptional(),
        errorCount: z.int().exactOptional(),
      }),
    ),
    summary: z.object({
      totalRequests: z.int().exactOptional(),
      successRate: z.number().exactOptional(),
    }),
  })
  .openapi({ required: ['from', 'to', 'dataPoints', 'summary'] })
  .readonly()
  .openapi('UsageData')

const RateLimitStatusSchema = z
  .object({
    limit: z.int(),
    remaining: z.int(),
    resetAt: z.iso.datetime(),
    currentUsage: z.int().exactOptional(),
  })
  .openapi({ required: ['limit', 'remaining', 'resetAt'] })
  .readonly()
  .openapi('RateLimitStatus')

const ApiKeyVerificationResultSchema = z
  .object({
    valid: z.boolean(),
    keyId: z.uuid().exactOptional(),
    environment: z.string().exactOptional(),
    scopes: z.array(z.string()).exactOptional(),
    missingScopes: z.array(z.string()).exactOptional(),
    reason: z.string().exactOptional(),
  })
  .openapi({ required: ['valid'] })
  .readonly()
  .openapi('ApiKeyVerificationResult')

const ScopeDefinitionSchema = z
  .object({
    name: z.string().openapi({ example: 'users:read' }),
    description: z.string(),
    category: z.string().exactOptional(),
  })
  .openapi({ required: ['name', 'description'] })
  .readonly()
  .openapi('ScopeDefinition')

const PaginationSchema = z
  .object({ page: z.int(), limit: z.int(), total: z.int(), totalPages: z.int() })
  .openapi({ required: ['page', 'limit', 'total', 'totalPages'] })
  .readonly()
  .openapi('Pagination')

const ApiKeyListResponseSchema = z
  .object({ data: z.array(ApiKeySchema), pagination: PaginationSchema })
  .openapi({ required: ['data', 'pagination'] })
  .readonly()
  .openapi('ApiKeyListResponse')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .readonly()
  .openapi('Error')

const ApiKeyIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'keyId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  })
  .readonly()

const PageParamParamsSchema = z
  .int()
  .min(1)
  .default(1)
  .exactOptional()
  .openapi({
    param: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
  })
  .readonly()

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
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
    },
  })
  .readonly()

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } as const

const BadRequestResponse = {
  description: 'リクエストが不正です',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

const UnauthorizedResponse = {
  description: '認証が必要です',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

const NotFoundResponse = {
  description: 'リソースが見つかりません',
  content: { 'application/json': { schema: ErrorSchema } },
} as const

export const getApiKeysRoute = createRoute({
  method: 'get',
  path: '/api-keys',
  tags: ['API Keys'],
  summary: 'APIキー一覧取得',
  operationId: 'listApiKeys',
  request: {
    query: z.object({
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
      status: z
        .enum(['active', 'revoked', 'expired'])
        .exactOptional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            schema: { type: 'string', enum: ['active', 'revoked', 'expired'] },
          },
        }),
      environment: z
        .enum(['production', 'staging', 'development', 'test'])
        .exactOptional()
        .openapi({
          param: {
            name: 'environment',
            in: 'query',
            schema: { type: 'string', enum: ['production', 'staging', 'development', 'test'] },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'APIキー一覧',
      content: { 'application/json': { schema: ApiKeyListResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const postApiKeysRoute = createRoute({
  method: 'post',
  path: '/api-keys',
  tags: ['API Keys'],
  summary: 'APIキー作成',
  operationId: 'createApiKey',
  request: {
    body: {
      content: { 'application/json': { schema: CreateApiKeyRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: '作成成功',
      content: { 'application/json': { schema: ApiKeyWithSecretSchema } },
    },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const getApiKeysKeyIdRoute = createRoute({
  method: 'get',
  path: '/api-keys/{keyId}',
  tags: ['API Keys'],
  summary: 'APIキー詳細取得',
  operationId: 'getApiKey',
  request: { params: z.object({ keyId: ApiKeyIdParamParamsSchema }) },
  responses: {
    200: { description: 'APIキー詳細', content: { 'application/json': { schema: ApiKeySchema } } },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const deleteApiKeysKeyIdRoute = createRoute({
  method: 'delete',
  path: '/api-keys/{keyId}',
  tags: ['API Keys'],
  summary: 'APIキー削除',
  operationId: 'deleteApiKey',
  request: { params: z.object({ keyId: ApiKeyIdParamParamsSchema }) },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

export const patchApiKeysKeyIdRoute = createRoute({
  method: 'patch',
  path: '/api-keys/{keyId}',
  tags: ['API Keys'],
  summary: 'APIキー更新',
  operationId: 'updateApiKey',
  request: {
    params: z.object({ keyId: ApiKeyIdParamParamsSchema }),
    body: {
      content: { 'application/json': { schema: UpdateApiKeyRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: ApiKeySchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const postApiKeysKeyIdRevokeRoute = createRoute({
  method: 'post',
  path: '/api-keys/{keyId}/revoke',
  tags: ['API Keys'],
  summary: 'APIキー無効化',
  operationId: 'revokeApiKey',
  request: {
    params: z.object({ keyId: ApiKeyIdParamParamsSchema }),
    body: {
      content: { 'application/json': { schema: z.object({ reason: z.string().exactOptional() }) } },
    },
  },
  responses: {
    200: { description: '無効化成功', content: { 'application/json': { schema: ApiKeySchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const postApiKeysKeyIdRotateRoute = createRoute({
  method: 'post',
  path: '/api-keys/{keyId}/rotate',
  tags: ['API Keys'],
  summary: 'APIキーローテーション',
  operationId: 'rotateApiKey',
  request: {
    params: z.object({ keyId: ApiKeyIdParamParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            gracePeriodHours: z.int().min(0).max(168).default(24).exactOptional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'ローテーション成功',
      content: { 'application/json': { schema: ApiKeyRotationResultSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const getApiKeysKeyIdUsageRoute = createRoute({
  method: 'get',
  path: '/api-keys/{keyId}/usage',
  tags: ['Usage'],
  summary: 'APIキー使用量取得',
  operationId: 'getApiKeyUsage',
  request: {
    params: z.object({ keyId: ApiKeyIdParamParamsSchema }),
    query: z.object({
      from: z.iso.date().openapi({
        param: {
          name: 'from',
          in: 'query',
          required: true,
          schema: { type: 'string', format: 'date' },
        },
      }),
      to: z.iso.date().openapi({
        param: {
          name: 'to',
          in: 'query',
          required: true,
          schema: { type: 'string', format: 'date' },
        },
      }),
      granularity: z
        .enum(['hour', 'day', 'week', 'month'])
        .default('day')
        .exactOptional()
        .openapi({
          param: {
            name: 'granularity',
            in: 'query',
            schema: { type: 'string', enum: ['hour', 'day', 'week', 'month'], default: 'day' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: '使用量データ',
      content: { 'application/json': { schema: UsageDataSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const getApiKeysKeyIdRateLimitCurrentRoute = createRoute({
  method: 'get',
  path: '/api-keys/{keyId}/rate-limit/current',
  tags: ['Rate Limits'],
  summary: '現在のレート制限状況取得',
  operationId: 'getCurrentRateLimitStatus',
  request: { params: z.object({ keyId: ApiKeyIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'レート制限状況',
      content: { 'application/json': { schema: RateLimitStatusSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const postApiKeysVerifyRoute = createRoute({
  method: 'post',
  path: '/api-keys/verify',
  tags: ['API Keys'],
  summary: 'APIキー検証',
  operationId: 'verifyApiKey',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ apiKey: z.string(), requiredScopes: z.array(z.string()).exactOptional() })
            .openapi({ required: ['apiKey'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '検証結果',
      content: { 'application/json': { schema: ApiKeyVerificationResultSchema } },
    },
    400: BadRequestResponse,
  },
} as const)

export const getScopesRoute = createRoute({
  method: 'get',
  path: '/scopes',
  tags: ['Scopes'],
  summary: '利用可能なスコープ一覧',
  operationId: 'listScopes',
  responses: {
    200: {
      description: 'スコープ一覧',
      content: { 'application/json': { schema: z.array(ScopeDefinitionSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)
