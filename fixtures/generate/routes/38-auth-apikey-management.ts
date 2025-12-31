import { createRoute, z } from '@hono/zod-openapi'

const ApiKeySchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    prefix: z.string().openapi({ type: 'string', example: 'sk_live_' }),
    maskedKey: z.string().optional().openapi({ type: 'string', example: 'sk_live_****abcd' }),
    status: z
      .enum(['active', 'revoked', 'expired'])
      .openapi({ type: 'string', enum: ['active', 'revoked', 'expired'] }),
    environment: z
      .enum(['production', 'staging', 'development', 'test'])
      .openapi({ type: 'string', enum: ['production', 'staging', 'development', 'test'] }),
    scopes: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    expiresAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    lastUsedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'prefix', 'status', 'environment', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      description: { type: 'string' },
      prefix: { type: 'string', example: 'sk_live_' },
      maskedKey: { type: 'string', example: 'sk_live_****abcd' },
      status: { type: 'string', enum: ['active', 'revoked', 'expired'] },
      environment: { type: 'string', enum: ['production', 'staging', 'development', 'test'] },
      scopes: { type: 'array', items: { type: 'string' } },
      expiresAt: { type: 'string', format: 'date-time' },
      lastUsedAt: { type: 'string', format: 'date-time' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('ApiKey')

const ApiKeyWithSecretSchema = z
  .intersection(
    ApiKeySchema,
    z
      .object({
        secretKey: z.string().openapi({ type: 'string', example: 'sk_live_1234567890abcdef' }),
      })
      .openapi({
        type: 'object',
        required: ['secretKey'],
        properties: { secretKey: { type: 'string', example: 'sk_live_1234567890abcdef' } },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/ApiKey' },
      {
        type: 'object',
        required: ['secretKey'],
        properties: { secretKey: { type: 'string', example: 'sk_live_1234567890abcdef' } },
      },
    ],
  })
  .openapi('ApiKeyWithSecret')

const CreateApiKeyRequestSchema = z
  .object({
    name: z.string().min(1).max(200).openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    description: z.string().optional().openapi({ type: 'string' }),
    environment: z
      .enum(['production', 'staging', 'development', 'test'])
      .openapi({ type: 'string', enum: ['production', 'staging', 'development', 'test'] }),
    scopes: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    expiresAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'environment'],
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 200 },
      description: { type: 'string' },
      environment: { type: 'string', enum: ['production', 'staging', 'development', 'test'] },
      scopes: { type: 'array', items: { type: 'string' } },
      expiresAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('CreateApiKeyRequest')

const UpdateApiKeyRequestSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    description: z.string().openapi({ type: 'string' }),
    scopes: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      scopes: { type: 'array', items: { type: 'string' } },
    },
  })
  .openapi('UpdateApiKeyRequest')

const ApiKeyRotationResultSchema = z
  .object({
    newKey: ApiKeyWithSecretSchema,
    oldKeyExpiresAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['newKey', 'oldKeyExpiresAt'],
    properties: {
      newKey: { $ref: '#/components/schemas/ApiKeyWithSecret' },
      oldKeyExpiresAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('ApiKeyRotationResult')

const UsageDataSchema = z
  .object({
    from: z.iso.date().openapi({ type: 'string', format: 'date' }),
    to: z.iso.date().openapi({ type: 'string', format: 'date' }),
    dataPoints: z
      .array(
        z
          .object({
            timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
            requests: z.int().openapi({ type: 'integer' }),
            successCount: z.int().openapi({ type: 'integer' }),
            errorCount: z.int().openapi({ type: 'integer' }),
          })
          .partial()
          .openapi({
            type: 'object',
            properties: {
              timestamp: { type: 'string', format: 'date-time' },
              requests: { type: 'integer' },
              successCount: { type: 'integer' },
              errorCount: { type: 'integer' },
            },
          }),
      )
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            timestamp: { type: 'string', format: 'date-time' },
            requests: { type: 'integer' },
            successCount: { type: 'integer' },
            errorCount: { type: 'integer' },
          },
        },
      }),
    summary: z
      .object({
        totalRequests: z.int().openapi({ type: 'integer' }),
        successRate: z.number().openapi({ type: 'number' }),
      })
      .partial()
      .openapi({
        type: 'object',
        properties: { totalRequests: { type: 'integer' }, successRate: { type: 'number' } },
      }),
  })
  .openapi({
    type: 'object',
    required: ['from', 'to', 'dataPoints', 'summary'],
    properties: {
      from: { type: 'string', format: 'date' },
      to: { type: 'string', format: 'date' },
      dataPoints: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            timestamp: { type: 'string', format: 'date-time' },
            requests: { type: 'integer' },
            successCount: { type: 'integer' },
            errorCount: { type: 'integer' },
          },
        },
      },
      summary: {
        type: 'object',
        properties: { totalRequests: { type: 'integer' }, successRate: { type: 'number' } },
      },
    },
  })
  .openapi('UsageData')

