import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discord-api-spec-openapi'

/**
 * GET /applications/@me
 */
export function useGetApplicationsMe(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetApplicationsMeQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.applications['@me'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /applications/@me
 */
export function getGetApplicationsMeQueryKey() {
  return ['/applications/@me'] as const
}

/**
 * PATCH /applications/@me
 */
export function usePatchApplicationsMe(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.applications)['@me']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.applications)['@me']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.applications['@me'].$patch(args, clientOptions)),
  })
}

/**
 * GET /applications/{application_id}
 */
export function useGetApplicationsApplicationId(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetApplicationsApplicationIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}
 */
export function getGetApplicationsApplicationIdQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
) {
  return ['/applications/:application_id', args] as const
}

/**
 * PATCH /applications/{application_id}
 */
export function usePatchApplicationsApplicationId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.applications)[':application_id']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.applications[':application_id'].$patch(args, clientOptions)),
  })
}

/**
 * GET /applications/{application_id}/activity-instances/{instance_id}
 */
export function useGetApplicationsApplicationIdActivityInstancesInstanceId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id']['activity-instances'][':instance_id'].$get(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/activity-instances/{instance_id}
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
export function usePostApplicationsApplicationIdAttachment(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.applications)[':application_id']['attachment']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['attachment']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.applications[':application_id'].attachment.$post(args, clientOptions)),
  })
}

/**
 * GET /applications/{application_id}/commands
 */
export function useGetApplicationsApplicationIdCommands(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetApplicationsApplicationIdCommandsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].commands.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/commands
 */
export function getGetApplicationsApplicationIdCommandsQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
) {
  return ['/applications/:application_id/commands', args] as const
}

/**
 * PUT /applications/{application_id}/commands
 */
export function usePutApplicationsApplicationIdCommands(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.applications)[':application_id']['commands']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.applications[':application_id'].commands.$put(args, clientOptions)),
  })
}

/**
 * POST /applications/{application_id}/commands
 */
export function usePostApplicationsApplicationIdCommands(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.applications)[':application_id']['commands']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.applications[':application_id'].commands.$post(args, clientOptions)),
  })
}

/**
 * GET /applications/{application_id}/commands/{command_id}
 */
export function useGetApplicationsApplicationIdCommandsCommandId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetApplicationsApplicationIdCommandsCommandIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$get(args, clientOptions),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/commands/{command_id}
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
export function useDeleteApplicationsApplicationIdCommandsCommandId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * PATCH /applications/{application_id}/commands/{command_id}
 */
export function usePatchApplicationsApplicationIdCommandsCommandId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetApplicationsApplicationIdEmojisQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].emojis.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/emojis
 */
export function getGetApplicationsApplicationIdEmojisQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
) {
  return ['/applications/:application_id/emojis', args] as const
}

/**
 * POST /applications/{application_id}/emojis
 */
export function usePostApplicationsApplicationIdEmojis(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.applications)[':application_id']['emojis']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.applications[':application_id'].emojis.$post(args, clientOptions)),
  })
}

/**
 * GET /applications/{application_id}/emojis/{emoji_id}
 */
export function useGetApplicationsApplicationIdEmojisEmojiId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetApplicationsApplicationIdEmojisEmojiIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$get(args, clientOptions),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/emojis/{emoji_id}
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
export function useDeleteApplicationsApplicationIdEmojisEmojiId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * PATCH /applications/{application_id}/emojis/{emoji_id}
 */
export function usePatchApplicationsApplicationIdEmojisEmojiId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetApplicationsApplicationIdEntitlementsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].entitlements.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/entitlements
 */
export function getGetApplicationsApplicationIdEntitlementsQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
) {
  return ['/applications/:application_id/entitlements', args] as const
}

/**
 * POST /applications/{application_id}/entitlements
 */
export function usePostApplicationsApplicationIdEntitlements(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.applications)[':application_id']['entitlements']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$post']>
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].entitlements[':entitlement_id'].$get(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/entitlements/{entitlement_id}
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
export function useDeleteApplicationsApplicationIdEntitlementsEntitlementId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
export function usePostApplicationsApplicationIdEntitlementsEntitlementIdConsume(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.$get(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands
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
export function usePutApplicationsApplicationIdGuildsGuildIdCommands(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
export function usePostApplicationsApplicationIdGuildsGuildIdCommands(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.permissions.$get(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
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
export function useGetApplicationsApplicationIdGuildsGuildIdCommandsCommandId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$get(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
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
export function useDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
export function usePatchApplicationsApplicationIdGuildsGuildIdCommandsCommandId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey =
    getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[
          ':command_id'
        ].permissions.$get(args, clientOptions),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
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
export function usePutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetApplicationsApplicationIdRoleConnectionsMetadataQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id']['role-connections'].metadata.$get(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/role-connections/metadata
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
export function usePutApplicationsApplicationIdRoleConnectionsMetadata(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetChannelsChannelIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.channels[':channel_id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}
 */
export function getGetChannelsChannelIdQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
) {
  return ['/channels/:channel_id', args] as const
}

/**
 * DELETE /channels/{channel_id}
 */
export function useDeleteChannelsChannelId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.channels[':channel_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /channels/{channel_id}
 */
export function usePatchChannelsChannelId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.channels[':channel_id'].$patch(args, clientOptions)),
  })
}

/**
 * POST /channels/{channel_id}/followers
 */
export function usePostChannelsChannelIdFollowers(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['followers']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.channels[':channel_id'].followers.$post(args, clientOptions)),
  })
}

/**
 * GET /channels/{channel_id}/invites
 */
export function useGetChannelsChannelIdInvites(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetChannelsChannelIdInvitesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].invites.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/invites
 */
export function getGetChannelsChannelIdInvitesQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
) {
  return ['/channels/:channel_id/invites', args] as const
}

/**
 * POST /channels/{channel_id}/invites
 */
export function usePostChannelsChannelIdInvites(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['invites']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.channels[':channel_id'].invites.$post(args, clientOptions)),
  })
}

