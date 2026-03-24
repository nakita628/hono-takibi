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

export function getAdditionalPropsKey() {
  return ['additional-props'] as const
}

export function getComposedKey() {
  return ['composed'] as const
}

export function getDeepNestedKey() {
  return ['deep-nested'] as const
}

export function getDiscriminatedKey() {
  return ['discriminated'] as const
}

export function getNullableKey() {
  return ['nullable'] as const
}

export async function postNullable(
  args: InferRequestType<typeof client.nullable.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.nullable.$post(args, options))
}

export function getPostNullableMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['nullable', '/nullable', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.nullable.$post>) {
      return postNullable(args, options)
    },
  }
}

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

export async function postDiscriminated(
  args: InferRequestType<typeof client.discriminated.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.discriminated.$post(args, options))
}

export function getPostDiscriminatedMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['discriminated', '/discriminated', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.discriminated.$post>) {
      return postDiscriminated(args, options)
    },
  }
}

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

export function getComposedQueryKey() {
  return ['composed', '/composed'] as const
}

export async function getComposed(options?: ClientRequestOptions) {
  return await parseResponse(client.composed.$get(undefined, options))
}

export function getComposedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getComposedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getComposed({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createComposed<TData = Awaited<ReturnType<typeof getComposed>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getComposed>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getComposedQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getComposed({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getComposedInfiniteQueryKey() {
  return ['composed', '/composed', 'infinite'] as const
}

export function getComposedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getComposedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getComposed({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteComposed(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getComposed>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getComposedInfiniteQueryOptions(clientOptions) }
  })
}

export function getDeepNestedQueryKey() {
  return ['deep-nested', '/deep-nested'] as const
}

export async function getDeepNested(options?: ClientRequestOptions) {
  return await parseResponse(client['deep-nested'].$get(undefined, options))
}

export function getDeepNestedQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getDeepNestedQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getDeepNested({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createDeepNested<TData = Awaited<ReturnType<typeof getDeepNested>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getDeepNestedQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getDeepNested({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getDeepNestedInfiniteQueryKey() {
  return ['deep-nested', '/deep-nested', 'infinite'] as const
}

export function getDeepNestedInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getDeepNestedInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getDeepNested({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteDeepNested(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getDeepNestedInfiniteQueryOptions(clientOptions) }
  })
}

export function getAdditionalPropsQueryKey() {
  return ['additional-props', '/additional-props'] as const
}

export async function getAdditionalProps(options?: ClientRequestOptions) {
  return await parseResponse(client['additional-props'].$get(undefined, options))
}

export function getAdditionalPropsQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getAdditionalPropsQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAdditionalProps({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createAdditionalProps<TData = Awaited<ReturnType<typeof getAdditionalProps>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getAdditionalPropsQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getAdditionalProps({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getAdditionalPropsInfiniteQueryKey() {
  return ['additional-props', '/additional-props', 'infinite'] as const
}

export function getAdditionalPropsInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getAdditionalPropsInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getAdditionalProps({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteAdditionalProps(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getAdditionalPropsInfiniteQueryOptions(clientOptions) }
  })
}
