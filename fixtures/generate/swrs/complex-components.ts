import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-components'

/**
 * POST /auth/token
 *
 * Issue access token
 */
export function usePostAuthToken(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.auth.token.$post>,
    Error,
    string,
    InferRequestType<typeof client.auth.token.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.auth.token.$post>,
    Error,
    string,
    InferRequestType<typeof client.auth.token.$post>
  >(
    'POST /auth/token',
    async (_, { arg }) => parseResponse(client.auth.token.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /users
 *
 * List users
 */
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.users.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/users', args] as const) : null
  return useSWR<InferResponseType<typeof client.users.$get>, Error>(
    key,
    async () => parseResponse(client.users.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /users
 */
export function getGetUsersKey(args: InferRequestType<typeof client.users.$get>) {
  return ['GET', '/users', args] as const
}

/**
 * POST /users
 *
 * Create user
 */
export function usePostUsers(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.users.$post>,
    Error,
    string,
    InferRequestType<typeof client.users.$post>
  >(
    'POST /users',
    async (_, { arg }) => parseResponse(client.users.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /users/{userId}
 *
 * Get user by id
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.users)[':userId']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/users/:userId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.users)[':userId']['$get']>, Error>(
    key,
    async () => parseResponse(client.users[':userId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /users/{userId}
 */
export function getGetUsersUserIdKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['GET', '/users/:userId', args] as const
}

/**
 * PATCH /users/{userId}
 *
 * Update user (partial)
 */
export function usePatchUsersUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':userId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':userId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':userId']['$patch']>
  >(
    'PATCH /users/:userId',
    async (_, { arg }) => parseResponse(client.users[':userId'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /companies/{companyId}
 *
 * Get company by id
 */
export function useGetCompaniesCompanyId(
  args: InferRequestType<(typeof client.companies)[':companyId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.companies)[':companyId']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/companies/:companyId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.companies)[':companyId']['$get']>, Error>(
    key,
    async () => parseResponse(client.companies[':companyId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /companies/{companyId}
 */
export function getGetCompaniesCompanyIdKey(
  args: InferRequestType<(typeof client.companies)[':companyId']['$get']>,
) {
  return ['GET', '/companies/:companyId', args] as const
}

/**
 * GET /orders
 *
 * List orders
 */
export function useGetOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.orders.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/orders', args] as const) : null
  return useSWR<InferResponseType<typeof client.orders.$get>, Error>(
    key,
    async () => parseResponse(client.orders.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /orders
 */
export function getGetOrdersKey(args: InferRequestType<typeof client.orders.$get>) {
  return ['GET', '/orders', args] as const
}

/**
 * POST /orders
 *
 * Create order (and optionally trigger callback)
 */
export function usePostOrders(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.orders.$post>,
    Error,
    string,
    InferRequestType<typeof client.orders.$post>
  >(
    'POST /orders',
    async (_, { arg }) => parseResponse(client.orders.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /orders/{orderId}
 *
 * Get order by id
 */
export function useGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.orders)[':orderId']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/orders/:orderId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.orders)[':orderId']['$get']>, Error>(
    key,
    async () => parseResponse(client.orders[':orderId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /orders/{orderId}
 */
export function getGetOrdersOrderIdKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['GET', '/orders/:orderId', args] as const
}

/**
 * GET /files/{fileId}
 *
 * Get file metadata
 */
export function useGetFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.files)[':fileId']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/files/:fileId', args] as const) : null
  return useSWR<InferResponseType<(typeof client.files)[':fileId']['$get']>, Error>(
    key,
    async () => parseResponse(client.files[':fileId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /files/{fileId}
 */
export function getGetFilesFileIdKey(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
) {
  return ['GET', '/files/:fileId', args] as const
}

/**
 * POST /subscriptions
 *
 * Create webhook subscription
 */
export function usePostSubscriptions(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.subscriptions.$post>,
    Error,
    string,
    InferRequestType<typeof client.subscriptions.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.subscriptions.$post>,
    Error,
    string,
    InferRequestType<typeof client.subscriptions.$post>
  >(
    'POST /subscriptions',
    async (_, { arg }) => parseResponse(client.subscriptions.$post(arg, options?.client)),
    options?.swr,
  )
}
