import type { InferRequestType } from 'hono/client'
import { client } from '../clients/43-sns-users-relationships'

/**
 * GET /users/{userId}
 *
 * ユーザー情報取得
 */
export async function getUsersUserId(
  arg: InferRequestType<(typeof client)['users'][':userId']['$get']>,
) {
  return await client['users'][':userId']['$get'](arg)
}

/**
 * GET /users/by/username/{username}
 *
 * ユーザー名でユーザー取得
 */
export async function getUsersByUsernameUsername(
  arg: InferRequestType<(typeof client)['users']['by']['username'][':username']['$get']>,
) {
  return await client['users']['by']['username'][':username']['$get'](arg)
}

/**
 * GET /users/search
 *
 * ユーザー検索
 */
export async function getUsersSearch(
  arg: InferRequestType<(typeof client)['users']['search']['$get']>,
) {
  return await client['users']['search']['$get'](arg)
}

/**
 * GET /users/lookup
 *
 * 複数ユーザー一括取得
 */
export async function getUsersLookup(
  arg: InferRequestType<(typeof client)['users']['lookup']['$get']>,
) {
  return await client['users']['lookup']['$get'](arg)
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
export async function patchMe(arg: InferRequestType<typeof client.me.$patch>) {
  return await client.me.$patch(arg)
}

/**
 * POST /me/avatar
 *
 * アバターアップロード
 */
export async function postMeAvatar(
  arg: InferRequestType<(typeof client)['me']['avatar']['$post']>,
) {
  return await client['me']['avatar']['$post'](arg)
}

/**
 * DELETE /me/avatar
 *
 * アバター削除
 */
export async function deleteMeAvatar() {
  return await client['me']['avatar']['$delete']()
}

/**
 * POST /me/banner
 *
 * バナー画像アップロード
 */
export async function postMeBanner(
  arg: InferRequestType<(typeof client)['me']['banner']['$post']>,
) {
  return await client['me']['banner']['$post'](arg)
}

/**
 * DELETE /me/banner
 *
 * バナー画像削除
 */
export async function deleteMeBanner() {
  return await client['me']['banner']['$delete']()
}

/**
 * POST /users/{userId}/follow
 *
 * フォロー
 */
export async function postUsersUserIdFollow(
  arg: InferRequestType<(typeof client)['users'][':userId']['follow']['$post']>,
) {
  return await client['users'][':userId']['follow']['$post'](arg)
}

/**
 * DELETE /users/{userId}/follow
 *
 * フォロー解除
 */
export async function deleteUsersUserIdFollow(
  arg: InferRequestType<(typeof client)['users'][':userId']['follow']['$delete']>,
) {
  return await client['users'][':userId']['follow']['$delete'](arg)
}

/**
 * GET /users/{userId}/followers
 *
 * フォロワー一覧取得
 */
export async function getUsersUserIdFollowers(
  arg: InferRequestType<(typeof client)['users'][':userId']['followers']['$get']>,
) {
  return await client['users'][':userId']['followers']['$get'](arg)
}

/**
 * GET /users/{userId}/following
 *
 * フォロー中一覧取得
 */
export async function getUsersUserIdFollowing(
  arg: InferRequestType<(typeof client)['users'][':userId']['following']['$get']>,
) {
  return await client['users'][':userId']['following']['$get'](arg)
}

/**
 * POST /users/{userId}/followers/remove
 *
 * フォロワー削除
 *
 * 自分のフォロワーから削除
 */
export async function postUsersUserIdFollowersRemove(
  arg: InferRequestType<(typeof client)['users'][':userId']['followers']['remove']['$post']>,
) {
  return await client['users'][':userId']['followers']['remove']['$post'](arg)
}

/**
 * GET /relationships
 *
 * 関係性一括取得
 */
export async function getRelationships(arg: InferRequestType<typeof client.relationships.$get>) {
  return await client.relationships.$get(arg)
}

/**
 * GET /follow-requests
 *
 * フォローリクエスト一覧
 *
 * 非公開アカウントへのフォローリクエスト
 */
export async function getFollowRequests(
  arg: InferRequestType<(typeof client)['follow-requests']['$get']>,
) {
  return await client['follow-requests']['$get'](arg)
}

/**
 * POST /follow-requests/{userId}/accept
 *
 * フォローリクエスト承認
 */
export async function postFollowRequestsUserIdAccept(
  arg: InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>,
) {
  return await client['follow-requests'][':userId']['accept']['$post'](arg)
}

/**
 * POST /follow-requests/{userId}/reject
 *
 * フォローリクエスト拒否
 */
export async function postFollowRequestsUserIdReject(
  arg: InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>,
) {
  return await client['follow-requests'][':userId']['reject']['$post'](arg)
}

/**
 * POST /users/{userId}/block
 *
 * ブロック
 */
export async function postUsersUserIdBlock(
  arg: InferRequestType<(typeof client)['users'][':userId']['block']['$post']>,
) {
  return await client['users'][':userId']['block']['$post'](arg)
}

/**
 * DELETE /users/{userId}/block
 *
 * ブロック解除
 */
export async function deleteUsersUserIdBlock(
  arg: InferRequestType<(typeof client)['users'][':userId']['block']['$delete']>,
) {
  return await client['users'][':userId']['block']['$delete'](arg)
}

/**
 * POST /users/{userId}/mute
 *
 * ミュート
 */
export async function postUsersUserIdMute(
  arg: InferRequestType<(typeof client)['users'][':userId']['mute']['$post']>,
) {
  return await client['users'][':userId']['mute']['$post'](arg)
}

/**
 * DELETE /users/{userId}/mute
 *
 * ミュート解除
 */
export async function deleteUsersUserIdMute(
  arg: InferRequestType<(typeof client)['users'][':userId']['mute']['$delete']>,
) {
  return await client['users'][':userId']['mute']['$delete'](arg)
}

/**
 * GET /blocks
 *
 * ブロックユーザー一覧
 */
export async function getBlocks(arg: InferRequestType<typeof client.blocks.$get>) {
  return await client.blocks.$get(arg)
}

/**
 * GET /mutes
 *
 * ミュートユーザー一覧
 */
export async function getMutes(arg: InferRequestType<typeof client.mutes.$get>) {
  return await client.mutes.$get(arg)
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
export async function postLists(arg: InferRequestType<typeof client.lists.$post>) {
  return await client.lists.$post(arg)
}

/**
 * GET /lists/{listId}
 *
 * リスト詳細取得
 */
export async function getListsListId(
  arg: InferRequestType<(typeof client)['lists'][':listId']['$get']>,
) {
  return await client['lists'][':listId']['$get'](arg)
}

/**
 * PUT /lists/{listId}
 *
 * リスト更新
 */
export async function putListsListId(
  arg: InferRequestType<(typeof client)['lists'][':listId']['$put']>,
) {
  return await client['lists'][':listId']['$put'](arg)
}

/**
 * DELETE /lists/{listId}
 *
 * リスト削除
 */
export async function deleteListsListId(
  arg: InferRequestType<(typeof client)['lists'][':listId']['$delete']>,
) {
  return await client['lists'][':listId']['$delete'](arg)
}

/**
 * GET /lists/{listId}/members
 *
 * リストメンバー一覧
 */
export async function getListsListIdMembers(
  arg: InferRequestType<(typeof client)['lists'][':listId']['members']['$get']>,
) {
  return await client['lists'][':listId']['members']['$get'](arg)
}

/**
 * POST /lists/{listId}/members
 *
 * リストにメンバー追加
 */
export async function postListsListIdMembers(
  arg: InferRequestType<(typeof client)['lists'][':listId']['members']['$post']>,
) {
  return await client['lists'][':listId']['members']['$post'](arg)
}

/**
 * DELETE /lists/{listId}/members/{userId}
 *
 * リストからメンバー削除
 */
export async function deleteListsListIdMembersUserId(
  arg: InferRequestType<(typeof client)['lists'][':listId']['members'][':userId']['$delete']>,
) {
  return await client['lists'][':listId']['members'][':userId']['$delete'](arg)
}

/**
 * GET /lists/{listId}/timeline
 *
 * リストタイムライン取得
 */
export async function getListsListIdTimeline(
  arg: InferRequestType<(typeof client)['lists'][':listId']['timeline']['$get']>,
) {
  return await client['lists'][':listId']['timeline']['$get'](arg)
}

/**
 * GET /users/{userId}/lists
 *
 * ユーザーが所属するリスト一覧
 */
export async function getUsersUserIdLists(
  arg: InferRequestType<(typeof client)['users'][':userId']['lists']['$get']>,
) {
  return await client['users'][':userId']['lists']['$get'](arg)
}
