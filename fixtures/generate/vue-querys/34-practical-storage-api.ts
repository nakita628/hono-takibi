import { useMutation, useQuery } from '@tanstack/vue-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/34-practical-storage-api'

/**
 * GET /files
 *
 * ファイル一覧取得
 */
export function useGetFiles(
  args: InferRequestType<typeof client.files.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetFilesQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.files.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /files
 */
export function getGetFilesQueryKey(args: InferRequestType<typeof client.files.$get>) {
  return ['/files', args] as const
}

/**
 * POST /files/upload
 *
 * ファイルアップロード
 */
export function usePostFilesUpload(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.files.upload.$post> | undefined,
    Error,
    InferRequestType<typeof client.files.upload.$post>
  >({ mutationFn: async (args) => parseResponse(client.files.upload.$post(args, clientOptions)) })
}

/**
 * POST /files/upload/multipart/init
 *
 * マルチパートアップロード開始
 *
 * 大容量ファイルの分割アップロードを開始します
 */
export function usePostFilesUploadMultipartInit(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.files.upload.multipart.init.$post> | undefined,
    Error,
    InferRequestType<typeof client.files.upload.multipart.init.$post>
  >({
    mutationFn: async (args) =>
      parseResponse(client.files.upload.multipart.init.$post(args, clientOptions)),
  })
}

/**
 * POST /files/upload/multipart/{uploadId}/part
 *
 * パートアップロード
 */
export function usePostFilesUploadMultipartUploadIdPart(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.files.upload.multipart[':uploadId'].part.$post(args, clientOptions)),
  })
}

/**
 * POST /files/upload/multipart/{uploadId}/complete
 *
 * マルチパートアップロード完了
 */
export function usePostFilesUploadMultipartUploadIdComplete(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.files.upload.multipart[':uploadId'].complete.$post(args, clientOptions)),
  })
}

/**
 * GET /files/{fileId}
 *
 * ファイル情報取得
 */
export function useGetFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetFilesFileIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.files[':fileId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /files/{fileId}
 */
export function getGetFilesFileIdQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
) {
  return ['/files/:fileId', args] as const
}

/**
 * DELETE /files/{fileId}
 *
 * ファイル削除（ゴミ箱へ移動）
 */
export function useDeleteFilesFileId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.files)[':fileId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['$delete']>
  >({
    mutationFn: async (args) => parseResponse(client.files[':fileId'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /files/{fileId}
 *
 * ファイル情報更新
 */
export function usePatchFilesFileId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.files)[':fileId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['$patch']>
  >({
    mutationFn: async (args) => parseResponse(client.files[':fileId'].$patch(args, clientOptions)),
  })
}

/**
 * GET /files/{fileId}/download
 *
 * ファイルダウンロード
 */
export function useGetFilesFileIdDownload(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetFilesFileIdDownloadQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.files[':fileId'].download.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /files/{fileId}/download
 */
export function getGetFilesFileIdDownloadQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
) {
  return ['/files/:fileId/download', args] as const
}

/**
 * GET /files/{fileId}/download-url
 *
 * 署名付きダウンロードURL取得
 */
export function useGetFilesFileIdDownloadUrl(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetFilesFileIdDownloadUrlQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.files[':fileId']['download-url'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /files/{fileId}/download-url
 */
export function getGetFilesFileIdDownloadUrlQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
) {
  return ['/files/:fileId/download-url', args] as const
}

/**
 * POST /files/{fileId}/copy
 *
 * ファイルコピー
 */
export function usePostFilesFileIdCopy(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.files)[':fileId']['copy']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.files[':fileId'].copy.$post(args, clientOptions)),
  })
}

/**
 * POST /files/{fileId}/move
 *
 * ファイル移動
 */
export function usePostFilesFileIdMove(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.files)[':fileId']['move']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['move']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.files[':fileId'].move.$post(args, clientOptions)),
  })
}

/**
 * GET /files/{fileId}/thumbnail
 *
 * サムネイル取得
 */
export function useGetFilesFileIdThumbnail(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetFilesFileIdThumbnailQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.files[':fileId'].thumbnail.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /files/{fileId}/thumbnail
 */
export function getGetFilesFileIdThumbnailQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
) {
  return ['/files/:fileId/thumbnail', args] as const
}

/**
 * POST /folders
 *
 * フォルダ作成
 */
