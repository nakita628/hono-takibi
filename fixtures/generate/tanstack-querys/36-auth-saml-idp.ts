import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
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
  return useQuery({ ...getGetSamlSsoQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /saml/sso
 */
export function getGetSamlSsoQueryKey(args: InferRequestType<typeof client.saml.sso.$get>) {
  return ['/saml/sso', args] as const
}

/**
 * Returns TanStack Query query options for GET /saml/sso
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSamlSsoQueryOptions = (
  args: InferRequestType<typeof client.saml.sso.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSamlSsoQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.saml.sso.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /saml/sso
 *
 * SSO (HTTP-POST binding)
 *
 * HTTP-POST バインディングでのSSO処理
 */
export function usePostSamlSso(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.sso.$post>>>>
      >,
      variables: InferRequestType<typeof client.saml.sso.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.saml.sso.$post>) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.sso.$post>>>>
          >
        | undefined,
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.saml.sso.$post>) =>
      parseResponse(client.saml.sso.$post(args, clientOptions)),
  })
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
  return useQuery({ ...getGetSamlSloQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /saml/slo
 */
export function getGetSamlSloQueryKey(args: InferRequestType<typeof client.saml.slo.$get>) {
  return ['/saml/slo', args] as const
}

/**
 * Returns TanStack Query query options for GET /saml/slo
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSamlSloQueryOptions = (
  args: InferRequestType<typeof client.saml.slo.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSamlSloQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.saml.slo.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /saml/slo
 *
 * Single Logout (HTTP-POST)
 *
 * HTTP-POST バインディングでのシングルログアウト
 */
export function usePostSamlSlo(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.slo.$post>>>>
      >,
      variables: InferRequestType<typeof client.saml.slo.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.saml.slo.$post>) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.slo.$post>>>>
          >
        | undefined,
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.saml.slo.$post>) =>
      parseResponse(client.saml.slo.$post(args, clientOptions)),
  })
}

/**
 * POST /saml/acs
 *
 * Assertion Consumer Service
 *
 * SPからのSAMLレスポンスを処理（IdP-initiated の場合）
 */
export function usePostSamlAcs(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.acs.$post>>>>
      >,
      variables: InferRequestType<typeof client.saml.acs.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.saml.acs.$post>) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.acs.$post>>>>
          >
        | undefined,
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.saml.acs.$post>) =>
      parseResponse(client.saml.acs.$post(args, clientOptions)),
  })
}

/**
 * GET /saml/metadata
 *
 * IdPメタデータ取得
 *
 * SAML 2.0 IdPメタデータをXML形式で取得
 */
export function useGetSamlMetadata(options?: {
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
  return useQuery({ ...getGetSamlMetadataQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /saml/metadata
 */
export function getGetSamlMetadataQueryKey() {
  return ['/saml/metadata'] as const
}

/**
 * Returns TanStack Query query options for GET /saml/metadata
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSamlMetadataQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSamlMetadataQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.saml.metadata.$get(undefined, {
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
export function useGetServiceProviders(
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
  return useQuery({ ...getGetServiceProvidersQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /service-providers
 */
export function getGetServiceProvidersQueryKey(
  args: InferRequestType<(typeof client)['service-providers']['$get']>,
) {
  return ['/service-providers', args] as const
}

/**
 * Returns TanStack Query query options for GET /service-providers
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetServiceProvidersQueryOptions = (
  args: InferRequestType<(typeof client)['service-providers']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetServiceProvidersQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['service-providers'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /service-providers
 *
 * SP登録
 */
export function usePostServiceProviders(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['service-providers']['$post']>>>
        >
      >,
      variables: InferRequestType<(typeof client)['service-providers']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['service-providers']['$post']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client)['service-providers']['$post']>>
              >
            >
          >
        | undefined,
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['service-providers']['$post']>) =>
      parseResponse(client['service-providers'].$post(args, clientOptions)),
  })
}

/**
 * GET /service-providers/{spId}
 *
 * SP詳細取得
 */
