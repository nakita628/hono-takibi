import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-components'

/**
 * POST /auth/token
 *
 * Issue access token
 */
export function usePostAuthToken(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.auth.token.$post> | undefined,
    Error,
    InferRequestType<typeof client.auth.token.$post>
  >({ mutationFn: async (args) => parseResponse(client.auth.token.$post(args, clientOptions)) })
}

/**
 * GET /users
 *
 * List users
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
 *
 * Create user
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
 *
 * Get user by id
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
 * PATCH /users/{userId}
 *
 * Update user (partial)
 */
export function usePatchUsersUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$patch']>
  >({
    mutationFn: async (args) => parseResponse(client.users[':userId'].$patch(args, clientOptions)),
  })
}

/**
 * GET /companies/{companyId}
 *
 * Get company by id
 */
export function useGetCompaniesCompanyId(
  args: InferRequestType<(typeof client.companies)[':companyId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetCompaniesCompanyIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.companies[':companyId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /companies/{companyId}
 */
export function getGetCompaniesCompanyIdQueryKey(
  args: InferRequestType<(typeof client.companies)[':companyId']['$get']>,
) {
  return ['/companies/:companyId', args] as const
}

/**
 * GET /orders
 *
 * List orders
 */
export function useGetOrders(
  args: InferRequestType<typeof client.orders.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetOrdersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.orders.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /orders
 */
export function getGetOrdersQueryKey(args: InferRequestType<typeof client.orders.$get>) {
  return ['/orders', args] as const
}

/**
 * POST /orders
 *
 * Create order (and optionally trigger callback)
 */
export function usePostOrders(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.orders.$post> | undefined,
    Error,
    InferRequestType<typeof client.orders.$post>
  >({ mutationFn: async (args) => parseResponse(client.orders.$post(args, clientOptions)) })
}

/**
 * GET /orders/{orderId}
 *
 * Get order by id
 */
export function useGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetOrdersOrderIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.orders[':orderId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /orders/{orderId}
 */
export function getGetOrdersOrderIdQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['/orders/:orderId', args] as const
}

/**
 * GET /files/{fileId}
 *
 * Get file metadata
 */
export function useGetFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetFilesFileIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.files[':fileId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /files/{fileId}
 */
export function getGetFilesFileIdQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
) {
  return ['/files/:fileId', args] as const
}

/**
 * POST /subscriptions
 *
 * Create webhook subscription
 */
export function usePostSubscriptions(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.subscriptions.$post> | undefined,
    Error,
    InferRequestType<typeof client.subscriptions.$post>
  >({ mutationFn: async (args) => parseResponse(client.subscriptions.$post(args, clientOptions)) })
}
