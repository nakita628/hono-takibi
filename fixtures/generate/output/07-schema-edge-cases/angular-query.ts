import { injectQuery, injectMutation, queryOptions } from '@tanstack/angular-query-experimental'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/angular-query-experimental'
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

export function getPostNullableMutationOptions<TError = unknown>(options?: ClientRequestOptions) {
  return {
    mutationKey: ['nullable', '/nullable', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.nullable.$post>) {
      return postNullable(args, options)
    },
  }
}

export function injectPostNullable<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postNullable>>,
      TError,
      InferRequestType<typeof client.nullable.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostNullableMutationOptions<TError>(clientOptions) }
  })
}

export async function postDiscriminated(
  args: InferRequestType<typeof client.discriminated.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.discriminated.$post(args, options))
}

export function getPostDiscriminatedMutationOptions<TError = unknown>(
  options?: ClientRequestOptions,
) {
  return {
    mutationKey: ['discriminated', '/discriminated', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.discriminated.$post>) {
      return postDiscriminated(args, options)
    },
  }
}

export function injectPostDiscriminated<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof postDiscriminated>>,
      TError,
      InferRequestType<typeof client.discriminated.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return injectMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostDiscriminatedMutationOptions<TError>(clientOptions) }
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
    queryFn({ signal }) {
      return getComposed({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function injectComposed<TData = Awaited<ReturnType<typeof getComposed>>, TError = unknown>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getComposed>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getComposedQueryKey(),
      queryFn({ signal }) {
        return getComposed({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
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
    queryFn({ signal }) {
      return getDeepNested({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function injectDeepNested<
  TData = Awaited<ReturnType<typeof getDeepNested>>,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getDeepNested>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getDeepNestedQueryKey(),
      queryFn({ signal }) {
        return getDeepNested({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
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
    queryFn({ signal }) {
      return getAdditionalProps({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function injectAdditionalProps<
  TData = Awaited<ReturnType<typeof getAdditionalProps>>,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getAdditionalProps>>, TError, TData>
    options?: ClientRequestOptions
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getAdditionalPropsQueryKey(),
      queryFn({ signal }) {
        return getAdditionalProps({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}
