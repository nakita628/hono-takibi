import {
  useQuery,
  useSuspenseQuery,
  useInfiniteQuery,
  useSuspenseInfiniteQuery,
  useMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseInfiniteQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getAllOfKey() {
  return ['all-of'] as const
}

export function getAllOfSiblingKey() {
  return ['all-of-sibling'] as const
}

export function getAnyOfKey() {
  return ['any-of'] as const
}

export function getAnyOfRefKey() {
  return ['any-of-ref'] as const
}

export function getAnyOfThreeKey() {
  return ['any-of-three'] as const
}

export function getNotKey() {
  return ['not'] as const
}

export function getNotCompositionKey() {
  return ['not-composition'] as const
}

export function getNotConstKey() {
  return ['not-const'] as const
}

export function getNotEnumKey() {
  return ['not-enum'] as const
}

export function getNotRefKey() {
  return ['not-ref'] as const
}

export function getNullableOneOfKey() {
  return ['nullable-one-of'] as const
}

export function getOneOfKey() {
  return ['one-of'] as const
}

export async function postOneOf(
  args: InferRequestType<(typeof client)['one-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['one-of'].$post(args, options))
}

export function getPostOneOfMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['one-of', '/one-of', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['one-of']['$post']>) {
      return postOneOf(args, options)
    },
  })
}

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

export async function postAnyOf(
  args: InferRequestType<(typeof client)['any-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['any-of'].$post(args, options))
}

export function getPostAnyOfMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['any-of', '/any-of', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['any-of']['$post']>) {
      return postAnyOf(args, options)
    },
  })
}

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

export async function postAllOf(
  args: InferRequestType<(typeof client)['all-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['all-of'].$post(args, options))
}

export function getPostAllOfMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['all-of', '/all-of', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['all-of']['$post']>) {
      return postAllOf(args, options)
    },
  })
}

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

export async function postNot(
  args: InferRequestType<typeof client.not.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.not.$post(args, options))
}

export function getPostNotMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['not', '/not', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.not.$post>) {
      return postNot(args, options)
    },
  })
}

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

export function getNotRefQueryKey() {
  return ['not-ref', '/not-ref'] as const
}

export async function getNotRef(options?: ClientRequestOptions) {
  return await parseResponse(client['not-ref'].$get(undefined, options))
}

