import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
 * Returns Svelte Query mutation options for POST /expressions
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
export function createPostExpressions(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.expressions.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.expressions.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostExpressionsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
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
 * Returns Svelte Query mutation options for POST /shapes
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
export function createPostShapes(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.shapes.$post>>>>>,
      Error,
      InferRequestType<typeof client.shapes.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostShapesMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
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
 * Returns Svelte Query mutation options for POST /documents
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
export function createPostDocuments(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.documents.$post>>>>>,
      Error,
      InferRequestType<typeof client.documents.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostDocumentsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
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
 * Returns Svelte Query mutation options for POST /configs
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
export function createPostConfigs(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.configs.$post>>>>>,
      Error,
      InferRequestType<typeof client.configs.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostConfigsMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
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
 * Returns Svelte Query query options for GET /nullable-union
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
export function createGetNullableUnion(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['nullable-union']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNullableUnionQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
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
 * Returns Svelte Query query options for GET /nested-circular
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
export function createGetNestedCircular(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['nested-circular']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNestedCircularQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
