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

/** Key prefix for /subscriptions */
export function getSubscriptionsKey() {
  return ['subscriptions'] as const
}

/** Key prefix for /webhooks */
export function getWebhooksKey() {
  return ['webhooks'] as const
}

/**
 * POST /subscriptions
 */
export async function postSubscriptions(
  args: InferRequestType<typeof client.subscriptions.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions.$post(args, options))
}

/** POST /subscriptions */
export function getPostSubscriptionsMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['subscriptions', '/subscriptions'] as const,
    async mutationFn(args: InferRequestType<typeof client.subscriptions.$post>) {
      return postSubscriptions(args, options)
    },
  }
}

/**
 * POST /subscriptions
 */
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

/** GET /subscriptions/{id} query key */
export function getSubscriptionsIdQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.subscriptions)[':id']['$get']>>,
) {
  return ['subscriptions', '/subscriptions/:id', args] as const
}

/**
 * GET /subscriptions/{id}
 */
export async function getSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions[':id'].$get(args, options))
}

/**
 * GET /subscriptions/{id} query options
 */
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

/**
 * GET /subscriptions/{id}
 */
export function useSubscriptionsId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.subscriptions)[':id']['$get']>>,
  options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSubscriptionsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery({ ...getSubscriptionsIdQueryOptions(args, clientOptions), ...queryOptions })
}

/** GET /subscriptions/{id} infinite query key */
export function getSubscriptionsIdInfiniteQueryKey(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.subscriptions)[':id']['$get']>>,
) {
  return ['subscriptions', '/subscriptions/:id', args, 'infinite'] as const
}

/**
 * GET /subscriptions/{id} infinite query options
 */
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

/**
 * GET /subscriptions/{id}
 */
export function useInfiniteSubscriptionsId(
  args: MaybeRefOrGetter<InferRequestType<(typeof client.subscriptions)[':id']['$get']>>,
  options: {
    query: UseInfiniteQueryOptions<Awaited<ReturnType<typeof getSubscriptionsId>>, Error>
    options?: ClientRequestOptions
  },
) {
  const { query: queryOptions, options: clientOptions } = options
  return useInfiniteQuery({
    ...getSubscriptionsIdInfiniteQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * DELETE /subscriptions/{id}
 */
export async function deleteSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.subscriptions[':id'].$delete(args, options))
}

/** DELETE /subscriptions/{id} */
export function getDeleteSubscriptionsIdMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['subscriptions', '/subscriptions/:id'] as const,
    async mutationFn(args: InferRequestType<(typeof client.subscriptions)[':id']['$delete']>) {
      return deleteSubscriptionsId(args, options)
    },
  }
}

/**
 * DELETE /subscriptions/{id}
 */
export function useDeleteSubscriptionsId(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteSubscriptionsId>> | undefined,
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

/**
 * POST /webhooks/test
 */
export async function postWebhooksTest(
  args: InferRequestType<typeof client.webhooks.test.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.webhooks.test.$post(args, options))
}

/** POST /webhooks/test */
export function getPostWebhooksTestMutationOptions(options?: ClientRequestOptions) {
  return {
    mutationKey: ['webhooks', '/webhooks/test'] as const,
    async mutationFn(args: InferRequestType<typeof client.webhooks.test.$post>) {
      return postWebhooksTest(args, options)
    },
  }
}

/**
 * POST /webhooks/test
 */
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
