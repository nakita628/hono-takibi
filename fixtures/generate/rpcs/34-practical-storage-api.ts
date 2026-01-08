import type { InferRequestType } from 'hono/client'
import { client } from '../clients/34-practical-storage-api'

/**
 * GET /files
 *
 * ファイル一覧取得
 */
export async function getFiles(arg: InferRequestType<typeof client.files.$get>) {
  return await client.files.$get(arg)
}

/**
 * POST /files/upload
 *
 * ファイルアップロード
 */
export async function postFilesUpload(
  arg: InferRequestType<(typeof client)['files']['upload']['$post']>,
) {
  return await client['files']['upload']['$post'](arg)
}

/**
 * POST /files/upload/multipart/init
 *
 * マルチパートアップロード開始
 *
 * 大容量ファイルの分割アップロードを開始します
 */
export async function postFilesUploadMultipartInit(
  arg: InferRequestType<(typeof client)['files']['upload']['multipart']['init']['$post']>,
) {
  return await client['files']['upload']['multipart']['init']['$post'](arg)
}

/**
 * POST /files/upload/multipart/{uploadId}/part
 *
 * パートアップロード
 */
export async function postFilesUploadMultipartUploadIdPart(
  arg: InferRequestType<
    (typeof client)['files']['upload']['multipart'][':uploadId']['part']['$post']
  >,
) {
  return await client['files']['upload']['multipart'][':uploadId']['part']['$post'](arg)
}

/**
 * POST /files/upload/multipart/{uploadId}/complete
 *
 * マルチパートアップロード完了
 */
export async function postFilesUploadMultipartUploadIdComplete(
  arg: InferRequestType<
    (typeof client)['files']['upload']['multipart'][':uploadId']['complete']['$post']
  >,
) {
  return await client['files']['upload']['multipart'][':uploadId']['complete']['$post'](arg)
}

/**
 * GET /files/{fileId}
 *
 * ファイル情報取得
 */
export async function getFilesFileId(
  arg: InferRequestType<(typeof client)['files'][':fileId']['$get']>,
) {
  return await client['files'][':fileId']['$get'](arg)
}

/**
 * DELETE /files/{fileId}
 *
 * ファイル削除（ゴミ箱へ移動）
 */
export async function deleteFilesFileId(
  arg: InferRequestType<(typeof client)['files'][':fileId']['$delete']>,
) {
  return await client['files'][':fileId']['$delete'](arg)
}

/**
 * PATCH /files/{fileId}
 *
 * ファイル情報更新
 */
export async function patchFilesFileId(
  arg: InferRequestType<(typeof client)['files'][':fileId']['$patch']>,
) {
  return await client['files'][':fileId']['$patch'](arg)
}

/**
 * GET /files/{fileId}/download
 *
 * ファイルダウンロード
 */
export async function getFilesFileIdDownload(
  arg: InferRequestType<(typeof client)['files'][':fileId']['download']['$get']>,
) {
  return await client['files'][':fileId']['download']['$get'](arg)
}

/**
 * GET /files/{fileId}/download-url
 *
 * 署名付きダウンロードURL取得
 */
export async function getFilesFileIdDownloadUrl(
  arg: InferRequestType<(typeof client)['files'][':fileId']['download-url']['$get']>,
) {
  return await client['files'][':fileId']['download-url']['$get'](arg)
}

/**
 * POST /files/{fileId}/copy
 *
 * ファイルコピー
 */
export async function postFilesFileIdCopy(
  arg: InferRequestType<(typeof client)['files'][':fileId']['copy']['$post']>,
) {
  return await client['files'][':fileId']['copy']['$post'](arg)
}

/**
 * POST /files/{fileId}/move
 *
 * ファイル移動
 */
export async function postFilesFileIdMove(
  arg: InferRequestType<(typeof client)['files'][':fileId']['move']['$post']>,
) {
  return await client['files'][':fileId']['move']['$post'](arg)
}

/**
 * GET /files/{fileId}/thumbnail
 *
 * サムネイル取得
 */
