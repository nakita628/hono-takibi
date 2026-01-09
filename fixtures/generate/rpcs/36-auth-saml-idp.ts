import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/36-auth-saml-idp'

/**
 * GET /saml/sso
 *
 * SSO (HTTP-Redirect binding)
 *
 * HTTP-Redirect バインディングでのSSO処理
 */
export async function getSamlSso(args: {
  query: { SAMLRequest: string; RelayState?: string; SigAlg?: string; Signature?: string }
  options?: ClientRequestOptions
}) {
  return await client['saml']['sso']['$get'](args)
}

/**
 * POST /saml/sso
 *
 * SSO (HTTP-POST binding)
 *
 * HTTP-POST バインディングでのSSO処理
 */
export async function postSamlSso(args: {
  form: { SAMLRequest: string; RelayState?: string }
  options?: ClientRequestOptions
}) {
  return await client['saml']['sso']['$post'](args)
}

/**
 * GET /saml/slo
 *
 * Single Logout (HTTP-Redirect)
 *
 * HTTP-Redirect バインディングでのシングルログアウト
 */
export async function getSamlSlo(args: {
  query: {
    SAMLRequest?: string
    SAMLResponse?: string
    RelayState?: string
    SigAlg?: string
    Signature?: string
  }
  options?: ClientRequestOptions
}) {
  return await client['saml']['slo']['$get'](args)
}

/**
 * POST /saml/slo
 *
 * Single Logout (HTTP-POST)
 *
 * HTTP-POST バインディングでのシングルログアウト
 */
export async function postSamlSlo(args: {
  form: { SAMLRequest?: string; SAMLResponse?: string; RelayState?: string }
  options?: ClientRequestOptions
}) {
  return await client['saml']['slo']['$post'](args)
}

/**
 * POST /saml/acs
 *
 * Assertion Consumer Service
 *
 * SPからのSAMLレスポンスを処理（IdP-initiated の場合）
 */
export async function postSamlAcs(args: {
  form: { SAMLResponse: string; RelayState?: string }
  options?: ClientRequestOptions
}) {
  return await client['saml']['acs']['$post'](args)
}

/**
 * GET /saml/metadata
 *
 * IdPメタデータ取得
 *
 * SAML 2.0 IdPメタデータをXML形式で取得
 */
export async function getSamlMetadata(args?: { options?: ClientRequestOptions }) {
  return await client['saml']['metadata']['$get'](args)
}

/**
 * GET /service-providers
 *
 * SP一覧取得
 */
export async function getServiceProviders(args: {
  query: { search?: string; enabled?: string }
  options?: ClientRequestOptions
}) {
  return await client['service-providers']['$get'](args)
}

/**
 * POST /service-providers
 *
 * SP登録
 */
export async function postServiceProviders(args: {
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
  options?: ClientRequestOptions
}) {
  return await client['service-providers']['$post'](args)
}

/**
 * GET /service-providers/{spId}
 *
 * SP詳細取得
 */
export async function getServiceProvidersSpId(args: {
  param: { spId: string }
  options?: ClientRequestOptions
}) {
  return await client['service-providers'][':spId']['$get'](args)
}

/**
 * PUT /service-providers/{spId}
 *
 * SP更新
 */
export async function putServiceProvidersSpId(args: {
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
  options?: ClientRequestOptions
}) {
  return await client['service-providers'][':spId']['$put'](args)
}

/**
 * DELETE /service-providers/{spId}
 *
 * SP削除
 */
export async function deleteServiceProvidersSpId(args: {
  param: { spId: string }
  options?: ClientRequestOptions
}) {
  return await client['service-providers'][':spId']['$delete'](args)
}

/**
 * GET /service-providers/{spId}/metadata
 *
 * SPメタデータ取得
 */
export async function getServiceProvidersSpIdMetadata(args: {
  param: { spId: string }
  options?: ClientRequestOptions
}) {
  return await client['service-providers'][':spId']['metadata']['$get'](args)
}

/**
 * PUT /service-providers/{spId}/metadata
 *
 * SPメタデータ更新
 */
export async function putServiceProvidersSpIdMetadata(args: {
  param: { spId: string }
  form: { file?: File }
  json: string
  options?: ClientRequestOptions
}) {
  return await client['service-providers'][':spId']['metadata']['$put'](args)
}

/**
 * GET /service-providers/{spId}/attributes
 *
 * SP属性マッピング取得
 */
export async function getServiceProvidersSpIdAttributes(args: {
  param: { spId: string }
  options?: ClientRequestOptions
}) {
  return await client['service-providers'][':spId']['attributes']['$get'](args)
}

/**
 * PUT /service-providers/{spId}/attributes
 *
 * SP属性マッピング更新
 */
export async function putServiceProvidersSpIdAttributes(args: {
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
  options?: ClientRequestOptions
}) {
  return await client['service-providers'][':spId']['attributes']['$put'](args)
}

/**
 * GET /attributes
 *
 * 利用可能な属性一覧
 */
export async function getAttributes(args?: { options?: ClientRequestOptions }) {
  return await client.attributes.$get(args)
}

/**
 * GET /certificates
 *
 * 証明書一覧取得
 */
export async function getCertificates(args?: { options?: ClientRequestOptions }) {
  return await client.certificates.$get(args)
}

/**
 * POST /certificates
 *
 * 証明書アップロード
 */
export async function postCertificates(args: {
  form: {
    certificate: File
    privateKey: File
    passphrase?: string
    purpose?: 'signing' | 'encryption' | 'both'
  }
  options?: ClientRequestOptions
}) {
  return await client.certificates.$post(args)
}

/**
 * DELETE /certificates/{certId}
 *
 * 証明書削除
 */
export async function deleteCertificatesCertId(args: {
  param: { certId: string }
  options?: ClientRequestOptions
}) {
  return await client['certificates'][':certId']['$delete'](args)
}

/**
 * POST /certificates/{certId}/activate
 *
 * 証明書有効化
 */
export async function postCertificatesCertIdActivate(args: {
  param: { certId: string }
  options?: ClientRequestOptions
}) {
  return await client['certificates'][':certId']['activate']['$post'](args)
}

/**
 * GET /sessions
 *
 * アクティブセッション一覧
 */
export async function getSessions(args: {
  query: { userId?: string }
  options?: ClientRequestOptions
}) {
  return await client.sessions.$get(args)
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション終了
 */
export async function deleteSessionsSessionId(args: {
  param: { sessionId: string }
  options?: ClientRequestOptions
}) {
  return await client['sessions'][':sessionId']['$delete'](args)
}

/**
 * GET /audit-logs
 *
 * SAML監査ログ取得
 */
export async function getAuditLogs(args: {
  query: {
    from?: string
    to?: string
    spId?: string
    userId?: string
    eventType?: 'sso_success' | 'sso_failure' | 'slo_success' | 'slo_failure'
    page?: number
    limit?: number
  }
  options?: ClientRequestOptions
}) {
  return await client['audit-logs']['$get'](args)
}
