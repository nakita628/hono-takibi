import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/34-practical-storage-api'

/**
 * GET /files
 *
 * ファイル一覧取得
 */
export function createGetFiles(
  args: InferRequestType<typeof client.files.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.files.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } = getGetFilesQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /files
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetFilesQueryKey(args: InferRequestType<typeof client.files.$get>) {
  const u = client.files.$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /files
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesQueryOptions = (
  args: InferRequestType<typeof client.files.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.files.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * POST /files/upload
 *
 * ファイルアップロード
 */
export function createPostFilesUpload(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.files.upload.$post>>>>
    >,
    Error,
    InferRequestType<typeof client.files.upload.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.files.upload.$post>) =>
      parseResponse(client.files.upload.$post(args, clientOptions)),
  }))
}

/**
 * POST /files/upload/multipart/init
 *
 * マルチパートアップロード開始
 *
 * 大容量ファイルの分割アップロードを開始します
 */
export function createPostFilesUploadMultipartInit(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<typeof client.files.upload.multipart.init.$post>>>
      >
    >,
    Error,
    InferRequestType<typeof client.files.upload.multipart.init.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.files.upload.multipart.init.$post>) =>
      parseResponse(client.files.upload.multipart.init.$post(args, clientOptions)),
  }))
}

/**
 * POST /files/upload/multipart/{uploadId}/part
 *
 * パートアップロード
 */
export function createPostFilesUploadMultipartUploadIdPart(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['part']['$post']>,
    ) => parseResponse(client.files.upload.multipart[':uploadId'].part.$post(args, clientOptions)),
  }))
}

/**
 * POST /files/upload/multipart/{uploadId}/complete
 *
 * マルチパートアップロード完了
 */
export function createPostFilesUploadMultipartUploadIdComplete(options?: {
  mutation?: CreateMutationOptions<
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
    InferRequestType<(typeof client.files.upload.multipart)[':uploadId']['complete']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.files.upload.multipart)[':uploadId']['complete']['$post']
      >,
    ) =>
      parseResponse(client.files.upload.multipart[':uploadId'].complete.$post(args, clientOptions)),
  }))
}

/**
 * GET /files/{fileId}
 *
 * ファイル情報取得
 */
export function createGetFilesFileId(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdQueryOptions(
      args,
      options?.()?.client,
    )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetFilesFileIdQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
) {
  const u = client.files[':fileId'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /files/{fileId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.files[':fileId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /files/{fileId}
 *
 * ファイル削除（ゴミ箱へ移動）
 */
export function createDeleteFilesFileId(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['$delete']>>>
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['$delete']>) =>
      parseResponse(client.files[':fileId'].$delete(args, clientOptions)),
  }))
}

/**
 * PATCH /files/{fileId}
 *
 * ファイル情報更新
 */
export function createPatchFilesFileId(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['$patch']>) =>
      parseResponse(client.files[':fileId'].$patch(args, clientOptions)),
  }))
}

/**
 * GET /files/{fileId}/download
 *
 * ファイルダウンロード
 */
export function createGetFilesFileIdDownload(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['download']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdDownloadQueryOptions(
      args,
      options?.()?.client,
    )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/download
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetFilesFileIdDownloadQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
) {
  const u = client.files[':fileId'].download.$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /files/{fileId}/download
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdDownloadQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['download']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdDownloadQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.files[':fileId'].download.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /files/{fileId}/download-url
 *
 * 署名付きダウンロードURL取得
 */
export function createGetFilesFileIdDownloadUrl(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['download-url']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdDownloadUrlQueryOptions(
      args,
      options?.()?.client,
    )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/download-url
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetFilesFileIdDownloadUrlQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
) {
  const u = client.files[':fileId']['download-url'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /files/{fileId}/download-url
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdDownloadUrlQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['download-url']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdDownloadUrlQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.files[':fileId']['download-url'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /files/{fileId}/copy
 *
 * ファイルコピー
 */
export function createPostFilesFileIdCopy(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['copy']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['copy']['$post']>) =>
      parseResponse(client.files[':fileId'].copy.$post(args, clientOptions)),
  }))
}

/**
 * POST /files/{fileId}/move
 *
 * ファイル移動
 */
export function createPostFilesFileIdMove(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.files)[':fileId']['move']['$post']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['move']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.files)[':fileId']['move']['$post']>) =>
      parseResponse(client.files[':fileId'].move.$post(args, clientOptions)),
  }))
}

/**
 * GET /files/{fileId}/thumbnail
 *
 * サムネイル取得
 */
export function createGetFilesFileIdThumbnail(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['thumbnail']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdThumbnailQueryOptions(
      args,
      options?.()?.client,
    )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/thumbnail
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetFilesFileIdThumbnailQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
) {
  const u = client.files[':fileId'].thumbnail.$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /files/{fileId}/thumbnail
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdThumbnailQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['thumbnail']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdThumbnailQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.files[':fileId'].thumbnail.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /folders
 *
 * フォルダ作成
 */
export function createPostFolders(options?: {
  mutation?: CreateMutationOptions<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.folders.$post>>>>>,
    Error,
    InferRequestType<typeof client.folders.$post>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<typeof client.folders.$post>) =>
      parseResponse(client.folders.$post(args, clientOptions)),
  }))
}

