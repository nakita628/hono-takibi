import { createRoute, z } from '@hono/zod-openapi'

const MfaMethodSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    type: z
      .enum(['totp', 'sms', 'email', 'webauthn'])
      .openapi({ type: 'string', enum: ['totp', 'sms', 'email', 'webauthn'] }),
    enabled: z.boolean().openapi({ type: 'boolean' }),
    name: z
      .string()
      .exactOptional()
      .openapi({ type: 'string', description: 'ユーザーが付けた名前' }),
    maskedValue: z
      .string()
      .exactOptional()
      .openapi({ type: 'string', description: 'マスクされた電話番号/メール' }),
    lastUsedAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'type', 'enabled', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      type: { type: 'string', enum: ['totp', 'sms', 'email', 'webauthn'] },
      enabled: { type: 'boolean' },
      name: { type: 'string', description: 'ユーザーが付けた名前' },
      maskedValue: { type: 'string', description: 'マスクされた電話番号/メール' },
      lastUsedAt: { type: 'string', format: 'date-time' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('MfaMethod')

const MfaStatusSchema = z
  .object({
    enabled: z.boolean().openapi({ type: 'boolean' }),
    enforced: z
      .boolean()
      .exactOptional()
      .openapi({ type: 'boolean', description: '組織ポリシーでMFAが強制されているか' }),
    preferredMethod: z
      .enum(['totp', 'sms', 'email', 'webauthn'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['totp', 'sms', 'email', 'webauthn'] }),
    methods: z
      .array(MfaMethodSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/MfaMethod' } }),
    backupCodesRemaining: z.int().exactOptional().openapi({ type: 'integer' }),
  })
  .openapi({
    type: 'object',
    required: ['enabled', 'methods'],
    properties: {
      enabled: { type: 'boolean' },
      enforced: { type: 'boolean', description: '組織ポリシーでMFAが強制されているか' },
      preferredMethod: { type: 'string', enum: ['totp', 'sms', 'email', 'webauthn'] },
      methods: { type: 'array', items: { $ref: '#/components/schemas/MfaMethod' } },
      backupCodesRemaining: { type: 'integer' },
    },
  })
  .openapi('MfaStatus')

const MfaMethodEnabledSchema = z
  .object({
    method: MfaMethodSchema,
    backupCodes: z
      .array(z.string().openapi({ type: 'string' }))
      .openapi({
        type: 'array',
        items: { type: 'string' },
        description: '初回設定時のみバックアップコードを返す',
      }),
  })
  .openapi({
    type: 'object',
    required: ['method', 'backupCodes'],
    properties: {
      method: { $ref: '#/components/schemas/MfaMethod' },
      backupCodes: {
        type: 'array',
        items: { type: 'string' },
        description: '初回設定時のみバックアップコードを返す',
      },
    },
  })
  .openapi('MfaMethodEnabled')

const TotpSetupResponseSchema = z
  .object({
    secret: z
      .string()
      .openapi({ type: 'string', description: 'Base32エンコードされたシークレット' }),
    qrCode: z
      .string()
      .openapi({ type: 'string', description: 'Base64エンコードされたQRコード画像' }),
    otpauthUri: z.url().openapi({ type: 'string', format: 'uri', description: 'otpauth:// URI' }),
  })
  .openapi({
    type: 'object',
    required: ['secret', 'qrCode', 'otpauthUri'],
    properties: {
      secret: { type: 'string', description: 'Base32エンコードされたシークレット' },
      qrCode: { type: 'string', description: 'Base64エンコードされたQRコード画像' },
      otpauthUri: { type: 'string', format: 'uri', description: 'otpauth:// URI' },
    },
  })
  .openapi('TotpSetupResponse')

const WebAuthnRegistrationOptionsSchema = z
  .object({
    challenge: z
      .string()
      .openapi({ type: 'string', description: 'Base64URLエンコードされたチャレンジ' }),
    rp: z
      .object({
        id: z.string().exactOptional().openapi({ type: 'string' }),
        name: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: { id: { type: 'string' }, name: { type: 'string' } },
      }),
    user: z
      .object({
        id: z.string().exactOptional().openapi({ type: 'string' }),
        name: z.string().exactOptional().openapi({ type: 'string' }),
        displayName: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          displayName: { type: 'string' },
        },
      }),
    pubKeyCredParams: z
      .array(
        z
          .object({
            type: z.string().exactOptional().openapi({ type: 'string' }),
            alg: z.int().exactOptional().openapi({ type: 'integer' }),
          })
          .openapi({
            type: 'object',
            properties: { type: { type: 'string' }, alg: { type: 'integer' } },
          }),
      )
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: { type: { type: 'string' }, alg: { type: 'integer' } },
        },
      }),
    timeout: z.int().exactOptional().openapi({ type: 'integer' }),
    excludeCredentials: z
      .array(
        z
          .object({
            type: z.string().exactOptional().openapi({ type: 'string' }),
            id: z.string().exactOptional().openapi({ type: 'string' }),
            transports: z
              .array(z.string().openapi({ type: 'string' }))
              .exactOptional()
              .openapi({ type: 'array', items: { type: 'string' } }),
          })
          .openapi({
            type: 'object',
            properties: {
              type: { type: 'string' },
              id: { type: 'string' },
              transports: { type: 'array', items: { type: 'string' } },
            },
          }),
      )
      .exactOptional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            id: { type: 'string' },
            transports: { type: 'array', items: { type: 'string' } },
          },
        },
      }),
    authenticatorSelection: z
      .object({
        authenticatorAttachment: z.string().exactOptional().openapi({ type: 'string' }),
        residentKey: z.string().exactOptional().openapi({ type: 'string' }),
        userVerification: z.string().exactOptional().openapi({ type: 'string' }),
      })
      .exactOptional()
      .openapi({
        type: 'object',
        properties: {
          authenticatorAttachment: { type: 'string' },
          residentKey: { type: 'string' },
          userVerification: { type: 'string' },
        },
      }),
    attestation: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['challenge', 'rp', 'user', 'pubKeyCredParams'],
    properties: {
      challenge: { type: 'string', description: 'Base64URLエンコードされたチャレンジ' },
      rp: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' } } },
      user: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          displayName: { type: 'string' },
        },
      },
      pubKeyCredParams: {
        type: 'array',
        items: {
          type: 'object',
          properties: { type: { type: 'string' }, alg: { type: 'integer' } },
        },
      },
      timeout: { type: 'integer' },
      excludeCredentials: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            id: { type: 'string' },
            transports: { type: 'array', items: { type: 'string' } },
          },
        },
      },
      authenticatorSelection: {
        type: 'object',
        properties: {
          authenticatorAttachment: { type: 'string' },
          residentKey: { type: 'string' },
          userVerification: { type: 'string' },
        },
      },
      attestation: { type: 'string' },
    },
  })
  .openapi('WebAuthnRegistrationOptions')

