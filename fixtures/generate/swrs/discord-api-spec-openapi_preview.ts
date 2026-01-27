import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsMeKey() {
  return client.applications['@me'].$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPatchApplicationsMeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.applications)['@me']['$patch']> },
      ) => parseResponse(client.applications['@me'].$patch(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /applications/@me
 * Uses $url() for type-safe key generation
 */
export function getPatchApplicationsMeMutationKey() {
  return `PATCH ${client.applications['@me'].$url().pathname}`
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
 * Generates SWR cache key for GET /applications/{application_id}
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
) {
  return client.applications[':application_id'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPatchApplicationsApplicationIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /applications/{application_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchApplicationsApplicationIdMutationKey() {
  return `PATCH ${client.applications[':application_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /applications/{application_id}/activity-instances/{instance_id}
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdActivityInstancesInstanceIdKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
) {
  return client.applications[':application_id']['activity-instances'][':instance_id'].$url(args)
    .pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostApplicationsApplicationIdAttachmentMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /applications/{application_id}/attachment
 * Uses $url() for type-safe key generation
 */
export function getPostApplicationsApplicationIdAttachmentMutationKey() {
  return `POST ${client.applications[':application_id'].attachment.$url().pathname}`
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
 * Generates SWR cache key for GET /applications/{application_id}/commands
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdCommandsKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
) {
  return client.applications[':application_id'].commands.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutApplicationsApplicationIdCommandsMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /applications/{application_id}/commands
 * Uses $url() for type-safe key generation
 */
export function getPutApplicationsApplicationIdCommandsMutationKey() {
  return `PUT ${client.applications[':application_id'].commands.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostApplicationsApplicationIdCommandsMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /applications/{application_id}/commands
 * Uses $url() for type-safe key generation
 */
export function getPostApplicationsApplicationIdCommandsMutationKey() {
  return `POST ${client.applications[':application_id'].commands.$url().pathname}`
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
 * Generates SWR cache key for GET /applications/{application_id}/commands/{command_id}
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdCommandsCommandIdKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
) {
  return client.applications[':application_id'].commands[':command_id'].$url(args).pathname
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
  const swrKey =
    mutationOptions?.swrKey ?? getDeleteApplicationsApplicationIdCommandsCommandIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /applications/{application_id}/commands/{command_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteApplicationsApplicationIdCommandsCommandIdMutationKey() {
  return `DELETE ${client.applications[':application_id'].commands[':command_id'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getPatchApplicationsApplicationIdCommandsCommandIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /applications/{application_id}/commands/{command_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchApplicationsApplicationIdCommandsCommandIdMutationKey() {
  return `PATCH ${client.applications[':application_id'].commands[':command_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /applications/{application_id}/emojis
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdEmojisKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
) {
  return client.applications[':application_id'].emojis.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostApplicationsApplicationIdEmojisMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /applications/{application_id}/emojis
 * Uses $url() for type-safe key generation
 */
export function getPostApplicationsApplicationIdEmojisMutationKey() {
  return `POST ${client.applications[':application_id'].emojis.$url().pathname}`
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
 * Generates SWR cache key for GET /applications/{application_id}/emojis/{emoji_id}
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdEmojisEmojiIdKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
) {
  return client.applications[':application_id'].emojis[':emoji_id'].$url(args).pathname
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
  const swrKey =
    mutationOptions?.swrKey ?? getDeleteApplicationsApplicationIdEmojisEmojiIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /applications/{application_id}/emojis/{emoji_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteApplicationsApplicationIdEmojisEmojiIdMutationKey() {
  return `DELETE ${client.applications[':application_id'].emojis[':emoji_id'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getPatchApplicationsApplicationIdEmojisEmojiIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /applications/{application_id}/emojis/{emoji_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchApplicationsApplicationIdEmojisEmojiIdMutationKey() {
  return `PATCH ${client.applications[':application_id'].emojis[':emoji_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /applications/{application_id}/entitlements
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdEntitlementsKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
) {
  return client.applications[':application_id'].entitlements.$url(args).pathname
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
  const swrKey =
    mutationOptions?.swrKey ?? getPostApplicationsApplicationIdEntitlementsMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /applications/{application_id}/entitlements
 * Uses $url() for type-safe key generation
 */
export function getPostApplicationsApplicationIdEntitlementsMutationKey() {
  return `POST ${client.applications[':application_id'].entitlements.$url().pathname}`
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
 * Generates SWR cache key for GET /applications/{application_id}/entitlements/{entitlement_id}
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdEntitlementsEntitlementIdKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
) {
  return client.applications[':application_id'].entitlements[':entitlement_id'].$url(args).pathname
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
  const swrKey =
    mutationOptions?.swrKey ??
    getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /applications/{application_id}/entitlements/{entitlement_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationKey() {
  return `DELETE ${client.applications[':application_id'].entitlements[':entitlement_id'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ??
    getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /applications/{application_id}/entitlements/{entitlement_id}/consume
 * Uses $url() for type-safe key generation
 */
export function getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationKey() {
  return `POST ${client.applications[':application_id'].entitlements[':entitlement_id'].consume.$url().pathname}`
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
 * Generates SWR cache key for GET /applications/{application_id}/guilds/{guild_id}/commands
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
) {
  return client.applications[':application_id'].guilds[':guild_id'].commands.$url(args).pathname
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
  const swrKey =
    mutationOptions?.swrKey ?? getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /applications/{application_id}/guilds/{guild_id}/commands
 * Uses $url() for type-safe key generation
 */
export function getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationKey() {
  return `PUT ${client.applications[':application_id'].guilds[':guild_id'].commands.$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /applications/{application_id}/guilds/{guild_id}/commands
 * Uses $url() for type-safe key generation
 */
export function getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationKey() {
  return `POST ${client.applications[':application_id'].guilds[':guild_id'].commands.$url().pathname}`
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
 * Generates SWR cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
) {
  return client.applications[':application_id'].guilds[':guild_id'].commands.permissions.$url(args)
    .pathname
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
 * Generates SWR cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
) {
  return client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$url(
    args,
  ).pathname
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
  const swrKey =
    mutationOptions?.swrKey ??
    getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey() {
  return `DELETE ${client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ??
    getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey() {
  return `PATCH ${client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
  >,
) {
  return client.applications[':application_id'].guilds[':guild_id'].commands[
    ':command_id'
  ].permissions.$url(args).pathname
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
  const swrKey =
    mutationOptions?.swrKey ??
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 * Uses $url() for type-safe key generation
 */
export function getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsMutationKey() {
  return `PUT ${client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].permissions.$url().pathname}`
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
 * Generates SWR cache key for GET /applications/{application_id}/role-connections/metadata
 * Uses $url() for type-safe key generation
 */
export function getGetApplicationsApplicationIdRoleConnectionsMetadataKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
) {
  return client.applications[':application_id']['role-connections'].metadata.$url(args).pathname
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
  const swrKey =
    mutationOptions?.swrKey ?? getPutApplicationsApplicationIdRoleConnectionsMetadataMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /applications/{application_id}/role-connections/metadata
 * Uses $url() for type-safe key generation
 */
export function getPutApplicationsApplicationIdRoleConnectionsMetadataMutationKey() {
  return `PUT ${client.applications[':application_id']['role-connections'].metadata.$url().pathname}`
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
 * Generates SWR cache key for GET /channels/{channel_id}
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
) {
  return client.channels[':channel_id'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteChannelsChannelIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['$delete']> },
      ) => parseResponse(client.channels[':channel_id'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteChannelsChannelIdMutationKey() {
  return `DELETE ${client.channels[':channel_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchChannelsChannelIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.channels)[':channel_id']['$patch']> },
      ) => parseResponse(client.channels[':channel_id'].$patch(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /channels/{channel_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchChannelsChannelIdMutationKey() {
  return `PATCH ${client.channels[':channel_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostChannelsChannelIdFollowersMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/followers
 * Uses $url() for type-safe key generation
 */
export function getPostChannelsChannelIdFollowersMutationKey() {
  return `POST ${client.channels[':channel_id'].followers.$url().pathname}`
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
 * Generates SWR cache key for GET /channels/{channel_id}/invites
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdInvitesKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
) {
  return client.channels[':channel_id'].invites.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostChannelsChannelIdInvitesMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/invites
 * Uses $url() for type-safe key generation
 */
export function getPostChannelsChannelIdInvitesMutationKey() {
  return `POST ${client.channels[':channel_id'].invites.$url().pathname}`
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
 * Generates SWR cache key for GET /channels/{channel_id}/messages
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdMessagesKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
) {
  return client.channels[':channel_id'].messages.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostChannelsChannelIdMessagesMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/messages
 * Uses $url() for type-safe key generation
 */
export function getPostChannelsChannelIdMessagesMutationKey() {
  return `POST ${client.channels[':channel_id'].messages.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostChannelsChannelIdMessagesBulkDeleteMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/messages/bulk-delete
 * Uses $url() for type-safe key generation
 */
export function getPostChannelsChannelIdMessagesBulkDeleteMutationKey() {
  return `POST ${client.channels[':channel_id'].messages['bulk-delete'].$url().pathname}`
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
 * Generates SWR cache key for GET /channels/{channel_id}/messages/pins
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdMessagesPinsKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
) {
  return client.channels[':channel_id'].messages.pins.$url(args).pathname
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
  const swrKey =
    mutationOptions?.swrKey ?? getPutChannelsChannelIdMessagesPinsMessageIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/{channel_id}/messages/pins/{message_id}
 * Uses $url() for type-safe key generation
 */
export function getPutChannelsChannelIdMessagesPinsMessageIdMutationKey() {
  return `PUT ${client.channels[':channel_id'].messages.pins[':message_id'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getDeleteChannelsChannelIdMessagesPinsMessageIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/messages/pins/{message_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteChannelsChannelIdMessagesPinsMessageIdMutationKey() {
  return `DELETE ${client.channels[':channel_id'].messages.pins[':message_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /channels/{channel_id}/messages/{message_id}
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdMessagesMessageIdKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
) {
  return client.channels[':channel_id'].messages[':message_id'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteChannelsChannelIdMessagesMessageIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/messages/{message_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteChannelsChannelIdMessagesMessageIdMutationKey() {
  return `DELETE ${client.channels[':channel_id'].messages[':message_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchChannelsChannelIdMessagesMessageIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /channels/{channel_id}/messages/{message_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchChannelsChannelIdMessagesMessageIdMutationKey() {
  return `PATCH ${client.channels[':channel_id'].messages[':message_id'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getPostChannelsChannelIdMessagesMessageIdCrosspostMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/messages/{message_id}/crosspost
 * Uses $url() for type-safe key generation
 */
export function getPostChannelsChannelIdMessagesMessageIdCrosspostMutationKey() {
  return `POST ${client.channels[':channel_id'].messages[':message_id'].crosspost.$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/messages/{message_id}/reactions
 * Uses $url() for type-safe key generation
 */
export function getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationKey() {
  return `DELETE ${client.channels[':channel_id'].messages[':message_id'].reactions.$url().pathname}`
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
 * Generates SWR cache key for GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
) {
  return client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$url(args)
    .pathname
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
  const swrKey =
    mutationOptions?.swrKey ??
    getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 * Uses $url() for type-safe key generation
 */
export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationKey() {
  return `DELETE ${client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ??
    getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 * Uses $url() for type-safe key generation
 */
export function getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey() {
  return `PUT ${client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name']['@me'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ??
    getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 * Uses $url() for type-safe key generation
 */
export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey() {
  return `DELETE ${client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name']['@me'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ??
    getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationKey() {
  return `DELETE ${client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'][':user_id'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getPostChannelsChannelIdMessagesMessageIdThreadsMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/messages/{message_id}/threads
 * Uses $url() for type-safe key generation
 */
export function getPostChannelsChannelIdMessagesMessageIdThreadsMutationKey() {
  return `POST ${client.channels[':channel_id'].messages[':message_id'].threads.$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getPutChannelsChannelIdPermissionsOverwriteIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/{channel_id}/permissions/{overwrite_id}
 * Uses $url() for type-safe key generation
 */
export function getPutChannelsChannelIdPermissionsOverwriteIdMutationKey() {
  return `PUT ${client.channels[':channel_id'].permissions[':overwrite_id'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getDeleteChannelsChannelIdPermissionsOverwriteIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/permissions/{overwrite_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteChannelsChannelIdPermissionsOverwriteIdMutationKey() {
  return `DELETE ${client.channels[':channel_id'].permissions[':overwrite_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /channels/{channel_id}/pins
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdPinsKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
) {
  return client.channels[':channel_id'].pins.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutChannelsChannelIdPinsMessageIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/{channel_id}/pins/{message_id}
 * Uses $url() for type-safe key generation
 */
export function getPutChannelsChannelIdPinsMessageIdMutationKey() {
  return `PUT ${client.channels[':channel_id'].pins[':message_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteChannelsChannelIdPinsMessageIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/pins/{message_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteChannelsChannelIdPinsMessageIdMutationKey() {
  return `DELETE ${client.channels[':channel_id'].pins[':message_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
) {
  return client.channels[':channel_id'].polls[':message_id'].answers[':answer_id'].$url(args)
    .pathname
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
  const swrKey =
    mutationOptions?.swrKey ?? getPostChannelsChannelIdPollsMessageIdExpireMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/polls/{message_id}/expire
 * Uses $url() for type-safe key generation
 */
export function getPostChannelsChannelIdPollsMessageIdExpireMutationKey() {
  return `POST ${client.channels[':channel_id'].polls[':message_id'].expire.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPutChannelsChannelIdRecipientsUserIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/{channel_id}/recipients/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getPutChannelsChannelIdRecipientsUserIdMutationKey() {
  return `PUT ${client.channels[':channel_id'].recipients[':user_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteChannelsChannelIdRecipientsUserIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/recipients/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteChannelsChannelIdRecipientsUserIdMutationKey() {
  return `DELETE ${client.channels[':channel_id'].recipients[':user_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostChannelsChannelIdSendSoundboardSoundMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/send-soundboard-sound
 * Uses $url() for type-safe key generation
 */
export function getPostChannelsChannelIdSendSoundboardSoundMutationKey() {
  return `POST ${client.channels[':channel_id']['send-soundboard-sound'].$url().pathname}`
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
 * Generates SWR cache key for GET /channels/{channel_id}/thread-members
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdThreadMembersKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
) {
  return client.channels[':channel_id']['thread-members'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutChannelsChannelIdThreadMembersMeMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/{channel_id}/thread-members/@me
 * Uses $url() for type-safe key generation
 */
export function getPutChannelsChannelIdThreadMembersMeMutationKey() {
  return `PUT ${client.channels[':channel_id']['thread-members']['@me'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteChannelsChannelIdThreadMembersMeMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/thread-members/@me
 * Uses $url() for type-safe key generation
 */
export function getDeleteChannelsChannelIdThreadMembersMeMutationKey() {
  return `DELETE ${client.channels[':channel_id']['thread-members']['@me'].$url().pathname}`
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
 * Generates SWR cache key for GET /channels/{channel_id}/thread-members/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdThreadMembersUserIdKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
) {
  return client.channels[':channel_id']['thread-members'][':user_id'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutChannelsChannelIdThreadMembersUserIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /channels/{channel_id}/thread-members/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getPutChannelsChannelIdThreadMembersUserIdMutationKey() {
  return `PUT ${client.channels[':channel_id']['thread-members'][':user_id'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getDeleteChannelsChannelIdThreadMembersUserIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /channels/{channel_id}/thread-members/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteChannelsChannelIdThreadMembersUserIdMutationKey() {
  return `DELETE ${client.channels[':channel_id']['thread-members'][':user_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostChannelsChannelIdThreadsMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/threads
 * Uses $url() for type-safe key generation
 */
export function getPostChannelsChannelIdThreadsMutationKey() {
  return `POST ${client.channels[':channel_id'].threads.$url().pathname}`
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
 * Generates SWR cache key for GET /channels/{channel_id}/threads/archived/private
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdThreadsArchivedPrivateKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
) {
  return client.channels[':channel_id'].threads.archived.private.$url(args).pathname
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
 * Generates SWR cache key for GET /channels/{channel_id}/threads/archived/public
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdThreadsArchivedPublicKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
) {
  return client.channels[':channel_id'].threads.archived.public.$url(args).pathname
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
 * Generates SWR cache key for GET /channels/{channel_id}/threads/search
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdThreadsSearchKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
) {
  return client.channels[':channel_id'].threads.search.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostChannelsChannelIdTypingMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/typing
 * Uses $url() for type-safe key generation
 */
export function getPostChannelsChannelIdTypingMutationKey() {
  return `POST ${client.channels[':channel_id'].typing.$url().pathname}`
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
 * Generates SWR cache key for GET /channels/{channel_id}/users/@me/threads/archived/private
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdUsersMeThreadsArchivedPrivateKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
) {
  return client.channels[':channel_id'].users['@me'].threads.archived.private.$url(args).pathname
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
 * Generates SWR cache key for GET /channels/{channel_id}/webhooks
 * Uses $url() for type-safe key generation
 */
export function getGetChannelsChannelIdWebhooksKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
) {
  return client.channels[':channel_id'].webhooks.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostChannelsChannelIdWebhooksMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /channels/{channel_id}/webhooks
 * Uses $url() for type-safe key generation
 */
export function getPostChannelsChannelIdWebhooksMutationKey() {
  return `POST ${client.channels[':channel_id'].webhooks.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetGatewayKey() {
  return client.gateway.$url().pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetGatewayBotKey() {
  return client.gateway.bot.$url().pathname
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
 * Generates SWR cache key for GET /guilds/templates/{code}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsTemplatesCodeKey(
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
) {
  return client.guilds.templates[':code'].$url(args).pathname
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
 * Generates SWR cache key for GET /guilds/{guild_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
) {
  return client.guilds[':guild_id'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPatchGuildsGuildIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['$patch']> },
      ) => parseResponse(client.guilds[':guild_id'].$patch(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdMutationKey() {
  return `PATCH ${client.guilds[':guild_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/audit-logs
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdAuditLogsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
) {
  return client.guilds[':guild_id']['audit-logs'].$url(args).pathname
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
 * Generates SWR cache key for GET /guilds/{guild_id}/auto-moderation/rules
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdAutoModerationRulesKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
) {
  return client.guilds[':guild_id']['auto-moderation'].rules.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostGuildsGuildIdAutoModerationRulesMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/auto-moderation/rules
 * Uses $url() for type-safe key generation
 */
export function getPostGuildsGuildIdAutoModerationRulesMutationKey() {
  return `POST ${client.guilds[':guild_id']['auto-moderation'].rules.$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdAutoModerationRulesRuleIdKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
) {
  return client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$url(args).pathname
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
  const swrKey =
    mutationOptions?.swrKey ?? getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationKey() {
  return `DELETE ${client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationKey() {
  return `PATCH ${client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/bans
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdBansKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
) {
  return client.guilds[':guild_id'].bans.$url(args).pathname
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
 * Generates SWR cache key for GET /guilds/{guild_id}/bans/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdBansUserIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
) {
  return client.guilds[':guild_id'].bans[':user_id'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutGuildsGuildIdBansUserIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /guilds/{guild_id}/bans/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getPutGuildsGuildIdBansUserIdMutationKey() {
  return `PUT ${client.guilds[':guild_id'].bans[':user_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteGuildsGuildIdBansUserIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/bans/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteGuildsGuildIdBansUserIdMutationKey() {
  return `DELETE ${client.guilds[':guild_id'].bans[':user_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostGuildsGuildIdBulkBanMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/bulk-ban
 * Uses $url() for type-safe key generation
 */
export function getPostGuildsGuildIdBulkBanMutationKey() {
  return `POST ${client.guilds[':guild_id']['bulk-ban'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/channels
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdChannelsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
) {
  return client.guilds[':guild_id'].channels.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostGuildsGuildIdChannelsMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/channels
 * Uses $url() for type-safe key generation
 */
export function getPostGuildsGuildIdChannelsMutationKey() {
  return `POST ${client.guilds[':guild_id'].channels.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchGuildsGuildIdChannelsMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/channels
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdChannelsMutationKey() {
  return `PATCH ${client.guilds[':guild_id'].channels.$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/emojis
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdEmojisKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
) {
  return client.guilds[':guild_id'].emojis.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostGuildsGuildIdEmojisMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']> },
      ) => parseResponse(client.guilds[':guild_id'].emojis.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/emojis
 * Uses $url() for type-safe key generation
 */
export function getPostGuildsGuildIdEmojisMutationKey() {
  return `POST ${client.guilds[':guild_id'].emojis.$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/emojis/{emoji_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdEmojisEmojiIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
) {
  return client.guilds[':guild_id'].emojis[':emoji_id'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteGuildsGuildIdEmojisEmojiIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/emojis/{emoji_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteGuildsGuildIdEmojisEmojiIdMutationKey() {
  return `DELETE ${client.guilds[':guild_id'].emojis[':emoji_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchGuildsGuildIdEmojisEmojiIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/emojis/{emoji_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdEmojisEmojiIdMutationKey() {
  return `PATCH ${client.guilds[':guild_id'].emojis[':emoji_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/integrations
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdIntegrationsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
) {
  return client.guilds[':guild_id'].integrations.$url(args).pathname
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
  const swrKey =
    mutationOptions?.swrKey ?? getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/integrations/{integration_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationKey() {
  return `DELETE ${client.guilds[':guild_id'].integrations[':integration_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/invites
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdInvitesKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
) {
  return client.guilds[':guild_id'].invites.$url(args).pathname
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
 * Generates SWR cache key for GET /guilds/{guild_id}/members
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdMembersKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
) {
  return client.guilds[':guild_id'].members.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPatchGuildsGuildIdMembersMeMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/members/@me
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdMembersMeMutationKey() {
  return `PATCH ${client.guilds[':guild_id'].members['@me'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/members/search
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdMembersSearchKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
) {
  return client.guilds[':guild_id'].members.search.$url(args).pathname
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
 * Generates SWR cache key for GET /guilds/{guild_id}/members/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdMembersUserIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
) {
  return client.guilds[':guild_id'].members[':user_id'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutGuildsGuildIdMembersUserIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /guilds/{guild_id}/members/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getPutGuildsGuildIdMembersUserIdMutationKey() {
  return `PUT ${client.guilds[':guild_id'].members[':user_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteGuildsGuildIdMembersUserIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/members/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteGuildsGuildIdMembersUserIdMutationKey() {
  return `DELETE ${client.guilds[':guild_id'].members[':user_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchGuildsGuildIdMembersUserIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/members/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdMembersUserIdMutationKey() {
  return `PATCH ${client.guilds[':guild_id'].members[':user_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 * Uses $url() for type-safe key generation
 */
export function getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationKey() {
  return `PUT ${client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationKey() {
  return `DELETE ${client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/messages/search
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdMessagesSearchKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
) {
  return client.guilds[':guild_id'].messages.search.$url(args).pathname
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
 * Generates SWR cache key for GET /guilds/{guild_id}/new-member-welcome
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdNewMemberWelcomeKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
) {
  return client.guilds[':guild_id']['new-member-welcome'].$url(args).pathname
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
 * Generates SWR cache key for GET /guilds/{guild_id}/onboarding
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdOnboardingKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
) {
  return client.guilds[':guild_id'].onboarding.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutGuildsGuildIdOnboardingMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /guilds/{guild_id}/onboarding
 * Uses $url() for type-safe key generation
 */
export function getPutGuildsGuildIdOnboardingMutationKey() {
  return `PUT ${client.guilds[':guild_id'].onboarding.$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/preview
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdPreviewKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
) {
  return client.guilds[':guild_id'].preview.$url(args).pathname
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
 * Generates SWR cache key for GET /guilds/{guild_id}/prune
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdPruneKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
) {
  return client.guilds[':guild_id'].prune.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostGuildsGuildIdPruneMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']> },
      ) => parseResponse(client.guilds[':guild_id'].prune.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/prune
 * Uses $url() for type-safe key generation
 */
export function getPostGuildsGuildIdPruneMutationKey() {
  return `POST ${client.guilds[':guild_id'].prune.$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/regions
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdRegionsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
) {
  return client.guilds[':guild_id'].regions.$url(args).pathname
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
 * Generates SWR cache key for GET /guilds/{guild_id}/roles
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdRolesKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
) {
  return client.guilds[':guild_id'].roles.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostGuildsGuildIdRolesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']> },
      ) => parseResponse(client.guilds[':guild_id'].roles.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/roles
 * Uses $url() for type-safe key generation
 */
export function getPostGuildsGuildIdRolesMutationKey() {
  return `POST ${client.guilds[':guild_id'].roles.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchGuildsGuildIdRolesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']> },
      ) => parseResponse(client.guilds[':guild_id'].roles.$patch(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/roles
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdRolesMutationKey() {
  return `PATCH ${client.guilds[':guild_id'].roles.$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/roles/member-counts
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdRolesMemberCountsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
) {
  return client.guilds[':guild_id'].roles['member-counts'].$url(args).pathname
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
 * Generates SWR cache key for GET /guilds/{guild_id}/roles/{role_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdRolesRoleIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
) {
  return client.guilds[':guild_id'].roles[':role_id'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteGuildsGuildIdRolesRoleIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/roles/{role_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteGuildsGuildIdRolesRoleIdMutationKey() {
  return `DELETE ${client.guilds[':guild_id'].roles[':role_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchGuildsGuildIdRolesRoleIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/roles/{role_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdRolesRoleIdMutationKey() {
  return `PATCH ${client.guilds[':guild_id'].roles[':role_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/scheduled-events
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdScheduledEventsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
) {
  return client.guilds[':guild_id']['scheduled-events'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostGuildsGuildIdScheduledEventsMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/scheduled-events
 * Uses $url() for type-safe key generation
 */
export function getPostGuildsGuildIdScheduledEventsMutationKey() {
  return `POST ${client.guilds[':guild_id']['scheduled-events'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
) {
  return client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$url(args)
    .pathname
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
  const swrKey =
    mutationOptions?.swrKey ??
    getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey() {
  return `DELETE ${client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ??
    getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey() {
  return `PATCH ${client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
) {
  return client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].users.$url(
    args,
  ).pathname
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
 * Generates SWR cache key for GET /guilds/{guild_id}/soundboard-sounds
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdSoundboardSoundsKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
) {
  return client.guilds[':guild_id']['soundboard-sounds'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostGuildsGuildIdSoundboardSoundsMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/soundboard-sounds
 * Uses $url() for type-safe key generation
 */
export function getPostGuildsGuildIdSoundboardSoundsMutationKey() {
  return `POST ${client.guilds[':guild_id']['soundboard-sounds'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdSoundboardSoundsSoundIdKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
) {
  return client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$url(args).pathname
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
  const swrKey =
    mutationOptions?.swrKey ?? getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/soundboard-sounds/{sound_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationKey() {
  return `DELETE ${client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/soundboard-sounds/{sound_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationKey() {
  return `PATCH ${client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/stickers
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdStickersKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
) {
  return client.guilds[':guild_id'].stickers.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostGuildsGuildIdStickersMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/stickers
 * Uses $url() for type-safe key generation
 */
export function getPostGuildsGuildIdStickersMutationKey() {
  return `POST ${client.guilds[':guild_id'].stickers.$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/stickers/{sticker_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdStickersStickerIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
) {
  return client.guilds[':guild_id'].stickers[':sticker_id'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteGuildsGuildIdStickersStickerIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/stickers/{sticker_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteGuildsGuildIdStickersStickerIdMutationKey() {
  return `DELETE ${client.guilds[':guild_id'].stickers[':sticker_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchGuildsGuildIdStickersStickerIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/stickers/{sticker_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdStickersStickerIdMutationKey() {
  return `PATCH ${client.guilds[':guild_id'].stickers[':sticker_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/templates
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdTemplatesKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
) {
  return client.guilds[':guild_id'].templates.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostGuildsGuildIdTemplatesMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /guilds/{guild_id}/templates
 * Uses $url() for type-safe key generation
 */
export function getPostGuildsGuildIdTemplatesMutationKey() {
  return `POST ${client.guilds[':guild_id'].templates.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPutGuildsGuildIdTemplatesCodeMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /guilds/{guild_id}/templates/{code}
 * Uses $url() for type-safe key generation
 */
export function getPutGuildsGuildIdTemplatesCodeMutationKey() {
  return `PUT ${client.guilds[':guild_id'].templates[':code'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteGuildsGuildIdTemplatesCodeMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /guilds/{guild_id}/templates/{code}
 * Uses $url() for type-safe key generation
 */
export function getDeleteGuildsGuildIdTemplatesCodeMutationKey() {
  return `DELETE ${client.guilds[':guild_id'].templates[':code'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchGuildsGuildIdTemplatesCodeMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/templates/{code}
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdTemplatesCodeMutationKey() {
  return `PATCH ${client.guilds[':guild_id'].templates[':code'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/threads/active
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdThreadsActiveKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
) {
  return client.guilds[':guild_id'].threads.active.$url(args).pathname
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
 * Generates SWR cache key for GET /guilds/{guild_id}/vanity-url
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdVanityUrlKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
) {
  return client.guilds[':guild_id']['vanity-url'].$url(args).pathname
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
 * Generates SWR cache key for GET /guilds/{guild_id}/voice-states/@me
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdVoiceStatesMeKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
) {
  return client.guilds[':guild_id']['voice-states']['@me'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPatchGuildsGuildIdVoiceStatesMeMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/voice-states/@me
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdVoiceStatesMeMutationKey() {
  return `PATCH ${client.guilds[':guild_id']['voice-states']['@me'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/voice-states/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdVoiceStatesUserIdKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
) {
  return client.guilds[':guild_id']['voice-states'][':user_id'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPatchGuildsGuildIdVoiceStatesUserIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/voice-states/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdVoiceStatesUserIdMutationKey() {
  return `PATCH ${client.guilds[':guild_id']['voice-states'][':user_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/webhooks
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdWebhooksKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
) {
  return client.guilds[':guild_id'].webhooks.$url(args).pathname
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
 * Generates SWR cache key for GET /guilds/{guild_id}/welcome-screen
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdWelcomeScreenKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
) {
  return client.guilds[':guild_id']['welcome-screen'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPatchGuildsGuildIdWelcomeScreenMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/welcome-screen
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdWelcomeScreenMutationKey() {
  return `PATCH ${client.guilds[':guild_id']['welcome-screen'].$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/widget
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdWidgetKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
) {
  return client.guilds[':guild_id'].widget.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPatchGuildsGuildIdWidgetMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']> },
      ) => parseResponse(client.guilds[':guild_id'].widget.$patch(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /guilds/{guild_id}/widget
 * Uses $url() for type-safe key generation
 */
export function getPatchGuildsGuildIdWidgetMutationKey() {
  return `PATCH ${client.guilds[':guild_id'].widget.$url().pathname}`
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
 * Generates SWR cache key for GET /guilds/{guild_id}/widget.json
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdWidgetJsonKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
) {
  return client.guilds[':guild_id']['widget.json'].$url(args).pathname
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
 * Generates SWR cache key for GET /guilds/{guild_id}/widget.png
 * Uses $url() for type-safe key generation
 */
export function getGetGuildsGuildIdWidgetPngKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
) {
  return client.guilds[':guild_id']['widget.png'].$url(args).pathname
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
  const swrKey =
    mutationOptions?.swrKey ?? getPostInteractionsInteractionIdInteractionTokenCallbackMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /interactions/{interaction_id}/{interaction_token}/callback
 * Uses $url() for type-safe key generation
 */
export function getPostInteractionsInteractionIdInteractionTokenCallbackMutationKey() {
  return `POST ${client.interactions[':interaction_id'][':interaction_token'].callback.$url().pathname}`
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
 * Generates SWR cache key for GET /invites/{code}
 * Uses $url() for type-safe key generation
 */
export function getGetInvitesCodeKey(
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
) {
  return client.invites[':code'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteInvitesCodeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.invites)[':code']['$delete']> },
      ) => parseResponse(client.invites[':code'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /invites/{code}
 * Uses $url() for type-safe key generation
 */
export function getDeleteInvitesCodeMutationKey() {
  return `DELETE ${client.invites[':code'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPutLobbiesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.lobbies.$put> }) =>
        parseResponse(client.lobbies.$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /lobbies
 * Uses $url() for type-safe key generation
 */
export function getPutLobbiesMutationKey() {
  return `PUT ${client.lobbies.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostLobbiesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.lobbies.$post> }) =>
        parseResponse(client.lobbies.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /lobbies
 * Uses $url() for type-safe key generation
 */
export function getPostLobbiesMutationKey() {
  return `POST ${client.lobbies.$url().pathname}`
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
 * Generates SWR cache key for GET /lobbies/{lobby_id}
 * Uses $url() for type-safe key generation
 */
export function getGetLobbiesLobbyIdKey(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
) {
  return client.lobbies[':lobby_id'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPatchLobbiesLobbyIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']> },
      ) => parseResponse(client.lobbies[':lobby_id'].$patch(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /lobbies/{lobby_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchLobbiesLobbyIdMutationKey() {
  return `PATCH ${client.lobbies[':lobby_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchLobbiesLobbyIdChannelLinkingMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /lobbies/{lobby_id}/channel-linking
 * Uses $url() for type-safe key generation
 */
export function getPatchLobbiesLobbyIdChannelLinkingMutationKey() {
  return `PATCH ${client.lobbies[':lobby_id']['channel-linking'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteLobbiesLobbyIdMembersMeMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /lobbies/{lobby_id}/members/@me
 * Uses $url() for type-safe key generation
 */
export function getDeleteLobbiesLobbyIdMembersMeMutationKey() {
  return `DELETE ${client.lobbies[':lobby_id'].members['@me'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostLobbiesLobbyIdMembersMeInvitesMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /lobbies/{lobby_id}/members/@me/invites
 * Uses $url() for type-safe key generation
 */
export function getPostLobbiesLobbyIdMembersMeInvitesMutationKey() {
  return `POST ${client.lobbies[':lobby_id'].members['@me'].invites.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostLobbiesLobbyIdMembersBulkMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /lobbies/{lobby_id}/members/bulk
 * Uses $url() for type-safe key generation
 */
export function getPostLobbiesLobbyIdMembersBulkMutationKey() {
  return `POST ${client.lobbies[':lobby_id'].members.bulk.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPutLobbiesLobbyIdMembersUserIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /lobbies/{lobby_id}/members/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getPutLobbiesLobbyIdMembersUserIdMutationKey() {
  return `PUT ${client.lobbies[':lobby_id'].members[':user_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteLobbiesLobbyIdMembersUserIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /lobbies/{lobby_id}/members/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteLobbiesLobbyIdMembersUserIdMutationKey() {
  return `DELETE ${client.lobbies[':lobby_id'].members[':user_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostLobbiesLobbyIdMembersUserIdInvitesMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /lobbies/{lobby_id}/members/{user_id}/invites
 * Uses $url() for type-safe key generation
 */
export function getPostLobbiesLobbyIdMembersUserIdInvitesMutationKey() {
  return `POST ${client.lobbies[':lobby_id'].members[':user_id'].invites.$url().pathname}`
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
 * Generates SWR cache key for GET /lobbies/{lobby_id}/messages
 * Uses $url() for type-safe key generation
 */
export function getGetLobbiesLobbyIdMessagesKey(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
) {
  return client.lobbies[':lobby_id'].messages.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostLobbiesLobbyIdMessagesMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /lobbies/{lobby_id}/messages
 * Uses $url() for type-safe key generation
 */
export function getPostLobbiesLobbyIdMessagesMutationKey() {
  return `POST ${client.lobbies[':lobby_id'].messages.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetOauth2MeKey() {
  return client.oauth2['@me'].$url().pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetOauth2ApplicationsMeKey() {
  return client.oauth2.applications['@me'].$url().pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetOauth2KeysKey() {
  return client.oauth2.keys.$url().pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetOauth2UserinfoKey() {
  return client.oauth2.userinfo.$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostPartnerSdkProvisionalAccountsUnmergeMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /partner-sdk/provisional-accounts/unmerge
 * Uses $url() for type-safe key generation
 */
export function getPostPartnerSdkProvisionalAccountsUnmergeMutationKey() {
  return `POST ${client['partner-sdk']['provisional-accounts'].unmerge.$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getPostPartnerSdkProvisionalAccountsUnmergeBotMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /partner-sdk/provisional-accounts/unmerge/bot
 * Uses $url() for type-safe key generation
 */
export function getPostPartnerSdkProvisionalAccountsUnmergeBotMutationKey() {
  return `POST ${client['partner-sdk']['provisional-accounts'].unmerge.bot.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostPartnerSdkTokenMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['partner-sdk']['token']['$post']> },
      ) => parseResponse(client['partner-sdk'].token.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /partner-sdk/token
 * Uses $url() for type-safe key generation
 */
export function getPostPartnerSdkTokenMutationKey() {
  return `POST ${client['partner-sdk'].token.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostPartnerSdkTokenBotMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']> },
      ) => parseResponse(client['partner-sdk'].token.bot.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /partner-sdk/token/bot
 * Uses $url() for type-safe key generation
 */
export function getPostPartnerSdkTokenBotMutationKey() {
  return `POST ${client['partner-sdk'].token.bot.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetSoundboardDefaultSoundsKey() {
  return client['soundboard-default-sounds'].$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostStageInstancesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client)['stage-instances']['$post']> },
      ) => parseResponse(client['stage-instances'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /stage-instances
 * Uses $url() for type-safe key generation
 */
export function getPostStageInstancesMutationKey() {
  return `POST ${client['stage-instances'].$url().pathname}`
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
 * Generates SWR cache key for GET /stage-instances/{channel_id}
 * Uses $url() for type-safe key generation
 */
export function getGetStageInstancesChannelIdKey(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
) {
  return client['stage-instances'][':channel_id'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteStageInstancesChannelIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /stage-instances/{channel_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteStageInstancesChannelIdMutationKey() {
  return `DELETE ${client['stage-instances'][':channel_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchStageInstancesChannelIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /stage-instances/{channel_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchStageInstancesChannelIdMutationKey() {
  return `PATCH ${client['stage-instances'][':channel_id'].$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetStickerPacksKey() {
  return client['sticker-packs'].$url().pathname
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
 * Generates SWR cache key for GET /sticker-packs/{pack_id}
 * Uses $url() for type-safe key generation
 */
export function getGetStickerPacksPackIdKey(
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
) {
  return client['sticker-packs'][':pack_id'].$url(args).pathname
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
 * Generates SWR cache key for GET /stickers/{sticker_id}
 * Uses $url() for type-safe key generation
 */
export function getGetStickersStickerIdKey(
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
) {
  return client.stickers[':sticker_id'].$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetUsersMeKey() {
  return client.users['@me'].$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPatchUsersMeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<(typeof client.users)['@me']['$patch']> }) =>
        parseResponse(client.users['@me'].$patch(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /users/@me
 * Uses $url() for type-safe key generation
 */
export function getPatchUsersMeMutationKey() {
  return `PATCH ${client.users['@me'].$url().pathname}`
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
 * Generates SWR cache key for GET /users/@me/applications/{application_id}/entitlements
 * Uses $url() for type-safe key generation
 */
export function getGetUsersMeApplicationsApplicationIdEntitlementsKey(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
) {
  return client.users['@me'].applications[':application_id'].entitlements.$url(args).pathname
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
 * Generates SWR cache key for GET /users/@me/applications/{application_id}/role-connection
 * Uses $url() for type-safe key generation
 */
export function getGetUsersMeApplicationsApplicationIdRoleConnectionKey(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
) {
  return client.users['@me'].applications[':application_id']['role-connection'].$url(args).pathname
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
  const swrKey =
    mutationOptions?.swrKey ?? getPutUsersMeApplicationsApplicationIdRoleConnectionMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /users/@me/applications/{application_id}/role-connection
 * Uses $url() for type-safe key generation
 */
export function getPutUsersMeApplicationsApplicationIdRoleConnectionMutationKey() {
  return `PUT ${client.users['@me'].applications[':application_id']['role-connection'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /users/@me/applications/{application_id}/role-connection
 * Uses $url() for type-safe key generation
 */
export function getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationKey() {
  return `DELETE ${client.users['@me'].applications[':application_id']['role-connection'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostUsersMeChannelsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.users)['@me']['channels']['$post']> },
      ) => parseResponse(client.users['@me'].channels.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /users/@me/channels
 * Uses $url() for type-safe key generation
 */
export function getPostUsersMeChannelsMutationKey() {
  return `POST ${client.users['@me'].channels.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetUsersMeConnectionsKey() {
  return client.users['@me'].connections.$url().pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetUsersMeGuildsKey(
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
) {
  return client.users['@me'].guilds.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteUsersMeGuildsGuildIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /users/@me/guilds/{guild_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteUsersMeGuildsGuildIdMutationKey() {
  return `DELETE ${client.users['@me'].guilds[':guild_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /users/@me/guilds/{guild_id}/member
 * Uses $url() for type-safe key generation
 */
export function getGetUsersMeGuildsGuildIdMemberKey(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
) {
  return client.users['@me'].guilds[':guild_id'].member.$url(args).pathname
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
 * Generates SWR cache key for GET /users/{user_id}
 * Uses $url() for type-safe key generation
 */
export function getGetUsersUserIdKey(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return client.users[':user_id'].$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetVoiceRegionsKey() {
  return client.voice.regions.$url().pathname
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
 * Generates SWR cache key for GET /webhooks/{webhook_id}
 * Uses $url() for type-safe key generation
 */
export function getGetWebhooksWebhookIdKey(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
) {
  return client.webhooks[':webhook_id'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteWebhooksWebhookIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']> },
      ) => parseResponse(client.webhooks[':webhook_id'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /webhooks/{webhook_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteWebhooksWebhookIdMutationKey() {
  return `DELETE ${client.webhooks[':webhook_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchWebhooksWebhookIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']> },
      ) => parseResponse(client.webhooks[':webhook_id'].$patch(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /webhooks/{webhook_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchWebhooksWebhookIdMutationKey() {
  return `PATCH ${client.webhooks[':webhook_id'].$url().pathname}`
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
 * Generates SWR cache key for GET /webhooks/{webhook_id}/{webhook_token}
 * Uses $url() for type-safe key generation
 */
export function getGetWebhooksWebhookIdWebhookTokenKey(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
) {
  return client.webhooks[':webhook_id'][':webhook_token'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostWebhooksWebhookIdWebhookTokenMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webhooks/{webhook_id}/{webhook_token}
 * Uses $url() for type-safe key generation
 */
export function getPostWebhooksWebhookIdWebhookTokenMutationKey() {
  return `POST ${client.webhooks[':webhook_id'][':webhook_token'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteWebhooksWebhookIdWebhookTokenMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /webhooks/{webhook_id}/{webhook_token}
 * Uses $url() for type-safe key generation
 */
export function getDeleteWebhooksWebhookIdWebhookTokenMutationKey() {
  return `DELETE ${client.webhooks[':webhook_id'][':webhook_token'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchWebhooksWebhookIdWebhookTokenMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /webhooks/{webhook_id}/{webhook_token}
 * Uses $url() for type-safe key generation
 */
export function getPatchWebhooksWebhookIdWebhookTokenMutationKey() {
  return `PATCH ${client.webhooks[':webhook_id'][':webhook_token'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostWebhooksWebhookIdWebhookTokenGithubMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webhooks/{webhook_id}/{webhook_token}/github
 * Uses $url() for type-safe key generation
 */
export function getPostWebhooksWebhookIdWebhookTokenGithubMutationKey() {
  return `POST ${client.webhooks[':webhook_id'][':webhook_token'].github.$url().pathname}`
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
 * Generates SWR cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 * Uses $url() for type-safe key generation
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesOriginalKey(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
) {
  return client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$url(args).pathname
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
  const swrKey =
    mutationOptions?.swrKey ?? getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /webhooks/{webhook_id}/{webhook_token}/messages/@original
 * Uses $url() for type-safe key generation
 */
export function getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey() {
  return `DELETE ${client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /webhooks/{webhook_id}/{webhook_token}/messages/@original
 * Uses $url() for type-safe key generation
 */
export function getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey() {
  return `PATCH ${client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$url().pathname}`
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
 * Generates SWR cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 * Uses $url() for type-safe key generation
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdKey(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
) {
  return client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$url(args)
    .pathname
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
  const swrKey =
    mutationOptions?.swrKey ?? getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 * Uses $url() for type-safe key generation
 */
export function getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey() {
  return `DELETE ${client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$url().pathname}`
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
  const swrKey =
    mutationOptions?.swrKey ?? getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 * Uses $url() for type-safe key generation
 */
export function getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey() {
  return `PATCH ${client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostWebhooksWebhookIdWebhookTokenSlackMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webhooks/{webhook_id}/{webhook_token}/slack
 * Uses $url() for type-safe key generation
 */
export function getPostWebhooksWebhookIdWebhookTokenSlackMutationKey() {
  return `POST ${client.webhooks[':webhook_id'][':webhook_token'].slack.$url().pathname}`
}
