import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/37-auth-mfa'

/**
 * GET /mfa/status
 *
 * MFA設定状況取得
 */
export function useGetMfaStatus(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetMfaStatusQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.mfa.status.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /mfa/status
 */
export function getGetMfaStatusQueryKey() {
  return ['/mfa/status'] as const
}

/**
 * GET /mfa/methods
 *
 * 登録済みMFA方式一覧
 */
export function useGetMfaMethods(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetMfaMethodsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.mfa.methods.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /mfa/methods
 */
export function getGetMfaMethodsQueryKey() {
  return ['/mfa/methods'] as const
}

/**
 * PUT /mfa/preferred
 *
 * 優先MFA方式設定
 */
export function usePutMfaPreferred(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.preferred.$put> | undefined,
    Error,
    InferRequestType<typeof client.mfa.preferred.$put>
  >({ mutationFn: async (args) => parseResponse(client.mfa.preferred.$put(args, clientOptions)) })
}

/**
 * POST /mfa/totp/setup
 *
 * TOTP設定開始
 *
 * TOTP認証の設定を開始し、QRコードとシークレットを取得します
 */
export function usePostMfaTotpSetup(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.totp.setup.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.totp.setup.$post>
  >({ mutationFn: async (args) => parseResponse(client.mfa.totp.setup.$post(args, clientOptions)) })
}

/**
 * POST /mfa/totp/verify
 *
 * TOTP設定確認
 *
 * TOTPコードを検証して設定を完了します
 */
export function usePostMfaTotpVerify(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.totp.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.totp.verify.$post>
  >({
    mutationFn: async (args) => parseResponse(client.mfa.totp.verify.$post(args, clientOptions)),
  })
}

/**
 * DELETE /mfa/totp
 *
 * TOTP無効化
 */
export function useDeleteMfaTotp(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.totp.$delete> | undefined,
    Error,
    InferRequestType<typeof client.mfa.totp.$delete>
  >({ mutationFn: async (args) => parseResponse(client.mfa.totp.$delete(args, clientOptions)) })
}

/**
 * POST /mfa/sms/setup
 *
 * SMS認証設定開始
 *
 * 電話番号を登録し、確認コードを送信します
 */
export function usePostMfaSmsSetup(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.sms.setup.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.sms.setup.$post>
  >({ mutationFn: async (args) => parseResponse(client.mfa.sms.setup.$post(args, clientOptions)) })
}

/**
 * POST /mfa/sms/verify
 *
 * SMS認証設定確認
 */
export function usePostMfaSmsVerify(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.sms.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.sms.verify.$post>
  >({ mutationFn: async (args) => parseResponse(client.mfa.sms.verify.$post(args, clientOptions)) })
}

/**
 * DELETE /mfa/sms/{methodId}
 *
 * SMS認証削除
 */
export function useDeleteMfaSmsMethodId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.mfa.sms)[':methodId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.mfa.sms)[':methodId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.mfa.sms[':methodId'].$delete(args, clientOptions)),
  })
}

/**
 * POST /mfa/email/setup
 *
 * メール認証設定開始
 */
export function usePostMfaEmailSetup(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.email.setup.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.email.setup.$post>
  >({
    mutationFn: async (args) => parseResponse(client.mfa.email.setup.$post(args, clientOptions)),
  })
}

/**
 * POST /mfa/email/verify
 *
 * メール認証設定確認
 */
export function usePostMfaEmailVerify(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.email.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.email.verify.$post>
  >({
    mutationFn: async (args) => parseResponse(client.mfa.email.verify.$post(args, clientOptions)),
  })
}

/**
 * POST /mfa/webauthn/register/options
 *
 * WebAuthn登録オプション取得
 *
 * WebAuthn認証器登録のためのオプションを取得します
 */
export function usePostMfaWebauthnRegisterOptions(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.webauthn.register.options.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.webauthn.register.options.$post>
  >({
    mutationFn: async (args) =>
      parseResponse(client.mfa.webauthn.register.options.$post(args, clientOptions)),
  })
}

/**
 * POST /mfa/webauthn/register/verify
 *
 * WebAuthn登録検証
 */
