import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/36-auth-saml-idp'

/**
 * GET /saml/sso
 *
 * SSO (HTTP-Redirect binding)
 *
 * HTTP-Redirect バインディングでのSSO処理
 */
export function useGetSamlSso(
  args: InferRequestType<typeof client.saml.sso.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSamlSsoKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.saml.sso.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /saml/sso
 */
export function getGetSamlSsoKey(args?: InferRequestType<typeof client.saml.sso.$get>) {
  return ['/saml/sso', ...(args ? [args] : [])] as const
}

/**
 * POST /saml/sso
 *
 * SSO (HTTP-POST binding)
 *
 * HTTP-POST バインディングでのSSO処理
 */
export function usePostSamlSso(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /saml/sso',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.saml.sso.$post> }) =>
      parseResponse(client.saml.sso.$post(arg, options?.client)),
  )
}

/**
 * GET /saml/slo
 *
 * Single Logout (HTTP-Redirect)
 *
 * HTTP-Redirect バインディングでのシングルログアウト
 */
export function useGetSamlSlo(
  args: InferRequestType<typeof client.saml.slo.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSamlSloKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.saml.slo.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /saml/slo
 */
export function getGetSamlSloKey(args?: InferRequestType<typeof client.saml.slo.$get>) {
  return ['/saml/slo', ...(args ? [args] : [])] as const
}

/**
 * POST /saml/slo
 *
 * Single Logout (HTTP-POST)
 *
 * HTTP-POST バインディングでのシングルログアウト
 */
export function usePostSamlSlo(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /saml/slo',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.saml.slo.$post> }) =>
      parseResponse(client.saml.slo.$post(arg, options?.client)),
  )
}

/**
 * POST /saml/acs
 *
 * Assertion Consumer Service
 *
 * SPからのSAMLレスポンスを処理（IdP-initiated の場合）
 */
export function usePostSamlAcs(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /saml/acs',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.saml.acs.$post> }) =>
      parseResponse(client.saml.acs.$post(arg, options?.client)),
  )
}

/**
 * GET /saml/metadata
 *
 * IdPメタデータ取得
 *
 * SAML 2.0 IdPメタデータをXML形式で取得
 */
export function useGetSamlMetadata(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSamlMetadataKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.saml.metadata.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /saml/metadata
 */
export function getGetSamlMetadataKey() {
  return ['/saml/metadata'] as const
}

/**
 * GET /service-providers
 *
 * SP一覧取得
 */
export function useGetServiceProviders(
  args: InferRequestType<(typeof client)['service-providers']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetServiceProvidersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['service-providers'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /service-providers
 */
export function getGetServiceProvidersKey(
  args?: InferRequestType<(typeof client)['service-providers']['$get']>,
) {
  return ['/service-providers', ...(args ? [args] : [])] as const
}

/**
 * POST /service-providers
 *
 * SP登録
 */
export function usePostServiceProviders(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /service-providers',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['service-providers']['$post']> },
    ) => parseResponse(client['service-providers'].$post(arg, options?.client)),
  )
}

/**
 * GET /service-providers/{spId}
 *
 * SP詳細取得
 */
export function useGetServiceProvidersSpId(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetServiceProvidersSpIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['service-providers'][':spId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /service-providers/{spId}
 */
export function getGetServiceProvidersSpIdKey(
  args?: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
) {
  return ['/service-providers/:spId', ...(args ? [args] : [])] as const
}

/**
 * PUT /service-providers/{spId}
 *
 * SP更新
 */
export function usePutServiceProvidersSpId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /service-providers/:spId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['service-providers'][':spId']['$put']> },
    ) => parseResponse(client['service-providers'][':spId'].$put(arg, options?.client)),
  )
}

/**
 * DELETE /service-providers/{spId}
 *
 * SP削除
 */
export function useDeleteServiceProvidersSpId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /service-providers/:spId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['service-providers'][':spId']['$delete']> },
    ) => parseResponse(client['service-providers'][':spId'].$delete(arg, options?.client)),
  )
}

