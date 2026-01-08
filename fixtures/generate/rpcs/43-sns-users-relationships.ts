import { client } from '../clients/43-sns-users-relationships'

/**
 * GET /users/{userId}
 *
 * ユーザー情報取得
 */
export async function getUsersUserId(params: { path: { userId: string } }) {
  return await client.users[':userId'].$get({ param: params.path })
}

/**
 * GET /users/by/username/{username}
 *
 * ユーザー名でユーザー取得
 */
export async function getUsersByUsernameUsername(params: { path: { username: string } }) {
  return await client.users.by.username[':username'].$get({ param: params.path })
}

/**
 * GET /users/search
 *
 * ユーザー検索
 */
export async function getUsersSearch(params: {
  query: { q: string; cursor: string; limit: number }
}) {
  return await client.users.search.$get({ query: params.query })
}

/**
 * GET /users/lookup
 *
 * 複数ユーザー一括取得
 */
export async function getUsersLookup(params: { query: { ids: string; usernames: string } }) {
  return await client.users.lookup.$get({ query: params.query })
}

/**
 * GET /me
 *
 * 現在のユーザー情報取得
 */
export async function getMe() {
  return await client.me.$get()
}

/**
 * PATCH /me
 *
 * プロフィール更新
 */
export async function patchMe(body: {
  displayName?: string
  bio?: string
  location?: string
  website?: string
  birthDate?: string
  isProtected?: boolean
  pinnedPostId?: string
}) {
  return await client.me.$patch({ json: body })
}

/**
 * POST /me/avatar
 *
 * アバターアップロード
 */
export async function postMeAvatar(body: { image: string }) {
  return await client.me.avatar.$post({ json: body })
}

/**
 * DELETE /me/avatar
 *
 * アバター削除
 */
export async function deleteMeAvatar() {
  return await client.me.avatar.$delete()
}

/**
 * POST /me/banner
 *
 * バナー画像アップロード
 */
export async function postMeBanner(body: { image: string }) {
  return await client.me.banner.$post({ json: body })
}

/**
 * DELETE /me/banner
 *
 * バナー画像削除
 */
export async function deleteMeBanner() {
  return await client.me.banner.$delete()
}

/**
 * POST /users/{userId}/follow
 *
 * フォロー
 */
export async function postUsersUserIdFollow(params: { path: { userId: string } }) {
  return await client.users[':userId'].follow.$post({ param: params.path })
}

/**
 * DELETE /users/{userId}/follow
 *
 * フォロー解除
 */
export async function deleteUsersUserIdFollow(params: { path: { userId: string } }) {
  return await client.users[':userId'].follow.$delete({ param: params.path })
}

/**
 * GET /users/{userId}/followers
 *
 * フォロワー一覧取得
 */
export async function getUsersUserIdFollowers(params: {
  path: { userId: string }
  query: { cursor: string; limit: number }
}) {
  return await client.users[':userId'].followers.$get({ param: params.path, query: params.query })
}

/**
 * GET /users/{userId}/following
 *
 * フォロー中一覧取得
 */
export async function getUsersUserIdFollowing(params: {
  path: { userId: string }
  query: { cursor: string; limit: number }
}) {
  return await client.users[':userId'].following.$get({ param: params.path, query: params.query })
}

/**
 * POST /users/{userId}/followers/remove
 *
 * フォロワー削除
 *
 * 自分のフォロワーから削除
 */
export async function postUsersUserIdFollowersRemove(params: { path: { userId: string } }) {
  return await client.users[':userId'].followers.remove.$post({ param: params.path })
}

/**
 * GET /relationships
 *
 * 関係性一括取得
 */
export async function getRelationships(params: { query: { userIds: string } }) {
  return await client.relationships.$get({ query: params.query })
}

/**
 * GET /follow-requests
 *
 * フォローリクエスト一覧
 *
 * 非公開アカウントへのフォローリクエスト
 */
export async function getFollowRequests(params: { query: { cursor: string; limit: number } }) {
  return await client['follow-requests'].$get({ query: params.query })
}

/**
 * POST /follow-requests/{userId}/accept
 *
 * フォローリクエスト承認
 */
export async function postFollowRequestsUserIdAccept(params: { path: { userId: string } }) {
  return await client['follow-requests'][':userId'].accept.$post({ param: params.path })
}

