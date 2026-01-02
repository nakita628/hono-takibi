import { createRoute, z } from '@hono/zod-openapi'

const ProviderInfoSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    name: z.string().openapi({ type: 'string', description: '表示名' }),
    type: z
      .enum(['oauth2', 'oidc', 'saml'])
      .openapi({ type: 'string', enum: ['oauth2', 'oidc', 'saml'] }),
    enabled: z.boolean().openapi({ type: 'boolean' }),
    icon: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    buttonColor: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .optional()
      .openapi({ type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' }),
    buttonTextColor: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .optional()
      .openapi({ type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'type', 'enabled'],
    properties: {
      id: { type: 'string' },
      name: { type: 'string', description: '表示名' },
      type: { type: 'string', enum: ['oauth2', 'oidc', 'saml'] },
      enabled: { type: 'boolean' },
      icon: { type: 'string', format: 'uri' },
      buttonColor: { type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' },
      buttonTextColor: { type: 'string', pattern: '^#[0-9A-Fa-f]{6}$' },
    },
  })
  .openapi('ProviderInfo')

const ProviderConfigSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string' }),
    type: z
      .enum(['oauth2', 'oidc', 'saml'])
      .openapi({ type: 'string', enum: ['oauth2', 'oidc', 'saml'] }),
    enabled: z.boolean().openapi({ type: 'boolean' }),
    clientId: z.string().optional().openapi({ type: 'string' }),
    authorizationUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    tokenUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    userInfoUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    scopes: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    attributeMapping: z
      .object({
        id: z.string().optional().openapi({ type: 'string' }),
        email: z.string().optional().openapi({ type: 'string' }),
        name: z.string().optional().openapi({ type: 'string' }),
        picture: z.string().optional().openapi({ type: 'string' }),
      })
      .optional()
      .openapi({
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string' },
          name: { type: 'string' },
          picture: { type: 'string' },
        },
      }),
    allowedDomains: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' }, description: '許可するメールドメイン' }),
    autoCreateUser: z
      .boolean()
      .default(true)
      .optional()
      .openapi({ type: 'boolean', default: true }),
    autoLinkUser: z
      .boolean()
      .default(false)
      .optional()
      .openapi({
        type: 'boolean',
        default: false,
        description: 'メールアドレスで既存ユーザーに自動連携',
      }),
    icon: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    buttonColor: z.string().optional().openapi({ type: 'string' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'type', 'enabled', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      type: { type: 'string', enum: ['oauth2', 'oidc', 'saml'] },
      enabled: { type: 'boolean' },
      clientId: { type: 'string' },
      authorizationUrl: { type: 'string', format: 'uri' },
      tokenUrl: { type: 'string', format: 'uri' },
      userInfoUrl: { type: 'string', format: 'uri' },
      scopes: { type: 'array', items: { type: 'string' } },
      attributeMapping: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          email: { type: 'string' },
          name: { type: 'string' },
          picture: { type: 'string' },
        },
      },
      allowedDomains: {
        type: 'array',
        items: { type: 'string' },
        description: '許可するメールドメイン',
      },
      autoCreateUser: { type: 'boolean', default: true },
      autoLinkUser: {
        type: 'boolean',
        default: false,
        description: 'メールアドレスで既存ユーザーに自動連携',
      },
      icon: { type: 'string', format: 'uri' },
      buttonColor: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('ProviderConfig')

const CreateProviderRequestSchema = z
  .object({
    name: z.string().min(1).max(100).openapi({ type: 'string', minLength: 1, maxLength: 100 }),
    type: z.enum(['oauth2', 'oidc']).openapi({ type: 'string', enum: ['oauth2', 'oidc'] }),
    clientId: z.string().openapi({ type: 'string' }),
    clientSecret: z.string().openapi({ type: 'string' }),
    authorizationUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    tokenUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    userInfoUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    scopes: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    attributeMapping: z.object({}).optional().openapi({ type: 'object' }),
    allowedDomains: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    autoCreateUser: z
      .boolean()
      .default(true)
      .optional()
      .openapi({ type: 'boolean', default: true }),
    autoLinkUser: z
      .boolean()
      .default(false)
      .optional()
      .openapi({ type: 'boolean', default: false }),
    icon: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    buttonColor: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'type', 'clientId', 'clientSecret'],
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 100 },
      type: { type: 'string', enum: ['oauth2', 'oidc'] },
      clientId: { type: 'string' },
      clientSecret: { type: 'string' },
      authorizationUrl: { type: 'string', format: 'uri' },
      tokenUrl: { type: 'string', format: 'uri' },
      userInfoUrl: { type: 'string', format: 'uri' },
      scopes: { type: 'array', items: { type: 'string' } },
      attributeMapping: { type: 'object' },
      allowedDomains: { type: 'array', items: { type: 'string' } },
      autoCreateUser: { type: 'boolean', default: true },
      autoLinkUser: { type: 'boolean', default: false },
      icon: { type: 'string', format: 'uri' },
      buttonColor: { type: 'string' },
    },
  })
  .openapi('CreateProviderRequest')

