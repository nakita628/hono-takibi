import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/34-practical-storage-api'

/**
 * GET /files
 *
 * ファイル一覧取得
 */
export function useGetFiles(
  args: InferRequestType<typeof client.files.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetFilesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.files.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /files
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetFilesKey(args: InferRequestType<typeof client.files.$get>) {
  return ['/files', args] as const
}

/**
 * POST /files/upload
 *
 * ファイルアップロード
 */
export function usePostFilesUpload(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.files.upload.$post>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.files.upload.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFilesUploadMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.files.upload.$post> }) =>
        parseResponse(client.files.upload.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/upload
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostFilesUploadMutationKey() {
  return 'POST /files/upload'
}

/**
 * POST /files/upload/multipart/init
 *
 * マルチパートアップロード開始
 *
 * 大容量ファイルの分割アップロードを開始します
 */
export function usePostFilesUploadMultipartInit(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.files.upload.multipart.init.$post>>>
      >
    >,
    Error,
    Key,
    InferRequestType<typeof client.files.upload.multipart.init.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFilesUploadMultipartInitMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.files.upload.multipart.init.$post> },
      ) => parseResponse(client.files.upload.multipart.init.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/upload/multipart/init
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostFilesUploadMultipartInitMutationKey() {
  return 'POST /files/upload/multipart/init'
}

/**
 * POST /files/upload/multipart/{uploadId}/part
 *
 * パートアップロード
 */
export function usePostFilesUploadMultipartUploadIdPart(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFilesUploadMultipartUploadIdPartMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.files.upload.multipart)[':uploadId']['part']['$post']
          >
        },
      ) => parseResponse(client.files.upload.multipart[':uploadId'].part.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/upload/multipart/{uploadId}/part
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostFilesUploadMultipartUploadIdPartMutationKey() {
  return 'POST /files/upload/multipart/:uploadId/part'
}

/**
 * POST /files/upload/multipart/{uploadId}/complete
 *
 * マルチパートアップロード完了
 */
export function usePostFilesUploadMultipartUploadIdComplete(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFilesUploadMultipartUploadIdCompleteMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.files.upload.multipart)[':uploadId']['complete']['$post']
          >
        },
      ) =>
        parseResponse(
          client.files.upload.multipart[':uploadId'].complete.$post(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/upload/multipart/{uploadId}/complete
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostFilesUploadMultipartUploadIdCompleteMutationKey() {
  return 'POST /files/upload/multipart/:uploadId/complete'
}

/**
 * GET /files/{fileId}
 *
 * ファイル情報取得
 */
export function useGetFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetFilesFileIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.files[':fileId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /files/{fileId}
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetFilesFileIdKey(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
) {
  return ['/files/:fileId', args] as const
}

/**
 * DELETE /files/{fileId}
 *
 * ファイル削除（ゴミ箱へ移動）
 */
export function useDeleteFilesFileId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['$delete']>>>
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.files)[':fileId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteFilesFileIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.files)[':fileId']['$delete']> },
      ) => parseResponse(client.files[':fileId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /files/{fileId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteFilesFileIdMutationKey() {
  return 'DELETE /files/:fileId'
}

/**
 * PATCH /files/{fileId}
 *
 * ファイル情報更新
 */
export function usePatchFilesFileId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['$patch']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.files)[':fileId']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchFilesFileIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.files)[':fileId']['$patch']> },
      ) => parseResponse(client.files[':fileId'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /files/{fileId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPatchFilesFileIdMutationKey() {
  return 'PATCH /files/:fileId'
}

/**
 * GET /files/{fileId}/download
 *
 * ファイルダウンロード
 */
export function useGetFilesFileIdDownload(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetFilesFileIdDownloadKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.files[':fileId'].download.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /files/{fileId}/download
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetFilesFileIdDownloadKey(
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
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetFilesFileIdDownloadUrlKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.files[':fileId']['download-url'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /files/{fileId}/download-url
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetFilesFileIdDownloadUrlKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
) {
  return ['/files/:fileId/download-url', args] as const
}

/**
 * POST /files/{fileId}/copy
 *
 * ファイルコピー
 */
export function usePostFilesFileIdCopy(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['copy']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFilesFileIdCopyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.files)[':fileId']['copy']['$post']> },
      ) => parseResponse(client.files[':fileId'].copy.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/{fileId}/copy
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostFilesFileIdCopyMutationKey() {
  return 'POST /files/:fileId/copy'
}

/**
 * POST /files/{fileId}/move
 *
 * ファイル移動
 */
export function usePostFilesFileIdMove(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['move']['$post']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.files)[':fileId']['move']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFilesFileIdMoveMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.files)[':fileId']['move']['$post']> },
      ) => parseResponse(client.files[':fileId'].move.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/{fileId}/move
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostFilesFileIdMoveMutationKey() {
  return 'POST /files/:fileId/move'
}

/**
 * GET /files/{fileId}/thumbnail
 *
 * サムネイル取得
 */
export function useGetFilesFileIdThumbnail(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetFilesFileIdThumbnailKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.files[':fileId'].thumbnail.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /files/{fileId}/thumbnail
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetFilesFileIdThumbnailKey(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
) {
  return ['/files/:fileId/thumbnail', args] as const
}

/**
 * POST /folders
 *
 * フォルダ作成
 */
export function usePostFolders(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.folders.$post>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.folders.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFoldersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.folders.$post> }) =>
        parseResponse(client.folders.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /folders
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostFoldersMutationKey() {
  return 'POST /folders'
}

/**
 * GET /folders/{folderId}
 *
 * フォルダ情報取得
 */
export function useGetFoldersFolderId(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetFoldersFolderIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.folders[':folderId'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /folders/{folderId}
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetFoldersFolderIdKey(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
) {
  return ['/folders/:folderId', args] as const
}

/**
 * DELETE /folders/{folderId}
 *
 * フォルダ削除
 */
export function useDeleteFoldersFolderId(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.folders)[':folderId']['$delete']>>>
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.folders)[':folderId']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteFoldersFolderIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.folders)[':folderId']['$delete']> },
      ) => parseResponse(client.folders[':folderId'].$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /folders/{folderId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteFoldersFolderIdMutationKey() {
  return 'DELETE /folders/:folderId'
}

/**
 * PATCH /folders/{folderId}
 *
 * フォルダ情報更新
 */
export function usePatchFoldersFolderId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.folders)[':folderId']['$patch']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.folders)[':folderId']['$patch']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchFoldersFolderIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.folders)[':folderId']['$patch']> },
      ) => parseResponse(client.folders[':folderId'].$patch(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /folders/{folderId}
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPatchFoldersFolderIdMutationKey() {
  return 'PATCH /folders/:folderId'
}

/**
 * GET /files/{fileId}/share
 *
 * 共有設定取得
 */
export function useGetFilesFileIdShare(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetFilesFileIdShareKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.files[':fileId'].share.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /files/{fileId}/share
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetFilesFileIdShareKey(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
) {
  return ['/files/:fileId/share', args] as const
}

/**
 * POST /files/{fileId}/share
 *
 * ファイル共有
 */
export function usePostFilesFileIdShare(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.files)[':fileId']['share']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.files)[':fileId']['share']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFilesFileIdShareMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.files)[':fileId']['share']['$post']> },
      ) => parseResponse(client.files[':fileId'].share.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/{fileId}/share
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostFilesFileIdShareMutationKey() {
  return 'POST /files/:fileId/share'
}

/**
 * DELETE /files/{fileId}/share
 *
 * 共有解除
 */
export function useDeleteFilesFileIdShare(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['share']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteFilesFileIdShareMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.files)[':fileId']['share']['$delete']> },
      ) => parseResponse(client.files[':fileId'].share.$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /files/{fileId}/share
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteFilesFileIdShareMutationKey() {
  return 'DELETE /files/:fileId/share'
}

/**
 * POST /files/{fileId}/share/link
 *
 * 共有リンク作成
 */
export function usePostFilesFileIdShareLink(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.files)[':fileId']['share']['link']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFilesFileIdShareLinkMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']> },
      ) => parseResponse(client.files[':fileId'].share.link.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/{fileId}/share/link
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostFilesFileIdShareLinkMutationKey() {
  return 'POST /files/:fileId/share/link'
}

/**
 * GET /files/{fileId}/versions
 *
 * バージョン一覧取得
 */
export function useGetFilesFileIdVersions(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetFilesFileIdVersionsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.files[':fileId'].versions.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /files/{fileId}/versions
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetFilesFileIdVersionsKey(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
) {
  return ['/files/:fileId/versions', args] as const
}

/**
 * POST /files/{fileId}/versions/{versionId}/restore
 *
 * バージョン復元
 */
export function usePostFilesFileIdVersionsVersionIdRestore(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
            >
          >
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFilesFileIdVersionsVersionIdRestoreMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
          >
        },
      ) =>
        parseResponse(
          client.files[':fileId'].versions[':versionId'].restore.$post(arg, clientOptions),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/{fileId}/versions/{versionId}/restore
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostFilesFileIdVersionsVersionIdRestoreMutationKey() {
  return 'POST /files/:fileId/versions/:versionId/restore'
}

/**
 * GET /trash
 *
 * ゴミ箱一覧取得
 */
export function useGetTrash(
  args: InferRequestType<typeof client.trash.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetTrashKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.trash.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /trash
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetTrashKey(args: InferRequestType<typeof client.trash.$get>) {
  return ['/trash', args] as const
}

/**
 * DELETE /trash
 *
 * ゴミ箱を空にする
 */
export function useDeleteTrash(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trash.$delete>>>>>
    | undefined,
    Error,
    Key,
    undefined
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteTrashMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.trash.$delete(undefined, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /trash
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getDeleteTrashMutationKey() {
  return 'DELETE /trash'
}

/**
 * POST /trash/{fileId}/restore
 *
 * ゴミ箱から復元
 */
export function usePostTrashFileIdRestore(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.trash)[':fileId']['restore']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostTrashFileIdRestoreMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']> },
      ) => parseResponse(client.trash[':fileId'].restore.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /trash/{fileId}/restore
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostTrashFileIdRestoreMutationKey() {
  return 'POST /trash/:fileId/restore'
}

/**
 * GET /storage/usage
 *
 * ストレージ使用量取得
 */
export function useGetStorageUsage(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetStorageUsageKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.storage.usage.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /storage/usage
 * Returns structured key [templatePath] for filter-based invalidation
 */
export function getGetStorageUsageKey() {
  return ['/storage/usage'] as const
}
