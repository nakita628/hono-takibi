import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discord-api-spec-openapi'

/**
 * GET /applications/@me
 */
export function createGetApplicationsMe(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    select?: (
      data: InferResponseType<(typeof client.applications)['@me']['$get']>,
    ) => InferResponseType<(typeof client.applications)['@me']['$get']>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApplicationsMeQueryKey(),
    queryFn: async () => parseResponse(client.applications['@me'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function createPatchApplicationsMe(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.applications)['@me']['$patch']>,
      variables: InferRequestType<(typeof client.applications)['@me']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.applications)['@me']['$patch']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.applications)['@me']['$patch']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.applications)['@me']['$patch']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.applications)['@me']['$patch']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.applications)['@me']['$patch']>) =>
      parseResponse(client.applications['@me'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}
 */
export function createGetApplicationsApplicationId(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.applications)[':application_id']['$get']>,
      ) => InferResponseType<(typeof client.applications)[':application_id']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApplicationsApplicationIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPatchApplicationsApplicationId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.applications)[':application_id']['$patch']>,
      variables: InferRequestType<(typeof client.applications)[':application_id']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.applications)[':application_id']['$patch']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.applications)[':application_id']['$patch']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.applications)[':application_id']['$patch']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.applications)[':application_id']['$patch']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['$patch']>,
    ) => parseResponse(client.applications[':application_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}/activity-instances/{instance_id}
 */
export function createGetApplicationsApplicationIdActivityInstancesInstanceId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
        >,
      ) => InferResponseType<
        (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id']['activity-instances'][':instance_id'].$get(
          args,
          clientOptions,
        ),
      ),
    ...queryOptions,
  })
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
export function createPostApplicationsApplicationIdAttachment(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.applications)[':application_id']['attachment']['$post']
      >,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['attachment']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['attachment']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.applications)[':application_id']['attachment']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['attachment']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['attachment']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['attachment']['$post']
      >,
    ) =>
      parseResponse(client.applications[':application_id'].attachment.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}/commands
 */
export function createGetApplicationsApplicationIdCommands(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.applications)[':application_id']['commands']['$get']
        >,
      ) => InferResponseType<(typeof client.applications)[':application_id']['commands']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApplicationsApplicationIdCommandsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].commands.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPutApplicationsApplicationIdCommands(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.applications)[':application_id']['commands']['$put']>,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.applications)[':application_id']['commands']['$put']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>,
    ) => parseResponse(client.applications[':application_id'].commands.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /applications/{application_id}/commands
 */
export function createPostApplicationsApplicationIdCommands(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.applications)[':application_id']['commands']['$post']>,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.applications)[':application_id']['commands']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>,
    ) => parseResponse(client.applications[':application_id'].commands.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}/commands/{command_id}
 */
export function createGetApplicationsApplicationIdCommandsCommandId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
        >,
      ) => InferResponseType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApplicationsApplicationIdCommandsCommandIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$get(args, clientOptions),
      ),
    ...queryOptions,
  })
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
export function createDeleteApplicationsApplicationIdCommandsCommandId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$delete(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * PATCH /applications/{application_id}/commands/{command_id}
 */
export function createPatchApplicationsApplicationIdCommandsCommandId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
      >,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$patch(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}/emojis
 */
export function createGetApplicationsApplicationIdEmojis(
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.applications)[':application_id']['emojis']['$get']>,
      ) => InferResponseType<(typeof client.applications)[':application_id']['emojis']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApplicationsApplicationIdEmojisQueryKey(args),
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].emojis.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostApplicationsApplicationIdEmojis(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.applications)[':application_id']['emojis']['$post']>,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['emojis']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['emojis']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.applications)[':application_id']['emojis']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['emojis']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['emojis']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>,
    ) => parseResponse(client.applications[':application_id'].emojis.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}/emojis/{emoji_id}
 */
export function createGetApplicationsApplicationIdEmojisEmojiId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
        >,
      ) => InferResponseType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApplicationsApplicationIdEmojisEmojiIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$get(args, clientOptions),
      ),
    ...queryOptions,
  })
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
export function createDeleteApplicationsApplicationIdEmojisEmojiId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$delete(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * PATCH /applications/{application_id}/emojis/{emoji_id}
 */
export function createPatchApplicationsApplicationIdEmojisEmojiId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
      >,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$patch(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}/entitlements
 */
export function createGetApplicationsApplicationIdEntitlements(
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.applications)[':application_id']['entitlements']['$get']
        >,
      ) => InferResponseType<
        (typeof client.applications)[':application_id']['entitlements']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApplicationsApplicationIdEntitlementsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].entitlements.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostApplicationsApplicationIdEntitlements(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.applications)[':application_id']['entitlements']['$post']
      >,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['entitlements']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements']['$post']
      >,
    ) =>
      parseResponse(client.applications[':application_id'].entitlements.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}/entitlements/{entitlement_id}
 */