/**
 * GET /channels/{channel_id}/messages
 */
export function useGetChannelsChannelIdMessages(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetChannelsChannelIdMessagesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].messages.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/messages
 */
export function getGetChannelsChannelIdMessagesQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
) {
  return ['/channels/:channel_id/messages', args] as const
}

/**
 * POST /channels/{channel_id}/messages
 */
export function usePostChannelsChannelIdMessages(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['messages']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.channels[':channel_id'].messages.$post(args, clientOptions)),
  })
}

/**
 * POST /channels/{channel_id}/messages/bulk-delete
 */
export function usePostChannelsChannelIdMessagesBulkDelete(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']>
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetChannelsChannelIdMessagesPinsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].messages.pins.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/messages/pins
 */
export function getGetChannelsChannelIdMessagesPinsQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
) {
  return ['/channels/:channel_id/messages/pins', args] as const
}

/**
 * PUT /channels/{channel_id}/messages/pins/{message_id}
 */
export function usePutChannelsChannelIdMessagesPinsMessageId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
    >
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.channels[':channel_id'].messages.pins[':message_id'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/messages/pins/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesPinsMessageId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetChannelsChannelIdMessagesMessageIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$get(args, clientOptions),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/messages/{message_id}
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
export function useDeleteChannelsChannelIdMessagesMessageId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * PATCH /channels/{channel_id}/messages/{message_id}
 */
export function usePatchChannelsChannelIdMessagesMessageId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$patch(args, clientOptions),
      ),
  })
}

/**
 * POST /channels/{channel_id}/messages/{message_id}/crosspost
 */
export function usePostChannelsChannelIdMessagesMessageIdCrosspost(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].crosspost.$post(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactions(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$get(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
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
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiName(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
export function usePutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
export function usePostChannelsChannelIdMessagesMessageIdThreads(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].threads.$post(args, clientOptions),
      ),
  })
}

/**
 * PUT /channels/{channel_id}/permissions/{overwrite_id}
 */
export function usePutChannelsChannelIdPermissionsOverwriteId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.channels[':channel_id'].permissions[':overwrite_id'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/permissions/{overwrite_id}
 */
export function useDeleteChannelsChannelIdPermissionsOverwriteId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetChannelsChannelIdPinsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].pins.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/pins
 */
export function getGetChannelsChannelIdPinsQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
) {
  return ['/channels/:channel_id/pins', args] as const
}

/**
 * PUT /channels/{channel_id}/pins/{message_id}
 */
export function usePutChannelsChannelIdPinsMessageId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.channels[':channel_id'].pins[':message_id'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /channels/{channel_id}/pins/{message_id}
 */
export function useDeleteChannelsChannelIdPinsMessageId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].polls[':message_id'].answers[':answer_id'].$get(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
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
export function usePostChannelsChannelIdPollsMessageIdExpire(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
    >
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.channels[':channel_id'].polls[':message_id'].expire.$post(args, clientOptions),
      ),
  })
}

/**
 * PUT /channels/{channel_id}/recipients/{user_id}
 */
export function usePutChannelsChannelIdRecipientsUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.channels[':channel_id'].recipients[':user_id'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/recipients/{user_id}
 */
export function useDeleteChannelsChannelIdRecipientsUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.channels[':channel_id'].recipients[':user_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * POST /channels/{channel_id}/send-soundboard-sound
 */
export function usePostChannelsChannelIdSendSoundboardSound(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetChannelsChannelIdThreadMembersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.channels[':channel_id']['thread-members'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/thread-members
 */
export function getGetChannelsChannelIdThreadMembersQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
) {
  return ['/channels/:channel_id/thread-members', args] as const
}

/**
 * PUT /channels/{channel_id}/thread-members/@me
 */
export function usePutChannelsChannelIdThreadMembersMe(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.channels[':channel_id']['thread-members']['@me'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/thread-members/@me
 */
export function useDeleteChannelsChannelIdThreadMembersMe(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']>
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetChannelsChannelIdThreadMembersUserIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$get(args, clientOptions),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/thread-members/{user_id}
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
export function usePutChannelsChannelIdThreadMembersUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/thread-members/{user_id}
 */
export function useDeleteChannelsChannelIdThreadMembersUserId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * POST /channels/{channel_id}/threads
 */
export function usePostChannelsChannelIdThreads(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['threads']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.channels[':channel_id'].threads.$post(args, clientOptions)),
  })
}

/**
 * GET /channels/{channel_id}/threads/archived/private
 */
export function useGetChannelsChannelIdThreadsArchivedPrivate(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetChannelsChannelIdThreadsArchivedPrivateQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].threads.archived.private.$get(args, clientOptions),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/threads/archived/private
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
export function useGetChannelsChannelIdThreadsArchivedPublic(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetChannelsChannelIdThreadsArchivedPublicQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].threads.archived.public.$get(args, clientOptions),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/threads/archived/public
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
export function useGetChannelsChannelIdThreadsSearch(
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetChannelsChannelIdThreadsSearchQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].threads.search.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/threads/search
 */
export function getGetChannelsChannelIdThreadsSearchQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
) {
  return ['/channels/:channel_id/threads/search', args] as const
}

/**
 * POST /channels/{channel_id}/typing
 */
export function usePostChannelsChannelIdTyping(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['typing']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.channels[':channel_id'].typing.$post(args, clientOptions)),
  })
}

/**
 * GET /channels/{channel_id}/users/@me/threads/archived/private
 */
export function useGetChannelsChannelIdUsersMeThreadsArchivedPrivate(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].users['@me'].threads.archived.private.$get(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/users/@me/threads/archived/private
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
export function useGetChannelsChannelIdWebhooks(
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetChannelsChannelIdWebhooksQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].webhooks.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/webhooks
 */
export function getGetChannelsChannelIdWebhooksQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
) {
  return ['/channels/:channel_id/webhooks', args] as const
}

/**
 * POST /channels/{channel_id}/webhooks
 */
export function usePostChannelsChannelIdWebhooks(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.channels[':channel_id'].webhooks.$post(args, clientOptions)),
  })
}

/**
 * GET /gateway
 */
export function useGetGateway(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetGatewayQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.gateway.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /gateway
 */
export function getGetGatewayQueryKey() {
  return ['/gateway'] as const
}

/**
 * GET /gateway/bot
 */
export function useGetGatewayBot(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetGatewayBotQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.gateway.bot.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /gateway/bot
 */
export function getGetGatewayBotQueryKey() {
  return ['/gateway/bot'] as const
}

/**
 * GET /guilds/templates/{code}
 */
export function useGetGuildsTemplatesCode(
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsTemplatesCodeQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.guilds.templates[':code'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/templates/{code}
 */
export function getGetGuildsTemplatesCodeQueryKey(
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
) {
  return ['/guilds/templates/:code', args] as const
}

/**
 * GET /guilds/{guild_id}
 */
export function useGetGuildsGuildId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.guilds[':guild_id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}
 */
export function getGetGuildsGuildIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
) {
  return ['/guilds/:guild_id', args] as const
}

/**
 * PATCH /guilds/{guild_id}
 */
export function usePatchGuildsGuildId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/audit-logs
 */
export function useGetGuildsGuildIdAuditLogs(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdAuditLogsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['audit-logs'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/audit-logs
 */
export function getGetGuildsGuildIdAuditLogsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
) {
  return ['/guilds/:guild_id/audit-logs', args] as const
}

/**
 * GET /guilds/{guild_id}/auto-moderation/rules
 */
export function useGetGuildsGuildIdAutoModerationRules(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdAutoModerationRulesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['auto-moderation'].rules.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/auto-moderation/rules
 */
export function getGetGuildsGuildIdAutoModerationRulesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
) {
  return ['/guilds/:guild_id/auto-moderation/rules', args] as const
}

/**
 * POST /guilds/{guild_id}/auto-moderation/rules
 */
export function usePostGuildsGuildIdAutoModerationRules(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdAutoModerationRulesRuleIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$get(args, clientOptions),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
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
export function useDeleteGuildsGuildIdAutoModerationRulesRuleId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
export function usePatchGuildsGuildIdAutoModerationRulesRuleId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdBansQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.guilds[':guild_id'].bans.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/bans
 */
export function getGetGuildsGuildIdBansQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
) {
  return ['/guilds/:guild_id/bans', args] as const
}

/**
 * GET /guilds/{guild_id}/bans/{user_id}
 */
export function useGetGuildsGuildIdBansUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdBansUserIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].bans[':user_id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/bans/{user_id}
 */
export function getGetGuildsGuildIdBansUserIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/bans/:user_id', args] as const
}

/**
 * PUT /guilds/{guild_id}/bans/{user_id}
 */
export function usePutGuildsGuildIdBansUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].bans[':user_id'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /guilds/{guild_id}/bans/{user_id}
 */
export function useDeleteGuildsGuildIdBansUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].bans[':user_id'].$delete(args, clientOptions)),
  })
}

/**
 * POST /guilds/{guild_id}/bulk-ban
 */
