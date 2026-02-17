import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query mutation key for POST /expressions
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostExpressionsMutationKey() {
  return ['expressions', 'POST', '/expressions'] as const
}

/**
 * Returns Vue Query mutation options for POST /expressions
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostExpressionsMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostExpressionsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.expressions.$post>) {
      return parseResponse(client.expressions.$post(args, clientOptions))
    },
  }
}

/**
 * POST /expressions
 *
 * Circular reference with oneOf (expression tree)
 */
export function usePostExpressions(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.expressions.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.expressions.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostExpressionsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /shapes
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostShapesMutationKey() {
  return ['shapes', 'POST', '/shapes'] as const
}

/**
 * Returns Vue Query mutation options for POST /shapes
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostShapesMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostShapesMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.shapes.$post>) {
      return parseResponse(client.shapes.$post(args, clientOptions))
    },
  }
}

/**
 * POST /shapes
 *
 * 5-variant discriminated union
 */
export function usePostShapes(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.shapes.$post>>>>>,
        Error,
        InferRequestType<typeof client.shapes.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostShapesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /documents
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostDocumentsMutationKey() {
  return ['documents', 'POST', '/documents'] as const
}

/**
 * Returns Vue Query mutation options for POST /documents
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostDocumentsMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostDocumentsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.documents.$post>) {
      return parseResponse(client.documents.$post(args, clientOptions))
    },
  }
}

/**
 * POST /documents
 *
 * allOf inside oneOf (nested composition)
 */
export function usePostDocuments(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.documents.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.documents.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostDocumentsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /configs
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostConfigsMutationKey() {
  return ['configs', 'POST', '/configs'] as const
}

/**
 * Returns Vue Query mutation options for POST /configs
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostConfigsMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostConfigsMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.configs.$post>) {
      return parseResponse(client.configs.$post(args, clientOptions))
    },
  }
}

/**
 * POST /configs
 *
 * Deeply nested allOf chain
 */
export function usePostConfigs(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.configs.$post>>>>>,
        Error,
        InferRequestType<typeof client.configs.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostConfigsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /nullable-union
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNullableUnionQueryKey() {
  return ['nullable-union', 'GET', '/nullable-union'] as const
}

/**
 * Returns Vue Query query options for GET /nullable-union
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNullableUnionQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetNullableUnionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['nullable-union'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /nullable-union
 *
 * Nullable anyOf with mixed types
 */
export function useGetNullableUnion(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['nullable-union']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetNullableUnionQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /nested-circular
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNestedCircularQueryKey() {
  return ['nested-circular', 'GET', '/nested-circular'] as const
}

/**
 * Returns Vue Query query options for GET /nested-circular
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNestedCircularQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetNestedCircularQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['nested-circular'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /nested-circular
 *
 * Circular reference through allOf
 */
export function useGetNestedCircular(options?: {
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['nested-circular']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetNestedCircularQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
