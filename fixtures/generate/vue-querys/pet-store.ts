import type { QueryFunctionContext, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { MaybeRef } from 'vue'
import { unref } from 'vue'
import { client } from '../clients/pet-store'

/**
 * Generates Vue Query mutation key for PUT /pet
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutPetMutationKey() {
  return ['pet', 'PUT', '/pet'] as const
}

/**
 * Returns Vue Query mutation options for PUT /pet
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutPetMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutPetMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.pet.$put>) =>
    parseResponse(client.pet.$put(args, clientOptions)),
})

/**
 * PUT /pet
 *
 * Update an existing pet
 *
 * Update an existing pet by Id
 */
export function usePutPet(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.$put>>>>>,
        Error,
        InferRequestType<typeof client.pet.$put>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPutPetMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /pet
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPetMutationKey() {
  return ['pet', 'POST', '/pet'] as const
}

/**
 * Returns Vue Query mutation options for POST /pet
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPetMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostPetMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.pet.$post>) =>
    parseResponse(client.pet.$post(args, clientOptions)),
})

/**
 * POST /pet
 *
 * Add a new pet to the store
 *
 * Add a new pet to the store
 */
export function usePostPet(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.$post>>>>>,
        Error,
        InferRequestType<typeof client.pet.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostPetMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /pet/findByStatus
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPetFindByStatusQueryKey(
  args: MaybeRef<InferRequestType<typeof client.pet.findByStatus.$get>>,
) {
  return ['pet', 'GET', '/pet/findByStatus', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /pet/findByStatus
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<typeof client.pet.findByStatus.$get>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /pet/findByTags
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPetFindByTagsQueryKey(
  args: MaybeRef<InferRequestType<typeof client.pet.findByTags.$get>>,
) {
  return ['pet', 'GET', '/pet/findByTags', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /pet/findByTags
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.pet.findByTags.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPetFindByTagsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /pet/{petId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPetPetIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.pet)[':petId']['$get']>>,
) {
  return ['pet', 'GET', '/pet/:petId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /pet/{petId}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.pet)[':petId']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetPetPetIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /pet/{petId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPetPetIdMutationKey() {
  return ['pet', 'POST', '/pet/:petId'] as const
}

/**
 * Returns Vue Query mutation options for POST /pet/{petId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPetPetIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostPetPetIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.pet)[':petId']['$post']>) =>
    parseResponse(client.pet[':petId'].$post(args, clientOptions)),
})

/**
 * POST /pet/{petId}
 *
 * Updates a pet in the store with form data
 */
export function usePostPetPetId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.pet)[':petId']['$post']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.pet)[':petId']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostPetPetIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /pet/{petId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeletePetPetIdMutationKey() {
  return ['pet', 'DELETE', '/pet/:petId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /pet/{petId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeletePetPetIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeletePetPetIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.pet)[':petId']['$delete']>) =>
    parseResponse(client.pet[':petId'].$delete(args, clientOptions)),
})

/**
 * DELETE /pet/{petId}
 *
 * Deletes a pet
 *
 * delete a pet
 */
export function useDeletePetPetId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.pet)[':petId']['$delete']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.pet)[':petId']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeletePetPetIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /pet/{petId}/uploadImage
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPetPetIdUploadImageMutationKey() {
  return ['pet', 'POST', '/pet/:petId/uploadImage'] as const
}

/**
 * Returns Vue Query mutation options for POST /pet/{petId}/uploadImage
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPetPetIdUploadImageMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostPetPetIdUploadImageMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>,
  ) => parseResponse(client.pet[':petId'].uploadImage.$post(args, clientOptions)),
})

/**
 * POST /pet/{petId}/uploadImage
 *
 * uploads an image
 */
export function usePostPetPetIdUploadImage(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.pet)[':petId']['uploadImage']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.pet)[':petId']['uploadImage']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostPetPetIdUploadImageMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /store/inventory
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetStoreInventoryQueryKey() {
  return ['store', 'GET', '/store/inventory'] as const
}

/**
 * Returns Vue Query query options for GET /store/inventory
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.store.inventory.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetStoreInventoryQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /store/order
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostStoreOrderMutationKey() {
  return ['store', 'POST', '/store/order'] as const
}

/**
 * Returns Vue Query mutation options for POST /store/order
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostStoreOrderMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostStoreOrderMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.store.order.$post>) =>
    parseResponse(client.store.order.$post(args, clientOptions)),
})

/**
 * POST /store/order
 *
 * Place an order for a pet
 *
 * Place a new order in the store
 */
export function usePostStoreOrder(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.store.order.$post>>>>
        >,
        Error,
        InferRequestType<typeof client.store.order.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostStoreOrderMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /store/order/{orderId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetStoreOrderOrderIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.store.order)[':orderId']['$get']>>,
) {
  return ['store', 'GET', '/store/order/:orderId', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /store/order/{orderId}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.store.order)[':orderId']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /store/order/{orderId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteStoreOrderOrderIdMutationKey() {
  return ['store', 'DELETE', '/store/order/:orderId'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /store/order/{orderId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteStoreOrderOrderIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteStoreOrderOrderIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.store.order)[':orderId']['$delete']>) =>
    parseResponse(client.store.order[':orderId'].$delete(args, clientOptions)),
})

/**
 * DELETE /store/order/{orderId}
 *
 * Delete purchase order by ID
 *
 * For valid response try integer IDs with value < 1000. Anything above 1000 or nonintegers will generate API errors
 */
export function useDeleteStoreOrderOrderId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.store.order)[':orderId']['$delete']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.store.order)[':orderId']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteStoreOrderOrderIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /user
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUserMutationKey() {
  return ['user', 'POST', '/user'] as const
}

/**
 * Returns Vue Query mutation options for POST /user
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostUserMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostUserMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.user.$post>) =>
    parseResponse(client.user.$post(args, clientOptions)),
})

/**
 * POST /user
 *
 * Create user
 *
 * This can only be done by the logged in user.
 */
export function usePostUser(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.user.$post>>>>>,
        Error,
        InferRequestType<typeof client.user.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostUserMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /user/createWithList
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUserCreateWithListMutationKey() {
  return ['user', 'POST', '/user/createWithList'] as const
}

/**
 * Returns Vue Query mutation options for POST /user/createWithList
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostUserCreateWithListMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostUserCreateWithListMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.user.createWithList.$post>) =>
    parseResponse(client.user.createWithList.$post(args, clientOptions)),
})

/**
 * POST /user/createWithList
 *
 * Creates list of users with given input array
 *
 * Creates list of users with given input array
 */
export function usePostUserCreateWithList(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.user.createWithList.$post>>>
          >
        >,
        Error,
        InferRequestType<typeof client.user.createWithList.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostUserCreateWithListMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /user/login
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUserLoginQueryKey(
  args: MaybeRef<InferRequestType<typeof client.user.login.$get>>,
) {
  return ['user', 'GET', '/user/login', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /user/login
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.user.login.$get>>>>
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUserLoginQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /user/logout
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetUserLogoutQueryKey() {
  return ['user', 'GET', '/user/logout'] as const
}

/**
 * Returns Vue Query query options for GET /user/logout
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.user.logout.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUserLogoutQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /user/{username}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUserUsernameQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.user)[':username']['$get']>>,
) {
  return ['user', 'GET', '/user/:username', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /user/{username}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.user)[':username']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUserUsernameQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PUT /user/{username}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutUserUsernameMutationKey() {
  return ['user', 'PUT', '/user/:username'] as const
}

/**
 * Returns Vue Query mutation options for PUT /user/{username}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutUserUsernameMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutUserUsernameMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.user)[':username']['$put']>) =>
    parseResponse(client.user[':username'].$put(args, clientOptions)),
})

/**
 * PUT /user/{username}
 *
 * Update user
 *
 * This can only be done by the logged in user.
 */
export function usePutUserUsername(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.user)[':username']['$put']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.user)[':username']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutUserUsernameMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /user/{username}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteUserUsernameMutationKey() {
  return ['user', 'DELETE', '/user/:username'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /user/{username}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteUserUsernameMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteUserUsernameMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.user)[':username']['$delete']>) =>
    parseResponse(client.user[':username'].$delete(args, clientOptions)),
})

/**
 * DELETE /user/{username}
 *
 * Delete user
 *
 * This can only be done by the logged in user.
 */
export function useDeleteUserUsername(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.user)[':username']['$delete']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.user)[':username']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteUserUsernameMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
