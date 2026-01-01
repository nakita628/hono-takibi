import { createRoute, z } from '@hono/zod-openapi'

const DeviceInfoSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    fingerprint: z.string().openapi({ type: 'string' }),
    type: z
      .enum(['desktop', 'mobile', 'tablet', 'unknown'])
      .openapi({ type: 'string', enum: ['desktop', 'mobile', 'tablet', 'unknown'] }),
    os: z.string().openapi({ type: 'string' }),
    osVersion: z.string().openapi({ type: 'string' }),
    browser: z.string().openapi({ type: 'string' }),
    browserVersion: z.string().openapi({ type: 'string' }),
    userAgent: z.string().openapi({ type: 'string' }),
    isTrusted: z.boolean().openapi({ type: 'boolean' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      id: { type: 'string' },
      fingerprint: { type: 'string' },
      type: { type: 'string', enum: ['desktop', 'mobile', 'tablet', 'unknown'] },
      os: { type: 'string' },
      osVersion: { type: 'string' },
      browser: { type: 'string' },
      browserVersion: { type: 'string' },
      userAgent: { type: 'string' },
      isTrusted: { type: 'boolean' },
    },
  })
  .openapi('DeviceInfo')

const LocationInfoSchema = z
  .object({
    ipAddress: z.string().openapi({ type: 'string' }),
    country: z.string().openapi({ type: 'string' }),
    countryCode: z.string().openapi({ type: 'string' }),
    region: z.string().openapi({ type: 'string' }),
    city: z.string().openapi({ type: 'string' }),
    latitude: z.number().openapi({ type: 'number' }),
    longitude: z.number().openapi({ type: 'number' }),
    timezone: z.string().openapi({ type: 'string' }),
    isp: z.string().openapi({ type: 'string' }),
    isVpn: z.boolean().openapi({ type: 'boolean' }),
    isTor: z.boolean().openapi({ type: 'boolean' }),
    isProxy: z.boolean().openapi({ type: 'boolean' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      ipAddress: { type: 'string' },
      country: { type: 'string' },
      countryCode: { type: 'string' },
      region: { type: 'string' },
      city: { type: 'string' },
      latitude: { type: 'number' },
      longitude: { type: 'number' },
      timezone: { type: 'string' },
      isp: { type: 'string' },
      isVpn: { type: 'boolean' },
      isTor: { type: 'boolean' },
      isProxy: { type: 'boolean' },
    },
  })
  .openapi('LocationInfo')

const SessionSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    userId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    status: z
      .enum(['active', 'expired', 'revoked'])
      .openapi({ type: 'string', enum: ['active', 'expired', 'revoked'] }),
    isCurrent: z
      .boolean()
      .optional()
      .openapi({ type: 'boolean', description: '現在のセッションかどうか' }),
    device: DeviceInfoSchema.optional(),
    location: LocationInfoSchema.optional(),
    authMethod: z
      .enum(['password', 'mfa', 'sso', 'passkey', 'magic_link', 'social'])
      .optional()
      .openapi({
        type: 'string',
        enum: ['password', 'mfa', 'sso', 'passkey', 'magic_link', 'social'],
        description: '認証方法',
      }),
    authProvider: z
      .string()
      .optional()
      .openapi({ type: 'string', description: '認証プロバイダー（SSO/Social の場合）' }),
    mfaVerified: z.boolean().optional().openapi({ type: 'boolean', description: 'MFA検証済みか' }),
    riskScore: z
      .number()
      .min(0)
      .max(100)
      .optional()
      .openapi({ type: 'number', minimum: 0, maximum: 100, description: 'リスクスコア' }),
    lastActivityAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    idleTimeoutAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    expiresAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    revokedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    revokedReason: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'userId', 'status', 'createdAt', 'expiresAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      userId: { type: 'string', format: 'uuid' },
      status: { type: 'string', enum: ['active', 'expired', 'revoked'] },
      isCurrent: { type: 'boolean', description: '現在のセッションかどうか' },
      device: { $ref: '#/components/schemas/DeviceInfo' },
      location: { $ref: '#/components/schemas/LocationInfo' },
      authMethod: {
        type: 'string',
        enum: ['password', 'mfa', 'sso', 'passkey', 'magic_link', 'social'],
        description: '認証方法',
      },
      authProvider: { type: 'string', description: '認証プロバイダー（SSO/Social の場合）' },
      mfaVerified: { type: 'boolean', description: 'MFA検証済みか' },
      riskScore: { type: 'number', minimum: 0, maximum: 100, description: 'リスクスコア' },
      lastActivityAt: { type: 'string', format: 'date-time' },
      idleTimeoutAt: { type: 'string', format: 'date-time' },
      createdAt: { type: 'string', format: 'date-time' },
      expiresAt: { type: 'string', format: 'date-time' },
      revokedAt: { type: 'string', format: 'date-time' },
      revokedReason: { type: 'string' },
    },
  })
  .openapi('Session')

