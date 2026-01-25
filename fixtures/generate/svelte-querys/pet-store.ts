import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/pet-store'

/**
 * PUT /pet
 *
 * Update an existing pet
 *
 * Update an existing pet by Id
 */
export function createPutPet(options?: {
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
  return createMutation({
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
export function createPostPet(options?: {
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
  return createMutation({
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
export function createGetPetFindByStatus(
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetPetFindByStatusQueryKey(args),
    queryFn: async () => parseResponse(client.pet.findByStatus.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /pet/findByStatus
 */
export function getGetPetFindByStatusQueryKey(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
) {
  return ['/pet/findByStatus', args] as const
}

/**
 * Returns Svelte Query query options for GET /pet/findByStatus
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
export function createGetPetFindByTags(
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetPetFindByTagsQueryKey(args),
    queryFn: async () => parseResponse(client.pet.findByTags.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /pet/findByTags
 */
export function getGetPetFindByTagsQueryKey(
  args: InferRequestType<typeof client.pet.findByTags.$get>,
) {
  return ['/pet/findByTags', args] as const
}

/**
 * Returns Svelte Query query options for GET /pet/findByTags
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
export function createGetPetPetId(
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetPetPetIdQueryKey(args),
    queryFn: async () => parseResponse(client.pet[':petId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /pet/{petId}
 */
export function getGetPetPetIdQueryKey(
  args: InferRequestType<(typeof client.pet)[':petId']['$get']>,
) {
  return ['/pet/:petId', args] as const
}

/**
 * Returns Svelte Query query options for GET /pet/{petId}
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
export function createPostPetPetId(options?: {
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
  return createMutation({
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
export function createDeletePetPetId(options?: {
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
  return createMutation({
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
export function createPostPetPetIdUploadImage(options?: {
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
  return createMutation({
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
export function createGetStoreInventory(options?: {
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetStoreInventoryQueryKey(),
    queryFn: async () => parseResponse(client.store.inventory.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /store/inventory
 */
export function getGetStoreInventoryQueryKey() {
  return ['/store/inventory'] as const
}

/**
 * Returns Svelte Query query options for GET /store/inventory
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
export function createPostStoreOrder(options?: {
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
  return createMutation({
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
export function createGetStoreOrderOrderId(
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetStoreOrderOrderIdQueryKey(args),
    queryFn: async () => parseResponse(client.store.order[':orderId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /store/order/{orderId}
 */
export function getGetStoreOrderOrderIdQueryKey(
  args: InferRequestType<(typeof client.store.order)[':orderId']['$get']>,
) {
  return ['/store/order/:orderId', args] as const
}

/**
 * Returns Svelte Query query options for GET /store/order/{orderId}
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
export function createDeleteStoreOrderOrderId(options?: {
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
  return createMutation({
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
export function createPostUser(options?: {
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
  return createMutation({
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
export function createPostUserCreateWithList(options?: {
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
  return createMutation({
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
export function createGetUserLogin(
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUserLoginQueryKey(args),
    queryFn: async () => parseResponse(client.user.login.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /user/login
 */
export function getGetUserLoginQueryKey(args: InferRequestType<typeof client.user.login.$get>) {
  return ['/user/login', args] as const
}

/**
 * Returns Svelte Query query options for GET /user/login
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
export function createGetUserLogout(options?: {
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUserLogoutQueryKey(),
    queryFn: async () => parseResponse(client.user.logout.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /user/logout
 */
export function getGetUserLogoutQueryKey() {
  return ['/user/logout'] as const
}

/**
 * Returns Svelte Query query options for GET /user/logout
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
export function createGetUserUsername(
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUserUsernameQueryKey(args),
    queryFn: async () => parseResponse(client.user[':username'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /user/{username}
 */
export function getGetUserUsernameQueryKey(
  args: InferRequestType<(typeof client.user)[':username']['$get']>,
) {
  return ['/user/:username', args] as const
}

/**
 * Returns Svelte Query query options for GET /user/{username}
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
export function createPutUserUsername(options?: {
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
  return createMutation({
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
export function createDeleteUserUsername(options?: {
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
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.user)[':username']['$delete']>) =>
      parseResponse(client.user[':username'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}
