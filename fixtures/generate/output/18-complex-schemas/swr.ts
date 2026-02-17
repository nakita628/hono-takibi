import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates SWR mutation key for POST /expressions
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
export function usePostExpressions(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.expressions.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.expressions.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostExpressionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.expressions.$post> }) =>
        parseResponse(client.expressions.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /shapes
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
export function usePostShapes(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.shapes.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.shapes.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostShapesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.shapes.$post> }) =>
        parseResponse(client.shapes.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /documents
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
export function usePostDocuments(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.documents.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.documents.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostDocumentsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.documents.$post> }) =>
        parseResponse(client.documents.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /configs
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
export function usePostConfigs(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.configs.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.configs.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostConfigsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.configs.$post> }) =>
        parseResponse(client.configs.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /nullable-union
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNullableUnionKey() {
  return ['nullable-union', 'GET', '/nullable-union'] as const
}

/**
 * GET /nullable-union
 *
 * Nullable anyOf with mixed types
 */
export function useGetNullableUnion(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetNullableUnionKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['nullable-union'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /nested-circular
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNestedCircularKey() {
  return ['nested-circular', 'GET', '/nested-circular'] as const
}

/**
 * GET /nested-circular
 *
 * Circular reference through allOf
 */
export function useGetNestedCircular(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetNestedCircularKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['nested-circular'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
