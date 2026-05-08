import { injectQuery, injectMutation, queryOptions } from '@tanstack/angular-query-experimental'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/angular-query-experimental'
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

export function getPostOneOfMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['one-of', '/one-of', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['one-of']['$post']>) {
      return parseResponse(client['one-of'].$post(args, options))
    },
  }
}

export function injectPostOneOf<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['one-of']['$post']>>>>
      >,
      TError,
      InferRequestType<(typeof client)['one-of']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostOneOfMutationOptions<TError>(clientOptions) }
  })
}

export function getPostAnyOfMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['any-of', '/any-of', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['any-of']['$post']>) {
      return parseResponse(client['any-of'].$post(args, options))
    },
  }
}

export function injectPostAnyOf<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['any-of']['$post']>>>>
      >,
      TError,
      InferRequestType<(typeof client)['any-of']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostAnyOfMutationOptions<TError>(clientOptions) }
  })
}

export function getPostAllOfMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['all-of', '/all-of', 'POST'] as const,
    async mutationFn(args: InferRequestType<(typeof client)['all-of']['$post']>) {
      return parseResponse(client['all-of'].$post(args, options))
    },
  }
}

export function injectPostAllOf<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['all-of']['$post']>>>>
      >,
      TError,
      InferRequestType<(typeof client)['all-of']['$post']>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostAllOfMutationOptions<TError>(clientOptions) }
  })
}

export function getPostNotMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['not', '/not', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.not.$post>) {
      return parseResponse(client.not.$post(args, options))
    },
  }
}

export function injectPostNot<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.not.$post>>>>>,
      TError,
      InferRequestType<typeof client.not.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostNotMutationOptions<TError>(clientOptions) }
  })
}

export function getNotRefQueryKey() {
  return ['not-ref', '/not-ref'] as const
}

export function getNotRefQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotRefQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client['not-ref'].$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function injectNotRef<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['not-ref']['$get']>>>>
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['not-ref']['$get']>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getNotRefQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['not-ref'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getNotEnumQueryKey() {
  return ['not-enum', '/not-enum'] as const
}

export function getNotEnumQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotEnumQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client['not-enum'].$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function injectNotEnum<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['not-enum']['$get']>>>>
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['not-enum']['$get']>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getNotEnumQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['not-enum'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getNotConstQueryKey() {
  return ['not-const', '/not-const'] as const
}

export function getNotConstQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotConstQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client['not-const'].$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function injectNotConst<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['not-const']['$get']>>>>
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['not-const']['$get']>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getNotConstQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['not-const'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getNotCompositionQueryKey() {
  return ['not-composition', '/not-composition'] as const
}

export function getNotCompositionQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNotCompositionQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client['not-composition'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function injectNotComposition<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client)['not-composition']['$get']>>>
    >
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['not-composition']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getNotCompositionQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['not-composition'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getAllOfSiblingQueryKey() {
  return ['all-of-sibling', '/all-of-sibling'] as const
}

export function getAllOfSiblingQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getAllOfSiblingQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client['all-of-sibling'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function injectAllOfSibling<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['all-of-sibling']['$get']>>>>
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['all-of-sibling']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getAllOfSiblingQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['all-of-sibling'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getNullableOneOfQueryKey() {
  return ['nullable-one-of', '/nullable-one-of'] as const
}

export function getNullableOneOfQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNullableOneOfQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client['nullable-one-of'].$get(undefined, {
          ...options,
          init: { ...options?.init, signal },
        }),
      )
    },
  })
}

export function injectNullableOneOf<
  TData = Awaited<
    ReturnType<
      typeof parseResponse<Awaited<ReturnType<(typeof client)['nullable-one-of']['$get']>>>
    >
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['nullable-one-of']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getNullableOneOfQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['nullable-one-of'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getAnyOfThreeQueryKey() {
  return ['any-of-three', '/any-of-three'] as const
}

export function getAnyOfThreeQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getAnyOfThreeQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client['any-of-three'].$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function injectAnyOfThree<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['any-of-three']['$get']>>>>
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['any-of-three']['$get']>>>
        >
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getAnyOfThreeQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['any-of-three'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getAnyOfRefQueryKey() {
  return ['any-of-ref', '/any-of-ref'] as const
}

export function getAnyOfRefQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getAnyOfRefQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client['any-of-ref'].$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function injectAnyOfRef<
  TData = Awaited<
    ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['any-of-ref']['$get']>>>>
  >,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client)['any-of-ref']['$get']>>>>
      >,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getAnyOfRefQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client['any-of-ref'].$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}
