import { createRoute, z } from '@hono/zod-openapi'

const PublicKeyCredentialDescriptorSchema = z
  .object({
    type: z.literal('public-key').openapi({ type: 'string', enum: ['public-key'] }),
    id: z.string().openapi({ type: 'string', description: 'Base64URL encoded credential ID' }),
    transports: z
      .array(
        z
          .enum(['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal'])
          .openapi({
            type: 'string',
            enum: ['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal'],
          }),
      )
      .exactOptional()
      .openapi({
        type: 'array',
        items: { type: 'string', enum: ['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal'] },
      }),
  })
  .openapi({
    type: 'object',
    required: ['type', 'id'],
    properties: {
      type: { type: 'string', enum: ['public-key'] },
      id: { type: 'string', description: 'Base64URL encoded credential ID' },
      transports: {
        type: 'array',
        items: { type: 'string', enum: ['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal'] },
      },
    },
  })
  .openapi('PublicKeyCredentialDescriptor')

const RegistrationOptionsSchema = z
  .object({
    challenge: z.string().openapi({ type: 'string', description: 'Base64URL encoded challenge' }),
    rp: z
      .object({
        name: z.string().openapi({ type: 'string', description: 'リライングパーティ名' }),
        id: z.string().openapi({ type: 'string', description: 'リライングパーティID（ドメイン）' }),
      })
      .openapi({
        type: 'object',
        required: ['name', 'id'],
        properties: {
          name: { type: 'string', description: 'リライングパーティ名' },
          id: { type: 'string', description: 'リライングパーティID（ドメイン）' },
        },
      }),
    user: z
      .object({
        id: z.string().openapi({ type: 'string', description: 'Base64URL encoded user handle' }),
        name: z.string().openapi({ type: 'string', description: 'ユーザー名（メールアドレス等）' }),
        displayName: z.string().openapi({ type: 'string', description: '表示名' }),
      })
      .openapi({
        type: 'object',
        required: ['id', 'name', 'displayName'],
        properties: {
          id: { type: 'string', description: 'Base64URL encoded user handle' },
          name: { type: 'string', description: 'ユーザー名（メールアドレス等）' },
          displayName: { type: 'string', description: '表示名' },
        },
      }),
    pubKeyCredParams: z
      .array(
        z
          .object({
            type: z.literal('public-key').openapi({ type: 'string', enum: ['public-key'] }),
            alg: z
              .int()
              .openapi({ type: 'integer', description: 'COSE Algorithm identifier', example: -7 }),
          })
          .openapi({
            type: 'object',
            required: ['type', 'alg'],
            properties: {
              type: { type: 'string', enum: ['public-key'] },
              alg: { type: 'integer', description: 'COSE Algorithm identifier', example: -7 },
            },
          }),
      )
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          required: ['type', 'alg'],
          properties: {
            type: { type: 'string', enum: ['public-key'] },
            alg: { type: 'integer', description: 'COSE Algorithm identifier', example: -7 },
          },
        },
      }),
    timeout: z
      .int()
      .default(60000)
      .exactOptional()
      .openapi({ type: 'integer', description: 'タイムアウト（ミリ秒）', default: 60000 }),
    excludeCredentials: z
      .array(PublicKeyCredentialDescriptorSchema)
      .exactOptional()
      .openapi({
        type: 'array',
        items: { $ref: '#/components/schemas/PublicKeyCredentialDescriptor' },
        description: '除外する既存の認証情報',
      }),
    authenticatorSelection: z
      .object({
        authenticatorAttachment: z
          .enum(['platform', 'cross-platform'])
          .exactOptional()
          .openapi({ type: 'string', enum: ['platform', 'cross-platform'] }),
        residentKey: z
          .enum(['discouraged', 'preferred', 'required'])
          .exactOptional()
          .openapi({ type: 'string', enum: ['discouraged', 'preferred', 'required'] }),
        requireResidentKey: z
          .boolean()
          .exactOptional()
          .openapi({ type: 'boolean', deprecated: true }),
        userVerification: z
          .enum(['discouraged', 'preferred', 'required'])
          .exactOptional()
          .openapi({ type: 'string', enum: ['discouraged', 'preferred', 'required'] }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: {
          authenticatorAttachment: { type: 'string', enum: ['platform', 'cross-platform'] },
          residentKey: { type: 'string', enum: ['discouraged', 'preferred', 'required'] },
          requireResidentKey: { type: 'boolean', deprecated: true },
          userVerification: { type: 'string', enum: ['discouraged', 'preferred', 'required'] },
        },
      }),
    attestation: z
      .enum(['none', 'indirect', 'direct', 'enterprise'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['none', 'indirect', 'direct', 'enterprise'] }),
    extensions: z
      .object({ credProps: z.boolean().exactOptional().openapi({ type: 'boolean' }) })
      .exactOptional()
      .openapi({ type: 'object', properties: { credProps: { type: 'boolean' } } }),
  })
  .openapi({
    type: 'object',
    description: 'PublicKeyCredentialCreationOptions',
    required: ['challenge', 'rp', 'user', 'pubKeyCredParams'],
    properties: {
      challenge: { type: 'string', description: 'Base64URL encoded challenge' },
      rp: {
        type: 'object',
        required: ['name', 'id'],
        properties: {
          name: { type: 'string', description: 'リライングパーティ名' },
          id: { type: 'string', description: 'リライングパーティID（ドメイン）' },
        },
      },
      user: {
        type: 'object',
        required: ['id', 'name', 'displayName'],
        properties: {
          id: { type: 'string', description: 'Base64URL encoded user handle' },
          name: { type: 'string', description: 'ユーザー名（メールアドレス等）' },
          displayName: { type: 'string', description: '表示名' },
        },
      },
      pubKeyCredParams: {
        type: 'array',
        items: {
          type: 'object',
          required: ['type', 'alg'],
          properties: {
            type: { type: 'string', enum: ['public-key'] },
            alg: { type: 'integer', description: 'COSE Algorithm identifier', example: -7 },
          },
        },
      },
      timeout: { type: 'integer', description: 'タイムアウト（ミリ秒）', default: 60000 },
      excludeCredentials: {
        type: 'array',
        items: { $ref: '#/components/schemas/PublicKeyCredentialDescriptor' },
        description: '除外する既存の認証情報',
      },
      authenticatorSelection: {
        type: 'object',
        properties: {
          authenticatorAttachment: { type: 'string', enum: ['platform', 'cross-platform'] },
          residentKey: { type: 'string', enum: ['discouraged', 'preferred', 'required'] },
          requireResidentKey: { type: 'boolean', deprecated: true },
          userVerification: { type: 'string', enum: ['discouraged', 'preferred', 'required'] },
        },
      },
      attestation: { type: 'string', enum: ['none', 'indirect', 'direct', 'enterprise'] },
      extensions: { type: 'object', properties: { credProps: { type: 'boolean' } } },
    },
  })
  .openapi('RegistrationOptions')