/**
 * GET /service-providers/{spId}/metadata
 *
 * SPメタデータ取得
 */
export function useGetServiceProvidersSpIdMetadata(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetServiceProvidersSpIdMetadataKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client['service-providers'][':spId'].metadata.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /service-providers/{spId}/metadata
 */
export function getGetServiceProvidersSpIdMetadataKey(
  args?: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
) {
  return ['/service-providers/:spId/metadata', ...(args ? [args] : [])] as const
}

/**
 * PUT /service-providers/{spId}/metadata
 *
 * SPメタデータ更新
 */
export function usePutServiceProvidersSpIdMetadata(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /service-providers/:spId/metadata',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$put']>
      },
    ) => parseResponse(client['service-providers'][':spId'].metadata.$put(arg, options?.client)),
  )
}

/**
 * GET /service-providers/{spId}/attributes
 *
 * SP属性マッピング取得
 */
export function useGetServiceProvidersSpIdAttributes(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetServiceProvidersSpIdAttributesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client['service-providers'][':spId'].attributes.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /service-providers/{spId}/attributes
 */
export function getGetServiceProvidersSpIdAttributesKey(
  args?: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
) {
  return ['/service-providers/:spId/attributes', ...(args ? [args] : [])] as const
}

/**
 * PUT /service-providers/{spId}/attributes
 *
 * SP属性マッピング更新
 */
export function usePutServiceProvidersSpIdAttributes(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'PUT /service-providers/:spId/attributes',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$put']>
      },
    ) => parseResponse(client['service-providers'][':spId'].attributes.$put(arg, options?.client)),
  )
}

/**
 * GET /attributes
 *
 * 利用可能な属性一覧
 */
export function useGetAttributes(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAttributesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.attributes.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /attributes
 */
export function getGetAttributesKey() {
  return ['/attributes'] as const
}

/**
 * GET /certificates
 *
 * 証明書一覧取得
 */
export function useGetCertificates(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCertificatesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.certificates.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /certificates
 */
export function getGetCertificatesKey() {
  return ['/certificates'] as const
}

/**
 * POST /certificates
 *
 * 証明書アップロード
 */
export function usePostCertificates(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /certificates',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.certificates.$post> }) =>
      parseResponse(client.certificates.$post(arg, options?.client)),
  )
}

/**
 * DELETE /certificates/{certId}
 *
 * 証明書削除
 */
export function useDeleteCertificatesCertId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /certificates/:certId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.certificates)[':certId']['$delete']> },
    ) => parseResponse(client.certificates[':certId'].$delete(arg, options?.client)),
  )
}

/**
 * POST /certificates/{certId}/activate
 *
 * 証明書有効化
 */
export function usePostCertificatesCertIdActivate(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'POST /certificates/:certId/activate',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']> },
    ) => parseResponse(client.certificates[':certId'].activate.$post(arg, options?.client)),
  )
}

/**
 * GET /sessions
 *
 * アクティブセッション一覧
 */
export function useGetSessions(
  args: InferRequestType<typeof client.sessions.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSessionsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions
 */
export function getGetSessionsKey(args?: InferRequestType<typeof client.sessions.$get>) {
  return ['/sessions', ...(args ? [args] : [])] as const
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション終了
 */
export function useDeleteSessionsSessionId(options?: { client?: ClientRequestOptions }) {
  return useSWRMutation(
    'DELETE /sessions/:sessionId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']> },
    ) => parseResponse(client.sessions[':sessionId'].$delete(arg, options?.client)),
  )
}

/**
 * GET /audit-logs
 *
 * SAML監査ログ取得
 */
export function useGetAuditLogs(
  args: InferRequestType<(typeof client)['audit-logs']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetAuditLogsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['audit-logs'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /audit-logs
 */
export function getGetAuditLogsKey(args?: InferRequestType<(typeof client)['audit-logs']['$get']>) {
  return ['/audit-logs', ...(args ? [args] : [])] as const
}
