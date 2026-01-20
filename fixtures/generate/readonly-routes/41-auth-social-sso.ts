import { createRoute, z } from '@hono/zod-openapi'

const ProviderInfoSchema = z
  .object({
    id: z.string(),
    name: z.string().openapi({ description: '表示名' }),
    type: z.enum(['oauth2', 'oidc', 'saml']),
    enabled: z.boolean(),
    icon: z.url().exactOptional(),
    buttonColor: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .exactOptional(),
    buttonTextColor: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'type', 'enabled'] })
  .readonly()
  .openapi('ProviderInfo')

const ProviderConfigSchema = z
  .object({
    id: z.uuid(),
    name: z.string(),
    type: z.enum(['oauth2', 'oidc', 'saml']),
    enabled: z.boolean(),
    clientId: z.string().exactOptional(),
    authorizationUrl: z.url().exactOptional(),
    tokenUrl: z.url().exactOptional(),
    userInfoUrl: z.url().exactOptional(),
    scopes: z.array(z.string()).exactOptional(),
    attributeMapping: z
      .object({
        id: z.string().exactOptional(),
        email: z.string().exactOptional(),
        name: z.string().exactOptional(),
        picture: z.string().exactOptional(),
      })
      .exactOptional(),
    allowedDomains: z
      .array(z.string())
      .exactOptional()
      .openapi({ description: '許可するメールドメイン' }),
    autoCreateUser: z.boolean().default(true).exactOptional(),
    autoLinkUser: z
      .boolean()
      .default(false)
      .exactOptional()
      .openapi({ description: 'メールアドレスで既存ユーザーに自動連携' }),
    icon: z.url().exactOptional(),
    buttonColor: z.string().exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'type', 'enabled', 'createdAt'] })
  .readonly()
  .openapi('ProviderConfig')

const CreateProviderRequestSchema = z
  .object({
    name: z.string().min(1).max(100),
    type: z.enum(['oauth2', 'oidc']),
    clientId: z.string(),
    clientSecret: z.string(),
    authorizationUrl: z.url().exactOptional(),
    tokenUrl: z.url().exactOptional(),
    userInfoUrl: z.url().exactOptional(),
    scopes: z.array(z.string()).exactOptional(),
    attributeMapping: z.object({}).exactOptional(),
    allowedDomains: z.array(z.string()).exactOptional(),
    autoCreateUser: z.boolean().default(true).exactOptional(),
    autoLinkUser: z.boolean().default(false).exactOptional(),
    icon: z.url().exactOptional(),
    buttonColor: z.string().exactOptional(),
  })
  .openapi({ required: ['name', 'type', 'clientId', 'clientSecret'] })
  .readonly()
  .openapi('CreateProviderRequest')

const UpdateProviderRequestSchema = z
  .object({
    name: z.string().exactOptional(),
    enabled: z.boolean().exactOptional(),
    clientId: z.string().exactOptional(),
    clientSecret: z.string().exactOptional(),
    authorizationUrl: z.url().exactOptional(),
    tokenUrl: z.url().exactOptional(),
    userInfoUrl: z.url().exactOptional(),
    scopes: z.array(z.string()).exactOptional(),
    attributeMapping: z.object({}).exactOptional(),
    allowedDomains: z.array(z.string()).exactOptional(),
    autoCreateUser: z.boolean().exactOptional(),
    autoLinkUser: z.boolean().exactOptional(),
  })
  .readonly()
  .openapi('UpdateProviderRequest')

const SocialAuthResultSchema = z
  .object({
    user: z.object({
      id: z.uuid().exactOptional(),
      email: z.email().exactOptional(),
      name: z.string().exactOptional(),
      picture: z.url().exactOptional(),
    }),
    isNewUser: z.boolean(),
    accessToken: z.string().exactOptional(),
    refreshToken: z.string().exactOptional(),
    expiresIn: z.int().exactOptional(),
    provider: z.string().exactOptional(),
    providerUserId: z.string().exactOptional(),
  })
  .openapi({ required: ['user', 'isNewUser'] })
  .readonly()
  .openapi('SocialAuthResult')

