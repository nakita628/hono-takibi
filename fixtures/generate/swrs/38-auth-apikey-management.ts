import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/38-auth-apikey-management'

/**
 * GET /api-keys
 *
 * APIキー一覧取得
 */
export function useGetApiKeys(
  args: InferRequestType<(typeof client)['api-keys']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client)['api-keys']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/api-keys', args] as const) : null
  return useSWR<InferResponseType<(typeof client)['api-keys']['$get']>, Error>(
    key,
    async () => parseResponse(client['api-keys'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /api-keys
 */
export function getGetApiKeysKey(args: InferRequestType<(typeof client)['api-keys']['$get']>) {
  return ['GET', '/api-keys', args] as const
}

/**
 * POST /api-keys
 *
 * APIキー作成
 */
export function usePostApiKeys(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['api-keys']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['api-keys']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys']['$post']>
  >(
    'POST /api-keys',
    async (_, { arg }) => parseResponse(client['api-keys'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /api-keys/{keyId}
 *
 * APIキー詳細取得
 */
export function useGetApiKeysKeyId(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client)['api-keys'][':keyId']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/api-keys/:keyId', args] as const) : null
  return useSWR<InferResponseType<(typeof client)['api-keys'][':keyId']['$get']>, Error>(
    key,
    async () => parseResponse(client['api-keys'][':keyId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /api-keys/{keyId}
 */
export function getGetApiKeysKeyIdKey(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
) {
  return ['GET', '/api-keys/:keyId', args] as const
}

/**
 * DELETE /api-keys/{keyId}
 *
 * APIキー削除
 */
export function useDeleteApiKeysKeyId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['api-keys'][':keyId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['api-keys'][':keyId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>
  >(
    'DELETE /api-keys/:keyId',
    async (_, { arg }) => parseResponse(client['api-keys'][':keyId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /api-keys/{keyId}
 *
 * APIキー更新
 */
export function usePatchApiKeysKeyId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['api-keys'][':keyId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['api-keys'][':keyId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>
  >(
    'PATCH /api-keys/:keyId',
    async (_, { arg }) => parseResponse(client['api-keys'][':keyId'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /api-keys/{keyId}/revoke
 *
 * APIキー無効化
 */
export function usePostApiKeysKeyIdRevoke(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>
  >(
    'POST /api-keys/:keyId/revoke',
    async (_, { arg }) =>
      parseResponse(client['api-keys'][':keyId'].revoke.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /api-keys/{keyId}/rotate
 *
 * APIキーローテーション
 */
export function usePostApiKeysKeyIdRotate(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>
  >(
    'POST /api-keys/:keyId/rotate',
    async (_, { arg }) =>
      parseResponse(client['api-keys'][':keyId'].rotate.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /api-keys/{keyId}/usage
 *
 * APIキー使用量取得
 */
export function useGetApiKeysKeyIdUsage(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/api-keys/:keyId/usage', args] as const) : null
  return useSWR<InferResponseType<(typeof client)['api-keys'][':keyId']['usage']['$get']>, Error>(
    key,
    async () => parseResponse(client['api-keys'][':keyId'].usage.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /api-keys/{keyId}/usage
 */
export function getGetApiKeysKeyIdUsageKey(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
) {
  return ['GET', '/api-keys/:keyId/usage', args] as const
}

/**
 * GET /api-keys/{keyId}/rate-limit/current
 *
 * 現在のレート制限状況取得
 */
export function useGetApiKeysKeyIdRateLimitCurrent(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/api-keys/:keyId/rate-limit/current', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client['api-keys'][':keyId']['rate-limit'].current.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /api-keys/{keyId}/rate-limit/current
 */
export function getGetApiKeysKeyIdRateLimitCurrentKey(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
) {
  return ['GET', '/api-keys/:keyId/rate-limit/current', args] as const
}

/**
 * POST /api-keys/verify
 *
 * APIキー検証
 */
export function usePostApiKeysVerify(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['api-keys']['verify']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys']['verify']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['api-keys']['verify']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys']['verify']['$post']>
  >(
    'POST /api-keys/verify',
    async (_, { arg }) => parseResponse(client['api-keys'].verify.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /scopes
 *
 * 利用可能なスコープ一覧
 */
export function useGetScopes(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.scopes.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/scopes'] as const) : null
  return useSWR<InferResponseType<typeof client.scopes.$get>, Error>(
    key,
    async () => parseResponse(client.scopes.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /scopes
 */
export function getGetScopesKey() {
  return ['GET', '/scopes'] as const
}