export function usePostGuildsGuildIdBulkBan(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id']['bulk-ban'].$post(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/channels
 */
export function useGetGuildsGuildIdChannels(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdChannelsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].channels.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/channels
 */
export function getGetGuildsGuildIdChannelsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
) {
  return ['/guilds/:guild_id/channels', args] as const
}

/**
 * POST /guilds/{guild_id}/channels
 */
export function usePostGuildsGuildIdChannels(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].channels.$post(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/channels
 */
export function usePatchGuildsGuildIdChannels(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].channels.$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/emojis
 */
export function useGetGuildsGuildIdEmojis(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdEmojisQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.guilds[':guild_id'].emojis.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/emojis
 */
export function getGetGuildsGuildIdEmojisQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
) {
  return ['/guilds/:guild_id/emojis', args] as const
}

/**
 * POST /guilds/{guild_id}/emojis
 */
export function usePostGuildsGuildIdEmojis(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].emojis.$post(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useGetGuildsGuildIdEmojisEmojiId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdEmojisEmojiIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/emojis/{emoji_id}
 */
export function getGetGuildsGuildIdEmojisEmojiIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
) {
  return ['/guilds/:guild_id/emojis/:emoji_id', args] as const
}

/**
 * DELETE /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useDeleteGuildsGuildIdEmojisEmojiId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/emojis/{emoji_id}
 */
export function usePatchGuildsGuildIdEmojisEmojiId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/integrations
 */
export function useGetGuildsGuildIdIntegrations(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdIntegrationsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].integrations.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/integrations
 */
export function getGetGuildsGuildIdIntegrationsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
) {
  return ['/guilds/:guild_id/integrations', args] as const
}

/**
 * DELETE /guilds/{guild_id}/integrations/{integration_id}
 */
export function useDeleteGuildsGuildIdIntegrationsIntegrationId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdInvitesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].invites.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/invites
 */
export function getGetGuildsGuildIdInvitesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
) {
  return ['/guilds/:guild_id/invites', args] as const
}

/**
 * GET /guilds/{guild_id}/members
 */
export function useGetGuildsGuildIdMembers(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdMembersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].members.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/members
 */
export function getGetGuildsGuildIdMembersQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
) {
  return ['/guilds/:guild_id/members', args] as const
}

/**
 * PATCH /guilds/{guild_id}/members/@me
 */
export function usePatchGuildsGuildIdMembersMe(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].members['@me'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/members/search
 */
export function useGetGuildsGuildIdMembersSearch(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdMembersSearchQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].members.search.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/members/search
 */
export function getGetGuildsGuildIdMembersSearchQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
) {
  return ['/guilds/:guild_id/members/search', args] as const
}

/**
 * GET /guilds/{guild_id}/members/{user_id}
 */
export function useGetGuildsGuildIdMembersUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdMembersUserIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].members[':user_id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/members/{user_id}
 */
export function getGetGuildsGuildIdMembersUserIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/members/:user_id', args] as const
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}
 */
export function usePutGuildsGuildIdMembersUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].members[':user_id'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}
 */
export function useDeleteGuildsGuildIdMembersUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].members[':user_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/members/{user_id}
 */
export function usePatchGuildsGuildIdMembersUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].members[':user_id'].$patch(args, clientOptions)),
  })
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function usePutGuildsGuildIdMembersUserIdRolesRoleId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
    >
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdMembersUserIdRolesRoleId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$delete(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * GET /guilds/{guild_id}/new-member-welcome
 */
export function useGetGuildsGuildIdNewMemberWelcome(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdNewMemberWelcomeQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['new-member-welcome'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/new-member-welcome
 */
export function getGetGuildsGuildIdNewMemberWelcomeQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
) {
  return ['/guilds/:guild_id/new-member-welcome', args] as const
}

/**
 * GET /guilds/{guild_id}/onboarding
 */
export function useGetGuildsGuildIdOnboarding(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdOnboardingQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].onboarding.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/onboarding
 */
export function getGetGuildsGuildIdOnboardingQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
) {
  return ['/guilds/:guild_id/onboarding', args] as const
}

/**
 * PUT /guilds/{guild_id}/onboarding
 */
export function usePutGuildsGuildIdOnboarding(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].onboarding.$put(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/preview
 */
export function useGetGuildsGuildIdPreview(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdPreviewQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].preview.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/preview
 */
export function getGetGuildsGuildIdPreviewQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
) {
  return ['/guilds/:guild_id/preview', args] as const
}

/**
 * GET /guilds/{guild_id}/prune
 */
export function useGetGuildsGuildIdPrune(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdPruneQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.guilds[':guild_id'].prune.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/prune
 */
export function getGetGuildsGuildIdPruneQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
) {
  return ['/guilds/:guild_id/prune', args] as const
}

/**
 * POST /guilds/{guild_id}/prune
 */
export function usePostGuildsGuildIdPrune(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].prune.$post(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/regions
 */
export function useGetGuildsGuildIdRegions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdRegionsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].regions.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/regions
 */
export function getGetGuildsGuildIdRegionsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
) {
  return ['/guilds/:guild_id/regions', args] as const
}

/**
 * GET /guilds/{guild_id}/roles
 */