/**
 * POST /follow-requests/{userId}/reject
 *
 * フォローリクエスト拒否
 */
export async function postFollowRequestsUserIdReject(params: { path: { userId: string } }) {
  return await client['follow-requests'][':userId'].reject.$post({ param: params.path })
}

/**
 * POST /users/{userId}/block
 *
 * ブロック
 */
export async function postUsersUserIdBlock(params: { path: { userId: string } }) {
  return await client.users[':userId'].block.$post({ param: params.path })
}

/**
 * DELETE /users/{userId}/block
 *
 * ブロック解除
 */
export async function deleteUsersUserIdBlock(params: { path: { userId: string } }) {
  return await client.users[':userId'].block.$delete({ param: params.path })
}

/**
 * POST /users/{userId}/mute
 *
 * ミュート
 */
export async function postUsersUserIdMute(
  params: { path: { userId: string } },
  body: { duration?: number; notifications?: boolean },
) {
  return await client.users[':userId'].mute.$post({ param: params.path, json: body })
}

/**
 * DELETE /users/{userId}/mute
 *
 * ミュート解除
 */
export async function deleteUsersUserIdMute(params: { path: { userId: string } }) {
  return await client.users[':userId'].mute.$delete({ param: params.path })
}

/**
 * GET /blocks
 *
 * ブロックユーザー一覧
 */
export async function getBlocks(params: { query: { cursor: string; limit: number } }) {
  return await client.blocks.$get({ query: params.query })
}

/**
 * GET /mutes
 *
 * ミュートユーザー一覧
 */
export async function getMutes(params: { query: { cursor: string; limit: number } }) {
  return await client.mutes.$get({ query: params.query })
}

/**
 * GET /lists
 *
 * リスト一覧取得
 */
export async function getLists() {
  return await client.lists.$get()
}

/**
 * POST /lists
 *
 * リスト作成
 */
export async function postLists(body: { name: string; description?: string; isPrivate?: boolean }) {
  return await client.lists.$post({ json: body })
}

/**
 * GET /lists/{listId}
 *
 * リスト詳細取得
 */
export async function getListsListId(params: { path: { listId: string } }) {
  return await client.lists[':listId'].$get({ param: params.path })
}

/**
 * PUT /lists/{listId}
 *
 * リスト更新
 */
export async function putListsListId(
  params: { path: { listId: string } },
  body: { name?: string; description?: string; isPrivate?: boolean },
) {
  return await client.lists[':listId'].$put({ param: params.path, json: body })
}

/**
 * DELETE /lists/{listId}
 *
 * リスト削除
 */
export async function deleteListsListId(params: { path: { listId: string } }) {
  return await client.lists[':listId'].$delete({ param: params.path })
}

/**
 * GET /lists/{listId}/members
 *
 * リストメンバー一覧
 */
export async function getListsListIdMembers(params: {
  path: { listId: string }
  query: { cursor: string; limit: number }
}) {
  return await client.lists[':listId'].members.$get({ param: params.path, query: params.query })
}

/**
 * POST /lists/{listId}/members
 *
 * リストにメンバー追加
 */
export async function postListsListIdMembers(
  params: { path: { listId: string } },
  body: { userId: string },
) {
  return await client.lists[':listId'].members.$post({ param: params.path, json: body })
}

/**
 * DELETE /lists/{listId}/members/{userId}
 *
 * リストからメンバー削除
 */
export async function deleteListsListIdMembersUserId(params: {
  path: { listId: string; userId: string }
}) {
  return await client.lists[':listId'].members[':userId'].$delete({ param: params.path })
}

/**
 * GET /lists/{listId}/timeline
 *
 * リストタイムライン取得
 */
export async function getListsListIdTimeline(params: {
  path: { listId: string }
  query: { cursor: string; limit: number }
}) {
  return await client.lists[':listId'].timeline.$get({ param: params.path, query: params.query })
}

/**
 * GET /users/{userId}/lists
 *
 * ユーザーが所属するリスト一覧
 */
export async function getUsersUserIdLists(params: {
  path: { userId: string }
  query: { cursor: string; limit: number }
}) {
  return await client.users[':userId'].lists.$get({ param: params.path, query: params.query })
}
