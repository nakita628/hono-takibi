import { createQuery, createMutation, queryOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/33-practical-notification-api'

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
 * GET /notifications/{notificationId}
 *
 * 通知詳細取得
 */
export function createGetNotificationsNotificationId(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
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
    ...getGetNotificationsNotificationIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /notifications/{notificationId}
 */
export function getGetNotificationsNotificationIdQueryKey(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
) {
  return ['/notifications/:notificationId', args] as const
}

/**
 * Returns Svelte Query query options for GET /notifications/{notificationId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetNotificationsNotificationIdQueryOptions = (
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetNotificationsNotificationIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.notifications[':notificationId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /notifications/{notificationId}
 *
 * 通知削除
 */
export function createDeleteNotificationsNotificationId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.notifications)[':notificationId']['$delete']>
        | undefined,
      variables: InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.notifications)[':notificationId']['$delete']>
        | undefined
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.notifications)[':notificationId']['$delete']>,
    ) => parseResponse(client.notifications[':notificationId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /notifications/{notificationId}/read
 *
 * 既読にする
 */
export function createPostNotificationsNotificationIdRead(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.notifications)[':notificationId']['read']['$post']>,
      variables: InferRequestType<
        (typeof client.notifications)[':notificationId']['read']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.notifications)[':notificationId']['read']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.notifications)[':notificationId']['read']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.notifications)[':notificationId']['read']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.notifications)[':notificationId']['read']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.notifications)[':notificationId']['read']['$post']>,
    ) => parseResponse(client.notifications[':notificationId'].read.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /notifications/read-all
 *
 * 全て既読にする
 */
export function createPostNotificationsReadAll(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.notifications)['read-all']['$post']>,
      variables: undefined,
    ) => void
    onError?: (error: Error, variables: undefined) => void
    onSettled?: (
      data: InferResponseType<(typeof client.notifications)['read-all']['$post']> | undefined,
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
    mutationFn: async () =>
      parseResponse(client.notifications['read-all'].$post(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /notifications/unread-count
 *
 * 未読件数取得
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
 * POST /messages/send
 *
 * メッセージ送信
 *
 * 指定したチャンネルでメッセージを送信します
 */
export function createPostMessagesSend(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.messages.send.$post>,
      variables: InferRequestType<typeof client.messages.send.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.messages.send.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.messages.send.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.messages.send.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.messages.send.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.messages.send.$post>) =>
      parseResponse(client.messages.send.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /messages/send-batch
 *
 * 一括メッセージ送信
 */
export function createPostMessagesSendBatch(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.messages)['send-batch']['$post']>,
      variables: InferRequestType<(typeof client.messages)['send-batch']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.messages)['send-batch']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.messages)['send-batch']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.messages)['send-batch']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.messages)['send-batch']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.messages)['send-batch']['$post']>) =>
      parseResponse(client.messages['send-batch'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /messages/{messageId}
 *
 * メッセージ送信状況取得
 */
export function createGetMessagesMessageId(
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
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
    ...getGetMessagesMessageIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /messages/{messageId}
 */
export function getGetMessagesMessageIdQueryKey(
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
) {
  return ['/messages/:messageId', args] as const
}

/**
 * Returns Svelte Query query options for GET /messages/{messageId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMessagesMessageIdQueryOptions = (
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetMessagesMessageIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.messages[':messageId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /templates
 *
 * テンプレート一覧取得
 */
export function createGetTemplates(
  args: InferRequestType<typeof client.templates.$get>,
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
  return createQuery({ ...getGetTemplatesQueryOptions(args, clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /templates
 */
export function getGetTemplatesQueryKey(args: InferRequestType<typeof client.templates.$get>) {
  return ['/templates', args] as const
}

/**
 * Returns Svelte Query query options for GET /templates
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTemplatesQueryOptions = (
  args: InferRequestType<typeof client.templates.$get>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTemplatesQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.templates.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /templates
 *
 * テンプレート作成
 */
export function createPostTemplates(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.templates.$post>,
      variables: InferRequestType<typeof client.templates.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.templates.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.templates.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.templates.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.templates.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.templates.$post>) =>
      parseResponse(client.templates.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /templates/{templateId}
 *
 * テンプレート詳細取得
 */
export function createGetTemplatesTemplateId(
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
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
    ...getGetTemplatesTemplateIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /templates/{templateId}
 */
export function getGetTemplatesTemplateIdQueryKey(
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
) {
  return ['/templates/:templateId', args] as const
}

/**
 * Returns Svelte Query query options for GET /templates/{templateId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTemplatesTemplateIdQueryOptions = (
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetTemplatesTemplateIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.templates[':templateId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /templates/{templateId}
 *
 * テンプレート更新
 */
export function createPutTemplatesTemplateId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.templates)[':templateId']['$put']>,
      variables: InferRequestType<(typeof client.templates)[':templateId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.templates)[':templateId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.templates)[':templateId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.templates)[':templateId']['$put']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.templates)[':templateId']['$put']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.templates)[':templateId']['$put']>) =>
      parseResponse(client.templates[':templateId'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /templates/{templateId}
 *
 * テンプレート削除
 */
export function createDeleteTemplatesTemplateId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.templates)[':templateId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.templates)[':templateId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.templates)[':templateId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.templates)[':templateId']['$delete']>
        | undefined
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.templates)[':templateId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.templates)[':templateId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.templates)[':templateId']['$delete']>,
    ) => parseResponse(client.templates[':templateId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /templates/{templateId}/preview
 *
 * テンプレートプレビュー
 */
export function createPostTemplatesTemplateIdPreview(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.templates)[':templateId']['preview']['$post']>,
      variables: InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.templates)[':templateId']['preview']['$post']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.templates)[':templateId']['preview']['$post']>,
    ) => parseResponse(client.templates[':templateId'].preview.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /channels/preferences
 *
 * チャンネル設定取得
 */
export function createGetChannelsPreferences(options?: {
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
  return createQuery({ ...getGetChannelsPreferencesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /channels/preferences
 */
export function getGetChannelsPreferencesQueryKey() {
  return ['/channels/preferences'] as const
}

/**
 * Returns Svelte Query query options for GET /channels/preferences
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsPreferencesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetChannelsPreferencesQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.channels.preferences.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /channels/preferences
 *
 * チャンネル設定更新
 */
export function createPutChannelsPreferences(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.channels.preferences.$put>,
      variables: InferRequestType<typeof client.channels.preferences.$put>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.channels.preferences.$put>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.channels.preferences.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.channels.preferences.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.channels.preferences.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.channels.preferences.$put>) =>
      parseResponse(client.channels.preferences.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /channels/devices
 *
 * デバイス一覧取得
 */
export function createGetChannelsDevices(options?: {
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
  return createQuery({ ...getGetChannelsDevicesQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /channels/devices
 */
export function getGetChannelsDevicesQueryKey() {
  return ['/channels/devices'] as const
}

/**
 * Returns Svelte Query query options for GET /channels/devices
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChannelsDevicesQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetChannelsDevicesQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.channels.devices.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /channels/devices
 *
 * デバイス登録
 */
export function createPostChannelsDevices(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.channels.devices.$post>,
      variables: InferRequestType<typeof client.channels.devices.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.channels.devices.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.channels.devices.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.channels.devices.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.channels.devices.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.channels.devices.$post>) =>
      parseResponse(client.channels.devices.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /channels/devices/{deviceId}
 *
 * デバイス登録解除
 */
export function createDeleteChannelsDevicesDeviceId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.channels.devices)[':deviceId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.channels.devices)[':deviceId']['$delete']>
        | undefined
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.channels.devices)[':deviceId']['$delete']>,
    ) => parseResponse(client.channels.devices[':deviceId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /webhooks
 *
 * Webhook一覧取得
 */
export function createGetWebhooks(options?: {
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
  return createQuery({ ...getGetWebhooksQueryOptions(clientOptions), ...queryOptions })
}

/**
 * Generates Svelte Query cache key for GET /webhooks
 */
export function getGetWebhooksQueryKey() {
  return ['/webhooks'] as const
}

/**
 * Returns Svelte Query query options for GET /webhooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksQueryOptions = (clientOptions?: ClientRequestOptions) =>
  queryOptions({
    queryKey: getGetWebhooksQueryKey(),
    queryFn: ({ signal }) =>
      parseResponse(
        client.webhooks.$get(undefined, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /webhooks
 *
 * Webhook作成
 */
export function createPostWebhooks(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.webhooks.$post>,
      variables: InferRequestType<typeof client.webhooks.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.webhooks.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.webhooks.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.webhooks.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.webhooks.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.webhooks.$post>) =>
      parseResponse(client.webhooks.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /webhooks/{webhookId}
 *
 * Webhook詳細取得
 */
export function createGetWebhooksWebhookId(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
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
    ...getGetWebhooksWebhookIdQueryOptions(args, clientOptions),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /webhooks/{webhookId}
 */
export function getGetWebhooksWebhookIdQueryKey(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
) {
  return ['/webhooks/:webhookId', args] as const
}

/**
 * Returns Svelte Query query options for GET /webhooks/{webhookId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetWebhooksWebhookIdQueryOptions = (
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
  clientOptions?: ClientRequestOptions,
) =>
  queryOptions({
    queryKey: getGetWebhooksWebhookIdQueryKey(args),
    queryFn: ({ signal }) =>
      parseResponse(
        client.webhooks[':webhookId'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * PUT /webhooks/{webhookId}
 *
 * Webhook更新
 */
export function createPutWebhooksWebhookId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.webhooks)[':webhookId']['$put']>,
      variables: InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.webhooks)[':webhookId']['$put']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>,
    ) => void
    onMutate?: (variables: InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.webhooks)[':webhookId']['$put']>) =>
      parseResponse(client.webhooks[':webhookId'].$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /webhooks/{webhookId}
 *
 * Webhook削除
 */
export function createDeleteWebhooksWebhookId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.webhooks)[':webhookId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.webhooks)[':webhookId']['$delete']>
        | undefined
        | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.webhooks)[':webhookId']['$delete']>) =>
      parseResponse(client.webhooks[':webhookId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /webhooks/{webhookId}/test
 *
 * Webhookテスト送信
 */
export function createPostWebhooksWebhookIdTest(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.webhooks)[':webhookId']['test']['$post']>,
      variables: InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.webhooks)[':webhookId']['test']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>,
    ) => parseResponse(client.webhooks[':webhookId'].test.$post(args, clientOptions)),
    ...mutationOptions,
  })
}