const SocialAuthErrorSchema = z
  .object({
    error: z.enum([
      'invalid_request',
      'access_denied',
      'unauthorized_client',
      'invalid_scope',
      'server_error',
      'temporarily_unavailable',
      'invalid_token',
      'email_not_verified',
      'domain_not_allowed',
      'user_exists',
      'linking_failed',
    ]),
    message: z.string(),
    provider: z.string().exactOptional(),
  })
  .openapi({ required: ['error', 'message'] })
  .readonly()
  .openapi('SocialAuthError')

const LinkedAccountSchema = z
  .object({
    id: z.uuid(),
    provider: z.string(),
    providerUserId: z.string(),
    providerEmail: z.email().exactOptional(),
    providerName: z.string().exactOptional(),
    providerPicture: z.url().exactOptional(),
    lastUsedAt: z.iso.datetime().exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'provider', 'providerUserId', 'createdAt'] })
  .readonly()
  .openapi('LinkedAccount')

const SAMLConfigSchema = z
  .object({
    entityId: z.string().exactOptional().openapi({ description: 'IdP Entity ID' }),
    ssoUrl: z.url().exactOptional().openapi({ description: 'IdP SSO URL' }),
    sloUrl: z.url().exactOptional().openapi({ description: 'IdP SLO URL' }),
    certificate: z.string().exactOptional().openapi({ description: 'IdP 証明書（PEM形式）' }),
    signRequest: z.boolean().exactOptional(),
    signatureAlgorithm: z.enum(['RSA-SHA256', 'RSA-SHA512']).exactOptional(),
    digestAlgorithm: z.enum(['SHA256', 'SHA512']).exactOptional(),
    nameIdFormat: z.string().exactOptional(),
    attributeMapping: z
      .object({
        email: z.string().exactOptional(),
        name: z.string().exactOptional(),
        firstName: z.string().exactOptional(),
        lastName: z.string().exactOptional(),
        groups: z.string().exactOptional(),
      })
      .exactOptional(),
  })
  .readonly()
  .openapi('SAMLConfig')

const OIDCConfigSchema = z
  .object({
    issuer: z.url().exactOptional(),
    clientId: z.string().exactOptional(),
    authorizationEndpoint: z.url().exactOptional(),
    tokenEndpoint: z.url().exactOptional(),
    userInfoEndpoint: z.url().exactOptional(),
    jwksUri: z.url().exactOptional(),
    scopes: z.array(z.string()).exactOptional(),
    attributeMapping: z.object({}).exactOptional(),
  })
  .readonly()
  .openapi('OIDCConfig')

const EnterpriseSSOConfigSchema = z
  .object({
    id: z.uuid(),
    name: z.string().openapi({ description: '組織名' }),
    type: z.enum(['saml', 'oidc']),
    domains: z.array(z.string()).openapi({ description: '関連付けられたメールドメイン' }),
    enabled: z.boolean(),
    samlConfig: SAMLConfigSchema.exactOptional(),
    oidcConfig: OIDCConfigSchema.exactOptional(),
    userProvisioning: z
      .object({
        autoCreate: z.boolean().exactOptional(),
        autoUpdate: z.boolean().exactOptional(),
        defaultRole: z.string().exactOptional(),
      })
      .exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'name', 'type', 'domains', 'enabled', 'createdAt'] })
  .readonly()
  .openapi('EnterpriseSSOConfig')

const CreateEnterpriseSSORequestSchema = z
  .object({
    name: z.string().min(1).max(200),
    type: z.enum(['saml', 'oidc']),
    domains: z.array(z.string()).min(1),
    samlConfig: SAMLConfigSchema.exactOptional(),
    oidcConfig: OIDCConfigSchema.exactOptional(),
    userProvisioning: z.object({}).exactOptional(),
  })
  .openapi({ required: ['name', 'type', 'domains'] })
  .readonly()
  .openapi('CreateEnterpriseSSORequest')

const UpdateEnterpriseSSORequestSchema = z
  .object({
    name: z.string().exactOptional(),
    enabled: z.boolean().exactOptional(),
    domains: z.array(z.string()).exactOptional(),
    samlConfig: SAMLConfigSchema.exactOptional(),
    oidcConfig: OIDCConfigSchema.exactOptional(),
    userProvisioning: z.object({}).exactOptional(),
  })
  .readonly()
  .openapi('UpdateEnterpriseSSORequest')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .readonly()
  .openapi('Error')

