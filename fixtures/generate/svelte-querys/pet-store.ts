import { createMutation, createQuery, queryOptions } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
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
      data: Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.$put>>>>>,
      variables: InferRequestType<typeof client.pet.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.pet.$put>) => void
    onSettled?: (
      data:
        | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.$put>>>>>
        | undefined,
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.pet.$put>) =>
      parseResponse(client.pet.$put(args, clientOptions)),
  }))
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
      data: Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.$post>>>>>,
      variables: InferRequestType<typeof client.pet.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.pet.$post>) => void
    onSettled?: (
      data:
        | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.$post>>>>>
        | undefined,
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.pet.$post>) =>
      parseResponse(client.pet.$post(args, clientOptions)),
  }))
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
  return createQuery(() => ({
    ...getGetPetFindByStatusQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
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
export const getGetPetFindByStatusQueryOptions = (
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPetFindByStatusQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.pet.findByStatus.$get(args, {
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
  return createQuery(() => ({
    ...getGetPetFindByTagsQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
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
export const getGetPetFindByTagsQueryOptions = (
  args: InferRequestType<typeof client.pet.findByTags.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPetFindByTagsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.pet.findByTags.$get(args, {
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
  return createQuery(() => ({
    ...getGetPetPetIdQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
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
export const getGetPetPetIdQueryOptions = (
  args: InferRequestType<(typeof client.pet)[':petId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetPetPetIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.pet[':petId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /pet/{petId}
 *
 * Updates a pet in the store with form data
 */
export function createPostPetPetId(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.pet)[':petId']['$post']>>>
        >
      >,
      variables: InferRequestType<(typeof client.pet)[':petId']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.pet)[':petId']['$post']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.pet)[':petId']['$post']>>>
            >
          >
        | undefined,
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.pet)[':petId']['$post']>) =>
      parseResponse(client.pet[':petId'].$post(args, clientOptions)),
  }))
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
      data: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.pet)[':petId']['$delete']>>>
        >
      >,
      variables: InferRequestType<(typeof client.pet)[':petId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.pet)[':petId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.pet)[':petId']['$delete']>>>
            >
          >
        | undefined,
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.pet)[':petId']['$delete']>) =>
      parseResponse(client.pet[':petId'].$delete(args, clientOptions)),
  }))
}

/**
 * POST /pet/{petId}/uploadImage
 *
 * uploads an image
 */
export function createPostPetPetIdUploadImage(options?: {
  mutation?: {
    onSuccess?: (
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.pet)[':petId']['uploadImage']['$post']>>
          >
        >
      >,
      variables: InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.pet)[':petId']['uploadImage']['$post']>>
              >
            >
          >
        | undefined,
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
    ) => parseResponse(client.pet[':petId'].uploadImage.$post(args, clientOptions)),
  }))
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
  return createQuery(() => ({
    ...getGetStoreInventoryQueryOptions(clientOptions),
    ...queryOptions,
  }))
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
export const getGetStoreInventoryQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetStoreInventoryQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.store.inventory.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.store.order.$post>>>>
      >,
      variables: InferRequestType<typeof client.store.order.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.store.order.$post>) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.store.order.$post>>>>
          >
        | undefined,
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.store.order.$post>) =>
      parseResponse(client.store.order.$post(args, clientOptions)),
  }))
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
  return createQuery(() => ({
    ...getGetStoreOrderOrderIdQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
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
export const getGetStoreOrderOrderIdQueryOptions = (
  args: InferRequestType<(typeof client.store.order)[':orderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetStoreOrderOrderIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.store.order[':orderId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
      data: Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.store.order)[':orderId']['$delete']>>
          >
        >
      >,
      variables: InferRequestType<(typeof client.store.order)[':orderId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.store.order)[':orderId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.store.order)[':orderId']['$delete']>>
              >
            >
          >
        | undefined,
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.store.order)[':orderId']['$delete']>,
    ) => parseResponse(client.store.order[':orderId'].$delete(args, clientOptions)),
  }))
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
      data: Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.user.$post>>>>
      >,
      variables: InferRequestType<typeof client.user.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.user.$post>) => void
    onSettled?: (
      data:
        | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.user.$post>>>>>
        | undefined,
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.user.$post>) =>
      parseResponse(client.user.$post(args, clientOptions)),
  }))
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
      data: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.user.createWithList.$post>>>
        >
      >,
      variables: InferRequestType<typeof client.user.createWithList.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.user.createWithList.$post>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.user.createWithList.$post>>>
            >
          >
        | undefined,
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.user.createWithList.$post>) =>
      parseResponse(client.user.createWithList.$post(args, clientOptions)),
  }))
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
  return createQuery(() => ({
    ...getGetUserLoginQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
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
export const getGetUserLoginQueryOptions = (
  args: InferRequestType<typeof client.user.login.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetUserLoginQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.user.login.$get(args, {
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
  return createQuery(() => ({ ...getGetUserLogoutQueryOptions(clientOptions), ...queryOptions }))
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
export const getGetUserLogoutQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetUserLogoutQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.user.logout.$get(undefined, {
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
  return createQuery(() => ({
    ...getGetUserUsernameQueryOptions(args, clientOptions),
    ...queryOptions,
  }))
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
export const getGetUserUsernameQueryOptions = (
  args: InferRequestType<(typeof client.user)[':username']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetUserUsernameQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.user[':username'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
      data: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.user)[':username']['$put']>>>
        >
      >,
      variables: InferRequestType<(typeof client.user)[':username']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.user)[':username']['$put']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.user)[':username']['$put']>>>
            >
          >
        | undefined,
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.user)[':username']['$put']>) =>
      parseResponse(client.user[':username'].$put(args, clientOptions)),
  }))
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
      data: Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.user)[':username']['$delete']>>>
        >
      >,
      variables: InferRequestType<(typeof client.user)[':username']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.user)[':username']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.user)[':username']['$delete']>>
              >
            >
          >
        | undefined,
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.user)[':username']['$delete']>) =>
      parseResponse(client.user[':username'].$delete(args, clientOptions)),
  }))
}