export function getNotRefQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotRef({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useNotRef<TData = Awaited<ReturnType<typeof getNotRef>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotRef>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getNotRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotRef({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseNotRef<TData = Awaited<ReturnType<typeof getNotRef>>>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getNotRef>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getNotRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotRef({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getNotRefInfiniteQueryKey() {
  return ['not-ref', '/not-ref', 'infinite'] as const
}

export function getNotRefInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNotRefInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotRef({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteNotRef(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getNotRef>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getNotRefInfiniteQueryOptions(clientOptions) })
}

export function useSuspenseInfiniteNotRef(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getNotRef>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getNotRefInfiniteQueryOptions(clientOptions),
  })
}

export function getNotEnumQueryKey() {
  return ['not-enum', '/not-enum'] as const
}

export async function getNotEnum(options?: ClientRequestOptions) {
  return await parseResponse(client['not-enum'].$get(undefined, options))
}

export function getNotEnumQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotEnumQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotEnum({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useNotEnum<TData = Awaited<ReturnType<typeof getNotEnum>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotEnum>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getNotEnumQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotEnum({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseNotEnum<TData = Awaited<ReturnType<typeof getNotEnum>>>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getNotEnum>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getNotEnumQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotEnum({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getNotEnumInfiniteQueryKey() {
  return ['not-enum', '/not-enum', 'infinite'] as const
}

export function getNotEnumInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNotEnumInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotEnum({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteNotEnum(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getNotEnum>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getNotEnumInfiniteQueryOptions(clientOptions) })
}

export function useSuspenseInfiniteNotEnum(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getNotEnum>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getNotEnumInfiniteQueryOptions(clientOptions),
  })
}

export function getNotConstQueryKey() {
  return ['not-const', '/not-const'] as const
}

export async function getNotConst(options?: ClientRequestOptions) {
  return await parseResponse(client['not-const'].$get(undefined, options))
}

export function getNotConstQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotConstQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotConst({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useNotConst<TData = Awaited<ReturnType<typeof getNotConst>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotConst>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getNotConstQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotConst({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseNotConst<TData = Awaited<ReturnType<typeof getNotConst>>>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getNotConst>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getNotConstQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotConst({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getNotConstInfiniteQueryKey() {
  return ['not-const', '/not-const', 'infinite'] as const
}

export function getNotConstInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNotConstInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotConst({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteNotConst(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getNotConst>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getNotConstInfiniteQueryOptions(clientOptions) })
}

export function useSuspenseInfiniteNotConst(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getNotConst>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getNotConstInfiniteQueryOptions(clientOptions),
  })
}

export function getNotCompositionQueryKey() {
  return ['not-composition', '/not-composition'] as const
}

export async function getNotComposition(options?: ClientRequestOptions) {
  return await parseResponse(client['not-composition'].$get(undefined, options))
}

export function getNotCompositionQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotCompositionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotComposition({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useNotComposition<TData = Awaited<ReturnType<typeof getNotComposition>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotComposition>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getNotCompositionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotComposition({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseNotComposition<
  TData = Awaited<ReturnType<typeof getNotComposition>>,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getNotComposition>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getNotCompositionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotComposition({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getNotCompositionInfiniteQueryKey() {
  return ['not-composition', '/not-composition', 'infinite'] as const
}

export function getNotCompositionInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNotCompositionInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotComposition({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteNotComposition(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getNotComposition>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getNotCompositionInfiniteQueryOptions(clientOptions),
  })
}

export function useSuspenseInfiniteNotComposition(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getNotComposition>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getNotCompositionInfiniteQueryOptions(clientOptions),
  })
}

export function getAllOfSiblingQueryKey() {
  return ['all-of-sibling', '/all-of-sibling'] as const
}

export async function getAllOfSibling(options?: ClientRequestOptions) {
  return await parseResponse(client['all-of-sibling'].$get(undefined, options))
}

export function getAllOfSiblingQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getAllOfSiblingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAllOfSibling({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useAllOfSibling<TData = Awaited<ReturnType<typeof getAllOfSibling>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAllOfSibling>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getAllOfSiblingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAllOfSibling({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseAllOfSibling<
  TData = Awaited<ReturnType<typeof getAllOfSibling>>,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAllOfSibling>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getAllOfSiblingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAllOfSibling({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getAllOfSiblingInfiniteQueryKey() {
  return ['all-of-sibling', '/all-of-sibling', 'infinite'] as const
}

export function getAllOfSiblingInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getAllOfSiblingInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAllOfSibling({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteAllOfSibling(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getAllOfSibling>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getAllOfSiblingInfiniteQueryOptions(clientOptions),
  })
}

export function useSuspenseInfiniteAllOfSibling(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getAllOfSibling>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getAllOfSiblingInfiniteQueryOptions(clientOptions),
  })
}

export function getNullableOneOfQueryKey() {
  return ['nullable-one-of', '/nullable-one-of'] as const
}

export async function getNullableOneOf(options?: ClientRequestOptions) {
  return await parseResponse(client['nullable-one-of'].$get(undefined, options))
}

export function getNullableOneOfQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNullableOneOfQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableOneOf({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useNullableOneOf<TData = Awaited<ReturnType<typeof getNullableOneOf>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNullableOneOf>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getNullableOneOfQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableOneOf({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseNullableOneOf<
  TData = Awaited<ReturnType<typeof getNullableOneOf>>,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getNullableOneOf>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getNullableOneOfQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableOneOf({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getNullableOneOfInfiniteQueryKey() {
  return ['nullable-one-of', '/nullable-one-of', 'infinite'] as const
}

export function getNullableOneOfInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNullableOneOfInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableOneOf({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteNullableOneOf(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getNullableOneOf>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getNullableOneOfInfiniteQueryOptions(clientOptions),
  })
}

export function useSuspenseInfiniteNullableOneOf(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getNullableOneOf>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getNullableOneOfInfiniteQueryOptions(clientOptions),
  })
}

export function getAnyOfThreeQueryKey() {
  return ['any-of-three', '/any-of-three'] as const
}

export async function getAnyOfThree(options?: ClientRequestOptions) {
  return await parseResponse(client['any-of-three'].$get(undefined, options))
}

export function getAnyOfThreeQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getAnyOfThreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfThree({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useAnyOfThree<TData = Awaited<ReturnType<typeof getAnyOfThree>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAnyOfThree>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getAnyOfThreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfThree({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseAnyOfThree<TData = Awaited<ReturnType<typeof getAnyOfThree>>>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAnyOfThree>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getAnyOfThreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfThree({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getAnyOfThreeInfiniteQueryKey() {
  return ['any-of-three', '/any-of-three', 'infinite'] as const
}

export function getAnyOfThreeInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getAnyOfThreeInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfThree({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteAnyOfThree(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getAnyOfThree>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getAnyOfThreeInfiniteQueryOptions(clientOptions) })
}

export function useSuspenseInfiniteAnyOfThree(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getAnyOfThree>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getAnyOfThreeInfiniteQueryOptions(clientOptions),
  })
}

export function getAnyOfRefQueryKey() {
  return ['any-of-ref', '/any-of-ref'] as const
}

export async function getAnyOfRef(options?: ClientRequestOptions) {
  return await parseResponse(client['any-of-ref'].$get(undefined, options))
}

export function getAnyOfRefQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getAnyOfRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfRef({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useAnyOfRef<TData = Awaited<ReturnType<typeof getAnyOfRef>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAnyOfRef>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getAnyOfRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfRef({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseAnyOfRef<TData = Awaited<ReturnType<typeof getAnyOfRef>>>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAnyOfRef>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getAnyOfRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfRef({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getAnyOfRefInfiniteQueryKey() {
  return ['any-of-ref', '/any-of-ref', 'infinite'] as const
}

export function getAnyOfRefInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getAnyOfRefInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfRef({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteAnyOfRef(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getAnyOfRef>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getAnyOfRefInfiniteQueryOptions(clientOptions) })
}

export function useSuspenseInfiniteAnyOfRef(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getAnyOfRef>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getAnyOfRefInfiniteQueryOptions(clientOptions),
  })
}
