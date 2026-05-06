import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getAllOfKey() {
  return ['all-of'] as const
}

export function getAllOfSiblingKey() {
  return ['all-of-sibling'] as const
}

export function getAnyOfKey() {
  return ['any-of'] as const
}

export function getAnyOfRefKey() {
  return ['any-of-ref'] as const
}

export function getAnyOfThreeKey() {
  return ['any-of-three'] as const
}

export function getNotKey() {
  return ['not'] as const
}

export function getNotCompositionKey() {
  return ['not-composition'] as const
}

export function getNotConstKey() {
  return ['not-const'] as const
}

export function getNotEnumKey() {
  return ['not-enum'] as const
}

export function getNotRefKey() {
  return ['not-ref'] as const
}

export function getNullableOneOfKey() {
  return ['nullable-one-of'] as const
}

export function getOneOfKey() {
  return ['one-of'] as const
}

export async function postOneOf(
  args: InferRequestType<(typeof client)['one-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['one-of'].$post(args, options))
}

export function getPostOneOfMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['one-of', '/one-of', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['one-of']['$post']>) {
      return postOneOf(args, options)
    },
  }
}

export function createPostOneOf<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postOneOf>>,
      TError,
      InferRequestType<(typeof client)['one-of']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostOneOfMutationOptions<TError>(clientOptions) }
  })
}

export async function postAnyOf(
  args: InferRequestType<(typeof client)['any-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['any-of'].$post(args, options))
}

export function getPostAnyOfMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['any-of', '/any-of', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['any-of']['$post']>) {
      return postAnyOf(args, options)
    },
  }
}

export function createPostAnyOf<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postAnyOf>>,
      TError,
      InferRequestType<(typeof client)['any-of']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostAnyOfMutationOptions<TError>(clientOptions) }
  })
}

export async function postAllOf(
  args: InferRequestType<(typeof client)['all-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['all-of'].$post(args, options))
}

export function getPostAllOfMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['all-of', '/all-of', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['all-of']['$post']>) {
      return postAllOf(args, options)
    },
  }
}

export function createPostAllOf<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postAllOf>>,
      TError,
      InferRequestType<(typeof client)['all-of']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostAllOfMutationOptions<TError>(clientOptions) }
  })
}

export async function postNot(
  args: InferRequestType<typeof client.not.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.not.$post(args, options))
}

export function getPostNotMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['not', '/not', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.not.$post>) {
      return postNot(args, options)
    },
  }
}

export function createPostNot<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postNot>>,
      TError,
      InferRequestType<typeof client.not.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostNotMutationOptions<TError>(clientOptions) }
  })
}

export function getNotRefQueryKey() {
  return ['not-ref', '/not-ref'] as const
}

export async function getNotRef(options?: ClientRequestOptions) {
  return await parseResponse(client['not-ref'].$get(undefined, options))
}

export function getNotRefQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotRef({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createNotRef<TData = Awaited<ReturnType<typeof getNotRef>>, TError = unknown>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNotRef>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getNotRefQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getNotRef({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getNotEnumQueryKey() {
  return ['not-enum', '/not-enum'] as const
}

export async function getNotEnum(options?: ClientRequestOptions) {
  return await parseResponse(client['not-enum'].$get(undefined, options))
}

export function getNotEnumQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotEnumQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotEnum({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createNotEnum<TData = Awaited<ReturnType<typeof getNotEnum>>, TError = unknown>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNotEnum>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getNotEnumQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getNotEnum({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getNotConstQueryKey() {
  return ['not-const', '/not-const'] as const
}

export async function getNotConst(options?: ClientRequestOptions) {
  return await parseResponse(client['not-const'].$get(undefined, options))
}

export function getNotConstQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotConstQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotConst({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createNotConst<TData = Awaited<ReturnType<typeof getNotConst>>, TError = unknown>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNotConst>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getNotConstQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getNotConst({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getNotCompositionQueryKey() {
  return ['not-composition', '/not-composition'] as const
}

export async function getNotComposition(options?: ClientRequestOptions) {
  return await parseResponse(client['not-composition'].$get(undefined, options))
}

export function getNotCompositionQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotCompositionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotComposition({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createNotComposition<
  TData = Awaited<ReturnType<typeof getNotComposition>>,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNotComposition>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getNotCompositionQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getNotComposition({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getAllOfSiblingQueryKey() {
  return ['all-of-sibling', '/all-of-sibling'] as const
}

export async function getAllOfSibling(options?: ClientRequestOptions) {
  return await parseResponse(client['all-of-sibling'].$get(undefined, options))
}

export function getAllOfSiblingQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getAllOfSiblingQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAllOfSibling({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createAllOfSibling<
  TData = Awaited<ReturnType<typeof getAllOfSibling>>,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getAllOfSibling>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getAllOfSiblingQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getAllOfSibling({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getNullableOneOfQueryKey() {
  return ['nullable-one-of', '/nullable-one-of'] as const
}

export async function getNullableOneOf(options?: ClientRequestOptions) {
  return await parseResponse(client['nullable-one-of'].$get(undefined, options))
}

export function getNullableOneOfQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNullableOneOfQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableOneOf({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createNullableOneOf<
  TData = Awaited<ReturnType<typeof getNullableOneOf>>,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNullableOneOf>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getNullableOneOfQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getNullableOneOf({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getAnyOfThreeQueryKey() {
  return ['any-of-three', '/any-of-three'] as const
}

export async function getAnyOfThree(options?: ClientRequestOptions) {
  return await parseResponse(client['any-of-three'].$get(undefined, options))
}

export function getAnyOfThreeQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getAnyOfThreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfThree({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createAnyOfThree<
  TData = Awaited<ReturnType<typeof getAnyOfThree>>,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getAnyOfThree>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getAnyOfThreeQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getAnyOfThree({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getAnyOfRefQueryKey() {
  return ['any-of-ref', '/any-of-ref'] as const
}

export async function getAnyOfRef(options?: ClientRequestOptions) {
  return await parseResponse(client['any-of-ref'].$get(undefined, options))
}

export function getAnyOfRefQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getAnyOfRefQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfRef({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createAnyOfRef<TData = Awaited<ReturnType<typeof getAnyOfRef>>, TError = unknown>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getAnyOfRef>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getAnyOfRefQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getAnyOfRef({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}
