import type { QueryFunctionContext, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { MaybeRef } from 'vue'
import { unref } from 'vue'
import { client } from '../clients/36-auth-saml-idp'

/**
 * Generates Vue Query cache key for GET /saml/sso
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSamlSsoQueryKey(
  args: MaybeRef<InferRequestType<typeof client.saml.sso.$get>>,
) {
  return ['saml', 'GET', '/saml/sso', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /saml/sso
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
export function useGetSamlSso(
  args: InferRequestType<typeof client.saml.sso.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.sso.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSamlSsoQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /saml/sso
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSamlSsoMutationKey() {
  return ['saml', 'POST', '/saml/sso'] as const
}

/**
 * Returns Vue Query mutation options for POST /saml/sso
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSamlSsoMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostSamlSsoMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.saml.sso.$post>) =>
    parseResponse(client.saml.sso.$post(args, clientOptions)),
})

/**
 * POST /saml/sso
 *
 * SSO (HTTP-POST binding)
 *
 * HTTP-POST バインディングでのSSO処理
 */
export function usePostSamlSso(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.sso.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.saml.sso.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostSamlSsoMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /saml/slo
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSamlSloQueryKey(
  args: MaybeRef<InferRequestType<typeof client.saml.slo.$get>>,
) {
  return ['saml', 'GET', '/saml/slo', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /saml/slo
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
export function useGetSamlSlo(
  args: InferRequestType<typeof client.saml.slo.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.slo.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSamlSloQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /saml/slo
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSamlSloMutationKey() {
  return ['saml', 'POST', '/saml/slo'] as const
}

/**
 * Returns Vue Query mutation options for POST /saml/slo
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSamlSloMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostSamlSloMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.saml.slo.$post>) =>
    parseResponse(client.saml.slo.$post(args, clientOptions)),
})

/**
 * POST /saml/slo
 *
 * Single Logout (HTTP-POST)
 *
 * HTTP-POST バインディングでのシングルログアウト
 */
export function usePostSamlSlo(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.slo.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.saml.slo.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostSamlSloMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /saml/acs
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSamlAcsMutationKey() {
  return ['saml', 'POST', '/saml/acs'] as const
}

/**
 * Returns Vue Query mutation options for POST /saml/acs
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSamlAcsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostSamlAcsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.saml.acs.$post>) =>
    parseResponse(client.saml.acs.$post(args, clientOptions)),
})

/**
 * POST /saml/acs
 *
 * Assertion Consumer Service
 *
 * SPからのSAMLレスポンスを処理（IdP-initiated の場合）
 */
export function usePostSamlAcs(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.acs.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.saml.acs.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostSamlAcsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /saml/metadata
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetSamlMetadataQueryKey() {
  return ['saml', 'GET', '/saml/metadata'] as const
}

/**
 * Returns Vue Query query options for GET /saml/metadata
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
export function useGetSamlMetadata(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.saml.metadata.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSamlMetadataQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /service-providers
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetServiceProvidersQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['service-providers']['$get']>>,
) {
  return ['service-providers', 'GET', '/service-providers', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /service-providers
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
export function useGetServiceProviders(
  args: InferRequestType<(typeof client)['service-providers']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client)['service-providers']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetServiceProvidersQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /service-providers
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostServiceProvidersMutationKey() {
  return ['service-providers', 'POST', '/service-providers'] as const
}

/**
 * Returns Vue Query mutation options for POST /service-providers
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostServiceProvidersMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostServiceProvidersMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['service-providers']['$post']>) =>
    parseResponse(client['service-providers'].$post(args, clientOptions)),
})

/**
 * POST /service-providers
 *
 * SP登録
 */
export function usePostServiceProviders(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['service-providers']['$post']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client)['service-providers']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostServiceProvidersMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /service-providers/{spId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetServiceProvidersSpIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['service-providers'][':spId']['$get']>>,
) {
  return ['service-providers', 'GET', '/service-providers/:spId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /service-providers/{spId}
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
export function useGetServiceProvidersSpId(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client)['service-providers'][':spId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetServiceProvidersSpIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /service-providers/{spId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutServiceProvidersSpIdMutationKey() {
  return ['service-providers', 'PUT', '/service-providers/:spId'] as const
}

/**
 * Returns Vue Query mutation options for PUT /service-providers/{spId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutServiceProvidersSpIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutServiceProvidersSpIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client)['service-providers'][':spId']['$put']>,
  ) => parseResponse(client['service-providers'][':spId'].$put(args, clientOptions)),
})

/**
 * PUT /service-providers/{spId}
 *
 * SP更新
 */
export function usePutServiceProvidersSpId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['service-providers'][':spId']['$put']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client)['service-providers'][':spId']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutServiceProvidersSpIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /service-providers/{spId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteServiceProvidersSpIdMutationKey() {
  return ['service-providers', 'DELETE', '/service-providers/:spId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /service-providers/{spId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteServiceProvidersSpIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteServiceProvidersSpIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client)['service-providers'][':spId']['$delete']>,
  ) => parseResponse(client['service-providers'][':spId'].$delete(args, clientOptions)),
})

/**
 * DELETE /service-providers/{spId}
 *
 * SP削除
 */
export function useDeleteServiceProvidersSpId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteServiceProvidersSpIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /service-providers/{spId}/metadata
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetServiceProvidersSpIdMetadataQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>
  >,
) {
  return ['service-providers', 'GET', '/service-providers/:spId/metadata', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /service-providers/{spId}/metadata
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
export function useGetServiceProvidersSpIdMetadata(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client)['service-providers'][':spId']['metadata']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetServiceProvidersSpIdMetadataQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /service-providers/{spId}/metadata
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutServiceProvidersSpIdMetadataMutationKey() {
  return ['service-providers', 'PUT', '/service-providers/:spId/metadata'] as const
}

/**
 * Returns Vue Query mutation options for PUT /service-providers/{spId}/metadata
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutServiceProvidersSpIdMetadataMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutServiceProvidersSpIdMetadataMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$put']>,
  ) => parseResponse(client['service-providers'][':spId'].metadata.$put(args, clientOptions)),
})

/**
 * PUT /service-providers/{spId}/metadata
 *
 * SPメタデータ更新
 */
export function usePutServiceProvidersSpIdMetadata(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['service-providers'][':spId']['metadata']['$put']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client)['service-providers'][':spId']['metadata']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutServiceProvidersSpIdMetadataMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /service-providers/{spId}/attributes
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetServiceProvidersSpIdAttributesQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>
  >,
) {
  return ['service-providers', 'GET', '/service-providers/:spId/attributes', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /service-providers/{spId}/attributes
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
export function useGetServiceProvidersSpIdAttributes(
  args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client)['service-providers'][':spId']['attributes']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetServiceProvidersSpIdAttributesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /service-providers/{spId}/attributes
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutServiceProvidersSpIdAttributesMutationKey() {
  return ['service-providers', 'PUT', '/service-providers/:spId/attributes'] as const
}

/**
 * Returns Vue Query mutation options for PUT /service-providers/{spId}/attributes
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutServiceProvidersSpIdAttributesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutServiceProvidersSpIdAttributesMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$put']>,
  ) => parseResponse(client['service-providers'][':spId'].attributes.$put(args, clientOptions)),
})

/**
 * PUT /service-providers/{spId}/attributes
 *
 * SP属性マッピング更新
 */
export function usePutServiceProvidersSpIdAttributes(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<(typeof client)['service-providers'][':spId']['attributes']['$put']>
              >
            >
          >
        >,
        Error,
        InferRequestType<(typeof client)['service-providers'][':spId']['attributes']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutServiceProvidersSpIdAttributesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /attributes
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAttributesQueryKey() {
  return ['attributes', 'GET', '/attributes'] as const
}

/**
 * Returns Vue Query query options for GET /attributes
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
export function useGetAttributes(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.attributes.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAttributesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /certificates
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetCertificatesQueryKey() {
  return ['certificates', 'GET', '/certificates'] as const
}

/**
 * Returns Vue Query query options for GET /certificates
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
export function useGetCertificates(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.certificates.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetCertificatesQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /certificates
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostCertificatesMutationKey() {
  return ['certificates', 'POST', '/certificates'] as const
}

/**
 * Returns Vue Query mutation options for POST /certificates
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostCertificatesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostCertificatesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.certificates.$post>) =>
    parseResponse(client.certificates.$post(args, clientOptions)),
})

/**
 * POST /certificates
 *
 * 証明書アップロード
 */
export function usePostCertificates(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.certificates.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.certificates.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostCertificatesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /certificates/{certId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteCertificatesCertIdMutationKey() {
  return ['certificates', 'DELETE', '/certificates/:certId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /certificates/{certId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteCertificatesCertIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteCertificatesCertIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.certificates)[':certId']['$delete']>) =>
    parseResponse(client.certificates[':certId'].$delete(args, clientOptions)),
})

/**
 * DELETE /certificates/{certId}
 *
 * 証明書削除
 */
export function useDeleteCertificatesCertId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteCertificatesCertIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /certificates/{certId}/activate
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostCertificatesCertIdActivateMutationKey() {
  return ['certificates', 'POST', '/certificates/:certId/activate'] as const
}

/**
 * Returns Vue Query mutation options for POST /certificates/{certId}/activate
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostCertificatesCertIdActivateMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostCertificatesCertIdActivateMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>,
  ) => parseResponse(client.certificates[':certId'].activate.$post(args, clientOptions)),
})

/**
 * POST /certificates/{certId}/activate
 *
 * 証明書有効化
 */
export function usePostCertificatesCertIdActivate(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.certificates)[':certId']['activate']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.certificates)[':certId']['activate']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostCertificatesCertIdActivateMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /sessions
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSessionsQueryKey(
  args: MaybeRef<InferRequestType<typeof client.sessions.$get>>,
) {
  return ['sessions', 'GET', '/sessions', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /sessions
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
export function useGetSessions(
  args: InferRequestType<typeof client.sessions.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.sessions.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSessionsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /sessions/{sessionId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteSessionsSessionIdMutationKey() {
  return ['sessions', 'DELETE', '/sessions/:sessionId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /sessions/{sessionId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteSessionsSessionIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteSessionsSessionIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>) =>
    parseResponse(client.sessions[':sessionId'].$delete(args, clientOptions)),
})

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション終了
 */
export function useDeleteSessionsSessionId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteSessionsSessionIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /audit-logs
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetAuditLogsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['audit-logs']['$get']>>,
) {
  return ['audit-logs', 'GET', '/audit-logs', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /audit-logs
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
export function useGetAuditLogs(
  args: InferRequestType<(typeof client)['audit-logs']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client)['audit-logs']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAuditLogsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
