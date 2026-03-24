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

export function getConfigsKey() {
  return ['configs'] as const
}

export function getDocumentsKey() {
  return ['documents'] as const
}

export function getExpressionsKey() {
  return ['expressions'] as const
}

export function getNestedCircularKey() {
  return ['nested-circular'] as const
}

export function getNullableUnionKey() {
  return ['nullable-union'] as const
}

export function getShapesKey() {
  return ['shapes'] as const
}

export async function postExpressions(
  args: InferRequestType<typeof client.expressions.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.expressions.$post(args, options))
}

export function getPostExpressionsMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['expressions', '/expressions', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.expressions.$post>) {
      return postExpressions(args, options)
    },
  })
}

export function usePostExpressions(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postExpressions>>,
    Error,
    InferRequestType<typeof client.expressions.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostExpressionsMutationOptions(clientOptions), ...mutationOptions })
}

export async function postShapes(
  args: InferRequestType<typeof client.shapes.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.shapes.$post(args, options))
}

export function getPostShapesMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['shapes', '/shapes', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.shapes.$post>) {
      return postShapes(args, options)
    },
  })
}

export function usePostShapes(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postShapes>>,
    Error,
    InferRequestType<typeof client.shapes.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostShapesMutationOptions(clientOptions), ...mutationOptions })
}

export async function postDocuments(
  args: InferRequestType<typeof client.documents.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.documents.$post(args, options))
}

export function getPostDocumentsMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['documents', '/documents', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.documents.$post>) {
      return postDocuments(args, options)
    },
  })
}

export function usePostDocuments(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postDocuments>>,
    Error,
    InferRequestType<typeof client.documents.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostDocumentsMutationOptions(clientOptions), ...mutationOptions })
}

export async function postConfigs(
  args: InferRequestType<typeof client.configs.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.configs.$post(args, options))
}

export function getPostConfigsMutationOptions(options?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: ['configs', '/configs', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.configs.$post>) {
      return postConfigs(args, options)
    },
  })
}

export function usePostConfigs(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postConfigs>>,
    Error,
    InferRequestType<typeof client.configs.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostConfigsMutationOptions(clientOptions), ...mutationOptions })
}

export function getNullableUnionQueryKey() {
  return ['nullable-union', '/nullable-union'] as const
}

export async function getNullableUnion(options?: ClientRequestOptions) {
  return await parseResponse(client['nullable-union'].$get(undefined, options))
}

export function getNullableUnionQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNullableUnionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableUnion({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useNullableUnion<TData = Awaited<ReturnType<typeof getNullableUnion>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNullableUnion>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getNullableUnionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableUnion({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseNullableUnion<
  TData = Awaited<ReturnType<typeof getNullableUnion>>,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getNullableUnion>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getNullableUnionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableUnion({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getNullableUnionInfiniteQueryKey() {
  return ['nullable-union', '/nullable-union', 'infinite'] as const
}

export function getNullableUnionInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNullableUnionInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableUnion({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteNullableUnion(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getNullableUnion>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getNullableUnionInfiniteQueryOptions(clientOptions),
  })
}

export function useSuspenseInfiniteNullableUnion(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getNullableUnion>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getNullableUnionInfiniteQueryOptions(clientOptions),
  })
}

export function getNestedCircularQueryKey() {
  return ['nested-circular', '/nested-circular'] as const
}

export async function getNestedCircular(options?: ClientRequestOptions) {
  return await parseResponse(client['nested-circular'].$get(undefined, options))
}

export function getNestedCircularQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNestedCircularQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNestedCircular({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useNestedCircular<TData = Awaited<ReturnType<typeof getNestedCircular>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNestedCircular>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getNestedCircularQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNestedCircular({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function useSuspenseNestedCircular<
  TData = Awaited<ReturnType<typeof getNestedCircular>>,
>(options?: {
  query?: UseSuspenseQueryOptions<Awaited<ReturnType<typeof getNestedCircular>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery({
    ...queryOptions,
    queryKey: getNestedCircularQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNestedCircular({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getNestedCircularInfiniteQueryKey() {
  return ['nested-circular', '/nested-circular', 'infinite'] as const
}

export function getNestedCircularInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNestedCircularInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNestedCircular({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteNestedCircular(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getNestedCircular>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getNestedCircularInfiniteQueryOptions(clientOptions),
  })
}

export function useSuspenseInfiniteNestedCircular(options: {
  query: UseSuspenseInfiniteQueryOptions<Awaited<ReturnType<typeof getNestedCircular>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseInfiniteQuery({
    ...queryOptions,
    ...getNestedCircularInfiniteQueryOptions(clientOptions),
  })
}
