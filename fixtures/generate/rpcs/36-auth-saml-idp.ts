import { client } from '../clients/36-auth-saml-idp'

/**
 * GET /saml/sso
 *
 * SSO (HTTP-Redirect binding)
 *
 * HTTP-Redirect バインディングでのSSO処理
 */
export async function getSamlSso(params: {
  query: { SAMLRequest: string; RelayState: string; SigAlg: string; Signature: string }
}) {
  return await client.saml.sso.$get({ query: params.query })
}

/**
 * POST /saml/sso
 *
 * SSO (HTTP-POST binding)
 *
 * HTTP-POST バインディングでのSSO処理
 */
export async function postSamlSso(body: { SAMLRequest: string; RelayState?: string }) {
  return await client.saml.sso.$post({ json: body })
}

/**
 * GET /saml/slo
 *
 * Single Logout (HTTP-Redirect)
 *
 * HTTP-Redirect バインディングでのシングルログアウト
 */
export async function getSamlSlo(params: {
  query: {
    SAMLRequest: string
    SAMLResponse: string
    RelayState: string
    SigAlg: string
    Signature: string
  }
}) {
  return await client.saml.slo.$get({ query: params.query })
}

/**
 * POST /saml/slo
 *
 * Single Logout (HTTP-POST)
 *
 * HTTP-POST バインディングでのシングルログアウト
 */
export async function postSamlSlo(body: {
  SAMLRequest?: string
  SAMLResponse?: string
  RelayState?: string
}) {
  return await client.saml.slo.$post({ json: body })
}

/**
 * POST /saml/acs
 *
 * Assertion Consumer Service
 *
 * SPからのSAMLレスポンスを処理（IdP-initiated の場合）
 */
export async function postSamlAcs(body: { SAMLResponse: string; RelayState?: string }) {
  return await client.saml.acs.$post({ json: body })
}

/**
 * GET /saml/metadata
 *
 * IdPメタデータ取得
 *
 * SAML 2.0 IdPメタデータをXML形式で取得
 */
export async function getSamlMetadata() {
  return await client.saml.metadata.$get()
}

/**
 * GET /service-providers
 *
 * SP一覧取得
 */
export async function getServiceProviders(params: { query: { search: string; enabled: boolean } }) {
  return await client['service-providers'].$get({ query: params.query })
}

/**
 * POST /service-providers
 *
 * SP登録
 */
export async function postServiceProviders(body: {
  entityId: string
  name: string
  description?: string
  metadataUrl?: string
  assertionConsumerServices?: {
    binding:
      | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
      | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact'
    location: string
    index?: number
    isDefault?: boolean
  }[]
  singleLogoutServices?: {
    binding:
      | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
      | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
    location: string
    responseLocation?: string
  }[]
  nameIdFormat?: string
  signAssertions?: boolean
  encryptAssertions?: boolean
  signingCertificate?: string
  encryptionCertificate?: string
}) {
  return await client['service-providers'].$post({ json: body })
}

/**
 * GET /service-providers/{spId}
 *
 * SP詳細取得
 */
export async function getServiceProvidersSpId(params: { path: { spId: string } }) {
  return await client['service-providers'][':spId'].$get({ param: params.path })
}

/**
 * PUT /service-providers/{spId}
 *
 * SP更新
 */
export async function putServiceProvidersSpId(
  params: { path: { spId: string } },
  body: {
    name?: string
    description?: string
    enabled?: boolean
    assertionConsumerServices?: {
      binding:
        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact'
      location: string
      index?: number
      isDefault?: boolean
    }[]
    singleLogoutServices?: {
      binding:
        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
      location: string
      responseLocation?: string
    }[]
    nameIdFormat?: string
    signAssertions?: boolean
    signResponses?: boolean
    encryptAssertions?: boolean
    wantAuthnRequestsSigned?: boolean
    defaultRelayState?: string
    sessionDuration?: number
  },
) {
  return await client['service-providers'][':spId'].$put({ param: params.path, json: body })
}

/**
 * DELETE /service-providers/{spId}
 *
 * SP削除
 */
export async function deleteServiceProvidersSpId(params: { path: { spId: string } }) {
  return await client['service-providers'][':spId'].$delete({ param: params.path })
}

/**
 * GET /service-providers/{spId}/metadata
 *
 * SPメタデータ取得
 */
export async function getServiceProvidersSpIdMetadata(params: { path: { spId: string } }) {
  return await client['service-providers'][':spId'].metadata.$get({ param: params.path })
}

/**
 * PUT /service-providers/{spId}/metadata
 *
 * SPメタデータ更新
 */
export async function putServiceProvidersSpIdMetadata(
  params: { path: { spId: string } },
  body: string,
) {
  return await client['service-providers'][':spId'].metadata.$put({
    param: params.path,
    json: body,
  })
}

/**
 * GET /service-providers/{spId}/attributes
 *
 * SP属性マッピング取得
 */
export async function getServiceProvidersSpIdAttributes(params: { path: { spId: string } }) {
  return await client['service-providers'][':spId'].attributes.$get({ param: params.path })
}

/**
 * PUT /service-providers/{spId}/attributes
 *
 * SP属性マッピング更新
 */
export async function putServiceProvidersSpIdAttributes(
  params: { path: { spId: string } },
  body: {
    id?: string
    sourceAttribute: string
    samlAttribute: string
    samlAttributeNameFormat?:
      | 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic'
      | 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri'
      | 'urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified'
    friendlyName?: string
    required?: boolean
    transform?: string
  }[],
) {
  return await client['service-providers'][':spId'].attributes.$put({
    param: params.path,
    json: body,
  })
}

/**
 * GET /attributes
 *
 * 利用可能な属性一覧
 */
export async function getAttributes() {
  return await client.attributes.$get()
}

/**
 * GET /certificates
 *
 * 証明書一覧取得
 */
export async function getCertificates() {
  return await client.certificates.$get()
}

/**
 * POST /certificates
 *
 * 証明書アップロード
 */
export async function postCertificates(body: {
  certificate: string
  privateKey: string
  passphrase?: string
  purpose?: 'signing' | 'encryption' | 'both'
}) {
  return await client.certificates.$post({ json: body })
}

/**
 * DELETE /certificates/{certId}
 *
 * 証明書削除
 */
export async function deleteCertificatesCertId(params: { path: { certId: string } }) {
  return await client.certificates[':certId'].$delete({ param: params.path })
}

/**
 * POST /certificates/{certId}/activate
 *
 * 証明書有効化
 */
export async function postCertificatesCertIdActivate(params: { path: { certId: string } }) {
  return await client.certificates[':certId'].activate.$post({ param: params.path })
}

/**
 * GET /sessions
 *
 * アクティブセッション一覧
 */
export async function getSessions(params: { query: { userId: string } }) {
  return await client.sessions.$get({ query: params.query })
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション終了
 */
export async function deleteSessionsSessionId(params: { path: { sessionId: string } }) {
  return await client.sessions[':sessionId'].$delete({ param: params.path })
}

/**
 * GET /audit-logs
 *
 * SAML監査ログ取得
 */
export async function getAuditLogs(params: {
  query: {
    from: string
    to: string
    spId: string
    userId: string
    eventType: 'sso_success' | 'sso_failure' | 'slo_success' | 'slo_failure'
    page: number
    limit: number
  }
}) {
  return await client['audit-logs'].$get({ query: params.query })
}
