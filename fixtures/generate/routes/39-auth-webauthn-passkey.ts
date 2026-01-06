import { createRoute, z } from '@hono/zod-openapi'

const PublicKeyCredentialDescriptorSchema = z
  .object({
    type: z.literal('public-key'),
    id: z.string().openapi({ description: 'Base64URL encoded credential ID' }),
    transports: z
      .array(z.enum(['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal']))
      .exactOptional(),
  })
  .openapi({ required: ['type', 'id'] })
  .openapi('PublicKeyCredentialDescriptor')

const RegistrationOptionsSchema = z
  .object({
    challenge: z.string().openapi({ description: 'Base64URL encoded challenge' }),
    rp: z
      .object({
        name: z.string().openapi({ description: 'リライングパーティ名' }),
        id: z.string().openapi({ description: 'リライングパーティID（ドメイン）' }),
      })
      .openapi({ required: ['name', 'id'] }),
    user: z
      .object({
        id: z.string().openapi({ description: 'Base64URL encoded user handle' }),
        name: z.string().openapi({ description: 'ユーザー名（メールアドレス等）' }),
        displayName: z.string().openapi({ description: '表示名' }),
      })
      .openapi({ required: ['id', 'name', 'displayName'] }),
    pubKeyCredParams: z.array(
      z
        .object({
          type: z.literal('public-key'),
          alg: z.int().openapi({ description: 'COSE Algorithm identifier', example: -7 }),
        })
        .openapi({ required: ['type', 'alg'] }),
    ),
    timeout: z
      .int()
      .default(60000)
      .exactOptional()
      .openapi({ description: 'タイムアウト（ミリ秒）' }),
    excludeCredentials: z
      .array(PublicKeyCredentialDescriptorSchema)
      .exactOptional()
      .openapi({ description: '除外する既存の認証情報' }),
    authenticatorSelection: z.object({
      authenticatorAttachment: z.enum(['platform', 'cross-platform']).exactOptional(),
      residentKey: z.enum(['discouraged', 'preferred', 'required']).exactOptional(),
      requireResidentKey: z.boolean().exactOptional().exactOptional().openapi({ deprecated: true }),
      userVerification: z.enum(['discouraged', 'preferred', 'required']).exactOptional(),
    }),
    attestation: z.enum(['none', 'indirect', 'direct', 'enterprise']).exactOptional(),
    extensions: z.object({ credProps: z.boolean().exactOptional() }).exactOptional(),
  })
  .openapi({
    description: 'PublicKeyCredentialCreationOptions',
    required: ['challenge', 'rp', 'user', 'pubKeyCredParams'],
  })
  .openapi('RegistrationOptions')

const RegistrationResponseSchema = z
  .object({
    id: z.string().openapi({ description: 'Base64URL encoded credential ID' }),
    rawId: z.string().openapi({ description: 'Base64URL encoded raw credential ID' }),
    response: z
      .object({
        clientDataJSON: z.string().openapi({ description: 'Base64URL encoded' }),
        attestationObject: z.string().openapi({ description: 'Base64URL encoded' }),
        transports: z
          .array(z.enum(['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal']))
          .exactOptional(),
        publicKeyAlgorithm: z.int().exactOptional(),
        publicKey: z.string().exactOptional(),
        authenticatorData: z.string().exactOptional(),
      })
      .openapi({ required: ['clientDataJSON', 'attestationObject'] }),
    type: z.literal('public-key'),
    clientExtensionResults: z
      .object({ credProps: z.object({ rk: z.boolean().exactOptional() }).exactOptional() })
      .exactOptional(),
    authenticatorAttachment: z.enum(['platform', 'cross-platform']).exactOptional(),
    name: z.string().exactOptional().openapi({ description: 'ユーザーが設定するパスキー名' }),
  })
  .openapi({
    description: 'クライアントからの登録レスポンス',
    required: ['id', 'rawId', 'response', 'type'],
  })
  .openapi('RegistrationResponse')

const AuthenticationOptionsSchema = z
  .object({
    challenge: z.string().openapi({ description: 'Base64URL encoded challenge' }),
    timeout: z.int().default(60000).exactOptional(),
    rpId: z.string().openapi({ description: 'リライングパーティID' }),
    allowCredentials: z.array(PublicKeyCredentialDescriptorSchema).exactOptional(),
    userVerification: z.enum(['discouraged', 'preferred', 'required']).exactOptional(),
    extensions: z.object({}).exactOptional(),
  })
  .openapi({ description: 'PublicKeyCredentialRequestOptions', required: ['challenge', 'rpId'] })
  .openapi('AuthenticationOptions')

