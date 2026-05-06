import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getAdditionalPropsKey() {
  return ['additional-props'] as const
}

export function getComposedKey() {
  return ['composed'] as const
}

export function getDeepNestedKey() {
  return ['deep-nested'] as const
}

export function getDiscriminatedKey() {
  return ['discriminated'] as const
}

export function getNullableKey() {
  return ['nullable'] as const
}

export async function postNullable(
  args: InferRequestType<typeof client.nullable.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.nullable.$post(args, options))
}

export function getPostNullableMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['nullable', '/nullable', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.nullable.$post>) {
      return postNullable(args, options)
    },
  }
}

export function usePostNullable<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postNullable>>,
    TError,
    InferRequestType<typeof client.nullable.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostNullableMutationOptions<TError>(clientOptions),
  })
}

export async function postDiscriminated(
  args: InferRequestType<typeof client.discriminated.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.discriminated.$post(args, options))
}

export function getPostDiscriminatedMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['discriminated', '/discriminated', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.discriminated.$post>) {
      return postDiscriminated(args, options)
    },
  }
}

export function usePostDiscriminated<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postDiscriminated>>,
    TError,
    InferRequestType<typeof client.discriminated.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    ...getPostDiscriminatedMutationOptions<TError>(clientOptions),
  })
}

export function getComposedQueryKey() {
  return ['composed', '/composed'] as const
}

export async function getComposed(options?: ClientRequestOptions) {
  return await parseResponse(client.composed.$get(undefined, options))
}

export function getComposedQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getComposedQueryKey(),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getComposedQueryKey>>) {
      return getComposed({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useComposed<
  TData = Awaited<ReturnType<typeof getComposed>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getComposed>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getComposed>>,
    ReturnType<typeof getComposedQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getComposedQueryKey(),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getComposedQueryKey>>) {
      return getComposed({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getDeepNestedQueryKey() {
  return ['deep-nested', '/deep-nested'] as const
}

export async function getDeepNested(options?: ClientRequestOptions) {
  return await parseResponse(client['deep-nested'].$get(undefined, options))
}

export function getDeepNestedQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getDeepNestedQueryKey(),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getDeepNestedQueryKey>>) {
      return getDeepNested({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useDeepNested<
  TData = Awaited<ReturnType<typeof getDeepNested>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getDeepNested>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getDeepNested>>,
    ReturnType<typeof getDeepNestedQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getDeepNestedQueryKey(),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getDeepNestedQueryKey>>) {
      return getDeepNested({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getAdditionalPropsQueryKey() {
  return ['additional-props', '/additional-props'] as const
}

export async function getAdditionalProps(options?: ClientRequestOptions) {
  return await parseResponse(client['additional-props'].$get(undefined, options))
}

export function getAdditionalPropsQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getAdditionalPropsQueryKey(),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getAdditionalPropsQueryKey>>) {
      return getAdditionalProps({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useAdditionalProps<
  TData = Awaited<ReturnType<typeof getAdditionalProps>>,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getAdditionalProps>>,
    TError,
    TData,
    Awaited<ReturnType<typeof getAdditionalProps>>,
    ReturnType<typeof getAdditionalPropsQueryKey>
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getAdditionalPropsQueryKey(),
    queryFn({ signal }: QueryFunctionContext<ReturnType<typeof getAdditionalPropsQueryKey>>) {
      return getAdditionalProps({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}