const UpdateProviderRequestSchema = z
  .object({
    name: z.string().optional().openapi({ type: 'string' }),
    enabled: z.boolean().optional().openapi({ type: 'boolean' }),
    clientId: z.string().optional().openapi({ type: 'string' }),
    clientSecret: z.string().optional().openapi({ type: 'string' }),
    authorizationUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    tokenUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    userInfoUrl: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    scopes: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    attributeMapping: z.object({}).optional().openapi({ type: 'object' }),
    allowedDomains: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    autoCreateUser: z.boolean().optional().openapi({ type: 'boolean' }),
    autoLinkUser: z.boolean().optional().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string' },
      enabled: { type: 'boolean' },
      clientId: { type: 'string' },
      clientSecret: { type: 'string' },
      authorizationUrl: { type: 'string', format: 'uri' },
      tokenUrl: { type: 'string', format: 'uri' },
      userInfoUrl: { type: 'string', format: 'uri' },
      scopes: { type: 'array', items: { type: 'string' } },
      attributeMapping: { type: 'object' },
      allowedDomains: { type: 'array', items: { type: 'string' } },
      autoCreateUser: { type: 'boolean' },
      autoLinkUser: { type: 'boolean' },
    },
  })
  .openapi('UpdateProviderRequest')

const SocialAuthResultSchema = z
  .object({
    user: z
      .object({
        id: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
        email: z.email().optional().openapi({ type: 'string', format: 'email' }),
        name: z.string().optional().openapi({ type: 'string' }),
        picture: z.url().optional().openapi({ type: 'string', format: 'uri' }),
      })
      .openapi({
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          email: { type: 'string', format: 'email' },
          name: { type: 'string' },
          picture: { type: 'string', format: 'uri' },
        },
      }),
    isNewUser: z.boolean().openapi({ type: 'boolean' }),
    accessToken: z.string().optional().openapi({ type: 'string' }),
    refreshToken: z.string().optional().openapi({ type: 'string' }),
    expiresIn: z.int().optional().openapi({ type: 'integer' }),
    provider: z.string().optional().openapi({ type: 'string' }),
    providerUserId: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['user', 'isNewUser'],
    properties: {
      user: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          email: { type: 'string', format: 'email' },
          name: { type: 'string' },
          picture: { type: 'string', format: 'uri' },
        },
      },
      isNewUser: { type: 'boolean' },
      accessToken: { type: 'string' },
      refreshToken: { type: 'string' },
      expiresIn: { type: 'integer' },
      provider: { type: 'string' },
      providerUserId: { type: 'string' },
    },
  })
  .openapi('SocialAuthResult')

const SocialAuthErrorSchema = z
  .object({
    error: z
      .enum([
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
      ])
      .openapi({
        type: 'string',
        enum: [
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
        ],
      }),
    message: z.string().openapi({ type: 'string' }),
    provider: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['error', 'message'],
    properties: {
      error: {
        type: 'string',
        enum: [
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
        ],
      },
      message: { type: 'string' },
      provider: { type: 'string' },
    },
  })
  .openapi('SocialAuthError')

const LinkedAccountSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    provider: z.string().openapi({ type: 'string' }),
    providerUserId: z.string().openapi({ type: 'string' }),
    providerEmail: z.email().optional().openapi({ type: 'string', format: 'email' }),
    providerName: z.string().optional().openapi({ type: 'string' }),
    providerPicture: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    lastUsedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'provider', 'providerUserId', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      provider: { type: 'string' },
      providerUserId: { type: 'string' },
      providerEmail: { type: 'string', format: 'email' },
      providerName: { type: 'string' },
      providerPicture: { type: 'string', format: 'uri' },
      lastUsedAt: { type: 'string', format: 'date-time' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('LinkedAccount')

const SAMLConfigSchema = z
  .object({
    entityId: z.string().optional().openapi({ type: 'string', description: 'IdP Entity ID' }),
    ssoUrl: z
      .url()
      .optional()
      .openapi({ type: 'string', format: 'uri', description: 'IdP SSO URL' }),
    sloUrl: z
      .url()
      .optional()
      .openapi({ type: 'string', format: 'uri', description: 'IdP SLO URL' }),
    certificate: z
      .string()
      .optional()
      .openapi({ type: 'string', description: 'IdP 証明書（PEM形式）' }),
    signRequest: z.boolean().optional().openapi({ type: 'boolean' }),
    signatureAlgorithm: z
      .enum(['RSA-SHA256', 'RSA-SHA512'])
      .optional()
      .openapi({ type: 'string', enum: ['RSA-SHA256', 'RSA-SHA512'] }),
    digestAlgorithm: z
      .enum(['SHA256', 'SHA512'])
      .optional()
      .openapi({ type: 'string', enum: ['SHA256', 'SHA512'] }),
    nameIdFormat: z.string().optional().openapi({ type: 'string' }),
    attributeMapping: z
      .object({
        email: z.string().optional().openapi({ type: 'string' }),
        name: z.string().optional().openapi({ type: 'string' }),
        firstName: z.string().optional().openapi({ type: 'string' }),
        lastName: z.string().optional().openapi({ type: 'string' }),
        groups: z.string().optional().openapi({ type: 'string' }),
      })
      .optional()
      .openapi({
        type: 'object',
        properties: {
          email: { type: 'string' },
          name: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          groups: { type: 'string' },
        },
      }),
  })
  .openapi({
    type: 'object',
    properties: {
      entityId: { type: 'string', description: 'IdP Entity ID' },
      ssoUrl: { type: 'string', format: 'uri', description: 'IdP SSO URL' },
      sloUrl: { type: 'string', format: 'uri', description: 'IdP SLO URL' },
      certificate: { type: 'string', description: 'IdP 証明書（PEM形式）' },
      signRequest: { type: 'boolean' },
      signatureAlgorithm: { type: 'string', enum: ['RSA-SHA256', 'RSA-SHA512'] },
      digestAlgorithm: { type: 'string', enum: ['SHA256', 'SHA512'] },
      nameIdFormat: { type: 'string' },
      attributeMapping: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          name: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          groups: { type: 'string' },
        },
      },
    },
  })
  .openapi('SAMLConfig')

const OIDCConfigSchema = z
  .object({
    issuer: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    clientId: z.string().optional().openapi({ type: 'string' }),
    authorizationEndpoint: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    tokenEndpoint: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    userInfoEndpoint: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    jwksUri: z.url().optional().openapi({ type: 'string', format: 'uri' }),
    scopes: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    attributeMapping: z.object({}).optional().openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    properties: {
      issuer: { type: 'string', format: 'uri' },
      clientId: { type: 'string' },
      authorizationEndpoint: { type: 'string', format: 'uri' },
      tokenEndpoint: { type: 'string', format: 'uri' },
      userInfoEndpoint: { type: 'string', format: 'uri' },
      jwksUri: { type: 'string', format: 'uri' },
      scopes: { type: 'array', items: { type: 'string' } },
      attributeMapping: { type: 'object' },
    },
  })
  .openapi('OIDCConfig')

const EnterpriseSSOConfigSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    name: z.string().openapi({ type: 'string', description: '組織名' }),
    type: z.enum(['saml', 'oidc']).openapi({ type: 'string', enum: ['saml', 'oidc'] }),
    domains: z
      .array(z.string().openapi({ type: 'string' }))
      .openapi({
        type: 'array',
        items: { type: 'string' },
        description: '関連付けられたメールドメイン',
      }),
    enabled: z.boolean().openapi({ type: 'boolean' }),
    samlConfig: SAMLConfigSchema.optional(),
    oidcConfig: OIDCConfigSchema.optional(),
    userProvisioning: z
      .object({
        autoCreate: z.boolean().optional().openapi({ type: 'boolean' }),
        autoUpdate: z.boolean().optional().openapi({ type: 'boolean' }),
        defaultRole: z.string().optional().openapi({ type: 'string' }),
      })
      .optional()
      .openapi({
        type: 'object',
        properties: {
          autoCreate: { type: 'boolean' },
          autoUpdate: { type: 'boolean' },
          defaultRole: { type: 'string' },
        },
      }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'type', 'domains', 'enabled', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string', description: '組織名' },
      type: { type: 'string', enum: ['saml', 'oidc'] },
      domains: {
        type: 'array',
        items: { type: 'string' },
        description: '関連付けられたメールドメイン',
      },
      enabled: { type: 'boolean' },
      samlConfig: { $ref: '#/components/schemas/SAMLConfig' },
      oidcConfig: { $ref: '#/components/schemas/OIDCConfig' },
      userProvisioning: {
        type: 'object',
        properties: {
          autoCreate: { type: 'boolean' },
          autoUpdate: { type: 'boolean' },
          defaultRole: { type: 'string' },
        },
      },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('EnterpriseSSOConfig')

const CreateEnterpriseSSORequestSchema = z
  .object({
    name: z.string().min(1).max(200).openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    type: z.enum(['saml', 'oidc']).openapi({ type: 'string', enum: ['saml', 'oidc'] }),
    domains: z
      .array(z.string().openapi({ type: 'string' }))
      .min(1)
      .openapi({ type: 'array', minItems: 1, items: { type: 'string' } }),
    samlConfig: SAMLConfigSchema.optional(),
    oidcConfig: OIDCConfigSchema.optional(),
    userProvisioning: z.object({}).optional().openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'type', 'domains'],
    properties: {
      name: { type: 'string', minLength: 1, maxLength: 200 },
      type: { type: 'string', enum: ['saml', 'oidc'] },
      domains: { type: 'array', minItems: 1, items: { type: 'string' } },
      samlConfig: { $ref: '#/components/schemas/SAMLConfig' },
      oidcConfig: { $ref: '#/components/schemas/OIDCConfig' },
      userProvisioning: { type: 'object' },
    },
  })
  .openapi('CreateEnterpriseSSORequest')

