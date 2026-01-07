import { createRoute, z } from '@hono/zod-openapi'

const AuthorizationCodeTokenRequestSchema = z
  .object({
    grant_type: z.literal('authorization_code'),
    code: z.string().openapi({ description: '認可コード' }),
    redirect_uri: z.url(),
    client_id: z.string(),
    client_secret: z.string().exactOptional(),
    code_verifier: z.string().exactOptional().openapi({ description: 'PKCE用コードベリファイア' }),
  })
  .openapi({ required: ['grant_type', 'code', 'redirect_uri', 'client_id'] })
  .openapi('AuthorizationCodeTokenRequest')

const ClientCredentialsTokenRequestSchema = z
  .object({
    grant_type: z.literal('client_credentials'),
    client_id: z.string(),
    client_secret: z.string(),
    scope: z.string().exactOptional(),
  })
  .openapi({ required: ['grant_type', 'client_id', 'client_secret'] })
  .openapi('ClientCredentialsTokenRequest')

const RefreshTokenRequestSchema = z
  .object({
    grant_type: z.literal('refresh_token'),
    refresh_token: z.string(),
    client_id: z.string().exactOptional(),
    client_secret: z.string().exactOptional(),
    scope: z.string().exactOptional(),
  })
  .openapi({ required: ['grant_type', 'refresh_token'] })
  .openapi('RefreshTokenRequest')

const DeviceCodeTokenRequestSchema = z
  .object({
    grant_type: z.literal('urn:ietf:params:oauth:grant-type:device_code'),
    device_code: z.string(),
    client_id: z.string(),
  })
  .openapi({ required: ['grant_type', 'device_code', 'client_id'] })
  .openapi('DeviceCodeTokenRequest')

const PasswordTokenRequestSchema = z
  .object({
    grant_type: z.literal('password'),
    username: z.string(),
    password: z.string(),
    client_id: z.string().exactOptional(),
    client_secret: z.string().exactOptional(),
    scope: z.string().exactOptional(),
  })
  .openapi({ required: ['grant_type', 'username', 'password'] })
  .openapi('PasswordTokenRequest')

const TokenResponseSchema = z
  .object({
    access_token: z.string(),
    token_type: z.literal('Bearer'),
    expires_in: z.int().exactOptional().openapi({ description: '有効期限（秒）' }),
    refresh_token: z.string().exactOptional(),
    scope: z.string().exactOptional(),
    id_token: z.string().exactOptional().openapi({ description: 'OpenID Connect ID Token' }),
  })
  .openapi({ required: ['access_token', 'token_type'] })
  .openapi('TokenResponse')

const OAuthErrorSchema = z
  .object({
    error: z.enum([
      'invalid_request',
      'invalid_client',
      'invalid_grant',
      'unauthorized_client',
      'unsupported_grant_type',
      'invalid_scope',
      'access_denied',
      'expired_token',
      'authorization_pending',
      'slow_down',
    ]),
    error_description: z.string().exactOptional(),
    error_uri: z.url().exactOptional(),
  })
  .openapi({ required: ['error'] })
  .openapi('OAuthError')

const IntrospectionResponseSchema = z
  .object({
    active: z.boolean(),
    scope: z.string().exactOptional(),
    client_id: z.string().exactOptional(),
    username: z.string().exactOptional(),
    token_type: z.string().exactOptional(),
    exp: z.int().exactOptional().openapi({ description: '有効期限（Unix timestamp）' }),
    iat: z.int().exactOptional().openapi({ description: '発行日時（Unix timestamp）' }),
    nbf: z.int().exactOptional(),
    sub: z.string().exactOptional().openapi({ description: 'Subject（ユーザーID）' }),
    aud: z.string().exactOptional().openapi({ description: 'Audience' }),
    iss: z.string().exactOptional().openapi({ description: 'Issuer' }),
    jti: z.string().exactOptional().openapi({ description: 'JWT ID' }),
  })
  .openapi({ required: ['active'] })
  .openapi('IntrospectionResponse')

