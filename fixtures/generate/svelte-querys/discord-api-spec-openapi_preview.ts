import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discord-api-spec-openapi_preview'

/**
 * GET /applications/@me
 */
export function createGetApplicationsMe(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.applications)['@me']['$get']>,
      Error,
      InferResponseType<(typeof client.applications)['@me']['$get']>,
      readonly ['/applications/@me']
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.applications)['@me']['$patch']>) =>
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
      Error,
      InferResponseType<(typeof client.applications)[':application_id']['$get']>,
      readonly [
        '/applications/:application_id',
        InferRequestType<(typeof client.applications)[':application_id']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
) {
  return ['/applications/:application_id', args] as const
}

/**
 * PATCH /applications/{application_id}
 */
export function createPatchApplicationsApplicationId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.applications)[':application_id']['$patch']>,
      ) => parseResponse(client.applications[':application_id'].$patch(args, options?.client)),
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
      Error,
      InferResponseType<
        (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
      >,
      readonly [
        '/applications/:application_id/activity-instances/:instance_id',
        InferRequestType<
          (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
) {
  return ['/applications/:application_id/activity-instances/:instance_id', args] as const
}

/**
 * POST /applications/{application_id}/attachment
 */
export function createPostApplicationsApplicationIdAttachment(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.applications)[':application_id']['attachment']['$post']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.applications)[':application_id']['commands']['$get']>,
      readonly [
        '/applications/:application_id/commands',
        InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
) {
  return ['/applications/:application_id/commands', args] as const
}

/**
 * PUT /applications/{application_id}/commands
 */
export function createPutApplicationsApplicationIdCommands(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>,
      ) =>
        parseResponse(client.applications[':application_id'].commands.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /applications/{application_id}/commands
 */
export function createPostApplicationsApplicationIdCommands(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.applications)[':application_id']['commands']['$post']
        >,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
      >,
      readonly [
        '/applications/:application_id/commands/:command_id',
        InferRequestType<
          (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
) {
  return ['/applications/:application_id/commands/:command_id', args] as const
}

/**
 * DELETE /applications/{application_id}/commands/{command_id}
 */
export function createDeleteApplicationsApplicationIdCommandsCommandId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.applications)[':application_id']['emojis']['$get']>,
      readonly [
        '/applications/:application_id/emojis',
        InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
) {
  return ['/applications/:application_id/emojis', args] as const
}

/**
 * POST /applications/{application_id}/emojis
 */
export function createPostApplicationsApplicationIdEmojis(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
      >,
      readonly [
        '/applications/:application_id/emojis/:emoji_id',
        InferRequestType<
          (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
) {
  return ['/applications/:application_id/emojis/:emoji_id', args] as const
}

/**
 * DELETE /applications/{application_id}/emojis/{emoji_id}
 */
export function createDeleteApplicationsApplicationIdEmojisEmojiId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
      readonly [
        '/applications/:application_id/entitlements',
        InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
) {
  return ['/applications/:application_id/entitlements', args] as const
}

/**
 * POST /applications/{application_id}/entitlements
 */
export function createPostApplicationsApplicationIdEntitlements(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.applications)[':application_id']['entitlements']['$post']
        >,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
      >,
      readonly [
        '/applications/:application_id/entitlements/:entitlement_id',
        InferRequestType<
          (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
) {
  return ['/applications/:application_id/entitlements/:entitlement_id', args] as const
}

/**
 * DELETE /applications/{application_id}/entitlements/{entitlement_id}
 */
export function createDeleteApplicationsApplicationIdEntitlementsEntitlementId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
        >,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
      >,
      readonly [
        '/applications/:application_id/guilds/:guild_id/commands',
        InferRequestType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
) {
  return ['/applications/:application_id/guilds/:guild_id/commands', args] as const
}

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands
 */
export function createPutApplicationsApplicationIdGuildsGuildIdCommands(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
        >,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
      >,
      readonly [
        '/applications/:application_id/guilds/:guild_id/commands/permissions',
        InferRequestType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
) {
  return ['/applications/:application_id/guilds/:guild_id/commands/permissions', args] as const
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
      Error,
      InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
      >,
      readonly [
        '/applications/:application_id/guilds/:guild_id/commands/:command_id',
        InferRequestType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
) {
  return ['/applications/:application_id/guilds/:guild_id/commands/:command_id', args] as const
}

/**
 * DELETE /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function createDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
        >,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
      >,
      readonly [
        '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
        InferRequestType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
  >,
) {
  return [
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    args,
  ] as const
}

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 */
export function createPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
        >,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
      >,
      readonly [
        '/applications/:application_id/role-connections/metadata',
        InferRequestType<
          (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
) {
  return ['/applications/:application_id/role-connections/metadata', args] as const
}

/**
 * PUT /applications/{application_id}/role-connections/metadata
 */
export function createPutApplicationsApplicationIdRoleConnectionsMetadata(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.channels)[':channel_id']['$get']>,
      readonly [
        '/channels/:channel_id',
        InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
) {
  return ['/channels/:channel_id', args] as const
}

/**
 * DELETE /channels/{channel_id}
 */
export function createDeleteChannelsChannelId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.channels)[':channel_id']['$delete']>,
      ) => parseResponse(client.channels[':channel_id'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /channels/{channel_id}
 */
export function createPatchChannelsChannelId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.channels)[':channel_id']['$patch']>,
      ) => parseResponse(client.channels[':channel_id'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /channels/{channel_id}/followers
 */
export function createPostChannelsChannelIdFollowers(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>,
      ) => parseResponse(client.channels[':channel_id'].followers.$post(args, options?.client)),
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
      Error,
      InferResponseType<(typeof client.channels)[':channel_id']['invites']['$get']>,
      readonly [
        '/channels/:channel_id/invites',
        InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
) {
  return ['/channels/:channel_id/invites', args] as const
}

/**
 * POST /channels/{channel_id}/invites
 */
export function createPostChannelsChannelIdInvites(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>,
      ) => parseResponse(client.channels[':channel_id'].invites.$post(args, options?.client)),
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
      Error,
      InferResponseType<(typeof client.channels)[':channel_id']['messages']['$get']>,
      readonly [
        '/channels/:channel_id/messages',
        InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
) {
  return ['/channels/:channel_id/messages', args] as const
}

/**
 * POST /channels/{channel_id}/messages
 */
export function createPostChannelsChannelIdMessages(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>,
      ) => parseResponse(client.channels[':channel_id'].messages.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /channels/{channel_id}/messages/bulk-delete
 */
export function createPostChannelsChannelIdMessagesBulkDelete(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
      readonly [
        '/channels/:channel_id/messages/pins',
        InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
) {
  return ['/channels/:channel_id/messages/pins', args] as const
}

/**
 * PUT /channels/{channel_id}/messages/pins/{message_id}
 */
export function createPutChannelsChannelIdMessagesPinsMessageId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$get']>,
      readonly [
        '/channels/:channel_id/messages/:message_id',
        InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
) {
  return ['/channels/:channel_id/messages/:message_id', args] as const
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}
 */
export function createDeleteChannelsChannelIdMessagesMessageId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
        >,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
      >,
      readonly [
        '/channels/:channel_id/messages/:message_id/reactions/:emoji_name',
        InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
) {
  return ['/channels/:channel_id/messages/:message_id/reactions/:emoji_name', args] as const
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 */
export function createDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiName(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.channels)[':channel_id']['pins']['$get']>,
      readonly [
        '/channels/:channel_id/pins',
        InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
) {
  return ['/channels/:channel_id/pins', args] as const
}

/**
 * PUT /channels/{channel_id}/pins/{message_id}
 */
export function createPutChannelsChannelIdPinsMessageId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['pins'][':message_id']['$put']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']
        >,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
      >,
      readonly [
        '/channels/:channel_id/polls/:message_id/answers/:answer_id',
        InferRequestType<
          (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
) {
  return ['/channels/:channel_id/polls/:message_id/answers/:answer_id', args] as const
}

/**
 * POST /channels/{channel_id}/polls/{message_id}/expire
 */
export function createPostChannelsChannelIdPollsMessageIdExpire(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
      readonly [
        '/channels/:channel_id/thread-members',
        InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
) {
  return ['/channels/:channel_id/thread-members', args] as const
}

/**
 * PUT /channels/{channel_id}/thread-members/@me
 */
export function createPutChannelsChannelIdThreadMembersMe(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['thread-members']['@me']['$put']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
        >,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
      >,
      readonly [
        '/channels/:channel_id/thread-members/:user_id',
        InferRequestType<
          (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
) {
  return ['/channels/:channel_id/thread-members/:user_id', args] as const
}

/**
 * PUT /channels/{channel_id}/thread-members/{user_id}
 */
export function createPutChannelsChannelIdThreadMembersUserId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>,
      ) => parseResponse(client.channels[':channel_id'].threads.$post(args, options?.client)),
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
      Error,
      InferResponseType<
        (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
      >,
      readonly [
        '/channels/:channel_id/threads/archived/private',
        InferRequestType<
          (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
) {
  return ['/channels/:channel_id/threads/archived/private', args] as const
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
      Error,
      InferResponseType<
        (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
      >,
      readonly [
        '/channels/:channel_id/threads/archived/public',
        InferRequestType<
          (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
) {
  return ['/channels/:channel_id/threads/archived/public', args] as const
}

/**
 * GET /channels/{channel_id}/threads/search
 */
export function createGetChannelsChannelIdThreadsSearch(
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
      Error,
      InferResponseType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
      readonly [
        '/channels/:channel_id/threads/search',
        InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
) {
  return ['/channels/:channel_id/threads/search', args] as const
}

/**
 * POST /channels/{channel_id}/typing
 */
export function createPostChannelsChannelIdTyping(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>,
      ) => parseResponse(client.channels[':channel_id'].typing.$post(args, options?.client)),
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
      Error,
      InferResponseType<
        (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
      >,
      readonly [
        '/channels/:channel_id/users/@me/threads/archived/private',
        InferRequestType<
          (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
) {
  return ['/channels/:channel_id/users/@me/threads/archived/private', args] as const
}

/**
 * GET /channels/{channel_id}/webhooks
 */
export function createGetChannelsChannelIdWebhooks(
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
      Error,
      InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
      readonly [
        '/channels/:channel_id/webhooks',
        InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
) {
  return ['/channels/:channel_id/webhooks', args] as const
}

/**
 * POST /channels/{channel_id}/webhooks
 */
export function createPostChannelsChannelIdWebhooks(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>,
      ) => parseResponse(client.channels[':channel_id'].webhooks.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /gateway
 */
export function createGetGateway(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.gateway.$get>,
      Error,
      InferResponseType<typeof client.gateway.$get>,
      readonly ['/gateway']
    >
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
    query?: CreateQueryOptions<
      InferResponseType<typeof client.gateway.bot.$get>,
      Error,
      InferResponseType<typeof client.gateway.bot.$get>,
      readonly ['/gateway/bot']
    >
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
      Error,
      InferResponseType<(typeof client.guilds.templates)[':code']['$get']>,
      readonly [
        '/guilds/templates/:code',
        InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
) {
  return ['/guilds/templates/:code', args] as const
}

/**
 * GET /guilds/{guild_id}
 */
export function createGetGuildsGuildId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['$get']>,
      readonly ['/guilds/:guild_id', InferRequestType<(typeof client.guilds)[':guild_id']['$get']>]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
) {
  return ['/guilds/:guild_id', args] as const
}

/**
 * PATCH /guilds/{guild_id}
 */
export function createPatchGuildsGuildId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>) =>
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
      readonly [
        '/guilds/:guild_id/audit-logs',
        InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
) {
  return ['/guilds/:guild_id/audit-logs', args] as const
}

/**
 * GET /guilds/{guild_id}/auto-moderation/rules
 */
export function createGetGuildsGuildIdAutoModerationRules(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
      readonly [
        '/guilds/:guild_id/auto-moderation/rules',
        InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
) {
  return ['/guilds/:guild_id/auto-moderation/rules', args] as const
}

/**
 * POST /guilds/{guild_id}/auto-moderation/rules
 */
export function createPostGuildsGuildIdAutoModerationRules(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']
        >,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
      >,
      readonly [
        '/guilds/:guild_id/auto-moderation/rules/:rule_id',
        InferRequestType<
          (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
) {
  return ['/guilds/:guild_id/auto-moderation/rules/:rule_id', args] as const
}

/**
 * DELETE /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function createDeleteGuildsGuildIdAutoModerationRulesRuleId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
      readonly [
        '/guilds/:guild_id/bans',
        InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
) {
  return ['/guilds/:guild_id/bans', args] as const
}

/**
 * GET /guilds/{guild_id}/bans/{user_id}
 */
export function createGetGuildsGuildIdBansUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
      readonly [
        '/guilds/:guild_id/bans/:user_id',
        InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/bans/:user_id', args] as const
}

/**
 * PUT /guilds/{guild_id}/bans/{user_id}
 */
export function createPutGuildsGuildIdBansUserId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>,
      ) => parseResponse(client.guilds[':guild_id'].bans[':user_id'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /guilds/{guild_id}/bans/{user_id}
 */
export function createDeleteGuildsGuildIdBansUserId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>,
      ) =>
        parseResponse(client.guilds[':guild_id'].bans[':user_id'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /guilds/{guild_id}/bulk-ban
 */
export function createPostGuildsGuildIdBulkBan(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>,
      ) => parseResponse(client.guilds[':guild_id']['bulk-ban'].$post(args, options?.client)),
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
      readonly [
        '/guilds/:guild_id/channels',
        InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
) {
  return ['/guilds/:guild_id/channels', args] as const
}

/**
 * POST /guilds/{guild_id}/channels
 */
export function createPostGuildsGuildIdChannels(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>,
      ) => parseResponse(client.guilds[':guild_id'].channels.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /guilds/{guild_id}/channels
 */
export function createPatchGuildsGuildIdChannels(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>,
      ) => parseResponse(client.guilds[':guild_id'].channels.$patch(args, options?.client)),
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
      readonly [
        '/guilds/:guild_id/emojis',
        InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
) {
  return ['/guilds/:guild_id/emojis', args] as const
}

/**
 * POST /guilds/{guild_id}/emojis
 */
export function createPostGuildsGuildIdEmojis(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>,
      ) => parseResponse(client.guilds[':guild_id'].emojis.$post(args, options?.client)),
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
      readonly [
        '/guilds/:guild_id/emojis/:emoji_id',
        InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
) {
  return ['/guilds/:guild_id/emojis/:emoji_id', args] as const
}

/**
 * DELETE /guilds/{guild_id}/emojis/{emoji_id}
 */
export function createDeleteGuildsGuildIdEmojisEmojiId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
      readonly [
        '/guilds/:guild_id/integrations',
        InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
) {
  return ['/guilds/:guild_id/integrations', args] as const
}

/**
 * DELETE /guilds/{guild_id}/integrations/{integration_id}
 */
export function createDeleteGuildsGuildIdIntegrationsIntegrationId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
      readonly [
        '/guilds/:guild_id/invites',
        InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
) {
  return ['/guilds/:guild_id/invites', args] as const
}

/**
 * GET /guilds/{guild_id}/members
 */
export function createGetGuildsGuildIdMembers(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['members']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['members']['$get']>,
      readonly [
        '/guilds/:guild_id/members',
        InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
) {
  return ['/guilds/:guild_id/members', args] as const
}

/**
 * PATCH /guilds/{guild_id}/members/@me
 */
export function createPatchGuildsGuildIdMembersMe(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>,
      ) => parseResponse(client.guilds[':guild_id'].members['@me'].$patch(args, options?.client)),
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
      readonly [
        '/guilds/:guild_id/members/search',
        InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
) {
  return ['/guilds/:guild_id/members/search', args] as const
}

/**
 * GET /guilds/{guild_id}/members/{user_id}
 */
export function createGetGuildsGuildIdMembersUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
      readonly [
        '/guilds/:guild_id/members/:user_id',
        InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/members/:user_id', args] as const
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}
 */
export function createPutGuildsGuildIdMembersUserId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>,
      ) =>
        parseResponse(client.guilds[':guild_id'].members[':user_id'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}
 */
export function createDeleteGuildsGuildIdMembersUserId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']
        >,
      ) =>
        parseResponse(client.guilds[':guild_id'].members[':user_id'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function createPutGuildsGuildIdMembersUserIdRolesRoleId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
        >,
      ) =>
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
export function createGetGuildsGuildIdMessagesSearch(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
      readonly [
        '/guilds/:guild_id/messages/search',
        InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdMessagesSearchQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].messages.search.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/messages/search
 */
export function getGetGuildsGuildIdMessagesSearchQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
) {
  return ['/guilds/:guild_id/messages/search', args] as const
}

/**
 * GET /guilds/{guild_id}/new-member-welcome
 */
export function createGetGuildsGuildIdNewMemberWelcome(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
      readonly [
        '/guilds/:guild_id/new-member-welcome',
        InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
) {
  return ['/guilds/:guild_id/new-member-welcome', args] as const
}

/**
 * GET /guilds/{guild_id}/onboarding
 */
export function createGetGuildsGuildIdOnboarding(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
      readonly [
        '/guilds/:guild_id/onboarding',
        InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
) {
  return ['/guilds/:guild_id/onboarding', args] as const
}

/**
 * PUT /guilds/{guild_id}/onboarding
 */
export function createPutGuildsGuildIdOnboarding(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>,
      ) => parseResponse(client.guilds[':guild_id'].onboarding.$put(args, options?.client)),
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
      readonly [
        '/guilds/:guild_id/preview',
        InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
) {
  return ['/guilds/:guild_id/preview', args] as const
}

/**
 * GET /guilds/{guild_id}/prune
 */
export function createGetGuildsGuildIdPrune(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
      readonly [
        '/guilds/:guild_id/prune',
        InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
) {
  return ['/guilds/:guild_id/prune', args] as const
}

/**
 * POST /guilds/{guild_id}/prune
 */
export function createPostGuildsGuildIdPrune(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>,
      ) => parseResponse(client.guilds[':guild_id'].prune.$post(args, options?.client)),
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
      readonly [
        '/guilds/:guild_id/regions',
        InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
) {
  return ['/guilds/:guild_id/regions', args] as const
}

/**
 * GET /guilds/{guild_id}/roles
 */
export function createGetGuildsGuildIdRoles(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
      readonly [
        '/guilds/:guild_id/roles',
        InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
) {
  return ['/guilds/:guild_id/roles', args] as const
}

/**
 * POST /guilds/{guild_id}/roles
 */
export function createPostGuildsGuildIdRoles(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>,
      ) => parseResponse(client.guilds[':guild_id'].roles.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /guilds/{guild_id}/roles
 */
export function createPatchGuildsGuildIdRoles(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>,
      ) => parseResponse(client.guilds[':guild_id'].roles.$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /guilds/{guild_id}/roles/member-counts
 */
export function createGetGuildsGuildIdRolesMemberCounts(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
      readonly [
        '/guilds/:guild_id/roles/member-counts',
        InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetGuildsGuildIdRolesMemberCountsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.guilds[':guild_id'].roles['member-counts'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /guilds/{guild_id}/roles/member-counts
 */
export function getGetGuildsGuildIdRolesMemberCountsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
) {
  return ['/guilds/:guild_id/roles/member-counts', args] as const
}

/**
 * GET /guilds/{guild_id}/roles/{role_id}
 */
export function createGetGuildsGuildIdRolesRoleId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
      readonly [
        '/guilds/:guild_id/roles/:role_id',
        InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
) {
  return ['/guilds/:guild_id/roles/:role_id', args] as const
}

/**
 * DELETE /guilds/{guild_id}/roles/{role_id}
 */
export function createDeleteGuildsGuildIdRolesRoleId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>,
      ) =>
        parseResponse(client.guilds[':guild_id'].roles[':role_id'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /guilds/{guild_id}/roles/{role_id}
 */
export function createPatchGuildsGuildIdRolesRoleId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>,
      ) =>
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
      readonly [
        '/guilds/:guild_id/scheduled-events',
        InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
) {
  return ['/guilds/:guild_id/scheduled-events', args] as const
}

/**
 * POST /guilds/{guild_id}/scheduled-events
 */
export function createPostGuildsGuildIdScheduledEvents(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
      >,
      readonly [
        '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
        InferRequestType<
          (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
) {
  return ['/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id', args] as const
}

/**
 * DELETE /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function createDeleteGuildsGuildIdScheduledEventsGuildScheduledEventId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
        >,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
      >,
      readonly [
        '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users',
        InferRequestType<
          (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
) {
  return ['/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users', args] as const
}

/**
 * GET /guilds/{guild_id}/soundboard-sounds
 */
export function createGetGuildsGuildIdSoundboardSounds(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
      readonly [
        '/guilds/:guild_id/soundboard-sounds',
        InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
) {
  return ['/guilds/:guild_id/soundboard-sounds', args] as const
}

/**
 * POST /guilds/{guild_id}/soundboard-sounds
 */
export function createPostGuildsGuildIdSoundboardSounds(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
      >,
      readonly [
        '/guilds/:guild_id/soundboard-sounds/:sound_id',
        InferRequestType<
          (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
) {
  return ['/guilds/:guild_id/soundboard-sounds/:sound_id', args] as const
}

/**
 * DELETE /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function createDeleteGuildsGuildIdSoundboardSoundsSoundId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
      readonly [
        '/guilds/:guild_id/stickers',
        InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
) {
  return ['/guilds/:guild_id/stickers', args] as const
}

/**
 * POST /guilds/{guild_id}/stickers
 */
export function createPostGuildsGuildIdStickers(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>,
      ) => parseResponse(client.guilds[':guild_id'].stickers.$post(args, options?.client)),
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
      readonly [
        '/guilds/:guild_id/stickers/:sticker_id',
        InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
) {
  return ['/guilds/:guild_id/stickers/:sticker_id', args] as const
}

/**
 * DELETE /guilds/{guild_id}/stickers/{sticker_id}
 */
export function createDeleteGuildsGuildIdStickersStickerId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
      readonly [
        '/guilds/:guild_id/templates',
        InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
) {
  return ['/guilds/:guild_id/templates', args] as const
}

/**
 * POST /guilds/{guild_id}/templates
 */
export function createPostGuildsGuildIdTemplates(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>,
      ) => parseResponse(client.guilds[':guild_id'].templates.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /guilds/{guild_id}/templates/{code}
 */
export function createPutGuildsGuildIdTemplatesCode(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>,
      ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /guilds/{guild_id}/templates/{code}
 */
export function createDeleteGuildsGuildIdTemplatesCode(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['templates'][':code']['$delete']
        >,
      ) =>
        parseResponse(client.guilds[':guild_id'].templates[':code'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /guilds/{guild_id}/templates/{code}
 */
export function createPatchGuildsGuildIdTemplatesCode(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>,
      ) =>
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
      readonly [
        '/guilds/:guild_id/threads/active',
        InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
) {
  return ['/guilds/:guild_id/threads/active', args] as const
}

/**
 * GET /guilds/{guild_id}/vanity-url
 */
export function createGetGuildsGuildIdVanityUrl(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
      readonly [
        '/guilds/:guild_id/vanity-url',
        InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
) {
  return ['/guilds/:guild_id/vanity-url', args] as const
}

/**
 * GET /guilds/{guild_id}/voice-states/@me
 */
export function createGetGuildsGuildIdVoiceStatesMe(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
      readonly [
        '/guilds/:guild_id/voice-states/@me',
        InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
) {
  return ['/guilds/:guild_id/voice-states/@me', args] as const
}

/**
 * PATCH /guilds/{guild_id}/voice-states/@me
 */
export function createPatchGuildsGuildIdVoiceStatesMe(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
      readonly [
        '/guilds/:guild_id/voice-states/:user_id',
        InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/voice-states/:user_id', args] as const
}

/**
 * PATCH /guilds/{guild_id}/voice-states/{user_id}
 */
export function createPatchGuildsGuildIdVoiceStatesUserId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
      readonly [
        '/guilds/:guild_id/webhooks',
        InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
) {
  return ['/guilds/:guild_id/webhooks', args] as const
}

/**
 * GET /guilds/{guild_id}/welcome-screen
 */
export function createGetGuildsGuildIdWelcomeScreen(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
      readonly [
        '/guilds/:guild_id/welcome-screen',
        InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
) {
  return ['/guilds/:guild_id/welcome-screen', args] as const
}

/**
 * PATCH /guilds/{guild_id}/welcome-screen
 */
export function createPatchGuildsGuildIdWelcomeScreen(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>,
      ) =>
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
      readonly [
        '/guilds/:guild_id/widget',
        InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
) {
  return ['/guilds/:guild_id/widget', args] as const
}

/**
 * PATCH /guilds/{guild_id}/widget
 */
export function createPatchGuildsGuildIdWidget(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>,
      ) => parseResponse(client.guilds[':guild_id'].widget.$patch(args, options?.client)),
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
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
      readonly [
        '/guilds/:guild_id/widget.json',
        InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
) {
  return ['/guilds/:guild_id/widget.json', args] as const
}

/**
 * GET /guilds/{guild_id}/widget.png
 */
export function createGetGuildsGuildIdWidgetPng(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
      Error,
      InferResponseType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
      readonly [
        '/guilds/:guild_id/widget.png',
        InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
) {
  return ['/guilds/:guild_id/widget.png', args] as const
}

/**
 * POST /interactions/{interaction_id}/{interaction_token}/callback
 */
export function createPostInteractionsInteractionIdInteractionTokenCallback(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
        >,
      ) =>
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
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.invites)[':code']['$get']>,
      Error,
      InferResponseType<(typeof client.invites)[':code']['$get']>,
      readonly ['/invites/:code', InferRequestType<(typeof client.invites)[':code']['$get']>]
    >
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
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
) {
  return ['/invites/:code', args] as const
}

/**
 * DELETE /invites/{code}
 */
export function createDeleteInvitesCode(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.invites)[':code']['$delete']>) =>
        parseResponse(client.invites[':code'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /lobbies
 */
export function createPutLobbies(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.lobbies.$put>) =>
        parseResponse(client.lobbies.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /lobbies
 */
export function createPostLobbies(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<typeof client.lobbies.$post>) =>
        parseResponse(client.lobbies.$post(args, options?.client)),
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
      Error,
      InferResponseType<(typeof client.lobbies)[':lobby_id']['$get']>,
      readonly [
        '/lobbies/:lobby_id',
        InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
) {
  return ['/lobbies/:lobby_id', args] as const
}

/**
 * PATCH /lobbies/{lobby_id}
 */
export function createPatchLobbiesLobbyId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>) =>
        parseResponse(client.lobbies[':lobby_id'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /lobbies/{lobby_id}/channel-linking
 */
export function createPatchLobbiesLobbyIdChannelLinking(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>,
      ) =>
        parseResponse(client.lobbies[':lobby_id']['channel-linking'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /lobbies/{lobby_id}/members/@me
 */
export function createDeleteLobbiesLobbyIdMembersMe(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>,
      ) => parseResponse(client.lobbies[':lobby_id'].members['@me'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /lobbies/{lobby_id}/members/@me/invites
 */
export function createPostLobbiesLobbyIdMembersMeInvites(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>,
      ) => parseResponse(client.lobbies[':lobby_id'].members.bulk.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /lobbies/{lobby_id}/members/{user_id}
 */
export function createPutLobbiesLobbyIdMembersUserId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>,
      ) =>
        parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /lobbies/{lobby_id}/members/{user_id}
 */
export function createDeleteLobbiesLobbyIdMembersUserId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
        >,
      ) =>
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
      Error,
      InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
      readonly [
        '/lobbies/:lobby_id/messages',
        InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
) {
  return ['/lobbies/:lobby_id/messages', args] as const
}

/**
 * POST /lobbies/{lobby_id}/messages
 */
export function createPostLobbiesLobbyIdMessages(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>,
      ) => parseResponse(client.lobbies[':lobby_id'].messages.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /oauth2/@me
 */
export function createGetOauth2Me(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.oauth2)['@me']['$get']>,
      Error,
      InferResponseType<(typeof client.oauth2)['@me']['$get']>,
      readonly ['/oauth2/@me']
    >
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
      Error,
      InferResponseType<(typeof client.oauth2.applications)['@me']['$get']>,
      readonly ['/oauth2/applications/@me']
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
    query?: CreateQueryOptions<
      InferResponseType<typeof client.oauth2.keys.$get>,
      Error,
      InferResponseType<typeof client.oauth2.keys.$get>,
      readonly ['/oauth2/keys']
    >
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
    query?: CreateQueryOptions<
      InferResponseType<typeof client.oauth2.userinfo.$get>,
      Error,
      InferResponseType<typeof client.oauth2.userinfo.$get>,
      readonly ['/oauth2/userinfo']
    >
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client)['partner-sdk']['token']['$post']>,
      ) => parseResponse(client['partner-sdk'].token.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /partner-sdk/token/bot
 */
export function createPostPartnerSdkTokenBot(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>,
      ) => parseResponse(client['partner-sdk'].token.bot.$post(args, options?.client)),
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
      Error,
      InferResponseType<(typeof client)['soundboard-default-sounds']['$get']>,
      readonly ['/soundboard-default-sounds']
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client)['stage-instances']['$post']>) =>
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
      Error,
      InferResponseType<(typeof client)['stage-instances'][':channel_id']['$get']>,
      readonly [
        '/stage-instances/:channel_id',
        InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
      ]
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
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
) {
  return ['/stage-instances/:channel_id', args] as const
}

/**
 * DELETE /stage-instances/{channel_id}
 */
export function createDeleteStageInstancesChannelId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>,
      ) => parseResponse(client['stage-instances'][':channel_id'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /stage-instances/{channel_id}
 */
export function createPatchStageInstancesChannelId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>,
      ) => parseResponse(client['stage-instances'][':channel_id'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /sticker-packs
 */
export function createGetStickerPacks(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['sticker-packs']['$get']>,
      Error,
      InferResponseType<(typeof client)['sticker-packs']['$get']>,
      readonly ['/sticker-packs']
    >
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
      Error,
      InferResponseType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
      readonly [
        '/sticker-packs/:pack_id',
        InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
      ]
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
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
) {
  return ['/sticker-packs/:pack_id', args] as const
}

/**
 * GET /stickers/{sticker_id}
 */
export function createGetStickersStickerId(
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.stickers)[':sticker_id']['$get']>,
      Error,
      InferResponseType<(typeof client.stickers)[':sticker_id']['$get']>,
      readonly [
        '/stickers/:sticker_id',
        InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
) {
  return ['/stickers/:sticker_id', args] as const
}

/**
 * GET /users/@me
 */
export function createGetUsersMe(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users)['@me']['$get']>,
      Error,
      InferResponseType<(typeof client.users)['@me']['$get']>,
      readonly ['/users/@me']
    >
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (args: InferRequestType<(typeof client.users)['@me']['$patch']>) =>
        parseResponse(client.users['@me'].$patch(args, options?.client)),
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
      Error,
      InferResponseType<
        (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
      >,
      readonly [
        '/users/@me/applications/:application_id/entitlements',
        InferRequestType<
          (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
) {
  return ['/users/@me/applications/:application_id/entitlements', args] as const
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
      Error,
      InferResponseType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
      >,
      readonly [
        '/users/@me/applications/:application_id/role-connection',
        InferRequestType<
          (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
) {
  return ['/users/@me/applications/:application_id/role-connection', args] as const
}

/**
 * PUT /users/@me/applications/{application_id}/role-connection
 */
export function createPutUsersMeApplicationsApplicationIdRoleConnection(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.users)['@me']['channels']['$post']>,
      ) => parseResponse(client.users['@me'].channels.$post(args, options?.client)),
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
      Error,
      InferResponseType<(typeof client.users)['@me']['connections']['$get']>,
      readonly ['/users/@me/connections']
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
      Error,
      InferResponseType<(typeof client.users)['@me']['guilds']['$get']>,
      readonly [
        '/users/@me/guilds',
        InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
) {
  return ['/users/@me/guilds', args] as const
}

/**
 * DELETE /users/@me/guilds/{guild_id}
 */
export function createDeleteUsersMeGuildsGuildId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>,
      ) => parseResponse(client.users['@me'].guilds[':guild_id'].$delete(args, options?.client)),
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
      Error,
      InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
      readonly [
        '/users/@me/guilds/:guild_id/member',
        InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
) {
  return ['/users/@me/guilds/:guild_id/member', args] as const
}

/**
 * GET /users/{user_id}
 */
export function createGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users)[':user_id']['$get']>,
      Error,
      InferResponseType<(typeof client.users)[':user_id']['$get']>,
      readonly ['/users/:user_id', InferRequestType<(typeof client.users)[':user_id']['$get']>]
    >
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
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return ['/users/:user_id', args] as const
}

/**
 * GET /voice/regions
 */
export function createGetVoiceRegions(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.voice.regions.$get>,
      Error,
      InferResponseType<typeof client.voice.regions.$get>,
      readonly ['/voice/regions']
    >
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
      Error,
      InferResponseType<(typeof client.webhooks)[':webhook_id']['$get']>,
      readonly [
        '/webhooks/:webhook_id',
        InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
) {
  return ['/webhooks/:webhook_id', args] as const
}

/**
 * DELETE /webhooks/{webhook_id}
 */
export function createDeleteWebhooksWebhookId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>,
      ) => parseResponse(client.webhooks[':webhook_id'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /webhooks/{webhook_id}
 */
export function createPatchWebhooksWebhookId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>,
      ) => parseResponse(client.webhooks[':webhook_id'].$patch(args, options?.client)),
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
      Error,
      InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
      readonly [
        '/webhooks/:webhook_id/:webhook_token',
        InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
      ]
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
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
) {
  return ['/webhooks/:webhook_id/:webhook_token', args] as const
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}
 */
export function createPostWebhooksWebhookIdWebhookToken(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
        >,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
      >,
      readonly [
        '/webhooks/:webhook_id/:webhook_token/messages/@original',
        InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
) {
  return ['/webhooks/:webhook_id/:webhook_token/messages/@original', args] as const
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function createDeleteWebhooksWebhookIdWebhookTokenMessagesOriginal(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
        >,
      ) =>
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
      Error,
      InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
      >,
      readonly [
        '/webhooks/:webhook_id/:webhook_token/messages/:message_id',
        InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
        >,
      ]
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
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
) {
  return ['/webhooks/:webhook_id/:webhook_token/messages/:message_id', args] as const
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function createDeleteWebhooksWebhookIdWebhookTokenMessagesMessageId(
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
        >,
      ) =>
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
  options?: { client?: ClientRequestOptions },
  queryClient?: QueryClient,
) {
  return createMutation(
    {
      mutationFn: async (
        args: InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
        >,
      ) =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].slack.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}
