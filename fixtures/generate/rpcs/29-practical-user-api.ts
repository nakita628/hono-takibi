import { client } from '../clients/29-practical-user-api'

/**
 * POST /auth/register
 *
 * 新規ユーザー登録
 *
 * メールアドレスとパスワードで新規ユーザーを登録します
 */
export async function postAuthRegister(arg: {
  json: { email: string; password: string; name: string }
}) {
  return await client['auth']['register']['$post'](arg)
}

/**
 * POST /auth/login
 *
 * ログイン
 *
 * メールアドレスとパスワードで認証し、JWTトークンを取得します
 */
export async function postAuthLogin(arg: { json: { email: string; password: string } }) {
  return await client['auth']['login']['$post'](arg)
}

/**
 * POST /auth/refresh
 *
 * トークンリフレッシュ
 *
 * リフレッシュトークンを使用して新しいアクセストークンを取得します
 */
export async function postAuthRefresh(arg: { json: { refreshToken: string } }) {
  return await client['auth']['refresh']['$post'](arg)
}

/**
 * POST /auth/logout
 *
 * ログアウト
 */
export async function postAuthLogout() {
  return await client['auth']['logout']['$post']()
}

/**
 * POST /auth/password/forgot
 *
 * パスワードリセット要求
 *
 * パスワードリセット用のメールを送信します
 */
export async function postAuthPasswordForgot(arg: { json: { email: string } }) {
  return await client['auth']['password']['forgot']['$post'](arg)
}

/**
 * POST /auth/password/reset
 *
 * パスワードリセット実行
 */
export async function postAuthPasswordReset(arg: { json: { token: string; password: string } }) {
  return await client['auth']['password']['reset']['$post'](arg)
}

/**
 * GET /users
 *
 * ユーザー一覧取得
 *
 * ページネーション付きでユーザー一覧を取得します（管理者のみ）
 */
export async function getUsers(arg: {
  query: {
    page?: number
    limit?: number
    sort?: string
    search?: string
    status?: 'active' | 'inactive' | 'suspended'
  }
}) {
  return await client.users.$get(arg)
}

/**
 * GET /users/{userId}
 *
 * ユーザー詳細取得
 */
export async function getUsersUserId(arg: { param: { userId: string } }) {
  return await client['users'][':userId']['$get'](arg)
}

/**
 * DELETE /users/{userId}
 *
 * ユーザー削除
 */
export async function deleteUsersUserId(arg: { param: { userId: string } }) {
  return await client['users'][':userId']['$delete'](arg)
}

/**
 * PATCH /users/{userId}
 *
 * ユーザー情報更新
 */
export async function patchUsersUserId(arg: {
  param: { userId: string }
  json: { name?: string; status?: 'active' | 'inactive' | 'suspended'; role?: 'user' | 'admin' }
}) {
  return await client['users'][':userId']['$patch'](arg)
}

/**
 * GET /users/me
 *
 * 現在のユーザー情報取得
 */
export async function getUsersMe() {
  return await client['users']['me']['$get']()
}

/**
 * PATCH /users/me
 *
 * 現在のユーザー情報更新
 */
export async function patchUsersMe(arg: { json: { name?: string } }) {
  return await client['users']['me']['$patch'](arg)
}

/**
 * PUT /users/me/password
 *
 * パスワード変更
 */
export async function putUsersMePassword(arg: {
  json: { currentPassword: string; newPassword: string }
}) {
  return await client['users']['me']['password']['$put'](arg)
}

/**
 * PUT /users/me/avatar
 *
 * アバター画像アップロード
 */
export async function putUsersMeAvatar(arg: { form: { file: File } }) {
  return await client['users']['me']['avatar']['$put'](arg)
}

/**
 * DELETE /users/me/avatar
 *
 * アバター画像削除
 */
export async function deleteUsersMeAvatar() {
  return await client['users']['me']['avatar']['$delete']()
}
