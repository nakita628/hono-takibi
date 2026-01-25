import { useQuery, useMutation } from '@tanstack/vue-query'
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
export function usePutPet(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.pet.$put>,
      variables: InferRequestType<typeof client.pet.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.pet.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.pet.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.pet.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.pet.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.pet.$put>) =>
      parseResponse(client.pet.$put(args, clientOptions)),
    ...mutationOptions,
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.pet.$post>,
      variables: InferRequestType<typeof client.pet.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.pet.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.pet.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.pet.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.pet.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.pet.$post>) =>
      parseResponse(client.pet.$post(args, clientOptions)),
    ...mutationOptions,
  })
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
      placeholderData?:
        | InferResponseType<typeof client.pet.findByStatus.$get>
        | (() => InferResponseType<typeof client.pet.findByStatus.$get>)
      initialData?:
        | InferResponseType<typeof client.pet.findByStatus.$get>
        | (() => InferResponseType<typeof client.pet.findByStatus.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPetFindByStatusQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.pet.findByStatus.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /pet/findByStatus
 */
export function getGetPetFindByStatusQueryKey(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
) {
  return ['/pet/findByStatus', args] as const
}

/**
 * Returns Vue Query query options for GET /pet/findByStatus
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPetFindByStatusQueryOptions(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPetFindByStatusQueryKey(args),
    queryFn: async () => parseResponse(client.pet.findByStatus.$get(args, clientOptions)),
  }
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
      placeholderData?:
        | InferResponseType<typeof client.pet.findByTags.$get>
        | (() => InferResponseType<typeof client.pet.findByTags.$get>)
      initialData?:
        | InferResponseType<typeof client.pet.findByTags.$get>
        | (() => InferResponseType<typeof client.pet.findByTags.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPetFindByTagsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.pet.findByTags.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /pet/findByTags
 */
export function getGetPetFindByTagsQueryKey(
  args: InferRequestType<typeof client.pet.findByTags.$get>,
) {
  return ['/pet/findByTags', args] as const
}

/**
 * Returns Vue Query query options for GET /pet/findByTags
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPetFindByTagsQueryOptions(
  args: InferRequestType<typeof client.pet.findByTags.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPetFindByTagsQueryKey(args),
    queryFn: async () => parseResponse(client.pet.findByTags.$get(args, clientOptions)),
  }
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
      placeholderData?:
        | InferResponseType<(typeof client.pet)[':petId']['$get']>
        | (() => InferResponseType<(typeof client.pet)[':petId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.pet)[':petId']['$get']>
        | (() => InferResponseType<(typeof client.pet)[':petId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetPetPetIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.pet[':petId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /pet/{petId}
 */
export function getGetPetPetIdQueryKey(
  args: InferRequestType<(typeof client.pet)[':petId']['$get']>,
) {
  return ['/pet/:petId', args] as const
}

/**
 * Returns Vue Query query options for GET /pet/{petId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetPetPetIdQueryOptions(
  args: InferRequestType<(typeof client.pet)[':petId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetPetPetIdQueryKey(args),
    queryFn: async () => parseResponse(client.pet[':petId'].$get(args, clientOptions)),
  }
}

/**
 * POST /pet/{petId}
 *
 * Updates a pet in the store with form data
 */
export function usePostPetPetId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.pet)[':petId']['$post']>,
      variables: InferRequestType<(typeof client.pet)[':petId']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.pet)[':petId']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.pet)[':petId']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.pet)[':petId']['$post']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.pet)[':petId']['$post']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.pet)[':petId']['$post']>) =>
      parseResponse(client.pet[':petId'].$post(args, clientOptions)),
    ...mutationOptions,
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.pet)[':petId']['$delete']>,
      variables: InferRequestType<(typeof client.pet)[':petId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.pet)[':petId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.pet)[':petId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.pet)[':petId']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.pet)[':petId']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.pet)[':petId']['$delete']>) =>
      parseResponse(client.pet[':petId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /pet/{petId}/uploadImage
 *
 * uploads an image
 */
export function usePostPetPetIdUploadImage(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
      variables: InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.pet)[':petId']['uploadImage']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
    ) => parseResponse(client.pet[':petId'].uploadImage.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /store/inventory
 *
 * Returns pet inventories by status
 *
 * Returns a map of status codes to quantities
 */
export function useGetStoreInventory(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.store.inventory.$get>
      | (() => InferResponseType<typeof client.store.inventory.$get>)
    initialData?:
      | InferResponseType<typeof client.store.inventory.$get>
      | (() => InferResponseType<typeof client.store.inventory.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetStoreInventoryQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.store.inventory.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /store/inventory
 */
export function getGetStoreInventoryQueryKey() {
  return ['/store/inventory'] as const
}

/**
 * Returns Vue Query query options for GET /store/inventory
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetStoreInventoryQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetStoreInventoryQueryKey(),
    queryFn: async () => parseResponse(client.store.inventory.$get(undefined, clientOptions)),
  }
}

/**
 * POST /store/order
 *
 * Place an order for a pet
 *
 * Place a new order in the store
 */
export function usePostStoreOrder(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.store.order.$post>,
      variables: InferRequestType<typeof client.store.order.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.store.order.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.store.order.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.store.order.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.store.order.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.store.order.$post>) =>
      parseResponse(client.store.order.$post(args, clientOptions)),
    ...mutationOptions,
  })
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
      placeholderData?:
        | InferResponseType<(typeof client.store.order)[':orderId']['$get']>
        | (() => InferResponseType<(typeof client.store.order)[':orderId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.store.order)[':orderId']['$get']>
        | (() => InferResponseType<(typeof client.store.order)[':orderId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetStoreOrderOrderIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.store.order[':orderId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /store/order/{orderId}
 */
export function getGetStoreOrderOrderIdQueryKey(
  args: InferRequestType<(typeof client.store.order)[':orderId']['$get']>,
) {
  return ['/store/order/:orderId', args] as const
}

/**
 * Returns Vue Query query options for GET /store/order/{orderId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetStoreOrderOrderIdQueryOptions(
  args: InferRequestType<(typeof client.store.order)[':orderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetStoreOrderOrderIdQueryKey(args),
    queryFn: async () => parseResponse(client.store.order[':orderId'].$get(args, clientOptions)),
  }
}

/**
 * DELETE /store/order/{orderId}
 *
 * Delete purchase order by ID
 *
 * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
 */
export function useDeleteStoreOrderOrderId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.store.order)[':orderId']['$delete']>,
      variables: InferRequestType<(typeof client.store.order)[':orderId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.store.order)[':orderId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.store.order)[':orderId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.store.order)[':orderId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.store.order)[':orderId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.store.order)[':orderId']['$delete']>,
    ) => parseResponse(client.store.order[':orderId'].$delete(args, clientOptions)),
    ...mutationOptions,
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.user.$post>,
      variables: InferRequestType<typeof client.user.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.user.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.user.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.user.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.user.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.user.$post>) =>
      parseResponse(client.user.$post(args, clientOptions)),
    ...mutationOptions,
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.user.createWithList.$post>,
      variables: InferRequestType<typeof client.user.createWithList.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.user.createWithList.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.user.createWithList.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.user.createWithList.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.user.createWithList.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.user.createWithList.$post>) =>
      parseResponse(client.user.createWithList.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /user/login
 *
 * Logs user into the system
 */
export function useGetUserLogin(
  args: InferRequestType<typeof client.user.login.$get>,
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
      placeholderData?:
        | InferResponseType<typeof client.user.login.$get>
        | (() => InferResponseType<typeof client.user.login.$get>)
      initialData?:
        | InferResponseType<typeof client.user.login.$get>
        | (() => InferResponseType<typeof client.user.login.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUserLoginQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.user.login.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /user/login
 */
export function getGetUserLoginQueryKey(args: InferRequestType<typeof client.user.login.$get>) {
  return ['/user/login', args] as const
}

/**
 * Returns Vue Query query options for GET /user/login
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUserLoginQueryOptions(
  args: InferRequestType<typeof client.user.login.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUserLoginQueryKey(args),
    queryFn: async () => parseResponse(client.user.login.$get(args, clientOptions)),
  }
}

/**
 * GET /user/logout
 *
 * Logs out current logged in user session
 */
export function useGetUserLogout(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.user.logout.$get>
      | (() => InferResponseType<typeof client.user.logout.$get>)
    initialData?:
      | InferResponseType<typeof client.user.logout.$get>
      | (() => InferResponseType<typeof client.user.logout.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUserLogoutQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.user.logout.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /user/logout
 */
export function getGetUserLogoutQueryKey() {
  return ['/user/logout'] as const
}

/**
 * Returns Vue Query query options for GET /user/logout
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUserLogoutQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetUserLogoutQueryKey(),
    queryFn: async () => parseResponse(client.user.logout.$get(undefined, clientOptions)),
  }
}

/**
 * GET /user/{username}
 *
 * Get user by user name
 */
export function useGetUserUsername(
  args: InferRequestType<(typeof client.user)[':username']['$get']>,
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
      placeholderData?:
        | InferResponseType<(typeof client.user)[':username']['$get']>
        | (() => InferResponseType<(typeof client.user)[':username']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.user)[':username']['$get']>
        | (() => InferResponseType<(typeof client.user)[':username']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUserUsernameQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.user[':username'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /user/{username}
 */
export function getGetUserUsernameQueryKey(
  args: InferRequestType<(typeof client.user)[':username']['$get']>,
) {
  return ['/user/:username', args] as const
}

/**
 * Returns Vue Query query options for GET /user/{username}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUserUsernameQueryOptions(
  args: InferRequestType<(typeof client.user)[':username']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUserUsernameQueryKey(args),
    queryFn: async () => parseResponse(client.user[':username'].$get(args, clientOptions)),
  }
}

/**
 * PUT /user/{username}
 *
 * Update user
 *
 * This can only be done by the logged in user.
 */
export function usePutUserUsername(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.user)[':username']['$put']>,
      variables: InferRequestType<(typeof client.user)[':username']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.user)[':username']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.user)[':username']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.user)[':username']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.user)[':username']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.user)[':username']['$put']>) =>
      parseResponse(client.user[':username'].$put(args, clientOptions)),
    ...mutationOptions,
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
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.user)[':username']['$delete']>,
      variables: InferRequestType<(typeof client.user)[':username']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.user)[':username']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.user)[':username']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.user)[':username']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.user)[':username']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.user)[':username']['$delete']>) =>
      parseResponse(client.user[':username'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}
