import { useQuery, useInfiniteQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from '@tanstack/vue-query'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

export function getSubscriptionsKey() {
  return ['subscriptions'] as const
}

export function getWebhooksKey() {
  return ['webhooks'] as const
}

export async function postSubscriptions(
  args: InferRequestType<typeof client.subscriptions.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions.$post(args, options))
}

export function getPostSubscriptionsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['subscriptions', '/subscriptions', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.subscriptions.$post>) {
      return postSubscriptions(args, options)
    },
  }
}

export function usePostSubscriptions(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postSubscriptions>>,
    Error,
    InferRequestType<typeof client.subscriptions.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostSubscriptionsMutationOptions(clientOptions), ...mutationOptions })
}

export function getSubscriptionsIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.subscriptions)[':id']['$get']>>,
) {
  return ['subscriptions', '/subscriptions/:id', args] as const
}

export async function getSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions[':id'].$get(args, options))
}

export function getSubscriptionsIdQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.subscriptions)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return queryOptions({
    queryKey: getSubscriptionsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSubscriptionsId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  })
}

export function useSubscriptionsId<TData = Awaited<ReturnType<typeof getSubscriptionsId>>>(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.subscriptions)[':id']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSubscriptionsId>>, Error, TData>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({
    ...queryOptions,
    queryKey: getSubscriptionsIdQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSubscriptionsId(toValue(args), {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      })
    },
  })
}

export function getSubscriptionsIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.subscriptions)[':id']['$get']>>,
) {
  return ['subscriptions', '/subscriptions/:id', args, 'infinite'] as const
}

export function getSubscriptionsIdInfiniteQueryOptions(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.subscriptions)[':id']['$get']>>,
  options?: ClientRequestOptions,
) {
  return {
    queryKey: getSubscriptionsIdInfiniteQueryKey(args),
    queryFn({ signal }: QueryFunctionContext) {
      return getSubscriptionsId(toValue(args), { ...options, init: { ...options?.init, signal } })
    },
  }
}

export function useInfiniteSubscriptionsId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.subscriptions)[':id']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getSubscriptionsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...queryOptions,
    ...getSubscriptionsIdInfiniteQueryOptions(args, clientOptions),
  })
}

export async function deleteSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions[':id'].$delete(args, options))
}

export function getDeleteSubscriptionsIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['subscriptions', '/subscriptions/:id', 'DELETE'] as const,
    async mutationFn(args: InferRequestType<(typeof client.subscriptions)[':id']['$delete']>) {
      return deleteSubscriptionsId(args, options)
    },
  }
}

export function useDeleteSubscriptionsId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteSubscriptionsId>>  ,
    Error,
    InferRequestType<(typeof client.subscriptions)[':id']['$delete']>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({
    ...getDeleteSubscriptionsIdMutationOptions(clientOptions),
    ...mutationOptions,
  })
}

export async function postWebhooksTest(
  args: InferRequestType<typeof client.webhooks.test.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.webhooks.test.$post(args, options))
}

export function getPostWebhooksTestMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['webhooks', '/webhooks/test', 'POST'] as const,
    async mutationFn(args: InferRequestType<typeof client.webhooks.test.$post>) {
      return postWebhooksTest(args, options)
    },
  }
}

export function usePostWebhooksTest(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postWebhooksTest>>,
    Error,
    InferRequestType<typeof client.webhooks.test.$post>
  >
  options?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, options: clientOptions } = options ?? {}
  return useMutation({ ...getPostWebhooksTestMutationOptions(clientOptions), ...mutationOptions })
}
