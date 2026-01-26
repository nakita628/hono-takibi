import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetApplicationsMeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /applications/@me
 */
export function getGetApplicationsMeQueryKey() {
  return ['/applications/@me'] as const
}

/**
 * Returns Svelte Query query options for GET /applications/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsMeQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetApplicationsMeQueryKey(),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetApplicationsApplicationIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /applications/{application_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdQueryOptions = (
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetApplicationsApplicationIdQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /applications/{application_id}/activity-instances/{instance_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetApplicationsApplicationIdCommandsQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /applications/{application_id}/commands
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdCommandsQueryOptions = (
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetApplicationsApplicationIdCommandsQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetApplicationsApplicationIdCommandsCommandIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /applications/{application_id}/commands/{command_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdCommandsCommandIdQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetApplicationsApplicationIdCommandsCommandIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetApplicationsApplicationIdEmojisQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /applications/{application_id}/emojis
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdEmojisQueryOptions = (
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetApplicationsApplicationIdEmojisQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetApplicationsApplicationIdEmojisEmojiIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /applications/{application_id}/emojis/{emoji_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdEmojisEmojiIdQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetApplicationsApplicationIdEmojisEmojiIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetApplicationsApplicationIdEntitlementsQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /applications/{application_id}/entitlements
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdEntitlementsQueryOptions = (
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetApplicationsApplicationIdEntitlementsQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /applications/{application_id}/entitlements/{entitlement_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryOptions(
      args,
      clientOptions,
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
 * Returns Svelte Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryOptions(
      args,
      clientOptions,
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
 * Returns Svelte Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryOptions(
      args,
      clientOptions,
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
 * Returns Svelte Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryOptions =
  (
    args: InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) =>
    queryOptions({
      queryKey:
        getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(args),
      queryFn: ({ signal }) =>
        parseResponse(
          client.applications[':application_id'].guilds[':guild_id'].commands[
            ':command_id'
          ].permissions.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
        ),
    })

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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetApplicationsApplicationIdRoleConnectionsMetadataQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /applications/{application_id}/role-connections/metadata
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdRoleConnectionsMetadataQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetApplicationsApplicationIdRoleConnectionsMetadataQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetChannelsChannelIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /channels/{channel_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChannelsChannelIdQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetChannelsChannelIdInvitesQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /channels/{channel_id}/invites
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdInvitesQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChannelsChannelIdInvitesQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetChannelsChannelIdMessagesQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /channels/{channel_id}/messages
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdMessagesQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChannelsChannelIdMessagesQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetChannelsChannelIdMessagesPinsQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /channels/{channel_id}/messages/pins
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdMessagesPinsQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChannelsChannelIdMessagesPinsQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetChannelsChannelIdMessagesMessageIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /channels/{channel_id}/messages/{message_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdMessagesMessageIdQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChannelsChannelIdMessagesMessageIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
        | undefined
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
        | undefined
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
        | undefined
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
        | undefined
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetChannelsChannelIdPinsQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /channels/{channel_id}/pins
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdPinsQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChannelsChannelIdPinsQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
        | undefined
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetChannelsChannelIdThreadMembersQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /channels/{channel_id}/thread-members
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdThreadMembersQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChannelsChannelIdThreadMembersQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetChannelsChannelIdThreadMembersUserIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /channels/{channel_id}/thread-members/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdThreadMembersUserIdQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChannelsChannelIdThreadMembersUserIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetChannelsChannelIdThreadsArchivedPrivateQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /channels/{channel_id}/threads/archived/private
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdThreadsArchivedPrivateQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChannelsChannelIdThreadsArchivedPrivateQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetChannelsChannelIdThreadsArchivedPublicQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /channels/{channel_id}/threads/archived/public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdThreadsArchivedPublicQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChannelsChannelIdThreadsArchivedPublicQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetChannelsChannelIdThreadsSearchQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /channels/{channel_id}/threads/search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdThreadsSearchQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChannelsChannelIdThreadsSearchQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /channels/{channel_id}/users/@me/threads/archived/private
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetChannelsChannelIdWebhooksQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /channels/{channel_id}/webhooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdWebhooksQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetChannelsChannelIdWebhooksQueryKey(args),
    queryFn: ({ signal }) =>
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetGatewayQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /gateway
 */
export function getGetGatewayQueryKey() {
  return ['/gateway'] as const
}

/**
 * Returns Svelte Query query options for GET /gateway
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGatewayQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetGatewayQueryKey(),
    queryFn: ({ signal }) =>
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetGatewayBotQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /gateway/bot
 */
export function getGetGatewayBotQueryKey() {
  return ['/gateway/bot'] as const
}

