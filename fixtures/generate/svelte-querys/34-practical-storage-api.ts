import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/34-practical-storage-api'

/**
 * GET /files
 *
 * ファイル一覧取得
 */
export function createGetFiles(
  args: InferRequestType<typeof client.files.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.files.$get>,
      Error,
      InferResponseType<typeof client.files.$get>,
      readonly ['/files', InferRequestType<typeof client.files.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFilesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.files.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /files
 */
export function getGetFilesQueryKey(args: InferRequestType<typeof client.files.$get>) {
  return ['/files', args] as const
}

/**
 * POST /files/upload
 *
 * ファイルアップロード
 */
export function createPostFilesUpload(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.files.upload.$post> | undefined,
      Error,
      InferRequestType<typeof client.files.upload.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.files.upload.$post> | undefined,
    Error,
    InferRequestType<typeof client.files.upload.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.files.upload.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /files/upload/multipart/init
 *
 * マルチパートアップロード開始
 *
 * 大容量ファイルの分割アップロードを開始します
 */
export function createPostFilesUploadMultipartInit(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.files.upload.multipart.init.$post> | undefined,
      Error,
      InferRequestType<typeof client.files.upload.multipart.init.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.files.upload.multipart.init.$post> | undefined,
    Error,
    InferRequestType<typeof client.files.upload.multipart.init.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files.upload.multipart.init.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /files/upload/multipart/{uploadId}/part
 *
 * パートアップロード
 */
export function createPostFilesUploadMultipartUploadIdPart(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files.upload.multipart[':uploadId'].part.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /files/upload/multipart/{uploadId}/complete
 *
 * マルチパートアップロード完了
 */
export function createPostFilesUploadMultipartUploadIdComplete(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
    | undefined,
    Error,
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.files.upload.multipart[':uploadId'].complete.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /files/{fileId}
 *
 * ファイル情報取得
 */
export function createGetFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.files)[':fileId']['$get']>,
      Error,
      InferResponseType<(typeof client.files)[':fileId']['$get']>,
      readonly ['/files/:fileId', InferRequestType<(typeof client.files)[':fileId']['$get']>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFilesFileIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.files[':fileId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}
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
export function createDeleteFilesFileId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.files)[':fileId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.files)[':fileId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files[':fileId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /files/{fileId}
 *
 * ファイル情報更新
 */
export function createPatchFilesFileId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.files)[':fileId']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.files)[':fileId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files[':fileId'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /files/{fileId}/download
 *
 * ファイルダウンロード
 */
export function createGetFilesFileIdDownload(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.files)[':fileId']['download']['$get']>,
      Error,
      InferResponseType<(typeof client.files)[':fileId']['download']['$get']>,
      readonly [
        '/files/:fileId/download',
        InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFilesFileIdDownloadQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.files[':fileId'].download.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/download
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
export function createGetFilesFileIdDownloadUrl(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.files)[':fileId']['download-url']['$get']>,
      Error,
      InferResponseType<(typeof client.files)[':fileId']['download-url']['$get']>,
      readonly [
        '/files/:fileId/download-url',
        InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFilesFileIdDownloadUrlQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.files[':fileId']['download-url'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/download-url
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
export function createPostFilesFileIdCopy(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.files)[':fileId']['copy']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.files)[':fileId']['copy']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files[':fileId'].copy.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /files/{fileId}/move
 *
 * ファイル移動
 */
export function createPostFilesFileIdMove(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.files)[':fileId']['move']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['move']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.files)[':fileId']['move']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['move']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files[':fileId'].move.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /files/{fileId}/thumbnail
 *
 * サムネイル取得
 */
export function createGetFilesFileIdThumbnail(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
      Error,
      InferResponseType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
      readonly [
        '/files/:fileId/thumbnail',
        InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFilesFileIdThumbnailQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.files[':fileId'].thumbnail.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/thumbnail
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
export function createPostFolders(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.folders.$post> | undefined,
      Error,
      InferRequestType<typeof client.folders.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.folders.$post> | undefined,
    Error,
    InferRequestType<typeof client.folders.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.folders.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /folders/{folderId}
 *
 * フォルダ情報取得
 */
export function createGetFoldersFolderId(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.folders)[':folderId']['$get']>,
      Error,
      InferResponseType<(typeof client.folders)[':folderId']['$get']>,
      readonly [
        '/folders/:folderId',
        InferRequestType<(typeof client.folders)[':folderId']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFoldersFolderIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.folders[':folderId'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /folders/{folderId}
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
export function createDeleteFoldersFolderId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.folders)[':folderId']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.folders)[':folderId']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.folders)[':folderId']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.folders)[':folderId']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.folders[':folderId'].$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PATCH /folders/{folderId}
 *
 * フォルダ情報更新
 */
export function createPatchFoldersFolderId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.folders)[':folderId']['$patch']> | undefined,
      Error,
      InferRequestType<(typeof client.folders)[':folderId']['$patch']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.folders)[':folderId']['$patch']> | undefined,
    Error,
    InferRequestType<(typeof client.folders)[':folderId']['$patch']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.folders[':folderId'].$patch(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /files/{fileId}/share
 *
 * 共有設定取得
 */
export function createGetFilesFileIdShare(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.files)[':fileId']['share']['$get']>,
      Error,
      InferResponseType<(typeof client.files)[':fileId']['share']['$get']>,
      readonly [
        '/files/:fileId/share',
        InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFilesFileIdShareQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.files[':fileId'].share.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/share
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
export function createPostFilesFileIdShare(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.files)[':fileId']['share']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['share']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.files)[':fileId']['share']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['share']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files[':fileId'].share.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /files/{fileId}/share
 *
 * 共有解除
 */
export function createDeleteFilesFileIdShare(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.files)[':fileId']['share']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.files)[':fileId']['share']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files[':fileId'].share.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /files/{fileId}/share/link
 *
 * 共有リンク作成
 */
export function createPostFilesFileIdShareLink(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.files)[':fileId']['share']['link']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.files)[':fileId']['share']['link']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.files[':fileId'].share.link.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /files/{fileId}/versions
 *
 * バージョン一覧取得
 */
export function createGetFilesFileIdVersions(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.files)[':fileId']['versions']['$get']>,
      Error,
      InferResponseType<(typeof client.files)[':fileId']['versions']['$get']>,
      readonly [
        '/files/:fileId/versions',
        InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetFilesFileIdVersionsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.files[':fileId'].versions.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/versions
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
export function createPostFilesFileIdVersionsVersionIdRestore(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.files[':fileId'].versions[':versionId'].restore.$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /trash
 *
 * ゴミ箱一覧取得
 */
export function createGetTrash(
  args: InferRequestType<typeof client.trash.$get>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.trash.$get>,
      Error,
      InferResponseType<typeof client.trash.$get>,
      readonly ['/trash', InferRequestType<typeof client.trash.$get>]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTrashQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.trash.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /trash
 */
export function getGetTrashQueryKey(args: InferRequestType<typeof client.trash.$get>) {
  return ['/trash', args] as const
}

/**
 * DELETE /trash
 *
 * ゴミ箱を空にする
 */
export function createDeleteTrash(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.trash.$delete> | undefined,
      Error,
      void
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<InferResponseType<typeof client.trash.$delete> | undefined, Error, void>(
    {
      ...options?.mutation,
      mutationFn: async () => parseResponse(client.trash.$delete(undefined, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /trash/{fileId}/restore
 *
 * ゴミ箱から復元
 */
export function createPostTrashFileIdRestore(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.trash)[':fileId']['restore']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.trash)[':fileId']['restore']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.trash[':fileId'].restore.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /storage/usage
 *
 * ストレージ使用量取得
 */
export function createGetStorageUsage(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<typeof client.storage.usage.$get>,
      Error,
      InferResponseType<typeof client.storage.usage.$get>,
      readonly ['/storage/usage']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetStorageUsageQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.storage.usage.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /storage/usage
 */
export function getGetStorageUsageQueryKey() {
  return ['/storage/usage'] as const
}
