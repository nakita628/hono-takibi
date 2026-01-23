import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/spotify'

/**
 * GET /albums
 *
 * Get Several Albums
 *
 * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
 */
export function createGetAlbums(
  args: InferRequestType<typeof client.albums.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.albums.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAlbumsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.albums.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /albums
 */
export function getGetAlbumsQueryKey(args?: InferRequestType<typeof client.albums.$get>) {
  return ['/albums', ...(args ? [args] : [])] as const
}

/**
 * GET /albums/{id}
 *
 * Get Album
 *
 * Get Spotify catalog information for a single album.
 */
export function createGetAlbumsId(
  args: InferRequestType<(typeof client.albums)[':id']['$get']>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.albums)[':id']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAlbumsIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.albums[':id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /albums/{id}
 */
export function getGetAlbumsIdQueryKey(
  args?: InferRequestType<(typeof client.albums)[':id']['$get']>,
) {
  return ['/albums/:id', ...(args ? [args] : [])] as const
}

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
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.albums)[':id']['tracks']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAlbumsIdTracksQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.albums[':id'].tracks.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /albums/{id}/tracks
 */
export function getGetAlbumsIdTracksQueryKey(
  args?: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
) {
  return ['/albums/:id/tracks', ...(args ? [args] : [])] as const
}

/**
 * GET /artists
 *
 * Get Several Artists
 *
 * Get Spotify catalog information for several artists based on their Spotify IDs.
 */
export function createGetArtists(
  args: InferRequestType<typeof client.artists.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.artists.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetArtistsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.artists.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /artists
 */
export function getGetArtistsQueryKey(args?: InferRequestType<typeof client.artists.$get>) {
  return ['/artists', ...(args ? [args] : [])] as const
}

/**
 * GET /artists/{id}
 *
 * Get Artist
 *
 * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
 */
export function createGetArtistsId(
  args: InferRequestType<(typeof client.artists)[':id']['$get']>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.artists)[':id']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetArtistsIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.artists[':id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /artists/{id}
 */
export function getGetArtistsIdQueryKey(
  args?: InferRequestType<(typeof client.artists)[':id']['$get']>,
) {
  return ['/artists/:id', ...(args ? [args] : [])] as const
}

/**
 * GET /artists/{id}/albums
 *
 * Get Artist's Albums
 *
 * Get Spotify catalog information about an artist's albums.
 */
export function createGetArtistsIdAlbums(
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.artists)[':id']['albums']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetArtistsIdAlbumsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.artists[':id'].albums.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /artists/{id}/albums
 */
export function getGetArtistsIdAlbumsQueryKey(
  args?: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
) {
  return ['/artists/:id/albums', ...(args ? [args] : [])] as const
}

/**
 * GET /artists/{id}/related-artists
 *
 * Get Artist's Related Artists
 *
 * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's [listening history](http://news.spotify.com/se/2010/02/03/related-artists/).
 */
export function createGetArtistsIdRelatedArtists(
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.artists)[':id']['related-artists']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetArtistsIdRelatedArtistsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.artists[':id']['related-artists'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /artists/{id}/related-artists
 */
export function getGetArtistsIdRelatedArtistsQueryKey(
  args?: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
) {
  return ['/artists/:id/related-artists', ...(args ? [args] : [])] as const
}

/**
 * GET /artists/{id}/top-tracks
 *
 * Get Artist's Top Tracks
 *
 * Get Spotify catalog information about an artist's top tracks by country.
 */
export function createGetArtistsIdTopTracks(
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.artists)[':id']['top-tracks']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetArtistsIdTopTracksQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.artists[':id']['top-tracks'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /artists/{id}/top-tracks
 */
export function getGetArtistsIdTopTracksQueryKey(
  args?: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
) {
  return ['/artists/:id/top-tracks', ...(args ? [args] : [])] as const
}

/**
 * GET /audio-analysis/{id}
 *
 * Get Track's Audio Analysis
 *
 * Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.
 */
export function createGetAudioAnalysisId(
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['audio-analysis'][':id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAudioAnalysisIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['audio-analysis'][':id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /audio-analysis/{id}
 */
export function getGetAudioAnalysisIdQueryKey(
  args?: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
) {
  return ['/audio-analysis/:id', ...(args ? [args] : [])] as const
}

/**
 * GET /audio-features
 *
 * Get Tracks' Audio Features
 *
 * Get audio features for multiple tracks based on their Spotify IDs.
 */
export function createGetAudioFeatures(
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client)['audio-features']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAudioFeaturesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['audio-features'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /audio-features
 */
export function getGetAudioFeaturesQueryKey(
  args?: InferRequestType<(typeof client)['audio-features']['$get']>,
) {
  return ['/audio-features', ...(args ? [args] : [])] as const
}

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
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['audio-features'][':id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAudioFeaturesIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client['audio-features'][':id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /audio-features/{id}
 */
export function getGetAudioFeaturesIdQueryKey(
  args?: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
) {
  return ['/audio-features/:id', ...(args ? [args] : [])] as const
}

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
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.audiobooks.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAudiobooksQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.audiobooks.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /audiobooks
 */
export function getGetAudiobooksQueryKey(args?: InferRequestType<typeof client.audiobooks.$get>) {
  return ['/audiobooks', ...(args ? [args] : [])] as const
}

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
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.audiobooks)[':id']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAudiobooksIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.audiobooks[':id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /audiobooks/{id}
 */
export function getGetAudiobooksIdQueryKey(
  args?: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
) {
  return ['/audiobooks/:id', ...(args ? [args] : [])] as const
}

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
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetAudiobooksIdChaptersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.audiobooks[':id'].chapters.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /audiobooks/{id}/chapters
 */
export function getGetAudiobooksIdChaptersQueryKey(
  args?: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
) {
  return ['/audiobooks/:id/chapters', ...(args ? [args] : [])] as const
}

/**
 * GET /browse/categories
 *
 * Get Several Browse Categories
 *
 * Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 */
export function createGetBrowseCategories(
  args: InferRequestType<typeof client.browse.categories.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.browse.categories.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetBrowseCategoriesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.browse.categories.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /browse/categories
 */
export function getGetBrowseCategoriesQueryKey(
  args?: InferRequestType<typeof client.browse.categories.$get>,
) {
  return ['/browse/categories', ...(args ? [args] : [])] as const
}

/**
 * GET /browse/categories/{category_id}
 *
 * Get Single Browse Category
 *
 * Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 */
export function createGetBrowseCategoriesCategoryId(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.browse.categories)[':category_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetBrowseCategoriesCategoryIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.browse.categories[':category_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /browse/categories/{category_id}
 */
export function getGetBrowseCategoriesCategoryIdQueryKey(
  args?: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
) {
  return ['/browse/categories/:category_id', ...(args ? [args] : [])] as const
}

/**
 * GET /browse/categories/{category_id}/playlists
 *
 * Get Category's Playlists
 *
 * Get a list of Spotify playlists tagged with a particular category.
 */
export function createGetBrowseCategoriesCategoryIdPlaylists(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetBrowseCategoriesCategoryIdPlaylistsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.browse.categories[':category_id'].playlists.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /browse/categories/{category_id}/playlists
 */
export function getGetBrowseCategoriesCategoryIdPlaylistsQueryKey(
  args?: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
) {
  return ['/browse/categories/:category_id/playlists', ...(args ? [args] : [])] as const
}

/**
 * GET /browse/featured-playlists
 *
 * Get Featured Playlists
 *
 * Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
 */
export function createGetBrowseFeaturedPlaylists(
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.browse)['featured-playlists']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetBrowseFeaturedPlaylistsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.browse['featured-playlists'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /browse/featured-playlists
 */
export function getGetBrowseFeaturedPlaylistsQueryKey(
  args?: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
) {
  return ['/browse/featured-playlists', ...(args ? [args] : [])] as const
}

/**
 * GET /browse/new-releases
 *
 * Get New Releases
 *
 * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
 */
export function createGetBrowseNewReleases(
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.browse)['new-releases']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetBrowseNewReleasesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.browse['new-releases'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /browse/new-releases
 */
export function getGetBrowseNewReleasesQueryKey(
  args?: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
) {
  return ['/browse/new-releases', ...(args ? [args] : [])] as const
}

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
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.chapters.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChaptersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.chapters.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /chapters
 */
export function getGetChaptersQueryKey(args?: InferRequestType<typeof client.chapters.$get>) {
  return ['/chapters', ...(args ? [args] : [])] as const
}

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
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.chapters)[':id']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetChaptersIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.chapters[':id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /chapters/{id}
 */
export function getGetChaptersIdQueryKey(
  args?: InferRequestType<(typeof client.chapters)[':id']['$get']>,
) {
  return ['/chapters/:id', ...(args ? [args] : [])] as const
}

/**
 * GET /episodes
 *
 * Get Several Episodes
 *
 * Get Spotify catalog information for several episodes based on their Spotify IDs.
 */
export function createGetEpisodes(
  args: InferRequestType<typeof client.episodes.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.episodes.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEpisodesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.episodes.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /episodes
 */
export function getGetEpisodesQueryKey(args?: InferRequestType<typeof client.episodes.$get>) {
  return ['/episodes', ...(args ? [args] : [])] as const
}

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
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.episodes)[':id']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetEpisodesIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.episodes[':id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /episodes/{id}
 */
export function getGetEpisodesIdQueryKey(
  args?: InferRequestType<(typeof client.episodes)[':id']['$get']>,
) {
  return ['/episodes/:id', ...(args ? [args] : [])] as const
}

/**
 * GET /markets
 *
 * Get Available Markets
 *
 * Get the list of markets where Spotify is available.
 */
export function createGetMarkets(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.markets.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMarketsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.markets.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /markets
 */
export function getGetMarketsQueryKey() {
  return ['/markets'] as const
}

/**
 * GET /me
 *
 * Get Current User's Profile
 *
 * Get detailed profile information about the current user (including the
 * current user's username).
 */
export function createGetMe(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMeQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me
 */
export function getGetMeQueryKey() {
  return ['/me'] as const
}

/**
 * GET /me/albums
 *
 * Get User's Saved Albums
 *
 * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
 */
export function createGetMeAlbums(
  args: InferRequestType<typeof client.me.albums.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.albums.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMeAlbumsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.albums.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/albums
 */
export function getGetMeAlbumsQueryKey(args?: InferRequestType<typeof client.me.albums.$get>) {
  return ['/me/albums', ...(args ? [args] : [])] as const
}

/**
 * PUT /me/albums
 *
 * Save Albums for Current User
 *
 * Save one or more albums to the current user's 'Your Music' library.
 */
export function createPutMeAlbums(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.albums.$put> | undefined,
      Error,
      InferRequestType<typeof client.me.albums.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.albums.$put> | undefined,
    Error,
    InferRequestType<typeof client.me.albums.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.albums.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /me/albums
 *
 * Remove Users' Saved Albums
 *
 * Remove one or more albums from the current user's 'Your Music' library.
 */
export function createDeleteMeAlbums(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.albums.$delete> | undefined,
      Error,
      InferRequestType<typeof client.me.albums.$delete>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.albums.$delete> | undefined,
    Error,
    InferRequestType<typeof client.me.albums.$delete>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.albums.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /me/albums/contains
 *
 * Check User's Saved Albums
 *
 * Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
 */
export function createGetMeAlbumsContains(
  args: InferRequestType<typeof client.me.albums.contains.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.albums.contains.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMeAlbumsContainsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.albums.contains.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/albums/contains
 */
export function getGetMeAlbumsContainsQueryKey(
  args?: InferRequestType<typeof client.me.albums.contains.$get>,
) {
  return ['/me/albums/contains', ...(args ? [args] : [])] as const
}

/**
 * GET /me/audiobooks
 *
 * Get User's Saved Audiobooks
 *
 * Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.
 */
export function createGetMeAudiobooks(
  args: InferRequestType<typeof client.me.audiobooks.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.audiobooks.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMeAudiobooksQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.audiobooks.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/audiobooks
 */
export function getGetMeAudiobooksQueryKey(
  args?: InferRequestType<typeof client.me.audiobooks.$get>,
) {
  return ['/me/audiobooks', ...(args ? [args] : [])] as const
}

/**
 * PUT /me/audiobooks
 *
 * Save Audiobooks for Current User
 *
 * Save one or more audiobooks to the current Spotify user's library.
 */
export function createPutMeAudiobooks(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.audiobooks.$put> | undefined,
      Error,
      InferRequestType<typeof client.me.audiobooks.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.audiobooks.$put> | undefined,
    Error,
    InferRequestType<typeof client.me.audiobooks.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.audiobooks.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /me/audiobooks
 *
 * Remove User's Saved Audiobooks
 *
 * Remove one or more audiobooks from the Spotify user's library.
 */
export function createDeleteMeAudiobooks(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.audiobooks.$delete> | undefined,
      Error,
      InferRequestType<typeof client.me.audiobooks.$delete>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.audiobooks.$delete> | undefined,
    Error,
    InferRequestType<typeof client.me.audiobooks.$delete>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.me.audiobooks.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /me/audiobooks/contains
 *
 * Check User's Saved Audiobooks
 *
 * Check if one or more audiobooks are already saved in the current Spotify user's library.
 */
export function createGetMeAudiobooksContains(
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.audiobooks.contains.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMeAudiobooksContainsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.audiobooks.contains.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/audiobooks/contains
 */
export function getGetMeAudiobooksContainsQueryKey(
  args?: InferRequestType<typeof client.me.audiobooks.contains.$get>,
) {
  return ['/me/audiobooks/contains', ...(args ? [args] : [])] as const
}

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
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.episodes.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMeEpisodesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.episodes.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/episodes
 */
export function getGetMeEpisodesQueryKey(args?: InferRequestType<typeof client.me.episodes.$get>) {
  return ['/me/episodes', ...(args ? [args] : [])] as const
}

/**
 * PUT /me/episodes
 *
 * Save Episodes for Current User
 *
 * Save one or more episodes to the current user's library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 */
export function createPutMeEpisodes(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.episodes.$put> | undefined,
      Error,
      InferRequestType<typeof client.me.episodes.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.episodes.$put> | undefined,
    Error,
    InferRequestType<typeof client.me.episodes.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.episodes.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /me/episodes
 *
 * Remove User's Saved Episodes
 *
 * Remove one or more episodes from the current user's library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 */
export function createDeleteMeEpisodes(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.episodes.$delete> | undefined,
      Error,
      InferRequestType<typeof client.me.episodes.$delete>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.episodes.$delete> | undefined,
    Error,
    InferRequestType<typeof client.me.episodes.$delete>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.episodes.$delete(args, options?.client)),
    },
    queryClient,
  )
}

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
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.episodes.contains.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMeEpisodesContainsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.episodes.contains.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/episodes/contains
 */
export function getGetMeEpisodesContainsQueryKey(
  args?: InferRequestType<typeof client.me.episodes.contains.$get>,
) {
  return ['/me/episodes/contains', ...(args ? [args] : [])] as const
}

/**
 * GET /me/following
 *
 * Get Followed Artists
 *
 * Get the current user's followed artists.
 */
export function createGetMeFollowing(
  args: InferRequestType<typeof client.me.following.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.following.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMeFollowingQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.following.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/following
 */
export function getGetMeFollowingQueryKey(
  args?: InferRequestType<typeof client.me.following.$get>,
) {
  return ['/me/following', ...(args ? [args] : [])] as const
}

/**
 * PUT /me/following
 *
 * Follow Artists or Users
 *
 * Add the current user as a follower of one or more artists or other Spotify users.
 */
export function createPutMeFollowing(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.following.$put> | undefined,
      Error,
      InferRequestType<typeof client.me.following.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.following.$put> | undefined,
    Error,
    InferRequestType<typeof client.me.following.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.following.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /me/following
 *
 * Unfollow Artists or Users
 *
 * Remove the current user as a follower of one or more artists or other Spotify users.
 */
export function createDeleteMeFollowing(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.following.$delete> | undefined,
      Error,
      InferRequestType<typeof client.me.following.$delete>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.following.$delete> | undefined,
    Error,
    InferRequestType<typeof client.me.following.$delete>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.following.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /me/following/contains
 *
 * Check If User Follows Artists or Users
 *
 * Check to see if the current user is following one or more artists or other Spotify users.
 */
export function createGetMeFollowingContains(
  args: InferRequestType<typeof client.me.following.contains.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.following.contains.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMeFollowingContainsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.following.contains.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/following/contains
 */
export function getGetMeFollowingContainsQueryKey(
  args?: InferRequestType<typeof client.me.following.contains.$get>,
) {
  return ['/me/following/contains', ...(args ? [args] : [])] as const
}

/**
 * GET /me/player
 *
 * Get Playback State
 *
 * Get information about the user’s current playback state, including track or episode, progress, and active device.
 */
export function createGetMePlayer(
  args: InferRequestType<typeof client.me.player.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.player.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMePlayerQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.player.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/player
 */
export function getGetMePlayerQueryKey(args?: InferRequestType<typeof client.me.player.$get>) {
  return ['/me/player', ...(args ? [args] : [])] as const
}

/**
 * PUT /me/player
 *
 * Transfer Playback
 *
 * Transfer playback to a new device and determine if it should start playing.
 */
export function createPutMePlayer(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.player.$put> | undefined,
      Error,
      InferRequestType<typeof client.me.player.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.player.$put> | undefined,
    Error,
    InferRequestType<typeof client.me.player.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.player.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /me/player/currently-playing
 *
 * Get Currently Playing Track
 *
 * Get the object currently being played on the user's Spotify account.
 */
export function createGetMePlayerCurrentlyPlaying(
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.me.player)['currently-playing']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMePlayerCurrentlyPlayingQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.me.player['currently-playing'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/player/currently-playing
 */
export function getGetMePlayerCurrentlyPlayingQueryKey(
  args?: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
) {
  return ['/me/player/currently-playing', ...(args ? [args] : [])] as const
}

/**
 * GET /me/player/devices
 *
 * Get Available Devices
 *
 * Get information about a user’s available devices.
 */
export function createGetMePlayerDevices(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.player.devices.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMePlayerDevicesQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.player.devices.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/player/devices
 */
export function getGetMePlayerDevicesQueryKey() {
  return ['/me/player/devices'] as const
}

/**
 * POST /me/player/next
 *
 * Skip To Next
 *
 * Skips to next track in the user’s queue.
 */
export function createPostMePlayerNext(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.player.next.$post> | undefined,
      Error,
      InferRequestType<typeof client.me.player.next.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.player.next.$post> | undefined,
    Error,
    InferRequestType<typeof client.me.player.next.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.player.next.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /me/player/pause
 *
 * Pause Playback
 *
 * Pause playback on the user's account.
 */
export function createPutMePlayerPause(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.player.pause.$put> | undefined,
      Error,
      InferRequestType<typeof client.me.player.pause.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.player.pause.$put> | undefined,
    Error,
    InferRequestType<typeof client.me.player.pause.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.player.pause.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /me/player/play
 *
 * Start/Resume Playback
 *
 * Start a new context or resume current playback on the user's active device.
 */
export function createPutMePlayerPlay(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.player.play.$put> | undefined,
      Error,
      InferRequestType<typeof client.me.player.play.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.player.play.$put> | undefined,
    Error,
    InferRequestType<typeof client.me.player.play.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.player.play.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /me/player/previous
 *
 * Skip To Previous
 *
 * Skips to previous track in the user’s queue.
 */
export function createPostMePlayerPrevious(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.player.previous.$post> | undefined,
      Error,
      InferRequestType<typeof client.me.player.previous.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.player.previous.$post> | undefined,
    Error,
    InferRequestType<typeof client.me.player.previous.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.me.player.previous.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /me/player/queue
 *
 * Get the User's Queue
 *
 * Get the list of objects that make up the user's queue.
 */
export function createGetMePlayerQueue(
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.player.queue.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMePlayerQueueQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.player.queue.$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/player/queue
 */
export function getGetMePlayerQueueQueryKey() {
  return ['/me/player/queue'] as const
}

/**
 * POST /me/player/queue
 *
 * Add Item to Playback Queue
 *
 * Add an item to the end of the user's current playback queue.
 */
export function createPostMePlayerQueue(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.player.queue.$post> | undefined,
      Error,
      InferRequestType<typeof client.me.player.queue.$post>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.player.queue.$post> | undefined,
    Error,
    InferRequestType<typeof client.me.player.queue.$post>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.me.player.queue.$post(args, options?.client)),
    },
    queryClient,
  )
}

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
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.me.player)['recently-played']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMePlayerRecentlyPlayedQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.me.player['recently-played'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/player/recently-played
 */
export function getGetMePlayerRecentlyPlayedQueryKey(
  args?: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
) {
  return ['/me/player/recently-played', ...(args ? [args] : [])] as const
}

/**
 * PUT /me/player/repeat
 *
 * Set Repeat Mode
 *
 * Set the repeat mode for the user's playback. Options are repeat-track,
 * repeat-context, and off.
 */
export function createPutMePlayerRepeat(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.player.repeat.$put> | undefined,
      Error,
      InferRequestType<typeof client.me.player.repeat.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.player.repeat.$put> | undefined,
    Error,
    InferRequestType<typeof client.me.player.repeat.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.me.player.repeat.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /me/player/seek
 *
 * Seek To Position
 *
 * Seeks to the given position in the user’s currently playing track.
 */
export function createPutMePlayerSeek(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.player.seek.$put> | undefined,
      Error,
      InferRequestType<typeof client.me.player.seek.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.player.seek.$put> | undefined,
    Error,
    InferRequestType<typeof client.me.player.seek.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.player.seek.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /me/player/shuffle
 *
 * Toggle Playback Shuffle
 *
 * Toggle shuffle on or off for user’s playback.
 */
export function createPutMePlayerShuffle(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.player.shuffle.$put> | undefined,
      Error,
      InferRequestType<typeof client.me.player.shuffle.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.player.shuffle.$put> | undefined,
    Error,
    InferRequestType<typeof client.me.player.shuffle.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.me.player.shuffle.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /me/player/volume
 *
 * Set Playback Volume
 *
 * Set the volume for the user’s current playback device.
 */
export function createPutMePlayerVolume(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.player.volume.$put> | undefined,
      Error,
      InferRequestType<typeof client.me.player.volume.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.player.volume.$put> | undefined,
    Error,
    InferRequestType<typeof client.me.player.volume.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.me.player.volume.$put(args, options?.client)),
    },
    queryClient,
  )
}

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
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.playlists.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMePlaylistsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.playlists.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/playlists
 */
export function getGetMePlaylistsQueryKey(
  args?: InferRequestType<typeof client.me.playlists.$get>,
) {
  return ['/me/playlists', ...(args ? [args] : [])] as const
}

/**
 * GET /me/shows
 *
 * Get User's Saved Shows
 *
 * Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.
 */
export function createGetMeShows(
  args: InferRequestType<typeof client.me.shows.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.shows.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMeShowsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.shows.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/shows
 */
export function getGetMeShowsQueryKey(args?: InferRequestType<typeof client.me.shows.$get>) {
  return ['/me/shows', ...(args ? [args] : [])] as const
}

/**
 * PUT /me/shows
 *
 * Save Shows for Current User
 *
 * Save one or more shows to current Spotify user's library.
 */
export function createPutMeShows(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.shows.$put> | undefined,
      Error,
      InferRequestType<typeof client.me.shows.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.shows.$put> | undefined,
    Error,
    InferRequestType<typeof client.me.shows.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.shows.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /me/shows
 *
 * Remove User's Saved Shows
 *
 * Delete one or more shows from current Spotify user's library.
 */
export function createDeleteMeShows(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.shows.$delete> | undefined,
      Error,
      InferRequestType<typeof client.me.shows.$delete>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.shows.$delete> | undefined,
    Error,
    InferRequestType<typeof client.me.shows.$delete>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.shows.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /me/shows/contains
 *
 * Check User's Saved Shows
 *
 * Check if one or more shows is already saved in the current Spotify user's library.
 */
export function createGetMeShowsContains(
  args: InferRequestType<typeof client.me.shows.contains.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.shows.contains.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMeShowsContainsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.shows.contains.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/shows/contains
 */
export function getGetMeShowsContainsQueryKey(
  args?: InferRequestType<typeof client.me.shows.contains.$get>,
) {
  return ['/me/shows/contains', ...(args ? [args] : [])] as const
}

/**
 * GET /me/top/{type}
 *
 * Get User's Top Items
 *
 * Get the current user's top artists or tracks based on calculated affinity.
 */
export function createGetMeTopType(
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.me.top)[':type']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMeTopTypeQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.top[':type'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/top/{type}
 */
export function getGetMeTopTypeQueryKey(
  args?: InferRequestType<(typeof client.me.top)[':type']['$get']>,
) {
  return ['/me/top/:type', ...(args ? [args] : [])] as const
}

/**
 * GET /me/tracks
 *
 * Get User's Saved Tracks
 *
 * Get a list of the songs saved in the current Spotify user's 'Your Music' library.
 */
export function createGetMeTracks(
  args: InferRequestType<typeof client.me.tracks.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.tracks.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMeTracksQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.tracks.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/tracks
 */
export function getGetMeTracksQueryKey(args?: InferRequestType<typeof client.me.tracks.$get>) {
  return ['/me/tracks', ...(args ? [args] : [])] as const
}

/**
 * PUT /me/tracks
 *
 * Save Tracks for Current User
 *
 * Save one or more tracks to the current user's 'Your Music' library.
 */
export function createPutMeTracks(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.tracks.$put> | undefined,
      Error,
      InferRequestType<typeof client.me.tracks.$put>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.tracks.$put> | undefined,
    Error,
    InferRequestType<typeof client.me.tracks.$put>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.tracks.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /me/tracks
 *
 * Remove User's Saved Tracks
 *
 * Remove one or more tracks from the current user's 'Your Music' library.
 */
export function createDeleteMeTracks(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<typeof client.me.tracks.$delete> | undefined,
      Error,
      InferRequestType<typeof client.me.tracks.$delete>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<typeof client.me.tracks.$delete> | undefined,
    Error,
    InferRequestType<typeof client.me.tracks.$delete>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) => parseResponse(client.me.tracks.$delete(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /me/tracks/contains
 *
 * Check User's Saved Tracks
 *
 * Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.
 */
export function createGetMeTracksContains(
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.me.tracks.contains.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetMeTracksContainsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.me.tracks.contains.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /me/tracks/contains
 */
export function getGetMeTracksContainsQueryKey(
  args?: InferRequestType<typeof client.me.tracks.contains.$get>,
) {
  return ['/me/tracks/contains', ...(args ? [args] : [])] as const
}

/**
 * GET /playlists/{playlist_id}
 *
 * Get Playlist
 *
 * Get a playlist owned by a Spotify user.
 */
export function createGetPlaylistsPlaylistId(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.playlists)[':playlist_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPlaylistsPlaylistIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.playlists[':playlist_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /playlists/{playlist_id}
 */
export function getGetPlaylistsPlaylistIdQueryKey(
  args?: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
) {
  return ['/playlists/:playlist_id', ...(args ? [args] : [])] as const
}

/**
 * PUT /playlists/{playlist_id}
 *
 * Change Playlist Details
 *
 * Change a playlist's name and public/private state. (The user must, of
 * course, own the playlist.)
 */
export function createPutPlaylistsPlaylistId(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.playlists)[':playlist_id']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.playlists)[':playlist_id']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.playlists[':playlist_id'].$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * PUT /playlists/{playlist_id}/followers
 *
 * Follow Playlist
 *
 * Add the current user as a follower of a playlist.
 */
export function createPutPlaylistsPlaylistIdFollowers(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.playlists[':playlist_id'].followers.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /playlists/{playlist_id}/followers
 *
 * Unfollow Playlist
 *
 * Remove the current user as a follower of a playlist.
 */
export function createDeletePlaylistsPlaylistIdFollowers(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>
      | undefined,
      Error,
      InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>
    | undefined,
    Error,
    InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.playlists[':playlist_id'].followers.$delete(args, options?.client)),
    },
    queryClient,
  )
}

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
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['contains']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPlaylistsPlaylistIdFollowersContainsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.playlists[':playlist_id'].followers.contains.$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /playlists/{playlist_id}/followers/contains
 */
export function getGetPlaylistsPlaylistIdFollowersContainsQueryKey(
  args?: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
) {
  return ['/playlists/:playlist_id/followers/contains', ...(args ? [args] : [])] as const
}

/**
 * GET /playlists/{playlist_id}/images
 *
 * Get Playlist Cover Image
 *
 * Get the current image associated with a specific playlist.
 */
export function createGetPlaylistsPlaylistIdImages(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPlaylistsPlaylistIdImagesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.playlists[':playlist_id'].images.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /playlists/{playlist_id}/images
 */
export function getGetPlaylistsPlaylistIdImagesQueryKey(
  args?: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
) {
  return ['/playlists/:playlist_id/images', ...(args ? [args] : [])] as const
}

/**
 * PUT /playlists/{playlist_id}/images
 *
 * Add Custom Playlist Cover Image
 *
 * Replace the image used to represent a specific playlist.
 */
export function createPutPlaylistsPlaylistIdImages(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.playlists)[':playlist_id']['images']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.playlists)[':playlist_id']['images']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.playlists[':playlist_id'].images.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /playlists/{playlist_id}/tracks
 *
 * Get Playlist Items
 *
 * Get full details of the items of a playlist owned by a Spotify user.
 */
export function createGetPlaylistsPlaylistIdTracks(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetPlaylistsPlaylistIdTracksQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.playlists[':playlist_id'].tracks.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /playlists/{playlist_id}/tracks
 */
export function getGetPlaylistsPlaylistIdTracksQueryKey(
  args?: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
) {
  return ['/playlists/:playlist_id/tracks', ...(args ? [args] : [])] as const
}

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
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$put']> | undefined,
      Error,
      InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$put']> | undefined,
    Error,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.playlists[':playlist_id'].tracks.$put(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * POST /playlists/{playlist_id}/tracks
 *
 * Add Items to Playlist
 *
 * Add one or more items to a user's playlist.
 */
export function createPostPlaylistsPlaylistIdTracks(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.playlists[':playlist_id'].tracks.$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * DELETE /playlists/{playlist_id}/tracks
 *
 * Remove Playlist Items
 *
 * Remove one or more items from a user's playlist.
 */
export function createDeletePlaylistsPlaylistIdTracks(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']> | undefined,
      Error,
      InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']> | undefined,
    Error,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.playlists[':playlist_id'].tracks.$delete(args, options?.client)),
    },
    queryClient,
  )
}

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
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.recommendations.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetRecommendationsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.recommendations.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /recommendations
 */
export function getGetRecommendationsQueryKey(
  args?: InferRequestType<typeof client.recommendations.$get>,
) {
  return ['/recommendations', ...(args ? [args] : [])] as const
}

/**
 * GET /recommendations/available-genre-seeds
 *
 * Get Available Genre Seeds
 *
 * Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).
 */
export function createGetRecommendationsAvailableGenreSeeds(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.recommendations)['available-genre-seeds']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetRecommendationsAvailableGenreSeedsQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.recommendations['available-genre-seeds'].$get(undefined, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /recommendations/available-genre-seeds
 */
export function getGetRecommendationsAvailableGenreSeedsQueryKey() {
  return ['/recommendations/available-genre-seeds'] as const
}

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
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.search.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetSearchQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.search.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /search
 */
export function getGetSearchQueryKey(args?: InferRequestType<typeof client.search.$get>) {
  return ['/search', ...(args ? [args] : [])] as const
}

/**
 * GET /shows
 *
 * Get Several Shows
 *
 * Get Spotify catalog information for several shows based on their Spotify IDs.
 */
export function createGetShows(
  args: InferRequestType<typeof client.shows.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.shows.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetShowsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.shows.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /shows
 */
export function getGetShowsQueryKey(args?: InferRequestType<typeof client.shows.$get>) {
  return ['/shows', ...(args ? [args] : [])] as const
}

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
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.shows)[':id']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetShowsIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.shows[':id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /shows/{id}
 */
export function getGetShowsIdQueryKey(
  args?: InferRequestType<(typeof client.shows)[':id']['$get']>,
) {
  return ['/shows/:id', ...(args ? [args] : [])] as const
}

/**
 * GET /shows/{id}/episodes
 *
 * Get Show Episodes
 *
 * Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.
 */
export function createGetShowsIdEpisodes(
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.shows)[':id']['episodes']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetShowsIdEpisodesQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.shows[':id'].episodes.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /shows/{id}/episodes
 */
export function getGetShowsIdEpisodesQueryKey(
  args?: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
) {
  return ['/shows/:id/episodes', ...(args ? [args] : [])] as const
}

/**
 * GET /tracks
 *
 * Get Several Tracks
 *
 * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
 */
export function createGetTracks(
  args: InferRequestType<typeof client.tracks.$get>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<typeof client.tracks.$get>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTracksQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.tracks.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /tracks
 */
export function getGetTracksQueryKey(args?: InferRequestType<typeof client.tracks.$get>) {
  return ['/tracks', ...(args ? [args] : [])] as const
}

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
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.tracks)[':id']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetTracksIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.tracks[':id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /tracks/{id}
 */
export function getGetTracksIdQueryKey(
  args?: InferRequestType<(typeof client.tracks)[':id']['$get']>,
) {
  return ['/tracks/:id', ...(args ? [args] : [])] as const
}

/**
 * GET /users/{user_id}
 *
 * Get User's Profile
 *
 * Get public profile information about a Spotify user.
 */
export function createGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  options?: {
    query?: CreateQueryOptions<InferResponseType<(typeof client.users)[':user_id']['$get']>, Error>
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () => parseResponse(client.users[':user_id'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/{user_id}
 */
export function getGetUsersUserIdQueryKey(
  args?: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return ['/users/:user_id', ...(args ? [args] : [])] as const
}

/**
 * GET /users/{user_id}/playlists
 *
 * Get User's Playlists
 *
 * Get a list of the playlists owned or followed by a Spotify user.
 */
export function createGetUsersUserIdPlaylists(
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.users)[':user_id']['playlists']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetUsersUserIdPlaylistsQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.users[':user_id'].playlists.$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /users/{user_id}/playlists
 */
export function getGetUsersUserIdPlaylistsQueryKey(
  args?: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
) {
  return ['/users/:user_id/playlists', ...(args ? [args] : [])] as const
}

/**
 * POST /users/{user_id}/playlists
 *
 * Create Playlist
 *
 * Create a playlist for a Spotify user. (The playlist will be empty until
 * you [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)
 */
export function createPostUsersUserIdPlaylists(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client.users)[':user_id']['playlists']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client.users)[':user_id']['playlists']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client.users[':user_id'].playlists.$post(args, options?.client)),
    },
    queryClient,
  )
}
