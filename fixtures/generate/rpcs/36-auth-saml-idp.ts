import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/36-auth-saml-idp'

/**
 * GET /saml/sso
 *
 * SSO (HTTP-Redirect binding)
 *
 * HTTP-Redirect バインディングでのSSO処理
 */
export async function getSamlSso(
  args: InferRequestType<typeof client.saml.sso.$get>,
  options?: ClientRequestOptions,
) {
  return await client.saml.sso.$get(args, options)
}

/**
 * POST /saml/sso
 *
 * SSO (HTTP-POST binding)
 *
 * HTTP-POST バインディングでのSSO処理
 */
export async function postSamlSso(
  args: InferRequestType<typeof client.saml.sso.$post>,
  options?: ClientRequestOptions,
) {
  return await client.saml.sso.$post(args, options)
}

/**
 * GET /saml/slo
 *
 * Single Logout (HTTP-Redirect)
 *
 * HTTP-Redirect バインディングでのシングルログアウト
 */
export async function getSamlSlo(
  args: InferRequestType<typeof client.saml.slo.$get>,
  options?: ClientRequestOptions,
) {
  return await client.saml.slo.$get(args, options)
}

/**
 * POST /saml/slo
 *
 * Single Logout (HTTP-POST)
 *
 * HTTP-POST バインディングでのシングルログアウト
 */
export async function postSamlSlo(
  args: InferRequestType<typeof client.saml.slo.$post>,
  options?: ClientRequestOptions,
) {
  return await client.saml.slo.$post(args, options)
}

/**
 * POST /saml/acs
 *
 * Assertion Consumer Service
 *
 * SPからのSAMLレスポンスを処理（IdP-initiated の場合）
 */
export async function postSamlAcs(
  args: InferRequestType<typeof client.saml.acs.$post>,
  options?: ClientRequestOptions,
) {
  return await client.saml.acs.$post(args, options)
}

/**
 * GET /saml/metadata
 *
 * IdPメタデータ取得
 *
 * SAML 2.0 IdPメタデータをXML形式で取得
 */
export async function getSamlMetadata(options?: ClientRequestOptions) {
  return await client.saml.metadata.$get(undefined, options)
}

/**
 * GET /service-providers
 *
 * SP一覧取得
 */
export async function getServiceProviders(
  args: InferRequestType<(typeof client)['service-providers']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['service-providers'].$get(args, options)
}

/**
 * POST /service-providers
 *
 * SP登録
 */
export async function postServiceProviders(
  args: InferRequestType<(typeof client)['service-providers']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['service-providers'].$post(args, options)
}

/**
 * GET /service-providers/{spId}
 *
 * SP詳細取得
 */
export async function getServiceProvidersSpId(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['service-providers'][':spId'].$get(args, options)
}

/**
 * PUT /service-providers/{spId}
 *
 * SP更新
 */
export async function putServiceProvidersSpId(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client['service-providers'][':spId'].$put(args, options)
}

/**
 * DELETE /service-providers/{spId}
 *
 * SP削除
 */
export async function deleteServiceProvidersSpId(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client['service-providers'][':spId'].$delete(args, options)
}

/**
 * GET /service-providers/{spId}/metadata
 *
 * SPメタデータ取得
 */
export async function getServiceProvidersSpIdMetadata(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['service-providers'][':spId'].metadata.$get(args, options)
}

/**
 * PUT /service-providers/{spId}/metadata
 *
 * SPメタデータ更新
 */
export async function putServiceProvidersSpIdMetadata(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client['service-providers'][':spId'].metadata.$put(args, options)
}

/**
 * GET /service-providers/{spId}/attributes
 *
 * SP属性マッピング取得
 */
export async function getServiceProvidersSpIdAttributes(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['service-providers'][':spId'].attributes.$get(args, options)
}

/**
 * PUT /service-providers/{spId}/attributes
 *
 * SP属性マッピング更新
 */
export async function putServiceProvidersSpIdAttributes(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client['service-providers'][':spId'].attributes.$put(args, options)
}

/**
 * GET /attributes
 *
 * 利用可能な属性一覧
 */
export async function getAttributes(options?: ClientRequestOptions) {
  return await client.attributes.$get(undefined, options)
}

/**
 * GET /certificates
 *
 * 証明書一覧取得
 */
export async function getCertificates(options?: ClientRequestOptions) {
  return await client.certificates.$get(undefined, options)
}

/**
 * POST /certificates
 *
 * 証明書アップロード
 */
export async function postCertificates(
  args: InferRequestType<typeof client.certificates.$post>,
  options?: ClientRequestOptions,
) {
  return await client.certificates.$post(args, options)
}

/**
 * DELETE /certificates/{certId}
 *
 * 証明書削除
 */
export async function deleteCertificatesCertId(
  args: InferRequestType<(typeof client.certificates)[':certId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.certificates[':certId'].$delete(args, options)
}

/**
 * POST /certificates/{certId}/activate
 *
 * 証明書有効化
 */
export async function postCertificatesCertIdActivate(
  args: InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.certificates[':certId'].activate.$post(args, options)
}

/**
 * GET /sessions
 *
 * アクティブセッション一覧
 */
export async function getSessions(
  args: InferRequestType<typeof client.sessions.$get>,
  options?: ClientRequestOptions,
) {
  return await client.sessions.$get(args, options)
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション終了
 */
export async function deleteSessionsSessionId(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.sessions[':sessionId'].$delete(args, options)
}

/**
 * GET /audit-logs
 *
 * SAML監査ログ取得
 */
export async function getAuditLogs(
  args: InferRequestType<(typeof client)['audit-logs']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['audit-logs'].$get(args, options)
}
