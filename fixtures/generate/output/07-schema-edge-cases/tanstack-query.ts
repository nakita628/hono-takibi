import { useQuery, useMutation, queryOptions, mutationOptions } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates TanStack Query mutation key for POST /nullable
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostNullableMutationKey() {
  return ['nullable', 'POST', '/nullable'] as const
}

/**
 * POST /nullable
 */
export async function postNullable(
  args: InferRequestType<typeof client.nullable.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.nullable.$post(args, options))
}

/**
 * Returns TanStack Query mutation options for POST /nullable
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostNullableMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostNullableMutationKey(),
    async mutationFn(args: Parameters<typeof postNullable>[0]) {
      return postNullable(args, clientOptions)
    },
  })
}

/**
 * POST /nullable
 */
export function usePostNullable(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postNullable>>,
    Error,
    Parameters<typeof postNullable>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostNullableMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query mutation key for POST /discriminated
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostDiscriminatedMutationKey() {
  return ['discriminated', 'POST', '/discriminated'] as const
}

/**
 * POST /discriminated
 */
export async function postDiscriminated(
  args: InferRequestType<typeof client.discriminated.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.discriminated.$post(args, options))
}

/**
 * Returns TanStack Query mutation options for POST /discriminated
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostDiscriminatedMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostDiscriminatedMutationKey(),
    async mutationFn(args: Parameters<typeof postDiscriminated>[0]) {
      return postDiscriminated(args, clientOptions)
    },
  })
}

/**
 * POST /discriminated
 */
export function usePostDiscriminated(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postDiscriminated>>,
    Error,
    Parameters<typeof postDiscriminated>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostDiscriminatedMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query cache key for GET /composed
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetComposedQueryKey() {
  return ['composed', 'GET', '/composed'] as const
}

/**
 * GET /composed
 */
export async function getComposed(options?: ClientRequestOptions) {
  return await parseResponse(client.composed.$get(undefined, options))
}

/**
 * Returns TanStack Query query options for GET /composed
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetComposedQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetComposedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getComposed({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /composed
 */
export function useGetComposed(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getComposed>>, Error>
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetComposedQueryOptions(clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query cache key for GET /deep-nested
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetDeepNestedQueryKey() {
  return ['deep-nested', 'GET', '/deep-nested'] as const
}

/**
 * GET /deep-nested
 */
export async function getDeepNested(options?: ClientRequestOptions) {
  return await parseResponse(client['deep-nested'].$get(undefined, options))
}

/**
 * Returns TanStack Query query options for GET /deep-nested
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetDeepNestedQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetDeepNestedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getDeepNested({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /deep-nested
 */
export function useGetDeepNested(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, Error>
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetDeepNestedQueryOptions(clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query cache key for GET /additional-props
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAdditionalPropsQueryKey() {
  return ['additional-props', 'GET', '/additional-props'] as const
}

/**
 * GET /additional-props
 */
export async function getAdditionalProps(options?: ClientRequestOptions) {
  return await parseResponse(client['additional-props'].$get(undefined, options))
}

/**
 * Returns TanStack Query query options for GET /additional-props
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAdditionalPropsQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetAdditionalPropsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAdditionalProps({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /additional-props
 */
export function useGetAdditionalProps(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, Error>
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetAdditionalPropsQueryOptions(clientOptions), ...queryOpts })
}
