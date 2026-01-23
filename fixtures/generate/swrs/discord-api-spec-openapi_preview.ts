import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/discord-api-spec-openapi_preview'

/**
 * GET /applications/@me
 */
export function useGetApplicationsMe(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client.applications)['@me']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/applications/@me'] as const) : null
  return useSWR<InferResponseType<(typeof client.applications)['@me']['$get']>, Error>(
    key,
    async () => parseResponse(client.applications['@me'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /applications/@me
 */
export function getGetApplicationsMeKey() {
  return ['GET', '/applications/@me'] as const
}

/**
 * PATCH /applications/@me
 */
export function usePatchApplicationsMe(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.applications)['@me']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.applications)['@me']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)['@me']['$patch']>
  >(
    'PATCH /applications/@me',
    async (_, { arg }) => parseResponse(client.applications['@me'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /applications/{application_id}
 */
export function useGetApplicationsApplicationId(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.applications)[':application_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/applications/:application_id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.applications)[':application_id']['$get']>, Error>(
    key,
    async () => parseResponse(client.applications[':application_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /applications/{application_id}
 */
export function getGetApplicationsApplicationIdKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
) {
  return ['GET', '/applications/:application_id', args] as const
}

/**
 * PATCH /applications/{application_id}
 */
export function usePatchApplicationsApplicationId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.applications)[':application_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.applications)[':application_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['$patch']>
  >(
    'PATCH /applications/:application_id',
    async (_, { arg }) =>
      parseResponse(client.applications[':application_id'].$patch(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/applications/:application_id/activity-instances/:instance_id', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.applications[':application_id']['activity-instances'][':instance_id'].$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/activity-instances/{instance_id}
 */
export function getGetApplicationsApplicationIdActivityInstancesInstanceIdKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
) {
  return ['GET', '/applications/:application_id/activity-instances/:instance_id', args] as const
}

/**
 * POST /applications/{application_id}/attachment
 */
export function usePostApplicationsApplicationIdAttachment(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.applications)[':application_id']['attachment']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['attachment']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.applications)[':application_id']['attachment']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['attachment']['$post']>
  >(
    'POST /applications/:application_id/attachment',
    async (_, { arg }) =>
      parseResponse(client.applications[':application_id'].attachment.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /applications/{application_id}/commands
 */
export function useGetApplicationsApplicationIdCommands(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.applications)[':application_id']['commands']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/applications/:application_id/commands', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.applications)[':application_id']['commands']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.applications[':application_id'].commands.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/commands
 */
export function getGetApplicationsApplicationIdCommandsKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
) {
  return ['GET', '/applications/:application_id/commands', args] as const
}

/**
 * PUT /applications/{application_id}/commands
 */
export function usePutApplicationsApplicationIdCommands(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.applications)[':application_id']['commands']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.applications)[':application_id']['commands']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>
  >(
    'PUT /applications/:application_id/commands',
    async (_, { arg }) =>
      parseResponse(client.applications[':application_id'].commands.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /applications/{application_id}/commands
 */
export function usePostApplicationsApplicationIdCommands(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.applications)[':application_id']['commands']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.applications)[':application_id']['commands']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>
  >(
    'POST /applications/:application_id/commands',
    async (_, { arg }) =>
      parseResponse(client.applications[':application_id'].commands.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/applications/:application_id/commands/:command_id', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$get(args, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/commands/{command_id}
 */
export function getGetApplicationsApplicationIdCommandsCommandIdKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
) {
  return ['GET', '/applications/:application_id/commands/:command_id', args] as const
}

/**
 * DELETE /applications/{application_id}/commands/{command_id}
 */
export function useDeleteApplicationsApplicationIdCommandsCommandId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
    >
  >(
    'DELETE /applications/:application_id/commands/:command_id',
    async (_, { arg }) =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * PATCH /applications/{application_id}/commands/{command_id}
 */
export function usePatchApplicationsApplicationIdCommandsCommandId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
    >
  >(
    'PATCH /applications/:application_id/commands/:command_id',
    async (_, { arg }) =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$patch(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /applications/{application_id}/emojis
 */
export function useGetApplicationsApplicationIdEmojis(
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.applications)[':application_id']['emojis']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/applications/:application_id/emojis', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.applications)[':application_id']['emojis']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.applications[':application_id'].emojis.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/emojis
 */
export function getGetApplicationsApplicationIdEmojisKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
) {
  return ['GET', '/applications/:application_id/emojis', args] as const
}

/**
 * POST /applications/{application_id}/emojis
 */
export function usePostApplicationsApplicationIdEmojis(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.applications)[':application_id']['emojis']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.applications)[':application_id']['emojis']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>
  >(
    'POST /applications/:application_id/emojis',
    async (_, { arg }) =>
      parseResponse(client.applications[':application_id'].emojis.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/applications/:application_id/emojis/:emoji_id', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$get(args, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/emojis/{emoji_id}
 */
export function getGetApplicationsApplicationIdEmojisEmojiIdKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
) {
  return ['GET', '/applications/:application_id/emojis/:emoji_id', args] as const
}

/**
 * DELETE /applications/{application_id}/emojis/{emoji_id}
 */
export function useDeleteApplicationsApplicationIdEmojisEmojiId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
    >
  >(
    'DELETE /applications/:application_id/emojis/:emoji_id',
    async (_, { arg }) =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * PATCH /applications/{application_id}/emojis/{emoji_id}
 */
export function usePatchApplicationsApplicationIdEmojisEmojiId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
    >
  >(
    'PATCH /applications/:application_id/emojis/:emoji_id',
    async (_, { arg }) =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$patch(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /applications/{application_id}/entitlements
 */
export function useGetApplicationsApplicationIdEntitlements(
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/applications/:application_id/entitlements', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.applications[':application_id'].entitlements.$get(args, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/entitlements
 */
export function getGetApplicationsApplicationIdEntitlementsKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
) {
  return ['GET', '/applications/:application_id/entitlements', args] as const
}

/**
 * POST /applications/{application_id}/entitlements
 */
export function usePostApplicationsApplicationIdEntitlements(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.applications)[':application_id']['entitlements']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.applications)[':application_id']['entitlements']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$post']>
  >(
    'POST /applications/:application_id/entitlements',
    async (_, { arg }) =>
      parseResponse(
        client.applications[':application_id'].entitlements.$post(arg, options?.client),
      ),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/applications/:application_id/entitlements/:entitlement_id', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.applications[':application_id'].entitlements[':entitlement_id'].$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/entitlements/{entitlement_id}
 */
export function getGetApplicationsApplicationIdEntitlementsEntitlementIdKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
) {
  return ['GET', '/applications/:application_id/entitlements/:entitlement_id', args] as const
}

/**
 * DELETE /applications/{application_id}/entitlements/{entitlement_id}
 */
export function useDeleteApplicationsApplicationIdEntitlementsEntitlementId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
    >
  >(
    'DELETE /applications/:application_id/entitlements/:entitlement_id',
    async (_, { arg }) =>
      parseResponse(
        client.applications[':application_id'].entitlements[':entitlement_id'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * POST /applications/{application_id}/entitlements/{entitlement_id}/consume
 */
export function usePostApplicationsApplicationIdEntitlementsEntitlementIdConsume(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
    >
  >(
    'POST /applications/:application_id/entitlements/:entitlement_id/consume',
    async (_, { arg }) =>
      parseResponse(
        client.applications[':application_id'].entitlements[':entitlement_id'].consume.$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/applications/:application_id/guilds/:guild_id/commands', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/guilds/{guild_id}/commands
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
) {
  return ['GET', '/applications/:application_id/guilds/:guild_id/commands', args] as const
}

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands
 */
export function usePutApplicationsApplicationIdGuildsGuildIdCommands(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
    >
  >(
    'PUT /applications/:application_id/guilds/:guild_id/commands',
    async (_, { arg }) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.$put(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * POST /applications/{application_id}/guilds/{guild_id}/commands
 */
export function usePostApplicationsApplicationIdGuildsGuildIdCommands(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
    >
  >(
    'POST /applications/:application_id/guilds/:guild_id/commands',
    async (_, { arg }) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? ([
          'GET',
          '/applications/:application_id/guilds/:guild_id/commands/permissions',
          args,
        ] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.permissions.$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
) {
  return [
    'GET',
    '/applications/:application_id/guilds/:guild_id/commands/permissions',
    args,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? ([
          'GET',
          '/applications/:application_id/guilds/:guild_id/commands/:command_id',
          args,
        ] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
) {
  return [
    'GET',
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    args,
  ] as const
}

/**
 * DELETE /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function useDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
    >
  >(
    'DELETE /applications/:application_id/guilds/:guild_id/commands/:command_id',
    async (_, { arg }) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * PATCH /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function usePatchApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
    >
  >(
    'PATCH /applications/:application_id/guilds/:guild_id/commands/:command_id',
    async (_, { arg }) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$patch(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? ([
          'GET',
          '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
          args,
        ] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[
          ':command_id'
        ].permissions.$get(args, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
  >,
) {
  return [
    'GET',
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    args,
  ] as const
}

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 */
export function usePutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
    >
  >(
    'PUT /applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    async (_, { arg }) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[
          ':command_id'
        ].permissions.$put(arg, options?.client),
      ),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/applications/:application_id/role-connections/metadata', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.applications[':application_id']['role-connections'].metadata.$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/role-connections/metadata
 */
export function getGetApplicationsApplicationIdRoleConnectionsMetadataKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
) {
  return ['GET', '/applications/:application_id/role-connections/metadata', args] as const
}

/**
 * PUT /applications/{application_id}/role-connections/metadata
 */
export function usePutApplicationsApplicationIdRoleConnectionsMetadata(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
    >
  >(
    'PUT /applications/:application_id/role-connections/metadata',
    async (_, { arg }) =>
      parseResponse(
        client.applications[':application_id']['role-connections'].metadata.$put(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /channels/{channel_id}
 */
export function useGetChannelsChannelId(
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.channels)[':channel_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/channels/:channel_id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.channels)[':channel_id']['$get']>, Error>(
    key,
    async () => parseResponse(client.channels[':channel_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}
 */
export function getGetChannelsChannelIdKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
) {
  return ['GET', '/channels/:channel_id', args] as const
}

/**
 * DELETE /channels/{channel_id}
 */
export function useDeleteChannelsChannelId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['$delete']>
  >(
    'DELETE /channels/:channel_id',
    async (_, { arg }) =>
      parseResponse(client.channels[':channel_id'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /channels/{channel_id}
 */
export function usePatchChannelsChannelId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['$patch']>
  >(
    'PATCH /channels/:channel_id',
    async (_, { arg }) =>
      parseResponse(client.channels[':channel_id'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /channels/{channel_id}/followers
 */
export function usePostChannelsChannelIdFollowers(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['followers']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['followers']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>
  >(
    'POST /channels/:channel_id/followers',
    async (_, { arg }) =>
      parseResponse(client.channels[':channel_id'].followers.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /channels/{channel_id}/invites
 */
export function useGetChannelsChannelIdInvites(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.channels)[':channel_id']['invites']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/channels/:channel_id/invites', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.channels)[':channel_id']['invites']['$get']>,
    Error
  >(
    key,
    async () => parseResponse(client.channels[':channel_id'].invites.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/invites
 */
export function getGetChannelsChannelIdInvitesKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
) {
  return ['GET', '/channels/:channel_id/invites', args] as const
}

/**
 * POST /channels/{channel_id}/invites
 */
export function usePostChannelsChannelIdInvites(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['invites']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['invites']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>
  >(
    'POST /channels/:channel_id/invites',
    async (_, { arg }) =>
      parseResponse(client.channels[':channel_id'].invites.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /channels/{channel_id}/messages
 */
export function useGetChannelsChannelIdMessages(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.channels)[':channel_id']['messages']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/channels/:channel_id/messages', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.channels)[':channel_id']['messages']['$get']>,
    Error
  >(
    key,
    async () => parseResponse(client.channels[':channel_id'].messages.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/messages
 */
export function getGetChannelsChannelIdMessagesKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
) {
  return ['GET', '/channels/:channel_id/messages', args] as const
}

/**
 * POST /channels/{channel_id}/messages
 */
export function usePostChannelsChannelIdMessages(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['messages']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['messages']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>
  >(
    'POST /channels/:channel_id/messages',
    async (_, { arg }) =>
      parseResponse(client.channels[':channel_id'].messages.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /channels/{channel_id}/messages/bulk-delete
 */
export function usePostChannelsChannelIdMessagesBulkDelete(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']>
  >(
    'POST /channels/:channel_id/messages/bulk-delete',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].messages['bulk-delete'].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /channels/{channel_id}/messages/pins
 */
export function useGetChannelsChannelIdMessagesPins(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/channels/:channel_id/messages/pins', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.channels[':channel_id'].messages.pins.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/messages/pins
 */
export function getGetChannelsChannelIdMessagesPinsKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
) {
  return ['GET', '/channels/:channel_id/messages/pins', args] as const
}

/**
 * PUT /channels/{channel_id}/messages/pins/{message_id}
 */
export function usePutChannelsChannelIdMessagesPinsMessageId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
    >
  >(
    'PUT /channels/:channel_id/messages/pins/:message_id',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].messages.pins[':message_id'].$put(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * DELETE /channels/{channel_id}/messages/pins/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesPinsMessageId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
    >
  >(
    'DELETE /channels/:channel_id/messages/pins/:message_id',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].messages.pins[':message_id'].$delete(arg, options?.client),
      ),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/channels/:channel_id/messages/:message_id', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$get(args, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/messages/{message_id}
 */
export function getGetChannelsChannelIdMessagesMessageIdKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
) {
  return ['GET', '/channels/:channel_id/messages/:message_id', args] as const
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesMessageId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']>
  >(
    'DELETE /channels/:channel_id/messages/:message_id',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * PATCH /channels/{channel_id}/messages/{message_id}
 */
export function usePatchChannelsChannelIdMessagesMessageId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']>
  >(
    'PATCH /channels/:channel_id/messages/:message_id',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$patch(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * POST /channels/{channel_id}/messages/{message_id}/crosspost
 */
export function usePostChannelsChannelIdMessagesMessageIdCrosspost(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
    >
  >(
    'POST /channels/:channel_id/messages/:message_id/crosspost',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].crosspost.$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactions(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
    >
  >(
    'DELETE /channels/:channel_id/messages/:message_id/reactions',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions.$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/channels/:channel_id/messages/:message_id/reactions/:emoji_name', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 */
export function getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
) {
  return ['GET', '/channels/:channel_id/messages/:message_id/reactions/:emoji_name', args] as const
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiName(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
    >
  >(
    'DELETE /channels/:channel_id/messages/:message_id/reactions/:emoji_name',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * PUT /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function usePutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
    >
  >(
    'PUT /channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name']['@me'].$put(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
    >
  >(
    'DELETE /channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'][
          '@me'
        ].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
    >
  >(
    'DELETE /channels/:channel_id/messages/:message_id/reactions/:emoji_name/:user_id',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'][
          ':user_id'
        ].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * POST /channels/{channel_id}/messages/{message_id}/threads
 */
export function usePostChannelsChannelIdMessagesMessageIdThreads(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
    >
  >(
    'POST /channels/:channel_id/messages/:message_id/threads',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].threads.$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * PUT /channels/{channel_id}/permissions/{overwrite_id}
 */
export function usePutChannelsChannelIdPermissionsOverwriteId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
    >
  >(
    'PUT /channels/:channel_id/permissions/:overwrite_id',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].permissions[':overwrite_id'].$put(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * DELETE /channels/{channel_id}/permissions/{overwrite_id}
 */
export function useDeleteChannelsChannelIdPermissionsOverwriteId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
    >
  >(
    'DELETE /channels/:channel_id/permissions/:overwrite_id',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].permissions[':overwrite_id'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /channels/{channel_id}/pins
 */
export function useGetChannelsChannelIdPins(
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.channels)[':channel_id']['pins']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/channels/:channel_id/pins', args] as const) : null
  return useSWR<InferResponseType<(typeof client.channels)[':channel_id']['pins']['$get']>, Error>(
    key,
    async () => parseResponse(client.channels[':channel_id'].pins.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/pins
 */
export function getGetChannelsChannelIdPinsKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
) {
  return ['GET', '/channels/:channel_id/pins', args] as const
}

/**
 * PUT /channels/{channel_id}/pins/{message_id}
 */
export function usePutChannelsChannelIdPinsMessageId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
  >(
    'PUT /channels/:channel_id/pins/:message_id',
    async (_, { arg }) =>
      parseResponse(client.channels[':channel_id'].pins[':message_id'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /channels/{channel_id}/pins/{message_id}
 */
export function useDeleteChannelsChannelIdPinsMessageId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
  >(
    'DELETE /channels/:channel_id/pins/:message_id',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].pins[':message_id'].$delete(arg, options?.client),
      ),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/channels/:channel_id/polls/:message_id/answers/:answer_id', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.channels[':channel_id'].polls[':message_id'].answers[':answer_id'].$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 */
export function getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
) {
  return ['GET', '/channels/:channel_id/polls/:message_id/answers/:answer_id', args] as const
}

/**
 * POST /channels/{channel_id}/polls/{message_id}/expire
 */
export function usePostChannelsChannelIdPollsMessageIdExpire(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
    >
  >(
    'POST /channels/:channel_id/polls/:message_id/expire',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].polls[':message_id'].expire.$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * PUT /channels/{channel_id}/recipients/{user_id}
 */
export function usePutChannelsChannelIdRecipientsUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
  >(
    'PUT /channels/:channel_id/recipients/:user_id',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].recipients[':user_id'].$put(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * DELETE /channels/{channel_id}/recipients/{user_id}
 */
export function useDeleteChannelsChannelIdRecipientsUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']>
  >(
    'DELETE /channels/:channel_id/recipients/:user_id',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id'].recipients[':user_id'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * POST /channels/{channel_id}/send-soundboard-sound
 */
export function usePostChannelsChannelIdSendSoundboardSound(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
  >(
    'POST /channels/:channel_id/send-soundboard-sound',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id']['send-soundboard-sound'].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /channels/{channel_id}/thread-members
 */
export function useGetChannelsChannelIdThreadMembers(
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/channels/:channel_id/thread-members', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.channels[':channel_id']['thread-members'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/thread-members
 */
export function getGetChannelsChannelIdThreadMembersKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
) {
  return ['GET', '/channels/:channel_id/thread-members', args] as const
}

/**
 * PUT /channels/{channel_id}/thread-members/@me
 */
export function usePutChannelsChannelIdThreadMembersMe(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
  >(
    'PUT /channels/:channel_id/thread-members/@me',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id']['thread-members']['@me'].$put(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * DELETE /channels/{channel_id}/thread-members/@me
 */
export function useDeleteChannelsChannelIdThreadMembersMe(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']>
  >(
    'DELETE /channels/:channel_id/thread-members/@me',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id']['thread-members']['@me'].$delete(arg, options?.client),
      ),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/channels/:channel_id/thread-members/:user_id', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$get(args, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/thread-members/{user_id}
 */
export function getGetChannelsChannelIdThreadMembersUserIdKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
) {
  return ['GET', '/channels/:channel_id/thread-members/:user_id', args] as const
}

/**
 * PUT /channels/{channel_id}/thread-members/{user_id}
 */
export function usePutChannelsChannelIdThreadMembersUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
    >,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
    >,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']>
  >(
    'PUT /channels/:channel_id/thread-members/:user_id',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$put(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * DELETE /channels/{channel_id}/thread-members/{user_id}
 */
export function useDeleteChannelsChannelIdThreadMembersUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
    >
  >(
    'DELETE /channels/:channel_id/thread-members/:user_id',
    async (_, { arg }) =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * POST /channels/{channel_id}/threads
 */
export function usePostChannelsChannelIdThreads(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['threads']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['threads']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>
  >(
    'POST /channels/:channel_id/threads',
    async (_, { arg }) =>
      parseResponse(client.channels[':channel_id'].threads.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/channels/:channel_id/threads/archived/private', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.channels[':channel_id'].threads.archived.private.$get(args, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/threads/archived/private
 */
export function getGetChannelsChannelIdThreadsArchivedPrivateKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
) {
  return ['GET', '/channels/:channel_id/threads/archived/private', args] as const
}

/**
 * GET /channels/{channel_id}/threads/archived/public
 */
export function useGetChannelsChannelIdThreadsArchivedPublic(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/channels/:channel_id/threads/archived/public', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.channels[':channel_id'].threads.archived.public.$get(args, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/threads/archived/public
 */
export function getGetChannelsChannelIdThreadsArchivedPublicKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
) {
  return ['GET', '/channels/:channel_id/threads/archived/public', args] as const
}

/**
 * GET /channels/{channel_id}/threads/search
 */
export function useGetChannelsChannelIdThreadsSearch(
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/channels/:channel_id/threads/search', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.channels[':channel_id'].threads.search.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/threads/search
 */
export function getGetChannelsChannelIdThreadsSearchKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
) {
  return ['GET', '/channels/:channel_id/threads/search', args] as const
}

/**
 * POST /channels/{channel_id}/typing
 */
export function usePostChannelsChannelIdTyping(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['typing']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['typing']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>
  >(
    'POST /channels/:channel_id/typing',
    async (_, { arg }) =>
      parseResponse(client.channels[':channel_id'].typing.$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/channels/:channel_id/users/@me/threads/archived/private', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.channels[':channel_id'].users['@me'].threads.archived.private.$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/users/@me/threads/archived/private
 */
export function getGetChannelsChannelIdUsersMeThreadsArchivedPrivateKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
) {
  return ['GET', '/channels/:channel_id/users/@me/threads/archived/private', args] as const
}

/**
 * GET /channels/{channel_id}/webhooks
 */
export function useGetChannelsChannelIdWebhooks(
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/channels/:channel_id/webhooks', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
    Error
  >(
    key,
    async () => parseResponse(client.channels[':channel_id'].webhooks.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/webhooks
 */
export function getGetChannelsChannelIdWebhooksKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
) {
  return ['GET', '/channels/:channel_id/webhooks', args] as const
}

/**
 * POST /channels/{channel_id}/webhooks
 */
export function usePostChannelsChannelIdWebhooks(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>
  >(
    'POST /channels/:channel_id/webhooks',
    async (_, { arg }) =>
      parseResponse(client.channels[':channel_id'].webhooks.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /gateway
 */
export function useGetGateway(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.gateway.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/gateway'] as const) : null
  return useSWR<InferResponseType<typeof client.gateway.$get>, Error>(
    key,
    async () => parseResponse(client.gateway.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /gateway
 */
export function getGetGatewayKey() {
  return ['GET', '/gateway'] as const
}

/**
 * GET /gateway/bot
 */
export function useGetGatewayBot(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.gateway.bot.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/gateway/bot'] as const) : null
  return useSWR<InferResponseType<typeof client.gateway.bot.$get>, Error>(
    key,
    async () => parseResponse(client.gateway.bot.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /gateway/bot
 */
export function getGetGatewayBotKey() {
  return ['GET', '/gateway/bot'] as const
}

/**
 * GET /guilds/templates/{code}
 */
export function useGetGuildsTemplatesCode(
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds.templates)[':code']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/templates/:code', args] as const) : null
  return useSWR<InferResponseType<(typeof client.guilds.templates)[':code']['$get']>, Error>(
    key,
    async () => parseResponse(client.guilds.templates[':code'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/templates/{code}
 */
export function getGetGuildsTemplatesCodeKey(
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
) {
  return ['GET', '/guilds/templates/:code', args] as const
}

/**
 * GET /guilds/{guild_id}
 */
export function useGetGuildsGuildId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.guilds)[':guild_id']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/guilds/:guild_id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.guilds)[':guild_id']['$get']>, Error>(
    key,
    async () => parseResponse(client.guilds[':guild_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}
 */
export function getGetGuildsGuildIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
) {
  return ['GET', '/guilds/:guild_id', args] as const
}

/**
 * PATCH /guilds/{guild_id}
 */
export function usePatchGuildsGuildId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>
  >(
    'PATCH /guilds/:guild_id',
    async (_, { arg }) => parseResponse(client.guilds[':guild_id'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/audit-logs
 */
export function useGetGuildsGuildIdAuditLogs(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/audit-logs', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
    Error
  >(
    key,
    async () => parseResponse(client.guilds[':guild_id']['audit-logs'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/audit-logs
 */
export function getGetGuildsGuildIdAuditLogsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/audit-logs', args] as const
}

/**
 * GET /guilds/{guild_id}/auto-moderation/rules
 */
export function useGetGuildsGuildIdAutoModerationRules(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/guilds/:guild_id/auto-moderation/rules', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules.$get(args, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/auto-moderation/rules
 */
export function getGetGuildsGuildIdAutoModerationRulesKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/auto-moderation/rules', args] as const
}

/**
 * POST /guilds/{guild_id}/auto-moderation/rules
 */
export function usePostGuildsGuildIdAutoModerationRules(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>
  >(
    'POST /guilds/:guild_id/auto-moderation/rules',
    async (_, { arg }) =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules.$post(arg, options?.client),
      ),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/guilds/:guild_id/auto-moderation/rules/:rule_id', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$get(args, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function getGetGuildsGuildIdAutoModerationRulesRuleIdKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
) {
  return ['GET', '/guilds/:guild_id/auto-moderation/rules/:rule_id', args] as const
}

/**
 * DELETE /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function useDeleteGuildsGuildIdAutoModerationRulesRuleId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
    >
  >(
    'DELETE /guilds/:guild_id/auto-moderation/rules/:rule_id',
    async (_, { arg }) =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * PATCH /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function usePatchGuildsGuildIdAutoModerationRulesRuleId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
    >
  >(
    'PATCH /guilds/:guild_id/auto-moderation/rules/:rule_id',
    async (_, { arg }) =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$patch(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/bans
 */
export function useGetGuildsGuildIdBans(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/guilds/:guild_id/bans', args] as const) : null
  return useSWR<InferResponseType<(typeof client.guilds)[':guild_id']['bans']['$get']>, Error>(
    key,
    async () => parseResponse(client.guilds[':guild_id'].bans.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/bans
 */
export function getGetGuildsGuildIdBansKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/bans', args] as const
}

/**
 * GET /guilds/{guild_id}/bans/{user_id}
 */
export function useGetGuildsGuildIdBansUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/bans/:user_id', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.guilds[':guild_id'].bans[':user_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/bans/{user_id}
 */
export function getGetGuildsGuildIdBansUserIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/bans/:user_id', args] as const
}

/**
 * PUT /guilds/{guild_id}/bans/{user_id}
 */
export function usePutGuildsGuildIdBansUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>
  >(
    'PUT /guilds/:guild_id/bans/:user_id',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].bans[':user_id'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /guilds/{guild_id}/bans/{user_id}
 */
export function useDeleteGuildsGuildIdBansUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
  >(
    'DELETE /guilds/:guild_id/bans/:user_id',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].bans[':user_id'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /guilds/{guild_id}/bulk-ban
 */
export function usePostGuildsGuildIdBulkBan(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>
  >(
    'POST /guilds/:guild_id/bulk-ban',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id']['bulk-ban'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/channels
 */
export function useGetGuildsGuildIdChannels(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/channels', args] as const) : null
  return useSWR<InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$get']>, Error>(
    key,
    async () => parseResponse(client.guilds[':guild_id'].channels.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/channels
 */
export function getGetGuildsGuildIdChannelsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/channels', args] as const
}

/**
 * POST /guilds/{guild_id}/channels
 */
export function usePostGuildsGuildIdChannels(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>
  >(
    'POST /guilds/:guild_id/channels',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].channels.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /guilds/{guild_id}/channels
 */
export function usePatchGuildsGuildIdChannels(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>
  >(
    'PATCH /guilds/:guild_id/channels',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].channels.$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/emojis
 */
export function useGetGuildsGuildIdEmojis(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/emojis', args] as const) : null
  return useSWR<InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$get']>, Error>(
    key,
    async () => parseResponse(client.guilds[':guild_id'].emojis.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/emojis
 */
export function getGetGuildsGuildIdEmojisKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/emojis', args] as const
}

/**
 * POST /guilds/{guild_id}/emojis
 */
export function usePostGuildsGuildIdEmojis(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>
  >(
    'POST /guilds/:guild_id/emojis',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].emojis.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useGetGuildsGuildIdEmojisEmojiId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/guilds/:guild_id/emojis/:emoji_id', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/emojis/{emoji_id}
 */
export function getGetGuildsGuildIdEmojisEmojiIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/emojis/:emoji_id', args] as const
}

/**
 * DELETE /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useDeleteGuildsGuildIdEmojisEmojiId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
  >(
    'DELETE /guilds/:guild_id/emojis/:emoji_id',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /guilds/{guild_id}/emojis/{emoji_id}
 */
export function usePatchGuildsGuildIdEmojisEmojiId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
  >(
    'PATCH /guilds/:guild_id/emojis/:emoji_id',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/integrations
 */
export function useGetGuildsGuildIdIntegrations(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/integrations', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
    Error
  >(
    key,
    async () => parseResponse(client.guilds[':guild_id'].integrations.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/integrations
 */
export function getGetGuildsGuildIdIntegrationsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/integrations', args] as const
}

/**
 * DELETE /guilds/{guild_id}/integrations/{integration_id}
 */
export function useDeleteGuildsGuildIdIntegrationsIntegrationId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
    >
  >(
    'DELETE /guilds/:guild_id/integrations/:integration_id',
    async (_, { arg }) =>
      parseResponse(
        client.guilds[':guild_id'].integrations[':integration_id'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/invites
 */
export function useGetGuildsGuildIdInvites(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/invites', args] as const) : null
  return useSWR<InferResponseType<(typeof client.guilds)[':guild_id']['invites']['$get']>, Error>(
    key,
    async () => parseResponse(client.guilds[':guild_id'].invites.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/invites
 */
export function getGetGuildsGuildIdInvitesKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/invites', args] as const
}

/**
 * GET /guilds/{guild_id}/members
 */
export function useGetGuildsGuildIdMembers(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['members']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/members', args] as const) : null
  return useSWR<InferResponseType<(typeof client.guilds)[':guild_id']['members']['$get']>, Error>(
    key,
    async () => parseResponse(client.guilds[':guild_id'].members.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/members
 */
export function getGetGuildsGuildIdMembersKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/members', args] as const
}

/**
 * PATCH /guilds/{guild_id}/members/@me
 */
export function usePatchGuildsGuildIdMembersMe(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>
  >(
    'PATCH /guilds/:guild_id/members/@me',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].members['@me'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/members/search
 */
export function useGetGuildsGuildIdMembersSearch(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/members/search', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.guilds[':guild_id'].members.search.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/members/search
 */
export function getGetGuildsGuildIdMembersSearchKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/members/search', args] as const
}

/**
 * GET /guilds/{guild_id}/members/{user_id}
 */
export function useGetGuildsGuildIdMembersUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/guilds/:guild_id/members/:user_id', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.guilds[':guild_id'].members[':user_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/members/{user_id}
 */
export function getGetGuildsGuildIdMembersUserIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/members/:user_id', args] as const
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}
 */
export function usePutGuildsGuildIdMembersUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
  >(
    'PUT /guilds/:guild_id/members/:user_id',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].members[':user_id'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}
 */
export function useDeleteGuildsGuildIdMembersUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
  >(
    'DELETE /guilds/:guild_id/members/:user_id',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].members[':user_id'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /guilds/{guild_id}/members/{user_id}
 */
export function usePatchGuildsGuildIdMembersUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
  >(
    'PATCH /guilds/:guild_id/members/:user_id',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].members[':user_id'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function usePutGuildsGuildIdMembersUserIdRolesRoleId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
    >
  >(
    'PUT /guilds/:guild_id/members/:user_id/roles/:role_id',
    async (_, { arg }) =>
      parseResponse(
        client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$put(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdMembersUserIdRolesRoleId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
    >
  >(
    'DELETE /guilds/:guild_id/members/:user_id/roles/:role_id',
    async (_, { arg }) =>
      parseResponse(
        client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/messages/search
 */
export function useGetGuildsGuildIdMessagesSearch(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/guilds/:guild_id/messages/search', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.guilds[':guild_id'].messages.search.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/messages/search
 */
export function getGetGuildsGuildIdMessagesSearchKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/messages/search', args] as const
}

/**
 * GET /guilds/{guild_id}/new-member-welcome
 */
export function useGetGuildsGuildIdNewMemberWelcome(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/guilds/:guild_id/new-member-welcome', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.guilds[':guild_id']['new-member-welcome'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/new-member-welcome
 */
export function getGetGuildsGuildIdNewMemberWelcomeKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/new-member-welcome', args] as const
}

/**
 * GET /guilds/{guild_id}/onboarding
 */
export function useGetGuildsGuildIdOnboarding(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/onboarding', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
    Error
  >(
    key,
    async () => parseResponse(client.guilds[':guild_id'].onboarding.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/onboarding
 */
export function getGetGuildsGuildIdOnboardingKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/onboarding', args] as const
}

/**
 * PUT /guilds/{guild_id}/onboarding
 */
export function usePutGuildsGuildIdOnboarding(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>
  >(
    'PUT /guilds/:guild_id/onboarding',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].onboarding.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/preview
 */
export function useGetGuildsGuildIdPreview(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/preview', args] as const) : null
  return useSWR<InferResponseType<(typeof client.guilds)[':guild_id']['preview']['$get']>, Error>(
    key,
    async () => parseResponse(client.guilds[':guild_id'].preview.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/preview
 */
export function getGetGuildsGuildIdPreviewKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/preview', args] as const
}

/**
 * GET /guilds/{guild_id}/prune
 */
export function useGetGuildsGuildIdPrune(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/prune', args] as const) : null
  return useSWR<InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$get']>, Error>(
    key,
    async () => parseResponse(client.guilds[':guild_id'].prune.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/prune
 */
export function getGetGuildsGuildIdPruneKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/prune', args] as const
}

/**
 * POST /guilds/{guild_id}/prune
 */
export function usePostGuildsGuildIdPrune(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>
  >(
    'POST /guilds/:guild_id/prune',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].prune.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/regions
 */
export function useGetGuildsGuildIdRegions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/regions', args] as const) : null
  return useSWR<InferResponseType<(typeof client.guilds)[':guild_id']['regions']['$get']>, Error>(
    key,
    async () => parseResponse(client.guilds[':guild_id'].regions.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/regions
 */
export function getGetGuildsGuildIdRegionsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/regions', args] as const
}

/**
 * GET /guilds/{guild_id}/roles
 */
export function useGetGuildsGuildIdRoles(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/roles', args] as const) : null
  return useSWR<InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$get']>, Error>(
    key,
    async () => parseResponse(client.guilds[':guild_id'].roles.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/roles
 */
export function getGetGuildsGuildIdRolesKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/roles', args] as const
}

/**
 * POST /guilds/{guild_id}/roles
 */
export function usePostGuildsGuildIdRoles(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>
  >(
    'POST /guilds/:guild_id/roles',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].roles.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /guilds/{guild_id}/roles
 */
export function usePatchGuildsGuildIdRoles(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>
  >(
    'PATCH /guilds/:guild_id/roles',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].roles.$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/roles/member-counts
 */
export function useGetGuildsGuildIdRolesMemberCounts(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/guilds/:guild_id/roles/member-counts', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.guilds[':guild_id'].roles['member-counts'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/roles/member-counts
 */
export function getGetGuildsGuildIdRolesMemberCountsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/roles/member-counts', args] as const
}

/**
 * GET /guilds/{guild_id}/roles/{role_id}
 */
export function useGetGuildsGuildIdRolesRoleId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/roles/:role_id', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.guilds[':guild_id'].roles[':role_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/roles/{role_id}
 */
export function getGetGuildsGuildIdRolesRoleIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/roles/:role_id', args] as const
}

/**
 * DELETE /guilds/{guild_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdRolesRoleId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
  >(
    'DELETE /guilds/:guild_id/roles/:role_id',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].roles[':role_id'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /guilds/{guild_id}/roles/{role_id}
 */
export function usePatchGuildsGuildIdRolesRoleId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
  >(
    'PATCH /guilds/:guild_id/roles/:role_id',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].roles[':role_id'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/scheduled-events
 */
export function useGetGuildsGuildIdScheduledEvents(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/guilds/:guild_id/scheduled-events', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.guilds[':guild_id']['scheduled-events'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/scheduled-events
 */
export function getGetGuildsGuildIdScheduledEventsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/scheduled-events', args] as const
}

/**
 * POST /guilds/{guild_id}/scheduled-events
 */
export function usePostGuildsGuildIdScheduledEvents(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
  >(
    'POST /guilds/:guild_id/scheduled-events',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id']['scheduled-events'].$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
) {
  return ['GET', '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id', args] as const
}

/**
 * DELETE /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function useDeleteGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
    >
  >(
    'DELETE /guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    async (_, { arg }) =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * PATCH /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function usePatchGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
    >
  >(
    'PATCH /guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    async (_, { arg }) =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$patch(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? ([
          'GET',
          '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users',
          args,
        ] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].users.$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
) {
  return [
    'GET',
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users',
    args,
  ] as const
}

/**
 * GET /guilds/{guild_id}/soundboard-sounds
 */
export function useGetGuildsGuildIdSoundboardSounds(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/guilds/:guild_id/soundboard-sounds', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/soundboard-sounds
 */
export function getGetGuildsGuildIdSoundboardSoundsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/soundboard-sounds', args] as const
}

/**
 * POST /guilds/{guild_id}/soundboard-sounds
 */
export function usePostGuildsGuildIdSoundboardSounds(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
  >(
    'POST /guilds/:guild_id/soundboard-sounds',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$post(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/guilds/:guild_id/soundboard-sounds/:sound_id', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$get(args, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function getGetGuildsGuildIdSoundboardSoundsSoundIdKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
) {
  return ['GET', '/guilds/:guild_id/soundboard-sounds/:sound_id', args] as const
}

/**
 * DELETE /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function useDeleteGuildsGuildIdSoundboardSoundsSoundId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
    >
  >(
    'DELETE /guilds/:guild_id/soundboard-sounds/:sound_id',
    async (_, { arg }) =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * PATCH /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function usePatchGuildsGuildIdSoundboardSoundsSoundId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
    >
  >(
    'PATCH /guilds/:guild_id/soundboard-sounds/:sound_id',
    async (_, { arg }) =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$patch(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/stickers
 */
export function useGetGuildsGuildIdStickers(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/stickers', args] as const) : null
  return useSWR<InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$get']>, Error>(
    key,
    async () => parseResponse(client.guilds[':guild_id'].stickers.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/stickers
 */
export function getGetGuildsGuildIdStickersKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/stickers', args] as const
}

/**
 * POST /guilds/{guild_id}/stickers
 */
export function usePostGuildsGuildIdStickers(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>
  >(
    'POST /guilds/:guild_id/stickers',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].stickers.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useGetGuildsGuildIdStickersStickerId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/guilds/:guild_id/stickers/:sticker_id', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.guilds[':guild_id'].stickers[':sticker_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/stickers/{sticker_id}
 */
export function getGetGuildsGuildIdStickersStickerIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/stickers/:sticker_id', args] as const
}

/**
 * DELETE /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useDeleteGuildsGuildIdStickersStickerId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
  >(
    'DELETE /guilds/:guild_id/stickers/:sticker_id',
    async (_, { arg }) =>
      parseResponse(
        client.guilds[':guild_id'].stickers[':sticker_id'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * PATCH /guilds/{guild_id}/stickers/{sticker_id}
 */
export function usePatchGuildsGuildIdStickersStickerId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>
  >(
    'PATCH /guilds/:guild_id/stickers/:sticker_id',
    async (_, { arg }) =>
      parseResponse(
        client.guilds[':guild_id'].stickers[':sticker_id'].$patch(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/templates
 */
export function useGetGuildsGuildIdTemplates(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/templates', args] as const) : null
  return useSWR<InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$get']>, Error>(
    key,
    async () => parseResponse(client.guilds[':guild_id'].templates.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/templates
 */
export function getGetGuildsGuildIdTemplatesKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/templates', args] as const
}

/**
 * POST /guilds/{guild_id}/templates
 */
export function usePostGuildsGuildIdTemplates(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>
  >(
    'POST /guilds/:guild_id/templates',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].templates.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PUT /guilds/{guild_id}/templates/{code}
 */
export function usePutGuildsGuildIdTemplatesCode(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
  >(
    'PUT /guilds/:guild_id/templates/:code',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].templates[':code'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /guilds/{guild_id}/templates/{code}
 */
export function useDeleteGuildsGuildIdTemplatesCode(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
  >(
    'DELETE /guilds/:guild_id/templates/:code',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].templates[':code'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /guilds/{guild_id}/templates/{code}
 */
export function usePatchGuildsGuildIdTemplatesCode(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
  >(
    'PATCH /guilds/:guild_id/templates/:code',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].templates[':code'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/threads/active
 */
export function useGetGuildsGuildIdThreadsActive(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/threads/active', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.guilds[':guild_id'].threads.active.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/threads/active
 */
export function getGetGuildsGuildIdThreadsActiveKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/threads/active', args] as const
}

/**
 * GET /guilds/{guild_id}/vanity-url
 */
export function useGetGuildsGuildIdVanityUrl(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/vanity-url', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
    Error
  >(
    key,
    async () => parseResponse(client.guilds[':guild_id']['vanity-url'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/vanity-url
 */
export function getGetGuildsGuildIdVanityUrlKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/vanity-url', args] as const
}

/**
 * GET /guilds/{guild_id}/voice-states/@me
 */
export function useGetGuildsGuildIdVoiceStatesMe(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/guilds/:guild_id/voice-states/@me', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/voice-states/@me
 */
export function getGetGuildsGuildIdVoiceStatesMeKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/voice-states/@me', args] as const
}

/**
 * PATCH /guilds/{guild_id}/voice-states/@me
 */
export function usePatchGuildsGuildIdVoiceStatesMe(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
  >(
    'PATCH /guilds/:guild_id/voice-states/@me',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/voice-states/{user_id}
 */
export function useGetGuildsGuildIdVoiceStatesUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/guilds/:guild_id/voice-states/:user_id', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.guilds[':guild_id']['voice-states'][':user_id'].$get(args, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/voice-states/{user_id}
 */
export function getGetGuildsGuildIdVoiceStatesUserIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/voice-states/:user_id', args] as const
}

/**
 * PATCH /guilds/{guild_id}/voice-states/{user_id}
 */
export function usePatchGuildsGuildIdVoiceStatesUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
  >(
    'PATCH /guilds/:guild_id/voice-states/:user_id',
    async (_, { arg }) =>
      parseResponse(
        client.guilds[':guild_id']['voice-states'][':user_id'].$patch(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/webhooks
 */
export function useGetGuildsGuildIdWebhooks(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/webhooks', args] as const) : null
  return useSWR<InferResponseType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>, Error>(
    key,
    async () => parseResponse(client.guilds[':guild_id'].webhooks.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/webhooks
 */
export function getGetGuildsGuildIdWebhooksKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/webhooks', args] as const
}

/**
 * GET /guilds/{guild_id}/welcome-screen
 */
export function useGetGuildsGuildIdWelcomeScreen(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/welcome-screen', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.guilds[':guild_id']['welcome-screen'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/welcome-screen
 */
export function getGetGuildsGuildIdWelcomeScreenKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/welcome-screen', args] as const
}

/**
 * PATCH /guilds/{guild_id}/welcome-screen
 */
export function usePatchGuildsGuildIdWelcomeScreen(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>
  >(
    'PATCH /guilds/:guild_id/welcome-screen',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id']['welcome-screen'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/widget
 */
export function useGetGuildsGuildIdWidget(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/widget', args] as const) : null
  return useSWR<InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$get']>, Error>(
    key,
    async () => parseResponse(client.guilds[':guild_id'].widget.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/widget
 */
export function getGetGuildsGuildIdWidgetKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/widget', args] as const
}

/**
 * PATCH /guilds/{guild_id}/widget
 */
export function usePatchGuildsGuildIdWidget(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>
  >(
    'PATCH /guilds/:guild_id/widget',
    async (_, { arg }) =>
      parseResponse(client.guilds[':guild_id'].widget.$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /guilds/{guild_id}/widget.json
 */
export function useGetGuildsGuildIdWidgetJson(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/widget.json', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.guilds[':guild_id']['widget.json'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/widget.json
 */
export function getGetGuildsGuildIdWidgetJsonKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/widget.json', args] as const
}

/**
 * GET /guilds/{guild_id}/widget.png
 */
export function useGetGuildsGuildIdWidgetPng(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/guilds/:guild_id/widget.png', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
    Error
  >(
    key,
    async () => parseResponse(client.guilds[':guild_id']['widget.png'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/widget.png
 */
export function getGetGuildsGuildIdWidgetPngKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
) {
  return ['GET', '/guilds/:guild_id/widget.png', args] as const
}

/**
 * POST /interactions/{interaction_id}/{interaction_token}/callback
 */
export function usePostInteractionsInteractionIdInteractionTokenCallback(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
    >
  >(
    'POST /interactions/:interaction_id/:interaction_token/callback',
    async (_, { arg }) =>
      parseResponse(
        client.interactions[':interaction_id'][':interaction_token'].callback.$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /invites/{code}
 */
export function useGetInvitesCode(
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.invites)[':code']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/invites/:code', args] as const) : null
  return useSWR<InferResponseType<(typeof client.invites)[':code']['$get']>, Error>(
    key,
    async () => parseResponse(client.invites[':code'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /invites/{code}
 */
export function getGetInvitesCodeKey(
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
) {
  return ['GET', '/invites/:code', args] as const
}

/**
 * DELETE /invites/{code}
 */
export function useDeleteInvitesCode(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.invites)[':code']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.invites)[':code']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.invites)[':code']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.invites)[':code']['$delete']>
  >(
    'DELETE /invites/:code',
    async (_, { arg }) => parseResponse(client.invites[':code'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PUT /lobbies
 */
export function usePutLobbies(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.lobbies.$put>,
    Error,
    string,
    InferRequestType<typeof client.lobbies.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.lobbies.$put>,
    Error,
    string,
    InferRequestType<typeof client.lobbies.$put>
  >(
    'PUT /lobbies',
    async (_, { arg }) => parseResponse(client.lobbies.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /lobbies
 */
export function usePostLobbies(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.lobbies.$post>,
    Error,
    string,
    InferRequestType<typeof client.lobbies.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.lobbies.$post>,
    Error,
    string,
    InferRequestType<typeof client.lobbies.$post>
  >(
    'POST /lobbies',
    async (_, { arg }) => parseResponse(client.lobbies.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /lobbies/{lobby_id}
 */
export function useGetLobbiesLobbyId(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.lobbies)[':lobby_id']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/lobbies/:lobby_id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.lobbies)[':lobby_id']['$get']>, Error>(
    key,
    async () => parseResponse(client.lobbies[':lobby_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /lobbies/{lobby_id}
 */
export function getGetLobbiesLobbyIdKey(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
) {
  return ['GET', '/lobbies/:lobby_id', args] as const
}

/**
 * PATCH /lobbies/{lobby_id}
 */
export function usePatchLobbiesLobbyId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>
  >(
    'PATCH /lobbies/:lobby_id',
    async (_, { arg }) => parseResponse(client.lobbies[':lobby_id'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /lobbies/{lobby_id}/channel-linking
 */
export function usePatchLobbiesLobbyIdChannelLinking(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
  >(
    'PATCH /lobbies/:lobby_id/channel-linking',
    async (_, { arg }) =>
      parseResponse(client.lobbies[':lobby_id']['channel-linking'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /lobbies/{lobby_id}/members/@me
 */
export function useDeleteLobbiesLobbyIdMembersMe(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
  >(
    'DELETE /lobbies/:lobby_id/members/@me',
    async (_, { arg }) =>
      parseResponse(client.lobbies[':lobby_id'].members['@me'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /lobbies/{lobby_id}/members/@me/invites
 */
export function usePostLobbiesLobbyIdMembersMeInvites(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>
  >(
    'POST /lobbies/:lobby_id/members/@me/invites',
    async (_, { arg }) =>
      parseResponse(client.lobbies[':lobby_id'].members['@me'].invites.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /lobbies/{lobby_id}/members/bulk
 */
export function usePostLobbiesLobbyIdMembersBulk(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
  >(
    'POST /lobbies/:lobby_id/members/bulk',
    async (_, { arg }) =>
      parseResponse(client.lobbies[':lobby_id'].members.bulk.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PUT /lobbies/{lobby_id}/members/{user_id}
 */
export function usePutLobbiesLobbyIdMembersUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
  >(
    'PUT /lobbies/:lobby_id/members/:user_id',
    async (_, { arg }) =>
      parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /lobbies/{lobby_id}/members/{user_id}
 */
export function useDeleteLobbiesLobbyIdMembersUserId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
  >(
    'DELETE /lobbies/:lobby_id/members/:user_id',
    async (_, { arg }) =>
      parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /lobbies/{lobby_id}/members/{user_id}/invites
 */
export function usePostLobbiesLobbyIdMembersUserIdInvites(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
    >
  >(
    'POST /lobbies/:lobby_id/members/:user_id/invites',
    async (_, { arg }) =>
      parseResponse(
        client.lobbies[':lobby_id'].members[':user_id'].invites.$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /lobbies/{lobby_id}/messages
 */
export function useGetLobbiesLobbyIdMessages(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/lobbies/:lobby_id/messages', args] as const) : null
  return useSWR<InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>, Error>(
    key,
    async () => parseResponse(client.lobbies[':lobby_id'].messages.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /lobbies/{lobby_id}/messages
 */
export function getGetLobbiesLobbyIdMessagesKey(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
) {
  return ['GET', '/lobbies/:lobby_id/messages', args] as const
}

/**
 * POST /lobbies/{lobby_id}/messages
 */
export function usePostLobbiesLobbyIdMessages(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>
  >(
    'POST /lobbies/:lobby_id/messages',
    async (_, { arg }) =>
      parseResponse(client.lobbies[':lobby_id'].messages.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /oauth2/@me
 */
export function useGetOauth2Me(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client.oauth2)['@me']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/oauth2/@me'] as const) : null
  return useSWR<InferResponseType<(typeof client.oauth2)['@me']['$get']>, Error>(
    key,
    async () => parseResponse(client.oauth2['@me'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /oauth2/@me
 */
export function getGetOauth2MeKey() {
  return ['GET', '/oauth2/@me'] as const
}

/**
 * GET /oauth2/applications/@me
 */
export function useGetOauth2ApplicationsMe(options?: {
  swr?: SWRConfiguration<
    InferResponseType<(typeof client.oauth2.applications)['@me']['$get']>,
    Error
  >
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/oauth2/applications/@me'] as const) : null
  return useSWR<InferResponseType<(typeof client.oauth2.applications)['@me']['$get']>, Error>(
    key,
    async () => parseResponse(client.oauth2.applications['@me'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /oauth2/applications/@me
 */
export function getGetOauth2ApplicationsMeKey() {
  return ['GET', '/oauth2/applications/@me'] as const
}

/**
 * GET /oauth2/keys
 */
export function useGetOauth2Keys(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.oauth2.keys.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/oauth2/keys'] as const) : null
  return useSWR<InferResponseType<typeof client.oauth2.keys.$get>, Error>(
    key,
    async () => parseResponse(client.oauth2.keys.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /oauth2/keys
 */
export function getGetOauth2KeysKey() {
  return ['GET', '/oauth2/keys'] as const
}

/**
 * GET /oauth2/userinfo
 */
export function useGetOauth2Userinfo(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.oauth2.userinfo.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/oauth2/userinfo'] as const) : null
  return useSWR<InferResponseType<typeof client.oauth2.userinfo.$get>, Error>(
    key,
    async () => parseResponse(client.oauth2.userinfo.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /oauth2/userinfo
 */
export function getGetOauth2UserinfoKey() {
  return ['GET', '/oauth2/userinfo'] as const
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge
 */
export function usePostPartnerSdkProvisionalAccountsUnmerge(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>
  >(
    'POST /partner-sdk/provisional-accounts/unmerge',
    async (_, { arg }) =>
      parseResponse(
        client['partner-sdk']['provisional-accounts'].unmerge.$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge/bot
 */
export function usePostPartnerSdkProvisionalAccountsUnmergeBot(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
    >
  >(
    'POST /partner-sdk/provisional-accounts/unmerge/bot',
    async (_, { arg }) =>
      parseResponse(
        client['partner-sdk']['provisional-accounts'].unmerge.bot.$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * POST /partner-sdk/token
 */
export function usePostPartnerSdkToken(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['partner-sdk']['token']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['partner-sdk']['token']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['partner-sdk']['token']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['partner-sdk']['token']['$post']>
  >(
    'POST /partner-sdk/token',
    async (_, { arg }) => parseResponse(client['partner-sdk'].token.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /partner-sdk/token/bot
 */
export function usePostPartnerSdkTokenBot(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['partner-sdk']['token']['bot']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['partner-sdk']['token']['bot']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>
  >(
    'POST /partner-sdk/token/bot',
    async (_, { arg }) =>
      parseResponse(client['partner-sdk'].token.bot.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /soundboard-default-sounds
 */
export function useGetSoundboardDefaultSounds(options?: {
  swr?: SWRConfiguration<
    InferResponseType<(typeof client)['soundboard-default-sounds']['$get']>,
    Error
  >
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/soundboard-default-sounds'] as const) : null
  return useSWR<InferResponseType<(typeof client)['soundboard-default-sounds']['$get']>, Error>(
    key,
    async () => parseResponse(client['soundboard-default-sounds'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /soundboard-default-sounds
 */
export function getGetSoundboardDefaultSoundsKey() {
  return ['GET', '/soundboard-default-sounds'] as const
}

/**
 * POST /stage-instances
 */
export function usePostStageInstances(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['stage-instances']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['stage-instances']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['stage-instances']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['stage-instances']['$post']>
  >(
    'POST /stage-instances',
    async (_, { arg }) => parseResponse(client['stage-instances'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /stage-instances/{channel_id}
 */
export function useGetStageInstancesChannelId(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client)['stage-instances'][':channel_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/stage-instances/:channel_id', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client)['stage-instances'][':channel_id']['$get']>,
    Error
  >(
    key,
    async () => parseResponse(client['stage-instances'][':channel_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /stage-instances/{channel_id}
 */
export function getGetStageInstancesChannelIdKey(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
) {
  return ['GET', '/stage-instances/:channel_id', args] as const
}

/**
 * DELETE /stage-instances/{channel_id}
 */
export function useDeleteStageInstancesChannelId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['stage-instances'][':channel_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['stage-instances'][':channel_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>
  >(
    'DELETE /stage-instances/:channel_id',
    async (_, { arg }) =>
      parseResponse(client['stage-instances'][':channel_id'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /stage-instances/{channel_id}
 */
export function usePatchStageInstancesChannelId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['stage-instances'][':channel_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['stage-instances'][':channel_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>
  >(
    'PATCH /stage-instances/:channel_id',
    async (_, { arg }) =>
      parseResponse(client['stage-instances'][':channel_id'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /sticker-packs
 */
export function useGetStickerPacks(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client)['sticker-packs']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/sticker-packs'] as const) : null
  return useSWR<InferResponseType<(typeof client)['sticker-packs']['$get']>, Error>(
    key,
    async () => parseResponse(client['sticker-packs'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /sticker-packs
 */
export function getGetStickerPacksKey() {
  return ['GET', '/sticker-packs'] as const
}

/**
 * GET /sticker-packs/{pack_id}
 */
export function useGetStickerPacksPackId(
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/sticker-packs/:pack_id', args] as const) : null
  return useSWR<InferResponseType<(typeof client)['sticker-packs'][':pack_id']['$get']>, Error>(
    key,
    async () => parseResponse(client['sticker-packs'][':pack_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /sticker-packs/{pack_id}
 */
export function getGetStickerPacksPackIdKey(
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
) {
  return ['GET', '/sticker-packs/:pack_id', args] as const
}

/**
 * GET /stickers/{sticker_id}
 */
export function useGetStickersStickerId(
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.stickers)[':sticker_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/stickers/:sticker_id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.stickers)[':sticker_id']['$get']>, Error>(
    key,
    async () => parseResponse(client.stickers[':sticker_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /stickers/{sticker_id}
 */
export function getGetStickersStickerIdKey(
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
) {
  return ['GET', '/stickers/:sticker_id', args] as const
}

/**
 * GET /users/@me
 */
export function useGetUsersMe(options?: {
  swr?: SWRConfiguration<InferResponseType<(typeof client.users)['@me']['$get']>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/users/@me'] as const) : null
  return useSWR<InferResponseType<(typeof client.users)['@me']['$get']>, Error>(
    key,
    async () => parseResponse(client.users['@me'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /users/@me
 */
export function getGetUsersMeKey() {
  return ['GET', '/users/@me'] as const
}

/**
 * PATCH /users/@me
 */
export function usePatchUsersMe(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)['@me']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.users)['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)['@me']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.users)['@me']['$patch']>
  >(
    'PATCH /users/@me',
    async (_, { arg }) => parseResponse(client.users['@me'].$patch(arg, options?.client)),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/users/@me/applications/:application_id/entitlements', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.users['@me'].applications[':application_id'].entitlements.$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /users/@me/applications/{application_id}/entitlements
 */
export function getGetUsersMeApplicationsApplicationIdEntitlementsKey(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
) {
  return ['GET', '/users/@me/applications/:application_id/entitlements', args] as const
}

/**
 * GET /users/@me/applications/{application_id}/role-connection
 */
export function useGetUsersMeApplicationsApplicationIdRoleConnection(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/users/@me/applications/:application_id/role-connection', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.users['@me'].applications[':application_id']['role-connection'].$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /users/@me/applications/{application_id}/role-connection
 */
export function getGetUsersMeApplicationsApplicationIdRoleConnectionKey(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
) {
  return ['GET', '/users/@me/applications/:application_id/role-connection', args] as const
}

/**
 * PUT /users/@me/applications/{application_id}/role-connection
 */
export function usePutUsersMeApplicationsApplicationIdRoleConnection(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
    >
  >(
    'PUT /users/@me/applications/:application_id/role-connection',
    async (_, { arg }) =>
      parseResponse(
        client.users['@me'].applications[':application_id']['role-connection'].$put(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * DELETE /users/@me/applications/{application_id}/role-connection
 */
export function useDeleteUsersMeApplicationsApplicationIdRoleConnection(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
    >
  >(
    'DELETE /users/@me/applications/:application_id/role-connection',
    async (_, { arg }) =>
      parseResponse(
        client.users['@me'].applications[':application_id']['role-connection'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * POST /users/@me/channels
 */
export function usePostUsersMeChannels(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)['@me']['channels']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)['@me']['channels']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)['@me']['channels']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)['@me']['channels']['$post']>
  >(
    'POST /users/@me/channels',
    async (_, { arg }) => parseResponse(client.users['@me'].channels.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /users/@me/connections
 */
export function useGetUsersMeConnections(options?: {
  swr?: SWRConfiguration<
    InferResponseType<(typeof client.users)['@me']['connections']['$get']>,
    Error
  >
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/users/@me/connections'] as const) : null
  return useSWR<InferResponseType<(typeof client.users)['@me']['connections']['$get']>, Error>(
    key,
    async () => parseResponse(client.users['@me'].connections.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /users/@me/connections
 */
export function getGetUsersMeConnectionsKey() {
  return ['GET', '/users/@me/connections'] as const
}

/**
 * GET /users/@me/guilds
 */
export function useGetUsersMeGuilds(
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.users)['@me']['guilds']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/users/@me/guilds', args] as const) : null
  return useSWR<InferResponseType<(typeof client.users)['@me']['guilds']['$get']>, Error>(
    key,
    async () => parseResponse(client.users['@me'].guilds.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /users/@me/guilds
 */
export function getGetUsersMeGuildsKey(
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
) {
  return ['GET', '/users/@me/guilds', args] as const
}

/**
 * DELETE /users/@me/guilds/{guild_id}
 */
export function useDeleteUsersMeGuildsGuildId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>
  >(
    'DELETE /users/@me/guilds/:guild_id',
    async (_, { arg }) =>
      parseResponse(client.users['@me'].guilds[':guild_id'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /users/@me/guilds/{guild_id}/member
 */
export function useGetUsersMeGuildsGuildIdMember(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/users/@me/guilds/:guild_id/member', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.users['@me'].guilds[':guild_id'].member.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /users/@me/guilds/{guild_id}/member
 */
export function getGetUsersMeGuildsGuildIdMemberKey(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
) {
  return ['GET', '/users/@me/guilds/:guild_id/member', args] as const
}

/**
 * GET /users/{user_id}
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.users)[':user_id']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/users/:user_id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.users)[':user_id']['$get']>, Error>(
    key,
    async () => parseResponse(client.users[':user_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /users/{user_id}
 */
export function getGetUsersUserIdKey(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return ['GET', '/users/:user_id', args] as const
}

/**
 * GET /voice/regions
 */
export function useGetVoiceRegions(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.voice.regions.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/voice/regions'] as const) : null
  return useSWR<InferResponseType<typeof client.voice.regions.$get>, Error>(
    key,
    async () => parseResponse(client.voice.regions.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /voice/regions
 */
export function getGetVoiceRegionsKey() {
  return ['GET', '/voice/regions'] as const
}

/**
 * GET /webhooks/{webhook_id}
 */
export function useGetWebhooksWebhookId(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.webhooks)[':webhook_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/webhooks/:webhook_id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.webhooks)[':webhook_id']['$get']>, Error>(
    key,
    async () => parseResponse(client.webhooks[':webhook_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /webhooks/{webhook_id}
 */
export function getGetWebhooksWebhookIdKey(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
) {
  return ['GET', '/webhooks/:webhook_id', args] as const
}

/**
 * DELETE /webhooks/{webhook_id}
 */
export function useDeleteWebhooksWebhookId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhook_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.webhooks)[':webhook_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>
  >(
    'DELETE /webhooks/:webhook_id',
    async (_, { arg }) =>
      parseResponse(client.webhooks[':webhook_id'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /webhooks/{webhook_id}
 */
export function usePatchWebhooksWebhookId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhook_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.webhooks)[':webhook_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>
  >(
    'PATCH /webhooks/:webhook_id',
    async (_, { arg }) =>
      parseResponse(client.webhooks[':webhook_id'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /webhooks/{webhook_id}/{webhook_token}
 */
export function useGetWebhooksWebhookIdWebhookToken(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/webhooks/:webhook_id/:webhook_token', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /webhooks/{webhook_id}/{webhook_token}
 */
export function getGetWebhooksWebhookIdWebhookTokenKey(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
) {
  return ['GET', '/webhooks/:webhook_id/:webhook_token', args] as const
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}
 */
export function usePostWebhooksWebhookIdWebhookToken(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
  >(
    'POST /webhooks/:webhook_id/:webhook_token',
    async (_, { arg }) =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}
 */
export function useDeleteWebhooksWebhookIdWebhookToken(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
  >(
    'DELETE /webhooks/:webhook_id/:webhook_token',
    async (_, { arg }) =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}
 */
export function usePatchWebhooksWebhookIdWebhookToken(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
  >(
    'PATCH /webhooks/:webhook_id/:webhook_token',
    async (_, { arg }) =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/github
 */
export function usePostWebhooksWebhookIdWebhookTokenGithub(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']>
  >(
    'POST /webhooks/:webhook_id/:webhook_token/github',
    async (_, { arg }) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].github.$post(arg, options?.client),
      ),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/webhooks/:webhook_id/:webhook_token/messages/@original', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesOriginalKey(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
) {
  return ['GET', '/webhooks/:webhook_id/:webhook_token/messages/@original', args] as const
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
    >
  >(
    'DELETE /webhooks/:webhook_id/:webhook_token/messages/@original',
    async (_, { arg }) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function usePatchWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
    >
  >(
    'PATCH /webhooks/:webhook_id/:webhook_token/messages/@original',
    async (_, { arg }) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$patch(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/webhooks/:webhook_id/:webhook_token/messages/:message_id', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdKey(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
) {
  return ['GET', '/webhooks/:webhook_id/:webhook_token/messages/:message_id', args] as const
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
    >
  >(
    'DELETE /webhooks/:webhook_id/:webhook_token/messages/:message_id',
    async (_, { arg }) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function usePatchWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
    >
  >(
    'PATCH /webhooks/:webhook_id/:webhook_token/messages/:message_id',
    async (_, { arg }) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$patch(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/slack
 */
export function usePostWebhooksWebhookIdWebhookTokenSlack(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']>
  >(
    'POST /webhooks/:webhook_id/:webhook_token/slack',
    async (_, { arg }) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].slack.$post(arg, options?.client),
      ),
    options?.swr,
  )
}