export function usePostFolders(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<typeof client.folders.$post> | undefined,
    Error,
    InferRequestType<typeof client.folders.$post>
  >({ mutationFn: async (args) => parseResponse(client.folders.$post(args, clientOptions)) })
}

/**
 * GET /folders/{folderId}
 *
 * フォルダ情報取得
 */
export function useGetFoldersFolderId(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetFoldersFolderIdQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.folders[':folderId'].$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /folders/{folderId}
 */
export function getGetFoldersFolderIdQueryKey(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
) {
  return ['/folders/:folderId', args] as const
}

/**
 * DELETE /folders/{folderId}
 *
 * フォルダ削除
 */
export function useDeleteFoldersFolderId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.folders)[':folderId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.folders)[':folderId']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.folders[':folderId'].$delete(args, clientOptions)),
  })
}

/**
 * PATCH /folders/{folderId}
 *
 * フォルダ情報更新
 */
export function usePatchFoldersFolderId(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.folders)[':folderId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.folders)[':folderId']['$patch']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.folders[':folderId'].$patch(args, clientOptions)),
  })
}

/**
 * GET /files/{fileId}/share
 *
 * 共有設定取得
 */
export function useGetFilesFileIdShare(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetFilesFileIdShareQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.files[':fileId'].share.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /files/{fileId}/share
 */
export function getGetFilesFileIdShareQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
) {
  return ['/files/:fileId/share', args] as const
}

/**
 * POST /files/{fileId}/share
 *
 * ファイル共有
 */
export function usePostFilesFileIdShare(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.files)[':fileId']['share']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['share']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.files[':fileId'].share.$post(args, clientOptions)),
  })
}

/**
 * DELETE /files/{fileId}/share
 *
 * 共有解除
 */
export function useDeleteFilesFileIdShare(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.files)[':fileId']['share']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.files[':fileId'].share.$delete(args, clientOptions)),
  })
}

/**
 * POST /files/{fileId}/share/link
 *
 * 共有リンク作成
 */
export function usePostFilesFileIdShareLink(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.files)[':fileId']['share']['link']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.files[':fileId'].share.link.$post(args, clientOptions)),
  })
}

/**
 * GET /files/{fileId}/versions
 *
 * バージョン一覧取得
 */
export function useGetFilesFileIdVersions(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetFilesFileIdVersionsQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.files[':fileId'].versions.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /files/{fileId}/versions
 */
export function getGetFilesFileIdVersionsQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
) {
  return ['/files/:fileId/versions', args] as const
}

/**
 * POST /files/{fileId}/versions/{versionId}/restore
 *
 * バージョン復元
 */
export function usePostFilesFileIdVersionsVersionIdRestore(clientOptions?: ClientRequestOptions) {
  return useMutation<
    | InferResponseType<
        (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.files[':fileId'].versions[':versionId'].restore.$post(args, clientOptions),
      ),
  })
}

/**
 * GET /trash
 *
 * ゴミ箱一覧取得
 */
export function useGetTrash(
  args: InferRequestType<typeof client.trash.$get>,
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetTrashQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.trash.$get(args, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /trash
 */
export function getGetTrashQueryKey(args: InferRequestType<typeof client.trash.$get>) {
  return ['/trash', args] as const
}

/**
 * DELETE /trash
 *
 * ゴミ箱を空にする
 */
export function useDeleteTrash(clientOptions?: ClientRequestOptions) {
  return useMutation<InferResponseType<typeof client.trash.$delete> | undefined, Error, void>({
    mutationFn: async () => parseResponse(client.trash.$delete(undefined, clientOptions)),
  })
}

/**
 * POST /trash/{fileId}/restore
 *
 * ゴミ箱から復元
 */
export function usePostTrashFileIdRestore(clientOptions?: ClientRequestOptions) {
  return useMutation<
    InferResponseType<(typeof client.trash)[':fileId']['restore']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>
  >({
    mutationFn: async (args) =>
      parseResponse(client.trash[':fileId'].restore.$post(args, clientOptions)),
  })
}

/**
 * GET /storage/usage
 *
 * ストレージ使用量取得
 */
export function useGetStorageUsage(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetStorageUsageQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () => parseResponse(client.storage.usage.$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /storage/usage
 */
export function getGetStorageUsageQueryKey() {
  return ['/storage/usage'] as const
}
