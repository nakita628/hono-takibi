import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/33-practical-notification-api'

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
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetNotificationsQueryKey(args),
    queryFn: async () => parseResponse(client.notifications.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /notifications
 */
export function getGetNotificationsQueryKey(
  args: InferRequestType<typeof client.notifications.$get>,
) {
  return ['/notifications', args] as const
}

/**
 * GET /notifications/{notificationId}
 *
 * 通知詳細取得
 */
export function useGetNotificationsNotificationId(
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
  return useQuery({
    queryKey: getGetNotificationsNotificationIdQueryKey(args),
    queryFn: async () =>
      parseResponse(client.notifications[':notificationId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /notifications/{notificationId}
 */
export function getGetNotificationsNotificationIdQueryKey(
  args: InferRequestType<(typeof client.notifications)[':notificationId']['$get']>,
) {
  return ['/notifications/:notificationId', args] as const
}

/**
 * DELETE /notifications/{notificationId}
 *
 * 通知削除
 */
export function useDeleteNotificationsNotificationId(options?: {
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
  return useMutation({
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
export function usePostNotificationsNotificationIdRead(options?: {
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
  return useMutation({
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
export function usePostNotificationsReadAll(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.notifications)['read-all']['$post']>,
      variables: void,
    ) => void
    onError?: (error: Error, variables: void) => void
    onSettled?: (
      data: InferResponseType<(typeof client.notifications)['read-all']['$post']> | undefined,
      error: Error | null,
      variables: void,
    ) => void
    onMutate?: (variables: void) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useMutation({
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
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return useQuery({
    queryKey: getGetNotificationsUnreadCountQueryKey(),
    queryFn: async () =>
      parseResponse(client.notifications['unread-count'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /notifications/unread-count
 */
export function getGetNotificationsUnreadCountQueryKey() {
  return ['/notifications/unread-count'] as const
}

/**
 * POST /messages/send
 *
 * メッセージ送信
 *
 * 指定したチャンネルでメッセージを送信します
 */
export function usePostMessagesSend(options?: {
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
  return useMutation({
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
export function usePostMessagesSendBatch(options?: {
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
  return useMutation({
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
export function useGetMessagesMessageId(
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
  return useQuery({
    queryKey: getGetMessagesMessageIdQueryKey(args),
    queryFn: async () => parseResponse(client.messages[':messageId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /messages/{messageId}
 */
export function getGetMessagesMessageIdQueryKey(
  args: InferRequestType<(typeof client.messages)[':messageId']['$get']>,
) {
  return ['/messages/:messageId', args] as const
}

/**
 * GET /templates
 *
 * テンプレート一覧取得
 */
export function useGetTemplates(
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
  return useQuery({
    queryKey: getGetTemplatesQueryKey(args),
    queryFn: async () => parseResponse(client.templates.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /templates
 */
export function getGetTemplatesQueryKey(args: InferRequestType<typeof client.templates.$get>) {
  return ['/templates', args] as const
}

/**
 * POST /templates
 *
 * テンプレート作成
 */
export function usePostTemplates(options?: {
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
  return useMutation({
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
export function useGetTemplatesTemplateId(
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
  return useQuery({
    queryKey: getGetTemplatesTemplateIdQueryKey(args),
    queryFn: async () => parseResponse(client.templates[':templateId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /templates/{templateId}
 */
export function getGetTemplatesTemplateIdQueryKey(
  args: InferRequestType<(typeof client.templates)[':templateId']['$get']>,
) {
  return ['/templates/:templateId', args] as const
}

/**
 * PUT /templates/{templateId}
 *
 * テンプレート更新
 */
export function usePutTemplatesTemplateId(options?: {
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
  return useMutation({
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
export function useDeleteTemplatesTemplateId(options?: {
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
      data: InferResponseType<(typeof client.templates)[':templateId']['$delete']> | undefined,
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
  return useMutation({
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
export function usePostTemplatesTemplateIdPreview(options?: {
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
  return useMutation({
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
export function useGetChannelsPreferences(options?: {
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
    queryKey: getGetChannelsPreferencesQueryKey(),
    queryFn: async () => parseResponse(client.channels.preferences.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/preferences
 */
export function getGetChannelsPreferencesQueryKey() {
  return ['/channels/preferences'] as const
}

/**
 * PUT /channels/preferences
 *
 * チャンネル設定更新
 */
export function usePutChannelsPreferences(options?: {
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
  return useMutation({
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
export function useGetChannelsDevices(options?: {
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
    queryKey: getGetChannelsDevicesQueryKey(),
    queryFn: async () => parseResponse(client.channels.devices.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /channels/devices
 */
export function getGetChannelsDevicesQueryKey() {
  return ['/channels/devices'] as const
}

/**
 * POST /channels/devices
 *
 * デバイス登録
 */
export function usePostChannelsDevices(options?: {
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
  return useMutation({
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
export function useDeleteChannelsDevicesDeviceId(options?: {
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
      data: InferResponseType<(typeof client.channels.devices)[':deviceId']['$delete']> | undefined,
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
  return useMutation({
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
export function useGetWebhooks(options?: {
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
    queryKey: getGetWebhooksQueryKey(),
    queryFn: async () => parseResponse(client.webhooks.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /webhooks
 */
export function getGetWebhooksQueryKey() {
  return ['/webhooks'] as const
}

/**
 * POST /webhooks
 *
 * Webhook作成
 */
export function usePostWebhooks(options?: {
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
  return useMutation({
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
export function useGetWebhooksWebhookId(
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
  return useQuery({
    queryKey: getGetWebhooksWebhookIdQueryKey(args),
    queryFn: async () => parseResponse(client.webhooks[':webhookId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates TanStack Query cache key for GET /webhooks/{webhookId}
 */
export function getGetWebhooksWebhookIdQueryKey(
  args: InferRequestType<(typeof client.webhooks)[':webhookId']['$get']>,
) {
  return ['/webhooks/:webhookId', args] as const
}

/**
 * PUT /webhooks/{webhookId}
 *
 * Webhook更新
 */
export function usePutWebhooksWebhookId(options?: {
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
  return useMutation({
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
export function useDeleteWebhooksWebhookId(options?: {
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
      data: InferResponseType<(typeof client.webhooks)[':webhookId']['$delete']> | undefined,
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
  return useMutation({
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
export function usePostWebhooksWebhookIdTest(options?: {
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
  return useMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.webhooks)[':webhookId']['test']['$post']>,
    ) => parseResponse(client.webhooks[':webhookId'].test.$post(args, clientOptions)),
    ...mutationOptions,
  })
}
