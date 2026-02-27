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
 * Generates TanStack Query mutation key for POST /expressions
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostExpressionsMutationKey() {
  return ['expressions', 'POST', '/expressions'] as const
}

/**
 * POST /expressions
 *
 * Circular reference with oneOf (expression tree)
 */
export async function postExpressions(
  args: InferRequestType<typeof client.expressions.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.expressions.$post(args, options))
}

/**
 * Returns TanStack Query mutation options for POST /expressions
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostExpressionsMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostExpressionsMutationKey(),
    async mutationFn(args: Parameters<typeof postExpressions>[0]) {
      return postExpressions(args, clientOptions)
    },
  })
}

/**
 * POST /expressions
 *
 * Circular reference with oneOf (expression tree)
 */
export function usePostExpressions(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postExpressions>>,
    Error,
    Parameters<typeof postExpressions>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostExpressionsMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query mutation key for POST /shapes
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostShapesMutationKey() {
  return ['shapes', 'POST', '/shapes'] as const
}

/**
 * POST /shapes
 *
 * 5-variant discriminated union
 */
export async function postShapes(
  args: InferRequestType<typeof client.shapes.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.shapes.$post(args, options))
}

/**
 * Returns TanStack Query mutation options for POST /shapes
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostShapesMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostShapesMutationKey(),
    async mutationFn(args: Parameters<typeof postShapes>[0]) {
      return postShapes(args, clientOptions)
    },
  })
}

/**
 * POST /shapes
 *
 * 5-variant discriminated union
 */
export function usePostShapes(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postShapes>>,
    Error,
    Parameters<typeof postShapes>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostShapesMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query mutation key for POST /documents
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostDocumentsMutationKey() {
  return ['documents', 'POST', '/documents'] as const
}

/**
 * POST /documents
 *
 * allOf inside oneOf (nested composition)
 */
export async function postDocuments(
  args: InferRequestType<typeof client.documents.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.documents.$post(args, options))
}

/**
 * Returns TanStack Query mutation options for POST /documents
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostDocumentsMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostDocumentsMutationKey(),
    async mutationFn(args: Parameters<typeof postDocuments>[0]) {
      return postDocuments(args, clientOptions)
    },
  })
}

/**
 * POST /documents
 *
 * allOf inside oneOf (nested composition)
 */
export function usePostDocuments(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postDocuments>>,
    Error,
    Parameters<typeof postDocuments>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostDocumentsMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query mutation key for POST /configs
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostConfigsMutationKey() {
  return ['configs', 'POST', '/configs'] as const
}

/**
 * POST /configs
 *
 * Deeply nested allOf chain
 */
export async function postConfigs(
  args: InferRequestType<typeof client.configs.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.configs.$post(args, options))
}

/**
 * Returns TanStack Query mutation options for POST /configs
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostConfigsMutationOptions(clientOptions?: ClientRequestOptions) {
  return mutationOptions({
    mutationKey: getPostConfigsMutationKey(),
    async mutationFn(args: Parameters<typeof postConfigs>[0]) {
      return postConfigs(args, clientOptions)
    },
  })
}

/**
 * POST /configs
 *
 * Deeply nested allOf chain
 */
export function usePostConfigs(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postConfigs>>,
    Error,
    Parameters<typeof postConfigs>[0]
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOpts, client: clientOptions } = options ?? {}
  return useMutation({ ...getPostConfigsMutationOptions(clientOptions), ...mutationOpts })
}

/**
 * Generates TanStack Query cache key for GET /nullable-union
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNullableUnionQueryKey() {
  return ['nullable-union', 'GET', '/nullable-union'] as const
}

/**
 * GET /nullable-union
 *
 * Nullable anyOf with mixed types
 */
export async function getNullableUnion(options?: ClientRequestOptions) {
  return await parseResponse(client['nullable-union'].$get(undefined, options))
}

/**
 * Returns TanStack Query query options for GET /nullable-union
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNullableUnionQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetNullableUnionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableUnion({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /nullable-union
 *
 * Nullable anyOf with mixed types
 */
export function useGetNullableUnion(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNullableUnion>>, Error>
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetNullableUnionQueryOptions(clientOptions), ...queryOpts })
}

/**
 * Generates TanStack Query cache key for GET /nested-circular
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNestedCircularQueryKey() {
  return ['nested-circular', 'GET', '/nested-circular'] as const
}

/**
 * GET /nested-circular
 *
 * Circular reference through allOf
 */
export async function getNestedCircular(options?: ClientRequestOptions) {
  return await parseResponse(client['nested-circular'].$get(undefined, options))
}

/**
 * Returns TanStack Query query options for GET /nested-circular
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNestedCircularQueryOptions(clientOptions?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetNestedCircularQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNestedCircular({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

/**
 * GET /nested-circular
 *
 * Circular reference through allOf
 */
export function useGetNestedCircular(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNestedCircular>>, Error>
  client?: ClientRequestOptions
}) {
  const { query: queryOpts, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetNestedCircularQueryOptions(clientOptions), ...queryOpts })
}
