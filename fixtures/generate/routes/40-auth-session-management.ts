import { createRoute, z } from '@hono/zod-openapi'

const DeviceInfoSchema = z
  .object({
    id: z.string().exactOptional(),
    fingerprint: z.string().exactOptional(),
    type: z.enum(['desktop', 'mobile', 'tablet', 'unknown']).exactOptional(),
    os: z.string().exactOptional(),
    osVersion: z.string().exactOptional(),
    browser: z.string().exactOptional(),
    browserVersion: z.string().exactOptional(),
    userAgent: z.string().exactOptional(),
    isTrusted: z.boolean().exactOptional(),
  })
  .openapi('DeviceInfo')

const LocationInfoSchema = z
  .object({
    ipAddress: z.string().exactOptional(),
    country: z.string().exactOptional(),
    countryCode: z.string().exactOptional(),
    region: z.string().exactOptional(),
    city: z.string().exactOptional(),
    latitude: z.number().exactOptional(),
    longitude: z.number().exactOptional(),
    timezone: z.string().exactOptional(),
    isp: z.string().exactOptional(),
    isVpn: z.boolean().exactOptional(),
    isTor: z.boolean().exactOptional(),
    isProxy: z.boolean().exactOptional(),
  })
  .openapi('LocationInfo')

const SessionSchema = z
  .object({
    id: z.uuid(),
    userId: z.uuid(),
    status: z.enum(['active', 'expired', 'revoked']),
    isCurrent: z.boolean().exactOptional().openapi({ description: '現在のセッションかどうか' }),
    device: DeviceInfoSchema.exactOptional(),
    location: LocationInfoSchema.exactOptional(),
    authMethod: z
      .enum(['password', 'mfa', 'sso', 'passkey', 'magic_link', 'social'])
      .exactOptional()
      .openapi({ description: '認証方法' }),
    authProvider: z
      .string()
      .exactOptional()
      .openapi({ description: '認証プロバイダー（SSO/Social の場合）' }),
    mfaVerified: z.boolean().exactOptional().openapi({ description: 'MFA検証済みか' }),
    riskScore: z.number().min(0).max(100).exactOptional().openapi({ description: 'リスクスコア' }),
    lastActivityAt: z.iso.datetime().exactOptional(),
    idleTimeoutAt: z.iso.datetime().exactOptional(),
    createdAt: z.iso.datetime(),
    expiresAt: z.iso.datetime(),
    revokedAt: z.iso.datetime().exactOptional(),
    revokedReason: z.string().exactOptional(),
  })
  .openapi({ required: ['id', 'userId', 'status', 'createdAt', 'expiresAt'] })
  .openapi('Session')

const SessionWithTokensSchema = SessionSchema.and(
  z
    .object({
      accessToken: z.string(),
      refreshToken: z.string(),
      tokenType: z.string().default('Bearer').exactOptional(),
      accessTokenExpiresIn: z
        .int()
        .exactOptional()
        .openapi({ description: 'アクセストークン有効期限（秒）' }),
      refreshTokenExpiresIn: z
        .int()
        .exactOptional()
        .openapi({ description: 'リフレッシュトークン有効期限（秒）' }),
    })
    .openapi({ required: ['accessToken', 'refreshToken'] }),
).openapi('SessionWithTokens')

const CreateSessionRequestSchema = z
  .object({
    grantType: z.enum(['password', 'mfa_token', 'sso_token', 'passkey', 'magic_link', 'social']),
    username: z.string().exactOptional().openapi({ description: 'password grant用' }),
    password: z.string().exactOptional().openapi({ description: 'password grant用' }),
    mfaToken: z.string().exactOptional().openapi({ description: 'mfa_token grant用' }),
    mfaCode: z.string().exactOptional().openapi({ description: 'mfa_token grant用' }),
    ssoToken: z.string().exactOptional().openapi({ description: 'sso_token grant用' }),
    passkeyResponse: z.object({}).exactOptional().openapi({ description: 'passkey grant用' }),
    magicLinkToken: z.string().exactOptional().openapi({ description: 'magic_link grant用' }),
    socialProvider: z.string().exactOptional().openapi({ description: 'social grant用' }),
    socialToken: z.string().exactOptional().openapi({ description: 'social grant用' }),
    deviceFingerprint: z
      .string()
      .exactOptional()
      .openapi({ description: 'デバイスフィンガープリント' }),
    rememberMe: z.boolean().default(false).exactOptional(),
  })
  .openapi({ required: ['grantType'] })
  .openapi('CreateSessionRequest')

