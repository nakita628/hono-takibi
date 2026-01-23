import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.saml.sso.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSamlSsoQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.saml.sso.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /saml/sso
 */
export function getGetSamlSsoQueryKey(args?: InferRequestType<typeof client.saml.sso.$get>) {
  return ['/saml/sso', ...(args ? [args] : [])] as const
}

/**
 * POST /saml/sso
 *
 * SSO (HTTP-POST binding)
 *
 * HTTP-POST バインディングでのSSO処理
 */
export function usePostSamlSso(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.saml.sso.$post> | undefined,
      Error,
      InferRequestType<typeof client.saml.sso.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.saml.sso.$post> | undefined,
    Error,
    InferRequestType<typeof client.saml.sso.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.saml.sso.$post(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.saml.slo.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSamlSloQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.saml.slo.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /saml/slo
 */
export function getGetSamlSloQueryKey(args?: InferRequestType<typeof client.saml.slo.$get>) {
  return ['/saml/slo', ...(args ? [args] : [])] as const
}

/**
 * POST /saml/slo
 *
 * Single Logout (HTTP-POST)
 *
 * HTTP-POST バインディングでのシングルログアウト
 */
export function usePostSamlSlo(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.saml.slo.$post> | undefined,
      Error,
      InferRequestType<typeof client.saml.slo.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.saml.slo.$post> | undefined,
    Error,
    InferRequestType<typeof client.saml.slo.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.saml.slo.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /saml/acs
 *
 * Assertion Consumer Service
 *
 * SPからのSAMLレスポンスを処理（IdP-initiated の場合）
 */
export function usePostSamlAcs(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.saml.acs.$post> | undefined,
      Error,
      InferRequestType<typeof client.saml.acs.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.saml.acs.$post> | undefined,
    Error,
    InferRequestType<typeof client.saml.acs.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.saml.acs.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /saml/metadata
 *
 * IdPメタデータ取得
 *
 * SAML 2.0 IdPメタデータをXML形式で取得
 */
export function useGetSamlMetadata(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.saml.metadata.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSamlMetadataQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.saml.metadata.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /saml/metadata
 */
export function getGetSamlMetadataQueryKey() {
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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['service-providers']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetServiceProvidersQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['service-providers'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /service-providers
 */
export function getGetServiceProvidersQueryKey(
  args?: InferRequestType<(typeof client)['service-providers']['$get']>,
) {
  return ['/service-providers', ...(args ? [args] : [])] as const
}

/**
 * POST /service-providers
 *
 * SP登録
 */
export function usePostServiceProviders(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['service-providers']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['service-providers']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['service-providers']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['service-providers']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['service-providers'].$post(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client)['service-providers'][':spId']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetServiceProvidersSpIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client['service-providers'][':spId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /service-providers/{spId}
 */
export function getGetServiceProvidersSpIdQueryKey(
  args?: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
) {
  return ['/service-providers/:spId', ...(args ? [args] : [])] as const
}

/**
 * PUT /service-providers/{spId}
 *
 * SP更新
 */
export function usePutServiceProvidersSpId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['service-providers'][':spId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client)['service-providers'][':spId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['service-providers'][':spId']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client)['service-providers'][':spId']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['service-providers'][':spId'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /service-providers/{spId}
 *
 * SP削除
 */
export function useDeleteServiceProvidersSpId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['service-providers'][':spId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['service-providers'][':spId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['service-providers'][':spId'].$delete(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetServiceProvidersSpIdMetadataQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client['service-providers'][':spId'].metadata.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /service-providers/{spId}/metadata
 */
export function getGetServiceProvidersSpIdMetadataQueryKey(
  args?: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
) {
  return ['/service-providers/:spId/metadata', ...(args ? [args] : [])] as const
}

/**
 * PUT /service-providers/{spId}/metadata
 *
 * SPメタデータ更新
 */
export function usePutServiceProvidersSpIdMetadata(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client)['service-providers'][':spId']['metadata']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client)['service-providers'][':spId']['metadata']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['service-providers'][':spId'].metadata.$put(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetServiceProvidersSpIdAttributesQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client['service-providers'][':spId'].attributes.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /service-providers/{spId}/attributes
 */
export function getGetServiceProvidersSpIdAttributesQueryKey(
  args?: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
) {
  return ['/service-providers/:spId/attributes', ...(args ? [args] : [])] as const
}

/**
 * PUT /service-providers/{spId}/attributes
 *
 * SP属性マッピング更新
 */
export function usePutServiceProvidersSpIdAttributes(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client)['service-providers'][':spId']['attributes']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client)['service-providers'][':spId']['attributes']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['service-providers'][':spId'].attributes.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /attributes
 *
 * 利用可能な属性一覧
 */
export function useGetAttributes(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.attributes.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAttributesQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.attributes.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /attributes
 */
export function getGetAttributesQueryKey() {
  return ['/attributes'] as const
}

/**
 * GET /certificates
 *
 * 証明書一覧取得
 */
export function useGetCertificates(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.certificates.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCertificatesQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.certificates.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /certificates
 */
export function getGetCertificatesQueryKey() {
  return ['/certificates'] as const
}

/**
 * POST /certificates
 *
 * 証明書アップロード
 */
export function usePostCertificates(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.certificates.$post> | undefined,
      Error,
      InferRequestType<typeof client.certificates.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.certificates.$post> | undefined,
    Error,
    InferRequestType<typeof client.certificates.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.certificates.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /certificates/{certId}
 *
 * 証明書削除
 */
export function useDeleteCertificatesCertId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.certificates)[':certId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.certificates)[':certId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.certificates)[':certId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.certificates)[':certId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.certificates[':certId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /certificates/{certId}/activate
 *
 * 証明書有効化
 */
export function usePostCertificatesCertIdActivate(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.certificates)[':certId']['activate']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.certificates)[':certId']['activate']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.certificates[':certId'].activate.$post(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.sessions.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSessionsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.sessions.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /sessions
 */
export function getGetSessionsQueryKey(args?: InferRequestType<typeof client.sessions.$get>) {
  return ['/sessions', ...(args ? [args] : [])] as const
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション終了
 */
export function useDeleteSessionsSessionId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.sessions)[':sessionId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.sessions)[':sessionId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.sessions[':sessionId'].$delete(args, options?.client)),
    },
    queryClient,
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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['audit-logs']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAuditLogsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['audit-logs'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /audit-logs
 */
export function getGetAuditLogsQueryKey(
  args?: InferRequestType<(typeof client)['audit-logs']['$get']>,
) {
  return ['/audit-logs', ...(args ? [args] : [])] as const
}