export async function getFilesFileIdThumbnail(
  arg: InferRequestType<(typeof client)['files'][':fileId']['thumbnail']['$get']>,
) {
  return await client['files'][':fileId']['thumbnail']['$get'](arg)
}

/**
 * POST /folders
 *
 * フォルダ作成
 */
export async function postFolders(arg: InferRequestType<typeof client.folders.$post>) {
  return await client.folders.$post(arg)
}

/**
 * GET /folders/{folderId}
 *
 * フォルダ情報取得
 */
export async function getFoldersFolderId(
  arg: InferRequestType<(typeof client)['folders'][':folderId']['$get']>,
) {
  return await client['folders'][':folderId']['$get'](arg)
}

/**
 * DELETE /folders/{folderId}
 *
 * フォルダ削除
 */
export async function deleteFoldersFolderId(
  arg: InferRequestType<(typeof client)['folders'][':folderId']['$delete']>,
) {
  return await client['folders'][':folderId']['$delete'](arg)
}

/**
 * PATCH /folders/{folderId}
 *
 * フォルダ情報更新
 */
export async function patchFoldersFolderId(
  arg: InferRequestType<(typeof client)['folders'][':folderId']['$patch']>,
) {
  return await client['folders'][':folderId']['$patch'](arg)
}

/**
 * GET /files/{fileId}/share
 *
 * 共有設定取得
 */
export async function getFilesFileIdShare(
  arg: InferRequestType<(typeof client)['files'][':fileId']['share']['$get']>,
) {
  return await client['files'][':fileId']['share']['$get'](arg)
}

/**
 * POST /files/{fileId}/share
 *
 * ファイル共有
 */
export async function postFilesFileIdShare(
  arg: InferRequestType<(typeof client)['files'][':fileId']['share']['$post']>,
) {
  return await client['files'][':fileId']['share']['$post'](arg)
}

/**
 * DELETE /files/{fileId}/share
 *
 * 共有解除
 */
export async function deleteFilesFileIdShare(
  arg: InferRequestType<(typeof client)['files'][':fileId']['share']['$delete']>,
) {
  return await client['files'][':fileId']['share']['$delete'](arg)
}

/**
 * POST /files/{fileId}/share/link
 *
 * 共有リンク作成
 */
export async function postFilesFileIdShareLink(
  arg: InferRequestType<(typeof client)['files'][':fileId']['share']['link']['$post']>,
) {
  return await client['files'][':fileId']['share']['link']['$post'](arg)
}

/**
 * GET /files/{fileId}/versions
 *
 * バージョン一覧取得
 */
export async function getFilesFileIdVersions(
  arg: InferRequestType<(typeof client)['files'][':fileId']['versions']['$get']>,
) {
  return await client['files'][':fileId']['versions']['$get'](arg)
}

/**
 * POST /files/{fileId}/versions/{versionId}/restore
 *
 * バージョン復元
 */
export async function postFilesFileIdVersionsVersionIdRestore(
  arg: InferRequestType<
    (typeof client)['files'][':fileId']['versions'][':versionId']['restore']['$post']
  >,
) {
  return await client['files'][':fileId']['versions'][':versionId']['restore']['$post'](arg)
}

/**
 * GET /trash
 *
 * ゴミ箱一覧取得
 */
export async function getTrash(arg: InferRequestType<typeof client.trash.$get>) {
  return await client.trash.$get(arg)
}

/**
 * DELETE /trash
 *
 * ゴミ箱を空にする
 */
export async function deleteTrash() {
  return await client.trash.$delete()
}

/**
 * POST /trash/{fileId}/restore
 *
 * ゴミ箱から復元
 */
export async function postTrashFileIdRestore(
  arg: InferRequestType<(typeof client)['trash'][':fileId']['restore']['$post']>,
) {
  return await client['trash'][':fileId']['restore']['$post'](arg)
}

/**
 * GET /storage/usage
 *
 * ストレージ使用量取得
 */
export async function getStorageUsage() {
  return await client['storage']['usage']['$get']()
}
