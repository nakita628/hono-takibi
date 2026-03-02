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
 * Generates TanStack Query mutation key for POST /one-of
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOneOfMutationKey() {
  return ['one-of', 'POST', '/one-of'] as const
}

/**
 * POST /one-of
 */
export async function postOneOf(
  args: InferRequestType<(typeof client)['one-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['one-of'].$post(args, options))
}

/**
 * Returns TanStack Query mutation options for POST /one-of
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostOneOfMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostOneOfMutationKey(),
    async mutationFn(args: Parameters<typeof postOneOf>[0]) {
      return postOneOf(args, clientOptions)
    },
  })
}

/**
 * POST /one-of
 */
export function usePostOneOf(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postOneOf>>,
    Error,
    Parameters<typeof postOneOf>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostOneOfMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query mutation key for POST /any-of
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAnyOfMutationKey() {
  return ['any-of', 'POST', '/any-of'] as const
}

/**
 * POST /any-of
 */
export async function postAnyOf(
  args: InferRequestType<(typeof client)['any-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['any-of'].$post(args, options))
}

/**
 * Returns TanStack Query mutation options for POST /any-of
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostAnyOfMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostAnyOfMutationKey(),
    async mutationFn(args: Parameters<typeof postAnyOf>[0]) {
      return postAnyOf(args, clientOptions)
    },
  })
}

/**
 * POST /any-of
 */
export function usePostAnyOf(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAnyOf>>,
    Error,
    Parameters<typeof postAnyOf>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostAnyOfMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query mutation key for POST /all-of
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAllOfMutationKey() {
  return ['all-of', 'POST', '/all-of'] as const
}

/**
 * POST /all-of
 */
export async function postAllOf(
  args: InferRequestType<(typeof client)['all-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['all-of'].$post(args, options))
}

/**
 * Returns TanStack Query mutation options for POST /all-of
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostAllOfMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostAllOfMutationKey(),
    async mutationFn(args: Parameters<typeof postAllOf>[0]) {
      return postAllOf(args, clientOptions)
    },
  })
}

/**
 * POST /all-of
 */
export function usePostAllOf(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAllOf>>,
    Error,
    Parameters<typeof postAllOf>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostAllOfMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query mutation key for POST /not
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostNotMutationKey() {
  return ['not', 'POST', '/not'] as const
}

/**
 * POST /not
 */
export async function postNot(
  args: InferRequestType<typeof client.not.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.not.$post(args, options))
}

/**
 * Returns TanStack Query mutation options for POST /not
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostNotMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostNotMutationKey(),
    async mutationFn(args: Parameters<typeof postNot>[0]) {
      return postNot(args, clientOptions)
    },
  })
}

/**
 * POST /not
 */
export function usePostNot(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postNot>>,
    Error,
    Parameters<typeof postNot>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostNotMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query cache key for GET /not-ref
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotRefQueryKey() {
  return ['not-ref', 'GET', '/not-ref'] as const
}

/**
 * GET /not-ref
 */
export async function getNotRef(options?: ClientRequestOptions) {
  return await parseResponse(client['not-ref'].$get(undefined, options))
}

/**
 * Returns TanStack Query query options for GET /not-ref
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNotRefQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetNotRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotRef({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /not-ref
 */
export function useGetNotRef(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotRef>>, Error>
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetNotRefQueryOptions(clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query cache key for GET /not-enum
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotEnumQueryKey() {
  return ['not-enum', 'GET', '/not-enum'] as const
}

/**
 * GET /not-enum
 */
export async function getNotEnum(options?: ClientRequestOptions) {
  return await parseResponse(client['not-enum'].$get(undefined, options))
}

/**
 * Returns TanStack Query query options for GET /not-enum
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNotEnumQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetNotEnumQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotEnum({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /not-enum
 */
export function useGetNotEnum(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotEnum>>, Error>
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetNotEnumQueryOptions(clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query cache key for GET /not-const
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotConstQueryKey() {
  return ['not-const', 'GET', '/not-const'] as const
}

/**
 * GET /not-const
 */
export async function getNotConst(options?: ClientRequestOptions) {
  return await parseResponse(client['not-const'].$get(undefined, options))
}

/**
 * Returns TanStack Query query options for GET /not-const
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNotConstQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetNotConstQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotConst({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /not-const
 */
export function useGetNotConst(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotConst>>, Error>
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetNotConstQueryOptions(clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query cache key for GET /not-composition
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotCompositionQueryKey() {
  return ['not-composition', 'GET', '/not-composition'] as const
}

/**
 * GET /not-composition
 */
export async function getNotComposition(options?: ClientRequestOptions) {
  return await parseResponse(client['not-composition'].$get(undefined, options))
}

/**
 * Returns TanStack Query query options for GET /not-composition
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNotCompositionQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetNotCompositionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotComposition({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /not-composition
 */
export function useGetNotComposition(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotComposition>>, Error>
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetNotCompositionQueryOptions(clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query cache key for GET /all-of-sibling
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAllOfSiblingQueryKey() {
  return ['all-of-sibling', 'GET', '/all-of-sibling'] as const
}

/**
 * GET /all-of-sibling
 */
export async function getAllOfSibling(options?: ClientRequestOptions) {
  return await parseResponse(client['all-of-sibling'].$get(undefined, options))
}

/**
 * Returns TanStack Query query options for GET /all-of-sibling
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAllOfSiblingQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetAllOfSiblingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAllOfSibling({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /all-of-sibling
 */
export function useGetAllOfSibling(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAllOfSibling>>, Error>
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetAllOfSiblingQueryOptions(clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query cache key for GET /nullable-one-of
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNullableOneOfQueryKey() {
  return ['nullable-one-of', 'GET', '/nullable-one-of'] as const
}

/**
 * GET /nullable-one-of
 */
export async function getNullableOneOf(options?: ClientRequestOptions) {
  return await parseResponse(client['nullable-one-of'].$get(undefined, options))
}

/**
 * Returns TanStack Query query options for GET /nullable-one-of
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNullableOneOfQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetNullableOneOfQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableOneOf({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /nullable-one-of
 */
export function useGetNullableOneOf(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNullableOneOf>>, Error>
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetNullableOneOfQueryOptions(clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query cache key for GET /any-of-three
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAnyOfThreeQueryKey() {
  return ['any-of-three', 'GET', '/any-of-three'] as const
}

/**
 * GET /any-of-three
 */
export async function getAnyOfThree(options?: ClientRequestOptions) {
  return await parseResponse(client['any-of-three'].$get(undefined, options))
}

/**
 * Returns TanStack Query query options for GET /any-of-three
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAnyOfThreeQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetAnyOfThreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfThree({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /any-of-three
 */
export function useGetAnyOfThree(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAnyOfThree>>, Error>
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetAnyOfThreeQueryOptions(clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query cache key for GET /any-of-ref
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAnyOfRefQueryKey() {
  return ['any-of-ref', 'GET', '/any-of-ref'] as const
}

/**
 * GET /any-of-ref
 */
export async function getAnyOfRef(options?: ClientRequestOptions) {
  return await parseResponse(client['any-of-ref'].$get(undefined, options))
}

/**
 * Returns TanStack Query query options for GET /any-of-ref
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAnyOfRefQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetAnyOfRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfRef({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /any-of-ref
 */
export function useGetAnyOfRef(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAnyOfRef>>, Error>
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetAnyOfRefQueryOptions(clientOptions), ...queryOpts })
}
