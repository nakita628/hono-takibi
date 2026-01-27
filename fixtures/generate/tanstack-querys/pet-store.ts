import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/pet-store'

/**
 * PUT /pet
 *
 * Update an existing pet
 *
 * Update an existing pet by Id
 */
export function usePutPet(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.$put>>>>>,
    Error,
    InferRequestType<typeof client.pet.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.pet.$put>) =>
      parseResponse(client.pet.$put(args, clientOptions)),
  })
}

/**
 * POST /pet
 *
 * Add a new pet to the store
 *
 * Add a new pet to the store
 */
export function usePostPet(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.$post>>>>>,
    Error,
    InferRequestType<typeof client.pet.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.pet.$post>) =>
      parseResponse(client.pet.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /pet/findByStatus
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetPetFindByStatusQueryKey(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
) {
  return ['pet', '/pet/findByStatus', args] as const
}

/**
 * Returns TanStack Query query options for GET /pet/findByStatus
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPetFindByStatusQueryOptions = (
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPetFindByStatusQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.pet.findByStatus.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /pet/findByStatus
 *
 * Finds Pets by status
 *
 * Multiple status values can be provided with comma separated strings
 */
export function useGetPetFindByStatus(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.findByStatus.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPetFindByStatusQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /pet/findByTags
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetPetFindByTagsQueryKey(
  args: InferRequestType<typeof client.pet.findByTags.$get>,
) {
  return ['pet', '/pet/findByTags', args] as const
}

/**
 * Returns TanStack Query query options for GET /pet/findByTags
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPetFindByTagsQueryOptions = (
  args: InferRequestType<typeof client.pet.findByTags.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPetFindByTagsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.pet.findByTags.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /pet/findByTags
 *
 * Finds Pets by tags
 *
 * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 */
export function useGetPetFindByTags(
  args: InferRequestType<typeof client.pet.findByTags.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.findByTags.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPetFindByTagsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /pet/{petId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetPetPetIdQueryKey(
  args: InferRequestType<(typeof client.pet)[':petId']['$get']>,
) {
  return ['pet', '/pet/:petId', args] as const
}

/**
 * Returns TanStack Query query options for GET /pet/{petId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPetPetIdQueryOptions = (
  args: InferRequestType<(typeof client.pet)[':petId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPetPetIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.pet[':petId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /pet/{petId}
 *
 * Find pet by ID
 *
 * Returns a single pet
 */
export function useGetPetPetId(
  args: InferRequestType<(typeof client.pet)[':petId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.pet)[':petId']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPetPetIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /pet/{petId}
 *
 * Updates a pet in the store with form data
 */
export function usePostPetPetId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.pet)[':petId']['$post']>>>>
    >,
    Error,
    InferRequestType<(typeof client.pet)[':petId']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.pet)[':petId']['$post']>) =>
      parseResponse(client.pet[':petId'].$post(args, clientOptions)),
  })
}

/**
 * DELETE /pet/{petId}
 *
 * Deletes a pet
 *
 * delete a pet
 */
