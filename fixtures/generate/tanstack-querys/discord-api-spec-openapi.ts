import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/discord-api-spec-openapi'

/**
 * Generates TanStack Query cache key for GET /applications/@me
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetApplicationsMeQueryKey() {
  return ['applications', '/applications/@me'] as const
}

/**
 * Returns TanStack Query query options for GET /applications/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsMeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetApplicationsMeQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.applications['@me'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /applications/@me
 */
export function useGetApplicationsMe(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.applications)['@me']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetApplicationsMeQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PATCH /applications/@me
 */
export function usePatchApplicationsMe(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.applications)['@me']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.applications)['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.applications)['@me']['$patch']>) =>
      parseResponse(client.applications['@me'].$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApplicationsApplicationIdQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
) {
  return ['applications', '/applications/:application_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdQueryOptions = (
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.applications[':application_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /applications/{application_id}
 */
export function useGetApplicationsApplicationId(
  args: InferRequestType<(typeof client.applications)[':application_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.applications)[':application_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetApplicationsApplicationIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PATCH /applications/{application_id}
 */
export function usePatchApplicationsApplicationId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.applications)[':application_id']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['$patch']>,
    ) => parseResponse(client.applications[':application_id'].$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/activity-instances/{instance_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
) {
  return [
    'applications',
    '/applications/:application_id/activity-instances/:instance_id',
    args,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/activity-instances/{instance_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.applications[':application_id']['activity-instances'][':instance_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /applications/{application_id}/activity-instances/{instance_id}
 */
export function useGetApplicationsApplicationIdActivityInstancesInstanceId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /applications/{application_id}/attachment
 */
export function usePostApplicationsApplicationIdAttachment(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.applications)[':application_id']['attachment']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['attachment']['$post']
      >,
    ) =>
      parseResponse(client.applications[':application_id'].attachment.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/commands
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApplicationsApplicationIdCommandsQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
) {
  return ['applications', '/applications/:application_id/commands', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/commands
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdCommandsQueryOptions = (
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdCommandsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.applications[':application_id'].commands.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /applications/{application_id}/commands
 */
export function useGetApplicationsApplicationIdCommands(
  args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.applications)[':application_id']['commands']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetApplicationsApplicationIdCommandsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /applications/{application_id}/commands
 */
export function usePutApplicationsApplicationIdCommands(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.applications)[':application_id']['commands']['$put']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>,
    ) => parseResponse(client.applications[':application_id'].commands.$put(args, clientOptions)),
  })
}

/**
 * POST /applications/{application_id}/commands
 */
export function usePostApplicationsApplicationIdCommands(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.applications)[':application_id']['commands']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>,
    ) => parseResponse(client.applications[':application_id'].commands.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/commands/{command_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApplicationsApplicationIdCommandsCommandIdQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
) {
  return ['applications', '/applications/:application_id/commands/:command_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/commands/{command_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdCommandsCommandIdQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdCommandsCommandIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.applications[':application_id'].commands[':command_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /applications/{application_id}/commands/{command_id}
 */
export function useGetApplicationsApplicationIdCommandsCommandId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetApplicationsApplicationIdCommandsCommandIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /applications/{application_id}/commands/{command_id}
 */
export function useDeleteApplicationsApplicationIdCommandsCommandId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * PATCH /applications/{application_id}/commands/{command_id}
 */
export function usePatchApplicationsApplicationIdCommandsCommandId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].commands[':command_id'].$patch(args, clientOptions),
      ),
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/emojis
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApplicationsApplicationIdEmojisQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
) {
  return ['applications', '/applications/:application_id/emojis', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/emojis
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdEmojisQueryOptions = (
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdEmojisQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.applications[':application_id'].emojis.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /applications/{application_id}/emojis
 */
export function useGetApplicationsApplicationIdEmojis(
  args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.applications)[':application_id']['emojis']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetApplicationsApplicationIdEmojisQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /applications/{application_id}/emojis
 */
export function usePostApplicationsApplicationIdEmojis(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.applications)[':application_id']['emojis']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>,
    ) => parseResponse(client.applications[':application_id'].emojis.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/emojis/{emoji_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApplicationsApplicationIdEmojisEmojiIdQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
) {
  return ['applications', '/applications/:application_id/emojis/:emoji_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/emojis/{emoji_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdEmojisEmojiIdQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdEmojisEmojiIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.applications[':application_id'].emojis[':emoji_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /applications/{application_id}/emojis/{emoji_id}
 */
export function useGetApplicationsApplicationIdEmojisEmojiId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetApplicationsApplicationIdEmojisEmojiIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /applications/{application_id}/emojis/{emoji_id}
 */
export function useDeleteApplicationsApplicationIdEmojisEmojiId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * PATCH /applications/{application_id}/emojis/{emoji_id}
 */
export function usePatchApplicationsApplicationIdEmojisEmojiId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.applications[':application_id'].emojis[':emoji_id'].$patch(args, clientOptions),
      ),
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/entitlements
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApplicationsApplicationIdEntitlementsQueryKey(
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
) {
  return ['applications', '/applications/:application_id/entitlements', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/entitlements
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdEntitlementsQueryOptions = (
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdEntitlementsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.applications[':application_id'].entitlements.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /applications/{application_id}/entitlements
 */
export function useGetApplicationsApplicationIdEntitlements(
  args: InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.applications)[':application_id']['entitlements']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetApplicationsApplicationIdEntitlementsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /applications/{application_id}/entitlements
 */
export function usePostApplicationsApplicationIdEntitlements(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.applications)[':application_id']['entitlements']['$post']
      >,
    ) =>
      parseResponse(client.applications[':application_id'].entitlements.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/entitlements/{entitlement_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
) {
  return [
    'applications',
    '/applications/:application_id/entitlements/:entitlement_id',
    args,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/entitlements/{entitlement_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.applications[':application_id'].entitlements[':entitlement_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /applications/{application_id}/entitlements/{entitlement_id}
 */
export function useGetApplicationsApplicationIdEntitlementsEntitlementId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /applications/{application_id}/entitlements/{entitlement_id}
 */
export function useDeleteApplicationsApplicationIdEntitlementsEntitlementId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * POST /applications/{application_id}/entitlements/{entitlement_id}/consume
 */
export function usePostApplicationsApplicationIdEntitlementsEntitlementIdConsume(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['consume']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
) {
  return ['applications', '/applications/:application_id/guilds/:guild_id/commands', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.applications[':application_id'].guilds[':guild_id'].commands.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands
 */
export function useGetApplicationsApplicationIdGuildsGuildIdCommands(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands
 */
export function usePutApplicationsApplicationIdGuildsGuildIdCommands(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * POST /applications/{application_id}/guilds/{guild_id}/commands
 */
export function usePostApplicationsApplicationIdGuildsGuildIdCommands(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
) {
  return [
    'applications',
    '/applications/:application_id/guilds/:guild_id/commands/permissions',
    args,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.applications[':application_id'].guilds[':guild_id'].commands.permissions.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 */
export function useGetApplicationsApplicationIdGuildsGuildIdCommandsPermissions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
) {
  return [
    'applications',
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    args,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.applications[':application_id'].guilds[':guild_id'].commands[':command_id'].$get(
        args,
        { ...clientOptions, init: { ...clientOptions?.init, signal } },
      ),
    ),
})

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function useGetApplicationsApplicationIdGuildsGuildIdCommandsCommandId(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function useDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * PATCH /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function usePatchApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
  >,
) {
  return [
    'applications',
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    args,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryOptions =
  (
    args: InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(args),
    queryFn: ({ signal }: QueryFunctionContext) =>
      parseResponse(
        client.applications[':application_id'].guilds[':guild_id'].commands[
          ':command_id'
        ].permissions.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 */
export function useGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryOptions(
      args,
      clientOptions,
    )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 */
export function usePutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * Generates TanStack Query cache key for GET /applications/{application_id}/role-connections/metadata
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetApplicationsApplicationIdRoleConnectionsMetadataQueryKey(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
) {
  return ['applications', '/applications/:application_id/role-connections/metadata', args] as const
}

/**
 * Returns TanStack Query query options for GET /applications/{application_id}/role-connections/metadata
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetApplicationsApplicationIdRoleConnectionsMetadataQueryOptions = (
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetApplicationsApplicationIdRoleConnectionsMetadataQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.applications[':application_id']['role-connections'].metadata.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /applications/{application_id}/role-connections/metadata
 */
export function useGetApplicationsApplicationIdRoleConnectionsMetadata(
  args: InferRequestType<
    (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetApplicationsApplicationIdRoleConnectionsMetadataQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /applications/{application_id}/role-connections/metadata
 */
export function usePutApplicationsApplicationIdRoleConnectionsMetadata(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChannelsChannelIdQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
) {
  return ['channels', '/channels/:channel_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels[':channel_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}
 */
export function useGetChannelsChannelId(
  args: InferRequestType<(typeof client.channels)[':channel_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.channels)[':channel_id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetChannelsChannelIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /channels/{channel_id}
 */
export function useDeleteChannelsChannelId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.channels)[':channel_id']['$delete']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['$delete']>,
    ) => parseResponse(client.channels[':channel_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /channels/{channel_id}
 */
export function usePatchChannelsChannelId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.channels)[':channel_id']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.channels)[':channel_id']['$patch']>) =>
      parseResponse(client.channels[':channel_id'].$patch(args, clientOptions)),
  })
}

/**
 * POST /channels/{channel_id}/followers
 */
export function usePostChannelsChannelIdFollowers(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.channels)[':channel_id']['followers']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].followers.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/invites
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChannelsChannelIdInvitesQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
) {
  return ['channels', '/channels/:channel_id/invites', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/invites
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdInvitesQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdInvitesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels[':channel_id'].invites.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/invites
 */
export function useGetChannelsChannelIdInvites(
  args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['invites']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetChannelsChannelIdInvitesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /channels/{channel_id}/invites
 */
export function usePostChannelsChannelIdInvites(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['invites']['$post']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].invites.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChannelsChannelIdMessagesQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
) {
  return ['channels', '/channels/:channel_id/messages', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/messages
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdMessagesQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdMessagesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels[':channel_id'].messages.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/messages
 */
export function useGetChannelsChannelIdMessages(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['messages']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetChannelsChannelIdMessagesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /channels/{channel_id}/messages
 */
export function usePostChannelsChannelIdMessages(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.channels)[':channel_id']['messages']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].messages.$post(args, clientOptions)),
  })
}

/**
 * POST /channels/{channel_id}/messages/bulk-delete
 */
export function usePostChannelsChannelIdMessagesBulkDelete(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages['bulk-delete'].$post(args, clientOptions),
      ),
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages/pins
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChannelsChannelIdMessagesPinsQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
) {
  return ['channels', '/channels/:channel_id/messages/pins', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/messages/pins
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdMessagesPinsQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdMessagesPinsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels[':channel_id'].messages.pins.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/messages/pins
 */
export function useGetChannelsChannelIdMessagesPins(
  args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetChannelsChannelIdMessagesPinsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /channels/{channel_id}/messages/pins/{message_id}
 */
export function usePutChannelsChannelIdMessagesPinsMessageId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages.pins[':message_id'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/messages/pins/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesPinsMessageId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages.pins[':message_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages/{message_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChannelsChannelIdMessagesMessageIdQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
) {
  return ['channels', '/channels/:channel_id/messages/:message_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/messages/{message_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdMessagesMessageIdQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdMessagesMessageIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels[':channel_id'].messages[':message_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/messages/{message_id}
 */
export function useGetChannelsChannelIdMessagesMessageId(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetChannelsChannelIdMessagesMessageIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesMessageId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * PATCH /channels/{channel_id}/messages/{message_id}
 */
export function usePatchChannelsChannelIdMessagesMessageId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].$patch(args, clientOptions),
      ),
  })
}

/**
 * POST /channels/{channel_id}/messages/{message_id}/crosspost
 */
export function usePostChannelsChannelIdMessagesMessageIdCrosspost(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].crosspost.$post(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactions(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
) {
  return [
    'channels',
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name',
    args,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels[':channel_id'].messages[':message_id'].reactions[':emoji_name'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 */
export function useGetChannelsChannelIdMessagesMessageIdReactionsEmojiName(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiName(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * PUT /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function usePutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['@me']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name'][':user_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * POST /channels/{channel_id}/messages/{message_id}/threads
 */
export function usePostChannelsChannelIdMessagesMessageIdThreads(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].messages[':message_id'].threads.$post(args, clientOptions),
      ),
  })
}

/**
 * PUT /channels/{channel_id}/permissions/{overwrite_id}
 */
export function usePutChannelsChannelIdPermissionsOverwriteId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].permissions[':overwrite_id'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/permissions/{overwrite_id}
 */
export function useDeleteChannelsChannelIdPermissionsOverwriteId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].permissions[':overwrite_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/pins
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChannelsChannelIdPinsQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
) {
  return ['channels', '/channels/:channel_id/pins', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/pins
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdPinsQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdPinsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels[':channel_id'].pins.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/pins
 */
export function useGetChannelsChannelIdPins(
  args: InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['pins']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetChannelsChannelIdPinsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /channels/{channel_id}/pins/{message_id}
 */
export function usePutChannelsChannelIdPinsMessageId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['pins'][':message_id']['$put']
      >,
    ) =>
      parseResponse(client.channels[':channel_id'].pins[':message_id'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /channels/{channel_id}/pins/{message_id}
 */
export function useDeleteChannelsChannelIdPinsMessageId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].pins[':message_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
) {
  return ['channels', '/channels/:channel_id/polls/:message_id/answers/:answer_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels[':channel_id'].polls[':message_id'].answers[':answer_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 */
export function useGetChannelsChannelIdPollsMessageIdAnswersAnswerId(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /channels/{channel_id}/polls/{message_id}/expire
 */
export function usePostChannelsChannelIdPollsMessageIdExpire(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].polls[':message_id'].expire.$post(args, clientOptions),
      ),
  })
}

/**
 * PUT /channels/{channel_id}/recipients/{user_id}
 */
export function usePutChannelsChannelIdRecipientsUserId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].recipients[':user_id'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/recipients/{user_id}
 */
export function useDeleteChannelsChannelIdRecipientsUserId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id'].recipients[':user_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * POST /channels/{channel_id}/send-soundboard-sound
 */
export function usePostChannelsChannelIdSendSoundboardSound(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id']['send-soundboard-sound'].$post(args, clientOptions),
      ),
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/thread-members
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChannelsChannelIdThreadMembersQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
) {
  return ['channels', '/channels/:channel_id/thread-members', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/thread-members
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdThreadMembersQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdThreadMembersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels[':channel_id']['thread-members'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/thread-members
 */
export function useGetChannelsChannelIdThreadMembers(
  args: InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['thread-members']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetChannelsChannelIdThreadMembersQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /channels/{channel_id}/thread-members/@me
 */
export function usePutChannelsChannelIdThreadMembersMe(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members']['@me']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members']['@me'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/thread-members/@me
 */
export function useDeleteChannelsChannelIdThreadMembersMe(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members']['@me'].$delete(args, clientOptions),
      ),
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/thread-members/{user_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChannelsChannelIdThreadMembersUserIdQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
) {
  return ['channels', '/channels/:channel_id/thread-members/:user_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/thread-members/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdThreadMembersUserIdQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdThreadMembersUserIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels[':channel_id']['thread-members'][':user_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/thread-members/{user_id}
 */
export function useGetChannelsChannelIdThreadMembersUserId(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetChannelsChannelIdThreadMembersUserIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /channels/{channel_id}/thread-members/{user_id}
 */
export function usePutChannelsChannelIdThreadMembersUserId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /channels/{channel_id}/thread-members/{user_id}
 */
export function useDeleteChannelsChannelIdThreadMembersUserId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.channels[':channel_id']['thread-members'][':user_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * POST /channels/{channel_id}/threads
 */
export function usePostChannelsChannelIdThreads(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.channels)[':channel_id']['threads']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].threads.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/threads/archived/private
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChannelsChannelIdThreadsArchivedPrivateQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
) {
  return ['channels', '/channels/:channel_id/threads/archived/private', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/threads/archived/private
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdThreadsArchivedPrivateQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdThreadsArchivedPrivateQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels[':channel_id'].threads.archived.private.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/threads/archived/private
 */
export function useGetChannelsChannelIdThreadsArchivedPrivate(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetChannelsChannelIdThreadsArchivedPrivateQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/threads/archived/public
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChannelsChannelIdThreadsArchivedPublicQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
) {
  return ['channels', '/channels/:channel_id/threads/archived/public', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/threads/archived/public
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdThreadsArchivedPublicQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdThreadsArchivedPublicQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels[':channel_id'].threads.archived.public.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/threads/archived/public
 */
export function useGetChannelsChannelIdThreadsArchivedPublic(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetChannelsChannelIdThreadsArchivedPublicQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/threads/search
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChannelsChannelIdThreadsSearchQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
) {
  return ['channels', '/channels/:channel_id/threads/search', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/threads/search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdThreadsSearchQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdThreadsSearchQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels[':channel_id'].threads.search.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/threads/search
 */
export function useGetChannelsChannelIdThreadsSearch(
  args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetChannelsChannelIdThreadsSearchQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /channels/{channel_id}/typing
 */
export function usePostChannelsChannelIdTyping(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['typing']['$post']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].typing.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/users/@me/threads/archived/private
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
) {
  return ['channels', '/channels/:channel_id/users/@me/threads/archived/private', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/users/@me/threads/archived/private
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryOptions = (
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels[':channel_id'].users['@me'].threads.archived.private.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/users/@me/threads/archived/private
 */
export function useGetChannelsChannelIdUsersMeThreadsArchivedPrivate(
  args: InferRequestType<
    (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /channels/{channel_id}/webhooks
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetChannelsChannelIdWebhooksQueryKey(
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
) {
  return ['channels', '/channels/:channel_id/webhooks', args] as const
}

/**
 * Returns TanStack Query query options for GET /channels/{channel_id}/webhooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsChannelIdWebhooksQueryOptions = (
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChannelsChannelIdWebhooksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.channels[':channel_id'].webhooks.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /channels/{channel_id}/webhooks
 */
export function useGetChannelsChannelIdWebhooks(
  args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.channels)[':channel_id']['webhooks']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetChannelsChannelIdWebhooksQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /channels/{channel_id}/webhooks
 */
export function usePostChannelsChannelIdWebhooks(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.channels)[':channel_id']['webhooks']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>,
    ) => parseResponse(client.channels[':channel_id'].webhooks.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /gateway
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetGatewayQueryKey() {
  return ['gateway', '/gateway'] as const
}

/**
 * Returns TanStack Query query options for GET /gateway
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGatewayQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetGatewayQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.gateway.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /gateway
 */
export function useGetGateway(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.gateway.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGatewayQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /gateway/bot
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetGatewayBotQueryKey() {
  return ['gateway', '/gateway/bot'] as const
}

/**
 * Returns TanStack Query query options for GET /gateway/bot
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGatewayBotQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetGatewayBotQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.gateway.bot.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /gateway/bot
 */
export function useGetGatewayBot(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.gateway.bot.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGatewayBotQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /guilds/templates/{code}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsTemplatesCodeQueryKey(
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
) {
  return ['guilds', '/guilds/templates/:code', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/templates/{code}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsTemplatesCodeQueryOptions = (
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsTemplatesCodeQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds.templates[':code'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/templates/{code}
 */
export function useGetGuildsTemplatesCode(
  args: InferRequestType<(typeof client.guilds.templates)[':code']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds.templates)[':code']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsTemplatesCodeQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}
 */
export function useGetGuildsGuildId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.guilds)[':guild_id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PATCH /guilds/{guild_id}
 */
export function usePatchGuildsGuildId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.guilds)[':guild_id']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>) =>
      parseResponse(client.guilds[':guild_id'].$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/audit-logs
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdAuditLogsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/audit-logs', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/audit-logs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdAuditLogsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdAuditLogsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id']['audit-logs'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/audit-logs
 */
export function useGetGuildsGuildIdAuditLogs(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdAuditLogsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/auto-moderation/rules
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdAutoModerationRulesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/auto-moderation/rules', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/auto-moderation/rules
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdAutoModerationRulesQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdAutoModerationRulesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id']['auto-moderation'].rules.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/auto-moderation/rules
 */
export function useGetGuildsGuildIdAutoModerationRules(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdAutoModerationRulesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /guilds/{guild_id}/auto-moderation/rules
 */
export function usePostGuildsGuildIdAutoModerationRules(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']
      >,
    ) =>
      parseResponse(client.guilds[':guild_id']['auto-moderation'].rules.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdAutoModerationRulesRuleIdQueryKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
) {
  return ['guilds', '/guilds/:guild_id/auto-moderation/rules/:rule_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdAutoModerationRulesRuleIdQueryOptions = (
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdAutoModerationRulesRuleIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function useGetGuildsGuildIdAutoModerationRulesRuleId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetGuildsGuildIdAutoModerationRulesRuleIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function useDeleteGuildsGuildIdAutoModerationRulesRuleId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * PATCH /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function usePatchGuildsGuildIdAutoModerationRulesRuleId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$patch(args, clientOptions),
      ),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/bans
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdBansQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/bans', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/bans
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdBansQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdBansQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].bans.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/bans
 */
export function useGetGuildsGuildIdBans(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bans']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdBansQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/bans/{user_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdBansUserIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/bans/:user_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/bans/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdBansUserIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdBansUserIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].bans[':user_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/bans/{user_id}
 */
export function useGetGuildsGuildIdBansUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdBansUserIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /guilds/{guild_id}/bans/{user_id}
 */
export function usePutGuildsGuildIdBansUserId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].bans[':user_id'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /guilds/{guild_id}/bans/{user_id}
 */
export function useDeleteGuildsGuildIdBansUserId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].bans[':user_id'].$delete(args, clientOptions)),
  })
}

/**
 * POST /guilds/{guild_id}/bulk-ban
 */
export function usePostGuildsGuildIdBulkBan(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>,
    ) => parseResponse(client.guilds[':guild_id']['bulk-ban'].$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/channels
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdChannelsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/channels', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/channels
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdChannelsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdChannelsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].channels.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/channels
 */
export function useGetGuildsGuildIdChannels(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['channels']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdChannelsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /guilds/{guild_id}/channels
 */
export function usePostGuildsGuildIdChannels(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['channels']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].channels.$post(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/channels
 */
export function usePatchGuildsGuildIdChannels(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['channels']['$patch']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].channels.$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/emojis
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdEmojisQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/emojis', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/emojis
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdEmojisQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdEmojisQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].emojis.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/emojis
 */
export function useGetGuildsGuildIdEmojis(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['emojis']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdEmojisQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /guilds/{guild_id}/emojis
 */
export function usePostGuildsGuildIdEmojis(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['emojis']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].emojis.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/emojis/{emoji_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdEmojisEmojiIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/emojis/:emoji_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/emojis/{emoji_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdEmojisEmojiIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdEmojisEmojiIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].emojis[':emoji_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useGetGuildsGuildIdEmojisEmojiId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdEmojisEmojiIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useDeleteGuildsGuildIdEmojisEmojiId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/emojis/{emoji_id}
 */
export function usePatchGuildsGuildIdEmojisEmojiId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/integrations
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdIntegrationsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/integrations', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/integrations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdIntegrationsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdIntegrationsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].integrations.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/integrations
 */
export function useGetGuildsGuildIdIntegrations(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['integrations']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdIntegrationsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /guilds/{guild_id}/integrations/{integration_id}
 */
export function useDeleteGuildsGuildIdIntegrationsIntegrationId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id'].integrations[':integration_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/invites
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdInvitesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/invites', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/invites
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdInvitesQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdInvitesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].invites.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/invites
 */
export function useGetGuildsGuildIdInvites(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['invites']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdInvitesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/members
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdMembersQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/members', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/members
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdMembersQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdMembersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].members.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/members
 */
export function useGetGuildsGuildIdMembers(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['members']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdMembersQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PATCH /guilds/{guild_id}/members/@me
 */
export function usePatchGuildsGuildIdMembersMe(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].members['@me'].$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/members/search
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdMembersSearchQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/members/search', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/members/search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdMembersSearchQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdMembersSearchQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].members.search.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/members/search
 */
export function useGetGuildsGuildIdMembersSearch(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdMembersSearchQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/members/{user_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdMembersUserIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/members/:user_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/members/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdMembersUserIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdMembersUserIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].members[':user_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/members/{user_id}
 */
export function useGetGuildsGuildIdMembersUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdMembersUserIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}
 */
export function usePutGuildsGuildIdMembersUserId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}
 */
export function useDeleteGuildsGuildIdMembersUserId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/members/{user_id}
 */
export function usePatchGuildsGuildIdMembersUserId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$patch(args, clientOptions)),
  })
}

/**
 * PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function usePutGuildsGuildIdMembersUserIdRolesRoleId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$put(args, clientOptions),
      ),
  })
}

/**
 * DELETE /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdMembersUserIdRolesRoleId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/new-member-welcome
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdNewMemberWelcomeQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/new-member-welcome', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/new-member-welcome
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdNewMemberWelcomeQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdNewMemberWelcomeQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id']['new-member-welcome'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/new-member-welcome
 */
export function useGetGuildsGuildIdNewMemberWelcome(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdNewMemberWelcomeQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/onboarding
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdOnboardingQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/onboarding', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/onboarding
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdOnboardingQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdOnboardingQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].onboarding.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/onboarding
 */
export function useGetGuildsGuildIdOnboarding(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdOnboardingQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /guilds/{guild_id}/onboarding
 */
export function usePutGuildsGuildIdOnboarding(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].onboarding.$put(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/preview
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdPreviewQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/preview', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/preview
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdPreviewQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdPreviewQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].preview.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/preview
 */
export function useGetGuildsGuildIdPreview(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['preview']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdPreviewQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/prune
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdPruneQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/prune', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/prune
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdPruneQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdPruneQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].prune.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/prune
 */
export function useGetGuildsGuildIdPrune(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['prune']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdPruneQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /guilds/{guild_id}/prune
 */
export function usePostGuildsGuildIdPrune(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['prune']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].prune.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/regions
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdRegionsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/regions', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/regions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdRegionsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdRegionsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].regions.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/regions
 */
export function useGetGuildsGuildIdRegions(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['regions']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdRegionsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/roles
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdRolesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/roles', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/roles
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdRolesQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdRolesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].roles.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/roles
 */
export function useGetGuildsGuildIdRoles(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdRolesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /guilds/{guild_id}/roles
 */
export function usePostGuildsGuildIdRoles(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].roles.$post(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/roles
 */
export function usePatchGuildsGuildIdRoles(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].roles.$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/roles/{role_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdRolesRoleIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/roles/:role_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/roles/{role_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdRolesRoleIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdRolesRoleIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].roles[':role_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/roles/{role_id}
 */
export function useGetGuildsGuildIdRolesRoleId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdRolesRoleIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /guilds/{guild_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdRolesRoleId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].roles[':role_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/roles/{role_id}
 */
export function usePatchGuildsGuildIdRolesRoleId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].roles[':role_id'].$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/scheduled-events
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdScheduledEventsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/scheduled-events', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/scheduled-events
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdScheduledEventsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdScheduledEventsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id']['scheduled-events'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/scheduled-events
 */
export function useGetGuildsGuildIdScheduledEvents(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdScheduledEventsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /guilds/{guild_id}/scheduled-events
 */
export function usePostGuildsGuildIdScheduledEvents(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>,
    ) => parseResponse(client.guilds[':guild_id']['scheduled-events'].$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
) {
  return ['guilds', '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryOptions = (
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function useGetGuildsGuildIdScheduledEventsGuildScheduledEventId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function useDeleteGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * PATCH /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function usePatchGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
) {
  return [
    'guilds',
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users',
    args,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryOptions = (
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id']['scheduled-events'][':guild_scheduled_event_id'].users.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 */
export function useGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/soundboard-sounds
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdSoundboardSoundsQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/soundboard-sounds', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/soundboard-sounds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdSoundboardSoundsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdSoundboardSoundsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id']['soundboard-sounds'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/soundboard-sounds
 */
export function useGetGuildsGuildIdSoundboardSounds(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdSoundboardSoundsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /guilds/{guild_id}/soundboard-sounds
 */
export function usePostGuildsGuildIdSoundboardSounds(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>,
    ) => parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdSoundboardSoundsSoundIdQueryKey(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
) {
  return ['guilds', '/guilds/:guild_id/soundboard-sounds/:sound_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdSoundboardSoundsSoundIdQueryOptions = (
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdSoundboardSoundsSoundIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function useGetGuildsGuildIdSoundboardSoundsSoundId(
  args: InferRequestType<
    (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetGuildsGuildIdSoundboardSoundsSoundIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function useDeleteGuildsGuildIdSoundboardSoundsSoundId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * PATCH /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function usePatchGuildsGuildIdSoundboardSoundsSoundId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$patch(args, clientOptions),
      ),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/stickers
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdStickersQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/stickers', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/stickers
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdStickersQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdStickersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].stickers.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/stickers
 */
export function useGetGuildsGuildIdStickers(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['stickers']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdStickersQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /guilds/{guild_id}/stickers
 */
export function usePostGuildsGuildIdStickers(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['stickers']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].stickers.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/stickers/{sticker_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdStickersStickerIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/stickers/:sticker_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/stickers/{sticker_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdStickersStickerIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdStickersStickerIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].stickers[':sticker_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useGetGuildsGuildIdStickersStickerId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdStickersStickerIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useDeleteGuildsGuildIdStickersStickerId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id'].stickers[':sticker_id'].$delete(args, clientOptions),
      ),
  })
}

/**
 * PATCH /guilds/{guild_id}/stickers/{sticker_id}
 */
export function usePatchGuildsGuildIdStickersStickerId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']
      >,
    ) =>
      parseResponse(client.guilds[':guild_id'].stickers[':sticker_id'].$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/templates
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdTemplatesQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/templates', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/templates
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdTemplatesQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdTemplatesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].templates.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/templates
 */
export function useGetGuildsGuildIdTemplates(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdTemplatesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /guilds/{guild_id}/templates
 */
export function usePostGuildsGuildIdTemplates(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>,
    ) => parseResponse(client.guilds[':guild_id'].templates.$post(args, clientOptions)),
  })
}

/**
 * PUT /guilds/{guild_id}/templates/{code}
 */
export function usePutGuildsGuildIdTemplatesCode(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>,
    ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /guilds/{guild_id}/templates/{code}
 */
export function useDeleteGuildsGuildIdTemplatesCode(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>,
    ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /guilds/{guild_id}/templates/{code}
 */
export function usePatchGuildsGuildIdTemplatesCode(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/threads/active
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdThreadsActiveQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/threads/active', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/threads/active
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdThreadsActiveQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdThreadsActiveQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].threads.active.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/threads/active
 */
export function useGetGuildsGuildIdThreadsActive(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdThreadsActiveQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/vanity-url
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdVanityUrlQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/vanity-url', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/vanity-url
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdVanityUrlQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdVanityUrlQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id']['vanity-url'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/vanity-url
 */
export function useGetGuildsGuildIdVanityUrl(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdVanityUrlQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/voice-states/@me
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdVoiceStatesMeQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/voice-states/@me', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/voice-states/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdVoiceStatesMeQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdVoiceStatesMeQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id']['voice-states']['@me'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/voice-states/@me
 */
export function useGetGuildsGuildIdVoiceStatesMe(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdVoiceStatesMeQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PATCH /guilds/{guild_id}/voice-states/@me
 */
export function usePatchGuildsGuildIdVoiceStatesMe(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>,
    ) =>
      parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/voice-states/{user_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdVoiceStatesUserIdQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/voice-states/:user_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/voice-states/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdVoiceStatesUserIdQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdVoiceStatesUserIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id']['voice-states'][':user_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/voice-states/{user_id}
 */
export function useGetGuildsGuildIdVoiceStatesUserId(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdVoiceStatesUserIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PATCH /guilds/{guild_id}/voice-states/{user_id}
 */
export function usePatchGuildsGuildIdVoiceStatesUserId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']
      >,
    ) =>
      parseResponse(
        client.guilds[':guild_id']['voice-states'][':user_id'].$patch(args, clientOptions),
      ),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/webhooks
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdWebhooksQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/webhooks', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/webhooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdWebhooksQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdWebhooksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].webhooks.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/webhooks
 */
export function useGetGuildsGuildIdWebhooks(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdWebhooksQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/welcome-screen
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdWelcomeScreenQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/welcome-screen', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/welcome-screen
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdWelcomeScreenQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdWelcomeScreenQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id']['welcome-screen'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/welcome-screen
 */
export function useGetGuildsGuildIdWelcomeScreen(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdWelcomeScreenQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PATCH /guilds/{guild_id}/welcome-screen
 */
export function usePatchGuildsGuildIdWelcomeScreen(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id']['welcome-screen'].$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/widget
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdWidgetQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/widget', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/widget
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdWidgetQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdWidgetQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].widget.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/widget
 */
export function useGetGuildsGuildIdWidget(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['widget']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdWidgetQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PATCH /guilds/{guild_id}/widget
 */
export function usePatchGuildsGuildIdWidget(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.guilds)[':guild_id']['widget']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>,
    ) => parseResponse(client.guilds[':guild_id'].widget.$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/widget.json
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdWidgetJsonQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/widget.json', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/widget.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdWidgetJsonQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdWidgetJsonQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id']['widget.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/widget.json
 */
export function useGetGuildsGuildIdWidgetJson(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdWidgetJsonQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /guilds/{guild_id}/widget.png
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetGuildsGuildIdWidgetPngQueryKey(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
) {
  return ['guilds', '/guilds/:guild_id/widget.png', args] as const
}

/**
 * Returns TanStack Query query options for GET /guilds/{guild_id}/widget.png
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdWidgetPngQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdWidgetPngQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id']['widget.png'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/widget.png
 */
export function useGetGuildsGuildIdWidgetPng(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdWidgetPngQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /interactions/{interaction_id}/{interaction_token}/callback
 */
export function usePostInteractionsInteractionIdInteractionTokenCallback(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.interactions)[':interaction_id'][':interaction_token']['callback']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * Generates TanStack Query cache key for GET /invites/{code}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetInvitesCodeQueryKey(
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
) {
  return ['invites', '/invites/:code', args] as const
}

/**
 * Returns TanStack Query query options for GET /invites/{code}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetInvitesCodeQueryOptions = (
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetInvitesCodeQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.invites[':code'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /invites/{code}
 */
export function useGetInvitesCode(
  args: InferRequestType<(typeof client.invites)[':code']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.invites)[':code']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetInvitesCodeQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /invites/{code}
 */
export function useDeleteInvitesCode(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.invites)[':code']['$delete']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.invites)[':code']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.invites)[':code']['$delete']>) =>
      parseResponse(client.invites[':code'].$delete(args, clientOptions)),
  })
}

/**
 * PUT /lobbies
 */
export function usePutLobbies(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.lobbies.$put>>>>>,
    Error,
    InferRequestType<typeof client.lobbies.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.lobbies.$put>) =>
      parseResponse(client.lobbies.$put(args, clientOptions)),
  })
}

/**
 * POST /lobbies
 */
export function usePostLobbies(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.lobbies.$post>>>>>,
    Error,
    InferRequestType<typeof client.lobbies.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.lobbies.$post>) =>
      parseResponse(client.lobbies.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /lobbies/{lobby_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetLobbiesLobbyIdQueryKey(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
) {
  return ['lobbies', '/lobbies/:lobby_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /lobbies/{lobby_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetLobbiesLobbyIdQueryOptions = (
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetLobbiesLobbyIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.lobbies[':lobby_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /lobbies/{lobby_id}
 */
export function useGetLobbiesLobbyId(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetLobbiesLobbyIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PATCH /lobbies/{lobby_id}
 */
export function usePatchLobbiesLobbyId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>) =>
      parseResponse(client.lobbies[':lobby_id'].$patch(args, clientOptions)),
  })
}

/**
 * PATCH /lobbies/{lobby_id}/channel-linking
 */
export function usePatchLobbiesLobbyIdChannelLinking(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>,
    ) => parseResponse(client.lobbies[':lobby_id']['channel-linking'].$patch(args, clientOptions)),
  })
}

/**
 * DELETE /lobbies/{lobby_id}/members/@me
 */
export function useDeleteLobbiesLobbyIdMembersMe(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>,
    ) => parseResponse(client.lobbies[':lobby_id'].members['@me'].$delete(args, clientOptions)),
  })
}

/**
 * POST /lobbies/{lobby_id}/members/@me/invites
 */
export function usePostLobbiesLobbyIdMembersMeInvites(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']
      >,
    ) =>
      parseResponse(client.lobbies[':lobby_id'].members['@me'].invites.$post(args, clientOptions)),
  })
}

/**
 * POST /lobbies/{lobby_id}/members/bulk
 */
export function usePostLobbiesLobbyIdMembersBulk(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>,
    ) => parseResponse(client.lobbies[':lobby_id'].members.bulk.$post(args, clientOptions)),
  })
}

/**
 * PUT /lobbies/{lobby_id}/members/{user_id}
 */
export function usePutLobbiesLobbyIdMembersUserId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>,
    ) => parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$put(args, clientOptions)),
  })
}

/**
 * DELETE /lobbies/{lobby_id}/members/{user_id}
 */
export function useDeleteLobbiesLobbyIdMembersUserId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']
      >,
    ) =>
      parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$delete(args, clientOptions)),
  })
}

/**
 * POST /lobbies/{lobby_id}/members/{user_id}/invites
 */
export function usePostLobbiesLobbyIdMembersUserIdInvites(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
      >,
    ) =>
      parseResponse(
        client.lobbies[':lobby_id'].members[':user_id'].invites.$post(args, clientOptions),
      ),
  })
}

/**
 * Generates TanStack Query cache key for GET /lobbies/{lobby_id}/messages
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetLobbiesLobbyIdMessagesQueryKey(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
) {
  return ['lobbies', '/lobbies/:lobby_id/messages', args] as const
}

/**
 * Returns TanStack Query query options for GET /lobbies/{lobby_id}/messages
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetLobbiesLobbyIdMessagesQueryOptions = (
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetLobbiesLobbyIdMessagesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.lobbies[':lobby_id'].messages.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /lobbies/{lobby_id}/messages
 */
export function useGetLobbiesLobbyIdMessages(
  args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetLobbiesLobbyIdMessagesQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /lobbies/{lobby_id}/messages
 */
export function usePostLobbiesLobbyIdMessages(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>,
    ) => parseResponse(client.lobbies[':lobby_id'].messages.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /oauth2/@me
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetOauth2MeQueryKey() {
  return ['oauth2', '/oauth2/@me'] as const
}

/**
 * Returns TanStack Query query options for GET /oauth2/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauth2MeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOauth2MeQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.oauth2['@me'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /oauth2/@me
 */
export function useGetOauth2Me(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.oauth2)['@me']['$get']>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOauth2MeQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /oauth2/applications/@me
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetOauth2ApplicationsMeQueryKey() {
  return ['oauth2', '/oauth2/applications/@me'] as const
}

/**
 * Returns TanStack Query query options for GET /oauth2/applications/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauth2ApplicationsMeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOauth2ApplicationsMeQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.oauth2.applications['@me'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /oauth2/applications/@me
 */
export function useGetOauth2ApplicationsMe(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['$get']>>
        >
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetOauth2ApplicationsMeQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /oauth2/keys
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetOauth2KeysQueryKey() {
  return ['oauth2', '/oauth2/keys'] as const
}

/**
 * Returns TanStack Query query options for GET /oauth2/keys
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauth2KeysQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOauth2KeysQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.oauth2.keys.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /oauth2/keys
 */
export function useGetOauth2Keys(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth2.keys.$get>>>>>,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOauth2KeysQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /oauth2/userinfo
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetOauth2UserinfoQueryKey() {
  return ['oauth2', '/oauth2/userinfo'] as const
}

/**
 * Returns TanStack Query query options for GET /oauth2/userinfo
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOauth2UserinfoQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetOauth2UserinfoQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.oauth2.userinfo.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /oauth2/userinfo
 */
export function useGetOauth2Userinfo(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth2.userinfo.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOauth2UserinfoQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge
 */
export function usePostPartnerSdkProvisionalAccountsUnmerge(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']
      >,
    ) =>
      parseResponse(
        client['partner-sdk']['provisional-accounts'].unmerge.$post(args, clientOptions),
      ),
  })
}

/**
 * POST /partner-sdk/provisional-accounts/unmerge/bot
 */
export function usePostPartnerSdkProvisionalAccountsUnmergeBot(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
      >,
    ) =>
      parseResponse(
        client['partner-sdk']['provisional-accounts'].unmerge.bot.$post(args, clientOptions),
      ),
  })
}

/**
 * POST /partner-sdk/token
 */
export function usePostPartnerSdkToken(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['partner-sdk']['token']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client)['partner-sdk']['token']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['partner-sdk']['token']['$post']>) =>
      parseResponse(client['partner-sdk'].token.$post(args, clientOptions)),
  })
}

/**
 * POST /partner-sdk/token/bot
 */
export function usePostPartnerSdkTokenBot(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['partner-sdk']['token']['bot']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>,
    ) => parseResponse(client['partner-sdk'].token.bot.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /soundboard-default-sounds
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetSoundboardDefaultSoundsQueryKey() {
  return ['soundboard-default-sounds', '/soundboard-default-sounds'] as const
}

/**
 * Returns TanStack Query query options for GET /soundboard-default-sounds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSoundboardDefaultSoundsQueryOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSoundboardDefaultSoundsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['soundboard-default-sounds'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /soundboard-default-sounds
 */
export function useGetSoundboardDefaultSounds(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['$get']>>
        >
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetSoundboardDefaultSoundsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /stage-instances
 */
export function usePostStageInstances(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['stage-instances']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client)['stage-instances']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client)['stage-instances']['$post']>) =>
      parseResponse(client['stage-instances'].$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /stage-instances/{channel_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetStageInstancesChannelIdQueryKey(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
) {
  return ['stage-instances', '/stage-instances/:channel_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /stage-instances/{channel_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStageInstancesChannelIdQueryOptions = (
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetStageInstancesChannelIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['stage-instances'][':channel_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /stage-instances/{channel_id}
 */
export function useGetStageInstancesChannelId(
  args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['stage-instances'][':channel_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetStageInstancesChannelIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /stage-instances/{channel_id}
 */
export function useDeleteStageInstancesChannelId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['stage-instances'][':channel_id']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>,
    ) => parseResponse(client['stage-instances'][':channel_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /stage-instances/{channel_id}
 */
export function usePatchStageInstancesChannelId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['stage-instances'][':channel_id']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>,
    ) => parseResponse(client['stage-instances'][':channel_id'].$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /sticker-packs
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetStickerPacksQueryKey() {
  return ['sticker-packs', '/sticker-packs'] as const
}

/**
 * Returns TanStack Query query options for GET /sticker-packs
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStickerPacksQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetStickerPacksQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['sticker-packs'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /sticker-packs
 */
export function useGetStickerPacks(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client)['sticker-packs']['$get']>>>
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetStickerPacksQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /sticker-packs/{pack_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetStickerPacksPackIdQueryKey(
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
) {
  return ['sticker-packs', '/sticker-packs/:pack_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /sticker-packs/{pack_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStickerPacksPackIdQueryOptions = (
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetStickerPacksPackIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['sticker-packs'][':pack_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /sticker-packs/{pack_id}
 */
export function useGetStickerPacksPackId(
  args: InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['sticker-packs'][':pack_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetStickerPacksPackIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /stickers/{sticker_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetStickersStickerIdQueryKey(
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
) {
  return ['stickers', '/stickers/:sticker_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /stickers/{sticker_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStickersStickerIdQueryOptions = (
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetStickersStickerIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.stickers[':sticker_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /stickers/{sticker_id}
 */
export function useGetStickersStickerId(
  args: InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.stickers)[':sticker_id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetStickersStickerIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /users/@me
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetUsersMeQueryKey() {
  return ['users', '/users/@me'] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetUsersMeQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users['@me'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/@me
 */
export function useGetUsersMe(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)['@me']['$get']>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersMeQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PATCH /users/@me
 */
export function usePatchUsersMe(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.users)['@me']['$patch']>>>>
    >,
    Error,
    InferRequestType<(typeof client.users)['@me']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.users)['@me']['$patch']>) =>
      parseResponse(client.users['@me'].$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /users/@me/applications/{application_id}/entitlements
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersMeApplicationsApplicationIdEntitlementsQueryKey(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
) {
  return ['users', '/users/@me/applications/:application_id/entitlements', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me/applications/{application_id}/entitlements
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeApplicationsApplicationIdEntitlementsQueryOptions = (
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersMeApplicationsApplicationIdEntitlementsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users['@me'].applications[':application_id'].entitlements.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/@me/applications/{application_id}/entitlements
 */
export function useGetUsersMeApplicationsApplicationIdEntitlements(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetUsersMeApplicationsApplicationIdEntitlementsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /users/@me/applications/{application_id}/role-connection
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersMeApplicationsApplicationIdRoleConnectionQueryKey(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
) {
  return ['users', '/users/@me/applications/:application_id/role-connection', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me/applications/{application_id}/role-connection
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeApplicationsApplicationIdRoleConnectionQueryOptions = (
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersMeApplicationsApplicationIdRoleConnectionQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users['@me'].applications[':application_id']['role-connection'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/@me/applications/{application_id}/role-connection
 */
export function useGetUsersMeApplicationsApplicationIdRoleConnection(
  args: InferRequestType<
    (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetUsersMeApplicationsApplicationIdRoleConnectionQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * PUT /users/@me/applications/{application_id}/role-connection
 */
export function usePutUsersMeApplicationsApplicationIdRoleConnection(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$put']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * DELETE /users/@me/applications/{application_id}/role-connection
 */
export function useDeleteUsersMeApplicationsApplicationIdRoleConnection(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * POST /users/@me/channels
 */
export function usePostUsersMeChannels(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.users)['@me']['channels']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.users)['@me']['channels']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.users)['@me']['channels']['$post']>) =>
      parseResponse(client.users['@me'].channels.$post(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /users/@me/connections
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetUsersMeConnectionsQueryKey() {
  return ['users', '/users/@me/connections'] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me/connections
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeConnectionsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetUsersMeConnectionsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users['@me'].connections.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/@me/connections
 */
export function useGetUsersMeConnections(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.users)['@me']['connections']['$get']>>
        >
      >
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersMeConnectionsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /users/@me/guilds
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersMeGuildsQueryKey(
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
) {
  return ['users', '/users/@me/guilds', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me/guilds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeGuildsQueryOptions = (
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersMeGuildsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users['@me'].guilds.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/@me/guilds
 */
export function useGetUsersMeGuilds(
  args: InferRequestType<(typeof client.users)['@me']['guilds']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)['@me']['guilds']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersMeGuildsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /users/@me/guilds/{guild_id}
 */
export function useDeleteUsersMeGuildsGuildId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>,
    ) => parseResponse(client.users['@me'].guilds[':guild_id'].$delete(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /users/@me/guilds/{guild_id}/member
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersMeGuildsGuildIdMemberQueryKey(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
) {
  return ['users', '/users/@me/guilds/:guild_id/member', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/@me/guilds/{guild_id}/member
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersMeGuildsGuildIdMemberQueryOptions = (
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersMeGuildsGuildIdMemberQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users['@me'].guilds[':guild_id'].member.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/@me/guilds/{guild_id}/member
 */
export function useGetUsersMeGuildsGuildIdMember(
  args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersMeGuildsGuildIdMemberQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /users/{user_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return ['users', '/users/:user_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /users/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdQueryOptions = (
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersUserIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users[':user_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/{user_id}
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':user_id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersUserIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /voice/regions
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetVoiceRegionsQueryKey() {
  return ['voice', '/voice/regions'] as const
}

/**
 * Returns TanStack Query query options for GET /voice/regions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetVoiceRegionsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetVoiceRegionsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.voice.regions.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /voice/regions
 */
export function useGetVoiceRegions(options?: {
  query?: UseQueryOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.voice.regions.$get>>>>
    >,
    Error
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetVoiceRegionsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetWebhooksWebhookIdQueryKey(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
) {
  return ['webhooks', '/webhooks/:webhook_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /webhooks/{webhook_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksWebhookIdQueryOptions = (
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetWebhooksWebhookIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.webhooks[':webhook_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /webhooks/{webhook_id}
 */
export function useGetWebhooksWebhookId(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.webhooks)[':webhook_id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetWebhooksWebhookIdQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /webhooks/{webhook_id}
 */
export function useDeleteWebhooksWebhookId(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.webhooks)[':webhook_id']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>,
    ) => parseResponse(client.webhooks[':webhook_id'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /webhooks/{webhook_id}
 */
export function usePatchWebhooksWebhookId(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.webhooks)[':webhook_id']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>) =>
      parseResponse(client.webhooks[':webhook_id'].$patch(args, clientOptions)),
  })
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}/{webhook_token}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetWebhooksWebhookIdWebhookTokenQueryKey(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
) {
  return ['webhooks', '/webhooks/:webhook_id/:webhook_token', args] as const
}

/**
 * Returns TanStack Query query options for GET /webhooks/{webhook_id}/{webhook_token}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksWebhookIdWebhookTokenQueryOptions = (
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetWebhooksWebhookIdWebhookTokenQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.webhooks[':webhook_id'][':webhook_token'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /webhooks/{webhook_id}/{webhook_token}
 */
export function useGetWebhooksWebhookIdWebhookToken(
  args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetWebhooksWebhookIdWebhookTokenQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}
 */
export function usePostWebhooksWebhookIdWebhookToken(options?: {
  mutation?: UseMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>,
    ) => parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$post(args, clientOptions)),
  })
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}
 */
export function useDeleteWebhooksWebhookIdWebhookToken(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>,
    ) =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}
 */
export function usePatchWebhooksWebhookIdWebhookToken(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>,
    ) =>
      parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$patch(args, clientOptions)),
  })
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/github
 */
export function usePostWebhooksWebhookIdWebhookTokenGithub(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
      >,
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].github.$post(args, clientOptions),
      ),
  })
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
) {
  return ['webhooks', '/webhooks/:webhook_id/:webhook_token/messages/@original', args] as const
}

/**
 * Returns TanStack Query query options for GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryOptions = (
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.webhooks[':webhook_id'][':webhook_token'].messages['@original'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function useGetWebhooksWebhookIdWebhookTokenMessagesOriginal(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function usePatchWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
) {
  return ['webhooks', '/webhooks/:webhook_id/:webhook_token/messages/:message_id', args] as const
}

/**
 * Returns TanStack Query query options for GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryOptions = (
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.webhooks[':webhook_id'][':webhook_token'].messages[':message_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function useGetWebhooksWebhookIdWebhookTokenMessagesMessageId(
  args: InferRequestType<
    (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function usePatchWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$patch']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
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
  })
}

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/slack
 */
export function usePostWebhooksWebhookIdWebhookTokenSlack(options?: {
  mutation?: UseMutationOptions<
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
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
      >,
    ) =>
      parseResponse(
        client.webhooks[':webhook_id'][':webhook_token'].slack.$post(args, clientOptions),
      ),
  })
}
