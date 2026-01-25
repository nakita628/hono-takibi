import { useQuery, useMutation } from '@tanstack/vue-query'
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
    query?: {
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
        | InferResponseType<typeof client.notifications.$get>
        | (() => InferResponseType<typeof client.notifications.$get>)
      initialData?:
        | InferResponseType<typeof client.notifications.$get>
        | (() => InferResponseType<typeof client.notifications.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetNotificationsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.notifications.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /notifications
 */
export function getGetNotificationsQueryKey(
  args: InferRequestType<typeof client.notifications.$get>,
) {
  return ['/notifications', args] as const
}

/**
 * Returns Vue Query query options for GET /notifications
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNotificationsQueryOptions(
  args: InferRequestType<typeof client.notifications.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetNotificationsQueryKey(args),
    queryFn: async () => parseResponse(client.notifications.$get(args, clientOptions)),
  }
}

/**
 * GET /notifications/unread-count
 *
 * 未読通知数取得
 */
export function useGetNotificationsUnreadCount(options?: {
  query?: {
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
      | InferResponseType<(typeof client.notifications)['unread-count']['$get']>
      | (() => InferResponseType<(typeof client.notifications)['unread-count']['$get']>)
    initialData?:
      | InferResponseType<(typeof client.notifications)['unread-count']['$get']>
      | (() => InferResponseType<(typeof client.notifications)['unread-count']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetNotificationsUnreadCountQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.notifications['unread-count'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /notifications/unread-count
 */
export function getGetNotificationsUnreadCountQueryKey() {
  return ['/notifications/unread-count'] as const
}

/**
 * Returns Vue Query query options for GET /notifications/unread-count
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNotificationsUnreadCountQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetNotificationsUnreadCountQueryKey(),
    queryFn: async () =>
      parseResponse(client.notifications['unread-count'].$get(undefined, clientOptions)),
  }
}

/**
 * POST /notifications/mark-read
 *
 * 通知を既読にする
 */
export function usePostNotificationsMarkRead(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.notifications)['mark-read']['$post']>,
    ) => parseResponse(client.notifications['mark-read'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /notifications/settings
 *
 * 通知設定取得
 */
export function useGetNotificationsSettings(options?: {
  query?: {
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
      | InferResponseType<typeof client.notifications.settings.$get>
      | (() => InferResponseType<typeof client.notifications.settings.$get>)
    initialData?:
      | InferResponseType<typeof client.notifications.settings.$get>
      | (() => InferResponseType<typeof client.notifications.settings.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetNotificationsSettingsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.notifications.settings.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /notifications/settings
 */
export function getGetNotificationsSettingsQueryKey() {
  return ['/notifications/settings'] as const
}

/**
 * Returns Vue Query query options for GET /notifications/settings
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetNotificationsSettingsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetNotificationsSettingsQueryKey(),
    queryFn: async () =>
      parseResponse(client.notifications.settings.$get(undefined, clientOptions)),
  }
}

/**
 * PUT /notifications/settings
 *
 * 通知設定更新
 */
export function usePutNotificationsSettings(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.notifications.settings.$put>) =>
      parseResponse(client.notifications.settings.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /dm/conversations
 *
 * 会話一覧取得
 */
export function useGetDmConversations(
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
      placeholderData?:
        | InferResponseType<typeof client.dm.conversations.$get>
        | (() => InferResponseType<typeof client.dm.conversations.$get>)
      initialData?:
        | InferResponseType<typeof client.dm.conversations.$get>
        | (() => InferResponseType<typeof client.dm.conversations.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetDmConversationsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.dm.conversations.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /dm/conversations
 */
export function getGetDmConversationsQueryKey(
  args: InferRequestType<typeof client.dm.conversations.$get>,
) {
  return ['/dm/conversations', args] as const
}

/**
 * Returns Vue Query query options for GET /dm/conversations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetDmConversationsQueryOptions(
  args: InferRequestType<typeof client.dm.conversations.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetDmConversationsQueryKey(args),
    queryFn: async () => parseResponse(client.dm.conversations.$get(args, clientOptions)),
  }
}

/**
 * POST /dm/conversations
 *
 * 会話作成
 */
export function usePostDmConversations(options?: {
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
  return useMutation({
    mutationFn: async (args: InferRequestType<typeof client.dm.conversations.$post>) =>
      parseResponse(client.dm.conversations.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /dm/conversations/{conversationId}
 *
 * 会話詳細取得
 */
export function useGetDmConversationsConversationId(
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
      placeholderData?:
        | InferResponseType<(typeof client.dm.conversations)[':conversationId']['$get']>
        | (() => InferResponseType<(typeof client.dm.conversations)[':conversationId']['$get']>)
      initialData?:
        | InferResponseType<(typeof client.dm.conversations)[':conversationId']['$get']>
        | (() => InferResponseType<(typeof client.dm.conversations)[':conversationId']['$get']>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetDmConversationsConversationIdQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.dm.conversations[':conversationId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /dm/conversations/{conversationId}
 */
export function getGetDmConversationsConversationIdQueryKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
) {
  return ['/dm/conversations/:conversationId', args] as const
}

/**
 * Returns Vue Query query options for GET /dm/conversations/{conversationId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetDmConversationsConversationIdQueryOptions(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetDmConversationsConversationIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.dm.conversations[':conversationId'].$get(args, clientOptions)),
  }
}

/**
 * DELETE /dm/conversations/{conversationId}
 *
 * 会話を退出
 */
export function useDeleteDmConversationsConversationId(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['$delete']>,
    ) => parseResponse(client.dm.conversations[':conversationId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /dm/conversations/{conversationId}/messages
 *
 * メッセージ一覧取得
 */
export function useGetDmConversationsConversationIdMessages(
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
      placeholderData?:
        | InferResponseType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>
        | (() => InferResponseType<
            (typeof client.dm.conversations)[':conversationId']['messages']['$get']
          >)
      initialData?:
        | InferResponseType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>
        | (() => InferResponseType<
            (typeof client.dm.conversations)[':conversationId']['messages']['$get']
          >)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetDmConversationsConversationIdMessagesQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.dm.conversations[':conversationId'].messages.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /dm/conversations/{conversationId}/messages
 */
export function getGetDmConversationsConversationIdMessagesQueryKey(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
) {
  return ['/dm/conversations/:conversationId/messages', args] as const
}

/**
 * Returns Vue Query query options for GET /dm/conversations/{conversationId}/messages
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetDmConversationsConversationIdMessagesQueryOptions(
  args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['messages']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetDmConversationsConversationIdMessagesQueryKey(args),
    queryFn: async () =>
      parseResponse(client.dm.conversations[':conversationId'].messages.$get(args, clientOptions)),
  }
}

/**
 * POST /dm/conversations/{conversationId}/messages
 *
 * メッセージ送信
 */
export function usePostDmConversationsConversationIdMessages(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['messages']['$post']
      >,
    ) =>
      parseResponse(client.dm.conversations[':conversationId'].messages.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /dm/conversations/{conversationId}/read
 *
 * 会話を既読にする
 */
export function usePostDmConversationsConversationIdRead(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.dm.conversations)[':conversationId']['read']['$post']>,
    ) => parseResponse(client.dm.conversations[':conversationId'].read.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /dm/conversations/{conversationId}/typing
 *
 * 入力中インジケーター送信
 */
export function usePostDmConversationsConversationIdTyping(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<
        (typeof client.dm.conversations)[':conversationId']['typing']['$post']
      >,
    ) =>
      parseResponse(client.dm.conversations[':conversationId'].typing.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /dm/messages/{messageId}
 *
 * メッセージ削除
 */
export function useDeleteDmMessagesMessageId(options?: {
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
      data: InferResponseType<(typeof client.dm.messages)[':messageId']['$delete']> | undefined,
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.dm.messages)[':messageId']['$delete']>,
    ) => parseResponse(client.dm.messages[':messageId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /dm/messages/{messageId}/reactions
 *
 * メッセージにリアクション追加
 */
export function usePostDmMessagesMessageIdReactions(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$post']>,
    ) => parseResponse(client.dm.messages[':messageId'].reactions.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /dm/messages/{messageId}/reactions
 *
 * メッセージのリアクション削除
 */
export function useDeleteDmMessagesMessageIdReactions(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.dm.messages)[':messageId']['reactions']['$delete']>,
    ) => parseResponse(client.dm.messages[':messageId'].reactions.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /dm/unread-count
 *
 * 未読メッセージ数取得
 */
export function useGetDmUnreadCount(options?: {
  query?: {
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
      | InferResponseType<(typeof client.dm)['unread-count']['$get']>
      | (() => InferResponseType<(typeof client.dm)['unread-count']['$get']>)
    initialData?:
      | InferResponseType<(typeof client.dm)['unread-count']['$get']>
      | (() => InferResponseType<(typeof client.dm)['unread-count']['$get']>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetDmUnreadCountQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.dm['unread-count'].$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /dm/unread-count
 */
export function getGetDmUnreadCountQueryKey() {
  return ['/dm/unread-count'] as const
}

/**
 * Returns Vue Query query options for GET /dm/unread-count
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetDmUnreadCountQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetDmUnreadCountQueryKey(),
    queryFn: async () => parseResponse(client.dm['unread-count'].$get(undefined, clientOptions)),
  }
}

/**
 * GET /search/posts
 *
 * 投稿検索
 */
export function useGetSearchPosts(
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
      placeholderData?:
        | InferResponseType<typeof client.search.posts.$get>
        | (() => InferResponseType<typeof client.search.posts.$get>)
      initialData?:
        | InferResponseType<typeof client.search.posts.$get>
        | (() => InferResponseType<typeof client.search.posts.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSearchPostsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.search.posts.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /search/posts
 */
export function getGetSearchPostsQueryKey(args: InferRequestType<typeof client.search.posts.$get>) {
  return ['/search/posts', args] as const
}

/**
 * Returns Vue Query query options for GET /search/posts
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSearchPostsQueryOptions(
  args: InferRequestType<typeof client.search.posts.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetSearchPostsQueryKey(args),
    queryFn: async () => parseResponse(client.search.posts.$get(args, clientOptions)),
  }
}

/**
 * GET /search/users
 *
 * ユーザー検索
 */
export function useGetSearchUsers(
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
      placeholderData?:
        | InferResponseType<typeof client.search.users.$get>
        | (() => InferResponseType<typeof client.search.users.$get>)
      initialData?:
        | InferResponseType<typeof client.search.users.$get>
        | (() => InferResponseType<typeof client.search.users.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSearchUsersQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.search.users.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /search/users
 */
export function getGetSearchUsersQueryKey(args: InferRequestType<typeof client.search.users.$get>) {
  return ['/search/users', args] as const
}

/**
 * Returns Vue Query query options for GET /search/users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSearchUsersQueryOptions(
  args: InferRequestType<typeof client.search.users.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetSearchUsersQueryKey(args),
    queryFn: async () => parseResponse(client.search.users.$get(args, clientOptions)),
  }
}

/**
 * GET /search/hashtags
 *
 * ハッシュタグ検索
 */
export function useGetSearchHashtags(
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
      placeholderData?:
        | InferResponseType<typeof client.search.hashtags.$get>
        | (() => InferResponseType<typeof client.search.hashtags.$get>)
      initialData?:
        | InferResponseType<typeof client.search.hashtags.$get>
        | (() => InferResponseType<typeof client.search.hashtags.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSearchHashtagsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.search.hashtags.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /search/hashtags
 */
export function getGetSearchHashtagsQueryKey(
  args: InferRequestType<typeof client.search.hashtags.$get>,
) {
  return ['/search/hashtags', args] as const
}

/**
 * Returns Vue Query query options for GET /search/hashtags
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSearchHashtagsQueryOptions(
  args: InferRequestType<typeof client.search.hashtags.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetSearchHashtagsQueryKey(args),
    queryFn: async () => parseResponse(client.search.hashtags.$get(args, clientOptions)),
  }
}

/**
 * GET /search/recent
 *
 * 最近の検索履歴
 */
export function useGetSearchRecent(options?: {
  query?: {
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
      | InferResponseType<typeof client.search.recent.$get>
      | (() => InferResponseType<typeof client.search.recent.$get>)
    initialData?:
      | InferResponseType<typeof client.search.recent.$get>
      | (() => InferResponseType<typeof client.search.recent.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSearchRecentQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.search.recent.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /search/recent
 */
export function getGetSearchRecentQueryKey() {
  return ['/search/recent'] as const
}

/**
 * Returns Vue Query query options for GET /search/recent
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSearchRecentQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetSearchRecentQueryKey(),
    queryFn: async () => parseResponse(client.search.recent.$get(undefined, clientOptions)),
  }
}

/**
 * DELETE /search/recent
 *
 * 検索履歴クリア
 */
export function useDeleteSearchRecent(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.search.recent.$delete> | undefined,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<typeof client.search.recent.$delete> | undefined,
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
  return useMutation({
    mutationFn: async () => parseResponse(client.search.recent.$delete(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /trends
 *
 * トレンド取得
 */
export function useGetTrends(
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
      placeholderData?:
        | InferResponseType<typeof client.trends.$get>
        | (() => InferResponseType<typeof client.trends.$get>)
      initialData?:
        | InferResponseType<typeof client.trends.$get>
        | (() => InferResponseType<typeof client.trends.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetTrendsQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.trends.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /trends
 */
export function getGetTrendsQueryKey(args: InferRequestType<typeof client.trends.$get>) {
  return ['/trends', args] as const
}

/**
 * Returns Vue Query query options for GET /trends
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetTrendsQueryOptions(
  args: InferRequestType<typeof client.trends.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetTrendsQueryKey(args),
    queryFn: async () => parseResponse(client.trends.$get(args, clientOptions)),
  }
}

/**
 * GET /trends/locations
 *
 * トレンド対応地域一覧
 */
export function useGetTrendsLocations(options?: {
  query?: {
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
      | InferResponseType<typeof client.trends.locations.$get>
      | (() => InferResponseType<typeof client.trends.locations.$get>)
    initialData?:
      | InferResponseType<typeof client.trends.locations.$get>
      | (() => InferResponseType<typeof client.trends.locations.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetTrendsLocationsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.trends.locations.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /trends/locations
 */
export function getGetTrendsLocationsQueryKey() {
  return ['/trends/locations'] as const
}

/**
 * Returns Vue Query query options for GET /trends/locations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetTrendsLocationsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetTrendsLocationsQueryKey(),
    queryFn: async () => parseResponse(client.trends.locations.$get(undefined, clientOptions)),
  }
}

/**
 * GET /suggestions/users
 *
 * おすすめユーザー取得
 */
export function useGetSuggestionsUsers(
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
      placeholderData?:
        | InferResponseType<typeof client.suggestions.users.$get>
        | (() => InferResponseType<typeof client.suggestions.users.$get>)
      initialData?:
        | InferResponseType<typeof client.suggestions.users.$get>
        | (() => InferResponseType<typeof client.suggestions.users.$get>)
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSuggestionsUsersQueryKey(args),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.suggestions.users.$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /suggestions/users
 */
export function getGetSuggestionsUsersQueryKey(
  args: InferRequestType<typeof client.suggestions.users.$get>,
) {
  return ['/suggestions/users', args] as const
}

/**
 * Returns Vue Query query options for GET /suggestions/users
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSuggestionsUsersQueryOptions(
  args: InferRequestType<typeof client.suggestions.users.$get>,
  clientOptions?: ClientRequestOptions,
) {
  return {
    queryKey: getGetSuggestionsUsersQueryKey(args),
    queryFn: async () => parseResponse(client.suggestions.users.$get(args, clientOptions)),
  }
}

/**
 * POST /suggestions/users/{userId}/hide
 *
 * おすすめユーザーを非表示
 */
export function usePostSuggestionsUsersUserIdHide(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.suggestions.users)[':userId']['hide']['$post']>,
    ) => parseResponse(client.suggestions.users[':userId'].hide.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /suggestions/topics
 *
 * おすすめトピック取得
 */
export function useGetSuggestionsTopics(options?: {
  query?: {
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
      | InferResponseType<typeof client.suggestions.topics.$get>
      | (() => InferResponseType<typeof client.suggestions.topics.$get>)
    initialData?:
      | InferResponseType<typeof client.suggestions.topics.$get>
      | (() => InferResponseType<typeof client.suggestions.topics.$get>)
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetSuggestionsTopicsQueryKey(),
    queryFn: async ({ signal }) =>
      parseResponse(
        client.suggestions.topics.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, ...(signal ? { signal } : {}) },
        }),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Vue Query cache key for GET /suggestions/topics
 */
export function getGetSuggestionsTopicsQueryKey() {
  return ['/suggestions/topics'] as const
}

/**
 * Returns Vue Query query options for GET /suggestions/topics
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export function getGetSuggestionsTopicsQueryOptions(clientOptions?: ClientRequestOptions) {
  return {
    queryKey: getGetSuggestionsTopicsQueryKey(),
    queryFn: async () => parseResponse(client.suggestions.topics.$get(undefined, clientOptions)),
  }
}

/**
 * POST /topics/{topicId}/follow
 *
 * トピックをフォロー
 */
export function usePostTopicsTopicIdFollow(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.topics)[':topicId']['follow']['$post']>,
    ) => parseResponse(client.topics[':topicId'].follow.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /topics/{topicId}/follow
 *
 * トピックのフォロー解除
 */
export function useDeleteTopicsTopicIdFollow(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.topics)[':topicId']['follow']['$delete']>,
    ) => parseResponse(client.topics[':topicId'].follow.$delete(args, clientOptions)),
    ...mutationOptions,
  })
}