const RegistrationResponseSchema = z
  .object({
    id: z.string().openapi({ type: 'string', description: 'Base64URL encoded credential ID' }),
    rawId: z
      .string()
      .openapi({ type: 'string', description: 'Base64URL encoded raw credential ID' }),
    response: z
      .object({
        clientDataJSON: z.string().openapi({ type: 'string', description: 'Base64URL encoded' }),
        attestationObject: z.string().openapi({ type: 'string', description: 'Base64URL encoded' }),
        transports: z
          .array(
            z
              .enum(['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal'])
              .openapi({
                type: 'string',
                enum: ['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal'],
              }),
          )
          .exactOptional()
          .openapi({
            type: 'array',
            items: {
              type: 'string',
              enum: ['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal'],
            },
          }),
        publicKeyAlgorithm: z.int().exactOptional().openapi({ type: 'integer' }),
        publicKey: z.string().exactOptional().openapi({ type: 'string' }),
        authenticatorData: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        required: ['clientDataJSON', 'attestationObject'],
        properties: {
          clientDataJSON: { type: 'string', description: 'Base64URL encoded' },
          attestationObject: { type: 'string', description: 'Base64URL encoded' },
          transports: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal'],
            },
          },
          publicKeyAlgorithm: { type: 'integer' },
          publicKey: { type: 'string' },
          authenticatorData: { type: 'string' },
        },
      }),
    type: z.literal('public-key').openapi({ type: 'string', enum: ['public-key'] }),
    clientExtensionResults: z
      .object({
        credProps: z
          .object({ rk: z.boolean().exactOptional().openapi({ type: 'boolean' }) })
          .exactOptional()
          .openapi({ type: 'object', properties: { rk: { type: 'boolean' } } }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: { credProps: { type: 'object', properties: { rk: { type: 'boolean' } } } },
      }),
    authenticatorAttachment: z
      .enum(['platform', 'cross-platform'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['platform', 'cross-platform'] }),
    name: z
      .string()
      .exactOptional()
      .openapi({ type: 'string', description: 'ユーザーが設定するパスキー名' }),
  })
  .openapi({
    type: 'object',
    description: 'クライアントからの登録レスポンス',
    required: ['id', 'rawId', 'response', 'type'],
    properties: {
      id: { type: 'string', description: 'Base64URL encoded credential ID' },
      rawId: { type: 'string', description: 'Base64URL encoded raw credential ID' },
      response: {
        type: 'object',
        required: ['clientDataJSON', 'attestationObject'],
        properties: {
          clientDataJSON: { type: 'string', description: 'Base64URL encoded' },
          attestationObject: { type: 'string', description: 'Base64URL encoded' },
          transports: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal'],
            },
          },
          publicKeyAlgorithm: { type: 'integer' },
          publicKey: { type: 'string' },
          authenticatorData: { type: 'string' },
        },
      },
      type: { type: 'string', enum: ['public-key'] },
      clientExtensionResults: {
        type: 'object',
        properties: { credProps: { type: 'object', properties: { rk: { type: 'boolean' } } } },
      },
      authenticatorAttachment: { type: 'string', enum: ['platform', 'cross-platform'] },
      name: { type: 'string', description: 'ユーザーが設定するパスキー名' },
    },
  })
  .openapi('RegistrationResponse')

