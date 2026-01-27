import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
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
export function createPutPet(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.$put>>>>>,
    Error,
    InferRequestType<typeof client.pet.$put>
  >
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
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.$post>>>>>,
    Error,
    InferRequestType<typeof client.pet.$post>
  >
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.findByStatus.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPetFindByStatusQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /pet/findByStatus
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetPetFindByStatusQueryKey(
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
) {
  const u = client.pet.findByStatus.$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /pet/findByStatus
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPetFindByStatusQueryOptions = (
  args: InferRequestType<typeof client.pet.findByStatus.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPetFindByStatusQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.findByTags.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPetFindByTagsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /pet/findByTags
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetPetFindByTagsQueryKey(
  args: InferRequestType<typeof client.pet.findByTags.$get>,
) {
  const u = client.pet.findByTags.$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /pet/findByTags
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPetFindByTagsQueryOptions = (
  args: InferRequestType<typeof client.pet.findByTags.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPetFindByTagsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.pet)[':petId']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPetPetIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /pet/{petId}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetPetPetIdQueryKey(
  args: InferRequestType<(typeof client.pet)[':petId']['$get']>,
) {
  const u = client.pet[':petId'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /pet/{petId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPetPetIdQueryOptions = (
  args: InferRequestType<(typeof client.pet)[':petId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPetPetIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.pet)[':petId']['$post']>>>>
    >,
    Error,
    InferRequestType<(typeof client.pet)[':petId']['$post']>
  >
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
  mutation?: CreateMutationOptions<
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
  mutation?: CreateMutationOptions<
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
export function createGetStoreInventory(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.store.inventory.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetStoreInventoryQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /store/inventory
 * Uses $url() for type-safe key generation
 */
export function getGetStoreInventoryQueryKey() {
  return [client.store.inventory.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /store/inventory
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStoreInventoryQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetStoreInventoryQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.store.order.$post>>>>>,
    Error,
    InferRequestType<typeof client.store.order.$post>
  >
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
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetStoreOrderOrderIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /store/order/{orderId}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetStoreOrderOrderIdQueryKey(
  args: InferRequestType<(typeof client.store.order)[':orderId']['$get']>,
) {
  const u = client.store.order[':orderId'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /store/order/{orderId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStoreOrderOrderIdQueryOptions = (
  args: InferRequestType<(typeof client.store.order)[':orderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetStoreOrderOrderIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
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
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.user.$post>>>>>,
    Error,
    InferRequestType<typeof client.user.$post>
  >
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
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.user.createWithList.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.user.createWithList.$post>
  >
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.user.login.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetUserLoginQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /user/login
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetUserLoginQueryKey(args: InferRequestType<typeof client.user.login.$get>) {
  const u = client.user.login.$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /user/login
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUserLoginQueryOptions = (
  args: InferRequestType<typeof client.user.login.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUserLoginQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.user.login.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /user/logout
 *
 * Logs out current logged in user session
 */
export function createGetUserLogout(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.user.logout.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetUserLogoutQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /user/logout
 * Uses $url() for type-safe key generation
 */
export function getGetUserLogoutQueryKey() {
  return [client.user.logout.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /user/logout
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUserLogoutQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetUserLogoutQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  options?: () => {
    query?: CreateQueryOptions<
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
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetUserUsernameQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /user/{username}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetUserUsernameQueryKey(
  args: InferRequestType<(typeof client.user)[':username']['$get']>,
) {
  const u = client.user[':username'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /user/{username}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUserUsernameQueryOptions = (
  args: InferRequestType<(typeof client.user)[':username']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUserUsernameQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
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
  mutation?: CreateMutationOptions<
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
  mutation?: CreateMutationOptions<
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
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.user)[':username']['$delete']>) =>
      parseResponse(client.user[':username'].$delete(args, clientOptions)),
  }))
}
