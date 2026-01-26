import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/44-sns-notifications-dm-search'

/**
 * GET /notifications
 *
 * 通知一覧取得
 */
export function createGetNotifications(
  args: InferRequestType<typeof client.notifications.$get>,
  options?: {
    query?: {
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
  return createQuery({ ...getGetNotificationsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /notifications
 */
export function getGetNotificationsQueryKey(
  args: InferRequestType<typeof client.notifications.$get>,
) {
  return ['/notifications', args] as const
}

/**
 * Returns Svelte Query query options for GET /notifications
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNotificationsQueryOptions = (
  args: InferRequestType<typeof client.notifications.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetNotificationsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.notifications.$get(args, {
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
export function createGetNotificationsUnreadCount(options?: {
  query?: {
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
    ...getGetNotificationsUnreadCountQueryOptions(clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /notifications/unread-count
 */
export function getGetNotificationsUnreadCountQueryKey() {
  return ['/notifications/unread-count'] as const
}

/**
 * Returns Svelte Query query options for GET /notifications/unread-count
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNotificationsUnreadCountQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetNotificationsUnreadCountQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.notifications['unread-count'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /notifications/mark-read
 *
 * 通知を既読にする
 */
export function createPostNotificationsMarkRead(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.notifications)['mark-read']['$post']>,
      variables: InferRequestType<(typeof client.notifications)['mark-read']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.notifications)['mark-read']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.notifications)['mark-read']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.notifications)['mark-read']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.notifications)['mark-read']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.notifications)['mark-read']['$post']>,
    ) => parseResponse(client.notifications['mark-read'].$post(args, clientOptions)),
  })
}

/**
 * GET /notifications/settings
 *
 * 通知設定取得
 */
export function createGetNotificationsSettings(options?: {
  query?: {
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
  return createQuery({ ...getGetNotificationsSettingsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /notifications/settings
 */
export function getGetNotificationsSettingsQueryKey() {
  return ['/notifications/settings'] as const
}

/**
 * Returns Svelte Query query options for GET /notifications/settings
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNotificationsSettingsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetNotificationsSettingsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.notifications.settings.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /notifications/settings
 *
 * 通知設定更新
 */
export function createPutNotificationsSettings(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.notifications.settings.$put>,
      variables: InferRequestType<typeof client.notifications.settings.$put>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.notifications.settings.$put>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.notifications.settings.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.notifications.settings.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.notifications.settings.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.notifications.settings.$put>) =>
      parseResponse(client.notifications.settings.$put(args, clientOptions)),
  })
}

/**
 * GET /dm/conversations
 *
 * 会話一覧取得
 */
export function createGetDmConversations(
  args: InferRequestType<typeof client.dm.conversations.$get>,
  options?: {
    query?: {
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
  return createQuery({ ...getGetDmConversationsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /dm/conversations
 */
export function getGetDmConversationsQueryKey(
  args: InferRequestType<typeof client.dm.conversations.$get>,
) {
  return ['/dm/conversations', args] as const
}

/**
 * Returns Svelte Query query options for GET /dm/conversations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmConversationsQueryOptions = (
  args: InferRequestType<typeof client.dm.conversations.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetDmConversationsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.dm.conversations.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /dm/conversations
 *
 * 会話作成
 */
export function createPostDmConversations(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.dm.conversations.$post>,
      variables: InferRequestType<typeof client.dm.conversations.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.dm.conversations.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.dm.conversations.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.dm.conversations.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.dm.conversations.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.dm.conversations.$post>) =>
      parseResponse(client.dm.conversations.$post(args, clientOptions)),
  })
}

/**
 * GET /dm/conversations/{conversationId}
 *
 * 会話詳細取得
 */
export function createGetDmConversationsConversationId(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
  options?: {
    query?: {
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
    ...getGetDmConversationsConversationIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /dm/conversations/{conversationId}
 */
export function getGetDmConversationsConversationIdQueryKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
) {
  return ['/dm/conversations/:conversationId', args] as const
}

/**
 * Returns Svelte Query query options for GET /dm/conversations/{conversationId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmConversationsConversationIdQueryOptions = (
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetDmConversationsConversationIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.dm.conversations[':conversationId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /dm/conversations/{conversationId}
 *
 * 会話を退出
 */
export function createDeleteDmConversationsConversationId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.dm.conversations)[':conversationId']['$delete']>
        | undefined,
      variables: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.dm.conversations)[':conversationId']['$delete']>
        | undefined
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>,
    ) => parseResponse(client.dm.conversations[':conversationId'].$delete(args, clientOptions)),
  })
}

