import { client } from '../clients/29-practical-user-api'

/**
 * POST /auth/register
 *
 * 新規ユーザー登録
 *
 * メールアドレスとパスワードで新規ユーザーを登録します
 */
export async function postAuthRegister(body: { email: string; password: string; name: string }) {
  return await client.auth.register.$post({ json: body })
}

/**
 * POST /auth/login
 *
 * ログイン
 *
 * メールアドレスとパスワードで認証し、JWTトークンを取得します
 */
export async function postAuthLogin(body: { email: string; password: string }) {
  return await client.auth.login.$post({ json: body })
}

/**
 * POST /auth/refresh
 *
 * トークンリフレッシュ
 *
 * リフレッシュトークンを使用して新しいアクセストークンを取得します
 */
export async function postAuthRefresh(body: { refreshToken: string }) {
  return await client.auth.refresh.$post({ json: body })
}

/**
 * POST /auth/logout
 *
 * ログアウト
 */
export async function postAuthLogout() {
  return await client.auth.logout.$post()
}

/**
 * POST /auth/password/forgot
 *
 * パスワードリセット要求
 *
 * パスワードリセット用のメールを送信します
 */
export async function postAuthPasswordForgot(body: { email: string }) {
  return await client.auth.password.forgot.$post({ json: body })
}

/**
 * POST /auth/password/reset
 *
 * パスワードリセット実行
 */
export async function postAuthPasswordReset(body: { token: string; password: string }) {
  return await client.auth.password.reset.$post({ json: body })
}

/**
 * GET /users
 *
 * ユーザー一覧取得
 *
 * ページネーション付きでユーザー一覧を取得します（管理者のみ）
 */
export async function getUsers(params: {
  query: {
    page: number
    limit: number
    sort: string
    search: string
    status: 'active' | 'inactive' | 'suspended'
  }
}) {
  return await client.users.$get({ query: params.query })
}

/**
 * GET /users/{userId}
 *
 * ユーザー詳細取得
 */
export async function getUsersUserId(params: { path: { userId: string } }) {
  return await client.users[':userId'].$get({ param: params.path })
}

/**
 * DELETE /users/{userId}
 *
 * ユーザー削除
 */
export async function deleteUsersUserId(params: { path: { userId: string } }) {
  return await client.users[':userId'].$delete({ param: params.path })
}

/**
 * PATCH /users/{userId}
 *
 * ユーザー情報更新
 */
export async function patchUsersUserId(
  params: { path: { userId: string } },
  body: { name?: string; status?: 'active' | 'inactive' | 'suspended'; role?: 'user' | 'admin' },
) {
  return await client.users[':userId'].$patch({ param: params.path, json: body })
}

/**
 * GET /users/me
 *
 * 現在のユーザー情報取得
 */
export async function getUsersMe() {
  return await client.users.me.$get()
}

/**
 * PATCH /users/me
 *
 * 現在のユーザー情報更新
 */
export async function patchUsersMe(body: { name?: string }) {
  return await client.users.me.$patch({ json: body })
}

/**
 * PUT /users/me/password
 *
 * パスワード変更
 */
export async function putUsersMePassword(body: { currentPassword: string; newPassword: string }) {
  return await client.users.me.password.$put({ json: body })
}

/**
 * PUT /users/me/avatar
 *
 * アバター画像アップロード
 */
export async function putUsersMeAvatar(body: { file: string }) {
  return await client.users.me.avatar.$put({ json: body })
}

/**
 * DELETE /users/me/avatar
 *
 * アバター画像削除
 */
export async function deleteUsersMeAvatar() {
  return await client.users.me.avatar.$delete()
}
