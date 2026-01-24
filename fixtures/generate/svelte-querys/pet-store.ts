import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
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
export function createPutPet(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.pet.$put>) =>
        parseResponse(client.pet.$put(args, options?.client)),
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
export function createPostPet(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.pet.$post>) =>
        parseResponse(client.pet.$post(args, options?.client)),
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
export function createGetPetFindByStatus(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.pet.findByStatus.$get>,
      Error,
      InferResponseType<typeof client.pet.findByStatus.$get>,
      readonly ['/pet/findByStatus', InferRequestType<typeof client.pet.findByStatus.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPetFindByStatusQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.pet.findByStatus.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * GET /pet/findByTags
 *
 * Finds Pets by tags
 *
 * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 */
export function createGetPetFindByTags(
  args: InferRequestType<typeof client.pet.findByTags.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.pet.findByTags.$get>,
      Error,
      InferResponseType<typeof client.pet.findByTags.$get>,
      readonly ['/pet/findByTags', InferRequestType<typeof client.pet.findByTags.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPetFindByTagsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.pet.findByTags.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * GET /pet/{petId}
 *
 * Find pet by ID
 *
 * Returns a single pet
 */
export function createGetPetPetId(
  args: InferRequestType<(typeof client.pet)[':petId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.pet)[':petId']['$get']>,
      Error,
      InferResponseType<(typeof client.pet)[':petId']['$get']>,
      readonly ['/pet/:petId', InferRequestType<(typeof client.pet)[':petId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPetPetIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.pet[':petId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * POST /pet/{petId}
 *
 * Updates a pet in the store with form data
 */
export function createPostPetPetId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.pet)[':petId']['$post']>) =>
        parseResponse(client.pet[':petId'].$post(args, options?.client)),
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
export function createDeletePetPetId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.pet)[':petId']['$delete']>) =>
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
export function createPostPetPetIdUploadImage(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
      ) => parseResponse(client.pet[':petId'].uploadImage.$post(args, options?.client)),
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
export function createGetStoreInventory(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.store.inventory.$get>,
      Error,
      InferResponseType<typeof client.store.inventory.$get>,
      readonly ['/store/inventory']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStoreInventoryQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.store.inventory.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /store/inventory
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
export function createPostStoreOrder(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.store.order.$post>) =>
        parseResponse(client.store.order.$post(args, options?.client)),
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
export function createGetStoreOrderOrderId(
  args: InferRequestType<(typeof client.store.order)[':orderId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.store.order)[':orderId']['$get']>,
      Error,
      InferResponseType<(typeof client.store.order)[':orderId']['$get']>,
      readonly [
        '/store/order/:orderId',
        InferRequestType<(typeof client.store.order)[':orderId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStoreOrderOrderIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.store.order[':orderId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * DELETE /store/order/{orderId}
 *
 * Delete purchase order by ID
 *
 * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
 */
export function createDeleteStoreOrderOrderId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.store.order)[':orderId']['$delete']>,
      ) => parseResponse(client.store.order[':orderId'].$delete(args, options?.client)),
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
export function createPostUser(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.user.$post>) =>
        parseResponse(client.user.$post(args, options?.client)),
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
export function createPostUserCreateWithList(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.user.createWithList.$post>) =>
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
export function createGetUserLogin(
  args: InferRequestType<typeof client.user.login.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.user.login.$get>,
      Error,
      InferResponseType<typeof client.user.login.$get>,
      readonly ['/user/login', InferRequestType<typeof client.user.login.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUserLoginQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.user.login.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /user/login
 */
export function getGetUserLoginQueryKey(args: InferRequestType<typeof client.user.login.$get>) {
  return ['/user/login', args] as const
}

/**
 * GET /user/logout
 *
 * Logs out current logged in user session
 */
export function createGetUserLogout(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.user.logout.$get>,
      Error,
      InferResponseType<typeof client.user.logout.$get>,
      readonly ['/user/logout']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUserLogoutQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.user.logout.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /user/logout
 */
export function getGetUserLogoutQueryKey() {
  return ['/user/logout'] as const
}

/**
 * GET /user/{username}
 *
 * Get user by user name
 */
export function createGetUserUsername(
  args: InferRequestType<(typeof client.user)[':username']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.user)[':username']['$get']>,
      Error,
      InferResponseType<(typeof client.user)[':username']['$get']>,
      readonly ['/user/:username', InferRequestType<(typeof client.user)[':username']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUserUsernameQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.user[':username'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
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
 * PUT /user/{username}
 *
 * Update user
 *
 * This can only be done by the logged in user.
 */
export function createPutUserUsername(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.user)[':username']['$put']>) =>
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
export function createDeleteUserUsername(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.user)[':username']['$delete']>) =>
        parseResponse(client.user[':username'].$delete(args, options?.client)),
    },
    queryClient,
  )
}
