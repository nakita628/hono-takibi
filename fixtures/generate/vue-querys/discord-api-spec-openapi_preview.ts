import type { QueryFunctionContext, UseMutationOptions, UseQueryOptions } from '@tanstack/vue-query'
import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { MaybeRef } from 'vue'
import { unref } from 'vue'
import { client } from '../clients/discord-api-spec-openapi_preview'

/**
 * Generates Vue Query cache key for GET /applications/@me
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetApplicationsMeQueryKey() {
  return ['applications', 'GET', '/applications/@me'] as const
}

/**
 * Returns Vue Query query options for GET /applications/@me
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.applications)['@me']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetApplicationsMeQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PATCH /applications/@me
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchApplicationsMeMutationKey() {
  return ['applications', 'PATCH', '/applications/@me'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /applications/@me
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchApplicationsMeMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchApplicationsMeMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.applications)['@me']['$patch']>) =>
    parseResponse(client.applications['@me'].$patch(args, clientOptions)),
})

/**
 * PATCH /applications/@me
 */
export function usePatchApplicationsMe(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.applications)['@me']['$patch']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.applications)['@me']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchApplicationsMeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApplicationsApplicationIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.applications)[':application_id']['$get']>>,
) {
  return ['applications', 'GET', '/applications/:application_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /applications/{application_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.applications)[':application_id']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PATCH /applications/{application_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchApplicationsApplicationIdMutationKey() {
  return ['applications', 'PATCH', '/applications/:application_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /applications/{application_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchApplicationsApplicationIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchApplicationsApplicationIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.applications)[':application_id']['$patch']>,
  ) => parseResponse(client.applications[':application_id'].$patch(args, clientOptions)),
})

/**
 * PATCH /applications/{application_id}
 */
