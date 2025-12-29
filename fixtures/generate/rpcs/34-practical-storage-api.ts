import { client } from '../index.ts'

/**
 * GET /files
 *
 * ファイル一覧取得
 */
export async function getFiles(params: {
  query: {
    folderId: string
    search: string
    type: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
    sort: 'name:asc' | 'name:desc' | 'size:asc' | 'size:desc' | 'updatedAt:desc' | 'updatedAt:asc'
    page: number
    limit: number
  }
}) {
  return await client.files.$get({ query: params.query })
}

/**
 * POST /files/upload
 *
 * ファイルアップロード
 */
export async function postFilesUpload(body: {
  file: string
  folderId?: string
  name?: string
  overwrite?: boolean
}) {
  return await client.files.upload.$post({ json: body })
}

/**
 * POST /files/upload/multipart/init
 *
 * マルチパートアップロード開始
 *
 * 大容量ファイルの分割アップロードを開始します
 */
export async function postFilesUploadMultipartInit(body: {
  filename: string
  size: number
  folderId?: string
  contentType?: string
}) {
  return await client.files.upload.multipart.init.$post({ json: body })
}

/**
 * POST /files/upload/multipart/{uploadId}/part
 *
 * パートアップロード
 */
export async function postFilesUploadMultipartUploadIdPart(
  params: { path: { uploadId: string }; query: { partNumber: number } },
  body: string,
) {
  return await client.files.upload.multipart[':uploadId'].part.$post({
    param: params.path,
    query: params.query,
    json: body,
  })
}

/**
 * POST /files/upload/multipart/{uploadId}/complete
 *
 * マルチパートアップロード完了
 */
export async function postFilesUploadMultipartUploadIdComplete(
  params: { path: { uploadId: string } },
  body: { parts: { partNumber: number; etag: string }[] },
) {
  return await client.files.upload.multipart[':uploadId'].complete.$post({
    param: params.path,
    json: body,
  })
}

/**
 * GET /files/{fileId}
 *
 * ファイル情報取得
 */
export async function getFilesFileId(params: { path: { fileId: string } }) {
  return await client.files[':fileId'].$get({ param: params.path })
}

/**
 * DELETE /files/{fileId}
 *
 * ファイル削除（ゴミ箱へ移動）
 */
export async function deleteFilesFileId(params: { path: { fileId: string } }) {
  return await client.files[':fileId'].$delete({ param: params.path })
}

/**
 * PATCH /files/{fileId}
 *
 * ファイル情報更新
 */
export async function patchFilesFileId(
  params: { path: { fileId: string } },
  body: { name?: string; description?: string },
) {
  return await client.files[':fileId'].$patch({ param: params.path, json: body })
}

/**
 * GET /files/{fileId}/download
 *
 * ファイルダウンロード
 */
export async function getFilesFileIdDownload(params: { path: { fileId: string } }) {
  return await client.files[':fileId'].download.$get({ param: params.path })
}

/**
 * GET /files/{fileId}/download-url
 *
 * 署名付きダウンロードURL取得
 */
export async function getFilesFileIdDownloadUrl(params: {
  path: { fileId: string }
  query: { expiresIn: number }
}) {
  return await client.files[':fileId']['download-url'].$get({
    param: params.path,
    query: params.query,
  })
}

/**
 * POST /files/{fileId}/copy
 *
 * ファイルコピー
 */
export async function postFilesFileIdCopy(
  params: { path: { fileId: string } },
  body: { destinationFolderId: string; name?: string },
) {
  return await client.files[':fileId'].copy.$post({ param: params.path, json: body })
}

/**
 * POST /files/{fileId}/move
 *
 * ファイル移動
 */
export async function postFilesFileIdMove(
  params: { path: { fileId: string } },
  body: { destinationFolderId: string },
) {
  return await client.files[':fileId'].move.$post({ param: params.path, json: body })
}

/**
 * GET /files/{fileId}/thumbnail
 *
 * サムネイル取得
 */
export async function getFilesFileIdThumbnail(params: {
  path: { fileId: string }
  query: { size: 'small' | 'medium' | 'large' }
}) {
  return await client.files[':fileId'].thumbnail.$get({ param: params.path, query: params.query })
}

/**
 * POST /folders
 *
 * フォルダ作成
 */
export async function postFolders(body: { name: string; parentId?: string; color?: string }) {
  return await client.folders.$post({ json: body })
}

/**
 * GET /folders/{folderId}
 *
 * フォルダ情報取得
 */
export async function getFoldersFolderId(params: { path: { folderId: string } }) {
  return await client.folders[':folderId'].$get({ param: params.path })
}

/**
 * DELETE /folders/{folderId}
 *
 * フォルダ削除
 */
export async function deleteFoldersFolderId(params: { path: { folderId: string } }) {
  return await client.folders[':folderId'].$delete({ param: params.path })
}

/**
 * PATCH /folders/{folderId}
 *
 * フォルダ情報更新
 */
export async function patchFoldersFolderId(
  params: { path: { folderId: string } },
  body: { name?: string; color?: string },
) {
  return await client.folders[':folderId'].$patch({ param: params.path, json: body })
}

/**
 * GET /files/{fileId}/share
 *
 * 共有設定取得
 */
export async function getFilesFileIdShare(params: { path: { fileId: string } }) {
  return await client.files[':fileId'].share.$get({ param: params.path })
}

/**
 * POST /files/{fileId}/share
 *
 * ファイル共有
 */
export async function postFilesFileIdShare(
  params: { path: { fileId: string } },
  body: {
    collaborators?: { email: string; permission: 'viewer' | 'editor' }[]
    message?: string
    notifyByEmail?: boolean
  },
) {
  return await client.files[':fileId'].share.$post({ param: params.path, json: body })
}

/**
 * DELETE /files/{fileId}/share
 *
 * 共有解除
 */
export async function deleteFilesFileIdShare(params: { path: { fileId: string } }) {
  return await client.files[':fileId'].share.$delete({ param: params.path })
}

/**
 * POST /files/{fileId}/share/link
 *
 * 共有リンク作成
 */
export async function postFilesFileIdShareLink(
  params: { path: { fileId: string } },
  body: { password?: string; expiresAt?: string; allowDownload?: boolean },
) {
  return await client.files[':fileId'].share.link.$post({ param: params.path, json: body })
}

/**
 * GET /files/{fileId}/versions
 *
 * バージョン一覧取得
 */
export async function getFilesFileIdVersions(params: { path: { fileId: string } }) {
  return await client.files[':fileId'].versions.$get({ param: params.path })
}

/**
 * POST /files/{fileId}/versions/{versionId}/restore
 *
 * バージョン復元
 */
export async function postFilesFileIdVersionsVersionIdRestore(params: {
  path: { fileId: string; versionId: string }
}) {
  return await client.files[':fileId'].versions[':versionId'].restore.$post({ param: params.path })
}

/**
 * GET /trash
 *
 * ゴミ箱一覧取得
 */
export async function getTrash(params: { query: { page: number; limit: number } }) {
  return await client.trash.$get({ query: params.query })
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
export async function postTrashFileIdRestore(params: { path: { fileId: string } }) {
  return await client.trash[':fileId'].restore.$post({ param: params.path })
}

/**
 * GET /storage/usage
 *
 * ストレージ使用量取得
 */
export async function getStorageUsage() {
  return await client.storage.usage.$get()
}