export function createGetApplicationsApplicationIdEntitlementsEntitlementId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
        >,
      ) => InferResponseType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].entitlements[':entitlement_id'].$get(
          args,
          clientOptions,
        ),
      ),
    ...queryOptions,
  })
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
export function createDeleteApplicationsApplicationIdEntitlementsEntitlementId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * POST /applications/{application_id}/entitlements/{entitlement_id}/consume
 */
export function createPostApplicationsApplicationIdEntitlementsEntitlementIdConsume(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands
 */
export function createGetApplicationsApplicationIdGuildsGuildIdCommands(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
        >,
      ) => InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.$get(
          args,
          clientOptions,
        ),
      ),
    ...queryOptions,
  })
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
export function createPutApplicationsApplicationIdGuildsGuildIdCommands(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
      >,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * POST /applications/{application_id}/guilds/{guild_id}/commands
 */
export function createPostApplicationsApplicationIdGuildsGuildIdCommands(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
      >,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 */
export function createGetApplicationsApplicationIdGuildsGuildIdCommandsPermissions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
        >,
      ) => InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.permissions.$get(
          args,
          clientOptions,
        ),
      ),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
        >,
      ) => InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$get(
          args,
          clientOptions,
        ),
      ),
    ...queryOptions,
  })
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
export function createDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * PATCH /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function createPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
      >,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 */
export function createGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
        >,
      ) => InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey:
      getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[
          ':command_id'
        ].permissions.$get(args, clientOptions),
      ),
    ...queryOptions,
  })
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
export function createPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
      >,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}/role-connections/metadata
 */
export function createGetApplicationsApplicationIdRoleConnectionsMetadata(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
        >,
      ) => InferResponseType<
        (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetApplicationsApplicationIdRoleConnectionsMetadataQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id']['role-connections'].metadata.$get(
          args,
          clientOptions,
        ),
      ),
    ...queryOptions,
  })
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
export function createPutApplicationsApplicationIdRoleConnectionsMetadata(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
      >,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}
 */
export function createGetChannelsChannelId(
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.channels)[':channel_id']['$get']>,
      ) => InferResponseType<(typeof client.channels)[':channel_id']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetChannelsChannelIdQueryKey(args),
    queryFn: async () => parseResponse(client.channels[':channel_id'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createDeleteChannelsChannelId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.channels)[':channel_id']['$delete']>,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.channels)[':channel_id']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.channels)[':channel_id']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['$delete']>,
    ) => parseResponse(client.channels[':channel_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /channels/{channel_id}
 */
export function createPatchChannelsChannelId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.channels)[':channel_id']['$patch']>,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['$patch']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.channels)[':channel_id']['$patch']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['$patch']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.channels)[':channel_id']['$patch']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.channels)[':channel_id']['$patch']>) =>
      parseResponse(client.channels[':channel_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /channels/{channel_id}/followers
 */
export function createPostChannelsChannelIdFollowers(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.channels)[':channel_id']['followers']['$post']>,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.channels)[':channel_id']['followers']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].followers.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}/invites
 */
export function createGetChannelsChannelIdInvites(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.channels)[':channel_id']['invites']['$get']>,
      ) => InferResponseType<(typeof client.channels)[':channel_id']['invites']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetChannelsChannelIdInvitesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].invites.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostChannelsChannelIdInvites(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.channels)[':channel_id']['invites']['$post']>
        | undefined,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.channels)[':channel_id']['invites']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].invites.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}/messages
 */
export function createGetChannelsChannelIdMessages(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.channels)[':channel_id']['messages']['$get']>,
      ) => InferResponseType<(typeof client.channels)[':channel_id']['messages']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetChannelsChannelIdMessagesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].messages.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostChannelsChannelIdMessages(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.channels)[':channel_id']['messages']['$post']>,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.channels)[':channel_id']['messages']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].messages.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /channels/{channel_id}/messages/bulk-delete
 */