/**
 * GET /dm/conversations/{conversationId}/messages
 *
 * メッセージ一覧取得
 */
export function createGetDmConversationsConversationIdMessages(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
  options?: {
    query?: {
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
    ...getGetDmConversationsConversationIdMessagesQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /dm/conversations/{conversationId}/messages
 */
export function getGetDmConversationsConversationIdMessagesQueryKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
) {
  return ['/dm/conversations/:conversationId/messages', args] as const
}

/**
 * Returns Svelte Query query options for GET /dm/conversations/{conversationId}/messages
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmConversationsConversationIdMessagesQueryOptions = (
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetDmConversationsConversationIdMessagesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.dm.conversations[':conversationId'].messages.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /dm/conversations/{conversationId}/messages
 *
 * メッセージ送信
 */
export function createPostDmConversationsConversationIdMessages(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.dm.conversations)[':conversationId']['messages']['$post']
      >,
      variables: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['messages']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['messages']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.dm.conversations)[':conversationId']['messages']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['messages']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['messages']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['messages']['$post']
      >,
    ) =>
      parseResponse(client.dm.conversations[':conversationId'].messages.$post(args, clientOptions)),
  })
}

/**
 * POST /dm/conversations/{conversationId}/read
 *
 * 会話を既読にする
 */
export function createPostDmConversationsConversationIdRead(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>,
      variables: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['read']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['read']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['read']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['read']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>,
    ) => parseResponse(client.dm.conversations[':conversationId'].read.$post(args, clientOptions)),
  })
}

/**
 * POST /dm/conversations/{conversationId}/typing
 *
 * 入力中インジケーター送信
 */
export function createPostDmConversationsConversationIdTyping(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.dm.conversations)[':conversationId']['typing']['$post']
      >,
      variables: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['typing']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['typing']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.dm.conversations)[':conversationId']['typing']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['typing']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['typing']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['typing']['$post']
      >,
    ) =>
      parseResponse(client.dm.conversations[':conversationId'].typing.$post(args, clientOptions)),
  })
}

/**
 * DELETE /dm/messages/{messageId}
 *
 * メッセージ削除
 */
export function createDeleteDmMessagesMessageId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.dm.messages)[':messageId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.dm.messages)[':messageId']['$delete']>
        | undefined
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>,
    ) => parseResponse(client.dm.messages[':messageId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /dm/messages/{messageId}/reactions
 *
 * メッセージにリアクション追加
 */
export function createPostDmMessagesMessageIdReactions(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>,
      variables: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>,
    ) => parseResponse(client.dm.messages[':messageId'].reactions.$post(args, clientOptions)),
  })
}

/**
 * DELETE /dm/messages/{messageId}/reactions
 *
 * メッセージのリアクション削除
 */
export function createDeleteDmMessagesMessageIdReactions(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>,
      variables: InferRequestType<
        (typeof client.dm.messages)[':messageId']['reactions']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.dm.messages)[':messageId']['reactions']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.dm.messages)[':messageId']['reactions']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.dm.messages)[':messageId']['reactions']['$delete']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>,
    ) => parseResponse(client.dm.messages[':messageId'].reactions.$delete(args, clientOptions)),
  })
}

/**
 * GET /dm/unread-count
 *
 * 未読メッセージ数取得
 */
