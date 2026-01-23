import { useQuery, useMutation } from '@tanstack/vue-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/29-practical-user-api'

/**
 * POST /auth/register
 *
 * 新規ユーザー登録
 *
 * メールアドレスとパスワードで新規ユーザーを登録します
 */
export function usePostAuthRegister(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.auth.register.$post> | undefined,
    Error,
    InferRequestType<typeof client.auth.register.$post>
  >({ mutationFn: async (args) => parseResponse(client.auth.register.$post(args, clientOptions)) })
}

/**
 * POST /auth/login
 *
 * ログイン
 *
 * メールアドレスとパスワードで認証し、JWTトークンを取得します
 */
export function usePostAuthLogin(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.auth.login.$post> | undefined,
    Error,
    InferRequestType<typeof client.auth.login.$post>
  >({ mutationFn: async (args) => parseResponse(client.auth.login.$post(args, clientOptions)) })
}

/**
 * POST /auth/refresh
 *
 * トークンリフレッシュ
 *
 * リフレッシュトークンを使用して新しいアクセストークンを取得します
 */
export function usePostAuthRefresh(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.auth.refresh.$post> | undefined,
    Error,
    InferRequestType<typeof client.auth.refresh.$post>
  >({ mutationFn: async (args) => parseResponse(client.auth.refresh.$post(args, clientOptions)) })
}

/**
 * POST /auth/logout
 *
 * ログアウト
 */
export function usePostAuthLogout(clientOptions?: ClientRequestOptions) {
  return useMutation<InferResponseType<typeof client.auth.logout.$post> | undefined, Error, void>({
    mutationFn: async () => parseResponse(client.auth.logout.$post(undefined, clientOptions)),
  })
}

/**
 * POST /auth/password/forgot
 *
 * パスワードリセット要求
 *
 * パスワードリセット用のメールを送信します
 */
export function usePostAuthPasswordForgot(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.auth.password.forgot.$post> | undefined,
    Error,
    InferRequestType<typeof client.auth.password.forgot.$post>
  >({
    mutationFn: async (args) =>
      parseResponse(client.auth.password.forgot.$post(args, clientOptions)),
  })
}

/**
 * POST /auth/password/reset
 *
 * パスワードリセット実行
 */
export function usePostAuthPasswordReset(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.auth.password.reset.$post> | undefined,
    Error,
    InferRequestType<typeof client.auth.password.reset.$post>
  >({
    mutationFn: async (args) =>
      parseResponse(client.auth.password.reset.$post(args, clientOptions)),
  })
}

/**
 * GET /users
 *
 * ユーザー一覧取得
 *
 * ページネーション付きでユーザー一覧を取得します（管理者のみ）
 */
export function useGetUsers(
  args: InferRequestType<typeof client.users.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users
 */
export function getGetUsersQueryKey(args: InferRequestType<typeof client.users.$get>) {
  return ['/users', args] as const
}

/**
 * GET /users/{userId}
 *
 * ユーザー詳細取得
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetUsersUserIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users[':userId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/{userId}
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
) {
  return ['/users/:userId', args] as const
}

/**
 * DELETE /users/{userId}
 *
 * ユーザー削除
 */
export function useDeleteUsersUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$delete']>
  >({
    mutationFn: async (args) => parseResponse(client.users[':userId'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /users/{userId}
 *
 * ユーザー情報更新
 */
export function usePatchUsersUserId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.users)[':userId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':userId']['$patch']>
  >({
    mutationFn: async (args) => parseResponse(client.users[':userId'].$patch(args, clientOptions)),
  })
}

/**
 * GET /users/me
 *
 * 現在のユーザー情報取得
 */
export function useGetUsersMe(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetUsersMeQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.users.me.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /users/me
 */
export function getGetUsersMeQueryKey() {
  return ['/users/me'] as const
}

/**
 * PATCH /users/me
 *
 * 現在のユーザー情報更新
 */
export function usePatchUsersMe(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.users.me.$patch> | undefined,
    Error,
    InferRequestType<typeof client.users.me.$patch>
  >({ mutationFn: async (args) => parseResponse(client.users.me.$patch(args, clientOptions)) })
}

/**
 * PUT /users/me/password
 *
 * パスワード変更
 */
export function usePutUsersMePassword(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.users.me.password.$put> | undefined,
    Error,
    InferRequestType<typeof client.users.me.password.$put>
  >({
    mutationFn: async (args) => parseResponse(client.users.me.password.$put(args, clientOptions)),
  })
}

/**
 * PUT /users/me/avatar
 *
 * アバター画像アップロード
 */
export function usePutUsersMeAvatar(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.users.me.avatar.$put> | undefined,
    Error,
    InferRequestType<typeof client.users.me.avatar.$put>
  >({ mutationFn: async (args) => parseResponse(client.users.me.avatar.$put(args, clientOptions)) })
}

/**
 * DELETE /users/me/avatar
 *
 * アバター画像削除
 */
export function useDeleteUsersMeAvatar(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.users.me.avatar.$delete> | undefined,
    Error,
    void
  >({
    mutationFn: async () => parseResponse(client.users.me.avatar.$delete(undefined, clientOptions)),
  })
}