export function useGetGuildsGuildIdRoles(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdRolesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.guilds[':guild_id'].roles.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/roles
 */
export function getGetGuildsGuildIdRolesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
) {
  return ['/guilds/:guild_id/roles', args] as const
}

/**
 * POST /guilds/{guild_id}/roles
 */
export function usePostGuildsGuildIdRoles(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].roles.$post(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/roles
 */
export function usePatchGuildsGuildIdRoles(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].roles.$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/roles/{role_id}
 */
export function useGetGuildsGuildIdRolesRoleId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdRolesRoleIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].roles[':role_id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/roles/{role_id}
 */
export function getGetGuildsGuildIdRolesRoleIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
) {
  return ['/guilds/:guild_id/roles/:role_id', args] as const
}

/**
 * DELETE /guilds/{guild_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdRolesRoleId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].roles[':role_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/roles/{role_id}
 */
export function usePatchGuildsGuildIdRolesRoleId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].roles[':role_id'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/scheduled-events
 */
export function useGetGuildsGuildIdScheduledEvents(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdScheduledEventsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['scheduled-events'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/scheduled-events
 */
export function getGetGuildsGuildIdScheduledEventsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
) {
  return ['/guilds/:guild_id/scheduled-events', args] as const
}

/**
 * POST /guilds/{guild_id}/scheduled-events
 */
export function usePostGuildsGuildIdScheduledEvents(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id']['scheduled-events'].$post(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function useGetGuildsGuildIdScheduledEventsGuildScheduledEventId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$get(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
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
export function useDeleteGuildsGuildIdScheduledEventsGuildScheduledEventId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
export function usePatchGuildsGuildIdScheduledEventsGuildScheduledEventId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].users.$get(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
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
export function useGetGuildsGuildIdSoundboardSounds(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdSoundboardSoundsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/soundboard-sounds
 */
export function getGetGuildsGuildIdSoundboardSoundsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
) {
  return ['/guilds/:guild_id/soundboard-sounds', args] as const
}

/**
 * POST /guilds/{guild_id}/soundboard-sounds
 */
export function usePostGuildsGuildIdSoundboardSounds(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$post(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function useGetGuildsGuildIdSoundboardSoundsSoundId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdSoundboardSoundsSoundIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$get(args, clientOptions),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
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
export function useDeleteGuildsGuildIdSoundboardSoundsSoundId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * PATCH /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function usePatchGuildsGuildIdSoundboardSoundsSoundId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
    >
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdStickersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].stickers.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/stickers
 */
export function getGetGuildsGuildIdStickersQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
) {
  return ['/guilds/:guild_id/stickers', args] as const
}

/**
 * POST /guilds/{guild_id}/stickers
 */
export function usePostGuildsGuildIdStickers(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].stickers.$post(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useGetGuildsGuildIdStickersStickerId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdStickersStickerIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].stickers[':sticker_id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/stickers/{sticker_id}
 */
export function getGetGuildsGuildIdStickersStickerIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
) {
  return ['/guilds/:guild_id/stickers/:sticker_id', args] as const
}

/**
 * DELETE /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useDeleteGuildsGuildIdStickersStickerId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.guilds[':guild_id'].stickers[':sticker_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * PATCH /guilds/{guild_id}/stickers/{sticker_id}
 */
export function usePatchGuildsGuildIdStickersStickerId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].stickers[':sticker_id'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/templates
 */
export function useGetGuildsGuildIdTemplates(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdTemplatesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].templates.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/templates
 */
export function getGetGuildsGuildIdTemplatesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
) {
  return ['/guilds/:guild_id/templates', args] as const
}

/**
 * POST /guilds/{guild_id}/templates
 */
export function usePostGuildsGuildIdTemplates(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].templates.$post(args, clientOptions)),
  })
}

/**
 * PUT /guilds/{guild_id}/templates/{code}
 */
export function usePutGuildsGuildIdTemplatesCode(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].templates[':code'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /guilds/{guild_id}/templates/{code}
 */
export function useDeleteGuildsGuildIdTemplatesCode(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].templates[':code'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/templates/{code}
 */
export function usePatchGuildsGuildIdTemplatesCode(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].templates[':code'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/threads/active
 */
export function useGetGuildsGuildIdThreadsActive(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdThreadsActiveQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].threads.active.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/threads/active
 */
export function getGetGuildsGuildIdThreadsActiveQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
) {
  return ['/guilds/:guild_id/threads/active', args] as const
}

/**
 * GET /guilds/{guild_id}/vanity-url
 */
export function useGetGuildsGuildIdVanityUrl(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdVanityUrlQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['vanity-url'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/vanity-url
 */
export function getGetGuildsGuildIdVanityUrlQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
) {
  return ['/guilds/:guild_id/vanity-url', args] as const
}

/**
 * GET /guilds/{guild_id}/voice-states/@me
 */
export function useGetGuildsGuildIdVoiceStatesMe(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdVoiceStatesMeQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/voice-states/@me
 */
export function getGetGuildsGuildIdVoiceStatesMeQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
) {
  return ['/guilds/:guild_id/voice-states/@me', args] as const
}

/**
 * PATCH /guilds/{guild_id}/voice-states/@me
 */
export function usePatchGuildsGuildIdVoiceStatesMe(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/voice-states/{user_id}
 */
export function useGetGuildsGuildIdVoiceStatesUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdVoiceStatesUserIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['voice-states'][':user_id'].$get(args, clientOptions),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/voice-states/{user_id}
 */
export function getGetGuildsGuildIdVoiceStatesUserIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/voice-states/:user_id', args] as const
}

/**
 * PATCH /guilds/{guild_id}/voice-states/{user_id}
 */
export function usePatchGuildsGuildIdVoiceStatesUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdWebhooksQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].webhooks.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/webhooks
 */
export function getGetGuildsGuildIdWebhooksQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
) {
  return ['/guilds/:guild_id/webhooks', args] as const
}

/**
 * GET /guilds/{guild_id}/welcome-screen
 */
export function useGetGuildsGuildIdWelcomeScreen(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdWelcomeScreenQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['welcome-screen'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/welcome-screen
 */
export function getGetGuildsGuildIdWelcomeScreenQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
) {
  return ['/guilds/:guild_id/welcome-screen', args] as const
}

/**
 * PATCH /guilds/{guild_id}/welcome-screen
 */
export function usePatchGuildsGuildIdWelcomeScreen(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id']['welcome-screen'].$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/widget
 */
export function useGetGuildsGuildIdWidget(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdWidgetQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.guilds[':guild_id'].widget.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/widget
 */
export function getGetGuildsGuildIdWidgetQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
) {
  return ['/guilds/:guild_id/widget', args] as const
}

/**
 * PATCH /guilds/{guild_id}/widget
 */
export function usePatchGuildsGuildIdWidget(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.guilds[':guild_id'].widget.$patch(args, clientOptions)),
  })
}

/**
 * GET /guilds/{guild_id}/widget.json
 */
export function useGetGuildsGuildIdWidgetJson(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdWidgetJsonQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['widget.json'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/widget.json
 */
export function getGetGuildsGuildIdWidgetJsonQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
) {
  return ['/guilds/:guild_id/widget.json', args] as const
}

/**
 * GET /guilds/{guild_id}/widget.png
 */
export function useGetGuildsGuildIdWidgetPng(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetGuildsGuildIdWidgetPngQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['widget.png'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/widget.png
 */
export function getGetGuildsGuildIdWidgetPngQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
) {
  return ['/guilds/:guild_id/widget.png', args] as const
}

/**
 * POST /interactions/{interaction_id}/{interaction_token}/callback
 */
export function usePostInteractionsInteractionIdInteractionTokenCallback(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetInvitesCodeQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.invites[':code'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /invites/{code}
 */
export function getGetInvitesCodeQueryKey(
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
) {
  return ['/invites/:code', args] as const
}

/**
 * DELETE /invites/{code}
 */
export function useDeleteInvitesCode(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.invites)[':code']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.invites)[':code']['$delete']>
  >({
    mutationFn: async (args) => parseResponse(client.invites[':code'].$delete(args, clientOptions)),
  })
}

/**
 * PUT /lobbies
 */
export function usePutLobbies(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.lobbies.$put> | undefined,
    Error,
    InferRequestType<typeof client.lobbies.$put>
  >({ mutationFn: async (args) => parseResponse(client.lobbies.$put(args, clientOptions)) })
}

/**
 * POST /lobbies
 */
export function usePostLobbies(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.lobbies.$post> | undefined,
    Error,
    InferRequestType<typeof client.lobbies.$post>
  >({ mutationFn: async (args) => parseResponse(client.lobbies.$post(args, clientOptions)) })
}

/**
 * GET /lobbies/{lobby_id}
 */
export function useGetLobbiesLobbyId(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetLobbiesLobbyIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.lobbies[':lobby_id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /lobbies/{lobby_id}
 */
export function getGetLobbiesLobbyIdQueryKey(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
) {
  return ['/lobbies/:lobby_id', args] as const
}

/**
 * PATCH /lobbies/{lobby_id}
 */
export function usePatchLobbiesLobbyId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.lobbies[':lobby_id'].$patch(args, clientOptions)),
  })
}

/**
 * PATCH /lobbies/{lobby_id}/channel-linking
 */
export function usePatchLobbiesLobbyIdChannelLinking(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.lobbies[':lobby_id']['channel-linking'].$patch(args, clientOptions)),
  })
}

/**
 * DELETE /lobbies/{lobby_id}/members/@me
 */
export function useDeleteLobbiesLobbyIdMembersMe(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.lobbies[':lobby_id'].members['@me'].$delete(args, clientOptions)),
  })
}

/**
 * POST /lobbies/{lobby_id}/members/@me/invites
 */
export function usePostLobbiesLobbyIdMembersMeInvites(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.lobbies[':lobby_id'].members['@me'].invites.$post(args, clientOptions)),
  })
}

/**
 * POST /lobbies/{lobby_id}/members/bulk
 */
export function usePostLobbiesLobbyIdMembersBulk(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.lobbies[':lobby_id'].members.bulk.$post(args, clientOptions)),
  })
}