export function createPostChannelsChannelIdMessagesBulkDelete(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages['bulk-delete'].$post(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}/messages/pins
 */
export function createGetChannelsChannelIdMessagesPins(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.channels)[':channel_id']['messages']['pins']['$get']
        >,
      ) => InferResponseType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetChannelsChannelIdMessagesPinsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].messages.pins.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPutChannelsChannelIdMessagesPinsMessageId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages.pins[':message_id'].$put(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * DELETE /channels/{channel_id}/messages/pins/{message_id}
 */
export function createDeleteChannelsChannelIdMessagesPinsMessageId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages.pins[':message_id'].$delete(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}/messages/{message_id}
 */
export function createGetChannelsChannelIdMessagesMessageId(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
        >,
      ) => InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetChannelsChannelIdMessagesMessageIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$get(args, clientOptions),
      ),
    ...queryOptions,
  })
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
export function createDeleteChannelsChannelIdMessagesMessageId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$delete(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * PATCH /channels/{channel_id}/messages/{message_id}
 */
export function createPatchChannelsChannelIdMessagesMessageId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
      >,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$patch(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * POST /channels/{channel_id}/messages/{message_id}/crosspost
 */
export function createPostChannelsChannelIdMessagesMessageIdCrosspost(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
      >,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].crosspost.$post(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions
 */
export function createDeleteChannelsChannelIdMessagesMessageIdReactions(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 */
export function createGetChannelsChannelIdMessagesMessageIdReactionsEmojiName(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
        >,
      ) => InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$get(
          args,
          clientOptions,
        ),
      ),
    ...queryOptions,
  })
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
export function createDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiName(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * PUT /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function createPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function createDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}
 */
export function createDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * POST /channels/{channel_id}/messages/{message_id}/threads
 */
export function createPostChannelsChannelIdMessagesMessageIdThreads(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
      >,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].threads.$post(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * PUT /channels/{channel_id}/permissions/{overwrite_id}
 */
export function createPutChannelsChannelIdPermissionsOverwriteId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].permissions[':overwrite_id'].$put(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * DELETE /channels/{channel_id}/permissions/{overwrite_id}
 */
export function createDeleteChannelsChannelIdPermissionsOverwriteId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].permissions[':overwrite_id'].$delete(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}/pins
 */
export function createGetChannelsChannelIdPins(
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.channels)[':channel_id']['pins']['$get']>,
      ) => InferResponseType<(typeof client.channels)[':channel_id']['pins']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetChannelsChannelIdPinsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].pins.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPutChannelsChannelIdPinsMessageId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['pins'][':message_id']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['pins'][':message_id']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['pins'][':message_id']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['pins'][':message_id']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['pins'][':message_id']['$put']
      >,
    ) =>
      parseResponse(client.channels[':channel_id'].pins[':message_id'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /channels/{channel_id}/pins/{message_id}
 */
export function createDeleteChannelsChannelIdPinsMessageId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].pins[':message_id'].$delete(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 */
export function createGetChannelsChannelIdPollsMessageIdAnswersAnswerId(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
        >,
      ) => InferResponseType<
        (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].polls[':message_id'].answers[':answer_id'].$get(
          args,
          clientOptions,
        ),
      ),
    ...queryOptions,
  })
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
export function createPostChannelsChannelIdPollsMessageIdExpire(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
      >,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].polls[':message_id'].expire.$post(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * PUT /channels/{channel_id}/recipients/{user_id}
 */
export function createPutChannelsChannelIdRecipientsUserId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].recipients[':user_id'].$put(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * DELETE /channels/{channel_id}/recipients/{user_id}
 */
export function createDeleteChannelsChannelIdRecipientsUserId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].recipients[':user_id'].$delete(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * POST /channels/{channel_id}/send-soundboard-sound
 */
export function createPostChannelsChannelIdSendSoundboardSound(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id']['send-soundboard-sound'].$post(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}/thread-members
 */
export function createGetChannelsChannelIdThreadMembers(
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
      ) => InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetChannelsChannelIdThreadMembersQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id']['thread-members'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPutChannelsChannelIdThreadMembersMe(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['thread-members']['@me']['$put']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members']['@me']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members']['@me']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['thread-members']['@me']['$put']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members']['@me']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members']['@me']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members']['@me']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members']['@me'].$put(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * DELETE /channels/{channel_id}/thread-members/@me
 */
export function createDeleteChannelsChannelIdThreadMembersMe(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members']['@me'].$delete(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}/thread-members/{user_id}
 */
export function createGetChannelsChannelIdThreadMembersUserId(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
        >,
      ) => InferResponseType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetChannelsChannelIdThreadMembersUserIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$get(args, clientOptions),
      ),
    ...queryOptions,
  })
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
export function createPutChannelsChannelIdThreadMembersUserId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$put(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * DELETE /channels/{channel_id}/thread-members/{user_id}
 */
export function createDeleteChannelsChannelIdThreadMembersUserId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$delete(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * POST /channels/{channel_id}/threads
 */
export function createPostChannelsChannelIdThreads(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.channels)[':channel_id']['threads']['$post']>,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.channels)[':channel_id']['threads']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].threads.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}/threads/archived/private
 */
export function createGetChannelsChannelIdThreadsArchivedPrivate(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
        >,
      ) => InferResponseType<
        (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetChannelsChannelIdThreadsArchivedPrivateQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].threads.archived.private.$get(args, clientOptions),
      ),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
        >,
      ) => InferResponseType<
        (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetChannelsChannelIdThreadsArchivedPublicQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].threads.archived.public.$get(args, clientOptions),
      ),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.channels)[':channel_id']['threads']['search']['$get']
        >,
      ) => InferResponseType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetChannelsChannelIdThreadsSearchQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].threads.search.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostChannelsChannelIdTyping(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.channels)[':channel_id']['typing']['$post']>
        | undefined,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.channels)[':channel_id']['typing']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].typing.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}/users/@me/threads/archived/private
 */
