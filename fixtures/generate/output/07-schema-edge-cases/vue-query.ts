import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query mutation key for POST /nullable
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostNullableMutationKey() {
  return ['nullable', 'POST', '/nullable'] as const
}

/**
 * Returns Vue Query mutation options for POST /nullable
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostNullableMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostNullableMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.nullable.$post>) {
      return parseResponse(client.nullable.$post(args, clientOptions))
    },
  }
}

/**
 * POST /nullable
 */
export function usePostNullable(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.nullable.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.nullable.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostNullableMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /discriminated
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostDiscriminatedMutationKey() {
  return ['discriminated', 'POST', '/discriminated'] as const
}

/**
 * Returns Vue Query mutation options for POST /discriminated
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostDiscriminatedMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostDiscriminatedMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.discriminated.$post>) {
      return parseResponse(client.discriminated.$post(args, clientOptions))
    },
  }
}

/**
 * POST /discriminated
 */
export function usePostDiscriminated(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.discriminated.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.discriminated.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostDiscriminatedMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /composed
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetComposedQueryKey() {
  return ['composed', 'GET', '/composed'] as const
}

/**
 * Returns Vue Query query options for GET /composed
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetComposedQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetComposedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.composed.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /composed
 */
export function useGetComposed(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.composed.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetComposedQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /deep-nested
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetDeepNestedQueryKey() {
  return ['deep-nested', 'GET', '/deep-nested'] as const
}

/**
 * Returns Vue Query query options for GET /deep-nested
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetDeepNestedQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetDeepNestedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['deep-nested'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /deep-nested
 */
export function useGetDeepNested(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['deep-nested']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetDeepNestedQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /additional-props
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAdditionalPropsQueryKey() {
  return ['additional-props', 'GET', '/additional-props'] as const
}

/**
 * Returns Vue Query query options for GET /additional-props
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAdditionalPropsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetAdditionalPropsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['additional-props'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /additional-props
 */
export function useGetAdditionalProps(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['additional-props']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetAdditionalPropsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
