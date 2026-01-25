import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.pet.$put>,
    Error,
    string,
    InferRequestType<typeof client.pet.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /pet',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.pet.$put> }) =>
      parseResponse(client.pet.$put(arg, options?.client)),
    mutationOptions,
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.pet.$post>,
    Error,
    string,
    InferRequestType<typeof client.pet.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /pet',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.pet.$post> }) =>
      parseResponse(client.pet.$post(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPetFindByStatusKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.pet.findByStatus.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPetFindByTagsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.pet.findByTags.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetPetPetIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.pet[':petId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.pet)[':petId']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.pet)[':petId']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /pet/:petId',
    async (_: string, { arg }: { arg: InferRequestType<(typeof client.pet)[':petId']['$post']> }) =>
      parseResponse(client.pet[':petId'].$post(arg, options?.client)),
    mutationOptions,
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.pet)[':petId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.pet)[':petId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /pet/:petId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.pet)[':petId']['$delete']> },
    ) => parseResponse(client.pet[':petId'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /pet/{petId}/uploadImage
 *
 * uploads an image
 */
export function usePostPetPetIdUploadImage(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /pet/:petId/uploadImage',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']> },
    ) => parseResponse(client.pet[':petId'].uploadImage.$post(arg, options?.client)),
    mutationOptions,
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetStoreInventoryKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.store.inventory.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.store.order.$post>,
    Error,
    string,
    InferRequestType<typeof client.store.order.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /store/order',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.store.order.$post> }) =>
      parseResponse(client.store.order.$post(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetStoreOrderOrderIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.store.order[':orderId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.store.order)[':orderId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.store.order)[':orderId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /store/order/:orderId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.store.order)[':orderId']['$delete']> },
    ) => parseResponse(client.store.order[':orderId'].$delete(arg, options?.client)),
    mutationOptions,
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.user.$post>,
    Error,
    string,
    InferRequestType<typeof client.user.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /user',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.user.$post> }) =>
      parseResponse(client.user.$post(arg, options?.client)),
    mutationOptions,
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.user.createWithList.$post>,
    Error,
    string,
    InferRequestType<typeof client.user.createWithList.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /user/createWithList',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.user.createWithList.$post> },
    ) => parseResponse(client.user.createWithList.$post(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUserLoginKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.user.login.$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUserLogoutKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.user.logout.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUserUsernameKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.user[':username'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.user)[':username']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.user)[':username']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /user/:username',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.user)[':username']['$put']> },
    ) => parseResponse(client.user[':username'].$put(arg, options?.client)),
    mutationOptions,
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
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.user)[':username']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.user)[':username']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /user/:username',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.user)[':username']['$delete']> },
    ) => parseResponse(client.user[':username'].$delete(arg, options?.client)),
    mutationOptions,
  )
}
