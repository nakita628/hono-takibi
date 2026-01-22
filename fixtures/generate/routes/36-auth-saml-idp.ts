import { createRoute, z } from '@hono/zod-openapi'

const AssertionConsumerServiceSchema = z
  .object({
    binding: z.enum([
      'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
      'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact',
    ]),
    location: z.url(),
    index: z.int().exactOptional(),
    isDefault: z.boolean().exactOptional(),
  })
  .openapi({ required: ['binding', 'location'] })
  .openapi('AssertionConsumerService')

const SingleLogoutServiceSchema = z
  .object({
    binding: z.enum([
      'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
      'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
    ]),
    location: z.url(),
    responseLocation: z.url().exactOptional(),
  })
  .openapi({ required: ['binding', 'location'] })
  .openapi('SingleLogoutService')

const ServiceProviderSchema = z
  .object({
    id: z.uuid(),
    entityId: z.url().openapi({ description: 'SP Entity ID' }),
    name: z.string(),
    description: z.string().exactOptional(),
    enabled: z.boolean(),
    assertionConsumerServices: z.array(AssertionConsumerServiceSchema).exactOptional(),
    singleLogoutServices: z.array(SingleLogoutServiceSchema).exactOptional(),
    nameIdFormat: z
      .enum([
        'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
        'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified',
        'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent',
        'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
      ])
      .exactOptional(),
    signAssertions: z.boolean().default(true).exactOptional(),
    signResponses: z.boolean().default(true).exactOptional(),
    encryptAssertions: z.boolean().default(false).exactOptional(),
    signingCertificate: z
      .string()
      .exactOptional()
      .openapi({ description: 'SP署名検証用証明書（PEM）' }),
    encryptionCertificate: z
      .string()
      .exactOptional()
      .openapi({ description: 'SP暗号化用証明書（PEM）' }),
    wantAuthnRequestsSigned: z.boolean().default(false).exactOptional(),
    defaultRelayState: z.string().exactOptional(),
    sessionDuration: z.int().exactOptional().openapi({ description: 'セッション有効期間（秒）' }),
    createdAt: z.iso.datetime().exactOptional(),
    updatedAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'entityId', 'name', 'enabled'] })
  .openapi('ServiceProvider')

const CreateServiceProviderRequestSchema = z
  .object({
    entityId: z.url(),
    name: z.string().min(1).max(200),
    description: z.string().exactOptional(),
    metadataUrl: z.url().exactOptional().openapi({ description: 'メタデータURL（自動取得）' }),
    assertionConsumerServices: z.array(AssertionConsumerServiceSchema).exactOptional(),
    singleLogoutServices: z.array(SingleLogoutServiceSchema).exactOptional(),
    nameIdFormat: z.string().exactOptional(),
    signAssertions: z.boolean().default(true).exactOptional(),
    encryptAssertions: z.boolean().default(false).exactOptional(),
    signingCertificate: z.string().exactOptional(),
    encryptionCertificate: z.string().exactOptional(),
  })
  .openapi({ required: ['entityId', 'name'] })
  .openapi('CreateServiceProviderRequest')

const UpdateServiceProviderRequestSchema = z
  .object({
    name: z.string().exactOptional(),
    description: z.string().exactOptional(),
    enabled: z.boolean().exactOptional(),
    assertionConsumerServices: z.array(AssertionConsumerServiceSchema).exactOptional(),
    singleLogoutServices: z.array(SingleLogoutServiceSchema).exactOptional(),
    nameIdFormat: z.string().exactOptional(),
    signAssertions: z.boolean().exactOptional(),
    signResponses: z.boolean().exactOptional(),
    encryptAssertions: z.boolean().exactOptional(),
    wantAuthnRequestsSigned: z.boolean().exactOptional(),
    defaultRelayState: z.string().exactOptional(),
    sessionDuration: z.int().exactOptional(),
  })
  .openapi('UpdateServiceProviderRequest')

