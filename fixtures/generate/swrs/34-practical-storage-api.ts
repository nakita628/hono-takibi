import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import type { Key, SWRConfiguration } from 'swr'
import useSWR from 'swr'
import type { SWRMutationConfiguration } from 'swr/mutation'
import useSWRMutation from 'swr/mutation'
import { client } from '../clients/34-practical-storage-api'

/**
 * GET /files
 *
 * ファイル一覧取得
 */
export function useGetFiles(
  args: InferRequestType<typeof client.files.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.files.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFilesKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.files.$get>, Error>(
    swrKey,
    async () => parseResponse(client.files.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /files
 */
export function getGetFilesKey(args?: InferRequestType<typeof client.files.$get>) {
  return ['/files', ...(args ? [args] : [])] as const
}

/**
 * POST /files/upload
 *
 * ファイルアップロード
 */
export function usePostFilesUpload(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.files.upload.$post>,
    Error,
    string,
    InferRequestType<typeof client.files.upload.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.files.upload.$post>,
    Error,
    string,
    InferRequestType<typeof client.files.upload.$post>
  >(
    'POST /files/upload',
    async (_, { arg }) => parseResponse(client.files.upload.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /files/upload/multipart/init
 *
 * マルチパートアップロード開始
 *
 * 大容量ファイルの分割アップロードを開始します
 */
export function usePostFilesUploadMultipartInit(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.files.upload.multipart.init.$post>,
    Error,
    string,
    InferRequestType<typeof client.files.upload.multipart.init.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.files.upload.multipart.init.$post>,
    Error,
    string,
    InferRequestType<typeof client.files.upload.multipart.init.$post>
  >(
    'POST /files/upload/multipart/init',
    async (_, { arg }) =>
      parseResponse(client.files.upload.multipart.init.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /files/upload/multipart/{uploadId}/part
 *
 * パートアップロード
 */
export function usePostFilesUploadMultipartUploadIdPart(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
  >(
    'POST /files/upload/multipart/:uploadId/part',
    async (_, { arg }) =>
      parseResponse(client.files.upload.multipart[':uploadId'].part.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /files/upload/multipart/{uploadId}/complete
 *
 * マルチパートアップロード完了
 */
export function usePostFilesUploadMultipartUploadIdComplete(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
  >(
    'POST /files/upload/multipart/:uploadId/complete',
    async (_, { arg }) =>
      parseResponse(
        client.files.upload.multipart[':uploadId'].complete.$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /files/{fileId}
 *
 * ファイル情報取得
 */
export function useGetFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<(typeof client.files)[':fileId']['$get']>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFilesFileIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.files)[':fileId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.files[':fileId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /files/{fileId}
 */
export function getGetFilesFileIdKey(
  args?: InferRequestType<(typeof client.files)[':fileId']['$get']>,
) {
  return ['/files/:fileId', ...(args ? [args] : [])] as const
}

/**
 * DELETE /files/{fileId}
 *
 * ファイル削除（ゴミ箱へ移動）
 */
export function useDeleteFilesFileId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.files)[':fileId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.files)[':fileId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['$delete']>
  >(
    'DELETE /files/:fileId',
    async (_, { arg }) => parseResponse(client.files[':fileId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /files/{fileId}
 *
 * ファイル情報更新
 */
export function usePatchFilesFileId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.files)[':fileId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.files)[':fileId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['$patch']>
  >(
    'PATCH /files/:fileId',
    async (_, { arg }) => parseResponse(client.files[':fileId'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /files/{fileId}/download
 *
 * ファイルダウンロード
 */
export function useGetFilesFileIdDownload(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.files)[':fileId']['download']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFilesFileIdDownloadKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.files)[':fileId']['download']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.files[':fileId'].download.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /files/{fileId}/download
 */
export function getGetFilesFileIdDownloadKey(
  args?: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
) {
  return ['/files/:fileId/download', ...(args ? [args] : [])] as const
}

/**
 * GET /files/{fileId}/download-url
 *
 * 署名付きダウンロードURL取得
 */
export function useGetFilesFileIdDownloadUrl(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.files)[':fileId']['download-url']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFilesFileIdDownloadUrlKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.files)[':fileId']['download-url']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.files[':fileId']['download-url'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /files/{fileId}/download-url
 */
export function getGetFilesFileIdDownloadUrlKey(
  args?: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
) {
  return ['/files/:fileId/download-url', ...(args ? [args] : [])] as const
}

/**
 * POST /files/{fileId}/copy
 *
 * ファイルコピー
 */
export function usePostFilesFileIdCopy(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.files)[':fileId']['copy']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.files)[':fileId']['copy']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>
  >(
    'POST /files/:fileId/copy',
    async (_, { arg }) => parseResponse(client.files[':fileId'].copy.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /files/{fileId}/move
 *
 * ファイル移動
 */
export function usePostFilesFileIdMove(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.files)[':fileId']['move']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['move']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.files)[':fileId']['move']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['move']['$post']>
  >(
    'POST /files/:fileId/move',
    async (_, { arg }) => parseResponse(client.files[':fileId'].move.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /files/{fileId}/thumbnail
 *
 * サムネイル取得
 */
export function useGetFilesFileIdThumbnail(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFilesFileIdThumbnailKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.files[':fileId'].thumbnail.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /files/{fileId}/thumbnail
 */
export function getGetFilesFileIdThumbnailKey(
  args?: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
) {
  return ['/files/:fileId/thumbnail', ...(args ? [args] : [])] as const
}

/**
 * POST /folders
 *
 * フォルダ作成
 */
export function usePostFolders(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.folders.$post>,
    Error,
    string,
    InferRequestType<typeof client.folders.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.folders.$post>,
    Error,
    string,
    InferRequestType<typeof client.folders.$post>
  >(
    'POST /folders',
    async (_, { arg }) => parseResponse(client.folders.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /folders/{folderId}
 *
 * フォルダ情報取得
 */
export function useGetFoldersFolderId(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.folders)[':folderId']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFoldersFolderIdKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.folders)[':folderId']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.folders[':folderId'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /folders/{folderId}
 */
export function getGetFoldersFolderIdKey(
  args?: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
) {
  return ['/folders/:folderId', ...(args ? [args] : [])] as const
}

/**
 * DELETE /folders/{folderId}
 *
 * フォルダ削除
 */
export function useDeleteFoldersFolderId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.folders)[':folderId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.folders)[':folderId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.folders)[':folderId']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.folders)[':folderId']['$delete']>
  >(
    'DELETE /folders/:folderId',
    async (_, { arg }) => parseResponse(client.folders[':folderId'].$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PATCH /folders/{folderId}
 *
 * フォルダ情報更新
 */
export function usePatchFoldersFolderId(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.folders)[':folderId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.folders)[':folderId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.folders)[':folderId']['$patch']>,
    Error,
    string,
    InferRequestType<(typeof client.folders)[':folderId']['$patch']>
  >(
    'PATCH /folders/:folderId',
    async (_, { arg }) => parseResponse(client.folders[':folderId'].$patch(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /files/{fileId}/share
 *
 * 共有設定取得
 */
export function useGetFilesFileIdShare(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.files)[':fileId']['share']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFilesFileIdShareKey(args) : null)
  const query = useSWR<InferResponseType<(typeof client.files)[':fileId']['share']['$get']>, Error>(
    swrKey,
    async () => parseResponse(client.files[':fileId'].share.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /files/{fileId}/share
 */
export function getGetFilesFileIdShareKey(
  args?: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
) {
  return ['/files/:fileId/share', ...(args ? [args] : [])] as const
}

/**
 * POST /files/{fileId}/share
 *
 * ファイル共有
 */
export function usePostFilesFileIdShare(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.files)[':fileId']['share']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['share']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.files)[':fileId']['share']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['share']['$post']>
  >(
    'POST /files/:fileId/share',
    async (_, { arg }) => parseResponse(client.files[':fileId'].share.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /files/{fileId}/share
 *
 * 共有解除
 */
export function useDeleteFilesFileIdShare(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.files)[':fileId']['share']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.files)[':fileId']['share']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>
  >(
    'DELETE /files/:fileId/share',
    async (_, { arg }) =>
      parseResponse(client.files[':fileId'].share.$delete(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /files/{fileId}/share/link
 *
 * 共有リンク作成
 */
export function usePostFilesFileIdShareLink(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.files)[':fileId']['share']['link']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.files)[':fileId']['share']['link']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>
  >(
    'POST /files/:fileId/share/link',
    async (_, { arg }) =>
      parseResponse(client.files[':fileId'].share.link.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /files/{fileId}/versions
 *
 * バージョン一覧取得
 */
export function useGetFilesFileIdVersions(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.files)[':fileId']['versions']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFilesFileIdVersionsKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client.files)[':fileId']['versions']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client.files[':fileId'].versions.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /files/{fileId}/versions
 */
export function getGetFilesFileIdVersionsKey(
  args?: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
) {
  return ['/files/:fileId/versions', ...(args ? [args] : [])] as const
}

/**
 * POST /files/{fileId}/versions/{versionId}/restore
 *
 * バージョン復元
 */
export function usePostFilesFileIdVersionsVersionIdRestore(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
    >,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
    >,
    Error,
    string,
    InferRequestType<(typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']>
  >(
    'POST /files/:fileId/versions/:versionId/restore',
    async (_, { arg }) =>
      parseResponse(
        client.files[':fileId'].versions[':versionId'].restore.$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /trash
 *
 * ゴミ箱一覧取得
 */
export function useGetTrash(
  args: InferRequestType<typeof client.trash.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.trash.$get>, Error> & {
      swrKey?: Key
      enabled?: boolean
    }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTrashKey(args) : null)
  const query = useSWR<InferResponseType<typeof client.trash.$get>, Error>(
    swrKey,
    async () => parseResponse(client.trash.$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /trash
 */
export function getGetTrashKey(args?: InferRequestType<typeof client.trash.$get>) {
  return ['/trash', ...(args ? [args] : [])] as const
}

/**
 * DELETE /trash
 *
 * ゴミ箱を空にする
 */
export function useDeleteTrash(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.trash.$delete>,
    Error,
    string,
    void
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<InferResponseType<typeof client.trash.$delete>, Error, string, void>(
    'DELETE /trash',
    async () => parseResponse(client.trash.$delete(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * POST /trash/{fileId}/restore
 *
 * ゴミ箱から復元
 */
export function usePostTrashFileIdRestore(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.trash)[':fileId']['restore']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.trash)[':fileId']['restore']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>
  >(
    'POST /trash/:fileId/restore',
    async (_, { arg }) =>
      parseResponse(client.trash[':fileId'].restore.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /storage/usage
 *
 * ストレージ使用量取得
 */
export function useGetStorageUsage(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.storage.usage.$get>, Error> & {
    swrKey?: Key
    enabled?: boolean
  }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetStorageUsageKey() : null)
  const query = useSWR<InferResponseType<typeof client.storage.usage.$get>, Error>(
    swrKey,
    async () => parseResponse(client.storage.usage.$get(undefined, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /storage/usage
 */
export function getGetStorageUsageKey() {
  return ['/storage/usage'] as const
}
