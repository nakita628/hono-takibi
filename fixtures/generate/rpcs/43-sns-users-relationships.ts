import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from '../clients/43-sns-users-relationships'

/**
 * GET /users/{userId}
 *
 * ユーザー情報取得
 */
export async function getUsersUserId(
  args: InferRequestType<(typeof client.users)[':userId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].$get(args, options)
}

/**
 * GET /users/by/username/{username}
 *
 * ユーザー名でユーザー取得
 */
export async function getUsersByUsernameUsername(
  args: InferRequestType<(typeof client.users.by.username)[':username']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users.by.username[':username'].$get(args, options)
}

/**
 * GET /users/search
 *
 * ユーザー検索
 */
export async function getUsersSearch(
  args: InferRequestType<typeof client.users.search.$get>,
  options?: ClientRequestOptions,
) {
  return await client.users.search.$get(args, options)
}

/**
 * GET /users/lookup
 *
 * 複数ユーザー一括取得
 */
export async function getUsersLookup(
  args: InferRequestType<typeof client.users.lookup.$get>,
  options?: ClientRequestOptions,
) {
  return await client.users.lookup.$get(args, options)
}

/**
 * GET /me
 *
 * 現在のユーザー情報取得
 */
export async function getMe(options?: ClientRequestOptions) {
  return await client.me.$get(undefined, options)
}

/**
 * PATCH /me
 *
 * プロフィール更新
 */
export async function patchMe(
  args: InferRequestType<typeof client.me.$patch>,
  options?: ClientRequestOptions,
) {
  return await client.me.$patch(args, options)
}

/**
 * POST /me/avatar
 *
 * アバターアップロード
 */
export async function postMeAvatar(
  args: InferRequestType<typeof client.me.avatar.$post>,
  options?: ClientRequestOptions,
) {
  return await client.me.avatar.$post(args, options)
}

/**
 * DELETE /me/avatar
 *
 * アバター削除
 */
export async function deleteMeAvatar(options?: ClientRequestOptions) {
  return await client.me.avatar.$delete(undefined, options)
}

/**
 * POST /me/banner
 *
 * バナー画像アップロード
 */
export async function postMeBanner(
  args: InferRequestType<typeof client.me.banner.$post>,
  options?: ClientRequestOptions,
) {
  return await client.me.banner.$post(args, options)
}

/**
 * DELETE /me/banner
 *
 * バナー画像削除
 */
export async function deleteMeBanner(options?: ClientRequestOptions) {
  return await client.me.banner.$delete(undefined, options)
}

/**
 * POST /users/{userId}/follow
 *
 * フォロー
 */
export async function postUsersUserIdFollow(
  args: InferRequestType<(typeof client.users)[':userId']['follow']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].follow.$post(args, options)
}

/**
 * DELETE /users/{userId}/follow
 *
 * フォロー解除
 */
export async function deleteUsersUserIdFollow(
  args: InferRequestType<(typeof client.users)[':userId']['follow']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].follow.$delete(args, options)
}

/**
 * GET /users/{userId}/followers
 *
 * フォロワー一覧取得
 */
export async function getUsersUserIdFollowers(
  args: InferRequestType<(typeof client.users)[':userId']['followers']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].followers.$get(args, options)
}

/**
 * GET /users/{userId}/following
 *
 * フォロー中一覧取得
 */
export async function getUsersUserIdFollowing(
  args: InferRequestType<(typeof client.users)[':userId']['following']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].following.$get(args, options)
}

/**
 * POST /users/{userId}/followers/remove
 *
 * フォロワー削除
 *
 * 自分のフォロワーから削除
 */
export async function postUsersUserIdFollowersRemove(
  args: InferRequestType<(typeof client.users)[':userId']['followers']['remove']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].followers.remove.$post(args, options)
}

/**
 * GET /relationships
 *
 * 関係性一括取得
 */
export async function getRelationships(
  args: InferRequestType<typeof client.relationships.$get>,
  options?: ClientRequestOptions,
) {
  return await client.relationships.$get(args, options)
}

/**
 * GET /follow-requests
 *
 * フォローリクエスト一覧
 *
 * 非公開アカウントへのフォローリクエスト
 */
export async function getFollowRequests(
  args: InferRequestType<(typeof client)['follow-requests']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client['follow-requests'].$get(args, options)
}

/**
 * POST /follow-requests/{userId}/accept
 *
 * フォローリクエスト承認
 */