const ProviderParamParamsSchema = z
  .enum([
    'google',
    'github',
    'microsoft',
    'apple',
    'facebook',
    'twitter',
    'linkedin',
    'slack',
    'discord',
    'custom',
  ])
  .openapi({
    param: {
      name: 'provider',
      in: 'path',
      required: true,
      description: 'プロバイダー識別子',
      schema: {
        type: 'string',
        enum: [
          'google',
          'github',
          'microsoft',
          'apple',
          'facebook',
          'twitter',
          'linkedin',
          'slack',
          'discord',
          'custom',
        ],
      },
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

export const getSocialAuthorizeProviderRoute = createRoute({
  method: 'get',
  path: '/social/authorize/{provider}',
  tags: ['Social Auth'],
  summary: 'ソーシャル認証開始',
  description: 'ソーシャルプロバイダーの認証画面にリダイレクト',
  operationId: 'socialAuthorize',
  request: {
    params: z.object({ provider: ProviderParamParamsSchema }),
    query: z.object({
      redirect_uri: z.url().openapi({
        param: {
          name: 'redirect_uri',
          in: 'query',
          required: true,
          schema: { type: 'string', format: 'uri' },
        },
      }),
      state: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'state', in: 'query', schema: { type: 'string' } } }),
      scope: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'scope',
            in: 'query',
            description: '追加のスコープ（カンマ区切り）',
            schema: { type: 'string' },
          },
        }),
      login_hint: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'login_hint',
            in: 'query',
            description: 'ログインヒント',
            schema: { type: 'string' },
          },
        }),
      prompt: z
        .enum(['none', 'consent', 'select_account'])
        .exactOptional()
        .openapi({
          param: {
            name: 'prompt',
            in: 'query',
            schema: { type: 'string', enum: ['none', 'consent', 'select_account'] },
          },
        }),
    }),
  },
  responses: {
    302: {
      description: 'プロバイダーの認証画面にリダイレクト',
      headers: z.object({ Location: { schema: z.url().exactOptional() } }),
    },
    400: {
      description: '不正なリクエスト',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
} as const)

export const getSocialCallbackProviderRoute = createRoute({
  method: 'get',
  path: '/social/callback/{provider}',
  tags: ['Social Auth'],
  summary: 'ソーシャル認証コールバック',
  description: 'プロバイダーからのコールバックを処理',
  operationId: 'socialCallback',
  request: {
    params: z.object({ provider: ProviderParamParamsSchema }),
    query: z.object({
      code: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'code',
            in: 'query',
            description: '認可コード',
            schema: { type: 'string' },
          },
        }),
      state: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'state', in: 'query', schema: { type: 'string' } } }),
      error: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'error',
            in: 'query',
            description: 'エラーコード',
            schema: { type: 'string' },
          },
        }),
      error_description: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'error_description', in: 'query', schema: { type: 'string' } } }),
    }),
  },
  responses: {
    302: {
      description: 'アプリケーションにリダイレクト',
      headers: z.object({ Location: { schema: z.url().exactOptional() } }),
    },
    400: {
      description: '認証失敗',
      content: { 'application/json': { schema: SocialAuthErrorSchema } },
    },
  },
} as const)

export const postSocialTokenRoute = createRoute({
  method: 'post',
  path: '/social/token',
  tags: ['Social Auth'],
  summary: 'ソーシャルトークン交換',
  description: '認可コードをアクセストークンに交換',
  operationId: 'exchangeSocialToken',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              provider: z.string(),
              code: z.string(),
              redirectUri: z.url(),
              codeVerifier: z.string().exactOptional().openapi({ description: 'PKCE用' }),
            })
            .openapi({ required: ['provider', 'code', 'redirectUri'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '認証成功',
      content: { 'application/json': { schema: SocialAuthResultSchema } },
    },
    400: {
      description: '認証失敗',
      content: { 'application/json': { schema: SocialAuthErrorSchema } },
    },
  },
} as const)

