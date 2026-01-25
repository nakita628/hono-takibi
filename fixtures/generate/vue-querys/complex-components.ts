import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-components'

/**
 * POST /auth/token
 *
 * Issue access token
 */
export function usePostAuthToken(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.auth.token.$post>,
      variables: InferRequestType<typeof client.auth.token.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.auth.token.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.auth.token.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.auth.token.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.auth.token.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.auth.token.$post>) =>
      parseResponse(client.auth.token.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /users
 *
 * List users
 */
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<typeof client.users.$get>,
      ) => InferResponseType<typeof client.users.$get>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersQueryKey(args),
    queryFn: async () => parseResponse(client.users.$get(args, clientOptions)),
    ...queryOptions,
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
export function usePostUsers(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.users.$post>,
      variables: InferRequestType<typeof client.users.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.users.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.users.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.users.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.users.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.users.$post>) =>
      parseResponse(client.users.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /users/{userId}
 *
 * Get user by id
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.users)[':userId']['$get']>,
      ) => InferResponseType<(typeof client.users)[':userId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersUserIdQueryKey(args),
    queryFn: async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
    ...queryOptions,
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
export function usePatchUsersUserId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.users)[':userId']['$patch']>,
      variables: InferRequestType<(typeof client.users)[':userId']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)[':userId']['$patch']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.users)[':userId']['$patch']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)[':userId']['$patch']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.users)[':userId']['$patch']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$patch']>) =>
      parseResponse(client.users[':userId'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /companies/{companyId}
 *
 * Get company by id
 */
export function useGetCompaniesCompanyId(
  args: InferRequestType<(typeof client.companies)[':companyId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.companies)[':companyId']['$get']>,
      ) => InferResponseType<(typeof client.companies)[':companyId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetCompaniesCompanyIdQueryKey(args),
    queryFn: async () => parseResponse(client.companies[':companyId'].$get(args, clientOptions)),
    ...queryOptions,
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
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<typeof client.orders.$get>,
      ) => InferResponseType<typeof client.orders.$get>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOrdersQueryKey(args),
    queryFn: async () => parseResponse(client.orders.$get(args, clientOptions)),
    ...queryOptions,
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
export function usePostOrders(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.orders.$post>,
      variables: InferRequestType<typeof client.orders.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.orders.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.orders.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.orders.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.orders.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.orders.$post>) =>
      parseResponse(client.orders.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /orders/{orderId}
 *
 * Get order by id
 */
export function useGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.orders)[':orderId']['$get']>,
      ) => InferResponseType<(typeof client.orders)[':orderId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOrdersOrderIdQueryKey(args),
    queryFn: async () => parseResponse(client.orders[':orderId'].$get(args, clientOptions)),
    ...queryOptions,
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
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.files)[':fileId']['$get']>,
      ) => InferResponseType<(typeof client.files)[':fileId']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetFilesFileIdQueryKey(args),
    queryFn: async () => parseResponse(client.files[':fileId'].$get(args, clientOptions)),
    ...queryOptions,
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
export function usePostSubscriptions(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.subscriptions.$post>,
      variables: InferRequestType<typeof client.subscriptions.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.subscriptions.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.subscriptions.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.subscriptions.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.subscriptions.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.subscriptions.$post>) =>
      parseResponse(client.subscriptions.$post(args, clientOptions)),
    ...mutationOptions,
  })
}
