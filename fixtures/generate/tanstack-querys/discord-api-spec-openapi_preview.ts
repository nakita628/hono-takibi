import { useQuery, useMutation } from '@tanstack/react-query'
import type { QueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discord-api-spec-openapi_preview'

/**
 * GET /applications/@me
 */
export function useGetApplicationsMe(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.applications)['@me']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsMeQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.applications['@me'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /applications/@me
 */
export function getGetApplicationsMeQueryKey() {
  return ['/applications/@me'] as const
}

/**
 * PATCH /applications/@me
 */
export function usePatchApplicationsMe(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.applications)['@me']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.applications)['@me']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.applications)['@me']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.applications)['@me']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.applications['@me'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /applications/{application_id}
 */
export function useGetApplicationsApplicationId(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.applications)[':application_id']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.applications[':application_id'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}
 */
export function getGetApplicationsApplicationIdQueryKey(
  args?: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
) {
  return ['/applications/:application_id', ...(args ? [args] : [])] as const
}

/**
 * PATCH /applications/{application_id}
 */
export function usePatchApplicationsApplicationId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.applications)[':application_id']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.applications)[':application_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.applications)[':application_id']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.applications[':application_id'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /applications/{application_id}/activity-instances/{instance_id}
 */
export function useGetApplicationsApplicationIdActivityInstancesInstanceId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id']['activity-instances'][':instance_id'].$get(
            args,
            clientOptions,
          ),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/activity-instances/{instance_id}
 */
export function getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(
  args?: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
) {
  return [
    '/applications/:application_id/activity-instances/:instance_id',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /applications/{application_id}/attachment
 */
export function usePostApplicationsApplicationIdAttachment(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.applications)[':application_id']['attachment']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.applications)[':application_id']['attachment']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.applications)[':application_id']['attachment']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['attachment']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.applications[':application_id'].attachment.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /applications/{application_id}/commands
 */
export function useGetApplicationsApplicationIdCommands(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.applications)[':application_id']['commands']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdCommandsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.applications[':application_id'].commands.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/commands
 */
export function getGetApplicationsApplicationIdCommandsQueryKey(
  args?: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
) {
  return ['/applications/:application_id/commands', ...(args ? [args] : [])] as const
}

/**
 * PUT /applications/{application_id}/commands
 */
export function usePutApplicationsApplicationIdCommands(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.applications)[':application_id']['commands']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.applications)[':application_id']['commands']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.applications[':application_id'].commands.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /applications/{application_id}/commands
 */
export function usePostApplicationsApplicationIdCommands(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.applications)[':application_id']['commands']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.applications)[':application_id']['commands']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.applications[':application_id'].commands.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /applications/{application_id}/commands/{command_id}
 */
export function useGetApplicationsApplicationIdCommandsCommandId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdCommandsCommandIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].commands[':command_id'].$get(args, clientOptions),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/commands/{command_id}
 */
