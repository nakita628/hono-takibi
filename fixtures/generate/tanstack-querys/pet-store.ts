import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/pet-store'

/**
 * PUT /pet
 *
 * Update an existing pet
 *
 * Update an existing pet by Id
 */
export function usePutPet(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.pet.$put> | undefined,
      Error,
      InferRequestType<typeof client.pet.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.pet.$put> | undefined,
    Error,
    InferRequestType<typeof client.pet.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.pet.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /pet
 *
 * Add a new pet to the store
 *
 * Add a new pet to the store
 */
export function usePostPet(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.pet.$post> | undefined,
      Error,
      InferRequestType<typeof client.pet.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.pet.$post> | undefined,
    Error,
    InferRequestType<typeof client.pet.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.pet.$post(args, options?.client)),
    },
    queryClient,
  )
}

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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.pet.findByStatus.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPetFindByStatusQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.pet.findByStatus.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /pet/findByStatus
 */
export function getGetPetFindByStatusQueryKey(
  args?: InferRequestType<typeof client.pet.findByStatus.$get>,
) {
  return ['/pet/findByStatus', ...(args ? [args] : [])] as const
}

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
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.pet.findByTags.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPetFindByTagsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.pet.findByTags.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /pet/findByTags
 */
export function getGetPetFindByTagsQueryKey(
  args?: InferRequestType<typeof client.pet.findByTags.$get>,
) {
  return ['/pet/findByTags', ...(args ? [args] : [])] as const
}

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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.pet)[':petId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPetPetIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.pet[':petId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /pet/{petId}
 */
export function getGetPetPetIdQueryKey(
  args?: InferRequestType<(typeof client.pet)[':petId']['$get']>,
) {
  return ['/pet/:petId', ...(args ? [args] : [])] as const
}

/**
 * POST /pet/{petId}
 *
 * Updates a pet in the store with form data
 */
export function usePostPetPetId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.pet)[':petId']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.pet)[':petId']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.pet)[':petId']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.pet)[':petId']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.pet[':petId'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /pet/{petId}
 *
 * Deletes a pet
 *
 * delete a pet
 */
export function useDeletePetPetId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.pet)[':petId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.pet)[':petId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.pet)[':petId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.pet)[':petId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.pet[':petId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /pet/{petId}/uploadImage
 *
 * uploads an image
 */
export function usePostPetPetIdUploadImage(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.pet)[':petId']['uploadImage']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.pet)[':petId']['uploadImage']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.pet[':petId'].uploadImage.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /store/inventory
 *
 * Returns pet inventories by status
 *
 * Returns a map of status codes to quantities
 */
export function useGetStoreInventory(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.store.inventory.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStoreInventoryQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.store.inventory.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /store/inventory
 */
export function getGetStoreInventoryQueryKey() {
  return ['/store/inventory'] as const
}

/**
 * POST /store/order
 *
 * Place an order for a pet
 *
 * Place a new order in the store
 */
export function usePostStoreOrder(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.store.order.$post> | undefined,
      Error,
      InferRequestType<typeof client.store.order.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.store.order.$post> | undefined,
    Error,
    InferRequestType<typeof client.store.order.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.store.order.$post(args, options?.client)),
    },
    queryClient,
  )
}

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
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.store.order)[':orderId']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStoreOrderOrderIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.store.order[':orderId'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /store/order/{orderId}
 */
export function getGetStoreOrderOrderIdQueryKey(
  args?: InferRequestType<(typeof client.store.order)[':orderId']['$get']>,
) {
  return ['/store/order/:orderId', ...(args ? [args] : [])] as const
}

/**
 * DELETE /store/order/{orderId}
 *
 * Delete purchase order by ID
 *
 * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
 */
export function useDeleteStoreOrderOrderId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.store.order)[':orderId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.store.order)[':orderId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.store.order)[':orderId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.store.order)[':orderId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.store.order[':orderId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /user
 *
 * Create user
 *
 * This can only be done by the logged in user.
 */
export function usePostUser(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.user.$post> | undefined,
      Error,
      InferRequestType<typeof client.user.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.user.$post> | undefined,
    Error,
    InferRequestType<typeof client.user.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.user.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /user/createWithList
 *
 * Creates list of users with given input array
 *
 * Creates list of users with given input array
 */
export function usePostUserCreateWithList(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.user.createWithList.$post> | undefined,
      Error,
      InferRequestType<typeof client.user.createWithList.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.user.createWithList.$post> | undefined,
    Error,
    InferRequestType<typeof client.user.createWithList.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.user.createWithList.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /user/login
 *
 * Logs user into the system
 */
export function useGetUserLogin(
  args: InferRequestType<typeof client.user.login.$get>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.user.login.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUserLoginQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.user.login.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /user/login
 */
export function getGetUserLoginQueryKey(args?: InferRequestType<typeof client.user.login.$get>) {
  return ['/user/login', ...(args ? [args] : [])] as const
}

/**
 * GET /user/logout
 *
 * Logs out current logged in user session
 */
export function useGetUserLogout(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.user.logout.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUserLogoutQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.user.logout.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /user/logout
 */
export function getGetUserLogoutQueryKey() {
  return ['/user/logout'] as const
}

/**
 * GET /user/{username}
 *
 * Get user by user name
 */
export function useGetUserUsername(
  args: InferRequestType<(typeof client.user)[':username']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.user)[':username']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUserUsernameQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.user[':username'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /user/{username}
 */
export function getGetUserUsernameQueryKey(
  args?: InferRequestType<(typeof client.user)[':username']['$get']>,
) {
  return ['/user/:username', ...(args ? [args] : [])] as const
}

/**
 * PUT /user/{username}
 *
 * Update user
 *
 * This can only be done by the logged in user.
 */
export function usePutUserUsername(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.user)[':username']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.user)[':username']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.user)[':username']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.user)[':username']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.user[':username'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /user/{username}
 *
 * Delete user
 *
 * This can only be done by the logged in user.
 */
export function useDeleteUserUsername(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.user)[':username']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.user)[':username']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.user)[':username']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.user)[':username']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.user[':username'].$delete(args, options?.client)),
    },
    queryClient,
  )
}