const WebAuthnRegistrationResponseSchema = z
  .object({
    id: z.string().openapi({ type: 'string' }),
    rawId: z.string().openapi({ type: 'string' }),
    response: z
      .object({
        clientDataJSON: z.string().exactOptional().openapi({ type: 'string' }),
        attestationObject: z.string().exactOptional().openapi({ type: 'string' }),
        transports: z
          .array(z.string().openapi({ type: 'string' }))
          .exactOptional()
          .openapi({ type: 'array', items: { type: 'string' } }),
      })
      .openapi({
        type: 'object',
        properties: {
          clientDataJSON: { type: 'string' },
          attestationObject: { type: 'string' },
          transports: { type: 'array', items: { type: 'string' } },
        },
      }),
    type: z.string().openapi({ type: 'string' }),
    name: z.string().exactOptional().openapi({ type: 'string', description: '認証器の名前' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'rawId', 'response', 'type'],
    properties: {
      id: { type: 'string' },
      rawId: { type: 'string' },
      response: {
        type: 'object',
        properties: {
          clientDataJSON: { type: 'string' },
          attestationObject: { type: 'string' },
          transports: { type: 'array', items: { type: 'string' } },
        },
      },
      type: { type: 'string' },
      name: { type: 'string', description: '認証器の名前' },
    },
  })
  .openapi('WebAuthnRegistrationResponse')

const WebAuthnCredentialSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    credentialId: z.string().openapi({ type: 'string' }),
    name: z.string().exactOptional().openapi({ type: 'string' }),
    aaguid: z.string().exactOptional().openapi({ type: 'string', description: '認証器のAAGUID' }),
    deviceType: z
      .enum(['platform', 'cross-platform'])
      .exactOptional()
      .openapi({ type: 'string', enum: ['platform', 'cross-platform'] }),
    transports: z
      .array(z.string().openapi({ type: 'string' }))
      .exactOptional()
      .openapi({ type: 'array', items: { type: 'string' } }),
    signCount: z.int().exactOptional().openapi({ type: 'integer' }),
    lastUsedAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'credentialId', 'createdAt'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      credentialId: { type: 'string' },
      name: { type: 'string' },
      aaguid: { type: 'string', description: '認証器のAAGUID' },
      deviceType: { type: 'string', enum: ['platform', 'cross-platform'] },
      transports: { type: 'array', items: { type: 'string' } },
      signCount: { type: 'integer' },
      lastUsedAt: { type: 'string', format: 'date-time' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('WebAuthnCredential')

const WebAuthnAuthenticationOptionsSchema = z
  .object({
    challenge: z.string().openapi({ type: 'string' }),
    timeout: z.int().exactOptional().openapi({ type: 'integer' }),
    rpId: z.string().exactOptional().openapi({ type: 'string' }),
    allowCredentials: z
      .array(
        z
          .object({
            type: z.string().exactOptional().openapi({ type: 'string' }),
            id: z.string().exactOptional().openapi({ type: 'string' }),
            transports: z
              .array(z.string().openapi({ type: 'string' }))
              .exactOptional()
              .openapi({ type: 'array', items: { type: 'string' } }),
          })
          .openapi({
            type: 'object',
            properties: {
              type: { type: 'string' },
              id: { type: 'string' },
              transports: { type: 'array', items: { type: 'string' } },
            },
          }),
      )
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            id: { type: 'string' },
            transports: { type: 'array', items: { type: 'string' } },
          },
        },
      }),
    userVerification: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['challenge', 'allowCredentials'],
    properties: {
      challenge: { type: 'string' },
      timeout: { type: 'integer' },
      rpId: { type: 'string' },
      allowCredentials: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            id: { type: 'string' },
            transports: { type: 'array', items: { type: 'string' } },
          },
        },
      },
      userVerification: { type: 'string' },
    },
  })
  .openapi('WebAuthnAuthenticationOptions')

