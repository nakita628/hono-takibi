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

export function getPostOneOfMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['one-of', '/one-of', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['one-of']['$post']>) {
      return postOneOf(args, options)
    },
  }
}

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

export async function postAnyOf(
  args: InferRequestType<(typeof client)['any-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['any-of'].$post(args, options))
}

export function getPostAnyOfMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['any-of', '/any-of', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['any-of']['$post']>) {
      return postAnyOf(args, options)
    },
  }
}

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

export async function postAllOf(
  args: InferRequestType<(typeof client)['all-of']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client['all-of'].$post(args, options))
}

export function getPostAllOfMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['all-of', '/all-of', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['all-of']['$post']>) {
      return postAllOf(args, options)
    },
  }
}

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

export async function postNot(
  args: InferRequestType<typeof client.not.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.not.$post(args, options))
}

export function getPostNotMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['not', '/not', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.not.$post>) {
      return postNot(args, options)
    },
  }
}

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

export function createNotRef<TData = Awaited<ReturnType<typeof getNotRef>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNotRef>>, Error, TData>
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

export function getNotRefInfiniteQueryKey() {
  return ['not-ref', '/not-ref', 'infinite'] as const
}

export function getNotRefInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNotRefInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotRef({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteNotRef(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNotRef>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getNotRefInfiniteQueryOptions(clientOptions) }
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

export function createNotEnum<TData = Awaited<ReturnType<typeof getNotEnum>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNotEnum>>, Error, TData>
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

export function getNotEnumInfiniteQueryKey() {
  return ['not-enum', '/not-enum', 'infinite'] as const
}

export function getNotEnumInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNotEnumInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotEnum({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteNotEnum(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNotEnum>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getNotEnumInfiniteQueryOptions(clientOptions) }
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

export function createNotConst<TData = Awaited<ReturnType<typeof getNotConst>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNotConst>>, Error, TData>
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

export function getNotConstInfiniteQueryKey() {
  return ['not-const', '/not-const', 'infinite'] as const
}

export function getNotConstInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNotConstInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotConst({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteNotConst(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNotConst>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getNotConstInfiniteQueryOptions(clientOptions) }
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

export function createNotComposition<TData = Awaited<ReturnType<typeof getNotComposition>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNotComposition>>, Error, TData>
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

export function getNotCompositionInfiniteQueryKey() {
  return ['not-composition', '/not-composition', 'infinite'] as const
}

export function getNotCompositionInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNotCompositionInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNotComposition({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteNotComposition(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNotComposition>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getNotCompositionInfiniteQueryOptions(clientOptions) }
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

export function createAllOfSibling<TData = Awaited<ReturnType<typeof getAllOfSibling>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getAllOfSibling>>, Error, TData>
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

export function getAllOfSiblingInfiniteQueryKey() {
  return ['all-of-sibling', '/all-of-sibling', 'infinite'] as const
}

export function getAllOfSiblingInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getAllOfSiblingInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAllOfSibling({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteAllOfSibling(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getAllOfSibling>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getAllOfSiblingInfiniteQueryOptions(clientOptions) }
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

export function createNullableOneOf<TData = Awaited<ReturnType<typeof getNullableOneOf>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNullableOneOf>>, Error, TData>
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

export function getNullableOneOfInfiniteQueryKey() {
  return ['nullable-one-of', '/nullable-one-of', 'infinite'] as const
}

export function getNullableOneOfInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNullableOneOfInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableOneOf({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteNullableOneOf(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNullableOneOf>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getNullableOneOfInfiniteQueryOptions(clientOptions) }
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

export function createAnyOfThree<TData = Awaited<ReturnType<typeof getAnyOfThree>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getAnyOfThree>>, Error, TData>
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

export function getAnyOfThreeInfiniteQueryKey() {
  return ['any-of-three', '/any-of-three', 'infinite'] as const
}

export function getAnyOfThreeInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getAnyOfThreeInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfThree({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteAnyOfThree(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getAnyOfThree>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getAnyOfThreeInfiniteQueryOptions(clientOptions) }
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

export function createAnyOfRef<TData = Awaited<ReturnType<typeof getAnyOfRef>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getAnyOfRef>>, Error, TData>
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

export function getAnyOfRefInfiniteQueryKey() {
  return ['any-of-ref', '/any-of-ref', 'infinite'] as const
}

export function getAnyOfRefInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getAnyOfRefInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAnyOfRef({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteAnyOfRef(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getAnyOfRef>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getAnyOfRefInfiniteQueryOptions(clientOptions) }
  })
}