/**
 * Returns Svelte Query query options for GET /gateway/bot
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGatewayBotQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetGatewayBotQueryKey(),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsTemplatesCodeQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/templates/{code}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsTemplatesCodeQueryOptions = (
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsTemplatesCodeQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetGuildsGuildIdQueryOptions(args, clientOptions), ...queryOptions })
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdAuditLogsQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/audit-logs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdAuditLogsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdAuditLogsQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdAutoModerationRulesQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/auto-moderation/rules
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdAutoModerationRulesQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdAutoModerationRulesQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdAutoModerationRulesRuleIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdAutoModerationRulesRuleIdQueryOptions = (
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdAutoModerationRulesRuleIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdBansQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/bans
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdBansQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdBansQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdBansUserIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/bans/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdBansUserIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdBansUserIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdChannelsQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/channels
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdChannelsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdChannelsQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdEmojisQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/emojis
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdEmojisQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdEmojisQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdEmojisEmojiIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/emojis/{emoji_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdEmojisEmojiIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdEmojisEmojiIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdIntegrationsQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/integrations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdIntegrationsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdIntegrationsQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdInvitesQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/invites
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdInvitesQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdInvitesQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdMembersQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/members
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdMembersQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdMembersQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdMembersSearchQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/members/search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdMembersSearchQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdMembersSearchQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdMembersUserIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/members/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdMembersUserIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdMembersUserIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
        | undefined
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
        | undefined
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
        | undefined
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdNewMemberWelcomeQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/new-member-welcome
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdNewMemberWelcomeQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdNewMemberWelcomeQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdOnboardingQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/onboarding
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdOnboardingQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdOnboardingQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdPreviewQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/preview
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdPreviewQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdPreviewQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdPruneQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/prune
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdPruneQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdPruneQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdRegionsQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/regions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdRegionsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdRegionsQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdRolesQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/roles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdRolesQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdRolesQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdRolesRoleIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/roles/{role_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdRolesRoleIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdRolesRoleIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdScheduledEventsQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/scheduled-events
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdScheduledEventsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdScheduledEventsQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryOptions = (
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryOptions(
      args,
      clientOptions,
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryOptions = (
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].users.$get(
          args,
          { ...clientOptions, init: { ...clientOptions?.init, signal } },
        ),
      ),
  })

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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdSoundboardSoundsQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/soundboard-sounds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdSoundboardSoundsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdSoundboardSoundsQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdSoundboardSoundsSoundIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdSoundboardSoundsSoundIdQueryOptions = (
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdSoundboardSoundsSoundIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdStickersQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/stickers
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdStickersQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdStickersQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdStickersStickerIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/stickers/{sticker_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdStickersStickerIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdStickersStickerIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdTemplatesQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/templates
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdTemplatesQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdTemplatesQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdThreadsActiveQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/threads/active
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdThreadsActiveQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdThreadsActiveQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdVanityUrlQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/vanity-url
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdVanityUrlQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdVanityUrlQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdVoiceStatesMeQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/voice-states/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdVoiceStatesMeQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdVoiceStatesMeQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdVoiceStatesUserIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/voice-states/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdVoiceStatesUserIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdVoiceStatesUserIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdWebhooksQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/webhooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdWebhooksQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdWebhooksQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdWelcomeScreenQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/welcome-screen
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdWelcomeScreenQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdWelcomeScreenQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdWidgetQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/widget
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdWidgetQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdWidgetQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdWidgetJsonQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/widget.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdWidgetJsonQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdWidgetJsonQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetGuildsGuildIdWidgetPngQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /guilds/{guild_id}/widget.png
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdWidgetPngQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetGuildsGuildIdWidgetPngQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetInvitesCodeQueryOptions(args, clientOptions), ...queryOptions })
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
 * Returns Svelte Query query options for GET /invites/{code}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetInvitesCodeQueryOptions = (
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetInvitesCodeQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetLobbiesLobbyIdQueryOptions(args, clientOptions), ...queryOptions })
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
 * Returns Svelte Query query options for GET /lobbies/{lobby_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetLobbiesLobbyIdQueryOptions = (
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetLobbiesLobbyIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetLobbiesLobbyIdMessagesQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /lobbies/{lobby_id}/messages
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetLobbiesLobbyIdMessagesQueryOptions = (
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetLobbiesLobbyIdMessagesQueryKey(args),
    queryFn: ({ signal }) =>
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetOauth2MeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /oauth2/@me
 */
export function getGetOauth2MeQueryKey() {
  return ['/oauth2/@me'] as const
}

/**
 * Returns Svelte Query query options for GET /oauth2/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauth2MeQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetOauth2MeQueryKey(),
    queryFn: ({ signal }) =>
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetOauth2ApplicationsMeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /oauth2/applications/@me
 */
