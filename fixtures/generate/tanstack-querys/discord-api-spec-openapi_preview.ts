import { useQuery, useMutation } from '@tanstack/react-query'
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discord-api-spec-openapi_preview'

/**
 * GET /applications/@me
 */
export function useGetApplicationsMe(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.applications)['@me']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetApplicationsMeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /applications/@me
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsMeQueryKey() {
  return [client.applications['@me'].$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /applications/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsMeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetApplicationsMeQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.applications['@me'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PATCH /applications/@me
 */
export function usePatchApplicationsMe(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.applications)['@me']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.applications)['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.applications)['@me']['$patch']>) =>
      parseResponse(client.applications['@me'].$patch(args, clientOptions)),
  })
}

/**
 * GET /applications/{application_id}
 */
export function useGetApplicationsApplicationId(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.applications)[':application_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetApplicationsApplicationIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
) {
  return [client.applications[':application_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdQueryOptions = (
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.applications[':application_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PATCH /applications/{application_id}
 */
export function usePatchApplicationsApplicationId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.applications)[':application_id']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['$patch']>,
    ) => parseResponse(client.applications[':application_id'].$patch(args, clientOptions)),
  })
}

/**
 * GET /applications/{application_id}/activity-instances/{instance_id}
 */
export function useGetApplicationsApplicationIdActivityInstancesInstanceId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/activity-instances/{instance_id}
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
) {
  return [
    client.applications[':application_id']['activity-instances'][':instance_id'].$url(args)
      .pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/activity-instances/{instance_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.applications[':application_id']['activity-instances'][':instance_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /applications/{application_id}/attachment
 */
export function usePostApplicationsApplicationIdAttachment(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client.applications)[':application_id']['attachment']['$post']>
          >
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['attachment']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['attachment']['$post']
      >,
    ) =>
      parseResponse(client.applications[':application_id'].attachment.$post(args, clientOptions)),
  })
}

/**
 * GET /applications/{application_id}/commands
 */
export function useGetApplicationsApplicationIdCommands(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.applications)[':application_id']['commands']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetApplicationsApplicationIdCommandsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/commands
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdCommandsQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
) {
  return [client.applications[':application_id'].commands.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/commands
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdCommandsQueryOptions = (
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdCommandsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.applications[':application_id'].commands.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PUT /applications/{application_id}/commands
 */
export function usePutApplicationsApplicationIdCommands(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.applications)[':application_id']['commands']['$put']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>,
    ) => parseResponse(client.applications[':application_id'].commands.$put(args, clientOptions)),
  })
}

/**
 * POST /applications/{application_id}/commands
 */
export function usePostApplicationsApplicationIdCommands(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.applications)[':application_id']['commands']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>,
    ) => parseResponse(client.applications[':application_id'].commands.$post(args, clientOptions)),
  })
}

/**
 * GET /applications/{application_id}/commands/{command_id}
 */
export function useGetApplicationsApplicationIdCommandsCommandId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetApplicationsApplicationIdCommandsCommandIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/commands/{command_id}
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdCommandsCommandIdQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
) {
  return [
    client.applications[':application_id'].commands[':command_id'].$url(args).pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/commands/{command_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdCommandsCommandIdQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdCommandsCommandIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.applications[':application_id'].commands[':command_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /applications/{application_id}/commands/{command_id}
 */
export function useDeleteApplicationsApplicationIdCommandsCommandId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * PATCH /applications/{application_id}/commands/{command_id}
 */
export function usePatchApplicationsApplicationIdCommandsCommandId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$patch(args, clientOptions),
      ),
  })
}

/**
 * GET /applications/{application_id}/emojis
 */
export function useGetApplicationsApplicationIdEmojis(
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.applications)[':application_id']['emojis']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetApplicationsApplicationIdEmojisQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/emojis
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdEmojisQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
) {
  return [client.applications[':application_id'].emojis.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/emojis
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdEmojisQueryOptions = (
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdEmojisQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.applications[':application_id'].emojis.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /applications/{application_id}/emojis
 */
export function usePostApplicationsApplicationIdEmojis(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.applications)[':application_id']['emojis']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>,
    ) => parseResponse(client.applications[':application_id'].emojis.$post(args, clientOptions)),
  })
}

/**
 * GET /applications/{application_id}/emojis/{emoji_id}
 */
export function useGetApplicationsApplicationIdEmojisEmojiId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetApplicationsApplicationIdEmojisEmojiIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/emojis/{emoji_id}
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdEmojisEmojiIdQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
) {
  return [client.applications[':application_id'].emojis[':emoji_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/emojis/{emoji_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdEmojisEmojiIdQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdEmojisEmojiIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.applications[':application_id'].emojis[':emoji_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /applications/{application_id}/emojis/{emoji_id}
 */
export function useDeleteApplicationsApplicationIdEmojisEmojiId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * PATCH /applications/{application_id}/emojis/{emoji_id}
 */
export function usePatchApplicationsApplicationIdEmojisEmojiId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$patch(args, clientOptions),
      ),
  })
}

/**
 * GET /applications/{application_id}/entitlements
 */
export function useGetApplicationsApplicationIdEntitlements(
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.applications)[':application_id']['entitlements']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetApplicationsApplicationIdEntitlementsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/entitlements
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdEntitlementsQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
) {
  return [client.applications[':application_id'].entitlements.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/entitlements
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdEntitlementsQueryOptions = (
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdEntitlementsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.applications[':application_id'].entitlements.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /applications/{application_id}/entitlements
 */
export function usePostApplicationsApplicationIdEntitlements(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client.applications)[':application_id']['entitlements']['$post']>
          >
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements']['$post']
      >,
    ) =>
      parseResponse(client.applications[':application_id'].entitlements.$post(args, clientOptions)),
  })
}

/**
 * GET /applications/{application_id}/entitlements/{entitlement_id}
 */