export function getGetApplicationsApplicationIdCommandsCommandIdQueryKey(
  args?: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
) {
  return ['/applications/:application_id/commands/:command_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /applications/{application_id}/commands/{command_id}
 */
export function useDeleteApplicationsApplicationIdCommandsCommandId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.applications[':application_id'].commands[':command_id'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * PATCH /applications/{application_id}/commands/{command_id}
 */
export function usePatchApplicationsApplicationIdCommandsCommandId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.applications[':application_id'].commands[':command_id'].$patch(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /applications/{application_id}/emojis
 */
export function useGetApplicationsApplicationIdEmojis(
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.applications)[':application_id']['emojis']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdEmojisQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.applications[':application_id'].emojis.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/emojis
 */
export function getGetApplicationsApplicationIdEmojisQueryKey(
  args?: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
) {
  return ['/applications/:application_id/emojis', ...(args ? [args] : [])] as const
}

/**
 * POST /applications/{application_id}/emojis
 */
export function usePostApplicationsApplicationIdEmojis(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.applications)[':application_id']['emojis']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.applications)[':application_id']['emojis']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.applications[':application_id'].emojis.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /applications/{application_id}/emojis/{emoji_id}
 */
export function useGetApplicationsApplicationIdEmojisEmojiId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdEmojisEmojiIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].emojis[':emoji_id'].$get(args, clientOptions),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/emojis/{emoji_id}
 */
export function getGetApplicationsApplicationIdEmojisEmojiIdQueryKey(
  args?: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
) {
  return ['/applications/:application_id/emojis/:emoji_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /applications/{application_id}/emojis/{emoji_id}
 */
export function useDeleteApplicationsApplicationIdEmojisEmojiId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.applications[':application_id'].emojis[':emoji_id'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * PATCH /applications/{application_id}/emojis/{emoji_id}
 */
export function usePatchApplicationsApplicationIdEmojisEmojiId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.applications[':application_id'].emojis[':emoji_id'].$patch(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /applications/{application_id}/entitlements
 */
export function useGetApplicationsApplicationIdEntitlements(
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdEntitlementsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].entitlements.$get(args, clientOptions),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/entitlements
 */
export function getGetApplicationsApplicationIdEntitlementsQueryKey(
  args?: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
) {
  return ['/applications/:application_id/entitlements', ...(args ? [args] : [])] as const
}

/**
 * POST /applications/{application_id}/entitlements
 */
export function usePostApplicationsApplicationIdEntitlements(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.applications)[':application_id']['entitlements']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.applications)[':application_id']['entitlements']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.applications[':application_id'].entitlements.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /applications/{application_id}/entitlements/{entitlement_id}
 */
export function useGetApplicationsApplicationIdEntitlementsEntitlementId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].entitlements[':entitlement_id'].$get(
            args,
            clientOptions,
          ),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/entitlements/{entitlement_id}
 */
export function getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(
  args?: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
) {
  return [
    '/applications/:application_id/entitlements/:entitlement_id',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /applications/{application_id}/entitlements/{entitlement_id}
 */
export function useDeleteApplicationsApplicationIdEntitlementsEntitlementId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.applications[':application_id'].entitlements[':entitlement_id'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * POST /applications/{application_id}/entitlements/{entitlement_id}/consume
 */
export function usePostApplicationsApplicationIdEntitlementsEntitlementIdConsume(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.applications[':application_id'].entitlements[':entitlement_id'].consume.$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands
 */
export function useGetApplicationsApplicationIdGuildsGuildIdCommands(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands.$get(
            args,
            clientOptions,
          ),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(
  args?: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
) {
  return [
    '/applications/:application_id/guilds/:guild_id/commands',
    ...(args ? [args] : []),
  ] as const
}

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands
 */
export function usePutApplicationsApplicationIdGuildsGuildIdCommands(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands.$put(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * POST /applications/{application_id}/guilds/{guild_id}/commands
 */
export function usePostApplicationsApplicationIdGuildsGuildIdCommands(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands.$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 */
export function useGetApplicationsApplicationIdGuildsGuildIdCommandsPermissions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands.permissions.$get(
            args,
            clientOptions,
          ),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(
  args?: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
) {
  return [
    '/applications/:application_id/guilds/:guild_id/commands/permissions',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function useGetApplicationsApplicationIdGuildsGuildIdCommandsCommandId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$get(
            args,
            clientOptions,
          ),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(
  args?: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
) {
  return [
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function useDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands[
            ':command_id'
          ].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * PATCH /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function usePatchApplicationsApplicationIdGuildsGuildIdCommandsCommandId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$patch(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 */
export function useGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands[
            ':command_id'
          ].permissions.$get(args, clientOptions),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(
  args?: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
  >,
) {
  return [
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    ...(args ? [args] : []),
  ] as const
}

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 */
export function usePutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands[
            ':command_id'
          ].permissions.$put(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /applications/{application_id}/role-connections/metadata
 */
export function useGetApplicationsApplicationIdRoleConnectionsMetadata(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdRoleConnectionsMetadataQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id']['role-connections'].metadata.$get(
            args,
            clientOptions,
          ),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/role-connections/metadata
 */
export function getGetApplicationsApplicationIdRoleConnectionsMetadataQueryKey(
  args?: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
) {
  return [
    '/applications/:application_id/role-connections/metadata',
    ...(args ? [args] : []),
  ] as const
}

/**
 * PUT /applications/{application_id}/role-connections/metadata
 */
export function usePutApplicationsApplicationIdRoleConnectionsMetadata(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.applications[':application_id']['role-connections'].metadata.$put(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /channels/{channel_id}
 */
export function useGetChannelsChannelId(
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.channels)[':channel_id']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.channels[':channel_id'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}
 */
export function getGetChannelsChannelIdQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
) {
  return ['/channels/:channel_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /channels/{channel_id}
 */
export function useDeleteChannelsChannelId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.channels[':channel_id'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /channels/{channel_id}
 */
export function usePatchChannelsChannelId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.channels[':channel_id'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /channels/{channel_id}/followers
 */
export function usePostChannelsChannelIdFollowers(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['followers']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['followers']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.channels[':channel_id'].followers.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /channels/{channel_id}/invites
 */
export function useGetChannelsChannelIdInvites(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.channels)[':channel_id']['invites']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdInvitesQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels[':channel_id'].invites.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/invites
 */
export function getGetChannelsChannelIdInvitesQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
) {
  return ['/channels/:channel_id/invites', ...(args ? [args] : [])] as const
}

/**
 * POST /channels/{channel_id}/invites
 */
export function usePostChannelsChannelIdInvites(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['invites']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['invites']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.channels[':channel_id'].invites.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /channels/{channel_id}/messages
 */
export function useGetChannelsChannelIdMessages(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.channels)[':channel_id']['messages']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdMessagesQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels[':channel_id'].messages.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages
 */
export function getGetChannelsChannelIdMessagesQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
) {
  return ['/channels/:channel_id/messages', ...(args ? [args] : [])] as const
}

/**
 * POST /channels/{channel_id}/messages
 */
export function usePostChannelsChannelIdMessages(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['messages']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['messages']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.channels[':channel_id'].messages.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /channels/{channel_id}/messages/bulk-delete
 */
export function usePostChannelsChannelIdMessagesBulkDelete(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].messages['bulk-delete'].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /channels/{channel_id}/messages/pins
 */
export function useGetChannelsChannelIdMessagesPins(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdMessagesPinsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels[':channel_id'].messages.pins.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages/pins
 */
export function getGetChannelsChannelIdMessagesPinsQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
) {
  return ['/channels/:channel_id/messages/pins', ...(args ? [args] : [])] as const
}

/**
 * PUT /channels/{channel_id}/messages/pins/{message_id}
 */
export function usePutChannelsChannelIdMessagesPinsMessageId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].messages.pins[':message_id'].$put(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /channels/{channel_id}/messages/pins/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesPinsMessageId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].messages.pins[':message_id'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /channels/{channel_id}/messages/{message_id}
 */
export function useGetChannelsChannelIdMessagesMessageId(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdMessagesMessageIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].$get(args, clientOptions),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages/{message_id}
 */
export function getGetChannelsChannelIdMessagesMessageIdQueryKey(
  args?: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
) {
  return ['/channels/:channel_id/messages/:message_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesMessageId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * PATCH /channels/{channel_id}/messages/{message_id}
 */
export function usePatchChannelsChannelIdMessagesMessageId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].$patch(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * POST /channels/{channel_id}/messages/{message_id}/crosspost
 */
export function usePostChannelsChannelIdMessagesMessageIdCrosspost(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].crosspost.$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactions(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].reactions.$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 */
export function useGetChannelsChannelIdMessagesMessageIdReactionsEmojiName(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$get(
            args,
            clientOptions,
          ),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 */
export function getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(
  args?: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
) {
  return [
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiName(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * PUT /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function usePutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'][
            '@me'
          ].$put(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'][
            '@me'
          ].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'][
            ':user_id'
          ].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * POST /channels/{channel_id}/messages/{message_id}/threads
 */
export function usePostChannelsChannelIdMessagesMessageIdThreads(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].threads.$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * PUT /channels/{channel_id}/permissions/{overwrite_id}
 */
export function usePutChannelsChannelIdPermissionsOverwriteId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].permissions[':overwrite_id'].$put(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /channels/{channel_id}/permissions/{overwrite_id}
 */
export function useDeleteChannelsChannelIdPermissionsOverwriteId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].permissions[':overwrite_id'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /channels/{channel_id}/pins
 */
export function useGetChannelsChannelIdPins(
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.channels)[':channel_id']['pins']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdPinsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels[':channel_id'].pins.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/pins
 */
export function getGetChannelsChannelIdPinsQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
) {
  return ['/channels/:channel_id/pins', ...(args ? [args] : [])] as const
}

/**
 * PUT /channels/{channel_id}/pins/{message_id}
 */
export function usePutChannelsChannelIdPinsMessageId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].pins[':message_id'].$put(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /channels/{channel_id}/pins/{message_id}
 */
export function useDeleteChannelsChannelIdPinsMessageId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].pins[':message_id'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 */
export function useGetChannelsChannelIdPollsMessageIdAnswersAnswerId(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.channels[':channel_id'].polls[':message_id'].answers[':answer_id'].$get(
            args,
            clientOptions,
          ),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 */
export function getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(
  args?: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
) {
  return [
    '/channels/:channel_id/polls/:message_id/answers/:answer_id',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /channels/{channel_id}/polls/{message_id}/expire
 */
export function usePostChannelsChannelIdPollsMessageIdExpire(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].polls[':message_id'].expire.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * PUT /channels/{channel_id}/recipients/{user_id}
 */
export function usePutChannelsChannelIdRecipientsUserId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].recipients[':user_id'].$put(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /channels/{channel_id}/recipients/{user_id}
 */
export function useDeleteChannelsChannelIdRecipientsUserId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id'].recipients[':user_id'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * POST /channels/{channel_id}/send-soundboard-sound
 */
export function usePostChannelsChannelIdSendSoundboardSound(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id']['send-soundboard-sound'].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /channels/{channel_id}/thread-members
 */
export function useGetChannelsChannelIdThreadMembers(
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdThreadMembersQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels[':channel_id']['thread-members'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/thread-members
 */
export function getGetChannelsChannelIdThreadMembersQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
) {
  return ['/channels/:channel_id/thread-members', ...(args ? [args] : [])] as const
}

/**
 * PUT /channels/{channel_id}/thread-members/@me
 */
export function usePutChannelsChannelIdThreadMembersMe(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id']['thread-members']['@me'].$put(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /channels/{channel_id}/thread-members/@me
 */
export function useDeleteChannelsChannelIdThreadMembersMe(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id']['thread-members']['@me'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /channels/{channel_id}/thread-members/{user_id}
 */
export function useGetChannelsChannelIdThreadMembersUserId(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdThreadMembersUserIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.channels[':channel_id']['thread-members'][':user_id'].$get(args, clientOptions),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/thread-members/{user_id}
 */
export function getGetChannelsChannelIdThreadMembersUserIdQueryKey(
  args?: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
) {
  return ['/channels/:channel_id/thread-members/:user_id', ...(args ? [args] : [])] as const
}

/**
 * PUT /channels/{channel_id}/thread-members/{user_id}
 */
export function usePutChannelsChannelIdThreadMembersUserId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id']['thread-members'][':user_id'].$put(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /channels/{channel_id}/thread-members/{user_id}
 */
export function useDeleteChannelsChannelIdThreadMembersUserId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.channels[':channel_id']['thread-members'][':user_id'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * POST /channels/{channel_id}/threads
 */
export function usePostChannelsChannelIdThreads(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['threads']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['threads']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.channels[':channel_id'].threads.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /channels/{channel_id}/threads/archived/private
 */
export function useGetChannelsChannelIdThreadsArchivedPrivate(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdThreadsArchivedPrivateQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.channels[':channel_id'].threads.archived.private.$get(args, clientOptions),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/threads/archived/private
 */
export function getGetChannelsChannelIdThreadsArchivedPrivateQueryKey(
  args?: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
) {
  return ['/channels/:channel_id/threads/archived/private', ...(args ? [args] : [])] as const
}

/**
 * GET /channels/{channel_id}/threads/archived/public
 */
export function useGetChannelsChannelIdThreadsArchivedPublic(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdThreadsArchivedPublicQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.channels[':channel_id'].threads.archived.public.$get(args, clientOptions),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/threads/archived/public
 */
export function getGetChannelsChannelIdThreadsArchivedPublicQueryKey(
  args?: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
) {
  return ['/channels/:channel_id/threads/archived/public', ...(args ? [args] : [])] as const
}

/**
 * GET /channels/{channel_id}/threads/search
 */
export function useGetChannelsChannelIdThreadsSearch(
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdThreadsSearchQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels[':channel_id'].threads.search.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/threads/search
 */
export function getGetChannelsChannelIdThreadsSearchQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
) {
  return ['/channels/:channel_id/threads/search', ...(args ? [args] : [])] as const
}

/**
 * POST /channels/{channel_id}/typing
 */
export function usePostChannelsChannelIdTyping(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['typing']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['typing']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.channels[':channel_id'].typing.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /channels/{channel_id}/users/@me/threads/archived/private
 */
export function useGetChannelsChannelIdUsersMeThreadsArchivedPrivate(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.channels[':channel_id'].users['@me'].threads.archived.private.$get(
            args,
            clientOptions,
          ),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/users/@me/threads/archived/private
 */
export function getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(
  args?: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
) {
  return [
    '/channels/:channel_id/users/@me/threads/archived/private',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /channels/{channel_id}/webhooks
 */
export function useGetChannelsChannelIdWebhooks(
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdWebhooksQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels[':channel_id'].webhooks.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/webhooks
 */
export function getGetChannelsChannelIdWebhooksQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
) {
  return ['/channels/:channel_id/webhooks', ...(args ? [args] : [])] as const
}

/**
 * POST /channels/{channel_id}/webhooks
 */
export function usePostChannelsChannelIdWebhooks(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.channels[':channel_id'].webhooks.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /gateway
 */
export function useGetGateway(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.gateway.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGatewayQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.gateway.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /gateway
 */
export function getGetGatewayQueryKey() {
  return ['/gateway'] as const
}

/**
 * GET /gateway/bot
 */
export function useGetGatewayBot(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.gateway.bot.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGatewayBotQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.gateway.bot.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /gateway/bot
 */
export function getGetGatewayBotQueryKey() {
  return ['/gateway/bot'] as const
}

/**
 * GET /guilds/templates/{code}
 */
export function useGetGuildsTemplatesCode(
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.guilds.templates)[':code']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsTemplatesCodeQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds.templates[':code'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/templates/{code}
 */
export function getGetGuildsTemplatesCodeQueryKey(
  args?: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
) {
  return ['/guilds/templates/:code', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}
 */
export function useGetGuildsGuildId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.guilds)[':guild_id']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.guilds[':guild_id'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}
 */
export function getGetGuildsGuildIdQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
) {
  return ['/guilds/:guild_id', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}
 */
export function usePatchGuildsGuildId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/audit-logs
 */
export function useGetGuildsGuildIdAuditLogs(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdAuditLogsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['audit-logs'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/audit-logs
 */
export function getGetGuildsGuildIdAuditLogsQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
) {
  return ['/guilds/:guild_id/audit-logs', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/auto-moderation/rules
 */
export function useGetGuildsGuildIdAutoModerationRules(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdAutoModerationRulesQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.guilds[':guild_id']['auto-moderation'].rules.$get(args, clientOptions),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/auto-moderation/rules
 */
export function getGetGuildsGuildIdAutoModerationRulesQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
) {
  return ['/guilds/:guild_id/auto-moderation/rules', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/auto-moderation/rules
 */
export function usePostGuildsGuildIdAutoModerationRules(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id']['auto-moderation'].rules.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function useGetGuildsGuildIdAutoModerationRulesRuleId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdAutoModerationRulesRuleIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$get(args, clientOptions),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function getGetGuildsGuildIdAutoModerationRulesRuleIdQueryKey(
  args?: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
) {
  return ['/guilds/:guild_id/auto-moderation/rules/:rule_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function useDeleteGuildsGuildIdAutoModerationRulesRuleId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * PATCH /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function usePatchGuildsGuildIdAutoModerationRulesRuleId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$patch(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/bans
 */
export function useGetGuildsGuildIdBans(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdBansQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.guilds[':guild_id'].bans.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/bans
 */
export function getGetGuildsGuildIdBansQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
) {
  return ['/guilds/:guild_id/bans', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/bans/{user_id}
 */
export function useGetGuildsGuildIdBansUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdBansUserIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].bans[':user_id'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/bans/{user_id}
 */
export function getGetGuildsGuildIdBansUserIdQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/bans/:user_id', ...(args ? [args] : [])] as const
}

/**
 * PUT /guilds/{guild_id}/bans/{user_id}
 */
export function usePutGuildsGuildIdBansUserId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].bans[':user_id'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /guilds/{guild_id}/bans/{user_id}
 */
export function useDeleteGuildsGuildIdBansUserId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].bans[':user_id'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /guilds/{guild_id}/bulk-ban
 */
export function usePostGuildsGuildIdBulkBan(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id']['bulk-ban'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/channels
 */
export function useGetGuildsGuildIdChannels(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdChannelsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].channels.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/channels
 */
export function getGetGuildsGuildIdChannelsQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
) {
  return ['/guilds/:guild_id/channels', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/channels
 */
export function usePostGuildsGuildIdChannels(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].channels.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /guilds/{guild_id}/channels
 */
export function usePatchGuildsGuildIdChannels(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].channels.$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/emojis
 */
export function useGetGuildsGuildIdEmojis(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdEmojisQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].emojis.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/emojis
 */
export function getGetGuildsGuildIdEmojisQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
) {
  return ['/guilds/:guild_id/emojis', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/emojis
 */
export function usePostGuildsGuildIdEmojis(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].emojis.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useGetGuildsGuildIdEmojisEmojiId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdEmojisEmojiIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/emojis/{emoji_id}
 */
export function getGetGuildsGuildIdEmojisEmojiIdQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
) {
  return ['/guilds/:guild_id/emojis/:emoji_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useDeleteGuildsGuildIdEmojisEmojiId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id'].emojis[':emoji_id'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * PATCH /guilds/{guild_id}/emojis/{emoji_id}
 */
export function usePatchGuildsGuildIdEmojisEmojiId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/integrations
 */
export function useGetGuildsGuildIdIntegrations(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdIntegrationsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].integrations.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/integrations
 */
export function getGetGuildsGuildIdIntegrationsQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
) {
  return ['/guilds/:guild_id/integrations', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/integrations/{integration_id}
 */
export function useDeleteGuildsGuildIdIntegrationsIntegrationId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id'].integrations[':integration_id'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/invites
 */
export function useGetGuildsGuildIdInvites(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdInvitesQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].invites.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/invites
 */
export function getGetGuildsGuildIdInvitesQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
) {
  return ['/guilds/:guild_id/invites', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/members
 */
export function useGetGuildsGuildIdMembers(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['members']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdMembersQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].members.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/members
 */
export function getGetGuildsGuildIdMembersQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
) {
  return ['/guilds/:guild_id/members', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}/members/@me
 */
export function usePatchGuildsGuildIdMembersMe(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].members['@me'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/members/search
 */
export function useGetGuildsGuildIdMembersSearch(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdMembersSearchQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].members.search.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/members/search
 */
export function getGetGuildsGuildIdMembersSearchQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
) {
  return ['/guilds/:guild_id/members/search', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/members/{user_id}
 */
export function useGetGuildsGuildIdMembersUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdMembersUserIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].members[':user_id'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/members/{user_id}
 */
export function getGetGuildsGuildIdMembersUserIdQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/members/:user_id', ...(args ? [args] : [])] as const
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}
 */
export function usePutGuildsGuildIdMembersUserId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].members[':user_id'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}
 */
export function useDeleteGuildsGuildIdMembersUserId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id'].members[':user_id'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * PATCH /guilds/{guild_id}/members/{user_id}
 */
export function usePatchGuildsGuildIdMembersUserId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].members[':user_id'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function usePutGuildsGuildIdMembersUserIdRolesRoleId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$put(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdMembersUserIdRolesRoleId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/messages/search
 */
export function useGetGuildsGuildIdMessagesSearch(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdMessagesSearchQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].messages.search.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/messages/search
 */
export function getGetGuildsGuildIdMessagesSearchQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
) {
  return ['/guilds/:guild_id/messages/search', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/new-member-welcome
 */
export function useGetGuildsGuildIdNewMemberWelcome(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdNewMemberWelcomeQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['new-member-welcome'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/new-member-welcome
 */
export function getGetGuildsGuildIdNewMemberWelcomeQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
) {
  return ['/guilds/:guild_id/new-member-welcome', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/onboarding
 */
export function useGetGuildsGuildIdOnboarding(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdOnboardingQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].onboarding.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/onboarding
 */
export function getGetGuildsGuildIdOnboardingQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
) {
  return ['/guilds/:guild_id/onboarding', ...(args ? [args] : [])] as const
}

/**
 * PUT /guilds/{guild_id}/onboarding
 */
export function usePutGuildsGuildIdOnboarding(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].onboarding.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/preview
 */
export function useGetGuildsGuildIdPreview(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdPreviewQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].preview.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/preview
 */
export function getGetGuildsGuildIdPreviewQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
) {
  return ['/guilds/:guild_id/preview', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/prune
 */
export function useGetGuildsGuildIdPrune(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdPruneQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].prune.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/prune
 */
export function getGetGuildsGuildIdPruneQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
) {
  return ['/guilds/:guild_id/prune', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/prune
 */
export function usePostGuildsGuildIdPrune(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].prune.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/regions
 */
export function useGetGuildsGuildIdRegions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdRegionsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].regions.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/regions
 */
export function getGetGuildsGuildIdRegionsQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
) {
  return ['/guilds/:guild_id/regions', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/roles
 */
export function useGetGuildsGuildIdRoles(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdRolesQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].roles.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/roles
 */
export function getGetGuildsGuildIdRolesQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
) {
  return ['/guilds/:guild_id/roles', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/roles
 */
export function usePostGuildsGuildIdRoles(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].roles.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /guilds/{guild_id}/roles
 */
export function usePatchGuildsGuildIdRoles(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].roles.$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/roles/member-counts
 */
export function useGetGuildsGuildIdRolesMemberCounts(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdRolesMemberCountsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].roles['member-counts'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/roles/member-counts
 */
export function getGetGuildsGuildIdRolesMemberCountsQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
) {
  return ['/guilds/:guild_id/roles/member-counts', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/roles/{role_id}
 */
export function useGetGuildsGuildIdRolesRoleId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdRolesRoleIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].roles[':role_id'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/roles/{role_id}
 */
export function getGetGuildsGuildIdRolesRoleIdQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
) {
  return ['/guilds/:guild_id/roles/:role_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdRolesRoleId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].roles[':role_id'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /guilds/{guild_id}/roles/{role_id}
 */
export function usePatchGuildsGuildIdRolesRoleId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].roles[':role_id'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/scheduled-events
 */
export function useGetGuildsGuildIdScheduledEvents(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdScheduledEventsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['scheduled-events'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/scheduled-events
 */
export function getGetGuildsGuildIdScheduledEventsQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
) {
  return ['/guilds/:guild_id/scheduled-events', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/scheduled-events
 */
export function usePostGuildsGuildIdScheduledEvents(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id']['scheduled-events'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function useGetGuildsGuildIdScheduledEventsGuildScheduledEventId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$get(
            args,
            clientOptions,
          ),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(
  args?: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
) {
  return [
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function useDeleteGuildsGuildIdScheduledEventsGuildScheduledEventId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * PATCH /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function usePatchGuildsGuildIdScheduledEventsGuildScheduledEventId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$patch(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 */
export function useGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].users.$get(
            args,
            clientOptions,
          ),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(
  args?: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
) {
  return [
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /guilds/{guild_id}/soundboard-sounds
 */
export function useGetGuildsGuildIdSoundboardSounds(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdSoundboardSoundsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/soundboard-sounds
 */
export function getGetGuildsGuildIdSoundboardSoundsQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
) {
  return ['/guilds/:guild_id/soundboard-sounds', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/soundboard-sounds
 */
export function usePostGuildsGuildIdSoundboardSounds(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function useGetGuildsGuildIdSoundboardSoundsSoundId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdSoundboardSoundsSoundIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$get(args, clientOptions),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function getGetGuildsGuildIdSoundboardSoundsSoundIdQueryKey(
  args?: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
) {
  return ['/guilds/:guild_id/soundboard-sounds/:sound_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function useDeleteGuildsGuildIdSoundboardSoundsSoundId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * PATCH /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function usePatchGuildsGuildIdSoundboardSoundsSoundId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$patch(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/stickers
 */
export function useGetGuildsGuildIdStickers(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdStickersQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].stickers.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/stickers
 */
export function getGetGuildsGuildIdStickersQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
) {
  return ['/guilds/:guild_id/stickers', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/stickers
 */
export function usePostGuildsGuildIdStickers(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].stickers.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useGetGuildsGuildIdStickersStickerId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdStickersStickerIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].stickers[':sticker_id'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/stickers/{sticker_id}
 */
export function getGetGuildsGuildIdStickersStickerIdQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
) {
  return ['/guilds/:guild_id/stickers/:sticker_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useDeleteGuildsGuildIdStickersStickerId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id'].stickers[':sticker_id'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * PATCH /guilds/{guild_id}/stickers/{sticker_id}
 */
export function usePatchGuildsGuildIdStickersStickerId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id'].stickers[':sticker_id'].$patch(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/templates
 */
export function useGetGuildsGuildIdTemplates(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdTemplatesQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].templates.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/templates
 */
export function getGetGuildsGuildIdTemplatesQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
) {
  return ['/guilds/:guild_id/templates', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/templates
 */
export function usePostGuildsGuildIdTemplates(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].templates.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /guilds/{guild_id}/templates/{code}
 */
export function usePutGuildsGuildIdTemplatesCode(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].templates[':code'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /guilds/{guild_id}/templates/{code}
 */
export function useDeleteGuildsGuildIdTemplatesCode(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].templates[':code'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /guilds/{guild_id}/templates/{code}
 */
export function usePatchGuildsGuildIdTemplatesCode(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].templates[':code'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/threads/active
 */
export function useGetGuildsGuildIdThreadsActive(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdThreadsActiveQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].threads.active.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/threads/active
 */
export function getGetGuildsGuildIdThreadsActiveQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
) {
  return ['/guilds/:guild_id/threads/active', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/vanity-url
 */
export function useGetGuildsGuildIdVanityUrl(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdVanityUrlQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['vanity-url'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/vanity-url
 */
export function getGetGuildsGuildIdVanityUrlQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
) {
  return ['/guilds/:guild_id/vanity-url', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/voice-states/@me
 */
export function useGetGuildsGuildIdVoiceStatesMe(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdVoiceStatesMeQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/voice-states/@me
 */
export function getGetGuildsGuildIdVoiceStatesMeQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
) {
  return ['/guilds/:guild_id/voice-states/@me', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}/voice-states/@me
 */
export function usePatchGuildsGuildIdVoiceStatesMe(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id']['voice-states']['@me'].$patch(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/voice-states/{user_id}
 */
export function useGetGuildsGuildIdVoiceStatesUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdVoiceStatesUserIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.guilds[':guild_id']['voice-states'][':user_id'].$get(args, clientOptions),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/voice-states/{user_id}
 */
export function getGetGuildsGuildIdVoiceStatesUserIdQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/voice-states/:user_id', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}/voice-states/{user_id}
 */
export function usePatchGuildsGuildIdVoiceStatesUserId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.guilds[':guild_id']['voice-states'][':user_id'].$patch(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/webhooks
 */
export function useGetGuildsGuildIdWebhooks(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdWebhooksQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].webhooks.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/webhooks
 */
export function getGetGuildsGuildIdWebhooksQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
) {
  return ['/guilds/:guild_id/webhooks', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/welcome-screen
 */
export function useGetGuildsGuildIdWelcomeScreen(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdWelcomeScreenQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['welcome-screen'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/welcome-screen
 */
export function getGetGuildsGuildIdWelcomeScreenQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
) {
  return ['/guilds/:guild_id/welcome-screen', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}/welcome-screen
 */
export function usePatchGuildsGuildIdWelcomeScreen(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id']['welcome-screen'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/widget
 */
export function useGetGuildsGuildIdWidget(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdWidgetQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].widget.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/widget
 */
export function getGetGuildsGuildIdWidgetQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
) {
  return ['/guilds/:guild_id/widget', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}/widget
 */
export function usePatchGuildsGuildIdWidget(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.guilds[':guild_id'].widget.$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/widget.json
 */
export function useGetGuildsGuildIdWidgetJson(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdWidgetJsonQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['widget.json'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/widget.json
 */
export function getGetGuildsGuildIdWidgetJsonQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
) {
  return ['/guilds/:guild_id/widget.json', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/widget.png
 */
export function useGetGuildsGuildIdWidgetPng(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdWidgetPngQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['widget.png'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/widget.png
 */
export function getGetGuildsGuildIdWidgetPngQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
) {
  return ['/guilds/:guild_id/widget.png', ...(args ? [args] : [])] as const
}

/**
 * POST /interactions/{interaction_id}/{interaction_token}/callback
 */
export function usePostInteractionsInteractionIdInteractionTokenCallback(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.interactions[':interaction_id'][':interaction_token'].callback.$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /invites/{code}
 */
export function useGetInvitesCode(
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.invites)[':code']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetInvitesCodeQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.invites[':code'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /invites/{code}
 */
export function getGetInvitesCodeQueryKey(
  args?: InferRequestType<(typeof client.invites)[':code']['$get']>,
) {
  return ['/invites/:code', ...(args ? [args] : [])] as const
}

/**
 * DELETE /invites/{code}
 */
export function useDeleteInvitesCode(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.invites)[':code']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.invites)[':code']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.invites)[':code']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.invites)[':code']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.invites[':code'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /lobbies
 */
export function usePutLobbies(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.lobbies.$put> | undefined,
      Error,
      InferRequestType<typeof client.lobbies.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.lobbies.$put> | undefined,
    Error,
    InferRequestType<typeof client.lobbies.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.lobbies.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /lobbies
 */
export function usePostLobbies(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<typeof client.lobbies.$post> | undefined,
      Error,
      InferRequestType<typeof client.lobbies.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<typeof client.lobbies.$post> | undefined,
    Error,
    InferRequestType<typeof client.lobbies.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.lobbies.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /lobbies/{lobby_id}
 */
export function useGetLobbiesLobbyId(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.lobbies)[':lobby_id']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetLobbiesLobbyIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.lobbies[':lobby_id'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /lobbies/{lobby_id}
 */
export function getGetLobbiesLobbyIdQueryKey(
  args?: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
) {
  return ['/lobbies/:lobby_id', ...(args ? [args] : [])] as const
}

/**
 * PATCH /lobbies/{lobby_id}
 */
export function usePatchLobbiesLobbyId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.lobbies)[':lobby_id']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.lobbies[':lobby_id'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /lobbies/{lobby_id}/channel-linking
 */
export function usePatchLobbiesLobbyIdChannelLinking(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.lobbies[':lobby_id']['channel-linking'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /lobbies/{lobby_id}/members/@me
 */
export function useDeleteLobbiesLobbyIdMembersMe(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.lobbies[':lobby_id'].members['@me'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /lobbies/{lobby_id}/members/@me/invites
 */
export function usePostLobbiesLobbyIdMembersMeInvites(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.lobbies[':lobby_id'].members['@me'].invites.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * POST /lobbies/{lobby_id}/members/bulk
 */
export function usePostLobbiesLobbyIdMembersBulk(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.lobbies[':lobby_id'].members.bulk.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /lobbies/{lobby_id}/members/{user_id}
 */
export function usePutLobbiesLobbyIdMembersUserId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /lobbies/{lobby_id}/members/{user_id}
 */
export function useDeleteLobbiesLobbyIdMembersUserId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.lobbies[':lobby_id'].members[':user_id'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * POST /lobbies/{lobby_id}/members/{user_id}/invites
 */
export function usePostLobbiesLobbyIdMembersUserIdInvites(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.lobbies[':lobby_id'].members[':user_id'].invites.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /lobbies/{lobby_id}/messages
 */
export function useGetLobbiesLobbyIdMessages(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetLobbiesLobbyIdMessagesQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.lobbies[':lobby_id'].messages.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /lobbies/{lobby_id}/messages
 */
export function getGetLobbiesLobbyIdMessagesQueryKey(
  args?: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
) {
  return ['/lobbies/:lobby_id/messages', ...(args ? [args] : [])] as const
}

/**
 * POST /lobbies/{lobby_id}/messages
 */
export function usePostLobbiesLobbyIdMessages(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.lobbies[':lobby_id'].messages.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /oauth2/@me
 */
export function useGetOauth2Me(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.oauth2)['@me']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauth2MeQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.oauth2['@me'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /oauth2/@me
 */
export function getGetOauth2MeQueryKey() {
  return ['/oauth2/@me'] as const
}

/**
 * GET /oauth2/applications/@me
 */
export function useGetOauth2ApplicationsMe(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.oauth2.applications)['@me']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauth2ApplicationsMeQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.oauth2.applications['@me'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /oauth2/applications/@me
 */
export function getGetOauth2ApplicationsMeQueryKey() {
  return ['/oauth2/applications/@me'] as const
}

/**
 * GET /oauth2/keys
 */
export function useGetOauth2Keys(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.oauth2.keys.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauth2KeysQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.oauth2.keys.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /oauth2/keys
 */
export function getGetOauth2KeysQueryKey() {
  return ['/oauth2/keys'] as const
}

/**
 * GET /oauth2/userinfo
 */
export function useGetOauth2Userinfo(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.oauth2.userinfo.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauth2UserinfoQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.oauth2.userinfo.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /oauth2/userinfo
 */
export function getGetOauth2UserinfoQueryKey() {
  return ['/oauth2/userinfo'] as const
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge
 */
export function usePostPartnerSdkProvisionalAccountsUnmerge(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']
        >
      | undefined,
      Error,
      InferRequestType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['partner-sdk']['provisional-accounts'].unmerge.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge/bot
 */
export function usePostPartnerSdkProvisionalAccountsUnmergeBot(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['partner-sdk']['provisional-accounts'].unmerge.bot.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * POST /partner-sdk/token
 */
export function usePostPartnerSdkToken(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['partner-sdk']['token']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['partner-sdk']['token']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['partner-sdk']['token']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['partner-sdk']['token']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['partner-sdk'].token.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /partner-sdk/token/bot
 */
export function usePostPartnerSdkTokenBot(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['partner-sdk']['token']['bot']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['partner-sdk']['token']['bot']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['partner-sdk'].token.bot.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /soundboard-default-sounds
 */
export function useGetSoundboardDefaultSounds(
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client)['soundboard-default-sounds']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSoundboardDefaultSoundsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client['soundboard-default-sounds'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /soundboard-default-sounds
 */
export function getGetSoundboardDefaultSoundsQueryKey() {
  return ['/soundboard-default-sounds'] as const
}

/**
 * POST /stage-instances
 */
export function usePostStageInstances(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['stage-instances']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['stage-instances']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['stage-instances']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['stage-instances']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['stage-instances'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /stage-instances/{channel_id}
 */
export function useGetStageInstancesChannelId(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client)['stage-instances'][':channel_id']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStageInstancesChannelIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client['stage-instances'][':channel_id'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /stage-instances/{channel_id}
 */
export function getGetStageInstancesChannelIdQueryKey(
  args?: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
) {
  return ['/stage-instances/:channel_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /stage-instances/{channel_id}
 */
export function useDeleteStageInstancesChannelId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['stage-instances'][':channel_id']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['stage-instances'][':channel_id']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['stage-instances'][':channel_id'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /stage-instances/{channel_id}
 */
export function usePatchStageInstancesChannelId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client)['stage-instances'][':channel_id']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client)['stage-instances'][':channel_id']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['stage-instances'][':channel_id'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /sticker-packs
 */
export function useGetStickerPacks(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client)['sticker-packs']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStickerPacksQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client['sticker-packs'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /sticker-packs
 */
export function getGetStickerPacksQueryKey() {
  return ['/sticker-packs'] as const
}

/**
 * GET /sticker-packs/{pack_id}
 */
export function useGetStickerPacksPackId(
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStickerPacksPackIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client['sticker-packs'][':pack_id'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /sticker-packs/{pack_id}
 */
export function getGetStickerPacksPackIdQueryKey(
  args?: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
) {
  return ['/sticker-packs/:pack_id', ...(args ? [args] : [])] as const
}

/**
 * GET /stickers/{sticker_id}
 */
export function useGetStickersStickerId(
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.stickers)[':sticker_id']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStickersStickerIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.stickers[':sticker_id'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /stickers/{sticker_id}
 */
export function getGetStickersStickerIdQueryKey(
  args?: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
) {
  return ['/stickers/:sticker_id', ...(args ? [args] : [])] as const
}

/**
 * GET /users/@me
 */
export function useGetUsersMe(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.users)['@me']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersMeQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.users['@me'].$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /users/@me
 */
export function getGetUsersMeQueryKey() {
  return ['/users/@me'] as const
}

/**
 * PATCH /users/@me
 */
export function usePatchUsersMe(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.users)['@me']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.users)['@me']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.users)['@me']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.users)['@me']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.users['@me'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /users/@me/applications/{application_id}/entitlements
 */
export function useGetUsersMeApplicationsApplicationIdEntitlements(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersMeApplicationsApplicationIdEntitlementsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.users['@me'].applications[':application_id'].entitlements.$get(
            args,
            clientOptions,
          ),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /users/@me/applications/{application_id}/entitlements
 */
export function getGetUsersMeApplicationsApplicationIdEntitlementsQueryKey(
  args?: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
) {
  return ['/users/@me/applications/:application_id/entitlements', ...(args ? [args] : [])] as const
}

/**
 * GET /users/@me/applications/{application_id}/role-connection
 */
export function useGetUsersMeApplicationsApplicationIdRoleConnection(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersMeApplicationsApplicationIdRoleConnectionQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.users['@me'].applications[':application_id']['role-connection'].$get(
            args,
            clientOptions,
          ),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /users/@me/applications/{application_id}/role-connection
 */
export function getGetUsersMeApplicationsApplicationIdRoleConnectionQueryKey(
  args?: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
) {
  return [
    '/users/@me/applications/:application_id/role-connection',
    ...(args ? [args] : []),
  ] as const
}

/**
 * PUT /users/@me/applications/{application_id}/role-connection
 */
export function usePutUsersMeApplicationsApplicationIdRoleConnection(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.users['@me'].applications[':application_id']['role-connection'].$put(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /users/@me/applications/{application_id}/role-connection
 */
export function useDeleteUsersMeApplicationsApplicationIdRoleConnection(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.users['@me'].applications[':application_id']['role-connection'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * POST /users/@me/channels
 */
export function usePostUsersMeChannels(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.users)['@me']['channels']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.users)['@me']['channels']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.users)['@me']['channels']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.users)['@me']['channels']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.users['@me'].channels.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /users/@me/connections
 */
export function useGetUsersMeConnections(
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.users)['@me']['connections']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersMeConnectionsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.users['@me'].connections.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /users/@me/connections
 */
export function getGetUsersMeConnectionsQueryKey() {
  return ['/users/@me/connections'] as const
}

/**
 * GET /users/@me/guilds
 */
export function useGetUsersMeGuilds(
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.users)['@me']['guilds']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersMeGuildsQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.users['@me'].guilds.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /users/@me/guilds
 */
export function getGetUsersMeGuildsQueryKey(
  args?: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
) {
  return ['/users/@me/guilds', ...(args ? [args] : [])] as const
}

/**
 * DELETE /users/@me/guilds/{guild_id}
 */
export function useDeleteUsersMeGuildsGuildId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.users['@me'].guilds[':guild_id'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /users/@me/guilds/{guild_id}/member
 */
export function useGetUsersMeGuildsGuildIdMember(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersMeGuildsGuildIdMemberQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.users['@me'].guilds[':guild_id'].member.$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /users/@me/guilds/{guild_id}/member
 */
export function getGetUsersMeGuildsGuildIdMemberQueryKey(
  args?: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
) {
  return ['/users/@me/guilds/:guild_id/member', ...(args ? [args] : [])] as const
}

/**
 * GET /users/{user_id}
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.users)[':user_id']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.users[':user_id'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /users/{user_id}
 */
export function getGetUsersUserIdQueryKey(
  args?: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return ['/users/:user_id', ...(args ? [args] : [])] as const
}

/**
 * GET /voice/regions
 */
export function useGetVoiceRegions(
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<typeof client.voice.regions.$get>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetVoiceRegionsQueryKey()
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.voice.regions.$get(undefined, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /voice/regions
 */
export function getGetVoiceRegionsQueryKey() {
  return ['/voice/regions'] as const
}

/**
 * GET /webhooks/{webhook_id}
 */
export function useGetWebhooksWebhookId(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<InferResponseType<(typeof client.webhooks)[':webhook_id']['$get']>, Error>,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebhooksWebhookIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () => parseResponse(client.webhooks[':webhook_id'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}
 */
export function getGetWebhooksWebhookIdQueryKey(
  args?: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
) {
  return ['/webhooks/:webhook_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /webhooks/{webhook_id}
 */
export function useDeleteWebhooksWebhookId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.webhooks)[':webhook_id']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.webhooks)[':webhook_id']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.webhooks[':webhook_id'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /webhooks/{webhook_id}
 */
export function usePatchWebhooksWebhookId(
  options?: {
    mutation?: UseMutationOptions<
      InferResponseType<(typeof client.webhooks)[':webhook_id']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    InferResponseType<(typeof client.webhooks)[':webhook_id']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.webhooks[':webhook_id'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /webhooks/{webhook_id}/{webhook_token}
 */
export function useGetWebhooksWebhookIdWebhookToken(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebhooksWebhookIdWebhookTokenQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$get(args, clientOptions)),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}/{webhook_token}
 */
export function getGetWebhooksWebhookIdWebhookTokenQueryKey(
  args?: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
) {
  return ['/webhooks/:webhook_id/:webhook_token', ...(args ? [args] : [])] as const
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}
 */
export function usePostWebhooksWebhookIdWebhookToken(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}
 */
export function useDeleteWebhooksWebhookIdWebhookToken(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}
 */
export function usePatchWebhooksWebhookIdWebhookToken(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].$patch(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/github
 */
export function usePostWebhooksWebhookIdWebhookTokenGithub(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].github.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function useGetWebhooksWebhookIdWebhookTokenMessagesOriginal(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$get(
            args,
            clientOptions,
          ),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(
  args?: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
) {
  return [
    '/webhooks/:webhook_id/:webhook_token/messages/@original',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesOriginal(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function usePatchWebhooksWebhookIdWebhookTokenMessagesOriginal(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$patch(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function useGetWebhooksWebhookIdWebhookTokenMessagesMessageId(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
  options?: {
    query?: Omit<
      UseQueryOptions<
        InferResponseType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
        >,
        Error
      >,
      'queryKey' | 'queryFn' | 'initialData'
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(args)
  const query = useQuery(
    {
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$get(
            args,
            clientOptions,
          ),
        ),
      ...queryOptions,
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(
  args?: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
) {
  return [
    '/webhooks/:webhook_id/:webhook_token/messages/:message_id',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesMessageId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function usePatchWebhooksWebhookIdWebhookTokenMessagesMessageId(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$patch(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/slack
 */
export function usePostWebhooksWebhookIdWebhookTokenSlack(
  options?: {
    mutation?: UseMutationOptions<
      | InferResponseType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return useMutation<
    | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].slack.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}