const BackupCodesResponseSchema = z
  .object({
    codes: z
      .array(z.string().openapi({ type: 'string' }))
      .openapi({ type: 'array', items: { type: 'string' } }),
    generatedAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    warning: z
      .string()
      .exactOptional()
      .openapi({ type: 'string', description: '安全に保管するよう警告' }),
  })
  .openapi({
    type: 'object',
    required: ['codes', 'generatedAt'],
    properties: {
      codes: { type: 'array', items: { type: 'string' } },
      generatedAt: { type: 'string', format: 'date-time' },
      warning: { type: 'string', description: '安全に保管するよう警告' },
    },
  })
  .openapi('BackupCodesResponse')

const BackupCodesStatusSchema = z
  .object({
    total: z.int().openapi({ type: 'integer' }),
    remaining: z.int().openapi({ type: 'integer' }),
    usedCodes: z
      .array(
        z
          .object({
            usedAt: z.iso
              .datetime()
              .exactOptional()
              .openapi({ type: 'string', format: 'date-time' }),
            ipAddress: z.string().exactOptional().openapi({ type: 'string' }),
          })
          .openapi({
            type: 'object',
            properties: {
              usedAt: { type: 'string', format: 'date-time' },
              ipAddress: { type: 'string' },
            },
          }),
      )
      .exactOptional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            usedAt: { type: 'string', format: 'date-time' },
            ipAddress: { type: 'string' },
          },
        },
      }),
    generatedAt: z.iso.datetime().exactOptional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['total', 'remaining'],
    properties: {
      total: { type: 'integer' },
      remaining: { type: 'integer' },
      usedCodes: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            usedAt: { type: 'string', format: 'date-time' },
            ipAddress: { type: 'string' },
          },
        },
      },
      generatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('BackupCodesStatus')

const MfaChallengeSchema = z
  .object({
    challengeId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    method: z
      .enum(['totp', 'sms', 'email', 'webauthn', 'backup_code'])
      .openapi({ type: 'string', enum: ['totp', 'sms', 'email', 'webauthn', 'backup_code'] }),
    expiresAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    maskedDestination: z
      .string()
      .exactOptional()
      .openapi({ type: 'string', description: 'SMSまたはメールの場合、マスクされた送信先' }),
    availableMethods: z
      .array(z.string().openapi({ type: 'string' }))
      .exactOptional()
      .openapi({ type: 'array', items: { type: 'string' }, description: '利用可能な他のMFA方式' }),
  })
  .openapi({
    type: 'object',
    required: ['challengeId', 'method', 'expiresAt'],
    properties: {
      challengeId: { type: 'string', format: 'uuid' },
      method: { type: 'string', enum: ['totp', 'sms', 'email', 'webauthn', 'backup_code'] },
      expiresAt: { type: 'string', format: 'date-time' },
      maskedDestination: {
        type: 'string',
        description: 'SMSまたはメールの場合、マスクされた送信先',
      },
      availableMethods: {
        type: 'array',
        items: { type: 'string' },
        description: '利用可能な他のMFA方式',
      },
    },
  })
  .openapi('MfaChallenge')

const TotpVerificationSchema = z
  .object({
    challengeId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    method: z.literal('totp').openapi({ type: 'string', enum: ['totp'] }),
    code: z
      .string()
      .regex(/^\d{6}$/)
      .openapi({ type: 'string', pattern: '^\\d{6}$' }),
  })
  .openapi({
    type: 'object',
    required: ['challengeId', 'method', 'code'],
    properties: {
      challengeId: { type: 'string', format: 'uuid' },
      method: { type: 'string', enum: ['totp'] },
      code: { type: 'string', pattern: '^\\d{6}$' },
    },
  })
  .openapi('TotpVerification')

const SmsEmailVerificationSchema = z
  .object({
    challengeId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    method: z.enum(['sms', 'email']).openapi({ type: 'string', enum: ['sms', 'email'] }),
    code: z
      .string()
      .regex(/^\d{6}$/)
      .openapi({ type: 'string', pattern: '^\\d{6}$' }),
  })
  .openapi({
    type: 'object',
    required: ['challengeId', 'method', 'code'],
    properties: {
      challengeId: { type: 'string', format: 'uuid' },
      method: { type: 'string', enum: ['sms', 'email'] },
      code: { type: 'string', pattern: '^\\d{6}$' },
    },
  })
  .openapi('SmsEmailVerification')