/**
 * GET /folders/{folderId}
 *
 * フォルダ情報取得
 */
export function createGetFoldersFolderId(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.folders)[':folderId']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } = getGetFoldersFolderIdQueryOptions(
      args,
      options?.()?.client,
    )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /folders/{folderId}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetFoldersFolderIdQueryKey(
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
) {
  const u = client.folders[':folderId'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /folders/{folderId}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFoldersFolderIdQueryOptions = (
  args: InferRequestType<(typeof client.folders)[':folderId']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFoldersFolderIdQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.folders[':folderId'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /folders/{folderId}
 *
 * フォルダ削除
 */
export function createDeleteFoldersFolderId(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.folders)[':folderId']['$delete']>>>
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.folders)[':folderId']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.folders)[':folderId']['$delete']>) =>
      parseResponse(client.folders[':folderId'].$delete(args, clientOptions)),
  }))
}

/**
 * PATCH /folders/{folderId}
 *
 * フォルダ情報更新
 */
export function createPatchFoldersFolderId(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.folders)[':folderId']['$patch']>>>
      >
    >,
    Error,
    InferRequestType<(typeof client.folders)[':folderId']['$patch']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (args: InferRequestType<(typeof client.folders)[':folderId']['$patch']>) =>
      parseResponse(client.folders[':folderId'].$patch(args, clientOptions)),
  }))
}

/**
 * GET /files/{fileId}/share
 *
 * 共有設定取得
 */
export function createGetFilesFileIdShare(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['share']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdShareQueryOptions(
      args,
      options?.()?.client,
    )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/share
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetFilesFileIdShareQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
) {
  const u = client.files[':fileId'].share.$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /files/{fileId}/share
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdShareQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['share']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdShareQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.files[':fileId'].share.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /files/{fileId}/share
 *
 * ファイル共有
 */
export function createPostFilesFileIdShare(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.files)[':fileId']['share']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['share']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.files)[':fileId']['share']['$post']>,
    ) => parseResponse(client.files[':fileId'].share.$post(args, clientOptions)),
  }))
}

/**
 * DELETE /files/{fileId}/share
 *
 * 共有解除
 */
export function createDeleteFilesFileIdShare(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['share']['$delete']>>
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.files)[':fileId']['share']['$delete']>,
    ) => parseResponse(client.files[':fileId'].share.$delete(args, clientOptions)),
  }))
}

/**
 * POST /files/{fileId}/share/link
 *
 * 共有リンク作成
 */
export function createPostFilesFileIdShareLink(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.files)[':fileId']['share']['link']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.files)[':fileId']['share']['link']['$post']>,
    ) => parseResponse(client.files[':fileId'].share.link.$post(args, clientOptions)),
  }))
}

/**
 * GET /files/{fileId}/versions
 *
 * バージョン一覧取得
 */
export function createGetFilesFileIdVersions(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.files)[':fileId']['versions']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } = getGetFilesFileIdVersionsQueryOptions(
      args,
      options?.()?.client,
    )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /files/{fileId}/versions
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetFilesFileIdVersionsQueryKey(
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
) {
  const u = client.files[':fileId'].versions.$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /files/{fileId}/versions
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetFilesFileIdVersionsQueryOptions = (
  args: InferRequestType<(typeof client.files)[':fileId']['versions']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetFilesFileIdVersionsQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.files[':fileId'].versions.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /files/{fileId}/versions/{versionId}/restore
 *
 * バージョン復元
 */
export function createPostFilesFileIdVersionsVersionIdRestore(options?: {
  mutation?: CreateMutationOptions<
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
    InferRequestType<(typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.files)[':fileId']['versions'][':versionId']['restore']['$post']
      >,
    ) =>
      parseResponse(
        client.files[':fileId'].versions[':versionId'].restore.$post(args, clientOptions),
      ),
  }))
}

/**
 * GET /trash
 *
 * ゴミ箱一覧取得
 */
export function createGetTrash(
  args: InferRequestType<typeof client.trash.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trash.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } = getGetTrashQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /trash
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetTrashQueryKey(args: InferRequestType<typeof client.trash.$get>) {
  const u = client.trash.$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /trash
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTrashQueryOptions = (
  args: InferRequestType<typeof client.trash.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTrashQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.trash.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * DELETE /trash
 *
 * ゴミ箱を空にする
 */
export function createDeleteTrash(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.trash.$delete>>>>>
    | undefined,
    Error,
    void
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async () => parseResponse(client.trash.$delete(undefined, clientOptions)),
  }))
}

/**
 * POST /trash/{fileId}/restore
 *
 * ゴミ箱から復元
 */
export function createPostTrashFileIdRestore(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.trash)[':fileId']['restore']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client.trash)[':fileId']['restore']['$post']>,
    ) => parseResponse(client.trash[':fileId'].restore.$post(args, clientOptions)),
  }))
}

/**
 * GET /storage/usage
 *
 * ストレージ使用量取得
 */
export function createGetStorageUsage(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.storage.usage.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } = getGetStorageUsageQueryOptions(
      options?.()?.client,
    )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /storage/usage
 * Uses $url() for type-safe key generation
 */
export function getGetStorageUsageQueryKey() {
  return [client.storage.usage.$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /storage/usage
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetStorageUsageQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetStorageUsageQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.storage.usage.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})
