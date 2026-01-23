import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/17-mixed-inline-refs'

/**
 * GET /users
 */
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users
 */
export function getGetUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['/users', args] as const
}

/**
 * POST /users
 */
export function usePostUsers(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.users.$post> | undefined,
    Error,
    InferRequestType<typeof client.users.$post>
  >({ mutationFn: async (args) => parseResponse(client.users.$post(args, clientOptions)) })
}

/**
 * GET /users/{userId}
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersUserIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/{userId}
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', args] as const
}

/**
 * POST /orders
 */
export function usePostOrders(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.orders.$post> | undefined,
    Error,
    InferRequestType<typeof client.orders.$post>
  >({ mutationFn: async (args) => parseResponse(client.orders.$post(args, clientOptions)) })
}

/**
 * GET /products/{productId}/variants
 */
export function useGetProductsProductIdVariants(
  args: InferRequestType<(typeof client.products)[':productId']['variants']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetProductsProductIdVariantsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.products[':productId'].variants.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /products/{productId}/variants
 */
export function getGetProductsProductIdVariantsQueryKey(
  args: InferRequestType<(typeof client.products)[':productId']['variants']['$get']>,
) {
  return ['/products/:productId/variants', args] as const
}

/**
 * POST /reports/generate
 */
export function usePostReportsGenerate(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.reports.generate.$post> | undefined,
    Error,
    InferRequestType<typeof client.reports.generate.$post>
  >({
    mutationFn: async (args) => parseResponse(client.reports.generate.$post(args, clientOptions)),
  })
}

/**
 * POST /webhooks/test
 */
export function usePostWebhooksTest(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.webhooks.test.$post> | undefined,
    Error,
    InferRequestType<typeof client.webhooks.test.$post>
  >({ mutationFn: async (args) => parseResponse(client.webhooks.test.$post(args, clientOptions)) })
}
