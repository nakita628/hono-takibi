import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/43-sns-users-relationships'

/**
 * GET /users/{userId}
 *
 * ユーザー情報取得
 */
export async function getUsersUserId(args: {
  param: { userId: string }
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['$get'](args)
}

/**
 * GET /users/by/username/{username}
 *
 * ユーザー名でユーザー取得
 */
export async function getUsersByUsernameUsername(args: {
  param: { username: string }
  options?: ClientRequestOptions
}) {
  return await client['users']['by']['username'][':username']['$get'](args)
}

/**
 * GET /users/search
 *
 * ユーザー検索
 */
export async function getUsersSearch(args: {
  query: { q: string; cursor?: string; limit?: number }
  options?: ClientRequestOptions
}) {
  return await client['users']['search']['$get'](args)
}

/**
 * GET /users/lookup
 *
 * 複数ユーザー一括取得
 */
export async function getUsersLookup(args: {
  query: { ids?: string; usernames?: string }
  options?: ClientRequestOptions
}) {
  return await client['users']['lookup']['$get'](args)
}

/**
 * GET /me
 *
 * 現在のユーザー情報取得
 */
export async function getMe(args?: { options?: ClientRequestOptions }) {
  return await client.me.$get(args)
}

/**
 * PATCH /me
 *
 * プロフィール更新
 */
export async function patchMe(args: {
  json: {
    displayName?: string
    bio?: string
    location?: string
    website?: string
    birthDate?: string
    isProtected?: boolean
    pinnedPostId?: string
  }
  options?: ClientRequestOptions
}) {
  return await client.me.$patch(args)
}

/**
 * POST /me/avatar
 *
 * アバターアップロード
 */
export async function postMeAvatar(args: {
  form: { image: File }
  options?: ClientRequestOptions
}) {
  return await client['me']['avatar']['$post'](args)
}

/**
 * DELETE /me/avatar
 *
 * アバター削除
 */
export async function deleteMeAvatar(args?: { options?: ClientRequestOptions }) {
  return await client['me']['avatar']['$delete'](args)
}

/**
 * POST /me/banner
 *
 * バナー画像アップロード
 */
export async function postMeBanner(args: {
  form: { image: File }
  options?: ClientRequestOptions
}) {
  return await client['me']['banner']['$post'](args)
}

/**
 * DELETE /me/banner
 *
 * バナー画像削除
 */
export async function deleteMeBanner(args?: { options?: ClientRequestOptions }) {
  return await client['me']['banner']['$delete'](args)
}

/**
 * POST /users/{userId}/follow
 *
 * フォロー
 */
export async function postUsersUserIdFollow(args: {
  param: { userId: string }
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['follow']['$post'](args)
}

/**
 * DELETE /users/{userId}/follow
 *
 * フォロー解除
 */
export async function deleteUsersUserIdFollow(args: {
  param: { userId: string }
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['follow']['$delete'](args)
}

/**
 * GET /users/{userId}/followers
 *
 * フォロワー一覧取得
 */
export async function getUsersUserIdFollowers(args: {
  param: { userId: string }
  query: { cursor?: string; limit?: number }
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['followers']['$get'](args)
}

/**
 * GET /users/{userId}/following
 *
 * フォロー中一覧取得
 */
export async function getUsersUserIdFollowing(args: {
  param: { userId: string }
  query: { cursor?: string; limit?: number }
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['following']['$get'](args)
}

/**
 * POST /users/{userId}/followers/remove
 *
 * フォロワー削除
 *
 * 自分のフォロワーから削除
 */
export async function postUsersUserIdFollowersRemove(args: {
  param: { userId: string }
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['followers']['remove']['$post'](args)
}

/**
 * GET /relationships
 *
 * 関係性一括取得
 */
export async function getRelationships(args: {
  query: { userIds: string }
  options?: ClientRequestOptions
}) {
  return await client.relationships.$get(args)
}

/**
 * GET /follow-requests
 *
 * フォローリクエスト一覧
 *
 * 非公開アカウントへのフォローリクエスト
 */
export async function getFollowRequests(args: {
  query: { cursor?: string; limit?: number }
  options?: ClientRequestOptions
}) {
  return await client['follow-requests']['$get'](args)
}

/**
 * POST /follow-requests/{userId}/accept
 *
 * フォローリクエスト承認
 */
export async function postFollowRequestsUserIdAccept(args: {
  param: { userId: string }
  options?: ClientRequestOptions
}) {
  return await client['follow-requests'][':userId']['accept']['$post'](args)
}

/**
 * POST /follow-requests/{userId}/reject
 *
 * フォローリクエスト拒否
 */
export async function postFollowRequestsUserIdReject(args: {
  param: { userId: string }
  options?: ClientRequestOptions
}) {
  return await client['follow-requests'][':userId']['reject']['$post'](args)
}

/**
 * POST /users/{userId}/block
 *
 * ブロック
 */
export async function postUsersUserIdBlock(args: {
  param: { userId: string }
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['block']['$post'](args)
}

/**
 * DELETE /users/{userId}/block
 *
 * ブロック解除
 */
export async function deleteUsersUserIdBlock(args: {
  param: { userId: string }
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['block']['$delete'](args)
}

/**
 * POST /users/{userId}/mute
 *
 * ミュート
 */
export async function postUsersUserIdMute(args: {
  param: { userId: string }
  json: { duration?: number; notifications?: boolean }
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['mute']['$post'](args)
}

/**
 * DELETE /users/{userId}/mute
 *
 * ミュート解除
 */
export async function deleteUsersUserIdMute(args: {
  param: { userId: string }
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['mute']['$delete'](args)
}

/**
 * GET /blocks
 *
 * ブロックユーザー一覧
 */
export async function getBlocks(args: {
  query: { cursor?: string; limit?: number }
  options?: ClientRequestOptions
}) {
  return await client.blocks.$get(args)
}

/**
 * GET /mutes
 *
 * ミュートユーザー一覧
 */
export async function getMutes(args: {
  query: { cursor?: string; limit?: number }
  options?: ClientRequestOptions
}) {
  return await client.mutes.$get(args)
}

/**
 * GET /lists
 *
 * リスト一覧取得
 */
export async function getLists(args?: { options?: ClientRequestOptions }) {
  return await client.lists.$get(args)
}

/**
 * POST /lists
 *
 * リスト作成
 */
export async function postLists(args: {
  json: { name: string; description?: string; isPrivate?: boolean }
  options?: ClientRequestOptions
}) {
  return await client.lists.$post(args)
}

/**
 * GET /lists/{listId}
 *
 * リスト詳細取得
 */
export async function getListsListId(args: {
  param: { listId: string }
  options?: ClientRequestOptions
}) {
  return await client['lists'][':listId']['$get'](args)
}

/**
 * PUT /lists/{listId}
 *
 * リスト更新
 */
export async function putListsListId(args: {
  param: { listId: string }
  json: { name?: string; description?: string; isPrivate?: boolean }
  options?: ClientRequestOptions
}) {
  return await client['lists'][':listId']['$put'](args)
}

/**
 * DELETE /lists/{listId}
 *
 * リスト削除
 */
export async function deleteListsListId(args: {
  param: { listId: string }
  options?: ClientRequestOptions
}) {
  return await client['lists'][':listId']['$delete'](args)
}

/**
 * GET /lists/{listId}/members
 *
 * リストメンバー一覧
 */
export async function getListsListIdMembers(args: {
  param: { listId: string }
  query: { cursor?: string; limit?: number }
  options?: ClientRequestOptions
}) {
  return await client['lists'][':listId']['members']['$get'](args)
}

/**
 * POST /lists/{listId}/members
 *
 * リストにメンバー追加
 */
export async function postListsListIdMembers(args: {
  param: { listId: string }
  json: { userId: string }
  options?: ClientRequestOptions
}) {
  return await client['lists'][':listId']['members']['$post'](args)
}

/**
 * DELETE /lists/{listId}/members/{userId}
 *
 * リストからメンバー削除
 */
export async function deleteListsListIdMembersUserId(args: {
  param: { listId: string; userId: string }
  options?: ClientRequestOptions
}) {
  return await client['lists'][':listId']['members'][':userId']['$delete'](args)
}

/**
 * GET /lists/{listId}/timeline
 *
 * リストタイムライン取得
 */
export async function getListsListIdTimeline(args: {
  param: { listId: string }
  query: { cursor?: string; limit?: number }
  options?: ClientRequestOptions
}) {
  return await client['lists'][':listId']['timeline']['$get'](args)
}

/**
 * GET /users/{userId}/lists
 *
 * ユーザーが所属するリスト一覧
 */
export async function getUsersUserIdLists(args: {
  param: { userId: string }
  query: { cursor?: string; limit?: number }
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['lists']['$get'](args)
}
