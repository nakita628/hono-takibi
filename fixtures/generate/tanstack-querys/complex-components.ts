import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-components'

/**
 * POST /auth/token
 *
 * Issue access token
 */
export function usePostAuthToken(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.auth.token.$post> | undefined,
      Error,
      InferRequestType<typeof client.auth.token.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.auth.token.$post> | undefined,
    Error,
    InferRequestType<typeof client.auth.token.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.auth.token.$post(args, options?.client)),
    },
    queryClient,
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
    query?: UseQueryOptions<
      InferResponseType<typeof client.users.$get>,
      Error,
      InferResponseType<typeof client.users.$get>,
      readonly ['/users', InferRequestType<typeof client.users.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /users
 */
export function getGetUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['/users', args] as const
}

/**
 * POST /users
 *
 * Create user
 */
export function usePostUsers(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.users.$post> | undefined,
      Error,
      InferRequestType<typeof client.users.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.users.$post> | undefined,
    Error,
    InferRequestType<typeof client.users.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.users.$post(args, options?.client)),
    },
    queryClient,
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.users)[':userId']['$get']>,
      Error,
      InferResponseType<(typeof client.users)[':userId']['$get']>,
      readonly ['/users/:userId', InferRequestType<(typeof client.users)[':userId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /users/{userId}
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
export function usePatchUsersUserId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.users)[':userId']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.users)[':userId']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.users[':userId'].$patch(args, options?.client)),
    },
    queryClient,
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.companies)[':companyId']['$get']>,
      Error,
      InferResponseType<(typeof client.companies)[':companyId']['$get']>,
      readonly [
        '/companies/:companyId',
        InferRequestType<(typeof client.companies)[':companyId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetCompaniesCompanyIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.companies[':companyId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /companies/{companyId}
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
  options?: {
    query?: UseQueryOptions<
      InferResponseType<typeof client.orders.$get>,
      Error,
      InferResponseType<typeof client.orders.$get>,
      readonly ['/orders', InferRequestType<typeof client.orders.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOrdersQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.orders.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /orders
 */
export function getGetOrdersQueryKey(args: InferRequestType<typeof client.orders.$get>) {
  return ['/orders', args] as const
}

/**
 * POST /orders
 *
 * Create order (and optionally trigger callback)
 */
export function usePostOrders(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.orders.$post> | undefined,
      Error,
      InferRequestType<typeof client.orders.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.orders.$post> | undefined,
    Error,
    InferRequestType<typeof client.orders.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.orders.$post(args, options?.client)),
    },
    queryClient,
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
    query?: UseQueryOptions<
      InferResponseType<(typeof client.orders)[':orderId']['$get']>,
      Error,
      InferResponseType<(typeof client.orders)[':orderId']['$get']>,
      readonly ['/orders/:orderId', InferRequestType<(typeof client.orders)[':orderId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOrdersOrderIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.orders[':orderId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /orders/{orderId}
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
  options?: {
    query?: UseQueryOptions<
      InferResponseType<(typeof client.files)[':fileId']['$get']>,
      Error,
      InferResponseType<(typeof client.files)[':fileId']['$get']>,
      readonly ['/files/:fileId', InferRequestType<(typeof client.files)[':fileId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFilesFileIdQueryKey(args)
  const query = useQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.files[':fileId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /files/{fileId}
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
export function usePostSubscriptions(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.subscriptions.$post> | undefined,
      Error,
      InferRequestType<typeof client.subscriptions.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.subscriptions.$post> | undefined,
    Error,
    InferRequestType<typeof client.subscriptions.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.subscriptions.$post(args, options?.client)),
    },
    queryClient,
  )
}