export function useGetApplicationsApplicationIdEntitlementsEntitlementId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/entitlements/{entitlement_id}
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
) {
  return [
    client.applications[':application_id'].entitlements[':entitlement_id'].$url(args).pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/entitlements/{entitlement_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.applications[':application_id'].entitlements[':entitlement_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /applications/{application_id}/entitlements/{entitlement_id}
 */
export function useDeleteApplicationsApplicationIdEntitlementsEntitlementId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].entitlements[':entitlement_id'].$delete(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * POST /applications/{application_id}/entitlements/{entitlement_id}/consume
 */
export function usePostApplicationsApplicationIdEntitlementsEntitlementIdConsume(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].entitlements[':entitlement_id'].consume.$post(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands
 */
export function useGetApplicationsApplicationIdGuildsGuildIdCommands(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
) {
  return [
    client.applications[':application_id'].guilds[':guild_id'].commands.$url(args).pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.applications[':application_id'].guilds[':guild_id'].commands.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands
 */
export function usePutApplicationsApplicationIdGuildsGuildIdCommands(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.$put(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * POST /applications/{application_id}/guilds/{guild_id}/commands
 */
export function usePostApplicationsApplicationIdGuildsGuildIdCommands(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.$post(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 */
export function useGetApplicationsApplicationIdGuildsGuildIdCommandsPermissions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryOptions(
      args,
      clientOptions,
    ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
) {
  return [
    client.applications[':application_id'].guilds[':guild_id'].commands.permissions.$url(args)
      .pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.applications[':application_id'].guilds[':guild_id'].commands.permissions.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function useGetApplicationsApplicationIdGuildsGuildIdCommandsCommandId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryOptions(
      args,
      clientOptions,
    ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
) {
  return [
    client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$url(args)
      .pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$get(
        args,
        { ...clientOptions, init: { ...clientOptions?.init, signal } },
      ),
    ),
})

/**
 * DELETE /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function useDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$delete(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * PATCH /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function usePatchApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$patch(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 */
export function useGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryOptions(
      args,
      clientOptions,
    ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
  >,
) {
  return [
    client.applications[':application_id'].guilds[':guild_id'].commands[
      ':command_id'
    ].permissions.$url(args).pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryOptions =
  (
    args: InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(args),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[
          ':command_id'
        ].permissions.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 */
export function usePutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[
          ':command_id'
        ].permissions.$put(args, clientOptions),
      ),
  })
}

/**
 * GET /applications/{application_id}/role-connections/metadata
 */
export function useGetApplicationsApplicationIdRoleConnectionsMetadata(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetApplicationsApplicationIdRoleConnectionsMetadataQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/role-connections/metadata
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdRoleConnectionsMetadataQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
) {
  return [
    client.applications[':application_id']['role-connections'].metadata.$url(args).pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/role-connections/metadata
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdRoleConnectionsMetadataQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdRoleConnectionsMetadataQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.applications[':application_id']['role-connections'].metadata.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PUT /applications/{application_id}/role-connections/metadata
 */
export function usePutApplicationsApplicationIdRoleConnectionsMetadata(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id']['role-connections'].metadata.$put(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * GET /channels/{channel_id}
 */
export function useGetChannelsChannelId(
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.channels)[':channel_id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetChannelsChannelIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
) {
  return [client.channels[':channel_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.channels[':channel_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /channels/{channel_id}
 */
export function useDeleteChannelsChannelId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.channels)[':channel_id']['$delete']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['$delete']>,
    ) => parseResponse(client.channels[':channel_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /channels/{channel_id}
 */
export function usePatchChannelsChannelId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.channels)[':channel_id']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.channels)[':channel_id']['$patch']>) =>
      parseResponse(client.channels[':channel_id'].$patch(args, clientOptions)),
  })
}

/**
 * POST /channels/{channel_id}/followers
 */
export function usePostChannelsChannelIdFollowers(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.channels)[':channel_id']['followers']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].followers.$post(args, clientOptions)),
  })
}

/**
 * GET /channels/{channel_id}/invites
 */
export function useGetChannelsChannelIdInvites(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['invites']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetChannelsChannelIdInvitesQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/invites
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdInvitesQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
) {
  return [client.channels[':channel_id'].invites.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/invites
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdInvitesQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdInvitesQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.channels[':channel_id'].invites.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /channels/{channel_id}/invites
 */
export function usePostChannelsChannelIdInvites(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['invites']['$post']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].invites.$post(args, clientOptions)),
  })
}

/**
 * GET /channels/{channel_id}/messages
 */
export function useGetChannelsChannelIdMessages(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['messages']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetChannelsChannelIdMessagesQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdMessagesQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
) {
  return [client.channels[':channel_id'].messages.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/messages
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdMessagesQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdMessagesQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.channels[':channel_id'].messages.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /channels/{channel_id}/messages
 */
export function usePostChannelsChannelIdMessages(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.channels)[':channel_id']['messages']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].messages.$post(args, clientOptions)),
  })
}

/**
 * POST /channels/{channel_id}/messages/bulk-delete
 */
export function usePostChannelsChannelIdMessagesBulkDelete(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages['bulk-delete'].$post(args, clientOptions),
      ),
  })
}

/**
 * GET /channels/{channel_id}/messages/pins
 */
export function useGetChannelsChannelIdMessagesPins(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetChannelsChannelIdMessagesPinsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages/pins
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdMessagesPinsQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
) {
  return [client.channels[':channel_id'].messages.pins.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/messages/pins
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdMessagesPinsQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdMessagesPinsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.channels[':channel_id'].messages.pins.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PUT /channels/{channel_id}/messages/pins/{message_id}
 */
export function usePutChannelsChannelIdMessagesPinsMessageId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages.pins[':message_id'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/messages/pins/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesPinsMessageId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages.pins[':message_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * GET /channels/{channel_id}/messages/{message_id}
 */
export function useGetChannelsChannelIdMessagesMessageId(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetChannelsChannelIdMessagesMessageIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages/{message_id}
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdMessagesMessageIdQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
) {
  return [client.channels[':channel_id'].messages[':message_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/messages/{message_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdMessagesMessageIdQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdMessagesMessageIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.channels[':channel_id'].messages[':message_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /channels/{channel_id}/messages/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesMessageId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * PATCH /channels/{channel_id}/messages/{message_id}
 */
export function usePatchChannelsChannelIdMessagesMessageId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']>
          >
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$patch(args, clientOptions),
      ),
  })
}

/**
 * POST /channels/{channel_id}/messages/{message_id}/crosspost
 */
export function usePostChannelsChannelIdMessagesMessageIdCrosspost(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].crosspost.$post(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactions(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions.$delete(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 */
export function useGetChannelsChannelIdMessagesMessageIdReactionsEmojiName(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
) {
  return [
    client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$url(args)
      .pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiName(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$delete(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * PUT /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function usePutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name']['@me'].$put(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'][
          '@me'
        ].$delete(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'][
          ':user_id'
        ].$delete(args, clientOptions),
      ),
  })
}

/**
 * POST /channels/{channel_id}/messages/{message_id}/threads
 */
export function usePostChannelsChannelIdMessagesMessageIdThreads(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].threads.$post(args, clientOptions),
      ),
  })
}

/**
 * PUT /channels/{channel_id}/permissions/{overwrite_id}
 */
export function usePutChannelsChannelIdPermissionsOverwriteId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].permissions[':overwrite_id'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/permissions/{overwrite_id}
 */
export function useDeleteChannelsChannelIdPermissionsOverwriteId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].permissions[':overwrite_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * GET /channels/{channel_id}/pins
 */
export function useGetChannelsChannelIdPins(
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['pins']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetChannelsChannelIdPinsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/pins
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdPinsQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
) {
  return [client.channels[':channel_id'].pins.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/pins
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdPinsQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdPinsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.channels[':channel_id'].pins.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PUT /channels/{channel_id}/pins/{message_id}
 */
export function usePutChannelsChannelIdPinsMessageId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['pins'][':message_id']['$put']
      >,
    ) =>
      parseResponse(client.channels[':channel_id'].pins[':message_id'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /channels/{channel_id}/pins/{message_id}
 */
export function useDeleteChannelsChannelIdPinsMessageId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].pins[':message_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 */
export function useGetChannelsChannelIdPollsMessageIdAnswersAnswerId(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
) {
  return [
    client.channels[':channel_id'].polls[':message_id'].answers[':answer_id'].$url(args).pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.channels[':channel_id'].polls[':message_id'].answers[':answer_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /channels/{channel_id}/polls/{message_id}/expire
 */
export function usePostChannelsChannelIdPollsMessageIdExpire(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].polls[':message_id'].expire.$post(args, clientOptions),
      ),
  })
}

/**
 * PUT /channels/{channel_id}/recipients/{user_id}
 */
export function usePutChannelsChannelIdRecipientsUserId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].recipients[':user_id'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/recipients/{user_id}
 */
export function useDeleteChannelsChannelIdRecipientsUserId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].recipients[':user_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * POST /channels/{channel_id}/send-soundboard-sound
 */
export function usePostChannelsChannelIdSendSoundboardSound(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id']['send-soundboard-sound'].$post(args, clientOptions),
      ),
  })
}

