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

/** Key prefix for /all-of */
export function getAllOfKey() {
  return ['all-of'] as const
}

/** Key prefix for /all-of-sibling */
export function getAllOfSiblingKey() {
  return ['all-of-sibling'] as const
}

/** Key prefix for /any-of */
export function getAnyOfKey() {
  return ['any-of'] as const
}

/** Key prefix for /any-of-ref */
export function getAnyOfRefKey() {
  return ['any-of-ref'] as const
}

/** Key prefix for /any-of-three */
export function getAnyOfThreeKey() {
  return ['any-of-three'] as const
}

/** Key prefix for /not */
export function getNotKey() {
  return ['not'] as const
}

/** Key prefix for /not-composition */
export function getNotCompositionKey() {
  return ['not-composition'] as const
}

/** Key prefix for /not-const */
export function getNotConstKey() {
  return ['not-const'] as const
}

/** Key prefix for /not-enum */
export function getNotEnumKey() {
  return ['not-enum'] as const
}

/** Key prefix for /not-ref */
export function getNotRefKey() {
  return ['not-ref'] as const
}

/** Key prefix for /nullable-one-of */
export function getNullableOneOfKey() {
  return ['nullable-one-of'] as const
}

/** Key prefix for /one-of */
export function getOneOfKey() {
  return ['one-of'] as const
}

/**
 * POST /one-of
 */
export async function postOneOf(
  args: InferRequestType<(typeof client)['one-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['one-of'].$post(args, options))
}

/** POST /one-of */
export function getPostOneOfMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['one-of', '/one-of'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['one-of']['$post']>) {
      return postOneOf(args, options)
    },
  }
}

/**
 * POST /one-of
 */
export function createPostOneOf(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postOneOf>>,
      Error,
      InferRequestType<(typeof client)['one-of']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostOneOfMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * POST /any-of
 */
export async function postAnyOf(
  args: InferRequestType<(typeof client)['any-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['any-of'].$post(args, options))
}

/** POST /any-of */
export function getPostAnyOfMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['any-of', '/any-of'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['any-of']['$post']>) {
      return postAnyOf(args, options)
    },
  }
}

/**
 * POST /any-of
 */
export function createPostAnyOf(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postAnyOf>>,
      Error,
      InferRequestType<(typeof client)['any-of']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostAnyOfMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * POST /all-of
 */
export async function postAllOf(
  args: InferRequestType<(typeof client)['all-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['all-of'].$post(args, options))
}

/** POST /all-of */
export function getPostAllOfMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['all-of', '/all-of'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['all-of']['$post']>) {
      return postAllOf(args, options)
    },
  }
}

/**
 * POST /all-of
 */
export function createPostAllOf(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postAllOf>>,
      Error,
      InferRequestType<(typeof client)['all-of']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostAllOfMutationOptions(clientOptions), ...mutation }
  })
}

/**
 * POST /not
 */
export async function postNot(
  args: InferRequestType<typeof client.not.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.not.$post(args, options))
}

/** POST /not */
export function getPostNotMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['not', '/not'] as const,
    async mutationFn(args: InferRequestType<typeof client.not.$post>) {
      return postNot(args, options)
    },
  }
}

/**
 * POST /not
 */
export function createPostNot(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postNot>>,
      Error,
      InferRequestType<typeof client.not.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...getPostNotMutationOptions(clientOptions), ...mutation }
  })
}

/** GET /not-ref query key */
export function getNotRefQueryKey() {
  return ['not-ref', '/not-ref'] as const
}

/**
 * GET /not-ref
 */
export async function getNotRef(options?: ClientRequestOptions) {
  return await parseResponse(client['not-ref'].$get(undefined, options))
}

/**
 * GET /not-ref query options
 */
export function getNotRefQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotRef({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /not-ref
 */
export function createNotRef(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNotRef>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getNotRefQueryOptions(clientOptions), ...query }
  })
}

/** GET /not-ref infinite query key */
export function getNotRefInfiniteQueryKey() {
  return ['not-ref', '/not-ref', 'infinite'] as const
}