const DeviceAuthorizationResponseSchema = z
  .object({
    device_code: z.string(),
    user_code: z.string().openapi({ description: 'ユーザーが入力するコード' }),
    verification_uri: z.url().openapi({ description: 'ユーザーがアクセスするURL' }),
    verification_uri_complete: z
      .url()
      .exactOptional()
      .openapi({ description: 'user_codeを含む完全なURL' }),
    expires_in: z.int().openapi({ description: '有効期限（秒）' }),
    interval: z.int().default(5).exactOptional().openapi({ description: 'ポーリング間隔（秒）' }),
  })
  .openapi({ required: ['device_code', 'user_code', 'verification_uri', 'expires_in'] })
  .openapi('DeviceAuthorizationResponse')

const UserInfoSchema = z
  .object({
    sub: z.string().openapi({ description: 'Subject（ユーザーID）' }),
    name: z.string().exactOptional(),
    given_name: z.string().exactOptional(),
    family_name: z.string().exactOptional(),
    middle_name: z.string().exactOptional(),
    nickname: z.string().exactOptional(),
    preferred_username: z.string().exactOptional(),
    profile: z.url().exactOptional(),
    picture: z.url().exactOptional(),
    website: z.url().exactOptional(),
    email: z.email().exactOptional(),
    email_verified: z.boolean().exactOptional(),
    gender: z.string().exactOptional(),
    birthdate: z.iso.date().exactOptional(),
    zoneinfo: z.string().exactOptional(),
    locale: z.string().exactOptional(),
    phone_number: z.string().exactOptional(),
    phone_number_verified: z.boolean().exactOptional(),
    address: z
      .object({
        formatted: z.string().exactOptional(),
        street_address: z.string().exactOptional(),
        locality: z.string().exactOptional(),
        region: z.string().exactOptional(),
        postal_code: z.string().exactOptional(),
        country: z.string().exactOptional(),
      })
      .exactOptional(),
    updated_at: z.int().exactOptional(),
  })
  .openapi({ required: ['sub'] })
  .openapi('UserInfo')

const OpenIDConfigurationSchema = z
  .object({
    issuer: z.url(),
    authorization_endpoint: z.url(),
    token_endpoint: z.url(),
    userinfo_endpoint: z.url().exactOptional(),
    jwks_uri: z.url(),
    registration_endpoint: z.url().exactOptional(),
    scopes_supported: z.array(z.string()).exactOptional(),
    response_types_supported: z.array(z.string()),
    response_modes_supported: z.array(z.string()).exactOptional(),
    grant_types_supported: z.array(z.string()).exactOptional(),
    subject_types_supported: z.array(z.string()),
    id_token_signing_alg_values_supported: z.array(z.string()),
    token_endpoint_auth_methods_supported: z.array(z.string()).exactOptional(),
    claims_supported: z.array(z.string()).exactOptional(),
    code_challenge_methods_supported: z.array(z.string()).exactOptional(),
    introspection_endpoint: z.url().exactOptional(),
    revocation_endpoint: z.url().exactOptional(),
    device_authorization_endpoint: z.url().exactOptional(),
  })
  .openapi({
    required: [
      'issuer',
      'authorization_endpoint',
      'token_endpoint',
      'jwks_uri',
      'response_types_supported',
      'subject_types_supported',
      'id_token_signing_alg_values_supported',
    ],
  })
  .openapi('OpenIDConfiguration')

const JWKSchema = z
  .object({
    kty: z.enum(['RSA', 'EC']).openapi({ description: 'Key Type' }),
    kid: z.string().openapi({ description: 'Key ID' }),
    use: z.enum(['sig', 'enc']).openapi({ description: 'Public Key Use' }),
    alg: z.string().exactOptional().openapi({ description: 'Algorithm' }),
    n: z.string().exactOptional().openapi({ description: 'RSA Modulus' }),
    e: z.string().exactOptional().openapi({ description: 'RSA Exponent' }),
    x: z.string().exactOptional().openapi({ description: 'EC X Coordinate' }),
    y: z.string().exactOptional().openapi({ description: 'EC Y Coordinate' }),
    crv: z.string().exactOptional().openapi({ description: 'EC Curve' }),
  })
  .openapi({ required: ['kty', 'kid', 'use'] })
  .openapi('JWK')