export function useGetServiceProvidersSpId(
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
  return useQuery({
    ...getGetServiceProvidersSpIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /service-providers/{spId}
 */
export function getGetServiceProvidersSpIdQueryKey(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
) {
  return ['/service-providers/:spId', args] as const
}

/**
 * Returns TanStack Query query options for GET /service-providers/{spId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetServiceProvidersSpIdQueryOptions = (
  args: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetServiceProvidersSpIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['service-providers'][':spId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /service-providers/{spId}
 *
 * SP更新
 */
export function usePutServiceProvidersSpId(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['service-providers'][':spId']['$put']>>
          >
        >
      >,
      variables: InferRequestType<(typeof client)['service-providers'][':spId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['service-providers'][':spId']['$put']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client)['service-providers'][':spId']['$put']>>
              >
            >
          >
        | undefined,
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['service-providers'][':spId']['$put']>,
    ) => parseResponse(client['service-providers'][':spId'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /service-providers/{spId}
 *
 * SP削除
 */
export function useDeleteServiceProvidersSpId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client)['service-providers'][':spId']['$delete']>>
              >
            >
          >
        | undefined,
      variables: InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client)['service-providers'][':spId']['$delete']>>
              >
            >
          >
        | undefined,
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>,
    ) => parseResponse(client['service-providers'][':spId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /service-providers/{spId}/metadata
 *
 * SPメタデータ取得
 */
export function useGetServiceProvidersSpIdMetadata(
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
  return useQuery({
    ...getGetServiceProvidersSpIdMetadataQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /service-providers/{spId}/metadata
 */
export function getGetServiceProvidersSpIdMetadataQueryKey(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
) {
  return ['/service-providers/:spId/metadata', args] as const
}

/**
 * Returns TanStack Query query options for GET /service-providers/{spId}/metadata
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetServiceProvidersSpIdMetadataQueryOptions = (
  args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetServiceProvidersSpIdMetadataQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['service-providers'][':spId'].metadata.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /service-providers/{spId}/metadata
 *
 * SPメタデータ更新
 */
export function usePutServiceProvidersSpIdMetadata(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['service-providers'][':spId']['metadata']['$put']>>
          >
        >
      >,
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
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client)['service-providers'][':spId']['metadata']['$put']>
                >
              >
            >
          >
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$put']>,
    ) => parseResponse(client['service-providers'][':spId'].metadata.$put(args, clientOptions)),
  })
}

/**
 * GET /service-providers/{spId}/attributes
 *
 * SP属性マッピング取得
 */
export function useGetServiceProvidersSpIdAttributes(
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
  return useQuery({
    ...getGetServiceProvidersSpIdAttributesQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /service-providers/{spId}/attributes
 */
export function getGetServiceProvidersSpIdAttributesQueryKey(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
) {
  return ['/service-providers/:spId/attributes', args] as const
}

/**
 * Returns TanStack Query query options for GET /service-providers/{spId}/attributes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetServiceProvidersSpIdAttributesQueryOptions = (
  args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetServiceProvidersSpIdAttributesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['service-providers'][':spId'].attributes.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /service-providers/{spId}/attributes
 *
 * SP属性マッピング更新
 */
export function usePutServiceProvidersSpIdAttributes(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['service-providers'][':spId']['attributes']['$put']>>
          >
        >
      >,
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
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client)['service-providers'][':spId']['attributes']['$put']>
                >
              >
            >
          >
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$put']>,
    ) => parseResponse(client['service-providers'][':spId'].attributes.$put(args, clientOptions)),
  })
}

/**
 * GET /attributes
 *
 * 利用可能な属性一覧
 */
export function useGetAttributes(options?: {
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
  return useQuery({ ...getGetAttributesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /attributes
 */
export function getGetAttributesQueryKey() {
  return ['/attributes'] as const
}

/**
 * Returns TanStack Query query options for GET /attributes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAttributesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetAttributesQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.attributes.$get(undefined, {
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
export function useGetCertificates(options?: {
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
  return useQuery({ ...getGetCertificatesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /certificates
 */
export function getGetCertificatesQueryKey() {
  return ['/certificates'] as const
}

/**
 * Returns TanStack Query query options for GET /certificates
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCertificatesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetCertificatesQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.certificates.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /certificates
 *
 * 証明書アップロード
 */
export function usePostCertificates(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.certificates.$post>>>>
      >,
      variables: InferRequestType<typeof client.certificates.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.certificates.$post>) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.certificates.$post>>>>
          >
        | undefined,
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.certificates.$post>) =>
      parseResponse(client.certificates.$post(args, clientOptions)),
  })
}

/**
 * DELETE /certificates/{certId}
 *
 * 証明書削除
 */
export function useDeleteCertificatesCertId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.certificates)[':certId']['$delete']>>
              >
            >
          >
        | undefined,
      variables: InferRequestType<(typeof client.certificates)[':certId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.certificates)[':certId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.certificates)[':certId']['$delete']>>
              >
            >
          >
        | undefined,
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.certificates)[':certId']['$delete']>,
    ) => parseResponse(client.certificates[':certId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /certificates/{certId}/activate
 *
 * 証明書有効化
 */
export function usePostCertificatesCertIdActivate(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.certificates)[':certId']['activate']['$post']>>
          >
        >
      >,
      variables: InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.certificates)[':certId']['activate']['$post']>>
              >
            >
          >
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>,
    ) => parseResponse(client.certificates[':certId'].activate.$post(args, clientOptions)),
  })
}

/**
 * GET /sessions
 *
 * アクティブセッション一覧
 */
export function useGetSessions(
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
  return useQuery({ ...getGetSessionsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /sessions
 */
export function getGetSessionsQueryKey(args: InferRequestType<typeof client.sessions.$get>) {
  return ['/sessions', args] as const
}

/**
 * Returns TanStack Query query options for GET /sessions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSessionsQueryOptions = (
  args: InferRequestType<typeof client.sessions.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSessionsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.sessions.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション終了
 */
export function useDeleteSessionsSessionId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.sessions)[':sessionId']['$delete']>>
              >
            >
          >
        | undefined,
      variables: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.sessions)[':sessionId']['$delete']>>
              >
            >
          >
        | undefined,
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
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>) =>
      parseResponse(client.sessions[':sessionId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /audit-logs
 *
 * SAML監査ログ取得
 */
export function useGetAuditLogs(
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
  return useQuery({ ...getGetAuditLogsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /audit-logs
 */
export function getGetAuditLogsQueryKey(
  args: InferRequestType<(typeof client)['audit-logs']['$get']>,
) {
  return ['/audit-logs', args] as const
}

/**
 * Returns TanStack Query query options for GET /audit-logs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAuditLogsQueryOptions = (
  args: InferRequestType<(typeof client)['audit-logs']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetAuditLogsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client['audit-logs'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })
