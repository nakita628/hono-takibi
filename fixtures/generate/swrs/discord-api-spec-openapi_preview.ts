import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discord-api-spec-openapi_preview'

/**
 * GET /applications/@me
 */
export function useGetApplicationsMe(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetApplicationsMeKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.applications['@me'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/@me
 */
export function getGetApplicationsMeKey() {
  return ['/applications/@me'] as const
}

/**
 * PATCH /applications/@me
 */
export function usePatchApplicationsMe(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.applications)['@me']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /applications/@me',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.applications)['@me']['$patch']> },
    ) => parseResponse(client.applications['@me'].$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /applications/{application_id}
 */
export function useGetApplicationsApplicationId(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetApplicationsApplicationIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.applications[':application_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id
 */
export function getGetApplicationsApplicationIdKey(
  args?: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
) {
  return ['/applications/:application_id', ...(args ? [args] : [])] as const
}

/**
 * PATCH /applications/{application_id}
 */
export function usePatchApplicationsApplicationId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.applications)[':application_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /applications/:application_id',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.applications)[':application_id']['$patch']> },
    ) => parseResponse(client.applications[':application_id'].$patch(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetApplicationsApplicationIdActivityInstancesInstanceIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.applications[':application_id']['activity-instances'][':instance_id'].$get(
            args,
            clientOptions,
          ),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id/activity-instances/{instance_id
 */
export function getGetApplicationsApplicationIdActivityInstancesInstanceIdKey(
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
export function usePostApplicationsApplicationIdAttachment(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.applications)[':application_id']['attachment']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['attachment']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /applications/:application_id/attachment',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.applications)[':application_id']['attachment']['$post']
        >
      },
    ) =>
      parseResponse(client.applications[':application_id'].attachment.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /applications/{application_id}/commands
 */
export function useGetApplicationsApplicationIdCommands(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetApplicationsApplicationIdCommandsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.applications[':application_id'].commands.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id/commands
 */
export function getGetApplicationsApplicationIdCommandsKey(
  args?: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
) {
  return ['/applications/:application_id/commands', ...(args ? [args] : [])] as const
}

/**
 * PUT /applications/{application_id}/commands
 */
export function usePutApplicationsApplicationIdCommands(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.applications)[':application_id']['commands']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /applications/:application_id/commands',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>
      },
    ) => parseResponse(client.applications[':application_id'].commands.$put(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /applications/{application_id}/commands
 */
export function usePostApplicationsApplicationIdCommands(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.applications)[':application_id']['commands']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /applications/:application_id/commands',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>
      },
    ) => parseResponse(client.applications[':application_id'].commands.$post(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetApplicationsApplicationIdCommandsCommandIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.applications[':application_id'].commands[':command_id'].$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id/commands/{command_id
 */
export function getGetApplicationsApplicationIdCommandsCommandIdKey(
  args?: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
) {
  return ['/applications/:application_id/commands/:command_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /applications/{application_id}/commands/{command_id}
 */
export function useDeleteApplicationsApplicationIdCommandsCommandId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /applications/:application_id/commands/:command_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$delete(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * PATCH /applications/{application_id}/commands/{command_id}
 */
export function usePatchApplicationsApplicationIdCommandsCommandId(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /applications/:application_id/commands/:command_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
        >
      },
    ) =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$patch(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * GET /applications/{application_id}/emojis
 */
export function useGetApplicationsApplicationIdEmojis(
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetApplicationsApplicationIdEmojisKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.applications[':application_id'].emojis.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id/emojis
 */
export function getGetApplicationsApplicationIdEmojisKey(
  args?: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
) {
  return ['/applications/:application_id/emojis', ...(args ? [args] : [])] as const
}

/**
 * POST /applications/{application_id}/emojis
 */
export function usePostApplicationsApplicationIdEmojis(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.applications)[':application_id']['emojis']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /applications/:application_id/emojis',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>
      },
    ) => parseResponse(client.applications[':application_id'].emojis.$post(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetApplicationsApplicationIdEmojisEmojiIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.applications[':application_id'].emojis[':emoji_id'].$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id/emojis/{emoji_id
 */
export function getGetApplicationsApplicationIdEmojisEmojiIdKey(
  args?: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
) {
  return ['/applications/:application_id/emojis/:emoji_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /applications/{application_id}/emojis/{emoji_id}
 */
export function useDeleteApplicationsApplicationIdEmojisEmojiId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /applications/:application_id/emojis/:emoji_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$delete(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * PATCH /applications/{application_id}/emojis/{emoji_id}
 */
export function usePatchApplicationsApplicationIdEmojisEmojiId(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /applications/:application_id/emojis/:emoji_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
        >
      },
    ) =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$patch(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * GET /applications/{application_id}/entitlements
 */
export function useGetApplicationsApplicationIdEntitlements(
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetApplicationsApplicationIdEntitlementsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.applications[':application_id'].entitlements.$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id/entitlements
 */
export function getGetApplicationsApplicationIdEntitlementsKey(
  args?: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
) {
  return ['/applications/:application_id/entitlements', ...(args ? [args] : [])] as const
}

/**
 * POST /applications/{application_id}/entitlements
 */
export function usePostApplicationsApplicationIdEntitlements(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.applications)[':application_id']['entitlements']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /applications/:application_id/entitlements',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.applications)[':application_id']['entitlements']['$post']
        >
      },
    ) =>
      parseResponse(
        client.applications[':application_id'].entitlements.$post(arg, options?.client),
      ),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetApplicationsApplicationIdEntitlementsEntitlementIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.applications[':application_id'].entitlements[':entitlement_id'].$get(
            args,
            clientOptions,
          ),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id/entitlements/{entitlement_id
 */
export function getGetApplicationsApplicationIdEntitlementsEntitlementIdKey(
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
export function useDeleteApplicationsApplicationIdEntitlementsEntitlementId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /applications/:application_id/entitlements/:entitlement_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.applications[':application_id'].entitlements[':entitlement_id'].$delete(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * POST /applications/{application_id}/entitlements/{entitlement_id}/consume
 */
export function usePostApplicationsApplicationIdEntitlementsEntitlementIdConsume(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /applications/:application_id/entitlements/:entitlement_id/consume',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
        >
      },
    ) =>
      parseResponse(
        client.applications[':application_id'].entitlements[':entitlement_id'].consume.$post(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetApplicationsApplicationIdGuildsGuildIdCommandsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands.$get(
            args,
            clientOptions,
          ),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id/guilds/{guild_id/commands
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsKey(
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
export function usePutApplicationsApplicationIdGuildsGuildIdCommands(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /applications/:application_id/guilds/:guild_id/commands',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
        >
      },
    ) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.$put(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * POST /applications/{application_id}/guilds/{guild_id}/commands
 */
export function usePostApplicationsApplicationIdGuildsGuildIdCommands(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /applications/:application_id/guilds/:guild_id/commands',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
        >
      },
    ) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.$post(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands.permissions.$get(
            args,
            clientOptions,
          ),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id/guilds/{guild_id/commands/permissions
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$get(
            args,
            clientOptions,
          ),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id/guilds/{guild_id/commands/{command_id
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdKey(
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
export function useDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /applications/:application_id/guilds/:guild_id/commands/:command_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$delete(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * PATCH /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function usePatchApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /applications/:application_id/guilds/:guild_id/commands/:command_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
        >
      },
    ) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$patch(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsKey(args)
      : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands[
            ':command_id'
          ].permissions.$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id/guilds/{guild_id/commands/{command_id/permissions
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsKey(
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
export function usePutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
        >
      },
    ) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[
          ':command_id'
        ].permissions.$put(arg, options?.client),
      ),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetApplicationsApplicationIdRoleConnectionsMetadataKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.applications[':application_id']['role-connections'].metadata.$get(
            args,
            clientOptions,
          ),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id/role-connections/metadata
 */
export function getGetApplicationsApplicationIdRoleConnectionsMetadataKey(
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
export function usePutApplicationsApplicationIdRoleConnectionsMetadata(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /applications/:application_id/role-connections/metadata',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
        >
      },
    ) =>
      parseResponse(
        client.applications[':application_id']['role-connections'].metadata.$put(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * GET /channels/{channel_id}
 */
export function useGetChannelsChannelId(
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetChannelsChannelIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.channels[':channel_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id
 */
export function getGetChannelsChannelIdKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
) {
  return ['/channels/:channel_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /channels/{channel_id}
 */
export function useDeleteChannelsChannelId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /channels/:channel_id',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['$delete']> },
    ) => parseResponse(client.channels[':channel_id'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * PATCH /channels/{channel_id}
 */
export function usePatchChannelsChannelId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /channels/:channel_id',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['$patch']> },
    ) => parseResponse(client.channels[':channel_id'].$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /channels/{channel_id}/followers
 */
export function usePostChannelsChannelIdFollowers(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['followers']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /channels/:channel_id/followers',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']> },
    ) => parseResponse(client.channels[':channel_id'].followers.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /channels/{channel_id}/invites
 */
export function useGetChannelsChannelIdInvites(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetChannelsChannelIdInvitesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.channels[':channel_id'].invites.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id/invites
 */
export function getGetChannelsChannelIdInvitesKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
) {
  return ['/channels/:channel_id/invites', ...(args ? [args] : [])] as const
}

/**
 * POST /channels/{channel_id}/invites
 */
export function usePostChannelsChannelIdInvites(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['invites']['$post']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /channels/:channel_id/invites',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']> },
    ) => parseResponse(client.channels[':channel_id'].invites.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /channels/{channel_id}/messages
 */
export function useGetChannelsChannelIdMessages(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetChannelsChannelIdMessagesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.channels[':channel_id'].messages.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id/messages
 */
export function getGetChannelsChannelIdMessagesKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
) {
  return ['/channels/:channel_id/messages', ...(args ? [args] : [])] as const
}

/**
 * POST /channels/{channel_id}/messages
 */
export function usePostChannelsChannelIdMessages(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['messages']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /channels/:channel_id/messages',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']> },
    ) => parseResponse(client.channels[':channel_id'].messages.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /channels/{channel_id}/messages/bulk-delete
 */
export function usePostChannelsChannelIdMessagesBulkDelete(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /channels/:channel_id/messages/bulk-delete',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages['bulk-delete'].$post(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * GET /channels/{channel_id}/messages/pins
 */
export function useGetChannelsChannelIdMessagesPins(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetChannelsChannelIdMessagesPinsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.channels[':channel_id'].messages.pins.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id/messages/pins
 */
export function getGetChannelsChannelIdMessagesPinsKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
) {
  return ['/channels/:channel_id/messages/pins', ...(args ? [args] : [])] as const
}

/**
 * PUT /channels/{channel_id}/messages/pins/{message_id}
 */
export function usePutChannelsChannelIdMessagesPinsMessageId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /channels/:channel_id/messages/pins/:message_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages.pins[':message_id'].$put(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * DELETE /channels/{channel_id}/messages/pins/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesPinsMessageId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /channels/:channel_id/messages/pins/:message_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages.pins[':message_id'].$delete(arg, options?.client),
      ),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetChannelsChannelIdMessagesMessageIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id/messages/{message_id
 */
export function getGetChannelsChannelIdMessagesMessageIdKey(
  args?: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
) {
  return ['/channels/:channel_id/messages/:message_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesMessageId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /channels/:channel_id/messages/:message_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$delete(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * PATCH /channels/{channel_id}/messages/{message_id}
 */
export function usePatchChannelsChannelIdMessagesMessageId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /channels/:channel_id/messages/:message_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$patch(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * POST /channels/{channel_id}/messages/{message_id}/crosspost
 */
export function usePostChannelsChannelIdMessagesMessageIdCrosspost(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /channels/:channel_id/messages/:message_id/crosspost',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].crosspost.$post(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactions(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /channels/:channel_id/messages/:message_id/reactions',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions.$delete(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$get(
            args,
            clientOptions,
          ),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id/messages/{message_id/reactions/{emoji_name
 */
export function getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameKey(
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
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiName(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /channels/:channel_id/messages/:message_id/reactions/:emoji_name',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$delete(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * PUT /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function usePutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name']['@me'].$put(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'][
          '@me'
        ].$delete(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /channels/:channel_id/messages/:message_id/reactions/:emoji_name/:user_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'][
          ':user_id'
        ].$delete(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * POST /channels/{channel_id}/messages/{message_id}/threads
 */
export function usePostChannelsChannelIdMessagesMessageIdThreads(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /channels/:channel_id/messages/:message_id/threads',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].threads.$post(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * PUT /channels/{channel_id}/permissions/{overwrite_id}
 */
export function usePutChannelsChannelIdPermissionsOverwriteId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /channels/:channel_id/permissions/:overwrite_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].permissions[':overwrite_id'].$put(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * DELETE /channels/{channel_id}/permissions/{overwrite_id}
 */
export function useDeleteChannelsChannelIdPermissionsOverwriteId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /channels/:channel_id/permissions/:overwrite_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].permissions[':overwrite_id'].$delete(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * GET /channels/{channel_id}/pins
 */
export function useGetChannelsChannelIdPins(
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetChannelsChannelIdPinsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.channels[':channel_id'].pins.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id/pins
 */
export function getGetChannelsChannelIdPinsKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
) {
  return ['/channels/:channel_id/pins', ...(args ? [args] : [])] as const
}

/**
 * PUT /channels/{channel_id}/pins/{message_id}
 */
export function usePutChannelsChannelIdPinsMessageId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /channels/:channel_id/pins/:message_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['pins'][':message_id']['$put']
        >
      },
    ) =>
      parseResponse(client.channels[':channel_id'].pins[':message_id'].$put(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /channels/{channel_id}/pins/{message_id}
 */
export function useDeleteChannelsChannelIdPinsMessageId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /channels/:channel_id/pins/:message_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].pins[':message_id'].$delete(arg, options?.client),
      ),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.channels[':channel_id'].polls[':message_id'].answers[':answer_id'].$get(
            args,
            clientOptions,
          ),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id/polls/{message_id/answers/{answer_id
 */
export function getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdKey(
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
export function usePostChannelsChannelIdPollsMessageIdExpire(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /channels/:channel_id/polls/:message_id/expire',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].polls[':message_id'].expire.$post(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * PUT /channels/{channel_id}/recipients/{user_id}
 */
export function usePutChannelsChannelIdRecipientsUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /channels/:channel_id/recipients/:user_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].recipients[':user_id'].$put(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * DELETE /channels/{channel_id}/recipients/{user_id}
 */
export function useDeleteChannelsChannelIdRecipientsUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /channels/:channel_id/recipients/:user_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id'].recipients[':user_id'].$delete(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * POST /channels/{channel_id}/send-soundboard-sound
 */
export function usePostChannelsChannelIdSendSoundboardSound(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /channels/:channel_id/send-soundboard-sound',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id']['send-soundboard-sound'].$post(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * GET /channels/{channel_id}/thread-members
 */
export function useGetChannelsChannelIdThreadMembers(
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetChannelsChannelIdThreadMembersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.channels[':channel_id']['thread-members'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id/thread-members
 */
export function getGetChannelsChannelIdThreadMembersKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
) {
  return ['/channels/:channel_id/thread-members', ...(args ? [args] : [])] as const
}

/**
 * PUT /channels/{channel_id}/thread-members/@me
 */
export function usePutChannelsChannelIdThreadMembersMe(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /channels/:channel_id/thread-members/@me',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['thread-members']['@me']['$put']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members']['@me'].$put(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * DELETE /channels/{channel_id}/thread-members/@me
 */
export function useDeleteChannelsChannelIdThreadMembersMe(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /channels/:channel_id/thread-members/@me',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members']['@me'].$delete(arg, options?.client),
      ),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetChannelsChannelIdThreadMembersUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.channels[':channel_id']['thread-members'][':user_id'].$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id/thread-members/{user_id
 */
export function getGetChannelsChannelIdThreadMembersUserIdKey(
  args?: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
) {
  return ['/channels/:channel_id/thread-members/:user_id', ...(args ? [args] : [])] as const
}

/**
 * PUT /channels/{channel_id}/thread-members/{user_id}
 */
export function usePutChannelsChannelIdThreadMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
      >
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /channels/:channel_id/thread-members/:user_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$put(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * DELETE /channels/{channel_id}/thread-members/{user_id}
 */
export function useDeleteChannelsChannelIdThreadMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /channels/:channel_id/thread-members/:user_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$delete(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * POST /channels/{channel_id}/threads
 */
export function usePostChannelsChannelIdThreads(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['threads']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /channels/:channel_id/threads',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']> },
    ) => parseResponse(client.channels[':channel_id'].threads.$post(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetChannelsChannelIdThreadsArchivedPrivateKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.channels[':channel_id'].threads.archived.private.$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id/threads/archived/private
 */
export function getGetChannelsChannelIdThreadsArchivedPrivateKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetChannelsChannelIdThreadsArchivedPublicKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.channels[':channel_id'].threads.archived.public.$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id/threads/archived/public
 */
export function getGetChannelsChannelIdThreadsArchivedPublicKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetChannelsChannelIdThreadsSearchKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.channels[':channel_id'].threads.search.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id/threads/search
 */
export function getGetChannelsChannelIdThreadsSearchKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
) {
  return ['/channels/:channel_id/threads/search', ...(args ? [args] : [])] as const
}

/**
 * POST /channels/{channel_id}/typing
 */
export function usePostChannelsChannelIdTyping(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['typing']['$post']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /channels/:channel_id/typing',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']> },
    ) => parseResponse(client.channels[':channel_id'].typing.$post(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetChannelsChannelIdUsersMeThreadsArchivedPrivateKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.channels[':channel_id'].users['@me'].threads.archived.private.$get(
            args,
            clientOptions,
          ),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id/users/@me/threads/archived/private
 */
export function getGetChannelsChannelIdUsersMeThreadsArchivedPrivateKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetChannelsChannelIdWebhooksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.channels[':channel_id'].webhooks.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id/webhooks
 */
export function getGetChannelsChannelIdWebhooksKey(
  args?: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
) {
  return ['/channels/:channel_id/webhooks', ...(args ? [args] : [])] as const
}

/**
 * POST /channels/{channel_id}/webhooks
 */
export function usePostChannelsChannelIdWebhooks(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /channels/:channel_id/webhooks',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']> },
    ) => parseResponse(client.channels[':channel_id'].webhooks.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /gateway
 */
export function useGetGateway(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGatewayKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.gateway.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /gateway
 */
export function getGetGatewayKey() {
  return ['/gateway'] as const
}

/**
 * GET /gateway/bot
 */
export function useGetGatewayBot(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGatewayBotKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.gateway.bot.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /gateway/bot
 */
export function getGetGatewayBotKey() {
  return ['/gateway/bot'] as const
}

/**
 * GET /guilds/templates/{code}
 */
export function useGetGuildsTemplatesCode(
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsTemplatesCodeKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds.templates[':code'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/templates/{code
 */
export function getGetGuildsTemplatesCodeKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id
 */
export function getGetGuildsGuildIdKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
) {
  return ['/guilds/:guild_id', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}
 */
export function usePatchGuildsGuildId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['$patch']> },
    ) => parseResponse(client.guilds[':guild_id'].$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/audit-logs
 */
export function useGetGuildsGuildIdAuditLogs(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdAuditLogsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id']['audit-logs'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/audit-logs
 */
export function getGetGuildsGuildIdAuditLogsKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdAutoModerationRulesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.guilds[':guild_id']['auto-moderation'].rules.$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/auto-moderation/rules
 */
export function getGetGuildsGuildIdAutoModerationRulesKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
) {
  return ['/guilds/:guild_id/auto-moderation/rules', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/auto-moderation/rules
 */
export function usePostGuildsGuildIdAutoModerationRules(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /guilds/:guild_id/auto-moderation/rules',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']
        >
      },
    ) =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules.$post(arg, options?.client),
      ),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdAutoModerationRulesRuleIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/auto-moderation/rules/{rule_id
 */
export function getGetGuildsGuildIdAutoModerationRulesRuleIdKey(
  args?: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
) {
  return ['/guilds/:guild_id/auto-moderation/rules/:rule_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function useDeleteGuildsGuildIdAutoModerationRulesRuleId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /guilds/:guild_id/auto-moderation/rules/:rule_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$delete(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * PATCH /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function usePatchGuildsGuildIdAutoModerationRulesRuleId(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id/auto-moderation/rules/:rule_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
        >
      },
    ) =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$patch(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/bans
 */
export function useGetGuildsGuildIdBans(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdBansKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].bans.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/bans
 */
export function getGetGuildsGuildIdBansKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdBansUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].bans[':user_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/bans/{user_id
 */
export function getGetGuildsGuildIdBansUserIdKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/bans/:user_id', ...(args ? [args] : [])] as const
}

/**
 * PUT /guilds/{guild_id}/bans/{user_id}
 */
export function usePutGuildsGuildIdBansUserId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /guilds/:guild_id/bans/:user_id',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']> },
    ) => parseResponse(client.guilds[':guild_id'].bans[':user_id'].$put(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /guilds/{guild_id}/bans/{user_id}
 */
export function useDeleteGuildsGuildIdBansUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /guilds/:guild_id/bans/:user_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
      },
    ) => parseResponse(client.guilds[':guild_id'].bans[':user_id'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /guilds/{guild_id}/bulk-ban
 */
export function usePostGuildsGuildIdBulkBan(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /guilds/:guild_id/bulk-ban',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']> },
    ) => parseResponse(client.guilds[':guild_id']['bulk-ban'].$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/channels
 */
export function useGetGuildsGuildIdChannels(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdChannelsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].channels.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/channels
 */
export function getGetGuildsGuildIdChannelsKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
) {
  return ['/guilds/:guild_id/channels', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/channels
 */
export function usePostGuildsGuildIdChannels(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /guilds/:guild_id/channels',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']> },
    ) => parseResponse(client.guilds[':guild_id'].channels.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * PATCH /guilds/{guild_id}/channels
 */
export function usePatchGuildsGuildIdChannels(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$patch']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id/channels',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']> },
    ) => parseResponse(client.guilds[':guild_id'].channels.$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/emojis
 */
export function useGetGuildsGuildIdEmojis(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdEmojisKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].emojis.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/emojis
 */
export function getGetGuildsGuildIdEmojisKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
) {
  return ['/guilds/:guild_id/emojis', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/emojis
 */
export function usePostGuildsGuildIdEmojis(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /guilds/:guild_id/emojis',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']> },
    ) => parseResponse(client.guilds[':guild_id'].emojis.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useGetGuildsGuildIdEmojisEmojiId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdEmojisEmojiIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/emojis/{emoji_id
 */
export function getGetGuildsGuildIdEmojisEmojiIdKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
) {
  return ['/guilds/:guild_id/emojis/:emoji_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useDeleteGuildsGuildIdEmojisEmojiId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /guilds/:guild_id/emojis/:emoji_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
      },
    ) =>
      parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * PATCH /guilds/{guild_id}/emojis/{emoji_id}
 */
export function usePatchGuildsGuildIdEmojisEmojiId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id/emojis/:emoji_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
      },
    ) => parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/integrations
 */
export function useGetGuildsGuildIdIntegrations(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdIntegrationsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].integrations.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/integrations
 */
export function getGetGuildsGuildIdIntegrationsKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
) {
  return ['/guilds/:guild_id/integrations', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/integrations/{integration_id}
 */
export function useDeleteGuildsGuildIdIntegrationsIntegrationId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /guilds/:guild_id/integrations/:integration_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.guilds[':guild_id'].integrations[':integration_id'].$delete(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/invites
 */
export function useGetGuildsGuildIdInvites(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdInvitesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].invites.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/invites
 */
export function getGetGuildsGuildIdInvitesKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdMembersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].members.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/members
 */
export function getGetGuildsGuildIdMembersKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
) {
  return ['/guilds/:guild_id/members', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}/members/@me
 */
export function usePatchGuildsGuildIdMembersMe(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id/members/@me',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']> },
    ) => parseResponse(client.guilds[':guild_id'].members['@me'].$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/members/search
 */
export function useGetGuildsGuildIdMembersSearch(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdMembersSearchKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].members.search.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/members/search
 */
export function getGetGuildsGuildIdMembersSearchKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdMembersUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].members[':user_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/members/{user_id
 */
export function getGetGuildsGuildIdMembersUserIdKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/members/:user_id', ...(args ? [args] : [])] as const
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}
 */
export function usePutGuildsGuildIdMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /guilds/:guild_id/members/:user_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
      },
    ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$put(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}
 */
export function useDeleteGuildsGuildIdMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /guilds/:guild_id/members/:user_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
      },
    ) =>
      parseResponse(client.guilds[':guild_id'].members[':user_id'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * PATCH /guilds/{guild_id}/members/{user_id}
 */
export function usePatchGuildsGuildIdMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id/members/:user_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
      },
    ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function usePutGuildsGuildIdMembersUserIdRolesRoleId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /guilds/:guild_id/members/:user_id/roles/:role_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
        >
      },
    ) =>
      parseResponse(
        client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$put(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdMembersUserIdRolesRoleId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /guilds/:guild_id/members/:user_id/roles/:role_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$delete(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/messages/search
 */
export function useGetGuildsGuildIdMessagesSearch(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdMessagesSearchKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].messages.search.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/messages/search
 */
export function getGetGuildsGuildIdMessagesSearchKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdNewMemberWelcomeKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id']['new-member-welcome'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/new-member-welcome
 */
export function getGetGuildsGuildIdNewMemberWelcomeKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdOnboardingKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].onboarding.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/onboarding
 */
export function getGetGuildsGuildIdOnboardingKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
) {
  return ['/guilds/:guild_id/onboarding', ...(args ? [args] : [])] as const
}

/**
 * PUT /guilds/{guild_id}/onboarding
 */
export function usePutGuildsGuildIdOnboarding(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /guilds/:guild_id/onboarding',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']> },
    ) => parseResponse(client.guilds[':guild_id'].onboarding.$put(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/preview
 */
export function useGetGuildsGuildIdPreview(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdPreviewKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].preview.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/preview
 */
export function getGetGuildsGuildIdPreviewKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdPruneKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].prune.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/prune
 */
export function getGetGuildsGuildIdPruneKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
) {
  return ['/guilds/:guild_id/prune', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/prune
 */
export function usePostGuildsGuildIdPrune(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /guilds/:guild_id/prune',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']> },
    ) => parseResponse(client.guilds[':guild_id'].prune.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/regions
 */
export function useGetGuildsGuildIdRegions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdRegionsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].regions.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/regions
 */
export function getGetGuildsGuildIdRegionsKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdRolesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].roles.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/roles
 */
export function getGetGuildsGuildIdRolesKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
) {
  return ['/guilds/:guild_id/roles', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/roles
 */
export function usePostGuildsGuildIdRoles(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /guilds/:guild_id/roles',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']> },
    ) => parseResponse(client.guilds[':guild_id'].roles.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * PATCH /guilds/{guild_id}/roles
 */
export function usePatchGuildsGuildIdRoles(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id/roles',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']> },
    ) => parseResponse(client.guilds[':guild_id'].roles.$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/roles/member-counts
 */
export function useGetGuildsGuildIdRolesMemberCounts(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdRolesMemberCountsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].roles['member-counts'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/roles/member-counts
 */
export function getGetGuildsGuildIdRolesMemberCountsKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdRolesRoleIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].roles[':role_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/roles/{role_id
 */
export function getGetGuildsGuildIdRolesRoleIdKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
) {
  return ['/guilds/:guild_id/roles/:role_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdRolesRoleId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /guilds/:guild_id/roles/:role_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
      },
    ) => parseResponse(client.guilds[':guild_id'].roles[':role_id'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * PATCH /guilds/{guild_id}/roles/{role_id}
 */
export function usePatchGuildsGuildIdRolesRoleId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id/roles/:role_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
      },
    ) => parseResponse(client.guilds[':guild_id'].roles[':role_id'].$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/scheduled-events
 */
export function useGetGuildsGuildIdScheduledEvents(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdScheduledEventsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id']['scheduled-events'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/scheduled-events
 */
export function getGetGuildsGuildIdScheduledEventsKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
) {
  return ['/guilds/:guild_id/scheduled-events', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/scheduled-events
 */
export function usePostGuildsGuildIdScheduledEvents(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /guilds/:guild_id/scheduled-events',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
      },
    ) => parseResponse(client.guilds[':guild_id']['scheduled-events'].$post(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$get(
            args,
            clientOptions,
          ),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/scheduled-events/{guild_scheduled_event_id
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdKey(
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
export function useDeleteGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$delete(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * PATCH /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function usePatchGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
        >
      },
    ) =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$patch(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].users.$get(
            args,
            clientOptions,
          ),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/scheduled-events/{guild_scheduled_event_id/users
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdSoundboardSoundsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/soundboard-sounds
 */
export function getGetGuildsGuildIdSoundboardSoundsKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
) {
  return ['/guilds/:guild_id/soundboard-sounds', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/soundboard-sounds
 */
export function usePostGuildsGuildIdSoundboardSounds(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /guilds/:guild_id/soundboard-sounds',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
      },
    ) => parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$post(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdSoundboardSoundsSoundIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/soundboard-sounds/{sound_id
 */
export function getGetGuildsGuildIdSoundboardSoundsSoundIdKey(
  args?: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
) {
  return ['/guilds/:guild_id/soundboard-sounds/:sound_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function useDeleteGuildsGuildIdSoundboardSoundsSoundId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /guilds/:guild_id/soundboard-sounds/:sound_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$delete(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * PATCH /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function usePatchGuildsGuildIdSoundboardSoundsSoundId(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id/soundboard-sounds/:sound_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
        >
      },
    ) =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$patch(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/stickers
 */
export function useGetGuildsGuildIdStickers(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdStickersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].stickers.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/stickers
 */
export function getGetGuildsGuildIdStickersKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
) {
  return ['/guilds/:guild_id/stickers', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/stickers
 */
export function usePostGuildsGuildIdStickers(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /guilds/:guild_id/stickers',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']> },
    ) => parseResponse(client.guilds[':guild_id'].stickers.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useGetGuildsGuildIdStickersStickerId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdStickersStickerIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].stickers[':sticker_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/stickers/{sticker_id
 */
export function getGetGuildsGuildIdStickersStickerIdKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
) {
  return ['/guilds/:guild_id/stickers/:sticker_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useDeleteGuildsGuildIdStickersStickerId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /guilds/:guild_id/stickers/:sticker_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.guilds[':guild_id'].stickers[':sticker_id'].$delete(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * PATCH /guilds/{guild_id}/stickers/{sticker_id}
 */
export function usePatchGuildsGuildIdStickersStickerId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id/stickers/:sticker_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']
        >
      },
    ) =>
      parseResponse(
        client.guilds[':guild_id'].stickers[':sticker_id'].$patch(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/templates
 */
export function useGetGuildsGuildIdTemplates(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdTemplatesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].templates.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/templates
 */
export function getGetGuildsGuildIdTemplatesKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
) {
  return ['/guilds/:guild_id/templates', ...(args ? [args] : [])] as const
}

/**
 * POST /guilds/{guild_id}/templates
 */
export function usePostGuildsGuildIdTemplates(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /guilds/:guild_id/templates',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']> },
    ) => parseResponse(client.guilds[':guild_id'].templates.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * PUT /guilds/{guild_id}/templates/{code}
 */
export function usePutGuildsGuildIdTemplatesCode(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /guilds/:guild_id/templates/:code',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
      },
    ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$put(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /guilds/{guild_id}/templates/{code}
 */
export function useDeleteGuildsGuildIdTemplatesCode(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /guilds/:guild_id/templates/:code',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
      },
    ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * PATCH /guilds/{guild_id}/templates/{code}
 */
export function usePatchGuildsGuildIdTemplatesCode(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id/templates/:code',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
      },
    ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/threads/active
 */
export function useGetGuildsGuildIdThreadsActive(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdThreadsActiveKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].threads.active.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/threads/active
 */
export function getGetGuildsGuildIdThreadsActiveKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdVanityUrlKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id']['vanity-url'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/vanity-url
 */
export function getGetGuildsGuildIdVanityUrlKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdVoiceStatesMeKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/voice-states/@me
 */
export function getGetGuildsGuildIdVoiceStatesMeKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
) {
  return ['/guilds/:guild_id/voice-states/@me', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}/voice-states/@me
 */
export function usePatchGuildsGuildIdVoiceStatesMe(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id/voice-states/@me',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
      },
    ) =>
      parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/voice-states/{user_id}
 */
export function useGetGuildsGuildIdVoiceStatesUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdVoiceStatesUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.guilds[':guild_id']['voice-states'][':user_id'].$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/voice-states/{user_id
 */
export function getGetGuildsGuildIdVoiceStatesUserIdKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/voice-states/:user_id', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}/voice-states/{user_id}
 */
export function usePatchGuildsGuildIdVoiceStatesUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id/voice-states/:user_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']
        >
      },
    ) =>
      parseResponse(
        client.guilds[':guild_id']['voice-states'][':user_id'].$patch(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/webhooks
 */
export function useGetGuildsGuildIdWebhooks(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdWebhooksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].webhooks.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/webhooks
 */
export function getGetGuildsGuildIdWebhooksKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdWelcomeScreenKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id']['welcome-screen'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/welcome-screen
 */
export function getGetGuildsGuildIdWelcomeScreenKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
) {
  return ['/guilds/:guild_id/welcome-screen', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}/welcome-screen
 */
export function usePatchGuildsGuildIdWelcomeScreen(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id/welcome-screen',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']> },
    ) => parseResponse(client.guilds[':guild_id']['welcome-screen'].$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/widget
 */
export function useGetGuildsGuildIdWidget(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdWidgetKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].widget.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/widget
 */
export function getGetGuildsGuildIdWidgetKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
) {
  return ['/guilds/:guild_id/widget', ...(args ? [args] : [])] as const
}

/**
 * PATCH /guilds/{guild_id}/widget
 */
export function usePatchGuildsGuildIdWidget(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /guilds/:guild_id/widget',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']> },
    ) => parseResponse(client.guilds[':guild_id'].widget.$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /guilds/{guild_id}/widget.json
 */
export function useGetGuildsGuildIdWidgetJson(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdWidgetJsonKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id']['widget.json'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/widget.json
 */
export function getGetGuildsGuildIdWidgetJsonKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetGuildsGuildIdWidgetPngKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id']['widget.png'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id/widget.png
 */
export function getGetGuildsGuildIdWidgetPngKey(
  args?: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
) {
  return ['/guilds/:guild_id/widget.png', ...(args ? [args] : [])] as const
}

/**
 * POST /interactions/{interaction_id}/{interaction_token}/callback
 */
export function usePostInteractionsInteractionIdInteractionTokenCallback(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /interactions/:interaction_id/:interaction_token/callback',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
        >
      },
    ) =>
      parseResponse(
        client.interactions[':interaction_id'][':interaction_token'].callback.$post(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * GET /invites/{code}
 */
export function useGetInvitesCode(
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetInvitesCodeKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.invites[':code'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /invites/{code
 */
export function getGetInvitesCodeKey(
  args?: InferRequestType<(typeof client.invites)[':code']['$get']>,
) {
  return ['/invites/:code', ...(args ? [args] : [])] as const
}

/**
 * DELETE /invites/{code}
 */
export function useDeleteInvitesCode(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.invites)[':code']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.invites)[':code']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /invites/:code',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.invites)[':code']['$delete']> },
    ) => parseResponse(client.invites[':code'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * PUT /lobbies
 */
export function usePutLobbies(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.lobbies.$put>,
    Error,
    string,
    InferRequestType<typeof client.lobbies.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /lobbies',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.lobbies.$put> }) =>
      parseResponse(client.lobbies.$put(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /lobbies
 */
export function usePostLobbies(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.lobbies.$post>,
    Error,
    string,
    InferRequestType<typeof client.lobbies.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /lobbies',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.lobbies.$post> }) =>
      parseResponse(client.lobbies.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /lobbies/{lobby_id}
 */
export function useGetLobbiesLobbyId(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetLobbiesLobbyIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.lobbies[':lobby_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /lobbies/{lobby_id
 */
export function getGetLobbiesLobbyIdKey(
  args?: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
) {
  return ['/lobbies/:lobby_id', ...(args ? [args] : [])] as const
}

/**
 * PATCH /lobbies/{lobby_id}
 */
export function usePatchLobbiesLobbyId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /lobbies/:lobby_id',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']> },
    ) => parseResponse(client.lobbies[':lobby_id'].$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * PATCH /lobbies/{lobby_id}/channel-linking
 */
export function usePatchLobbiesLobbyIdChannelLinking(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /lobbies/:lobby_id/channel-linking',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
      },
    ) => parseResponse(client.lobbies[':lobby_id']['channel-linking'].$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /lobbies/{lobby_id}/members/@me
 */
export function useDeleteLobbiesLobbyIdMembersMe(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /lobbies/:lobby_id/members/@me',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
      },
    ) => parseResponse(client.lobbies[':lobby_id'].members['@me'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /lobbies/{lobby_id}/members/@me/invites
 */
export function usePostLobbiesLobbyIdMembersMeInvites(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /lobbies/:lobby_id/members/@me/invites',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']
        >
      },
    ) =>
      parseResponse(client.lobbies[':lobby_id'].members['@me'].invites.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /lobbies/{lobby_id}/members/bulk
 */
export function usePostLobbiesLobbyIdMembersBulk(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /lobbies/:lobby_id/members/bulk',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
      },
    ) => parseResponse(client.lobbies[':lobby_id'].members.bulk.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * PUT /lobbies/{lobby_id}/members/{user_id}
 */
export function usePutLobbiesLobbyIdMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /lobbies/:lobby_id/members/:user_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
      },
    ) => parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$put(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /lobbies/{lobby_id}/members/{user_id}
 */
export function useDeleteLobbiesLobbyIdMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /lobbies/:lobby_id/members/:user_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']
        >
      },
    ) =>
      parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /lobbies/{lobby_id}/members/{user_id}/invites
 */
export function usePostLobbiesLobbyIdMembersUserIdInvites(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /lobbies/:lobby_id/members/:user_id/invites',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
        >
      },
    ) =>
      parseResponse(
        client.lobbies[':lobby_id'].members[':user_id'].invites.$post(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * GET /lobbies/{lobby_id}/messages
 */
export function useGetLobbiesLobbyIdMessages(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetLobbiesLobbyIdMessagesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.lobbies[':lobby_id'].messages.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /lobbies/{lobby_id/messages
 */
export function getGetLobbiesLobbyIdMessagesKey(
  args?: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
) {
  return ['/lobbies/:lobby_id/messages', ...(args ? [args] : [])] as const
}

/**
 * POST /lobbies/{lobby_id}/messages
 */
export function usePostLobbiesLobbyIdMessages(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /lobbies/:lobby_id/messages',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']> },
    ) => parseResponse(client.lobbies[':lobby_id'].messages.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /oauth2/@me
 */
export function useGetOauth2Me(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOauth2MeKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth2['@me'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth2/@me
 */
export function getGetOauth2MeKey() {
  return ['/oauth2/@me'] as const
}

/**
 * GET /oauth2/applications/@me
 */
export function useGetOauth2ApplicationsMe(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOauth2ApplicationsMeKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth2.applications['@me'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth2/applications/@me
 */
export function getGetOauth2ApplicationsMeKey() {
  return ['/oauth2/applications/@me'] as const
}

/**
 * GET /oauth2/keys
 */
export function useGetOauth2Keys(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOauth2KeysKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth2.keys.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth2/keys
 */
export function getGetOauth2KeysKey() {
  return ['/oauth2/keys'] as const
}

/**
 * GET /oauth2/userinfo
 */
export function useGetOauth2Userinfo(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetOauth2UserinfoKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth2.userinfo.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth2/userinfo
 */
export function getGetOauth2UserinfoKey() {
  return ['/oauth2/userinfo'] as const
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge
 */
export function usePostPartnerSdkProvisionalAccountsUnmerge(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /partner-sdk/provisional-accounts/unmerge',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']
        >
      },
    ) =>
      parseResponse(
        client['partner-sdk']['provisional-accounts'].unmerge.$post(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge/bot
 */
export function usePostPartnerSdkProvisionalAccountsUnmergeBot(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /partner-sdk/provisional-accounts/unmerge/bot',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
        >
      },
    ) =>
      parseResponse(
        client['partner-sdk']['provisional-accounts'].unmerge.bot.$post(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * POST /partner-sdk/token
 */
export function usePostPartnerSdkToken(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['partner-sdk']['token']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['partner-sdk']['token']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /partner-sdk/token',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['partner-sdk']['token']['$post']> },
    ) => parseResponse(client['partner-sdk'].token.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /partner-sdk/token/bot
 */
export function usePostPartnerSdkTokenBot(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['partner-sdk']['token']['bot']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /partner-sdk/token/bot',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']> },
    ) => parseResponse(client['partner-sdk'].token.bot.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /soundboard-default-sounds
 */
export function useGetSoundboardDefaultSounds(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSoundboardDefaultSoundsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['soundboard-default-sounds'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /soundboard-default-sounds
 */
export function getGetSoundboardDefaultSoundsKey() {
  return ['/soundboard-default-sounds'] as const
}

/**
 * POST /stage-instances
 */
export function usePostStageInstances(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['stage-instances']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['stage-instances']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /stage-instances',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['stage-instances']['$post']> },
    ) => parseResponse(client['stage-instances'].$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /stage-instances/{channel_id}
 */
export function useGetStageInstancesChannelId(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetStageInstancesChannelIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['stage-instances'][':channel_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /stage-instances/{channel_id
 */
export function getGetStageInstancesChannelIdKey(
  args?: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
) {
  return ['/stage-instances/:channel_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /stage-instances/{channel_id}
 */
export function useDeleteStageInstancesChannelId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['stage-instances'][':channel_id']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /stage-instances/:channel_id',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']> },
    ) => parseResponse(client['stage-instances'][':channel_id'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * PATCH /stage-instances/{channel_id}
 */
export function usePatchStageInstancesChannelId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['stage-instances'][':channel_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /stage-instances/:channel_id',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']> },
    ) => parseResponse(client['stage-instances'][':channel_id'].$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /sticker-packs
 */
export function useGetStickerPacks(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetStickerPacksKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['sticker-packs'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sticker-packs
 */
export function getGetStickerPacksKey() {
  return ['/sticker-packs'] as const
}

/**
 * GET /sticker-packs/{pack_id}
 */
export function useGetStickerPacksPackId(
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetStickerPacksPackIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['sticker-packs'][':pack_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sticker-packs/{pack_id
 */
export function getGetStickerPacksPackIdKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetStickersStickerIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.stickers[':sticker_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /stickers/{sticker_id
 */
export function getGetStickersStickerIdKey(
  args?: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
) {
  return ['/stickers/:sticker_id', ...(args ? [args] : [])] as const
}

/**
 * GET /users/@me
 */
export function useGetUsersMe(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersMeKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users['@me'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/@me
 */
export function getGetUsersMeKey() {
  return ['/users/@me'] as const
}

/**
 * PATCH /users/@me
 */
export function usePatchUsersMe(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)['@me']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.users)['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /users/@me',
    async (_: string, { arg }: { arg: InferRequestType<(typeof client.users)['@me']['$patch']> }) =>
      parseResponse(client.users['@me'].$patch(arg, options?.client)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetUsersMeApplicationsApplicationIdEntitlementsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.users['@me'].applications[':application_id'].entitlements.$get(
            args,
            clientOptions,
          ),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/@me/applications/{application_id/entitlements
 */
export function getGetUsersMeApplicationsApplicationIdEntitlementsKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetUsersMeApplicationsApplicationIdRoleConnectionKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.users['@me'].applications[':application_id']['role-connection'].$get(
            args,
            clientOptions,
          ),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/@me/applications/{application_id/role-connection
 */
export function getGetUsersMeApplicationsApplicationIdRoleConnectionKey(
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
export function usePutUsersMeApplicationsApplicationIdRoleConnection(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /users/@me/applications/:application_id/role-connection',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
        >
      },
    ) =>
      parseResponse(
        client.users['@me'].applications[':application_id']['role-connection'].$put(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * DELETE /users/@me/applications/{application_id}/role-connection
 */
export function useDeleteUsersMeApplicationsApplicationIdRoleConnection(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /users/@me/applications/:application_id/role-connection',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.users['@me'].applications[':application_id']['role-connection'].$delete(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * POST /users/@me/channels
 */
export function usePostUsersMeChannels(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)['@me']['channels']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)['@me']['channels']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /users/@me/channels',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.users)['@me']['channels']['$post']> },
    ) => parseResponse(client.users['@me'].channels.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /users/@me/connections
 */
export function useGetUsersMeConnections(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersMeConnectionsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users['@me'].connections.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/@me/connections
 */
export function getGetUsersMeConnectionsKey() {
  return ['/users/@me/connections'] as const
}

/**
 * GET /users/@me/guilds
 */
export function useGetUsersMeGuilds(
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersMeGuildsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users['@me'].guilds.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/@me/guilds
 */
export function getGetUsersMeGuildsKey(
  args?: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
) {
  return ['/users/@me/guilds', ...(args ? [args] : [])] as const
}

/**
 * DELETE /users/@me/guilds/{guild_id}
 */
export function useDeleteUsersMeGuildsGuildId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /users/@me/guilds/:guild_id',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']> },
    ) => parseResponse(client.users['@me'].guilds[':guild_id'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /users/@me/guilds/{guild_id}/member
 */
export function useGetUsersMeGuildsGuildIdMember(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetUsersMeGuildsGuildIdMemberKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.users['@me'].guilds[':guild_id'].member.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/@me/guilds/{guild_id/member
 */
export function getGetUsersMeGuildsGuildIdMemberKey(
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetUsersUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':user_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{user_id
 */
export function getGetUsersUserIdKey(
  args?: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return ['/users/:user_id', ...(args ? [args] : [])] as const
}

/**
 * GET /voice/regions
 */
export function useGetVoiceRegions(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetVoiceRegionsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.voice.regions.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /voice/regions
 */
export function getGetVoiceRegionsKey() {
  return ['/voice/regions'] as const
}

/**
 * GET /webhooks/{webhook_id}
 */
export function useGetWebhooksWebhookId(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetWebhooksWebhookIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.webhooks[':webhook_id'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webhooks/{webhook_id
 */
export function getGetWebhooksWebhookIdKey(
  args?: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
) {
  return ['/webhooks/:webhook_id', ...(args ? [args] : [])] as const
}

/**
 * DELETE /webhooks/{webhook_id}
 */
export function useDeleteWebhooksWebhookId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhook_id']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /webhooks/:webhook_id',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']> },
    ) => parseResponse(client.webhooks[':webhook_id'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * PATCH /webhooks/{webhook_id}
 */
export function usePatchWebhooksWebhookId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhook_id']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /webhooks/:webhook_id',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']> },
    ) => parseResponse(client.webhooks[':webhook_id'].$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * GET /webhooks/{webhook_id}/{webhook_token}
 */
export function useGetWebhooksWebhookIdWebhookToken(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetWebhooksWebhookIdWebhookTokenKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webhooks/{webhook_id/{webhook_token
 */
export function getGetWebhooksWebhookIdWebhookTokenKey(
  args?: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
) {
  return ['/webhooks/:webhook_id/:webhook_token', ...(args ? [args] : [])] as const
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}
 */
export function usePostWebhooksWebhookIdWebhookToken(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /webhooks/:webhook_id/:webhook_token',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
      },
    ) =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}
 */
export function useDeleteWebhooksWebhookIdWebhookToken(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /webhooks/:webhook_id/:webhook_token',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
      },
    ) =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}
 */
export function usePatchWebhooksWebhookIdWebhookToken(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /webhooks/:webhook_id/:webhook_token',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
      },
    ) =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$patch(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/github
 */
export function usePostWebhooksWebhookIdWebhookTokenGithub(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
      >
    | undefined,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /webhooks/:webhook_id/:webhook_token/github',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
        >
      },
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].github.$post(arg, options?.client),
      ),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetWebhooksWebhookIdWebhookTokenMessagesOriginalKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$get(
            args,
            clientOptions,
          ),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webhooks/{webhook_id/{webhook_token/messages/@original
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesOriginalKey(
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
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /webhooks/:webhook_id/:webhook_token/messages/@original',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$delete(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function usePatchWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /webhooks/:webhook_id/:webhook_token/messages/@original',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
        >
      },
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$patch(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$get(
            args,
            clientOptions,
          ),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webhooks/{webhook_id/{webhook_token/messages/{message_id
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdKey(
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
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
  mutation?: SWRMutationConfiguration<
    | InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
      >
    | undefined,
    Error,
    string,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /webhooks/:webhook_id/:webhook_token/messages/:message_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
        >
      },
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$delete(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function usePatchWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
  mutation?: SWRMutationConfiguration<
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
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /webhooks/:webhook_id/:webhook_token/messages/:message_id',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
        >
      },
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$patch(
          arg,
          options?.client,
        ),
      ),
    mutationOptions,
  )
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/slack
 */
export function usePostWebhooksWebhookIdWebhookTokenSlack(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /webhooks/:webhook_id/:webhook_token/slack',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
        >
      },
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].slack.$post(arg, options?.client),
      ),
    mutationOptions,
  )
}
