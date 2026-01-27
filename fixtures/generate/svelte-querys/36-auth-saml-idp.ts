import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/36-auth-saml-idp'

/**
 * Generates Svelte Query cache key for GET /saml/sso
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetSamlSsoQueryKey(args: InferRequestType<typeof client.saml.sso.$get>) {
  return ['saml', '/saml/sso', args] as const
}

/**
 * Returns Svelte Query query options for GET /saml/sso
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSamlSsoQueryOptions = (
  args: InferRequestType<typeof client.saml.sso.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSamlSsoQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.saml.sso.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /saml/sso
 *
 * SSO (HTTP-Redirect binding)
 *
 * HTTP-Redirect バインディングでのSSO処理
 */
export function createGetSamlSso(
  args: InferRequestType<typeof client.saml.sso.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.sso.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSamlSsoQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * POST /saml/sso
 *
 * SSO (HTTP-POST binding)
 *
 * HTTP-POST バインディングでのSSO処理
 */
export function createPostSamlSso(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.sso.$post>>>>>,
    Error,
    InferRequestType<typeof client.saml.sso.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.saml.sso.$post>) =>
      parseResponse(client.saml.sso.$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /saml/slo
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetSamlSloQueryKey(args: InferRequestType<typeof client.saml.slo.$get>) {
  return ['saml', '/saml/slo', args] as const
}

/**
 * Returns Svelte Query query options for GET /saml/slo
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSamlSloQueryOptions = (
  args: InferRequestType<typeof client.saml.slo.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSamlSloQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.saml.slo.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /saml/slo
 *
 * Single Logout (HTTP-Redirect)
 *
 * HTTP-Redirect バインディングでのシングルログアウト
 */
export function createGetSamlSlo(
  args: InferRequestType<typeof client.saml.slo.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.slo.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSamlSloQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * POST /saml/slo
 *
 * Single Logout (HTTP-POST)
 *
 * HTTP-POST バインディングでのシングルログアウト
 */
export function createPostSamlSlo(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.slo.$post>>>>>,
    Error,
    InferRequestType<typeof client.saml.slo.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.saml.slo.$post>) =>
      parseResponse(client.saml.slo.$post(args, clientOptions)),
  }))
}

/**
 * POST /saml/acs
 *
 * Assertion Consumer Service
 *
 * SPからのSAMLレスポンスを処理（IdP-initiated の場合）
 */
export function createPostSamlAcs(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.acs.$post>>>>>,
    Error,
    InferRequestType<typeof client.saml.acs.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.saml.acs.$post>) =>
      parseResponse(client.saml.acs.$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /saml/metadata
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSamlMetadataQueryKey() {
  return ['saml', '/saml/metadata'] as const
}

/**
 * Returns Svelte Query query options for GET /saml/metadata
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSamlMetadataQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSamlMetadataQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.saml.metadata.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /saml/metadata
 *
 * IdPメタデータ取得
 *
 * SAML 2.0 IdPメタデータをXML形式で取得
 */
export function createGetSamlMetadata(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.metadata.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSamlMetadataQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /service-providers
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetServiceProvidersQueryKey(
  args: InferRequestType<(typeof client)['service-providers']['$get']>,
) {
  return ['service-providers', '/service-providers', args] as const
}

/**
 * Returns Svelte Query query options for GET /service-providers
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetServiceProvidersQueryOptions = (
  args: InferRequestType<(typeof client)['service-providers']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetServiceProvidersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['service-providers'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /service-providers
 *
 * SP一覧取得
 */
export function createGetServiceProviders(
  args: InferRequestType<(typeof client)['service-providers']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['service-providers']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetServiceProvidersQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * POST /service-providers
 *
 * SP登録
 */
export function createPostServiceProviders(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['service-providers']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client)['service-providers']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['service-providers']['$post']>) =>
      parseResponse(client['service-providers'].$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /service-providers/{spId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetServiceProvidersSpIdQueryKey(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
) {
  return ['service-providers', '/service-providers/:spId', args] as const
}

/**
 * Returns Svelte Query query options for GET /service-providers/{spId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetServiceProvidersSpIdQueryOptions = (
  args: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetServiceProvidersSpIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['service-providers'][':spId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /service-providers/{spId}
 *
 * SP詳細取得
 */
export function createGetServiceProvidersSpId(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['service-providers'][':spId']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetServiceProvidersSpIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * PUT /service-providers/{spId}
 *
 * SP更新
 */
export function createPutServiceProvidersSpId(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['service-providers'][':spId']['$put']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client)['service-providers'][':spId']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['service-providers'][':spId']['$put']>,
    ) => parseResponse(client['service-providers'][':spId'].$put(args, clientOptions)),
  }))
}

/**
 * DELETE /service-providers/{spId}
 *
 * SP削除
 */
