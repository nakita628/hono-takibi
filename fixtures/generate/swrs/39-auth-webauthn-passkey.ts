import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/39-auth-webauthn-passkey'

/**
 * Generates SWR mutation key for POST /webauthn/register/options
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebauthnRegisterOptionsMutationKey() {
  return ['webauthn', 'POST', '/webauthn/register/options'] as const
}

/**
 * POST /webauthn/register/options
 *
 * 登録オプション取得
 *
 * パスキー登録のためのPublicKeyCredentialCreationOptionsを生成
 */
export function usePostWebauthnRegisterOptions(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.register.options.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.webauthn.register.options.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebauthnRegisterOptionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.webauthn.register.options.$post> },
      ) => parseResponse(client.webauthn.register.options.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webauthn/register/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebauthnRegisterVerifyMutationKey() {
  return ['webauthn', 'POST', '/webauthn/register/verify'] as const
}

/**
 * POST /webauthn/register/verify
 *
 * 登録検証
 *
 * クライアントから送信された認証情報を検証し、パスキーを登録
 */
export function usePostWebauthnRegisterVerify(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.register.verify.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.webauthn.register.verify.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebauthnRegisterVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.webauthn.register.verify.$post> },
      ) => parseResponse(client.webauthn.register.verify.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webauthn/authenticate/options
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebauthnAuthenticateOptionsMutationKey() {
  return ['webauthn', 'POST', '/webauthn/authenticate/options'] as const
}

/**
 * POST /webauthn/authenticate/options
 *
 * 認証オプション取得
 *
 * パスキー認証のためのPublicKeyCredentialRequestOptionsを生成
 */
export function usePostWebauthnAuthenticateOptions(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.authenticate.options.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.webauthn.authenticate.options.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebauthnAuthenticateOptionsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.webauthn.authenticate.options.$post> },
      ) => parseResponse(client.webauthn.authenticate.options.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /webauthn/authenticate/verify
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostWebauthnAuthenticateVerifyMutationKey() {
  return ['webauthn', 'POST', '/webauthn/authenticate/verify'] as const
}

/**
 * POST /webauthn/authenticate/verify
 *
 * 認証検証
 *
 * クライアントから送信された認証レスポンスを検証
 */
export function usePostWebauthnAuthenticateVerify(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.authenticate.verify.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.webauthn.authenticate.verify.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebauthnAuthenticateVerifyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.webauthn.authenticate.verify.$post> },
      ) => parseResponse(client.webauthn.authenticate.verify.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webauthn/credentials
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetWebauthnCredentialsKey() {
  return ['webauthn', 'GET', '/webauthn/credentials'] as const
}

/**
 * GET /webauthn/credentials
 *
 * 認証情報一覧取得
 *
 * ユーザーに登録されているパスキー一覧を取得
 */
export function useGetWebauthnCredentials(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetWebauthnCredentialsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.webauthn.credentials.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webauthn/credentials/{credentialId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetWebauthnCredentialsCredentialIdKey(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
) {
  return ['webauthn', 'GET', '/webauthn/credentials/:credentialId', args] as const
}

/**
 * GET /webauthn/credentials/{credentialId}
 *
 * 認証情報詳細取得
 */
export function useGetWebauthnCredentialsCredentialId(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetWebauthnCredentialsCredentialIdKey(args)) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.webauthn.credentials[':credentialId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /webauthn/credentials/{credentialId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteWebauthnCredentialsCredentialIdMutationKey() {
  return ['webauthn', 'DELETE', '/webauthn/credentials/:credentialId'] as const
}

/**
 * DELETE /webauthn/credentials/{credentialId}
 *
 * 認証情報削除
 *
 * パスキーを削除（少なくとも1つは残す必要がある場合あり）
 */
export function useDeleteWebauthnCredentialsCredentialId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteWebauthnCredentialsCredentialIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
        },
      ) => parseResponse(client.webauthn.credentials[':credentialId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /webauthn/credentials/{credentialId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchWebauthnCredentialsCredentialIdMutationKey() {
  return ['webauthn', 'PATCH', '/webauthn/credentials/:credentialId'] as const
}

/**
 * PATCH /webauthn/credentials/{credentialId}
 *
 * 認証情報更新
 *
 * パスキーの名前などを更新
 */
export function usePatchWebauthnCredentialsCredentialId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchWebauthnCredentialsCredentialIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>
        },
      ) => parseResponse(client.webauthn.credentials[':credentialId'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webauthn/settings
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetWebauthnSettingsKey() {
  return ['webauthn', 'GET', '/webauthn/settings'] as const
}

/**
 * GET /webauthn/settings
 *
 * WebAuthn設定取得
 *
 * リライングパーティの設定情報を取得
 */
export function useGetWebauthnSettings(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetWebauthnSettingsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.webauthn.settings.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webauthn/settings/rp
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetWebauthnSettingsRpKey() {
  return ['webauthn', 'GET', '/webauthn/settings/rp'] as const
}

/**
 * GET /webauthn/settings/rp
 *
 * リライングパーティ情報取得
 */
export function useGetWebauthnSettingsRp(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetWebauthnSettingsRpKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.webauthn.settings.rp.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /webauthn/settings/rp
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutWebauthnSettingsRpMutationKey() {
  return ['webauthn', 'PUT', '/webauthn/settings/rp'] as const
}

/**
 * PUT /webauthn/settings/rp
 *
 * リライングパーティ情報更新
 */
export function usePutWebauthnSettingsRp(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.webauthn.settings.rp.$put>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.webauthn.settings.rp.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutWebauthnSettingsRpMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.webauthn.settings.rp.$put> }) =>
        parseResponse(client.webauthn.settings.rp.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /webauthn/authenticators
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetWebauthnAuthenticatorsKey() {
  return ['webauthn', 'GET', '/webauthn/authenticators'] as const
}

/**
 * GET /webauthn/authenticators
 *
 * サポートされる認証器一覧
 *
 * 許可されている認証器のAAGUID一覧
 */
export function useGetWebauthnAuthenticators(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = isEnabled ? (customKey ?? getGetWebauthnAuthenticatorsKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.webauthn.authenticators.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
