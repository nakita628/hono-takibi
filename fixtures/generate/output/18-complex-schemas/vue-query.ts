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

/** Key prefix for /configs */
export function getConfigsKey() {
  return ['configs'] as const
}

/** Key prefix for /documents */
export function getDocumentsKey() {
  return ['documents'] as const
}

/** Key prefix for /expressions */
export function getExpressionsKey() {
  return ['expressions'] as const
}

/** Key prefix for /nested-circular */
export function getNestedCircularKey() {
  return ['nested-circular'] as const
}

/** Key prefix for /nullable-union */
export function getNullableUnionKey() {
  return ['nullable-union'] as const
}

/** Key prefix for /shapes */
export function getShapesKey() {
  return ['shapes'] as const
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

/** POST /expressions */
export function getPostExpressionsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['expressions', '/expressions'] as const,
    async mutationFn(args: InferRequestType<typeof client.expressions.$post>) {
      return postExpressions(args, options)
    },
  }
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
    InferRequestType<typeof client.expressions.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostExpressionsMutationOptions(clientOptions), ...mutationOptions })
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

/** POST /shapes */
export function getPostShapesMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['shapes', '/shapes'] as const,
    async mutationFn(args: InferRequestType<typeof client.shapes.$post>) {
      return postShapes(args, options)
    },
  }
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
    InferRequestType<typeof client.shapes.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostShapesMutationOptions(clientOptions), ...mutationOptions })
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

/** POST /documents */
export function getPostDocumentsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['documents', '/documents'] as const,
    async mutationFn(args: InferRequestType<typeof client.documents.$post>) {
      return postDocuments(args, options)
    },
  }
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
    InferRequestType<typeof client.documents.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostDocumentsMutationOptions(clientOptions), ...mutationOptions })
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

/** POST /configs */
export function getPostConfigsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['configs', '/configs'] as const,
    async mutationFn(args: InferRequestType<typeof client.configs.$post>) {
      return postConfigs(args, options)
    },
  }
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
    InferRequestType<typeof client.configs.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostConfigsMutationOptions(clientOptions), ...mutationOptions })
}

/** GET /nullable-union query key */
export function getNullableUnionQueryKey() {
  return ['nullable-union', '/nullable-union'] as const
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
 * GET /nullable-union query options
 */
export function getNullableUnionQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNullableUnionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableUnion({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /nullable-union
 *
 * Nullable anyOf with mixed types
 */
export function useNullableUnion(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNullableUnion>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getNullableUnionQueryOptions(clientOptions), ...queryOptions })
}

/** GET /nullable-union infinite query key */
export function getNullableUnionInfiniteQueryKey() {
  return ['nullable-union', '/nullable-union', 'infinite'] as const
}

/**
 * GET /nullable-union infinite query options
 */
export function getNullableUnionInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNullableUnionInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableUnion({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /nullable-union
 *
 * Nullable anyOf with mixed types
 */
export function useInfiniteNullableUnion(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getNullableUnion>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getNullableUnionInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/** GET /nested-circular query key */
export function getNestedCircularQueryKey() {
  return ['nested-circular', '/nested-circular'] as const
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
 * GET /nested-circular query options
 */
export function getNestedCircularQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNestedCircularQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNestedCircular({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /nested-circular
 *
 * Circular reference through allOf
 */
export function useNestedCircular(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getNestedCircular>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getNestedCircularQueryOptions(clientOptions), ...queryOptions })
}

/** GET /nested-circular infinite query key */
export function getNestedCircularInfiniteQueryKey() {
  return ['nested-circular', '/nested-circular', 'infinite'] as const
}

/**
 * GET /nested-circular infinite query options
 */
export function getNestedCircularInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNestedCircularInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNestedCircular({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /nested-circular
 *
 * Circular reference through allOf
 */
export function useInfiniteNestedCircular(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getNestedCircular>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getNestedCircularInfiniteQueryOptions(clientOptions),
    ...queryOptions,
  })
}
