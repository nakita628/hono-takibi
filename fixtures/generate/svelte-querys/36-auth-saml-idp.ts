import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
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
export function createGetSamlSso(
  args: InferRequestType<typeof client.saml.sso.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.saml.sso.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSamlSsoQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.saml.sso.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /saml/sso
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
export function createPostSamlSso(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.saml.sso.$post> | undefined,
      Error,
      InferRequestType<typeof client.saml.sso.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetSamlSlo(
  args: InferRequestType<typeof client.saml.slo.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.saml.slo.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSamlSloQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.saml.slo.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /saml/slo
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
export function createPostSamlSlo(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.saml.slo.$post> | undefined,
      Error,
      InferRequestType<typeof client.saml.slo.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostSamlAcs(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.saml.acs.$post> | undefined,
      Error,
      InferRequestType<typeof client.saml.acs.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetSamlMetadata(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.saml.metadata.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSamlMetadataQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.saml.metadata.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /saml/metadata
 */
export function getGetSamlMetadataQueryKey() {
  return ['/saml/metadata'] as const
}

/**
 * GET /service-providers
 *
 * SP一覧取得
 */
export function createGetServiceProviders(
  args: InferRequestType<(typeof client)['service-providers']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['service-providers']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetServiceProvidersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['service-providers'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /service-providers
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
export function createPostServiceProviders(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['service-providers']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['service-providers']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetServiceProvidersSpId(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['service-providers'][':spId']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetServiceProvidersSpIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['service-providers'][':spId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /service-providers/{spId}
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
export function createPutServiceProvidersSpId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['service-providers'][':spId']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client)['service-providers'][':spId']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteServiceProvidersSpId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['service-providers'][':spId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetServiceProvidersSpIdMetadata(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetServiceProvidersSpIdMetadataQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['service-providers'][':spId'].metadata.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /service-providers/{spId}/metadata
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
export function createPutServiceProvidersSpIdMetadata(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client)['service-providers'][':spId']['metadata']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetServiceProvidersSpIdAttributes(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetServiceProvidersSpIdAttributesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['service-providers'][':spId'].attributes.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /service-providers/{spId}/attributes
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
export function createPutServiceProvidersSpIdAttributes(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client)['service-providers'][':spId']['attributes']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetAttributes(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.attributes.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAttributesQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.attributes.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /attributes
 */
export function getGetAttributesQueryKey() {
  return ['/attributes'] as const
}

/**
 * GET /certificates
 *
 * 証明書一覧取得
 */
export function createGetCertificates(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.certificates.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCertificatesQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.certificates.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /certificates
 */
export function getGetCertificatesQueryKey() {
  return ['/certificates'] as const
}

/**
 * POST /certificates
 *
 * 証明書アップロード
 */
export function createPostCertificates(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.certificates.$post> | undefined,
      Error,
      InferRequestType<typeof client.certificates.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteCertificatesCertId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.certificates)[':certId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.certificates)[':certId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostCertificatesCertIdActivate(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.certificates)[':certId']['activate']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetSessions(
  args: InferRequestType<typeof client.sessions.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.sessions.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSessionsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.sessions.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /sessions
 */
export function getGetSessionsQueryKey(args?: InferRequestType<typeof client.sessions.$get>) {
  return ['/sessions', ...(args ? [args] : [])] as const
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション終了
 */
export function createDeleteSessionsSessionId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.sessions)[':sessionId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetAuditLogs(
  args: InferRequestType<(typeof client)['audit-logs']['$get']>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client)['audit-logs']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAuditLogsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['audit-logs'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /audit-logs
 */
export function getGetAuditLogsQueryKey(
  args?: InferRequestType<(typeof client)['audit-logs']['$get']>,
) {
  return ['/audit-logs', ...(args ? [args] : [])] as const
}