const SessionValidationResultSchema = z
  .object({
    valid: z.boolean(),
    session: SessionSchema.exactOptional(),
    reason: z.string().exactOptional().openapi({ description: '無効な場合の理由' }),
  })
  .openapi({ required: ['valid'] })
  .openapi('SessionValidationResult')

const SessionHistorySchema = z
  .object({
    id: z.uuid(),
    sessionId: z.uuid().exactOptional(),
    eventType: z.enum([
      'created',
      'refreshed',
      'extended',
      'activity',
      'expired',
      'revoked',
      'logout',
    ]),
    device: DeviceInfoSchema.exactOptional(),
    location: LocationInfoSchema.exactOptional(),
    timestamp: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'eventType', 'timestamp'] })
  .openapi('SessionHistory')

const SecurityEventSchema = z
  .object({
    id: z.uuid(),
    eventType: z.enum([
      'login_failed',
      'suspicious_login',
      'new_device',
      'new_location',
      'impossible_travel',
      'brute_force_attempt',
      'session_hijack_attempt',
      'password_spray',
      'concurrent_sessions_exceeded',
    ]),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    description: z.string().exactOptional(),
    device: DeviceInfoSchema.exactOptional(),
    location: LocationInfoSchema.exactOptional(),
    actionTaken: z
      .enum([
        'none',
        'captcha_required',
        'mfa_required',
        'session_revoked',
        'account_locked',
        'alert_sent',
      ])
      .exactOptional(),
    resolved: z.boolean().exactOptional(),
    timestamp: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'eventType', 'severity', 'timestamp'] })
  .openapi('SecurityEvent')

const SessionPolicySchema = z
  .object({
    sessionDuration: z.int().exactOptional().openapi({ description: 'セッション有効期間（秒）' }),
    idleTimeout: z.int().exactOptional().openapi({ description: 'アイドルタイムアウト（秒）' }),
    maxConcurrentSessions: z.int().exactOptional().openapi({ description: '最大同時セッション数' }),
    concurrentSessionAction: z
      .enum(['allow', 'deny', 'revoke_oldest'])
      .exactOptional()
      .openapi({ description: '同時セッション超過時のアクション' }),
    requireMfaForNewDevice: z.boolean().exactOptional(),
    requireMfaForNewLocation: z.boolean().exactOptional(),
    allowRememberMe: z.boolean().exactOptional(),
    rememberMeDuration: z
      .int()
      .exactOptional()
      .openapi({ description: 'Remember Me の期間（秒）' }),
    refreshTokenRotation: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'リフレッシュトークンのローテーション' }),
    absoluteTimeout: z.int().exactOptional().openapi({ description: '絶対タイムアウト（秒）' }),
    ipBindingEnabled: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'IPアドレスバインディング' }),
  })
  .openapi('SessionPolicy')

const UpdateSessionPolicyRequestSchema = z
  .object({
    sessionDuration: z.int().min(300).max(604800).exactOptional(),
    idleTimeout: z.int().min(60).max(86400).exactOptional(),
    maxConcurrentSessions: z.int().min(1).max(100).exactOptional(),
    concurrentSessionAction: z.enum(['allow', 'deny', 'revoke_oldest']).exactOptional(),
    requireMfaForNewDevice: z.boolean().exactOptional(),
    requireMfaForNewLocation: z.boolean().exactOptional(),
    allowRememberMe: z.boolean().exactOptional(),
    rememberMeDuration: z.int().exactOptional(),
    refreshTokenRotation: z.boolean().exactOptional(),
  })
  .openapi('UpdateSessionPolicyRequest')

const TrustedDeviceSchema = z
  .object({
    id: z.uuid(),
    name: z.string().exactOptional(),
    device: DeviceInfoSchema,
    lastUsedAt: z.iso.datetime().exactOptional(),
    createdAt: z.iso.datetime(),
    expiresAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'device', 'createdAt', 'expiresAt'] })
  .openapi('TrustedDevice')

const PaginationSchema = z
  .object({ page: z.int(), limit: z.int(), total: z.int(), totalPages: z.int() })
  .openapi({ required: ['page', 'limit', 'total', 'totalPages'] })
  .openapi('Pagination')

const SessionHistoryResponseSchema = z
  .object({ data: z.array(SessionHistorySchema), pagination: PaginationSchema })
  .openapi({ required: ['data', 'pagination'] })
  .openapi('SessionHistoryResponse')

const SecurityEventListResponseSchema = z
  .object({ data: z.array(SecurityEventSchema), pagination: PaginationSchema })
  .openapi({ required: ['data', 'pagination'] })
  .openapi('SecurityEventListResponse')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('Error')

const SessionIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'sessionId',
      in: 'path',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    },
  })

