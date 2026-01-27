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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFilesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.files.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /files
 * Uses $url() for type-safe key generation
 */
export function getGetFilesKey(args: InferRequestType<typeof client.files.$get>) {
  return client.files.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostFilesUploadMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.files.upload.$post> }) =>
        parseResponse(client.files.upload.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/upload
 * Uses $url() for type-safe key generation
 */
export function getPostFilesUploadMutationKey() {
  return `POST ${client.files.upload.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostFilesUploadMultipartInitMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<typeof client.files.upload.multipart.init.$post> },
      ) => parseResponse(client.files.upload.multipart.init.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/upload/multipart/init
 * Uses $url() for type-safe key generation
 */
export function getPostFilesUploadMultipartInitMutationKey() {
  return `POST ${client.files.upload.multipart.init.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostFilesUploadMultipartUploadIdPartMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/upload/multipart/{uploadId}/part
 * Uses $url() for type-safe key generation
 */
export function getPostFilesUploadMultipartUploadIdPartMutationKey() {
  return `POST ${client.files.upload.multipart[':uploadId'].part.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostFilesUploadMultipartUploadIdCompleteMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/upload/multipart/{uploadId}/complete
 * Uses $url() for type-safe key generation
 */
export function getPostFilesUploadMultipartUploadIdCompleteMutationKey() {
  return `POST ${client.files.upload.multipart[':uploadId'].complete.$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFilesFileIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.files[':fileId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /files/{fileId}
 * Uses $url() for type-safe key generation
 */
export function getGetFilesFileIdKey(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
) {
  return client.files[':fileId'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteFilesFileIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.files)[':fileId']['$delete']> },
      ) => parseResponse(client.files[':fileId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /files/{fileId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteFilesFileIdMutationKey() {
  return `DELETE ${client.files[':fileId'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchFilesFileIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.files)[':fileId']['$patch']> },
      ) => parseResponse(client.files[':fileId'].$patch(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /files/{fileId}
 * Uses $url() for type-safe key generation
 */
export function getPatchFilesFileIdMutationKey() {
  return `PATCH ${client.files[':fileId'].$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFilesFileIdDownloadKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.files[':fileId'].download.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /files/{fileId}/download
 * Uses $url() for type-safe key generation
 */
export function getGetFilesFileIdDownloadKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
) {
  return client.files[':fileId'].download.$url(args).pathname
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFilesFileIdDownloadUrlKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.files[':fileId']['download-url'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /files/{fileId}/download-url
 * Uses $url() for type-safe key generation
 */
export function getGetFilesFileIdDownloadUrlKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
) {
  return client.files[':fileId']['download-url'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostFilesFileIdCopyMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.files)[':fileId']['copy']['$post']> },
      ) => parseResponse(client.files[':fileId'].copy.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/{fileId}/copy
 * Uses $url() for type-safe key generation
 */
export function getPostFilesFileIdCopyMutationKey() {
  return `POST ${client.files[':fileId'].copy.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostFilesFileIdMoveMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.files)[':fileId']['move']['$post']> },
      ) => parseResponse(client.files[':fileId'].move.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/{fileId}/move
 * Uses $url() for type-safe key generation
 */
export function getPostFilesFileIdMoveMutationKey() {
  return `POST ${client.files[':fileId'].move.$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFilesFileIdThumbnailKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.files[':fileId'].thumbnail.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /files/{fileId}/thumbnail
 * Uses $url() for type-safe key generation
 */
export function getGetFilesFileIdThumbnailKey(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
) {
  return client.files[':fileId'].thumbnail.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostFoldersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.folders.$post> }) =>
        parseResponse(client.folders.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /folders
 * Uses $url() for type-safe key generation
 */
export function getPostFoldersMutationKey() {
  return `POST ${client.folders.$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFoldersFolderIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.folders[':folderId'].$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /folders/{folderId}
 * Uses $url() for type-safe key generation
 */
export function getGetFoldersFolderIdKey(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
) {
  return client.folders[':folderId'].$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteFoldersFolderIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.folders)[':folderId']['$delete']> },
      ) => parseResponse(client.folders[':folderId'].$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /folders/{folderId}
 * Uses $url() for type-safe key generation
 */
export function getDeleteFoldersFolderIdMutationKey() {
  return `DELETE ${client.folders[':folderId'].$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPatchFoldersFolderIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.folders)[':folderId']['$patch']> },
      ) => parseResponse(client.folders[':folderId'].$patch(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PATCH /folders/{folderId}
 * Uses $url() for type-safe key generation
 */
export function getPatchFoldersFolderIdMutationKey() {
  return `PATCH ${client.folders[':folderId'].$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFilesFileIdShareKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.files[':fileId'].share.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /files/{fileId}/share
 * Uses $url() for type-safe key generation
 */
export function getGetFilesFileIdShareKey(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
) {
  return client.files[':fileId'].share.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostFilesFileIdShareMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.files)[':fileId']['share']['$post']> },
      ) => parseResponse(client.files[':fileId'].share.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/{fileId}/share
 * Uses $url() for type-safe key generation
 */
export function getPostFilesFileIdShareMutationKey() {
  return `POST ${client.files[':fileId'].share.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteFilesFileIdShareMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.files)[':fileId']['share']['$delete']> },
      ) => parseResponse(client.files[':fileId'].share.$delete(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /files/{fileId}/share
 * Uses $url() for type-safe key generation
 */
export function getDeleteFilesFileIdShareMutationKey() {
  return `DELETE ${client.files[':fileId'].share.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostFilesFileIdShareLinkMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/{fileId}/share/link
 * Uses $url() for type-safe key generation
 */
export function getPostFilesFileIdShareLinkMutationKey() {
  return `POST ${client.files[':fileId'].share.link.$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetFilesFileIdVersionsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.files[':fileId'].versions.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /files/{fileId}/versions
 * Uses $url() for type-safe key generation
 */
export function getGetFilesFileIdVersionsKey(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
) {
  return client.files[':fileId'].versions.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getPostFilesFileIdVersionsVersionIdRestoreMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /files/{fileId}/versions/{versionId}/restore
 * Uses $url() for type-safe key generation
 */
export function getPostFilesFileIdVersionsVersionIdRestoreMutationKey() {
  return `POST ${client.files[':fileId'].versions[':versionId'].restore.$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetTrashKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.trash.$get(args, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /trash
 * Uses $url() for type-safe key generation
 */
export function getGetTrashKey(args: InferRequestType<typeof client.trash.$get>) {
  return client.trash.$url(args).pathname
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
  const swrKey = mutationOptions?.swrKey ?? getDeleteTrashMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async () => parseResponse(client.trash.$delete(undefined, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /trash
 * Uses $url() for type-safe key generation
 */
export function getDeleteTrashMutationKey() {
  return `DELETE ${client.trash.$url().pathname}`
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
  const swrKey = mutationOptions?.swrKey ?? getPostTrashFileIdRestoreMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']> },
      ) => parseResponse(client.trash[':fileId'].restore.$post(arg, clientOptions)),
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /trash/{fileId}/restore
 * Uses $url() for type-safe key generation
 */
export function getPostTrashFileIdRestoreMutationKey() {
  return `POST ${client.trash[':fileId'].restore.$url().pathname}`
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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetStorageUsageKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.storage.usage.$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /storage/usage
 * Uses $url() for type-safe key generation
 */
export function getGetStorageUsageKey() {
  return client.storage.usage.$url().pathname
}
