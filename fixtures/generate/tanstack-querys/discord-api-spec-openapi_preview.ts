import { useQuery, useMutation } from '@tanstack/react-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discord-api-spec-openapi_preview'

/**
 * GET /applications/@me
 */
export function useGetApplicationsMe(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client.applications)['@me']['$get']>
      | (() => InferResponseType<(typeof client.applications)['@me']['$get']>)
    initialData?:
      | InferResponseType<(typeof client.applications)['@me']['$get']>
      | (() => InferResponseType<(typeof client.applications)['@me']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsMeQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.applications['@me'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/@me
 */
export function getGetApplicationsMeQueryKey() {
  return ['/applications/@me'] as const
}

/**
 * Returns TanStack Query query options for GET /applications/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApplicationsMeQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetApplicationsMeQueryKey(),
    queryFn: async () => parseResponse(client.applications['@me'].$get(undefined, clientOptions)),
  }
}

/**
 * PATCH /applications/@me
 */
export function usePatchApplicationsMe(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.applications)['@me']['$patch']>) =>
      parseResponse(client.applications['@me'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}
 */
export function useGetApplicationsApplicationId(
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
      placeholderData?:
        | InferResponseType<(typeof client.applications)[':application_id']['$get']>
        | (() => InferResponseType<(typeof client.applications)[':application_id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.applications)[':application_id']['$get']>
        | (() => InferResponseType<(typeof client.applications)[':application_id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.applications[':application_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}
 */
export function getGetApplicationsApplicationIdQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
) {
  return ['/applications/:application_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApplicationsApplicationIdQueryOptions(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApplicationsApplicationIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].$get(args, clientOptions)),
  }
}

/**
 * PATCH /applications/{application_id}
 */
export function usePatchApplicationsApplicationId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['$patch']>,
    ) => parseResponse(client.applications[':application_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}/activity-instances/{instance_id}
 */
export function useGetApplicationsApplicationIdActivityInstancesInstanceId(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.applications[':application_id']['activity-instances'][':instance_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/activity-instances/{instance_id}
 */
export function getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
) {
  return ['/applications/:application_id/activity-instances/:instance_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/activity-instances/{instance_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryOptions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id']['activity-instances'][':instance_id'].$get(
          args,
          clientOptions,
        ),
      ),
  }
}

/**
 * POST /applications/{application_id}/attachment
 */
export function usePostApplicationsApplicationIdAttachment(options?: {
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
  return useMutation({
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
export function useGetApplicationsApplicationIdCommands(
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
      placeholderData?:
        | InferResponseType<(typeof client.applications)[':application_id']['commands']['$get']>
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['commands']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.applications)[':application_id']['commands']['$get']>
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['commands']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdCommandsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.applications[':application_id'].commands.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/commands
 */
export function getGetApplicationsApplicationIdCommandsQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
) {
  return ['/applications/:application_id/commands', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/commands
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApplicationsApplicationIdCommandsQueryOptions(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApplicationsApplicationIdCommandsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].commands.$get(args, clientOptions)),
  }
}

/**
 * PUT /applications/{application_id}/commands
 */
export function usePutApplicationsApplicationIdCommands(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>,
    ) => parseResponse(client.applications[':application_id'].commands.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /applications/{application_id}/commands
 */
export function usePostApplicationsApplicationIdCommands(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>,
    ) => parseResponse(client.applications[':application_id'].commands.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}/commands/{command_id}
 */
export function useGetApplicationsApplicationIdCommandsCommandId(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdCommandsCommandIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/commands/{command_id}
 */
export function getGetApplicationsApplicationIdCommandsCommandIdQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
) {
  return ['/applications/:application_id/commands/:command_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/commands/{command_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApplicationsApplicationIdCommandsCommandIdQueryOptions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApplicationsApplicationIdCommandsCommandIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$get(args, clientOptions),
      ),
  }
}

/**
 * DELETE /applications/{application_id}/commands/{command_id}
 */
export function useDeleteApplicationsApplicationIdCommandsCommandId(options?: {
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
  return useMutation({
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
export function usePatchApplicationsApplicationIdCommandsCommandId(options?: {
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
  return useMutation({
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
export function useGetApplicationsApplicationIdEmojis(
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
      placeholderData?:
        | InferResponseType<(typeof client.applications)[':application_id']['emojis']['$get']>
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['emojis']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.applications)[':application_id']['emojis']['$get']>
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['emojis']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdEmojisQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.applications[':application_id'].emojis.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/emojis
 */
export function getGetApplicationsApplicationIdEmojisQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
) {
  return ['/applications/:application_id/emojis', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/emojis
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApplicationsApplicationIdEmojisQueryOptions(
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApplicationsApplicationIdEmojisQueryKey(args),
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].emojis.$get(args, clientOptions)),
  }
}

/**
 * POST /applications/{application_id}/emojis
 */
export function usePostApplicationsApplicationIdEmojis(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>,
    ) => parseResponse(client.applications[':application_id'].emojis.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /applications/{application_id}/emojis/{emoji_id}
 */
export function useGetApplicationsApplicationIdEmojisEmojiId(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdEmojisEmojiIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/emojis/{emoji_id}
 */
export function getGetApplicationsApplicationIdEmojisEmojiIdQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
) {
  return ['/applications/:application_id/emojis/:emoji_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/emojis/{emoji_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApplicationsApplicationIdEmojisEmojiIdQueryOptions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApplicationsApplicationIdEmojisEmojiIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$get(args, clientOptions),
      ),
  }
}

/**
 * DELETE /applications/{application_id}/emojis/{emoji_id}
 */
export function useDeleteApplicationsApplicationIdEmojisEmojiId(options?: {
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
  return useMutation({
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
export function usePatchApplicationsApplicationIdEmojisEmojiId(options?: {
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
  return useMutation({
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
export function useGetApplicationsApplicationIdEntitlements(
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
      placeholderData?:
        | InferResponseType<(typeof client.applications)[':application_id']['entitlements']['$get']>
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['entitlements']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.applications)[':application_id']['entitlements']['$get']>
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['entitlements']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdEntitlementsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.applications[':application_id'].entitlements.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/entitlements
 */
export function getGetApplicationsApplicationIdEntitlementsQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
) {
  return ['/applications/:application_id/entitlements', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/entitlements
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApplicationsApplicationIdEntitlementsQueryOptions(
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApplicationsApplicationIdEntitlementsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].entitlements.$get(args, clientOptions)),
  }
}

/**
 * POST /applications/{application_id}/entitlements
 */
export function usePostApplicationsApplicationIdEntitlements(options?: {
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
  return useMutation({
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
export function useGetApplicationsApplicationIdEntitlementsEntitlementId(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.applications[':application_id'].entitlements[':entitlement_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/entitlements/{entitlement_id}
 */
export function getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
) {
  return ['/applications/:application_id/entitlements/:entitlement_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/entitlements/{entitlement_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryOptions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].entitlements[':entitlement_id'].$get(
          args,
          clientOptions,
        ),
      ),
  }
}

/**
 * DELETE /applications/{application_id}/entitlements/{entitlement_id}
 */
export function useDeleteApplicationsApplicationIdEntitlementsEntitlementId(options?: {
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
  return useMutation({
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
export function usePostApplicationsApplicationIdEntitlementsEntitlementIdConsume(options?: {
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
  return useMutation({
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
export function useGetApplicationsApplicationIdGuildsGuildIdCommands(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
) {
  return ['/applications/:application_id/guilds/:guild_id/commands', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryOptions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.$get(
          args,
          clientOptions,
        ),
      ),
  }
}

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands
 */
export function usePutApplicationsApplicationIdGuildsGuildIdCommands(options?: {
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
  return useMutation({
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
export function usePostApplicationsApplicationIdGuildsGuildIdCommands(options?: {
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
  return useMutation({
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
export function useGetApplicationsApplicationIdGuildsGuildIdCommandsPermissions(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.permissions.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
) {
  return ['/applications/:application_id/guilds/:guild_id/commands/permissions', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryOptions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands.permissions.$get(
          args,
          clientOptions,
        ),
      ),
  }
}

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function useGetApplicationsApplicationIdGuildsGuildIdCommandsCommandId(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$get(
          args,
          { ...clientOptions, init: { ...clientOptions?.init, ...(signal ? { signal } : {}) } },
        ),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
) {
  return ['/applications/:application_id/guilds/:guild_id/commands/:command_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryOptions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$get(
          args,
          clientOptions,
        ),
      ),
  }
}

/**
 * DELETE /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function useDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
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
  return useMutation({
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
export function usePatchApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
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
  return useMutation({
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
export function useGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey:
      getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[
          ':command_id'
        ].permissions.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
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
 * Returns TanStack Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryOptions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey:
      getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[
          ':command_id'
        ].permissions.$get(args, clientOptions),
      ),
  }
}

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 */
export function usePutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(options?: {
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
  return useMutation({
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
export function useGetApplicationsApplicationIdRoleConnectionsMetadata(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
          >
        | (() => InferResponseType<
            (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdRoleConnectionsMetadataQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.applications[':application_id']['role-connections'].metadata.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/role-connections/metadata
 */
export function getGetApplicationsApplicationIdRoleConnectionsMetadataQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
) {
  return ['/applications/:application_id/role-connections/metadata', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/role-connections/metadata
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetApplicationsApplicationIdRoleConnectionsMetadataQueryOptions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetApplicationsApplicationIdRoleConnectionsMetadataQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id']['role-connections'].metadata.$get(
          args,
          clientOptions,
        ),
      ),
  }
}

/**
 * PUT /applications/{application_id}/role-connections/metadata
 */
export function usePutApplicationsApplicationIdRoleConnectionsMetadata(options?: {
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
  return useMutation({
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
export function useGetChannelsChannelId(
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
      placeholderData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['$get']>
        | (() => InferResponseType<(typeof client.channels)[':channel_id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['$get']>
        | (() => InferResponseType<(typeof client.channels)[':channel_id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.channels[':channel_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}
 */
export function getGetChannelsChannelIdQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
) {
  return ['/channels/:channel_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChannelsChannelIdQueryOptions(
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChannelsChannelIdQueryKey(args),
    queryFn: async () => parseResponse(client.channels[':channel_id'].$get(args, clientOptions)),
  }
}

/**
 * DELETE /channels/{channel_id}
 */
export function useDeleteChannelsChannelId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['$delete']>,
    ) => parseResponse(client.channels[':channel_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /channels/{channel_id}
 */
export function usePatchChannelsChannelId(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.channels)[':channel_id']['$patch']>) =>
      parseResponse(client.channels[':channel_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /channels/{channel_id}/followers
 */
export function usePostChannelsChannelIdFollowers(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].followers.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}/invites
 */
export function useGetChannelsChannelIdInvites(
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
      placeholderData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['invites']['$get']>
        | (() => InferResponseType<(typeof client.channels)[':channel_id']['invites']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['invites']['$get']>
        | (() => InferResponseType<(typeof client.channels)[':channel_id']['invites']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdInvitesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.channels[':channel_id'].invites.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/invites
 */
export function getGetChannelsChannelIdInvitesQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
) {
  return ['/channels/:channel_id/invites', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/invites
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChannelsChannelIdInvitesQueryOptions(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChannelsChannelIdInvitesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].invites.$get(args, clientOptions)),
  }
}

/**
 * POST /channels/{channel_id}/invites
 */
export function usePostChannelsChannelIdInvites(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].invites.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}/messages
 */
export function useGetChannelsChannelIdMessages(
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
      placeholderData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['messages']['$get']>
        | (() => InferResponseType<(typeof client.channels)[':channel_id']['messages']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['messages']['$get']>
        | (() => InferResponseType<(typeof client.channels)[':channel_id']['messages']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdMessagesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.channels[':channel_id'].messages.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages
 */
export function getGetChannelsChannelIdMessagesQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
) {
  return ['/channels/:channel_id/messages', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/messages
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChannelsChannelIdMessagesQueryOptions(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChannelsChannelIdMessagesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].messages.$get(args, clientOptions)),
  }
}

/**
 * POST /channels/{channel_id}/messages
 */
export function usePostChannelsChannelIdMessages(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].messages.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /channels/{channel_id}/messages/bulk-delete
 */
export function usePostChannelsChannelIdMessagesBulkDelete(options?: {
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
  return useMutation({
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
export function useGetChannelsChannelIdMessagesPins(
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
      placeholderData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['messages']['pins']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['messages']['pins']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdMessagesPinsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.channels[':channel_id'].messages.pins.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages/pins
 */
export function getGetChannelsChannelIdMessagesPinsQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
) {
  return ['/channels/:channel_id/messages/pins', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/messages/pins
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChannelsChannelIdMessagesPinsQueryOptions(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChannelsChannelIdMessagesPinsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].messages.pins.$get(args, clientOptions)),
  }
}

/**
 * PUT /channels/{channel_id}/messages/pins/{message_id}
 */
export function usePutChannelsChannelIdMessagesPinsMessageId(options?: {
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
  return useMutation({
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
export function useDeleteChannelsChannelIdMessagesPinsMessageId(options?: {
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
  return useMutation({
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
export function useGetChannelsChannelIdMessagesMessageId(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdMessagesMessageIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages/{message_id}
 */
export function getGetChannelsChannelIdMessagesMessageIdQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
) {
  return ['/channels/:channel_id/messages/:message_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/messages/{message_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChannelsChannelIdMessagesMessageIdQueryOptions(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChannelsChannelIdMessagesMessageIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$get(args, clientOptions),
      ),
  }
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesMessageId(options?: {
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
  return useMutation({
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
export function usePatchChannelsChannelIdMessagesMessageId(options?: {
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
  return useMutation({
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
export function usePostChannelsChannelIdMessagesMessageIdCrosspost(options?: {
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
  return useMutation({
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
export function useDeleteChannelsChannelIdMessagesMessageIdReactions(options?: {
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
  return useMutation({
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
export function useGetChannelsChannelIdMessagesMessageIdReactionsEmojiName(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
          >
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
          >
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 */
export function getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
) {
  return ['/channels/:channel_id/messages/:message_id/reactions/:emoji_name', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryOptions(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$get(
          args,
          clientOptions,
        ),
      ),
  }
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiName(options?: {
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
  return useMutation({
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
export function usePutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
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
  return useMutation({
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
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
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
  return useMutation({
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
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId(options?: {
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
  return useMutation({
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
export function usePostChannelsChannelIdMessagesMessageIdThreads(options?: {
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
  return useMutation({
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
export function usePutChannelsChannelIdPermissionsOverwriteId(options?: {
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
  return useMutation({
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
export function useDeleteChannelsChannelIdPermissionsOverwriteId(options?: {
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
  return useMutation({
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
export function useGetChannelsChannelIdPins(
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
      placeholderData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['pins']['$get']>
        | (() => InferResponseType<(typeof client.channels)[':channel_id']['pins']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['pins']['$get']>
        | (() => InferResponseType<(typeof client.channels)[':channel_id']['pins']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdPinsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.channels[':channel_id'].pins.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/pins
 */
export function getGetChannelsChannelIdPinsQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
) {
  return ['/channels/:channel_id/pins', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/pins
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChannelsChannelIdPinsQueryOptions(
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChannelsChannelIdPinsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].pins.$get(args, clientOptions)),
  }
}

/**
 * PUT /channels/{channel_id}/pins/{message_id}
 */
export function usePutChannelsChannelIdPinsMessageId(options?: {
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
  return useMutation({
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
export function useDeleteChannelsChannelIdPinsMessageId(options?: {
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
  return useMutation({
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
export function useGetChannelsChannelIdPollsMessageIdAnswersAnswerId(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.channels[':channel_id'].polls[':message_id'].answers[':answer_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 */
export function getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
) {
  return ['/channels/:channel_id/polls/:message_id/answers/:answer_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryOptions(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].polls[':message_id'].answers[':answer_id'].$get(
          args,
          clientOptions,
        ),
      ),
  }
}

/**
 * POST /channels/{channel_id}/polls/{message_id}/expire
 */
export function usePostChannelsChannelIdPollsMessageIdExpire(options?: {
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
  return useMutation({
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
export function usePutChannelsChannelIdRecipientsUserId(options?: {
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
  return useMutation({
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
export function useDeleteChannelsChannelIdRecipientsUserId(options?: {
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
  return useMutation({
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
export function usePostChannelsChannelIdSendSoundboardSound(options?: {
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
  return useMutation({
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
export function useGetChannelsChannelIdThreadMembers(
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
      placeholderData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['$get']>
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['thread-members']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['thread-members']['$get']>
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['thread-members']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdThreadMembersQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.channels[':channel_id']['thread-members'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/thread-members
 */
export function getGetChannelsChannelIdThreadMembersQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
) {
  return ['/channels/:channel_id/thread-members', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/thread-members
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChannelsChannelIdThreadMembersQueryOptions(
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChannelsChannelIdThreadMembersQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id']['thread-members'].$get(args, clientOptions)),
  }
}

/**
 * PUT /channels/{channel_id}/thread-members/@me
 */
export function usePutChannelsChannelIdThreadMembersMe(options?: {
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
  return useMutation({
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
export function useDeleteChannelsChannelIdThreadMembersMe(options?: {
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
  return useMutation({
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
export function useGetChannelsChannelIdThreadMembersUserId(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdThreadMembersUserIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/thread-members/{user_id}
 */
export function getGetChannelsChannelIdThreadMembersUserIdQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
) {
  return ['/channels/:channel_id/thread-members/:user_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/thread-members/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChannelsChannelIdThreadMembersUserIdQueryOptions(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChannelsChannelIdThreadMembersUserIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$get(args, clientOptions),
      ),
  }
}

/**
 * PUT /channels/{channel_id}/thread-members/{user_id}
 */
export function usePutChannelsChannelIdThreadMembersUserId(options?: {
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
  return useMutation({
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
export function useDeleteChannelsChannelIdThreadMembersUserId(options?: {
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
  return useMutation({
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
export function usePostChannelsChannelIdThreads(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].threads.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}/threads/archived/private
 */
export function useGetChannelsChannelIdThreadsArchivedPrivate(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
          >
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
          >
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdThreadsArchivedPrivateQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.channels[':channel_id'].threads.archived.private.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/threads/archived/private
 */
export function getGetChannelsChannelIdThreadsArchivedPrivateQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
) {
  return ['/channels/:channel_id/threads/archived/private', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/threads/archived/private
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChannelsChannelIdThreadsArchivedPrivateQueryOptions(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChannelsChannelIdThreadsArchivedPrivateQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].threads.archived.private.$get(args, clientOptions),
      ),
  }
}

/**
 * GET /channels/{channel_id}/threads/archived/public
 */
export function useGetChannelsChannelIdThreadsArchivedPublic(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
          >
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
          >
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdThreadsArchivedPublicQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.channels[':channel_id'].threads.archived.public.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/threads/archived/public
 */
export function getGetChannelsChannelIdThreadsArchivedPublicQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
) {
  return ['/channels/:channel_id/threads/archived/public', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/threads/archived/public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChannelsChannelIdThreadsArchivedPublicQueryOptions(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChannelsChannelIdThreadsArchivedPublicQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].threads.archived.public.$get(args, clientOptions),
      ),
  }
}

/**
 * GET /channels/{channel_id}/threads/search
 */
export function useGetChannelsChannelIdThreadsSearch(
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
      placeholderData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['threads']['search']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['threads']['search']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdThreadsSearchQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.channels[':channel_id'].threads.search.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/threads/search
 */
export function getGetChannelsChannelIdThreadsSearchQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
) {
  return ['/channels/:channel_id/threads/search', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/threads/search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChannelsChannelIdThreadsSearchQueryOptions(
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChannelsChannelIdThreadsSearchQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].threads.search.$get(args, clientOptions)),
  }
}

/**
 * POST /channels/{channel_id}/typing
 */
export function usePostChannelsChannelIdTyping(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].typing.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /channels/{channel_id}/users/@me/threads/archived/private
 */
export function useGetChannelsChannelIdUsersMeThreadsArchivedPrivate(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
          >
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
          >
        | (() => InferResponseType<
            (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.channels[':channel_id'].users['@me'].threads.archived.private.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/users/@me/threads/archived/private
 */
export function getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
) {
  return ['/channels/:channel_id/users/@me/threads/archived/private', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/users/@me/threads/archived/private
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryOptions(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].users['@me'].threads.archived.private.$get(
          args,
          clientOptions,
        ),
      ),
  }
}

/**
 * GET /channels/{channel_id}/webhooks
 */
export function useGetChannelsChannelIdWebhooks(
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
      placeholderData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$get']>
        | (() => InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$get']>
        | (() => InferResponseType<(typeof client.channels)[':channel_id']['webhooks']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdWebhooksQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.channels[':channel_id'].webhooks.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/webhooks
 */
export function getGetChannelsChannelIdWebhooksQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
) {
  return ['/channels/:channel_id/webhooks', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/webhooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetChannelsChannelIdWebhooksQueryOptions(
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetChannelsChannelIdWebhooksQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].webhooks.$get(args, clientOptions)),
  }
}

/**
 * POST /channels/{channel_id}/webhooks
 */
export function usePostChannelsChannelIdWebhooks(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].webhooks.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /gateway
 */
export function useGetGateway(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.gateway.$get>
      | (() => InferResponseType<typeof client.gateway.$get>)
    initialData?:
      | InferResponseType<typeof client.gateway.$get>
      | (() => InferResponseType<typeof client.gateway.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGatewayQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.gateway.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /gateway
 */
export function getGetGatewayQueryKey() {
  return ['/gateway'] as const
}

/**
 * Returns TanStack Query query options for GET /gateway
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGatewayQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetGatewayQueryKey(),
    queryFn: async () => parseResponse(client.gateway.$get(undefined, clientOptions)),
  }
}

/**
 * GET /gateway/bot
 */
export function useGetGatewayBot(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.gateway.bot.$get>
      | (() => InferResponseType<typeof client.gateway.bot.$get>)
    initialData?:
      | InferResponseType<typeof client.gateway.bot.$get>
      | (() => InferResponseType<typeof client.gateway.bot.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGatewayBotQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.gateway.bot.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /gateway/bot
 */
export function getGetGatewayBotQueryKey() {
  return ['/gateway/bot'] as const
}

/**
 * Returns TanStack Query query options for GET /gateway/bot
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGatewayBotQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetGatewayBotQueryKey(),
    queryFn: async () => parseResponse(client.gateway.bot.$get(undefined, clientOptions)),
  }
}

/**
 * GET /guilds/templates/{code}
 */
export function useGetGuildsTemplatesCode(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds.templates)[':code']['$get']>
        | (() => InferResponseType<(typeof client.guilds.templates)[':code']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds.templates)[':code']['$get']>
        | (() => InferResponseType<(typeof client.guilds.templates)[':code']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsTemplatesCodeQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds.templates[':code'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/templates/{code}
 */
export function getGetGuildsTemplatesCodeQueryKey(
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
) {
  return ['/guilds/templates/:code', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/templates/{code}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsTemplatesCodeQueryOptions(
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsTemplatesCodeQueryKey(args),
    queryFn: async () => parseResponse(client.guilds.templates[':code'].$get(args, clientOptions)),
  }
}

/**
 * GET /guilds/{guild_id}
 */
export function useGetGuildsGuildId(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}
 */
export function getGetGuildsGuildIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
) {
  return ['/guilds/:guild_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].$get(args, clientOptions)),
  }
}

/**
 * PATCH /guilds/{guild_id}
 */
export function usePatchGuildsGuildId(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>) =>
      parseResponse(client.guilds[':guild_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/audit-logs
 */
export function useGetGuildsGuildIdAuditLogs(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdAuditLogsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['audit-logs'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/audit-logs
 */
export function getGetGuildsGuildIdAuditLogsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
) {
  return ['/guilds/:guild_id/audit-logs', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/audit-logs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdAuditLogsQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdAuditLogsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['audit-logs'].$get(args, clientOptions)),
  }
}

/**
 * GET /guilds/{guild_id}/auto-moderation/rules
 */
export function useGetGuildsGuildIdAutoModerationRules(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdAutoModerationRulesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/auto-moderation/rules
 */
export function getGetGuildsGuildIdAutoModerationRulesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
) {
  return ['/guilds/:guild_id/auto-moderation/rules', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/auto-moderation/rules
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdAutoModerationRulesQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdAutoModerationRulesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['auto-moderation'].rules.$get(args, clientOptions)),
  }
}

/**
 * POST /guilds/{guild_id}/auto-moderation/rules
 */
export function usePostGuildsGuildIdAutoModerationRules(options?: {
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
  return useMutation({
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
export function useGetGuildsGuildIdAutoModerationRulesRuleId(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdAutoModerationRulesRuleIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function getGetGuildsGuildIdAutoModerationRulesRuleIdQueryKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
) {
  return ['/guilds/:guild_id/auto-moderation/rules/:rule_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdAutoModerationRulesRuleIdQueryOptions(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdAutoModerationRulesRuleIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$get(args, clientOptions),
      ),
  }
}

/**
 * DELETE /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function useDeleteGuildsGuildIdAutoModerationRulesRuleId(options?: {
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
  return useMutation({
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
export function usePatchGuildsGuildIdAutoModerationRulesRuleId(options?: {
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
  return useMutation({
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
export function useGetGuildsGuildIdBans(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['bans']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['bans']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['bans']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['bans']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdBansQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].bans.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/bans
 */
export function getGetGuildsGuildIdBansQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
) {
  return ['/guilds/:guild_id/bans', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/bans
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdBansQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdBansQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].bans.$get(args, clientOptions)),
  }
}

/**
 * GET /guilds/{guild_id}/bans/{user_id}
 */
export function useGetGuildsGuildIdBansUserId(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdBansUserIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].bans[':user_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/bans/{user_id}
 */
export function getGetGuildsGuildIdBansUserIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/bans/:user_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/bans/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdBansUserIdQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdBansUserIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].bans[':user_id'].$get(args, clientOptions)),
  }
}

/**
 * PUT /guilds/{guild_id}/bans/{user_id}
 */
export function usePutGuildsGuildIdBansUserId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].bans[':user_id'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /guilds/{guild_id}/bans/{user_id}
 */
export function useDeleteGuildsGuildIdBansUserId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].bans[':user_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /guilds/{guild_id}/bulk-ban
 */
export function usePostGuildsGuildIdBulkBan(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>,
    ) => parseResponse(client.guilds[':guild_id']['bulk-ban'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/channels
 */
export function useGetGuildsGuildIdChannels(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['channels']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdChannelsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].channels.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/channels
 */
export function getGetGuildsGuildIdChannelsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
) {
  return ['/guilds/:guild_id/channels', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/channels
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdChannelsQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdChannelsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].channels.$get(args, clientOptions)),
  }
}

/**
 * POST /guilds/{guild_id}/channels
 */
export function usePostGuildsGuildIdChannels(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].channels.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/channels
 */
export function usePatchGuildsGuildIdChannels(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].channels.$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/emojis
 */
export function useGetGuildsGuildIdEmojis(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['emojis']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdEmojisQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].emojis.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/emojis
 */
export function getGetGuildsGuildIdEmojisQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
) {
  return ['/guilds/:guild_id/emojis', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/emojis
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdEmojisQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdEmojisQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].emojis.$get(args, clientOptions)),
  }
}

/**
 * POST /guilds/{guild_id}/emojis
 */
export function usePostGuildsGuildIdEmojis(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].emojis.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useGetGuildsGuildIdEmojisEmojiId(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdEmojisEmojiIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].emojis[':emoji_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/emojis/{emoji_id}
 */
export function getGetGuildsGuildIdEmojisEmojiIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
) {
  return ['/guilds/:guild_id/emojis/:emoji_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/emojis/{emoji_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdEmojisEmojiIdQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdEmojisEmojiIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$get(args, clientOptions)),
  }
}

/**
 * DELETE /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useDeleteGuildsGuildIdEmojisEmojiId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/emojis/{emoji_id}
 */
export function usePatchGuildsGuildIdEmojisEmojiId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/integrations
 */
export function useGetGuildsGuildIdIntegrations(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['integrations']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['integrations']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['integrations']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['integrations']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdIntegrationsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].integrations.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/integrations
 */
export function getGetGuildsGuildIdIntegrationsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
) {
  return ['/guilds/:guild_id/integrations', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/integrations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdIntegrationsQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdIntegrationsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].integrations.$get(args, clientOptions)),
  }
}

/**
 * DELETE /guilds/{guild_id}/integrations/{integration_id}
 */
export function useDeleteGuildsGuildIdIntegrationsIntegrationId(options?: {
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
  return useMutation({
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
export function useGetGuildsGuildIdInvites(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['invites']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['invites']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['invites']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['invites']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdInvitesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].invites.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/invites
 */
export function getGetGuildsGuildIdInvitesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
) {
  return ['/guilds/:guild_id/invites', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/invites
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdInvitesQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdInvitesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].invites.$get(args, clientOptions)),
  }
}

/**
 * GET /guilds/{guild_id}/members
 */
export function useGetGuildsGuildIdMembers(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['members']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['members']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['members']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['members']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdMembersQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].members.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/members
 */
export function getGetGuildsGuildIdMembersQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
) {
  return ['/guilds/:guild_id/members', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/members
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdMembersQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdMembersQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].members.$get(args, clientOptions)),
  }
}

/**
 * PATCH /guilds/{guild_id}/members/@me
 */
export function usePatchGuildsGuildIdMembersMe(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].members['@me'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/members/search
 */
export function useGetGuildsGuildIdMembersSearch(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['members']['search']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['members']['search']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdMembersSearchQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].members.search.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/members/search
 */
export function getGetGuildsGuildIdMembersSearchQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
) {
  return ['/guilds/:guild_id/members/search', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/members/search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdMembersSearchQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdMembersSearchQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].members.search.$get(args, clientOptions)),
  }
}

/**
 * GET /guilds/{guild_id}/members/{user_id}
 */
export function useGetGuildsGuildIdMembersUserId(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['members'][':user_id']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['members'][':user_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdMembersUserIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].members[':user_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/members/{user_id}
 */
export function getGetGuildsGuildIdMembersUserIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/members/:user_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/members/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdMembersUserIdQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdMembersUserIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].members[':user_id'].$get(args, clientOptions)),
  }
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}
 */
export function usePutGuildsGuildIdMembersUserId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}
 */
export function useDeleteGuildsGuildIdMembersUserId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/members/{user_id}
 */
export function usePatchGuildsGuildIdMembersUserId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function usePutGuildsGuildIdMembersUserIdRolesRoleId(options?: {
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
  return useMutation({
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
export function useDeleteGuildsGuildIdMembersUserIdRolesRoleId(options?: {
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
  return useMutation({
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
 * GET /guilds/{guild_id}/messages/search
 */
export function useGetGuildsGuildIdMessagesSearch(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['messages']['search']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['messages']['search']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdMessagesSearchQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].messages.search.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/messages/search
 */
export function getGetGuildsGuildIdMessagesSearchQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
) {
  return ['/guilds/:guild_id/messages/search', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/messages/search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdMessagesSearchQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdMessagesSearchQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].messages.search.$get(args, clientOptions)),
  }
}

/**
 * GET /guilds/{guild_id}/new-member-welcome
 */
export function useGetGuildsGuildIdNewMemberWelcome(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['new-member-welcome']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['new-member-welcome']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdNewMemberWelcomeQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['new-member-welcome'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/new-member-welcome
 */
export function getGetGuildsGuildIdNewMemberWelcomeQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
) {
  return ['/guilds/:guild_id/new-member-welcome', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/new-member-welcome
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdNewMemberWelcomeQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdNewMemberWelcomeQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['new-member-welcome'].$get(args, clientOptions)),
  }
}

/**
 * GET /guilds/{guild_id}/onboarding
 */
export function useGetGuildsGuildIdOnboarding(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdOnboardingQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].onboarding.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/onboarding
 */
export function getGetGuildsGuildIdOnboardingQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
) {
  return ['/guilds/:guild_id/onboarding', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/onboarding
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdOnboardingQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdOnboardingQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].onboarding.$get(args, clientOptions)),
  }
}

/**
 * PUT /guilds/{guild_id}/onboarding
 */
export function usePutGuildsGuildIdOnboarding(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].onboarding.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/preview
 */
export function useGetGuildsGuildIdPreview(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['preview']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['preview']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['preview']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['preview']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdPreviewQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].preview.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/preview
 */
export function getGetGuildsGuildIdPreviewQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
) {
  return ['/guilds/:guild_id/preview', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/preview
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdPreviewQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdPreviewQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].preview.$get(args, clientOptions)),
  }
}

/**
 * GET /guilds/{guild_id}/prune
 */
export function useGetGuildsGuildIdPrune(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['prune']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdPruneQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].prune.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/prune
 */
export function getGetGuildsGuildIdPruneQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
) {
  return ['/guilds/:guild_id/prune', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/prune
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdPruneQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdPruneQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].prune.$get(args, clientOptions)),
  }
}

/**
 * POST /guilds/{guild_id}/prune
 */
export function usePostGuildsGuildIdPrune(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].prune.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/regions
 */
export function useGetGuildsGuildIdRegions(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['regions']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['regions']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['regions']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['regions']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdRegionsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].regions.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/regions
 */
export function getGetGuildsGuildIdRegionsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
) {
  return ['/guilds/:guild_id/regions', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/regions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdRegionsQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdRegionsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].regions.$get(args, clientOptions)),
  }
}

/**
 * GET /guilds/{guild_id}/roles
 */
export function useGetGuildsGuildIdRoles(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['roles']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdRolesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].roles.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/roles
 */
export function getGetGuildsGuildIdRolesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
) {
  return ['/guilds/:guild_id/roles', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/roles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdRolesQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdRolesQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].roles.$get(args, clientOptions)),
  }
}

/**
 * POST /guilds/{guild_id}/roles
 */
export function usePostGuildsGuildIdRoles(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].roles.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/roles
 */
export function usePatchGuildsGuildIdRoles(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].roles.$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/roles/member-counts
 */
export function useGetGuildsGuildIdRolesMemberCounts(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdRolesMemberCountsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].roles['member-counts'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/roles/member-counts
 */
export function getGetGuildsGuildIdRolesMemberCountsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
) {
  return ['/guilds/:guild_id/roles/member-counts', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/roles/member-counts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdRolesMemberCountsQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdRolesMemberCountsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].roles['member-counts'].$get(args, clientOptions)),
  }
}

/**
 * GET /guilds/{guild_id}/roles/{role_id}
 */
export function useGetGuildsGuildIdRolesRoleId(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdRolesRoleIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].roles[':role_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/roles/{role_id}
 */
export function getGetGuildsGuildIdRolesRoleIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
) {
  return ['/guilds/:guild_id/roles/:role_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/roles/{role_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdRolesRoleIdQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdRolesRoleIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].roles[':role_id'].$get(args, clientOptions)),
  }
}

/**
 * DELETE /guilds/{guild_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdRolesRoleId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].roles[':role_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/roles/{role_id}
 */
export function usePatchGuildsGuildIdRolesRoleId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].roles[':role_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/scheduled-events
 */
export function useGetGuildsGuildIdScheduledEvents(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdScheduledEventsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/scheduled-events
 */
export function getGetGuildsGuildIdScheduledEventsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
) {
  return ['/guilds/:guild_id/scheduled-events', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/scheduled-events
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdScheduledEventsQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdScheduledEventsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['scheduled-events'].$get(args, clientOptions)),
  }
}

/**
 * POST /guilds/{guild_id}/scheduled-events
 */
export function usePostGuildsGuildIdScheduledEvents(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>,
    ) => parseResponse(client.guilds[':guild_id']['scheduled-events'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function useGetGuildsGuildIdScheduledEventsGuildScheduledEventId(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
) {
  return ['/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryOptions(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$get(
          args,
          clientOptions,
        ),
      ),
  }
}

/**
 * DELETE /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function useDeleteGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
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
  return useMutation({
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
export function usePatchGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
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
  return useMutation({
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
export function useGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
          >
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
          >
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].users.$get(
          args,
          { ...clientOptions, init: { ...clientOptions?.init, ...(signal ? { signal } : {}) } },
        ),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
) {
  return ['/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryOptions(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].users.$get(
          args,
          clientOptions,
        ),
      ),
  }
}

/**
 * GET /guilds/{guild_id}/soundboard-sounds
 */
export function useGetGuildsGuildIdSoundboardSounds(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdSoundboardSoundsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/soundboard-sounds
 */
export function getGetGuildsGuildIdSoundboardSoundsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
) {
  return ['/guilds/:guild_id/soundboard-sounds', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/soundboard-sounds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdSoundboardSoundsQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdSoundboardSoundsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$get(args, clientOptions)),
  }
}

/**
 * POST /guilds/{guild_id}/soundboard-sounds
 */
export function usePostGuildsGuildIdSoundboardSounds(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>,
    ) => parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function useGetGuildsGuildIdSoundboardSoundsSoundId(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdSoundboardSoundsSoundIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function getGetGuildsGuildIdSoundboardSoundsSoundIdQueryKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
) {
  return ['/guilds/:guild_id/soundboard-sounds/:sound_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdSoundboardSoundsSoundIdQueryOptions(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdSoundboardSoundsSoundIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$get(args, clientOptions),
      ),
  }
}

/**
 * DELETE /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function useDeleteGuildsGuildIdSoundboardSoundsSoundId(options?: {
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
  return useMutation({
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
export function usePatchGuildsGuildIdSoundboardSoundsSoundId(options?: {
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
  return useMutation({
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
export function useGetGuildsGuildIdStickers(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['stickers']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdStickersQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].stickers.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/stickers
 */
export function getGetGuildsGuildIdStickersQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
) {
  return ['/guilds/:guild_id/stickers', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/stickers
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdStickersQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdStickersQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].stickers.$get(args, clientOptions)),
  }
}

/**
 * POST /guilds/{guild_id}/stickers
 */
export function usePostGuildsGuildIdStickers(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].stickers.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useGetGuildsGuildIdStickersStickerId(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdStickersStickerIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].stickers[':sticker_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/stickers/{sticker_id}
 */
export function getGetGuildsGuildIdStickersStickerIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
) {
  return ['/guilds/:guild_id/stickers/:sticker_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/stickers/{sticker_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdStickersStickerIdQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdStickersStickerIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].stickers[':sticker_id'].$get(args, clientOptions)),
  }
}

/**
 * DELETE /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useDeleteGuildsGuildIdStickersStickerId(options?: {
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
  return useMutation({
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
export function usePatchGuildsGuildIdStickersStickerId(options?: {
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
  return useMutation({
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
export function useGetGuildsGuildIdTemplates(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['templates']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdTemplatesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].templates.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/templates
 */
export function getGetGuildsGuildIdTemplatesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
) {
  return ['/guilds/:guild_id/templates', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/templates
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdTemplatesQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdTemplatesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].templates.$get(args, clientOptions)),
  }
}

/**
 * POST /guilds/{guild_id}/templates
 */
export function usePostGuildsGuildIdTemplates(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].templates.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PUT /guilds/{guild_id}/templates/{code}
 */
export function usePutGuildsGuildIdTemplatesCode(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /guilds/{guild_id}/templates/{code}
 */
export function useDeleteGuildsGuildIdTemplatesCode(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /guilds/{guild_id}/templates/{code}
 */
export function usePatchGuildsGuildIdTemplatesCode(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/threads/active
 */
export function useGetGuildsGuildIdThreadsActive(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['threads']['active']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['threads']['active']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdThreadsActiveQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].threads.active.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/threads/active
 */
export function getGetGuildsGuildIdThreadsActiveQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
) {
  return ['/guilds/:guild_id/threads/active', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/threads/active
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdThreadsActiveQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdThreadsActiveQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].threads.active.$get(args, clientOptions)),
  }
}

/**
 * GET /guilds/{guild_id}/vanity-url
 */
export function useGetGuildsGuildIdVanityUrl(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdVanityUrlQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['vanity-url'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/vanity-url
 */
export function getGetGuildsGuildIdVanityUrlQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
) {
  return ['/guilds/:guild_id/vanity-url', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/vanity-url
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdVanityUrlQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdVanityUrlQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['vanity-url'].$get(args, clientOptions)),
  }
}

/**
 * GET /guilds/{guild_id}/voice-states/@me
 */
export function useGetGuildsGuildIdVoiceStatesMe(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdVoiceStatesMeQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['voice-states']['@me'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/voice-states/@me
 */
export function getGetGuildsGuildIdVoiceStatesMeQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
) {
  return ['/guilds/:guild_id/voice-states/@me', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/voice-states/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdVoiceStatesMeQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdVoiceStatesMeQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$get(args, clientOptions)),
  }
}

/**
 * PATCH /guilds/{guild_id}/voice-states/@me
 */
export function usePatchGuildsGuildIdVoiceStatesMe(options?: {
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
  return useMutation({
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
export function useGetGuildsGuildIdVoiceStatesUserId(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>
        | (() => InferResponseType<
            (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdVoiceStatesUserIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['voice-states'][':user_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/voice-states/{user_id}
 */
export function getGetGuildsGuildIdVoiceStatesUserIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
) {
  return ['/guilds/:guild_id/voice-states/:user_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/voice-states/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdVoiceStatesUserIdQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdVoiceStatesUserIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['voice-states'][':user_id'].$get(args, clientOptions),
      ),
  }
}

/**
 * PATCH /guilds/{guild_id}/voice-states/{user_id}
 */
export function usePatchGuildsGuildIdVoiceStatesUserId(options?: {
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
  return useMutation({
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
export function useGetGuildsGuildIdWebhooks(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdWebhooksQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].webhooks.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/webhooks
 */
export function getGetGuildsGuildIdWebhooksQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
) {
  return ['/guilds/:guild_id/webhooks', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/webhooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdWebhooksQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdWebhooksQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].webhooks.$get(args, clientOptions)),
  }
}

/**
 * GET /guilds/{guild_id}/welcome-screen
 */
export function useGetGuildsGuildIdWelcomeScreen(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdWelcomeScreenQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['welcome-screen'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/welcome-screen
 */
export function getGetGuildsGuildIdWelcomeScreenQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
) {
  return ['/guilds/:guild_id/welcome-screen', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/welcome-screen
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdWelcomeScreenQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdWelcomeScreenQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['welcome-screen'].$get(args, clientOptions)),
  }
}

/**
 * PATCH /guilds/{guild_id}/welcome-screen
 */
export function usePatchGuildsGuildIdWelcomeScreen(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id']['welcome-screen'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/widget
 */
export function useGetGuildsGuildIdWidget(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['widget']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdWidgetQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id'].widget.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/widget
 */
export function getGetGuildsGuildIdWidgetQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
) {
  return ['/guilds/:guild_id/widget', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/widget
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdWidgetQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdWidgetQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].widget.$get(args, clientOptions)),
  }
}

/**
 * PATCH /guilds/{guild_id}/widget
 */
export function usePatchGuildsGuildIdWidget(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].widget.$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /guilds/{guild_id}/widget.json
 */
export function useGetGuildsGuildIdWidgetJson(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdWidgetJsonQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['widget.json'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/widget.json
 */
export function getGetGuildsGuildIdWidgetJsonQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
) {
  return ['/guilds/:guild_id/widget.json', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/widget.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdWidgetJsonQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdWidgetJsonQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['widget.json'].$get(args, clientOptions)),
  }
}

/**
 * GET /guilds/{guild_id}/widget.png
 */
export function useGetGuildsGuildIdWidgetPng(
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
      placeholderData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>
        | (() => InferResponseType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdWidgetPngQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.guilds[':guild_id']['widget.png'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/widget.png
 */
export function getGetGuildsGuildIdWidgetPngQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
) {
  return ['/guilds/:guild_id/widget.png', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/widget.png
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetGuildsGuildIdWidgetPngQueryOptions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetGuildsGuildIdWidgetPngQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['widget.png'].$get(args, clientOptions)),
  }
}

/**
 * POST /interactions/{interaction_id}/{interaction_token}/callback
 */
export function usePostInteractionsInteractionIdInteractionTokenCallback(options?: {
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
  return useMutation({
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
export function useGetInvitesCode(
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
      placeholderData?:
        | InferResponseType<(typeof client.invites)[':code']['$get']>
        | (() => InferResponseType<(typeof client.invites)[':code']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.invites)[':code']['$get']>
        | (() => InferResponseType<(typeof client.invites)[':code']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetInvitesCodeQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.invites[':code'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /invites/{code}
 */
export function getGetInvitesCodeQueryKey(
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
) {
  return ['/invites/:code', args] as const
}

/**
 * Returns TanStack Query query options for GET /invites/{code}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetInvitesCodeQueryOptions(
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetInvitesCodeQueryKey(args),
    queryFn: async () => parseResponse(client.invites[':code'].$get(args, clientOptions)),
  }
}

/**
 * DELETE /invites/{code}
 */
export function useDeleteInvitesCode(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.invites)[':code']['$delete']>) =>
      parseResponse(client.invites[':code'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PUT /lobbies
 */
export function usePutLobbies(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.lobbies.$put>) =>
      parseResponse(client.lobbies.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /lobbies
 */
export function usePostLobbies(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.lobbies.$post>) =>
      parseResponse(client.lobbies.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /lobbies/{lobby_id}
 */
export function useGetLobbiesLobbyId(
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
      placeholderData?:
        | InferResponseType<(typeof client.lobbies)[':lobby_id']['$get']>
        | (() => InferResponseType<(typeof client.lobbies)[':lobby_id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.lobbies)[':lobby_id']['$get']>
        | (() => InferResponseType<(typeof client.lobbies)[':lobby_id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetLobbiesLobbyIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.lobbies[':lobby_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /lobbies/{lobby_id}
 */
export function getGetLobbiesLobbyIdQueryKey(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
) {
  return ['/lobbies/:lobby_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /lobbies/{lobby_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetLobbiesLobbyIdQueryOptions(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetLobbiesLobbyIdQueryKey(args),
    queryFn: async () => parseResponse(client.lobbies[':lobby_id'].$get(args, clientOptions)),
  }
}

/**
 * PATCH /lobbies/{lobby_id}
 */
export function usePatchLobbiesLobbyId(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>) =>
      parseResponse(client.lobbies[':lobby_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /lobbies/{lobby_id}/channel-linking
 */
export function usePatchLobbiesLobbyIdChannelLinking(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>,
    ) => parseResponse(client.lobbies[':lobby_id']['channel-linking'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /lobbies/{lobby_id}/members/@me
 */
export function useDeleteLobbiesLobbyIdMembersMe(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>,
    ) => parseResponse(client.lobbies[':lobby_id'].members['@me'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /lobbies/{lobby_id}/members/@me/invites
 */
export function usePostLobbiesLobbyIdMembersMeInvites(options?: {
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
  return useMutation({
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
export function usePostLobbiesLobbyIdMembersBulk(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>,
    ) => parseResponse(client.lobbies[':lobby_id'].members.bulk.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PUT /lobbies/{lobby_id}/members/{user_id}
 */
export function usePutLobbiesLobbyIdMembersUserId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>,
    ) => parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /lobbies/{lobby_id}/members/{user_id}
 */
export function useDeleteLobbiesLobbyIdMembersUserId(options?: {
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
  return useMutation({
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
export function usePostLobbiesLobbyIdMembersUserIdInvites(options?: {
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
  return useMutation({
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
export function useGetLobbiesLobbyIdMessages(
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
      placeholderData?:
        | InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>
        | (() => InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>
        | (() => InferResponseType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetLobbiesLobbyIdMessagesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.lobbies[':lobby_id'].messages.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /lobbies/{lobby_id}/messages
 */
export function getGetLobbiesLobbyIdMessagesQueryKey(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
) {
  return ['/lobbies/:lobby_id/messages', args] as const
}

/**
 * Returns TanStack Query query options for GET /lobbies/{lobby_id}/messages
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetLobbiesLobbyIdMessagesQueryOptions(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetLobbiesLobbyIdMessagesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.lobbies[':lobby_id'].messages.$get(args, clientOptions)),
  }
}

/**
 * POST /lobbies/{lobby_id}/messages
 */
export function usePostLobbiesLobbyIdMessages(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>,
    ) => parseResponse(client.lobbies[':lobby_id'].messages.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /oauth2/@me
 */
export function useGetOauth2Me(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client.oauth2)['@me']['$get']>
      | (() => InferResponseType<(typeof client.oauth2)['@me']['$get']>)
    initialData?:
      | InferResponseType<(typeof client.oauth2)['@me']['$get']>
      | (() => InferResponseType<(typeof client.oauth2)['@me']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOauth2MeQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.oauth2['@me'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /oauth2/@me
 */
export function getGetOauth2MeQueryKey() {
  return ['/oauth2/@me'] as const
}

/**
 * Returns TanStack Query query options for GET /oauth2/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOauth2MeQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetOauth2MeQueryKey(),
    queryFn: async () => parseResponse(client.oauth2['@me'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /oauth2/applications/@me
 */
export function useGetOauth2ApplicationsMe(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client.oauth2.applications)['@me']['$get']>
      | (() => InferResponseType<(typeof client.oauth2.applications)['@me']['$get']>)
    initialData?:
      | InferResponseType<(typeof client.oauth2.applications)['@me']['$get']>
      | (() => InferResponseType<(typeof client.oauth2.applications)['@me']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOauth2ApplicationsMeQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.oauth2.applications['@me'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /oauth2/applications/@me
 */
export function getGetOauth2ApplicationsMeQueryKey() {
  return ['/oauth2/applications/@me'] as const
}

/**
 * Returns TanStack Query query options for GET /oauth2/applications/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOauth2ApplicationsMeQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetOauth2ApplicationsMeQueryKey(),
    queryFn: async () =>
      parseResponse(client.oauth2.applications['@me'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /oauth2/keys
 */
export function useGetOauth2Keys(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.oauth2.keys.$get>
      | (() => InferResponseType<typeof client.oauth2.keys.$get>)
    initialData?:
      | InferResponseType<typeof client.oauth2.keys.$get>
      | (() => InferResponseType<typeof client.oauth2.keys.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOauth2KeysQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.oauth2.keys.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /oauth2/keys
 */
export function getGetOauth2KeysQueryKey() {
  return ['/oauth2/keys'] as const
}

/**
 * Returns TanStack Query query options for GET /oauth2/keys
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOauth2KeysQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetOauth2KeysQueryKey(),
    queryFn: async () => parseResponse(client.oauth2.keys.$get(undefined, clientOptions)),
  }
}

/**
 * GET /oauth2/userinfo
 */
export function useGetOauth2Userinfo(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.oauth2.userinfo.$get>
      | (() => InferResponseType<typeof client.oauth2.userinfo.$get>)
    initialData?:
      | InferResponseType<typeof client.oauth2.userinfo.$get>
      | (() => InferResponseType<typeof client.oauth2.userinfo.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOauth2UserinfoQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.oauth2.userinfo.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /oauth2/userinfo
 */
export function getGetOauth2UserinfoQueryKey() {
  return ['/oauth2/userinfo'] as const
}

/**
 * Returns TanStack Query query options for GET /oauth2/userinfo
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetOauth2UserinfoQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetOauth2UserinfoQueryKey(),
    queryFn: async () => parseResponse(client.oauth2.userinfo.$get(undefined, clientOptions)),
  }
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge
 */
export function usePostPartnerSdkProvisionalAccountsUnmerge(options?: {
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
  return useMutation({
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
export function usePostPartnerSdkProvisionalAccountsUnmergeBot(options?: {
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
  return useMutation({
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
export function usePostPartnerSdkToken(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['partner-sdk']['token']['$post']>) =>
      parseResponse(client['partner-sdk'].token.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /partner-sdk/token/bot
 */
export function usePostPartnerSdkTokenBot(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>,
    ) => parseResponse(client['partner-sdk'].token.bot.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /soundboard-default-sounds
 */
export function useGetSoundboardDefaultSounds(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client)['soundboard-default-sounds']['$get']>
      | (() => InferResponseType<(typeof client)['soundboard-default-sounds']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['soundboard-default-sounds']['$get']>
      | (() => InferResponseType<(typeof client)['soundboard-default-sounds']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSoundboardDefaultSoundsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['soundboard-default-sounds'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /soundboard-default-sounds
 */
export function getGetSoundboardDefaultSoundsQueryKey() {
  return ['/soundboard-default-sounds'] as const
}

/**
 * Returns TanStack Query query options for GET /soundboard-default-sounds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSoundboardDefaultSoundsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetSoundboardDefaultSoundsQueryKey(),
    queryFn: async () =>
      parseResponse(client['soundboard-default-sounds'].$get(undefined, clientOptions)),
  }
}

/**
 * POST /stage-instances
 */
export function usePostStageInstances(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client)['stage-instances']['$post']>) =>
      parseResponse(client['stage-instances'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /stage-instances/{channel_id}
 */
export function useGetStageInstancesChannelId(
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
      placeholderData?:
        | InferResponseType<(typeof client)['stage-instances'][':channel_id']['$get']>
        | (() => InferResponseType<(typeof client)['stage-instances'][':channel_id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['stage-instances'][':channel_id']['$get']>
        | (() => InferResponseType<(typeof client)['stage-instances'][':channel_id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetStageInstancesChannelIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['stage-instances'][':channel_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /stage-instances/{channel_id}
 */
export function getGetStageInstancesChannelIdQueryKey(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
) {
  return ['/stage-instances/:channel_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /stage-instances/{channel_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetStageInstancesChannelIdQueryOptions(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetStageInstancesChannelIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client['stage-instances'][':channel_id'].$get(args, clientOptions)),
  }
}

/**
 * DELETE /stage-instances/{channel_id}
 */
export function useDeleteStageInstancesChannelId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>,
    ) => parseResponse(client['stage-instances'][':channel_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /stage-instances/{channel_id}
 */
export function usePatchStageInstancesChannelId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>,
    ) => parseResponse(client['stage-instances'][':channel_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /sticker-packs
 */
export function useGetStickerPacks(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client)['sticker-packs']['$get']>
      | (() => InferResponseType<(typeof client)['sticker-packs']['$get']>)
    initialData?:
      | InferResponseType<(typeof client)['sticker-packs']['$get']>
      | (() => InferResponseType<(typeof client)['sticker-packs']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetStickerPacksQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['sticker-packs'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /sticker-packs
 */
export function getGetStickerPacksQueryKey() {
  return ['/sticker-packs'] as const
}

/**
 * Returns TanStack Query query options for GET /sticker-packs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetStickerPacksQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetStickerPacksQueryKey(),
    queryFn: async () => parseResponse(client['sticker-packs'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /sticker-packs/{pack_id}
 */
export function useGetStickerPacksPackId(
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
      placeholderData?:
        | InferResponseType<(typeof client)['sticker-packs'][':pack_id']['$get']>
        | (() => InferResponseType<(typeof client)['sticker-packs'][':pack_id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client)['sticker-packs'][':pack_id']['$get']>
        | (() => InferResponseType<(typeof client)['sticker-packs'][':pack_id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetStickerPacksPackIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client['sticker-packs'][':pack_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /sticker-packs/{pack_id}
 */
export function getGetStickerPacksPackIdQueryKey(
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
) {
  return ['/sticker-packs/:pack_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /sticker-packs/{pack_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetStickerPacksPackIdQueryOptions(
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetStickerPacksPackIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client['sticker-packs'][':pack_id'].$get(args, clientOptions)),
  }
}

/**
 * GET /stickers/{sticker_id}
 */
export function useGetStickersStickerId(
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
      placeholderData?:
        | InferResponseType<(typeof client.stickers)[':sticker_id']['$get']>
        | (() => InferResponseType<(typeof client.stickers)[':sticker_id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.stickers)[':sticker_id']['$get']>
        | (() => InferResponseType<(typeof client.stickers)[':sticker_id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetStickersStickerIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.stickers[':sticker_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /stickers/{sticker_id}
 */
export function getGetStickersStickerIdQueryKey(
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
) {
  return ['/stickers/:sticker_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /stickers/{sticker_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetStickersStickerIdQueryOptions(
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetStickersStickerIdQueryKey(args),
    queryFn: async () => parseResponse(client.stickers[':sticker_id'].$get(args, clientOptions)),
  }
}

/**
 * GET /users/@me
 */
export function useGetUsersMe(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client.users)['@me']['$get']>
      | (() => InferResponseType<(typeof client.users)['@me']['$get']>)
    initialData?:
      | InferResponseType<(typeof client.users)['@me']['$get']>
      | (() => InferResponseType<(typeof client.users)['@me']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersMeQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users['@me'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/@me
 */
export function getGetUsersMeQueryKey() {
  return ['/users/@me'] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersMeQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetUsersMeQueryKey(),
    queryFn: async () => parseResponse(client.users['@me'].$get(undefined, clientOptions)),
  }
}

/**
 * PATCH /users/@me
 */
export function usePatchUsersMe(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.users)['@me']['$patch']>) =>
      parseResponse(client.users['@me'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /users/@me/applications/{application_id}/entitlements
 */
export function useGetUsersMeApplicationsApplicationIdEntitlements(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
          >
        | (() => InferResponseType<
            (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
          >
        | (() => InferResponseType<
            (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersMeApplicationsApplicationIdEntitlementsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users['@me'].applications[':application_id'].entitlements.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/@me/applications/{application_id}/entitlements
 */
export function getGetUsersMeApplicationsApplicationIdEntitlementsQueryKey(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
) {
  return ['/users/@me/applications/:application_id/entitlements', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me/applications/{application_id}/entitlements
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersMeApplicationsApplicationIdEntitlementsQueryOptions(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersMeApplicationsApplicationIdEntitlementsQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.users['@me'].applications[':application_id'].entitlements.$get(args, clientOptions),
      ),
  }
}

/**
 * GET /users/@me/applications/{application_id}/role-connection
 */
export function useGetUsersMeApplicationsApplicationIdRoleConnection(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
          >
        | (() => InferResponseType<
            (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
          >
        | (() => InferResponseType<
            (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersMeApplicationsApplicationIdRoleConnectionQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users['@me'].applications[':application_id']['role-connection'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/@me/applications/{application_id}/role-connection
 */
export function getGetUsersMeApplicationsApplicationIdRoleConnectionQueryKey(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
) {
  return ['/users/@me/applications/:application_id/role-connection', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me/applications/{application_id}/role-connection
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersMeApplicationsApplicationIdRoleConnectionQueryOptions(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersMeApplicationsApplicationIdRoleConnectionQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.users['@me'].applications[':application_id']['role-connection'].$get(
          args,
          clientOptions,
        ),
      ),
  }
}

/**
 * PUT /users/@me/applications/{application_id}/role-connection
 */
export function usePutUsersMeApplicationsApplicationIdRoleConnection(options?: {
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
  return useMutation({
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
export function useDeleteUsersMeApplicationsApplicationIdRoleConnection(options?: {
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
  return useMutation({
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
export function usePostUsersMeChannels(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.users)['@me']['channels']['$post']>) =>
      parseResponse(client.users['@me'].channels.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /users/@me/connections
 */
export function useGetUsersMeConnections(options?: {
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
    placeholderData?:
      | InferResponseType<(typeof client.users)['@me']['connections']['$get']>
      | (() => InferResponseType<(typeof client.users)['@me']['connections']['$get']>)
    initialData?:
      | InferResponseType<(typeof client.users)['@me']['connections']['$get']>
      | (() => InferResponseType<(typeof client.users)['@me']['connections']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersMeConnectionsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users['@me'].connections.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/@me/connections
 */
export function getGetUsersMeConnectionsQueryKey() {
  return ['/users/@me/connections'] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me/connections
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersMeConnectionsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetUsersMeConnectionsQueryKey(),
    queryFn: async () =>
      parseResponse(client.users['@me'].connections.$get(undefined, clientOptions)),
  }
}

/**
 * GET /users/@me/guilds
 */
export function useGetUsersMeGuilds(
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
      placeholderData?:
        | InferResponseType<(typeof client.users)['@me']['guilds']['$get']>
        | (() => InferResponseType<(typeof client.users)['@me']['guilds']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.users)['@me']['guilds']['$get']>
        | (() => InferResponseType<(typeof client.users)['@me']['guilds']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersMeGuildsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users['@me'].guilds.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/@me/guilds
 */
export function getGetUsersMeGuildsQueryKey(
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
) {
  return ['/users/@me/guilds', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me/guilds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersMeGuildsQueryOptions(
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersMeGuildsQueryKey(args),
    queryFn: async () => parseResponse(client.users['@me'].guilds.$get(args, clientOptions)),
  }
}

/**
 * DELETE /users/@me/guilds/{guild_id}
 */
export function useDeleteUsersMeGuildsGuildId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>,
    ) => parseResponse(client.users['@me'].guilds[':guild_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /users/@me/guilds/{guild_id}/member
 */
export function useGetUsersMeGuildsGuildIdMember(
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
      placeholderData?:
        | InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>
        | (() => InferResponseType<
            (typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>
        | (() => InferResponseType<
            (typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersMeGuildsGuildIdMemberQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users['@me'].guilds[':guild_id'].member.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/@me/guilds/{guild_id}/member
 */
export function getGetUsersMeGuildsGuildIdMemberQueryKey(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
) {
  return ['/users/@me/guilds/:guild_id/member', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me/guilds/{guild_id}/member
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersMeGuildsGuildIdMemberQueryOptions(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersMeGuildsGuildIdMemberQueryKey(args),
    queryFn: async () =>
      parseResponse(client.users['@me'].guilds[':guild_id'].member.$get(args, clientOptions)),
  }
}

/**
 * GET /users/{user_id}
 */
export function useGetUsersUserId(
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
      placeholderData?:
        | InferResponseType<(typeof client.users)[':user_id']['$get']>
        | (() => InferResponseType<(typeof client.users)[':user_id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.users)[':user_id']['$get']>
        | (() => InferResponseType<(typeof client.users)[':user_id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersUserIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.users[':user_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /users/{user_id}
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return ['/users/:user_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetUsersUserIdQueryOptions(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetUsersUserIdQueryKey(args),
    queryFn: async () => parseResponse(client.users[':user_id'].$get(args, clientOptions)),
  }
}

/**
 * GET /voice/regions
 */
export function useGetVoiceRegions(options?: {
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
    placeholderData?:
      | InferResponseType<typeof client.voice.regions.$get>
      | (() => InferResponseType<typeof client.voice.regions.$get>)
    initialData?:
      | InferResponseType<typeof client.voice.regions.$get>
      | (() => InferResponseType<typeof client.voice.regions.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetVoiceRegionsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.voice.regions.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /voice/regions
 */
export function getGetVoiceRegionsQueryKey() {
  return ['/voice/regions'] as const
}

/**
 * Returns TanStack Query query options for GET /voice/regions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetVoiceRegionsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetVoiceRegionsQueryKey(),
    queryFn: async () => parseResponse(client.voice.regions.$get(undefined, clientOptions)),
  }
}

/**
 * GET /webhooks/{webhook_id}
 */
export function useGetWebhooksWebhookId(
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
      placeholderData?:
        | InferResponseType<(typeof client.webhooks)[':webhook_id']['$get']>
        | (() => InferResponseType<(typeof client.webhooks)[':webhook_id']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.webhooks)[':webhook_id']['$get']>
        | (() => InferResponseType<(typeof client.webhooks)[':webhook_id']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWebhooksWebhookIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.webhooks[':webhook_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}
 */
export function getGetWebhooksWebhookIdQueryKey(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
) {
  return ['/webhooks/:webhook_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /webhooks/{webhook_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetWebhooksWebhookIdQueryOptions(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetWebhooksWebhookIdQueryKey(args),
    queryFn: async () => parseResponse(client.webhooks[':webhook_id'].$get(args, clientOptions)),
  }
}

/**
 * DELETE /webhooks/{webhook_id}
 */
export function useDeleteWebhooksWebhookId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>,
    ) => parseResponse(client.webhooks[':webhook_id'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * PATCH /webhooks/{webhook_id}
 */
export function usePatchWebhooksWebhookId(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>) =>
      parseResponse(client.webhooks[':webhook_id'].$patch(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /webhooks/{webhook_id}/{webhook_token}
 */
export function useGetWebhooksWebhookIdWebhookToken(
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
      placeholderData?:
        | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>
        | (() => InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>
        | (() => InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWebhooksWebhookIdWebhookTokenQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}/{webhook_token}
 */
export function getGetWebhooksWebhookIdWebhookTokenQueryKey(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
) {
  return ['/webhooks/:webhook_id/:webhook_token', args] as const
}

/**
 * Returns TanStack Query query options for GET /webhooks/{webhook_id}/{webhook_token}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetWebhooksWebhookIdWebhookTokenQueryOptions(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetWebhooksWebhookIdWebhookTokenQueryKey(args),
    queryFn: async () =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$get(args, clientOptions)),
  }
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}
 */
export function usePostWebhooksWebhookIdWebhookToken(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>,
    ) => parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}
 */
export function useDeleteWebhooksWebhookIdWebhookToken(options?: {
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
  return useMutation({
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
export function usePatchWebhooksWebhookIdWebhookToken(options?: {
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
  return useMutation({
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
export function usePostWebhooksWebhookIdWebhookTokenGithub(options?: {
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
  return useMutation({
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
export function useGetWebhooksWebhookIdWebhookTokenMessagesOriginal(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
          >
        | (() => InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
          >
        | (() => InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
) {
  return ['/webhooks/:webhook_id/:webhook_token/messages/@original', args] as const
}

/**
 * Returns TanStack Query query options for GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryOptions(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$get(
          args,
          clientOptions,
        ),
      ),
  }
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
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
  return useMutation({
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
export function usePatchWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
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
  return useMutation({
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
export function useGetWebhooksWebhookIdWebhookTokenMessagesMessageId(
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
      placeholderData?:
        | InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
          >)
      initialData?:
        | InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
          >
        | (() => InferResponseType<
            (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
) {
  return ['/webhooks/:webhook_id/:webhook_token/messages/:message_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryOptions(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$get(
          args,
          clientOptions,
        ),
      ),
  }
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
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
  return useMutation({
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
export function usePatchWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
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
  return useMutation({
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
export function usePostWebhooksWebhookIdWebhookTokenSlack(options?: {
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
  return useMutation({
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