export const postSocialTokenNativeRoute = createRoute({
  method: 'post',
  path: '/social/token/native',
  tags: ['Social Auth'],
  summary: 'ネイティブトークン検証',
  description: 'モバイルアプリから直接取得したトークンを検証',
  operationId: 'verifyNativeToken',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              provider: z.string(),
              token: z.string().openapi({ description: 'ID Token または Access Token' }),
              tokenType: z.enum(['id_token', 'access_token']).default('id_token').exactOptional(),
            })
            .openapi({ required: ['provider', 'token'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '検証成功',
      content: { 'application/json': { schema: SocialAuthResultSchema } },
    },
    400: {
      description: '検証失敗',
      content: { 'application/json': { schema: SocialAuthErrorSchema } },
    },
  },
} as const)

export const getProvidersRoute = createRoute({
  method: 'get',
  path: '/providers',
  tags: ['Providers'],
  summary: '有効なプロバイダー一覧',
  operationId: 'listProviders',
  responses: {
    200: {
      description: 'プロバイダー一覧',
      content: { 'application/json': { schema: z.array(ProviderInfoSchema) } },
    },
  },
} as const)

export const getProvidersAdminRoute = createRoute({
  method: 'get',
  path: '/providers/admin',
  tags: ['Providers'],
  summary: '全プロバイダー一覧（管理用）',
  operationId: 'listAllProviders',
  responses: {
    200: {
      description: 'プロバイダー一覧',
      content: { 'application/json': { schema: z.array(ProviderConfigSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const postProvidersAdminRoute = createRoute({
  method: 'post',
  path: '/providers/admin',
  tags: ['Providers'],
  summary: 'プロバイダー追加',
  operationId: 'createProvider',
  request: {
    body: {
      content: { 'application/json': { schema: CreateProviderRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: '作成成功',
      content: { 'application/json': { schema: ProviderConfigSchema } },
    },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const getProvidersProviderIdRoute = createRoute({
  method: 'get',
  path: '/providers/{providerId}',
  tags: ['Providers'],
  summary: 'プロバイダー詳細取得',
  operationId: 'getProvider',
  request: {
    params: z.object({
      providerId: z.uuid().openapi({
        param: {
          name: 'providerId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'プロバイダー詳細',
      content: { 'application/json': { schema: ProviderConfigSchema } },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const putProvidersProviderIdRoute = createRoute({
  method: 'put',
  path: '/providers/{providerId}',
  tags: ['Providers'],
  summary: 'プロバイダー更新',
  operationId: 'updateProvider',
  request: {
    params: z.object({
      providerId: z.uuid().openapi({
        param: {
          name: 'providerId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: UpdateProviderRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: ProviderConfigSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const deleteProvidersProviderIdRoute = createRoute({
  method: 'delete',
  path: '/providers/{providerId}',
  tags: ['Providers'],
  summary: 'プロバイダー削除',
  operationId: 'deleteProvider',
  request: {
    params: z.object({
      providerId: z.uuid().openapi({
        param: {
          name: 'providerId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

export const postProvidersProviderIdTestRoute = createRoute({
  method: 'post',
  path: '/providers/{providerId}/test',
  tags: ['Providers'],
  summary: 'プロバイダー接続テスト',
  operationId: 'testProvider',
  request: {
    params: z.object({
      providerId: z.uuid().openapi({
        param: {
          name: 'providerId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'テスト結果',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean().exactOptional(),
            message: z.string().exactOptional(),
            details: z.object({}).exactOptional(),
          }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const getAccountLinkedRoute = createRoute({
  method: 'get',
  path: '/account/linked',
  tags: ['Account Linking'],
  summary: '連携アカウント一覧',
  operationId: 'listLinkedAccounts',
  responses: {
    200: {
      description: '連携アカウント一覧',
      content: { 'application/json': { schema: z.array(LinkedAccountSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const postAccountLinkProviderRoute = createRoute({
  method: 'post',
  path: '/account/link/{provider}',
  tags: ['Account Linking'],
  summary: 'アカウント連携',
  description: '既存アカウントにソーシャルアカウントを連携',
  operationId: 'linkAccount',
  request: {
    params: z.object({ provider: ProviderParamParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ code: z.string(), redirectUri: z.url() })
            .openapi({ required: ['code', 'redirectUri'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '連携成功',
      content: { 'application/json': { schema: LinkedAccountSchema } },
    },
    400: { description: '連携失敗', content: { 'application/json': { schema: ErrorSchema } } },
    401: UnauthorizedResponse,
    409: {
      description: '既に他のアカウントに連携済み',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
  security: [{ bearerAuth: [] }],
} as const)

export const deleteAccountLinkProviderRoute = createRoute({
  method: 'delete',
  path: '/account/link/{provider}',
  tags: ['Account Linking'],
  summary: 'アカウント連携解除',
  operationId: 'unlinkAccount',
  request: { params: z.object({ provider: ProviderParamParamsSchema }) },
  responses: {
    204: { description: '解除成功' },
    400: {
      description: '解除できません（最後の認証方法など）',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const getEnterpriseSsoRoute = createRoute({
  method: 'get',
  path: '/enterprise/sso',
  tags: ['Enterprise SSO'],
  summary: 'エンタープライズSSO設定一覧',
  operationId: 'listEnterpriseSSOConfigs',
  responses: {
    200: {
      description: 'SSO設定一覧',
      content: { 'application/json': { schema: z.array(EnterpriseSSOConfigSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const postEnterpriseSsoRoute = createRoute({
  method: 'post',
  path: '/enterprise/sso',
  tags: ['Enterprise SSO'],
  summary: 'エンタープライズSSO設定作成',
  operationId: 'createEnterpriseSSOConfig',
  request: {
    body: {
      content: { 'application/json': { schema: CreateEnterpriseSSORequestSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: '作成成功',
      content: { 'application/json': { schema: EnterpriseSSOConfigSchema } },
    },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const getEnterpriseSsoConfigIdRoute = createRoute({
  method: 'get',
  path: '/enterprise/sso/{configId}',
  tags: ['Enterprise SSO'],
  summary: 'エンタープライズSSO設定詳細',
  operationId: 'getEnterpriseSSOConfig',
  request: {
    params: z.object({
      configId: z.uuid().openapi({
        param: {
          name: 'configId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'SSO設定詳細',
      content: { 'application/json': { schema: EnterpriseSSOConfigSchema } },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const putEnterpriseSsoConfigIdRoute = createRoute({
  method: 'put',
  path: '/enterprise/sso/{configId}',
  tags: ['Enterprise SSO'],
  summary: 'エンタープライズSSO設定更新',
  operationId: 'updateEnterpriseSSOConfig',
  request: {
    params: z.object({
      configId: z.uuid().openapi({
        param: {
          name: 'configId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
    body: {
      content: { 'application/json': { schema: UpdateEnterpriseSSORequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: EnterpriseSSOConfigSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
} as const)

export const deleteEnterpriseSsoConfigIdRoute = createRoute({
  method: 'delete',
  path: '/enterprise/sso/{configId}',
  tags: ['Enterprise SSO'],
  summary: 'エンタープライズSSO設定削除',
  operationId: 'deleteEnterpriseSSOConfig',
  request: {
    params: z.object({
      configId: z.uuid().openapi({
        param: {
          name: 'configId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
} as const)

export const getEnterpriseSsoDomainLookupRoute = createRoute({
  method: 'get',
  path: '/enterprise/sso/domain-lookup',
  tags: ['Enterprise SSO'],
  summary: 'ドメインからSSO設定を検索',
  operationId: 'lookupSSOByDomain',
  request: {
    query: z.object({
      domain: z.string().openapi({
        param: {
          name: 'domain',
          in: 'query',
          required: true,
          schema: { type: 'string' },
          example: 'company.com',
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'SSO設定',
      content: { 'application/json': { schema: EnterpriseSSOConfigSchema } },
    },
    404: { description: 'SSO設定が見つかりません' },
  },
} as const)

export const getEnterpriseSsoConfigIdMetadataRoute = createRoute({
  method: 'get',
  path: '/enterprise/sso/{configId}/metadata',
  tags: ['Enterprise SSO'],
  summary: 'SPメタデータ取得',
  description: 'SAML SP メタデータを XML 形式で取得',
  operationId: 'getSPMetadata',
  request: {
    params: z.object({
      configId: z.uuid().openapi({
        param: {
          name: 'configId',
          in: 'path',
          required: true,
          schema: { type: 'string', format: 'uuid' },
        },
      }),
    }),
  },
  responses: {
    200: { description: 'SPメタデータ', content: { 'application/xml': { schema: z.string() } } },
  },
} as const)
