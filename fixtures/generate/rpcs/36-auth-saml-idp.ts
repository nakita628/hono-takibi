import { client } from '../clients/36-auth-saml-idp'

/**
 * GET /saml/sso
 *
 * SSO (HTTP-Redirect binding)
 *
 * HTTP-Redirect バインディングでのSSO処理
 */
export async function getSamlSso(arg: {
  query: { SAMLRequest: string; RelayState?: string; SigAlg?: string; Signature?: string }
}) {
  return await client['saml']['sso']['$get'](arg)
}

/**
 * POST /saml/sso
 *
 * SSO (HTTP-POST binding)
 *
 * HTTP-POST バインディングでのSSO処理
 */
export async function postSamlSso(arg: { form: { SAMLRequest: string; RelayState?: string } }) {
  return await client['saml']['sso']['$post'](arg)
}

/**
 * GET /saml/slo
 *
 * Single Logout (HTTP-Redirect)
 *
 * HTTP-Redirect バインディングでのシングルログアウト
 */
export async function getSamlSlo(arg: {
  query: {
    SAMLRequest?: string
    SAMLResponse?: string
    RelayState?: string
    SigAlg?: string
    Signature?: string
  }
}) {
  return await client['saml']['slo']['$get'](arg)
}

/**
 * POST /saml/slo
 *
 * Single Logout (HTTP-POST)
 *
 * HTTP-POST バインディングでのシングルログアウト
 */
export async function postSamlSlo(arg: {
  form: { SAMLRequest?: string; SAMLResponse?: string; RelayState?: string }
}) {
  return await client['saml']['slo']['$post'](arg)
}

/**
 * POST /saml/acs
 *
 * Assertion Consumer Service
 *
 * SPからのSAMLレスポンスを処理（IdP-initiated の場合）
 */
export async function postSamlAcs(arg: { form: { SAMLResponse: string; RelayState?: string } }) {
  return await client['saml']['acs']['$post'](arg)
}

/**
 * GET /saml/metadata
 *
 * IdPメタデータ取得
 *
 * SAML 2.0 IdPメタデータをXML形式で取得
 */
export async function getSamlMetadata() {
  return await client['saml']['metadata']['$get']()
}

/**
 * GET /service-providers
 *
 * SP一覧取得
 */
export async function getServiceProviders(arg: { query: { search?: string; enabled?: string } }) {
  return await client['service-providers']['$get'](arg)
}

/**
 * POST /service-providers
 *
 * SP登録
 */
export async function postServiceProviders(arg: {
  json:
    | {
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
      }
    | string
}) {
  return await client['service-providers']['$post'](arg)
}

/**
 * GET /service-providers/{spId}
 *
 * SP詳細取得
 */
export async function getServiceProvidersSpId(arg: { param: { spId: string } }) {
  return await client['service-providers'][':spId']['$get'](arg)
}

/**
 * PUT /service-providers/{spId}
 *
 * SP更新
 */
export async function putServiceProvidersSpId(arg: {
  param: { spId: string }
  json: {
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
  }
}) {
  return await client['service-providers'][':spId']['$put'](arg)
}

/**
 * DELETE /service-providers/{spId}
 *
 * SP削除
 */
export async function deleteServiceProvidersSpId(arg: { param: { spId: string } }) {
  return await client['service-providers'][':spId']['$delete'](arg)
}

/**
 * GET /service-providers/{spId}/metadata
 *
 * SPメタデータ取得
 */
export async function getServiceProvidersSpIdMetadata(arg: { param: { spId: string } }) {
  return await client['service-providers'][':spId']['metadata']['$get'](arg)
}

/**
 * PUT /service-providers/{spId}/metadata
 *
 * SPメタデータ更新
 */
export async function putServiceProvidersSpIdMetadata(arg: {
  param: { spId: string }
  form: { file?: File }
  json: string
}) {
  return await client['service-providers'][':spId']['metadata']['$put'](arg)
}

/**
 * GET /service-providers/{spId}/attributes
 *
 * SP属性マッピング取得
 */
export async function getServiceProvidersSpIdAttributes(arg: { param: { spId: string } }) {
  return await client['service-providers'][':spId']['attributes']['$get'](arg)
}

/**
 * PUT /service-providers/{spId}/attributes
 *
 * SP属性マッピング更新
 */
export async function putServiceProvidersSpIdAttributes(arg: {
  param: { spId: string }
  json: {
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
  }[]
}) {
  return await client['service-providers'][':spId']['attributes']['$put'](arg)
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
export async function postCertificates(arg: {
  form: {
    certificate: File
    privateKey: File
    passphrase?: string
    purpose?: 'signing' | 'encryption' | 'both'
  }
}) {
  return await client.certificates.$post(arg)
}

/**
 * DELETE /certificates/{certId}
 *
 * 証明書削除
 */
export async function deleteCertificatesCertId(arg: { param: { certId: string } }) {
  return await client['certificates'][':certId']['$delete'](arg)
}

/**
 * POST /certificates/{certId}/activate
 *
 * 証明書有効化
 */
export async function postCertificatesCertIdActivate(arg: { param: { certId: string } }) {
  return await client['certificates'][':certId']['activate']['$post'](arg)
}

/**
 * GET /sessions
 *
 * アクティブセッション一覧
 */
export async function getSessions(arg: { query: { userId?: string } }) {
  return await client.sessions.$get(arg)
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション終了
 */
export async function deleteSessionsSessionId(arg: { param: { sessionId: string } }) {
  return await client['sessions'][':sessionId']['$delete'](arg)
}

/**
 * GET /audit-logs
 *
 * SAML監査ログ取得
 */
export async function getAuditLogs(arg: {
  query: {
    from?: string
    to?: string
    spId?: string
    userId?: string
    eventType?: 'sso_success' | 'sso_failure' | 'slo_success' | 'slo_failure'
    page?: number
    limit?: number
  }
}) {
  return await client['audit-logs']['$get'](arg)
}