export function usePostMfaWebauthnRegisterVerify(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.webauthn.register.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.webauthn.register.verify.$post>
  >({
    mutationFn: async (args) =>
      parseResponse(client.mfa.webauthn.register.verify.$post(args, clientOptions)),
  })
}

/**
 * GET /mfa/webauthn/credentials
 *
 * WebAuthn認証器一覧
 */
export function useGetMfaWebauthnCredentials(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetMfaWebauthnCredentialsQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.mfa.webauthn.credentials.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /mfa/webauthn/credentials
 */
export function getGetMfaWebauthnCredentialsQueryKey() {
  return ['/mfa/webauthn/credentials'] as const
}

/**
 * DELETE /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器削除
 */
export function useDeleteMfaWebauthnCredentialsCredentialId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.mfa.webauthn.credentials[':credentialId'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /mfa/webauthn/credentials/{credentialId}
 *
 * WebAuthn認証器更新
 */
export function usePatchMfaWebauthnCredentialsCredentialId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
    | undefined,
    Error,
    InferRequestType<(typeof client.mfa.webauthn.credentials)[':credentialId']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.mfa.webauthn.credentials[':credentialId'].$patch(args, clientOptions)),
  })
}

/**
 * POST /mfa/backup-codes/generate
 *
 * バックアップコード生成
 *
 * 新しいバックアップコードを生成します（既存のコードは無効化されます）
 */
export function usePostMfaBackupCodesGenerate(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.mfa)['backup-codes']['generate']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.mfa)['backup-codes']['generate']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.mfa['backup-codes'].generate.$post(args, clientOptions)),
  })
}

/**
 * GET /mfa/backup-codes/status
 *
 * バックアップコード状況取得
 */
export function useGetMfaBackupCodesStatus(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetMfaBackupCodesStatusQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.mfa['backup-codes'].status.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /mfa/backup-codes/status
 */
export function getGetMfaBackupCodesStatusQueryKey() {
  return ['/mfa/backup-codes/status'] as const
}

/**
 * POST /mfa/challenge
 *
 * MFAチャレンジ作成
 *
 * ログイン時などにMFA認証チャレンジを作成します
 */
export function usePostMfaChallenge(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.challenge.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.challenge.$post>
  >({ mutationFn: async (args) => parseResponse(client.mfa.challenge.$post(args, clientOptions)) })
}

/**
 * POST /mfa/challenge/send
 *
 * MFAコード送信
 *
 * SMSまたはメールでMFAコードを送信します
 */
export function usePostMfaChallengeSend(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.challenge.send.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.challenge.send.$post>
  >({
    mutationFn: async (args) => parseResponse(client.mfa.challenge.send.$post(args, clientOptions)),
  })
}

/**
 * POST /mfa/verify
 *
 * MFA検証
 *
 * MFAコードを検証し、認証を完了します
 */
export function usePostMfaVerify(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.verify.$post>
  >({ mutationFn: async (args) => parseResponse(client.mfa.verify.$post(args, clientOptions)) })
}

/**
 * POST /mfa/webauthn/authenticate/options
 *
 * WebAuthn認証オプション取得
 */
export function usePostMfaWebauthnAuthenticateOptions(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.webauthn.authenticate.options.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.webauthn.authenticate.options.$post>
  >({
    mutationFn: async (args) =>
      parseResponse(client.mfa.webauthn.authenticate.options.$post(args, clientOptions)),
  })
}

/**
 * POST /mfa/recovery
 *
 * MFAリカバリー開始
 *
 * MFA認証器にアクセスできない場合のリカバリーを開始します
 */
export function usePostMfaRecovery(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.recovery.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.recovery.$post>
  >({ mutationFn: async (args) => parseResponse(client.mfa.recovery.$post(args, clientOptions)) })
}

/**
 * POST /mfa/recovery/verify
 *
 * MFAリカバリー検証
 */
export function usePostMfaRecoveryVerify(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.mfa.recovery.verify.$post> | undefined,
    Error,
    InferRequestType<typeof client.mfa.recovery.verify.$post>
  >({
    mutationFn: async (args) =>
      parseResponse(client.mfa.recovery.verify.$post(args, clientOptions)),
  })
}
