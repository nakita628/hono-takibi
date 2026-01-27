import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
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
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.$put>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.pet.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutPetMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.pet.$put> }) =>
        parseResponse(client.pet.$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /pet
 * Uses $url() for type-safe key generation
 */
export function getPutPetMutationKey() {
  return `PUT ${client.pet.$url().pathname}`
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
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.pet.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostPetMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.pet.$post> }) =>
        parseResponse(client.pet.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /pet
 * Uses $url() for type-safe key generation
 */
export function getPostPetMutationKey() {
  return `POST ${client.pet.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetPetFindByStatusKey(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
) {
  return client.pet.findByStatus.$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetPetFindByTagsKey(args: InferRequestType<typeof client.pet.findByTags.$get>) {
  return client.pet.findByTags.$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetPetPetIdKey(args: InferRequestType<(typeof client.pet)[':petId']['$get']>) {
  return client.pet[':petId'].$url(args).pathname
}

/**
 * POST /pet/{petId}
 *
 * Updates a pet in the store with form data
 */
export function usePostPetPetId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.pet)[':petId']['$post']>>>>
    >,
    Error,
    Key,
    InferRequestType<(typeof client.pet)[':petId']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostPetPetIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client.pet)[':petId']['$post']> }) =>
        parseResponse(client.pet[':petId'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /pet/{petId}
 * Uses $url() for type-safe key generation
 */
export function getPostPetPetIdMutationKey() {
  return `POST ${client.pet[':petId'].$url().pathname}`
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
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.pet)[':petId']['$delete']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.pet)[':petId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeletePetPetIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.pet)[':petId']['$delete']> },
      ) => parseResponse(client.pet[':petId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /pet/{petId}
 * Uses $url() for type-safe key generation
 */
export function getDeletePetPetIdMutationKey() {
  return `DELETE ${client.pet[':petId'].$url().pathname}`
}

/**
 * POST /pet/{petId}/uploadImage
 *
 * uploads an image
 */
export function usePostPetPetIdUploadImage(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.pet)[':petId']['uploadImage']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostPetPetIdUploadImageMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']> },
      ) => parseResponse(client.pet[':petId'].uploadImage.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /pet/{petId}/uploadImage
 * Uses $url() for type-safe key generation
 */
export function getPostPetPetIdUploadImageMutationKey() {
  return `POST ${client.pet[':petId'].uploadImage.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetStoreInventoryKey() {
  return client.store.inventory.$url().pathname
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
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.store.order.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.store.order.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostStoreOrderMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.store.order.$post> }) =>
        parseResponse(client.store.order.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /store/order
 * Uses $url() for type-safe key generation
 */
export function getPostStoreOrderMutationKey() {
  return `POST ${client.store.order.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetStoreOrderOrderIdKey(
  args: InferRequestType<(typeof client.store.order)[':orderId']['$get']>,
) {
  return client.store.order[':orderId'].$url(args).pathname
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
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.store.order)[':orderId']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.store.order)[':orderId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteStoreOrderOrderIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.store.order)[':orderId']['$delete']> },
      ) => parseResponse(client.store.order[':orderId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /store/order/{orderId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteStoreOrderOrderIdMutationKey() {
  return `DELETE ${client.store.order[':orderId'].$url().pathname}`
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
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.user.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.user.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostUserMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.user.$post> }) =>
        parseResponse(client.user.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /user
 * Uses $url() for type-safe key generation
 */
export function getPostUserMutationKey() {
  return `POST ${client.user.$url().pathname}`
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
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.user.createWithList.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.user.createWithList.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostUserCreateWithListMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.user.createWithList.$post> }) =>
        parseResponse(client.user.createWithList.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /user/createWithList
 * Uses $url() for type-safe key generation
 */
export function getPostUserCreateWithListMutationKey() {
  return `POST ${client.user.createWithList.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetUserLoginKey(args: InferRequestType<typeof client.user.login.$get>) {
  return client.user.login.$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetUserLogoutKey() {
  return client.user.logout.$url().pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetUserUsernameKey(
  args: InferRequestType<(typeof client.user)[':username']['$get']>,
) {
  return client.user[':username'].$url(args).pathname
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
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.user)[':username']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.user)[':username']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutUserUsernameMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.user)[':username']['$put']> },
      ) => parseResponse(client.user[':username'].$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /user/{username}
 * Uses $url() for type-safe key generation
 */
export function getPutUserUsernameMutationKey() {
  return `PUT ${client.user[':username'].$url().pathname}`
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
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.user)[':username']['$delete']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.user)[':username']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteUserUsernameMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.user)[':username']['$delete']> },
      ) => parseResponse(client.user[':username'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /user/{username}
 * Uses $url() for type-safe key generation
 */
export function getDeleteUserUsernameMutationKey() {
  return `DELETE ${client.user[':username'].$url().pathname}`
}