const JWKSSchema = z
  .object({ keys: z.array(JWKSchema) })
  .openapi({ required: ['keys'] })
  .openapi('JWKS')

const OAuthClientSchema = z
  .object({
    clientId: z.string(),
    clientName: z.string(),
    clientType: z.enum(['public', 'confidential']),
    redirectUris: z.array(z.url()).exactOptional(),
    grantTypes: z
      .array(
        z.enum([
          'authorization_code',
          'client_credentials',
          'refresh_token',
          'password',
          'urn:ietf:params:oauth:grant-type:device_code',
        ]),
      )
      .exactOptional(),
    responseTypes: z.array(z.enum(['code', 'token'])).exactOptional(),
    scope: z.string().exactOptional(),
    logoUri: z.url().exactOptional(),
    clientUri: z.url().exactOptional(),
    policyUri: z.url().exactOptional(),
    tosUri: z.url().exactOptional(),
    contacts: z.array(z.email()).exactOptional(),
    tokenEndpointAuthMethod: z
      .enum(['client_secret_basic', 'client_secret_post', 'none'])
      .exactOptional(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['clientId', 'clientName', 'clientType', 'createdAt'] })
  .openapi('OAuthClient')

const OAuthClientWithSecretSchema = OAuthClientSchema.and(
  z
    .object({
      clientSecret: z
        .string()
        .openapi({ description: 'クライアントシークレット（作成時のみ返却）' }),
    })
    .openapi({ required: ['clientSecret'] }),
).openapi('OAuthClientWithSecret')

const CreateClientRequestSchema = z
  .object({
    clientName: z.string().min(1).max(200),
    clientType: z.enum(['public', 'confidential']).default('confidential').exactOptional(),
    redirectUris: z.array(z.url()).min(1),
    grantTypes: z
      .array(
        z.enum([
          'authorization_code',
          'client_credentials',
          'refresh_token',
          'password',
          'urn:ietf:params:oauth:grant-type:device_code',
        ]),
      )
      .exactOptional(),
    responseTypes: z.array(z.enum(['code', 'token'])).exactOptional(),
    scope: z.string().exactOptional(),
    logoUri: z.url().exactOptional(),
    clientUri: z.url().exactOptional(),
    policyUri: z.url().exactOptional(),
    tosUri: z.url().exactOptional(),
    contacts: z.array(z.email()).exactOptional(),
    tokenEndpointAuthMethod: z
      .enum(['client_secret_basic', 'client_secret_post', 'none'])
      .exactOptional(),
  })
  .openapi({ required: ['clientName', 'redirectUris'] })
  .openapi('CreateClientRequest')

const UpdateClientRequestSchema = z
  .object({
    clientName: z.string().min(1).max(200).exactOptional(),
    redirectUris: z.array(z.url()).min(1).exactOptional(),
    grantTypes: z.array(z.string()).exactOptional(),
    responseTypes: z.array(z.string()).exactOptional(),
    scope: z.string().exactOptional(),
    logoUri: z.url().exactOptional(),
    clientUri: z.url().exactOptional(),
    policyUri: z.url().exactOptional(),
    tosUri: z.url().exactOptional(),
    contacts: z.array(z.email()).exactOptional(),
  })
  .openapi('UpdateClientRequest')

const ConsentSchema = z
  .object({
    clientId: z.string(),
    clientName: z.string(),
    clientLogoUri: z.url().exactOptional(),
    scope: z.string(),
    grantedAt: z.iso.datetime(),
    lastUsedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['clientId', 'clientName', 'scope', 'grantedAt'] })
  .openapi('Consent')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('Error')

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const BasicAuthSecurityScheme = { type: 'http', scheme: 'basic' }

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

export const getOauthAuthorizeRoute = createRoute({
  method: 'get',
  path: '/oauth/authorize',
  tags: ['OAuth'],
  summary: '認可エンドポイント',
  description:
    'Authorization Code フローの認可リクエスト。\nユーザーをログイン画面にリダイレクトし、認可後にコールバックURLへリダイレクトします。\n',
  operationId: 'authorize',
  request: {
    query: z.object({
      response_type: z
        .enum(['code', 'token'])
        .openapi({
          param: {
            name: 'response_type',
            in: 'query',
            required: true,
            description: 'レスポンスタイプ',
            schema: { type: 'string', enum: ['code', 'token'] },
          },
        }),
      client_id: z
        .string()
        .openapi({
          param: {
            name: 'client_id',
            in: 'query',
            required: true,
            description: 'クライアントID',
            schema: { type: 'string' },
          },
        }),
      redirect_uri: z
        .url()
        .openapi({
          param: {
            name: 'redirect_uri',
            in: 'query',
            required: true,
            description: 'コールバックURL',
            schema: { type: 'string', format: 'uri' },
          },
        }),
      scope: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'scope',
            in: 'query',
            description: '要求するスコープ（スペース区切り）',
            schema: { type: 'string' },
            example: 'openid profile email',
          },
        }),
      state: z
        .string()
        .openapi({
          param: {
            name: 'state',
            in: 'query',
            required: true,
            description: 'CSRF対策用のランダム文字列',
            schema: { type: 'string' },
          },
        }),
      code_challenge: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'code_challenge',
            in: 'query',
            description: 'PKCE用コードチャレンジ',
            schema: { type: 'string' },
          },
        }),
      code_challenge_method: z
        .enum(['plain', 'S256'])
        .default('S256')
        .exactOptional()
        .openapi({
          param: {
            name: 'code_challenge_method',
            in: 'query',
            description: 'コードチャレンジの生成方法',
            schema: { type: 'string', enum: ['plain', 'S256'], default: 'S256' },
          },
        }),
      nonce: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'nonce',
            in: 'query',
            description: 'OpenID Connect用のnonce',
            schema: { type: 'string' },
          },
        }),
      prompt: z
        .enum(['none', 'login', 'consent', 'select_account'])
        .exactOptional()
        .openapi({
          param: {
            name: 'prompt',
            in: 'query',
            description: '認証プロンプトの制御',
            schema: { type: 'string', enum: ['none', 'login', 'consent', 'select_account'] },
          },
        }),
      login_hint: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'login_hint',
            in: 'query',
            description: 'ログインヒント（メールアドレス等）',
            schema: { type: 'string' },
          },
        }),
      ui_locales: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'ui_locales',
            in: 'query',
            description: 'UI言語設定',
            schema: { type: 'string' },
            example: 'ja',
          },
        }),
    }),
  },
  responses: {
    302: {
      description: 'ログイン画面またはコールバックURLへリダイレクト',
      headers: z.object({ Location: { schema: z.url().exactOptional() } }),
    },
    400: {
      description: '不正なリクエスト',
      content: { 'application/json': { schema: OAuthErrorSchema } },
    },
  },
})

