import {
  createQuery,
  createInfiniteQuery,
  createMutation,
  queryOptions,
} from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateInfiniteQueryOptions,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Svelte Query mutation key for POST /expressions
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
 * Returns Svelte Query mutation options for POST /expressions
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostExpressionsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostExpressionsMutationKey(),
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
export function createPostExpressions(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postExpressions>>,
      Error,
      InferRequestType<typeof client.expressions.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostExpressionsMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query mutation key for POST /shapes
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
 * Returns Svelte Query mutation options for POST /shapes
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostShapesMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostShapesMutationKey(),
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
export function createPostShapes(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postShapes>>,
      Error,
      InferRequestType<typeof client.shapes.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostShapesMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query mutation key for POST /documents
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
 * Returns Svelte Query mutation options for POST /documents
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostDocumentsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostDocumentsMutationKey(),
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
export function createPostDocuments(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postDocuments>>,
      Error,
      InferRequestType<typeof client.documents.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostDocumentsMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query mutation key for POST /configs
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
 * Returns Svelte Query mutation options for POST /configs
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostConfigsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: getPostConfigsMutationKey(),
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
export function createPostConfigs(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postConfigs>>,
      Error,
      InferRequestType<typeof client.configs.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostConfigsMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * Generates Svelte Query cache key for GET /nullable-union
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
 * Returns Svelte Query query options for GET /nullable-union
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNullableUnionQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetNullableUnionQueryKey(),
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
export function createGetNullableUnion(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNullableUnion>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetNullableUnionQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /nullable-union
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetNullableUnionInfiniteQueryKey() {
  return ['nullable-union', 'GET', '/nullable-union', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /nullable-union
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetNullableUnionInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetNullableUnionInfiniteQueryKey(),
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
export function createInfiniteGetNullableUnion(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNullableUnion>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetNullableUnionInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query cache key for GET /nested-circular
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
 * Returns Svelte Query query options for GET /nested-circular
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNestedCircularQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGetNestedCircularQueryKey(),
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
export function createGetNestedCircular(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNestedCircular>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getGetNestedCircularQueryOptions(clientOptions), ...query }
  })
}

/**
 * Generates Svelte Query infinite query cache key for GET /nested-circular
 * Returns structured key ['prefix', 'method', 'path', 'infinite'] for filtering
 */
export function getGetNestedCircularInfiniteQueryKey() {
  return ['nested-circular', 'GET', '/nested-circular', 'infinite'] as const
}

/**
 * Returns Svelte Query infinite query options for GET /nested-circular
 *
 * Use with prefetchInfiniteQuery, ensureInfiniteQueryData, or useInfiniteQuery.
 * Requires initialPageParam and getNextPageParam to be provided separately.
 */
export function getGetNestedCircularInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGetNestedCircularInfiniteQueryKey(),
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
export function createInfiniteGetNestedCircular(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNestedCircular>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getGetNestedCircularInfiniteQueryOptions(clientOptions), ...query }
  })
}
