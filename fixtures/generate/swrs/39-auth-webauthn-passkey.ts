import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/39-auth-webauthn-passkey'

/**
 * POST /webauthn/register/options
 *
 * 登録オプション取得
 *
 * パスキー登録のためのPublicKeyCredentialCreationOptionsを生成
 */
export function usePostWebauthnRegisterOptions(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.webauthn.register.options.$post>,
    Error,
    string,
    InferRequestType<typeof client.webauthn.register.options.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.webauthn.register.options.$post>,
    Error,
    string,
    InferRequestType<typeof client.webauthn.register.options.$post>
  >(
    'POST /webauthn/register/options',
    async (_, { arg }) =>
      parseResponse(client.webauthn.register.options.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /webauthn/register/verify
 *
 * 登録検証
 *
 * クライアントから送信された認証情報を検証し、パスキーを登録
 */
export function usePostWebauthnRegisterVerify(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.webauthn.register.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.webauthn.register.verify.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.webauthn.register.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.webauthn.register.verify.$post>
  >(
    'POST /webauthn/register/verify',
    async (_, { arg }) =>
      parseResponse(client.webauthn.register.verify.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /webauthn/authenticate/options
 *
 * 認証オプション取得
 *
 * パスキー認証のためのPublicKeyCredentialRequestOptionsを生成
 */
export function usePostWebauthnAuthenticateOptions(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.webauthn.authenticate.options.$post>,
    Error,
    string,
    InferRequestType<typeof client.webauthn.authenticate.options.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.webauthn.authenticate.options.$post>,
    Error,
    string,
    InferRequestType<typeof client.webauthn.authenticate.options.$post>
  >(
    'POST /webauthn/authenticate/options',
    async (_, { arg }) =>
      parseResponse(client.webauthn.authenticate.options.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /webauthn/authenticate/verify
 *
 * 認証検証
 *
 * クライアントから送信された認証レスポンスを検証
 */
export function usePostWebauthnAuthenticateVerify(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.webauthn.authenticate.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.webauthn.authenticate.verify.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.webauthn.authenticate.verify.$post>,
    Error,
    string,
    InferRequestType<typeof client.webauthn.authenticate.verify.$post>
  >(
    'POST /webauthn/authenticate/verify',
    async (_, { arg }) =>
      parseResponse(client.webauthn.authenticate.verify.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /webauthn/credentials
 *
 * 認証情報一覧取得
 *
 * ユーザーに登録されているパスキー一覧を取得
 */
export function useGetWebauthnCredentials(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.webauthn.credentials.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/webauthn/credentials'] as const) : null
  return useSWR<InferResponseType<typeof client.webauthn.credentials.$get>, Error>(
    key,
    async () => parseResponse(client.webauthn.credentials.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /webauthn/credentials
 */
export function getGetWebauthnCredentialsKey() {
  return ['GET', '/webauthn/credentials'] as const
}

/**
 * GET /webauthn/credentials/{credentialId}
 *
 * 認証情報詳細取得
 */
export function useGetWebauthnCredentialsCredentialId(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/webauthn/credentials/:credentialId', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.webauthn.credentials[':credentialId'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /webauthn/credentials/{credentialId}
 */
export function getGetWebauthnCredentialsCredentialIdKey(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
) {
  return ['GET', '/webauthn/credentials/:credentialId', args] as const
}

/**
 * DELETE /webauthn/credentials/{credentialId}
 *
 * 認証情報削除
 *
 * パスキーを削除（少なくとも1つは残す必要がある場合あり）
 */
export function useDeleteWebauthnCredentialsCredentialId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
  >(
    'DELETE /webauthn/credentials/:credentialId',
    async (_, { arg }) =>
      parseResponse(client.webauthn.credentials[':credentialId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /webauthn/credentials/{credentialId}
 *
 * 認証情報更新
 *
 * パスキーの名前などを更新
 */
export function usePatchWebauthnCredentialsCredentialId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>
  >(
    'PATCH /webauthn/credentials/:credentialId',
    async (_, { arg }) =>
      parseResponse(client.webauthn.credentials[':credentialId'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /webauthn/settings
 *
 * WebAuthn設定取得
 *
 * リライングパーティの設定情報を取得
 */
export function useGetWebauthnSettings(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.webauthn.settings.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/webauthn/settings'] as const) : null
  return useSWR<InferResponseType<typeof client.webauthn.settings.$get>, Error>(
    key,
    async () => parseResponse(client.webauthn.settings.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /webauthn/settings
 */
export function getGetWebauthnSettingsKey() {
  return ['GET', '/webauthn/settings'] as const
}

/**
 * GET /webauthn/settings/rp
 *
 * リライングパーティ情報取得
 */
export function useGetWebauthnSettingsRp(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.webauthn.settings.rp.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/webauthn/settings/rp'] as const) : null
  return useSWR<InferResponseType<typeof client.webauthn.settings.rp.$get>, Error>(
    key,
    async () => parseResponse(client.webauthn.settings.rp.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /webauthn/settings/rp
 */
export function getGetWebauthnSettingsRpKey() {
  return ['GET', '/webauthn/settings/rp'] as const
}

/**
 * PUT /webauthn/settings/rp
 *
 * リライングパーティ情報更新
 */
export function usePutWebauthnSettingsRp(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.webauthn.settings.rp.$put>,
    Error,
    string,
    InferRequestType<typeof client.webauthn.settings.rp.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.webauthn.settings.rp.$put>,
    Error,
    string,
    InferRequestType<typeof client.webauthn.settings.rp.$put>
  >(
    'PUT /webauthn/settings/rp',
    async (_, { arg }) => parseResponse(client.webauthn.settings.rp.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /webauthn/authenticators
 *
 * サポートされる認証器一覧
 *
 * 許可されている認証器のAAGUID一覧
 */
export function useGetWebauthnAuthenticators(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.webauthn.authenticators.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/webauthn/authenticators'] as const) : null
  return useSWR<InferResponseType<typeof client.webauthn.authenticators.$get>, Error>(
    key,
    async () => parseResponse(client.webauthn.authenticators.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /webauthn/authenticators
 */
export function getGetWebauthnAuthenticatorsKey() {
  return ['GET', '/webauthn/authenticators'] as const
}