const RateLimitStatusSchema = z
  .object({
    limit: z.int().openapi({ type: 'integer' }),
    remaining: z.int().openapi({ type: 'integer' }),
    resetAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    currentUsage: z.int().optional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['limit', 'remaining', 'resetAt'],
    properties: {
      limit: { type: 'integer' },
      remaining: { type: 'integer' },
      resetAt: { type: 'string', format: 'date-time' },
      currentUsage: { type: 'integer' },
    },
  })
  .openapi('RateLimitStatus')

const ApiKeyVerificationResultSchema = z
  .object({
    valid: z.boolean().openapi({ type: 'boolean' }),
    keyId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    environment: z.string().optional().openapi({ type: 'string' }),
    scopes: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    missingScopes: z
      .array(z.string().optional().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    reason: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['valid'],
    properties: {
      valid: { type: 'boolean' },
      keyId: { type: 'string', format: 'uuid' },
      environment: { type: 'string' },
      scopes: { type: 'array', items: { type: 'string' } },
      missingScopes: { type: 'array', items: { type: 'string' } },
      reason: { type: 'string' },
    },
  })
  .openapi('ApiKeyVerificationResult')

const ScopeDefinitionSchema = z
  .object({
    name: z.string().openapi({ type: 'string', example: 'users:read' }),
    description: z.string().openapi({ type: 'string' }),
    category: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'description'],
    properties: {
      name: { type: 'string', example: 'users:read' },
      description: { type: 'string' },
      category: { type: 'string' },
    },
  })
  .openapi('ScopeDefinition')

const PaginationSchema = z
  .object({
    page: z.int().openapi({ type: 'integer' }),
    limit: z.int().openapi({ type: 'integer' }),
    total: z.int().openapi({ type: 'integer' }),
    totalPages: z.int().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['page', 'limit', 'total', 'totalPages'],
    properties: {
      page: { type: 'integer' },
      limit: { type: 'integer' },
      total: { type: 'integer' },
      totalPages: { type: 'integer' },
    },
  })
  .openapi('Pagination')

const ApiKeyListResponseSchema = z
  .object({
    data: z
      .array(ApiKeySchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/ApiKey' } }),
    pagination: PaginationSchema,
  })
  .openapi({
    type: 'object',
    required: ['data', 'pagination'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/ApiKey' } },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  })
  .openapi('ApiKeyListResponse')

const ErrorSchema = z
  .object({
    code: z.string().openapi({ type: 'string' }),
    message: z.string().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['code', 'message'],
    properties: { code: { type: 'string' }, message: { type: 'string' } },
  })
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
    type: 'string',
    format: 'uuid',
  })

const PageParamParamsSchema = z
  .int()
  .min(1)
  .default(1)
  .optional()
  .openapi({
    param: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
    type: 'integer',
    minimum: 1,
    default: 1,
  })

const LimitParamParamsSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .optional()
  .openapi({
    param: {
      name: 'limit',
      in: 'query',
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
    },
    type: 'integer',
    minimum: 1,
    maximum: 100,
    default: 20,
  })

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const BadRequestResponse = {
  description: 'リクエストが不正です',
  content: { 'application/json': { schema: ErrorSchema } },
}

const UnauthorizedResponse = {
  description: '認証が必要です',
  content: { 'application/json': { schema: ErrorSchema } },
}

const NotFoundResponse = {
  description: 'リソースが見つかりません',
  content: { 'application/json': { schema: ErrorSchema } },
}

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
        .optional()
        .openapi({
          param: {
            name: 'status',
            in: 'query',
            schema: { type: 'string', enum: ['active', 'revoked', 'expired'] },
          },
          type: 'string',
          enum: ['active', 'revoked', 'expired'],
        }),
      environment: z
        .enum(['production', 'staging', 'development', 'test'])
        .optional()
        .openapi({
          param: {
            name: 'environment',
            in: 'query',
            schema: { type: 'string', enum: ['production', 'staging', 'development', 'test'] },
          },
          type: 'string',
          enum: ['production', 'staging', 'development', 'test'],
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
})

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
})

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
})

