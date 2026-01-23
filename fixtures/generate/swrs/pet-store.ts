import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/pet-store'

/**
 * PUT /pet
 *
 * Update an existing pet
 *
 * Update an existing pet by Id
 */
export function usePutPet(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.pet.$put>,
    Error,
    string,
    InferRequestType<typeof client.pet.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.pet.$put>,
    Error,
    string,
    InferRequestType<typeof client.pet.$put>
  >(
    'PUT /pet',
    async (_, { arg }) => parseResponse(client.pet.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /pet
 *
 * Add a new pet to the store
 *
 * Add a new pet to the store
 */
export function usePostPet(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.pet.$post>,
    Error,
    string,
    InferRequestType<typeof client.pet.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.pet.$post>,
    Error,
    string,
    InferRequestType<typeof client.pet.$post>
  >(
    'POST /pet',
    async (_, { arg }) => parseResponse(client.pet.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<InferResponseType<typeof client.pet.findByStatus.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPetFindByStatusKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.pet.findByStatus.$get>, Error>(
    swrKey,
    async () => parseResponse(client.pet.findByStatus.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /pet/findByStatus
 */
export function getGetPetFindByStatusKey(
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
    swr?: SWRConfiguration<InferResponseType<typeof client.pet.findByTags.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPetFindByTagsKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.pet.findByTags.$get>, Error>(
    swrKey,
    async () => parseResponse(client.pet.findByTags.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /pet/findByTags
 */
export function getGetPetFindByTagsKey(args?: InferRequestType<typeof client.pet.findByTags.$get>) {
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.pet)[':petId']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPetPetIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.pet)[':petId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.pet[':petId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /pet/{petId}
 */
export function getGetPetPetIdKey(args?: InferRequestType<(typeof client.pet)[':petId']['$get']>) {
  return ['/pet/:petId', ...(args ? [args] : [])] as const
}

/**
 * POST /pet/{petId}
 *
 * Updates a pet in the store with form data
 */
export function usePostPetPetId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.pet)[':petId']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.pet)[':petId']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.pet)[':petId']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.pet)[':petId']['$post']>
  >(
    'POST /pet/:petId',
    async (_, { arg }) => parseResponse(client.pet[':petId'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /pet/{petId}
 *
 * Deletes a pet
 *
 * delete a pet
 */
export function useDeletePetPetId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.pet)[':petId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.pet)[':petId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.pet)[':petId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.pet)[':petId']['$delete']>
  >(
    'DELETE /pet/:petId',
    async (_, { arg }) => parseResponse(client.pet[':petId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /pet/{petId}/uploadImage
 *
 * uploads an image
 */
export function usePostPetPetIdUploadImage(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>
  >(
    'POST /pet/:petId/uploadImage',
    async (_, { arg }) =>
      parseResponse(client.pet[':petId'].uploadImage.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /store/inventory
 *
 * Returns pet inventories by status
 *
 * Returns a map of status codes to quantities
 */
export function useGetStoreInventory(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.store.inventory.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetStoreInventoryKey() : null)
  const query = useSWR<InferResponseType<typeof client.store.inventory.$get>, Error>(
    swrKey,
    async () => parseResponse(client.store.inventory.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /store/inventory
 */
export function getGetStoreInventoryKey() {
  return ['/store/inventory'] as const
}

/**
 * POST /store/order
 *
 * Place an order for a pet
 *
 * Place a new order in the store
 */
export function usePostStoreOrder(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.store.order.$post>,
    Error,
    string,
    InferRequestType<typeof client.store.order.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.store.order.$post>,
    Error,
    string,
    InferRequestType<typeof client.store.order.$post>
  >(
    'POST /store/order',
    async (_, { arg }) => parseResponse(client.store.order.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.store.order)[':orderId']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetStoreOrderOrderIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.store.order)[':orderId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.store.order[':orderId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /store/order/{orderId}
 */
export function getGetStoreOrderOrderIdKey(
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
export function useDeleteStoreOrderOrderId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.store.order)[':orderId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.store.order)[':orderId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.store.order)[':orderId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.store.order)[':orderId']['$delete']>
  >(
    'DELETE /store/order/:orderId',
    async (_, { arg }) =>
      parseResponse(client.store.order[':orderId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /user
 *
 * Create user
 *
 * This can only be done by the logged in user.
 */
export function usePostUser(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.user.$post>,
    Error,
    string,
    InferRequestType<typeof client.user.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.user.$post>,
    Error,
    string,
    InferRequestType<typeof client.user.$post>
  >(
    'POST /user',
    async (_, { arg }) => parseResponse(client.user.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /user/createWithList
 *
 * Creates list of users with given input array
 *
 * Creates list of users with given input array
 */
export function usePostUserCreateWithList(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.user.createWithList.$post>,
    Error,
    string,
    InferRequestType<typeof client.user.createWithList.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.user.createWithList.$post>,
    Error,
    string,
    InferRequestType<typeof client.user.createWithList.$post>
  >(
    'POST /user/createWithList',
    async (_, { arg }) => parseResponse(client.user.createWithList.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<InferResponseType<typeof client.user.login.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUserLoginKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.user.login.$get>, Error>(
    swrKey,
    async () => parseResponse(client.user.login.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /user/login
 */
export function getGetUserLoginKey(args?: InferRequestType<typeof client.user.login.$get>) {
  return ['/user/login', ...(args ? [args] : [])] as const
}

/**
 * GET /user/logout
 *
 * Logs out current logged in user session
 */
export function useGetUserLogout(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.user.logout.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUserLogoutKey() : null)
  const query = useSWR<InferResponseType<typeof client.user.logout.$get>, Error>(
    swrKey,
    async () => parseResponse(client.user.logout.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /user/logout
 */
export function getGetUserLogoutKey() {
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.user)[':username']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUserUsernameKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.user)[':username']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.user[':username'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /user/{username}
 */
export function getGetUserUsernameKey(
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
export function usePutUserUsername(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.user)[':username']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.user)[':username']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.user)[':username']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.user)[':username']['$put']>
  >(
    'PUT /user/:username',
    async (_, { arg }) => parseResponse(client.user[':username'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /user/{username}
 *
 * Delete user
 *
 * This can only be done by the logged in user.
 */
export function useDeleteUserUsername(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.user)[':username']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.user)[':username']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.user)[':username']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.user)[':username']['$delete']>
  >(
    'DELETE /user/:username',
    async (_, { arg }) => parseResponse(client.user[':username'].$delete(arg, options?.client)),
    options?.swr,
  )
}