/**
 * PUT /lobbies/{lobby_id}/members/{user_id}
 */
export function usePutLobbiesLobbyIdMembersUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
    | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /lobbies/{lobby_id}/members/{user_id}
 */
export function useDeleteLobbiesLobbyIdMembersUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$delete(args, clientOptions)),
  })
}

/**
 * POST /lobbies/{lobby_id}/members/{user_id}/invites
 */
export function usePostLobbiesLobbyIdMembersUserIdInvites(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
    >
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetLobbiesLobbyIdMessagesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.lobbies[':lobby_id'].messages.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /lobbies/{lobby_id}/messages
 */
export function getGetLobbiesLobbyIdMessagesQueryKey(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
) {
  return ['/lobbies/:lobby_id/messages', args] as const
}

/**
 * POST /lobbies/{lobby_id}/messages
 */
export function usePostLobbiesLobbyIdMessages(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.lobbies[':lobby_id'].messages.$post(args, clientOptions)),
  })
}

/**
 * GET /oauth2/@me
 */
export function useGetOauth2Me(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetOauth2MeQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.oauth2['@me'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /oauth2/@me
 */
export function getGetOauth2MeQueryKey() {
  return ['/oauth2/@me'] as const
}

/**
 * GET /oauth2/applications/@me
 */
export function useGetOauth2ApplicationsMe(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetOauth2ApplicationsMeQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.oauth2.applications['@me'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /oauth2/applications/@me
 */
export function getGetOauth2ApplicationsMeQueryKey() {
  return ['/oauth2/applications/@me'] as const
}

/**
 * GET /oauth2/keys
 */
export function useGetOauth2Keys(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetOauth2KeysQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.oauth2.keys.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /oauth2/keys
 */
export function getGetOauth2KeysQueryKey() {
  return ['/oauth2/keys'] as const
}

/**
 * GET /oauth2/userinfo
 */
export function useGetOauth2Userinfo(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetOauth2UserinfoQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.oauth2.userinfo.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /oauth2/userinfo
 */
export function getGetOauth2UserinfoQueryKey() {
  return ['/oauth2/userinfo'] as const
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge
 */
export function usePostPartnerSdkProvisionalAccountsUnmerge(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(
        client['partner-sdk']['provisional-accounts'].unmerge.$post(args, clientOptions),
      ),
  })
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge/bot
 */
export function usePostPartnerSdkProvisionalAccountsUnmergeBot(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
      parseResponse(
        client['partner-sdk']['provisional-accounts'].unmerge.bot.$post(args, clientOptions),
      ),
  })
}

/**
 * POST /partner-sdk/token
 */
export function usePostPartnerSdkToken(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['partner-sdk']['token']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['partner-sdk']['token']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client['partner-sdk'].token.$post(args, clientOptions)),
  })
}

/**
 * POST /partner-sdk/token/bot
 */
export function usePostPartnerSdkTokenBot(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['partner-sdk']['token']['bot']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client['partner-sdk'].token.bot.$post(args, clientOptions)),
  })
}

/**
 * GET /soundboard-default-sounds
 */
export function useGetSoundboardDefaultSounds(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetSoundboardDefaultSoundsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client['soundboard-default-sounds'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /soundboard-default-sounds
 */
export function getGetSoundboardDefaultSoundsQueryKey() {
  return ['/soundboard-default-sounds'] as const
}

/**
 * POST /stage-instances
 */
export function usePostStageInstances(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['stage-instances']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['stage-instances']['$post']>
  >({
    mutationFn: async (args) => parseResponse(client['stage-instances'].$post(args, clientOptions)),
  })
}

/**
 * GET /stage-instances/{channel_id}
 */
export function useGetStageInstancesChannelId(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetStageInstancesChannelIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client['stage-instances'][':channel_id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /stage-instances/{channel_id}
 */
export function getGetStageInstancesChannelIdQueryKey(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
) {
  return ['/stage-instances/:channel_id', args] as const
}

/**
 * DELETE /stage-instances/{channel_id}
 */
export function useDeleteStageInstancesChannelId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['stage-instances'][':channel_id']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client['stage-instances'][':channel_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /stage-instances/{channel_id}
 */
export function usePatchStageInstancesChannelId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client)['stage-instances'][':channel_id']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client['stage-instances'][':channel_id'].$patch(args, clientOptions)),
  })
}

/**
 * GET /sticker-packs
 */
