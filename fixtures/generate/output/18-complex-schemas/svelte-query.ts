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
export function createNullableUnion(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNullableUnion>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getNullableUnionQueryOptions(clientOptions), ...query }
  })
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
export function createInfiniteNullableUnion(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNullableUnion>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getNullableUnionInfiniteQueryOptions(clientOptions), ...query }
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
export function createNestedCircular(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNestedCircular>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getNestedCircularQueryOptions(clientOptions), ...query }
  })
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
export function createInfiniteNestedCircular(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNestedCircular>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getNestedCircularInfiniteQueryOptions(clientOptions), ...query }
  })
}
