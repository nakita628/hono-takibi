import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/40-auth-session-management'

/**
 * GET /sessions
 *
 * アクティブセッション一覧
 *
 * 現在のユーザーのアクティブなセッション一覧を取得
 */
export function useGetSessions(
  args: InferRequestType<typeof client.sessions.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSessionsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions
 * Uses $url() for type-safe key generation
 */
export function getGetSessionsKey(args: InferRequestType<typeof client.sessions.$get>) {
  return client.sessions.$url(args).pathname
}

/**
 * POST /sessions
 *
 * セッション作成
 *
 * 認証成功後にセッションを作成
 */
export function usePostSessions(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.sessions.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.sessions.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostSessionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.sessions.$post> }) =>
        parseResponse(client.sessions.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /sessions
 * Uses $url() for type-safe key generation
 */
export function getPostSessionsMutationKey() {
  return `POST ${client.sessions.$url().pathname}`
}

/**
 * GET /sessions/current
 *
 * 現在のセッション取得
 */
export function useGetSessionsCurrent(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSessionsCurrentKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions.current.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/current
 * Uses $url() for type-safe key generation
 */
export function getGetSessionsCurrentKey() {
  return client.sessions.current.$url().pathname
}

/**
 * DELETE /sessions/current
 *
 * 現在のセッション終了（ログアウト）
 */
export function useDeleteSessionsCurrent(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.sessions.current.$delete>>>
        >
      >
    | undefined,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteSessionsCurrentMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.sessions.current.$delete(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /sessions/current
 * Uses $url() for type-safe key generation
 */
export function getDeleteSessionsCurrentMutationKey() {
  return `DELETE ${client.sessions.current.$url().pathname}`
}

/**
 * POST /sessions/current/refresh
 *
 * セッション更新
 *
 * リフレッシュトークンを使用してセッションを更新
 */
export function usePostSessionsCurrentRefresh(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.sessions.current.refresh.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.sessions.current.refresh.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostSessionsCurrentRefreshMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.sessions.current.refresh.$post> },
      ) => parseResponse(client.sessions.current.refresh.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /sessions/current/refresh
 * Uses $url() for type-safe key generation
 */
export function getPostSessionsCurrentRefreshMutationKey() {
  return `POST ${client.sessions.current.refresh.$url().pathname}`
}

/**
 * POST /sessions/current/extend
 *
 * セッション延長
 *
 * アクティブなセッションの有効期限を延長
 */
export function usePostSessionsCurrentExtend(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.sessions.current.extend.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.sessions.current.extend.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostSessionsCurrentExtendMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.sessions.current.extend.$post> },
      ) => parseResponse(client.sessions.current.extend.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /sessions/current/extend
 * Uses $url() for type-safe key generation
 */
export function getPostSessionsCurrentExtendMutationKey() {
  return `POST ${client.sessions.current.extend.$url().pathname}`
}

/**
 * POST /sessions/current/activity
 *
 * アクティビティ記録
 *
 * ユーザーアクティビティを記録してアイドルタイムアウトをリセット
 */
export function usePostSessionsCurrentActivity(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.sessions.current.activity.$post>>>
      >
    >,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostSessionsCurrentActivityMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.sessions.current.activity.$post(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /sessions/current/activity
 * Uses $url() for type-safe key generation
 */
export function getPostSessionsCurrentActivityMutationKey() {
  return `POST ${client.sessions.current.activity.$url().pathname}`
}

/**
 * GET /sessions/{sessionId}
 *
 * セッション詳細取得
 */
export function useGetSessionsSessionId(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSessionsSessionIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions[':sessionId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/{sessionId}
 * Uses $url() for type-safe key generation
 */
export function getGetSessionsSessionIdKey(
  args: InferRequestType<(typeof client.sessions)[':sessionId']['$get']>,
) {
  return client.sessions[':sessionId'].$url(args).pathname
}

/**
 * DELETE /sessions/{sessionId}
 *
 * セッション無効化
 *
 * 指定したセッションを強制的に終了
 */
export function useDeleteSessionsSessionId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.sessions)[':sessionId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.sessions)[':sessionId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteSessionsSessionIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.sessions)[':sessionId']['$delete']> },
      ) => parseResponse(client.sessions[':sessionId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /sessions/{sessionId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteSessionsSessionIdMutationKey() {
  return `DELETE ${client.sessions[':sessionId'].$url().pathname}`
}

/**
 * POST /sessions/revoke-all
 *
 * 全セッション無効化
 *
 * 現在のセッション以外の全セッションを無効化
 */
export function usePostSessionsRevokeAll(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.sessions)['revoke-all']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.sessions)['revoke-all']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostSessionsRevokeAllMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.sessions)['revoke-all']['$post']> },
      ) => parseResponse(client.sessions['revoke-all'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /sessions/revoke-all
 * Uses $url() for type-safe key generation
 */
export function getPostSessionsRevokeAllMutationKey() {
  return `POST ${client.sessions['revoke-all'].$url().pathname}`
}

/**
 * POST /sessions/validate
 *
 * セッション検証
 *
 * セッショントークンの有効性を検証
 */
export function usePostSessionsValidate(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.sessions.validate.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.sessions.validate.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostSessionsValidateMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.sessions.validate.$post> }) =>
        parseResponse(client.sessions.validate.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /sessions/validate
 * Uses $url() for type-safe key generation
 */
export function getPostSessionsValidateMutationKey() {
  return `POST ${client.sessions.validate.$url().pathname}`
}

/**
 * GET /sessions/history
 *
 * セッション履歴取得
 */
export function useGetSessionsHistory(
  args: InferRequestType<typeof client.sessions.history.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSessionsHistoryKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions.history.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/history
 * Uses $url() for type-safe key generation
 */
export function getGetSessionsHistoryKey(
  args: InferRequestType<typeof client.sessions.history.$get>,
) {
  return client.sessions.history.$url(args).pathname
}

/**
 * GET /sessions/security-events
 *
 * セキュリティイベント取得
 *
 * 不審なログイン試行などのセキュリティイベントを取得
 */
export function useGetSessionsSecurityEvents(
  args: InferRequestType<(typeof client.sessions)['security-events']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSessionsSecurityEventsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions['security-events'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/security-events
 * Uses $url() for type-safe key generation
 */
export function getGetSessionsSecurityEventsKey(
  args: InferRequestType<(typeof client.sessions)['security-events']['$get']>,
) {
  return client.sessions['security-events'].$url(args).pathname
}

/**
 * GET /sessions/policies
 *
 * セッションポリシー取得
 */
export function useGetSessionsPolicies(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSessionsPoliciesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions.policies.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/policies
 * Uses $url() for type-safe key generation
 */
export function getGetSessionsPoliciesKey() {
  return client.sessions.policies.$url().pathname
}

/**
 * PUT /sessions/policies
 *
 * セッションポリシー更新
 */
export function usePutSessionsPolicies(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.sessions.policies.$put>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.sessions.policies.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPutSessionsPoliciesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.sessions.policies.$put> }) =>
        parseResponse(client.sessions.policies.$put(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /sessions/policies
 * Uses $url() for type-safe key generation
 */
export function getPutSessionsPoliciesMutationKey() {
  return `PUT ${client.sessions.policies.$url().pathname}`
}

/**
 * GET /sessions/trusted-devices
 *
 * 信頼済みデバイス一覧
 */
export function useGetSessionsTrustedDevices(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetSessionsTrustedDevicesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.sessions['trusted-devices'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /sessions/trusted-devices
 * Uses $url() for type-safe key generation
 */
export function getGetSessionsTrustedDevicesKey() {
  return client.sessions['trusted-devices'].$url().pathname
}

/**
 * POST /sessions/trusted-devices
 *
 * 現在のデバイスを信頼
 */
export function usePostSessionsTrustedDevices(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.sessions)['trusted-devices']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.sessions)['trusted-devices']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getPostSessionsTrustedDevicesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.sessions)['trusted-devices']['$post']> },
      ) => parseResponse(client.sessions['trusted-devices'].$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /sessions/trusted-devices
 * Uses $url() for type-safe key generation
 */
export function getPostSessionsTrustedDevicesMutationKey() {
  return `POST ${client.sessions['trusted-devices'].$url().pathname}`
}

/**
 * DELETE /sessions/trusted-devices/{deviceId}
 *
 * 信頼済みデバイス削除
 */
export function useDeleteSessionsTrustedDevicesDeviceId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const swrKey = mutationOptions?.swrKey ?? getDeleteSessionsTrustedDevicesDeviceIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.sessions)['trusted-devices'][':deviceId']['$delete']>
        },
      ) =>
        parseResponse(client.sessions['trusted-devices'][':deviceId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /sessions/trusted-devices/{deviceId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteSessionsTrustedDevicesDeviceIdMutationKey() {
  return `DELETE ${client.sessions['trusted-devices'][':deviceId'].$url().pathname}`
}
