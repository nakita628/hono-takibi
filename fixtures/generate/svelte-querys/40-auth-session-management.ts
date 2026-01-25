import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/40-auth-session-management'

/**
 * GET /sessions
 *
 * アクティブセッション一覧
 *
 * 現在のユーザーのアクティブなセッション一覧を取得
 */
export function createGetSessions(
  args: InferRequestType<typeof client.sessions.$get>,
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
    queryKey: getGetSessionsQueryKey(args),
    queryFn: async () => parseResponse(client.sessions.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /sessions
 */
export function getGetSessionsQueryKey(args: InferRequestType<typeof client.sessions.$get>) {
  return ['/sessions', args] as const
}

/**
 * POST /sessions
 *
 * セッション作成
 *
 * 認証成功後にセッションを作成
 */
export function createPostSessions(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.sessions.$post>,
      variables: InferRequestType<typeof client.sessions.$post>,
    ) => void
    onError?: (error: Error, variables: InferRequestType<typeof client.sessions.$post>) => void
    onSettled?: (
      data: InferResponseType<typeof client.sessions.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.sessions.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.sessions.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.sessions.$post>) =>
      parseResponse(client.sessions.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /sessions/current
 *
 * 現在のセッション取得
 */
export function createGetSessionsCurrent(options?: {
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
    queryKey: getGetSessionsCurrentQueryKey(),
    queryFn: async () => parseResponse(client.sessions.current.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /sessions/current
 */
export function getGetSessionsCurrentQueryKey() {
  return ['/sessions/current'] as const
}

/**
 * DELETE /sessions/current
 *
 * 現在のセッション終了（ログアウト）
 */
export function createDeleteSessionsCurrent(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.sessions.current.$delete> | undefined,
      variables: void,
    ) => void
    onError?: (error: Error, variables: void) => void
    onSettled?: (
      data: InferResponseType<typeof client.sessions.current.$delete> | undefined,
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
  return createMutation({
    mutationFn: async () =>
      parseResponse(client.sessions.current.$delete(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /sessions/current/refresh
 *
 * セッション更新
 *
 * リフレッシュトークンを使用してセッションを更新
 */
export function createPostSessionsCurrentRefresh(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.sessions.current.refresh.$post>,
      variables: InferRequestType<typeof client.sessions.current.refresh.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.sessions.current.refresh.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.sessions.current.refresh.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.sessions.current.refresh.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.sessions.current.refresh.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.sessions.current.refresh.$post>) =>
      parseResponse(client.sessions.current.refresh.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /sessions/current/extend
 *
 * セッション延長
 *
 * アクティブなセッションの有効期限を延長
 */
export function createPostSessionsCurrentExtend(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.sessions.current.extend.$post>,
      variables: InferRequestType<typeof client.sessions.current.extend.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.sessions.current.extend.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.sessions.current.extend.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.sessions.current.extend.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.sessions.current.extend.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.sessions.current.extend.$post>) =>
      parseResponse(client.sessions.current.extend.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /sessions/current/activity
 *
 * アクティビティ記録
 *
 * ユーザーアクティビティを記録してアイドルタイムアウトをリセット
 */
export function createPostSessionsCurrentActivity(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.sessions.current.activity.$post>,
      variables: void,
    ) => void
    onError?: (error: Error, variables: void) => void
    onSettled?: (
      data: InferResponseType<typeof client.sessions.current.activity.$post> | undefined,
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
  return createMutation({
    mutationFn: async () =>
      parseResponse(client.sessions.current.activity.$post(undefined, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /sessions/{sessionId}
 *
 * セッション詳細取得
 */
export function createGetSessionsSessionId(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
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
    queryKey: getGetSessionsSessionIdQueryKey(args),
    queryFn: async () => parseResponse(client.sessions[':sessionId'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /sessions/{sessionId}
 */
export function getGetSessionsSessionIdQueryKey(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
) {
  return ['/sessions/:sessionId', args] as const
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション無効化
 *
 * 指定したセッションを強制的に終了
 */
export function createDeleteSessionsSessionId(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.sessions)[':sessionId']['$delete']> | undefined,
      variables: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.sessions)[':sessionId']['$delete']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>) =>
      parseResponse(client.sessions[':sessionId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /sessions/revoke-all
 *
 * 全セッション無効化
 *
 * 現在のセッション以外の全セッションを無効化
 */
export function createPostSessionsRevokeAll(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.sessions)['revoke-all']['$post']>,
      variables: InferRequestType<(typeof client.sessions)['revoke-all']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.sessions)['revoke-all']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.sessions)['revoke-all']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.sessions)['revoke-all']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.sessions)['revoke-all']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<(typeof client.sessions)['revoke-all']['$post']>) =>
      parseResponse(client.sessions['revoke-all'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * POST /sessions/validate
 *
 * セッション検証
 *
 * セッショントークンの有効性を検証
 */
export function createPostSessionsValidate(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.sessions.validate.$post>,
      variables: InferRequestType<typeof client.sessions.validate.$post>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.sessions.validate.$post>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.sessions.validate.$post> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.sessions.validate.$post>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.sessions.validate.$post>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.sessions.validate.$post>) =>
      parseResponse(client.sessions.validate.$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /sessions/history
 *
 * セッション履歴取得
 */
export function createGetSessionsHistory(
  args: InferRequestType<typeof client.sessions.history.$get>,
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
    queryKey: getGetSessionsHistoryQueryKey(args),
    queryFn: async () => parseResponse(client.sessions.history.$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /sessions/history
 */
export function getGetSessionsHistoryQueryKey(
  args: InferRequestType<typeof client.sessions.history.$get>,
) {
  return ['/sessions/history', args] as const
}

/**
 * GET /sessions/security-events
 *
 * セキュリティイベント取得
 *
 * 不審なログイン試行などのセキュリティイベントを取得
 */
export function createGetSessionsSecurityEvents(
  args: InferRequestType<(typeof client.sessions)['security-events']['$get']>,
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
    queryKey: getGetSessionsSecurityEventsQueryKey(args),
    queryFn: async () =>
      parseResponse(client.sessions['security-events'].$get(args, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /sessions/security-events
 */
export function getGetSessionsSecurityEventsQueryKey(
  args: InferRequestType<(typeof client.sessions)['security-events']['$get']>,
) {
  return ['/sessions/security-events', args] as const
}

/**
 * GET /sessions/policies
 *
 * セッションポリシー取得
 */
export function createGetSessionsPolicies(options?: {
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
    queryKey: getGetSessionsPoliciesQueryKey(),
    queryFn: async () => parseResponse(client.sessions.policies.$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /sessions/policies
 */
export function getGetSessionsPoliciesQueryKey() {
  return ['/sessions/policies'] as const
}

/**
 * PUT /sessions/policies
 *
 * セッションポリシー更新
 */
export function createPutSessionsPolicies(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<typeof client.sessions.policies.$put>,
      variables: InferRequestType<typeof client.sessions.policies.$put>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<typeof client.sessions.policies.$put>,
    ) => void
    onSettled?: (
      data: InferResponseType<typeof client.sessions.policies.$put> | undefined,
      error: Error | null,
      variables: InferRequestType<typeof client.sessions.policies.$put>,
    ) => void
    onMutate?: (variables: InferRequestType<typeof client.sessions.policies.$put>) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (args: InferRequestType<typeof client.sessions.policies.$put>) =>
      parseResponse(client.sessions.policies.$put(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * GET /sessions/trusted-devices
 *
 * 信頼済みデバイス一覧
 */
export function createGetSessionsTrustedDevices(options?: {
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
    queryKey: getGetSessionsTrustedDevicesQueryKey(),
    queryFn: async () =>
      parseResponse(client.sessions['trusted-devices'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /sessions/trusted-devices
 */
export function getGetSessionsTrustedDevicesQueryKey() {
  return ['/sessions/trusted-devices'] as const
}

/**
 * POST /sessions/trusted-devices
 *
 * 現在のデバイスを信頼
 */
export function createPostSessionsTrustedDevices(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<(typeof client.sessions)['trusted-devices']['$post']>,
      variables: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>,
    ) => void
    onSettled?: (
      data: InferResponseType<(typeof client.sessions)['trusted-devices']['$post']> | undefined,
      error: Error | null,
      variables: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>,
    ) => void
    onMutate?: (
      variables: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
    mutationFn: async (
      args: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>,
    ) => parseResponse(client.sessions['trusted-devices'].$post(args, clientOptions)),
    ...mutationOptions,
  })
}

/**
 * DELETE /sessions/trusted-devices/{deviceId}
 *
 * 信頼済みデバイス削除
 */
export function createDeleteSessionsTrustedDevicesDeviceId(options?: {
  mutation?: {
    onSuccess?: (
      data:
        | InferResponseType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
        | undefined,
      variables: InferRequestType<
        (typeof client.sessions)['trusted-devices'][':deviceId']['$delete']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.sessions)['trusted-devices'][':deviceId']['$delete']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.sessions)['trusted-devices'][':deviceId']['$delete']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.sessions)['trusted-devices'][':deviceId']['$delete']
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
      args: InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>,
    ) =>
      parseResponse(client.sessions['trusted-devices'][':deviceId'].$delete(args, clientOptions)),
    ...mutationOptions,
  })
}