export const deleteApiKeysKeyIdRoute = createRoute({
  method: 'delete',
  path: '/api-keys/{keyId}',
  tags: ['API Keys'],
  summary: 'APIキー削除',
  operationId: 'deleteApiKey',
  request: { params: z.object({ keyId: ApiKeyIdParamParamsSchema }) },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const patchApiKeysKeyIdRoute = createRoute({
  method: 'patch',
  path: '/api-keys/{keyId}',
  tags: ['API Keys'],
  summary: 'APIキー更新',
  operationId: 'updateApiKey',
  request: {
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
})

export const postApiKeysKeyIdRevokeRoute = createRoute({
  method: 'post',
  path: '/api-keys/{keyId}/revoke',
  tags: ['API Keys'],
  summary: 'APIキー無効化',
  operationId: 'revokeApiKey',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ reason: z.string().openapi({ type: 'string' }) })
            .partial()
            .openapi({ type: 'object', properties: { reason: { type: 'string' } } }),
        },
      },
    },
  },
  responses: {
    200: { description: '無効化成功', content: { 'application/json': { schema: ApiKeySchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postApiKeysKeyIdRotateRoute = createRoute({
  method: 'post',
  path: '/api-keys/{keyId}/rotate',
  tags: ['API Keys'],
  summary: 'APIキーローテーション',
  operationId: 'rotateApiKey',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              gracePeriodHours: z
                .int()
                .min(0)
                .max(168)
                .default(24)
                .openapi({ type: 'integer', minimum: 0, maximum: 168, default: 24 }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                gracePeriodHours: { type: 'integer', minimum: 0, maximum: 168, default: 24 },
              },
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
})

export const getApiKeysKeyIdUsageRoute = createRoute({
  method: 'get',
  path: '/api-keys/{keyId}/usage',
  tags: ['Usage'],
  summary: 'APIキー使用量取得',
  operationId: 'getApiKeyUsage',
  request: {
    params: z.object({ keyId: ApiKeyIdParamParamsSchema }),
    query: z.object({
      from: z.iso
        .date()
        .openapi({
          param: {
            name: 'from',
            in: 'query',
            required: true,
            schema: { type: 'string', format: 'date' },
          },
          type: 'string',
          format: 'date',
        }),
      to: z.iso
        .date()
        .openapi({
          param: {
            name: 'to',
            in: 'query',
            required: true,
            schema: { type: 'string', format: 'date' },
          },
          type: 'string',
          format: 'date',
        }),
      granularity: z
        .enum(['hour', 'day', 'week', 'month'])
        .default('day')
        .optional()
        .openapi({
          param: {
            name: 'granularity',
            in: 'query',
            schema: { type: 'string', enum: ['hour', 'day', 'week', 'month'], default: 'day' },
          },
          type: 'string',
          enum: ['hour', 'day', 'week', 'month'],
          default: 'day',
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
})

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
})

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
            .object({
              apiKey: z.string().openapi({ type: 'string' }),
              requiredScopes: z
                .array(z.string().optional().openapi({ type: 'string' }))
                .optional()
                .openapi({ type: 'array', items: { type: 'string' } }),
            })
            .openapi({
              type: 'object',
              required: ['apiKey'],
              properties: {
                apiKey: { type: 'string' },
                requiredScopes: { type: 'array', items: { type: 'string' } },
              },
            }),
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
})

export const getScopesRoute = createRoute({
  method: 'get',
  path: '/scopes',
  tags: ['Scopes'],
  summary: '利用可能なスコープ一覧',
  operationId: 'listScopes',
  responses: {
    200: {
      description: 'スコープ一覧',
      content: {
        'application/json': {
          schema: z
            .array(ScopeDefinitionSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/ScopeDefinition' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})