const SessionWithTokensSchema = z
  .intersection(
    SessionSchema,
    z
      .object({
        accessToken: z.string().openapi({ type: 'string' }),
        refreshToken: z.string().openapi({ type: 'string' }),
        tokenType: z
          .string()
          .default('Bearer')
          .optional()
          .openapi({ type: 'string', default: 'Bearer' }),
        accessTokenExpiresIn: z
          .int()
          .optional()
          .openapi({ type: 'integer', description: 'アクセストークン有効期限（秒）' }),
        refreshTokenExpiresIn: z
          .int()
          .optional()
          .openapi({ type: 'integer', description: 'リフレッシュトークン有効期限（秒）' }),
      })
      .openapi({
        type: 'object',
        required: ['accessToken', 'refreshToken'],
        properties: {
          accessToken: { type: 'string' },
          refreshToken: { type: 'string' },
          tokenType: { type: 'string', default: 'Bearer' },
          accessTokenExpiresIn: { type: 'integer', description: 'アクセストークン有効期限（秒）' },
          refreshTokenExpiresIn: {
            type: 'integer',
            description: 'リフレッシュトークン有効期限（秒）',
          },
        },
      }),
  )
  .optional()
  .openapi({
    allOf: [
      { $ref: '#/components/schemas/Session' },
      {
        type: 'object',
        required: ['accessToken', 'refreshToken'],
        properties: {
          accessToken: { type: 'string' },
          refreshToken: { type: 'string' },
          tokenType: { type: 'string', default: 'Bearer' },
          accessTokenExpiresIn: { type: 'integer', description: 'アクセストークン有効期限（秒）' },
          refreshTokenExpiresIn: {
            type: 'integer',
            description: 'リフレッシュトークン有効期限（秒）',
          },
        },
      },
    ],
  })
  .openapi('SessionWithTokens')

