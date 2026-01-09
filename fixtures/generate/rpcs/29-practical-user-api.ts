import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/29-practical-user-api'

/**
 * POST /auth/register
 *
 * 新規ユーザー登録
 *
 * メールアドレスとパスワードで新規ユーザーを登録します
 */
export async function postAuthRegister(
  args: { json: { email: string; password: string; name: string } },
  options?: ClientRequestOptions,
) {
  return await client.auth.register.$post(args, options)
}

/**
 * POST /auth/login
 *
 * ログイン
 *
 * メールアドレスとパスワードで認証し、JWTトークンを取得します
 */
export async function postAuthLogin(
  args: { json: { email: string; password: string } },
  options?: ClientRequestOptions,
) {
  return await client.auth.login.$post(args, options)
}

/**
 * POST /auth/refresh
 *
 * トークンリフレッシュ
 *
 * リフレッシュトークンを使用して新しいアクセストークンを取得します
 */
export async function postAuthRefresh(
  args: { json: { refreshToken: string } },
  options?: ClientRequestOptions,
) {
  return await client.auth.refresh.$post(args, options)
}

/**
 * POST /auth/logout
 *
 * ログアウト
 */
export async function postAuthLogout(options?: ClientRequestOptions) {
  return await client.auth.logout.$post(undefined, options)
}

/**
 * POST /auth/password/forgot
 *
 * パスワードリセット要求
 *
 * パスワードリセット用のメールを送信します
 */
export async function postAuthPasswordForgot(
  args: { json: { email: string } },
  options?: ClientRequestOptions,
) {
  return await client.auth.password.forgot.$post(args, options)
}

/**
 * POST /auth/password/reset
 *
 * パスワードリセット実行
 */
export async function postAuthPasswordReset(
  args: { json: { token: string; password: string } },
  options?: ClientRequestOptions,
) {
  return await client.auth.password.reset.$post(args, options)
}

/**
 * GET /users
 *
 * ユーザー一覧取得
 *
 * ページネーション付きでユーザー一覧を取得します（管理者のみ）
 */
export async function getUsers(
  args: {
    query: {
      page?: number
      limit?: number
      sort?: string
      search?: string
      status?: 'active' | 'inactive' | 'suspended'
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.users.$get(args, options)
}

/**
 * GET /users/{userId}
 *
 * ユーザー詳細取得
 */
export async function getUsersUserId(
  args: { param: { userId: string } },
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].$get(args, options)
}

/**
 * DELETE /users/{userId}
 *
 * ユーザー削除
 */
export async function deleteUsersUserId(
  args: { param: { userId: string } },
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].$delete(args, options)
}

/**
 * PATCH /users/{userId}
 *
 * ユーザー情報更新
 */
export async function patchUsersUserId(
  args: {
    param: { userId: string }
    json: { name?: string; status?: 'active' | 'inactive' | 'suspended'; role?: 'user' | 'admin' }
  },
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].$patch(args, options)
}

/**
 * GET /users/me
 *
 * 現在のユーザー情報取得
 */
export async function getUsersMe(options?: ClientRequestOptions) {
  return await client.users.me.$get(undefined, options)
}

/**
 * PATCH /users/me
 *
 * 現在のユーザー情報更新
 */
export async function patchUsersMe(
  args: { json: { name?: string } },
  options?: ClientRequestOptions,
) {
  return await client.users.me.$patch(args, options)
}

/**
 * PUT /users/me/password
 *
 * パスワード変更
 */
export async function putUsersMePassword(
  args: { json: { currentPassword: string; newPassword: string } },
  options?: ClientRequestOptions,
) {
  return await client.users.me.password.$put(args, options)
}

/**
 * PUT /users/me/avatar
 *
 * アバター画像アップロード
 */
export async function putUsersMeAvatar(
  args: { form: { file: File } },
  options?: ClientRequestOptions,
) {
  return await client.users.me.avatar.$put(args, options)
}

/**
 * DELETE /users/me/avatar
 *
 * アバター画像削除
 */
export async function deleteUsersMeAvatar(options?: ClientRequestOptions) {
  return await client.users.me.avatar.$delete(undefined, options)
}
