import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from './client'

/**
 * Generates Vue Query mutation key for POST /subscriptions
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSubscriptionsMutationKey() {
  return ['subscriptions', 'POST', '/subscriptions'] as const
}

/**
 * Returns Vue Query mutation options for POST /subscriptions
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSubscriptionsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostSubscriptionsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.subscriptions.$post>) =>
    parseResponse(client.subscriptions.$post(args, clientOptions)),
})

/**
 * POST /subscriptions
 */
export function usePostSubscriptions(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.subscriptions.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.subscriptions.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostSubscriptionsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /subscriptions/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSubscriptionsIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.subscriptions)[':id']['$get']>>,
) {
  return ['subscriptions', 'GET', '/subscriptions/:id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /subscriptions/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSubscriptionsIdQueryOptions = (
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSubscriptionsIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.subscriptions[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /subscriptions/{id}
 */
export function useGetSubscriptionsId(
  args: InferRequestType<(typeof client.subscriptions)[':id']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.subscriptions)[':id']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetSubscriptionsIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /subscriptions/{id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteSubscriptionsIdMutationKey() {
  return ['subscriptions', 'DELETE', '/subscriptions/:id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /subscriptions/{id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteSubscriptionsIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteSubscriptionsIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.subscriptions)[':id']['$delete']>) =>
    parseResponse(client.subscriptions[':id'].$delete(args, clientOptions)),
})

/**
 * DELETE /subscriptions/{id}
 */
export function useDeleteSubscriptionsId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.subscriptions)[':id']['$delete']>>
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.subscriptions)[':id']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteSubscriptionsIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /webhooks/test
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebhooksTestMutationKey() {
  return ['webhooks', 'POST', '/webhooks/test'] as const
}

/**
 * Returns Vue Query mutation options for POST /webhooks/test
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostWebhooksTestMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostWebhooksTestMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.webhooks.test.$post>) =>
    parseResponse(client.webhooks.test.$post(args, clientOptions)),
})

/**
 * POST /webhooks/test
 */
export function usePostWebhooksTest(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webhooks.test.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.webhooks.test.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostWebhooksTestMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