export function createGetChannelsChannelIdUsersMeThreadsArchivedPrivate(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
        >,
      ) => InferResponseType<
        (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].users['@me'].threads.archived.private.$get(
          args,
          clientOptions,
        ),
      ),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
      ) => InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetChannelsChannelIdWebhooksQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].webhooks.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostChannelsChannelIdWebhooks(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$post']>,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].webhooks.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /gateway
 */
export function createGetGateway(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    select?: (
      data: InferResponseType<typeof client.gateway.$get>,
    ) => InferResponseType<typeof client.gateway.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGatewayQueryKey(),
    queryFn: async () => parseResponse(client.gateway.$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function createGetGatewayBot(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    select?: (
      data: InferResponseType<typeof client.gateway.bot.$get>,
    ) => InferResponseType<typeof client.gateway.bot.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGatewayBotQueryKey(),
    queryFn: async () => parseResponse(client.gateway.bot.$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds.templates)[':code']['$get']>,
      ) => InferResponseType<(typeof client.guilds.templates)[':code']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsTemplatesCodeQueryKey(args),
    queryFn: async () => parseResponse(client.guilds.templates[':code'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPatchGuildsGuildId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['$patch']>,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['$patch']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>) =>
      parseResponse(client.guilds[':guild_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/audit-logs
 */
export function createGetGuildsGuildIdAuditLogs(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdAuditLogsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['audit-logs'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']
        >,
      ) => InferResponseType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdAutoModerationRulesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['auto-moderation'].rules.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostGuildsGuildIdAutoModerationRules(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']
      >,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']
      >,
    ) =>
      parseResponse(client.guilds[':guild_id']['auto-moderation'].rules.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function createGetGuildsGuildIdAutoModerationRulesRuleId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
        >,
      ) => InferResponseType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdAutoModerationRulesRuleIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$get(args, clientOptions),
      ),
    ...queryOptions,
  })
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
export function createDeleteGuildsGuildIdAutoModerationRulesRuleId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function createPatchGuildsGuildIdAutoModerationRulesRuleId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
      >,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$patch(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/bans
 */
export function createGetGuildsGuildIdBans(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['bans']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdBansQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].bans.$get(args, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdBansUserIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].bans[':user_id'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPutGuildsGuildIdBansUserId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>
        | undefined,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].bans[':user_id'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /guilds/{guild_id}/bans/{user_id}
 */
export function createDeleteGuildsGuildIdBansUserId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
        | undefined,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].bans[':user_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /guilds/{guild_id}/bulk-ban
 */
export function createPostGuildsGuildIdBulkBan(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>,
    ) => parseResponse(client.guilds[':guild_id']['bulk-ban'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/channels
 */
export function createGetGuildsGuildIdChannels(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdChannelsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].channels.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostGuildsGuildIdChannels(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$post']>,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].channels.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/channels
 */
export function createPatchGuildsGuildIdChannels(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$patch']>
        | undefined,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$patch']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].channels.$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/emojis
 */
export function createGetGuildsGuildIdEmojis(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdEmojisQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].emojis.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostGuildsGuildIdEmojis(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$post']>,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].emojis.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/emojis/{emoji_id}
 */
export function createGetGuildsGuildIdEmojisEmojiId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdEmojisEmojiIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createDeleteGuildsGuildIdEmojisEmojiId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
        | undefined,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/emojis/{emoji_id}
 */
export function createPatchGuildsGuildIdEmojisEmojiId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/integrations
 */
export function createGetGuildsGuildIdIntegrations(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['integrations']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdIntegrationsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].integrations.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createDeleteGuildsGuildIdIntegrationsIntegrationId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id'].integrations[':integration_id'].$delete(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/invites
 */
export function createGetGuildsGuildIdInvites(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['invites']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdInvitesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].invites.$get(args, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['members']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['members']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdMembersQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].members.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPatchGuildsGuildIdMembersMe(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].members['@me'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/members/search
 */
export function createGetGuildsGuildIdMembersSearch(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdMembersSearchQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].members.search.$get(args, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdMembersUserIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].members[':user_id'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPutGuildsGuildIdMembersUserId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
        | undefined,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}
 */
export function createDeleteGuildsGuildIdMembersUserId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
        | undefined,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/members/{user_id}
 */
export function createPatchGuildsGuildIdMembersUserId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
        | undefined,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function createPutGuildsGuildIdMembersUserIdRolesRoleId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$put(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function createDeleteGuildsGuildIdMembersUserIdRolesRoleId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/new-member-welcome
 */
export function createGetGuildsGuildIdNewMemberWelcome(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data:
          | InferResponseType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>
          | undefined,
      ) =>
        | InferResponseType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>
        | undefined
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdNewMemberWelcomeQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['new-member-welcome'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdOnboardingQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].onboarding.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPutGuildsGuildIdOnboarding(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].onboarding.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/preview
 */
export function createGetGuildsGuildIdPreview(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['preview']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdPreviewQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].preview.$get(args, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdPruneQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].prune.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostGuildsGuildIdPrune(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$post']>,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].prune.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/regions
 */
export function createGetGuildsGuildIdRegions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['regions']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdRegionsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].regions.$get(args, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdRolesQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].roles.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostGuildsGuildIdRoles(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$post']>,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].roles.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/roles
 */
export function createPatchGuildsGuildIdRoles(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$patch']>,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$patch']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].roles.$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/roles/{role_id}
 */
export function createGetGuildsGuildIdRolesRoleId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdRolesRoleIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].roles[':role_id'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createDeleteGuildsGuildIdRolesRoleId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
        | undefined,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].roles[':role_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/roles/{role_id}
 */
export function createPatchGuildsGuildIdRolesRoleId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].roles[':role_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/scheduled-events
 */
export function createGetGuildsGuildIdScheduledEvents(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdScheduledEventsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['scheduled-events'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostGuildsGuildIdScheduledEvents(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>,
    ) => parseResponse(client.guilds[':guild_id']['scheduled-events'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function createGetGuildsGuildIdScheduledEventsGuildScheduledEventId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
        >,
      ) => InferResponseType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$get(
          args,
          clientOptions,
        ),
      ),
    ...queryOptions,
  })
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
export function createDeleteGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function createPatchGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
      >,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 */
export function createGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
        >,
      ) => InferResponseType<
        (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].users.$get(
          args,
          clientOptions,
        ),
      ),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdSoundboardSoundsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostGuildsGuildIdSoundboardSounds(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>,
    ) => parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function createGetGuildsGuildIdSoundboardSoundsSoundId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
        >,
      ) => InferResponseType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdSoundboardSoundsSoundIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$get(args, clientOptions),
      ),
    ...queryOptions,
  })
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
export function createDeleteGuildsGuildIdSoundboardSoundsSoundId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$delete(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function createPatchGuildsGuildIdSoundboardSoundsSoundId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
      >,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$patch(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/stickers
 */
export function createGetGuildsGuildIdStickers(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdStickersQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].stickers.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostGuildsGuildIdStickers(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$post']>,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].stickers.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/stickers/{sticker_id}
 */
export function createGetGuildsGuildIdStickersStickerId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']
        >,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdStickersStickerIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].stickers[':sticker_id'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createDeleteGuildsGuildIdStickersStickerId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id'].stickers[':sticker_id'].$delete(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/stickers/{sticker_id}
 */
export function createPatchGuildsGuildIdStickersStickerId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']
      >,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']
      >,
    ) =>
      parseResponse(client.guilds[':guild_id'].stickers[':sticker_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/templates
 */
export function createGetGuildsGuildIdTemplates(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdTemplatesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].templates.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostGuildsGuildIdTemplates(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$post']>,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].templates.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PUT /guilds/{guild_id}/templates/{code}
 */
export function createPutGuildsGuildIdTemplatesCode(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['templates'][':code']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['templates'][':code']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['templates'][':code']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['templates'][':code']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /guilds/{guild_id}/templates/{code}
 */
export function createDeleteGuildsGuildIdTemplatesCode(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['templates'][':code']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['templates'][':code']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['templates'][':code']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['templates'][':code']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/templates/{code}
 */
export function createPatchGuildsGuildIdTemplatesCode(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['templates'][':code']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['templates'][':code']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['templates'][':code']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['templates'][':code']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/threads/active
 */
export function createGetGuildsGuildIdThreadsActive(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdThreadsActiveQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].threads.active.$get(args, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdVanityUrlQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['vanity-url'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdVoiceStatesMeQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPatchGuildsGuildIdVoiceStatesMe(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
        | undefined,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>,
    ) =>
      parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/voice-states/{user_id}
 */
export function createGetGuildsGuildIdVoiceStatesUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']
        >,
      ) => InferResponseType<
        (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdVoiceStatesUserIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['voice-states'][':user_id'].$get(args, clientOptions),
      ),
    ...queryOptions,
  })
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
export function createPatchGuildsGuildIdVoiceStatesUserId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id']['voice-states'][':user_id'].$patch(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/webhooks
 */
export function createGetGuildsGuildIdWebhooks(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdWebhooksQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].webhooks.$get(args, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdWelcomeScreenQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['welcome-screen'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPatchGuildsGuildIdWelcomeScreen(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id']['welcome-screen'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/widget
 */
export function createGetGuildsGuildIdWidget(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdWidgetQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].widget.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPatchGuildsGuildIdWidget(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$patch']>,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$patch']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].widget.$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/widget.json
 */
export function createGetGuildsGuildIdWidgetJson(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdWidgetJsonQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['widget.json'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
      ) => InferResponseType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetGuildsGuildIdWidgetPngQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['widget.png'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostInteractionsInteractionIdInteractionTokenCallback(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * GET /invites/{code}
 */
export function createGetInvitesCode(
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.invites)[':code']['$get']>,
      ) => InferResponseType<(typeof client.invites)[':code']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetInvitesCodeQueryKey(args),
    queryFn: async () => parseResponse(client.invites[':code'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createDeleteInvitesCode(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.invites)[':code']['$delete']>,
      variables: InferRequestType<(typeof client.invites)[':code']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.invites)[':code']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.invites)[':code']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.invites)[':code']['$delete']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.invites)[':code']['$delete']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.invites)[':code']['$delete']>) =>
      parseResponse(client.invites[':code'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PUT /lobbies
 */
export function createPutLobbies(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.lobbies.$put>,
      variables: InferRequestType<typeof client.lobbies.$put>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.lobbies.$put>) => void
    onSettled?: (
      data: InferResponseType<typeof client.lobbies.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.lobbies.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.lobbies.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.lobbies.$put>) =>
      parseResponse(client.lobbies.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /lobbies
 */
export function createPostLobbies(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.lobbies.$post>,
      variables: InferRequestType<typeof client.lobbies.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.lobbies.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.lobbies.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.lobbies.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.lobbies.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.lobbies.$post>) =>
      parseResponse(client.lobbies.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /lobbies/{lobby_id}
 */
export function createGetLobbiesLobbyId(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.lobbies)[':lobby_id']['$get']>,
      ) => InferResponseType<(typeof client.lobbies)[':lobby_id']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetLobbiesLobbyIdQueryKey(args),
    queryFn: async () => parseResponse(client.lobbies[':lobby_id'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPatchLobbiesLobbyId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.lobbies)[':lobby_id']['$patch']>,
      variables: InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.lobbies)[':lobby_id']['$patch']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>) =>
      parseResponse(client.lobbies[':lobby_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /lobbies/{lobby_id}/channel-linking
 */
export function createPatchLobbiesLobbyIdChannelLinking(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>,
    ) => parseResponse(client.lobbies[':lobby_id']['channel-linking'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /lobbies/{lobby_id}/members/@me
 */
export function createDeleteLobbiesLobbyIdMembersMe(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
        | undefined,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>,
    ) => parseResponse(client.lobbies[':lobby_id'].members['@me'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /lobbies/{lobby_id}/members/@me/invites
 */
export function createPostLobbiesLobbyIdMembersMeInvites(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']
      >,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']
      >,
    ) =>
      parseResponse(client.lobbies[':lobby_id'].members['@me'].invites.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /lobbies/{lobby_id}/members/bulk
 */
export function createPostLobbiesLobbyIdMembersBulk(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>,
      variables: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>,
    ) => parseResponse(client.lobbies[':lobby_id'].members.bulk.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PUT /lobbies/{lobby_id}/members/{user_id}
 */
export function createPutLobbiesLobbyIdMembersUserId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>,
    ) => parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /lobbies/{lobby_id}/members/{user_id}
 */
export function createDeleteLobbiesLobbyIdMembersUserId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
        | undefined,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']
      >,
    ) =>
      parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /lobbies/{lobby_id}/members/{user_id}/invites
 */
export function createPostLobbiesLobbyIdMembersUserIdInvites(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
      >,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
      >,
    ) =>
      parseResponse(
        client.lobbies[':lobby_id'].members[':user_id'].invites.$post(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * GET /lobbies/{lobby_id}/messages
 */
export function createGetLobbiesLobbyIdMessages(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
      ) => InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetLobbiesLobbyIdMessagesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.lobbies[':lobby_id'].messages.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostLobbiesLobbyIdMessages(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>,
      variables: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>,
    ) => parseResponse(client.lobbies[':lobby_id'].messages.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /oauth2/@me
 */
export function createGetOauth2Me(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    select?: (
      data: InferResponseType<(typeof client.oauth2)['@me']['$get']>,
    ) => InferResponseType<(typeof client.oauth2)['@me']['$get']>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetOauth2MeQueryKey(),
    queryFn: async () => parseResponse(client.oauth2['@me'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function createGetOauth2ApplicationsMe(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    select?: (
      data: InferResponseType<(typeof client.oauth2.applications)['@me']['$get']>,
    ) => InferResponseType<(typeof client.oauth2.applications)['@me']['$get']>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetOauth2ApplicationsMeQueryKey(),
    queryFn: async () =>
      parseResponse(client.oauth2.applications['@me'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function createGetOauth2Keys(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    select?: (
      data: InferResponseType<typeof client.oauth2.keys.$get>,
    ) => InferResponseType<typeof client.oauth2.keys.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetOauth2KeysQueryKey(),
    queryFn: async () => parseResponse(client.oauth2.keys.$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function createGetOauth2Userinfo(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    select?: (
      data: InferResponseType<typeof client.oauth2.userinfo.$get>,
    ) => InferResponseType<typeof client.oauth2.userinfo.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetOauth2UserinfoQueryKey(),
    queryFn: async () => parseResponse(client.oauth2.userinfo.$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function createPostPartnerSdkProvisionalAccountsUnmerge(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']
      >,
    ) =>
      parseResponse(
        client['partner-sdk']['provisional-accounts'].unmerge.$post(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge/bot
 */
export function createPostPartnerSdkProvisionalAccountsUnmergeBot(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
      >,
    ) =>
      parseResponse(
        client['partner-sdk']['provisional-accounts'].unmerge.bot.$post(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * POST /partner-sdk/token
 */
export function createPostPartnerSdkToken(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['partner-sdk']['token']['$post']>,
      variables: InferRequestType<(typeof client)['partner-sdk']['token']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['partner-sdk']['token']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['partner-sdk']['token']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['partner-sdk']['token']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['partner-sdk']['token']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['partner-sdk']['token']['$post']>) =>
      parseResponse(client['partner-sdk'].token.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /partner-sdk/token/bot
 */
export function createPostPartnerSdkTokenBot(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['partner-sdk']['token']['bot']['$post']>,
      variables: InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['partner-sdk']['token']['bot']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>,
    ) => parseResponse(client['partner-sdk'].token.bot.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /soundboard-default-sounds
 */
export function createGetSoundboardDefaultSounds(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    select?: (
      data: InferResponseType<(typeof client)['soundboard-default-sounds']['$get']>,
    ) => InferResponseType<(typeof client)['soundboard-default-sounds']['$get']>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetSoundboardDefaultSoundsQueryKey(),
    queryFn: async () =>
      parseResponse(client['soundboard-default-sounds'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function createPostStageInstances(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['stage-instances']['$post']>,
      variables: InferRequestType<(typeof client)['stage-instances']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['stage-instances']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client)['stage-instances']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['stage-instances']['$post']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client)['stage-instances']['$post']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['stage-instances']['$post']>) =>
      parseResponse(client['stage-instances'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /stage-instances/{channel_id}
 */
export function createGetStageInstancesChannelId(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client)['stage-instances'][':channel_id']['$get']>,
      ) => InferResponseType<(typeof client)['stage-instances'][':channel_id']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetStageInstancesChannelIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client['stage-instances'][':channel_id'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createDeleteStageInstancesChannelId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client)['stage-instances'][':channel_id']['$delete']>
        | undefined,
      variables: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['stage-instances'][':channel_id']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>,
    ) => parseResponse(client['stage-instances'][':channel_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /stage-instances/{channel_id}
 */
export function createPatchStageInstancesChannelId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client)['stage-instances'][':channel_id']['$patch']>,
      variables: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client)['stage-instances'][':channel_id']['$patch']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>,
    ) => parseResponse(client['stage-instances'][':channel_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /sticker-packs
 */
export function createGetStickerPacks(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    select?: (
      data: InferResponseType<(typeof client)['sticker-packs']['$get']>,
    ) => InferResponseType<(typeof client)['sticker-packs']['$get']>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetStickerPacksQueryKey(),
    queryFn: async () => parseResponse(client['sticker-packs'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
      ) => InferResponseType<(typeof client)['sticker-packs'][':pack_id']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetStickerPacksPackIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client['sticker-packs'][':pack_id'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.stickers)[':sticker_id']['$get']>,
      ) => InferResponseType<(typeof client.stickers)[':sticker_id']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetStickersStickerIdQueryKey(args),
    queryFn: async () => parseResponse(client.stickers[':sticker_id'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createGetUsersMe(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    select?: (
      data: InferResponseType<(typeof client.users)['@me']['$get']>,
    ) => InferResponseType<(typeof client.users)['@me']['$get']>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUsersMeQueryKey(),
    queryFn: async () => parseResponse(client.users['@me'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
export function createPatchUsersMe(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.users)['@me']['$patch']>,
      variables: InferRequestType<(typeof client.users)['@me']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)['@me']['$patch']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.users)['@me']['$patch']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)['@me']['$patch']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.users)['@me']['$patch']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.users)['@me']['$patch']>) =>
      parseResponse(client.users['@me'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /users/@me/applications/{application_id}/entitlements
 */
export function createGetUsersMeApplicationsApplicationIdEntitlements(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
        >,
      ) => InferResponseType<
        (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUsersMeApplicationsApplicationIdEntitlementsQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.users['@me'].applications[':application_id'].entitlements.$get(args, clientOptions),
      ),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
        >,
      ) => InferResponseType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUsersMeApplicationsApplicationIdRoleConnectionQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.users['@me'].applications[':application_id']['role-connection'].$get(
          args,
          clientOptions,
        ),
      ),
    ...queryOptions,
  })
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
export function createPutUsersMeApplicationsApplicationIdRoleConnection(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
      >,
      variables: InferRequestType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * DELETE /users/@me/applications/{application_id}/role-connection
 */
export function createDeleteUsersMeApplicationsApplicationIdRoleConnection(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * POST /users/@me/channels
 */
export function createPostUsersMeChannels(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.users)['@me']['channels']['$post']>,
      variables: InferRequestType<(typeof client.users)['@me']['channels']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)['@me']['channels']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.users)['@me']['channels']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)['@me']['channels']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.users)['@me']['channels']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.users)['@me']['channels']['$post']>) =>
      parseResponse(client.users['@me'].channels.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /users/@me/connections
 */
export function createGetUsersMeConnections(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    select?: (
      data: InferResponseType<(typeof client.users)['@me']['connections']['$get']>,
    ) => InferResponseType<(typeof client.users)['@me']['connections']['$get']>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUsersMeConnectionsQueryKey(),
    queryFn: async () =>
      parseResponse(client.users['@me'].connections.$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.users)['@me']['guilds']['$get']>,
      ) => InferResponseType<(typeof client.users)['@me']['guilds']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUsersMeGuildsQueryKey(args),
    queryFn: async () => parseResponse(client.users['@me'].guilds.$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createDeleteUsersMeGuildsGuildId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>
        | undefined,
      variables: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>,
    ) => parseResponse(client.users['@me'].guilds[':guild_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /users/@me/guilds/{guild_id}/member
 */
export function createGetUsersMeGuildsGuildIdMember(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']
        >,
      ) => InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUsersMeGuildsGuildIdMemberQueryKey(args),
    queryFn: async () =>
      parseResponse(client.users['@me'].guilds[':guild_id'].member.$get(args, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.users)[':user_id']['$get']>,
      ) => InferResponseType<(typeof client.users)[':user_id']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetUsersUserIdQueryKey(args),
    queryFn: async () => parseResponse(client.users[':user_id'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createGetVoiceRegions(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
    select?: (
      data: InferResponseType<typeof client.voice.regions.$get>,
    ) => InferResponseType<typeof client.voice.regions.$get>
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetVoiceRegionsQueryKey(),
    queryFn: async () => parseResponse(client.voice.regions.$get(undefined, clientOptions)),
    ...queryOptions,
  })
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
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.webhooks)[':webhook_id']['$get']>,
      ) => InferResponseType<(typeof client.webhooks)[':webhook_id']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetWebhooksWebhookIdQueryKey(args),
    queryFn: async () => parseResponse(client.webhooks[':webhook_id'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createDeleteWebhooksWebhookId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.webhooks)[':webhook_id']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.webhooks)[':webhook_id']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>,
    ) => parseResponse(client.webhooks[':webhook_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /webhooks/{webhook_id}
 */
export function createPatchWebhooksWebhookId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.webhooks)[':webhook_id']['$patch']>,
      variables: InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.webhooks)[':webhook_id']['$patch']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>) =>
      parseResponse(client.webhooks[':webhook_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /webhooks/{webhook_id}/{webhook_token}
 */
export function createGetWebhooksWebhookIdWebhookToken(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
      ) => InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetWebhooksWebhookIdWebhookTokenQueryKey(args),
    queryFn: async () =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$get(args, clientOptions)),
    ...queryOptions,
  })
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
export function createPostWebhooksWebhookIdWebhookToken(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
        | undefined,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>,
    ) => parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}
 */
export function createDeleteWebhooksWebhookIdWebhookToken(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
        | undefined,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>,
    ) =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}
 */
export function createPatchWebhooksWebhookIdWebhookToken(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>,
    ) =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/github
 */
export function createPostWebhooksWebhookIdWebhookTokenGithub(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
      >,
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].github.$post(args, clientOptions),
      ),
    ...mutationOptions,
  })
}

/**
 * GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function createGetWebhooksWebhookIdWebhookTokenMessagesOriginal(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
        >,
      ) => InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$get(
          args,
          clientOptions,
        ),
      ),
    ...queryOptions,
  })
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
export function createDeleteWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function createPatchWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
      >,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function createGetWebhooksWebhookIdWebhookTokenMessagesMessageId(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
      select?: (
        data: InferResponseType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
        >,
      ) => InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
      >
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$get(
          args,
          clientOptions,
        ),
      ),
    ...queryOptions,
  })
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
export function createDeleteWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
          >
        | undefined,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function createPatchWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
      >,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/slack
 */
export function createPostWebhooksWebhookIdWebhookTokenSlack(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
      >,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
      >,
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].slack.$post(args, clientOptions),
      ),
    ...mutationOptions,
  })
}
