import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/39-auth-webauthn-passkey'

/**
 * POST /webauthn/register/options
 *
 * 登録オプション取得
 *
 * パスキー登録のためのPublicKeyCredentialCreationOptionsを生成
 */
export function usePostWebauthnRegisterOptions(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.webauthn.register.options.$post> | undefined,
    Error,
    InferRequestType<typeof client.webauthn.register.options.$post>
  >({
    mutationFn: async (args) =>
      parseResponse(client.webauthn.register.options.$post(args, clientOptions)),
  })
}

/**
 * POST /webauthn/register/verify
 *
 * 登録検証
 *
 * クライアントから送信された認証情報を検証し、パスキーを登録
 */
export function usePostWebauthnRegisterVerify(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.webauthn.register.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.webauthn.register.verify.$post>
  >({
    mutationFn: async (args) =>
      parseResponse(client.webauthn.register.verify.$post(args, clientOptions)),
  })
}

/**
 * POST /webauthn/authenticate/options
 *
 * 認証オプション取得
 *
 * パスキー認証のためのPublicKeyCredentialRequestOptionsを生成
 */
export function usePostWebauthnAuthenticateOptions(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.webauthn.authenticate.options.$post> | undefined,
    Error,
    InferRequestType<typeof client.webauthn.authenticate.options.$post>
  >({
    mutationFn: async (args) =>
      parseResponse(client.webauthn.authenticate.options.$post(args, clientOptions)),
  })
}

/**
 * POST /webauthn/authenticate/verify
 *
 * 認証検証
 *
 * クライアントから送信された認証レスポンスを検証
 */
export function usePostWebauthnAuthenticateVerify(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.webauthn.authenticate.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.webauthn.authenticate.verify.$post>
  >({
    mutationFn: async (args) =>
      parseResponse(client.webauthn.authenticate.verify.$post(args, clientOptions)),
  })
}

/**
 * GET /webauthn/credentials
 *
 * 認証情報一覧取得
 *
 * ユーザーに登録されているパスキー一覧を取得
 */
export function useGetWebauthnCredentials(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetWebauthnCredentialsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.webauthn.credentials.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /webauthn/credentials
 */
export function getGetWebauthnCredentialsQueryKey() {
  return ['/webauthn/credentials'] as const
}

/**
 * GET /webauthn/credentials/{credentialId}
 *
 * 認証情報詳細取得
 */
export function useGetWebauthnCredentialsCredentialId(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetWebauthnCredentialsCredentialIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.webauthn.credentials[':credentialId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /webauthn/credentials/{credentialId}
 */
export function getGetWebauthnCredentialsCredentialIdQueryKey(
  args: InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$get']>,
) {
  return ['/webauthn/credentials/:credentialId', args] as const
}

/**
 * DELETE /webauthn/credentials/{credentialId}
 *
 * 認証情報削除
 *
 * パスキーを削除（少なくとも1つは残す必要がある場合あり）
 */
export function useDeleteWebauthnCredentialsCredentialId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.webauthn.credentials[':credentialId'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /webauthn/credentials/{credentialId}
 *
 * 認証情報更新
 *
 * パスキーの名前などを更新
 */
export function usePatchWebauthnCredentialsCredentialId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.webauthn.credentials)[':credentialId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.webauthn.credentials)[':credentialId']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.webauthn.credentials[':credentialId'].$patch(args, clientOptions)),
  })
}

/**
 * GET /webauthn/settings
 *
 * WebAuthn設定取得
 *
 * リライングパーティの設定情報を取得
 */
export function useGetWebauthnSettings(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetWebauthnSettingsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.webauthn.settings.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /webauthn/settings
 */
export function getGetWebauthnSettingsQueryKey() {
  return ['/webauthn/settings'] as const
}

/**
 * GET /webauthn/settings/rp
 *
 * リライングパーティ情報取得
 */
export function useGetWebauthnSettingsRp(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetWebauthnSettingsRpQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.webauthn.settings.rp.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /webauthn/settings/rp
 */
export function getGetWebauthnSettingsRpQueryKey() {
  return ['/webauthn/settings/rp'] as const
}

/**
 * PUT /webauthn/settings/rp
 *
 * リライングパーティ情報更新
 */
export function usePutWebauthnSettingsRp(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.webauthn.settings.rp.$put> | undefined,
    Error,
    InferRequestType<typeof client.webauthn.settings.rp.$put>
  >({
    mutationFn: async (args) =>
      parseResponse(client.webauthn.settings.rp.$put(args, clientOptions)),
  })
}

/**
 * GET /webauthn/authenticators
 *
 * サポートされる認証器一覧
 *
 * 許可されている認証器のAAGUID一覧
 */
export function useGetWebauthnAuthenticators(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetWebauthnAuthenticatorsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.webauthn.authenticators.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /webauthn/authenticators
 */
export function getGetWebauthnAuthenticatorsQueryKey() {
  return ['/webauthn/authenticators'] as const
}