const AuthenticationOptionsSchema = z
  .object({
    challenge: z.string().openapi({ type: 'string', description: 'Base64URL encoded challenge' }),
    timeout: z.int().default(60000).exactOptional().openapi({ type: 'integer', default: 60000 }),
    rpId: z.string().openapi({ type: 'string', description: 'リライングパーティID' }),
    allowCredentials: z
      .array(PublicKeyCredentialDescriptorSchema)
      .exactOptional()
      .openapi({
        type: 'array',
        items: { $ref: '#/components/schemas/PublicKeyCredentialDescriptor' },
      }),
    userVerification: z
      .enum(['discouraged', 'preferred', 'required'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['discouraged', 'preferred', 'required'] }),
    extensions: z.object({}).exactOptional().openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    description: 'PublicKeyCredentialRequestOptions',
    required: ['challenge', 'rpId'],
    properties: {
      challenge: { type: 'string', description: 'Base64URL encoded challenge' },
      timeout: { type: 'integer', default: 60000 },
      rpId: { type: 'string', description: 'リライングパーティID' },
      allowCredentials: {
        type: 'array',
        items: { $ref: '#/components/schemas/PublicKeyCredentialDescriptor' },
      },
      userVerification: { type: 'string', enum: ['discouraged', 'preferred', 'required'] },
      extensions: { type: 'object' },
    },
  })
  .openapi('AuthenticationOptions')

const AuthenticationResponseSchema = z
  .object({
    id: z.string().openapi({ type: 'string', description: 'Base64URL encoded credential ID' }),
    rawId: z
      .string()
      .openapi({ type: 'string', description: 'Base64URL encoded raw credential ID' }),
    response: z
      .object({
        clientDataJSON: z.string().openapi({ type: 'string', description: 'Base64URL encoded' }),
        authenticatorData: z.string().openapi({ type: 'string', description: 'Base64URL encoded' }),
        signature: z.string().openapi({ type: 'string', description: 'Base64URL encoded' }),
        userHandle: z
          .string()
          .exactOptional()
          .openapi({ type: 'string', description: 'Base64URL encoded user handle' }),
      })
      .openapi({
        type: 'object',
        required: ['clientDataJSON', 'authenticatorData', 'signature'],
        properties: {
          clientDataJSON: { type: 'string', description: 'Base64URL encoded' },
          authenticatorData: { type: 'string', description: 'Base64URL encoded' },
          signature: { type: 'string', description: 'Base64URL encoded' },
          userHandle: { type: 'string', description: 'Base64URL encoded user handle' },
        },
      }),
    type: z.literal('public-key').openapi({ type: 'string', enum: ['public-key'] }),
    clientExtensionResults: z.object({}).exactOptional().openapi({ type: 'object' }),
    authenticatorAttachment: z
      .enum(['platform', 'cross-platform'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['platform', 'cross-platform'] }),
  })
  .openapi({
    type: 'object',
    description: 'クライアントからの認証レスポンス',
    required: ['id', 'rawId', 'response', 'type'],
    properties: {
      id: { type: 'string', description: 'Base64URL encoded credential ID' },
      rawId: { type: 'string', description: 'Base64URL encoded raw credential ID' },
      response: {
        type: 'object',
        required: ['clientDataJSON', 'authenticatorData', 'signature'],
        properties: {
          clientDataJSON: { type: 'string', description: 'Base64URL encoded' },
          authenticatorData: { type: 'string', description: 'Base64URL encoded' },
          signature: { type: 'string', description: 'Base64URL encoded' },
          userHandle: { type: 'string', description: 'Base64URL encoded user handle' },
        },
      },
      type: { type: 'string', enum: ['public-key'] },
      clientExtensionResults: { type: 'object' },
      authenticatorAttachment: { type: 'string', enum: ['platform', 'cross-platform'] },
    },
  })
  .openapi('AuthenticationResponse')

