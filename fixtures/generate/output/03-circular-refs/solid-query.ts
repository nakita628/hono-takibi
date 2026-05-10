import { createQuery, createMutation, queryOptions } from '@tanstack/solid-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/solid-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getGraphKey() {
  return ['graph'] as const
}

export function getTreeKey() {
  return ['tree'] as const
}

export function getTreeQueryKey() {
  return ['tree', '/tree'] as const
}

export function getTreeQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getTreeQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.tree.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function createTree<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.tree.$get>>>>>,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.tree.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getTreeQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.tree.$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}

export function getPostTreeMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['tree', '/tree', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.tree.$post>) {
      return parseResponse(client.tree.$post(args, options))
    },
  }
}

export function createPostTree<TError = unknown>(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.tree.$post>>>>>,
      TError,
      InferRequestType<typeof client.tree.$post>
    >
    options?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const { mutation, options: clientOptions } = options?.() ?? {}
    return { ...mutation, ...getPostTreeMutationOptions(clientOptions) }
  })
}

export function getGraphQueryKey() {
  return ['graph', '/graph'] as const
}

export function getGraphQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGraphQueryKey(),
    queryFn({ signal }) {
      return parseResponse(
        client.graph.$get(undefined, { ...options, init: { ...options?.init, signal } }),
      )
    },
  })
}

export function createGraph<
  TData = Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.graph.$get>>>>>,
  TError = unknown,
>(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.graph.$get>>>>>,
      TError,
      TData
    >
    options?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...query,
      queryKey: getGraphQueryKey(),
      queryFn({ signal }: QueryFunctionContext) {
        return parseResponse(
          client.graph.$get(undefined, {
            ...clientOptions,
            init: { ...clientOptions?.init, signal },
          }),
        )
      },
    }
  })
}
