import { createRoute, z } from '@hono/zod-openapi'

const AssertionConsumerServiceSchema = z
  .object({
    binding: z
      .enum([
        'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact',
      ])
      .openapi({
        type: 'string',
        enum: [
          'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
          'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact',
        ],
      }),
    location: z.url().openapi({ type: 'string', format: 'uri' }),
    index: z.int().optional().openapi({ type: 'integer' }),
    isDefault: z.boolean().optional().openapi({ type: 'boolean' }),
  })
  .openapi({
    type: 'object',
    required: ['binding', 'location'],
    properties: {
      binding: {
        type: 'string',
        enum: [
          'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
          'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact',
        ],
      },
      location: { type: 'string', format: 'uri' },
      index: { type: 'integer' },
      isDefault: { type: 'boolean' },
    },
  })
  .openapi('AssertionConsumerService')

const SingleLogoutServiceSchema = z
  .object({
    binding: z
      .enum([
        'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
        'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
      ])
      .openapi({
        type: 'string',
        enum: [
          'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
          'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        ],
      }),
    location: z.url().openapi({ type: 'string', format: 'uri' }),
    responseLocation: z.url().optional().openapi({ type: 'string', format: 'uri' }),
  })
  .openapi({
    type: 'object',
    required: ['binding', 'location'],
    properties: {
      binding: {
        type: 'string',
        enum: [
          'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
          'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        ],
      },
      location: { type: 'string', format: 'uri' },
      responseLocation: { type: 'string', format: 'uri' },
    },
  })
  .openapi('SingleLogoutService')

const ServiceProviderSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    entityId: z.url().openapi({ type: 'string', format: 'uri', description: 'SP Entity ID' }),
    name: z.string().openapi({ type: 'string' }),
    description: z.string().optional().openapi({ type: 'string' }),
    enabled: z.boolean().openapi({ type: 'boolean' }),
    assertionConsumerServices: z
      .array(AssertionConsumerServiceSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/AssertionConsumerService' } }),
    singleLogoutServices: z
      .array(SingleLogoutServiceSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/SingleLogoutService' } }),
    nameIdFormat: z
      .enum([
        'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
        'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified',
        'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
        'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
      ])
      .optional()
      .openapi({
        type: 'string',
        enum: [
          'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
          'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified',
          'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
          'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
        ],
      }),
    signAssertions: z
      .boolean()
      .default(true)
      .optional()
      .openapi({ type: 'boolean', default: true }),
    signResponses: z.boolean().default(true).optional().openapi({ type: 'boolean', default: true }),
    encryptAssertions: z
      .boolean()
      .default(false)
      .optional()
      .openapi({ type: 'boolean', default: false }),
    signingCertificate: z
      .string()
      .optional()
      .openapi({ type: 'string', description: 'SP署名検証用証明書（PEM）' }),
    encryptionCertificate: z
      .string()
      .optional()
      .openapi({ type: 'string', description: 'SP暗号化用証明書（PEM）' }),
    wantAuthnRequestsSigned: z
      .boolean()
      .default(false)
      .optional()
      .openapi({ type: 'boolean', default: false }),
    defaultRelayState: z.string().optional().openapi({ type: 'string' }),
    sessionDuration: z
      .int()
      .optional()
      .openapi({ type: 'integer', description: 'セッション有効期間（秒）' }),
    createdAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    updatedAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'entityId', 'name', 'enabled'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      entityId: { type: 'string', format: 'uri', description: 'SP Entity ID' },
      name: { type: 'string' },
      description: { type: 'string' },
      enabled: { type: 'boolean' },
      assertionConsumerServices: {
        type: 'array',
        items: { $ref: '#/components/schemas/AssertionConsumerService' },
      },
      singleLogoutServices: {
        type: 'array',
        items: { $ref: '#/components/schemas/SingleLogoutService' },
      },
      nameIdFormat: {
        type: 'string',
        enum: [
          'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
          'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified',
          'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
          'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
        ],
      },
      signAssertions: { type: 'boolean', default: true },
      signResponses: { type: 'boolean', default: true },
      encryptAssertions: { type: 'boolean', default: false },
      signingCertificate: { type: 'string', description: 'SP署名検証用証明書（PEM）' },
      encryptionCertificate: { type: 'string', description: 'SP暗号化用証明書（PEM）' },
      wantAuthnRequestsSigned: { type: 'boolean', default: false },
      defaultRelayState: { type: 'string' },
      sessionDuration: { type: 'integer', description: 'セッション有効期間（秒）' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('ServiceProvider')

const CreateServiceProviderRequestSchema = z
  .object({
    entityId: z.url().openapi({ type: 'string', format: 'uri' }),
    name: z.string().min(1).max(200).openapi({ type: 'string', minLength: 1, maxLength: 200 }),
    description: z.string().optional().openapi({ type: 'string' }),
    metadataUrl: z
      .url()
      .optional()
      .openapi({ type: 'string', format: 'uri', description: 'メタデータURL（自動取得）' }),
    assertionConsumerServices: z
      .array(AssertionConsumerServiceSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/AssertionConsumerService' } }),
    singleLogoutServices: z
      .array(SingleLogoutServiceSchema)
      .optional()
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/SingleLogoutService' } }),
    nameIdFormat: z.string().optional().openapi({ type: 'string' }),
    signAssertions: z
      .boolean()
      .default(true)
      .optional()
      .openapi({ type: 'boolean', default: true }),
    encryptAssertions: z
      .boolean()
      .default(false)
      .optional()
      .openapi({ type: 'boolean', default: false }),
    signingCertificate: z.string().optional().openapi({ type: 'string' }),
    encryptionCertificate: z.string().optional().openapi({ type: 'string' }),
  })
  .openapi({
    type: 'object',
    required: ['entityId', 'name'],
    properties: {
      entityId: { type: 'string', format: 'uri' },
      name: { type: 'string', minLength: 1, maxLength: 200 },
      description: { type: 'string' },
      metadataUrl: { type: 'string', format: 'uri', description: 'メタデータURL（自動取得）' },
      assertionConsumerServices: {
        type: 'array',
        items: { $ref: '#/components/schemas/AssertionConsumerService' },
      },
      singleLogoutServices: {
        type: 'array',
        items: { $ref: '#/components/schemas/SingleLogoutService' },
      },
      nameIdFormat: { type: 'string' },
      signAssertions: { type: 'boolean', default: true },
      encryptAssertions: { type: 'boolean', default: false },
      signingCertificate: { type: 'string' },
      encryptionCertificate: { type: 'string' },
    },
  })
  .openapi('CreateServiceProviderRequest')

const UpdateServiceProviderRequestSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    description: z.string().openapi({ type: 'string' }),
    enabled: z.boolean().openapi({ type: 'boolean' }),
    assertionConsumerServices: z
      .array(AssertionConsumerServiceSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/AssertionConsumerService' } }),
    singleLogoutServices: z
      .array(SingleLogoutServiceSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/SingleLogoutService' } }),
    nameIdFormat: z.string().openapi({ type: 'string' }),
    signAssertions: z.boolean().openapi({ type: 'boolean' }),
    signResponses: z.boolean().openapi({ type: 'boolean' }),
    encryptAssertions: z.boolean().openapi({ type: 'boolean' }),
    wantAuthnRequestsSigned: z.boolean().openapi({ type: 'boolean' }),
    defaultRelayState: z.string().openapi({ type: 'string' }),
    sessionDuration: z.int().openapi({ type: 'integer' }),
  })
  .partial()
  .openapi({
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      enabled: { type: 'boolean' },
      assertionConsumerServices: {
        type: 'array',
        items: { $ref: '#/components/schemas/AssertionConsumerService' },
      },
      singleLogoutServices: {
        type: 'array',
        items: { $ref: '#/components/schemas/SingleLogoutService' },
      },
      nameIdFormat: { type: 'string' },
      signAssertions: { type: 'boolean' },
      signResponses: { type: 'boolean' },
      encryptAssertions: { type: 'boolean' },
      wantAuthnRequestsSigned: { type: 'boolean' },
      defaultRelayState: { type: 'string' },
      sessionDuration: { type: 'integer' },
    },
  })
  .openapi('UpdateServiceProviderRequest')

const AttributeMappingSchema = z
  .object({
    id: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    sourceAttribute: z.string().openapi({ type: 'string', description: 'IdP側の属性名' }),
    samlAttribute: z
      .string()
      .openapi({ type: 'string', description: 'SAMLアサーションで送信する属性名' }),
    samlAttributeNameFormat: z
      .enum([
        'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
        'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
        'urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified',
      ])
      .default('urn:oasis:names:tc:SAML:2.0:attrname-format:basic')
      .optional()
      .openapi({
        type: 'string',
        enum: [
          'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
          'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          'urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified',
        ],
        default: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
      }),
    friendlyName: z.string().optional().openapi({ type: 'string' }),
    required: z.boolean().default(false).optional().openapi({ type: 'boolean', default: false }),
    transform: z.string().optional().openapi({ type: 'string', description: '値変換スクリプト' }),
  })
  .openapi({
    type: 'object',
    required: ['sourceAttribute', 'samlAttribute'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      sourceAttribute: { type: 'string', description: 'IdP側の属性名' },
      samlAttribute: { type: 'string', description: 'SAMLアサーションで送信する属性名' },
      samlAttributeNameFormat: {
        type: 'string',
        enum: [
          'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
          'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
          'urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified',
        ],
        default: 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
      },
      friendlyName: { type: 'string' },
      required: { type: 'boolean', default: false },
      transform: { type: 'string', description: '値変換スクリプト' },
    },
  })
  .openapi('AttributeMapping')

const AvailableAttributeSchema = z
  .object({
    name: z.string().openapi({ type: 'string' }),
    type: z
      .enum(['string', 'string[]', 'boolean', 'integer', 'datetime'])
      .openapi({ type: 'string', enum: ['string', 'string[]', 'boolean', 'integer', 'datetime'] }),
    description: z.string().optional().openapi({ type: 'string' }),
    source: z
      .enum(['user', 'group', 'custom', 'computed'])
      .optional()
      .openapi({ type: 'string', enum: ['user', 'group', 'custom', 'computed'] }),
  })
  .openapi({
    type: 'object',
    required: ['name', 'type'],
    properties: {
      name: { type: 'string' },
      type: { type: 'string', enum: ['string', 'string[]', 'boolean', 'integer', 'datetime'] },
      description: { type: 'string' },
      source: { type: 'string', enum: ['user', 'group', 'custom', 'computed'] },
    },
  })
  .openapi('AvailableAttribute')

const CertificateSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    purpose: z
      .enum(['signing', 'encryption', 'both'])
      .openapi({ type: 'string', enum: ['signing', 'encryption', 'both'] }),
    isActive: z.boolean().openapi({ type: 'boolean' }),
    subject: z.string().optional().openapi({ type: 'string' }),
    issuer: z.string().optional().openapi({ type: 'string' }),
    serialNumber: z.string().optional().openapi({ type: 'string' }),
    notBefore: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    notAfter: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    fingerprint: z.string().optional().openapi({ type: 'string' }),
    fingerprintSha256: z.string().optional().openapi({ type: 'string' }),
    publicKey: z.string().optional().openapi({ type: 'string', description: 'PEM形式の公開鍵' }),
    createdAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'purpose', 'isActive', 'notBefore', 'notAfter'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      purpose: { type: 'string', enum: ['signing', 'encryption', 'both'] },
      isActive: { type: 'boolean' },
      subject: { type: 'string' },
      issuer: { type: 'string' },
      serialNumber: { type: 'string' },
      notBefore: { type: 'string', format: 'date-time' },
      notAfter: { type: 'string', format: 'date-time' },
      fingerprint: { type: 'string' },
      fingerprintSha256: { type: 'string' },
      publicKey: { type: 'string', description: 'PEM形式の公開鍵' },
      createdAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('Certificate')

const SamlSessionSchema = z
  .object({
    sessionId: z.string().openapi({ type: 'string' }),
    userId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    userName: z.string().optional().openapi({ type: 'string' }),
    serviceProviders: z
      .array(
        z
          .object({
            spId: z.uuid().openapi({ type: 'string', format: 'uuid' }),
            spName: z.string().openapi({ type: 'string' }),
            sessionIndex: z.string().openapi({ type: 'string' }),
            authenticatedAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
          })
          .partial()
          .openapi({
            type: 'object',
            properties: {
              spId: { type: 'string', format: 'uuid' },
              spName: { type: 'string' },
              sessionIndex: { type: 'string' },
              authenticatedAt: { type: 'string', format: 'date-time' },
            },
          }),
      )
      .optional()
      .openapi({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            spId: { type: 'string', format: 'uuid' },
            spName: { type: 'string' },
            sessionIndex: { type: 'string' },
            authenticatedAt: { type: 'string', format: 'date-time' },
          },
        },
      }),
    ipAddress: z.string().optional().openapi({ type: 'string' }),
    userAgent: z.string().optional().openapi({ type: 'string' }),
    createdAt: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
    expiresAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
    lastActivityAt: z.iso.datetime().optional().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['sessionId', 'userId', 'createdAt'],
    properties: {
      sessionId: { type: 'string' },
      userId: { type: 'string', format: 'uuid' },
      userName: { type: 'string' },
      serviceProviders: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            spId: { type: 'string', format: 'uuid' },
            spName: { type: 'string' },
            sessionIndex: { type: 'string' },
            authenticatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
      ipAddress: { type: 'string' },
      userAgent: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
      expiresAt: { type: 'string', format: 'date-time' },
      lastActivityAt: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('SamlSession')

const AuditLogSchema = z
  .object({
    id: z.uuid().openapi({ type: 'string', format: 'uuid' }),
    eventType: z
      .enum([
        'sso_success',
        'sso_failure',
        'slo_success',
        'slo_failure',
        'sp_created',
        'sp_updated',
        'sp_deleted',
        'certificate_uploaded',
        'certificate_activated',
      ])
      .openapi({
        type: 'string',
        enum: [
          'sso_success',
          'sso_failure',
          'slo_success',
          'slo_failure',
          'sp_created',
          'sp_updated',
          'sp_deleted',
          'certificate_uploaded',
          'certificate_activated',
        ],
      }),
    userId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    userName: z.string().optional().openapi({ type: 'string' }),
    spId: z.uuid().optional().openapi({ type: 'string', format: 'uuid' }),
    spName: z.string().optional().openapi({ type: 'string' }),
    ipAddress: z.string().optional().openapi({ type: 'string' }),
    userAgent: z.string().optional().openapi({ type: 'string' }),
    details: z.looseObject({}).openapi({ type: 'object', additionalProperties: true }),
    errorMessage: z.string().optional().openapi({ type: 'string' }),
    timestamp: z.iso.datetime().openapi({ type: 'string', format: 'date-time' }),
  })
  .openapi({
    type: 'object',
    required: ['id', 'eventType', 'timestamp'],
    properties: {
      id: { type: 'string', format: 'uuid' },
      eventType: {
        type: 'string',
        enum: [
          'sso_success',
          'sso_failure',
          'slo_success',
          'slo_failure',
          'sp_created',
          'sp_updated',
          'sp_deleted',
          'certificate_uploaded',
          'certificate_activated',
        ],
      },
      userId: { type: 'string', format: 'uuid' },
      userName: { type: 'string' },
      spId: { type: 'string', format: 'uuid' },
      spName: { type: 'string' },
      ipAddress: { type: 'string' },
      userAgent: { type: 'string' },
      details: { type: 'object', additionalProperties: true },
      errorMessage: { type: 'string' },
      timestamp: { type: 'string', format: 'date-time' },
    },
  })
  .openapi('AuditLog')

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

const AuditLogListResponseSchema = z
  .object({
    data: z
      .array(AuditLogSchema)
      .openapi({ type: 'array', items: { $ref: '#/components/schemas/AuditLog' } }),
    pagination: PaginationSchema,
  })
  .openapi({
    type: 'object',
    required: ['data', 'pagination'],
    properties: {
      data: { type: 'array', items: { $ref: '#/components/schemas/AuditLog' } },
      pagination: { $ref: '#/components/schemas/Pagination' },
    },
  })
  .openapi('AuditLogListResponse')

const SamlErrorSchema = z
  .object({
    error: z
      .enum([
        'invalid_request',
        'invalid_sp',
        'invalid_signature',
        'invalid_assertion',
        'expired_assertion',
        'unknown_sp',
        'binding_not_supported',
      ])
      .openapi({
        type: 'string',
        enum: [
          'invalid_request',
          'invalid_sp',
          'invalid_signature',
          'invalid_assertion',
          'expired_assertion',
          'unknown_sp',
          'binding_not_supported',
        ],
      }),
    message: z.string().openapi({ type: 'string' }),
    samlStatus: z.string().optional().openapi({ type: 'string', description: 'SAML Status Code' }),
  })
  .openapi({
    type: 'object',
    required: ['error', 'message'],
    properties: {
      error: {
        type: 'string',
        enum: [
          'invalid_request',
          'invalid_sp',
          'invalid_signature',
          'invalid_assertion',
          'expired_assertion',
          'unknown_sp',
          'binding_not_supported',
        ],
      },
      message: { type: 'string' },
      samlStatus: { type: 'string', description: 'SAML Status Code' },
    },
  })
  .openapi('SamlError')

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
  description: '不正なリクエスト',
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

export const getSamlSsoRoute = createRoute({
  method: 'get',
  path: '/saml/sso',
  tags: ['SSO'],
  summary: 'SSO (HTTP-Redirect binding)',
  description: 'HTTP-Redirect バインディングでのSSO処理',
  operationId: 'ssoRedirect',
  request: {
    query: z.object({
      SAMLRequest: z
        .string()
        .openapi({
          param: {
            name: 'SAMLRequest',
            in: 'query',
            required: true,
            description: 'Base64エンコードされたSAML AuthnRequest',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      RelayState: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'RelayState',
            in: 'query',
            description: '認証後にリダイレクトする状態情報',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      SigAlg: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'SigAlg',
            in: 'query',
            description: '署名アルゴリズム',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      Signature: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'Signature',
            in: 'query',
            description: 'リクエスト署名',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
    }),
  },
  responses: {
    302: { description: '認証フォームまたはSPへリダイレクト' },
    400: {
      description: '不正なSAMLリクエスト',
      content: { 'application/json': { schema: SamlErrorSchema.optional() } },
    },
  },
})

export const postSamlSsoRoute = createRoute({
  method: 'post',
  path: '/saml/sso',
  tags: ['SSO'],
  summary: 'SSO (HTTP-POST binding)',
  description: 'HTTP-POST バインディングでのSSO処理',
  operationId: 'ssoPost',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: z
            .object({
              SAMLRequest: z
                .string()
                .openapi({
                  type: 'string',
                  description: 'Base64エンコードされたSAML AuthnRequest',
                }),
              RelayState: z.string().optional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              required: ['SAMLRequest'],
              properties: {
                SAMLRequest: {
                  type: 'string',
                  description: 'Base64エンコードされたSAML AuthnRequest',
                },
                RelayState: { type: 'string' },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '認証フォーム表示',
      content: { 'text/html': { schema: z.string().optional().openapi({ type: 'string' }) } },
    },
    302: { description: 'SPへリダイレクト' },
    400: {
      description: '不正なSAMLリクエスト',
      content: { 'application/json': { schema: SamlErrorSchema.optional() } },
    },
  },
})

export const getSamlSloRoute = createRoute({
  method: 'get',
  path: '/saml/slo',
  tags: ['SSO'],
  summary: 'Single Logout (HTTP-Redirect)',
  description: 'HTTP-Redirect バインディングでのシングルログアウト',
  operationId: 'sloRedirect',
  request: {
    query: z.object({
      SAMLRequest: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'SAMLRequest',
            in: 'query',
            description: 'LogoutRequest',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      SAMLResponse: z
        .string()
        .optional()
        .openapi({
          param: {
            name: 'SAMLResponse',
            in: 'query',
            description: 'LogoutResponse',
            schema: { type: 'string' },
          },
          type: 'string',
        }),
      RelayState: z
        .string()
        .optional()
        .openapi({
          param: { name: 'RelayState', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      SigAlg: z
        .string()
        .optional()
        .openapi({
          param: { name: 'SigAlg', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      Signature: z
        .string()
        .optional()
        .openapi({
          param: { name: 'Signature', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: { 302: { description: 'ログアウト完了後リダイレクト' } },
})

export const postSamlSloRoute = createRoute({
  method: 'post',
  path: '/saml/slo',
  tags: ['SSO'],
  summary: 'Single Logout (HTTP-POST)',
  description: 'HTTP-POST バインディングでのシングルログアウト',
  operationId: 'sloPost',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: z
            .object({
              SAMLRequest: z.string().openapi({ type: 'string' }),
              SAMLResponse: z.string().openapi({ type: 'string' }),
              RelayState: z.string().openapi({ type: 'string' }),
            })
            .partial()
            .openapi({
              type: 'object',
              properties: {
                SAMLRequest: { type: 'string' },
                SAMLResponse: { type: 'string' },
                RelayState: { type: 'string' },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'ログアウトフォーム',
      content: { 'text/html': { schema: z.string().optional().openapi({ type: 'string' }) } },
    },
  },
})

export const postSamlAcsRoute = createRoute({
  method: 'post',
  path: '/saml/acs',
  tags: ['SSO'],
  summary: 'Assertion Consumer Service',
  description: 'SPからのSAMLレスポンスを処理（IdP-initiated の場合）',
  operationId: 'assertionConsumerService',
  request: {
    body: {
      content: {
        'application/x-www-form-urlencoded': {
          schema: z
            .object({
              SAMLResponse: z.string().openapi({ type: 'string' }),
              RelayState: z.string().optional().openapi({ type: 'string' }),
            })
            .openapi({
              type: 'object',
              required: ['SAMLResponse'],
              properties: { SAMLResponse: { type: 'string' }, RelayState: { type: 'string' } },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    302: { description: 'アプリケーションへリダイレクト' },
    400: { description: '不正なSAMLレスポンス' },
  },
})

export const getSamlMetadataRoute = createRoute({
  method: 'get',
  path: '/saml/metadata',
  tags: ['Metadata'],
  summary: 'IdPメタデータ取得',
  description: 'SAML 2.0 IdPメタデータをXML形式で取得',
  operationId: 'getIdpMetadata',
  responses: {
    200: {
      description: 'IdPメタデータ',
      content: {
        'application/samlmetadata+xml': {
          schema: z.string().optional().openapi({ type: 'string' }),
        },
        'application/xml': { schema: z.string().optional().openapi({ type: 'string' }) },
      },
    },
  },
})

export const getServiceProvidersRoute = createRoute({
  method: 'get',
  path: '/service-providers',
  tags: ['Service Providers'],
  summary: 'SP一覧取得',
  operationId: 'listServiceProviders',
  request: {
    query: z.object({
      search: z
        .string()
        .optional()
        .openapi({
          param: { name: 'search', in: 'query', schema: { type: 'string' } },
          type: 'string',
        }),
      enabled: z
        .stringbool()
        .optional()
        .openapi({
          param: { name: 'enabled', in: 'query', schema: { type: 'boolean' } },
          type: 'boolean',
        }),
    }),
  },
  responses: {
    200: {
      description: 'SP一覧',
      content: {
        'application/json': {
          schema: z
            .array(ServiceProviderSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/ServiceProvider' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postServiceProvidersRoute = createRoute({
  method: 'post',
  path: '/service-providers',
  tags: ['Service Providers'],
  summary: 'SP登録',
  operationId: 'createServiceProvider',
  request: {
    body: {
      content: {
        'application/json': { schema: CreateServiceProviderRequestSchema.optional() },
        'application/xml': {
          schema: z.string().optional().openapi({ type: 'string', description: 'SPメタデータXML' }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: '登録成功',
      content: { 'application/json': { schema: ServiceProviderSchema.optional() } },
    },
    400: BadRequestResponse,
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getServiceProvidersSpIdRoute = createRoute({
  method: 'get',
  path: '/service-providers/{spId}',
  tags: ['Service Providers'],
  summary: 'SP詳細取得',
  operationId: 'getServiceProvider',
  request: {
    params: z.object({
      spId: z
        .uuid()
        .openapi({
          param: {
            name: 'spId',
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
      description: 'SP詳細',
      content: { 'application/json': { schema: ServiceProviderSchema.optional() } },
    },
    401: UnauthorizedResponse,
    404: NotFoundResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putServiceProvidersSpIdRoute = createRoute({
  method: 'put',
  path: '/service-providers/{spId}',
  tags: ['Service Providers'],
  summary: 'SP更新',
  operationId: 'updateServiceProvider',
  request: {
    body: {
      content: { 'application/json': { schema: UpdateServiceProviderRequestSchema.optional() } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: ServiceProviderSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteServiceProvidersSpIdRoute = createRoute({
  method: 'delete',
  path: '/service-providers/{spId}',
  tags: ['Service Providers'],
  summary: 'SP削除',
  operationId: 'deleteServiceProvider',
  request: {
    params: z.object({
      spId: z
        .uuid()
        .openapi({
          param: {
            name: 'spId',
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

export const getServiceProvidersSpIdMetadataRoute = createRoute({
  method: 'get',
  path: '/service-providers/{spId}/metadata',
  tags: ['Service Providers'],
  summary: 'SPメタデータ取得',
  operationId: 'getSpMetadata',
  request: {
    params: z.object({
      spId: z
        .uuid()
        .openapi({
          param: {
            name: 'spId',
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
      content: { 'application/xml': { schema: z.string().optional().openapi({ type: 'string' }) } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putServiceProvidersSpIdMetadataRoute = createRoute({
  method: 'put',
  path: '/service-providers/{spId}/metadata',
  tags: ['Service Providers'],
  summary: 'SPメタデータ更新',
  operationId: 'updateSpMetadata',
  request: {
    body: {
      content: {
        'application/xml': { schema: z.string().optional().openapi({ type: 'string' }) },
        'multipart/form-data': {
          schema: z
            .object({ file: z.file().openapi({ type: 'string', format: 'binary' }) })
            .partial()
            .openapi({
              type: 'object',
              properties: { file: { type: 'string', format: 'binary' } },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: ServiceProviderSchema.optional() } },
    },
    400: { description: '不正なメタデータ' },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getServiceProvidersSpIdAttributesRoute = createRoute({
  method: 'get',
  path: '/service-providers/{spId}/attributes',
  tags: ['Attributes'],
  summary: 'SP属性マッピング取得',
  operationId: 'getSpAttributeMappings',
  request: {
    params: z.object({
      spId: z
        .uuid()
        .openapi({
          param: {
            name: 'spId',
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
      description: '属性マッピング一覧',
      content: {
        'application/json': {
          schema: z
            .array(AttributeMappingSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/AttributeMapping' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const putServiceProvidersSpIdAttributesRoute = createRoute({
  method: 'put',
  path: '/service-providers/{spId}/attributes',
  tags: ['Attributes'],
  summary: 'SP属性マッピング更新',
  operationId: 'updateSpAttributeMappings',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .array(AttributeMappingSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/AttributeMapping' } }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: {
        'application/json': {
          schema: z
            .array(AttributeMappingSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/AttributeMapping' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getAttributesRoute = createRoute({
  method: 'get',
  path: '/attributes',
  tags: ['Attributes'],
  summary: '利用可能な属性一覧',
  operationId: 'listAvailableAttributes',
  responses: {
    200: {
      description: '属性一覧',
      content: {
        'application/json': {
          schema: z
            .array(AvailableAttributeSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/AvailableAttribute' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getCertificatesRoute = createRoute({
  method: 'get',
  path: '/certificates',
  tags: ['Metadata'],
  summary: '証明書一覧取得',
  operationId: 'listCertificates',
  responses: {
    200: {
      description: '証明書一覧',
      content: {
        'application/json': {
          schema: z
            .array(CertificateSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/Certificate' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const postCertificatesRoute = createRoute({
  method: 'post',
  path: '/certificates',
  tags: ['Metadata'],
  summary: '証明書アップロード',
  operationId: 'uploadCertificate',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z
            .object({
              certificate: z.file().openapi({ type: 'string', format: 'binary' }),
              privateKey: z.file().openapi({ type: 'string', format: 'binary' }),
              passphrase: z.string().optional().openapi({ type: 'string' }),
              purpose: z
                .enum(['signing', 'encryption', 'both'])
                .optional()
                .openapi({ type: 'string', enum: ['signing', 'encryption', 'both'] }),
            })
            .openapi({
              type: 'object',
              required: ['certificate', 'privateKey'],
              properties: {
                certificate: { type: 'string', format: 'binary' },
                privateKey: { type: 'string', format: 'binary' },
                passphrase: { type: 'string' },
                purpose: { type: 'string', enum: ['signing', 'encryption', 'both'] },
              },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'アップロード成功',
      content: { 'application/json': { schema: CertificateSchema.optional() } },
    },
    400: { description: '不正な証明書' },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteCertificatesCertIdRoute = createRoute({
  method: 'delete',
  path: '/certificates/{certId}',
  tags: ['Metadata'],
  summary: '証明書削除',
  operationId: 'deleteCertificate',
  request: {
    params: z.object({
      certId: z
        .uuid()
        .openapi({
          param: {
            name: 'certId',
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
    204: { description: '削除成功' },
    401: UnauthorizedResponse,
    409: { description: '使用中の証明書は削除できません' },
  },
  security: [{ bearerAuth: [] }],
})

export const postCertificatesCertIdActivateRoute = createRoute({
  method: 'post',
  path: '/certificates/{certId}/activate',
  tags: ['Metadata'],
  summary: '証明書有効化',
  operationId: 'activateCertificate',
  request: {
    params: z.object({
      certId: z
        .uuid()
        .openapi({
          param: {
            name: 'certId',
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
      description: '有効化成功',
      content: { 'application/json': { schema: CertificateSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const getSessionsRoute = createRoute({
  method: 'get',
  path: '/sessions',
  tags: ['SSO'],
  summary: 'アクティブセッション一覧',
  operationId: 'listActiveSessions',
  request: {
    query: z.object({
      userId: z
        .uuid()
        .optional()
        .openapi({
          param: { name: 'userId', in: 'query', schema: { type: 'string', format: 'uuid' } },
          type: 'string',
          format: 'uuid',
        }),
    }),
  },
  responses: {
    200: {
      description: 'セッション一覧',
      content: {
        'application/json': {
          schema: z
            .array(SamlSessionSchema)
            .optional()
            .openapi({ type: 'array', items: { $ref: '#/components/schemas/SamlSession' } }),
        },
      },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})

export const deleteSessionsSessionIdRoute = createRoute({
  method: 'delete',
  path: '/sessions/{sessionId}',
  tags: ['SSO'],
  summary: 'セッション終了',
  operationId: 'terminateSession',
  request: {
    params: z.object({
      sessionId: z
        .string()
        .openapi({
          param: { name: 'sessionId', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
    }),
  },
  responses: { 204: { description: 'セッション終了成功' }, 401: UnauthorizedResponse },
  security: [{ bearerAuth: [] }],
})

export const getAuditLogsRoute = createRoute({
  method: 'get',
  path: '/audit-logs',
  tags: ['SSO'],
  summary: 'SAML監査ログ取得',
  operationId: 'getSamlAuditLogs',
  request: {
    query: z.object({
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
      spId: z
        .uuid()
        .optional()
        .openapi({
          param: { name: 'spId', in: 'query', schema: { type: 'string', format: 'uuid' } },
          type: 'string',
          format: 'uuid',
        }),
      userId: z
        .uuid()
        .optional()
        .openapi({
          param: { name: 'userId', in: 'query', schema: { type: 'string', format: 'uuid' } },
          type: 'string',
          format: 'uuid',
        }),
      eventType: z
        .enum(['sso_success', 'sso_failure', 'slo_success', 'slo_failure'])
        .optional()
        .openapi({
          param: {
            name: 'eventType',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['sso_success', 'sso_failure', 'slo_success', 'slo_failure'],
            },
          },
          type: 'string',
          enum: ['sso_success', 'sso_failure', 'slo_success', 'slo_failure'],
        }),
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
    }),
  },
  responses: {
    200: {
      description: '監査ログ',
      content: { 'application/json': { schema: AuditLogListResponseSchema.optional() } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})