const AuthenticationResponseSchema = z
  .object({
    id: z.string().openapi({ description: 'Base64URL encoded credential ID' }),
    rawId: z.string().openapi({ description: 'Base64URL encoded raw credential ID' }),
    response: z
      .object({
        clientDataJSON: z.string().openapi({ description: 'Base64URL encoded' }),
        authenticatorData: z.string().openapi({ description: 'Base64URL encoded' }),
        signature: z.string().openapi({ description: 'Base64URL encoded' }),
        userHandle: z
          .string()
          .exactOptional()
          .openapi({ description: 'Base64URL encoded user handle' }),
      })
      .openapi({ required: ['clientDataJSON', 'authenticatorData', 'signature'] }),
    type: z.literal('public-key'),
    clientExtensionResults: z.object({}).exactOptional(),
    authenticatorAttachment: z.enum(['platform', 'cross-platform']).exactOptional(),
  })
  .openapi({
    description: 'クライアントからの認証レスポンス',
    required: ['id', 'rawId', 'response', 'type'],
  })
  .openapi('AuthenticationResponse')

const AuthenticationResultSchema = z
  .object({
    verified: z.boolean(),
    user: z.object({
      id: z.uuid().exactOptional(),
      username: z.string().exactOptional(),
      email: z.email().exactOptional(),
    }),
    credential: z
      .object({ id: z.string().exactOptional(), name: z.string().exactOptional() })
      .exactOptional(),
    accessToken: z.string().exactOptional().openapi({ description: 'JWT access token' }),
    refreshToken: z.string().exactOptional(),
    expiresIn: z.int().exactOptional(),
    newSignCount: z.int().exactOptional().openapi({ description: '更新された署名カウンター' }),
  })
  .openapi({ required: ['verified', 'user'] })
  .openapi('AuthenticationResult')

const CredentialSchema = z
  .object({
    id: z.uuid(),
    credentialId: z.string().openapi({ description: 'Base64URL encoded credential ID' }),
    name: z.string().exactOptional().openapi({ description: 'ユーザーが設定した名前' }),
    publicKey: z.string().openapi({ description: 'Base64URL encoded public key (COSE format)' }),
    publicKeyAlgorithm: z
      .int()
      .exactOptional()
      .openapi({ description: 'COSE algorithm identifier' }),
    signCount: z.int().openapi({ description: '署名カウンター' }),
    transports: z
      .array(z.enum(['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal']))
      .exactOptional(),
    authenticatorAttachment: z.enum(['platform', 'cross-platform']).exactOptional(),
    aaguid: z.string().exactOptional().openapi({ description: '認証器のAAGUID' }),
    authenticatorName: z
      .string()
      .exactOptional()
      .openapi({ description: '認証器名（AAGUIDから取得）' }),
    isBackupEligible: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'バックアップ可能か（マルチデバイス対応）' }),
    isBackedUp: z.boolean().exactOptional().openapi({ description: 'バックアップされているか' }),
    deviceInfo: z
      .object({
        os: z.string().exactOptional(),
        browser: z.string().exactOptional(),
        deviceType: z.string().exactOptional(),
      })
      .exactOptional(),
    lastUsedAt: z.iso.datetime().exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'credentialId', 'publicKey', 'signCount', 'createdAt'] })
  .openapi('Credential')

const WebAuthnSettingsSchema = z
  .object({
    rpId: z.string().exactOptional().openapi({ description: 'リライングパーティID' }),
    rpName: z.string().exactOptional().openapi({ description: 'リライングパーティ名' }),
    origin: z.url().exactOptional(),
    supportedAlgorithms: z
      .array(z.object({ alg: z.int().exactOptional(), name: z.string().exactOptional() }))
      .exactOptional(),
    timeout: z.int().exactOptional(),
    userVerification: z.enum(['discouraged', 'preferred', 'required']).exactOptional(),
    attestation: z.enum(['none', 'indirect', 'direct', 'enterprise']).exactOptional(),
    residentKeyRequirement: z.enum(['discouraged', 'preferred', 'required']).exactOptional(),
  })
  .openapi('WebAuthnSettings')