export function useDeletePetPetId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.pet)[':petId']['$delete']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.pet)[':petId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.pet)[':petId']['$delete']>) =>
      parseResponse(client.pet[':petId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /pet/{petId}/uploadImage
 *
 * uploads an image
 */
export function usePostPetPetIdUploadImage(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.pet)[':petId']['uploadImage']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
    ) => parseResponse(client.pet[':petId'].uploadImage.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /store/inventory
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetStoreInventoryQueryKey() {
  return ['store', '/store/inventory'] as const
}

/**
 * Returns TanStack Query query options for GET /store/inventory
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStoreInventoryQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetStoreInventoryQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.store.inventory.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /store/inventory
 *
 * Returns pet inventories by status
 *
 * Returns a map of status codes to quantities
 */
export function useGetStoreInventory(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.store.inventory.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetStoreInventoryQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /store/order
 *
 * Place an order for a pet
 *
 * Place a new order in the store
 */
export function usePostStoreOrder(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.store.order.$post>>>>>,
    Error,
    InferRequestType<typeof client.store.order.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.store.order.$post>) =>
      parseResponse(client.store.order.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /store/order/{orderId}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetStoreOrderOrderIdQueryKey(
  args: InferRequestType<(typeof client.store.order)[':orderId']['$get']>,
) {
  return ['store', '/store/order/:orderId', args] as const
}

/**
 * Returns TanStack Query query options for GET /store/order/{orderId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStoreOrderOrderIdQueryOptions = (
  args: InferRequestType<(typeof client.store.order)[':orderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetStoreOrderOrderIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.store.order[':orderId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /store/order/{orderId}
 *
 * Find purchase order by ID
 *
 * For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.
 */
export function useGetStoreOrderOrderId(
  args: InferRequestType<(typeof client.store.order)[':orderId']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.store.order)[':orderId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetStoreOrderOrderIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /store/order/{orderId}
 *
 * Delete purchase order by ID
 *
 * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
 */
export function useDeleteStoreOrderOrderId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.store.order)[':orderId']['$delete']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.store.order)[':orderId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.store.order)[':orderId']['$delete']>,
    ) => parseResponse(client.store.order[':orderId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /user
 *
 * Create user
 *
 * This can only be done by the logged in user.
 */
export function usePostUser(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.user.$post>>>>>,
    Error,
    InferRequestType<typeof client.user.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.user.$post>) =>
      parseResponse(client.user.$post(args, clientOptions)),
  })
}

/**
 * POST /user/createWithList
 *
 * Creates list of users with given input array
 *
 * Creates list of users with given input array
 */
export function usePostUserCreateWithList(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.user.createWithList.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.user.createWithList.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.user.createWithList.$post>) =>
      parseResponse(client.user.createWithList.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /user/login
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUserLoginQueryKey(args: InferRequestType<typeof client.user.login.$get>) {
  return ['user', '/user/login', args] as const
}

/**
 * Returns TanStack Query query options for GET /user/login
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUserLoginQueryOptions = (
  args: InferRequestType<typeof client.user.login.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUserLoginQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.user.login.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /user/login
 *
 * Logs user into the system
 */
export function useGetUserLogin(
  args: InferRequestType<typeof client.user.login.$get>,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.user.login.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUserLoginQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /user/logout
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetUserLogoutQueryKey() {
  return ['user', '/user/logout'] as const
}

/**
 * Returns TanStack Query query options for GET /user/logout
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUserLogoutQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetUserLogoutQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.user.logout.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /user/logout
 *
 * Logs out current logged in user session
 */
export function useGetUserLogout(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.user.logout.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUserLogoutQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /user/{username}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUserUsernameQueryKey(
  args: InferRequestType<(typeof client.user)[':username']['$get']>,
) {
  return ['user', '/user/:username', args] as const
}

/**
 * Returns TanStack Query query options for GET /user/{username}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUserUsernameQueryOptions = (
  args: InferRequestType<(typeof client.user)[':username']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUserUsernameQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.user[':username'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /user/{username}
 *
 * Get user by user name
 */
export function useGetUserUsername(
  args: InferRequestType<(typeof client.user)[':username']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.user)[':username']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUserUsernameQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /user/{username}
 *
 * Update user
 *
 * This can only be done by the logged in user.
 */
export function usePutUserUsername(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.user)[':username']['$put']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.user)[':username']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.user)[':username']['$put']>) =>
      parseResponse(client.user[':username'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /user/{username}
 *
 * Delete user
 *
 * This can only be done by the logged in user.
 */
export function useDeleteUserUsername(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.user)[':username']['$delete']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.user)[':username']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.user)[':username']['$delete']>) =>
      parseResponse(client.user[':username'].$delete(args, clientOptions)),
  })
}
