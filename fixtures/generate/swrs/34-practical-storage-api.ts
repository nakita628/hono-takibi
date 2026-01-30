import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/34-practical-storage-api'

/**
 * Generates SWR cache key for GET /files
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFilesKey(args: InferRequestType<typeof client.files.$get>) {
  return ['files', 'GET', '/files', args] as const
}

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
  const swrKey = isEnabled ? (customKey ?? getGetFilesKey(args)) : null
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
 * Generates SWR mutation key for POST /files/upload
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesUploadMutationKey() {
  return ['files', 'POST', '/files/upload'] as const
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
 * Generates SWR mutation key for POST /files/upload/multipart/init
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesUploadMultipartInitMutationKey() {
  return ['files', 'POST', '/files/upload/multipart/init'] as const
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
 * Generates SWR mutation key for POST /files/upload/multipart/{uploadId}/part
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesUploadMultipartUploadIdPartMutationKey() {
  return ['files', 'POST', '/files/upload/multipart/:uploadId/part'] as const
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
 * Generates SWR mutation key for POST /files/upload/multipart/{uploadId}/complete
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesUploadMultipartUploadIdCompleteMutationKey() {
  return ['files', 'POST', '/files/upload/multipart/:uploadId/complete'] as const
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
 * Generates SWR cache key for GET /files/{fileId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFilesFileIdKey(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
) {
  return ['files', 'GET', '/files/:fileId', args] as const
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
  const swrKey = isEnabled ? (customKey ?? getGetFilesFileIdKey(args)) : null
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
 * Generates SWR mutation key for DELETE /files/{fileId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteFilesFileIdMutationKey() {
  return ['files', 'DELETE', '/files/:fileId'] as const
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
 * Generates SWR mutation key for PATCH /files/{fileId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchFilesFileIdMutationKey() {
  return ['files', 'PATCH', '/files/:fileId'] as const
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
 * Generates SWR cache key for GET /files/{fileId}/download
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFilesFileIdDownloadKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
) {
  return ['files', 'GET', '/files/:fileId/download', args] as const
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
  const swrKey = isEnabled ? (customKey ?? getGetFilesFileIdDownloadKey(args)) : null
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
 * Generates SWR cache key for GET /files/{fileId}/download-url
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFilesFileIdDownloadUrlKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
) {
  return ['files', 'GET', '/files/:fileId/download-url', args] as const
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
  const swrKey = isEnabled ? (customKey ?? getGetFilesFileIdDownloadUrlKey(args)) : null
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
 * Generates SWR mutation key for POST /files/{fileId}/copy
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesFileIdCopyMutationKey() {
  return ['files', 'POST', '/files/:fileId/copy'] as const
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
 * Generates SWR mutation key for POST /files/{fileId}/move
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesFileIdMoveMutationKey() {
  return ['files', 'POST', '/files/:fileId/move'] as const
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
 * Generates SWR cache key for GET /files/{fileId}/thumbnail
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFilesFileIdThumbnailKey(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
) {
  return ['files', 'GET', '/files/:fileId/thumbnail', args] as const
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
  const swrKey = isEnabled ? (customKey ?? getGetFilesFileIdThumbnailKey(args)) : null
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
 * Generates SWR mutation key for POST /folders
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFoldersMutationKey() {
  return ['folders', 'POST', '/folders'] as const
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
 * Generates SWR cache key for GET /folders/{folderId}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFoldersFolderIdKey(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
) {
  return ['folders', 'GET', '/folders/:folderId', args] as const
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
  const swrKey = isEnabled ? (customKey ?? getGetFoldersFolderIdKey(args)) : null
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
 * Generates SWR mutation key for DELETE /folders/{folderId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteFoldersFolderIdMutationKey() {
  return ['folders', 'DELETE', '/folders/:folderId'] as const
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
 * Generates SWR mutation key for PATCH /folders/{folderId}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPatchFoldersFolderIdMutationKey() {
  return ['folders', 'PATCH', '/folders/:folderId'] as const
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
 * Generates SWR cache key for GET /files/{fileId}/share
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFilesFileIdShareKey(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
) {
  return ['files', 'GET', '/files/:fileId/share', args] as const
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
  const swrKey = isEnabled ? (customKey ?? getGetFilesFileIdShareKey(args)) : null
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
 * Generates SWR mutation key for POST /files/{fileId}/share
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesFileIdShareMutationKey() {
  return ['files', 'POST', '/files/:fileId/share'] as const
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
 * Generates SWR mutation key for DELETE /files/{fileId}/share
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteFilesFileIdShareMutationKey() {
  return ['files', 'DELETE', '/files/:fileId/share'] as const
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
 * Generates SWR mutation key for POST /files/{fileId}/share/link
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesFileIdShareLinkMutationKey() {
  return ['files', 'POST', '/files/:fileId/share/link'] as const
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
 * Generates SWR cache key for GET /files/{fileId}/versions
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetFilesFileIdVersionsKey(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
) {
  return ['files', 'GET', '/files/:fileId/versions', args] as const
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
  const swrKey = isEnabled ? (customKey ?? getGetFilesFileIdVersionsKey(args)) : null
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
 * Generates SWR mutation key for POST /files/{fileId}/versions/{versionId}/restore
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostFilesFileIdVersionsVersionIdRestoreMutationKey() {
  return ['files', 'POST', '/files/:fileId/versions/:versionId/restore'] as const
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
 * Generates SWR cache key for GET /trash
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTrashKey(args: InferRequestType<typeof client.trash.$get>) {
  return ['trash', 'GET', '/trash', args] as const
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
  const swrKey = isEnabled ? (customKey ?? getGetTrashKey(args)) : null
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
 * Generates SWR mutation key for DELETE /trash
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteTrashMutationKey() {
  return ['trash', 'DELETE', '/trash'] as const
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
 * Generates SWR mutation key for POST /trash/{fileId}/restore
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostTrashFileIdRestoreMutationKey() {
  return ['trash', 'POST', '/trash/:fileId/restore'] as const
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
 * Generates SWR cache key for GET /storage/usage
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetStorageUsageKey() {
  return ['storage', 'GET', '/storage/usage'] as const
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
  const swrKey = isEnabled ? (customKey ?? getGetStorageUsageKey()) : null
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.storage.usage.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}
