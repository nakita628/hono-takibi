import {
  useQuery,
  useSuspenseQuery,
  useMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/preact-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseSuspenseQueryOptions,
  UseMutationOptions,
} from '@tanstack/preact-query'
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

export function getPostOneOfMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof postOneOf>>,
    TError,
    InferRequestType<(typeof client)['one-of']['$post']>
  >({
    mutationKey: ['one-of', '/one-of', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['one-of']['$post']>) {
      return postOneOf(args, options)
    },
  })
}

export function usePostOneOf<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postOneOf>>,
    TError,
    InferRequestType<(typeof client)['one-of']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostOneOfMutationOptions<TError>(clientOptions) })
}

export async function postAnyOf(
  args: InferRequestType<(typeof client)['any-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['any-of'].$post(args, options))
}

export function getPostAnyOfMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof postAnyOf>>,
    TError,
    InferRequestType<(typeof client)['any-of']['$post']>
  >({
    mutationKey: ['any-of', '/any-of', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['any-of']['$post']>) {
      return postAnyOf(args, options)
    },
  })
}

export function usePostAnyOf<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAnyOf>>,
    TError,
    InferRequestType<(typeof client)['any-of']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostAnyOfMutationOptions<TError>(clientOptions) })
}

export async function postAllOf(
  args: InferRequestType<(typeof client)['all-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['all-of'].$post(args, options))
}

export function getPostAllOfMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof postAllOf>>,
    TError,
    InferRequestType<(typeof client)['all-of']['$post']>
  >({
    mutationKey: ['all-of', '/all-of', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['all-of']['$post']>) {
      return postAllOf(args, options)
    },
  })
}

export function usePostAllOf<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postAllOf>>,
    TError,
    InferRequestType<(typeof client)['all-of']['$post']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostAllOfMutationOptions<TError>(clientOptions) })
}

export async function postNot(
  args: InferRequestType<typeof client.not.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.not.$post(args, options))
}

export function getPostNotMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return mutationOptions<
    Awaited<ReturnType<typeof postNot>>,
    TError,
    InferRequestType<typeof client.not.$post>
  >({
    mutationKey: ['not', '/not', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.not.$post>) {
      return postNot(args, options)
    },
  })
}

export function usePostNot<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postNot>>,
    TError,
    InferRequestType<typeof client.not.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostNotMutationOptions<TError>(clientOptions) })
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

export function useNotRef<
  TData = Awaited<ReturnType<typeof getNotRef>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotRef>>, TError, TData>
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

export function useSuspenseNotRef<
  TData = Awaited<ReturnType<typeof getNotRef>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getNotRef>>, TError, TData>
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

export function useNotEnum<
  TData = Awaited<ReturnType<typeof getNotEnum>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotEnum>>, TError, TData>
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

export function useSuspenseNotEnum<
  TData = Awaited<ReturnType<typeof getNotEnum>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getNotEnum>>, TError, TData>
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

export function useNotConst<
  TData = Awaited<ReturnType<typeof getNotConst>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotConst>>, TError, TData>
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

export function useSuspenseNotConst<
  TData = Awaited<ReturnType<typeof getNotConst>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getNotConst>>, TError, TData>
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

export function useNotComposition<
  TData = Awaited<ReturnType<typeof getNotComposition>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNotComposition>>, TError, TData>
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
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getNotComposition>>, TError, TData>
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

export function useAllOfSibling<
  TData = Awaited<ReturnType<typeof getAllOfSibling>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAllOfSibling>>, TError, TData>
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
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAllOfSibling>>, TError, TData>
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

export function useNullableOneOf<
  TData = Awaited<ReturnType<typeof getNullableOneOf>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNullableOneOf>>, TError, TData>
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
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getNullableOneOf>>, TError, TData>
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

export function useAnyOfThree<
  TData = Awaited<ReturnType<typeof getAnyOfThree>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAnyOfThree>>, TError, TData>
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

export function useSuspenseAnyOfThree<
  TData = Awaited<ReturnType<typeof getAnyOfThree>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAnyOfThree>>, TError, TData>
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

export function useAnyOfRef<
  TData = Awaited<ReturnType<typeof getAnyOfRef>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getAnyOfRef>>, TError, TData>
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

export function useSuspenseAnyOfRef<
  TData = Awaited<ReturnType<typeof getAnyOfRef>>,
  TError = unknown,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAnyOfRef>>, TError, TData>
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