export function createDeleteServiceProvidersSpId(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['service-providers'][':spId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>,
    ) => parseResponse(client['service-providers'][':spId'].$delete(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /service-providers/{spId}/metadata
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetServiceProvidersSpIdMetadataQueryKey(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
) {
  return ['service-providers', '/service-providers/:spId/metadata', args] as const
}

/**
 * Returns Svelte Query query options for GET /service-providers/{spId}/metadata
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetServiceProvidersSpIdMetadataQueryOptions = (
  args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetServiceProvidersSpIdMetadataQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['service-providers'][':spId'].metadata.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /service-providers/{spId}/metadata
 *
 * SPメタデータ取得
 */
export function createGetServiceProvidersSpIdMetadata(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['service-providers'][':spId']['metadata']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetServiceProvidersSpIdMetadataQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * PUT /service-providers/{spId}/metadata
 *
 * SPメタデータ更新
 */
export function createPutServiceProvidersSpIdMetadata(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['service-providers'][':spId']['metadata']['$put']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$put']>,
    ) => parseResponse(client['service-providers'][':spId'].metadata.$put(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /service-providers/{spId}/attributes
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetServiceProvidersSpIdAttributesQueryKey(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
) {
  return ['service-providers', '/service-providers/:spId/attributes', args] as const
}

/**
 * Returns Svelte Query query options for GET /service-providers/{spId}/attributes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetServiceProvidersSpIdAttributesQueryOptions = (
  args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetServiceProvidersSpIdAttributesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['service-providers'][':spId'].attributes.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /service-providers/{spId}/attributes
 *
 * SP属性マッピング取得
 */
export function createGetServiceProvidersSpIdAttributes(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['service-providers'][':spId']['attributes']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetServiceProvidersSpIdAttributesQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * PUT /service-providers/{spId}/attributes
 *
 * SP属性マッピング更新
 */
export function createPutServiceProvidersSpIdAttributes(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['service-providers'][':spId']['attributes']['$put']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$put']>,
    ) => parseResponse(client['service-providers'][':spId'].attributes.$put(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /attributes
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetAttributesQueryKey() {
  return ['attributes', '/attributes'] as const
}

/**
 * Returns Svelte Query query options for GET /attributes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAttributesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAttributesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.attributes.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /attributes
 *
 * 利用可能な属性一覧
 */
export function createGetAttributes(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.attributes.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAttributesQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /certificates
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetCertificatesQueryKey() {
  return ['certificates', '/certificates'] as const
}

/**
 * Returns Svelte Query query options for GET /certificates
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCertificatesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetCertificatesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.certificates.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /certificates
 *
 * 証明書一覧取得
 */
export function createGetCertificates(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.certificates.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetCertificatesQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * POST /certificates
 *
 * 証明書アップロード
 */
export function createPostCertificates(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.certificates.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.certificates.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.certificates.$post>) =>
      parseResponse(client.certificates.$post(args, clientOptions)),
  }))
}

/**
 * DELETE /certificates/{certId}
 *
 * 証明書削除
 */
export function createDeleteCertificatesCertId(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.certificates)[':certId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.certificates)[':certId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.certificates)[':certId']['$delete']>,
    ) => parseResponse(client.certificates[':certId'].$delete(args, clientOptions)),
  }))
}

/**
 * POST /certificates/{certId}/activate
 *
 * 証明書有効化
 */
export function createPostCertificatesCertIdActivate(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.certificates)[':certId']['activate']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>,
    ) => parseResponse(client.certificates[':certId'].activate.$post(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /sessions
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetSessionsQueryKey(args: InferRequestType<typeof client.sessions.$get>) {
  return ['sessions', '/sessions', args] as const
}

/**
 * Returns Svelte Query query options for GET /sessions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsQueryOptions = (
  args: InferRequestType<typeof client.sessions.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSessionsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.sessions.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /sessions
 *
 * アクティブセッション一覧
 */
export function createGetSessions(
  args: InferRequestType<typeof client.sessions.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.sessions.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSessionsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション終了
 */
export function createDeleteSessionsSessionId(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.sessions)[':sessionId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>) =>
      parseResponse(client.sessions[':sessionId'].$delete(args, clientOptions)),
  }))
}

/**
 * Generates Svelte Query cache key for GET /audit-logs
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetAuditLogsQueryKey(
  args: InferRequestType<(typeof client)['audit-logs']['$get']>,
) {
  return ['audit-logs', '/audit-logs', args] as const
}

/**
 * Returns Svelte Query query options for GET /audit-logs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAuditLogsQueryOptions = (
  args: InferRequestType<(typeof client)['audit-logs']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAuditLogsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['audit-logs'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /audit-logs
 *
 * SAML監査ログ取得
 */
export function createGetAuditLogs(
  args: InferRequestType<(typeof client)['audit-logs']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['audit-logs']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAuditLogsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