export async function postFollowRequestsUserIdAccept(
  args: InferRequestType<(typeof client)['follow-requests'][':userId']['accept']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['follow-requests'][':userId'].accept.$post(args, options)
}

/**
 * POST /follow-requests/{userId}/reject
 *
 * フォローリクエスト拒否
 */
export async function postFollowRequestsUserIdReject(
  args: InferRequestType<(typeof client)['follow-requests'][':userId']['reject']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client['follow-requests'][':userId'].reject.$post(args, options)
}

/**
 * POST /users/{userId}/block
 *
 * ブロック
 */
export async function postUsersUserIdBlock(
  args: InferRequestType<(typeof client.users)[':userId']['block']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].block.$post(args, options)
}

/**
 * DELETE /users/{userId}/block
 *
 * ブロック解除
 */
export async function deleteUsersUserIdBlock(
  args: InferRequestType<(typeof client.users)[':userId']['block']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].block.$delete(args, options)
}

/**
 * POST /users/{userId}/mute
 *
 * ミュート
 */
export async function postUsersUserIdMute(
  args: InferRequestType<(typeof client.users)[':userId']['mute']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].mute.$post(args, options)
}

/**
 * DELETE /users/{userId}/mute
 *
 * ミュート解除
 */
export async function deleteUsersUserIdMute(
  args: InferRequestType<(typeof client.users)[':userId']['mute']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].mute.$delete(args, options)
}

/**
 * GET /blocks
 *
 * ブロックユーザー一覧
 */
export async function getBlocks(
  args: InferRequestType<typeof client.blocks.$get>,
  options?: ClientRequestOptions,
) {
  return await client.blocks.$get(args, options)
}

/**
 * GET /mutes
 *
 * ミュートユーザー一覧
 */
export async function getMutes(
  args: InferRequestType<typeof client.mutes.$get>,
  options?: ClientRequestOptions,
) {
  return await client.mutes.$get(args, options)
}

/**
 * GET /lists
 *
 * リスト一覧取得
 */
export async function getLists(options?: ClientRequestOptions) {
  return await client.lists.$get(undefined, options)
}

/**
 * POST /lists
 *
 * リスト作成
 */
export async function postLists(
  args: InferRequestType<typeof client.lists.$post>,
  options?: ClientRequestOptions,
) {
  return await client.lists.$post(args, options)
}

/**
 * GET /lists/{listId}
 *
 * リスト詳細取得
 */
export async function getListsListId(
  args: InferRequestType<(typeof client.lists)[':listId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.lists[':listId'].$get(args, options)
}

/**
 * PUT /lists/{listId}
 *
 * リスト更新
 */
export async function putListsListId(
  args: InferRequestType<(typeof client.lists)[':listId']['$put']>,
  options?: ClientRequestOptions,
) {
  return await client.lists[':listId'].$put(args, options)
}

/**
 * DELETE /lists/{listId}
 *
 * リスト削除
 */
export async function deleteListsListId(
  args: InferRequestType<(typeof client.lists)[':listId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.lists[':listId'].$delete(args, options)
}

/**
 * GET /lists/{listId}/members
 *
 * リストメンバー一覧
 */
export async function getListsListIdMembers(
  args: InferRequestType<(typeof client.lists)[':listId']['members']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.lists[':listId'].members.$get(args, options)
}

/**
 * POST /lists/{listId}/members
 *
 * リストにメンバー追加
 */
export async function postListsListIdMembers(
  args: InferRequestType<(typeof client.lists)[':listId']['members']['$post']>,
  options?: ClientRequestOptions,
) {
  return await client.lists[':listId'].members.$post(args, options)
}

/**
 * DELETE /lists/{listId}/members/{userId}
 *
 * リストからメンバー削除
 */
export async function deleteListsListIdMembersUserId(
  args: InferRequestType<(typeof client.lists)[':listId']['members'][':userId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await client.lists[':listId'].members[':userId'].$delete(args, options)
}

/**
 * GET /lists/{listId}/timeline
 *
 * リストタイムライン取得
 */
export async function getListsListIdTimeline(
  args: InferRequestType<(typeof client.lists)[':listId']['timeline']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.lists[':listId'].timeline.$get(args, options)
}

/**
 * GET /users/{userId}/lists
 *
 * ユーザーが所属するリスト一覧
 */
export async function getUsersUserIdLists(
  args: InferRequestType<(typeof client.users)[':userId']['lists']['$get']>,
  options?: ClientRequestOptions,
) {
  return await client.users[':userId'].lists.$get(args, options)
}