/**
 * GET /not-ref infinite query options
 */
export function getNotRefInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNotRefInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotRef({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /not-ref
 */
export function createInfiniteNotRef(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNotRef>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getNotRefInfiniteQueryOptions(clientOptions), ...query }
  })
}

/** GET /not-enum query key */
export function getNotEnumQueryKey() {
  return ['not-enum', '/not-enum'] as const
}

/**
 * GET /not-enum
 */
export async function getNotEnum(options?: ClientRequestOptions) {
  return await parseResponse(client['not-enum'].$get(undefined, options))
}

/**
 * GET /not-enum query options
 */
export function getNotEnumQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotEnumQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotEnum({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /not-enum
 */
export function createNotEnum(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNotEnum>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getNotEnumQueryOptions(clientOptions), ...query }
  })
}

/** GET /not-enum infinite query key */
export function getNotEnumInfiniteQueryKey() {
  return ['not-enum', '/not-enum', 'infinite'] as const
}

/**
 * GET /not-enum infinite query options
 */
export function getNotEnumInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNotEnumInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotEnum({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /not-enum
 */
export function createInfiniteNotEnum(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNotEnum>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getNotEnumInfiniteQueryOptions(clientOptions), ...query }
  })
}

/** GET /not-const query key */
export function getNotConstQueryKey() {
  return ['not-const', '/not-const'] as const
}

/**
 * GET /not-const
 */
export async function getNotConst(options?: ClientRequestOptions) {
  return await parseResponse(client['not-const'].$get(undefined, options))
}

/**
 * GET /not-const query options
 */
export function getNotConstQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotConstQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotConst({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /not-const
 */
export function createNotConst(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNotConst>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getNotConstQueryOptions(clientOptions), ...query }
  })
}

/** GET /not-const infinite query key */
export function getNotConstInfiniteQueryKey() {
  return ['not-const', '/not-const', 'infinite'] as const
}

/**
 * GET /not-const infinite query options
 */
export function getNotConstInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNotConstInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotConst({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /not-const
 */
export function createInfiniteNotConst(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNotConst>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getNotConstInfiniteQueryOptions(clientOptions), ...query }
  })
}

/** GET /not-composition query key */
export function getNotCompositionQueryKey() {
  return ['not-composition', '/not-composition'] as const
}

/**
 * GET /not-composition
 */
export async function getNotComposition(options?: ClientRequestOptions) {
  return await parseResponse(client['not-composition'].$get(undefined, options))
}

/**
 * GET /not-composition query options
 */
export function getNotCompositionQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotCompositionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotComposition({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /not-composition
 */
export function createNotComposition(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNotComposition>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getNotCompositionQueryOptions(clientOptions), ...query }
  })
}

/** GET /not-composition infinite query key */
export function getNotCompositionInfiniteQueryKey() {
  return ['not-composition', '/not-composition', 'infinite'] as const
}

/**
 * GET /not-composition infinite query options
 */
export function getNotCompositionInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNotCompositionInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotComposition({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /not-composition
 */
export function createInfiniteNotComposition(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNotComposition>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getNotCompositionInfiniteQueryOptions(clientOptions), ...query }
  })
}

/** GET /all-of-sibling query key */
export function getAllOfSiblingQueryKey() {
  return ['all-of-sibling', '/all-of-sibling'] as const
}

/**
 * GET /all-of-sibling
 */
export async function getAllOfSibling(options?: ClientRequestOptions) {
  return await parseResponse(client['all-of-sibling'].$get(undefined, options))
}

/**
 * GET /all-of-sibling query options
 */
export function getAllOfSiblingQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getAllOfSiblingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAllOfSibling({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /all-of-sibling
 */
export function createAllOfSibling(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getAllOfSibling>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getAllOfSiblingQueryOptions(clientOptions), ...query }
  })
}

