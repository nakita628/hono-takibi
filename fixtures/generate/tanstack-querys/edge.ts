import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/edge'

/**
 * Generates TanStack Query mutation key for POST /polymorphic
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPolymorphicMutationKey() {
  return ['polymorphic', 'POST', '/polymorphic'] as const
}

/**
 * Returns TanStack Query mutation options for POST /polymorphic
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPolymorphicMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostPolymorphicMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.polymorphic.$post>) =>
    parseResponse(client.polymorphic.$post(args, clientOptions)),
})

/**
 * POST /polymorphic
 *
 * Polymorphic object with discriminator
 */
export function usePostPolymorphic(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.polymorphic.$post>>>>>,
    Error,
    InferRequestType<typeof client.polymorphic.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostPolymorphicMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates TanStack Query cache key for GET /search
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSearchQueryKey(args: InferRequestType<typeof client.search.$get>) {
  return ['search', 'GET', '/search', args] as const
}

/**
 * Returns TanStack Query query options for GET /search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchQueryOptions = (
  args: InferRequestType<typeof client.search.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSearchQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.search.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /search
 *
 * Search with complex query
 */
export function useGetSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSearchQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query mutation key for PUT /multi-step
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMultiStepMutationKey() {
  return ['multi-step', 'PUT', '/multi-step'] as const
}

/**
 * Returns TanStack Query mutation options for PUT /multi-step
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMultiStepMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMultiStepMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['multi-step']['$put']>) =>
    parseResponse(client['multi-step'].$put(args, clientOptions)),
})

/**
 * PUT /multi-step
 *
 * Multi-step object definition using allOf
 */
export function usePutMultiStep(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['multi-step']['$put']>>>>
      >
    | undefined,
    Error,
    InferRequestType<(typeof client)['multi-step']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPutMultiStepMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
