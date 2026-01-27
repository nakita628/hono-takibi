import type {
  CreateMutationOptions,
  CreateQueryOptions,
  QueryFunctionContext,
} from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/spotify'

/**
 * Generates Svelte Query cache key for GET /albums
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetAlbumsQueryKey(args: InferRequestType<typeof client.albums.$get>) {
  return ['albums', 'GET', '/albums', args] as const
}

/**
 * Returns Svelte Query query options for GET /albums
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAlbumsQueryOptions = (
  args: InferRequestType<typeof client.albums.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAlbumsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.albums.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /albums
 *
 * Get Several Albums
 *
 * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
 */
export function createGetAlbums(
  args: InferRequestType<typeof client.albums.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.albums.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAlbumsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /albums/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetAlbumsIdQueryKey(
  args: InferRequestType<(typeof client.albums)[':id']['$get']>,
) {
  return ['albums', 'GET', '/albums/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /albums/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAlbumsIdQueryOptions = (
  args: InferRequestType<(typeof client.albums)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAlbumsIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.albums[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /albums/{id}
 *
 * Get Album
 *
 * Get Spotify catalog information for a single album.
 */
export function createGetAlbumsId(
  args: InferRequestType<(typeof client.albums)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.albums)[':id']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAlbumsIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /albums/{id}/tracks
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetAlbumsIdTracksQueryKey(
  args: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
) {
  return ['albums', 'GET', '/albums/:id/tracks', args] as const
}

/**
 * Returns Svelte Query query options for GET /albums/{id}/tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAlbumsIdTracksQueryOptions = (
  args: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAlbumsIdTracksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.albums[':id'].tracks.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /albums/{id}/tracks
 *
 * Get Album Tracks
 *
 * Get Spotify catalog information about an album’s tracks.
 * Optional parameters can be used to limit the number of tracks returned.
 */
export function createGetAlbumsIdTracks(
  args: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.albums)[':id']['tracks']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAlbumsIdTracksQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /artists
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetArtistsQueryKey(args: InferRequestType<typeof client.artists.$get>) {
  return ['artists', 'GET', '/artists', args] as const
}

/**
 * Returns Svelte Query query options for GET /artists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArtistsQueryOptions = (
  args: InferRequestType<typeof client.artists.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetArtistsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.artists.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /artists
 *
 * Get Several Artists
 *
 * Get Spotify catalog information for several artists based on their Spotify IDs.
 */
export function createGetArtists(
  args: InferRequestType<typeof client.artists.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.artists.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetArtistsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /artists/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetArtistsIdQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['$get']>,
) {
  return ['artists', 'GET', '/artists/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /artists/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArtistsIdQueryOptions = (
  args: InferRequestType<(typeof client.artists)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetArtistsIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.artists[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /artists/{id}
 *
 * Get Artist
 *
 * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
 */
export function createGetArtistsId(
  args: InferRequestType<(typeof client.artists)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.artists)[':id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetArtistsIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /artists/{id}/albums
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetArtistsIdAlbumsQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
) {
  return ['artists', 'GET', '/artists/:id/albums', args] as const
}

/**
 * Returns Svelte Query query options for GET /artists/{id}/albums
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArtistsIdAlbumsQueryOptions = (
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetArtistsIdAlbumsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.artists[':id'].albums.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /artists/{id}/albums
 *
 * Get Artist's Albums
 *
 * Get Spotify catalog information about an artist's albums.
 */
export function createGetArtistsIdAlbums(
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.artists)[':id']['albums']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetArtistsIdAlbumsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /artists/{id}/related-artists
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetArtistsIdRelatedArtistsQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
) {
  return ['artists', 'GET', '/artists/:id/related-artists', args] as const
}

/**
 * Returns Svelte Query query options for GET /artists/{id}/related-artists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArtistsIdRelatedArtistsQueryOptions = (
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetArtistsIdRelatedArtistsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.artists[':id']['related-artists'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /artists/{id}/related-artists
 *
 * Get Artist's Related Artists
 *
 * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's [listening history](http://news.spotify.com/se/2010/02/03/related-artists/).
 */
export function createGetArtistsIdRelatedArtists(
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.artists)[':id']['related-artists']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetArtistsIdRelatedArtistsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /artists/{id}/top-tracks
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetArtistsIdTopTracksQueryKey(
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
) {
  return ['artists', 'GET', '/artists/:id/top-tracks', args] as const
}

/**
 * Returns Svelte Query query options for GET /artists/{id}/top-tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetArtistsIdTopTracksQueryOptions = (
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetArtistsIdTopTracksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.artists[':id']['top-tracks'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /artists/{id}/top-tracks
 *
 * Get Artist's Top Tracks
 *
 * Get Spotify catalog information about an artist's top tracks by country.
 */
export function createGetArtistsIdTopTracks(
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.artists)[':id']['top-tracks']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetArtistsIdTopTracksQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /audio-analysis/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetAudioAnalysisIdQueryKey(
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
) {
  return ['audio-analysis', 'GET', '/audio-analysis/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /audio-analysis/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudioAnalysisIdQueryOptions = (
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAudioAnalysisIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['audio-analysis'][':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /audio-analysis/{id}
 *
 * Get Track's Audio Analysis
 *
 * Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.
 */
export function createGetAudioAnalysisId(
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['audio-analysis'][':id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAudioAnalysisIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /audio-features
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetAudioFeaturesQueryKey(
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
) {
  return ['audio-features', 'GET', '/audio-features', args] as const
}

/**
 * Returns Svelte Query query options for GET /audio-features
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudioFeaturesQueryOptions = (
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAudioFeaturesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['audio-features'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /audio-features
 *
 * Get Tracks' Audio Features
 *
 * Get audio features for multiple tracks based on their Spotify IDs.
 */
export function createGetAudioFeatures(
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client)['audio-features']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAudioFeaturesQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /audio-features/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetAudioFeaturesIdQueryKey(
  args: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
) {
  return ['audio-features', 'GET', '/audio-features/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /audio-features/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudioFeaturesIdQueryOptions = (
  args: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAudioFeaturesIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client['audio-features'][':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /audio-features/{id}
 *
 * Get Track's Audio Features
 *
 * Get audio feature information for a single track identified by its unique
 * Spotify ID.
 */
export function createGetAudioFeaturesId(
  args: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['audio-features'][':id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAudioFeaturesIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /audiobooks
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetAudiobooksQueryKey(args: InferRequestType<typeof client.audiobooks.$get>) {
  return ['audiobooks', 'GET', '/audiobooks', args] as const
}

/**
 * Returns Svelte Query query options for GET /audiobooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudiobooksQueryOptions = (
  args: InferRequestType<typeof client.audiobooks.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAudiobooksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.audiobooks.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /audiobooks
 *
 * Get Several Audiobooks
 *
 * Get Spotify catalog information for several audiobooks identified by their Spotify IDs.<br />
 * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function createGetAudiobooks(
  args: InferRequestType<typeof client.audiobooks.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.audiobooks.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAudiobooksQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /audiobooks/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetAudiobooksIdQueryKey(
  args: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
) {
  return ['audiobooks', 'GET', '/audiobooks/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /audiobooks/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudiobooksIdQueryOptions = (
  args: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAudiobooksIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.audiobooks[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /audiobooks/{id}
 *
 * Get an Audiobook
 *
 * Get Spotify catalog information for a single audiobook.<br />
 * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function createGetAudiobooksId(
  args: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.audiobooks)[':id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAudiobooksIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /audiobooks/{id}/chapters
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetAudiobooksIdChaptersQueryKey(
  args: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
) {
  return ['audiobooks', 'GET', '/audiobooks/:id/chapters', args] as const
}

/**
 * Returns Svelte Query query options for GET /audiobooks/{id}/chapters
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetAudiobooksIdChaptersQueryOptions = (
  args: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetAudiobooksIdChaptersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.audiobooks[':id'].chapters.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /audiobooks/{id}/chapters
 *
 * Get Audiobook Chapters
 *
 * Get Spotify catalog information about an audiobook's chapters.<br />
 * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function createGetAudiobooksIdChapters(
  args: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.audiobooks)[':id']['chapters']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetAudiobooksIdChaptersQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /browse/categories
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetBrowseCategoriesQueryKey(
  args: InferRequestType<typeof client.browse.categories.$get>,
) {
  return ['browse', 'GET', '/browse/categories', args] as const
}

/**
 * Returns Svelte Query query options for GET /browse/categories
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseCategoriesQueryOptions = (
  args: InferRequestType<typeof client.browse.categories.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetBrowseCategoriesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.browse.categories.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /browse/categories
 *
 * Get Several Browse Categories
 *
 * Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 */
export function createGetBrowseCategories(
  args: InferRequestType<typeof client.browse.categories.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.browse.categories.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetBrowseCategoriesQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /browse/categories/{category_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetBrowseCategoriesCategoryIdQueryKey(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
) {
  return ['browse', 'GET', '/browse/categories/:category_id', args] as const
}

/**
 * Returns Svelte Query query options for GET /browse/categories/{category_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseCategoriesCategoryIdQueryOptions = (
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetBrowseCategoriesCategoryIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.browse.categories[':category_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /browse/categories/{category_id}
 *
 * Get Single Browse Category
 *
 * Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 */
export function createGetBrowseCategoriesCategoryId(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.browse.categories)[':category_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetBrowseCategoriesCategoryIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /browse/categories/{category_id}/playlists
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetBrowseCategoriesCategoryIdPlaylistsQueryKey(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
) {
  return ['browse', 'GET', '/browse/categories/:category_id/playlists', args] as const
}

/**
 * Returns Svelte Query query options for GET /browse/categories/{category_id}/playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseCategoriesCategoryIdPlaylistsQueryOptions = (
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetBrowseCategoriesCategoryIdPlaylistsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.browse.categories[':category_id'].playlists.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /browse/categories/{category_id}/playlists
 *
 * Get Category's Playlists
 *
 * Get a list of Spotify playlists tagged with a particular category.
 */
export function createGetBrowseCategoriesCategoryIdPlaylists(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } =
      getGetBrowseCategoriesCategoryIdPlaylistsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /browse/featured-playlists
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetBrowseFeaturedPlaylistsQueryKey(
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
) {
  return ['browse', 'GET', '/browse/featured-playlists', args] as const
}

/**
 * Returns Svelte Query query options for GET /browse/featured-playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseFeaturedPlaylistsQueryOptions = (
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetBrowseFeaturedPlaylistsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.browse['featured-playlists'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /browse/featured-playlists
 *
 * Get Featured Playlists
 *
 * Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
 */
export function createGetBrowseFeaturedPlaylists(
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.browse)['featured-playlists']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetBrowseFeaturedPlaylistsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /browse/new-releases
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetBrowseNewReleasesQueryKey(
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
) {
  return ['browse', 'GET', '/browse/new-releases', args] as const
}

/**
 * Returns Svelte Query query options for GET /browse/new-releases
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetBrowseNewReleasesQueryOptions = (
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetBrowseNewReleasesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.browse['new-releases'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /browse/new-releases
 *
 * Get New Releases
 *
 * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
 */
export function createGetBrowseNewReleases(
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.browse)['new-releases']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetBrowseNewReleasesQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /chapters
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChaptersQueryKey(args: InferRequestType<typeof client.chapters.$get>) {
  return ['chapters', 'GET', '/chapters', args] as const
}

/**
 * Returns Svelte Query query options for GET /chapters
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChaptersQueryOptions = (
  args: InferRequestType<typeof client.chapters.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChaptersQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.chapters.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /chapters
 *
 * Get Several Chapters
 *
 * Get Spotify catalog information for several chapters identified by their Spotify IDs.<br />
 * **Note: Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function createGetChapters(
  args: InferRequestType<typeof client.chapters.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.chapters.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetChaptersQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /chapters/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetChaptersIdQueryKey(
  args: InferRequestType<(typeof client.chapters)[':id']['$get']>,
) {
  return ['chapters', 'GET', '/chapters/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /chapters/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetChaptersIdQueryOptions = (
  args: InferRequestType<(typeof client.chapters)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetChaptersIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.chapters[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /chapters/{id}
 *
 * Get a Chapter
 *
 * Get Spotify catalog information for a single chapter.<br />
 * **Note: Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function createGetChaptersId(
  args: InferRequestType<(typeof client.chapters)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.chapters)[':id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetChaptersIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /episodes
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetEpisodesQueryKey(args: InferRequestType<typeof client.episodes.$get>) {
  return ['episodes', 'GET', '/episodes', args] as const
}

/**
 * Returns Svelte Query query options for GET /episodes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEpisodesQueryOptions = (
  args: InferRequestType<typeof client.episodes.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetEpisodesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.episodes.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /episodes
 *
 * Get Several Episodes
 *
 * Get Spotify catalog information for several episodes based on their Spotify IDs.
 */
export function createGetEpisodes(
  args: InferRequestType<typeof client.episodes.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.episodes.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetEpisodesQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /episodes/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetEpisodesIdQueryKey(
  args: InferRequestType<(typeof client.episodes)[':id']['$get']>,
) {
  return ['episodes', 'GET', '/episodes/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /episodes/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetEpisodesIdQueryOptions = (
  args: InferRequestType<(typeof client.episodes)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetEpisodesIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.episodes[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /episodes/{id}
 *
 * Get Episode
 *
 * Get Spotify catalog information for a single episode identified by its
 * unique Spotify ID.
 */
export function createGetEpisodesId(
  args: InferRequestType<(typeof client.episodes)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.episodes)[':id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetEpisodesIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /markets
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMarketsQueryKey() {
  return ['markets', 'GET', '/markets'] as const
}

/**
 * Returns Svelte Query query options for GET /markets
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMarketsQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMarketsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.markets.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /markets
 *
 * Get Available Markets
 *
 * Get the list of markets where Spotify is available.
 */
export function createGetMarkets(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.markets.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMarketsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMeQueryKey() {
  return ['me', 'GET', '/me'] as const
}

/**
 * Returns Svelte Query query options for GET /me
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMeQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.$get(undefined, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /me
 *
 * Get Current User's Profile
 *
 * Get detailed profile information about the current user (including the
 * current user's username).
 */
export function createGetMe(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMeQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/albums
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMeAlbumsQueryKey(args: InferRequestType<typeof client.me.albums.$get>) {
  return ['me', 'GET', '/me/albums', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/albums
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeAlbumsQueryOptions = (
  args: InferRequestType<typeof client.me.albums.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeAlbumsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.albums.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /me/albums
 *
 * Get User's Saved Albums
 *
 * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
 */
export function createGetMeAlbums(
  args: InferRequestType<typeof client.me.albums.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.albums.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMeAlbumsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /me/albums
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMeAlbumsMutationKey() {
  return ['me', 'PUT', '/me/albums'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /me/albums
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMeAlbumsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMeAlbumsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.albums.$put>) =>
    parseResponse(client.me.albums.$put(args, clientOptions)),
})

/**
 * PUT /me/albums
 *
 * Save Albums for Current User
 *
 * Save one or more albums to the current user's 'Your Music' library.
 */
export function createPutMeAlbums(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.albums.$put>>>>>,
      Error,
      InferRequestType<typeof client.me.albums.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutMeAlbumsMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /me/albums
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteMeAlbumsMutationKey() {
  return ['me', 'DELETE', '/me/albums'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /me/albums
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteMeAlbumsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteMeAlbumsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.albums.$delete>) =>
    parseResponse(client.me.albums.$delete(args, clientOptions)),
})

/**
 * DELETE /me/albums
 *
 * Remove Users' Saved Albums
 *
 * Remove one or more albums from the current user's 'Your Music' library.
 */
export function createDeleteMeAlbums(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.albums.$delete>>>>
      >,
      Error,
      InferRequestType<typeof client.me.albums.$delete>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteMeAlbumsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/albums/contains
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMeAlbumsContainsQueryKey(
  args: InferRequestType<typeof client.me.albums.contains.$get>,
) {
  return ['me', 'GET', '/me/albums/contains', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/albums/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeAlbumsContainsQueryOptions = (
  args: InferRequestType<typeof client.me.albums.contains.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeAlbumsContainsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.albums.contains.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/albums/contains
 *
 * Check User's Saved Albums
 *
 * Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
 */
export function createGetMeAlbumsContains(
  args: InferRequestType<typeof client.me.albums.contains.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.albums.contains.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMeAlbumsContainsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/audiobooks
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMeAudiobooksQueryKey(
  args: InferRequestType<typeof client.me.audiobooks.$get>,
) {
  return ['me', 'GET', '/me/audiobooks', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/audiobooks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeAudiobooksQueryOptions = (
  args: InferRequestType<typeof client.me.audiobooks.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeAudiobooksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.audiobooks.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/audiobooks
 *
 * Get User's Saved Audiobooks
 *
 * Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.
 */
export function createGetMeAudiobooks(
  args: InferRequestType<typeof client.me.audiobooks.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.audiobooks.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMeAudiobooksQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /me/audiobooks
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMeAudiobooksMutationKey() {
  return ['me', 'PUT', '/me/audiobooks'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /me/audiobooks
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMeAudiobooksMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMeAudiobooksMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.audiobooks.$put>) =>
    parseResponse(client.me.audiobooks.$put(args, clientOptions)),
})

/**
 * PUT /me/audiobooks
 *
 * Save Audiobooks for Current User
 *
 * Save one or more audiobooks to the current Spotify user's library.
 */
export function createPutMeAudiobooks(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.audiobooks.$put>>>>
      >,
      Error,
      InferRequestType<typeof client.me.audiobooks.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutMeAudiobooksMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /me/audiobooks
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteMeAudiobooksMutationKey() {
  return ['me', 'DELETE', '/me/audiobooks'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /me/audiobooks
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteMeAudiobooksMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteMeAudiobooksMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.audiobooks.$delete>) =>
    parseResponse(client.me.audiobooks.$delete(args, clientOptions)),
})

/**
 * DELETE /me/audiobooks
 *
 * Remove User's Saved Audiobooks
 *
 * Remove one or more audiobooks from the Spotify user's library.
 */
export function createDeleteMeAudiobooks(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.audiobooks.$delete>>>>
      >,
      Error,
      InferRequestType<typeof client.me.audiobooks.$delete>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteMeAudiobooksMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/audiobooks/contains
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMeAudiobooksContainsQueryKey(
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
) {
  return ['me', 'GET', '/me/audiobooks/contains', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/audiobooks/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeAudiobooksContainsQueryOptions = (
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeAudiobooksContainsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.audiobooks.contains.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/audiobooks/contains
 *
 * Check User's Saved Audiobooks
 *
 * Check if one or more audiobooks are already saved in the current Spotify user's library.
 */
export function createGetMeAudiobooksContains(
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.me.audiobooks.contains.$get>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMeAudiobooksContainsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/episodes
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMeEpisodesQueryKey(args: InferRequestType<typeof client.me.episodes.$get>) {
  return ['me', 'GET', '/me/episodes', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/episodes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeEpisodesQueryOptions = (
  args: InferRequestType<typeof client.me.episodes.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeEpisodesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.episodes.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /me/episodes
 *
 * Get User's Saved Episodes
 *
 * Get a list of the episodes saved in the current Spotify user's library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 */
export function createGetMeEpisodes(
  args: InferRequestType<typeof client.me.episodes.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.episodes.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMeEpisodesQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /me/episodes
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMeEpisodesMutationKey() {
  return ['me', 'PUT', '/me/episodes'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /me/episodes
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMeEpisodesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMeEpisodesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.episodes.$put>) =>
    parseResponse(client.me.episodes.$put(args, clientOptions)),
})

/**
 * PUT /me/episodes
 *
 * Save Episodes for Current User
 *
 * Save one or more episodes to the current user's library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 */
export function createPutMeEpisodes(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.episodes.$put>>>>
      >,
      Error,
      InferRequestType<typeof client.me.episodes.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutMeEpisodesMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /me/episodes
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteMeEpisodesMutationKey() {
  return ['me', 'DELETE', '/me/episodes'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /me/episodes
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteMeEpisodesMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteMeEpisodesMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.episodes.$delete>) =>
    parseResponse(client.me.episodes.$delete(args, clientOptions)),
})

/**
 * DELETE /me/episodes
 *
 * Remove User's Saved Episodes
 *
 * Remove one or more episodes from the current user's library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 */
export function createDeleteMeEpisodes(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.episodes.$delete>>>>
      >,
      Error,
      InferRequestType<typeof client.me.episodes.$delete>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteMeEpisodesMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/episodes/contains
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMeEpisodesContainsQueryKey(
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
) {
  return ['me', 'GET', '/me/episodes/contains', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/episodes/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeEpisodesContainsQueryOptions = (
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeEpisodesContainsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.episodes.contains.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/episodes/contains
 *
 * Check User's Saved Episodes
 *
 * Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer)..
 */
export function createGetMeEpisodesContains(
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.me.episodes.contains.$get>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMeEpisodesContainsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/following
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMeFollowingQueryKey(args: InferRequestType<typeof client.me.following.$get>) {
  return ['me', 'GET', '/me/following', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/following
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeFollowingQueryOptions = (
  args: InferRequestType<typeof client.me.following.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeFollowingQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.following.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/following
 *
 * Get Followed Artists
 *
 * Get the current user's followed artists.
 */
export function createGetMeFollowing(
  args: InferRequestType<typeof client.me.following.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.following.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMeFollowingQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /me/following
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMeFollowingMutationKey() {
  return ['me', 'PUT', '/me/following'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /me/following
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMeFollowingMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMeFollowingMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.following.$put>) =>
    parseResponse(client.me.following.$put(args, clientOptions)),
})

/**
 * PUT /me/following
 *
 * Follow Artists or Users
 *
 * Add the current user as a follower of one or more artists or other Spotify users.
 */
export function createPutMeFollowing(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.following.$put>>>>
        >
      | undefined,
      Error,
      InferRequestType<typeof client.me.following.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutMeFollowingMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /me/following
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteMeFollowingMutationKey() {
  return ['me', 'DELETE', '/me/following'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /me/following
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteMeFollowingMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteMeFollowingMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.following.$delete>) =>
    parseResponse(client.me.following.$delete(args, clientOptions)),
})

/**
 * DELETE /me/following
 *
 * Unfollow Artists or Users
 *
 * Remove the current user as a follower of one or more artists or other Spotify users.
 */
export function createDeleteMeFollowing(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.following.$delete>>>>
      >,
      Error,
      InferRequestType<typeof client.me.following.$delete>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteMeFollowingMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/following/contains
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMeFollowingContainsQueryKey(
  args: InferRequestType<typeof client.me.following.contains.$get>,
) {
  return ['me', 'GET', '/me/following/contains', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/following/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeFollowingContainsQueryOptions = (
  args: InferRequestType<typeof client.me.following.contains.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeFollowingContainsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.following.contains.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/following/contains
 *
 * Check If User Follows Artists or Users
 *
 * Check to see if the current user is following one or more artists or other Spotify users.
 */
export function createGetMeFollowingContains(
  args: InferRequestType<typeof client.me.following.contains.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.me.following.contains.$get>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMeFollowingContainsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/player
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMePlayerQueryKey(args: InferRequestType<typeof client.me.player.$get>) {
  return ['me', 'GET', '/me/player', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/player
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlayerQueryOptions = (
  args: InferRequestType<typeof client.me.player.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMePlayerQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.player.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /me/player
 *
 * Get Playback State
 *
 * Get information about the user’s current playback state, including track or episode, progress, and active device.
 */
export function createGetMePlayer(
  args: InferRequestType<typeof client.me.player.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMePlayerQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /me/player
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMePlayerMutationKey() {
  return ['me', 'PUT', '/me/player'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /me/player
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMePlayerMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMePlayerMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.player.$put>) =>
    parseResponse(client.me.player.$put(args, clientOptions)),
})

/**
 * PUT /me/player
 *
 * Transfer Playback
 *
 * Transfer playback to a new device and determine if it should start playing.
 */
export function createPutMePlayer(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.$put>>>>>
      | undefined,
      Error,
      InferRequestType<typeof client.me.player.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutMePlayerMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/player/currently-playing
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMePlayerCurrentlyPlayingQueryKey(
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
) {
  return ['me', 'GET', '/me/player/currently-playing', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/player/currently-playing
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlayerCurrentlyPlayingQueryOptions = (
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMePlayerCurrentlyPlayingQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.player['currently-playing'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/player/currently-playing
 *
 * Get Currently Playing Track
 *
 * Get the object currently being played on the user's Spotify account.
 */
export function createGetMePlayerCurrentlyPlaying(
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.me.player)['currently-playing']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMePlayerCurrentlyPlayingQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/player/devices
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMePlayerDevicesQueryKey() {
  return ['me', 'GET', '/me/player/devices'] as const
}

/**
 * Returns Svelte Query query options for GET /me/player/devices
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlayerDevicesQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMePlayerDevicesQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.player.devices.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/player/devices
 *
 * Get Available Devices
 *
 * Get information about a user’s available devices.
 */
export function createGetMePlayerDevices(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.devices.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMePlayerDevicesQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /me/player/next
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMePlayerNextMutationKey() {
  return ['me', 'POST', '/me/player/next'] as const
}

/**
 * Returns Svelte Query mutation options for POST /me/player/next
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMePlayerNextMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMePlayerNextMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.player.next.$post>) =>
    parseResponse(client.me.player.next.$post(args, clientOptions)),
})

/**
 * POST /me/player/next
 *
 * Skip To Next
 *
 * Skips to next track in the user’s queue.
 */
export function createPostMePlayerNext(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.next.$post>>>>
        >
      | undefined,
      Error,
      InferRequestType<typeof client.me.player.next.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMePlayerNextMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /me/player/pause
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMePlayerPauseMutationKey() {
  return ['me', 'PUT', '/me/player/pause'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /me/player/pause
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMePlayerPauseMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMePlayerPauseMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.player.pause.$put>) =>
    parseResponse(client.me.player.pause.$put(args, clientOptions)),
})

/**
 * PUT /me/player/pause
 *
 * Pause Playback
 *
 * Pause playback on the user's account.
 */
export function createPutMePlayerPause(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.pause.$put>>>>
        >
      | undefined,
      Error,
      InferRequestType<typeof client.me.player.pause.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutMePlayerPauseMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /me/player/play
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMePlayerPlayMutationKey() {
  return ['me', 'PUT', '/me/player/play'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /me/player/play
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMePlayerPlayMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMePlayerPlayMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.player.play.$put>) =>
    parseResponse(client.me.player.play.$put(args, clientOptions)),
})

/**
 * PUT /me/player/play
 *
 * Start/Resume Playback
 *
 * Start a new context or resume current playback on the user's active device.
 */
export function createPutMePlayerPlay(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.play.$put>>>>
        >
      | undefined,
      Error,
      InferRequestType<typeof client.me.player.play.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutMePlayerPlayMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /me/player/previous
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMePlayerPreviousMutationKey() {
  return ['me', 'POST', '/me/player/previous'] as const
}

/**
 * Returns Svelte Query mutation options for POST /me/player/previous
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMePlayerPreviousMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMePlayerPreviousMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.player.previous.$post>) =>
    parseResponse(client.me.player.previous.$post(args, clientOptions)),
})

/**
 * POST /me/player/previous
 *
 * Skip To Previous
 *
 * Skips to previous track in the user’s queue.
 */
export function createPostMePlayerPrevious(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.me.player.previous.$post>>>
          >
        >
      | undefined,
      Error,
      InferRequestType<typeof client.me.player.previous.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMePlayerPreviousMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/player/queue
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetMePlayerQueueQueryKey() {
  return ['me', 'GET', '/me/player/queue'] as const
}

/**
 * Returns Svelte Query query options for GET /me/player/queue
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlayerQueueQueryOptions = (clientOptions?: ClientRequestOptions) => ({
  queryKey: getGetMePlayerQueueQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.player.queue.$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/player/queue
 *
 * Get the User's Queue
 *
 * Get the list of objects that make up the user's queue.
 */
export function createGetMePlayerQueue(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.queue.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMePlayerQueueQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /me/player/queue
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostMePlayerQueueMutationKey() {
  return ['me', 'POST', '/me/player/queue'] as const
}

/**
 * Returns Svelte Query mutation options for POST /me/player/queue
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostMePlayerQueueMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPostMePlayerQueueMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.player.queue.$post>) =>
    parseResponse(client.me.player.queue.$post(args, clientOptions)),
})

/**
 * POST /me/player/queue
 *
 * Add Item to Playback Queue
 *
 * Add an item to the end of the user's current playback queue.
 */
export function createPostMePlayerQueue(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.queue.$post>>>>
        >
      | undefined,
      Error,
      InferRequestType<typeof client.me.player.queue.$post>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostMePlayerQueueMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/player/recently-played
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMePlayerRecentlyPlayedQueryKey(
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
) {
  return ['me', 'GET', '/me/player/recently-played', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/player/recently-played
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlayerRecentlyPlayedQueryOptions = (
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMePlayerRecentlyPlayedQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.player['recently-played'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/player/recently-played
 *
 * Get Recently Played Tracks
 *
 * Get tracks from the current user's recently played tracks.
 * _**Note**: Currently doesn't support podcast episodes._
 */
export function createGetMePlayerRecentlyPlayed(
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.me.player)['recently-played']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMePlayerRecentlyPlayedQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /me/player/repeat
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMePlayerRepeatMutationKey() {
  return ['me', 'PUT', '/me/player/repeat'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /me/player/repeat
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMePlayerRepeatMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMePlayerRepeatMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.player.repeat.$put>) =>
    parseResponse(client.me.player.repeat.$put(args, clientOptions)),
})

/**
 * PUT /me/player/repeat
 *
 * Set Repeat Mode
 *
 * Set the repeat mode for the user's playback. Options are repeat-track,
 * repeat-context, and off.
 */
export function createPutMePlayerRepeat(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.repeat.$put>>>>
        >
      | undefined,
      Error,
      InferRequestType<typeof client.me.player.repeat.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutMePlayerRepeatMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /me/player/seek
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMePlayerSeekMutationKey() {
  return ['me', 'PUT', '/me/player/seek'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /me/player/seek
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMePlayerSeekMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMePlayerSeekMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.player.seek.$put>) =>
    parseResponse(client.me.player.seek.$put(args, clientOptions)),
})

/**
 * PUT /me/player/seek
 *
 * Seek To Position
 *
 * Seeks to the given position in the user’s currently playing track.
 */
export function createPutMePlayerSeek(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.seek.$put>>>>
        >
      | undefined,
      Error,
      InferRequestType<typeof client.me.player.seek.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutMePlayerSeekMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /me/player/shuffle
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMePlayerShuffleMutationKey() {
  return ['me', 'PUT', '/me/player/shuffle'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /me/player/shuffle
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMePlayerShuffleMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMePlayerShuffleMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.player.shuffle.$put>) =>
    parseResponse(client.me.player.shuffle.$put(args, clientOptions)),
})

/**
 * PUT /me/player/shuffle
 *
 * Toggle Playback Shuffle
 *
 * Toggle shuffle on or off for user’s playback.
 */
export function createPutMePlayerShuffle(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<
            typeof parseResponse<Awaited<ReturnType<typeof client.me.player.shuffle.$put>>>
          >
        >
      | undefined,
      Error,
      InferRequestType<typeof client.me.player.shuffle.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutMePlayerShuffleMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /me/player/volume
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMePlayerVolumeMutationKey() {
  return ['me', 'PUT', '/me/player/volume'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /me/player/volume
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMePlayerVolumeMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMePlayerVolumeMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.player.volume.$put>) =>
    parseResponse(client.me.player.volume.$put(args, clientOptions)),
})

/**
 * PUT /me/player/volume
 *
 * Set Playback Volume
 *
 * Set the volume for the user’s current playback device.
 */
export function createPutMePlayerVolume(
  options?: () => {
    mutation?: CreateMutationOptions<
      | Awaited<
          ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.volume.$put>>>>
        >
      | undefined,
      Error,
      InferRequestType<typeof client.me.player.volume.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutMePlayerVolumeMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/playlists
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMePlaylistsQueryKey(args: InferRequestType<typeof client.me.playlists.$get>) {
  return ['me', 'GET', '/me/playlists', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMePlaylistsQueryOptions = (
  args: InferRequestType<typeof client.me.playlists.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMePlaylistsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.playlists.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/playlists
 *
 * Get Current User's Playlists
 *
 * Get a list of the playlists owned or followed by the current Spotify
 * user.
 */
export function createGetMePlaylists(
  args: InferRequestType<typeof client.me.playlists.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.playlists.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMePlaylistsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/shows
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMeShowsQueryKey(args: InferRequestType<typeof client.me.shows.$get>) {
  return ['me', 'GET', '/me/shows', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/shows
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeShowsQueryOptions = (
  args: InferRequestType<typeof client.me.shows.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeShowsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.shows.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /me/shows
 *
 * Get User's Saved Shows
 *
 * Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.
 */
export function createGetMeShows(
  args: InferRequestType<typeof client.me.shows.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.shows.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMeShowsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /me/shows
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMeShowsMutationKey() {
  return ['me', 'PUT', '/me/shows'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /me/shows
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMeShowsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMeShowsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.shows.$put>) =>
    parseResponse(client.me.shows.$put(args, clientOptions)),
})

/**
 * PUT /me/shows
 *
 * Save Shows for Current User
 *
 * Save one or more shows to current Spotify user's library.
 */
export function createPutMeShows(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.shows.$put>>>>>,
      Error,
      InferRequestType<typeof client.me.shows.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutMeShowsMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /me/shows
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteMeShowsMutationKey() {
  return ['me', 'DELETE', '/me/shows'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /me/shows
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteMeShowsMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteMeShowsMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.shows.$delete>) =>
    parseResponse(client.me.shows.$delete(args, clientOptions)),
})

/**
 * DELETE /me/shows
 *
 * Remove User's Saved Shows
 *
 * Delete one or more shows from current Spotify user's library.
 */
export function createDeleteMeShows(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.shows.$delete>>>>
      >,
      Error,
      InferRequestType<typeof client.me.shows.$delete>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteMeShowsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/shows/contains
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMeShowsContainsQueryKey(
  args: InferRequestType<typeof client.me.shows.contains.$get>,
) {
  return ['me', 'GET', '/me/shows/contains', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/shows/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeShowsContainsQueryOptions = (
  args: InferRequestType<typeof client.me.shows.contains.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeShowsContainsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.shows.contains.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/shows/contains
 *
 * Check User's Saved Shows
 *
 * Check if one or more shows is already saved in the current Spotify user's library.
 */
export function createGetMeShowsContains(
  args: InferRequestType<typeof client.me.shows.contains.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.shows.contains.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMeShowsContainsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/top/{type}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMeTopTypeQueryKey(
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
) {
  return ['me', 'GET', '/me/top/:type', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/top/{type}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeTopTypeQueryOptions = (
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeTopTypeQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.top[':type'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/top/{type}
 *
 * Get User's Top Items
 *
 * Get the current user's top artists or tracks based on calculated affinity.
 */
export function createGetMeTopType(
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.me.top)[':type']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMeTopTypeQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/tracks
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMeTracksQueryKey(args: InferRequestType<typeof client.me.tracks.$get>) {
  return ['me', 'GET', '/me/tracks', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeTracksQueryOptions = (
  args: InferRequestType<typeof client.me.tracks.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeTracksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.tracks.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /me/tracks
 *
 * Get User's Saved Tracks
 *
 * Get a list of the songs saved in the current Spotify user's 'Your Music' library.
 */
export function createGetMeTracks(
  args: InferRequestType<typeof client.me.tracks.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.tracks.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMeTracksQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /me/tracks
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutMeTracksMutationKey() {
  return ['me', 'PUT', '/me/tracks'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /me/tracks
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutMeTracksMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutMeTracksMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.tracks.$put>) =>
    parseResponse(client.me.tracks.$put(args, clientOptions)),
})

/**
 * PUT /me/tracks
 *
 * Save Tracks for Current User
 *
 * Save one or more tracks to the current user's 'Your Music' library.
 */
export function createPutMeTracks(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.tracks.$put>>>>>,
      Error,
      InferRequestType<typeof client.me.tracks.$put>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutMeTracksMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /me/tracks
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeleteMeTracksMutationKey() {
  return ['me', 'DELETE', '/me/tracks'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /me/tracks
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeleteMeTracksMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getDeleteMeTracksMutationKey(),
  mutationFn: async (args: InferRequestType<typeof client.me.tracks.$delete>) =>
    parseResponse(client.me.tracks.$delete(args, clientOptions)),
})

/**
 * DELETE /me/tracks
 *
 * Remove User's Saved Tracks
 *
 * Remove one or more tracks from the current user's 'Your Music' library.
 */
export function createDeleteMeTracks(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.tracks.$delete>>>>
      >,
      Error,
      InferRequestType<typeof client.me.tracks.$delete>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getDeleteMeTracksMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /me/tracks/contains
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetMeTracksContainsQueryKey(
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
) {
  return ['me', 'GET', '/me/tracks/contains', args] as const
}

/**
 * Returns Svelte Query query options for GET /me/tracks/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetMeTracksContainsQueryOptions = (
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetMeTracksContainsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.me.tracks.contains.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /me/tracks/contains
 *
 * Check User's Saved Tracks
 *
 * Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.
 */
export function createGetMeTracksContains(
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.tracks.contains.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetMeTracksContainsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /playlists/{playlist_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPlaylistsPlaylistIdQueryKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
) {
  return ['playlists', 'GET', '/playlists/:playlist_id', args] as const
}

/**
 * Returns Svelte Query query options for GET /playlists/{playlist_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPlaylistsPlaylistIdQueryOptions = (
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPlaylistsPlaylistIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.playlists[':playlist_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /playlists/{playlist_id}
 *
 * Get Playlist
 *
 * Get a playlist owned by a Spotify user.
 */
export function createGetPlaylistsPlaylistId(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPlaylistsPlaylistIdQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /playlists/{playlist_id}
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutPlaylistsPlaylistIdMutationKey() {
  return ['playlists', 'PUT', '/playlists/:playlist_id'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /playlists/{playlist_id}
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutPlaylistsPlaylistIdMutationOptions = (clientOptions?: ClientRequestOptions) => ({
  mutationKey: getPutPlaylistsPlaylistIdMutationKey(),
  mutationFn: async (args: InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>) =>
    parseResponse(client.playlists[':playlist_id'].$put(args, clientOptions)),
})

/**
 * PUT /playlists/{playlist_id}
 *
 * Change Playlist Details
 *
 * Change a playlist's name and public/private state. (The user must, of
 * course, own the playlist.)
 */
export function createPutPlaylistsPlaylistId(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['$put']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPutPlaylistsPlaylistIdMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /playlists/{playlist_id}/followers
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutPlaylistsPlaylistIdFollowersMutationKey() {
  return ['playlists', 'PUT', '/playlists/:playlist_id/followers'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /playlists/{playlist_id}/followers
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutPlaylistsPlaylistIdFollowersMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutPlaylistsPlaylistIdFollowersMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>,
  ) => parseResponse(client.playlists[':playlist_id'].followers.$put(args, clientOptions)),
})

/**
 * PUT /playlists/{playlist_id}/followers
 *
 * Follow Playlist
 *
 * Add the current user as a follower of a playlist.
 */
export function createPutPlaylistsPlaylistIdFollowers(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['followers']['$put']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPutPlaylistsPlaylistIdFollowersMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /playlists/{playlist_id}/followers
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeletePlaylistsPlaylistIdFollowersMutationKey() {
  return ['playlists', 'DELETE', '/playlists/:playlist_id/followers'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /playlists/{playlist_id}/followers
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeletePlaylistsPlaylistIdFollowersMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeletePlaylistsPlaylistIdFollowersMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>,
  ) => parseResponse(client.playlists[':playlist_id'].followers.$delete(args, clientOptions)),
})

/**
 * DELETE /playlists/{playlist_id}/followers
 *
 * Unfollow Playlist
 *
 * Remove the current user as a follower of a playlist.
 */
export function createDeletePlaylistsPlaylistIdFollowers(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getDeletePlaylistsPlaylistIdFollowersMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /playlists/{playlist_id}/followers/contains
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPlaylistsPlaylistIdFollowersContainsQueryKey(
  args: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
) {
  return ['playlists', 'GET', '/playlists/:playlist_id/followers/contains', args] as const
}

/**
 * Returns Svelte Query query options for GET /playlists/{playlist_id}/followers/contains
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPlaylistsPlaylistIdFollowersContainsQueryOptions = (
  args: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPlaylistsPlaylistIdFollowersContainsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.playlists[':playlist_id'].followers.contains.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /playlists/{playlist_id}/followers/contains
 *
 * Check if Users Follow Playlist
 *
 * Check to see if one or more Spotify users are following a specified playlist.
 */
export function createGetPlaylistsPlaylistIdFollowersContains(
  args: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<(typeof client.playlists)[':playlist_id']['followers']['contains']['$get']>
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } =
      getGetPlaylistsPlaylistIdFollowersContainsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /playlists/{playlist_id}/images
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPlaylistsPlaylistIdImagesQueryKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
) {
  return ['playlists', 'GET', '/playlists/:playlist_id/images', args] as const
}

/**
 * Returns Svelte Query query options for GET /playlists/{playlist_id}/images
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPlaylistsPlaylistIdImagesQueryOptions = (
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPlaylistsPlaylistIdImagesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.playlists[':playlist_id'].images.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /playlists/{playlist_id}/images
 *
 * Get Playlist Cover Image
 *
 * Get the current image associated with a specific playlist.
 */
export function createGetPlaylistsPlaylistIdImages(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['images']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPlaylistsPlaylistIdImagesQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /playlists/{playlist_id}/images
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutPlaylistsPlaylistIdImagesMutationKey() {
  return ['playlists', 'PUT', '/playlists/:playlist_id/images'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /playlists/{playlist_id}/images
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutPlaylistsPlaylistIdImagesMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutPlaylistsPlaylistIdImagesMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>,
  ) => parseResponse(client.playlists[':playlist_id'].images.$put(args, clientOptions)),
})

/**
 * PUT /playlists/{playlist_id}/images
 *
 * Add Custom Playlist Cover Image
 *
 * Replace the image used to represent a specific playlist.
 */
export function createPutPlaylistsPlaylistIdImages(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['images']['$put']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPutPlaylistsPlaylistIdImagesMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /playlists/{playlist_id}/tracks
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetPlaylistsPlaylistIdTracksQueryKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
) {
  return ['playlists', 'GET', '/playlists/:playlist_id/tracks', args] as const
}

/**
 * Returns Svelte Query query options for GET /playlists/{playlist_id}/tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetPlaylistsPlaylistIdTracksQueryOptions = (
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetPlaylistsPlaylistIdTracksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.playlists[':playlist_id'].tracks.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /playlists/{playlist_id}/tracks
 *
 * Get Playlist Items
 *
 * Get full details of the items of a playlist owned by a Spotify user.
 */
export function createGetPlaylistsPlaylistIdTracks(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetPlaylistsPlaylistIdTracksQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for PUT /playlists/{playlist_id}/tracks
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPutPlaylistsPlaylistIdTracksMutationKey() {
  return ['playlists', 'PUT', '/playlists/:playlist_id/tracks'] as const
}

/**
 * Returns Svelte Query mutation options for PUT /playlists/{playlist_id}/tracks
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPutPlaylistsPlaylistIdTracksMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPutPlaylistsPlaylistIdTracksMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>,
  ) => parseResponse(client.playlists[':playlist_id'].tracks.$put(args, clientOptions)),
})

/**
 * PUT /playlists/{playlist_id}/tracks
 *
 * Update Playlist Items
 *
 * Either reorder or replace items in a playlist depending on the request's parameters.
 * To reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.
 * To replace items, include `uris` as either a query parameter or in the request's body.
 * Replacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.
 * <br/>
 * **Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.
 * These operations can't be applied together in a single request.
 */
export function createPutPlaylistsPlaylistIdTracks(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPutPlaylistsPlaylistIdTracksMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /playlists/{playlist_id}/tracks
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostPlaylistsPlaylistIdTracksMutationKey() {
  return ['playlists', 'POST', '/playlists/:playlist_id/tracks'] as const
}

/**
 * Returns Svelte Query mutation options for POST /playlists/{playlist_id}/tracks
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostPlaylistsPlaylistIdTracksMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostPlaylistsPlaylistIdTracksMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>,
  ) => parseResponse(client.playlists[':playlist_id'].tracks.$post(args, clientOptions)),
})

/**
 * POST /playlists/{playlist_id}/tracks
 *
 * Add Items to Playlist
 *
 * Add one or more items to a user's playlist.
 */
export function createPostPlaylistsPlaylistIdTracks(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostPlaylistsPlaylistIdTracksMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query mutation key for DELETE /playlists/{playlist_id}/tracks
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getDeletePlaylistsPlaylistIdTracksMutationKey() {
  return ['playlists', 'DELETE', '/playlists/:playlist_id/tracks'] as const
}

/**
 * Returns Svelte Query mutation options for DELETE /playlists/{playlist_id}/tracks
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getDeletePlaylistsPlaylistIdTracksMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getDeletePlaylistsPlaylistIdTracksMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>,
  ) => parseResponse(client.playlists[':playlist_id'].tracks.$delete(args, clientOptions)),
})

/**
 * DELETE /playlists/{playlist_id}/tracks
 *
 * Remove Playlist Items
 *
 * Remove one or more items from a user's playlist.
 */
export function createDeletePlaylistsPlaylistIdTracks(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getDeletePlaylistsPlaylistIdTracksMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /recommendations
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetRecommendationsQueryKey(
  args: InferRequestType<typeof client.recommendations.$get>,
) {
  return ['recommendations', 'GET', '/recommendations', args] as const
}

/**
 * Returns Svelte Query query options for GET /recommendations
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetRecommendationsQueryOptions = (
  args: InferRequestType<typeof client.recommendations.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetRecommendationsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.recommendations.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /recommendations
 *
 * Get Recommendations
 *
 * Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.
 *
 * For artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.
 */
export function createGetRecommendations(
  args: InferRequestType<typeof client.recommendations.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.recommendations.$get>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetRecommendationsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /recommendations/available-genre-seeds
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetRecommendationsAvailableGenreSeedsQueryKey() {
  return ['recommendations', 'GET', '/recommendations/available-genre-seeds'] as const
}

/**
 * Returns Svelte Query query options for GET /recommendations/available-genre-seeds
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetRecommendationsAvailableGenreSeedsQueryOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetRecommendationsAvailableGenreSeedsQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.recommendations['available-genre-seeds'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /recommendations/available-genre-seeds
 *
 * Get Available Genre Seeds
 *
 * Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).
 */
export function createGetRecommendationsAvailableGenreSeeds(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.recommendations)['available-genre-seeds']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } =
      getGetRecommendationsAvailableGenreSeedsQueryOptions(opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /search
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetSearchQueryKey(args: InferRequestType<typeof client.search.$get>) {
  return ['search', 'GET', '/search', args] as const
}

/**
 * Returns Svelte Query query options for GET /search
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetSearchQueryOptions = (
  args: InferRequestType<typeof client.search.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetSearchQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.search.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /search
 *
 * Search for Item
 *
 * Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks
 * that match a keyword string.<br />
 * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function createGetSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.search.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetSearchQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /shows
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetShowsQueryKey(args: InferRequestType<typeof client.shows.$get>) {
  return ['shows', 'GET', '/shows', args] as const
}

/**
 * Returns Svelte Query query options for GET /shows
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetShowsQueryOptions = (
  args: InferRequestType<typeof client.shows.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetShowsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.shows.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /shows
 *
 * Get Several Shows
 *
 * Get Spotify catalog information for several shows based on their Spotify IDs.
 */
export function createGetShows(
  args: InferRequestType<typeof client.shows.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.shows.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetShowsQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /shows/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetShowsIdQueryKey(
  args: InferRequestType<(typeof client.shows)[':id']['$get']>,
) {
  return ['shows', 'GET', '/shows/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /shows/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetShowsIdQueryOptions = (
  args: InferRequestType<(typeof client.shows)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetShowsIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.shows[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /shows/{id}
 *
 * Get Show
 *
 * Get Spotify catalog information for a single show identified by its
 * unique Spotify ID.
 */
export function createGetShowsId(
  args: InferRequestType<(typeof client.shows)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.shows)[':id']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetShowsIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /shows/{id}/episodes
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetShowsIdEpisodesQueryKey(
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
) {
  return ['shows', 'GET', '/shows/:id/episodes', args] as const
}

/**
 * Returns Svelte Query query options for GET /shows/{id}/episodes
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetShowsIdEpisodesQueryOptions = (
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetShowsIdEpisodesQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.shows[':id'].episodes.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /shows/{id}/episodes
 *
 * Get Show Episodes
 *
 * Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.
 */
export function createGetShowsIdEpisodes(
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.shows)[':id']['episodes']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetShowsIdEpisodesQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /tracks
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTracksQueryKey(args: InferRequestType<typeof client.tracks.$get>) {
  return ['tracks', 'GET', '/tracks', args] as const
}

/**
 * Returns Svelte Query query options for GET /tracks
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTracksQueryOptions = (
  args: InferRequestType<typeof client.tracks.$get>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTracksQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.tracks.$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /tracks
 *
 * Get Several Tracks
 *
 * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
 */
export function createGetTracks(
  args: InferRequestType<typeof client.tracks.$get>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.tracks.$get>>>>>,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTracksQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /tracks/{id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetTracksIdQueryKey(
  args: InferRequestType<(typeof client.tracks)[':id']['$get']>,
) {
  return ['tracks', 'GET', '/tracks/:id', args] as const
}

/**
 * Returns Svelte Query query options for GET /tracks/{id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetTracksIdQueryOptions = (
  args: InferRequestType<(typeof client.tracks)[':id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetTracksIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.tracks[':id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /tracks/{id}
 *
 * Get Track
 *
 * Get Spotify catalog information for a single track identified by its
 * unique Spotify ID.
 */
export function createGetTracksId(
  args: InferRequestType<(typeof client.tracks)[':id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<(typeof client.tracks)[':id']['$get']>>>>
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetTracksIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /users/{user_id}
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersUserIdQueryKey(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return ['users', 'GET', '/users/:user_id', args] as const
}

/**
 * Returns Svelte Query query options for GET /users/{user_id}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdQueryOptions = (
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersUserIdQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users[':user_id'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/{user_id}
 *
 * Get User's Profile
 *
 * Get public profile information about a Spotify user.
 */
export function createGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<(typeof client.users)[':user_id']['$get']>>>
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetUsersUserIdQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /users/{user_id}/playlists
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetUsersUserIdPlaylistsQueryKey(
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
) {
  return ['users', 'GET', '/users/:user_id/playlists', args] as const
}

/**
 * Returns Svelte Query query options for GET /users/{user_id}/playlists
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetUsersUserIdPlaylistsQueryOptions = (
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetUsersUserIdPlaylistsQueryKey(args),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.users[':user_id'].playlists.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /users/{user_id}/playlists
 *
 * Get User's Playlists
 *
 * Get a list of the playlists owned or followed by a Spotify user.
 */
export function createGetUsersUserIdPlaylists(
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)[':user_id']['playlists']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetUsersUserIdPlaylistsQueryOptions(
      args,
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query mutation key for POST /users/{user_id}/playlists
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostUsersUserIdPlaylistsMutationKey() {
  return ['users', 'POST', '/users/:user_id/playlists'] as const
}

/**
 * Returns Svelte Query mutation options for POST /users/{user_id}/playlists
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostUsersUserIdPlaylistsMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostUsersUserIdPlaylistsMutationKey(),
  mutationFn: async (
    args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>,
  ) => parseResponse(client.users[':user_id'].playlists.$post(args, clientOptions)),
})

/**
 * POST /users/{user_id}/playlists
 *
 * Create Playlist
 *
 * Create a playlist for a Spotify user. (The playlist will be empty until
 * you [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)
 */
export function createPostUsersUserIdPlaylists(
  options?: () => {
    mutation?: CreateMutationOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.users)[':user_id']['playlists']['$post']>>
          >
        >
      >,
      Error,
      InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>
    >
    client?: ClientRequestOptions
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } = getPostUsersUserIdPlaylistsMutationOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}
