import type { CreateMutationOptions, CreateQueryOptions, QueryClient } from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discord-api-spec-openapi'

/**
 * GET /applications/@me
 */
export function createGetApplicationsMe(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.applications)['@me']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsMeQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.applications['@me'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /applications/@me
 */
export function getGetApplicationsMeQueryKey() {
  return ['/applications/@me'] as const
}

/**
 * PATCH /applications/@me
 */
export function createPatchApplicationsMe(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.applications)['@me']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.applications)['@me']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetApplicationsApplicationId(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.applications)[':application_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.applications[':application_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /applications/{application_id}
 */
export function getGetApplicationsApplicationIdQueryKey(
  args?: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
) {
  return ['/applications/:application_id', ...(args ? [args] : [])] as const
}

/**
 * PATCH /applications/{application_id}
 */
export function createPatchApplicationsApplicationId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.applications)[':application_id']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.applications)[':application_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetApplicationsApplicationIdActivityInstancesInstanceId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id']['activity-instances'][':instance_id'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /applications/{application_id}/activity-instances/{instance_id}
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
export function createPostApplicationsApplicationIdAttachment(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.applications)[':application_id']['attachment']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.applications)[':application_id']['attachment']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetApplicationsApplicationIdCommands(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.applications)[':application_id']['commands']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdCommandsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.applications[':application_id'].commands.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /applications/{application_id}/commands
 */
export function getGetApplicationsApplicationIdCommandsQueryKey(
  args?: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
) {
  return ['/applications/:application_id/commands', ...(args ? [args] : [])] as const
}

/**
 * PUT /applications/{application_id}/commands
 */
