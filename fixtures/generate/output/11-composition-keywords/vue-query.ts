import { useQuery, useInfiniteQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query mutation key for POST /one-of
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
 * Returns Vue Query mutation options for POST /one-of
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostOneOfMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostOneOfMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client)['one-of']['$post']>) {
      return postOneOf(args, options)
    },
  }
}

/**
 * POST /one-of
 */
export function usePostOneOf(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postOneOf>>,
    Error,
    InferRequestType<(typeof client)['one-of']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostOneOfMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates Vue Query mutation key for POST /any-of
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
 * Returns Vue Query mutation options for POST /any-of
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostAnyOfMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostAnyOfMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client)['any-of']['$post']>) {
      return postAnyOf(args, options)
    },
  }
}

/**
 * POST /any-of
 */
export function usePostAnyOf(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAnyOf>>,
    Error,
    InferRequestType<(typeof client)['any-of']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostAnyOfMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates Vue Query mutation key for POST /all-of
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
 * Returns Vue Query mutation options for POST /all-of
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostAllOfMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostAllOfMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client)['all-of']['$post']>) {
      return postAllOf(args, options)
    },
  }
}

/**
 * POST /all-of
 */
export function usePostAllOf(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAllOf>>,
    Error,
    InferRequestType<(typeof client)['all-of']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostAllOfMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates Vue Query mutation key for POST /not
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
 * Returns Vue Query mutation options for POST /not
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostNotMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostNotMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.not.$post>) {
      return postNot(args, options)
    },
  }
}

/**
 * POST /not
 */
export function usePostNot(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postNot>>,
    Error,
    InferRequestType<typeof client.not.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostNotMutationOptions(clientOptions), ...mutationOptions })
}

/**
 * Generates Vue Query cache key for GET /not-ref
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
 * Returns Vue Query query options for GET /not-ref
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNotRefQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetNotRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotRef({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /not-ref
 */
export function useGetNotRef(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotRef>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetNotRefQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /not-ref
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetNotRefInfiniteQueryKey() {
  return ['not-ref', 'GET', '/not-ref', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /not-ref
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetNotRefInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetNotRefInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotRef({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /not-ref
 */
export function useInfiniteGetNotRef(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getNotRef>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getGetNotRefInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /not-enum
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
 * Returns Vue Query query options for GET /not-enum
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNotEnumQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetNotEnumQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotEnum({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /not-enum
 */
export function useGetNotEnum(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotEnum>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetNotEnumQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /not-enum
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetNotEnumInfiniteQueryKey() {
  return ['not-enum', 'GET', '/not-enum', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /not-enum
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetNotEnumInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetNotEnumInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotEnum({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /not-enum
 */
export function useInfiniteGetNotEnum(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getNotEnum>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getGetNotEnumInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /not-const
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
 * Returns Vue Query query options for GET /not-const
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNotConstQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetNotConstQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotConst({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /not-const
 */
export function useGetNotConst(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotConst>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetNotConstQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /not-const
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetNotConstInfiniteQueryKey() {
  return ['not-const', 'GET', '/not-const', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /not-const
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetNotConstInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetNotConstInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotConst({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /not-const
 */
export function useInfiniteGetNotConst(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getNotConst>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getGetNotConstInfiniteQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query cache key for GET /not-composition
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
 * Returns Vue Query query options for GET /not-composition
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNotCompositionQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetNotCompositionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotComposition({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /not-composition
 */
export function useGetNotComposition(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotComposition>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetNotCompositionQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /not-composition
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetNotCompositionInfiniteQueryKey() {
  return ['not-composition', 'GET', '/not-composition', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /not-composition
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetNotCompositionInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetNotCompositionInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotComposition({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /not-composition
 */
export function useInfiniteGetNotComposition(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getNotComposition>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetNotCompositionInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /all-of-sibling
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
 * Returns Vue Query query options for GET /all-of-sibling
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAllOfSiblingQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetAllOfSiblingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAllOfSibling({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /all-of-sibling
 */
export function useGetAllOfSibling(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAllOfSibling>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetAllOfSiblingQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /all-of-sibling
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetAllOfSiblingInfiniteQueryKey() {
  return ['all-of-sibling', 'GET', '/all-of-sibling', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /all-of-sibling
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetAllOfSiblingInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetAllOfSiblingInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAllOfSibling({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /all-of-sibling
 */
export function useInfiniteGetAllOfSibling(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getAllOfSibling>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetAllOfSiblingInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /nullable-one-of
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
 * Returns Vue Query query options for GET /nullable-one-of
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNullableOneOfQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetNullableOneOfQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableOneOf({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /nullable-one-of
 */
export function useGetNullableOneOf(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNullableOneOf>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetNullableOneOfQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /nullable-one-of
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetNullableOneOfInfiniteQueryKey() {
  return ['nullable-one-of', 'GET', '/nullable-one-of', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /nullable-one-of
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetNullableOneOfInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetNullableOneOfInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableOneOf({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /nullable-one-of
 */
export function useInfiniteGetNullableOneOf(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getNullableOneOf>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetNullableOneOfInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /any-of-three
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
 * Returns Vue Query query options for GET /any-of-three
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAnyOfThreeQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetAnyOfThreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfThree({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /any-of-three
 */
export function useGetAnyOfThree(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAnyOfThree>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetAnyOfThreeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /any-of-three
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetAnyOfThreeInfiniteQueryKey() {
  return ['any-of-three', 'GET', '/any-of-three', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /any-of-three
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetAnyOfThreeInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetAnyOfThreeInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfThree({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /any-of-three
 */
export function useInfiniteGetAnyOfThree(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getAnyOfThree>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getGetAnyOfThreeInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /any-of-ref
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
 * Returns Vue Query query options for GET /any-of-ref
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAnyOfRefQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetAnyOfRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfRef({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /any-of-ref
 */
export function useGetAnyOfRef(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAnyOfRef>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getGetAnyOfRefQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Vue Query infinite query cache key for GET /any-of-ref
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetAnyOfRefInfiniteQueryKey() {
  return ['any-of-ref', 'GET', '/any-of-ref', 'infinite'] as const
}

/**
 * Returns Vue Query infinite query options for GET /any-of-ref
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetAnyOfRefInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetAnyOfRefInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfRef({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /any-of-ref
 */
export function useInfiniteGetAnyOfRef(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getAnyOfRef>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...getGetAnyOfRefInfiniteQueryOptions(clientOptions), ...queryOptions })
}
