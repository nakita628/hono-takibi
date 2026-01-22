import { createRoute, z } from '@hono/zod-openapi'

const MfaMethodSchema = z
  .object({
    id: z.uuid(),
    type: z.enum(['totp', 'sms', 'email', 'webauthn']),
    enabled: z.boolean(),
    name: z.string().exactOptional().openapi({ description: 'ユーザーが付けた名前' }),
    maskedValue: z.string().exactOptional().openapi({ description: 'マスクされた電話番号/メール' }),
    lastUsedAt: z.iso.datetime().exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'type', 'enabled', 'createdAt'] })
  .openapi('MfaMethod')

const MfaStatusSchema = z
  .object({
    enabled: z.boolean(),
    enforced: z
      .boolean()
      .exactOptional()
      .openapi({ description: '組織ポリシーでMFAが強制されているか' }),
    preferredMethod: z.enum(['totp', 'sms', 'email', 'webauthn']).exactOptional(),
    methods: z.array(MfaMethodSchema),
    backupCodesRemaining: z.int().exactOptional(),
  })
  .openapi({ required: ['enabled', 'methods'] })
  .openapi('MfaStatus')

const MfaMethodEnabledSchema = z
  .object({
    method: MfaMethodSchema,
    backupCodes: z
      .array(z.string())
      .openapi({ description: '初回設定時のみバックアップコードを返す' }),
  })
  .openapi({ required: ['method', 'backupCodes'] })
  .openapi('MfaMethodEnabled')

const TotpSetupResponseSchema = z
  .object({
    secret: z.string().openapi({ description: 'Base32エンコードされたシークレット' }),
    qrCode: z.string().openapi({ description: 'Base64エンコードされたQRコード画像' }),
    otpauthUri: z.url().openapi({ description: 'otpauth:// URI' }),
  })
  .openapi({ required: ['secret', 'qrCode', 'otpauthUri'] })
  .openapi('TotpSetupResponse')

const WebAuthnRegistrationOptionsSchema = z
  .object({
    challenge: z.string().openapi({ description: 'Base64URLエンコードされたチャレンジ' }),
    rp: z.object({ id: z.string().exactOptional(), name: z.string().exactOptional() }),
    user: z.object({
      id: z.string().exactOptional(),
      name: z.string().exactOptional(),
      displayName: z.string().exactOptional(),
    }),
    pubKeyCredParams: z.array(
      z.object({ type: z.string().exactOptional(), alg: z.int().exactOptional() }),
    ),
    timeout: z.int().exactOptional(),
    excludeCredentials: z
      .array(
        z.object({
          type: z.string().exactOptional(),
          id: z.string().exactOptional(),
          transports: z.array(z.string()).exactOptional(),
        }),
      )
      .exactOptional(),
    authenticatorSelection: z
      .object({
        authenticatorAttachment: z.string().exactOptional(),
        residentKey: z.string().exactOptional(),
        userVerification: z.string().exactOptional(),
      })
      .exactOptional(),
    attestation: z.string().exactOptional(),
  })
  .openapi({ required: ['challenge', 'rp', 'user', 'pubKeyCredParams'] })
  .openapi('WebAuthnRegistrationOptions')

const WebAuthnRegistrationResponseSchema = z
  .object({
    id: z.string(),
    rawId: z.string(),
    response: z.object({
      clientDataJSON: z.string().exactOptional(),
      attestationObject: z.string().exactOptional(),
      transports: z.array(z.string()).exactOptional(),
    }),
    type: z.string(),
    name: z.string().exactOptional().openapi({ description: '認証器の名前' }),
  })
  .openapi({ required: ['id', 'rawId', 'response', 'type'] })
  .openapi('WebAuthnRegistrationResponse')

const WebAuthnCredentialSchema = z
  .object({
    id: z.uuid(),
    credentialId: z.string(),
    name: z.string().exactOptional(),
    aaguid: z.string().exactOptional().openapi({ description: '認証器のAAGUID' }),
    deviceType: z.enum(['platform', 'cross-platform']).exactOptional(),
    transports: z.array(z.string()).exactOptional(),
    signCount: z.int().exactOptional(),
    lastUsedAt: z.iso.datetime().exactOptional(),
    createdAt: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'credentialId', 'createdAt'] })
  .openapi('WebAuthnCredential')