export function getGetOauth2ApplicationsMeQueryKey() {
  return ['/oauth2/applications/@me'] as const
}

/**
 * Returns Svelte Query query options for GET /oauth2/applications/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauth2ApplicationsMeQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetOauth2ApplicationsMeQueryKey(),
    queryFn: ({ signal }) =>
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetOauth2KeysQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /oauth2/keys
 */
export function getGetOauth2KeysQueryKey() {
  return ['/oauth2/keys'] as const
}

/**
 * Returns Svelte Query query options for GET /oauth2/keys
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauth2KeysQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetOauth2KeysQueryKey(),
    queryFn: ({ signal }) =>
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetOauth2UserinfoQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /oauth2/userinfo
 */
export function getGetOauth2UserinfoQueryKey() {
  return ['/oauth2/userinfo'] as const
}

/**
 * Returns Svelte Query query options for GET /oauth2/userinfo
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauth2UserinfoQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetOauth2UserinfoQueryKey(),
    queryFn: ({ signal }) =>
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
        | undefined
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
        | undefined
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetSoundboardDefaultSoundsQueryOptions(clientOptions),
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
 * Returns Svelte Query query options for GET /soundboard-default-sounds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSoundboardDefaultSoundsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSoundboardDefaultSoundsQueryKey(),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetStageInstancesChannelIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /stage-instances/{channel_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStageInstancesChannelIdQueryOptions = (
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetStageInstancesChannelIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetStickerPacksQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /sticker-packs
 */
export function getGetStickerPacksQueryKey() {
  return ['/sticker-packs'] as const
}

/**
 * Returns Svelte Query query options for GET /sticker-packs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStickerPacksQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetStickerPacksQueryKey(),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetStickerPacksPackIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /sticker-packs/{pack_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStickerPacksPackIdQueryOptions = (
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetStickerPacksPackIdQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetStickersStickerIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /stickers/{sticker_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStickersStickerIdQueryOptions = (
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetStickersStickerIdQueryKey(args),
    queryFn: ({ signal }) =>
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetUsersMeQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /users/@me
 */
export function getGetUsersMeQueryKey() {
  return ['/users/@me'] as const
}

/**
 * Returns Svelte Query query options for GET /users/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetUsersMeQueryKey(),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetUsersMeApplicationsApplicationIdEntitlementsQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /users/@me/applications/{application_id}/entitlements
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeApplicationsApplicationIdEntitlementsQueryOptions = (
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetUsersMeApplicationsApplicationIdEntitlementsQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetUsersMeApplicationsApplicationIdRoleConnectionQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /users/@me/applications/{application_id}/role-connection
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeApplicationsApplicationIdRoleConnectionQueryOptions = (
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetUsersMeApplicationsApplicationIdRoleConnectionQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetUsersMeConnectionsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /users/@me/connections
 */
export function getGetUsersMeConnectionsQueryKey() {
  return ['/users/@me/connections'] as const
}

/**
 * Returns Svelte Query query options for GET /users/@me/connections
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeConnectionsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetUsersMeConnectionsQueryKey(),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetUsersMeGuildsQueryOptions(args, clientOptions), ...queryOptions })
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
 * Returns Svelte Query query options for GET /users/@me/guilds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeGuildsQueryOptions = (
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetUsersMeGuildsQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetUsersMeGuildsGuildIdMemberQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /users/@me/guilds/{guild_id}/member
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeGuildsGuildIdMemberQueryOptions = (
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetUsersMeGuildsGuildIdMemberQueryKey(args),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetUsersUserIdQueryOptions(args, clientOptions), ...queryOptions })
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
 * Returns Svelte Query query options for GET /users/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdQueryOptions = (
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetUsersUserIdQueryKey(args),
    queryFn: ({ signal }) =>
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({ ...getGetVoiceRegionsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /voice/regions
 */
export function getGetVoiceRegionsQueryKey() {
  return ['/voice/regions'] as const
}

/**
 * Returns Svelte Query query options for GET /voice/regions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetVoiceRegionsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetVoiceRegionsQueryKey(),
    queryFn: ({ signal }) =>
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetWebhooksWebhookIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /webhooks/{webhook_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksWebhookIdQueryOptions = (
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetWebhooksWebhookIdQueryKey(args),
    queryFn: ({ signal }) =>
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
      data:
        | InferResponseType<(typeof client.webhooks)[':webhook_id']['$delete']>
        | undefined
        | undefined,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetWebhooksWebhookIdWebhookTokenQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /webhooks/{webhook_id}/{webhook_token}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksWebhookIdWebhookTokenQueryOptions = (
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetWebhooksWebhookIdWebhookTokenQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
        | undefined
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryOptions = (
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    ...getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryOptions(args, clientOptions),
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
 * Returns Svelte Query query options for GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryOptions = (
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(args),
    queryFn: ({ signal }) =>
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
        | undefined
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
