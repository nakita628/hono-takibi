import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/36-auth-saml-idp'

/**
 * Generates SWR cache key for GET /saml/sso
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetSamlSsoKey(args: InferRequestType<typeof client.saml.sso.$get>) {
  return ['/saml/sso', args] as const
}

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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSamlSsoKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.saml.sso.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /saml/sso
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostSamlSsoMutationKey() {
  return ['/saml/sso'] as const
}

/**
 * POST /saml/sso
 *
 * SSO (HTTP-POST binding)
 *
 * HTTP-POST バインディングでのSSO処理
 */
export function usePostSamlSso(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.sso.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.saml.sso.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSamlSsoMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.saml.sso.$post> }) =>
        parseResponse(client.saml.sso.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /saml/slo
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetSamlSloKey(args: InferRequestType<typeof client.saml.slo.$get>) {
  return ['/saml/slo', args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSamlSloKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.saml.slo.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /saml/slo
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostSamlSloMutationKey() {
  return ['/saml/slo'] as const
}

/**
 * POST /saml/slo
 *
 * Single Logout (HTTP-POST)
 *
 * HTTP-POST バインディングでのシングルログアウト
 */
export function usePostSamlSlo(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.slo.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.saml.slo.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSamlSloMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.saml.slo.$post> }) =>
        parseResponse(client.saml.slo.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /saml/acs
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostSamlAcsMutationKey() {
  return ['/saml/acs'] as const
}

/**
 * POST /saml/acs
 *
 * Assertion Consumer Service
 *
 * SPからのSAMLレスポンスを処理（IdP-initiated の場合）
 */
export function usePostSamlAcs(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.acs.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.saml.acs.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSamlAcsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.saml.acs.$post> }) =>
        parseResponse(client.saml.acs.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /saml/metadata
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetSamlMetadataKey() {
  return ['/saml/metadata'] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSamlMetadataKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.saml.metadata.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /service-providers
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetServiceProvidersKey(
  args: InferRequestType<(typeof client)['service-providers']['$get']>,
) {
  return ['/service-providers', args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetServiceProvidersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['service-providers'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /service-providers
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostServiceProvidersMutationKey() {
  return ['/service-providers'] as const
}

/**
 * POST /service-providers
 *
 * SP登録
 */
export function usePostServiceProviders(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['service-providers']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['service-providers']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostServiceProvidersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['service-providers']['$post']> },
      ) => parseResponse(client['service-providers'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /service-providers/{spId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetServiceProvidersSpIdKey(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
) {
  return [`/service-providers/${args.param.spId}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetServiceProvidersSpIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['service-providers'][':spId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /service-providers/{spId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutServiceProvidersSpIdMutationKey() {
  return ['/service-providers/:spId'] as const
}

/**
 * PUT /service-providers/{spId}
 *
 * SP更新
 */
export function usePutServiceProvidersSpId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['service-providers'][':spId']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['service-providers'][':spId']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutServiceProvidersSpIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['service-providers'][':spId']['$put']> },
      ) => parseResponse(client['service-providers'][':spId'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /service-providers/{spId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteServiceProvidersSpIdMutationKey() {
  return ['/service-providers/:spId'] as const
}

/**
 * DELETE /service-providers/{spId}
 *
 * SP削除
 */
export function useDeleteServiceProvidersSpId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['service-providers'][':spId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteServiceProvidersSpIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client)['service-providers'][':spId']['$delete']> },
      ) => parseResponse(client['service-providers'][':spId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /service-providers/{spId}/metadata
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetServiceProvidersSpIdMetadataKey(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
) {
  return [`/service-providers/${args.param.spId}/metadata`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetServiceProvidersSpIdMetadataKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client['service-providers'][':spId'].metadata.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /service-providers/{spId}/metadata
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutServiceProvidersSpIdMetadataMutationKey() {
  return ['/service-providers/:spId/metadata'] as const
}

/**
 * PUT /service-providers/{spId}/metadata
 *
 * SPメタデータ更新
 */
export function usePutServiceProvidersSpIdMetadata(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['service-providers'][':spId']['metadata']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutServiceProvidersSpIdMetadataMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$put']>
        },
      ) => parseResponse(client['service-providers'][':spId'].metadata.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /service-providers/{spId}/attributes
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetServiceProvidersSpIdAttributesKey(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
) {
  return [`/service-providers/${args.param.spId}/attributes`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetServiceProvidersSpIdAttributesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client['service-providers'][':spId'].attributes.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /service-providers/{spId}/attributes
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutServiceProvidersSpIdAttributesMutationKey() {
  return ['/service-providers/:spId/attributes'] as const
}

/**
 * PUT /service-providers/{spId}/attributes
 *
 * SP属性マッピング更新
 */
export function usePutServiceProvidersSpIdAttributes(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['service-providers'][':spId']['attributes']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutServiceProvidersSpIdAttributesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$put']>
        },
      ) => parseResponse(client['service-providers'][':spId'].attributes.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /attributes
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetAttributesKey() {
  return ['/attributes'] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAttributesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.attributes.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /certificates
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetCertificatesKey() {
  return ['/certificates'] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetCertificatesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.certificates.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /certificates
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostCertificatesMutationKey() {
  return ['/certificates'] as const
}

/**
 * POST /certificates
 *
 * 証明書アップロード
 */
export function usePostCertificates(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.certificates.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.certificates.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostCertificatesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.certificates.$post> }) =>
        parseResponse(client.certificates.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /certificates/{certId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteCertificatesCertIdMutationKey() {
  return ['/certificates/:certId'] as const
}

/**
 * DELETE /certificates/{certId}
 *
 * 証明書削除
 */
export function useDeleteCertificatesCertId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.certificates)[':certId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.certificates)[':certId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteCertificatesCertIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.certificates)[':certId']['$delete']> },
      ) => parseResponse(client.certificates[':certId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /certificates/{certId}/activate
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostCertificatesCertIdActivateMutationKey() {
  return ['/certificates/:certId/activate'] as const
}

/**
 * POST /certificates/{certId}/activate
 *
 * 証明書有効化
 */
export function usePostCertificatesCertIdActivate(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.certificates)[':certId']['activate']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostCertificatesCertIdActivateMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']> },
      ) => parseResponse(client.certificates[':certId'].activate.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetSessionsKey(args: InferRequestType<typeof client.sessions.$get>) {
  return ['/sessions', args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSessionsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /sessions/{sessionId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteSessionsSessionIdMutationKey() {
  return ['/sessions/:sessionId'] as const
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション終了
 */
export function useDeleteSessionsSessionId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.sessions)[':sessionId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteSessionsSessionIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']> },
      ) => parseResponse(client.sessions[':sessionId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /audit-logs
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetAuditLogsKey(args: InferRequestType<(typeof client)['audit-logs']['$get']>) {
  return ['/audit-logs', args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAuditLogsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['audit-logs'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}