export function createPutApplicationsApplicationIdCommands(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.applications)[':application_id']['commands']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostApplicationsApplicationIdCommands(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.applications)[':application_id']['commands']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetApplicationsApplicationIdCommandsCommandId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdCommandsCommandIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].commands[':command_id'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /applications/{application_id}/commands/{command_id}
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
export function createDeleteApplicationsApplicationIdCommandsCommandId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPatchApplicationsApplicationIdCommandsCommandId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetApplicationsApplicationIdEmojis(
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.applications)[':application_id']['emojis']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdEmojisQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.applications[':application_id'].emojis.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /applications/{application_id}/emojis
 */
export function getGetApplicationsApplicationIdEmojisQueryKey(
  args?: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
) {
  return ['/applications/:application_id/emojis', ...(args ? [args] : [])] as const
}

/**
 * POST /applications/{application_id}/emojis
 */
export function createPostApplicationsApplicationIdEmojis(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.applications)[':application_id']['emojis']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetApplicationsApplicationIdEmojisEmojiId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdEmojisEmojiIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].emojis[':emoji_id'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /applications/{application_id}/emojis/{emoji_id}
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
export function createDeleteApplicationsApplicationIdEmojisEmojiId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPatchApplicationsApplicationIdEmojisEmojiId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetApplicationsApplicationIdEntitlements(
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdEntitlementsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].entitlements.$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /applications/{application_id}/entitlements
 */
export function getGetApplicationsApplicationIdEntitlementsQueryKey(
  args?: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
) {
  return ['/applications/:application_id/entitlements', ...(args ? [args] : [])] as const
}

/**
 * POST /applications/{application_id}/entitlements
 */
export function createPostApplicationsApplicationIdEntitlements(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.applications)[':application_id']['entitlements']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetApplicationsApplicationIdEntitlementsEntitlementId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].entitlements[':entitlement_id'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /applications/{application_id}/entitlements/{entitlement_id}
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
export function createDeleteApplicationsApplicationIdEntitlementsEntitlementId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPostApplicationsApplicationIdEntitlementsEntitlementIdConsume(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetApplicationsApplicationIdGuildsGuildIdCommands(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands.$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands
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
export function createPutApplicationsApplicationIdGuildsGuildIdCommands(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPostApplicationsApplicationIdGuildsGuildIdCommands(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetApplicationsApplicationIdGuildsGuildIdCommandsPermissions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands.permissions.$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
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
export function createGetApplicationsApplicationIdGuildsGuildIdCommandsCommandId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
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
export function createDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands[
            ':command_id'
          ].permissions.$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
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
export function createPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetApplicationsApplicationIdRoleConnectionsMetadata(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetApplicationsApplicationIdRoleConnectionsMetadataQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.applications[':application_id']['role-connections'].metadata.$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /applications/{application_id}/role-connections/metadata
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
export function createPutApplicationsApplicationIdRoleConnectionsMetadata(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetChannelsChannelId(
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.channels[':channel_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /channels/{channel_id}
 */
export function getGetChannelsChannelIdQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
) {
  return ['/channels/:channel_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /channels/{channel_id}
 */
export function createDeleteChannelsChannelId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPatchChannelsChannelId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostChannelsChannelIdFollowers(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['followers']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetChannelsChannelIdInvites(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['invites']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdInvitesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels[':channel_id'].invites.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /channels/{channel_id}/invites
 */
export function getGetChannelsChannelIdInvitesQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
) {
  return ['/channels/:channel_id/invites', ...(args ? [args] : [])] as const
}

/**
 * POST /channels/{channel_id}/invites
 */
export function createPostChannelsChannelIdInvites(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['invites']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetChannelsChannelIdMessages(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['messages']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdMessagesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels[':channel_id'].messages.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /channels/{channel_id}/messages
 */
export function getGetChannelsChannelIdMessagesQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
) {
  return ['/channels/:channel_id/messages', ...(args ? [args] : [])] as const
}

/**
 * POST /channels/{channel_id}/messages
 */
export function createPostChannelsChannelIdMessages(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['messages']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostChannelsChannelIdMessagesBulkDelete(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetChannelsChannelIdMessagesPins(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdMessagesPinsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels[':channel_id'].messages.pins.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /channels/{channel_id}/messages/pins
 */
export function getGetChannelsChannelIdMessagesPinsQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
) {
  return ['/channels/:channel_id/messages/pins', ...(args ? [args] : [])] as const
}

/**
 * PUT /channels/{channel_id}/messages/pins/{message_id}
 */
export function createPutChannelsChannelIdMessagesPinsMessageId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createDeleteChannelsChannelIdMessagesPinsMessageId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetChannelsChannelIdMessagesMessageId(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdMessagesMessageIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /channels/{channel_id}/messages/{message_id}
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
export function createDeleteChannelsChannelIdMessagesMessageId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPatchChannelsChannelIdMessagesMessageId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPostChannelsChannelIdMessagesMessageIdCrosspost(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createDeleteChannelsChannelIdMessagesMessageIdReactions(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetChannelsChannelIdMessagesMessageIdReactionsEmojiName(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
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
export function createDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiName(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPostChannelsChannelIdMessagesMessageIdThreads(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPutChannelsChannelIdPermissionsOverwriteId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createDeleteChannelsChannelIdPermissionsOverwriteId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetChannelsChannelIdPins(
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['pins']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdPinsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels[':channel_id'].pins.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /channels/{channel_id}/pins
 */
export function getGetChannelsChannelIdPinsQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
) {
  return ['/channels/:channel_id/pins', ...(args ? [args] : [])] as const
}

/**
 * PUT /channels/{channel_id}/pins/{message_id}
 */
export function createPutChannelsChannelIdPinsMessageId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteChannelsChannelIdPinsMessageId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetChannelsChannelIdPollsMessageIdAnswersAnswerId(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.channels[':channel_id'].polls[':message_id'].answers[':answer_id'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
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
export function createPostChannelsChannelIdPollsMessageIdExpire(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPutChannelsChannelIdRecipientsUserId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteChannelsChannelIdRecipientsUserId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPostChannelsChannelIdSendSoundboardSound(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetChannelsChannelIdThreadMembers(
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdThreadMembersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels[':channel_id']['thread-members'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /channels/{channel_id}/thread-members
 */
export function getGetChannelsChannelIdThreadMembersQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
) {
  return ['/channels/:channel_id/thread-members', ...(args ? [args] : [])] as const
}

/**
 * PUT /channels/{channel_id}/thread-members/@me
 */
export function createPutChannelsChannelIdThreadMembersMe(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteChannelsChannelIdThreadMembersMe(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetChannelsChannelIdThreadMembersUserId(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdThreadMembersUserIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.channels[':channel_id']['thread-members'][':user_id'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /channels/{channel_id}/thread-members/{user_id}
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
export function createPutChannelsChannelIdThreadMembersUserId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createDeleteChannelsChannelIdThreadMembersUserId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPostChannelsChannelIdThreads(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['threads']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetChannelsChannelIdThreadsArchivedPrivate(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdThreadsArchivedPrivateQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.channels[':channel_id'].threads.archived.private.$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /channels/{channel_id}/threads/archived/private
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
export function createGetChannelsChannelIdThreadsArchivedPublic(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdThreadsArchivedPublicQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.channels[':channel_id'].threads.archived.public.$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /channels/{channel_id}/threads/archived/public
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
export function createGetChannelsChannelIdThreadsSearch(
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdThreadsSearchQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels[':channel_id'].threads.search.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /channels/{channel_id}/threads/search
 */
export function getGetChannelsChannelIdThreadsSearchQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
) {
  return ['/channels/:channel_id/threads/search', ...(args ? [args] : [])] as const
}

/**
 * POST /channels/{channel_id}/typing
 */
export function createPostChannelsChannelIdTyping(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['typing']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetChannelsChannelIdUsersMeThreadsArchivedPrivate(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.channels[':channel_id'].users['@me'].threads.archived.private.$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /channels/{channel_id}/users/@me/threads/archived/private
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
export function createGetChannelsChannelIdWebhooks(
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChannelsChannelIdWebhooksQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.channels[':channel_id'].webhooks.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /channels/{channel_id}/webhooks
 */
export function getGetChannelsChannelIdWebhooksQueryKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
) {
  return ['/channels/:channel_id/webhooks', ...(args ? [args] : [])] as const
}

/**
 * POST /channels/{channel_id}/webhooks
 */
export function createPostChannelsChannelIdWebhooks(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGateway(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.gateway.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGatewayQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.gateway.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /gateway
 */
export function getGetGatewayQueryKey() {
  return ['/gateway'] as const
}

/**
 * GET /gateway/bot
 */
export function createGetGatewayBot(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.gateway.bot.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGatewayBotQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.gateway.bot.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /gateway/bot
 */
export function getGetGatewayBotQueryKey() {
  return ['/gateway/bot'] as const
}

/**
 * GET /guilds/templates/{code}
 */
export function createGetGuildsTemplatesCode(
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds.templates)[':code']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsTemplatesCodeQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds.templates[':code'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/templates/{code}
 */
export function getGetGuildsTemplatesCodeQueryKey(
  args?: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
) {
  return ['/guilds/templates/:code', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}
 */
export function createGetGuildsGuildId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.guilds[':guild_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}
 */
export function getGetGuildsGuildIdQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
) {
  return ['/guilds/:guild_id', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}
 */
export function createPatchGuildsGuildId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdAuditLogs(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdAuditLogsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['audit-logs'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/audit-logs
 */
export function getGetGuildsGuildIdAuditLogsQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
) {
  return ['/guilds/:guild_id/audit-logs', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/auto-moderation/rules
 */
export function createGetGuildsGuildIdAutoModerationRules(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdAutoModerationRulesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.guilds[':guild_id']['auto-moderation'].rules.$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/auto-moderation/rules
 */
export function getGetGuildsGuildIdAutoModerationRulesQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
) {
  return ['/guilds/:guild_id/auto-moderation/rules', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/auto-moderation/rules
 */
export function createPostGuildsGuildIdAutoModerationRules(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdAutoModerationRulesRuleId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdAutoModerationRulesRuleIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
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
export function createDeleteGuildsGuildIdAutoModerationRulesRuleId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPatchGuildsGuildIdAutoModerationRulesRuleId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetGuildsGuildIdBans(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdBansQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.guilds[':guild_id'].bans.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/bans
 */
export function getGetGuildsGuildIdBansQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
) {
  return ['/guilds/:guild_id/bans', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/bans/{user_id}
 */
export function createGetGuildsGuildIdBansUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdBansUserIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].bans[':user_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/bans/{user_id}
 */
export function getGetGuildsGuildIdBansUserIdQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/bans/:user_id', ...(args ? [args] : [])] as const
}

/**
 * PUT /guilds/{guild_id}/bans/{user_id}
 */
export function createPutGuildsGuildIdBansUserId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteGuildsGuildIdBansUserId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostGuildsGuildIdBulkBan(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdChannels(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdChannelsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].channels.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/channels
 */
export function getGetGuildsGuildIdChannelsQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
) {
  return ['/guilds/:guild_id/channels', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/channels
 */
export function createPostGuildsGuildIdChannels(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPatchGuildsGuildIdChannels(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdEmojis(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdEmojisQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].emojis.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/emojis
 */
export function getGetGuildsGuildIdEmojisQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
) {
  return ['/guilds/:guild_id/emojis', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/emojis
 */
export function createPostGuildsGuildIdEmojis(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdEmojisEmojiId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdEmojisEmojiIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/emojis/{emoji_id}
 */
export function getGetGuildsGuildIdEmojisEmojiIdQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
) {
  return ['/guilds/:guild_id/emojis/:emoji_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/emojis/{emoji_id}
 */
export function createDeleteGuildsGuildIdEmojisEmojiId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPatchGuildsGuildIdEmojisEmojiId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdIntegrations(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdIntegrationsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].integrations.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/integrations
 */
export function getGetGuildsGuildIdIntegrationsQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
) {
  return ['/guilds/:guild_id/integrations', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/integrations/{integration_id}
 */
export function createDeleteGuildsGuildIdIntegrationsIntegrationId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetGuildsGuildIdInvites(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdInvitesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].invites.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/invites
 */
export function getGetGuildsGuildIdInvitesQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
) {
  return ['/guilds/:guild_id/invites', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/members
 */
export function createGetGuildsGuildIdMembers(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['members']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdMembersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].members.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/members
 */
export function getGetGuildsGuildIdMembersQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
) {
  return ['/guilds/:guild_id/members', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}/members/@me
 */
export function createPatchGuildsGuildIdMembersMe(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdMembersSearch(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdMembersSearchQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].members.search.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/members/search
 */
export function getGetGuildsGuildIdMembersSearchQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
) {
  return ['/guilds/:guild_id/members/search', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/members/{user_id}
 */
export function createGetGuildsGuildIdMembersUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdMembersUserIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].members[':user_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/members/{user_id}
 */
export function getGetGuildsGuildIdMembersUserIdQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/members/:user_id', ...(args ? [args] : [])] as const
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}
 */
export function createPutGuildsGuildIdMembersUserId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteGuildsGuildIdMembersUserId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPatchGuildsGuildIdMembersUserId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPutGuildsGuildIdMembersUserIdRolesRoleId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createDeleteGuildsGuildIdMembersUserIdRolesRoleId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
 * GET /guilds/{guild_id}/new-member-welcome
 */
export function createGetGuildsGuildIdNewMemberWelcome(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdNewMemberWelcomeQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['new-member-welcome'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/new-member-welcome
 */
export function getGetGuildsGuildIdNewMemberWelcomeQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
) {
  return ['/guilds/:guild_id/new-member-welcome', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/onboarding
 */
export function createGetGuildsGuildIdOnboarding(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdOnboardingQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].onboarding.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/onboarding
 */
export function getGetGuildsGuildIdOnboardingQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
) {
  return ['/guilds/:guild_id/onboarding', ...(args ? [args] : [])] as const
}

/**
 * PUT /guilds/{guild_id}/onboarding
 */
export function createPutGuildsGuildIdOnboarding(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdPreview(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdPreviewQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].preview.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/preview
 */
export function getGetGuildsGuildIdPreviewQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
) {
  return ['/guilds/:guild_id/preview', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/prune
 */
export function createGetGuildsGuildIdPrune(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdPruneQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].prune.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/prune
 */
export function getGetGuildsGuildIdPruneQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
) {
  return ['/guilds/:guild_id/prune', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/prune
 */
export function createPostGuildsGuildIdPrune(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdRegions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdRegionsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].regions.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/regions
 */
export function getGetGuildsGuildIdRegionsQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
) {
  return ['/guilds/:guild_id/regions', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/roles
 */
export function createGetGuildsGuildIdRoles(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdRolesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].roles.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/roles
 */
export function getGetGuildsGuildIdRolesQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
) {
  return ['/guilds/:guild_id/roles', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/roles
 */
export function createPostGuildsGuildIdRoles(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPatchGuildsGuildIdRoles(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
 * GET /guilds/{guild_id}/roles/{role_id}
 */
export function createGetGuildsGuildIdRolesRoleId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdRolesRoleIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].roles[':role_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/roles/{role_id}
 */
export function getGetGuildsGuildIdRolesRoleIdQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
) {
  return ['/guilds/:guild_id/roles/:role_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/roles/{role_id}
 */
export function createDeleteGuildsGuildIdRolesRoleId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPatchGuildsGuildIdRolesRoleId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdScheduledEvents(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdScheduledEventsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['scheduled-events'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/scheduled-events
 */
export function getGetGuildsGuildIdScheduledEventsQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
) {
  return ['/guilds/:guild_id/scheduled-events', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/scheduled-events
 */
export function createPostGuildsGuildIdScheduledEvents(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdScheduledEventsGuildScheduledEventId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
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
export function createDeleteGuildsGuildIdScheduledEventsGuildScheduledEventId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPatchGuildsGuildIdScheduledEventsGuildScheduledEventId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].users.$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
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
export function createGetGuildsGuildIdSoundboardSounds(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdSoundboardSoundsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/soundboard-sounds
 */
export function getGetGuildsGuildIdSoundboardSoundsQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
) {
  return ['/guilds/:guild_id/soundboard-sounds', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/soundboard-sounds
 */
export function createPostGuildsGuildIdSoundboardSounds(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdSoundboardSoundsSoundId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdSoundboardSoundsSoundIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
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
export function createDeleteGuildsGuildIdSoundboardSoundsSoundId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPatchGuildsGuildIdSoundboardSoundsSoundId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetGuildsGuildIdStickers(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdStickersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].stickers.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/stickers
 */
export function getGetGuildsGuildIdStickersQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
) {
  return ['/guilds/:guild_id/stickers', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/stickers
 */
export function createPostGuildsGuildIdStickers(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdStickersStickerId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdStickersStickerIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].stickers[':sticker_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/stickers/{sticker_id}
 */
export function getGetGuildsGuildIdStickersStickerIdQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
) {
  return ['/guilds/:guild_id/stickers/:sticker_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/stickers/{sticker_id}
 */
export function createDeleteGuildsGuildIdStickersStickerId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPatchGuildsGuildIdStickersStickerId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdTemplates(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdTemplatesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].templates.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/templates
 */
export function getGetGuildsGuildIdTemplatesQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
) {
  return ['/guilds/:guild_id/templates', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/templates
 */
export function createPostGuildsGuildIdTemplates(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPutGuildsGuildIdTemplatesCode(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteGuildsGuildIdTemplatesCode(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPatchGuildsGuildIdTemplatesCode(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdThreadsActive(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdThreadsActiveQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].threads.active.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/threads/active
 */
export function getGetGuildsGuildIdThreadsActiveQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
) {
  return ['/guilds/:guild_id/threads/active', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/vanity-url
 */
export function createGetGuildsGuildIdVanityUrl(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdVanityUrlQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['vanity-url'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/vanity-url
 */
export function getGetGuildsGuildIdVanityUrlQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
) {
  return ['/guilds/:guild_id/vanity-url', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/voice-states/@me
 */
export function createGetGuildsGuildIdVoiceStatesMe(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdVoiceStatesMeQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/voice-states/@me
 */
export function getGetGuildsGuildIdVoiceStatesMeQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
) {
  return ['/guilds/:guild_id/voice-states/@me', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}/voice-states/@me
 */
export function createPatchGuildsGuildIdVoiceStatesMe(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdVoiceStatesUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdVoiceStatesUserIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.guilds[':guild_id']['voice-states'][':user_id'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/voice-states/{user_id}
 */
export function getGetGuildsGuildIdVoiceStatesUserIdQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/voice-states/:user_id', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}/voice-states/{user_id}
 */
export function createPatchGuildsGuildIdVoiceStatesUserId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdWebhooks(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdWebhooksQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].webhooks.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/webhooks
 */
export function getGetGuildsGuildIdWebhooksQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
) {
  return ['/guilds/:guild_id/webhooks', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/welcome-screen
 */
export function createGetGuildsGuildIdWelcomeScreen(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdWelcomeScreenQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['welcome-screen'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/welcome-screen
 */
export function getGetGuildsGuildIdWelcomeScreenQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
) {
  return ['/guilds/:guild_id/welcome-screen', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}/welcome-screen
 */
export function createPatchGuildsGuildIdWelcomeScreen(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdWidget(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdWidgetQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].widget.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/widget
 */
export function getGetGuildsGuildIdWidgetQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
) {
  return ['/guilds/:guild_id/widget', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}/widget
 */
export function createPatchGuildsGuildIdWidget(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetGuildsGuildIdWidgetJson(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdWidgetJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['widget.json'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/widget.json
 */
export function getGetGuildsGuildIdWidgetJsonQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
) {
  return ['/guilds/:guild_id/widget.json', ...(args ? [args] : [])] as const
}

/**
 * GET /guilds/{guild_id}/widget.png
 */
export function createGetGuildsGuildIdWidgetPng(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdWidgetPngQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id']['widget.png'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/widget.png
 */
export function getGetGuildsGuildIdWidgetPngQueryKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
) {
  return ['/guilds/:guild_id/widget.png', ...(args ? [args] : [])] as const
}

/**
 * POST /interactions/{interaction_id}/{interaction_token}/callback
 */
export function createPostInteractionsInteractionIdInteractionTokenCallback(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetInvitesCode(
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.invites)[':code']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetInvitesCodeQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.invites[':code'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /invites/{code}
 */
export function getGetInvitesCodeQueryKey(
  args?: InferRequestType<(typeof client.invites)[':code']['$get']>,
) {
  return ['/invites/:code', ...(args ? [args] : [])] as const
}

/**
 * DELETE /invites/{code}
 */
export function createDeleteInvitesCode(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.invites)[':code']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.invites)[':code']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPutLobbies(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.lobbies.$put> | undefined,
      Error,
      InferRequestType<typeof client.lobbies.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostLobbies(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.lobbies.$post> | undefined,
      Error,
      InferRequestType<typeof client.lobbies.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetLobbiesLobbyId(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.lobbies)[':lobby_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetLobbiesLobbyIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.lobbies[':lobby_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /lobbies/{lobby_id}
 */
export function getGetLobbiesLobbyIdQueryKey(
  args?: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
) {
  return ['/lobbies/:lobby_id', ...(args ? [args] : [])] as const
}

/**
 * PATCH /lobbies/{lobby_id}
 */
export function createPatchLobbiesLobbyId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.lobbies)[':lobby_id']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPatchLobbiesLobbyIdChannelLinking(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteLobbiesLobbyIdMembersMe(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostLobbiesLobbyIdMembersMeInvites(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPostLobbiesLobbyIdMembersBulk(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPutLobbiesLobbyIdMembersUserId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
      | undefined,
      Error,
      InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteLobbiesLobbyIdMembersUserId(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostLobbiesLobbyIdMembersUserIdInvites(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetLobbiesLobbyIdMessages(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetLobbiesLobbyIdMessagesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.lobbies[':lobby_id'].messages.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /lobbies/{lobby_id}/messages
 */
export function getGetLobbiesLobbyIdMessagesQueryKey(
  args?: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
) {
  return ['/lobbies/:lobby_id/messages', ...(args ? [args] : [])] as const
}

/**
 * POST /lobbies/{lobby_id}/messages
 */
export function createPostLobbiesLobbyIdMessages(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetOauth2Me(
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.oauth2)['@me']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauth2MeQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.oauth2['@me'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /oauth2/@me
 */
export function getGetOauth2MeQueryKey() {
  return ['/oauth2/@me'] as const
}

/**
 * GET /oauth2/applications/@me
 */
export function createGetOauth2ApplicationsMe(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.oauth2.applications)['@me']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauth2ApplicationsMeQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.oauth2.applications['@me'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /oauth2/applications/@me
 */
export function getGetOauth2ApplicationsMeQueryKey() {
  return ['/oauth2/applications/@me'] as const
}

/**
 * GET /oauth2/keys
 */
export function createGetOauth2Keys(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.oauth2.keys.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauth2KeysQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.oauth2.keys.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /oauth2/keys
 */
export function getGetOauth2KeysQueryKey() {
  return ['/oauth2/keys'] as const
}

/**
 * GET /oauth2/userinfo
 */
export function createGetOauth2Userinfo(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.oauth2.userinfo.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOauth2UserinfoQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.oauth2.userinfo.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /oauth2/userinfo
 */
export function getGetOauth2UserinfoQueryKey() {
  return ['/oauth2/userinfo'] as const
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge
 */
export function createPostPartnerSdkProvisionalAccountsUnmerge(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPostPartnerSdkProvisionalAccountsUnmergeBot(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPostPartnerSdkToken(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['partner-sdk']['token']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['partner-sdk']['token']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostPartnerSdkTokenBot(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['partner-sdk']['token']['bot']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetSoundboardDefaultSounds(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['soundboard-default-sounds']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSoundboardDefaultSoundsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['soundboard-default-sounds'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /soundboard-default-sounds
 */
export function getGetSoundboardDefaultSoundsQueryKey() {
  return ['/soundboard-default-sounds'] as const
}

/**
 * POST /stage-instances
 */
export function createPostStageInstances(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['stage-instances']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['stage-instances']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetStageInstancesChannelId(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['stage-instances'][':channel_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStageInstancesChannelIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['stage-instances'][':channel_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /stage-instances/{channel_id}
 */
export function getGetStageInstancesChannelIdQueryKey(
  args?: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
) {
  return ['/stage-instances/:channel_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /stage-instances/{channel_id}
 */
export function createDeleteStageInstancesChannelId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['stage-instances'][':channel_id']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPatchStageInstancesChannelId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['stage-instances'][':channel_id']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetStickerPacks(
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client)['sticker-packs']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStickerPacksQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['sticker-packs'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /sticker-packs
 */
export function getGetStickerPacksQueryKey() {
  return ['/sticker-packs'] as const
}

/**
 * GET /sticker-packs/{pack_id}
 */
export function createGetStickerPacksPackId(
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStickerPacksPackIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['sticker-packs'][':pack_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /sticker-packs/{pack_id}
 */
export function getGetStickerPacksPackIdQueryKey(
  args?: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
) {
  return ['/sticker-packs/:pack_id', ...(args ? [args] : [])] as const
}

/**
 * GET /stickers/{sticker_id}
 */
export function createGetStickersStickerId(
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.stickers)[':sticker_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStickersStickerIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.stickers[':sticker_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /stickers/{sticker_id}
 */
export function getGetStickersStickerIdQueryKey(
  args?: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
) {
  return ['/stickers/:sticker_id', ...(args ? [args] : [])] as const
}

/**
 * GET /users/@me
 */
export function createGetUsersMe(
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.users)['@me']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersMeQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users['@me'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/@me
 */
export function getGetUsersMeQueryKey() {
  return ['/users/@me'] as const
}

/**
 * PATCH /users/@me
 */
export function createPatchUsersMe(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.users)['@me']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.users)['@me']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetUsersMeApplicationsApplicationIdEntitlements(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersMeApplicationsApplicationIdEntitlementsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.users['@me'].applications[':application_id'].entitlements.$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/@me/applications/{application_id}/entitlements
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
export function createGetUsersMeApplicationsApplicationIdRoleConnection(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersMeApplicationsApplicationIdRoleConnectionQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.users['@me'].applications[':application_id']['role-connection'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/@me/applications/{application_id}/role-connection
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
export function createPutUsersMeApplicationsApplicationIdRoleConnection(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createDeleteUsersMeApplicationsApplicationIdRoleConnection(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPostUsersMeChannels(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.users)['@me']['channels']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.users)['@me']['channels']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetUsersMeConnections(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users)['@me']['connections']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersMeConnectionsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.users['@me'].connections.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/@me/connections
 */
export function getGetUsersMeConnectionsQueryKey() {
  return ['/users/@me/connections'] as const
}

/**
 * GET /users/@me/guilds
 */
export function createGetUsersMeGuilds(
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users)['@me']['guilds']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersMeGuildsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users['@me'].guilds.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/@me/guilds
 */
export function getGetUsersMeGuildsQueryKey(
  args?: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
) {
  return ['/users/@me/guilds', ...(args ? [args] : [])] as const
}

/**
 * DELETE /users/@me/guilds/{guild_id}
 */
export function createDeleteUsersMeGuildsGuildId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetUsersMeGuildsGuildIdMember(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersMeGuildsGuildIdMemberQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.users['@me'].guilds[':guild_id'].member.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/@me/guilds/{guild_id}/member
 */
export function getGetUsersMeGuildsGuildIdMemberQueryKey(
  args?: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
) {
  return ['/users/@me/guilds/:guild_id/member', ...(args ? [args] : [])] as const
}

/**
 * GET /users/{user_id}
 */
export function createGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.users)[':user_id']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users[':user_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/{user_id}
 */
export function getGetUsersUserIdQueryKey(
  args?: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return ['/users/:user_id', ...(args ? [args] : [])] as const
}

/**
 * GET /voice/regions
 */
export function createGetVoiceRegions(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.voice.regions.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetVoiceRegionsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.voice.regions.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /voice/regions
 */
export function getGetVoiceRegionsQueryKey() {
  return ['/voice/regions'] as const
}

/**
 * GET /webhooks/{webhook_id}
 */
export function createGetWebhooksWebhookId(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.webhooks)[':webhook_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebhooksWebhookIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.webhooks[':webhook_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /webhooks/{webhook_id}
 */
export function getGetWebhooksWebhookIdQueryKey(
  args?: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
) {
  return ['/webhooks/:webhook_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /webhooks/{webhook_id}
 */
export function createDeleteWebhooksWebhookId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.webhooks)[':webhook_id']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPatchWebhooksWebhookId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.webhooks)[':webhook_id']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createGetWebhooksWebhookIdWebhookToken(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebhooksWebhookIdWebhookTokenQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /webhooks/{webhook_id}/{webhook_token}
 */
export function getGetWebhooksWebhookIdWebhookTokenQueryKey(
  args?: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
) {
  return ['/webhooks/:webhook_id/:webhook_token', ...(args ? [args] : [])] as const
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}
 */
export function createPostWebhooksWebhookIdWebhookToken(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createDeleteWebhooksWebhookIdWebhookToken(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPatchWebhooksWebhookIdWebhookToken(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
      | undefined,
      Error,
      InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
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
export function createPostWebhooksWebhookIdWebhookTokenGithub(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetWebhooksWebhookIdWebhookTokenMessagesOriginal(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
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
export function createDeleteWebhooksWebhookIdWebhookTokenMessagesOriginal(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPatchWebhooksWebhookIdWebhookTokenMessagesOriginal(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createGetWebhooksWebhookIdWebhookTokenMessagesMessageId(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
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
export function createDeleteWebhooksWebhookIdWebhookTokenMessagesMessageId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPatchWebhooksWebhookIdWebhookTokenMessagesMessageId(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
export function createPostWebhooksWebhookIdWebhookTokenSlack(
  options?: {
    mutation?: CreateMutationOptions<
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
  return createMutation<
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
