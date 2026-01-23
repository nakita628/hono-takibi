import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
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
    swr?: SWRConfiguration<InferResponseType<typeof client.users.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.users.$get>, Error>(
    swrKey,
    async () => parseResponse(client.users.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users
 */
export function getGetUsersKey(args?: InferRequestType<typeof client.users.$get>) {
  return ['/users', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.users)[':userId']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.users)[':userId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /users/{userId}
 */
export function getGetUsersUserIdKey(
  args?: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', ...(args ? [args] : [])] as const
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
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetCompaniesCompanyIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.companies)[':companyId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.companies[':companyId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /companies/{companyId}
 */
export function getGetCompaniesCompanyIdKey(
  args?: InferRequestType<(typeof client.companies)[':companyId']['$get']>,
) {
  return ['/companies/:companyId', ...(args ? [args] : [])] as const
}

/**
 * GET /orders
 *
 * List orders
 */
export function useGetOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.orders.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOrdersKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.orders.$get>, Error>(
    swrKey,
    async () => parseResponse(client.orders.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /orders
 */
export function getGetOrdersKey(args?: InferRequestType<typeof client.orders.$get>) {
  return ['/orders', ...(args ? [args] : [])] as const
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.orders)[':orderId']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOrdersOrderIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.orders)[':orderId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.orders[':orderId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /orders/{orderId}
 */
export function getGetOrdersOrderIdKey(
  args?: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['/orders/:orderId', ...(args ? [args] : [])] as const
}

/**
 * GET /files/{fileId}
 *
 * Get file metadata
 */
export function useGetFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.files)[':fileId']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFilesFileIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.files)[':fileId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.files[':fileId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /files/{fileId}
 */
export function getGetFilesFileIdKey(
  args?: InferRequestType<(typeof client.files)[':fileId']['$get']>,
) {
  return ['/files/:fileId', ...(args ? [args] : [])] as const
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