const CreateSessionRequestSchema = z
  .object({
    grantType: z
      .enum(['password', 'mfa_token', 'sso_token', 'passkey', 'magic_link', 'social'])
      .openapi({
        type: 'string',
        enum: ['password', 'mfa_token', 'sso_token', 'passkey', 'magic_link', 'social'],
      }),
    username: z.string().optional().openapi({ type: 'string', description: 'password grant用' }),
    password: z.string().optional().openapi({ type: 'string', description: 'password grant用' }),
    mfaToken: z.string().optional().openapi({ type: 'string', description: 'mfa_token grant用' }),
    mfaCode: z.string().optional().openapi({ type: 'string', description: 'mfa_token grant用' }),
    ssoToken: z.string().optional().openapi({ type: 'string', description: 'sso_token grant用' }),
    passkeyResponse: z.object({}).openapi({ type: 'object', description: 'passkey grant用' }),
    magicLinkToken: z
      .string()
      .optional()
      .openapi({ type: 'string', description: 'magic_link grant用' }),
    socialProvider: z
      .string()
      .optional()
      .openapi({ type: 'string', description: 'social grant用' }),
    socialToken: z.string().optional().openapi({ type: 'string', description: 'social grant用' }),
    deviceFingerprint: z
      .string()
      .optional()
      .openapi({ type: 'string', description: 'デバイスフィンガープリント' }),
    rememberMe: z.boolean().default(false).optional().openapi({ type: 'boolean', default: false }),
  })
  .openapi({
    type: 'object',
    required: ['grantType'],
    properties: {
      grantType: {
        type: 'string',
        enum: ['password', 'mfa_token', 'sso_token', 'passkey', 'magic_link', 'social'],
      },
      username: { type: 'string', description: 'password grant用' },
      password: { type: 'string', description: 'password grant用' },
      mfaToken: { type: 'string', description: 'mfa_token grant用' },
      mfaCode: { type: 'string', description: 'mfa_token grant用' },
      ssoToken: { type: 'string', description: 'sso_token grant用' },
      passkeyResponse: { type: 'object', description: 'passkey grant用' },
      magicLinkToken: { type: 'string', description: 'magic_link grant用' },
      socialProvider: { type: 'string', description: 'social grant用' },
      socialToken: { type: 'string', description: 'social grant用' },
      deviceFingerprint: { type: 'string', description: 'デバイスフィンガープリント' },
      rememberMe: { type: 'boolean', default: false },
    },
  })
  .openapi('CreateSessionRequest')

const SessionValidationResultSchema = z
  .object({
    valid: z.boolean().openapi({ type: 'boolean' }),
    session: SessionSchema.optional(),
    reason: z.string().optional().openapi({ type: 'string', description: '無効な場合の理由' }),
  })
  .openapi({
    type: 'object',
    required: ['valid'],
    properties: {
      valid: { type: 'boolean' },
      session: { $ref: '#/components/schemas/Session' },
      reason: { type: 'string', description: '無効な場合の理由' },
    },
  })
  .openapi('SessionValidationResult')

const SessionHistorySchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    sessionId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    eventType: z
      .enum(['created', 'refreshed', 'extended', 'activity', 'expired', 'revoked', 'logout'])
      .openapi({
        type: 'string',
        enum: ['created', 'refreshed', 'extended', 'activity', 'expired', 'revoked', 'logout'],
      }),
    device: DeviceInfoSchema.optional(),
    location: LocationInfoSchema.optional(),
    timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'eventType', 'timestamp'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      sessionId: { type: 'string', format: 'uuid' },
      eventType: {
        type: 'string',
        enum: ['created', 'refreshed', 'extended', 'activity', 'expired', 'revoked', 'logout'],
      },
      device: { $ref: '#/components/schemas/DeviceInfo' },
      location: { $ref: '#/components/schemas/LocationInfo' },
      timestamp: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('SessionHistory')

const SecurityEventSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    eventType: z
      .enum([
        'login_failed',
        'suspicious_login',
        'new_device',
        'new_location',
        'impossible_travel',
        'brute_force_attempt',
        'session_hijack_attempt',
        'password_spray',
        'concurrent_sessions_exceeded',
      ])
      .openapi({
        type: 'string',
        enum: [
          'login_failed',
          'suspicious_login',
          'new_device',
          'new_location',
          'impossible_travel',
          'brute_force_attempt',
          'session_hijack_attempt',
          'password_spray',
          'concurrent_sessions_exceeded',
        ],
      }),
    severity: z
      .enum(['low', 'medium', 'high', 'critical'])
      .openapi({ type: 'string', enum: ['low', 'medium', 'high', 'critical'] }),
    description: z.string().optional().openapi({ type: 'string' }),
    device: DeviceInfoSchema.optional(),
    location: LocationInfoSchema.optional(),
    actionTaken: z
      .enum([
        'none',
        'captcha_required',
        'mfa_required',
        'session_revoked',
        'account_locked',
        'alert_sent',
      ])
      .optional()
      .openapi({
        type: 'string',
        enum: [
          'none',
          'captcha_required',
          'mfa_required',
          'session_revoked',
          'account_locked',
          'alert_sent',
        ],
      }),
    resolved: z.boolean().optional().openapi({ type: 'boolean' }),
    timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'eventType', 'severity', 'timestamp'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      eventType: {
        type: 'string',
        enum: [
          'login_failed',
          'suspicious_login',
          'new_device',
          'new_location',
          'impossible_travel',
          'brute_force_attempt',
          'session_hijack_attempt',
          'password_spray',
          'concurrent_sessions_exceeded',
        ],
      },
      severity: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
      description: { type: 'string' },
      device: { $ref: '#/components/schemas/DeviceInfo' },
      location: { $ref: '#/components/schemas/LocationInfo' },
      actionTaken: {
        type: 'string',
        enum: [
          'none',
          'captcha_required',
          'mfa_required',
          'session_revoked',
          'account_locked',
          'alert_sent',
        ],
      },
      resolved: { type: 'boolean' },
      timestamp: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('SecurityEvent')

