import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetApiKeysKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['api-keys'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /api-keys
 */
export function getGetApiKeysKey(args?: InferRequestType<(typeof client)['api-keys']['$get']>) {
  return ['/api-keys', ...(args ? [args] : [])] as const
}

/**
 * POST /api-keys
 *
 * APIキー作成
 */
export function usePostApiKeys(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['api-keys']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /api-keys',
    async (_: string, { arg }: { arg: InferRequestType<(typeof client)['api-keys']['$post']> }) =>
      parseResponse(client['api-keys'].$post(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetApiKeysKeyIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['api-keys'][':keyId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /api-keys/{keyId}
 */
export function getGetApiKeysKeyIdKey(
  args?: InferRequestType<(typeof client)['api-keys'][':keyId']['$get']>,
) {
  return ['/api-keys/:keyId', ...(args ? [args] : [])] as const
}

/**
 * DELETE /api-keys/{keyId}
 *
 * APIキー削除
 */
export function useDeleteApiKeysKeyId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['api-keys'][':keyId']['$delete']> | undefined,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'DELETE /api-keys/:keyId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['api-keys'][':keyId']['$delete']> },
    ) => parseResponse(client['api-keys'][':keyId'].$delete(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * PATCH /api-keys/{keyId}
 *
 * APIキー更新
 */
export function usePatchApiKeysKeyId(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['api-keys'][':keyId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'PATCH /api-keys/:keyId',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['api-keys'][':keyId']['$patch']> },
    ) => parseResponse(client['api-keys'][':keyId'].$patch(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /api-keys/{keyId}/revoke
 *
 * APIキー無効化
 */
export function usePostApiKeysKeyIdRevoke(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /api-keys/:keyId/revoke',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['api-keys'][':keyId']['revoke']['$post']> },
    ) => parseResponse(client['api-keys'][':keyId'].revoke.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * POST /api-keys/{keyId}/rotate
 *
 * APIキーローテーション
 */
export function usePostApiKeysKeyIdRotate(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /api-keys/:keyId/rotate',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['api-keys'][':keyId']['rotate']['$post']> },
    ) => parseResponse(client['api-keys'][':keyId'].rotate.$post(arg, clientOptions)),
    mutationOptions,
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetApiKeysKeyIdUsageKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['api-keys'][':keyId'].usage.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /api-keys/{keyId}/usage
 */
export function getGetApiKeysKeyIdUsageKey(
  args?: InferRequestType<(typeof client)['api-keys'][':keyId']['usage']['$get']>,
) {
  return ['/api-keys/:keyId/usage', ...(args ? [args] : [])] as const
}

/**
 * GET /api-keys/{keyId}/rate-limit/current
 *
 * 現在のレート制限状況取得
 */
export function useGetApiKeysKeyIdRateLimitCurrent(
  args: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGetApiKeysKeyIdRateLimitCurrentKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client['api-keys'][':keyId']['rate-limit'].current.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /api-keys/{keyId}/rate-limit/current
 */
export function getGetApiKeysKeyIdRateLimitCurrentKey(
  args?: InferRequestType<(typeof client)['api-keys'][':keyId']['rate-limit']['current']['$get']>,
) {
  return ['/api-keys/:keyId/rate-limit/current', ...(args ? [args] : [])] as const
}

/**
 * POST /api-keys/verify
 *
 * APIキー検証
 */
export function usePostApiKeysVerify(options?: {
  mutation?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['api-keys']['verify']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['api-keys']['verify']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return useSWRMutation(
    'POST /api-keys/verify',
    async (
      _: string,
      { arg }: { arg: InferRequestType<(typeof client)['api-keys']['verify']['$post']> },
    ) => parseResponse(client['api-keys'].verify.$post(arg, clientOptions)),
    mutationOptions,
  )
}

/**
 * GET /scopes
 *
 * 利用可能なスコープ一覧
 */
export function useGetScopes(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetScopesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.scopes.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /scopes
 */
export function getGetScopesKey() {
  return ['/scopes'] as const
}
