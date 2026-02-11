import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query cache key for GET /tags
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetTagsQueryKey() {
  return ['tags', 'GET', '/tags'] as const
}

/**
 * Returns Vue Query query options for GET /tags
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetTagsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetTagsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.tags.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
  }
}

/**
 * GET /tags
 */
export function useGetTags(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.tags.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetTagsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /tags
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTagsMutationKey() {
  return ['tags', 'POST', '/tags'] as const
}

/**
 * Returns Vue Query mutation options for POST /tags
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostTagsMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostTagsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.tags.$post>) {
      return parseResponse(client.tags.$post(args, clientOptions))
    },
  }
}

/**
 * POST /tags
 */
export function usePostTags(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.tags.$post>>>>>,
        Error,
        InferRequestType<typeof client.tags.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostTagsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /settings
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSettingsQueryKey(
  args: MaybeRef<InferRequestType<typeof client.settings.$get>>,
) {
  return ['settings', 'GET', '/settings', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /settings
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSettingsQueryOptions(
  args: InferRequestType<typeof client.settings.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetSettingsQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.settings.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      )
    },
  }
}

/**
 * GET /settings
 */
export function useGetSettings(
  args: InferRequestType<typeof client.settings.$get>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.$get>>>>
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
  const { queryKey, queryFn, ...baseOptions } = getGetSettingsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /settings
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutSettingsMutationKey() {
  return ['settings', 'PUT', '/settings'] as const
}

/**
 * Returns Vue Query mutation options for PUT /settings
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPutSettingsMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPutSettingsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.settings.$put>) {
      return parseResponse(client.settings.$put(args, clientOptions))
    },
  }
}

/**
 * PUT /settings
 */
export function usePutSettings(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.settings.$put>>>>>,
        Error,
        InferRequestType<typeof client.settings.$put>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPutSettingsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /config
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostConfigMutationKey() {
  return ['config', 'POST', '/config'] as const
}

/**
 * Returns Vue Query mutation options for POST /config
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostConfigMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostConfigMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.config.$post>) {
      return parseResponse(client.config.$post(args, clientOptions))
    },
  }
}

/**
 * POST /config
 */
export function usePostConfig(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.config.$post>>>>>,
        Error,
        InferRequestType<typeof client.config.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostConfigMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /payment
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPaymentMutationKey() {
  return ['payment', 'POST', '/payment'] as const
}

/**
 * Returns Vue Query mutation options for POST /payment
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostPaymentMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostPaymentMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.payment.$post>) {
      return parseResponse(client.payment.$post(args, clientOptions))
    },
  }
}

/**
 * POST /payment
 */
export function usePostPayment(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.payment.$post>>>>>,
        Error,
        InferRequestType<typeof client.payment.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostPaymentMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