/**
 * GET /channels/{channel_id}/thread-members
 */
export function useGetChannelsChannelIdThreadMembers(
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['thread-members']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetChannelsChannelIdThreadMembersQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/thread-members
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdThreadMembersQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
) {
  return [client.channels[':channel_id']['thread-members'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/thread-members
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdThreadMembersQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdThreadMembersQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.channels[':channel_id']['thread-members'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PUT /channels/{channel_id}/thread-members/@me
 */
export function usePutChannelsChannelIdThreadMembersMe(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members']['@me']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members']['@me'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/thread-members/@me
 */
export function useDeleteChannelsChannelIdThreadMembersMe(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members']['@me'].$delete(args, clientOptions),
      ),
  })
}

/**
 * GET /channels/{channel_id}/thread-members/{user_id}
 */
export function useGetChannelsChannelIdThreadMembersUserId(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetChannelsChannelIdThreadMembersUserIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/thread-members/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdThreadMembersUserIdQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
) {
  return [client.channels[':channel_id']['thread-members'][':user_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/thread-members/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdThreadMembersUserIdQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdThreadMembersUserIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.channels[':channel_id']['thread-members'][':user_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PUT /channels/{channel_id}/thread-members/{user_id}
 */
export function usePutChannelsChannelIdThreadMembersUserId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/thread-members/{user_id}
 */
export function useDeleteChannelsChannelIdThreadMembersUserId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * POST /channels/{channel_id}/threads
 */
export function usePostChannelsChannelIdThreads(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.channels)[':channel_id']['threads']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].threads.$post(args, clientOptions)),
  })
}

/**
 * GET /channels/{channel_id}/threads/archived/private
 */
