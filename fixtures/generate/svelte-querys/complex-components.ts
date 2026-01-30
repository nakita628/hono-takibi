import { createQuery, createMutation } from '@tanstack/svelte-query'
import type {
  CreateQueryOptions,
  QueryFunctionContext,
  CreateMutationOptions,
} from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/complex-components'

/**
 * Generates Svelte Query mutation key for POST /auth/token
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostAuthTokenMutationKey() {
  return ['auth', 'POST', '/auth/token'] as const
}

/**
 * Returns Svelte Query mutation options for POST /auth/token
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostAuthTokenMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostAuthTokenMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.auth.token.$post>) =>
    parseResponse(client.auth.token.$post(args, clientOptions)),
})

/**
 * POST /auth/token
 *
 * Issue access token
 */
export function createPostAuthToken(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.auth.token.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.auth.token.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostAuthTokenMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /users
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['users', 'GET', '/users', args] as const
}

/**
 * Returns Svelte Query query options for GET /users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersQueryOptions = (
  args: InferRequestType<typeof client.users.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /users
 *
 * List users
 */
export function createGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetUsersQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /users
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUsersMutationKey() {
  return ['users', 'POST', '/users'] as const
}

/**
 * Returns Svelte Query mutation options for POST /users
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostUsersMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostUsersMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.users.$post>) =>
    parseResponse(client.users.$post(args, clientOptions)),
})

/**
 * POST /users
 *
 * Create user
 */
export function createPostUsers(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.users.$post>>>>>,
      Error,
      InferRequestType<typeof client.users.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostUsersMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /users/{userId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['users', 'GET', '/users/:userId', args] as const
}

/**
 * Returns Svelte Query query options for GET /users/{userId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdQueryOptions = (
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersUserIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users[':userId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/{userId}
 *
 * Get user by id
 */
export function createGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetUsersUserIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PATCH /users/{userId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchUsersUserIdMutationKey() {
  return ['users', 'PATCH', '/users/:userId'] as const
}

/**
 * Returns Svelte Query mutation options for PATCH /users/{userId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchUsersUserIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchUsersUserIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.users)[':userId']['$patch']>) =>
    parseResponse(client.users[':userId'].$patch(args, clientOptions)),
})

/**
 * PATCH /users/{userId}
 *
 * Update user (partial)
 */
export function createPatchUsersUserId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':userId']['$patch']>>>
        >
      >,
      Error,
      InferRequestType<(typeof client.users)[':userId']['$patch']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPatchUsersUserIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /companies/{companyId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetCompaniesCompanyIdQueryKey(
  args: InferRequestType<(typeof client.companies)[':companyId']['$get']>,
) {
  return ['companies', 'GET', '/companies/:companyId', args] as const
}

/**
 * Returns Svelte Query query options for GET /companies/{companyId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetCompaniesCompanyIdQueryOptions = (
  args: InferRequestType<(typeof client.companies)[':companyId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetCompaniesCompanyIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.companies[':companyId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /companies/{companyId}
 *
 * Get company by id
 */
export function createGetCompaniesCompanyId(
  args: InferRequestType<(typeof client.companies)[':companyId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.companies)[':companyId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetCompaniesCompanyIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /orders
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetOrdersQueryKey(args: InferRequestType<typeof client.orders.$get>) {
  return ['orders', 'GET', '/orders', args] as const
}

/**
 * Returns Svelte Query query options for GET /orders
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOrdersQueryOptions = (
  args: InferRequestType<typeof client.orders.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetOrdersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.orders.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /orders
 *
 * List orders
 */
export function createGetOrders(
  args: InferRequestType<typeof client.orders.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.orders.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetOrdersQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /orders
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOrdersMutationKey() {
  return ['orders', 'POST', '/orders'] as const
}

/**
 * Returns Svelte Query mutation options for POST /orders
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostOrdersMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostOrdersMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.orders.$post>) =>
    parseResponse(client.orders.$post(args, clientOptions)),
})

/**
 * POST /orders
 *
 * Create order (and optionally trigger callback)
 */
export function createPostOrders(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.orders.$post>>>>>,
      Error,
      InferRequestType<typeof client.orders.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostOrdersMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /orders/{orderId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetOrdersOrderIdQueryKey(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
) {
  return ['orders', 'GET', '/orders/:orderId', args] as const
}

/**
 * Returns Svelte Query query options for GET /orders/{orderId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOrdersOrderIdQueryOptions = (
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetOrdersOrderIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.orders[':orderId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /orders/{orderId}
 *
 * Get order by id
 */
export function createGetOrdersOrderId(
  args: InferRequestType<(typeof client.orders)[':orderId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.orders)[':orderId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetOrdersOrderIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFilesFileIdQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
) {
  return ['files', 'GET', '/files/:fileId', args] as const
}

/**
 * Returns Svelte Query query options for GET /files/{fileId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.files[':fileId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /files/{fileId}
 *
 * Get file metadata
 */
export function createGetFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /subscriptions
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSubscriptionsMutationKey() {
  return ['subscriptions', 'POST', '/subscriptions'] as const
}

/**
 * Returns Svelte Query mutation options for POST /subscriptions
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
 *
 * Create webhook subscription
 */
export function createPostSubscriptions(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.subscriptions.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.subscriptions.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostSubscriptionsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}
