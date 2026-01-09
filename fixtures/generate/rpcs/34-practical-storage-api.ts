import { client } from '../clients/34-practical-storage-api'

/**
 * GET /files
 *
 * ファイル一覧取得
 */
export async function getFiles(arg: {
  query: {
    folderId?: string
    search?: string
    type?: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
    sort?: 'name:asc' | 'name:desc' | 'size:asc' | 'size:desc' | 'updatedAt:desc' | 'updatedAt:asc'
    page?: number
    limit?: number
  }
}) {
  return await client.files.$get(arg)
}

/**
 * POST /files/upload
 *
 * ファイルアップロード
 */
export async function postFilesUpload(arg: {
  form: { file: File; folderId?: string; name?: string; overwrite?: boolean }
}) {
  return await client['files']['upload']['$post'](arg)
}

/**
 * POST /files/upload/multipart/init
 *
 * マルチパートアップロード開始
 *
 * 大容量ファイルの分割アップロードを開始します
 */
export async function postFilesUploadMultipartInit(arg: {
  json: { filename: string; size: number; folderId?: string; contentType?: string }
}) {
  return await client['files']['upload']['multipart']['init']['$post'](arg)
}

/**
 * POST /files/upload/multipart/{uploadId}/part
 *
 * パートアップロード
 */
export async function postFilesUploadMultipartUploadIdPart(arg: {
  param: { uploadId: string }
  query: { partNumber: number }
  json: File
}) {
  return await client['files']['upload']['multipart'][':uploadId']['part']['$post'](arg)
}

/**
 * POST /files/upload/multipart/{uploadId}/complete
 *
 * マルチパートアップロード完了
 */
export async function postFilesUploadMultipartUploadIdComplete(arg: {
  param: { uploadId: string }
  json: { parts: { partNumber: number; etag: string }[] }
}) {
  return await client['files']['upload']['multipart'][':uploadId']['complete']['$post'](arg)
}

/**
 * GET /files/{fileId}
 *
 * ファイル情報取得
 */
export async function getFilesFileId(arg: { param: { fileId: string } }) {
  return await client['files'][':fileId']['$get'](arg)
}

/**
 * DELETE /files/{fileId}
 *
 * ファイル削除（ゴミ箱へ移動）
 */
export async function deleteFilesFileId(arg: { param: { fileId: string } }) {
  return await client['files'][':fileId']['$delete'](arg)
}

/**
 * PATCH /files/{fileId}
 *
 * ファイル情報更新
 */
export async function patchFilesFileId(arg: {
  param: { fileId: string }
  json: { name?: string; description?: string }
}) {
  return await client['files'][':fileId']['$patch'](arg)
}

/**
 * GET /files/{fileId}/download
 *
 * ファイルダウンロード
 */
export async function getFilesFileIdDownload(arg: { param: { fileId: string } }) {
  return await client['files'][':fileId']['download']['$get'](arg)
}

/**
 * GET /files/{fileId}/download-url
 *
 * 署名付きダウンロードURL取得
 */
export async function getFilesFileIdDownloadUrl(arg: {
  param: { fileId: string }
  query: { expiresIn?: number }
}) {
  return await client['files'][':fileId']['download-url']['$get'](arg)
}

/**
 * POST /files/{fileId}/copy
 *
 * ファイルコピー
 */
export async function postFilesFileIdCopy(arg: {
  param: { fileId: string }
  json: { destinationFolderId: string; name?: string }
}) {
  return await client['files'][':fileId']['copy']['$post'](arg)
}

/**
 * POST /files/{fileId}/move
 *
 * ファイル移動
 */
export async function postFilesFileIdMove(arg: {
  param: { fileId: string }
  json: { destinationFolderId: string }
}) {
  return await client['files'][':fileId']['move']['$post'](arg)
}

/**
 * GET /files/{fileId}/thumbnail
 *
 * サムネイル取得
 */
export async function getFilesFileIdThumbnail(arg: {
  param: { fileId: string }
  query: { size?: 'small' | 'medium' | 'large' }
}) {
  return await client['files'][':fileId']['thumbnail']['$get'](arg)
}

/**
 * POST /folders
 *
 * フォルダ作成
 */
export async function postFolders(arg: {
  json: { name: string; parentId?: string; color?: string }
}) {
  return await client.folders.$post(arg)
}

/**
 * GET /folders/{folderId}
 *
 * フォルダ情報取得
 */
export async function getFoldersFolderId(arg: { param: { folderId: string } }) {
  return await client['folders'][':folderId']['$get'](arg)
}

/**
 * DELETE /folders/{folderId}
 *
 * フォルダ削除
 */
export async function deleteFoldersFolderId(arg: { param: { folderId: string } }) {
  return await client['folders'][':folderId']['$delete'](arg)
}

/**
 * PATCH /folders/{folderId}
 *
 * フォルダ情報更新
 */
export async function patchFoldersFolderId(arg: {
  param: { folderId: string }
  json: { name?: string; color?: string }
}) {
  return await client['folders'][':folderId']['$patch'](arg)
}

/**
 * GET /files/{fileId}/share
 *
 * 共有設定取得
 */
export async function getFilesFileIdShare(arg: { param: { fileId: string } }) {
  return await client['files'][':fileId']['share']['$get'](arg)
}

/**
 * POST /files/{fileId}/share
 *
 * ファイル共有
 */
export async function postFilesFileIdShare(arg: {
  param: { fileId: string }
  json: {
    collaborators?: { email: string; permission: 'viewer' | 'editor' }[]
    message?: string
    notifyByEmail?: boolean
  }
}) {
  return await client['files'][':fileId']['share']['$post'](arg)
}

/**
 * DELETE /files/{fileId}/share
 *
 * 共有解除
 */
export async function deleteFilesFileIdShare(arg: { param: { fileId: string } }) {
  return await client['files'][':fileId']['share']['$delete'](arg)
}

/**
 * POST /files/{fileId}/share/link
 *
 * 共有リンク作成
 */
export async function postFilesFileIdShareLink(arg: {
  param: { fileId: string }
  json: { password?: string; expiresAt?: string; allowDownload?: boolean }
}) {
  return await client['files'][':fileId']['share']['link']['$post'](arg)
}

/**
 * GET /files/{fileId}/versions
 *
 * バージョン一覧取得
 */
export async function getFilesFileIdVersions(arg: { param: { fileId: string } }) {
  return await client['files'][':fileId']['versions']['$get'](arg)
}

/**
 * POST /files/{fileId}/versions/{versionId}/restore
 *
 * バージョン復元
 */
export async function postFilesFileIdVersionsVersionIdRestore(arg: {
  param: { fileId: string; versionId: string }
}) {
  return await client['files'][':fileId']['versions'][':versionId']['restore']['$post'](arg)
}

/**
 * GET /trash
 *
 * ゴミ箱一覧取得
 */
export async function getTrash(arg: { query: { page?: number; limit?: number } }) {
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
export async function postTrashFileIdRestore(arg: { param: { fileId: string } }) {
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