export function useGetStickerPacks(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetStickerPacksQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client['sticker-packs'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /sticker-packs
 */
export function getGetStickerPacksQueryKey() {
  return ['/sticker-packs'] as const
}

/**
 * GET /sticker-packs/{pack_id}
 */
export function useGetStickerPacksPackId(
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetStickerPacksPackIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client['sticker-packs'][':pack_id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /sticker-packs/{pack_id}
 */
export function getGetStickerPacksPackIdQueryKey(
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
) {
  return ['/sticker-packs/:pack_id', args] as const
}

/**
 * GET /stickers/{sticker_id}
 */
export function useGetStickersStickerId(
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetStickersStickerIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.stickers[':sticker_id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /stickers/{sticker_id}
 */
export function getGetStickersStickerIdQueryKey(
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
) {
  return ['/stickers/:sticker_id', args] as const
}

/**
 * GET /users/@me
 */
export function useGetUsersMe(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetUsersMeQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users['@me'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/@me
 */
export function getGetUsersMeQueryKey() {
  return ['/users/@me'] as const
}

/**
 * PATCH /users/@me
 */
export function usePatchUsersMe(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)['@me']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.users)['@me']['$patch']>
  >({ mutationFn: async (args) => parseResponse(client.users['@me'].$patch(args, clientOptions)) })
}

/**
 * GET /users/@me/applications/{application_id}/entitlements
 */
export function useGetUsersMeApplicationsApplicationIdEntitlements(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersMeApplicationsApplicationIdEntitlementsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.users['@me'].applications[':application_id'].entitlements.$get(args, clientOptions),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /users/@me/applications/{application_id}/entitlements
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
export function useGetUsersMeApplicationsApplicationIdRoleConnection(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersMeApplicationsApplicationIdRoleConnectionQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.users['@me'].applications[':application_id']['role-connection'].$get(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /users/@me/applications/{application_id}/role-connection
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
export function usePutUsersMeApplicationsApplicationIdRoleConnection(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
export function useDeleteUsersMeApplicationsApplicationIdRoleConnection(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
export function usePostUsersMeChannels(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)['@me']['channels']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.users)['@me']['channels']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.users['@me'].channels.$post(args, clientOptions)),
  })
}

/**
 * GET /users/@me/connections
 */
export function useGetUsersMeConnections(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetUsersMeConnectionsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.users['@me'].connections.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/@me/connections
 */
export function getGetUsersMeConnectionsQueryKey() {
  return ['/users/@me/connections'] as const
}

/**
 * GET /users/@me/guilds
 */
export function useGetUsersMeGuilds(
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersMeGuildsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users['@me'].guilds.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/@me/guilds
 */
export function getGetUsersMeGuildsQueryKey(
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
) {
  return ['/users/@me/guilds', args] as const
}

/**
 * DELETE /users/@me/guilds/{guild_id}
 */
export function useDeleteUsersMeGuildsGuildId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.users['@me'].guilds[':guild_id'].$delete(args, clientOptions)),
  })
}

/**
 * GET /users/@me/guilds/{guild_id}/member
 */
export function useGetUsersMeGuildsGuildIdMember(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersMeGuildsGuildIdMemberQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.users['@me'].guilds[':guild_id'].member.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/@me/guilds/{guild_id}/member
 */
export function getGetUsersMeGuildsGuildIdMemberQueryKey(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
) {
  return ['/users/@me/guilds/:guild_id/member', args] as const
}

/**
 * GET /users/{user_id}
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersUserIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users[':user_id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/{user_id}
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return ['/users/:user_id', args] as const
}

/**
 * GET /voice/regions
 */
export function useGetVoiceRegions(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetVoiceRegionsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.voice.regions.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /voice/regions
 */
export function getGetVoiceRegionsQueryKey() {
  return ['/voice/regions'] as const
}

/**
 * GET /webhooks/{webhook_id}
 */
export function useGetWebhooksWebhookId(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetWebhooksWebhookIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.webhooks[':webhook_id'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /webhooks/{webhook_id}
 */
export function getGetWebhooksWebhookIdQueryKey(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
) {
  return ['/webhooks/:webhook_id', args] as const
}

/**
 * DELETE /webhooks/{webhook_id}
 */
export function useDeleteWebhooksWebhookId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.webhooks)[':webhook_id']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.webhooks[':webhook_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /webhooks/{webhook_id}
 */
export function usePatchWebhooksWebhookId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.webhooks)[':webhook_id']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.webhooks[':webhook_id'].$patch(args, clientOptions)),
  })
}

/**
 * GET /webhooks/{webhook_id}/{webhook_token}
 */
export function useGetWebhooksWebhookIdWebhookToken(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetWebhooksWebhookIdWebhookTokenQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /webhooks/{webhook_id}/{webhook_token}
 */
export function getGetWebhooksWebhookIdWebhookTokenQueryKey(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
) {
  return ['/webhooks/:webhook_id/:webhook_token', args] as const
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}
 */
export function usePostWebhooksWebhookIdWebhookToken(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$post(args, clientOptions)),
  })
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}
 */
export function useDeleteWebhooksWebhookIdWebhookToken(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}
 */
export function usePatchWebhooksWebhookIdWebhookToken(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$patch(args, clientOptions)),
  })
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/github
 */
export function usePostWebhooksWebhookIdWebhookTokenGithub(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']>
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$get(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
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
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesOriginal(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
export function usePatchWebhooksWebhookIdWebhookTokenMessagesOriginal(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$get(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
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
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesMessageId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
export function usePatchWebhooksWebhookIdWebhookTokenMessagesMessageId(
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
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
export function usePostWebhooksWebhookIdWebhookTokenSlack(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].slack.$post(args, clientOptions),
      ),
  })
}