export const postOauthTokenRoute = createRoute({
  method: 'post',
  path: '/oauth/token',
  tags: ['OAuth'],
  summary: 'トークンエンドポイント',
  description:
    'アクセストークンを発行します。\nAuthorization Code、Client Credentials、Refresh Token、Device Code の各フローに対応。\n',
  operationId: 'token',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: z.xor([
            AuthorizationCodeTokenRequestSchema,
            ClientCredentialsTokenRequestSchema,
            RefreshTokenRequestSchema,
            DeviceCodeTokenRequestSchema,
            PasswordTokenRequestSchema,
          ]),
          examples: {
            authorization_code: {
              summary: 'Authorization Code フロー',
              value: {
                grant_type: 'authorization_code',
                code: 'SplxlOBeZQQYbYS6WxSbIA',
                redirect_uri: 'https://client.example.com/callback',
                client_id: 's6BhdRkqt3',
                code_verifier: 'dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk',
              },
            },
            client_credentials: {
              summary: 'Client Credentials フロー',
              value: {
                grant_type: 'client_credentials',
                client_id: 's6BhdRkqt3',
                client_secret: '7Fjfp0ZBr1KtDRbnfVdmIw',
                scope: 'read write',
              },
            },
            refresh_token: {
              summary: 'Refresh Token フロー',
              value: {
                grant_type: 'refresh_token',
                refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
                client_id: 's6BhdRkqt3',
              },
            },
          },
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'トークン発行成功',
      content: { 'application/json': { schema: TokenResponseSchema } },
    },
    400: {
      description: '不正なリクエスト',
      content: { 'application/json': { schema: OAuthErrorSchema } },
    },
    401: {
      description: 'クライアント認証失敗',
      content: { 'application/json': { schema: OAuthErrorSchema } },
    },
  },
})

