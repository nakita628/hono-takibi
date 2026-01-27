import type {
  CreateMutationOptions,
  CreateQueryOptions,
  QueryFunctionContext,
} from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/44-sns-notifications-dm-search'

/**
 * Generates Svelte Query cache key for GET /notifications
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetNotificationsQueryKey(
  args: InferRequestType<typeof client.notifications.$get>,
) {
  return ['notifications', 'GET', '/notifications', args] as const
}

/**
 * Returns Svelte Query query options for GET /notifications
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNotificationsQueryOptions = (
  args: InferRequestType<typeof client.notifications.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetNotificationsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.notifications.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /notifications
 *
 * 通知一覧取得
 */
export function createGetNotifications(
  args: InferRequestType<typeof client.notifications.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.notifications.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNotificationsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /notifications/unread-count
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotificationsUnreadCountQueryKey() {
  return ['notifications', 'GET', '/notifications/unread-count'] as const
}

/**
 * Returns Svelte Query query options for GET /notifications/unread-count
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNotificationsUnreadCountQueryOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetNotificationsUnreadCountQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.notifications['unread-count'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /notifications/unread-count
 *
 * 未読通知数取得
 */
export function createGetNotificationsUnreadCount(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.notifications)['unread-count']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNotificationsUnreadCountQueryOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /notifications/mark-read
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostNotificationsMarkReadMutationKey() {
  return ['notifications', 'POST', '/notifications/mark-read'] as const
}

/**
 * Returns Svelte Query mutation options for POST /notifications/mark-read
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostNotificationsMarkReadMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostNotificationsMarkReadMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.notifications)['mark-read']['$post']>) =>
    parseResponse(client.notifications['mark-read'].$post(args, clientOptions)),
})

/**
 * POST /notifications/mark-read
 *
 * 通知を既読にする
 */
export function createPostNotificationsMarkRead(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.notifications)['mark-read']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.notifications)['mark-read']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostNotificationsMarkReadMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /notifications/settings
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetNotificationsSettingsQueryKey() {
  return ['notifications', 'GET', '/notifications/settings'] as const
}

/**
 * Returns Svelte Query query options for GET /notifications/settings
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNotificationsSettingsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetNotificationsSettingsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.notifications.settings.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /notifications/settings
 *
 * 通知設定取得
 */
export function createGetNotificationsSettings(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.notifications.settings.$get>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetNotificationsSettingsQueryOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /notifications/settings
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutNotificationsSettingsMutationKey() {
  return ['notifications', 'PUT', '/notifications/settings'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /notifications/settings
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutNotificationsSettingsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutNotificationsSettingsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.notifications.settings.$put>) =>
    parseResponse(client.notifications.settings.$put(args, clientOptions)),
})

/**
 * PUT /notifications/settings
 *
 * 通知設定更新
 */
