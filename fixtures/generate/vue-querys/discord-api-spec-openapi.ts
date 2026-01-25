import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discord-api-spec-openapi'

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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsMeQueryKey(),
    queryFn: async () => parseResponse(client.applications['@me'].$get(undefined, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdCommandsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].commands.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdCommandsCommandIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$get(args, clientOptions),
      ),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdEmojisQueryKey(args),
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].emojis.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdEmojisEmojiIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$get(args, clientOptions),
      ),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetApplicationsApplicationIdEntitlementsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.applications[':application_id'].entitlements.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
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
  return useQuery({
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdQueryKey(args),
    queryFn: async () => parseResponse(client.channels[':channel_id'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdInvitesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].invites.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdMessagesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].messages.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdMessagesPinsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].messages.pins.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdMessagesMessageIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$get(args, clientOptions),
      ),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdPinsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].pins.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdThreadMembersQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id']['thread-members'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdThreadMembersUserIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$get(args, clientOptions),
      ),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetChannelsChannelIdThreadsArchivedPrivateQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].threads.archived.private.$get(args, clientOptions),
      ),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetChannelsChannelIdThreadsArchivedPublicQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.channels[':channel_id'].threads.archived.public.$get(args, clientOptions),
      ),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetChannelsChannelIdThreadsSearchQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].threads.search.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
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
  return useQuery({
    queryKey: getGetChannelsChannelIdWebhooksQueryKey(args),
    queryFn: async () =>
      parseResponse(client.channels[':channel_id'].webhooks.$get(args, clientOptions)),
    ...queryOptions,
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGatewayQueryKey(),
    queryFn: async () => parseResponse(client.gateway.$get(undefined, clientOptions)),
    ...queryOptions,
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGatewayBotQueryKey(),
    queryFn: async () => parseResponse(client.gateway.bot.$get(undefined, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetGuildsTemplatesCodeQueryKey(args),
    queryFn: async () => parseResponse(client.guilds.templates[':code'].$get(args, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetGuildsGuildIdQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdAuditLogsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['audit-logs'].$get(args, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetGuildsGuildIdAutoModerationRulesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['auto-moderation'].rules.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdAutoModerationRulesRuleIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$get(args, clientOptions),
      ),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdBansQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].bans.$get(args, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetGuildsGuildIdBansUserIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].bans[':user_id'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdChannelsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].channels.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdEmojisQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].emojis.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdEmojisEmojiIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdIntegrationsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].integrations.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdInvitesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].invites.$get(args, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetGuildsGuildIdMembersQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].members.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdMembersSearchQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].members.search.$get(args, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetGuildsGuildIdMembersUserIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].members[':user_id'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdNewMemberWelcomeQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['new-member-welcome'].$get(args, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetGuildsGuildIdOnboardingQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].onboarding.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdPreviewQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].preview.$get(args, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetGuildsGuildIdPruneQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].prune.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdRegionsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].regions.$get(args, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetGuildsGuildIdRolesQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].roles.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdRolesRoleIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].roles[':role_id'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdScheduledEventsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['scheduled-events'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
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
  return useQuery({
    queryKey: getGetGuildsGuildIdSoundboardSoundsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdSoundboardSoundsSoundIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$get(args, clientOptions),
      ),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdStickersQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].stickers.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdStickersStickerIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].stickers[':sticker_id'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdTemplatesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].templates.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdThreadsActiveQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].threads.active.$get(args, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetGuildsGuildIdVanityUrlQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['vanity-url'].$get(args, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetGuildsGuildIdVoiceStatesMeQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdVoiceStatesUserIdQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.guilds[':guild_id']['voice-states'][':user_id'].$get(args, clientOptions),
      ),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdWebhooksQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id'].webhooks.$get(args, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetGuildsGuildIdWelcomeScreenQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['welcome-screen'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdWidgetQueryKey(args),
    queryFn: async () => parseResponse(client.guilds[':guild_id'].widget.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetGuildsGuildIdWidgetJsonQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['widget.json'].$get(args, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetGuildsGuildIdWidgetPngQueryKey(args),
    queryFn: async () =>
      parseResponse(client.guilds[':guild_id']['widget.png'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetInvitesCodeQueryKey(args),
    queryFn: async () => parseResponse(client.invites[':code'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetLobbiesLobbyIdQueryKey(args),
    queryFn: async () => parseResponse(client.lobbies[':lobby_id'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetLobbiesLobbyIdMessagesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.lobbies[':lobby_id'].messages.$get(args, clientOptions)),
    ...queryOptions,
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOauth2MeQueryKey(),
    queryFn: async () => parseResponse(client.oauth2['@me'].$get(undefined, clientOptions)),
    ...queryOptions,
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOauth2ApplicationsMeQueryKey(),
    queryFn: async () =>
      parseResponse(client.oauth2.applications['@me'].$get(undefined, clientOptions)),
    ...queryOptions,
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOauth2KeysQueryKey(),
    queryFn: async () => parseResponse(client.oauth2.keys.$get(undefined, clientOptions)),
    ...queryOptions,
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetOauth2UserinfoQueryKey(),
    queryFn: async () => parseResponse(client.oauth2.userinfo.$get(undefined, clientOptions)),
    ...queryOptions,
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSoundboardDefaultSoundsQueryKey(),
    queryFn: async () =>
      parseResponse(client['soundboard-default-sounds'].$get(undefined, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetStageInstancesChannelIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client['stage-instances'][':channel_id'].$get(args, clientOptions)),
    ...queryOptions,
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetStickerPacksQueryKey(),
    queryFn: async () => parseResponse(client['sticker-packs'].$get(undefined, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetStickerPacksPackIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client['sticker-packs'][':pack_id'].$get(args, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetStickersStickerIdQueryKey(args),
    queryFn: async () => parseResponse(client.stickers[':sticker_id'].$get(args, clientOptions)),
    ...queryOptions,
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersMeQueryKey(),
    queryFn: async () => parseResponse(client.users['@me'].$get(undefined, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersMeApplicationsApplicationIdEntitlementsQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.users['@me'].applications[':application_id'].entitlements.$get(args, clientOptions),
      ),
    ...queryOptions,
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
  return useQuery({
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersMeConnectionsQueryKey(),
    queryFn: async () =>
      parseResponse(client.users['@me'].connections.$get(undefined, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetUsersMeGuildsQueryKey(args),
    queryFn: async () => parseResponse(client.users['@me'].guilds.$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetUsersMeGuildsGuildIdMemberQueryKey(args),
    queryFn: async () =>
      parseResponse(client.users['@me'].guilds[':guild_id'].member.$get(args, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetUsersUserIdQueryKey(args),
    queryFn: async () => parseResponse(client.users[':user_id'].$get(args, clientOptions)),
    ...queryOptions,
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetVoiceRegionsQueryKey(),
    queryFn: async () => parseResponse(client.voice.regions.$get(undefined, clientOptions)),
    ...queryOptions,
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
  return useQuery({
    queryKey: getGetWebhooksWebhookIdQueryKey(args),
    queryFn: async () => parseResponse(client.webhooks[':webhook_id'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetWebhooksWebhookIdWebhookTokenQueryKey(args),
    queryFn: async () =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$get(args, clientOptions)),
    ...queryOptions,
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
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
