import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/44-sns-notifications-dm-search'

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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetNotificationsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.notifications.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /notifications
 */
export function getGetNotificationsKey(args?: InferRequestType<typeof client.notifications.$get>) {
  return ['/notifications', ...(args ? [args] : [])] as const
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetNotificationsUnreadCountKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.notifications['unread-count'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /notifications/unread-count
 */
export function getGetNotificationsUnreadCountKey() {
  return ['/notifications/unread-count'] as const
}

/**
 * POST /notifications/mark-read
 *
 * 通知を既読にする
 */
export function usePostNotificationsMarkRead(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.notifications)['mark-read']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.notifications)['mark-read']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /notifications/mark-read',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.notifications)['mark-read']['$post']> },
    ) => parseResponse(client.notifications['mark-read'].$post(arg, options?.client)),
    mutationOptions,
  )
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetNotificationsSettingsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.notifications.settings.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /notifications/settings
 */
export function getGetNotificationsSettingsKey() {
  return ['/notifications/settings'] as const
}

/**
 * PUT /notifications/settings
 *
 * 通知設定更新
 */
export function usePutNotificationsSettings(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.notifications.settings.$put>,
    Error,
    string,
    InferRequestType<typeof client.notifications.settings.$put>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PUT /notifications/settings',
    async (
      _: string,
      { arg }: { arg: InferRequestType<typeof client.notifications.settings.$put> },
    ) => parseResponse(client.notifications.settings.$put(arg, options?.client)),
    mutationOptions,
  )
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetDmConversationsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.dm.conversations.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /dm/conversations
 */
export function getGetDmConversationsKey(
  args?: InferRequestType<typeof client.dm.conversations.$get>,
) {
  return ['/dm/conversations', ...(args ? [args] : [])] as const
}

/**
 * POST /dm/conversations
 *
 * 会話作成
 */
export function usePostDmConversations(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.dm.conversations.$post>,
    Error,
    string,
    InferRequestType<typeof client.dm.conversations.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /dm/conversations',
    async (_: string, { arg }: { arg: InferRequestType<typeof client.dm.conversations.$post> }) =>
      parseResponse(client.dm.conversations.$post(arg, options?.client)),
    mutationOptions,
  )
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetDmConversationsConversationIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.dm.conversations[':conversationId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /dm/conversations/{conversationId
 */
export function getGetDmConversationsConversationIdKey(
  args?: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
) {
  return ['/dm/conversations/:conversationId', ...(args ? [args] : [])] as const
}

/**
 * DELETE /dm/conversations/{conversationId}
 *
 * 会話を退出
 */
export function useDeleteDmConversationsConversationId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /dm/conversations/:conversationId',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']> },
    ) => parseResponse(client.dm.conversations[':conversationId'].$delete(arg, options?.client)),
    mutationOptions,
  )
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetDmConversationsConversationIdMessagesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.dm.conversations[':conversationId'].messages.$get(args, clientOptions),
        ),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /dm/conversations/{conversationId/messages
 */
export function getGetDmConversationsConversationIdMessagesKey(
  args?: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
) {
  return ['/dm/conversations/:conversationId/messages', ...(args ? [args] : [])] as const
}

/**
 * POST /dm/conversations/{conversationId}/messages
 *
 * メッセージ送信
 */
export function usePostDmConversationsConversationIdMessages(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /dm/conversations/:conversationId/messages',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.dm.conversations)[':conversationId']['messages']['$post']
        >
      },
    ) =>
      parseResponse(
        client.dm.conversations[':conversationId'].messages.$post(arg, options?.client),
      ),
    mutationOptions,
  )
}

/**
 * POST /dm/conversations/{conversationId}/read
 *
 * 会話を既読にする
 */