const AuthenticationResultSchema = z
  .object({
    verified: z.boolean().openapi({ type: 'boolean' }),
    user: z
      .object({
        id: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
        username: z.string().exactOptional().openapi({ type: 'string' }),
        email: z.email().exactOptional().openapi({ type: 'string', format: 'email' }),
      })
      .openapi({
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          username: { type: 'string' },
          email: { type: 'string', format: 'email' },
        },
      }),
    credential: z
      .object({
        id: z.string().exactOptional().openapi({ type: 'string' }),
        name: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: { id: { type: 'string' }, name: { type: 'string' } },
      }),
    accessToken: z
      .string()
      .exactOptional()
      .openapi({ type: 'string', description: 'JWT access token' }),
    refreshToken: z.string().exactOptional().openapi({ type: 'string' }),
    expiresIn: z.int().exactOptional().openapi({ type: 'integer' }),
    newSignCount: z
      .int()
      .exactOptional()
      .openapi({ type: 'integer', description: '更新された署名カウンター' }),
  })
  .openapi({
    type: 'object',
    required: ['verified', 'user'],
    properties: {
      verified: { type: 'boolean' },
      user: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          username: { type: 'string' },
          email: { type: 'string', format: 'email' },
        },
      },
      credential: {
        type: 'object',
        properties: { id: { type: 'string' }, name: { type: 'string' } },
      },
      accessToken: { type: 'string', description: 'JWT access token' },
      refreshToken: { type: 'string' },
      expiresIn: { type: 'integer' },
      newSignCount: { type: 'integer', description: '更新された署名カウンター' },
    },
  })
  .openapi('AuthenticationResult')

const CredentialSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    credentialId: z
      .string()
      .openapi({ type: 'string', description: 'Base64URL encoded credential ID' }),
    name: z
      .string()
      .exactOptional()
      .openapi({ type: 'string', description: 'ユーザーが設定した名前' }),
    publicKey: z
      .string()
      .openapi({ type: 'string', description: 'Base64URL encoded public key (COSE format)' }),
    publicKeyAlgorithm: z
      .int()
      .exactOptional()
      .openapi({ type: 'integer', description: 'COSE algorithm identifier' }),
    signCount: z.int().openapi({ type: 'integer', description: '署名カウンター' }),
    transports: z
      .array(
        z
          .enum(['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal'])
          .openapi({
            type: 'string',
            enum: ['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal'],
          }),
      )
      .exactOptional()
      .openapi({
        type: 'array',
        items: { type: 'string', enum: ['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal'] },
      }),
    authenticatorAttachment: z
      .enum(['platform', 'cross-platform'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['platform', 'cross-platform'] }),
    aaguid: z.string().exactOptional().openapi({ type: 'string', description: '認証器のAAGUID' }),
    authenticatorName: z
      .string()
      .exactOptional()
      .openapi({ type: 'string', description: '認証器名（AAGUIDから取得）' }),
    isBackupEligible: z
      .boolean()
      .exactOptional()
      .openapi({ type: 'boolean', description: 'バックアップ可能か（マルチデバイス対応）' }),
    isBackedUp: z
      .boolean()
      .exactOptional()
      .openapi({ type: 'boolean', description: 'バックアップされているか' }),
    deviceInfo: z
      .object({
        os: z.string().exactOptional().openapi({ type: 'string' }),
        browser: z.string().exactOptional().openapi({ type: 'string' }),
        deviceType: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: {
          os: { type: 'string' },
          browser: { type: 'string' },
          deviceType: { type: 'string' },
        },
      }),
    lastUsedAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'credentialId', 'publicKey', 'signCount', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      credentialId: { type: 'string', description: 'Base64URL encoded credential ID' },
      name: { type: 'string', description: 'ユーザーが設定した名前' },
      publicKey: { type: 'string', description: 'Base64URL encoded public key (COSE format)' },
      publicKeyAlgorithm: { type: 'integer', description: 'COSE algorithm identifier' },
      signCount: { type: 'integer', description: '署名カウンター' },
      transports: {
        type: 'array',
        items: { type: 'string', enum: ['usb', 'nfc', 'ble', 'smart-card', 'hybrid', 'internal'] },
      },
      authenticatorAttachment: { type: 'string', enum: ['platform', 'cross-platform'] },
      aaguid: { type: 'string', description: '認証器のAAGUID' },
      authenticatorName: { type: 'string', description: '認証器名（AAGUIDから取得）' },
      isBackupEligible: {
        type: 'boolean',
        description: 'バックアップ可能か（マルチデバイス対応）',
      },
      isBackedUp: { type: 'boolean', description: 'バックアップされているか' },
      deviceInfo: {
        type: 'object',
        properties: {
          os: { type: 'string' },
          browser: { type: 'string' },
          deviceType: { type: 'string' },
        },
      },
      lastUsedAt: { type: 'string', format: 'date-time' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Credential')

const WebAuthnSettingsSchema = z
  .object({
    rpId: z
      .string()
      .exactOptional()
      .openapi({ type: 'string', description: 'リライングパーティID' }),
    rpName: z
      .string()
      .exactOptional()
      .openapi({ type: 'string', description: 'リライングパーティ名' }),
    origin: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
    supportedAlgorithms: z
      .array(
        z
          .object({
            alg: z.int().exactOptional().openapi({ type: 'integer' }),
            name: z.string().exactOptional().openapi({ type: 'string' }),
          })
          .openapi({
            type: 'object',
            properties: { alg: { type: 'integer' }, name: { type: 'string' } },
          }),
      )
      .exactOptional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: { alg: { type: 'integer' }, name: { type: 'string' } },
        },
      }),
    timeout: z.int().exactOptional().openapi({ type: 'integer' }),
    userVerification: z
      .enum(['discouraged', 'preferred', 'required'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['discouraged', 'preferred', 'required'] }),
    attestation: z
      .enum(['none', 'indirect', 'direct', 'enterprise'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['none', 'indirect', 'direct', 'enterprise'] }),
    residentKeyRequirement: z
      .enum(['discouraged', 'preferred', 'required'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['discouraged', 'preferred', 'required'] }),
  })
  .openapi({
    type: 'object',
    properties: {
      rpId: { type: 'string', description: 'リライングパーティID' },
      rpName: { type: 'string', description: 'リライングパーティ名' },
      origin: { type: 'string', format: 'uri' },
      supportedAlgorithms: {
        type: 'array',
        items: {
          type: 'object',
          properties: { alg: { type: 'integer' }, name: { type: 'string' } },
        },
      },
      timeout: { type: 'integer' },
      userVerification: { type: 'string', enum: ['discouraged', 'preferred', 'required'] },
      attestation: { type: 'string', enum: ['none', 'indirect', 'direct', 'enterprise'] },
      residentKeyRequirement: { type: 'string', enum: ['discouraged', 'preferred', 'required'] },
    },
  })
  .openapi('WebAuthnSettings')

const RelyingPartySchema = z
  .object({
    id: z.string().openapi({ type: 'string', description: 'RPのID（ドメイン）' }),
    name: z.string().openapi({ type: 'string', description: 'RP名' }),
    origin: z.url().openapi({ type: 'string', format: 'uri' }),
    icon: z.url().exactOptional().openapi({ type: 'string', format: 'uri', deprecated: true }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'name', 'origin'],
    properties: {
      id: { type: 'string', description: 'RPのID（ドメイン）' },
      name: { type: 'string', description: 'RP名' },
      origin: { type: 'string', format: 'uri' },
      icon: { type: 'string', format: 'uri', deprecated: true },
    },
  })
  .openapi('RelyingParty')

const UpdateRelyingPartyRequestSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .max(200)
      .exactOptional()
      .openapi({ type: 'string', minLength: 1, maxLength: 200 }),
  })
  .openapi({
    type: 'object',
    properties: { name: { type: 'string', minLength: 1, maxLength: 200 } },
  })
  .openapi('UpdateRelyingPartyRequest')