const AttributeMappingSchema = z
  .object({
    id: z.uuid().exactOptional(),
    sourceAttribute: z.string().openapi({ description: 'IdP側の属性名' }),
    samlAttribute: z.string().openapi({ description: 'SAMLアサーションで送信する属性名' }),
    samlAttributeNameFormat: z
      .enum([
        'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
        'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
        'urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified',
      ])
      .default('urn:oasis:names:tc:SAML:2.0:attrname-format:basic')
      .exactOptional(),
    friendlyName: z.string().exactOptional(),
    required: z.boolean().default(false).exactOptional(),
    transform: z.string().exactOptional().openapi({ description: '値変換スクリプト' }),
  })
  .openapi({ required: ['sourceAttribute', 'samlAttribute'] })
  .openapi('AttributeMapping')

const AvailableAttributeSchema = z
  .object({
    name: z.string(),
    type: z.enum(['string', 'string[]', 'boolean', 'integer', 'datetime']),
    description: z.string().exactOptional(),
    source: z.enum(['user', 'group', 'custom', 'computed']).exactOptional(),
  })
  .openapi({ required: ['name', 'type'] })
  .openapi('AvailableAttribute')

const CertificateSchema = z
  .object({
    id: z.uuid(),
    purpose: z.enum(['signing', 'encryption', 'both']),
    isActive: z.boolean(),
    subject: z.string().exactOptional(),
    issuer: z.string().exactOptional(),
    serialNumber: z.string().exactOptional(),
    notBefore: z.iso.datetime(),
    notAfter: z.iso.datetime(),
    fingerprint: z.string().exactOptional(),
    fingerprintSha256: z.string().exactOptional(),
    publicKey: z.string().exactOptional().openapi({ description: 'PEM形式の公開鍵' }),
    createdAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['id', 'purpose', 'isActive', 'notBefore', 'notAfter'] })
  .openapi('Certificate')

const SamlSessionSchema = z
  .object({
    sessionId: z.string(),
    userId: z.uuid(),
    userName: z.string().exactOptional(),
    serviceProviders: z
      .array(
        z.object({
          spId: z.uuid().exactOptional(),
          spName: z.string().exactOptional(),
          sessionIndex: z.string().exactOptional(),
          authenticatedAt: z.iso.datetime().exactOptional(),
        }),
      )
      .exactOptional(),
    ipAddress: z.string().exactOptional(),
    userAgent: z.string().exactOptional(),
    createdAt: z.iso.datetime(),
    expiresAt: z.iso.datetime().exactOptional(),
    lastActivityAt: z.iso.datetime().exactOptional(),
  })
  .openapi({ required: ['sessionId', 'userId', 'createdAt'] })
  .openapi('SamlSession')

const AuditLogSchema = z
  .object({
    id: z.uuid(),
    eventType: z.enum([
      'sso_success',
      'sso_failure',
      'slo_success',
      'slo_failure',
      'sp_created',
      'sp_updated',
      'sp_deleted',
      'certificate_uploaded',
      'certificate_activated',
    ]),
    userId: z.uuid().exactOptional(),
    userName: z.string().exactOptional(),
    spId: z.uuid().exactOptional(),
    spName: z.string().exactOptional(),
    ipAddress: z.string().exactOptional(),
    userAgent: z.string().exactOptional(),
    details: z.looseObject({}).exactOptional(),
    errorMessage: z.string().exactOptional(),
    timestamp: z.iso.datetime(),
  })
  .openapi({ required: ['id', 'eventType', 'timestamp'] })
  .openapi('AuditLog')

const PaginationSchema = z
  .object({ page: z.int(), limit: z.int(), total: z.int(), totalPages: z.int() })
  .openapi({ required: ['page', 'limit', 'total', 'totalPages'] })
  .openapi('Pagination')

const AuditLogListResponseSchema = z
  .object({ data: z.array(AuditLogSchema), pagination: PaginationSchema })
  .openapi({ required: ['data', 'pagination'] })
  .openapi('AuditLogListResponse')

