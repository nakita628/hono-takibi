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

export function getPostNullableMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['nullable', '/nullable', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.nullable.$post>) {
      return parseResponse(client.nullable.$post(args, options))
    },
  }
}

export function usePostNullable<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.nullable.$post>>>>>,
    TError,
    InferRequestType<typeof client.nullable.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostNullableMutationOptions(clientOptions) })
}

export function getPostDiscriminatedMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['discriminated', '/discriminated', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.discriminated.$post>) {
      return parseResponse(client.discriminated.$post(args, options))
    },
  }
}

export function usePostDiscriminated<TError = unknown>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.discriminated.$post>>>>
    >,
    TError,
    InferRequestType<typeof client.discriminated.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...mutationOptions, ...getPostDiscriminatedMutationOptions(clientOptions) })
}

export function getComposedQueryKey() {
  return ['composed', '/composed'] as const
}

export function getComposedQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getComposedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client.composed.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useComposed<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.composed.$get>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.composed.$get>>>>>,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getComposedQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.composed.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getDeepNestedQueryKey() {
  return ['deep-nested', '/deep-nested'] as const
}

export function getDeepNestedQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getDeepNestedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['deep-nested'].$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  }
}

export function useDeepNested<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['deep-nested']['$get']>>>>
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['deep-nested']['$get']>>>>
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getDeepNestedQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client['deep-nested'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}

export function getAdditionalPropsQueryKey() {
  return ['additional-props', '/additional-props'] as const
}

export function getAdditionalPropsQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getAdditionalPropsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['additional-props'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  }
}

export function useAdditionalProps<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client)['additional-props']['$get']>>>
    >
  >,
  TError = unknown,
>(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['additional-props']['$get']>>>
      >
    >,
    TError,
    TData
  >
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getAdditionalPropsQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client['additional-props'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  })
}
