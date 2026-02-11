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
 * Generates Svelte Query mutation key for POST /one-of
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOneOfMutationKey() {
  return ['one-of', 'POST', '/one-of'] as const
}

/**
 * Returns Svelte Query mutation options for POST /one-of
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostOneOfMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostOneOfMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client)['one-of']['$post']>) {
      return parseResponse(client['one-of'].$post(args, clientOptions))
    },
  }
}

/**
 * POST /one-of
 */
export function createPostOneOf(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['one-of']['$post']>>>>
      >,
      Error,
      InferRequestType<(typeof client)['one-of']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostOneOfMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /any-of
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAnyOfMutationKey() {
  return ['any-of', 'POST', '/any-of'] as const
}

/**
 * Returns Svelte Query mutation options for POST /any-of
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostAnyOfMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostAnyOfMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client)['any-of']['$post']>) {
      return parseResponse(client['any-of'].$post(args, clientOptions))
    },
  }
}

/**
 * POST /any-of
 */
export function createPostAnyOf(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['any-of']['$post']>>>>
      >,
      Error,
      InferRequestType<(typeof client)['any-of']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostAnyOfMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /all-of
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAllOfMutationKey() {
  return ['all-of', 'POST', '/all-of'] as const
}

/**
 * Returns Svelte Query mutation options for POST /all-of
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostAllOfMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostAllOfMutationKey(),
    async mutationFn(args: InferRequestType<(typeof client)['all-of']['$post']>) {
      return parseResponse(client['all-of'].$post(args, clientOptions))
    },
  }
}

/**
 * POST /all-of
 */
export function createPostAllOf(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['all-of']['$post']>>>>
      >,
      Error,
      InferRequestType<(typeof client)['all-of']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostAllOfMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /not
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostNotMutationKey() {
  return ['not', 'POST', '/not'] as const
}

/**
 * Returns Svelte Query mutation options for POST /not
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export function getPostNotMutationOptions(clientOptions?: ClientRequestOptions) {
  return {
    mutationKey: getPostNotMutationKey(),
    async mutationFn(args: InferRequestType<typeof client.not.$post>) {
      return parseResponse(client.not.$post(args, clientOptions))
    },
  }
}

/**
 * POST /not
 */
export function createPostNot(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.not.$post>>>>>,
      Error,
      InferRequestType<typeof client.not.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostNotMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /not-ref
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotRefQueryKey() {
  return ['not-ref', 'GET', '/not-ref'] as const
}

/**
 * Returns Svelte Query query options for GET /not-ref
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNotRefQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetNotRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['not-ref'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /not-ref
 */
export function createGetNotRef(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['not-ref']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNotRefQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /not-enum
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotEnumQueryKey() {
  return ['not-enum', 'GET', '/not-enum'] as const
}

/**
 * Returns Svelte Query query options for GET /not-enum
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNotEnumQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetNotEnumQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['not-enum'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /not-enum
 */
export function createGetNotEnum(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['not-enum']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNotEnumQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /not-const
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotConstQueryKey() {
  return ['not-const', 'GET', '/not-const'] as const
}

/**
 * Returns Svelte Query query options for GET /not-const
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNotConstQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetNotConstQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['not-const'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /not-const
 */
export function createGetNotConst(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['not-const']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNotConstQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /not-composition
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotCompositionQueryKey() {
  return ['not-composition', 'GET', '/not-composition'] as const
}

/**
 * Returns Svelte Query query options for GET /not-composition
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNotCompositionQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetNotCompositionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['not-composition'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /not-composition
 */
export function createGetNotComposition(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['not-composition']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNotCompositionQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /all-of-sibling
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAllOfSiblingQueryKey() {
  return ['all-of-sibling', 'GET', '/all-of-sibling'] as const
}

/**
 * Returns Svelte Query query options for GET /all-of-sibling
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAllOfSiblingQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetAllOfSiblingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['all-of-sibling'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /all-of-sibling
 */
export function createGetAllOfSibling(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['all-of-sibling']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAllOfSiblingQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /nullable-one-of
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNullableOneOfQueryKey() {
  return ['nullable-one-of', 'GET', '/nullable-one-of'] as const
}

/**
 * Returns Svelte Query query options for GET /nullable-one-of
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNullableOneOfQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetNullableOneOfQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['nullable-one-of'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /nullable-one-of
 */
export function createGetNullableOneOf(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['nullable-one-of']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNullableOneOfQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /any-of-three
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAnyOfThreeQueryKey() {
  return ['any-of-three', 'GET', '/any-of-three'] as const
}

/**
 * Returns Svelte Query query options for GET /any-of-three
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAnyOfThreeQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetAnyOfThreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['any-of-three'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /any-of-three
 */
export function createGetAnyOfThree(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['any-of-three']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAnyOfThreeQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /any-of-ref
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetAnyOfRefQueryKey() {
  return ['any-of-ref', 'GET', '/any-of-ref'] as const
}

/**
 * Returns Svelte Query query options for GET /any-of-ref
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetAnyOfRefQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetAnyOfRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return parseResponse(
        client['any-of-ref'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      )
    },
  }
}

/**
 * GET /any-of-ref
 */
export function createGetAnyOfRef(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['any-of-ref']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAnyOfRefQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}