const RelyingPartySchema = z
  .object({
    id: z.string().openapi({ description: 'RPのID（ドメイン）' }),
    name: z.string().openapi({ description: 'RP名' }),
    origin: z.url(),
    icon: z.url().exactOptional().openapi({ deprecated: true }),
  })
  .openapi({ required: ['id', 'name', 'origin'] })
  .openapi('RelyingParty')

const UpdateRelyingPartyRequestSchema = z
  .object({ name: z.string().min(1).max(200).exactOptional() })
  .openapi('UpdateRelyingPartyRequest')

const AuthenticatorInfoSchema = z
  .object({
    aaguid: z.string().openapi({ description: 'Authenticator Attestation GUID' }),
    name: z.string().openapi({ description: '認証器名' }),
    icon: z.url().exactOptional(),
    supportedTransports: z.array(z.string()).exactOptional(),
    isAllowed: z.boolean().exactOptional().openapi({ description: '使用が許可されているか' }),
  })
  .openapi({ required: ['aaguid', 'name'] })
  .openapi('AuthenticatorInfo')

const WebAuthnErrorSchema = z
  .object({
    error: z.enum([
      'invalid_request',
      'invalid_origin',
      'invalid_rp_id',
      'challenge_mismatch',
      'invalid_signature',
      'invalid_attestation',
      'credential_not_found',
      'user_not_found',
      'sign_count_invalid',
      'user_verification_failed',
      'timeout',
      'not_allowed',
      'unknown_error',
    ]),
    message: z.string(),
    details: z.object({}).exactOptional(),
  })
  .openapi({ required: ['error', 'message'] })
  .openapi('WebAuthnError')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('Error')

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const UnauthorizedResponse = {
  description: '認証が必要です',
  content: { 'application/json': { schema: ErrorSchema } },
}

const NotFoundResponse = {
  description: 'リソースが見つかりません',
  content: { 'application/json': { schema: ErrorSchema } },
}