const WebAuthnAuthenticationOptionsSchema = z
  .object({
    challenge: z.string(),
    timeout: z.int().exactOptional(),
    rpId: z.string().exactOptional(),
    allowCredentials: z.array(
      z.object({
        type: z.string().exactOptional(),
        id: z.string().exactOptional(),
        transports: z.array(z.string()).exactOptional(),
      }),
    ),
    userVerification: z.string().exactOptional(),
  })
  .openapi({ required: ['challenge', 'allowCredentials'] })
  .openapi('WebAuthnAuthenticationOptions')

const BackupCodesResponseSchema = z
  .object({
    codes: z.array(z.string()),
    generatedAt: z.iso.datetime(),
    warning: z.string().exactOptional().openapi({ description: '安全に保管するよう警告' }),
  })
  .openapi({ required: ['codes', 'generatedAt'] })
  .openapi('BackupCodesResponse')

const BackupCodesStatusSchema = z
  .object({
    total: z.int(),
    remaining: z.int(),
    usedCodes: z
      .array(
        z.object({
          usedAt: z.iso.datetime().exactOptional(),
          ipAddress: z.string().exactOptional(),
        }),
      )
      .exactOptional(),
    generatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['total', 'remaining'] })
  .openapi('BackupCodesStatus')

const MfaChallengeSchema = z
  .object({
    challengeId: z.uuid(),
    method: z.enum(['totp', 'sms', 'email', 'webauthn', 'backup_code']),
    expiresAt: z.iso.datetime(),
    maskedDestination: z
      .string()
      .exactOptional()
      .openapi({ description: 'SMSまたはメールの場合、マスクされた送信先' }),
    availableMethods: z
      .array(z.string())
      .exactOptional()
      .openapi({ description: '利用可能な他のMFA方式' }),
  })
  .openapi({ required: ['challengeId', 'method', 'expiresAt'] })
  .openapi('MfaChallenge')

const TotpVerificationSchema = z
  .object({ challengeId: z.uuid(), method: z.literal('totp'), code: z.string().regex(/^\d{6}$/) })
  .openapi({ required: ['challengeId', 'method', 'code'] })
  .openapi('TotpVerification')

const SmsEmailVerificationSchema = z
  .object({
    challengeId: z.uuid(),
    method: z.enum(['sms', 'email']),
    code: z.string().regex(/^\d{6}$/),
  })
  .openapi({ required: ['challengeId', 'method', 'code'] })
  .openapi('SmsEmailVerification')

const WebAuthnVerificationSchema = z
  .object({
    challengeId: z.uuid(),
    method: z.literal('webauthn'),
    credential: z
      .object({
        id: z.string(),
        rawId: z.string(),
        response: z.object({
          clientDataJSON: z.string().exactOptional(),
          authenticatorData: z.string().exactOptional(),
          signature: z.string().exactOptional(),
          userHandle: z.string().exactOptional(),
        }),
        type: z.string(),
      })
      .openapi({ required: ['id', 'rawId', 'response', 'type'] }),
  })
  .openapi({ required: ['challengeId', 'method', 'credential'] })
  .openapi('WebAuthnVerification')

const BackupCodeVerificationSchema = z
  .object({
    challengeId: z.uuid(),
    method: z.literal('backup_code'),
    code: z.string().regex(/^[A-Z0-9]{8}$/),
  })
  .openapi({ required: ['challengeId', 'method', 'code'] })
  .openapi('BackupCodeVerification')

const MfaVerificationResultSchema = z
  .object({
    verified: z.boolean(),
    accessToken: z
      .string()
      .exactOptional()
      .openapi({ description: '認証成功時のアクセストークン' }),
    refreshToken: z.string().exactOptional(),
    expiresIn: z.int().exactOptional(),
    backupCodesRemaining: z
      .int()
      .exactOptional()
      .openapi({ description: 'バックアップコード使用時の残数' }),
  })
  .openapi({ required: ['verified'] })
  .openapi('MfaVerificationResult')

