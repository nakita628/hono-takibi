import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/44-sns-notifications-dm-search'

/**
 * Generates SWR cache key for GET /notifications
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetNotificationsKey(args: InferRequestType<typeof client.notifications.$get>) {
  return ['/notifications', args] as const
}

/**
 * GET /notifications
 *
 * 通知一覧取得
 */
export function useGetNotifications(
  args: InferRequestType<typeof client.notifications.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetNotificationsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.notifications.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /notifications/unread-count
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetNotificationsUnreadCountKey() {
  return ['/notifications/unread-count'] as const
}

/**
 * GET /notifications/unread-count
 *
 * 未読通知数取得
 */
export function useGetNotificationsUnreadCount(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetNotificationsUnreadCountKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.notifications['unread-count'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /notifications/mark-read
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostNotificationsMarkReadMutationKey() {
  return ['/notifications/mark-read'] as const
}

/**
 * POST /notifications/mark-read
 *
 * 通知を既読にする
 */
export function usePostNotificationsMarkRead(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.notifications)['mark-read']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.notifications)['mark-read']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostNotificationsMarkReadMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.notifications)['mark-read']['$post']> },
      ) => parseResponse(client.notifications['mark-read'].$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /notifications/settings
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetNotificationsSettingsKey() {
  return ['/notifications/settings'] as const
}

/**
 * GET /notifications/settings
 *
 * 通知設定取得
 */
export function useGetNotificationsSettings(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetNotificationsSettingsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.notifications.settings.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /notifications/settings
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPutNotificationsSettingsMutationKey() {
  return ['/notifications/settings'] as const
}

/**
 * PUT /notifications/settings
 *
 * 通知設定更新
 */
export function usePutNotificationsSettings(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.notifications.settings.$put>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.notifications.settings.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutNotificationsSettingsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.notifications.settings.$put> },
      ) => parseResponse(client.notifications.settings.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /dm/conversations
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetDmConversationsKey(
  args: InferRequestType<typeof client.dm.conversations.$get>,
) {
  return ['/dm/conversations', args] as const
}

/**
 * GET /dm/conversations
 *
 * 会話一覧取得
 */
export function useGetDmConversations(
  args: InferRequestType<typeof client.dm.conversations.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetDmConversationsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.dm.conversations.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /dm/conversations
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostDmConversationsMutationKey() {
  return ['/dm/conversations'] as const
}

/**
 * POST /dm/conversations
 *
 * 会話作成
 */
export function usePostDmConversations(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.dm.conversations.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.dm.conversations.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostDmConversationsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.dm.conversations.$post> }) =>
        parseResponse(client.dm.conversations.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /dm/conversations/{conversationId}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetDmConversationsConversationIdKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
) {
  return [`/dm/conversations/${args.param.conversationId}`, args] as const
}

/**
 * GET /dm/conversations/{conversationId}
 *
 * 会話詳細取得
 */
export function useGetDmConversationsConversationId(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetDmConversationsConversationIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.dm.conversations[':conversationId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /dm/conversations/{conversationId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteDmConversationsConversationIdMutationKey() {
  return ['/dm/conversations/:conversationId'] as const
}

/**
 * DELETE /dm/conversations/{conversationId}
 *
 * 会話を退出
 */
export function useDeleteDmConversationsConversationId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.dm.conversations)[':conversationId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteDmConversationsConversationIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>
        },
      ) => parseResponse(client.dm.conversations[':conversationId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /dm/conversations/{conversationId}/messages
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetDmConversationsConversationIdMessagesKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
) {
  return [`/dm/conversations/${args.param.conversationId}/messages`, args] as const
}

/**
 * GET /dm/conversations/{conversationId}/messages
 *
 * メッセージ一覧取得
 */
export function useGetDmConversationsConversationIdMessages(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetDmConversationsConversationIdMessagesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.dm.conversations[':conversationId'].messages.$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /dm/conversations/{conversationId}/messages
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostDmConversationsConversationIdMessagesMutationKey() {
  return ['/dm/conversations/:conversationId/messages'] as const
}

/**
 * POST /dm/conversations/{conversationId}/messages
 *
 * メッセージ送信
 */
export function usePostDmConversationsConversationIdMessages(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostDmConversationsConversationIdMessagesMutationKey()
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
            (typeof client.dm.conversations)[':conversationId']['messages']['$post']
          >
        },
      ) =>
        parseResponse(
          client.dm.conversations[':conversationId'].messages.$post(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /dm/conversations/{conversationId}/read
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostDmConversationsConversationIdReadMutationKey() {
  return ['/dm/conversations/:conversationId/read'] as const
}

/**
 * POST /dm/conversations/{conversationId}/read
 *
 * 会話を既読にする
 */
export function usePostDmConversationsConversationIdRead(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostDmConversationsConversationIdReadMutationKey()
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
            (typeof client.dm.conversations)[':conversationId']['read']['$post']
          >
        },
      ) => parseResponse(client.dm.conversations[':conversationId'].read.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /dm/conversations/{conversationId}/typing
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostDmConversationsConversationIdTypingMutationKey() {
  return ['/dm/conversations/:conversationId/typing'] as const
}

/**
 * POST /dm/conversations/{conversationId}/typing
 *
 * 入力中インジケーター送信
 */
export function usePostDmConversationsConversationIdTyping(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostDmConversationsConversationIdTypingMutationKey()
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
            (typeof client.dm.conversations)[':conversationId']['typing']['$post']
          >
        },
      ) =>
        parseResponse(client.dm.conversations[':conversationId'].typing.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /dm/messages/{messageId}
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteDmMessagesMessageIdMutationKey() {
  return ['/dm/messages/:messageId'] as const
}

/**
 * DELETE /dm/messages/{messageId}
 *
 * メッセージ削除
 */
export function useDeleteDmMessagesMessageId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.dm.messages)[':messageId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteDmMessagesMessageIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']> },
      ) => parseResponse(client.dm.messages[':messageId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /dm/messages/{messageId}/reactions
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostDmMessagesMessageIdReactionsMutationKey() {
  return ['/dm/messages/:messageId/reactions'] as const
}

/**
 * POST /dm/messages/{messageId}/reactions
 *
 * メッセージにリアクション追加
 */
export function usePostDmMessagesMessageIdReactions(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostDmMessagesMessageIdReactionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>
        },
      ) => parseResponse(client.dm.messages[':messageId'].reactions.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /dm/messages/{messageId}/reactions
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteDmMessagesMessageIdReactionsMutationKey() {
  return ['/dm/messages/:messageId/reactions'] as const
}

/**
 * DELETE /dm/messages/{messageId}/reactions
 *
 * メッセージのリアクション削除
 */
export function useDeleteDmMessagesMessageIdReactions(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteDmMessagesMessageIdReactionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
        },
      ) => parseResponse(client.dm.messages[':messageId'].reactions.$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /dm/unread-count
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetDmUnreadCountKey() {
  return ['/dm/unread-count'] as const
}

/**
 * GET /dm/unread-count
 *
 * 未読メッセージ数取得
 */
export function useGetDmUnreadCount(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetDmUnreadCountKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.dm['unread-count'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /search/posts
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetSearchPostsKey(args: InferRequestType<typeof client.search.posts.$get>) {
  return ['/search/posts', args] as const
}

/**
 * GET /search/posts
 *
 * 投稿検索
 */
export function useGetSearchPosts(
  args: InferRequestType<typeof client.search.posts.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSearchPostsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.search.posts.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /search/users
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetSearchUsersKey(args: InferRequestType<typeof client.search.users.$get>) {
  return ['/search/users', args] as const
}

/**
 * GET /search/users
 *
 * ユーザー検索
 */
export function useGetSearchUsers(
  args: InferRequestType<typeof client.search.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSearchUsersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.search.users.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /search/hashtags
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetSearchHashtagsKey(
  args: InferRequestType<typeof client.search.hashtags.$get>,
) {
  return ['/search/hashtags', args] as const
}

/**
 * GET /search/hashtags
 *
 * ハッシュタグ検索
 */
export function useGetSearchHashtags(
  args: InferRequestType<typeof client.search.hashtags.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSearchHashtagsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.search.hashtags.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /search/recent
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetSearchRecentKey() {
  return ['/search/recent'] as const
}

/**
 * GET /search/recent
 *
 * 最近の検索履歴
 */
export function useGetSearchRecent(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSearchRecentKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.search.recent.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /search/recent
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteSearchRecentMutationKey() {
  return ['/search/recent'] as const
}

/**
 * DELETE /search/recent
 *
 * 検索履歴クリア
 */
export function useDeleteSearchRecent(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.recent.$delete>>>>
      >
    | undefined,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteSearchRecentMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.search.recent.$delete(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /trends
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetTrendsKey(args: InferRequestType<typeof client.trends.$get>) {
  return ['/trends', args] as const
}

/**
 * GET /trends
 *
 * トレンド取得
 */
export function useGetTrends(
  args: InferRequestType<typeof client.trends.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetTrendsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.trends.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /trends/locations
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetTrendsLocationsKey() {
  return ['/trends/locations'] as const
}

/**
 * GET /trends/locations
 *
 * トレンド対応地域一覧
 */
export function useGetTrendsLocations(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetTrendsLocationsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.trends.locations.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /suggestions/users
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetSuggestionsUsersKey(
  args: InferRequestType<typeof client.suggestions.users.$get>,
) {
  return ['/suggestions/users', args] as const
}

/**
 * GET /suggestions/users
 *
 * おすすめユーザー取得
 */
export function useGetSuggestionsUsers(
  args: InferRequestType<typeof client.suggestions.users.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSuggestionsUsersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.suggestions.users.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /suggestions/users/{userId}/hide
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostSuggestionsUsersUserIdHideMutationKey() {
  return ['/suggestions/users/:userId/hide'] as const
}

/**
 * POST /suggestions/users/{userId}/hide
 *
 * おすすめユーザーを非表示
 */
export function usePostSuggestionsUsersUserIdHide(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.suggestions.users)[':userId']['hide']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSuggestionsUsersUserIdHideMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']> },
      ) => parseResponse(client.suggestions.users[':userId'].hide.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /suggestions/topics
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetSuggestionsTopicsKey() {
  return ['/suggestions/topics'] as const
}

/**
 * GET /suggestions/topics
 *
 * おすすめトピック取得
 */
export function useGetSuggestionsTopics(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSuggestionsTopicsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.suggestions.topics.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /topics/{topicId}/follow
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getPostTopicsTopicIdFollowMutationKey() {
  return ['/topics/:topicId/follow'] as const
}

/**
 * POST /topics/{topicId}/follow
 *
 * トピックをフォロー
 */
export function usePostTopicsTopicIdFollow(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.topics)[':topicId']['follow']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostTopicsTopicIdFollowMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']> },
      ) => parseResponse(client.topics[':topicId'].follow.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /topics/{topicId}/follow
 * Returns Orval-style key [templatePath] - args passed via trigger's { arg }
 */
export function getDeleteTopicsTopicIdFollowMutationKey() {
  return ['/topics/:topicId/follow'] as const
}

/**
 * DELETE /topics/{topicId}/follow
 *
 * トピックのフォロー解除
 */
export function useDeleteTopicsTopicIdFollow(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.topics)[':topicId']['follow']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteTopicsTopicIdFollowMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']> },
      ) => parseResponse(client.topics[':topicId'].follow.$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
