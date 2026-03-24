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

export function getConfigsKey() {
  return ['configs'] as const
}

export function getDocumentsKey() {
  return ['documents'] as const
}

export function getExpressionsKey() {
  return ['expressions'] as const
}

export function getNestedCircularKey() {
  return ['nested-circular'] as const
}

export function getNullableUnionKey() {
  return ['nullable-union'] as const
}

export function getShapesKey() {
  return ['shapes'] as const
}

export async function postExpressions(
  args: InferRequestType<typeof client.expressions.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.expressions.$post(args, options))
}

export function getPostExpressionsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['expressions', '/expressions', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.expressions.$post>) {
      return postExpressions(args, options)
    },
  }
}

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

export async function postShapes(
  args: InferRequestType<typeof client.shapes.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.shapes.$post(args, options))
}

export function getPostShapesMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['shapes', '/shapes', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.shapes.$post>) {
      return postShapes(args, options)
    },
  }
}

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

export async function postDocuments(
  args: InferRequestType<typeof client.documents.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.documents.$post(args, options))
}

export function getPostDocumentsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['documents', '/documents', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.documents.$post>) {
      return postDocuments(args, options)
    },
  }
}

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

export async function postConfigs(
  args: InferRequestType<typeof client.configs.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.configs.$post(args, options))
}

export function getPostConfigsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['configs', '/configs', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.configs.$post>) {
      return postConfigs(args, options)
    },
  }
}

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

export function getNullableUnionQueryKey() {
  return ['nullable-union', '/nullable-union'] as const
}

export async function getNullableUnion(options?: ClientRequestOptions) {
  return await parseResponse(client['nullable-union'].$get(undefined, options))
}

export function getNullableUnionQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNullableUnionQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableUnion({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createNullableUnion<TData = Awaited<ReturnType<typeof getNullableUnion>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNullableUnion>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getNullableUnionQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getNullableUnion({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getNullableUnionInfiniteQueryKey() {
  return ['nullable-union', '/nullable-union', 'infinite'] as const
}

export function getNullableUnionInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNullableUnionInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNullableUnion({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteNullableUnion(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNullableUnion>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getNullableUnionInfiniteQueryOptions(clientOptions) }
  })
}

export function getNestedCircularQueryKey() {
  return ['nested-circular', '/nested-circular'] as const
}

export async function getNestedCircular(options?: ClientRequestOptions) {
  return await parseResponse(client['nested-circular'].$get(undefined, options))
}

export function getNestedCircularQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getNestedCircularQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNestedCircular({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function createNestedCircular<TData = Awaited<ReturnType<typeof getNestedCircular>>>(
  options?: () => {
    query?: CreateQueryOptions<Awaited<ReturnType<typeof getNestedCircular>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getNestedCircularQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return getNestedCircular({ ...clientOptions, init: { ...clientOptions?.init, signal } })
      },
    }
  })
}

export function getNestedCircularInfiniteQueryKey() {
  return ['nested-circular', '/nested-circular', 'infinite'] as const
}

export function getNestedCircularInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getNestedCircularInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getNestedCircular({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function createInfiniteNestedCircular(
  options: () => {
    query: CreateInfiniteQueryOptions<Awaited<ReturnType<typeof getNestedCircular>>, Error>
    options?: ClientRequestOptions
  },
) {
  return createInfiniteQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...query, ...getNestedCircularInfiniteQueryOptions(clientOptions) }
  })
}