const PageParamParamsSchema = z
  .int()
  .min(1)
  .default(1)
  .exactOptional()
  .openapi({
    param: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
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
      schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
    },
  })

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const CookieAuthSecurityScheme = { type: 'apiKey', in: 'cookie', name: 'session_id' }

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

export const getSessionsRoute = createRoute({
  method: 'get',
  path: '/sessions',
  tags: ['Sessions'],
  summary: 'アクティブセッション一覧',
  description: '現在のユーザーのアクティブなセッション一覧を取得',
  operationId: 'listSessions',
  request: {
    query: z.object({
      includeExpired: z
        .stringbool()
        .default(false)
        .exactOptional()
        .openapi({
          param: {
            name: 'includeExpired',
            in: 'query',
            description: '期限切れセッションも含める',
            schema: { type: 'boolean', default: false },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'セッション一覧',
      content: { 'application/json': { schema: z.array(SessionSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postSessionsRoute = createRoute({
  method: 'post',
  path: '/sessions',
  tags: ['Sessions'],
  summary: 'セッション作成',
  description: '認証成功後にセッションを作成',
  operationId: 'createSession',
  request: {
    body: {
      content: { 'application/json': { schema: CreateSessionRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'セッション作成成功',
      headers: z.object({
        'Set-Cookie': {
          description: 'セッションCookie',
          schema: z.string().exactOptional().openapi({ description: 'セッションCookie' }),
        },
      }),
      content: { 'application/json': { schema: SessionWithTokensSchema } },
    },
    400: BadRequestResponse,
    401: { description: '認証失敗', content: { 'application/json': { schema: ErrorSchema } } },
  },
})

export const getSessionsCurrentRoute = createRoute({
  method: 'get',
  path: '/sessions/current',
  tags: ['Current Session'],
  summary: '現在のセッション取得',
  operationId: 'getCurrentSession',
  responses: {
    200: {
      description: '現在のセッション',
      content: { 'application/json': { schema: SessionSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }, { cookieAuth: [] }],
})

export const deleteSessionsCurrentRoute = createRoute({
  method: 'delete',
  path: '/sessions/current',
  tags: ['Current Session'],
  summary: '現在のセッション終了（ログアウト）',
  operationId: 'deleteCurrentSession',
  responses: {
    204: {
      description: 'ログアウト成功',
      headers: z.object({
        'Set-Cookie': {
          description: 'セッションCookie削除',
          schema: z.string().exactOptional().openapi({ description: 'セッションCookie削除' }),
        },
      }),
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }, { cookieAuth: [] }],
})

export const postSessionsCurrentRefreshRoute = createRoute({
  method: 'post',
  path: '/sessions/current/refresh',
  tags: ['Current Session'],
  summary: 'セッション更新',
  description: 'リフレッシュトークンを使用してセッションを更新',
  operationId: 'refreshSession',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({ refreshToken: z.string() }).openapi({ required: ['refreshToken'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: SessionWithTokensSchema } },
    },
    401: {
      description: 'リフレッシュトークンが無効',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const postSessionsCurrentExtendRoute = createRoute({
  method: 'post',
  path: '/sessions/current/extend',
  tags: ['Current Session'],
  summary: 'セッション延長',
  description: 'アクティブなセッションの有効期限を延長',
  operationId: 'extendSession',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            duration: z
              .int()
              .min(60)
              .max(86400)
              .exactOptional()
              .openapi({ description: '延長時間（秒）' }),
          }),
        },
      },
    },
  },
  responses: {
    200: { description: '延長成功', content: { 'application/json': { schema: SessionSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }, { cookieAuth: [] }],
})

export const postSessionsCurrentActivityRoute = createRoute({
  method: 'post',
  path: '/sessions/current/activity',
  tags: ['Current Session'],
  summary: 'アクティビティ記録',
  description: 'ユーザーアクティビティを記録してアイドルタイムアウトをリセット',
  operationId: 'recordActivity',
  responses: {
    200: {
      description: '記録成功',
      content: {
        'application/json': {
          schema: z.object({
            lastActivityAt: z.iso.datetime().exactOptional(),
            idleTimeoutAt: z.iso.datetime().exactOptional(),
          }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }, { cookieAuth: [] }],
})

export const getSessionsSessionIdRoute = createRoute({
  method: 'get',
  path: '/sessions/{sessionId}',
  tags: ['Sessions'],
  summary: 'セッション詳細取得',
  operationId: 'getSession',
  request: { params: z.object({ sessionId: SessionIdParamParamsSchema }) },
  responses: {
    200: {
      description: 'セッション詳細',
      content: { 'application/json': { schema: SessionSchema } },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteSessionsSessionIdRoute = createRoute({
  method: 'delete',
  path: '/sessions/{sessionId}',
  tags: ['Sessions'],
  summary: 'セッション無効化',
  description: '指定したセッションを強制的に終了',
  operationId: 'revokeSession',
  request: { params: z.object({ sessionId: SessionIdParamParamsSchema }) },
  responses: {
    204: { description: '無効化成功' },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postSessionsRevokeAllRoute = createRoute({
  method: 'post',
  path: '/sessions/revoke-all',
  tags: ['Sessions'],
  summary: '全セッション無効化',
  description: '現在のセッション以外の全セッションを無効化',
  operationId: 'revokeAllSessions',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            includeCurrent: z
              .boolean()
              .default(false)
              .exactOptional()
              .openapi({ description: '現在のセッションも含めるか' }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: '無効化成功',
      content: {
        'application/json': { schema: z.object({ revokedCount: z.int().exactOptional() }) },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postSessionsValidateRoute = createRoute({
  method: 'post',
  path: '/sessions/validate',
  tags: ['Sessions'],
  summary: 'セッション検証',
  description: 'セッショントークンの有効性を検証',
  operationId: 'validateSession',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            accessToken: z.string().exactOptional(),
            sessionId: z.string().exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '検証結果',
      content: { 'application/json': { schema: SessionValidationResultSchema } },
    },
    400: BadRequestResponse,
  },
})

export const getSessionsHistoryRoute = createRoute({
  method: 'get',
  path: '/sessions/history',
  tags: ['Session History'],
  summary: 'セッション履歴取得',
  operationId: 'getSessionHistory',
  request: {
    query: z.object({
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
      from: z.iso
        .datetime()
        .exactOptional()
        .openapi({
          param: { name: 'from', in: 'query', schema: { type: 'string', format: 'date-time' } },
        }),
      to: z.iso
        .datetime()
        .exactOptional()
        .openapi({
          param: { name: 'to', in: 'query', schema: { type: 'string', format: 'date-time' } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'セッション履歴',
      content: { 'application/json': { schema: SessionHistoryResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getSessionsSecurityEventsRoute = createRoute({
  method: 'get',
  path: '/sessions/security-events',
  tags: ['Session History'],
  summary: 'セキュリティイベント取得',
  description: '不審なログイン試行などのセキュリティイベントを取得',
  operationId: 'getSecurityEvents',
  request: {
    query: z.object({
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
      severity: z
        .enum(['low', 'medium', 'high', 'critical'])
        .exactOptional()
        .openapi({
          param: {
            name: 'severity',
            in: 'query',
            schema: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'セキュリティイベント',
      content: { 'application/json': { schema: SecurityEventListResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getSessionsPoliciesRoute = createRoute({
  method: 'get',
  path: '/sessions/policies',
  tags: ['Session Policies'],
  summary: 'セッションポリシー取得',
  operationId: 'getSessionPolicies',
  responses: {
    200: {
      description: 'セッションポリシー',
      content: { 'application/json': { schema: SessionPolicySchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putSessionsPoliciesRoute = createRoute({
  method: 'put',
  path: '/sessions/policies',
  tags: ['Session Policies'],
  summary: 'セッションポリシー更新',
  operationId: 'updateSessionPolicies',
  request: {
    body: {
      content: { 'application/json': { schema: UpdateSessionPolicyRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: SessionPolicySchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getSessionsTrustedDevicesRoute = createRoute({
  method: 'get',
  path: '/sessions/trusted-devices',
  tags: ['Sessions'],
  summary: '信頼済みデバイス一覧',
  operationId: 'listTrustedDevices',
  responses: {
    200: {
      description: '信頼済みデバイス一覧',
      content: { 'application/json': { schema: z.array(TrustedDeviceSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postSessionsTrustedDevicesRoute = createRoute({
  method: 'post',
  path: '/sessions/trusted-devices',
  tags: ['Sessions'],
  summary: '現在のデバイスを信頼',
  operationId: 'trustCurrentDevice',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.string().exactOptional().openapi({ description: 'デバイス名' }),
            trustDuration: z
              .int()
              .min(1)
              .max(365)
              .exactOptional()
              .openapi({ description: '信頼期間（日）' }),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: '登録成功',
      content: { 'application/json': { schema: TrustedDeviceSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteSessionsTrustedDevicesDeviceIdRoute = createRoute({
  method: 'delete',
  path: '/sessions/trusted-devices/{deviceId}',
  tags: ['Sessions'],
  summary: '信頼済みデバイス削除',
  operationId: 'removeTrustedDevice',
  request: {
    params: z.object({
      deviceId: z
        .uuid()
        .openapi({
          param: {
            name: 'deviceId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})
