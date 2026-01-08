import type { InferRequestType } from 'hono/client'
import { client } from '../clients/36-auth-saml-idp'

/**
 * GET /saml/sso
 *
 * SSO (HTTP-Redirect binding)
 *
 * HTTP-Redirect バインディングでのSSO処理
 */
export async function getSamlSso(arg: InferRequestType<(typeof client)['saml']['sso']['$get']>) {
  return await client['saml']['sso']['$get'](arg)
}

/**
 * POST /saml/sso
 *
 * SSO (HTTP-POST binding)
 *
 * HTTP-POST バインディングでのSSO処理
 */
export async function postSamlSso(arg: InferRequestType<(typeof client)['saml']['sso']['$post']>) {
  return await client['saml']['sso']['$post'](arg)
}

/**
 * GET /saml/slo
 *
 * Single Logout (HTTP-Redirect)
 *
 * HTTP-Redirect バインディングでのシングルログアウト
 */
export async function getSamlSlo(arg: InferRequestType<(typeof client)['saml']['slo']['$get']>) {
  return await client['saml']['slo']['$get'](arg)
}

/**
 * POST /saml/slo
 *
 * Single Logout (HTTP-POST)
 *
 * HTTP-POST バインディングでのシングルログアウト
 */
export async function postSamlSlo(arg: InferRequestType<(typeof client)['saml']['slo']['$post']>) {
  return await client['saml']['slo']['$post'](arg)
}

/**
 * POST /saml/acs
 *
 * Assertion Consumer Service
 *
 * SPからのSAMLレスポンスを処理（IdP-initiated の場合）
 */
export async function postSamlAcs(arg: InferRequestType<(typeof client)['saml']['acs']['$post']>) {
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
export async function getServiceProviders(
  arg: InferRequestType<(typeof client)['service-providers']['$get']>,
) {
  return await client['service-providers']['$get'](arg)
}

/**
 * POST /service-providers
 *
 * SP登録
 */
export async function postServiceProviders(
  arg: InferRequestType<(typeof client)['service-providers']['$post']>,
) {
  return await client['service-providers']['$post'](arg)
}

/**
 * GET /service-providers/{spId}
 *
 * SP詳細取得
 */
export async function getServiceProvidersSpId(
  arg: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
) {
  return await client['service-providers'][':spId']['$get'](arg)
}

/**
 * PUT /service-providers/{spId}
 *
 * SP更新
 */
export async function putServiceProvidersSpId(
  arg: InferRequestType<(typeof client)['service-providers'][':spId']['$put']>,
) {
  return await client['service-providers'][':spId']['$put'](arg)
}

/**
 * DELETE /service-providers/{spId}
 *
 * SP削除
 */
export async function deleteServiceProvidersSpId(
  arg: InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>,
) {
  return await client['service-providers'][':spId']['$delete'](arg)
}

/**
 * GET /service-providers/{spId}/metadata
 *
 * SPメタデータ取得
 */
export async function getServiceProvidersSpIdMetadata(
  arg: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
) {
  return await client['service-providers'][':spId']['metadata']['$get'](arg)
}

/**
 * PUT /service-providers/{spId}/metadata
 *
 * SPメタデータ更新
 */
export async function putServiceProvidersSpIdMetadata(
  arg: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$put']>,
) {
  return await client['service-providers'][':spId']['metadata']['$put'](arg)
}

/**
 * GET /service-providers/{spId}/attributes
 *
 * SP属性マッピング取得
 */
export async function getServiceProvidersSpIdAttributes(
  arg: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
) {
  return await client['service-providers'][':spId']['attributes']['$get'](arg)
}

/**
 * PUT /service-providers/{spId}/attributes
 *
 * SP属性マッピング更新
 */
export async function putServiceProvidersSpIdAttributes(
  arg: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$put']>,
) {
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
export async function postCertificates(arg: InferRequestType<typeof client.certificates.$post>) {
  return await client.certificates.$post(arg)
}

/**
 * DELETE /certificates/{certId}
 *
 * 証明書削除
 */
export async function deleteCertificatesCertId(
  arg: InferRequestType<(typeof client)['certificates'][':certId']['$delete']>,
) {
  return await client['certificates'][':certId']['$delete'](arg)
}

/**
 * POST /certificates/{certId}/activate
 *
 * 証明書有効化
 */
export async function postCertificatesCertIdActivate(
  arg: InferRequestType<(typeof client)['certificates'][':certId']['activate']['$post']>,
) {
  return await client['certificates'][':certId']['activate']['$post'](arg)
}

/**
 * GET /sessions
 *
 * アクティブセッション一覧
 */
export async function getSessions(arg: InferRequestType<typeof client.sessions.$get>) {
  return await client.sessions.$get(arg)
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション終了
 */
export async function deleteSessionsSessionId(
  arg: InferRequestType<(typeof client)['sessions'][':sessionId']['$delete']>,
) {
  return await client['sessions'][':sessionId']['$delete'](arg)
}

/**
 * GET /audit-logs
 *
 * SAML監査ログ取得
 */
export async function getAuditLogs(arg: InferRequestType<(typeof client)['audit-logs']['$get']>) {
  return await client['audit-logs']['$get'](arg)
}