export function createPutNotificationsSettings(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.notifications.settings.$put>>>
        >
      >,
      Error,
      InferRequestType<typeof client.notifications.settings.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutNotificationsSettingsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /dm/conversations
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetDmConversationsQueryKey(
  args: InferRequestType<typeof client.dm.conversations.$get>,
) {
  return ['dm', 'GET', '/dm/conversations', args] as const
}

/**
 * Returns Svelte Query query options for GET /dm/conversations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmConversationsQueryOptions = (
  args: InferRequestType<typeof client.dm.conversations.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetDmConversationsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.dm.conversations.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /dm/conversations
 *
 * 会話一覧取得
 */
export function createGetDmConversations(
  args: InferRequestType<typeof client.dm.conversations.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.dm.conversations.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetDmConversationsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /dm/conversations
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostDmConversationsMutationKey() {
  return ['dm', 'POST', '/dm/conversations'] as const
}

/**
 * Returns Svelte Query mutation options for POST /dm/conversations
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostDmConversationsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostDmConversationsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.dm.conversations.$post>) =>
    parseResponse(client.dm.conversations.$post(args, clientOptions)),
})

/**
 * POST /dm/conversations
 *
 * 会話作成
 */
export function createPostDmConversations(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.dm.conversations.$post>>>>
      >,
      Error,
      InferRequestType<typeof client.dm.conversations.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostDmConversationsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /dm/conversations/{conversationId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetDmConversationsConversationIdQueryKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
) {
  return ['dm', 'GET', '/dm/conversations/:conversationId', args] as const
}

/**
 * Returns Svelte Query query options for GET /dm/conversations/{conversationId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmConversationsConversationIdQueryOptions = (
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetDmConversationsConversationIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.dm.conversations[':conversationId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /dm/conversations/{conversationId}
 *
 * 会話詳細取得
 */
export function createGetDmConversationsConversationId(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.dm.conversations)[':conversationId']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetDmConversationsConversationIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /dm/conversations/{conversationId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteDmConversationsConversationIdMutationKey() {
  return ['dm', 'DELETE', '/dm/conversations/:conversationId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /dm/conversations/{conversationId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteDmConversationsConversationIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteDmConversationsConversationIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>,
  ) => parseResponse(client.dm.conversations[':conversationId'].$delete(args, clientOptions)),
})

/**
 * DELETE /dm/conversations/{conversationId}
 *
 * 会話を退出
 */
export function createDeleteDmConversationsConversationId(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.dm.conversations)[':conversationId']['$delete']>>
            >
          >
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getDeleteDmConversationsConversationIdMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /dm/conversations/{conversationId}/messages
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetDmConversationsConversationIdMessagesQueryKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
) {
  return ['dm', 'GET', '/dm/conversations/:conversationId/messages', args] as const
}

/**
 * Returns Svelte Query query options for GET /dm/conversations/{conversationId}/messages
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmConversationsConversationIdMessagesQueryOptions = (
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetDmConversationsConversationIdMessagesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.dm.conversations[':conversationId'].messages.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /dm/conversations/{conversationId}/messages
 *
 * メッセージ一覧取得
 */
export function createGetDmConversationsConversationIdMessages(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } =
      getGetDmConversationsConversationIdMessagesQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /dm/conversations/{conversationId}/messages
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostDmConversationsConversationIdMessagesMutationKey() {
  return ['dm', 'POST', '/dm/conversations/:conversationId/messages'] as const
}

/**
 * Returns Svelte Query mutation options for POST /dm/conversations/{conversationId}/messages
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostDmConversationsConversationIdMessagesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostDmConversationsConversationIdMessagesMutationKey(),
  mutationFn: async (
    args: InferRequestType<
      (typeof client.dm.conversations)[':conversationId']['messages']['$post']
    >,
  ) =>
    parseResponse(client.dm.conversations[':conversationId'].messages.$post(args, clientOptions)),
})

/**
 * POST /dm/conversations/{conversationId}/messages
 *
 * メッセージ送信
 */
export function createPostDmConversationsConversationIdMessages(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
            >
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostDmConversationsConversationIdMessagesMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /dm/conversations/{conversationId}/read
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostDmConversationsConversationIdReadMutationKey() {
  return ['dm', 'POST', '/dm/conversations/:conversationId/read'] as const
}

/**
 * Returns Svelte Query mutation options for POST /dm/conversations/{conversationId}/read
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostDmConversationsConversationIdReadMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostDmConversationsConversationIdReadMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>,
  ) => parseResponse(client.dm.conversations[':conversationId'].read.$post(args, clientOptions)),
})

/**
 * POST /dm/conversations/{conversationId}/read
 *
 * 会話を既読にする
 */
export function createPostDmConversationsConversationIdRead(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
            >
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostDmConversationsConversationIdReadMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /dm/conversations/{conversationId}/typing
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostDmConversationsConversationIdTypingMutationKey() {
  return ['dm', 'POST', '/dm/conversations/:conversationId/typing'] as const
}

/**
 * Returns Svelte Query mutation options for POST /dm/conversations/{conversationId}/typing
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostDmConversationsConversationIdTypingMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostDmConversationsConversationIdTypingMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>,
  ) => parseResponse(client.dm.conversations[':conversationId'].typing.$post(args, clientOptions)),
})

/**
 * POST /dm/conversations/{conversationId}/typing
 *
 * 入力中インジケーター送信
 */
export function createPostDmConversationsConversationIdTyping(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
            >
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostDmConversationsConversationIdTypingMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /dm/messages/{messageId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteDmMessagesMessageIdMutationKey() {
  return ['dm', 'DELETE', '/dm/messages/:messageId'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /dm/messages/{messageId}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteDmMessagesMessageIdMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteDmMessagesMessageIdMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>,
  ) => parseResponse(client.dm.messages[':messageId'].$delete(args, clientOptions)),
})

/**
 * DELETE /dm/messages/{messageId}
 *
 * メッセージ削除
 */
export function createDeleteDmMessagesMessageId(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.dm.messages)[':messageId']['$delete']>>
            >
          >
        >
      | undefined,
      Error,
      InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteDmMessagesMessageIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /dm/messages/{messageId}/reactions
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostDmMessagesMessageIdReactionsMutationKey() {
  return ['dm', 'POST', '/dm/messages/:messageId/reactions'] as const
}

/**
 * Returns Svelte Query mutation options for POST /dm/messages/{messageId}/reactions
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostDmMessagesMessageIdReactionsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostDmMessagesMessageIdReactionsMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>,
  ) => parseResponse(client.dm.messages[':messageId'].reactions.$post(args, clientOptions)),
})

/**
 * POST /dm/messages/{messageId}/reactions
 *
 * メッセージにリアクション追加
 */
export function createPostDmMessagesMessageIdReactions(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostDmMessagesMessageIdReactionsMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /dm/messages/{messageId}/reactions
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteDmMessagesMessageIdReactionsMutationKey() {
  return ['dm', 'DELETE', '/dm/messages/:messageId/reactions'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /dm/messages/{messageId}/reactions
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteDmMessagesMessageIdReactionsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteDmMessagesMessageIdReactionsMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>,
  ) => parseResponse(client.dm.messages[':messageId'].reactions.$delete(args, clientOptions)),
})

/**
 * DELETE /dm/messages/{messageId}/reactions
 *
 * メッセージのリアクション削除
 */
export function createDeleteDmMessagesMessageIdReactions(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getDeleteDmMessagesMessageIdReactionsMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /dm/unread-count
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetDmUnreadCountQueryKey() {
  return ['dm', 'GET', '/dm/unread-count'] as const
}

/**
 * Returns Svelte Query query options for GET /dm/unread-count
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmUnreadCountQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetDmUnreadCountQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.dm['unread-count'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /dm/unread-count
 *
 * 未読メッセージ数取得
 */
export function createGetDmUnreadCount(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.dm)['unread-count']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetDmUnreadCountQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /search/posts
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSearchPostsQueryKey(args: InferRequestType<typeof client.search.posts.$get>) {
  return ['search', 'GET', '/search/posts', args] as const
}

/**
 * Returns Svelte Query query options for GET /search/posts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchPostsQueryOptions = (
  args: InferRequestType<typeof client.search.posts.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSearchPostsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.search.posts.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /search/posts
 *
 * 投稿検索
 */
export function createGetSearchPosts(
  args: InferRequestType<typeof client.search.posts.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.posts.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSearchPostsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /search/users
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSearchUsersQueryKey(args: InferRequestType<typeof client.search.users.$get>) {
  return ['search', 'GET', '/search/users', args] as const
}

/**
 * Returns Svelte Query query options for GET /search/users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchUsersQueryOptions = (
  args: InferRequestType<typeof client.search.users.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSearchUsersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.search.users.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /search/users
 *
 * ユーザー検索
 */
export function createGetSearchUsers(
  args: InferRequestType<typeof client.search.users.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.users.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSearchUsersQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /search/hashtags
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSearchHashtagsQueryKey(
  args: InferRequestType<typeof client.search.hashtags.$get>,
) {
  return ['search', 'GET', '/search/hashtags', args] as const
}

/**
 * Returns Svelte Query query options for GET /search/hashtags
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchHashtagsQueryOptions = (
  args: InferRequestType<typeof client.search.hashtags.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSearchHashtagsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.search.hashtags.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /search/hashtags
 *
 * ハッシュタグ検索
 */
export function createGetSearchHashtags(
  args: InferRequestType<typeof client.search.hashtags.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.hashtags.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSearchHashtagsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /search/recent
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetSearchRecentQueryKey() {
  return ['search', 'GET', '/search/recent'] as const
}

/**
 * Returns Svelte Query query options for GET /search/recent
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchRecentQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSearchRecentQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.search.recent.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /search/recent
 *
 * 最近の検索履歴
 */
export function createGetSearchRecent(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.recent.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSearchRecentQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /search/recent
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteSearchRecentMutationKey() {
  return ['search', 'DELETE', '/search/recent'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /search/recent
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteSearchRecentMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteSearchRecentMutationKey(),
  mutationFn: async () => parseResponse(client.search.recent.$delete(undefined, clientOptions)),
})

/**
 * DELETE /search/recent
 *
 * 検索履歴クリア
 */
export function createDeleteSearchRecent(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.recent.$delete>>>>
        >
      | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteSearchRecentMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /trends
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTrendsQueryKey(args: InferRequestType<typeof client.trends.$get>) {
  return ['trends', 'GET', '/trends', args] as const
}

/**
 * Returns Svelte Query query options for GET /trends
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTrendsQueryOptions = (
  args: InferRequestType<typeof client.trends.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTrendsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.trends.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /trends
 *
 * トレンド取得
 */
export function createGetTrends(
  args: InferRequestType<typeof client.trends.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trends.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTrendsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /trends/locations
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetTrendsLocationsQueryKey() {
  return ['trends', 'GET', '/trends/locations'] as const
}

/**
 * Returns Svelte Query query options for GET /trends/locations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTrendsLocationsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetTrendsLocationsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.trends.locations.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /trends/locations
 *
 * トレンド対応地域一覧
 */
export function createGetTrendsLocations(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trends.locations.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTrendsLocationsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /suggestions/users
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSuggestionsUsersQueryKey(
  args: InferRequestType<typeof client.suggestions.users.$get>,
) {
  return ['suggestions', 'GET', '/suggestions/users', args] as const
}

/**
 * Returns Svelte Query query options for GET /suggestions/users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSuggestionsUsersQueryOptions = (
  args: InferRequestType<typeof client.suggestions.users.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSuggestionsUsersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.suggestions.users.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /suggestions/users
 *
 * おすすめユーザー取得
 */
export function createGetSuggestionsUsers(
  args: InferRequestType<typeof client.suggestions.users.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.suggestions.users.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSuggestionsUsersQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /suggestions/users/{userId}/hide
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostSuggestionsUsersUserIdHideMutationKey() {
  return ['suggestions', 'POST', '/suggestions/users/:userId/hide'] as const
}

/**
 * Returns Svelte Query mutation options for POST /suggestions/users/{userId}/hide
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostSuggestionsUsersUserIdHideMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostSuggestionsUsersUserIdHideMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>,
  ) => parseResponse(client.suggestions.users[':userId'].hide.$post(args, clientOptions)),
})

/**
 * POST /suggestions/users/{userId}/hide
 *
 * おすすめユーザーを非表示
 */
export function createPostSuggestionsUsersUserIdHide(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.suggestions.users)[':userId']['hide']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostSuggestionsUsersUserIdHideMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /suggestions/topics
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetSuggestionsTopicsQueryKey() {
  return ['suggestions', 'GET', '/suggestions/topics'] as const
}

/**
 * Returns Svelte Query query options for GET /suggestions/topics
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSuggestionsTopicsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetSuggestionsTopicsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.suggestions.topics.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /suggestions/topics
 *
 * おすすめトピック取得
 */
export function createGetSuggestionsTopics(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.suggestions.topics.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSuggestionsTopicsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /topics/{topicId}/follow
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTopicsTopicIdFollowMutationKey() {
  return ['topics', 'POST', '/topics/:topicId/follow'] as const
}

/**
 * Returns Svelte Query mutation options for POST /topics/{topicId}/follow
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostTopicsTopicIdFollowMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostTopicsTopicIdFollowMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>,
  ) => parseResponse(client.topics[':topicId'].follow.$post(args, clientOptions)),
})

/**
 * POST /topics/{topicId}/follow
 *
 * トピックをフォロー
 */
export function createPostTopicsTopicIdFollow(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.topics)[':topicId']['follow']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostTopicsTopicIdFollowMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /topics/{topicId}/follow
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteTopicsTopicIdFollowMutationKey() {
  return ['topics', 'DELETE', '/topics/:topicId/follow'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /topics/{topicId}/follow
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteTopicsTopicIdFollowMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeleteTopicsTopicIdFollowMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>,
  ) => parseResponse(client.topics[':topicId'].follow.$delete(args, clientOptions)),
})

/**
 * DELETE /topics/{topicId}/follow
 *
 * トピックのフォロー解除
 */
export function createDeleteTopicsTopicIdFollow(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.topics)[':topicId']['follow']['$delete']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteTopicsTopicIdFollowMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}