export const postOauthRevokeRoute = createRoute({
  method: 'post',
  path: '/oauth/revoke',
  tags: ['Token Management'],
  summary: 'トークン無効化',
  description: 'アクセストークンまたはリフレッシュトークンを無効化します（RFC 7009）',
  operationId: 'revokeToken',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: z
            .object({
              token: z.string().openapi({ description: '無効化するトークン' }),
              token_type_hint: z
                .enum(['access_token', 'refresh_token'])
                .exactOptional()
                .openapi({ description: 'トークンタイプのヒント' }),
              client_id: z.string().exactOptional(),
              client_secret: z.string().exactOptional(),
            })
            .openapi({ required: ['token'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: '無効化成功（トークンが存在しない場合も成功）' },
    400: {
      description: '不正なリクエスト',
      content: { 'application/json': { schema: OAuthErrorSchema } },
    },
  },
})

export const postOauthIntrospectRoute = createRoute({
  method: 'post',
  path: '/oauth/introspect',
  tags: ['Token Management'],
  summary: 'トークン情報取得',
  description: 'トークンの有効性と情報を取得します（RFC 7662）',
  operationId: 'introspectToken',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: z
            .object({
              token: z.string(),
              token_type_hint: z.enum(['access_token', 'refresh_token']).exactOptional(),
            })
            .openapi({ required: ['token'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'トークン情報',
      content: { 'application/json': { schema: IntrospectionResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ basicAuth: [] }],
})

export const postOauthDeviceCodeRoute = createRoute({
  method: 'post',
  path: '/oauth/device/code',
  tags: ['OAuth'],
  summary: 'デバイス認可リクエスト',
  description: 'デバイスフロー用の認可コードを発行します（RFC 8628）',
  operationId: 'deviceAuthorization',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: z
            .object({ client_id: z.string(), scope: z.string().exactOptional() })
            .openapi({ required: ['client_id'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'デバイス認可レスポンス',
      content: { 'application/json': { schema: DeviceAuthorizationResponseSchema } },
    },
    400: {
      description: '不正なリクエスト',
      content: { 'application/json': { schema: OAuthErrorSchema } },
    },
  },
})

export const getOauthUserinfoRoute = createRoute({
  method: 'get',
  path: '/oauth/userinfo',
  tags: ['OAuth'],
  summary: 'ユーザー情報取得',
  description: 'OpenID Connect UserInfo エンドポイント',
  operationId: 'getUserInfo',
  responses: {
    200: {
      description: 'ユーザー情報',
      content: { 'application/json': { schema: UserInfoSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getWellKnownOpenidConfigurationRoute = createRoute({
  method: 'get',
  path: '/.well-known/openid-configuration',
  tags: ['OAuth'],
  summary: 'OpenID Connect Discovery',
  description: 'OpenID Connect の設定情報を返します',
  operationId: 'getOpenIDConfiguration',
  responses: {
    200: {
      description: 'OpenID Connect 設定',
      content: { 'application/json': { schema: OpenIDConfigurationSchema } },
    },
  },
})

export const getWellKnownJwksJsonRoute = createRoute({
  method: 'get',
  path: '/.well-known/jwks.json',
  tags: ['OAuth'],
  summary: 'JSON Web Key Set',
  description: 'JWTの検証に使用する公開鍵セット',
  operationId: 'getJWKS',
  responses: {
    200: { description: 'JWKS', content: { 'application/json': { schema: JWKSSchema } } },
  },
})

export const getOauthClientsRoute = createRoute({
  method: 'get',
  path: '/oauth/clients',
  tags: ['Client Management'],
  summary: 'クライアント一覧取得',
  operationId: 'listClients',
  responses: {
    200: {
      description: 'クライアント一覧',
      content: { 'application/json': { schema: z.array(OAuthClientSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postOauthClientsRoute = createRoute({
  method: 'post',
  path: '/oauth/clients',
  tags: ['Client Management'],
  summary: 'クライアント作成',
  operationId: 'createClient',
  request: {
    body: {
      content: { 'application/json': { schema: CreateClientRequestSchema } },
      required: true,
    },
  },
  responses: {
    201: {
      description: '作成成功',
      content: { 'application/json': { schema: OAuthClientWithSecretSchema } },
    },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getOauthClientsClientIdRoute = createRoute({
  method: 'get',
  path: '/oauth/clients/{clientId}',
  tags: ['Client Management'],
  summary: 'クライアント詳細取得',
  operationId: 'getClient',
  request: {
    params: z.object({
      clientId: z
        .string()
        .openapi({
          param: { name: 'clientId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'クライアント詳細',
      content: { 'application/json': { schema: OAuthClientSchema } },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putOauthClientsClientIdRoute = createRoute({
  method: 'put',
  path: '/oauth/clients/{clientId}',
  tags: ['Client Management'],
  summary: 'クライアント更新',
  operationId: 'updateClient',
  request: {
    params: z.object({
      clientId: z
        .string()
        .openapi({
          param: { name: 'clientId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
    body: {
      content: { 'application/json': { schema: UpdateClientRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: OAuthClientSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteOauthClientsClientIdRoute = createRoute({
  method: 'delete',
  path: '/oauth/clients/{clientId}',
  tags: ['Client Management'],
  summary: 'クライアント削除',
  operationId: 'deleteClient',
  request: {
    params: z.object({
      clientId: z
        .string()
        .openapi({
          param: { name: 'clientId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postOauthClientsClientIdSecretRoute = createRoute({
  method: 'post',
  path: '/oauth/clients/{clientId}/secret',
  tags: ['Client Management'],
  summary: 'クライアントシークレット再生成',
  operationId: 'rotateClientSecret',
  request: {
    params: z.object({
      clientId: z
        .string()
        .openapi({
          param: { name: 'clientId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
  },
  responses: {
    200: {
      description: '再生成成功',
      content: {
        'application/json': { schema: z.object({ clientSecret: z.string().exactOptional() }) },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getOauthConsentsRoute = createRoute({
  method: 'get',
  path: '/oauth/consents',
  tags: ['Consent'],
  summary: '同意一覧取得',
  description: 'ユーザーが許可したアプリケーション一覧',
  operationId: 'listConsents',
  responses: {
    200: {
      description: '同意一覧',
      content: { 'application/json': { schema: z.array(ConsentSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteOauthConsentsClientIdRoute = createRoute({
  method: 'delete',
  path: '/oauth/consents/{clientId}',
  tags: ['Consent'],
  summary: '同意取り消し',
  description: 'アプリケーションへのアクセス許可を取り消します',
  operationId: 'revokeConsent',
  request: {
    params: z.object({
      clientId: z
        .string()
        .openapi({
          param: { name: 'clientId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
  },
  responses: { 204: { description: '取り消し成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})