const UpdateEnterpriseSSORequestSchema = z
  .object({
    name: z.string().optional().openapi({ type: 'string' }),
    enabled: z.boolean().optional().openapi({ type: 'boolean' }),
    domains: z
      .array(z.string().openapi({ type: 'string' }))
      .optional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    samlConfig: SAMLConfigSchema.optional(),
    oidcConfig: OIDCConfigSchema.optional(),
    userProvisioning: z.object({}).optional().openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string' },
      enabled: { type: 'boolean' },
      domains: { type: 'array', items: { type: 'string' } },
      samlConfig: { $ref: '#/components/schemas/SAMLConfig' },
      oidcConfig: { $ref: '#/components/schemas/OIDCConfig' },
      userProvisioning: { type: 'object' },
    },
  })
  .openapi('UpdateEnterpriseSSORequest')

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
      redirect_uri: z
        .url()
        .openapi({
          param: {
            name: 'redirect_uri',
            in: 'query',
            required: true,
            schema: { type: 'string', format: 'uri' },
          },
          type: 'string',
          format: 'uri',
        }),
      state: z
        .string()
        .optional()
        .openapi({
          param: { name: 'state', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      scope: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'scope',
            in: 'query',
            description: '追加のスコープ（カンマ区切り）',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      login_hint: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'login_hint',
            in: 'query',
            description: 'ログインヒント',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      prompt: z
        .enum(['none', 'consent', 'select_account'])
        .optional()
        .openapi({
          param: {
            name: 'prompt',
            in: 'query',
            schema: { type: 'string', enum: ['none', 'consent', 'select_account'] },
          },
          type: 'string',
          enum: ['none', 'consent', 'select_account'],
        }),
    }),
  },
  responses: {
    302: { description: 'プロバイダーの認証画面にリダイレクト' },
    400: {
      description: '不正なリクエスト',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

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
        .optional()
        .openapi({
          param: {
            name: 'code',
            in: 'query',
            description: '認可コード',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      state: z
        .string()
        .optional()
        .openapi({
          param: { name: 'state', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      error: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'error',
            in: 'query',
            description: 'エラーコード',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      error_description: z
        .string()
        .optional()
        .openapi({
          param: { name: 'error_description', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: {
    302: { description: 'アプリケーションにリダイレクト' },
    400: {
      description: '認証失敗',
      content: { 'application/json': { schema: SocialAuthErrorSchema } },
    },
  },
})

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
              provider: z.string().openapi({ type: 'string' }),
              code: z.string().openapi({ type: 'string' }),
              redirectUri: z.url().openapi({ type: 'string', format: 'uri' }),
              codeVerifier: z
                .string()
                .optional()
                .openapi({ type: 'string', description: 'PKCE用' }),
            })
            .openapi({
              type: 'object',
              required: ['provider', 'code', 'redirectUri'],
              properties: {
                provider: { type: 'string' },
                code: { type: 'string' },
                redirectUri: { type: 'string', format: 'uri' },
                codeVerifier: { type: 'string', description: 'PKCE用' },
              },
            }),
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
})

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
              provider: z.string().openapi({ type: 'string' }),
              token: z
                .string()
                .openapi({ type: 'string', description: 'ID Token または Access Token' }),
              tokenType: z
                .enum(['id_token', 'access_token'])
                .default('id_token')
                .optional()
                .openapi({
                  type: 'string',
                  enum: ['id_token', 'access_token'],
                  default: 'id_token',
                }),
            })
            .openapi({
              type: 'object',
              required: ['provider', 'token'],
              properties: {
                provider: { type: 'string' },
                token: { type: 'string', description: 'ID Token または Access Token' },
                tokenType: {
                  type: 'string',
                  enum: ['id_token', 'access_token'],
                  default: 'id_token',
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
      description: '検証成功',
      content: { 'application/json': { schema: SocialAuthResultSchema } },
    },
    400: {
      description: '検証失敗',
      content: { 'application/json': { schema: SocialAuthErrorSchema } },
    },
  },
})

export const getProvidersRoute = createRoute({
  method: 'get',
  path: '/providers',
  tags: ['Providers'],
  summary: '有効なプロバイダー一覧',
  operationId: 'listProviders',
  responses: {
    200: {
      description: 'プロバイダー一覧',
      content: {
        'application/json': {
          schema: z
            .array(ProviderInfoSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/ProviderInfo' } }),
        },
      },
    },
  },
})

export const getProvidersAdminRoute = createRoute({
  method: 'get',
  path: '/providers/admin',
  tags: ['Providers'],
  summary: '全プロバイダー一覧（管理用）',
  operationId: 'listAllProviders',
  responses: {
    200: {
      description: 'プロバイダー一覧',
      content: {
        'application/json': {
          schema: z
            .array(ProviderConfigSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/ProviderConfig' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

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
})

export const getProvidersProviderIdRoute = createRoute({
  method: 'get',
  path: '/providers/{providerId}',
  tags: ['Providers'],
  summary: 'プロバイダー詳細取得',
  operationId: 'getProvider',
  request: {
    params: z.object({
      providerId: z
        .uuid()
        .openapi({
          param: {
            name: 'providerId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
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
})

export const putProvidersProviderIdRoute = createRoute({
  method: 'put',
  path: '/providers/{providerId}',
  tags: ['Providers'],
  summary: 'プロバイダー更新',
  operationId: 'updateProvider',
  request: {
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
})

export const deleteProvidersProviderIdRoute = createRoute({
  method: 'delete',
  path: '/providers/{providerId}',
  tags: ['Providers'],
  summary: 'プロバイダー削除',
  operationId: 'deleteProvider',
  request: {
    params: z.object({
      providerId: z
        .uuid()
        .openapi({
          param: {
            name: 'providerId',
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

export const postProvidersProviderIdTestRoute = createRoute({
  method: 'post',
  path: '/providers/{providerId}/test',
  tags: ['Providers'],
  summary: 'プロバイダー接続テスト',
  operationId: 'testProvider',
  request: {
    params: z.object({
      providerId: z
        .uuid()
        .openapi({
          param: {
            name: 'providerId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: {
      description: 'テスト結果',
      content: {
        'application/json': {
          schema: z
            .object({
              success: z.boolean().optional().openapi({ type: 'boolean' }),
              message: z.string().optional().openapi({ type: 'string' }),
              details: z.object({}).optional().openapi({ type: 'object' }),
            })
            .openapi({
              type: 'object',
              properties: {
                success: { type: 'boolean' },
                message: { type: 'string' },
                details: { type: 'object' },
              },
            }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getAccountLinkedRoute = createRoute({
  method: 'get',
  path: '/account/linked',
  tags: ['Account Linking'],
  summary: '連携アカウント一覧',
  operationId: 'listLinkedAccounts',
  responses: {
    200: {
      description: '連携アカウント一覧',
      content: {
        'application/json': {
          schema: z
            .array(LinkedAccountSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/LinkedAccount' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postAccountLinkProviderRoute = createRoute({
  method: 'post',
  path: '/account/link/{provider}',
  tags: ['Account Linking'],
  summary: 'アカウント連携',
  description: '既存アカウントにソーシャルアカウントを連携',
  operationId: 'linkAccount',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              code: z.string().openapi({ type: 'string' }),
              redirectUri: z.url().openapi({ type: 'string', format: 'uri' }),
            })
            .openapi({
              type: 'object',
              required: ['code', 'redirectUri'],
              properties: {
                code: { type: 'string' },
                redirectUri: { type: 'string', format: 'uri' },
              },
            }),
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
})

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
})

export const getEnterpriseSsoRoute = createRoute({
  method: 'get',
  path: '/enterprise/sso',
  tags: ['Enterprise SSO'],
  summary: 'エンタープライズSSO設定一覧',
  operationId: 'listEnterpriseSSOConfigs',
  responses: {
    200: {
      description: 'SSO設定一覧',
      content: {
        'application/json': {
          schema: z
            .array(EnterpriseSSOConfigSchema)
            .openapi({
              type: 'array',
              items: { $ref: '#/components/schemas/EnterpriseSSOConfig' },
            }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

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
})

export const getEnterpriseSsoConfigIdRoute = createRoute({
  method: 'get',
  path: '/enterprise/sso/{configId}',
  tags: ['Enterprise SSO'],
  summary: 'エンタープライズSSO設定詳細',
  operationId: 'getEnterpriseSSOConfig',
  request: {
    params: z.object({
      configId: z
        .uuid()
        .openapi({
          param: {
            name: 'configId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
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
})

export const putEnterpriseSsoConfigIdRoute = createRoute({
  method: 'put',
  path: '/enterprise/sso/{configId}',
  tags: ['Enterprise SSO'],
  summary: 'エンタープライズSSO設定更新',
  operationId: 'updateEnterpriseSSOConfig',
  request: {
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
})

export const deleteEnterpriseSsoConfigIdRoute = createRoute({
  method: 'delete',
  path: '/enterprise/sso/{configId}',
  tags: ['Enterprise SSO'],
  summary: 'エンタープライズSSO設定削除',
  operationId: 'deleteEnterpriseSSOConfig',
  request: {
    params: z.object({
      configId: z
        .uuid()
        .openapi({
          param: {
            name: 'configId',
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

export const getEnterpriseSsoDomainLookupRoute = createRoute({
  method: 'get',
  path: '/enterprise/sso/domain-lookup',
  tags: ['Enterprise SSO'],
  summary: 'ドメインからSSO設定を検索',
  operationId: 'lookupSSOByDomain',
  request: {
    query: z.object({
      domain: z
        .string()
        .openapi({
          param: {
            name: 'domain',
            in: 'query',
            required: true,
            schema: { type: 'string' },
            example: 'company.com',
          },
          type: 'string',
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
})

export const getEnterpriseSsoConfigIdMetadataRoute = createRoute({
  method: 'get',
  path: '/enterprise/sso/{configId}/metadata',
  tags: ['Enterprise SSO'],
  summary: 'SPメタデータ取得',
  description: 'SAML SP メタデータを XML 形式で取得',
  operationId: 'getSPMetadata',
  request: {
    params: z.object({
      configId: z
        .uuid()
        .openapi({
          param: {
            name: 'configId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: {
      description: 'SPメタデータ',
      content: { 'application/xml': { schema: z.string().openapi({ type: 'string' }) } },
    },
  },
})
