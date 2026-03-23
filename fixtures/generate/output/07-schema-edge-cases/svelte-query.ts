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
 * Key prefix for /additional-props
 */
export function getAdditionalPropsKey() {
  return ['additional-props'] as const
}

/**
 * Key prefix for /composed
 */
export function getComposedKey() {
  return ['composed'] as const
}

/**
 * Key prefix for /deep-nested
 */
export function getDeepNestedKey() {
  return ['deep-nested'] as const
}

/**
 * Key prefix for /discriminated
 */
export function getDiscriminatedKey() {
  return ['discriminated'] as const
}

/**
 * Key prefix for /nullable
 */
export function getNullableKey() {
  return ['nullable'] as const
}

/**
 * POST /nullable
 */
export async function postNullable(
  args: InferRequestType<typeof client.nullable.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.nullable.$post(args, options))
}

/**
 * POST /nullable
 */
export function getPostNullableMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['nullable', '/nullable'] as const,
    async mutationFn(args: InferRequestType<typeof client.nullable.$post>) {
      return postNullable(args, options)
    },
  }
}

/**
 * POST /nullable
 */
export function createPostNullable(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postNullable>>,
      Error,
      InferRequestType<typeof client.nullable.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostNullableMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * POST /discriminated
 */
export async function postDiscriminated(
  args: InferRequestType<typeof client.discriminated.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.discriminated.$post(args, options))
}

/**
 * POST /discriminated
 */
export function getPostDiscriminatedMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['discriminated', '/discriminated'] as const,
    async mutationFn(args: InferRequestType<typeof client.discriminated.$post>) {
      return postDiscriminated(args, options)
    },
  }
}

/**
 * POST /discriminated
 */
export function createPostDiscriminated(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postDiscriminated>>,
      Error,
      InferRequestType<typeof client.discriminated.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostDiscriminatedMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * GET /composed query key
 */
export function getComposedQueryKey() {
  return ['composed', '/composed'] as const
}

/**
 * GET /composed
 */
export async function getComposed(options?: ClientRequestOptions) {
  return await parseResponse(client.composed.$get(undefined, options))
}

/**
 * GET /composed query options
 */
export function getComposedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getComposedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getComposed({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /composed
 */
export function createComposed(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getComposed>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getComposedQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /composed infinite query key
 */
export function getComposedInfiniteQueryKey() {
  return ['composed', '/composed', 'infinite'] as const
}

/**
 * GET /composed infinite query options
 */
export function getComposedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getComposedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getComposed({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /composed
 */
export function createInfiniteComposed(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getComposed>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getComposedInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /deep-nested query key
 */
export function getDeepNestedQueryKey() {
  return ['deep-nested', '/deep-nested'] as const
}

/**
 * GET /deep-nested
 */
export async function getDeepNested(options?: ClientRequestOptions) {
  return await parseResponse(client['deep-nested'].$get(undefined, options))
}

/**
 * GET /deep-nested query options
 */
export function getDeepNestedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getDeepNestedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getDeepNested({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /deep-nested
 */
export function createDeepNested(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getDeepNestedQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /deep-nested infinite query key
 */
export function getDeepNestedInfiniteQueryKey() {
  return ['deep-nested', '/deep-nested', 'infinite'] as const
}

/**
 * GET /deep-nested infinite query options
 */
export function getDeepNestedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getDeepNestedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getDeepNested({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /deep-nested
 */
export function createInfiniteDeepNested(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getDeepNestedInfiniteQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /additional-props query key
 */
export function getAdditionalPropsQueryKey() {
  return ['additional-props', '/additional-props'] as const
}

/**
 * GET /additional-props
 */
export async function getAdditionalProps(options?: ClientRequestOptions) {
  return await parseResponse(client['additional-props'].$get(undefined, options))
}

/**
 * GET /additional-props query options
 */
export function getAdditionalPropsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getAdditionalPropsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAdditionalProps({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /additional-props
 */
export function createAdditionalProps(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getAdditionalPropsQueryOptions(clientOptions), ...query }
  })
}

/**
 * GET /additional-props infinite query key
 */
export function getAdditionalPropsInfiniteQueryKey() {
  return ['additional-props', '/additional-props', 'infinite'] as const
}

/**
 * GET /additional-props infinite query options
 */
export function getAdditionalPropsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getAdditionalPropsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAdditionalProps({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /additional-props
 */
export function createInfiniteAdditionalProps(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getAdditionalPropsInfiniteQueryOptions(clientOptions), ...query }
  })
}
