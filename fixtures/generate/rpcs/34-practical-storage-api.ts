import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/34-practical-storage-api'

/**
 * GET /files
 *
 * ファイル一覧取得
 */
export async function getFiles(
  args: {
    query: {
      folderId?: string
      search?: string
      type?: 'document' | 'image' | 'video' | 'audio' | 'archive' | 'other'
      sort?:
        | 'name:asc'
        | 'name:desc'
        | 'size:asc'
        | 'size:desc'
        | 'updatedAt:desc'
        | 'updatedAt:asc'
      page?: number
      limit?: number
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.files.$get(args, options)
}

/**
 * POST /files/upload
 *
 * ファイルアップロード
 */
export async function postFilesUpload(
  args: { form: { file: File; folderId?: string; name?: string; overwrite?: boolean } },
  options?: ClientRequestOptions,
) {
  return await client['files']['upload']['$post'](args, options)
}

/**
 * POST /files/upload/multipart/init
 *
 * マルチパートアップロード開始
 *
 * 大容量ファイルの分割アップロードを開始します
 */
export async function postFilesUploadMultipartInit(
  args: { json: { filename: string; size: number; folderId?: string; contentType?: string } },
  options?: ClientRequestOptions,
) {
  return await client['files']['upload']['multipart']['init']['$post'](args, options)
}

/**
 * POST /files/upload/multipart/{uploadId}/part
 *
 * パートアップロード
 */
export async function postFilesUploadMultipartUploadIdPart(
  args: { param: { uploadId: string }; query: { partNumber: number }; json: File },
  options?: ClientRequestOptions,
) {
  return await client['files']['upload']['multipart'][':uploadId']['part']['$post'](args, options)
}

/**
 * POST /files/upload/multipart/{uploadId}/complete
 *
 * マルチパートアップロード完了
 */
export async function postFilesUploadMultipartUploadIdComplete(
  args: { param: { uploadId: string }; json: { parts: { partNumber: number; etag: string }[] } },
  options?: ClientRequestOptions,
) {
  return await client['files']['upload']['multipart'][':uploadId']['complete']['$post'](
    args,
    options,
  )
}

/**
 * GET /files/{fileId}
 *
 * ファイル情報取得
 */
export async function getFilesFileId(
  args: { param: { fileId: string } },
  options?: ClientRequestOptions,
) {
  return await client['files'][':fileId']['$get'](args, options)
}

/**
 * DELETE /files/{fileId}
 *
 * ファイル削除（ゴミ箱へ移動）
 */
export async function deleteFilesFileId(
  args: { param: { fileId: string } },
  options?: ClientRequestOptions,
) {
  return await client['files'][':fileId']['$delete'](args, options)
}

/**
 * PATCH /files/{fileId}
 *
 * ファイル情報更新
 */
export async function patchFilesFileId(
  args: { param: { fileId: string }; json: { name?: string; description?: string } },
  options?: ClientRequestOptions,
) {
  return await client['files'][':fileId']['$patch'](args, options)
}

/**
 * GET /files/{fileId}/download
 *
 * ファイルダウンロード
 */
export async function getFilesFileIdDownload(
  args: { param: { fileId: string } },
  options?: ClientRequestOptions,
) {
  return await client['files'][':fileId']['download']['$get'](args, options)
}

/**
 * GET /files/{fileId}/download-url
 *
 * 署名付きダウンロードURL取得
 */
export async function getFilesFileIdDownloadUrl(
  args: { param: { fileId: string }; query: { expiresIn?: number } },
  options?: ClientRequestOptions,
) {
  return await client['files'][':fileId']['download-url']['$get'](args, options)
}

/**
 * POST /files/{fileId}/copy
 *
 * ファイルコピー
 */
export async function postFilesFileIdCopy(
  args: { param: { fileId: string }; json: { destinationFolderId: string; name?: string } },
  options?: ClientRequestOptions,
) {
  return await client['files'][':fileId']['copy']['$post'](args, options)
}

/**
 * POST /files/{fileId}/move
 *
 * ファイル移動
 */
export async function postFilesFileIdMove(
  args: { param: { fileId: string }; json: { destinationFolderId: string } },
  options?: ClientRequestOptions,
) {
  return await client['files'][':fileId']['move']['$post'](args, options)
}

/**
 * GET /files/{fileId}/thumbnail
 *
 * サムネイル取得
 */
export async function getFilesFileIdThumbnail(
  args: { param: { fileId: string }; query: { size?: 'small' | 'medium' | 'large' } },
  options?: ClientRequestOptions,
) {
  return await client['files'][':fileId']['thumbnail']['$get'](args, options)
}

/**
 * POST /folders
 *
 * フォルダ作成
 */
export async function postFolders(
  args: { json: { name: string; parentId?: string; color?: string } },
  options?: ClientRequestOptions,
) {
  return await client.folders.$post(args, options)
}

/**
 * GET /folders/{folderId}
 *
 * フォルダ情報取得
 */
export async function getFoldersFolderId(
  args: { param: { folderId: string } },
  options?: ClientRequestOptions,
) {
  return await client['folders'][':folderId']['$get'](args, options)
}

/**
 * DELETE /folders/{folderId}
 *
 * フォルダ削除
 */
export async function deleteFoldersFolderId(
  args: { param: { folderId: string } },
  options?: ClientRequestOptions,
) {
  return await client['folders'][':folderId']['$delete'](args, options)
}

/**
 * PATCH /folders/{folderId}
 *
 * フォルダ情報更新
 */
export async function patchFoldersFolderId(
  args: { param: { folderId: string }; json: { name?: string; color?: string } },
  options?: ClientRequestOptions,
) {
  return await client['folders'][':folderId']['$patch'](args, options)
}

/**
 * GET /files/{fileId}/share
 *
 * 共有設定取得
 */
export async function getFilesFileIdShare(
  args: { param: { fileId: string } },
  options?: ClientRequestOptions,
) {
  return await client['files'][':fileId']['share']['$get'](args, options)
}

/**
 * POST /files/{fileId}/share
 *
 * ファイル共有
 */
export async function postFilesFileIdShare(
  args: {
    param: { fileId: string }
    json: {
      collaborators?: { email: string; permission: 'viewer' | 'editor' }[]
      message?: string
      notifyByEmail?: boolean
    }
  },
  options?: ClientRequestOptions,
) {
  return await client['files'][':fileId']['share']['$post'](args, options)
}

/**
 * DELETE /files/{fileId}/share
 *
 * 共有解除
 */
export async function deleteFilesFileIdShare(
  args: { param: { fileId: string } },
  options?: ClientRequestOptions,
) {
  return await client['files'][':fileId']['share']['$delete'](args, options)
}

/**
 * POST /files/{fileId}/share/link
 *
 * 共有リンク作成
 */
export async function postFilesFileIdShareLink(
  args: {
    param: { fileId: string }
    json: { password?: string; expiresAt?: string; allowDownload?: boolean }
  },
  options?: ClientRequestOptions,
) {
  return await client['files'][':fileId']['share']['link']['$post'](args, options)
}

/**
 * GET /files/{fileId}/versions
 *
 * バージョン一覧取得
 */
export async function getFilesFileIdVersions(
  args: { param: { fileId: string } },
  options?: ClientRequestOptions,
) {
  return await client['files'][':fileId']['versions']['$get'](args, options)
}

/**
 * POST /files/{fileId}/versions/{versionId}/restore
 *
 * バージョン復元
 */
export async function postFilesFileIdVersionsVersionIdRestore(
  args: { param: { fileId: string; versionId: string } },
  options?: ClientRequestOptions,
) {
  return await client['files'][':fileId']['versions'][':versionId']['restore']['$post'](
    args,
    options,
  )
}

/**
 * GET /trash
 *
 * ゴミ箱一覧取得
 */
export async function getTrash(
  args: { query: { page?: number; limit?: number } },
  options?: ClientRequestOptions,
) {
  return await client.trash.$get(args, options)
}

/**
 * DELETE /trash
 *
 * ゴミ箱を空にする
 */
export async function deleteTrash(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client.trash.$delete(args, options)
}

/**
 * POST /trash/{fileId}/restore
 *
 * ゴミ箱から復元
 */
export async function postTrashFileIdRestore(
  args: { param: { fileId: string } },
  options?: ClientRequestOptions,
) {
  return await client['trash'][':fileId']['restore']['$post'](args, options)
}

/**
 * GET /storage/usage
 *
 * ストレージ使用量取得
 */
export async function getStorageUsage(args?: {} | undefined, options?: ClientRequestOptions) {
  return await client['storage']['usage']['$get'](args, options)
}
