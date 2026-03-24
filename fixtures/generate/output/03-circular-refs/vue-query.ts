import { useQuery, useInfiniteQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/vue-query'
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

export async function getTree(options?: ClientRequestOptions) {
  return await parseResponse(client.tree.$get(undefined, options))
}

export function getTreeQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getTreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTree({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useTree<TData = Awaited<ReturnType<typeof getTree>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getTree>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getTreeQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTree({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getTreeInfiniteQueryKey() {
  return ['tree', '/tree', 'infinite'] as const
}

export function getTreeInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getTreeInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getTree({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteTree(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getTree>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getTreeInfiniteQueryOptions(clientOptions) })
}

export async function postTree(
  args: InferRequestType<typeof client.tree.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.tree.$post(args, options))
}

export function getPostTreeMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['tree', '/tree', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.tree.$post>) {
      return postTree(args, options)
    },
  }
}

export function usePostTree(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postTree>>,
    Error,
    InferRequestType<typeof client.tree.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostTreeMutationOptions(clientOptions), ...mutationOptions })
}

export function getGraphQueryKey() {
  return ['graph', '/graph'] as const
}

export async function getGraph(options?: ClientRequestOptions) {
  return await parseResponse(client.graph.$get(undefined, options))
}

export function getGraphQueryOptions(options?: ClientRequestOptions) {
  return queryOptions({
    queryKey: getGraphQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getGraph({ ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useGraph<TData = Awaited<ReturnType<typeof getGraph>>>(options?: {
  query?: UseQueryOptions<Awaited<ReturnType<typeof getGraph>>, Error, TData>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getGraphQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getGraph({ ...clientOptions, init: { ...clientOptions?.init, signal } })
    },
  })
}

export function getGraphInfiniteQueryKey() {
  return ['graph', '/graph', 'infinite'] as const
}

export function getGraphInfiniteQueryOptions(options?: ClientRequestOptions) {
  return {
    queryKey: getGraphInfiniteQueryKey(),
    queryFn({ signal }: QueryFunctionContext) {
      return getGraph({ ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteGraph(options: {
  query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getGraph>>, Error>
  options?: ClientRequestOptions
}) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({ ...queryOptions, ...getGraphInfiniteQueryOptions(clientOptions) })
}