/** GET /all-of-sibling infinite query key */
export function getAllOfSiblingInfiniteQueryKey() {
  return ['all-of-sibling', '/all-of-sibling', 'infinite'] as const
}

/**
 * GET /all-of-sibling infinite query options
 */
export function getAllOfSiblingInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getAllOfSiblingInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAllOfSibling({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /all-of-sibling
 */
export function createInfiniteAllOfSibling(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getAllOfSibling>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getAllOfSiblingInfiniteQueryOptions(clientOptions), ...query }
  })
}

/** GET /nullable-one-of query key */
export function getNullableOneOfQueryKey() {
  return ['nullable-one-of', '/nullable-one-of'] as const
}

/**
 * GET /nullable-one-of
 */
export async function getNullableOneOf(options?: ClientRequestOptions) {
  return await parseResponse(client['nullable-one-of'].$get(undefined, options))
}

/**
 * GET /nullable-one-of query options
 */
export function getNullableOneOfQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNullableOneOfQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableOneOf({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /nullable-one-of
 */
export function createNullableOneOf(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNullableOneOf>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getNullableOneOfQueryOptions(clientOptions), ...query }
  })
}

/** GET /nullable-one-of infinite query key */
export function getNullableOneOfInfiniteQueryKey() {
  return ['nullable-one-of', '/nullable-one-of', 'infinite'] as const
}

/**
 * GET /nullable-one-of infinite query options
 */
export function getNullableOneOfInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNullableOneOfInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableOneOf({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /nullable-one-of
 */
export function createInfiniteNullableOneOf(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNullableOneOf>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getNullableOneOfInfiniteQueryOptions(clientOptions), ...query }
  })
}

/** GET /any-of-three query key */
export function getAnyOfThreeQueryKey() {
  return ['any-of-three', '/any-of-three'] as const
}

/**
 * GET /any-of-three
 */
export async function getAnyOfThree(options?: ClientRequestOptions) {
  return await parseResponse(client['any-of-three'].$get(undefined, options))
}

/**
 * GET /any-of-three query options
 */
export function getAnyOfThreeQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getAnyOfThreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfThree({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /any-of-three
 */
export function createAnyOfThree(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getAnyOfThree>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getAnyOfThreeQueryOptions(clientOptions), ...query }
  })
}

/** GET /any-of-three infinite query key */
export function getAnyOfThreeInfiniteQueryKey() {
  return ['any-of-three', '/any-of-three', 'infinite'] as const
}

/**
 * GET /any-of-three infinite query options
 */
export function getAnyOfThreeInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getAnyOfThreeInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfThree({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /any-of-three
 */
export function createInfiniteAnyOfThree(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getAnyOfThree>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getAnyOfThreeInfiniteQueryOptions(clientOptions), ...query }
  })
}

/** GET /any-of-ref query key */
export function getAnyOfRefQueryKey() {
  return ['any-of-ref', '/any-of-ref'] as const
}

/**
 * GET /any-of-ref
 */
export async function getAnyOfRef(options?: ClientRequestOptions) {
  return await parseResponse(client['any-of-ref'].$get(undefined, options))
}

/**
 * GET /any-of-ref query options
 */
export function getAnyOfRefQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getAnyOfRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfRef({ ...options, init: { ...options?.init, signal } })
    },
  })
}

/**
 * GET /any-of-ref
 */
export function createAnyOfRef(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getAnyOfRef>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getAnyOfRefQueryOptions(clientOptions), ...query }
  })
}

/** GET /any-of-ref infinite query key */
export function getAnyOfRefInfiniteQueryKey() {
  return ['any-of-ref', '/any-of-ref', 'infinite'] as const
}

/**
 * GET /any-of-ref infinite query options
 */
export function getAnyOfRefInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getAnyOfRefInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfRef({ ...options, init: { ...options?.init, signal } })
    },
  }
}

/**
 * GET /any-of-ref
 */
export function createInfiniteAnyOfRef(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getAnyOfRef>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getAnyOfRefInfiniteQueryOptions(clientOptions), ...query }
  })
}