const SamlErrorSchema = z
  .object({
    error: z.enum([
      'invalid_request',
      'invalid_sp',
      'invalid_signature',
      'invalid_assertion',
      'expired_assertion',
      'unknown_sp',
      'binding_not_supported',
    ]),
    message: z.string(),
    samlStatus: z.string().exactOptional().openapi({ description: 'SAML Status Code' }),
  })
  .openapi({ required: ['error', 'message'] })
  .openapi('SamlError')

const ErrorSchema = z
  .object({ code: z.string(), message: z.string() })
  .openapi({ required: ['code', 'message'] })
  .openapi('Error')

const PageParamParamsSchema = z
  .int()
  .min(1)
  .default(1)
  .exactOptional()
  .openapi({ param: { name: 'page', in: 'query' } })

const LimitParamParamsSchema = z
  .int()
  .min(1)
  .max(100)
  .default(20)
  .exactOptional()
  .openapi({ param: { name: 'limit', in: 'query' } })

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }

const BadRequestResponse = {
  description: '不正なリクエスト',
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
          },
        }),
      RelayState: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            name: 'RelayState',
            in: 'query',
            description: '認証後にリダイレクトする状態情報',
          },
        }),
      SigAlg: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'SigAlg', in: 'query', description: '署名アルゴリズム' } }),
      Signature: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'Signature', in: 'query', description: 'リクエスト署名' } }),
    }),
  },
  responses: {
    302: {
      description: '認証フォームまたはSPへリダイレクト',
      headers: z.object({ Location: { schema: z.url().exactOptional() } }),
    },
    400: {
      description: '不正なSAMLリクエスト',
      content: { 'application/json': { schema: SamlErrorSchema } },
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
                .openapi({ description: 'Base64エンコードされたSAML AuthnRequest' }),
              RelayState: z.string().exactOptional(),
            })
            .openapi({ required: ['SAMLRequest'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: '認証フォーム表示', content: { 'text/html': { schema: z.string() } } },
    302: { description: 'SPへリダイレクト' },
    400: {
      description: '不正なSAMLリクエスト',
      content: { 'application/json': { schema: SamlErrorSchema } },
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
        .exactOptional()
        .openapi({ param: { name: 'SAMLRequest', in: 'query', description: 'LogoutRequest' } }),
      SAMLResponse: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'SAMLResponse', in: 'query', description: 'LogoutResponse' } }),
      RelayState: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'RelayState', in: 'query' } }),
      SigAlg: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'SigAlg', in: 'query' } }),
      Signature: z
        .string()
        .exactOptional()
        .openapi({ param: { name: 'Signature', in: 'query' } }),
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
          schema: z.object({
            SAMLRequest: z.string().exactOptional(),
            SAMLResponse: z.string().exactOptional(),
            RelayState: z.string().exactOptional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: 'ログアウトフォーム', content: { 'text/html': { schema: z.string() } } },
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
            .object({ SAMLResponse: z.string(), RelayState: z.string().exactOptional() })
            .openapi({ required: ['SAMLResponse'] }),
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
        'application/samlmetadata+xml': { schema: z.string() },
        'application/xml': { schema: z.string() },
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
        .exactOptional()
        .openapi({ param: { name: 'search', in: 'query' } }),
      enabled: z
        .stringbool()
        .exactOptional()
        .openapi({ param: { name: 'enabled', in: 'query' } }),
    }),
  },
  responses: {
    200: {
      description: 'SP一覧',
      content: { 'application/json': { schema: z.array(ServiceProviderSchema) } },
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
        'application/json': { schema: CreateServiceProviderRequestSchema },
        'application/xml': { schema: z.string().openapi({ description: 'SPメタデータXML' }) },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: '登録成功',
      content: { 'application/json': { schema: ServiceProviderSchema } },
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
      spId: z.uuid().openapi({ param: { name: 'spId', in: 'path', required: true } }),
    }),
  },
  responses: {
    200: {
      description: 'SP詳細',
      content: { 'application/json': { schema: ServiceProviderSchema } },
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
    params: z.object({
      spId: z.uuid().openapi({ param: { name: 'spId', in: 'path', required: true } }),
    }),
    body: {
      content: { 'application/json': { schema: UpdateServiceProviderRequestSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: ServiceProviderSchema } },
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
      spId: z.uuid().openapi({ param: { name: 'spId', in: 'path', required: true } }),
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
      spId: z.uuid().openapi({ param: { name: 'spId', in: 'path', required: true } }),
    }),
  },
  responses: {
    200: { description: 'SPメタデータ', content: { 'application/xml': { schema: z.string() } } },
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
    params: z.object({
      spId: z.uuid().openapi({ param: { name: 'spId', in: 'path', required: true } }),
    }),
    body: {
      content: {
        'application/xml': { schema: z.string() },
        'multipart/form-data': { schema: z.object({ file: z.file().exactOptional() }) },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: ServiceProviderSchema } },
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
      spId: z.uuid().openapi({ param: { name: 'spId', in: 'path', required: true } }),
    }),
  },
  responses: {
    200: {
      description: '属性マッピング一覧',
      content: { 'application/json': { schema: z.array(AttributeMappingSchema) } },
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
    params: z.object({
      spId: z.uuid().openapi({ param: { name: 'spId', in: 'path', required: true } }),
    }),
    body: {
      content: { 'application/json': { schema: z.array(AttributeMappingSchema) } },
      required: true,
    },
  },
  responses: {
    200: {
      description: '更新成功',
      content: { 'application/json': { schema: z.array(AttributeMappingSchema) } },
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
      content: { 'application/json': { schema: z.array(AvailableAttributeSchema) } },
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
      content: { 'application/json': { schema: z.array(CertificateSchema) } },
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
              certificate: z.file(),
              privateKey: z.file(),
              passphrase: z.string().exactOptional(),
              purpose: z.enum(['signing', 'encryption', 'both']).exactOptional(),
            })
            .openapi({ required: ['certificate', 'privateKey'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'アップロード成功',
      content: { 'application/json': { schema: CertificateSchema } },
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
      certId: z.uuid().openapi({ param: { name: 'certId', in: 'path', required: true } }),
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
      certId: z.uuid().openapi({ param: { name: 'certId', in: 'path', required: true } }),
    }),
  },
  responses: {
    200: {
      description: '有効化成功',
      content: { 'application/json': { schema: CertificateSchema } },
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
        .exactOptional()
        .openapi({ param: { name: 'userId', in: 'query' } }),
    }),
  },
  responses: {
    200: {
      description: 'セッション一覧',
      content: { 'application/json': { schema: z.array(SamlSessionSchema) } },
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
      sessionId: z.string().openapi({ param: { name: 'sessionId', in: 'path', required: true } }),
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
        .exactOptional()
        .openapi({ param: { name: 'from', in: 'query' } }),
      to: z.iso
        .datetime()
        .exactOptional()
        .openapi({ param: { name: 'to', in: 'query' } }),
      spId: z
        .uuid()
        .exactOptional()
        .openapi({ param: { name: 'spId', in: 'query' } }),
      userId: z
        .uuid()
        .exactOptional()
        .openapi({ param: { name: 'userId', in: 'query' } }),
      eventType: z
        .enum(['sso_success', 'sso_failure', 'slo_success', 'slo_failure'])
        .exactOptional()
        .openapi({ param: { name: 'eventType', in: 'query' } }),
      page: PageParamParamsSchema,
      limit: LimitParamParamsSchema,
    }),
  },
  responses: {
    200: {
      description: '監査ログ',
      content: { 'application/json': { schema: AuditLogListResponseSchema } },
    },
    401: UnauthorizedResponse,
  },
  security: [{ bearerAuth: [] }],
})