const WebAuthnVerificationSchema = z
  .object({
    challengeId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    method: z.literal('webauthn').openapi({ type: 'string', enum: ['webauthn'] }),
    credential: z
      .object({
        id: z.string().openapi({ type: 'string' }),
        rawId: z.string().openapi({ type: 'string' }),
        response: z
          .object({
            clientDataJSON: z.string().exactOptional().openapi({ type: 'string' }),
            authenticatorData: z.string().exactOptional().openapi({ type: 'string' }),
            signature: z.string().exactOptional().openapi({ type: 'string' }),
            userHandle: z.string().exactOptional().openapi({ type: 'string' }),
          })
          .openapi({
            type: 'object',
            properties: {
              clientDataJSON: { type: 'string' },
              authenticatorData: { type: 'string' },
              signature: { type: 'string' },
              userHandle: { type: 'string' },
            },
          }),
        type: z.string().openapi({ type: 'string' }),
      })
      .openapi({
        type: 'object',
        required: ['id', 'rawId', 'response', 'type'],
        properties: {
          id: { type: 'string' },
          rawId: { type: 'string' },
          response: {
            type: 'object',
            properties: {
              clientDataJSON: { type: 'string' },
              authenticatorData: { type: 'string' },
              signature: { type: 'string' },
              userHandle: { type: 'string' },
            },
          },
          type: { type: 'string' },
        },
      }),
  })
  .openapi({
    type: 'object',
    required: ['challengeId', 'method', 'credential'],
    properties: {
      challengeId: { type: 'string', format: 'uuid' },
      method: { type: 'string', enum: ['webauthn'] },
      credential: {
        type: 'object',
        required: ['id', 'rawId', 'response', 'type'],
        properties: {
          id: { type: 'string' },
          rawId: { type: 'string' },
          response: {
            type: 'object',
            properties: {
              clientDataJSON: { type: 'string' },
              authenticatorData: { type: 'string' },
              signature: { type: 'string' },
              userHandle: { type: 'string' },
            },
          },
          type: { type: 'string' },
        },
      },
    },
  })
  .openapi('WebAuthnVerification')

const BackupCodeVerificationSchema = z
  .object({
    challengeId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    method: z.literal('backup_code').openapi({ type: 'string', enum: ['backup_code'] }),
    code: z
      .string()
      .regex(/^[A-Z0-9]{8}$/)
      .openapi({ type: 'string', pattern: '^[A-Z0-9]{8}$' }),
  })
  .openapi({
    type: 'object',
    required: ['challengeId', 'method', 'code'],
    properties: {
      challengeId: { type: 'string', format: 'uuid' },
      method: { type: 'string', enum: ['backup_code'] },
      code: { type: 'string', pattern: '^[A-Z0-9]{8}$' },
    },
  })
  .openapi('BackupCodeVerification')

const MfaVerificationResultSchema = z
  .object({
    verified: z.boolean().openapi({ type: 'boolean' }),
    accessToken: z
      .string()
      .exactOptional()
      .openapi({ type: 'string', description: '認証成功時のアクセストークン' }),
    refreshToken: z.string().exactOptional().openapi({ type: 'string' }),
    expiresIn: z.int().exactOptional().openapi({ type: 'integer' }),
    backupCodesRemaining: z
      .int()
      .exactOptional()
      .openapi({ type: 'integer', description: 'バックアップコード使用時の残数' }),
  })
  .openapi({
    type: 'object',
    required: ['verified'],
    properties: {
      verified: { type: 'boolean' },
      accessToken: { type: 'string', description: '認証成功時のアクセストークン' },
      refreshToken: { type: 'string' },
      expiresIn: { type: 'integer' },
      backupCodesRemaining: { type: 'integer', description: 'バックアップコード使用時の残数' },
    },
  })
  .openapi('MfaVerificationResult')

const MfaErrorSchema = z
  .object({
    error: z
      .enum([
        'invalid_code',
        'expired_code',
        'invalid_challenge',
        'too_many_attempts',
        'method_not_available',
        'already_configured',
      ])
      .openapi({
        type: 'string',
        enum: [
          'invalid_code',
          'expired_code',
          'invalid_challenge',
          'too_many_attempts',
          'method_not_available',
          'already_configured',
        ],
      }),
    message: z.string().openapi({ type: 'string' }),
    attemptsRemaining: z.int().exactOptional().openapi({ type: 'integer' }),
    retryAfter: z.int().exactOptional().openapi({ type: 'integer', description: '秒数' }),
  })
  .openapi({
    type: 'object',
    required: ['error', 'message'],
    properties: {
      error: {
        type: 'string',
        enum: [
          'invalid_code',
          'expired_code',
          'invalid_challenge',
          'too_many_attempts',
          'method_not_available',
          'already_configured',
        ],
      },
      message: { type: 'string' },
      attemptsRemaining: { type: 'integer' },
      retryAfter: { type: 'integer', description: '秒数' },
    },
  })
  .openapi('MfaError')

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

