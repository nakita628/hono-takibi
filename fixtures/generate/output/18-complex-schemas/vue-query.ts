import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
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

export function getPostExpressionsMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['expressions', '/expressions', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.expressions.$post>) {
      return postExpressions(args, options)
    },
  }
}

export function usePostExpressions<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postExpressions>>,
    TError,
    InferRequestType<typeof client.expressions.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostExpressionsMutationOptions<TError>(clientOptions),
  })
}

export async function postShapes(
  args: InferRequestType<typeof client.shapes.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.shapes.$post(args, options))
}

export function getPostShapesMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['shapes', '/shapes', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.shapes.$post>) {
      return postShapes(args, options)
    },
  }
}

export function usePostShapes<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postShapes>>,
    TError,
    InferRequestType<typeof client.shapes.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostShapesMutationOptions<TError>(clientOptions) })
}

export async function postDocuments(
  args: InferRequestType<typeof client.documents.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.documents.$post(args, options))
}

export function getPostDocumentsMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['documents', '/documents', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.documents.$post>) {
      return postDocuments(args, options)
    },
  }
}

export function usePostDocuments<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postDocuments>>,
    TError,
    InferRequestType<typeof client.documents.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostDocumentsMutationOptions<TError>(clientOptions),
  })
}

export async function postConfigs(
  args: InferRequestType<typeof client.configs.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.configs.$post(args, options))
}

export function getPostConfigsMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['configs', '/configs', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.configs.$post>) {
      return postConfigs(args, options)
    },
  }
}

export function usePostConfigs<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postConfigs>>,
    TError,
    InferRequestType<typeof client.configs.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostConfigsMutationOptions<TError>(clientOptions),
  })
}

export function getNullableUnionQueryKey() {
  return ['nullable-union', '/nullable-union'] as const
}

export async function getNullableUnion(options?: ClientRequestOptions) {
  return await parseResponse(client['nullable-union'].$get(undefined, options))
}

export function getNullableUnionQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNullableUnionQueryKey(),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getNullableUnionQueryKey>>) {
      return getNullableUnion({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useNullableUnion<
  TData = Awaited<ReturnType<typeof getNullableUnion>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getNullableUnion>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getNullableUnion>>,
    ReturnType<typeof getNullableUnionQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getNullableUnionQueryKey(),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getNullableUnionQueryKey>>) {
      return getNullableUnion({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getNestedCircularQueryKey() {
  return ['nested-circular', '/nested-circular'] as const
}

export async function getNestedCircular(options?: ClientRequestOptions) {
  return await parseResponse(client['nested-circular'].$get(undefined, options))
}

export function getNestedCircularQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNestedCircularQueryKey(),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getNestedCircularQueryKey>>) {
      return getNestedCircular({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useNestedCircular<
  TData = Awaited<ReturnType<typeof getNestedCircular>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getNestedCircular>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getNestedCircular>>,
    ReturnType<typeof getNestedCircularQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getNestedCircularQueryKey(),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getNestedCircularQueryKey>>) {
      return getNestedCircular({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}
