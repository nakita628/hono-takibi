import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
 * Uses $url() for type-safe key generation
 */
export function getGetNotificationsKey(args: InferRequestType<typeof client.notifications.$get>) {
  return client.notifications.$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetNotificationsUnreadCountKey() {
  return client.notifications['unread-count'].$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostNotificationsMarkReadMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.notifications)['mark-read']['$post']> },
      ) => parseResponse(client.notifications['mark-read'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /notifications/mark-read
 * Uses $url() for type-safe key generation
 */
export function getPostNotificationsMarkReadMutationKey() {
  return `POST ${client.notifications['mark-read'].$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetNotificationsSettingsKey() {
  return client.notifications.settings.$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPutNotificationsSettingsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.notifications.settings.$put> },
      ) => parseResponse(client.notifications.settings.$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /notifications/settings
 * Uses $url() for type-safe key generation
 */
export function getPutNotificationsSettingsMutationKey() {
  return `PUT ${client.notifications.settings.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetDmConversationsKey(
  args: InferRequestType<typeof client.dm.conversations.$get>,
) {
  return client.dm.conversations.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostDmConversationsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.dm.conversations.$post> }) =>
        parseResponse(client.dm.conversations.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /dm/conversations
 * Uses $url() for type-safe key generation
 */
export function getPostDmConversationsMutationKey() {
  return `POST ${client.dm.conversations.$url().pathname}`
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
 * Generates SWR cache key for GET /dm/conversations/{conversationId}
 * Uses $url() for type-safe key generation
 */
export function getGetDmConversationsConversationIdKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
) {
  return client.dm.conversations[':conversationId'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteDmConversationsConversationIdMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /dm/conversations/{conversationId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteDmConversationsConversationIdMutationKey() {
  return `DELETE ${client.dm.conversations[':conversationId'].$url().pathname}`
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
 * Generates SWR cache key for GET /dm/conversations/{conversationId}/messages
 * Uses $url() for type-safe key generation
 */
export function getGetDmConversationsConversationIdMessagesKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
) {
  return client.dm.conversations[':conversationId'].messages.$url(args).pathname
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
  const swrKey =
    mutationOptions?.swrKey ?? getPostDmConversationsConversationIdMessagesMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /dm/conversations/{conversationId}/messages
 * Uses $url() for type-safe key generation
 */
export function getPostDmConversationsConversationIdMessagesMutationKey() {
  return `POST ${client.dm.conversations[':conversationId'].messages.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostDmConversationsConversationIdReadMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /dm/conversations/{conversationId}/read
 * Uses $url() for type-safe key generation
 */
export function getPostDmConversationsConversationIdReadMutationKey() {
  return `POST ${client.dm.conversations[':conversationId'].read.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostDmConversationsConversationIdTypingMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /dm/conversations/{conversationId}/typing
 * Uses $url() for type-safe key generation
 */
export function getPostDmConversationsConversationIdTypingMutationKey() {
  return `POST ${client.dm.conversations[':conversationId'].typing.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteDmMessagesMessageIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']> },
      ) => parseResponse(client.dm.messages[':messageId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /dm/messages/{messageId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteDmMessagesMessageIdMutationKey() {
  return `DELETE ${client.dm.messages[':messageId'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostDmMessagesMessageIdReactionsMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /dm/messages/{messageId}/reactions
 * Uses $url() for type-safe key generation
 */
export function getPostDmMessagesMessageIdReactionsMutationKey() {
  return `POST ${client.dm.messages[':messageId'].reactions.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteDmMessagesMessageIdReactionsMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /dm/messages/{messageId}/reactions
 * Uses $url() for type-safe key generation
 */
export function getDeleteDmMessagesMessageIdReactionsMutationKey() {
  return `DELETE ${client.dm.messages[':messageId'].reactions.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetDmUnreadCountKey() {
  return client.dm['unread-count'].$url().pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetSearchPostsKey(args: InferRequestType<typeof client.search.posts.$get>) {
  return client.search.posts.$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetSearchUsersKey(args: InferRequestType<typeof client.search.users.$get>) {
  return client.search.users.$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetSearchHashtagsKey(
  args: InferRequestType<typeof client.search.hashtags.$get>,
) {
  return client.search.hashtags.$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetSearchRecentKey() {
  return client.search.recent.$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteSearchRecentMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.search.recent.$delete(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /search/recent
 * Uses $url() for type-safe key generation
 */
export function getDeleteSearchRecentMutationKey() {
  return `DELETE ${client.search.recent.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetTrendsKey(args: InferRequestType<typeof client.trends.$get>) {
  return client.trends.$url(args).pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetTrendsLocationsKey() {
  return client.trends.locations.$url().pathname
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
 * Uses $url() for type-safe key generation
 */
export function getGetSuggestionsUsersKey(
  args: InferRequestType<typeof client.suggestions.users.$get>,
) {
  return client.suggestions.users.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostSuggestionsUsersUserIdHideMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /suggestions/users/{userId}/hide
 * Uses $url() for type-safe key generation
 */
export function getPostSuggestionsUsersUserIdHideMutationKey() {
  return `POST ${client.suggestions.users[':userId'].hide.$url().pathname}`
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
 * Uses $url() for type-safe key generation
 */
export function getGetSuggestionsTopicsKey() {
  return client.suggestions.topics.$url().pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostTopicsTopicIdFollowMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']> },
      ) => parseResponse(client.topics[':topicId'].follow.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /topics/{topicId}/follow
 * Uses $url() for type-safe key generation
 */
export function getPostTopicsTopicIdFollowMutationKey() {
  return `POST ${client.topics[':topicId'].follow.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteTopicsTopicIdFollowMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']> },
      ) => parseResponse(client.topics[':topicId'].follow.$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /topics/{topicId}/follow
 * Uses $url() for type-safe key generation
 */
export function getDeleteTopicsTopicIdFollowMutationKey() {
  return `DELETE ${client.topics[':topicId'].follow.$url().pathname}`
}
