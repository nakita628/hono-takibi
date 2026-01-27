import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discord-api-spec-openapi_preview'

/**
 * Generates SWR cache key for GET /applications/@me
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetApplicationsMeKey() {
  return ['/applications/@me'] as const
}

/**
 * GET /applications/@me
 */
export function useGetApplicationsMe(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetApplicationsMeKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.applications['@me'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /applications/@me
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchApplicationsMeMutationKey() {
  return ['/applications/@me'] as const
}

/**
 * PATCH /applications/@me
 */
export function usePatchApplicationsMe(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.applications)['@me']['$patch']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.applications)['@me']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchApplicationsMeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.applications)['@me']['$patch']> },
      ) => parseResponse(client.applications['@me'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetApplicationsApplicationIdKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
) {
  return [`/applications/${args.param.application_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetApplicationsApplicationIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.applications[':application_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /applications/{application_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchApplicationsApplicationIdMutationKey() {
  return ['/applications/:application_id'] as const
}

/**
 * PATCH /applications/{application_id}
 */
export function usePatchApplicationsApplicationId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.applications)[':application_id']['$patch']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.applications)[':application_id']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchApplicationsApplicationIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.applications)[':application_id']['$patch']> },
      ) => parseResponse(client.applications[':application_id'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/activity-instances/{instance_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetApplicationsApplicationIdActivityInstancesInstanceIdKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
) {
  return [
    `/applications/${args.param.application_id}/activity-instances/${args.param.instance_id}`,
    args,
  ] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ??
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /applications/{application_id}/attachment
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostApplicationsApplicationIdAttachmentMutationKey() {
  return ['/applications/:application_id/attachment'] as const
}

/**
 * POST /applications/{application_id}/attachment
 */
export function usePostApplicationsApplicationIdAttachment(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.applications)[':application_id']['attachment']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApplicationsApplicationIdAttachmentMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.applications)[':application_id']['attachment']['$post']
          >
        },
      ) =>
        parseResponse(client.applications[':application_id'].attachment.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/commands
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetApplicationsApplicationIdCommandsKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
) {
  return [`/applications/${args.param.application_id}/commands`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetApplicationsApplicationIdCommandsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.applications[':application_id'].commands.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /applications/{application_id}/commands
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutApplicationsApplicationIdCommandsMutationKey() {
  return ['/applications/:application_id/commands'] as const
}

/**
 * PUT /applications/{application_id}/commands
 */
export function usePutApplicationsApplicationIdCommands(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.applications)[':application_id']['commands']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutApplicationsApplicationIdCommandsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>
        },
      ) => parseResponse(client.applications[':application_id'].commands.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /applications/{application_id}/commands
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostApplicationsApplicationIdCommandsMutationKey() {
  return ['/applications/:application_id/commands'] as const
}

/**
 * POST /applications/{application_id}/commands
 */
export function usePostApplicationsApplicationIdCommands(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.applications)[':application_id']['commands']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApplicationsApplicationIdCommandsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.applications)[':application_id']['commands']['$post']
          >
        },
      ) => parseResponse(client.applications[':application_id'].commands.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/commands/{command_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetApplicationsApplicationIdCommandsCommandIdKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
) {
  return [
    `/applications/${args.param.application_id}/commands/${args.param.command_id}`,
    args,
  ] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetApplicationsApplicationIdCommandsCommandIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.applications[':application_id'].commands[':command_id'].$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /applications/{application_id}/commands/{command_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteApplicationsApplicationIdCommandsCommandIdMutationKey() {
  return ['/applications/:application_id/commands/:command_id'] as const
}

/**
 * DELETE /applications/{application_id}/commands/{command_id}
 */
export function useDeleteApplicationsApplicationIdCommandsCommandId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteApplicationsApplicationIdCommandsCommandIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /applications/{application_id}/commands/{command_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchApplicationsApplicationIdCommandsCommandIdMutationKey() {
  return ['/applications/:application_id/commands/:command_id'] as const
}

/**
 * PATCH /applications/{application_id}/commands/{command_id}
 */
export function usePatchApplicationsApplicationIdCommandsCommandId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchApplicationsApplicationIdCommandsCommandIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
          >
        },
      ) =>
        parseResponse(
          client.applications[':application_id'].commands[':command_id'].$patch(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/emojis
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetApplicationsApplicationIdEmojisKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
) {
  return [`/applications/${args.param.application_id}/emojis`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetApplicationsApplicationIdEmojisKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.applications[':application_id'].emojis.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /applications/{application_id}/emojis
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostApplicationsApplicationIdEmojisMutationKey() {
  return ['/applications/:application_id/emojis'] as const
}

/**
 * POST /applications/{application_id}/emojis
 */
export function usePostApplicationsApplicationIdEmojis(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.applications)[':application_id']['emojis']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApplicationsApplicationIdEmojisMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>
        },
      ) => parseResponse(client.applications[':application_id'].emojis.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/emojis/{emoji_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetApplicationsApplicationIdEmojisEmojiIdKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
) {
  return [`/applications/${args.param.application_id}/emojis/${args.param.emoji_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetApplicationsApplicationIdEmojisEmojiIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.applications[':application_id'].emojis[':emoji_id'].$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /applications/{application_id}/emojis/{emoji_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteApplicationsApplicationIdEmojisEmojiIdMutationKey() {
  return ['/applications/:application_id/emojis/:emoji_id'] as const
}

/**
 * DELETE /applications/{application_id}/emojis/{emoji_id}
 */
export function useDeleteApplicationsApplicationIdEmojisEmojiId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteApplicationsApplicationIdEmojisEmojiIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
          >
        },
      ) =>
        parseResponse(
          client.applications[':application_id'].emojis[':emoji_id'].$delete(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /applications/{application_id}/emojis/{emoji_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchApplicationsApplicationIdEmojisEmojiIdMutationKey() {
  return ['/applications/:application_id/emojis/:emoji_id'] as const
}

/**
 * PATCH /applications/{application_id}/emojis/{emoji_id}
 */
export function usePatchApplicationsApplicationIdEmojisEmojiId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchApplicationsApplicationIdEmojisEmojiIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
          >
        },
      ) =>
        parseResponse(
          client.applications[':application_id'].emojis[':emoji_id'].$patch(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/entitlements
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetApplicationsApplicationIdEntitlementsKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
) {
  return [`/applications/${args.param.application_id}/entitlements`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetApplicationsApplicationIdEntitlementsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.applications[':application_id'].entitlements.$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /applications/{application_id}/entitlements
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostApplicationsApplicationIdEntitlementsMutationKey() {
  return ['/applications/:application_id/entitlements'] as const
}

/**
 * POST /applications/{application_id}/entitlements
 */
export function usePostApplicationsApplicationIdEntitlements(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApplicationsApplicationIdEntitlementsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.applications)[':application_id']['entitlements']['$post']
          >
        },
      ) =>
        parseResponse(
          client.applications[':application_id'].entitlements.$post(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/entitlements/{entitlement_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetApplicationsApplicationIdEntitlementsEntitlementIdKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
) {
  return [
    `/applications/${args.param.application_id}/entitlements/${args.param.entitlement_id}`,
    args,
  ] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ??
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /applications/{application_id}/entitlements/{entitlement_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationKey() {
  return ['/applications/:application_id/entitlements/:entitlement_id'] as const
}

/**
 * DELETE /applications/{application_id}/entitlements/{entitlement_id}
 */
export function useDeleteApplicationsApplicationIdEntitlementsEntitlementId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /applications/{application_id}/entitlements/{entitlement_id}/consume
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationKey() {
  return ['/applications/:application_id/entitlements/:entitlement_id/consume'] as const
}

/**
 * POST /applications/{application_id}/entitlements/{entitlement_id}/consume
 */
export function usePostApplicationsApplicationIdEntitlementsEntitlementIdConsume(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/guilds/{guild_id}/commands
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
) {
  return [
    `/applications/${args.param.application_id}/guilds/${args.param.guild_id}/commands`,
    args,
  ] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetApplicationsApplicationIdGuildsGuildIdCommandsKey(args) : null)
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /applications/{application_id}/guilds/{guild_id}/commands
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationKey() {
  return ['/applications/:application_id/guilds/:guild_id/commands'] as const
}

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands
 */
export function usePutApplicationsApplicationIdGuildsGuildIdCommands(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /applications/{application_id}/guilds/{guild_id}/commands
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationKey() {
  return ['/applications/:application_id/guilds/:guild_id/commands'] as const
}

/**
 * POST /applications/{application_id}/guilds/{guild_id}/commands
 */
export function usePostApplicationsApplicationIdGuildsGuildIdCommands(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
) {
  return [
    `/applications/${args.param.application_id}/guilds/${args.param.guild_id}/commands/permissions`,
    args,
  ] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ??
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
) {
  return [
    `/applications/${args.param.application_id}/guilds/${args.param.guild_id}/commands/${args.param.command_id}`,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ??
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey() {
  return ['/applications/:application_id/guilds/:guild_id/commands/:command_id'] as const
}

/**
 * DELETE /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function useDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
          >
        },
      ) =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands[
            ':command_id'
          ].$delete(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey() {
  return ['/applications/:application_id/guilds/:guild_id/commands/:command_id'] as const
}

/**
 * PATCH /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function usePatchApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
  >,
) {
  return [
    `/applications/${args.param.application_id}/guilds/${args.param.guild_id}/commands/${args.param.command_id}/permissions`,
    args,
  ] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ??
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsMutationKey() {
  return [
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
  ] as const
}

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 */
export function usePutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
          ].permissions.$put(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /applications/{application_id}/role-connections/metadata
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetApplicationsApplicationIdRoleConnectionsMetadataKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
) {
  return [`/applications/${args.param.application_id}/role-connections/metadata`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ??
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /applications/{application_id}/role-connections/metadata
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutApplicationsApplicationIdRoleConnectionsMetadataMutationKey() {
  return ['/applications/:application_id/role-connections/metadata'] as const
}

/**
 * PUT /applications/{application_id}/role-connections/metadata
 */
export function usePutApplicationsApplicationIdRoleConnectionsMetadata(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutApplicationsApplicationIdRoleConnectionsMetadataMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChannelsChannelIdKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
) {
  return [`/channels/${args.param.channel_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetChannelsChannelIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.channels[':channel_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteChannelsChannelIdMutationKey() {
  return ['/channels/:channel_id'] as const
}

/**
 * DELETE /channels/{channel_id}
 */
export function useDeleteChannelsChannelId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.channels)[':channel_id']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['$delete']> },
      ) => parseResponse(client.channels[':channel_id'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /channels/{channel_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchChannelsChannelIdMutationKey() {
  return ['/channels/:channel_id'] as const
}

/**
 * PATCH /channels/{channel_id}
 */
export function usePatchChannelsChannelId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.channels)[':channel_id']['$patch']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchChannelsChannelIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['$patch']> },
      ) => parseResponse(client.channels[':channel_id'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/followers
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostChannelsChannelIdFollowersMutationKey() {
  return ['/channels/:channel_id/followers'] as const
}

/**
 * POST /channels/{channel_id}/followers
 */
export function usePostChannelsChannelIdFollowers(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.channels)[':channel_id']['followers']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdFollowersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']> },
      ) => parseResponse(client.channels[':channel_id'].followers.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/invites
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChannelsChannelIdInvitesKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
) {
  return [`/channels/${args.param.channel_id}/invites`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetChannelsChannelIdInvitesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.channels[':channel_id'].invites.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/invites
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostChannelsChannelIdInvitesMutationKey() {
  return ['/channels/:channel_id/invites'] as const
}

/**
 * POST /channels/{channel_id}/invites
 */
export function usePostChannelsChannelIdInvites(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['invites']['$post']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdInvitesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']> },
      ) => parseResponse(client.channels[':channel_id'].invites.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/messages
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChannelsChannelIdMessagesKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
) {
  return [`/channels/${args.param.channel_id}/messages`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetChannelsChannelIdMessagesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.channels[':channel_id'].messages.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/messages
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostChannelsChannelIdMessagesMutationKey() {
  return ['/channels/:channel_id/messages'] as const
}

/**
 * POST /channels/{channel_id}/messages
 */
export function usePostChannelsChannelIdMessages(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.channels)[':channel_id']['messages']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdMessagesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']> },
      ) => parseResponse(client.channels[':channel_id'].messages.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/messages/bulk-delete
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostChannelsChannelIdMessagesBulkDeleteMutationKey() {
  return ['/channels/:channel_id/messages/bulk-delete'] as const
}

/**
 * POST /channels/{channel_id}/messages/bulk-delete
 */
export function usePostChannelsChannelIdMessagesBulkDelete(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdMessagesBulkDeleteMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id'].messages['bulk-delete'].$post(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/messages/pins
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChannelsChannelIdMessagesPinsKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
) {
  return [`/channels/${args.param.channel_id}/messages/pins`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetChannelsChannelIdMessagesPinsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.channels[':channel_id'].messages.pins.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/{channel_id}/messages/pins/{message_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutChannelsChannelIdMessagesPinsMessageIdMutationKey() {
  return ['/channels/:channel_id/messages/pins/:message_id'] as const
}

/**
 * PUT /channels/{channel_id}/messages/pins/{message_id}
 */
export function usePutChannelsChannelIdMessagesPinsMessageId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutChannelsChannelIdMessagesPinsMessageIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id'].messages.pins[':message_id'].$put(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/messages/pins/{message_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteChannelsChannelIdMessagesPinsMessageIdMutationKey() {
  return ['/channels/:channel_id/messages/pins/:message_id'] as const
}

/**
 * DELETE /channels/{channel_id}/messages/pins/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesPinsMessageId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdMessagesPinsMessageIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id'].messages.pins[':message_id'].$delete(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/messages/{message_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChannelsChannelIdMessagesMessageIdKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
) {
  return [`/channels/${args.param.channel_id}/messages/${args.param.message_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetChannelsChannelIdMessagesMessageIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/messages/{message_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteChannelsChannelIdMessagesMessageIdMutationKey() {
  return ['/channels/:channel_id/messages/:message_id'] as const
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesMessageId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdMessagesMessageIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].$delete(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /channels/{channel_id}/messages/{message_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchChannelsChannelIdMessagesMessageIdMutationKey() {
  return ['/channels/:channel_id/messages/:message_id'] as const
}

/**
 * PATCH /channels/{channel_id}/messages/{message_id}
 */
export function usePatchChannelsChannelIdMessagesMessageId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchChannelsChannelIdMessagesMessageIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].$patch(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/messages/{message_id}/crosspost
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostChannelsChannelIdMessagesMessageIdCrosspostMutationKey() {
  return ['/channels/:channel_id/messages/:message_id/crosspost'] as const
}

/**
 * POST /channels/{channel_id}/messages/{message_id}/crosspost
 */
export function usePostChannelsChannelIdMessagesMessageIdCrosspost(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdMessagesMessageIdCrosspostMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/messages/{message_id}/reactions
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationKey() {
  return ['/channels/:channel_id/messages/:message_id/reactions'] as const
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactions(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
) {
  return [
    `/channels/${args.param.channel_id}/messages/${args.param.message_id}/reactions/${args.param.emoji_name}`,
    args,
  ] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ??
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationKey() {
  return ['/channels/:channel_id/messages/:message_id/reactions/:emoji_name'] as const
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiName(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey() {
  return ['/channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me'] as const
}

/**
 * PUT /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function usePutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'][
            '@me'
          ].$put(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey() {
  return ['/channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me'] as const
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
          ].$delete(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationKey() {
  return ['/channels/:channel_id/messages/:message_id/reactions/:emoji_name/:user_id'] as const
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
          ].$delete(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/messages/{message_id}/threads
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostChannelsChannelIdMessagesMessageIdThreadsMutationKey() {
  return ['/channels/:channel_id/messages/:message_id/threads'] as const
}

/**
 * POST /channels/{channel_id}/messages/{message_id}/threads
 */
export function usePostChannelsChannelIdMessagesMessageIdThreads(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdMessagesMessageIdThreadsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id'].messages[':message_id'].threads.$post(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/{channel_id}/permissions/{overwrite_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutChannelsChannelIdPermissionsOverwriteIdMutationKey() {
  return ['/channels/:channel_id/permissions/:overwrite_id'] as const
}

/**
 * PUT /channels/{channel_id}/permissions/{overwrite_id}
 */
export function usePutChannelsChannelIdPermissionsOverwriteId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutChannelsChannelIdPermissionsOverwriteIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id'].permissions[':overwrite_id'].$put(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/permissions/{overwrite_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteChannelsChannelIdPermissionsOverwriteIdMutationKey() {
  return ['/channels/:channel_id/permissions/:overwrite_id'] as const
}

/**
 * DELETE /channels/{channel_id}/permissions/{overwrite_id}
 */
export function useDeleteChannelsChannelIdPermissionsOverwriteId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdPermissionsOverwriteIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id'].permissions[':overwrite_id'].$delete(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/pins
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChannelsChannelIdPinsKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
) {
  return [`/channels/${args.param.channel_id}/pins`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetChannelsChannelIdPinsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.channels[':channel_id'].pins.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/{channel_id}/pins/{message_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutChannelsChannelIdPinsMessageIdMutationKey() {
  return ['/channels/:channel_id/pins/:message_id'] as const
}

/**
 * PUT /channels/{channel_id}/pins/{message_id}
 */
export function usePutChannelsChannelIdPinsMessageId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutChannelsChannelIdPinsMessageIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['pins'][':message_id']['$put']
          >
        },
      ) =>
        parseResponse(client.channels[':channel_id'].pins[':message_id'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/pins/{message_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteChannelsChannelIdPinsMessageIdMutationKey() {
  return ['/channels/:channel_id/pins/:message_id'] as const
}

/**
 * DELETE /channels/{channel_id}/pins/{message_id}
 */
export function useDeleteChannelsChannelIdPinsMessageId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdPinsMessageIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id'].pins[':message_id'].$delete(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
) {
  return [
    `/channels/${args.param.channel_id}/polls/${args.param.message_id}/answers/${args.param.answer_id}`,
    args,
  ] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdKey(args) : null)
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/polls/{message_id}/expire
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostChannelsChannelIdPollsMessageIdExpireMutationKey() {
  return ['/channels/:channel_id/polls/:message_id/expire'] as const
}

/**
 * POST /channels/{channel_id}/polls/{message_id}/expire
 */
export function usePostChannelsChannelIdPollsMessageIdExpire(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdPollsMessageIdExpireMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id'].polls[':message_id'].expire.$post(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/{channel_id}/recipients/{user_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutChannelsChannelIdRecipientsUserIdMutationKey() {
  return ['/channels/:channel_id/recipients/:user_id'] as const
}

/**
 * PUT /channels/{channel_id}/recipients/{user_id}
 */
export function usePutChannelsChannelIdRecipientsUserId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutChannelsChannelIdRecipientsUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id'].recipients[':user_id'].$put(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/recipients/{user_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteChannelsChannelIdRecipientsUserIdMutationKey() {
  return ['/channels/:channel_id/recipients/:user_id'] as const
}

/**
 * DELETE /channels/{channel_id}/recipients/{user_id}
 */
export function useDeleteChannelsChannelIdRecipientsUserId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdRecipientsUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id'].recipients[':user_id'].$delete(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/send-soundboard-sound
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostChannelsChannelIdSendSoundboardSoundMutationKey() {
  return ['/channels/:channel_id/send-soundboard-sound'] as const
}

/**
 * POST /channels/{channel_id}/send-soundboard-sound
 */
export function usePostChannelsChannelIdSendSoundboardSound(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdSendSoundboardSoundMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id']['send-soundboard-sound'].$post(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/thread-members
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChannelsChannelIdThreadMembersKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
) {
  return [`/channels/${args.param.channel_id}/thread-members`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetChannelsChannelIdThreadMembersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.channels[':channel_id']['thread-members'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/{channel_id}/thread-members/@me
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutChannelsChannelIdThreadMembersMeMutationKey() {
  return ['/channels/:channel_id/thread-members/@me'] as const
}

/**
 * PUT /channels/{channel_id}/thread-members/@me
 */
export function usePutChannelsChannelIdThreadMembersMe(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutChannelsChannelIdThreadMembersMeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['thread-members']['@me']['$put']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id']['thread-members']['@me'].$put(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/thread-members/@me
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteChannelsChannelIdThreadMembersMeMutationKey() {
  return ['/channels/:channel_id/thread-members/@me'] as const
}

/**
 * DELETE /channels/{channel_id}/thread-members/@me
 */
export function useDeleteChannelsChannelIdThreadMembersMe(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdThreadMembersMeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id']['thread-members']['@me'].$delete(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/thread-members/{user_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChannelsChannelIdThreadMembersUserIdKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
) {
  return [`/channels/${args.param.channel_id}/thread-members/${args.param.user_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetChannelsChannelIdThreadMembersUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.channels[':channel_id']['thread-members'][':user_id'].$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/{channel_id}/thread-members/{user_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutChannelsChannelIdThreadMembersUserIdMutationKey() {
  return ['/channels/:channel_id/thread-members/:user_id'] as const
}

/**
 * PUT /channels/{channel_id}/thread-members/{user_id}
 */
export function usePutChannelsChannelIdThreadMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutChannelsChannelIdThreadMembersUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id']['thread-members'][':user_id'].$put(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/thread-members/{user_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteChannelsChannelIdThreadMembersUserIdMutationKey() {
  return ['/channels/:channel_id/thread-members/:user_id'] as const
}

/**
 * DELETE /channels/{channel_id}/thread-members/{user_id}
 */
export function useDeleteChannelsChannelIdThreadMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdThreadMembersUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
          >
        },
      ) =>
        parseResponse(
          client.channels[':channel_id']['thread-members'][':user_id'].$delete(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/threads
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostChannelsChannelIdThreadsMutationKey() {
  return ['/channels/:channel_id/threads'] as const
}

/**
 * POST /channels/{channel_id}/threads
 */
export function usePostChannelsChannelIdThreads(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.channels)[':channel_id']['threads']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdThreadsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']> },
      ) => parseResponse(client.channels[':channel_id'].threads.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/threads/archived/private
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChannelsChannelIdThreadsArchivedPrivateKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
) {
  return [`/channels/${args.param.channel_id}/threads/archived/private`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetChannelsChannelIdThreadsArchivedPrivateKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.channels[':channel_id'].threads.archived.private.$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/threads/archived/public
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChannelsChannelIdThreadsArchivedPublicKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
) {
  return [`/channels/${args.param.channel_id}/threads/archived/public`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetChannelsChannelIdThreadsArchivedPublicKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.channels[':channel_id'].threads.archived.public.$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/threads/search
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChannelsChannelIdThreadsSearchKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
) {
  return [`/channels/${args.param.channel_id}/threads/search`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetChannelsChannelIdThreadsSearchKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.channels[':channel_id'].threads.search.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/typing
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostChannelsChannelIdTypingMutationKey() {
  return ['/channels/:channel_id/typing'] as const
}

/**
 * POST /channels/{channel_id}/typing
 */
export function usePostChannelsChannelIdTyping(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['typing']['$post']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdTypingMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']> },
      ) => parseResponse(client.channels[':channel_id'].typing.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/users/@me/threads/archived/private
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChannelsChannelIdUsersMeThreadsArchivedPrivateKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
) {
  return [`/channels/${args.param.channel_id}/users/@me/threads/archived/private`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetChannelsChannelIdUsersMeThreadsArchivedPrivateKey(args) : null)
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /channels/{channel_id}/webhooks
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChannelsChannelIdWebhooksKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
) {
  return [`/channels/${args.param.channel_id}/webhooks`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetChannelsChannelIdWebhooksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.channels[':channel_id'].webhooks.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/webhooks
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostChannelsChannelIdWebhooksMutationKey() {
  return ['/channels/:channel_id/webhooks'] as const
}

/**
 * POST /channels/{channel_id}/webhooks
 */
export function usePostChannelsChannelIdWebhooks(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.channels)[':channel_id']['webhooks']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdWebhooksMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']> },
      ) => parseResponse(client.channels[':channel_id'].webhooks.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /gateway
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetGatewayKey() {
  return ['/gateway'] as const
}

/**
 * GET /gateway
 */
export function useGetGateway(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGatewayKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.gateway.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /gateway/bot
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetGatewayBotKey() {
  return ['/gateway/bot'] as const
}

/**
 * GET /gateway/bot
 */
export function useGetGatewayBot(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGatewayBotKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.gateway.bot.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/templates/{code}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsTemplatesCodeKey(
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
) {
  return [`/guilds/templates/${args.param.code}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsTemplatesCodeKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds.templates[':code'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdMutationKey() {
  return ['/guilds/:guild_id'] as const
}

/**
 * PATCH /guilds/{guild_id}
 */
export function usePatchGuildsGuildId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.guilds)[':guild_id']['$patch']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['$patch']> },
      ) => parseResponse(client.guilds[':guild_id'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/audit-logs
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdAuditLogsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/audit-logs`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdAuditLogsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id']['audit-logs'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/auto-moderation/rules
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdAutoModerationRulesKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/auto-moderation/rules`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdAutoModerationRulesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.guilds[':guild_id']['auto-moderation'].rules.$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/auto-moderation/rules
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostGuildsGuildIdAutoModerationRulesMutationKey() {
  return ['/guilds/:guild_id/auto-moderation/rules'] as const
}

/**
 * POST /guilds/{guild_id}/auto-moderation/rules
 */
export function usePostGuildsGuildIdAutoModerationRules(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdAutoModerationRulesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']
          >
        },
      ) =>
        parseResponse(
          client.guilds[':guild_id']['auto-moderation'].rules.$post(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdAutoModerationRulesRuleIdKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
) {
  return [
    `/guilds/${args.param.guild_id}/auto-moderation/rules/${args.param.rule_id}`,
    args,
  ] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetGuildsGuildIdAutoModerationRulesRuleIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationKey() {
  return ['/guilds/:guild_id/auto-moderation/rules/:rule_id'] as const
}

/**
 * DELETE /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function useDeleteGuildsGuildIdAutoModerationRulesRuleId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationKey() {
  return ['/guilds/:guild_id/auto-moderation/rules/:rule_id'] as const
}

/**
 * PATCH /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function usePatchGuildsGuildIdAutoModerationRulesRuleId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/bans
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdBansKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/bans`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdBansKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].bans.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/bans/{user_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdBansUserIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/bans/${args.param.user_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdBansUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].bans[':user_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /guilds/{guild_id}/bans/{user_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutGuildsGuildIdBansUserIdMutationKey() {
  return ['/guilds/:guild_id/bans/:user_id'] as const
}

/**
 * PUT /guilds/{guild_id}/bans/{user_id}
 */
export function usePutGuildsGuildIdBansUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutGuildsGuildIdBansUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>
        },
      ) => parseResponse(client.guilds[':guild_id'].bans[':user_id'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/bans/{user_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteGuildsGuildIdBansUserIdMutationKey() {
  return ['/guilds/:guild_id/bans/:user_id'] as const
}

/**
 * DELETE /guilds/{guild_id}/bans/{user_id}
 */
export function useDeleteGuildsGuildIdBansUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdBansUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
        },
      ) => parseResponse(client.guilds[':guild_id'].bans[':user_id'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/bulk-ban
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostGuildsGuildIdBulkBanMutationKey() {
  return ['/guilds/:guild_id/bulk-ban'] as const
}

/**
 * POST /guilds/{guild_id}/bulk-ban
 */
export function usePostGuildsGuildIdBulkBan(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdBulkBanMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']> },
      ) => parseResponse(client.guilds[':guild_id']['bulk-ban'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/channels
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdChannelsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/channels`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdChannelsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].channels.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/channels
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostGuildsGuildIdChannelsMutationKey() {
  return ['/guilds/:guild_id/channels'] as const
}

/**
 * POST /guilds/{guild_id}/channels
 */
export function usePostGuildsGuildIdChannels(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['channels']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdChannelsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']> },
      ) => parseResponse(client.guilds[':guild_id'].channels.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/channels
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdChannelsMutationKey() {
  return ['/guilds/:guild_id/channels'] as const
}

/**
 * PATCH /guilds/{guild_id}/channels
 */
export function usePatchGuildsGuildIdChannels(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['channels']['$patch']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdChannelsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']> },
      ) => parseResponse(client.guilds[':guild_id'].channels.$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/emojis
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdEmojisKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/emojis`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdEmojisKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].emojis.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/emojis
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostGuildsGuildIdEmojisMutationKey() {
  return ['/guilds/:guild_id/emojis'] as const
}

/**
 * POST /guilds/{guild_id}/emojis
 */
export function usePostGuildsGuildIdEmojis(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['emojis']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdEmojisMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']> },
      ) => parseResponse(client.guilds[':guild_id'].emojis.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/emojis/{emoji_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdEmojisEmojiIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/emojis/${args.param.emoji_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdEmojisEmojiIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/emojis/{emoji_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteGuildsGuildIdEmojisEmojiIdMutationKey() {
  return ['/guilds/:guild_id/emojis/:emoji_id'] as const
}

/**
 * DELETE /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useDeleteGuildsGuildIdEmojisEmojiId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdEmojisEmojiIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']
          >
        },
      ) =>
        parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/emojis/{emoji_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdEmojisEmojiIdMutationKey() {
  return ['/guilds/:guild_id/emojis/:emoji_id'] as const
}

/**
 * PATCH /guilds/{guild_id}/emojis/{emoji_id}
 */
export function usePatchGuildsGuildIdEmojisEmojiId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdEmojisEmojiIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']
          >
        },
      ) => parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/integrations
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdIntegrationsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/integrations`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdIntegrationsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].integrations.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/integrations/{integration_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationKey() {
  return ['/guilds/:guild_id/integrations/:integration_id'] as const
}

/**
 * DELETE /guilds/{guild_id}/integrations/{integration_id}
 */
export function useDeleteGuildsGuildIdIntegrationsIntegrationId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
          >
        },
      ) =>
        parseResponse(
          client.guilds[':guild_id'].integrations[':integration_id'].$delete(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/invites
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdInvitesKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/invites`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdInvitesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].invites.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/members
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdMembersKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/members`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdMembersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].members.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/members/@me
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdMembersMeMutationKey() {
  return ['/guilds/:guild_id/members/@me'] as const
}

/**
 * PATCH /guilds/{guild_id}/members/@me
 */
export function usePatchGuildsGuildIdMembersMe(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdMembersMeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>
        },
      ) => parseResponse(client.guilds[':guild_id'].members['@me'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/members/search
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdMembersSearchKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/members/search`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdMembersSearchKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].members.search.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/members/{user_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdMembersUserIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/members/${args.param.user_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdMembersUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].members[':user_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /guilds/{guild_id}/members/{user_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutGuildsGuildIdMembersUserIdMutationKey() {
  return ['/guilds/:guild_id/members/:user_id'] as const
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}
 */
export function usePutGuildsGuildIdMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutGuildsGuildIdMembersUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
        },
      ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/members/{user_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteGuildsGuildIdMembersUserIdMutationKey() {
  return ['/guilds/:guild_id/members/:user_id'] as const
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}
 */
export function useDeleteGuildsGuildIdMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdMembersUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']
          >
        },
      ) =>
        parseResponse(client.guilds[':guild_id'].members[':user_id'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/members/{user_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdMembersUserIdMutationKey() {
  return ['/guilds/:guild_id/members/:user_id'] as const
}

/**
 * PATCH /guilds/{guild_id}/members/{user_id}
 */
export function usePatchGuildsGuildIdMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdMembersUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']
          >
        },
      ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationKey() {
  return ['/guilds/:guild_id/members/:user_id/roles/:role_id'] as const
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function usePutGuildsGuildIdMembersUserIdRolesRoleId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
          >
        },
      ) =>
        parseResponse(
          client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$put(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationKey() {
  return ['/guilds/:guild_id/members/:user_id/roles/:role_id'] as const
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdMembersUserIdRolesRoleId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/messages/search
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdMessagesSearchKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/messages/search`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdMessagesSearchKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].messages.search.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/new-member-welcome
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdNewMemberWelcomeKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/new-member-welcome`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdNewMemberWelcomeKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id']['new-member-welcome'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/onboarding
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdOnboardingKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/onboarding`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdOnboardingKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].onboarding.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /guilds/{guild_id}/onboarding
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutGuildsGuildIdOnboardingMutationKey() {
  return ['/guilds/:guild_id/onboarding'] as const
}

/**
 * PUT /guilds/{guild_id}/onboarding
 */
export function usePutGuildsGuildIdOnboarding(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutGuildsGuildIdOnboardingMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']> },
      ) => parseResponse(client.guilds[':guild_id'].onboarding.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/preview
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdPreviewKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/preview`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdPreviewKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].preview.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/prune
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdPruneKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/prune`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdPruneKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].prune.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/prune
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostGuildsGuildIdPruneMutationKey() {
  return ['/guilds/:guild_id/prune'] as const
}

/**
 * POST /guilds/{guild_id}/prune
 */
export function usePostGuildsGuildIdPrune(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['prune']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdPruneMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']> },
      ) => parseResponse(client.guilds[':guild_id'].prune.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/regions
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdRegionsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/regions`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdRegionsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].regions.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/roles
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdRolesKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/roles`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdRolesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].roles.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/roles
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostGuildsGuildIdRolesMutationKey() {
  return ['/guilds/:guild_id/roles'] as const
}

/**
 * POST /guilds/{guild_id}/roles
 */
export function usePostGuildsGuildIdRoles(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdRolesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']> },
      ) => parseResponse(client.guilds[':guild_id'].roles.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/roles
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdRolesMutationKey() {
  return ['/guilds/:guild_id/roles'] as const
}

/**
 * PATCH /guilds/{guild_id}/roles
 */
export function usePatchGuildsGuildIdRoles(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles']['$patch']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdRolesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']> },
      ) => parseResponse(client.guilds[':guild_id'].roles.$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/roles/member-counts
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdRolesMemberCountsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/roles/member-counts`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdRolesMemberCountsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].roles['member-counts'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/roles/{role_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdRolesRoleIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/roles/${args.param.role_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdRolesRoleIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].roles[':role_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/roles/{role_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteGuildsGuildIdRolesRoleIdMutationKey() {
  return ['/guilds/:guild_id/roles/:role_id'] as const
}

/**
 * DELETE /guilds/{guild_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdRolesRoleId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdRolesRoleIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
        },
      ) => parseResponse(client.guilds[':guild_id'].roles[':role_id'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/roles/{role_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdRolesRoleIdMutationKey() {
  return ['/guilds/:guild_id/roles/:role_id'] as const
}

/**
 * PATCH /guilds/{guild_id}/roles/{role_id}
 */
export function usePatchGuildsGuildIdRolesRoleId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdRolesRoleIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
        },
      ) => parseResponse(client.guilds[':guild_id'].roles[':role_id'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/scheduled-events
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdScheduledEventsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/scheduled-events`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdScheduledEventsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id']['scheduled-events'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/scheduled-events
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostGuildsGuildIdScheduledEventsMutationKey() {
  return ['/guilds/:guild_id/scheduled-events'] as const
}

/**
 * POST /guilds/{guild_id}/scheduled-events
 */
export function usePostGuildsGuildIdScheduledEvents(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdScheduledEventsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
        },
      ) => parseResponse(client.guilds[':guild_id']['scheduled-events'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
) {
  return [
    `/guilds/${args.param.guild_id}/scheduled-events/${args.param.guild_scheduled_event_id}`,
    args,
  ] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ??
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey() {
  return ['/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id'] as const
}

/**
 * DELETE /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function useDeleteGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey() {
  return ['/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id'] as const
}

/**
 * PATCH /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function usePatchGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
) {
  return [
    `/guilds/${args.param.guild_id}/scheduled-events/${args.param.guild_scheduled_event_id}/users`,
    args,
  ] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ??
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/soundboard-sounds
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdSoundboardSoundsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/soundboard-sounds`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdSoundboardSoundsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/soundboard-sounds
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostGuildsGuildIdSoundboardSoundsMutationKey() {
  return ['/guilds/:guild_id/soundboard-sounds'] as const
}

/**
 * POST /guilds/{guild_id}/soundboard-sounds
 */
export function usePostGuildsGuildIdSoundboardSounds(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdSoundboardSoundsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
        },
      ) => parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdSoundboardSoundsSoundIdKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
) {
  return [`/guilds/${args.param.guild_id}/soundboard-sounds/${args.param.sound_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetGuildsGuildIdSoundboardSoundsSoundIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/soundboard-sounds/{sound_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationKey() {
  return ['/guilds/:guild_id/soundboard-sounds/:sound_id'] as const
}

/**
 * DELETE /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function useDeleteGuildsGuildIdSoundboardSoundsSoundId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
          >
        },
      ) =>
        parseResponse(
          client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$delete(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/soundboard-sounds/{sound_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationKey() {
  return ['/guilds/:guild_id/soundboard-sounds/:sound_id'] as const
}

/**
 * PATCH /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function usePatchGuildsGuildIdSoundboardSoundsSoundId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
          >
        },
      ) =>
        parseResponse(
          client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$patch(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/stickers
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdStickersKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/stickers`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdStickersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].stickers.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/stickers
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostGuildsGuildIdStickersMutationKey() {
  return ['/guilds/:guild_id/stickers'] as const
}

/**
 * POST /guilds/{guild_id}/stickers
 */
export function usePostGuildsGuildIdStickers(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['stickers']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdStickersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']> },
      ) => parseResponse(client.guilds[':guild_id'].stickers.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/stickers/{sticker_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdStickersStickerIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/stickers/${args.param.sticker_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdStickersStickerIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].stickers[':sticker_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/stickers/{sticker_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteGuildsGuildIdStickersStickerIdMutationKey() {
  return ['/guilds/:guild_id/stickers/:sticker_id'] as const
}

/**
 * DELETE /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useDeleteGuildsGuildIdStickersStickerId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdStickersStickerIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']
          >
        },
      ) =>
        parseResponse(
          client.guilds[':guild_id'].stickers[':sticker_id'].$delete(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/stickers/{sticker_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdStickersStickerIdMutationKey() {
  return ['/guilds/:guild_id/stickers/:sticker_id'] as const
}

/**
 * PATCH /guilds/{guild_id}/stickers/{sticker_id}
 */
export function usePatchGuildsGuildIdStickersStickerId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdStickersStickerIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']
          >
        },
      ) =>
        parseResponse(
          client.guilds[':guild_id'].stickers[':sticker_id'].$patch(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/templates
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdTemplatesKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/templates`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdTemplatesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].templates.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/templates
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostGuildsGuildIdTemplatesMutationKey() {
  return ['/guilds/:guild_id/templates'] as const
}

/**
 * POST /guilds/{guild_id}/templates
 */
export function usePostGuildsGuildIdTemplates(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdTemplatesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']> },
      ) => parseResponse(client.guilds[':guild_id'].templates.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /guilds/{guild_id}/templates/{code}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutGuildsGuildIdTemplatesCodeMutationKey() {
  return ['/guilds/:guild_id/templates/:code'] as const
}

/**
 * PUT /guilds/{guild_id}/templates/{code}
 */
export function usePutGuildsGuildIdTemplatesCode(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutGuildsGuildIdTemplatesCodeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
        },
      ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/templates/{code}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteGuildsGuildIdTemplatesCodeMutationKey() {
  return ['/guilds/:guild_id/templates/:code'] as const
}

/**
 * DELETE /guilds/{guild_id}/templates/{code}
 */
export function useDeleteGuildsGuildIdTemplatesCode(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdTemplatesCodeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.guilds)[':guild_id']['templates'][':code']['$delete']
          >
        },
      ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/templates/{code}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdTemplatesCodeMutationKey() {
  return ['/guilds/:guild_id/templates/:code'] as const
}

/**
 * PATCH /guilds/{guild_id}/templates/{code}
 */
export function usePatchGuildsGuildIdTemplatesCode(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdTemplatesCodeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
        },
      ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/threads/active
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdThreadsActiveKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/threads/active`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdThreadsActiveKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id'].threads.active.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/vanity-url
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdVanityUrlKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/vanity-url`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdVanityUrlKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id']['vanity-url'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/voice-states/@me
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdVoiceStatesMeKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/voice-states/@me`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdVoiceStatesMeKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/voice-states/@me
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdVoiceStatesMeMutationKey() {
  return ['/guilds/:guild_id/voice-states/@me'] as const
}

/**
 * PATCH /guilds/{guild_id}/voice-states/@me
 */
export function usePatchGuildsGuildIdVoiceStatesMe(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdVoiceStatesMeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']
          >
        },
      ) =>
        parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/voice-states/{user_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdVoiceStatesUserIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/voice-states/${args.param.user_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdVoiceStatesUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.guilds[':guild_id']['voice-states'][':user_id'].$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/voice-states/{user_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdVoiceStatesUserIdMutationKey() {
  return ['/guilds/:guild_id/voice-states/:user_id'] as const
}

/**
 * PATCH /guilds/{guild_id}/voice-states/{user_id}
 */
export function usePatchGuildsGuildIdVoiceStatesUserId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdVoiceStatesUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']
          >
        },
      ) =>
        parseResponse(
          client.guilds[':guild_id']['voice-states'][':user_id'].$patch(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/webhooks
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdWebhooksKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/webhooks`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdWebhooksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].webhooks.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/welcome-screen
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdWelcomeScreenKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/welcome-screen`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdWelcomeScreenKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id']['welcome-screen'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/welcome-screen
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdWelcomeScreenMutationKey() {
  return ['/guilds/:guild_id/welcome-screen'] as const
}

/**
 * PATCH /guilds/{guild_id}/welcome-screen
 */
export function usePatchGuildsGuildIdWelcomeScreen(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdWelcomeScreenMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>
        },
      ) => parseResponse(client.guilds[':guild_id']['welcome-screen'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/widget
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdWidgetKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/widget`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdWidgetKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id'].widget.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/widget
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchGuildsGuildIdWidgetMutationKey() {
  return ['/guilds/:guild_id/widget'] as const
}

/**
 * PATCH /guilds/{guild_id}/widget
 */
export function usePatchGuildsGuildIdWidget(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['widget']['$patch']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdWidgetMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']> },
      ) => parseResponse(client.guilds[':guild_id'].widget.$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/widget.json
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdWidgetJsonKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/widget.json`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdWidgetJsonKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.guilds[':guild_id']['widget.json'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /guilds/{guild_id}/widget.png
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetGuildsGuildIdWidgetPngKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
) {
  return [`/guilds/${args.param.guild_id}/widget.png`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetGuildsGuildIdWidgetPngKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.guilds[':guild_id']['widget.png'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /interactions/{interaction_id}/{interaction_token}/callback
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostInteractionsInteractionIdInteractionTokenCallbackMutationKey() {
  return ['/interactions/:interaction_id/:interaction_token/callback'] as const
}

/**
 * POST /interactions/{interaction_id}/{interaction_token}/callback
 */
export function usePostInteractionsInteractionIdInteractionTokenCallback(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostInteractionsInteractionIdInteractionTokenCallbackMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /invites/{code}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetInvitesCodeKey(
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
) {
  return [`/invites/${args.param.code}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetInvitesCodeKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.invites[':code'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /invites/{code}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteInvitesCodeMutationKey() {
  return ['/invites/:code'] as const
}

/**
 * DELETE /invites/{code}
 */
export function useDeleteInvitesCode(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.invites)[':code']['$delete']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.invites)[':code']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteInvitesCodeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.invites)[':code']['$delete']> },
      ) => parseResponse(client.invites[':code'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /lobbies
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutLobbiesMutationKey() {
  return ['/lobbies'] as const
}

/**
 * PUT /lobbies
 */
export function usePutLobbies(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.lobbies.$put>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.lobbies.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutLobbiesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.lobbies.$put> }) =>
        parseResponse(client.lobbies.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /lobbies
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostLobbiesMutationKey() {
  return ['/lobbies'] as const
}

/**
 * POST /lobbies
 */
export function usePostLobbies(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.lobbies.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.lobbies.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLobbiesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.lobbies.$post> }) =>
        parseResponse(client.lobbies.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /lobbies/{lobby_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetLobbiesLobbyIdKey(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
) {
  return [`/lobbies/${args.param.lobby_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetLobbiesLobbyIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.lobbies[':lobby_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /lobbies/{lobby_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchLobbiesLobbyIdMutationKey() {
  return ['/lobbies/:lobby_id'] as const
}

/**
 * PATCH /lobbies/{lobby_id}
 */
export function usePatchLobbiesLobbyId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['$patch']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchLobbiesLobbyIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']> },
      ) => parseResponse(client.lobbies[':lobby_id'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /lobbies/{lobby_id}/channel-linking
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchLobbiesLobbyIdChannelLinkingMutationKey() {
  return ['/lobbies/:lobby_id/channel-linking'] as const
}

/**
 * PATCH /lobbies/{lobby_id}/channel-linking
 */
export function usePatchLobbiesLobbyIdChannelLinking(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchLobbiesLobbyIdChannelLinkingMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
        },
      ) => parseResponse(client.lobbies[':lobby_id']['channel-linking'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /lobbies/{lobby_id}/members/@me
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteLobbiesLobbyIdMembersMeMutationKey() {
  return ['/lobbies/:lobby_id/members/@me'] as const
}

/**
 * DELETE /lobbies/{lobby_id}/members/@me
 */
export function useDeleteLobbiesLobbyIdMembersMe(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteLobbiesLobbyIdMembersMeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
        },
      ) => parseResponse(client.lobbies[':lobby_id'].members['@me'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /lobbies/{lobby_id}/members/@me/invites
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostLobbiesLobbyIdMembersMeInvitesMutationKey() {
  return ['/lobbies/:lobby_id/members/@me/invites'] as const
}

/**
 * POST /lobbies/{lobby_id}/members/@me/invites
 */
export function usePostLobbiesLobbyIdMembersMeInvites(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLobbiesLobbyIdMembersMeInvitesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']
          >
        },
      ) =>
        parseResponse(client.lobbies[':lobby_id'].members['@me'].invites.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /lobbies/{lobby_id}/members/bulk
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostLobbiesLobbyIdMembersBulkMutationKey() {
  return ['/lobbies/:lobby_id/members/bulk'] as const
}

/**
 * POST /lobbies/{lobby_id}/members/bulk
 */
export function usePostLobbiesLobbyIdMembersBulk(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLobbiesLobbyIdMembersBulkMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
        },
      ) => parseResponse(client.lobbies[':lobby_id'].members.bulk.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /lobbies/{lobby_id}/members/{user_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutLobbiesLobbyIdMembersUserIdMutationKey() {
  return ['/lobbies/:lobby_id/members/:user_id'] as const
}

/**
 * PUT /lobbies/{lobby_id}/members/{user_id}
 */
export function usePutLobbiesLobbyIdMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutLobbiesLobbyIdMembersUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
        },
      ) => parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /lobbies/{lobby_id}/members/{user_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteLobbiesLobbyIdMembersUserIdMutationKey() {
  return ['/lobbies/:lobby_id/members/:user_id'] as const
}

/**
 * DELETE /lobbies/{lobby_id}/members/{user_id}
 */
export function useDeleteLobbiesLobbyIdMembersUserId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteLobbiesLobbyIdMembersUserIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']
          >
        },
      ) =>
        parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /lobbies/{lobby_id}/members/{user_id}/invites
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostLobbiesLobbyIdMembersUserIdInvitesMutationKey() {
  return ['/lobbies/:lobby_id/members/:user_id/invites'] as const
}

/**
 * POST /lobbies/{lobby_id}/members/{user_id}/invites
 */
export function usePostLobbiesLobbyIdMembersUserIdInvites(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLobbiesLobbyIdMembersUserIdInvitesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
          >
        },
      ) =>
        parseResponse(
          client.lobbies[':lobby_id'].members[':user_id'].invites.$post(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /lobbies/{lobby_id}/messages
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetLobbiesLobbyIdMessagesKey(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
) {
  return [`/lobbies/${args.param.lobby_id}/messages`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetLobbiesLobbyIdMessagesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.lobbies[':lobby_id'].messages.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /lobbies/{lobby_id}/messages
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostLobbiesLobbyIdMessagesMutationKey() {
  return ['/lobbies/:lobby_id/messages'] as const
}

/**
 * POST /lobbies/{lobby_id}/messages
 */
export function usePostLobbiesLobbyIdMessages(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLobbiesLobbyIdMessagesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']> },
      ) => parseResponse(client.lobbies[':lobby_id'].messages.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth2/@me
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetOauth2MeKey() {
  return ['/oauth2/@me'] as const
}

/**
 * GET /oauth2/@me
 */
export function useGetOauth2Me(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetOauth2MeKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth2['@me'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth2/applications/@me
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetOauth2ApplicationsMeKey() {
  return ['/oauth2/applications/@me'] as const
}

/**
 * GET /oauth2/applications/@me
 */
export function useGetOauth2ApplicationsMe(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetOauth2ApplicationsMeKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth2.applications['@me'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth2/keys
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetOauth2KeysKey() {
  return ['/oauth2/keys'] as const
}

/**
 * GET /oauth2/keys
 */
export function useGetOauth2Keys(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetOauth2KeysKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth2.keys.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /oauth2/userinfo
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetOauth2UserinfoKey() {
  return ['/oauth2/userinfo'] as const
}

/**
 * GET /oauth2/userinfo
 */
export function useGetOauth2Userinfo(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetOauth2UserinfoKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.oauth2.userinfo.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /partner-sdk/provisional-accounts/unmerge
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostPartnerSdkProvisionalAccountsUnmergeMutationKey() {
  return ['/partner-sdk/provisional-accounts/unmerge'] as const
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge
 */
export function usePostPartnerSdkProvisionalAccountsUnmerge(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPartnerSdkProvisionalAccountsUnmergeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']
          >
        },
      ) =>
        parseResponse(
          client['partner-sdk']['provisional-accounts'].unmerge.$post(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /partner-sdk/provisional-accounts/unmerge/bot
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostPartnerSdkProvisionalAccountsUnmergeBotMutationKey() {
  return ['/partner-sdk/provisional-accounts/unmerge/bot'] as const
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge/bot
 */
export function usePostPartnerSdkProvisionalAccountsUnmergeBot(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPartnerSdkProvisionalAccountsUnmergeBotMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
          >
        },
      ) =>
        parseResponse(
          client['partner-sdk']['provisional-accounts'].unmerge.bot.$post(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /partner-sdk/token
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostPartnerSdkTokenMutationKey() {
  return ['/partner-sdk/token'] as const
}

/**
 * POST /partner-sdk/token
 */
export function usePostPartnerSdkToken(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['partner-sdk']['token']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['partner-sdk']['token']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPartnerSdkTokenMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['partner-sdk']['token']['$post']> },
      ) => parseResponse(client['partner-sdk'].token.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /partner-sdk/token/bot
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostPartnerSdkTokenBotMutationKey() {
  return ['/partner-sdk/token/bot'] as const
}

/**
 * POST /partner-sdk/token/bot
 */
export function usePostPartnerSdkTokenBot(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['partner-sdk']['token']['bot']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPartnerSdkTokenBotMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']> },
      ) => parseResponse(client['partner-sdk'].token.bot.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /soundboard-default-sounds
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetSoundboardDefaultSoundsKey() {
  return ['/soundboard-default-sounds'] as const
}

/**
 * GET /soundboard-default-sounds
 */
export function useGetSoundboardDefaultSounds(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSoundboardDefaultSoundsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['soundboard-default-sounds'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /stage-instances
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostStageInstancesMutationKey() {
  return ['/stage-instances'] as const
}

/**
 * POST /stage-instances
 */
export function usePostStageInstances(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['stage-instances']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['stage-instances']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostStageInstancesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['stage-instances']['$post']> },
      ) => parseResponse(client['stage-instances'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /stage-instances/{channel_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetStageInstancesChannelIdKey(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
) {
  return [`/stage-instances/${args.param.channel_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetStageInstancesChannelIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['stage-instances'][':channel_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /stage-instances/{channel_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteStageInstancesChannelIdMutationKey() {
  return ['/stage-instances/:channel_id'] as const
}

/**
 * DELETE /stage-instances/{channel_id}
 */
export function useDeleteStageInstancesChannelId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['stage-instances'][':channel_id']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteStageInstancesChannelIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']> },
      ) => parseResponse(client['stage-instances'][':channel_id'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /stage-instances/{channel_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchStageInstancesChannelIdMutationKey() {
  return ['/stage-instances/:channel_id'] as const
}

/**
 * PATCH /stage-instances/{channel_id}
 */
export function usePatchStageInstancesChannelId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['stage-instances'][':channel_id']['$patch']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchStageInstancesChannelIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']> },
      ) => parseResponse(client['stage-instances'][':channel_id'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sticker-packs
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetStickerPacksKey() {
  return ['/sticker-packs'] as const
}

/**
 * GET /sticker-packs
 */
export function useGetStickerPacks(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetStickerPacksKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['sticker-packs'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sticker-packs/{pack_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetStickerPacksPackIdKey(
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
) {
  return [`/sticker-packs/${args.param.pack_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetStickerPacksPackIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['sticker-packs'][':pack_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /stickers/{sticker_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetStickersStickerIdKey(
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
) {
  return [`/stickers/${args.param.sticker_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetStickersStickerIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.stickers[':sticker_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/@me
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetUsersMeKey() {
  return ['/users/@me'] as const
}

/**
 * GET /users/@me
 */
export function useGetUsersMe(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersMeKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users['@me'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /users/@me
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchUsersMeMutationKey() {
  return ['/users/@me'] as const
}

/**
 * PATCH /users/@me
 */
export function usePatchUsersMe(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)['@me']['$patch']>>>>
    >,
    Error,
    Key,
    InferRequestType<(typeof client.users)['@me']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchUsersMeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client.users)['@me']['$patch']> }) =>
        parseResponse(client.users['@me'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/@me/applications/{application_id}/entitlements
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetUsersMeApplicationsApplicationIdEntitlementsKey(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
) {
  return [`/users/@me/applications/${args.param.application_id}/entitlements`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetUsersMeApplicationsApplicationIdEntitlementsKey(args) : null)
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/@me/applications/{application_id}/role-connection
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetUsersMeApplicationsApplicationIdRoleConnectionKey(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
) {
  return [`/users/@me/applications/${args.param.application_id}/role-connection`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetUsersMeApplicationsApplicationIdRoleConnectionKey(args) : null)
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /users/@me/applications/{application_id}/role-connection
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutUsersMeApplicationsApplicationIdRoleConnectionMutationKey() {
  return ['/users/@me/applications/:application_id/role-connection'] as const
}

/**
 * PUT /users/@me/applications/{application_id}/role-connection
 */
export function usePutUsersMeApplicationsApplicationIdRoleConnection(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutUsersMeApplicationsApplicationIdRoleConnectionMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /users/@me/applications/{application_id}/role-connection
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationKey() {
  return ['/users/@me/applications/:application_id/role-connection'] as const
}

/**
 * DELETE /users/@me/applications/{application_id}/role-connection
 */
export function useDeleteUsersMeApplicationsApplicationIdRoleConnection(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /users/@me/channels
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostUsersMeChannelsMutationKey() {
  return ['/users/@me/channels'] as const
}

/**
 * POST /users/@me/channels
 */
export function usePostUsersMeChannels(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.users)['@me']['channels']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.users)['@me']['channels']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUsersMeChannelsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.users)['@me']['channels']['$post']> },
      ) => parseResponse(client.users['@me'].channels.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/@me/connections
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetUsersMeConnectionsKey() {
  return ['/users/@me/connections'] as const
}

/**
 * GET /users/@me/connections
 */
export function useGetUsersMeConnections(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersMeConnectionsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users['@me'].connections.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/@me/guilds
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetUsersMeGuildsKey(
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
) {
  return ['/users/@me/guilds', args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersMeGuildsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users['@me'].guilds.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /users/@me/guilds/{guild_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteUsersMeGuildsGuildIdMutationKey() {
  return ['/users/@me/guilds/:guild_id'] as const
}

/**
 * DELETE /users/@me/guilds/{guild_id}
 */
export function useDeleteUsersMeGuildsGuildId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteUsersMeGuildsGuildIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>
        },
      ) => parseResponse(client.users['@me'].guilds[':guild_id'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/@me/guilds/{guild_id}/member
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetUsersMeGuildsGuildIdMemberKey(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
) {
  return [`/users/@me/guilds/${args.param.guild_id}/member`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersMeGuildsGuildIdMemberKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.users['@me'].guilds[':guild_id'].member.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{user_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetUsersUserIdKey(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return [`/users/${args.param.user_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':user_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /voice/regions
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetVoiceRegionsKey() {
  return ['/voice/regions'] as const
}

/**
 * GET /voice/regions
 */
export function useGetVoiceRegions(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetVoiceRegionsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.voice.regions.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webhooks/{webhook_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetWebhooksWebhookIdKey(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
) {
  return [`/webhooks/${args.param.webhook_id}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetWebhooksWebhookIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.webhooks[':webhook_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /webhooks/{webhook_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteWebhooksWebhookIdMutationKey() {
  return ['/webhooks/:webhook_id'] as const
}

/**
 * DELETE /webhooks/{webhook_id}
 */
export function useDeleteWebhooksWebhookId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.webhooks)[':webhook_id']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteWebhooksWebhookIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']> },
      ) => parseResponse(client.webhooks[':webhook_id'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /webhooks/{webhook_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchWebhooksWebhookIdMutationKey() {
  return ['/webhooks/:webhook_id'] as const
}

/**
 * PATCH /webhooks/{webhook_id}
 */
export function usePatchWebhooksWebhookId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.webhooks)[':webhook_id']['$patch']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchWebhooksWebhookIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']> },
      ) => parseResponse(client.webhooks[':webhook_id'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webhooks/{webhook_id}/{webhook_token}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetWebhooksWebhookIdWebhookTokenKey(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
) {
  return [`/webhooks/${args.param.webhook_id}/${args.param.webhook_token}`, args] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetWebhooksWebhookIdWebhookTokenKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webhooks/{webhook_id}/{webhook_token}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostWebhooksWebhookIdWebhookTokenMutationKey() {
  return ['/webhooks/:webhook_id/:webhook_token'] as const
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}
 */
export function usePostWebhooksWebhookIdWebhookToken(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebhooksWebhookIdWebhookTokenMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
        },
      ) =>
        parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /webhooks/{webhook_id}/{webhook_token}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteWebhooksWebhookIdWebhookTokenMutationKey() {
  return ['/webhooks/:webhook_id/:webhook_token'] as const
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}
 */
export function useDeleteWebhooksWebhookIdWebhookToken(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteWebhooksWebhookIdWebhookTokenMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']
          >
        },
      ) =>
        parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /webhooks/{webhook_id}/{webhook_token}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchWebhooksWebhookIdWebhookTokenMutationKey() {
  return ['/webhooks/:webhook_id/:webhook_token'] as const
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}
 */
export function usePatchWebhooksWebhookIdWebhookToken(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchWebhooksWebhookIdWebhookTokenMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
        },
      ) =>
        parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webhooks/{webhook_id}/{webhook_token}/github
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostWebhooksWebhookIdWebhookTokenGithubMutationKey() {
  return ['/webhooks/:webhook_id/:webhook_token/github'] as const
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/github
 */
export function usePostWebhooksWebhookIdWebhookTokenGithub(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebhooksWebhookIdWebhookTokenGithubMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
          >
        },
      ) =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].github.$post(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesOriginalKey(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
) {
  return [
    `/webhooks/${args.param.webhook_id}/${args.param.webhook_token}/messages/@original`,
    args,
  ] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetWebhooksWebhookIdWebhookTokenMessagesOriginalKey(args) : null)
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /webhooks/{webhook_id}/{webhook_token}/messages/@original
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey() {
  return ['/webhooks/:webhook_id/:webhook_token/messages/@original'] as const
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /webhooks/{webhook_id}/{webhook_token}/messages/@original
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey() {
  return ['/webhooks/:webhook_id/:webhook_token/messages/@original'] as const
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function usePatchWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdKey(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
) {
  return [
    `/webhooks/${args.param.webhook_id}/${args.param.webhook_token}/messages/${args.param.message_id}`,
    args,
  ] as const
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
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdKey(args) : null)
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
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey() {
  return ['/webhooks/:webhook_id/:webhook_token/messages/:message_id'] as const
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey() {
  return ['/webhooks/:webhook_id/:webhook_token/messages/:message_id'] as const
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function usePatchWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
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
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webhooks/{webhook_id}/{webhook_token}/slack
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostWebhooksWebhookIdWebhookTokenSlackMutationKey() {
  return ['/webhooks/:webhook_id/:webhook_token/slack'] as const
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/slack
 */
export function usePostWebhooksWebhookIdWebhookTokenSlack(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebhooksWebhookIdWebhookTokenSlackMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
          >
        },
      ) =>
        parseResponse(
          client.webhooks[':webhook_id'][':webhook_token'].slack.$post(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}
