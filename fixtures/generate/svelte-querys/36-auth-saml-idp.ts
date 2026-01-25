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
      placeholderData?:
        | InferResponseType<typeof client.saml.sso.$get>
        | (() => InferResponseType<typeof client.saml.sso.$get>)
      initialData?:
        | InferResponseType<typeof client.saml.sso.$get>
        | (() => InferResponseType<typeof client.saml.sso.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSamlSsoQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.saml.sso.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
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
 * Returns Svelte Query query options for GET /saml/sso
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSamlSsoQueryOptions(
  args: InferRequestType<typeof client.saml.sso.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetSamlSsoQueryKey(args),
    queryFn: async () => parseResponse(client.saml.sso.$get(args, clientOptions)),
  }
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
      placeholderData?:
        | InferResponseType<typeof client.saml.slo.$get>
        | (() => InferResponseType<typeof client.saml.slo.$get>)
      initialData?:
        | InferResponseType<typeof client.saml.slo.$get>
        | (() => InferResponseType<typeof client.saml.slo.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSamlSloQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.saml.slo.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
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
 * Returns Svelte Query query options for GET /saml/slo
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSamlSloQueryOptions(
  args: InferRequestType<typeof client.saml.slo.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetSamlSloQueryKey(args),
    queryFn: async () => parseResponse(client.saml.slo.$get(args, clientOptions)),
  }
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
    placeholderData?:
      | InferResponseType<typeof client.saml.metadata.$get>
      | (() => InferResponseType<typeof client.saml.metadata.$get>)
    initialData?:
      | InferResponseType<typeof client.saml.metadata.$get>
      | (() => InferResponseType<typeof client.saml.metadata.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSamlMetadataQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.saml.metadata.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
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
 * Returns Svelte Query query options for GET /saml/metadata
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSamlMetadataQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetSamlMetadataQueryKey(),
    queryFn: async () => parseResponse(client.saml.metadata.$get(undefined, clientOptions)),
  }
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
      placeholderData?:
        | InferResponseType<(typeof client)['service-providers']['$get']>
        | (() => InferResponseType<(typeof client)['service-providers']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['service-providers']['$get']>
        | (() => InferResponseType<(typeof client)['service-providers']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetServiceProvidersQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['service-providers'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
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
 * Returns Svelte Query query options for GET /service-providers
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetServiceProvidersQueryOptions(
  args: InferRequestType<(typeof client)['service-providers']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetServiceProvidersQueryKey(args),
    queryFn: async () => parseResponse(client['service-providers'].$get(args, clientOptions)),
  }
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
      placeholderData?:
        | InferResponseType<(typeof client)['service-providers'][':spId']['$get']>
        | (() => InferResponseType<(typeof client)['service-providers'][':spId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['service-providers'][':spId']['$get']>
        | (() => InferResponseType<(typeof client)['service-providers'][':spId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetServiceProvidersSpIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['service-providers'][':spId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
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
 * Returns Svelte Query query options for GET /service-providers/{spId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetServiceProvidersSpIdQueryOptions(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetServiceProvidersSpIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client['service-providers'][':spId'].$get(args, clientOptions)),
  }
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
      placeholderData?:
        | InferResponseType<(typeof client)['service-providers'][':spId']['metadata']['$get']>
        | (() => InferResponseType<
            (typeof client)['service-providers'][':spId']['metadata']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client)['service-providers'][':spId']['metadata']['$get']>
        | (() => InferResponseType<
            (typeof client)['service-providers'][':spId']['metadata']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetServiceProvidersSpIdMetadataQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['service-providers'][':spId'].metadata.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
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
 * Returns Svelte Query query options for GET /service-providers/{spId}/metadata
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetServiceProvidersSpIdMetadataQueryOptions(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetServiceProvidersSpIdMetadataQueryKey(args),
    queryFn: async () =>
      parseResponse(client['service-providers'][':spId'].metadata.$get(args, clientOptions)),
  }
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
      placeholderData?:
        | InferResponseType<(typeof client)['service-providers'][':spId']['attributes']['$get']>
        | (() => InferResponseType<
            (typeof client)['service-providers'][':spId']['attributes']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client)['service-providers'][':spId']['attributes']['$get']>
        | (() => InferResponseType<
            (typeof client)['service-providers'][':spId']['attributes']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetServiceProvidersSpIdAttributesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['service-providers'][':spId'].attributes.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
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
 * Returns Svelte Query query options for GET /service-providers/{spId}/attributes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetServiceProvidersSpIdAttributesQueryOptions(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetServiceProvidersSpIdAttributesQueryKey(args),
    queryFn: async () =>
      parseResponse(client['service-providers'][':spId'].attributes.$get(args, clientOptions)),
  }
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
    placeholderData?:
      | InferResponseType<typeof client.attributes.$get>
      | (() => InferResponseType<typeof client.attributes.$get>)
    initialData?:
      | InferResponseType<typeof client.attributes.$get>
      | (() => InferResponseType<typeof client.attributes.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAttributesQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.attributes.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
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
 * Returns Svelte Query query options for GET /attributes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAttributesQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetAttributesQueryKey(),
    queryFn: async () => parseResponse(client.attributes.$get(undefined, clientOptions)),
  }
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
    placeholderData?:
      | InferResponseType<typeof client.certificates.$get>
      | (() => InferResponseType<typeof client.certificates.$get>)
    initialData?:
      | InferResponseType<typeof client.certificates.$get>
      | (() => InferResponseType<typeof client.certificates.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetCertificatesQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.certificates.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
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
 * Returns Svelte Query query options for GET /certificates
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetCertificatesQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetCertificatesQueryKey(),
    queryFn: async () => parseResponse(client.certificates.$get(undefined, clientOptions)),
  }
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
      placeholderData?:
        | InferResponseType<typeof client.sessions.$get>
        | (() => InferResponseType<typeof client.sessions.$get>)
      initialData?:
        | InferResponseType<typeof client.sessions.$get>
        | (() => InferResponseType<typeof client.sessions.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSessionsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.sessions.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
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
 * Returns Svelte Query query options for GET /sessions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSessionsQueryOptions(
  args: InferRequestType<typeof client.sessions.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetSessionsQueryKey(args),
    queryFn: async () => parseResponse(client.sessions.$get(args, clientOptions)),
  }
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
      placeholderData?:
        | InferResponseType<(typeof client)['audit-logs']['$get']>
        | (() => InferResponseType<(typeof client)['audit-logs']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['audit-logs']['$get']>
        | (() => InferResponseType<(typeof client)['audit-logs']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetAuditLogsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['audit-logs'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
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

/**
 * Returns Svelte Query query options for GET /audit-logs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAuditLogsQueryOptions(
  args: InferRequestType<(typeof client)['audit-logs']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetAuditLogsQueryKey(args),
    queryFn: async () => parseResponse(client['audit-logs'].$get(args, clientOptions)),
  }
}