export function usePostDmConversationsConversationIdRead(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /dm/conversations/:conversationId/read',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
      },
    ) => parseResponse(client.dm.conversations[':conversationId'].read.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /dm/conversations/{conversationId}/typing
 *
 * 入力中インジケーター送信
 */
export function usePostDmConversationsConversationIdTyping(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /dm/conversations/:conversationId/typing',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<
          (typeof client.dm.conversations)[':conversationId']['typing']['$post']
        >
      },
    ) =>
      parseResponse(client.dm.conversations[':conversationId'].typing.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /dm/messages/{messageId}
 *
 * メッセージ削除
 */
export function useDeleteDmMessagesMessageId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.dm.messages)[':messageId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /dm/messages/:messageId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']> },
    ) => parseResponse(client.dm.messages[':messageId'].$delete(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * POST /dm/messages/{messageId}/reactions
 *
 * メッセージにリアクション追加
 */
export function usePostDmMessagesMessageIdReactions(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /dm/messages/:messageId/reactions',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']> },
    ) => parseResponse(client.dm.messages[':messageId'].reactions.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /dm/messages/{messageId}/reactions
 *
 * メッセージのリアクション削除
 */
export function useDeleteDmMessagesMessageIdReactions(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /dm/messages/:messageId/reactions',
    async (
      _: string,
      {
        arg,
      }: {
        arg: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
      },
    ) => parseResponse(client.dm.messages[':messageId'].reactions.$delete(arg, options?.client)),
    mutationOptions,
  )
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetDmUnreadCountKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.dm['unread-count'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /dm/unread-count
 */
export function getGetDmUnreadCountKey() {
  return ['/dm/unread-count'] as const
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSearchPostsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.search.posts.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /search/posts
 */
export function getGetSearchPostsKey(args?: InferRequestType<typeof client.search.posts.$get>) {
  return ['/search/posts', ...(args ? [args] : [])] as const
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSearchUsersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.search.users.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /search/users
 */
export function getGetSearchUsersKey(args?: InferRequestType<typeof client.search.users.$get>) {
  return ['/search/users', ...(args ? [args] : [])] as const
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSearchHashtagsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.search.hashtags.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /search/hashtags
 */
export function getGetSearchHashtagsKey(
  args?: InferRequestType<typeof client.search.hashtags.$get>,
) {
  return ['/search/hashtags', ...(args ? [args] : [])] as const
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSearchRecentKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.search.recent.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /search/recent
 */
export function getGetSearchRecentKey() {
  return ['/search/recent'] as const
}

/**
 * DELETE /search/recent
 *
 * 検索履歴クリア
 */
export function useDeleteSearchRecent(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<typeof client.search.recent.$delete> | undefined,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /search/recent',
    async () => parseResponse(client.search.recent.$delete(undefined, options?.client)),
    mutationOptions,
  )
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTrendsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.trends.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /trends
 */
export function getGetTrendsKey(args?: InferRequestType<typeof client.trends.$get>) {
  return ['/trends', ...(args ? [args] : [])] as const
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTrendsLocationsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.trends.locations.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /trends/locations
 */
export function getGetTrendsLocationsKey() {
  return ['/trends/locations'] as const
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSuggestionsUsersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.suggestions.users.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /suggestions/users
 */
export function getGetSuggestionsUsersKey(
  args?: InferRequestType<typeof client.suggestions.users.$get>,
) {
  return ['/suggestions/users', ...(args ? [args] : [])] as const
}

/**
 * POST /suggestions/users/{userId}/hide
 *
 * おすすめユーザーを非表示
 */
export function usePostSuggestionsUsersUserIdHide(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.suggestions.users)[':userId']['hide']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /suggestions/users/:userId/hide',
    async (
      _: string,
      {
        arg,
      }: { arg: InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']> },
    ) => parseResponse(client.suggestions.users[':userId'].hide.$post(arg, options?.client)),
    mutationOptions,
  )
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSuggestionsTopicsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.suggestions.topics.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /suggestions/topics
 */
export function getGetSuggestionsTopicsKey() {
  return ['/suggestions/topics'] as const
}

/**
 * POST /topics/{topicId}/follow
 *
 * トピックをフォロー
 */
export function usePostTopicsTopicIdFollow(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.topics)[':topicId']['follow']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /topics/:topicId/follow',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']> },
    ) => parseResponse(client.topics[':topicId'].follow.$post(arg, options?.client)),
    mutationOptions,
  )
}

/**
 * DELETE /topics/{topicId}/follow
 *
 * トピックのフォロー解除
 */
export function useDeleteTopicsTopicIdFollow(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client.topics)[':topicId']['follow']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /topics/:topicId/follow',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']> },
    ) => parseResponse(client.topics[':topicId'].follow.$delete(arg, options?.client)),
    mutationOptions,
  )
}
