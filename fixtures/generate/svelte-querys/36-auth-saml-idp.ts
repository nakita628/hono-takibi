import { createQuery, createMutation } from '@tanstack/svelte-query'
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSamlSsoQueryKey(args),
    queryFn: async () => parseResponse(client.saml.sso.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /saml/sso
 */
export function getGetSamlSsoQueryKey(args: InferRequestType<typeof client.saml.sso.$get>) {
  return ['/saml/sso', args] as const
}

/**
 * POST /saml/sso
 *
 * SSO (HTTP-POST binding)
 *
 * HTTP-POST バインディングでのSSO処理
 */
export function createPostSamlSso(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.saml.sso.$post>,
      variables: InferRequestType<typeof client.saml.sso.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.saml.sso.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.saml.sso.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.saml.sso.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.saml.sso.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.saml.sso.$post>) =>
      parseResponse(client.saml.sso.$post(args, clientOptions)),
    ...mutationOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSamlSloQueryKey(args),
    queryFn: async () => parseResponse(client.saml.slo.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /saml/slo
 */
export function getGetSamlSloQueryKey(args: InferRequestType<typeof client.saml.slo.$get>) {
  return ['/saml/slo', args] as const
}

/**
 * POST /saml/slo
 *
 * Single Logout (HTTP-POST)
 *
 * HTTP-POST バインディングでのシングルログアウト
 */
export function createPostSamlSlo(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.saml.slo.$post>,
      variables: InferRequestType<typeof client.saml.slo.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.saml.slo.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.saml.slo.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.saml.slo.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.saml.slo.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.saml.slo.$post>) =>
      parseResponse(client.saml.slo.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /saml/acs
 *
 * Assertion Consumer Service
 *
 * SPからのSAMLレスポンスを処理（IdP-initiated の場合）
 */
export function createPostSamlAcs(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.saml.acs.$post>,
      variables: InferRequestType<typeof client.saml.acs.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.saml.acs.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.saml.acs.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.saml.acs.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.saml.acs.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.saml.acs.$post>) =>
      parseResponse(client.saml.acs.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /saml/metadata
 *
 * IdPメタデータ取得
 *
 * SAML 2.0 IdPメタデータをXML形式で取得
 */
export function createGetSamlMetadata(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSamlMetadataQueryKey(),
    queryFn: async () => parseResponse(client.saml.metadata.$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetServiceProvidersQueryKey(args),
    queryFn: async () => parseResponse(client['service-providers'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /service-providers
 */
export function getGetServiceProvidersQueryKey(
  args: InferRequestType<(typeof client)['service-providers']['$get']>,
) {
  return ['/service-providers', args] as const
}

/**
 * POST /service-providers
 *
 * SP登録
 */
export function createPostServiceProviders(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['service-providers']['$post']>,
      variables: InferRequestType<(typeof client)['service-providers']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['service-providers']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['service-providers']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['service-providers']['$post']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)['service-providers']['$post']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['service-providers']['$post']>) =>
      parseResponse(client['service-providers'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /service-providers/{spId}
 *
 * SP詳細取得
 */
export function createGetServiceProvidersSpId(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetServiceProvidersSpIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client['service-providers'][':spId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /service-providers/{spId}
 */
export function getGetServiceProvidersSpIdQueryKey(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
) {
  return ['/service-providers/:spId', args] as const
}

/**
 * PUT /service-providers/{spId}
 *
 * SP更新
 */
export function createPutServiceProvidersSpId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['service-providers'][':spId']['$put']>,
      variables: InferRequestType<(typeof client)['service-providers'][':spId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['service-providers'][':spId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['service-providers'][':spId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['service-providers'][':spId']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['service-providers'][':spId']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['service-providers'][':spId']['$put']>,
    ) => parseResponse(client['service-providers'][':spId'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /service-providers/{spId}
 *
 * SP削除
 */
export function createDeleteServiceProvidersSpId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['service-providers'][':spId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['service-providers'][':spId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>,
    ) => parseResponse(client['service-providers'][':spId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /service-providers/{spId}/metadata
 *
 * SPメタデータ取得
 */
export function createGetServiceProvidersSpIdMetadata(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetServiceProvidersSpIdMetadataQueryKey(args),
    queryFn: async () =>
      parseResponse(client['service-providers'][':spId'].metadata.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /service-providers/{spId}/metadata
 */
export function getGetServiceProvidersSpIdMetadataQueryKey(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
) {
  return ['/service-providers/:spId/metadata', args] as const
}

/**
 * PUT /service-providers/{spId}/metadata
 *
 * SPメタデータ更新
 */
export function createPutServiceProvidersSpIdMetadata(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['service-providers'][':spId']['metadata']['$put']>,
      variables: InferRequestType<
        (typeof client)['service-providers'][':spId']['metadata']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['service-providers'][':spId']['metadata']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['service-providers'][':spId']['metadata']['$put']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['service-providers'][':spId']['metadata']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['service-providers'][':spId']['metadata']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$put']>,
    ) => parseResponse(client['service-providers'][':spId'].metadata.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /service-providers/{spId}/attributes
 *
 * SP属性マッピング取得
 */
export function createGetServiceProvidersSpIdAttributes(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetServiceProvidersSpIdAttributesQueryKey(args),
    queryFn: async () =>
      parseResponse(client['service-providers'][':spId'].attributes.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /service-providers/{spId}/attributes
 */
export function getGetServiceProvidersSpIdAttributesQueryKey(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
) {
  return ['/service-providers/:spId/attributes', args] as const
}

/**
 * PUT /service-providers/{spId}/attributes
 *
 * SP属性マッピング更新
 */
export function createPutServiceProvidersSpIdAttributes(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['service-providers'][':spId']['attributes']['$put']>,
      variables: InferRequestType<
        (typeof client)['service-providers'][':spId']['attributes']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['service-providers'][':spId']['attributes']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['service-providers'][':spId']['attributes']['$put']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['service-providers'][':spId']['attributes']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['service-providers'][':spId']['attributes']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$put']>,
    ) => parseResponse(client['service-providers'][':spId'].attributes.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /attributes
 *
 * 利用可能な属性一覧
 */
export function createGetAttributes(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAttributesQueryKey(),
    queryFn: async () => parseResponse(client.attributes.$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function createGetCertificates(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetCertificatesQueryKey(),
    queryFn: async () => parseResponse(client.certificates.$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function createPostCertificates(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.certificates.$post>,
      variables: InferRequestType<typeof client.certificates.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.certificates.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.certificates.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.certificates.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.certificates.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.certificates.$post>) =>
      parseResponse(client.certificates.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /certificates/{certId}
 *
 * 証明書削除
 */
export function createDeleteCertificatesCertId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.certificates)[':certId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.certificates)[':certId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.certificates)[':certId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.certificates)[':certId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.certificates)[':certId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.certificates)[':certId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.certificates)[':certId']['$delete']>,
    ) => parseResponse(client.certificates[':certId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /certificates/{certId}/activate
 *
 * 証明書有効化
 */
export function createPostCertificatesCertIdActivate(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.certificates)[':certId']['activate']['$post']>,
      variables: InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.certificates)[':certId']['activate']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>,
    ) => parseResponse(client.certificates[':certId'].activate.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /sessions
 *
 * アクティブセッション一覧
 */
export function createGetSessions(
  args: InferRequestType<typeof client.sessions.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSessionsQueryKey(args),
    queryFn: async () => parseResponse(client.sessions.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /sessions
 */
export function getGetSessionsQueryKey(args: InferRequestType<typeof client.sessions.$get>) {
  return ['/sessions', args] as const
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション終了
 */
export function createDeleteSessionsSessionId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.sessions)[':sessionId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.sessions)[':sessionId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>) =>
      parseResponse(client.sessions[':sessionId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /audit-logs
 *
 * SAML監査ログ取得
 */
export function createGetAuditLogs(
  args: InferRequestType<(typeof client)['audit-logs']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAuditLogsQueryKey(args),
    queryFn: async () => parseResponse(client['audit-logs'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /audit-logs
 */
export function getGetAuditLogsQueryKey(
  args: InferRequestType<(typeof client)['audit-logs']['$get']>,
) {
  return ['/audit-logs', args] as const
}