export const getMfaStatusRoute = createRoute({
  method: 'get',
  path: '/mfa/status',
  tags: ['MFA Setup'],
  summary: 'MFA設定状況取得',
  operationId: 'getMfaStatus',
  responses: {
    200: {
      description: 'MFA設定状況',
      content: { 'application/json': { schema: MfaStatusSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getMfaMethodsRoute = createRoute({
  method: 'get',
  path: '/mfa/methods',
  tags: ['MFA Setup'],
  summary: '登録済みMFA方式一覧',
  operationId: 'listMfaMethods',
  responses: {
    200: {
      description: 'MFA方式一覧',
      content: {
        'application/json': {
          schema: z
            .array(MfaMethodSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/MfaMethod' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putMfaPreferredRoute = createRoute({
  method: 'put',
  path: '/mfa/preferred',
  tags: ['MFA Setup'],
  summary: '優先MFA方式設定',
  operationId: 'setPreferredMethod',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              method: z
                .enum(['totp', 'sms', 'email', 'webauthn'])
                .openapi({ type: 'string', enum: ['totp', 'sms', 'email', 'webauthn'] }),
              methodId: z
                .uuid()
                .exactOptional()
                .openapi({
                  type: 'string',
                  format: 'uuid',
                  description: '特定のデバイス/番号を指定',
                }),
            })
            .openapi({
              type: 'object',
              required: ['method'],
              properties: {
                method: { type: 'string', enum: ['totp', 'sms', 'email', 'webauthn'] },
                methodId: {
                  type: 'string',
                  format: 'uuid',
                  description: '特定のデバイス/番号を指定',
                },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: '設定成功', content: { 'application/json': { schema: MfaStatusSchema } } },
    401: UnauthorizedResponse,
    404: { description: '指定された方式が登録されていません' },
  },
  security: [{ bearerAuth: [] }],
})

export const postMfaTotpSetupRoute = createRoute({
  method: 'post',
  path: '/mfa/totp/setup',
  tags: ['TOTP'],
  summary: 'TOTP設定開始',
  description: 'TOTP認証の設定を開始し、QRコードとシークレットを取得します',
  operationId: 'initTotpSetup',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              issuer: z
                .string()
                .default('MyApp')
                .exactOptional()
                .openapi({
                  type: 'string',
                  description: '発行者名（アプリに表示される）',
                  default: 'MyApp',
                }),
            })
            .openapi({
              type: 'object',
              properties: {
                issuer: {
                  type: 'string',
                  description: '発行者名（アプリに表示される）',
                  default: 'MyApp',
                },
              },
            }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'TOTP設定情報',
      content: { 'application/json': { schema: TotpSetupResponseSchema } },
    },
    401: UnauthorizedResponse,
    409: { description: 'TOTPは既に設定されています' },
  },
  security: [{ bearerAuth: [] }],
})

export const postMfaTotpVerifyRoute = createRoute({
  method: 'post',
  path: '/mfa/totp/verify',
  tags: ['TOTP'],
  summary: 'TOTP設定確認',
  description: 'TOTPコードを検証して設定を完了します',
  operationId: 'verifyTotpSetup',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              code: z
                .string()
                .regex(/^\d{6}$/)
                .openapi({ type: 'string', pattern: '^\\d{6}$', description: '6桁のTOTPコード' }),
              secret: z
                .string()
                .openapi({ type: 'string', description: '設定時に受け取ったシークレット' }),
            })
            .openapi({
              type: 'object',
              required: ['code', 'secret'],
              properties: {
                code: { type: 'string', pattern: '^\\d{6}$', description: '6桁のTOTPコード' },
                secret: { type: 'string', description: '設定時に受け取ったシークレット' },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '設定完了',
      content: { 'application/json': { schema: MfaMethodEnabledSchema } },
    },
    400: {
      description: 'コードが不正です',
      content: { 'application/json': { schema: MfaErrorSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteMfaTotpRoute = createRoute({
  method: 'delete',
  path: '/mfa/totp',
  tags: ['TOTP'],
  summary: 'TOTP無効化',
  operationId: 'disableTotp',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              code: z
                .string()
                .openapi({
                  type: 'string',
                  description: '現在のTOTPコードまたはバックアップコード',
                }),
            })
            .openapi({
              type: 'object',
              required: ['code'],
              properties: {
                code: { type: 'string', description: '現在のTOTPコードまたはバックアップコード' },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    204: { description: '無効化成功' },
    400: { description: 'コードが不正です' },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postMfaSmsSetupRoute = createRoute({
  method: 'post',
  path: '/mfa/sms/setup',
  tags: ['SMS'],
  summary: 'SMS認証設定開始',
  description: '電話番号を登録し、確認コードを送信します',
  operationId: 'initSmsSetup',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              phoneNumber: z
                .string()
                .regex(/^\+[1-9]\d{1,14}$/)
                .openapi({
                  type: 'string',
                  pattern: '^\\+[1-9]\\d{1,14}$',
                  description: 'E.164形式の電話番号',
                }),
            })
            .openapi({
              type: 'object',
              required: ['phoneNumber'],
              properties: {
                phoneNumber: {
                  type: 'string',
                  pattern: '^\\+[1-9]\\d{1,14}$',
                  description: 'E.164形式の電話番号',
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
      description: '確認コード送信',
      content: {
        'application/json': {
          schema: z
            .object({
              challengeId: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
              expiresIn: z
                .int()
                .exactOptional()
                .openapi({ type: 'integer', description: '有効期限（秒）' }),
              maskedPhone: z
                .string()
                .exactOptional()
                .openapi({ type: 'string', description: 'マスクされた電話番号' }),
            })
            .openapi({
              type: 'object',
              properties: {
                challengeId: { type: 'string', format: 'uuid' },
                expiresIn: { type: 'integer', description: '有効期限（秒）' },
                maskedPhone: { type: 'string', description: 'マスクされた電話番号' },
              },
            }),
        },
      },
    },
    400: { description: '不正な電話番号' },
    401: UnauthorizedResponse,
    429: { description: '送信制限を超えました' },
  },
  security: [{ bearerAuth: [] }],
})

export const postMfaSmsVerifyRoute = createRoute({
  method: 'post',
  path: '/mfa/sms/verify',
  tags: ['SMS'],
  summary: 'SMS認証設定確認',
  operationId: 'verifySmsSetup',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              challengeId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
              code: z
                .string()
                .regex(/^\d{6}$/)
                .openapi({ type: 'string', pattern: '^\\d{6}$' }),
            })
            .openapi({
              type: 'object',
              required: ['challengeId', 'code'],
              properties: {
                challengeId: { type: 'string', format: 'uuid' },
                code: { type: 'string', pattern: '^\\d{6}$' },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '設定完了',
      content: { 'application/json': { schema: MfaMethodEnabledSchema } },
    },
    400: { description: 'コードが不正または期限切れ' },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteMfaSmsMethodIdRoute = createRoute({
  method: 'delete',
  path: '/mfa/sms/{methodId}',
  tags: ['SMS'],
  summary: 'SMS認証削除',
  operationId: 'removeSmsMethod',
  request: {
    params: z.object({
      methodId: z
        .uuid()
        .openapi({
          param: {
            name: 'methodId',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
          type: 'string',
          format: 'uuid',
        }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              verificationCode: z
                .string()
                .openapi({ type: 'string', description: '任意のMFA認証コード' }),
            })
            .openapi({
              type: 'object',
              required: ['verificationCode'],
              properties: {
                verificationCode: { type: 'string', description: '任意のMFA認証コード' },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: { 204: { description: '削除成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const postMfaEmailSetupRoute = createRoute({
  method: 'post',
  path: '/mfa/email/setup',
  tags: ['Email'],
  summary: 'メール認証設定開始',
  operationId: 'initEmailSetup',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              email: z
                .email()
                .exactOptional()
                .openapi({
                  type: 'string',
                  format: 'email',
                  description: '省略時はアカウントのメールアドレスを使用',
                }),
            })
            .openapi({
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  description: '省略時はアカウントのメールアドレスを使用',
                },
              },
            }),
        },
      },
    },
  },
  responses: {
    200: {
      description: '確認コード送信',
      content: {
        'application/json': {
          schema: z
            .object({
              challengeId: z.uuid().exactOptional().openapi({ type: 'string', format: 'uuid' }),
              expiresIn: z.int().exactOptional().openapi({ type: 'integer' }),
              maskedEmail: z.string().exactOptional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              properties: {
                challengeId: { type: 'string', format: 'uuid' },
                expiresIn: { type: 'integer' },
                maskedEmail: { type: 'string' },
              },
            }),
        },
      },
    },
    401: UnauthorizedResponse,
    429: { description: '送信制限を超えました' },
  },
  security: [{ bearerAuth: [] }],
})

export const postMfaEmailVerifyRoute = createRoute({
  method: 'post',
  path: '/mfa/email/verify',
  tags: ['Email'],
  summary: 'メール認証設定確認',
  operationId: 'verifyEmailSetup',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              challengeId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
              code: z
                .string()
                .regex(/^\d{6}$/)
                .openapi({ type: 'string', pattern: '^\\d{6}$' }),
            })
            .openapi({
              type: 'object',
              required: ['challengeId', 'code'],
              properties: {
                challengeId: { type: 'string', format: 'uuid' },
                code: { type: 'string', pattern: '^\\d{6}$' },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '設定完了',
      content: { 'application/json': { schema: MfaMethodEnabledSchema } },
    },
    400: { description: 'コードが不正または期限切れ' },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postMfaWebauthnRegisterOptionsRoute = createRoute({
  method: 'post',
  path: '/mfa/webauthn/register/options',
  tags: ['WebAuthn'],
  summary: 'WebAuthn登録オプション取得',
  description: 'WebAuthn認証器登録のためのオプションを取得します',
  operationId: 'getWebAuthnRegistrationOptions',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              authenticatorType: z
                .enum(['platform', 'cross-platform', 'any'])
                .default('any')
                .exactOptional()
                .openapi({
                  type: 'string',
                  enum: ['platform', 'cross-platform', 'any'],
                  default: 'any',
                  description: '認証器タイプ',
                }),
              residentKey: z
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
                authenticatorType: {
                  type: 'string',
                  enum: ['platform', 'cross-platform', 'any'],
                  default: 'any',
                  description: '認証器タイプ',
                },
                residentKey: {
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
      description: '登録オプション',
      content: { 'application/json': { schema: WebAuthnRegistrationOptionsSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postMfaWebauthnRegisterVerifyRoute = createRoute({
  method: 'post',
  path: '/mfa/webauthn/register/verify',
  tags: ['WebAuthn'],
  summary: 'WebAuthn登録検証',
  operationId: 'verifyWebAuthnRegistration',
  request: {
    body: {
      content: { 'application/json': { schema: WebAuthnRegistrationResponseSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '登録成功',
      content: { 'application/json': { schema: WebAuthnCredentialSchema } },
    },
    400: { description: '登録失敗' },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getMfaWebauthnCredentialsRoute = createRoute({
  method: 'get',
  path: '/mfa/webauthn/credentials',
  tags: ['WebAuthn'],
  summary: 'WebAuthn認証器一覧',
  operationId: 'listWebAuthnCredentials',
  responses: {
    200: {
      description: '認証器一覧',
      content: {
        'application/json': {
          schema: z
            .array(WebAuthnCredentialSchema)
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/WebAuthnCredential' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteMfaWebauthnCredentialsCredentialIdRoute = createRoute({
  method: 'delete',
  path: '/mfa/webauthn/credentials/{credentialId}',
  tags: ['WebAuthn'],
  summary: 'WebAuthn認証器削除',
  operationId: 'deleteWebAuthnCredential',
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
    401: UnauthorizedResponse,
    409: { description: '最後の認証方式は削除できません' },
  },
  security: [{ bearerAuth: [] }],
})

export const patchMfaWebauthnCredentialsCredentialIdRoute = createRoute({
  method: 'patch',
  path: '/mfa/webauthn/credentials/{credentialId}',
  tags: ['WebAuthn'],
  summary: 'WebAuthn認証器更新',
  operationId: 'updateWebAuthnCredential',
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
              name: z.string().max(100).exactOptional().openapi({ type: 'string', maxLength: 100 }),
            })
            .openapi({ type: 'object', properties: { name: { type: 'string', maxLength: 100 } } }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: WebAuthnCredentialSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postMfaBackupCodesGenerateRoute = createRoute({
  method: 'post',
  path: '/mfa/backup-codes/generate',
  tags: ['Backup Codes'],
  summary: 'バックアップコード生成',
  description: '新しいバックアップコードを生成します（既存のコードは無効化されます）',
  operationId: 'generateBackupCodes',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              verificationCode: z
                .string()
                .openapi({ type: 'string', description: '現在のMFA認証コード' }),
              count: z
                .int()
                .min(6)
                .max(16)
                .default(10)
                .exactOptional()
                .openapi({ type: 'integer', minimum: 6, maximum: 16, default: 10 }),
            })
            .openapi({
              type: 'object',
              required: ['verificationCode'],
              properties: {
                verificationCode: { type: 'string', description: '現在のMFA認証コード' },
                count: { type: 'integer', minimum: 6, maximum: 16, default: 10 },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'バックアップコード',
      content: { 'application/json': { schema: BackupCodesResponseSchema } },
    },
    400: { description: '認証コードが不正' },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getMfaBackupCodesStatusRoute = createRoute({
  method: 'get',
  path: '/mfa/backup-codes/status',
  tags: ['Backup Codes'],
  summary: 'バックアップコード状況取得',
  operationId: 'getBackupCodesStatus',
  responses: {
    200: {
      description: 'バックアップコード状況',
      content: { 'application/json': { schema: BackupCodesStatusSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postMfaChallengeRoute = createRoute({
  method: 'post',
  path: '/mfa/challenge',
  tags: ['Verification'],
  summary: 'MFAチャレンジ作成',
  description: 'ログイン時などにMFA認証チャレンジを作成します',
  operationId: 'createMfaChallenge',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              mfaToken: z
                .string()
                .openapi({ type: 'string', description: 'ログイン時に受け取ったMFAトークン' }),
              method: z
                .enum(['totp', 'sms', 'email', 'webauthn', 'backup_code'])
                .exactOptional()
                .openapi({
                  type: 'string',
                  enum: ['totp', 'sms', 'email', 'webauthn', 'backup_code'],
                  description: '使用するMFA方式',
                }),
            })
            .openapi({
              type: 'object',
              required: ['mfaToken'],
              properties: {
                mfaToken: { type: 'string', description: 'ログイン時に受け取ったMFAトークン' },
                method: {
                  type: 'string',
                  enum: ['totp', 'sms', 'email', 'webauthn', 'backup_code'],
                  description: '使用するMFA方式',
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
      description: 'チャレンジ情報',
      content: { 'application/json': { schema: MfaChallengeSchema } },
    },
    400: { description: '不正なMFAトークン' },
  },
})

export const postMfaChallengeSendRoute = createRoute({
  method: 'post',
  path: '/mfa/challenge/send',
  tags: ['Verification'],
  summary: 'MFAコード送信',
  description: 'SMSまたはメールでMFAコードを送信します',
  operationId: 'sendMfaCode',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ challengeId: z.uuid().openapi({ type: 'string', format: 'uuid' }) })
            .openapi({
              type: 'object',
              required: ['challengeId'],
              properties: { challengeId: { type: 'string', format: 'uuid' } },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'コード送信成功',
      content: {
        'application/json': {
          schema: z
            .object({
              sent: z.boolean().exactOptional().openapi({ type: 'boolean' }),
              maskedDestination: z.string().exactOptional().openapi({ type: 'string' }),
              retryAfter: z
                .int()
                .exactOptional()
                .openapi({ type: 'integer', description: '再送信可能までの秒数' }),
            })
            .openapi({
              type: 'object',
              properties: {
                sent: { type: 'boolean' },
                maskedDestination: { type: 'string' },
                retryAfter: { type: 'integer', description: '再送信可能までの秒数' },
              },
            }),
        },
      },
    },
    429: { description: '送信制限を超えました' },
  },
})

export const postMfaVerifyRoute = createRoute({
  method: 'post',
  path: '/mfa/verify',
  tags: ['Verification'],
  summary: 'MFA検証',
  description: 'MFAコードを検証し、認証を完了します',
  operationId: 'verifyMfa',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .xor([
              TotpVerificationSchema,
              SmsEmailVerificationSchema,
              WebAuthnVerificationSchema,
              BackupCodeVerificationSchema,
            ])
            .openapi({
              oneOf: [
                { $ref: '#/components/schemas/TotpVerification' },
                { $ref: '#/components/schemas/SmsEmailVerification' },
                { $ref: '#/components/schemas/WebAuthnVerification' },
                { $ref: '#/components/schemas/BackupCodeVerification' },
              ],
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '認証成功',
      content: { 'application/json': { schema: MfaVerificationResultSchema } },
    },
    400: { description: '認証失敗', content: { 'application/json': { schema: MfaErrorSchema } } },
  },
})

export const postMfaWebauthnAuthenticateOptionsRoute = createRoute({
  method: 'post',
  path: '/mfa/webauthn/authenticate/options',
  tags: ['WebAuthn'],
  summary: 'WebAuthn認証オプション取得',
  operationId: 'getWebAuthnAuthenticationOptions',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({ challengeId: z.uuid().openapi({ type: 'string', format: 'uuid' }) })
            .openapi({
              type: 'object',
              required: ['challengeId'],
              properties: { challengeId: { type: 'string', format: 'uuid' } },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '認証オプション',
      content: { 'application/json': { schema: WebAuthnAuthenticationOptionsSchema } },
    },
    400: { description: '不正なチャレンジ' },
  },
})

export const postMfaRecoveryRoute = createRoute({
  method: 'post',
  path: '/mfa/recovery',
  tags: ['MFA Setup'],
  summary: 'MFAリカバリー開始',
  description: 'MFA認証器にアクセスできない場合のリカバリーを開始します',
  operationId: 'initMfaRecovery',
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
      description: 'リカバリーメール送信',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().exactOptional().openapi({ type: 'string' }) })
            .openapi({ type: 'object', properties: { message: { type: 'string' } } }),
        },
      },
    },
    404: { description: 'アカウントが見つかりません' },
  },
})

export const postMfaRecoveryVerifyRoute = createRoute({
  method: 'post',
  path: '/mfa/recovery/verify',
  tags: ['MFA Setup'],
  summary: 'MFAリカバリー検証',
  operationId: 'verifyMfaRecovery',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              token: z
                .string()
                .openapi({ type: 'string', description: 'リカバリーメールのトークン' }),
              identityVerification: z
                .object({
                  dateOfBirth: z.iso
                    .date()
                    .exactOptional()
                    .openapi({ type: 'string', format: 'date' }),
                  lastFourDigits: z
                    .string()
                    .regex(/^\d{4}$/)
                    .exactOptional()
                    .openapi({
                      type: 'string',
                      pattern: '^\\d{4}$',
                      description: '登録済み支払い方法の下4桁',
                    }),
                })
                .openapi({
                  type: 'object',
                  description: '本人確認情報',
                  properties: {
                    dateOfBirth: { type: 'string', format: 'date' },
                    lastFourDigits: {
                      type: 'string',
                      pattern: '^\\d{4}$',
                      description: '登録済み支払い方法の下4桁',
                    },
                  },
                }),
            })
            .openapi({
              type: 'object',
              required: ['token', 'identityVerification'],
              properties: {
                token: { type: 'string', description: 'リカバリーメールのトークン' },
                identityVerification: {
                  type: 'object',
                  description: '本人確認情報',
                  properties: {
                    dateOfBirth: { type: 'string', format: 'date' },
                    lastFourDigits: {
                      type: 'string',
                      pattern: '^\\d{4}$',
                      description: '登録済み支払い方法の下4桁',
                    },
                  },
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
      description: 'リカバリー成功',
      content: {
        'application/json': {
          schema: z
            .object({
              temporaryToken: z
                .string()
                .exactOptional()
                .openapi({ type: 'string', description: 'MFA再設定用の一時トークン' }),
              expiresIn: z.int().exactOptional().openapi({ type: 'integer' }),
            })
            .openapi({
              type: 'object',
              properties: {
                temporaryToken: { type: 'string', description: 'MFA再設定用の一時トークン' },
                expiresIn: { type: 'integer' },
              },
            }),
        },
      },
    },
    400: { description: '検証失敗' },
  },
})