const MfaErrorSchema = z
  .object({
    error: z.enum([
      'invalid_code',
      'expired_code',
      'invalid_challenge',
      'too_many_attempts',
      'method_not_available',
      'already_configured',
    ]),
    message: z.string(),
    attemptsRemaining: z.int().exactOptional(),
    retryAfter: z.int().exactOptional().openapi({ description: '秒数' }),
  })
  .openapi({ required: ['error', 'message'] })
  .openapi('MfaError')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
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
      content: { 'application/json': { schema: z.array(MfaMethodSchema) } },
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
              method: z.enum(['totp', 'sms', 'email', 'webauthn']),
              methodId: z
                .uuid()
                .exactOptional()
                .openapi({ description: '特定のデバイス/番号を指定' }),
            })
            .openapi({ required: ['method'] }),
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
          schema: z.object({
            issuer: z
              .string()
              .default('MyApp')
              .exactOptional()
              .openapi({ description: '発行者名（アプリに表示される）' }),
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
                .openapi({ description: '6桁のTOTPコード' }),
              secret: z.string().openapi({ description: '設定時に受け取ったシークレット' }),
            })
            .openapi({ required: ['code', 'secret'] }),
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
              code: z.string().openapi({ description: '現在のTOTPコードまたはバックアップコード' }),
            })
            .openapi({ required: ['code'] }),
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
                .openapi({ description: 'E.164形式の電話番号' }),
            })
            .openapi({ required: ['phoneNumber'] }),
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
          schema: z.object({
            challengeId: z.uuid().exactOptional(),
            expiresIn: z.int().exactOptional().openapi({ description: '有効期限（秒）' }),
            maskedPhone: z
              .string()
              .exactOptional()
              .openapi({ description: 'マスクされた電話番号' }),
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
            .object({ challengeId: z.uuid(), code: z.string().regex(/^\d{6}$/) })
            .openapi({ required: ['challengeId', 'code'] }),
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
        }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              verificationCode: z.string().openapi({ description: '任意のMFA認証コード' }),
            })
            .openapi({ required: ['verificationCode'] }),
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
          schema: z.object({
            email: z
              .email()
              .exactOptional()
              .openapi({ description: '省略時はアカウントのメールアドレスを使用' }),
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
          schema: z.object({
            challengeId: z.uuid().exactOptional(),
            expiresIn: z.int().exactOptional(),
            maskedEmail: z.string().exactOptional(),
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
            .object({ challengeId: z.uuid(), code: z.string().regex(/^\d{6}$/) })
            .openapi({ required: ['challengeId', 'code'] }),
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
          schema: z.object({
            authenticatorType: z
              .enum(['platform', 'cross-platform', 'any'])
              .default('any')
              .exactOptional()
              .openapi({ description: '認証器タイプ' }),
            residentKey: z
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
      content: { 'application/json': { schema: z.array(WebAuthnCredentialSchema) } },
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
        }),
    }),
    body: {
      content: {
        'application/json': { schema: z.object({ name: z.string().max(100).exactOptional() }) },
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
              verificationCode: z.string().openapi({ description: '現在のMFA認証コード' }),
              count: z.int().min(6).max(16).default(10).exactOptional(),
            })
            .openapi({ required: ['verificationCode'] }),
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
              mfaToken: z.string().openapi({ description: 'ログイン時に受け取ったMFAトークン' }),
              method: z
                .enum(['totp', 'sms', 'email', 'webauthn', 'backup_code'])
                .exactOptional()
                .openapi({ description: '使用するMFA方式' }),
            })
            .openapi({ required: ['mfaToken'] }),
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
          schema: z.object({ challengeId: z.uuid() }).openapi({ required: ['challengeId'] }),
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
          schema: z.object({
            sent: z.boolean().exactOptional(),
            maskedDestination: z.string().exactOptional(),
            retryAfter: z.int().exactOptional().openapi({ description: '再送信可能までの秒数' }),
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
          schema: z.xor([
            TotpVerificationSchema,
            SmsEmailVerificationSchema,
            WebAuthnVerificationSchema,
            BackupCodeVerificationSchema,
          ]),
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
          schema: z.object({ challengeId: z.uuid() }).openapi({ required: ['challengeId'] }),
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
          schema: z.object({ email: z.email() }).openapi({ required: ['email'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'リカバリーメール送信',
      content: {
        'application/json': { schema: z.object({ message: z.string().exactOptional() }) },
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
              token: z.string().openapi({ description: 'リカバリーメールのトークン' }),
              identityVerification: z
                .object({
                  dateOfBirth: z.iso.date().exactOptional(),
                  lastFourDigits: z
                    .string()
                    .regex(/^\d{4}$/)
                    .exactOptional()
                    .openapi({ description: '登録済み支払い方法の下4桁' }),
                })
                .openapi({ description: '本人確認情報' }),
            })
            .openapi({ required: ['token', 'identityVerification'] }),
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
          schema: z.object({
            temporaryToken: z
              .string()
              .exactOptional()
              .openapi({ description: 'MFA再設定用の一時トークン' }),
            expiresIn: z.int().exactOptional(),
          }),
        },
      },
    },
    400: { description: '検証失敗' },
  },
})