export const postWebauthnRegisterOptionsRoute = createRoute({
  method: 'post',
  path: '/webauthn/register/options',
  tags: ['Registration'],
  summary: '登録オプション取得',
  description: 'パスキー登録のためのPublicKeyCredentialCreationOptionsを生成',
  operationId: 'getRegistrationOptions',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            authenticatorAttachment: z
              .enum(['platform', 'cross-platform'])
              .exactOptional()
              .openapi({
                description:
                  'platform: デバイス組み込み認証器（Touch ID、Face ID、Windows Hello等）\ncross-platform: 外部認証器（セキュリティキー等）\n',
              }),
            residentKey: z
              .enum(['discouraged', 'preferred', 'required'])
              .default('preferred')
              .exactOptional()
              .openapi({ description: 'Discoverable Credential（パスキー）の要件' }),
            userVerification: z
              .enum(['discouraged', 'preferred', 'required'])
              .default('preferred')
              .exactOptional(),
            attestation: z
              .enum(['none', 'indirect', 'direct', 'enterprise'])
              .default('none')
              .exactOptional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: '登録オプション',
      content: { 'application/json': { schema: RegistrationOptionsSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postWebauthnRegisterVerifyRoute = createRoute({
  method: 'post',
  path: '/webauthn/register/verify',
  tags: ['Registration'],
  summary: '登録検証',
  description: 'クライアントから送信された認証情報を検証し、パスキーを登録',
  operationId: 'verifyRegistration',
  request: {
    body: {
      content: { 'application/json': { schema: RegistrationResponseSchema } },
      required: true,
    },
  },
  responses: {
    201: { description: '登録成功', content: { 'application/json': { schema: CredentialSchema } } },
    400: {
      description: '検証失敗',
      content: { 'application/json': { schema: WebAuthnErrorSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postWebauthnAuthenticateOptionsRoute = createRoute({
  method: 'post',
  path: '/webauthn/authenticate/options',
  tags: ['Authentication'],
  summary: '認証オプション取得',
  description: 'パスキー認証のためのPublicKeyCredentialRequestOptionsを生成',
  operationId: 'getAuthenticationOptions',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            username: z
              .string()
              .exactOptional()
              .openapi({ description: 'ユーザー名（Discoverable Credentialの場合は省略可）' }),
            userVerification: z
              .enum(['discouraged', 'preferred', 'required'])
              .default('preferred')
              .exactOptional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: '認証オプション',
      content: { 'application/json': { schema: AuthenticationOptionsSchema } },
    },
  },
})

export const postWebauthnAuthenticateVerifyRoute = createRoute({
  method: 'post',
  path: '/webauthn/authenticate/verify',
  tags: ['Authentication'],
  summary: '認証検証',
  description: 'クライアントから送信された認証レスポンスを検証',
  operationId: 'verifyAuthentication',
  request: {
    body: {
      content: { 'application/json': { schema: AuthenticationResponseSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '認証成功',
      content: { 'application/json': { schema: AuthenticationResultSchema } },
    },
    400: {
      description: '認証失敗',
      content: { 'application/json': { schema: WebAuthnErrorSchema } },
    },
    401: {
      description: '認証情報が無効',
      content: { 'application/json': { schema: WebAuthnErrorSchema } },
    },
  },
})

export const getWebauthnCredentialsRoute = createRoute({
  method: 'get',
  path: '/webauthn/credentials',
  tags: ['Credentials'],
  summary: '認証情報一覧取得',
  description: 'ユーザーに登録されているパスキー一覧を取得',
  operationId: 'listCredentials',
  responses: {
    200: {
      description: '認証情報一覧',
      content: { 'application/json': { schema: z.array(CredentialSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getWebauthnCredentialsCredentialIdRoute = createRoute({
  method: 'get',
  path: '/webauthn/credentials/{credentialId}',
  tags: ['Credentials'],
  summary: '認証情報詳細取得',
  operationId: 'getCredential',
  request: {
    params: z.object({
      credentialId: z
        .string()
        .openapi({
          param: { name: 'credentialId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
  },
  responses: {
    200: {
      description: '認証情報詳細',
      content: { 'application/json': { schema: CredentialSchema } },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteWebauthnCredentialsCredentialIdRoute = createRoute({
  method: 'delete',
  path: '/webauthn/credentials/{credentialId}',
  tags: ['Credentials'],
  summary: '認証情報削除',
  description: 'パスキーを削除（少なくとも1つは残す必要がある場合あり）',
  operationId: 'deleteCredential',
  request: {
    params: z.object({
      credentialId: z
        .string()
        .openapi({
          param: { name: 'credentialId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
  },
  responses: {
    204: { description: '削除成功' },
    400: {
      description: '削除できません（最後の認証情報など）',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const patchWebauthnCredentialsCredentialIdRoute = createRoute({
  method: 'patch',
  path: '/webauthn/credentials/{credentialId}',
  tags: ['Credentials'],
  summary: '認証情報更新',
  description: 'パスキーの名前などを更新',
  operationId: 'updateCredential',
  request: {
    params: z.object({
      credentialId: z
        .string()
        .openapi({
          param: { name: 'credentialId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.object({ name: z.string().min(1).max(100).exactOptional() }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: '更新成功', content: { 'application/json': { schema: CredentialSchema } } },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getWebauthnSettingsRoute = createRoute({
  method: 'get',
  path: '/webauthn/settings',
  tags: ['Settings'],
  summary: 'WebAuthn設定取得',
  description: 'リライングパーティの設定情報を取得',
  operationId: 'getWebAuthnSettings',
  responses: {
    200: {
      description: 'WebAuthn設定',
      content: { 'application/json': { schema: WebAuthnSettingsSchema } },
    },
  },
})

export const getWebauthnSettingsRpRoute = createRoute({
  method: 'get',
  path: '/webauthn/settings/rp',
  tags: ['Settings'],
  summary: 'リライングパーティ情報取得',
  operationId: 'getRelyingPartyInfo',
  responses: {
    200: {
      description: 'リライングパーティ情報',
      content: { 'application/json': { schema: RelyingPartySchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putWebauthnSettingsRpRoute = createRoute({
  method: 'put',
  path: '/webauthn/settings/rp',
  tags: ['Settings'],
  summary: 'リライングパーティ情報更新',
  operationId: 'updateRelyingPartyInfo',
  request: {
    body: {
      content: { 'application/json': { schema: UpdateRelyingPartyRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: RelyingPartySchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getWebauthnAuthenticatorsRoute = createRoute({
  method: 'get',
  path: '/webauthn/authenticators',
  tags: ['Settings'],
  summary: 'サポートされる認証器一覧',
  description: '許可されている認証器のAAGUID一覧',
  operationId: 'listSupportedAuthenticators',
  responses: {
    200: {
      description: '認証器一覧',
      content: { 'application/json': { schema: z.array(AuthenticatorInfoSchema) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})