export function useGetChannelsChannelIdThreadsArchivedPrivate(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetChannelsChannelIdThreadsArchivedPrivateQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/threads/archived/private
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdThreadsArchivedPrivateQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
) {
  return [client.channels[':channel_id'].threads.archived.private.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/threads/archived/private
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdThreadsArchivedPrivateQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdThreadsArchivedPrivateQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.channels[':channel_id'].threads.archived.private.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/threads/archived/public
 */
export function useGetChannelsChannelIdThreadsArchivedPublic(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetChannelsChannelIdThreadsArchivedPublicQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/threads/archived/public
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdThreadsArchivedPublicQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
) {
  return [client.channels[':channel_id'].threads.archived.public.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/threads/archived/public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdThreadsArchivedPublicQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdThreadsArchivedPublicQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.channels[':channel_id'].threads.archived.public.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/threads/search
 */
export function useGetChannelsChannelIdThreadsSearch(
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetChannelsChannelIdThreadsSearchQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/threads/search
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdThreadsSearchQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
) {
  return [client.channels[':channel_id'].threads.search.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/threads/search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdThreadsSearchQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdThreadsSearchQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.channels[':channel_id'].threads.search.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /channels/{channel_id}/typing
 */
export function usePostChannelsChannelIdTyping(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['typing']['$post']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].typing.$post(args, clientOptions)),
  })
}

/**
 * GET /channels/{channel_id}/users/@me/threads/archived/private
 */
export function useGetChannelsChannelIdUsersMeThreadsArchivedPrivate(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/users/@me/threads/archived/private
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
) {
  return [
    client.channels[':channel_id'].users['@me'].threads.archived.private.$url(args).pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/users/@me/threads/archived/private
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.channels[':channel_id'].users['@me'].threads.archived.private.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/webhooks
 */
export function useGetChannelsChannelIdWebhooks(
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['webhooks']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetChannelsChannelIdWebhooksQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/webhooks
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdWebhooksQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
) {
  return [client.channels[':channel_id'].webhooks.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/webhooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdWebhooksQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdWebhooksQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.channels[':channel_id'].webhooks.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /channels/{channel_id}/webhooks
 */
export function usePostChannelsChannelIdWebhooks(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.channels)[':channel_id']['webhooks']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].webhooks.$post(args, clientOptions)),
  })
}

/**
 * GET /gateway
 */
export function useGetGateway(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.gateway.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetGatewayQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /gateway
 * Uses $url() for type-safe key generation
 */
export function getGetGatewayQueryKey() {
  return [client.gateway.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /gateway
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGatewayQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetGatewayQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.gateway.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /gateway/bot
 */
export function useGetGatewayBot(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.gateway.bot.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetGatewayBotQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /gateway/bot
 * Uses $url() for type-safe key generation
 */
export function getGetGatewayBotQueryKey() {
  return [client.gateway.bot.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /gateway/bot
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGatewayBotQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetGatewayBotQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.gateway.bot.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/templates/{code}
 */
export function useGetGuildsTemplatesCode(
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds.templates)[':code']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsTemplatesCodeQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/templates/{code}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsTemplatesCodeQueryKey(
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
) {
  return [client.guilds.templates[':code'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/templates/{code}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsTemplatesCodeQueryOptions = (
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsTemplatesCodeQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds.templates[':code'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}
 */
export function useGetGuildsGuildId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.guilds)[':guild_id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetGuildsGuildIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
) {
  return [client.guilds[':guild_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PATCH /guilds/{guild_id}
 */
export function usePatchGuildsGuildId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.guilds)[':guild_id']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>) =>
      parseResponse(client.guilds[':guild_id'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/audit-logs
 */
export function useGetGuildsGuildIdAuditLogs(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdAuditLogsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/audit-logs
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdAuditLogsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
) {
  return [client.guilds[':guild_id']['audit-logs'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/audit-logs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdAuditLogsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdAuditLogsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id']['audit-logs'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/auto-moderation/rules
 */
export function useGetGuildsGuildIdAutoModerationRules(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdAutoModerationRulesQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/auto-moderation/rules
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdAutoModerationRulesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
) {
  return [client.guilds[':guild_id']['auto-moderation'].rules.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/auto-moderation/rules
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdAutoModerationRulesQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdAutoModerationRulesQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id']['auto-moderation'].rules.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /guilds/{guild_id}/auto-moderation/rules
 */
export function usePostGuildsGuildIdAutoModerationRules(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>
          >
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']
      >,
    ) =>
      parseResponse(client.guilds[':guild_id']['auto-moderation'].rules.$post(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function useGetGuildsGuildIdAutoModerationRulesRuleId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdAutoModerationRulesRuleIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdAutoModerationRulesRuleIdQueryKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
) {
  return [
    client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$url(args).pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdAutoModerationRulesRuleIdQueryOptions = (
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdAutoModerationRulesRuleIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function useDeleteGuildsGuildIdAutoModerationRulesRuleId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$delete(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * PATCH /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function usePatchGuildsGuildIdAutoModerationRulesRuleId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$patch(args, clientOptions),
      ),
  })
}

/**
 * GET /guilds/{guild_id}/bans
 */
export function useGetGuildsGuildIdBans(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bans']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetGuildsGuildIdBansQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/bans
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdBansQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
) {
  return [client.guilds[':guild_id'].bans.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/bans
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdBansQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdBansQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].bans.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/bans/{user_id}
 */
export function useGetGuildsGuildIdBansUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdBansUserIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/bans/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdBansUserIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
) {
  return [client.guilds[':guild_id'].bans[':user_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/bans/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdBansUserIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdBansUserIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].bans[':user_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PUT /guilds/{guild_id}/bans/{user_id}
 */
export function usePutGuildsGuildIdBansUserId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].bans[':user_id'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /guilds/{guild_id}/bans/{user_id}
 */
export function useDeleteGuildsGuildIdBansUserId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].bans[':user_id'].$delete(args, clientOptions)),
  })
}

/**
 * POST /guilds/{guild_id}/bulk-ban
 */
export function usePostGuildsGuildIdBulkBan(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>,
    ) => parseResponse(client.guilds[':guild_id']['bulk-ban'].$post(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/channels
 */
export function useGetGuildsGuildIdChannels(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['channels']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdChannelsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/channels
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdChannelsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
) {
  return [client.guilds[':guild_id'].channels.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/channels
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdChannelsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdChannelsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].channels.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /guilds/{guild_id}/channels
 */
export function usePostGuildsGuildIdChannels(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['channels']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].channels.$post(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/channels
 */
export function usePatchGuildsGuildIdChannels(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['channels']['$patch']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].channels.$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/emojis
 */
export function useGetGuildsGuildIdEmojis(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['emojis']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdEmojisQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/emojis
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdEmojisQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
) {
  return [client.guilds[':guild_id'].emojis.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/emojis
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdEmojisQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdEmojisQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].emojis.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /guilds/{guild_id}/emojis
 */
export function usePostGuildsGuildIdEmojis(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['emojis']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].emojis.$post(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useGetGuildsGuildIdEmojisEmojiId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdEmojisEmojiIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/emojis/{emoji_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdEmojisEmojiIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
) {
  return [client.guilds[':guild_id'].emojis[':emoji_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/emojis/{emoji_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdEmojisEmojiIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdEmojisEmojiIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].emojis[':emoji_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useDeleteGuildsGuildIdEmojisEmojiId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/emojis/{emoji_id}
 */
export function usePatchGuildsGuildIdEmojisEmojiId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/integrations
 */
export function useGetGuildsGuildIdIntegrations(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['integrations']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdIntegrationsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/integrations
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdIntegrationsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
) {
  return [client.guilds[':guild_id'].integrations.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/integrations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdIntegrationsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdIntegrationsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].integrations.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /guilds/{guild_id}/integrations/{integration_id}
 */
export function useDeleteGuildsGuildIdIntegrationsIntegrationId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id'].integrations[':integration_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * GET /guilds/{guild_id}/invites
 */
export function useGetGuildsGuildIdInvites(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['invites']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdInvitesQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/invites
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdInvitesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
) {
  return [client.guilds[':guild_id'].invites.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/invites
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdInvitesQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdInvitesQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].invites.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/members
 */
export function useGetGuildsGuildIdMembers(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['members']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdMembersQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/members
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdMembersQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
) {
  return [client.guilds[':guild_id'].members.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/members
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdMembersQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdMembersQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].members.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PATCH /guilds/{guild_id}/members/@me
 */
export function usePatchGuildsGuildIdMembersMe(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].members['@me'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/members/search
 */
export function useGetGuildsGuildIdMembersSearch(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdMembersSearchQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/members/search
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdMembersSearchQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
) {
  return [client.guilds[':guild_id'].members.search.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/members/search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdMembersSearchQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdMembersSearchQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].members.search.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/members/{user_id}
 */
export function useGetGuildsGuildIdMembersUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdMembersUserIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/members/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdMembersUserIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
) {
  return [client.guilds[':guild_id'].members[':user_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/members/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdMembersUserIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdMembersUserIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].members[':user_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PUT /guilds/{guild_id}/members/{user_id}
 */
export function usePutGuildsGuildIdMembersUserId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}
 */
export function useDeleteGuildsGuildIdMembersUserId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/members/{user_id}
 */
export function usePatchGuildsGuildIdMembersUserId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$patch(args, clientOptions)),
  })
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function usePutGuildsGuildIdMembersUserIdRolesRoleId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdMembersUserIdRolesRoleId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$delete(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * GET /guilds/{guild_id}/messages/search
 */
export function useGetGuildsGuildIdMessagesSearch(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdMessagesSearchQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/messages/search
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdMessagesSearchQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
) {
  return [client.guilds[':guild_id'].messages.search.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/messages/search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdMessagesSearchQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdMessagesSearchQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].messages.search.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/new-member-welcome
 */
export function useGetGuildsGuildIdNewMemberWelcome(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdNewMemberWelcomeQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/new-member-welcome
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdNewMemberWelcomeQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
) {
  return [client.guilds[':guild_id']['new-member-welcome'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/new-member-welcome
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdNewMemberWelcomeQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdNewMemberWelcomeQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id']['new-member-welcome'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/onboarding
 */
export function useGetGuildsGuildIdOnboarding(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdOnboardingQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/onboarding
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdOnboardingQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
) {
  return [client.guilds[':guild_id'].onboarding.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/onboarding
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdOnboardingQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdOnboardingQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].onboarding.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PUT /guilds/{guild_id}/onboarding
 */
export function usePutGuildsGuildIdOnboarding(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].onboarding.$put(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/preview
 */
export function useGetGuildsGuildIdPreview(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['preview']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdPreviewQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/preview
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdPreviewQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
) {
  return [client.guilds[':guild_id'].preview.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/preview
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdPreviewQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdPreviewQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].preview.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/prune
 */
export function useGetGuildsGuildIdPrune(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['prune']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetGuildsGuildIdPruneQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/prune
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdPruneQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
) {
  return [client.guilds[':guild_id'].prune.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/prune
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdPruneQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdPruneQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].prune.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /guilds/{guild_id}/prune
 */
export function usePostGuildsGuildIdPrune(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['prune']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].prune.$post(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/regions
 */
export function useGetGuildsGuildIdRegions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['regions']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdRegionsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/regions
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdRegionsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
) {
  return [client.guilds[':guild_id'].regions.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/regions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdRegionsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdRegionsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].regions.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/roles
 */
export function useGetGuildsGuildIdRoles(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetGuildsGuildIdRolesQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/roles
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdRolesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
) {
  return [client.guilds[':guild_id'].roles.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/roles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdRolesQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdRolesQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].roles.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /guilds/{guild_id}/roles
 */
export function usePostGuildsGuildIdRoles(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].roles.$post(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/roles
 */
export function usePatchGuildsGuildIdRoles(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].roles.$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/roles/member-counts
 */
export function useGetGuildsGuildIdRolesMemberCounts(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdRolesMemberCountsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/roles/member-counts
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdRolesMemberCountsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
) {
  return [client.guilds[':guild_id'].roles['member-counts'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/roles/member-counts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdRolesMemberCountsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdRolesMemberCountsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].roles['member-counts'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/roles/{role_id}
 */
export function useGetGuildsGuildIdRolesRoleId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdRolesRoleIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/roles/{role_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdRolesRoleIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
) {
  return [client.guilds[':guild_id'].roles[':role_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/roles/{role_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdRolesRoleIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdRolesRoleIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].roles[':role_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /guilds/{guild_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdRolesRoleId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].roles[':role_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/roles/{role_id}
 */
export function usePatchGuildsGuildIdRolesRoleId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].roles[':role_id'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/scheduled-events
 */
export function useGetGuildsGuildIdScheduledEvents(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdScheduledEventsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/scheduled-events
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdScheduledEventsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
) {
  return [client.guilds[':guild_id']['scheduled-events'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/scheduled-events
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdScheduledEventsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdScheduledEventsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id']['scheduled-events'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /guilds/{guild_id}/scheduled-events
 */
export function usePostGuildsGuildIdScheduledEvents(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>,
    ) => parseResponse(client.guilds[':guild_id']['scheduled-events'].$post(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function useGetGuildsGuildIdScheduledEventsGuildScheduledEventId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
) {
  return [
    client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$url(args).pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryOptions = (
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function useDeleteGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$delete(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * PATCH /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function usePatchGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$patch(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 */
export function useGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryOptions(
      args,
      clientOptions,
    ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
) {
  return [
    client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].users.$url(args)
      .pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryOptions = (
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].users.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/soundboard-sounds
 */
export function useGetGuildsGuildIdSoundboardSounds(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdSoundboardSoundsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/soundboard-sounds
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdSoundboardSoundsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
) {
  return [client.guilds[':guild_id']['soundboard-sounds'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/soundboard-sounds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdSoundboardSoundsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdSoundboardSoundsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id']['soundboard-sounds'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /guilds/{guild_id}/soundboard-sounds
 */
export function usePostGuildsGuildIdSoundboardSounds(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>,
    ) => parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$post(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function useGetGuildsGuildIdSoundboardSoundsSoundId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdSoundboardSoundsSoundIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdSoundboardSoundsSoundIdQueryKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
) {
  return [client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdSoundboardSoundsSoundIdQueryOptions = (
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdSoundboardSoundsSoundIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function useDeleteGuildsGuildIdSoundboardSoundsSoundId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * PATCH /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function usePatchGuildsGuildIdSoundboardSoundsSoundId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$patch(args, clientOptions),
      ),
  })
}

/**
 * GET /guilds/{guild_id}/stickers
 */
export function useGetGuildsGuildIdStickers(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['stickers']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdStickersQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/stickers
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdStickersQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
) {
  return [client.guilds[':guild_id'].stickers.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/stickers
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdStickersQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdStickersQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].stickers.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /guilds/{guild_id}/stickers
 */
export function usePostGuildsGuildIdStickers(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['stickers']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].stickers.$post(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useGetGuildsGuildIdStickersStickerId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdStickersStickerIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/stickers/{sticker_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdStickersStickerIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
) {
  return [client.guilds[':guild_id'].stickers[':sticker_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/stickers/{sticker_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdStickersStickerIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdStickersStickerIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].stickers[':sticker_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useDeleteGuildsGuildIdStickersStickerId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id'].stickers[':sticker_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * PATCH /guilds/{guild_id}/stickers/{sticker_id}
 */
export function usePatchGuildsGuildIdStickersStickerId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>
          >
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']
      >,
    ) =>
      parseResponse(client.guilds[':guild_id'].stickers[':sticker_id'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/templates
 */
export function useGetGuildsGuildIdTemplates(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdTemplatesQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/templates
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdTemplatesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
) {
  return [client.guilds[':guild_id'].templates.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/templates
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdTemplatesQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdTemplatesQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].templates.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /guilds/{guild_id}/templates
 */
export function usePostGuildsGuildIdTemplates(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].templates.$post(args, clientOptions)),
  })
}

/**
 * PUT /guilds/{guild_id}/templates/{code}
 */
export function usePutGuildsGuildIdTemplatesCode(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /guilds/{guild_id}/templates/{code}
 */
export function useDeleteGuildsGuildIdTemplatesCode(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/templates/{code}
 */
export function usePatchGuildsGuildIdTemplatesCode(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/threads/active
 */
export function useGetGuildsGuildIdThreadsActive(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdThreadsActiveQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/threads/active
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdThreadsActiveQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
) {
  return [client.guilds[':guild_id'].threads.active.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/threads/active
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdThreadsActiveQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdThreadsActiveQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].threads.active.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/vanity-url
 */
export function useGetGuildsGuildIdVanityUrl(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdVanityUrlQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/vanity-url
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdVanityUrlQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
) {
  return [client.guilds[':guild_id']['vanity-url'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/vanity-url
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdVanityUrlQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdVanityUrlQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id']['vanity-url'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/voice-states/@me
 */
export function useGetGuildsGuildIdVoiceStatesMe(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdVoiceStatesMeQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/voice-states/@me
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdVoiceStatesMeQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
) {
  return [client.guilds[':guild_id']['voice-states']['@me'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/voice-states/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdVoiceStatesMeQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdVoiceStatesMeQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id']['voice-states']['@me'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PATCH /guilds/{guild_id}/voice-states/@me
 */
export function usePatchGuildsGuildIdVoiceStatesMe(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>,
    ) =>
      parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/voice-states/{user_id}
 */
export function useGetGuildsGuildIdVoiceStatesUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdVoiceStatesUserIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/voice-states/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdVoiceStatesUserIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
) {
  return [client.guilds[':guild_id']['voice-states'][':user_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/voice-states/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdVoiceStatesUserIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdVoiceStatesUserIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id']['voice-states'][':user_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PATCH /guilds/{guild_id}/voice-states/{user_id}
 */
export function usePatchGuildsGuildIdVoiceStatesUserId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id']['voice-states'][':user_id'].$patch(args, clientOptions),
      ),
  })
}

/**
 * GET /guilds/{guild_id}/webhooks
 */
export function useGetGuildsGuildIdWebhooks(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdWebhooksQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/webhooks
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdWebhooksQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
) {
  return [client.guilds[':guild_id'].webhooks.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/webhooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdWebhooksQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdWebhooksQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].webhooks.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/welcome-screen
 */
export function useGetGuildsGuildIdWelcomeScreen(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdWelcomeScreenQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/welcome-screen
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdWelcomeScreenQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
) {
  return [client.guilds[':guild_id']['welcome-screen'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/welcome-screen
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdWelcomeScreenQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdWelcomeScreenQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id']['welcome-screen'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PATCH /guilds/{guild_id}/welcome-screen
 */
export function usePatchGuildsGuildIdWelcomeScreen(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id']['welcome-screen'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/widget
 */
export function useGetGuildsGuildIdWidget(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['widget']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdWidgetQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/widget
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdWidgetQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
) {
  return [client.guilds[':guild_id'].widget.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/widget
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdWidgetQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdWidgetQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id'].widget.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PATCH /guilds/{guild_id}/widget
 */
export function usePatchGuildsGuildIdWidget(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['widget']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].widget.$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/widget.json
 */
export function useGetGuildsGuildIdWidgetJson(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdWidgetJsonQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/widget.json
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdWidgetJsonQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
) {
  return [client.guilds[':guild_id']['widget.json'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/widget.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdWidgetJsonQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdWidgetJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id']['widget.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/widget.png
 */
export function useGetGuildsGuildIdWidgetPng(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetGuildsGuildIdWidgetPngQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/widget.png
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdWidgetPngQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
) {
  return [client.guilds[':guild_id']['widget.png'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/widget.png
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdWidgetPngQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdWidgetPngQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.guilds[':guild_id']['widget.png'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /interactions/{interaction_id}/{interaction_token}/callback
 */
export function usePostInteractionsInteractionIdInteractionTokenCallback(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
      >,
    ) =>
      parseResponse(
        client.interactions[':interaction_id'][':interaction_token'].callback.$post(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * GET /invites/{code}
 */
export function useGetInvitesCode(
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.invites)[':code']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetInvitesCodeQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /invites/{code}
 * Uses $url() for type-safe key generation
 */
export function getGetInvitesCodeQueryKey(
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
) {
  return [client.invites[':code'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /invites/{code}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetInvitesCodeQueryOptions = (
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetInvitesCodeQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.invites[':code'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /invites/{code}
 */
export function useDeleteInvitesCode(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.invites)[':code']['$delete']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.invites)[':code']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.invites)[':code']['$delete']>) =>
      parseResponse(client.invites[':code'].$delete(args, clientOptions)),
  })
}

/**
 * PUT /lobbies
 */
export function usePutLobbies(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.lobbies.$put>>>>>,
    Error,
    InferRequestType<typeof client.lobbies.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.lobbies.$put>) =>
      parseResponse(client.lobbies.$put(args, clientOptions)),
  })
}

/**
 * POST /lobbies
 */
export function usePostLobbies(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.lobbies.$post>>>>>,
    Error,
    InferRequestType<typeof client.lobbies.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.lobbies.$post>) =>
      parseResponse(client.lobbies.$post(args, clientOptions)),
  })
}

/**
 * GET /lobbies/{lobby_id}
 */
export function useGetLobbiesLobbyId(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetLobbiesLobbyIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /lobbies/{lobby_id}
 * Uses $url() for type-safe key generation
 */
export function getGetLobbiesLobbyIdQueryKey(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
) {
  return [client.lobbies[':lobby_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /lobbies/{lobby_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetLobbiesLobbyIdQueryOptions = (
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetLobbiesLobbyIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.lobbies[':lobby_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PATCH /lobbies/{lobby_id}
 */
export function usePatchLobbiesLobbyId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>) =>
      parseResponse(client.lobbies[':lobby_id'].$patch(args, clientOptions)),
  })
}

/**
 * PATCH /lobbies/{lobby_id}/channel-linking
 */
export function usePatchLobbiesLobbyIdChannelLinking(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>,
    ) => parseResponse(client.lobbies[':lobby_id']['channel-linking'].$patch(args, clientOptions)),
  })
}

/**
 * DELETE /lobbies/{lobby_id}/members/@me
 */
export function useDeleteLobbiesLobbyIdMembersMe(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>,
    ) => parseResponse(client.lobbies[':lobby_id'].members['@me'].$delete(args, clientOptions)),
  })
}

/**
 * POST /lobbies/{lobby_id}/members/@me/invites
 */
export function usePostLobbiesLobbyIdMembersMeInvites(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>
          >
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']
      >,
    ) =>
      parseResponse(client.lobbies[':lobby_id'].members['@me'].invites.$post(args, clientOptions)),
  })
}

/**
 * POST /lobbies/{lobby_id}/members/bulk
 */
export function usePostLobbiesLobbyIdMembersBulk(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>,
    ) => parseResponse(client.lobbies[':lobby_id'].members.bulk.$post(args, clientOptions)),
  })
}

/**
 * PUT /lobbies/{lobby_id}/members/{user_id}
 */
export function usePutLobbiesLobbyIdMembersUserId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>,
    ) => parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /lobbies/{lobby_id}/members/{user_id}
 */
export function useDeleteLobbiesLobbyIdMembersUserId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']
      >,
    ) =>
      parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$delete(args, clientOptions)),
  })
}

/**
 * POST /lobbies/{lobby_id}/members/{user_id}/invites
 */
export function usePostLobbiesLobbyIdMembersUserIdInvites(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
      >,
    ) =>
      parseResponse(
        client.lobbies[':lobby_id'].members[':user_id'].invites.$post(args, clientOptions),
      ),
  })
}

/**
 * GET /lobbies/{lobby_id}/messages
 */
export function useGetLobbiesLobbyIdMessages(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetLobbiesLobbyIdMessagesQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /lobbies/{lobby_id}/messages
 * Uses $url() for type-safe key generation
 */
export function getGetLobbiesLobbyIdMessagesQueryKey(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
) {
  return [client.lobbies[':lobby_id'].messages.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /lobbies/{lobby_id}/messages
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetLobbiesLobbyIdMessagesQueryOptions = (
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetLobbiesLobbyIdMessagesQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.lobbies[':lobby_id'].messages.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /lobbies/{lobby_id}/messages
 */
export function usePostLobbiesLobbyIdMessages(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>,
    ) => parseResponse(client.lobbies[':lobby_id'].messages.$post(args, clientOptions)),
  })
}

/**
 * GET /oauth2/@me
 */
export function useGetOauth2Me(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.oauth2)['@me']['$get']>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetOauth2MeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /oauth2/@me
 * Uses $url() for type-safe key generation
 */
export function getGetOauth2MeQueryKey() {
  return [client.oauth2['@me'].$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /oauth2/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauth2MeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOauth2MeQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.oauth2['@me'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /oauth2/applications/@me
 */
export function useGetOauth2ApplicationsMe(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['$get']>>
        >
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetOauth2ApplicationsMeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /oauth2/applications/@me
 * Uses $url() for type-safe key generation
 */
export function getGetOauth2ApplicationsMeQueryKey() {
  return [client.oauth2.applications['@me'].$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /oauth2/applications/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauth2ApplicationsMeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOauth2ApplicationsMeQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.oauth2.applications['@me'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /oauth2/keys
 */
export function useGetOauth2Keys(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth2.keys.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetOauth2KeysQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /oauth2/keys
 * Uses $url() for type-safe key generation
 */
export function getGetOauth2KeysQueryKey() {
  return [client.oauth2.keys.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /oauth2/keys
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauth2KeysQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOauth2KeysQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.oauth2.keys.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /oauth2/userinfo
 */
export function useGetOauth2Userinfo(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth2.userinfo.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetOauth2UserinfoQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /oauth2/userinfo
 * Uses $url() for type-safe key generation
 */
export function getGetOauth2UserinfoQueryKey() {
  return [client.oauth2.userinfo.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /oauth2/userinfo
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauth2UserinfoQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOauth2UserinfoQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.oauth2.userinfo.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /partner-sdk/provisional-accounts/unmerge
 */
export function usePostPartnerSdkProvisionalAccountsUnmerge(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']
      >,
    ) =>
      parseResponse(
        client['partner-sdk']['provisional-accounts'].unmerge.$post(args, clientOptions),
      ),
  })
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge/bot
 */
export function usePostPartnerSdkProvisionalAccountsUnmergeBot(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
      >,
    ) =>
      parseResponse(
        client['partner-sdk']['provisional-accounts'].unmerge.bot.$post(args, clientOptions),
      ),
  })
}

/**
 * POST /partner-sdk/token
 */
export function usePostPartnerSdkToken(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['partner-sdk']['token']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client)['partner-sdk']['token']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['partner-sdk']['token']['$post']>) =>
      parseResponse(client['partner-sdk'].token.$post(args, clientOptions)),
  })
}

/**
 * POST /partner-sdk/token/bot
 */
export function usePostPartnerSdkTokenBot(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['partner-sdk']['token']['bot']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>,
    ) => parseResponse(client['partner-sdk'].token.bot.$post(args, clientOptions)),
  })
}

/**
 * GET /soundboard-default-sounds
 */
export function useGetSoundboardDefaultSounds(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['$get']>>
        >
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetSoundboardDefaultSoundsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /soundboard-default-sounds
 * Uses $url() for type-safe key generation
 */
export function getGetSoundboardDefaultSoundsQueryKey() {
  return [client['soundboard-default-sounds'].$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /soundboard-default-sounds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSoundboardDefaultSoundsQueryOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSoundboardDefaultSoundsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['soundboard-default-sounds'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /stage-instances
 */
export function usePostStageInstances(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['stage-instances']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client)['stage-instances']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['stage-instances']['$post']>) =>
      parseResponse(client['stage-instances'].$post(args, clientOptions)),
  })
}

/**
 * GET /stage-instances/{channel_id}
 */
export function useGetStageInstancesChannelId(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['stage-instances'][':channel_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetStageInstancesChannelIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /stage-instances/{channel_id}
 * Uses $url() for type-safe key generation
 */
export function getGetStageInstancesChannelIdQueryKey(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
) {
  return [client['stage-instances'][':channel_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /stage-instances/{channel_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStageInstancesChannelIdQueryOptions = (
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetStageInstancesChannelIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['stage-instances'][':channel_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /stage-instances/{channel_id}
 */
export function useDeleteStageInstancesChannelId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['stage-instances'][':channel_id']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>,
    ) => parseResponse(client['stage-instances'][':channel_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /stage-instances/{channel_id}
 */
export function usePatchStageInstancesChannelId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['stage-instances'][':channel_id']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>,
    ) => parseResponse(client['stage-instances'][':channel_id'].$patch(args, clientOptions)),
  })
}

/**
 * GET /sticker-packs
 */
export function useGetStickerPacks(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['sticker-packs']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetStickerPacksQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /sticker-packs
 * Uses $url() for type-safe key generation
 */
export function getGetStickerPacksQueryKey() {
  return [client['sticker-packs'].$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /sticker-packs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStickerPacksQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetStickerPacksQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['sticker-packs'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /sticker-packs/{pack_id}
 */
export function useGetStickerPacksPackId(
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['sticker-packs'][':pack_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetStickerPacksPackIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /sticker-packs/{pack_id}
 * Uses $url() for type-safe key generation
 */
export function getGetStickerPacksPackIdQueryKey(
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
) {
  return [client['sticker-packs'][':pack_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /sticker-packs/{pack_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStickerPacksPackIdQueryOptions = (
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetStickerPacksPackIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['sticker-packs'][':pack_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /stickers/{sticker_id}
 */
export function useGetStickersStickerId(
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.stickers)[':sticker_id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetStickersStickerIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /stickers/{sticker_id}
 * Uses $url() for type-safe key generation
 */
export function getGetStickersStickerIdQueryKey(
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
) {
  return [client.stickers[':sticker_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /stickers/{sticker_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStickersStickerIdQueryOptions = (
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetStickersStickerIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.stickers[':sticker_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/@me
 */
export function useGetUsersMe(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)['@me']['$get']>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetUsersMeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /users/@me
 * Uses $url() for type-safe key generation
 */
export function getGetUsersMeQueryKey() {
  return [client.users['@me'].$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetUsersMeQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.users['@me'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PATCH /users/@me
 */
export function usePatchUsersMe(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)['@me']['$patch']>>>>
    >,
    Error,
    InferRequestType<(typeof client.users)['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.users)['@me']['$patch']>) =>
      parseResponse(client.users['@me'].$patch(args, clientOptions)),
  })
}

/**
 * GET /users/@me/applications/{application_id}/entitlements
 */
export function useGetUsersMeApplicationsApplicationIdEntitlements(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetUsersMeApplicationsApplicationIdEntitlementsQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/@me/applications/{application_id}/entitlements
 * Uses $url() for type-safe key generation
 */
export function getGetUsersMeApplicationsApplicationIdEntitlementsQueryKey(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
) {
  return [
    client.users['@me'].applications[':application_id'].entitlements.$url(args).pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me/applications/{application_id}/entitlements
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeApplicationsApplicationIdEntitlementsQueryOptions = (
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersMeApplicationsApplicationIdEntitlementsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.users['@me'].applications[':application_id'].entitlements.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/@me/applications/{application_id}/role-connection
 */
export function useGetUsersMeApplicationsApplicationIdRoleConnection(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetUsersMeApplicationsApplicationIdRoleConnectionQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/@me/applications/{application_id}/role-connection
 * Uses $url() for type-safe key generation
 */
export function getGetUsersMeApplicationsApplicationIdRoleConnectionQueryKey(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
) {
  return [
    client.users['@me'].applications[':application_id']['role-connection'].$url(args).pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me/applications/{application_id}/role-connection
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeApplicationsApplicationIdRoleConnectionQueryOptions = (
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersMeApplicationsApplicationIdRoleConnectionQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.users['@me'].applications[':application_id']['role-connection'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * PUT /users/@me/applications/{application_id}/role-connection
 */
export function usePutUsersMeApplicationsApplicationIdRoleConnection(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
      >,
    ) =>
      parseResponse(
        client.users['@me'].applications[':application_id']['role-connection'].$put(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * DELETE /users/@me/applications/{application_id}/role-connection
 */
export function useDeleteUsersMeApplicationsApplicationIdRoleConnection(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
      >,
    ) =>
      parseResponse(
        client.users['@me'].applications[':application_id']['role-connection'].$delete(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * POST /users/@me/channels
 */
export function usePostUsersMeChannels(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.users)['@me']['channels']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.users)['@me']['channels']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.users)['@me']['channels']['$post']>) =>
      parseResponse(client.users['@me'].channels.$post(args, clientOptions)),
  })
}

/**
 * GET /users/@me/connections
 */
export function useGetUsersMeConnections(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.users)['@me']['connections']['$get']>>
        >
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetUsersMeConnectionsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /users/@me/connections
 * Uses $url() for type-safe key generation
 */
export function getGetUsersMeConnectionsQueryKey() {
  return [client.users['@me'].connections.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me/connections
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeConnectionsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetUsersMeConnectionsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.users['@me'].connections.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/@me/guilds
 */
export function useGetUsersMeGuilds(
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)['@me']['guilds']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetUsersMeGuildsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /users/@me/guilds
 * Uses $url() for type-safe key generation
 */
export function getGetUsersMeGuildsQueryKey(
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
) {
  return [client.users['@me'].guilds.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me/guilds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeGuildsQueryOptions = (
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersMeGuildsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.users['@me'].guilds.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /users/@me/guilds/{guild_id}
 */
export function useDeleteUsersMeGuildsGuildId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>,
    ) => parseResponse(client.users['@me'].guilds[':guild_id'].$delete(args, clientOptions)),
  })
}

/**
 * GET /users/@me/guilds/{guild_id}/member
 */
export function useGetUsersMeGuildsGuildIdMember(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetUsersMeGuildsGuildIdMemberQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/@me/guilds/{guild_id}/member
 * Uses $url() for type-safe key generation
 */
export function getGetUsersMeGuildsGuildIdMemberQueryKey(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
) {
  return [client.users['@me'].guilds[':guild_id'].member.$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me/guilds/{guild_id}/member
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeGuildsGuildIdMemberQueryOptions = (
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersMeGuildsGuildIdMemberQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.users['@me'].guilds[':guild_id'].member.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/{user_id}
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':user_id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetUsersUserIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /users/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return [client.users[':user_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /users/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdQueryOptions = (
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersUserIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.users[':user_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /voice/regions
 */
export function useGetVoiceRegions(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.voice.regions.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetVoiceRegionsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /voice/regions
 * Uses $url() for type-safe key generation
 */
export function getGetVoiceRegionsQueryKey() {
  return [client.voice.regions.$url().pathname] as const
}

/**
 * Returns TanStack Query query options for GET /voice/regions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetVoiceRegionsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetVoiceRegionsQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.voice.regions.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /webhooks/{webhook_id}
 */
export function useGetWebhooksWebhookId(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.webhooks)[':webhook_id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({ ...getGetWebhooksWebhookIdQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}
 * Uses $url() for type-safe key generation
 */
export function getGetWebhooksWebhookIdQueryKey(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
) {
  return [client.webhooks[':webhook_id'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /webhooks/{webhook_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksWebhookIdQueryOptions = (
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetWebhooksWebhookIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.webhooks[':webhook_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /webhooks/{webhook_id}
 */
export function useDeleteWebhooksWebhookId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.webhooks)[':webhook_id']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>,
    ) => parseResponse(client.webhooks[':webhook_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /webhooks/{webhook_id}
 */
export function usePatchWebhooksWebhookId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.webhooks)[':webhook_id']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>) =>
      parseResponse(client.webhooks[':webhook_id'].$patch(args, clientOptions)),
  })
}

/**
 * GET /webhooks/{webhook_id}/{webhook_token}
 */
export function useGetWebhooksWebhookIdWebhookToken(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetWebhooksWebhookIdWebhookTokenQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}/{webhook_token}
 * Uses $url() for type-safe key generation
 */
export function getGetWebhooksWebhookIdWebhookTokenQueryKey(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
) {
  return [client.webhooks[':webhook_id'][':webhook_token'].$url(args).pathname] as const
}

/**
 * Returns TanStack Query query options for GET /webhooks/{webhook_id}/{webhook_token}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksWebhookIdWebhookTokenQueryOptions = (
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetWebhooksWebhookIdWebhookTokenQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.webhooks[':webhook_id'][':webhook_token'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /webhooks/{webhook_id}/{webhook_token}
 */
export function usePostWebhooksWebhookIdWebhookToken(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>,
    ) => parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$post(args, clientOptions)),
  })
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}
 */
export function useDeleteWebhooksWebhookIdWebhookToken(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>,
    ) =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}
 */
export function usePatchWebhooksWebhookIdWebhookToken(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>,
    ) =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$patch(args, clientOptions)),
  })
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/github
 */
export function usePostWebhooksWebhookIdWebhookTokenGithub(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
      >,
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].github.$post(args, clientOptions),
      ),
  })
}

/**
 * GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function useGetWebhooksWebhookIdWebhookTokenMessagesOriginal(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 * Uses $url() for type-safe key generation
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
) {
  return [
    client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$url(args).pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryOptions = (
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
      >,
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$delete(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function usePatchWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
      >,
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$patch(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function useGetWebhooksWebhookIdWebhookTokenMessagesMessageId(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    ...getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 * Uses $url() for type-safe key generation
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
) {
  return [
    client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$url(args).pathname,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryOptions = (
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$delete(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function usePatchWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$patch(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/slack
 */
export function usePostWebhooksWebhookIdWebhookTokenSlack(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']>
          >
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
      >,
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].slack.$post(args, clientOptions),
      ),
  })
}
