import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Svelte Query mutation key for POST /nullable
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostNullableMutationKey() {
  return ['nullable', 'POST', '/nullable'] as const
}

/**
 * Returns Svelte Query mutation options for POST /nullable
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostNullableMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostNullableMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.nullable.$post>) =>
    parseResponse(client.nullable.$post(args, clientOptions)),
})

/**
 * POST /nullable
 */
export function createPostNullable(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.nullable.$post>>>>>,
      Error,
      InferRequestType<typeof client.nullable.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostNullableMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /discriminated
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostDiscriminatedMutationKey() {
  return ['discriminated', 'POST', '/discriminated'] as const
}

/**
 * Returns Svelte Query mutation options for POST /discriminated
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostDiscriminatedMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostDiscriminatedMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.discriminated.$post>) =>
    parseResponse(client.discriminated.$post(args, clientOptions)),
})

/**
 * POST /discriminated
 */
export function createPostDiscriminated(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.discriminated.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.discriminated.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostDiscriminatedMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /composed
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetComposedQueryKey() {
  return ['composed', 'GET', '/composed'] as const
}

/**
 * Returns Svelte Query query options for GET /composed
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetComposedQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetComposedQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.composed.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /composed
 */
export function createGetComposed(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.composed.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetComposedQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /deep-nested
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetDeepNestedQueryKey() {
  return ['deep-nested', 'GET', '/deep-nested'] as const
}

/**
 * Returns Svelte Query query options for GET /deep-nested
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDeepNestedQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetDeepNestedQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['deep-nested'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /deep-nested
 */
export function createGetDeepNested(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['deep-nested']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetDeepNestedQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /additional-props
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAdditionalPropsQueryKey() {
  return ['additional-props', 'GET', '/additional-props'] as const
}

/**
 * Returns Svelte Query query options for GET /additional-props
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAdditionalPropsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetAdditionalPropsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['additional-props'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /additional-props
 */
export function createGetAdditionalProps(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['additional-props']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAdditionalPropsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