const AuthenticatorInfoSchema = z
  .object({
    aaguid: z.string().openapi({ type: 'string', description: 'Authenticator Attestation GUID' }),
    name: z.string().openapi({ type: 'string', description: '認証器名' }),
    icon: z.url().exactOptional().openapi({ type: 'string', format: 'uri' }),
    supportedTransports: z
      .array(z.string().openapi({ type: 'string' }))
      .exactOptional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    isAllowed: z
      .boolean()
      .exactOptional()
      .openapi({ type: 'boolean', description: '使用が許可されているか' }),
  })
  .openapi({
    type: 'object',
    required: ['aaguid', 'name'],
    properties: {
      aaguid: { type: 'string', description: 'Authenticator Attestation GUID' },
      name: { type: 'string', description: '認証器名' },
      icon: { type: 'string', format: 'uri' },
      supportedTransports: { type: 'array', items: { type: 'string' } },
      isAllowed: { type: 'boolean', description: '使用が許可されているか' },
    },
  })
  .openapi('AuthenticatorInfo')

const WebAuthnErrorSchema = z
  .object({
    error: z
      .enum([
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
      ])
      .openapi({
        type: 'string',
        enum: [
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
        ],
      }),
    message: z.string().openapi({ type: 'string' }),
    details: z.object({}).exactOptional().openapi({ type: 'object' }),
  })
  .openapi({
    type: 'object',
    required: ['error', 'message'],
    properties: {
      error: {
        type: 'string',
        enum: [
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
        ],
      },
      message: { type: 'string' },
      details: { type: 'object' },
    },
  })
  .openapi('WebAuthnError')

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
          schema: z
            .object({
              authenticatorAttachment: z
                .enum(['platform', 'cross-platform'])
                .exactOptional()
                .openapi({
                  type: 'string',
                  enum: ['platform', 'cross-platform'],
                  description:
                    'platform: デバイス組み込み認証器（Touch ID、Face ID、Windows Hello等）\ncross-platform: 外部認証器（セキュリティキー等）\n',
                }),
              residentKey: z
                .enum(['discouraged', 'preferred', 'required'])
                .default('preferred')
                .exactOptional()
                .openapi({
                  type: 'string',
                  enum: ['discouraged', 'preferred', 'required'],
                  default: 'preferred',
                  description: 'Discoverable Credential（パスキー）の要件',
                }),
              userVerification: z
                .enum(['discouraged', 'preferred', 'required'])
                .default('preferred')
                .exactOptional()
                .openapi({
                  type: 'string',
                  enum: ['discouraged', 'preferred', 'required'],
                  default: 'preferred',
                }),
              attestation: z
                .enum(['none', 'indirect', 'direct', 'enterprise'])
                .default('none')
                .exactOptional()
                .openapi({
                  type: 'string',
                  enum: ['none', 'indirect', 'direct', 'enterprise'],
                  default: 'none',
                }),
            })
            .openapi({
              type: 'object',
              properties: {
                authenticatorAttachment: {
                  type: 'string',
                  enum: ['platform', 'cross-platform'],
                  description:
                    'platform: デバイス組み込み認証器（Touch ID、Face ID、Windows Hello等）\ncross-platform: 外部認証器（セキュリティキー等）\n',
                },
                residentKey: {
                  type: 'string',
                  enum: ['discouraged', 'preferred', 'required'],
                  default: 'preferred',
                  description: 'Discoverable Credential（パスキー）の要件',
                },
                userVerification: {
                  type: 'string',
                  enum: ['discouraged', 'preferred', 'required'],
                  default: 'preferred',
                },
                attestation: {
                  type: 'string',
                  enum: ['none', 'indirect', 'direct', 'enterprise'],
                  default: 'none',
                },
              },
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
          schema: z
            .object({
              username: z
                .string()
                .exactOptional()
                .openapi({
                  type: 'string',
                  description: 'ユーザー名（Discoverable Credentialの場合は省略可）',
                }),
              userVerification: z
                .enum(['discouraged', 'preferred', 'required'])
                .default('preferred')
                .exactOptional()
                .openapi({
                  type: 'string',
                  enum: ['discouraged', 'preferred', 'required'],
                  default: 'preferred',
                }),
            })
            .openapi({
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                  description: 'ユーザー名（Discoverable Credentialの場合は省略可）',
                },
                userVerification: {
                  type: 'string',
                  enum: ['discouraged', 'preferred', 'required'],
                  default: 'preferred',
                },
              },
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
      content: {
        'application/json': {
          schema: z
            .array(CredentialSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Credential' } }),
        },
      },
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
          type: 'string',
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
          type: 'string',
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
          type: 'string',
        }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
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
            }),
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
      content: {
        'application/json': {
          schema: z
            .array(AuthenticatorInfoSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/AuthenticatorInfo' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})
