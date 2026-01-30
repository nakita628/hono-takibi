import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/34-practical-storage-api'

/**
 * GET /files
 *
 * ファイル一覧取得
 */
export async function getFiles(
  args: InferRequestType<typeof client.files.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files.$get(args, options))
}

/**
 * POST /files/upload
 *
 * ファイルアップロード
 */
export async function postFilesUpload(
  args: InferRequestType<typeof client.files.upload.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files.upload.$post(args, options))
}

/**
 * POST /files/upload/multipart/init
 *
 * マルチパートアップロード開始
 *
 * 大容量ファイルの分割アップロードを開始します
 */
export async function postFilesUploadMultipartInit(
  args: InferRequestType<typeof client.files.upload.multipart.init.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files.upload.multipart.init.$post(args, options))
}

/**
 * POST /files/upload/multipart/{uploadId}/part
 *
 * パートアップロード
 */
export async function postFilesUploadMultipartUploadIdPart(
  args: InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files.upload.multipart[':uploadId'].part.$post(args, options))
}

/**
 * POST /files/upload/multipart/{uploadId}/complete
 *
 * マルチパートアップロード完了
 */
export async function postFilesUploadMultipartUploadIdComplete(
  args: InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client.files.upload.multipart[':uploadId'].complete.$post(args, options),
  )
}

/**
 * GET /files/{fileId}
 *
 * ファイル情報取得
 */
export async function getFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files[':fileId'].$get(args, options))
}

/**
 * DELETE /files/{fileId}
 *
 * ファイル削除（ゴミ箱へ移動）
 */
export async function deleteFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files[':fileId'].$delete(args, options))
}

/**
 * PATCH /files/{fileId}
 *
 * ファイル情報更新
 */
export async function patchFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files[':fileId'].$patch(args, options))
}

/**
 * GET /files/{fileId}/download
 *
 * ファイルダウンロード
 */
export async function getFilesFileIdDownload(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files[':fileId'].download.$get(args, options))
}

/**
 * GET /files/{fileId}/download-url
 *
 * 署名付きダウンロードURL取得
 */
export async function getFilesFileIdDownloadUrl(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files[':fileId']['download-url'].$get(args, options))
}

/**
 * POST /files/{fileId}/copy
 *
 * ファイルコピー
 */
export async function postFilesFileIdCopy(
  args: InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files[':fileId'].copy.$post(args, options))
}

/**
 * POST /files/{fileId}/move
 *
 * ファイル移動
 */
export async function postFilesFileIdMove(
  args: InferRequestType<(typeof client.files)[':fileId']['move']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files[':fileId'].move.$post(args, options))
}

/**
 * GET /files/{fileId}/thumbnail
 *
 * サムネイル取得
 */
export async function getFilesFileIdThumbnail(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files[':fileId'].thumbnail.$get(args, options))
}

/**
 * POST /folders
 *
 * フォルダ作成
 */
export async function postFolders(
  args: InferRequestType<typeof client.folders.$post>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.folders.$post(args, options))
}

/**
 * GET /folders/{folderId}
 *
 * フォルダ情報取得
 */
export async function getFoldersFolderId(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.folders[':folderId'].$get(args, options))
}

/**
 * DELETE /folders/{folderId}
 *
 * フォルダ削除
 */
export async function deleteFoldersFolderId(
  args: InferRequestType<(typeof client.folders)[':folderId']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.folders[':folderId'].$delete(args, options))
}

/**
 * PATCH /folders/{folderId}
 *
 * フォルダ情報更新
 */
export async function patchFoldersFolderId(
  args: InferRequestType<(typeof client.folders)[':folderId']['$patch']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.folders[':folderId'].$patch(args, options))
}

/**
 * GET /files/{fileId}/share
 *
 * 共有設定取得
 */
export async function getFilesFileIdShare(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files[':fileId'].share.$get(args, options))
}

/**
 * POST /files/{fileId}/share
 *
 * ファイル共有
 */
export async function postFilesFileIdShare(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files[':fileId'].share.$post(args, options))
}

/**
 * DELETE /files/{fileId}/share
 *
 * 共有解除
 */
export async function deleteFilesFileIdShare(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files[':fileId'].share.$delete(args, options))
}

/**
 * POST /files/{fileId}/share/link
 *
 * 共有リンク作成
 */
export async function postFilesFileIdShareLink(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files[':fileId'].share.link.$post(args, options))
}

/**
 * GET /files/{fileId}/versions
 *
 * バージョン一覧取得
 */
export async function getFilesFileIdVersions(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.files[':fileId'].versions.$get(args, options))
}

/**
 * POST /files/{fileId}/versions/{versionId}/restore
 *
 * バージョン復元
 */
export async function postFilesFileIdVersionsVersionIdRestore(
  args: InferRequestType<
    (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client.files[':fileId'].versions[':versionId'].restore.$post(args, options),
  )
}

/**
 * GET /trash
 *
 * ゴミ箱一覧取得
 */
export async function getTrash(
  args: InferRequestType<typeof client.trash.$get>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.trash.$get(args, options))
}

/**
 * DELETE /trash
 *
 * ゴミ箱を空にする
 */
export async function deleteTrash(options?: ClientRequestOptions) {
  return await parseResponse(client.trash.$delete(undefined, options))
}

/**
 * POST /trash/{fileId}/restore
 *
 * ゴミ箱から復元
 */
export async function postTrashFileIdRestore(
  args: InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>,
  options?: ClientRequestOptions,
) {
  return await parseResponse(client.trash[':fileId'].restore.$post(args, options))
}

/**
 * GET /storage/usage
 *
 * ストレージ使用量取得
 */
export async function getStorageUsage(options?: ClientRequestOptions) {
  return await parseResponse(client.storage.usage.$get(undefined, options))
}