export function createGetDmUnreadCount(options?: {
  query?: {
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
  return createQuery({ ...getGetDmUnreadCountQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /dm/unread-count
 */
export function getGetDmUnreadCountQueryKey() {
  return ['/dm/unread-count'] as const
}

/**
 * Returns Svelte Query query options for GET /dm/unread-count
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetDmUnreadCountQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetDmUnreadCountQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.dm['unread-count'].$get(undefined, {
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
  options?: {
    query?: {
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
  return createQuery({ ...getGetSearchPostsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /search/posts
 */
export function getGetSearchPostsQueryKey(args: InferRequestType<typeof client.search.posts.$get>) {
  return ['/search/posts', args] as const
}

/**
 * Returns Svelte Query query options for GET /search/posts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchPostsQueryOptions = (
  args: InferRequestType<typeof client.search.posts.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSearchPostsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.search.posts.$get(args, {
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
  options?: {
    query?: {
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
  return createQuery({ ...getGetSearchUsersQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /search/users
 */
export function getGetSearchUsersQueryKey(args: InferRequestType<typeof client.search.users.$get>) {
  return ['/search/users', args] as const
}

/**
 * Returns Svelte Query query options for GET /search/users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchUsersQueryOptions = (
  args: InferRequestType<typeof client.search.users.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSearchUsersQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.search.users.$get(args, {
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
  options?: {
    query?: {
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
  return createQuery({ ...getGetSearchHashtagsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /search/hashtags
 */
export function getGetSearchHashtagsQueryKey(
  args: InferRequestType<typeof client.search.hashtags.$get>,
) {
  return ['/search/hashtags', args] as const
}

/**
 * Returns Svelte Query query options for GET /search/hashtags
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchHashtagsQueryOptions = (
  args: InferRequestType<typeof client.search.hashtags.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSearchHashtagsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.search.hashtags.$get(args, {
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
export function createGetSearchRecent(options?: {
  query?: {
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
  return createQuery({ ...getGetSearchRecentQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /search/recent
 */
export function getGetSearchRecentQueryKey() {
  return ['/search/recent'] as const
}

/**
 * Returns Svelte Query query options for GET /search/recent
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchRecentQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSearchRecentQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.search.recent.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /search/recent
 *
 * 検索履歴クリア
 */
export function createDeleteSearchRecent(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.search.recent.$delete> | undefined,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<typeof client.search.recent.$delete> | undefined | undefined,
      error: Error | null,
      variables: undefined,
    ) => void
    onMutate?: (variables: undefined) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client.search.recent.$delete(undefined, clientOptions)),
  })
}

/**
 * GET /trends
 *
 * トレンド取得
 */
export function createGetTrends(
  args: InferRequestType<typeof client.trends.$get>,
  options?: {
    query?: {
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
  return createQuery({ ...getGetTrendsQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /trends
 */
export function getGetTrendsQueryKey(args: InferRequestType<typeof client.trends.$get>) {
  return ['/trends', args] as const
}

/**
 * Returns Svelte Query query options for GET /trends
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTrendsQueryOptions = (
  args: InferRequestType<typeof client.trends.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTrendsQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.trends.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /trends/locations
 *
 * トレンド対応地域一覧
 */
export function createGetTrendsLocations(options?: {
  query?: {
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
  return createQuery({ ...getGetTrendsLocationsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /trends/locations
 */
export function getGetTrendsLocationsQueryKey() {
  return ['/trends/locations'] as const
}

/**
 * Returns Svelte Query query options for GET /trends/locations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTrendsLocationsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetTrendsLocationsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.trends.locations.$get(undefined, {
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
  options?: {
    query?: {
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
    ...getGetSuggestionsUsersQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /suggestions/users
 */
export function getGetSuggestionsUsersQueryKey(
  args: InferRequestType<typeof client.suggestions.users.$get>,
) {
  return ['/suggestions/users', args] as const
}

/**
 * Returns Svelte Query query options for GET /suggestions/users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSuggestionsUsersQueryOptions = (
  args: InferRequestType<typeof client.suggestions.users.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetSuggestionsUsersQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.suggestions.users.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /suggestions/users/{userId}/hide
 *
 * おすすめユーザーを非表示
 */
export function createPostSuggestionsUsersUserIdHide(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.suggestions.users)[':userId']['hide']['$post']>,
      variables: InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.suggestions.users)[':userId']['hide']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>,
    ) => parseResponse(client.suggestions.users[':userId'].hide.$post(args, clientOptions)),
  })
}

/**
 * GET /suggestions/topics
 *
 * おすすめトピック取得
 */
export function createGetSuggestionsTopics(options?: {
  query?: {
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
  return createQuery({ ...getGetSuggestionsTopicsQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /suggestions/topics
 */
export function getGetSuggestionsTopicsQueryKey() {
  return ['/suggestions/topics'] as const
}

/**
 * Returns Svelte Query query options for GET /suggestions/topics
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSuggestionsTopicsQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetSuggestionsTopicsQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.suggestions.topics.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /topics/{topicId}/follow
 *
 * トピックをフォロー
 */
export function createPostTopicsTopicIdFollow(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.topics)[':topicId']['follow']['$post']>,
      variables: InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.topics)[':topicId']['follow']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>,
    ) => parseResponse(client.topics[':topicId'].follow.$post(args, clientOptions)),
  })
}

/**
 * DELETE /topics/{topicId}/follow
 *
 * トピックのフォロー解除
 */
export function createDeleteTopicsTopicIdFollow(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.topics)[':topicId']['follow']['$delete']>,
      variables: InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.topics)[':topicId']['follow']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>,
    ) => parseResponse(client.topics[':topicId'].follow.$delete(args, clientOptions)),
  })
}