const SessionPolicySchema = z
  .object({
    sessionDuration: z.int().openapi({ type: 'integer', description: 'セッション有効期間（秒）' }),
    idleTimeout: z.int().openapi({ type: 'integer', description: 'アイドルタイムアウト（秒）' }),
    maxConcurrentSessions: z
      .int()
      .openapi({ type: 'integer', description: '最大同時セッション数' }),
    concurrentSessionAction: z
      .enum(['allow', 'deny', 'revoke_oldest'])
      .openapi({
        type: 'string',
        enum: ['allow', 'deny', 'revoke_oldest'],
        description: '同時セッション超過時のアクション',
      }),
    requireMfaForNewDevice: z.boolean().openapi({ type: 'boolean' }),
    requireMfaForNewLocation: z.boolean().openapi({ type: 'boolean' }),
    allowRememberMe: z.boolean().openapi({ type: 'boolean' }),
    rememberMeDuration: z
      .int()
      .openapi({ type: 'integer', description: 'Remember Me の期間（秒）' }),
    refreshTokenRotation: z
      .boolean()
      .openapi({ type: 'boolean', description: 'リフレッシュトークンのローテーション' }),
    absoluteTimeout: z.int().openapi({ type: 'integer', description: '絶対タイムアウト（秒）' }),
    ipBindingEnabled: z
      .boolean()
      .openapi({ type: 'boolean', description: 'IPアドレスバインディング' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      sessionDuration: { type: 'integer', description: 'セッション有効期間（秒）' },
      idleTimeout: { type: 'integer', description: 'アイドルタイムアウト（秒）' },
      maxConcurrentSessions: { type: 'integer', description: '最大同時セッション数' },
      concurrentSessionAction: {
        type: 'string',
        enum: ['allow', 'deny', 'revoke_oldest'],
        description: '同時セッション超過時のアクション',
      },
      requireMfaForNewDevice: { type: 'boolean' },
      requireMfaForNewLocation: { type: 'boolean' },
      allowRememberMe: { type: 'boolean' },
      rememberMeDuration: { type: 'integer', description: 'Remember Me の期間（秒）' },
      refreshTokenRotation: {
        type: 'boolean',
        description: 'リフレッシュトークンのローテーション',
      },
      absoluteTimeout: { type: 'integer', description: '絶対タイムアウト（秒）' },
      ipBindingEnabled: { type: 'boolean', description: 'IPアドレスバインディング' },
    },
  })
  .openapi('SessionPolicy')

const UpdateSessionPolicyRequestSchema = z
  .object({
    sessionDuration: z
      .int()
      .min(300)
      .max(604800)
      .openapi({ type: 'integer', minimum: 300, maximum: 604800 }),
    idleTimeout: z
      .int()
      .min(60)
      .max(86400)
      .openapi({ type: 'integer', minimum: 60, maximum: 86400 }),
    maxConcurrentSessions: z
      .int()
      .min(1)
      .max(100)
      .openapi({ type: 'integer', minimum: 1, maximum: 100 }),
    concurrentSessionAction: z
      .enum(['allow', 'deny', 'revoke_oldest'])
      .openapi({ type: 'string', enum: ['allow', 'deny', 'revoke_oldest'] }),
    requireMfaForNewDevice: z.boolean().openapi({ type: 'boolean' }),
    requireMfaForNewLocation: z.boolean().openapi({ type: 'boolean' }),
    allowRememberMe: z.boolean().openapi({ type: 'boolean' }),
    rememberMeDuration: z.int().openapi({ type: 'integer' }),
    refreshTokenRotation: z.boolean().openapi({ type: 'boolean' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      sessionDuration: { type: 'integer', minimum: 300, maximum: 604800 },
      idleTimeout: { type: 'integer', minimum: 60, maximum: 86400 },
      maxConcurrentSessions: { type: 'integer', minimum: 1, maximum: 100 },
      concurrentSessionAction: { type: 'string', enum: ['allow', 'deny', 'revoke_oldest'] },
      requireMfaForNewDevice: { type: 'boolean' },
      requireMfaForNewLocation: { type: 'boolean' },
      allowRememberMe: { type: 'boolean' },
      rememberMeDuration: { type: 'integer' },
      refreshTokenRotation: { type: 'boolean' },
    },
  })
  .openapi('UpdateSessionPolicyRequest')

const TrustedDeviceSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().optional().openapi({ type: 'string' }),
    device: DeviceInfoSchema,
    lastUsedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    expiresAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'device', 'createdAt', 'expiresAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      device: { $ref: '#/components/schemas/DeviceInfo' },
      lastUsedAt: { type: 'string', format: 'date-time' },
      createdAt: { type: 'string', format: 'date-time' },
      expiresAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('TrustedDevice')

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

const SessionHistoryResponseSchema = z
  .object({
    data: z
      .array(SessionHistorySchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/SessionHistory' } }),
    pagination: PaginationSchema,
  })
  .openapi({
    type: 'object',
    required: ['data', 'pagination'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/SessionHistory' } },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  })
  .openapi('SessionHistoryResponse')

const SecurityEventListResponseSchema = z
  .object({
    data: z
      .array(SecurityEventSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/SecurityEvent' } }),
    pagination: PaginationSchema,
  })
  .openapi({
    type: 'object',
    required: ['data', 'pagination'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/SecurityEvent' } },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  })
  .openapi('SecurityEventListResponse')

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

const SessionIdParamParamsSchema = z
  .uuid()
  .openapi({
    param: {
      name: 'sessionId',
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

const CookieAuthSecurityScheme = { type: 'apiKey', in: 'cookie', name: 'session_id' }

const BadRequestResponse = {
  description: 'リクエストが不正です',
  content: { 'application/json': { schema: ErrorSchema.optional() } },
}

const UnauthorizedResponse = {
  description: '認証が必要です',
  content: { 'application/json': { schema: ErrorSchema.optional() } },
}

const NotFoundResponse = {
  description: 'リソースが見つかりません',
  content: { 'application/json': { schema: ErrorSchema.optional() } },
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
        .optional()
        .openapi({
          param: {
            name: 'includeExpired',
            in: 'query',
            description: '期限切れセッションも含める',
            schema: { type: 'boolean', default: false },
          },
          type: 'boolean',
          default: false,
        }),
    }),
  },
  responses: {
    200: {
      description: 'セッション一覧',
      content: {
        'application/json': {
          schema: z
            .array(SessionSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Session' } }),
        },
      },
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
      content: { 'application/json': { schema: CreateSessionRequestSchema.optional() } },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'セッション作成成功',
      content: { 'application/json': { schema: SessionWithTokensSchema.optional() } },
    },
    400: BadRequestResponse,
    401: {
      description: '認証失敗',
      content: { 'application/json': { schema: ErrorSchema.optional() } },
    },
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
      content: { 'application/json': { schema: SessionSchema.optional() } },
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
  responses: { 204: { description: 'ログアウト成功' }, 401: UnauthorizedResponse },
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
      description: '更新成功',
      content: { 'application/json': { schema: SessionWithTokensSchema.optional() } },
    },
    401: {
      description: 'リフレッシュトークンが無効',
      content: { 'application/json': { schema: ErrorSchema.optional() } },
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
          schema: z
            .object({
              duration: z
                .int()
                .min(60)
                .max(86400)
                .openapi({
                  type: 'integer',
                  description: '延長時間（秒）',
                  minimum: 60,
                  maximum: 86400,
                }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                duration: {
                  type: 'integer',
                  description: '延長時間（秒）',
                  minimum: 60,
                  maximum: 86400,
                },
              },
            }),
        },
      },
    },
  },
  responses: {
    200: {
      description: '延長成功',
      content: { 'application/json': { schema: SessionSchema.optional() } },
    },
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
          schema: z
            .object({
              lastActivityAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
              idleTimeoutAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                lastActivityAt: { type: 'string', format: 'date-time' },
                idleTimeoutAt: { type: 'string', format: 'date-time' },
              },
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
      content: { 'application/json': { schema: SessionSchema.optional() } },
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
          schema: z
            .object({
              includeCurrent: z
                .boolean()
                .default(false)
                .openapi({
                  type: 'boolean',
                  default: false,
                  description: '現在のセッションも含めるか',
                }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                includeCurrent: {
                  type: 'boolean',
                  default: false,
                  description: '現在のセッションも含めるか',
                },
              },
            }),
        },
      },
    },
  },
  responses: {
    200: {
      description: '無効化成功',
      content: {
        'application/json': {
          schema: z
            .object({ revokedCount: z.int().openapi({ type: 'integer' }) })
            .partial()
            .openapi({ type: 'object', properties: { revokedCount: { type: 'integer' } } }),
        },
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
          schema: z
            .object({
              accessToken: z.string().openapi({ type: 'string' }),
              sessionId: z.string().openapi({ type: 'string' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: { accessToken: { type: 'string' }, sessionId: { type: 'string' } },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '検証結果',
      content: { 'application/json': { schema: SessionValidationResultSchema.optional() } },
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
        .optional()
        .openapi({
          param: { name: 'from', in: 'query', schema: { type: 'string', format: 'date-time' } },
          type: 'string',
          format: 'date-time',
        }),
      to: z.iso
        .datetime()
        .optional()
        .openapi({
          param: { name: 'to', in: 'query', schema: { type: 'string', format: 'date-time' } },
          type: 'string',
          format: 'date-time',
        }),
    }),
  },
  responses: {
    200: {
      description: 'セッション履歴',
      content: { 'application/json': { schema: SessionHistoryResponseSchema.optional() } },
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
        .optional()
        .openapi({
          param: {
            name: 'severity',
            in: 'query',
            schema: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
          },
          type: 'string',
          enum: ['low', 'medium', 'high', 'critical'],
        }),
    }),
  },
  responses: {
    200: {
      description: 'セキュリティイベント',
      content: { 'application/json': { schema: SecurityEventListResponseSchema.optional() } },
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
      content: { 'application/json': { schema: SessionPolicySchema.optional() } },
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
      content: { 'application/json': { schema: UpdateSessionPolicyRequestSchema.optional() } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: SessionPolicySchema.optional() } },
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
      content: {
        'application/json': {
          schema: z
            .array(TrustedDeviceSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/TrustedDevice' } }),
        },
      },
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
          schema: z
            .object({
              name: z.string().openapi({ type: 'string', description: 'デバイス名' }),
              trustDuration: z
                .int()
                .min(1)
                .max(365)
                .openapi({
                  type: 'integer',
                  description: '信頼期間（日）',
                  minimum: 1,
                  maximum: 365,
                }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                name: { type: 'string', description: 'デバイス名' },
                trustDuration: {
                  type: 'integer',
                  description: '信頼期間（日）',
                  minimum: 1,
                  maximum: 365,
                },
              },
            }),
        },
      },
    },
  },
  responses: {
    201: {
      description: '登録成功',
      content: { 'application/json': { schema: TrustedDeviceSchema.optional() } },
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
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})