export function usePatchApplicationsApplicationId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.applications)[':application_id']['$patch']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.applications)[':application_id']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchApplicationsApplicationIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/activity-instances/{instance_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.applications)[':application_id']['activity-instances'][':instance_id']['$get']
    >
  >,
) {
  return [
    'applications',
    'GET',
    '/applications/:application_id/activity-instances/:instance_id',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /applications/{application_id}/activity-instances/{instance_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /applications/{application_id}/attachment
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostApplicationsApplicationIdAttachmentMutationKey() {
  return ['applications', 'POST', '/applications/:application_id/attachment'] as const
}

/**
 * Returns Vue Query mutation options for POST /applications/{application_id}/attachment
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostApplicationsApplicationIdAttachmentMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostApplicationsApplicationIdAttachmentMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.applications)[':application_id']['attachment']['$post']>,
  ) => parseResponse(client.applications[':application_id'].attachment.$post(args, clientOptions)),
})

/**
 * POST /applications/{application_id}/attachment
 */
export function usePostApplicationsApplicationIdAttachment(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostApplicationsApplicationIdAttachmentMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/commands
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApplicationsApplicationIdCommandsQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.applications)[':application_id']['commands']['$get']>
  >,
) {
  return ['applications', 'GET', '/applications/:application_id/commands', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /applications/{application_id}/commands
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.applications)[':application_id']['commands']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PUT /applications/{application_id}/commands
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutApplicationsApplicationIdCommandsMutationKey() {
  return ['applications', 'PUT', '/applications/:application_id/commands'] as const
}

/**
 * Returns Vue Query mutation options for PUT /applications/{application_id}/commands
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutApplicationsApplicationIdCommandsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutApplicationsApplicationIdCommandsMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>,
  ) => parseResponse(client.applications[':application_id'].commands.$put(args, clientOptions)),
})

/**
 * PUT /applications/{application_id}/commands
 */
export function usePutApplicationsApplicationIdCommands(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<(typeof client.applications)[':application_id']['commands']['$put']>
              >
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.applications)[':application_id']['commands']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutApplicationsApplicationIdCommandsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /applications/{application_id}/commands
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostApplicationsApplicationIdCommandsMutationKey() {
  return ['applications', 'POST', '/applications/:application_id/commands'] as const
}

/**
 * Returns Vue Query mutation options for POST /applications/{application_id}/commands
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostApplicationsApplicationIdCommandsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostApplicationsApplicationIdCommandsMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>,
  ) => parseResponse(client.applications[':application_id'].commands.$post(args, clientOptions)),
})

/**
 * POST /applications/{application_id}/commands
 */
export function usePostApplicationsApplicationIdCommands(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<(typeof client.applications)[':application_id']['commands']['$post']>
              >
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.applications)[':application_id']['commands']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostApplicationsApplicationIdCommandsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/commands/{command_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApplicationsApplicationIdCommandsCommandIdQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$get']
    >
  >,
) {
  return [
    'applications',
    'GET',
    '/applications/:application_id/commands/:command_id',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /applications/{application_id}/commands/{command_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /applications/{application_id}/commands/{command_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteApplicationsApplicationIdCommandsCommandIdMutationKey() {
  return ['applications', 'DELETE', '/applications/:application_id/commands/:command_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /applications/{application_id}/commands/{command_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteApplicationsApplicationIdCommandsCommandIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteApplicationsApplicationIdCommandsCommandIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$delete']
    >,
  ) =>
    parseResponse(
      client.applications[':application_id'].commands[':command_id'].$delete(args, clientOptions),
    ),
})

/**
 * DELETE /applications/{application_id}/commands/{command_id}
 */
export function useDeleteApplicationsApplicationIdCommandsCommandId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteApplicationsApplicationIdCommandsCommandIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /applications/{application_id}/commands/{command_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchApplicationsApplicationIdCommandsCommandIdMutationKey() {
  return ['applications', 'PATCH', '/applications/:application_id/commands/:command_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /applications/{application_id}/commands/{command_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchApplicationsApplicationIdCommandsCommandIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchApplicationsApplicationIdCommandsCommandIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.applications)[':application_id']['commands'][':command_id']['$patch']
    >,
  ) =>
    parseResponse(
      client.applications[':application_id'].commands[':command_id'].$patch(args, clientOptions),
    ),
})

/**
 * PATCH /applications/{application_id}/commands/{command_id}
 */
export function usePatchApplicationsApplicationIdCommandsCommandId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchApplicationsApplicationIdCommandsCommandIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/emojis
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApplicationsApplicationIdEmojisQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.applications)[':application_id']['emojis']['$get']>
  >,
) {
  return ['applications', 'GET', '/applications/:application_id/emojis', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /applications/{application_id}/emojis
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.applications)[':application_id']['emojis']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /applications/{application_id}/emojis
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostApplicationsApplicationIdEmojisMutationKey() {
  return ['applications', 'POST', '/applications/:application_id/emojis'] as const
}

/**
 * Returns Vue Query mutation options for POST /applications/{application_id}/emojis
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostApplicationsApplicationIdEmojisMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostApplicationsApplicationIdEmojisMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>,
  ) => parseResponse(client.applications[':application_id'].emojis.$post(args, clientOptions)),
})

/**
 * POST /applications/{application_id}/emojis
 */
export function usePostApplicationsApplicationIdEmojis(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<(typeof client.applications)[':application_id']['emojis']['$post']>
              >
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.applications)[':application_id']['emojis']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostApplicationsApplicationIdEmojisMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/emojis/{emoji_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApplicationsApplicationIdEmojisEmojiIdQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.applications)[':application_id']['emojis'][':emoji_id']['$get']>
  >,
) {
  return [
    'applications',
    'GET',
    '/applications/:application_id/emojis/:emoji_id',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /applications/{application_id}/emojis/{emoji_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /applications/{application_id}/emojis/{emoji_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteApplicationsApplicationIdEmojisEmojiIdMutationKey() {
  return ['applications', 'DELETE', '/applications/:application_id/emojis/:emoji_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /applications/{application_id}/emojis/{emoji_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteApplicationsApplicationIdEmojisEmojiIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteApplicationsApplicationIdEmojisEmojiIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$delete']
    >,
  ) =>
    parseResponse(
      client.applications[':application_id'].emojis[':emoji_id'].$delete(args, clientOptions),
    ),
})

/**
 * DELETE /applications/{application_id}/emojis/{emoji_id}
 */
export function useDeleteApplicationsApplicationIdEmojisEmojiId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteApplicationsApplicationIdEmojisEmojiIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /applications/{application_id}/emojis/{emoji_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchApplicationsApplicationIdEmojisEmojiIdMutationKey() {
  return ['applications', 'PATCH', '/applications/:application_id/emojis/:emoji_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /applications/{application_id}/emojis/{emoji_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchApplicationsApplicationIdEmojisEmojiIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchApplicationsApplicationIdEmojisEmojiIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.applications)[':application_id']['emojis'][':emoji_id']['$patch']
    >,
  ) =>
    parseResponse(
      client.applications[':application_id'].emojis[':emoji_id'].$patch(args, clientOptions),
    ),
})

/**
 * PATCH /applications/{application_id}/emojis/{emoji_id}
 */
export function usePatchApplicationsApplicationIdEmojisEmojiId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchApplicationsApplicationIdEmojisEmojiIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/entitlements
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApplicationsApplicationIdEntitlementsQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.applications)[':application_id']['entitlements']['$get']>
  >,
) {
  return ['applications', 'GET', '/applications/:application_id/entitlements', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /applications/{application_id}/entitlements
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<
                    (typeof client.applications)[':application_id']['entitlements']['$get']
                  >
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /applications/{application_id}/entitlements
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostApplicationsApplicationIdEntitlementsMutationKey() {
  return ['applications', 'POST', '/applications/:application_id/entitlements'] as const
}

/**
 * Returns Vue Query mutation options for POST /applications/{application_id}/entitlements
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostApplicationsApplicationIdEntitlementsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostApplicationsApplicationIdEntitlementsMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.applications)[':application_id']['entitlements']['$post']
    >,
  ) =>
    parseResponse(client.applications[':application_id'].entitlements.$post(args, clientOptions)),
})

/**
 * POST /applications/{application_id}/entitlements
 */
export function usePostApplicationsApplicationIdEntitlements(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostApplicationsApplicationIdEntitlementsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/entitlements/{entitlement_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.applications)[':application_id']['entitlements'][':entitlement_id']['$get']
    >
  >,
) {
  return [
    'applications',
    'GET',
    '/applications/:application_id/entitlements/:entitlement_id',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /applications/{application_id}/entitlements/{entitlement_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /applications/{application_id}/entitlements/{entitlement_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationKey() {
  return [
    'applications',
    'DELETE',
    '/applications/:application_id/entitlements/:entitlement_id',
  ] as const
}

/**
 * Returns Vue Query mutation options for DELETE /applications/{application_id}/entitlements/{entitlement_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationKey(),
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

/**
 * DELETE /applications/{application_id}/entitlements/{entitlement_id}
 */
export function useDeleteApplicationsApplicationIdEntitlementsEntitlementId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /applications/{application_id}/entitlements/{entitlement_id}/consume
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationKey() {
  return [
    'applications',
    'POST',
    '/applications/:application_id/entitlements/:entitlement_id/consume',
  ] as const
}

/**
 * Returns Vue Query mutation options for POST /applications/{application_id}/entitlements/{entitlement_id}/consume
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationKey(),
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

/**
 * POST /applications/{application_id}/entitlements/{entitlement_id}/consume
 */
export function usePostApplicationsApplicationIdEntitlementsEntitlementIdConsume(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$get']
    >
  >,
) {
  return [
    'applications',
    'GET',
    '/applications/:application_id/guilds/:guild_id/commands',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PUT /applications/{application_id}/guilds/{guild_id}/commands
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationKey() {
  return ['applications', 'PUT', '/applications/:application_id/guilds/:guild_id/commands'] as const
}

/**
 * Returns Vue Query mutation options for PUT /applications/{application_id}/guilds/{guild_id}/commands
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['$put']
    >,
  ) =>
    parseResponse(
      client.applications[':application_id'].guilds[':guild_id'].commands.$put(args, clientOptions),
    ),
})

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands
 */
export function usePutApplicationsApplicationIdGuildsGuildIdCommands(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /applications/{application_id}/guilds/{guild_id}/commands
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationKey() {
  return [
    'applications',
    'POST',
    '/applications/:application_id/guilds/:guild_id/commands',
  ] as const
}

/**
 * Returns Vue Query mutation options for POST /applications/{application_id}/guilds/{guild_id}/commands
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationKey(),
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

/**
 * POST /applications/{application_id}/guilds/{guild_id}/commands
 */
export function usePostApplicationsApplicationIdGuildsGuildIdCommands(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands']['permissions']['$get']
    >
  >,
) {
  return [
    'applications',
    'GET',
    '/applications/:application_id/guilds/:guild_id/commands/permissions',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands/permissions
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['$get']
    >
  >,
) {
  return [
    'applications',
    'GET',
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey() {
  return [
    'applications',
    'DELETE',
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
  ] as const
}

/**
 * Returns Vue Query mutation options for DELETE /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey(),
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

/**
 * DELETE /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function useDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey() {
  return [
    'applications',
    'PATCH',
    '/applications/:application_id/guilds/:guild_id/commands/:command_id',
  ] as const
}

/**
 * Returns Vue Query mutation options for PATCH /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey(),
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

/**
 * PATCH /applications/{application_id}/guilds/{guild_id}/commands/{command_id}
 */
export function usePatchApplicationsApplicationIdGuildsGuildIdCommandsCommandId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.applications)[':application_id']['guilds'][':guild_id']['commands'][':command_id']['permissions']['$get']
    >
  >,
) {
  return [
    'applications',
    'GET',
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PUT /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsMutationKey() {
  return [
    'applications',
    'PUT',
    '/applications/:application_id/guilds/:guild_id/commands/:command_id/permissions',
  ] as const
}

/**
 * Returns Vue Query mutation options for PUT /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsMutationOptions =
  (clientOptions?: ClientRequestOptions) => ({
    mutationKey:
      getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsMutationKey(),
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

/**
 * PUT /applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions
 */
export function usePutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsMutationOptions(
      clientOptions,
    )
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /applications/{application_id}/role-connections/metadata
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetApplicationsApplicationIdRoleConnectionsMetadataQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.applications)[':application_id']['role-connections']['metadata']['$get']
    >
  >,
) {
  return [
    'applications',
    'GET',
    '/applications/:application_id/role-connections/metadata',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /applications/{application_id}/role-connections/metadata
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PUT /applications/{application_id}/role-connections/metadata
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutApplicationsApplicationIdRoleConnectionsMetadataMutationKey() {
  return ['applications', 'PUT', '/applications/:application_id/role-connections/metadata'] as const
}

/**
 * Returns Vue Query mutation options for PUT /applications/{application_id}/role-connections/metadata
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutApplicationsApplicationIdRoleConnectionsMetadataMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutApplicationsApplicationIdRoleConnectionsMetadataMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.applications)[':application_id']['role-connections']['metadata']['$put']
    >,
  ) =>
    parseResponse(
      client.applications[':application_id']['role-connections'].metadata.$put(args, clientOptions),
    ),
})

/**
 * PUT /applications/{application_id}/role-connections/metadata
 */
export function usePutApplicationsApplicationIdRoleConnectionsMetadata(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutApplicationsApplicationIdRoleConnectionsMetadataMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChannelsChannelIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.channels)[':channel_id']['$get']>>,
) {
  return ['channels', 'GET', '/channels/:channel_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /channels/{channel_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.channels)[':channel_id']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /channels/{channel_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteChannelsChannelIdMutationKey() {
  return ['channels', 'DELETE', '/channels/:channel_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /channels/{channel_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteChannelsChannelIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteChannelsChannelIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.channels)[':channel_id']['$delete']>) =>
    parseResponse(client.channels[':channel_id'].$delete(args, clientOptions)),
})

/**
 * DELETE /channels/{channel_id}
 */
export function useDeleteChannelsChannelId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.channels)[':channel_id']['$delete']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.channels)[':channel_id']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteChannelsChannelIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /channels/{channel_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchChannelsChannelIdMutationKey() {
  return ['channels', 'PATCH', '/channels/:channel_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /channels/{channel_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchChannelsChannelIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchChannelsChannelIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.channels)[':channel_id']['$patch']>) =>
    parseResponse(client.channels[':channel_id'].$patch(args, clientOptions)),
})

/**
 * PATCH /channels/{channel_id}
 */
export function usePatchChannelsChannelId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.channels)[':channel_id']['$patch']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.channels)[':channel_id']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchChannelsChannelIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /channels/{channel_id}/followers
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostChannelsChannelIdFollowersMutationKey() {
  return ['channels', 'POST', '/channels/:channel_id/followers'] as const
}

/**
 * Returns Vue Query mutation options for POST /channels/{channel_id}/followers
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostChannelsChannelIdFollowersMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostChannelsChannelIdFollowersMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>,
  ) => parseResponse(client.channels[':channel_id'].followers.$post(args, clientOptions)),
})

/**
 * POST /channels/{channel_id}/followers
 */
export function usePostChannelsChannelIdFollowers(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.channels)[':channel_id']['followers']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.channels)[':channel_id']['followers']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostChannelsChannelIdFollowersMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/invites
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChannelsChannelIdInvitesQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.channels)[':channel_id']['invites']['$get']>>,
) {
  return ['channels', 'GET', '/channels/:channel_id/invites', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /channels/{channel_id}/invites
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.channels)[':channel_id']['invites']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /channels/{channel_id}/invites
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostChannelsChannelIdInvitesMutationKey() {
  return ['channels', 'POST', '/channels/:channel_id/invites'] as const
}

/**
 * Returns Vue Query mutation options for POST /channels/{channel_id}/invites
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostChannelsChannelIdInvitesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostChannelsChannelIdInvitesMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.channels)[':channel_id']['invites']['$post']>,
  ) => parseResponse(client.channels[':channel_id'].invites.$post(args, clientOptions)),
})

/**
 * POST /channels/{channel_id}/invites
 */
export function usePostChannelsChannelIdInvites(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostChannelsChannelIdInvitesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/messages
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChannelsChannelIdMessagesQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.channels)[':channel_id']['messages']['$get']>>,
) {
  return ['channels', 'GET', '/channels/:channel_id/messages', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /channels/{channel_id}/messages
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.channels)[':channel_id']['messages']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /channels/{channel_id}/messages
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostChannelsChannelIdMessagesMutationKey() {
  return ['channels', 'POST', '/channels/:channel_id/messages'] as const
}

/**
 * Returns Vue Query mutation options for POST /channels/{channel_id}/messages
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostChannelsChannelIdMessagesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostChannelsChannelIdMessagesMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>,
  ) => parseResponse(client.channels[':channel_id'].messages.$post(args, clientOptions)),
})

/**
 * POST /channels/{channel_id}/messages
 */
export function usePostChannelsChannelIdMessages(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.channels)[':channel_id']['messages']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.channels)[':channel_id']['messages']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostChannelsChannelIdMessagesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /channels/{channel_id}/messages/bulk-delete
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostChannelsChannelIdMessagesBulkDeleteMutationKey() {
  return ['channels', 'POST', '/channels/:channel_id/messages/bulk-delete'] as const
}

/**
 * Returns Vue Query mutation options for POST /channels/{channel_id}/messages/bulk-delete
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostChannelsChannelIdMessagesBulkDeleteMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostChannelsChannelIdMessagesBulkDeleteMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id'].messages['bulk-delete'].$post(args, clientOptions),
    ),
})

/**
 * POST /channels/{channel_id}/messages/bulk-delete
 */
export function usePostChannelsChannelIdMessagesBulkDelete(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
        InferRequestType<
          (typeof client.channels)[':channel_id']['messages']['bulk-delete']['$post']
        >
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostChannelsChannelIdMessagesBulkDeleteMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/messages/pins
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChannelsChannelIdMessagesPinsQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>
  >,
) {
  return ['channels', 'GET', '/channels/:channel_id/messages/pins', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /channels/{channel_id}/messages/pins
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.channels)[':channel_id']['messages']['pins']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PUT /channels/{channel_id}/messages/pins/{message_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutChannelsChannelIdMessagesPinsMessageIdMutationKey() {
  return ['channels', 'PUT', '/channels/:channel_id/messages/pins/:message_id'] as const
}

/**
 * Returns Vue Query mutation options for PUT /channels/{channel_id}/messages/pins/{message_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutChannelsChannelIdMessagesPinsMessageIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutChannelsChannelIdMessagesPinsMessageIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$put']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id'].messages.pins[':message_id'].$put(args, clientOptions),
    ),
})

/**
 * PUT /channels/{channel_id}/messages/pins/{message_id}
 */
export function usePutChannelsChannelIdMessagesPinsMessageId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutChannelsChannelIdMessagesPinsMessageIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /channels/{channel_id}/messages/pins/{message_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteChannelsChannelIdMessagesPinsMessageIdMutationKey() {
  return ['channels', 'DELETE', '/channels/:channel_id/messages/pins/:message_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /channels/{channel_id}/messages/pins/{message_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteChannelsChannelIdMessagesPinsMessageIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteChannelsChannelIdMessagesPinsMessageIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['messages']['pins'][':message_id']['$delete']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id'].messages.pins[':message_id'].$delete(args, clientOptions),
    ),
})

/**
 * DELETE /channels/{channel_id}/messages/pins/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesPinsMessageId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteChannelsChannelIdMessagesPinsMessageIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/messages/{message_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChannelsChannelIdMessagesMessageIdQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.channels)[':channel_id']['messages'][':message_id']['$get']>
  >,
) {
  return ['channels', 'GET', '/channels/:channel_id/messages/:message_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /channels/{channel_id}/messages/{message_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<
                    (typeof client.channels)[':channel_id']['messages'][':message_id']['$get']
                  >
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /channels/{channel_id}/messages/{message_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteChannelsChannelIdMessagesMessageIdMutationKey() {
  return ['channels', 'DELETE', '/channels/:channel_id/messages/:message_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /channels/{channel_id}/messages/{message_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteChannelsChannelIdMessagesMessageIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteChannelsChannelIdMessagesMessageIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id'].messages[':message_id'].$delete(args, clientOptions),
    ),
})

/**
 * DELETE /channels/{channel_id}/messages/{message_id}
 */
export function useDeleteChannelsChannelIdMessagesMessageId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
        InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['$delete']
        >
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteChannelsChannelIdMessagesMessageIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /channels/{channel_id}/messages/{message_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchChannelsChannelIdMessagesMessageIdMutationKey() {
  return ['channels', 'PATCH', '/channels/:channel_id/messages/:message_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /channels/{channel_id}/messages/{message_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchChannelsChannelIdMessagesMessageIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchChannelsChannelIdMessagesMessageIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id'].messages[':message_id'].$patch(args, clientOptions),
    ),
})

/**
 * PATCH /channels/{channel_id}/messages/{message_id}
 */
export function usePatchChannelsChannelIdMessagesMessageId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<
                  (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
                >
              >
            >
          >
        >,
        Error,
        InferRequestType<
          (typeof client.channels)[':channel_id']['messages'][':message_id']['$patch']
        >
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchChannelsChannelIdMessagesMessageIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /channels/{channel_id}/messages/{message_id}/crosspost
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostChannelsChannelIdMessagesMessageIdCrosspostMutationKey() {
  return ['channels', 'POST', '/channels/:channel_id/messages/:message_id/crosspost'] as const
}

/**
 * Returns Vue Query mutation options for POST /channels/{channel_id}/messages/{message_id}/crosspost
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostChannelsChannelIdMessagesMessageIdCrosspostMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostChannelsChannelIdMessagesMessageIdCrosspostMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['crosspost']['$post']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id'].messages[':message_id'].crosspost.$post(args, clientOptions),
    ),
})

/**
 * POST /channels/{channel_id}/messages/{message_id}/crosspost
 */
export function usePostChannelsChannelIdMessagesMessageIdCrosspost(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostChannelsChannelIdMessagesMessageIdCrosspostMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /channels/{channel_id}/messages/{message_id}/reactions
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationKey() {
  return ['channels', 'DELETE', '/channels/:channel_id/messages/:message_id/reactions'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /channels/{channel_id}/messages/{message_id}/reactions
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions']['$delete']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id'].messages[':message_id'].reactions.$delete(args, clientOptions),
    ),
})

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactions(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['reactions'][':emoji_name']['$get']
    >
  >,
) {
  return [
    'channels',
    'GET',
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationKey() {
  return [
    'channels',
    'DELETE',
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name',
  ] as const
}

/**
 * Returns Vue Query mutation options for DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationKey(),
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

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiName(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PUT /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey() {
  return [
    'channels',
    'PUT',
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me',
  ] as const
}

/**
 * Returns Vue Query mutation options for PUT /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey(),
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

/**
 * PUT /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function usePutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey() {
  return [
    'channels',
    'DELETE',
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name/@me',
  ] as const
}

/**
 * Returns Vue Query mutation options for DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey(),
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

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationKey() {
  return [
    'channels',
    'DELETE',
    '/channels/:channel_id/messages/:message_id/reactions/:emoji_name/:user_id',
  ] as const
}

/**
 * Returns Vue Query mutation options for DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationKey(),
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

/**
 * DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}
 */
export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationOptions(
      clientOptions,
    )
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /channels/{channel_id}/messages/{message_id}/threads
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostChannelsChannelIdMessagesMessageIdThreadsMutationKey() {
  return ['channels', 'POST', '/channels/:channel_id/messages/:message_id/threads'] as const
}

/**
 * Returns Vue Query mutation options for POST /channels/{channel_id}/messages/{message_id}/threads
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostChannelsChannelIdMessagesMessageIdThreadsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostChannelsChannelIdMessagesMessageIdThreadsMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['messages'][':message_id']['threads']['$post']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id'].messages[':message_id'].threads.$post(args, clientOptions),
    ),
})

/**
 * POST /channels/{channel_id}/messages/{message_id}/threads
 */
export function usePostChannelsChannelIdMessagesMessageIdThreads(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostChannelsChannelIdMessagesMessageIdThreadsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PUT /channels/{channel_id}/permissions/{overwrite_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutChannelsChannelIdPermissionsOverwriteIdMutationKey() {
  return ['channels', 'PUT', '/channels/:channel_id/permissions/:overwrite_id'] as const
}

/**
 * Returns Vue Query mutation options for PUT /channels/{channel_id}/permissions/{overwrite_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutChannelsChannelIdPermissionsOverwriteIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutChannelsChannelIdPermissionsOverwriteIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$put']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id'].permissions[':overwrite_id'].$put(args, clientOptions),
    ),
})

/**
 * PUT /channels/{channel_id}/permissions/{overwrite_id}
 */
export function usePutChannelsChannelIdPermissionsOverwriteId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutChannelsChannelIdPermissionsOverwriteIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /channels/{channel_id}/permissions/{overwrite_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteChannelsChannelIdPermissionsOverwriteIdMutationKey() {
  return ['channels', 'DELETE', '/channels/:channel_id/permissions/:overwrite_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /channels/{channel_id}/permissions/{overwrite_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteChannelsChannelIdPermissionsOverwriteIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteChannelsChannelIdPermissionsOverwriteIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['permissions'][':overwrite_id']['$delete']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id'].permissions[':overwrite_id'].$delete(args, clientOptions),
    ),
})

/**
 * DELETE /channels/{channel_id}/permissions/{overwrite_id}
 */
export function useDeleteChannelsChannelIdPermissionsOverwriteId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteChannelsChannelIdPermissionsOverwriteIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/pins
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChannelsChannelIdPinsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.channels)[':channel_id']['pins']['$get']>>,
) {
  return ['channels', 'GET', '/channels/:channel_id/pins', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /channels/{channel_id}/pins
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.channels)[':channel_id']['pins']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PUT /channels/{channel_id}/pins/{message_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutChannelsChannelIdPinsMessageIdMutationKey() {
  return ['channels', 'PUT', '/channels/:channel_id/pins/:message_id'] as const
}

/**
 * Returns Vue Query mutation options for PUT /channels/{channel_id}/pins/{message_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutChannelsChannelIdPinsMessageIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutChannelsChannelIdPinsMessageIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$put']>,
  ) => parseResponse(client.channels[':channel_id'].pins[':message_id'].$put(args, clientOptions)),
})

/**
 * PUT /channels/{channel_id}/pins/{message_id}
 */
export function usePutChannelsChannelIdPinsMessageId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutChannelsChannelIdPinsMessageIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /channels/{channel_id}/pins/{message_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteChannelsChannelIdPinsMessageIdMutationKey() {
  return ['channels', 'DELETE', '/channels/:channel_id/pins/:message_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /channels/{channel_id}/pins/{message_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteChannelsChannelIdPinsMessageIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteChannelsChannelIdPinsMessageIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']
    >,
  ) =>
    parseResponse(client.channels[':channel_id'].pins[':message_id'].$delete(args, clientOptions)),
})

/**
 * DELETE /channels/{channel_id}/pins/{message_id}
 */
export function useDeleteChannelsChannelIdPinsMessageId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<
                    (typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']
                  >
                >
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.channels)[':channel_id']['pins'][':message_id']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteChannelsChannelIdPinsMessageIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.channels)[':channel_id']['polls'][':message_id']['answers'][':answer_id']['$get']
    >
  >,
) {
  return [
    'channels',
    'GET',
    '/channels/:channel_id/polls/:message_id/answers/:answer_id',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /channels/{channel_id}/polls/{message_id}/answers/{answer_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /channels/{channel_id}/polls/{message_id}/expire
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostChannelsChannelIdPollsMessageIdExpireMutationKey() {
  return ['channels', 'POST', '/channels/:channel_id/polls/:message_id/expire'] as const
}

/**
 * Returns Vue Query mutation options for POST /channels/{channel_id}/polls/{message_id}/expire
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostChannelsChannelIdPollsMessageIdExpireMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostChannelsChannelIdPollsMessageIdExpireMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['polls'][':message_id']['expire']['$post']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id'].polls[':message_id'].expire.$post(args, clientOptions),
    ),
})

/**
 * POST /channels/{channel_id}/polls/{message_id}/expire
 */
export function usePostChannelsChannelIdPollsMessageIdExpire(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostChannelsChannelIdPollsMessageIdExpireMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PUT /channels/{channel_id}/recipients/{user_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutChannelsChannelIdRecipientsUserIdMutationKey() {
  return ['channels', 'PUT', '/channels/:channel_id/recipients/:user_id'] as const
}

/**
 * Returns Vue Query mutation options for PUT /channels/{channel_id}/recipients/{user_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutChannelsChannelIdRecipientsUserIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutChannelsChannelIdRecipientsUserIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']
    >,
  ) =>
    parseResponse(client.channels[':channel_id'].recipients[':user_id'].$put(args, clientOptions)),
})

/**
 * PUT /channels/{channel_id}/recipients/{user_id}
 */
export function usePutChannelsChannelIdRecipientsUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<
                    (typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']
                  >
                >
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.channels)[':channel_id']['recipients'][':user_id']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutChannelsChannelIdRecipientsUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /channels/{channel_id}/recipients/{user_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteChannelsChannelIdRecipientsUserIdMutationKey() {
  return ['channels', 'DELETE', '/channels/:channel_id/recipients/:user_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /channels/{channel_id}/recipients/{user_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteChannelsChannelIdRecipientsUserIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteChannelsChannelIdRecipientsUserIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id'].recipients[':user_id'].$delete(args, clientOptions),
    ),
})

/**
 * DELETE /channels/{channel_id}/recipients/{user_id}
 */
export function useDeleteChannelsChannelIdRecipientsUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
        InferRequestType<
          (typeof client.channels)[':channel_id']['recipients'][':user_id']['$delete']
        >
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteChannelsChannelIdRecipientsUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /channels/{channel_id}/send-soundboard-sound
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostChannelsChannelIdSendSoundboardSoundMutationKey() {
  return ['channels', 'POST', '/channels/:channel_id/send-soundboard-sound'] as const
}

/**
 * Returns Vue Query mutation options for POST /channels/{channel_id}/send-soundboard-sound
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostChannelsChannelIdSendSoundboardSoundMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostChannelsChannelIdSendSoundboardSoundMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id']['send-soundboard-sound'].$post(args, clientOptions),
    ),
})

/**
 * POST /channels/{channel_id}/send-soundboard-sound
 */
export function usePostChannelsChannelIdSendSoundboardSound(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<
                    (typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']
                  >
                >
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.channels)[':channel_id']['send-soundboard-sound']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostChannelsChannelIdSendSoundboardSoundMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/thread-members
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChannelsChannelIdThreadMembersQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['$get']>
  >,
) {
  return ['channels', 'GET', '/channels/:channel_id/thread-members', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /channels/{channel_id}/thread-members
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.channels)[':channel_id']['thread-members']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PUT /channels/{channel_id}/thread-members/@me
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutChannelsChannelIdThreadMembersMeMutationKey() {
  return ['channels', 'PUT', '/channels/:channel_id/thread-members/@me'] as const
}

/**
 * Returns Vue Query mutation options for PUT /channels/{channel_id}/thread-members/@me
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutChannelsChannelIdThreadMembersMeMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutChannelsChannelIdThreadMembersMeMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['thread-members']['@me']['$put']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id']['thread-members']['@me'].$put(args, clientOptions),
    ),
})

/**
 * PUT /channels/{channel_id}/thread-members/@me
 */
export function usePutChannelsChannelIdThreadMembersMe(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<
                    (typeof client.channels)[':channel_id']['thread-members']['@me']['$put']
                  >
                >
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.channels)[':channel_id']['thread-members']['@me']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutChannelsChannelIdThreadMembersMeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /channels/{channel_id}/thread-members/@me
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteChannelsChannelIdThreadMembersMeMutationKey() {
  return ['channels', 'DELETE', '/channels/:channel_id/thread-members/@me'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /channels/{channel_id}/thread-members/@me
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteChannelsChannelIdThreadMembersMeMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteChannelsChannelIdThreadMembersMeMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id']['thread-members']['@me'].$delete(args, clientOptions),
    ),
})

/**
 * DELETE /channels/{channel_id}/thread-members/@me
 */
export function useDeleteChannelsChannelIdThreadMembersMe(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
        InferRequestType<
          (typeof client.channels)[':channel_id']['thread-members']['@me']['$delete']
        >
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteChannelsChannelIdThreadMembersMeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/thread-members/{user_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChannelsChannelIdThreadMembersUserIdQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.channels)[':channel_id']['thread-members'][':user_id']['$get']>
  >,
) {
  return ['channels', 'GET', '/channels/:channel_id/thread-members/:user_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /channels/{channel_id}/thread-members/{user_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PUT /channels/{channel_id}/thread-members/{user_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutChannelsChannelIdThreadMembersUserIdMutationKey() {
  return ['channels', 'PUT', '/channels/:channel_id/thread-members/:user_id'] as const
}

/**
 * Returns Vue Query mutation options for PUT /channels/{channel_id}/thread-members/{user_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutChannelsChannelIdThreadMembersUserIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutChannelsChannelIdThreadMembersUserIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id']['thread-members'][':user_id'].$put(args, clientOptions),
    ),
})

/**
 * PUT /channels/{channel_id}/thread-members/{user_id}
 */
export function usePutChannelsChannelIdThreadMembersUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
        InferRequestType<
          (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$put']
        >
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutChannelsChannelIdThreadMembersUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /channels/{channel_id}/thread-members/{user_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteChannelsChannelIdThreadMembersUserIdMutationKey() {
  return ['channels', 'DELETE', '/channels/:channel_id/thread-members/:user_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /channels/{channel_id}/thread-members/{user_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteChannelsChannelIdThreadMembersUserIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteChannelsChannelIdThreadMembersUserIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.channels)[':channel_id']['thread-members'][':user_id']['$delete']
    >,
  ) =>
    parseResponse(
      client.channels[':channel_id']['thread-members'][':user_id'].$delete(args, clientOptions),
    ),
})

/**
 * DELETE /channels/{channel_id}/thread-members/{user_id}
 */
export function useDeleteChannelsChannelIdThreadMembersUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteChannelsChannelIdThreadMembersUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /channels/{channel_id}/threads
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostChannelsChannelIdThreadsMutationKey() {
  return ['channels', 'POST', '/channels/:channel_id/threads'] as const
}

/**
 * Returns Vue Query mutation options for POST /channels/{channel_id}/threads
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostChannelsChannelIdThreadsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostChannelsChannelIdThreadsMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>,
  ) => parseResponse(client.channels[':channel_id'].threads.$post(args, clientOptions)),
})

/**
 * POST /channels/{channel_id}/threads
 */
export function usePostChannelsChannelIdThreads(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.channels)[':channel_id']['threads']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.channels)[':channel_id']['threads']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostChannelsChannelIdThreadsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/threads/archived/private
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChannelsChannelIdThreadsArchivedPrivateQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.channels)[':channel_id']['threads']['archived']['private']['$get']
    >
  >,
) {
  return ['channels', 'GET', '/channels/:channel_id/threads/archived/private', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /channels/{channel_id}/threads/archived/private
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /channels/{channel_id}/threads/archived/public
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChannelsChannelIdThreadsArchivedPublicQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.channels)[':channel_id']['threads']['archived']['public']['$get']
    >
  >,
) {
  return ['channels', 'GET', '/channels/:channel_id/threads/archived/public', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /channels/{channel_id}/threads/archived/public
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /channels/{channel_id}/threads/search
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChannelsChannelIdThreadsSearchQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.channels)[':channel_id']['threads']['search']['$get']>
  >,
) {
  return ['channels', 'GET', '/channels/:channel_id/threads/search', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /channels/{channel_id}/threads/search
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /channels/{channel_id}/typing
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostChannelsChannelIdTypingMutationKey() {
  return ['channels', 'POST', '/channels/:channel_id/typing'] as const
}

/**
 * Returns Vue Query mutation options for POST /channels/{channel_id}/typing
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostChannelsChannelIdTypingMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostChannelsChannelIdTypingMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.channels)[':channel_id']['typing']['$post']>,
  ) => parseResponse(client.channels[':channel_id'].typing.$post(args, clientOptions)),
})

/**
 * POST /channels/{channel_id}/typing
 */
export function usePostChannelsChannelIdTyping(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostChannelsChannelIdTypingMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /channels/{channel_id}/users/@me/threads/archived/private
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.channels)[':channel_id']['users']['@me']['threads']['archived']['private']['$get']
    >
  >,
) {
  return [
    'channels',
    'GET',
    '/channels/:channel_id/users/@me/threads/archived/private',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /channels/{channel_id}/users/@me/threads/archived/private
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /channels/{channel_id}/webhooks
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChannelsChannelIdWebhooksQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$get']>>,
) {
  return ['channels', 'GET', '/channels/:channel_id/webhooks', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /channels/{channel_id}/webhooks
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.channels)[':channel_id']['webhooks']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /channels/{channel_id}/webhooks
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostChannelsChannelIdWebhooksMutationKey() {
  return ['channels', 'POST', '/channels/:channel_id/webhooks'] as const
}

/**
 * Returns Vue Query mutation options for POST /channels/{channel_id}/webhooks
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostChannelsChannelIdWebhooksMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostChannelsChannelIdWebhooksMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>,
  ) => parseResponse(client.channels[':channel_id'].webhooks.$post(args, clientOptions)),
})

/**
 * POST /channels/{channel_id}/webhooks
 */
export function usePostChannelsChannelIdWebhooks(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.channels)[':channel_id']['webhooks']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.channels)[':channel_id']['webhooks']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostChannelsChannelIdWebhooksMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /gateway
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetGatewayQueryKey() {
  return ['gateway', 'GET', '/gateway'] as const
}

/**
 * Returns Vue Query query options for GET /gateway
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.gateway.$get>>>>>,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGatewayQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /gateway/bot
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetGatewayBotQueryKey() {
  return ['gateway', 'GET', '/gateway/bot'] as const
}

/**
 * Returns Vue Query query options for GET /gateway/bot
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.gateway.bot.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGatewayBotQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/templates/{code}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsTemplatesCodeQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds.templates)[':code']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/templates/:code', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/templates/{code}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds.templates)[':code']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /guilds/{guild_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.guilds)[':guild_id']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdMutationKey() {
  return ['guilds', 'PATCH', '/guilds/:guild_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchGuildsGuildIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>) =>
    parseResponse(client.guilds[':guild_id'].$patch(args, clientOptions)),
})

/**
 * PATCH /guilds/{guild_id}
 */
export function usePatchGuildsGuildId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.guilds)[':guild_id']['$patch']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/audit-logs
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdAuditLogsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/audit-logs', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/audit-logs
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['audit-logs']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /guilds/{guild_id}/auto-moderation/rules
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdAutoModerationRulesQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']>
  >,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/auto-moderation/rules', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/auto-moderation/rules
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<
                    (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$get']
                  >
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /guilds/{guild_id}/auto-moderation/rules
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostGuildsGuildIdAutoModerationRulesMutationKey() {
  return ['guilds', 'POST', '/guilds/:guild_id/auto-moderation/rules'] as const
}

/**
 * Returns Vue Query mutation options for POST /guilds/{guild_id}/auto-moderation/rules
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostGuildsGuildIdAutoModerationRulesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostGuildsGuildIdAutoModerationRulesMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules']['$post']
    >,
  ) =>
    parseResponse(client.guilds[':guild_id']['auto-moderation'].rules.$post(args, clientOptions)),
})

/**
 * POST /guilds/{guild_id}/auto-moderation/rules
 */
export function usePostGuildsGuildIdAutoModerationRules(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostGuildsGuildIdAutoModerationRulesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdAutoModerationRulesRuleIdQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$get']
    >
  >,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/auto-moderation/rules/:rule_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/auto-moderation/rules/{rule_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationKey() {
  return ['guilds', 'DELETE', '/guilds/:guild_id/auto-moderation/rules/:rule_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$delete']
    >,
  ) =>
    parseResponse(
      client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$delete(args, clientOptions),
    ),
})

/**
 * DELETE /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function useDeleteGuildsGuildIdAutoModerationRulesRuleId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationKey() {
  return ['guilds', 'PATCH', '/guilds/:guild_id/auto-moderation/rules/:rule_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.guilds)[':guild_id']['auto-moderation']['rules'][':rule_id']['$patch']
    >,
  ) =>
    parseResponse(
      client.guilds[':guild_id']['auto-moderation'].rules[':rule_id'].$patch(args, clientOptions),
    ),
})

/**
 * PATCH /guilds/{guild_id}/auto-moderation/rules/{rule_id}
 */
export function usePatchGuildsGuildIdAutoModerationRulesRuleId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/bans
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdBansQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['bans']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/bans', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/bans
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bans']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /guilds/{guild_id}/bans/{user_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdBansUserIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/bans/:user_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/bans/{user_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PUT /guilds/{guild_id}/bans/{user_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutGuildsGuildIdBansUserIdMutationKey() {
  return ['guilds', 'PUT', '/guilds/:guild_id/bans/:user_id'] as const
}

/**
 * Returns Vue Query mutation options for PUT /guilds/{guild_id}/bans/{user_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutGuildsGuildIdBansUserIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutGuildsGuildIdBansUserIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$put']>,
  ) => parseResponse(client.guilds[':guild_id'].bans[':user_id'].$put(args, clientOptions)),
})

/**
 * PUT /guilds/{guild_id}/bans/{user_id}
 */
export function usePutGuildsGuildIdBansUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutGuildsGuildIdBansUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /guilds/{guild_id}/bans/{user_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteGuildsGuildIdBansUserIdMutationKey() {
  return ['guilds', 'DELETE', '/guilds/:guild_id/bans/:user_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /guilds/{guild_id}/bans/{user_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteGuildsGuildIdBansUserIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteGuildsGuildIdBansUserIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>,
  ) => parseResponse(client.guilds[':guild_id'].bans[':user_id'].$delete(args, clientOptions)),
})

/**
 * DELETE /guilds/{guild_id}/bans/{user_id}
 */
export function useDeleteGuildsGuildIdBansUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
                >
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['bans'][':user_id']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteGuildsGuildIdBansUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /guilds/{guild_id}/bulk-ban
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostGuildsGuildIdBulkBanMutationKey() {
  return ['guilds', 'POST', '/guilds/:guild_id/bulk-ban'] as const
}

/**
 * Returns Vue Query mutation options for POST /guilds/{guild_id}/bulk-ban
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostGuildsGuildIdBulkBanMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostGuildsGuildIdBulkBanMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>,
  ) => parseResponse(client.guilds[':guild_id']['bulk-ban'].$post(args, clientOptions)),
})

/**
 * POST /guilds/{guild_id}/bulk-ban
 */
export function usePostGuildsGuildIdBulkBan(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['bulk-ban']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostGuildsGuildIdBulkBanMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/channels
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdChannelsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/channels', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/channels
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['channels']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /guilds/{guild_id}/channels
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostGuildsGuildIdChannelsMutationKey() {
  return ['guilds', 'POST', '/guilds/:guild_id/channels'] as const
}

/**
 * Returns Vue Query mutation options for POST /guilds/{guild_id}/channels
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostGuildsGuildIdChannelsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostGuildsGuildIdChannelsMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>,
  ) => parseResponse(client.guilds[':guild_id'].channels.$post(args, clientOptions)),
})

/**
 * POST /guilds/{guild_id}/channels
 */
export function usePostGuildsGuildIdChannels(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.guilds)[':guild_id']['channels']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostGuildsGuildIdChannelsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}/channels
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdChannelsMutationKey() {
  return ['guilds', 'PATCH', '/guilds/:guild_id/channels'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}/channels
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdChannelsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchGuildsGuildIdChannelsMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['channels']['$patch']>,
  ) => parseResponse(client.guilds[':guild_id'].channels.$patch(args, clientOptions)),
})

/**
 * PATCH /guilds/{guild_id}/channels
 */
export function usePatchGuildsGuildIdChannels(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdChannelsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/emojis
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdEmojisQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/emojis', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/emojis
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['emojis']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /guilds/{guild_id}/emojis
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostGuildsGuildIdEmojisMutationKey() {
  return ['guilds', 'POST', '/guilds/:guild_id/emojis'] as const
}

/**
 * Returns Vue Query mutation options for POST /guilds/{guild_id}/emojis
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostGuildsGuildIdEmojisMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostGuildsGuildIdEmojisMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>,
  ) => parseResponse(client.guilds[':guild_id'].emojis.$post(args, clientOptions)),
})

/**
 * POST /guilds/{guild_id}/emojis
 */
export function usePostGuildsGuildIdEmojis(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.guilds)[':guild_id']['emojis']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['emojis']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostGuildsGuildIdEmojisMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/emojis/{emoji_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdEmojisEmojiIdQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>
  >,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/emojis/:emoji_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/emojis/{emoji_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /guilds/{guild_id}/emojis/{emoji_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteGuildsGuildIdEmojisEmojiIdMutationKey() {
  return ['guilds', 'DELETE', '/guilds/:guild_id/emojis/:emoji_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /guilds/{guild_id}/emojis/{emoji_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteGuildsGuildIdEmojisEmojiIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteGuildsGuildIdEmojisEmojiIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$delete']>,
  ) => parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$delete(args, clientOptions)),
})

/**
 * DELETE /guilds/{guild_id}/emojis/{emoji_id}
 */
export function useDeleteGuildsGuildIdEmojisEmojiId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteGuildsGuildIdEmojisEmojiIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}/emojis/{emoji_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdEmojisEmojiIdMutationKey() {
  return ['guilds', 'PATCH', '/guilds/:guild_id/emojis/:emoji_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}/emojis/{emoji_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdEmojisEmojiIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchGuildsGuildIdEmojisEmojiIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>,
  ) => parseResponse(client.guilds[':guild_id'].emojis[':emoji_id'].$patch(args, clientOptions)),
})

/**
 * PATCH /guilds/{guild_id}/emojis/{emoji_id}
 */
export function usePatchGuildsGuildIdEmojisEmojiId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
              >
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['emojis'][':emoji_id']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdEmojisEmojiIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/integrations
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdIntegrationsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['integrations']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/integrations', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/integrations
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['integrations']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /guilds/{guild_id}/integrations/{integration_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationKey() {
  return ['guilds', 'DELETE', '/guilds/:guild_id/integrations/:integration_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /guilds/{guild_id}/integrations/{integration_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.guilds)[':guild_id']['integrations'][':integration_id']['$delete']
    >,
  ) =>
    parseResponse(
      client.guilds[':guild_id'].integrations[':integration_id'].$delete(args, clientOptions),
    ),
})

/**
 * DELETE /guilds/{guild_id}/integrations/{integration_id}
 */
export function useDeleteGuildsGuildIdIntegrationsIntegrationId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/invites
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdInvitesQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['invites']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/invites', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/invites
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['invites']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /guilds/{guild_id}/members
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdMembersQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['members']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/members', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/members
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['members']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}/members/@me
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdMembersMeMutationKey() {
  return ['guilds', 'PATCH', '/guilds/:guild_id/members/@me'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}/members/@me
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdMembersMeMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchGuildsGuildIdMembersMeMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>,
  ) => parseResponse(client.guilds[':guild_id'].members['@me'].$patch(args, clientOptions)),
})

/**
 * PATCH /guilds/{guild_id}/members/@me
 */
export function usePatchGuildsGuildIdMembersMe(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['members']['@me']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdMembersMeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/members/search
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdMembersSearchQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>
  >,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/members/search', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/members/search
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.guilds)[':guild_id']['members']['search']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /guilds/{guild_id}/members/{user_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdMembersUserIdQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>
  >,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/members/:user_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/members/{user_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PUT /guilds/{guild_id}/members/{user_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutGuildsGuildIdMembersUserIdMutationKey() {
  return ['guilds', 'PUT', '/guilds/:guild_id/members/:user_id'] as const
}

/**
 * Returns Vue Query mutation options for PUT /guilds/{guild_id}/members/{user_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutGuildsGuildIdMembersUserIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutGuildsGuildIdMembersUserIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>,
  ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$put(args, clientOptions)),
})

/**
 * PUT /guilds/{guild_id}/members/{user_id}
 */
export function usePutGuildsGuildIdMembersUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
                >
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutGuildsGuildIdMembersUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /guilds/{guild_id}/members/{user_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteGuildsGuildIdMembersUserIdMutationKey() {
  return ['guilds', 'DELETE', '/guilds/:guild_id/members/:user_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /guilds/{guild_id}/members/{user_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteGuildsGuildIdMembersUserIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteGuildsGuildIdMembersUserIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$delete']>,
  ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$delete(args, clientOptions)),
})

/**
 * DELETE /guilds/{guild_id}/members/{user_id}
 */
export function useDeleteGuildsGuildIdMembersUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteGuildsGuildIdMembersUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}/members/{user_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdMembersUserIdMutationKey() {
  return ['guilds', 'PATCH', '/guilds/:guild_id/members/:user_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}/members/{user_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdMembersUserIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchGuildsGuildIdMembersUserIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['members'][':user_id']['$patch']>,
  ) => parseResponse(client.guilds[':guild_id'].members[':user_id'].$patch(args, clientOptions)),
})

/**
 * PATCH /guilds/{guild_id}/members/{user_id}
 */
export function usePatchGuildsGuildIdMembersUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdMembersUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationKey() {
  return ['guilds', 'PUT', '/guilds/:guild_id/members/:user_id/roles/:role_id'] as const
}

/**
 * Returns Vue Query mutation options for PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$put']
    >,
  ) =>
    parseResponse(
      client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$put(args, clientOptions),
    ),
})

/**
 * PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function usePutGuildsGuildIdMembersUserIdRolesRoleId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationKey() {
  return ['guilds', 'DELETE', '/guilds/:guild_id/members/:user_id/roles/:role_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.guilds)[':guild_id']['members'][':user_id']['roles'][':role_id']['$delete']
    >,
  ) =>
    parseResponse(
      client.guilds[':guild_id'].members[':user_id'].roles[':role_id'].$delete(args, clientOptions),
    ),
})

/**
 * DELETE /guilds/{guild_id}/members/{user_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdMembersUserIdRolesRoleId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/messages/search
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdMessagesSearchQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>
  >,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/messages/search', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/messages/search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdMessagesSearchQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdMessagesSearchQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].messages.search.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/messages/search
 */
export function useGetGuildsGuildIdMessagesSearch(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.guilds)[':guild_id']['messages']['search']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdMessagesSearchQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/new-member-welcome
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdNewMemberWelcomeQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>
  >,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/new-member-welcome', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/new-member-welcome
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.guilds)[':guild_id']['new-member-welcome']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /guilds/{guild_id}/onboarding
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdOnboardingQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/onboarding', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/onboarding
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['onboarding']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PUT /guilds/{guild_id}/onboarding
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutGuildsGuildIdOnboardingMutationKey() {
  return ['guilds', 'PUT', '/guilds/:guild_id/onboarding'] as const
}

/**
 * Returns Vue Query mutation options for PUT /guilds/{guild_id}/onboarding
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutGuildsGuildIdOnboardingMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutGuildsGuildIdOnboardingMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>,
  ) => parseResponse(client.guilds[':guild_id'].onboarding.$put(args, clientOptions)),
})

/**
 * PUT /guilds/{guild_id}/onboarding
 */
export function usePutGuildsGuildIdOnboarding(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['onboarding']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutGuildsGuildIdOnboardingMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/preview
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdPreviewQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['preview']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/preview', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/preview
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['preview']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /guilds/{guild_id}/prune
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdPruneQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/prune', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/prune
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['prune']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /guilds/{guild_id}/prune
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostGuildsGuildIdPruneMutationKey() {
  return ['guilds', 'POST', '/guilds/:guild_id/prune'] as const
}

/**
 * Returns Vue Query mutation options for POST /guilds/{guild_id}/prune
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostGuildsGuildIdPruneMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostGuildsGuildIdPruneMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>,
  ) => parseResponse(client.guilds[':guild_id'].prune.$post(args, clientOptions)),
})

/**
 * POST /guilds/{guild_id}/prune
 */
export function usePostGuildsGuildIdPrune(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.guilds)[':guild_id']['prune']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['prune']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostGuildsGuildIdPruneMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/regions
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdRegionsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['regions']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/regions', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/regions
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['regions']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /guilds/{guild_id}/roles
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdRolesQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/roles', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/roles
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /guilds/{guild_id}/roles
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostGuildsGuildIdRolesMutationKey() {
  return ['guilds', 'POST', '/guilds/:guild_id/roles'] as const
}

/**
 * Returns Vue Query mutation options for POST /guilds/{guild_id}/roles
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostGuildsGuildIdRolesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostGuildsGuildIdRolesMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>,
  ) => parseResponse(client.guilds[':guild_id'].roles.$post(args, clientOptions)),
})

/**
 * POST /guilds/{guild_id}/roles
 */
export function usePostGuildsGuildIdRoles(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostGuildsGuildIdRolesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}/roles
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdRolesMutationKey() {
  return ['guilds', 'PATCH', '/guilds/:guild_id/roles'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}/roles
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdRolesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchGuildsGuildIdRolesMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>,
  ) => parseResponse(client.guilds[':guild_id'].roles.$patch(args, clientOptions)),
})

/**
 * PATCH /guilds/{guild_id}/roles
 */
export function usePatchGuildsGuildIdRoles(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.guilds)[':guild_id']['roles']['$patch']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['roles']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdRolesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/roles/member-counts
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdRolesMemberCountsQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>
  >,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/roles/member-counts', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/roles/member-counts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetGuildsGuildIdRolesMemberCountsQueryOptions = (
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetGuildsGuildIdRolesMemberCountsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.guilds[':guild_id'].roles['member-counts'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /guilds/{guild_id}/roles/member-counts
 */
export function useGetGuildsGuildIdRolesMemberCounts(
  args: InferRequestType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>,
  options?: {
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.guilds)[':guild_id']['roles']['member-counts']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetGuildsGuildIdRolesMemberCountsQueryOptions(
    args,
    clientOptions,
  )
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/roles/{role_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdRolesRoleIdQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>
  >,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/roles/:role_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/roles/{role_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /guilds/{guild_id}/roles/{role_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteGuildsGuildIdRolesRoleIdMutationKey() {
  return ['guilds', 'DELETE', '/guilds/:guild_id/roles/:role_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /guilds/{guild_id}/roles/{role_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteGuildsGuildIdRolesRoleIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteGuildsGuildIdRolesRoleIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>,
  ) => parseResponse(client.guilds[':guild_id'].roles[':role_id'].$delete(args, clientOptions)),
})

/**
 * DELETE /guilds/{guild_id}/roles/{role_id}
 */
export function useDeleteGuildsGuildIdRolesRoleId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
                >
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteGuildsGuildIdRolesRoleIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}/roles/{role_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdRolesRoleIdMutationKey() {
  return ['guilds', 'PATCH', '/guilds/:guild_id/roles/:role_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}/roles/{role_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdRolesRoleIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchGuildsGuildIdRolesRoleIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>,
  ) => parseResponse(client.guilds[':guild_id'].roles[':role_id'].$patch(args, clientOptions)),
})

/**
 * PATCH /guilds/{guild_id}/roles/{role_id}
 */
export function usePatchGuildsGuildIdRolesRoleId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
              >
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['roles'][':role_id']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdRolesRoleIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/scheduled-events
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdScheduledEventsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/scheduled-events', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/scheduled-events
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['scheduled-events']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /guilds/{guild_id}/scheduled-events
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostGuildsGuildIdScheduledEventsMutationKey() {
  return ['guilds', 'POST', '/guilds/:guild_id/scheduled-events'] as const
}

/**
 * Returns Vue Query mutation options for POST /guilds/{guild_id}/scheduled-events
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostGuildsGuildIdScheduledEventsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostGuildsGuildIdScheduledEventsMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>,
  ) => parseResponse(client.guilds[':guild_id']['scheduled-events'].$post(args, clientOptions)),
})

/**
 * POST /guilds/{guild_id}/scheduled-events
 */
export function usePostGuildsGuildIdScheduledEvents(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['scheduled-events']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostGuildsGuildIdScheduledEventsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['$get']
    >
  >,
) {
  return [
    'guilds',
    'GET',
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey() {
  return [
    'guilds',
    'DELETE',
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
  ] as const
}

/**
 * Returns Vue Query mutation options for DELETE /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey(),
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

/**
 * DELETE /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function useDeleteGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey() {
  return [
    'guilds',
    'PATCH',
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id',
  ] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey(),
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

/**
 * PATCH /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}
 */
export function usePatchGuildsGuildIdScheduledEventsGuildScheduledEventId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.guilds)[':guild_id']['scheduled-events'][':guild_scheduled_event_id']['users']['$get']
    >
  >,
) {
  return [
    'guilds',
    'GET',
    '/guilds/:guild_id/scheduled-events/:guild_scheduled_event_id/users',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /guilds/{guild_id}/soundboard-sounds
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdSoundboardSoundsQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>
  >,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/soundboard-sounds', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/soundboard-sounds
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /guilds/{guild_id}/soundboard-sounds
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostGuildsGuildIdSoundboardSoundsMutationKey() {
  return ['guilds', 'POST', '/guilds/:guild_id/soundboard-sounds'] as const
}

/**
 * Returns Vue Query mutation options for POST /guilds/{guild_id}/soundboard-sounds
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostGuildsGuildIdSoundboardSoundsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostGuildsGuildIdSoundboardSoundsMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>,
  ) => parseResponse(client.guilds[':guild_id']['soundboard-sounds'].$post(args, clientOptions)),
})

/**
 * POST /guilds/{guild_id}/soundboard-sounds
 */
export function usePostGuildsGuildIdSoundboardSounds(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostGuildsGuildIdSoundboardSoundsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdSoundboardSoundsSoundIdQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$get']>
  >,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/soundboard-sounds/:sound_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/soundboard-sounds/{sound_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /guilds/{guild_id}/soundboard-sounds/{sound_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationKey() {
  return ['guilds', 'DELETE', '/guilds/:guild_id/soundboard-sounds/:sound_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /guilds/{guild_id}/soundboard-sounds/{sound_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$delete']
    >,
  ) =>
    parseResponse(
      client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$delete(args, clientOptions),
    ),
})

/**
 * DELETE /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function useDeleteGuildsGuildIdSoundboardSoundsSoundId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}/soundboard-sounds/{sound_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationKey() {
  return ['guilds', 'PATCH', '/guilds/:guild_id/soundboard-sounds/:sound_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}/soundboard-sounds/{sound_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.guilds)[':guild_id']['soundboard-sounds'][':sound_id']['$patch']
    >,
  ) =>
    parseResponse(
      client.guilds[':guild_id']['soundboard-sounds'][':sound_id'].$patch(args, clientOptions),
    ),
})

/**
 * PATCH /guilds/{guild_id}/soundboard-sounds/{sound_id}
 */
export function usePatchGuildsGuildIdSoundboardSoundsSoundId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/stickers
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdStickersQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/stickers', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/stickers
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['stickers']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /guilds/{guild_id}/stickers
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostGuildsGuildIdStickersMutationKey() {
  return ['guilds', 'POST', '/guilds/:guild_id/stickers'] as const
}

/**
 * Returns Vue Query mutation options for POST /guilds/{guild_id}/stickers
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostGuildsGuildIdStickersMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostGuildsGuildIdStickersMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>,
  ) => parseResponse(client.guilds[':guild_id'].stickers.$post(args, clientOptions)),
})

/**
 * POST /guilds/{guild_id}/stickers
 */
export function usePostGuildsGuildIdStickers(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.guilds)[':guild_id']['stickers']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['stickers']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostGuildsGuildIdStickersMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/stickers/{sticker_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdStickersStickerIdQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$get']>
  >,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/stickers/:sticker_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/stickers/{sticker_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /guilds/{guild_id}/stickers/{sticker_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteGuildsGuildIdStickersStickerIdMutationKey() {
  return ['guilds', 'DELETE', '/guilds/:guild_id/stickers/:sticker_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /guilds/{guild_id}/stickers/{sticker_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteGuildsGuildIdStickersStickerIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteGuildsGuildIdStickersStickerIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']
    >,
  ) =>
    parseResponse(client.guilds[':guild_id'].stickers[':sticker_id'].$delete(args, clientOptions)),
})

/**
 * DELETE /guilds/{guild_id}/stickers/{sticker_id}
 */
export function useDeleteGuildsGuildIdStickersStickerId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<
                    (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']
                  >
                >
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteGuildsGuildIdStickersStickerIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}/stickers/{sticker_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdStickersStickerIdMutationKey() {
  return ['guilds', 'PATCH', '/guilds/:guild_id/stickers/:sticker_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}/stickers/{sticker_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdStickersStickerIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchGuildsGuildIdStickersStickerIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.guilds)[':guild_id']['stickers'][':sticker_id']['$patch']
    >,
  ) =>
    parseResponse(client.guilds[':guild_id'].stickers[':sticker_id'].$patch(args, clientOptions)),
})

/**
 * PATCH /guilds/{guild_id}/stickers/{sticker_id}
 */
export function usePatchGuildsGuildIdStickersStickerId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdStickersStickerIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/templates
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdTemplatesQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/templates', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/templates
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /guilds/{guild_id}/templates
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostGuildsGuildIdTemplatesMutationKey() {
  return ['guilds', 'POST', '/guilds/:guild_id/templates'] as const
}

/**
 * Returns Vue Query mutation options for POST /guilds/{guild_id}/templates
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostGuildsGuildIdTemplatesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostGuildsGuildIdTemplatesMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>,
  ) => parseResponse(client.guilds[':guild_id'].templates.$post(args, clientOptions)),
})

/**
 * POST /guilds/{guild_id}/templates
 */
export function usePostGuildsGuildIdTemplates(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['templates']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostGuildsGuildIdTemplatesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PUT /guilds/{guild_id}/templates/{code}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutGuildsGuildIdTemplatesCodeMutationKey() {
  return ['guilds', 'PUT', '/guilds/:guild_id/templates/:code'] as const
}

/**
 * Returns Vue Query mutation options for PUT /guilds/{guild_id}/templates/{code}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutGuildsGuildIdTemplatesCodeMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutGuildsGuildIdTemplatesCodeMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>,
  ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$put(args, clientOptions)),
})

/**
 * PUT /guilds/{guild_id}/templates/{code}
 */
export function usePutGuildsGuildIdTemplatesCode(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutGuildsGuildIdTemplatesCodeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /guilds/{guild_id}/templates/{code}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteGuildsGuildIdTemplatesCodeMutationKey() {
  return ['guilds', 'DELETE', '/guilds/:guild_id/templates/:code'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /guilds/{guild_id}/templates/{code}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteGuildsGuildIdTemplatesCodeMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteGuildsGuildIdTemplatesCodeMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>,
  ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$delete(args, clientOptions)),
})

/**
 * DELETE /guilds/{guild_id}/templates/{code}
 */
export function useDeleteGuildsGuildIdTemplatesCode(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
              >
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteGuildsGuildIdTemplatesCodeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}/templates/{code}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdTemplatesCodeMutationKey() {
  return ['guilds', 'PATCH', '/guilds/:guild_id/templates/:code'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}/templates/{code}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdTemplatesCodeMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchGuildsGuildIdTemplatesCodeMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>,
  ) => parseResponse(client.guilds[':guild_id'].templates[':code'].$patch(args, clientOptions)),
})

/**
 * PATCH /guilds/{guild_id}/templates/{code}
 */
export function usePatchGuildsGuildIdTemplatesCode(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
              >
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['templates'][':code']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdTemplatesCodeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/threads/active
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdThreadsActiveQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>
  >,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/threads/active', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/threads/active
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.guilds)[':guild_id']['threads']['active']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /guilds/{guild_id}/vanity-url
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdVanityUrlQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/vanity-url', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/vanity-url
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['vanity-url']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /guilds/{guild_id}/voice-states/@me
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdVoiceStatesMeQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>
  >,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/voice-states/@me', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/voice-states/@me
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}/voice-states/@me
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdVoiceStatesMeMutationKey() {
  return ['guilds', 'PATCH', '/guilds/:guild_id/voice-states/@me'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}/voice-states/@me
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdVoiceStatesMeMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchGuildsGuildIdVoiceStatesMeMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['voice-states']['@me']['$patch']>,
  ) => parseResponse(client.guilds[':guild_id']['voice-states']['@me'].$patch(args, clientOptions)),
})

/**
 * PATCH /guilds/{guild_id}/voice-states/@me
 */
export function usePatchGuildsGuildIdVoiceStatesMe(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdVoiceStatesMeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/voice-states/{user_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdVoiceStatesUserIdQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']>
  >,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/voice-states/:user_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/voice-states/{user_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<
                    (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$get']
                  >
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}/voice-states/{user_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdVoiceStatesUserIdMutationKey() {
  return ['guilds', 'PATCH', '/guilds/:guild_id/voice-states/:user_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}/voice-states/{user_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdVoiceStatesUserIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchGuildsGuildIdVoiceStatesUserIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']
    >,
  ) =>
    parseResponse(
      client.guilds[':guild_id']['voice-states'][':user_id'].$patch(args, clientOptions),
    ),
})

/**
 * PATCH /guilds/{guild_id}/voice-states/{user_id}
 */
export function usePatchGuildsGuildIdVoiceStatesUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<
                    (typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']
                  >
                >
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['voice-states'][':user_id']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdVoiceStatesUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/webhooks
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdWebhooksQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/webhooks', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/webhooks
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['webhooks']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /guilds/{guild_id}/welcome-screen
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdWelcomeScreenQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/welcome-screen', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/welcome-screen
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['welcome-screen']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}/welcome-screen
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdWelcomeScreenMutationKey() {
  return ['guilds', 'PATCH', '/guilds/:guild_id/welcome-screen'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}/welcome-screen
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdWelcomeScreenMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchGuildsGuildIdWelcomeScreenMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>,
  ) => parseResponse(client.guilds[':guild_id']['welcome-screen'].$patch(args, clientOptions)),
})

/**
 * PATCH /guilds/{guild_id}/welcome-screen
 */
export function usePatchGuildsGuildIdWelcomeScreen(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['welcome-screen']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdWelcomeScreenMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/widget
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdWidgetQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/widget', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/widget
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['widget']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PATCH /guilds/{guild_id}/widget
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchGuildsGuildIdWidgetMutationKey() {
  return ['guilds', 'PATCH', '/guilds/:guild_id/widget'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /guilds/{guild_id}/widget
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchGuildsGuildIdWidgetMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchGuildsGuildIdWidgetMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>,
  ) => parseResponse(client.guilds[':guild_id'].widget.$patch(args, clientOptions)),
})

/**
 * PATCH /guilds/{guild_id}/widget
 */
export function usePatchGuildsGuildIdWidget(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.guilds)[':guild_id']['widget']['$patch']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.guilds)[':guild_id']['widget']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchGuildsGuildIdWidgetMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /guilds/{guild_id}/widget.json
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdWidgetJsonQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/widget.json', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/widget.json
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['widget.json']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /guilds/{guild_id}/widget.png
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetGuildsGuildIdWidgetPngQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>>,
) {
  return ['guilds', 'GET', '/guilds/:guild_id/widget.png', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /guilds/{guild_id}/widget.png
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.guilds)[':guild_id']['widget.png']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /interactions/{interaction_id}/{interaction_token}/callback
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostInteractionsInteractionIdInteractionTokenCallbackMutationKey() {
  return [
    'interactions',
    'POST',
    '/interactions/:interaction_id/:interaction_token/callback',
  ] as const
}

/**
 * Returns Vue Query mutation options for POST /interactions/{interaction_id}/{interaction_token}/callback
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostInteractionsInteractionIdInteractionTokenCallbackMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostInteractionsInteractionIdInteractionTokenCallbackMutationKey(),
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

/**
 * POST /interactions/{interaction_id}/{interaction_token}/callback
 */
export function usePostInteractionsInteractionIdInteractionTokenCallback(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostInteractionsInteractionIdInteractionTokenCallbackMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /invites/{code}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetInvitesCodeQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.invites)[':code']['$get']>>,
) {
  return ['invites', 'GET', '/invites/:code', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /invites/{code}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.invites)[':code']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetInvitesCodeQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /invites/{code}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteInvitesCodeMutationKey() {
  return ['invites', 'DELETE', '/invites/:code'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /invites/{code}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteInvitesCodeMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteInvitesCodeMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.invites)[':code']['$delete']>) =>
    parseResponse(client.invites[':code'].$delete(args, clientOptions)),
})

/**
 * DELETE /invites/{code}
 */
export function useDeleteInvitesCode(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.invites)[':code']['$delete']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.invites)[':code']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteInvitesCodeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PUT /lobbies
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutLobbiesMutationKey() {
  return ['lobbies', 'PUT', '/lobbies'] as const
}

/**
 * Returns Vue Query mutation options for PUT /lobbies
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutLobbiesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutLobbiesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.lobbies.$put>) =>
    parseResponse(client.lobbies.$put(args, clientOptions)),
})

/**
 * PUT /lobbies
 */
export function usePutLobbies(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.lobbies.$put>>>>>,
        Error,
        InferRequestType<typeof client.lobbies.$put>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPutLobbiesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /lobbies
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostLobbiesMutationKey() {
  return ['lobbies', 'POST', '/lobbies'] as const
}

/**
 * Returns Vue Query mutation options for POST /lobbies
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostLobbiesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostLobbiesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.lobbies.$post>) =>
    parseResponse(client.lobbies.$post(args, clientOptions)),
})

/**
 * POST /lobbies
 */
export function usePostLobbies(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.lobbies.$post>>>>>,
        Error,
        InferRequestType<typeof client.lobbies.$post>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPostLobbiesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /lobbies/{lobby_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetLobbiesLobbyIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.lobbies)[':lobby_id']['$get']>>,
) {
  return ['lobbies', 'GET', '/lobbies/:lobby_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /lobbies/{lobby_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PATCH /lobbies/{lobby_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchLobbiesLobbyIdMutationKey() {
  return ['lobbies', 'PATCH', '/lobbies/:lobby_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /lobbies/{lobby_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchLobbiesLobbyIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchLobbiesLobbyIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>) =>
    parseResponse(client.lobbies[':lobby_id'].$patch(args, clientOptions)),
})

/**
 * PATCH /lobbies/{lobby_id}
 */
export function usePatchLobbiesLobbyId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['$patch']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.lobbies)[':lobby_id']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchLobbiesLobbyIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /lobbies/{lobby_id}/channel-linking
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchLobbiesLobbyIdChannelLinkingMutationKey() {
  return ['lobbies', 'PATCH', '/lobbies/:lobby_id/channel-linking'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /lobbies/{lobby_id}/channel-linking
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchLobbiesLobbyIdChannelLinkingMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchLobbiesLobbyIdChannelLinkingMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>,
  ) => parseResponse(client.lobbies[':lobby_id']['channel-linking'].$patch(args, clientOptions)),
})

/**
 * PATCH /lobbies/{lobby_id}/channel-linking
 */
export function usePatchLobbiesLobbyIdChannelLinking(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.lobbies)[':lobby_id']['channel-linking']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchLobbiesLobbyIdChannelLinkingMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /lobbies/{lobby_id}/members/@me
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteLobbiesLobbyIdMembersMeMutationKey() {
  return ['lobbies', 'DELETE', '/lobbies/:lobby_id/members/@me'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /lobbies/{lobby_id}/members/@me
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteLobbiesLobbyIdMembersMeMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteLobbiesLobbyIdMembersMeMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>,
  ) => parseResponse(client.lobbies[':lobby_id'].members['@me'].$delete(args, clientOptions)),
})

/**
 * DELETE /lobbies/{lobby_id}/members/@me
 */
export function useDeleteLobbiesLobbyIdMembersMe(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
                >
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['$delete']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteLobbiesLobbyIdMembersMeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /lobbies/{lobby_id}/members/@me/invites
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostLobbiesLobbyIdMembersMeInvitesMutationKey() {
  return ['lobbies', 'POST', '/lobbies/:lobby_id/members/@me/invites'] as const
}

/**
 * Returns Vue Query mutation options for POST /lobbies/{lobby_id}/members/@me/invites
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostLobbiesLobbyIdMembersMeInvitesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostLobbiesLobbyIdMembersMeInvitesMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']
    >,
  ) => parseResponse(client.lobbies[':lobby_id'].members['@me'].invites.$post(args, clientOptions)),
})

/**
 * POST /lobbies/{lobby_id}/members/@me/invites
 */
export function usePostLobbiesLobbyIdMembersMeInvites(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<
                  (typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']
                >
              >
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['@me']['invites']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostLobbiesLobbyIdMembersMeInvitesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /lobbies/{lobby_id}/members/bulk
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostLobbiesLobbyIdMembersBulkMutationKey() {
  return ['lobbies', 'POST', '/lobbies/:lobby_id/members/bulk'] as const
}

/**
 * Returns Vue Query mutation options for POST /lobbies/{lobby_id}/members/bulk
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostLobbiesLobbyIdMembersBulkMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostLobbiesLobbyIdMembersBulkMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>,
  ) => parseResponse(client.lobbies[':lobby_id'].members.bulk.$post(args, clientOptions)),
})

/**
 * POST /lobbies/{lobby_id}/members/bulk
 */
export function usePostLobbiesLobbyIdMembersBulk(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.lobbies)[':lobby_id']['members']['bulk']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostLobbiesLobbyIdMembersBulkMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PUT /lobbies/{lobby_id}/members/{user_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutLobbiesLobbyIdMembersUserIdMutationKey() {
  return ['lobbies', 'PUT', '/lobbies/:lobby_id/members/:user_id'] as const
}

/**
 * Returns Vue Query mutation options for PUT /lobbies/{lobby_id}/members/{user_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutLobbiesLobbyIdMembersUserIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutLobbiesLobbyIdMembersUserIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>,
  ) => parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$put(args, clientOptions)),
})

/**
 * PUT /lobbies/{lobby_id}/members/{user_id}
 */
export function usePutLobbiesLobbyIdMembersUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
              >
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$put']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutLobbiesLobbyIdMembersUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /lobbies/{lobby_id}/members/{user_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteLobbiesLobbyIdMembersUserIdMutationKey() {
  return ['lobbies', 'DELETE', '/lobbies/:lobby_id/members/:user_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /lobbies/{lobby_id}/members/{user_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteLobbiesLobbyIdMembersUserIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteLobbiesLobbyIdMembersUserIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.lobbies)[':lobby_id']['members'][':user_id']['$delete']>,
  ) => parseResponse(client.lobbies[':lobby_id'].members[':user_id'].$delete(args, clientOptions)),
})

/**
 * DELETE /lobbies/{lobby_id}/members/{user_id}
 */
export function useDeleteLobbiesLobbyIdMembersUserId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteLobbiesLobbyIdMembersUserIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /lobbies/{lobby_id}/members/{user_id}/invites
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostLobbiesLobbyIdMembersUserIdInvitesMutationKey() {
  return ['lobbies', 'POST', '/lobbies/:lobby_id/members/:user_id/invites'] as const
}

/**
 * Returns Vue Query mutation options for POST /lobbies/{lobby_id}/members/{user_id}/invites
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostLobbiesLobbyIdMembersUserIdInvitesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostLobbiesLobbyIdMembersUserIdInvitesMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.lobbies)[':lobby_id']['members'][':user_id']['invites']['$post']
    >,
  ) =>
    parseResponse(
      client.lobbies[':lobby_id'].members[':user_id'].invites.$post(args, clientOptions),
    ),
})

/**
 * POST /lobbies/{lobby_id}/members/{user_id}/invites
 */
export function usePostLobbiesLobbyIdMembersUserIdInvites(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostLobbiesLobbyIdMembersUserIdInvitesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /lobbies/{lobby_id}/messages
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetLobbiesLobbyIdMessagesQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>>,
) {
  return ['lobbies', 'GET', '/lobbies/:lobby_id/messages', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /lobbies/{lobby_id}/messages
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['messages']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /lobbies/{lobby_id}/messages
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostLobbiesLobbyIdMessagesMutationKey() {
  return ['lobbies', 'POST', '/lobbies/:lobby_id/messages'] as const
}

/**
 * Returns Vue Query mutation options for POST /lobbies/{lobby_id}/messages
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostLobbiesLobbyIdMessagesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostLobbiesLobbyIdMessagesMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>,
  ) => parseResponse(client.lobbies[':lobby_id'].messages.$post(args, clientOptions)),
})

/**
 * POST /lobbies/{lobby_id}/messages
 */
export function usePostLobbiesLobbyIdMessages(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.lobbies)[':lobby_id']['messages']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostLobbiesLobbyIdMessagesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /oauth2/@me
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOauth2MeQueryKey() {
  return ['oauth2', 'GET', '/oauth2/@me'] as const
}

/**
 * Returns Vue Query query options for GET /oauth2/@me
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.oauth2)['@me']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOauth2MeQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /oauth2/applications/@me
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOauth2ApplicationsMeQueryKey() {
  return ['oauth2', 'GET', '/oauth2/applications/@me'] as const
}

/**
 * Returns Vue Query query options for GET /oauth2/applications/@me
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['$get']>>
            >
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetOauth2ApplicationsMeQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /oauth2/keys
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOauth2KeysQueryKey() {
  return ['oauth2', 'GET', '/oauth2/keys'] as const
}

/**
 * Returns Vue Query query options for GET /oauth2/keys
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth2.keys.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOauth2KeysQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /oauth2/userinfo
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetOauth2UserinfoQueryKey() {
  return ['oauth2', 'GET', '/oauth2/userinfo'] as const
}

/**
 * Returns Vue Query query options for GET /oauth2/userinfo
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.oauth2.userinfo.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetOauth2UserinfoQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /partner-sdk/provisional-accounts/unmerge
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPartnerSdkProvisionalAccountsUnmergeMutationKey() {
  return ['partner-sdk', 'POST', '/partner-sdk/provisional-accounts/unmerge'] as const
}

/**
 * Returns Vue Query mutation options for POST /partner-sdk/provisional-accounts/unmerge
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPartnerSdkProvisionalAccountsUnmergeMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostPartnerSdkProvisionalAccountsUnmergeMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']
    >,
  ) =>
    parseResponse(client['partner-sdk']['provisional-accounts'].unmerge.$post(args, clientOptions)),
})

/**
 * POST /partner-sdk/provisional-accounts/unmerge
 */
export function usePostPartnerSdkProvisionalAccountsUnmerge(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<
                    (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']
                  >
                >
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostPartnerSdkProvisionalAccountsUnmergeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /partner-sdk/provisional-accounts/unmerge/bot
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPartnerSdkProvisionalAccountsUnmergeBotMutationKey() {
  return ['partner-sdk', 'POST', '/partner-sdk/provisional-accounts/unmerge/bot'] as const
}

/**
 * Returns Vue Query mutation options for POST /partner-sdk/provisional-accounts/unmerge/bot
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPartnerSdkProvisionalAccountsUnmergeBotMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostPartnerSdkProvisionalAccountsUnmergeBotMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['$post']
    >,
  ) =>
    parseResponse(
      client['partner-sdk']['provisional-accounts'].unmerge.bot.$post(args, clientOptions),
    ),
})

/**
 * POST /partner-sdk/provisional-accounts/unmerge/bot
 */
export function usePostPartnerSdkProvisionalAccountsUnmergeBot(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostPartnerSdkProvisionalAccountsUnmergeBotMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /partner-sdk/token
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPartnerSdkTokenMutationKey() {
  return ['partner-sdk', 'POST', '/partner-sdk/token'] as const
}

/**
 * Returns Vue Query mutation options for POST /partner-sdk/token
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPartnerSdkTokenMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostPartnerSdkTokenMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['partner-sdk']['token']['$post']>) =>
    parseResponse(client['partner-sdk'].token.$post(args, clientOptions)),
})

/**
 * POST /partner-sdk/token
 */
export function usePostPartnerSdkToken(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['partner-sdk']['token']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client)['partner-sdk']['token']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostPartnerSdkTokenMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /partner-sdk/token/bot
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPartnerSdkTokenBotMutationKey() {
  return ['partner-sdk', 'POST', '/partner-sdk/token/bot'] as const
}

/**
 * Returns Vue Query mutation options for POST /partner-sdk/token/bot
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPartnerSdkTokenBotMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostPartnerSdkTokenBotMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>,
  ) => parseResponse(client['partner-sdk'].token.bot.$post(args, clientOptions)),
})

/**
 * POST /partner-sdk/token/bot
 */
export function usePostPartnerSdkTokenBot(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['partner-sdk']['token']['bot']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client)['partner-sdk']['token']['bot']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostPartnerSdkTokenBotMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /soundboard-default-sounds
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetSoundboardDefaultSoundsQueryKey() {
  return ['soundboard-default-sounds', 'GET', '/soundboard-default-sounds'] as const
}

/**
 * Returns Vue Query query options for GET /soundboard-default-sounds
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['$get']>>
            >
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetSoundboardDefaultSoundsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for POST /stage-instances
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostStageInstancesMutationKey() {
  return ['stage-instances', 'POST', '/stage-instances'] as const
}

/**
 * Returns Vue Query mutation options for POST /stage-instances
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostStageInstancesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostStageInstancesMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client)['stage-instances']['$post']>) =>
    parseResponse(client['stage-instances'].$post(args, clientOptions)),
})

/**
 * POST /stage-instances
 */
export function usePostStageInstances(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['stage-instances']['$post']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client)['stage-instances']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostStageInstancesMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /stage-instances/{channel_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetStageInstancesChannelIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['stage-instances'][':channel_id']['$get']>>,
) {
  return ['stage-instances', 'GET', '/stage-instances/:channel_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /stage-instances/{channel_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client)['stage-instances'][':channel_id']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /stage-instances/{channel_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteStageInstancesChannelIdMutationKey() {
  return ['stage-instances', 'DELETE', '/stage-instances/:channel_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /stage-instances/{channel_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteStageInstancesChannelIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteStageInstancesChannelIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$delete']>,
  ) => parseResponse(client['stage-instances'][':channel_id'].$delete(args, clientOptions)),
})

/**
 * DELETE /stage-instances/{channel_id}
 */
export function useDeleteStageInstancesChannelId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteStageInstancesChannelIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /stage-instances/{channel_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchStageInstancesChannelIdMutationKey() {
  return ['stage-instances', 'PATCH', '/stage-instances/:channel_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /stage-instances/{channel_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchStageInstancesChannelIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchStageInstancesChannelIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>,
  ) => parseResponse(client['stage-instances'][':channel_id'].$patch(args, clientOptions)),
})

/**
 * PATCH /stage-instances/{channel_id}
 */
export function usePatchStageInstancesChannelId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client)['stage-instances'][':channel_id']['$patch']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client)['stage-instances'][':channel_id']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchStageInstancesChannelIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /sticker-packs
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetStickerPacksQueryKey() {
  return ['sticker-packs', 'GET', '/sticker-packs'] as const
}

/**
 * Returns Vue Query query options for GET /sticker-packs
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client)['sticker-packs']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetStickerPacksQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /sticker-packs/{pack_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetStickerPacksPackIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client)['sticker-packs'][':pack_id']['$get']>>,
) {
  return ['sticker-packs', 'GET', '/sticker-packs/:pack_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /sticker-packs/{pack_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client)['sticker-packs'][':pack_id']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /stickers/{sticker_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetStickersStickerIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.stickers)[':sticker_id']['$get']>>,
) {
  return ['stickers', 'GET', '/stickers/:sticker_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /stickers/{sticker_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.stickers)[':sticker_id']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /users/@me
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetUsersMeQueryKey() {
  return ['users', 'GET', '/users/@me'] as const
}

/**
 * Returns Vue Query query options for GET /users/@me
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.users)['@me']['$get']>>>
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersMeQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for PATCH /users/@me
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchUsersMeMutationKey() {
  return ['users', 'PATCH', '/users/@me'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /users/@me
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchUsersMeMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchUsersMeMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.users)['@me']['$patch']>) =>
    parseResponse(client.users['@me'].$patch(args, clientOptions)),
})

/**
 * PATCH /users/@me
 */
export function usePatchUsersMe(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<(typeof client.users)['@me']['$patch']>>>
          >
        >,
        Error,
        InferRequestType<(typeof client.users)['@me']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } = getPatchUsersMeMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /users/@me/applications/{application_id}/entitlements
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersMeApplicationsApplicationIdEntitlementsQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.users)['@me']['applications'][':application_id']['entitlements']['$get']
    >
  >,
) {
  return [
    'users',
    'GET',
    '/users/@me/applications/:application_id/entitlements',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /users/@me/applications/{application_id}/entitlements
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /users/@me/applications/{application_id}/role-connection
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersMeApplicationsApplicationIdRoleConnectionQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.users)['@me']['applications'][':application_id']['role-connection']['$get']
    >
  >,
) {
  return [
    'users',
    'GET',
    '/users/@me/applications/:application_id/role-connection',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /users/@me/applications/{application_id}/role-connection
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for PUT /users/@me/applications/{application_id}/role-connection
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutUsersMeApplicationsApplicationIdRoleConnectionMutationKey() {
  return ['users', 'PUT', '/users/@me/applications/:application_id/role-connection'] as const
}

/**
 * Returns Vue Query mutation options for PUT /users/@me/applications/{application_id}/role-connection
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutUsersMeApplicationsApplicationIdRoleConnectionMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutUsersMeApplicationsApplicationIdRoleConnectionMutationKey(),
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

/**
 * PUT /users/@me/applications/{application_id}/role-connection
 */
export function usePutUsersMeApplicationsApplicationIdRoleConnection(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPutUsersMeApplicationsApplicationIdRoleConnectionMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /users/@me/applications/{application_id}/role-connection
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationKey() {
  return ['users', 'DELETE', '/users/@me/applications/:application_id/role-connection'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /users/@me/applications/{application_id}/role-connection
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationKey(),
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

/**
 * DELETE /users/@me/applications/{application_id}/role-connection
 */
export function useDeleteUsersMeApplicationsApplicationIdRoleConnection(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /users/@me/channels
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUsersMeChannelsMutationKey() {
  return ['users', 'POST', '/users/@me/channels'] as const
}

/**
 * Returns Vue Query mutation options for POST /users/@me/channels
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostUsersMeChannelsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostUsersMeChannelsMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.users)['@me']['channels']['$post']>) =>
    parseResponse(client.users['@me'].channels.$post(args, clientOptions)),
})

/**
 * POST /users/@me/channels
 */
export function usePostUsersMeChannels(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.users)['@me']['channels']['$post']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.users)['@me']['channels']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostUsersMeChannelsMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /users/@me/connections
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetUsersMeConnectionsQueryKey() {
  return ['users', 'GET', '/users/@me/connections'] as const
}

/**
 * Returns Vue Query query options for GET /users/@me/connections
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.users)['@me']['connections']['$get']>>
            >
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersMeConnectionsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /users/@me/guilds
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersMeGuildsQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.users)['@me']['guilds']['$get']>>,
) {
  return ['users', 'GET', '/users/@me/guilds', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /users/@me/guilds
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.users)['@me']['guilds']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersMeGuildsQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query mutation key for DELETE /users/@me/guilds/{guild_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteUsersMeGuildsGuildIdMutationKey() {
  return ['users', 'DELETE', '/users/@me/guilds/:guild_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /users/@me/guilds/{guild_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteUsersMeGuildsGuildIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteUsersMeGuildsGuildIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['$delete']>,
  ) => parseResponse(client.users['@me'].guilds[':guild_id'].$delete(args, clientOptions)),
})

/**
 * DELETE /users/@me/guilds/{guild_id}
 */
export function useDeleteUsersMeGuildsGuildId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteUsersMeGuildsGuildIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /users/@me/guilds/{guild_id}/member
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersMeGuildsGuildIdMemberQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.users)['@me']['guilds'][':guild_id']['member']['$get']>
  >,
) {
  return ['users', 'GET', '/users/@me/guilds/:guild_id/member', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /users/@me/guilds/{guild_id}/member
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query cache key for GET /users/{user_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersUserIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.users)[':user_id']['$get']>>,
) {
  return ['users', 'GET', '/users/:user_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /users/{user_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':user_id']['$get']>>>
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
    >
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetUsersUserIdQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /voice/regions
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetVoiceRegionsQueryKey() {
  return ['voice', 'GET', '/voice/regions'] as const
}

/**
 * Returns Vue Query query options for GET /voice/regions
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.voice.regions.$get>>>>
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } = getGetVoiceRegionsQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * Generates Vue Query cache key for GET /webhooks/{webhook_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetWebhooksWebhookIdQueryKey(
  args: MaybeRef<InferRequestType<(typeof client.webhooks)[':webhook_id']['$get']>>,
) {
  return ['webhooks', 'GET', '/webhooks/:webhook_id', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /webhooks/{webhook_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<ReturnType<(typeof client.webhooks)[':webhook_id']['$get']>>
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /webhooks/{webhook_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteWebhooksWebhookIdMutationKey() {
  return ['webhooks', 'DELETE', '/webhooks/:webhook_id'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /webhooks/{webhook_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteWebhooksWebhookIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteWebhooksWebhookIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$delete']>) =>
    parseResponse(client.webhooks[':webhook_id'].$delete(args, clientOptions)),
})

/**
 * DELETE /webhooks/{webhook_id}
 */
export function useDeleteWebhooksWebhookId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteWebhooksWebhookIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /webhooks/{webhook_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchWebhooksWebhookIdMutationKey() {
  return ['webhooks', 'PATCH', '/webhooks/:webhook_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /webhooks/{webhook_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchWebhooksWebhookIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPatchWebhooksWebhookIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>) =>
    parseResponse(client.webhooks[':webhook_id'].$patch(args, clientOptions)),
})

/**
 * PATCH /webhooks/{webhook_id}
 */
export function usePatchWebhooksWebhookId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.webhooks)[':webhook_id']['$patch']>>
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.webhooks)[':webhook_id']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchWebhooksWebhookIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /webhooks/{webhook_id}/{webhook_token}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetWebhooksWebhookIdWebhookTokenQueryKey(
  args: MaybeRef<
    InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>
  >,
) {
  return ['webhooks', 'GET', '/webhooks/:webhook_id/:webhook_token', unref(args)] as const
}

/**
 * Returns Vue Query query options for GET /webhooks/{webhook_id}/{webhook_token}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
          Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$get']>
                >
              >
            >
          >,
          Error
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for POST /webhooks/{webhook_id}/{webhook_token}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebhooksWebhookIdWebhookTokenMutationKey() {
  return ['webhooks', 'POST', '/webhooks/:webhook_id/:webhook_token'] as const
}

/**
 * Returns Vue Query mutation options for POST /webhooks/{webhook_id}/{webhook_token}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostWebhooksWebhookIdWebhookTokenMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostWebhooksWebhookIdWebhookTokenMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>,
  ) => parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$post(args, clientOptions)),
})

/**
 * POST /webhooks/{webhook_id}/{webhook_token}
 */
export function usePostWebhooksWebhookIdWebhookToken(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        | Awaited<
            ReturnType<
              typeof parseResponse<
                Awaited<
                  ReturnType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
                >
              >
            >
          >
        | undefined,
        Error,
        InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$post']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostWebhooksWebhookIdWebhookTokenMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for DELETE /webhooks/{webhook_id}/{webhook_token}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteWebhooksWebhookIdWebhookTokenMutationKey() {
  return ['webhooks', 'DELETE', '/webhooks/:webhook_id/:webhook_token'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /webhooks/{webhook_id}/{webhook_token}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteWebhooksWebhookIdWebhookTokenMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteWebhooksWebhookIdWebhookTokenMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$delete']>,
  ) => parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$delete(args, clientOptions)),
})

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}
 */
export function useDeleteWebhooksWebhookIdWebhookToken(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteWebhooksWebhookIdWebhookTokenMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /webhooks/{webhook_id}/{webhook_token}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchWebhooksWebhookIdWebhookTokenMutationKey() {
  return ['webhooks', 'PATCH', '/webhooks/:webhook_id/:webhook_token'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /webhooks/{webhook_id}/{webhook_token}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchWebhooksWebhookIdWebhookTokenMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchWebhooksWebhookIdWebhookTokenMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>,
  ) => parseResponse(client.webhooks[':webhook_id'][':webhook_token'].$patch(args, clientOptions)),
})

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}
 */
export function usePatchWebhooksWebhookIdWebhookToken(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
              >
            >
          >
        >,
        Error,
        InferRequestType<(typeof client.webhooks)[':webhook_id'][':webhook_token']['$patch']>
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchWebhooksWebhookIdWebhookTokenMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /webhooks/{webhook_id}/{webhook_token}/github
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebhooksWebhookIdWebhookTokenGithubMutationKey() {
  return ['webhooks', 'POST', '/webhooks/:webhook_id/:webhook_token/github'] as const
}

/**
 * Returns Vue Query mutation options for POST /webhooks/{webhook_id}/{webhook_token}/github
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostWebhooksWebhookIdWebhookTokenGithubMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostWebhooksWebhookIdWebhookTokenGithubMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
    >,
  ) =>
    parseResponse(
      client.webhooks[':webhook_id'][':webhook_token'].github.$post(args, clientOptions),
    ),
})

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/github
 */
export function usePostWebhooksWebhookIdWebhookTokenGithub(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
        InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['github']['$post']
        >
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostWebhooksWebhookIdWebhookTokenGithubMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages']['@original']['$get']
    >
  >,
) {
  return [
    'webhooks',
    'GET',
    '/webhooks/:webhook_id/:webhook_token/messages/@original',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /webhooks/{webhook_id}/{webhook_token}/messages/@original
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /webhooks/{webhook_id}/{webhook_token}/messages/@original
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey() {
  return ['webhooks', 'DELETE', '/webhooks/:webhook_id/:webhook_token/messages/@original'] as const
}

/**
 * Returns Vue Query mutation options for DELETE /webhooks/{webhook_id}/{webhook_token}/messages/@original
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey(),
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

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /webhooks/{webhook_id}/{webhook_token}/messages/@original
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey() {
  return ['webhooks', 'PATCH', '/webhooks/:webhook_id/:webhook_token/messages/@original'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /webhooks/{webhook_id}/{webhook_token}/messages/@original
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey(),
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

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/@original
 */
export function usePatchWebhooksWebhookIdWebhookTokenMessagesOriginal(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query cache key for GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['messages'][':message_id']['$get']
    >
  >,
) {
  return [
    'webhooks',
    'GET',
    '/webhooks/:webhook_id/:webhook_token/messages/:message_id',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
 * Generates Vue Query mutation key for DELETE /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey() {
  return [
    'webhooks',
    'DELETE',
    '/webhooks/:webhook_id/:webhook_token/messages/:message_id',
  ] as const
}

/**
 * Returns Vue Query mutation options for DELETE /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey(),
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

/**
 * DELETE /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function useDeleteWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for PATCH /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey() {
  return ['webhooks', 'PATCH', '/webhooks/:webhook_id/:webhook_token/messages/:message_id'] as const
}

/**
 * Returns Vue Query mutation options for PATCH /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey(),
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

/**
 * PATCH /webhooks/{webhook_id}/{webhook_token}/messages/{message_id}
 */
export function usePatchWebhooksWebhookIdWebhookTokenMessagesMessageId(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}

/**
 * Generates Vue Query mutation key for POST /webhooks/{webhook_id}/{webhook_token}/slack
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebhooksWebhookIdWebhookTokenSlackMutationKey() {
  return ['webhooks', 'POST', '/webhooks/:webhook_id/:webhook_token/slack'] as const
}

/**
 * Returns Vue Query mutation options for POST /webhooks/{webhook_id}/{webhook_token}/slack
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostWebhooksWebhookIdWebhookTokenSlackMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostWebhooksWebhookIdWebhookTokenSlackMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
    >,
  ) =>
    parseResponse(
      client.webhooks[':webhook_id'][':webhook_token'].slack.$post(args, clientOptions),
    ),
})

/**
 * POST /webhooks/{webhook_id}/{webhook_token}/slack
 */
export function usePostWebhooksWebhookIdWebhookTokenSlack(options?: {
  mutation?: Partial<
    Omit<
      UseMutationOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<
                ReturnType<
                  (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
                >
              >
            >
          >
        >,
        Error,
        InferRequestType<
          (typeof client.webhooks)[':webhook_id'][':webhook_token']['slack']['$post']
        >
      >,
      'mutationFn' | 'mutationKey'
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { mutationKey, mutationFn, ...baseOptions } =
    getPostWebhooksWebhookIdWebhookTokenSlackMutationOptions(clientOptions)
  return useMutation({ ...baseOptions, ...mutationOptions, mutationKey, mutationFn })
}
