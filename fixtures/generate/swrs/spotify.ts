import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/spotify'

/**
 * Generates SWR cache key for GET /albums
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetAlbumsKey(args: InferRequestType<typeof client.albums.$get>) {
  return ['/albums', args] as const
}

/**
 * GET /albums
 *
 * Get Several Albums
 *
 * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
 */
export function useGetAlbums(
  args: InferRequestType<typeof client.albums.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAlbumsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.albums.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /albums/{id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetAlbumsIdKey(args: InferRequestType<(typeof client.albums)[':id']['$get']>) {
  return [`/albums/${args.param.id}`, args] as const
}

/**
 * GET /albums/{id}
 *
 * Get Album
 *
 * Get Spotify catalog information for a single album.
 */
export function useGetAlbumsId(
  args: InferRequestType<(typeof client.albums)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAlbumsIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.albums[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /albums/{id}/tracks
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetAlbumsIdTracksKey(
  args: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
) {
  return [`/albums/${args.param.id}/tracks`, args] as const
}

/**
 * GET /albums/{id}/tracks
 *
 * Get Album Tracks
 *
 * Get Spotify catalog information about an album’s tracks.
 * Optional parameters can be used to limit the number of tracks returned.
 */
export function useGetAlbumsIdTracks(
  args: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAlbumsIdTracksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.albums[':id'].tracks.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /artists
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetArtistsKey(args: InferRequestType<typeof client.artists.$get>) {
  return ['/artists', args] as const
}

/**
 * GET /artists
 *
 * Get Several Artists
 *
 * Get Spotify catalog information for several artists based on their Spotify IDs.
 */
export function useGetArtists(
  args: InferRequestType<typeof client.artists.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetArtistsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.artists.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /artists/{id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetArtistsIdKey(args: InferRequestType<(typeof client.artists)[':id']['$get']>) {
  return [`/artists/${args.param.id}`, args] as const
}

/**
 * GET /artists/{id}
 *
 * Get Artist
 *
 * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
 */
export function useGetArtistsId(
  args: InferRequestType<(typeof client.artists)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetArtistsIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.artists[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /artists/{id}/albums
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetArtistsIdAlbumsKey(
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
) {
  return [`/artists/${args.param.id}/albums`, args] as const
}

/**
 * GET /artists/{id}/albums
 *
 * Get Artist's Albums
 *
 * Get Spotify catalog information about an artist's albums.
 */
export function useGetArtistsIdAlbums(
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetArtistsIdAlbumsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.artists[':id'].albums.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /artists/{id}/related-artists
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetArtistsIdRelatedArtistsKey(
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
) {
  return [`/artists/${args.param.id}/related-artists`, args] as const
}

/**
 * GET /artists/{id}/related-artists
 *
 * Get Artist's Related Artists
 *
 * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's [listening history](http://news.spotify.com/se/2010/02/03/related-artists/).
 */
export function useGetArtistsIdRelatedArtists(
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetArtistsIdRelatedArtistsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.artists[':id']['related-artists'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /artists/{id}/top-tracks
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetArtistsIdTopTracksKey(
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
) {
  return [`/artists/${args.param.id}/top-tracks`, args] as const
}

/**
 * GET /artists/{id}/top-tracks
 *
 * Get Artist's Top Tracks
 *
 * Get Spotify catalog information about an artist's top tracks by country.
 */
export function useGetArtistsIdTopTracks(
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetArtistsIdTopTracksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.artists[':id']['top-tracks'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /audio-analysis/{id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetAudioAnalysisIdKey(
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
) {
  return [`/audio-analysis/${args.param.id}`, args] as const
}

/**
 * GET /audio-analysis/{id}
 *
 * Get Track's Audio Analysis
 *
 * Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.
 */
export function useGetAudioAnalysisId(
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAudioAnalysisIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['audio-analysis'][':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /audio-features
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetAudioFeaturesKey(
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
) {
  return ['/audio-features', args] as const
}

/**
 * GET /audio-features
 *
 * Get Tracks' Audio Features
 *
 * Get audio features for multiple tracks based on their Spotify IDs.
 */
export function useGetAudioFeatures(
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAudioFeaturesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['audio-features'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /audio-features/{id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetAudioFeaturesIdKey(
  args: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
) {
  return [`/audio-features/${args.param.id}`, args] as const
}

/**
 * GET /audio-features/{id}
 *
 * Get Track's Audio Features
 *
 * Get audio feature information for a single track identified by its unique
 * Spotify ID.
 */
export function useGetAudioFeaturesId(
  args: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAudioFeaturesIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client['audio-features'][':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /audiobooks
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetAudiobooksKey(args: InferRequestType<typeof client.audiobooks.$get>) {
  return ['/audiobooks', args] as const
}

/**
 * GET /audiobooks
 *
 * Get Several Audiobooks
 *
 * Get Spotify catalog information for several audiobooks identified by their Spotify IDs.<br />
 * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function useGetAudiobooks(
  args: InferRequestType<typeof client.audiobooks.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAudiobooksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.audiobooks.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /audiobooks/{id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetAudiobooksIdKey(
  args: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
) {
  return [`/audiobooks/${args.param.id}`, args] as const
}

/**
 * GET /audiobooks/{id}
 *
 * Get an Audiobook
 *
 * Get Spotify catalog information for a single audiobook.<br />
 * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function useGetAudiobooksId(
  args: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAudiobooksIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.audiobooks[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /audiobooks/{id}/chapters
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetAudiobooksIdChaptersKey(
  args: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
) {
  return [`/audiobooks/${args.param.id}/chapters`, args] as const
}

/**
 * GET /audiobooks/{id}/chapters
 *
 * Get Audiobook Chapters
 *
 * Get Spotify catalog information about an audiobook's chapters.<br />
 * **Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function useGetAudiobooksIdChapters(
  args: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetAudiobooksIdChaptersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.audiobooks[':id'].chapters.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /browse/categories
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetBrowseCategoriesKey(
  args: InferRequestType<typeof client.browse.categories.$get>,
) {
  return ['/browse/categories', args] as const
}

/**
 * GET /browse/categories
 *
 * Get Several Browse Categories
 *
 * Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 */
export function useGetBrowseCategories(
  args: InferRequestType<typeof client.browse.categories.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetBrowseCategoriesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.browse.categories.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /browse/categories/{category_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetBrowseCategoriesCategoryIdKey(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
) {
  return [`/browse/categories/${args.param.category_id}`, args] as const
}

/**
 * GET /browse/categories/{category_id}
 *
 * Get Single Browse Category
 *
 * Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
 */
export function useGetBrowseCategoriesCategoryId(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetBrowseCategoriesCategoryIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.browse.categories[':category_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /browse/categories/{category_id}/playlists
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetBrowseCategoriesCategoryIdPlaylistsKey(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
) {
  return [`/browse/categories/${args.param.category_id}/playlists`, args] as const
}

/**
 * GET /browse/categories/{category_id}/playlists
 *
 * Get Category's Playlists
 *
 * Get a list of Spotify playlists tagged with a particular category.
 */
export function useGetBrowseCategoriesCategoryIdPlaylists(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetBrowseCategoriesCategoryIdPlaylistsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.browse.categories[':category_id'].playlists.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /browse/featured-playlists
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetBrowseFeaturedPlaylistsKey(
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
) {
  return ['/browse/featured-playlists', args] as const
}

/**
 * GET /browse/featured-playlists
 *
 * Get Featured Playlists
 *
 * Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
 */
export function useGetBrowseFeaturedPlaylists(
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetBrowseFeaturedPlaylistsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.browse['featured-playlists'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /browse/new-releases
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetBrowseNewReleasesKey(
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
) {
  return ['/browse/new-releases', args] as const
}

/**
 * GET /browse/new-releases
 *
 * Get New Releases
 *
 * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
 */
export function useGetBrowseNewReleases(
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetBrowseNewReleasesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.browse['new-releases'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /chapters
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChaptersKey(args: InferRequestType<typeof client.chapters.$get>) {
  return ['/chapters', args] as const
}

/**
 * GET /chapters
 *
 * Get Several Chapters
 *
 * Get Spotify catalog information for several chapters identified by their Spotify IDs.<br />
 * **Note: Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function useGetChapters(
  args: InferRequestType<typeof client.chapters.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetChaptersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.chapters.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /chapters/{id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetChaptersIdKey(
  args: InferRequestType<(typeof client.chapters)[':id']['$get']>,
) {
  return [`/chapters/${args.param.id}`, args] as const
}

/**
 * GET /chapters/{id}
 *
 * Get a Chapter
 *
 * Get Spotify catalog information for a single chapter.<br />
 * **Note: Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.**
 */
export function useGetChaptersId(
  args: InferRequestType<(typeof client.chapters)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetChaptersIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.chapters[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /episodes
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetEpisodesKey(args: InferRequestType<typeof client.episodes.$get>) {
  return ['/episodes', args] as const
}

/**
 * GET /episodes
 *
 * Get Several Episodes
 *
 * Get Spotify catalog information for several episodes based on their Spotify IDs.
 */
export function useGetEpisodes(
  args: InferRequestType<typeof client.episodes.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetEpisodesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.episodes.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /episodes/{id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetEpisodesIdKey(
  args: InferRequestType<(typeof client.episodes)[':id']['$get']>,
) {
  return [`/episodes/${args.param.id}`, args] as const
}

/**
 * GET /episodes/{id}
 *
 * Get Episode
 *
 * Get Spotify catalog information for a single episode identified by its
 * unique Spotify ID.
 */
export function useGetEpisodesId(
  args: InferRequestType<(typeof client.episodes)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetEpisodesIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.episodes[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /markets
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetMarketsKey() {
  return ['/markets'] as const
}

/**
 * GET /markets
 *
 * Get Available Markets
 *
 * Get the list of markets where Spotify is available.
 */
export function useGetMarkets(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMarketsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.markets.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetMeKey() {
  return ['/me'] as const
}

/**
 * GET /me
 *
 * Get Current User's Profile
 *
 * Get detailed profile information about the current user (including the
 * current user's username).
 */
export function useGetMe(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMeKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/albums
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMeAlbumsKey(args: InferRequestType<typeof client.me.albums.$get>) {
  return ['/me/albums', args] as const
}

/**
 * GET /me/albums
 *
 * Get User's Saved Albums
 *
 * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
 */
export function useGetMeAlbums(
  args: InferRequestType<typeof client.me.albums.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMeAlbumsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.albums.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /me/albums
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutMeAlbumsMutationKey() {
  return ['PUT', '/me/albums'] as const
}

/**
 * PUT /me/albums
 *
 * Save Albums for Current User
 *
 * Save one or more albums to the current user's 'Your Music' library.
 */
export function usePutMeAlbums(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.albums.$put>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.me.albums.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMeAlbumsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.albums.$put> }) =>
        parseResponse(client.me.albums.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /me/albums
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getDeleteMeAlbumsMutationKey() {
  return ['DELETE', '/me/albums'] as const
}

/**
 * DELETE /me/albums
 *
 * Remove Users' Saved Albums
 *
 * Remove one or more albums from the current user's 'Your Music' library.
 */
export function useDeleteMeAlbums(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.albums.$delete>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.me.albums.$delete>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMeAlbumsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.albums.$delete> }) =>
        parseResponse(client.me.albums.$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/albums/contains
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMeAlbumsContainsKey(
  args: InferRequestType<typeof client.me.albums.contains.$get>,
) {
  return ['/me/albums/contains', args] as const
}

/**
 * GET /me/albums/contains
 *
 * Check User's Saved Albums
 *
 * Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
 */
export function useGetMeAlbumsContains(
  args: InferRequestType<typeof client.me.albums.contains.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMeAlbumsContainsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.albums.contains.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/audiobooks
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMeAudiobooksKey(args: InferRequestType<typeof client.me.audiobooks.$get>) {
  return ['/me/audiobooks', args] as const
}

/**
 * GET /me/audiobooks
 *
 * Get User's Saved Audiobooks
 *
 * Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.
 */
export function useGetMeAudiobooks(
  args: InferRequestType<typeof client.me.audiobooks.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMeAudiobooksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.audiobooks.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /me/audiobooks
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutMeAudiobooksMutationKey() {
  return ['PUT', '/me/audiobooks'] as const
}

/**
 * PUT /me/audiobooks
 *
 * Save Audiobooks for Current User
 *
 * Save one or more audiobooks to the current Spotify user's library.
 */
export function usePutMeAudiobooks(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.audiobooks.$put>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.me.audiobooks.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMeAudiobooksMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.audiobooks.$put> }) =>
        parseResponse(client.me.audiobooks.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /me/audiobooks
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getDeleteMeAudiobooksMutationKey() {
  return ['DELETE', '/me/audiobooks'] as const
}

/**
 * DELETE /me/audiobooks
 *
 * Remove User's Saved Audiobooks
 *
 * Remove one or more audiobooks from the Spotify user's library.
 */
export function useDeleteMeAudiobooks(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.audiobooks.$delete>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.me.audiobooks.$delete>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMeAudiobooksMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.audiobooks.$delete> }) =>
        parseResponse(client.me.audiobooks.$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/audiobooks/contains
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMeAudiobooksContainsKey(
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
) {
  return ['/me/audiobooks/contains', args] as const
}

/**
 * GET /me/audiobooks/contains
 *
 * Check User's Saved Audiobooks
 *
 * Check if one or more audiobooks are already saved in the current Spotify user's library.
 */
export function useGetMeAudiobooksContains(
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMeAudiobooksContainsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.audiobooks.contains.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/episodes
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMeEpisodesKey(args: InferRequestType<typeof client.me.episodes.$get>) {
  return ['/me/episodes', args] as const
}

/**
 * GET /me/episodes
 *
 * Get User's Saved Episodes
 *
 * Get a list of the episodes saved in the current Spotify user's library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 */
export function useGetMeEpisodes(
  args: InferRequestType<typeof client.me.episodes.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMeEpisodesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.episodes.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /me/episodes
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutMeEpisodesMutationKey() {
  return ['PUT', '/me/episodes'] as const
}

/**
 * PUT /me/episodes
 *
 * Save Episodes for Current User
 *
 * Save one or more episodes to the current user's library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 */
export function usePutMeEpisodes(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.episodes.$put>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.me.episodes.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMeEpisodesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.episodes.$put> }) =>
        parseResponse(client.me.episodes.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /me/episodes
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getDeleteMeEpisodesMutationKey() {
  return ['DELETE', '/me/episodes'] as const
}

/**
 * DELETE /me/episodes
 *
 * Remove User's Saved Episodes
 *
 * Remove one or more episodes from the current user's library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).
 */
export function useDeleteMeEpisodes(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.episodes.$delete>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.me.episodes.$delete>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMeEpisodesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.episodes.$delete> }) =>
        parseResponse(client.me.episodes.$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/episodes/contains
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMeEpisodesContainsKey(
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
) {
  return ['/me/episodes/contains', args] as const
}

/**
 * GET /me/episodes/contains
 *
 * Check User's Saved Episodes
 *
 * Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.<br/>
 * This API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer)..
 */
export function useGetMeEpisodesContains(
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMeEpisodesContainsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.episodes.contains.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/following
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMeFollowingKey(args: InferRequestType<typeof client.me.following.$get>) {
  return ['/me/following', args] as const
}

/**
 * GET /me/following
 *
 * Get Followed Artists
 *
 * Get the current user's followed artists.
 */
export function useGetMeFollowing(
  args: InferRequestType<typeof client.me.following.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMeFollowingKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.following.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /me/following
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutMeFollowingMutationKey() {
  return ['PUT', '/me/following'] as const
}

/**
 * PUT /me/following
 *
 * Follow Artists or Users
 *
 * Add the current user as a follower of one or more artists or other Spotify users.
 */
export function usePutMeFollowing(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.following.$put>>>>
      >
    | undefined,
    Error,
    Key,
    InferRequestType<typeof client.me.following.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMeFollowingMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.following.$put> }) =>
        parseResponse(client.me.following.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /me/following
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getDeleteMeFollowingMutationKey() {
  return ['DELETE', '/me/following'] as const
}

/**
 * DELETE /me/following
 *
 * Unfollow Artists or Users
 *
 * Remove the current user as a follower of one or more artists or other Spotify users.
 */
export function useDeleteMeFollowing(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.following.$delete>>>>
    >,
    Error,
    Key,
    InferRequestType<typeof client.me.following.$delete>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMeFollowingMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.following.$delete> }) =>
        parseResponse(client.me.following.$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/following/contains
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMeFollowingContainsKey(
  args: InferRequestType<typeof client.me.following.contains.$get>,
) {
  return ['/me/following/contains', args] as const
}

/**
 * GET /me/following/contains
 *
 * Check If User Follows Artists or Users
 *
 * Check to see if the current user is following one or more artists or other Spotify users.
 */
export function useGetMeFollowingContains(
  args: InferRequestType<typeof client.me.following.contains.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMeFollowingContainsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.following.contains.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/player
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMePlayerKey(args: InferRequestType<typeof client.me.player.$get>) {
  return ['/me/player', args] as const
}

/**
 * GET /me/player
 *
 * Get Playback State
 *
 * Get information about the user’s current playback state, including track or episode, progress, and active device.
 */
export function useGetMePlayer(
  args: InferRequestType<typeof client.me.player.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMePlayerKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.player.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /me/player
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutMePlayerMutationKey() {
  return ['PUT', '/me/player'] as const
}

/**
 * PUT /me/player
 *
 * Transfer Playback
 *
 * Transfer playback to a new device and determine if it should start playing.
 */
export function usePutMePlayer(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.$put>>>>>
    | undefined,
    Error,
    Key,
    InferRequestType<typeof client.me.player.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMePlayerMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.player.$put> }) =>
        parseResponse(client.me.player.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/player/currently-playing
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMePlayerCurrentlyPlayingKey(
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
) {
  return ['/me/player/currently-playing', args] as const
}

/**
 * GET /me/player/currently-playing
 *
 * Get Currently Playing Track
 *
 * Get the object currently being played on the user's Spotify account.
 */
export function useGetMePlayerCurrentlyPlaying(
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMePlayerCurrentlyPlayingKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.player['currently-playing'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/player/devices
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetMePlayerDevicesKey() {
  return ['/me/player/devices'] as const
}

/**
 * GET /me/player/devices
 *
 * Get Available Devices
 *
 * Get information about a user’s available devices.
 */
export function useGetMePlayerDevices(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMePlayerDevicesKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.player.devices.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /me/player/next
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostMePlayerNextMutationKey() {
  return ['POST', '/me/player/next'] as const
}

/**
 * POST /me/player/next
 *
 * Skip To Next
 *
 * Skips to next track in the user’s queue.
 */
export function usePostMePlayerNext(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.next.$post>>>>
      >
    | undefined,
    Error,
    Key,
    InferRequestType<typeof client.me.player.next.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMePlayerNextMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.player.next.$post> }) =>
        parseResponse(client.me.player.next.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /me/player/pause
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutMePlayerPauseMutationKey() {
  return ['PUT', '/me/player/pause'] as const
}

/**
 * PUT /me/player/pause
 *
 * Pause Playback
 *
 * Pause playback on the user's account.
 */
export function usePutMePlayerPause(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.pause.$put>>>>
      >
    | undefined,
    Error,
    Key,
    InferRequestType<typeof client.me.player.pause.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMePlayerPauseMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.player.pause.$put> }) =>
        parseResponse(client.me.player.pause.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /me/player/play
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutMePlayerPlayMutationKey() {
  return ['PUT', '/me/player/play'] as const
}

/**
 * PUT /me/player/play
 *
 * Start/Resume Playback
 *
 * Start a new context or resume current playback on the user's active device.
 */
export function usePutMePlayerPlay(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.play.$put>>>>
      >
    | undefined,
    Error,
    Key,
    InferRequestType<typeof client.me.player.play.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMePlayerPlayMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.player.play.$put> }) =>
        parseResponse(client.me.player.play.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /me/player/previous
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostMePlayerPreviousMutationKey() {
  return ['POST', '/me/player/previous'] as const
}

/**
 * POST /me/player/previous
 *
 * Skip To Previous
 *
 * Skips to previous track in the user’s queue.
 */
export function usePostMePlayerPrevious(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<
          typeof parseResponse<Awaited<ReturnType<typeof client.me.player.previous.$post>>>
        >
      >
    | undefined,
    Error,
    Key,
    InferRequestType<typeof client.me.player.previous.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMePlayerPreviousMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.player.previous.$post> }) =>
        parseResponse(client.me.player.previous.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/player/queue
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetMePlayerQueueKey() {
  return ['/me/player/queue'] as const
}

/**
 * GET /me/player/queue
 *
 * Get the User's Queue
 *
 * Get the list of objects that make up the user's queue.
 */
export function useGetMePlayerQueue(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMePlayerQueueKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.player.queue.$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /me/player/queue
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostMePlayerQueueMutationKey() {
  return ['POST', '/me/player/queue'] as const
}

/**
 * POST /me/player/queue
 *
 * Add Item to Playback Queue
 *
 * Add an item to the end of the user's current playback queue.
 */
export function usePostMePlayerQueue(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.queue.$post>>>>
      >
    | undefined,
    Error,
    Key,
    InferRequestType<typeof client.me.player.queue.$post>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostMePlayerQueueMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.player.queue.$post> }) =>
        parseResponse(client.me.player.queue.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/player/recently-played
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMePlayerRecentlyPlayedKey(
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
) {
  return ['/me/player/recently-played', args] as const
}

/**
 * GET /me/player/recently-played
 *
 * Get Recently Played Tracks
 *
 * Get tracks from the current user's recently played tracks.
 * _**Note**: Currently doesn't support podcast episodes._
 */
export function useGetMePlayerRecentlyPlayed(
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMePlayerRecentlyPlayedKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.player['recently-played'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /me/player/repeat
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutMePlayerRepeatMutationKey() {
  return ['PUT', '/me/player/repeat'] as const
}

/**
 * PUT /me/player/repeat
 *
 * Set Repeat Mode
 *
 * Set the repeat mode for the user's playback. Options are repeat-track,
 * repeat-context, and off.
 */
export function usePutMePlayerRepeat(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.repeat.$put>>>>
      >
    | undefined,
    Error,
    Key,
    InferRequestType<typeof client.me.player.repeat.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMePlayerRepeatMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.player.repeat.$put> }) =>
        parseResponse(client.me.player.repeat.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /me/player/seek
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutMePlayerSeekMutationKey() {
  return ['PUT', '/me/player/seek'] as const
}

/**
 * PUT /me/player/seek
 *
 * Seek To Position
 *
 * Seeks to the given position in the user’s currently playing track.
 */
export function usePutMePlayerSeek(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.seek.$put>>>>
      >
    | undefined,
    Error,
    Key,
    InferRequestType<typeof client.me.player.seek.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMePlayerSeekMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.player.seek.$put> }) =>
        parseResponse(client.me.player.seek.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /me/player/shuffle
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutMePlayerShuffleMutationKey() {
  return ['PUT', '/me/player/shuffle'] as const
}

/**
 * PUT /me/player/shuffle
 *
 * Toggle Playback Shuffle
 *
 * Toggle shuffle on or off for user’s playback.
 */
export function usePutMePlayerShuffle(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.shuffle.$put>>>>
      >
    | undefined,
    Error,
    Key,
    InferRequestType<typeof client.me.player.shuffle.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMePlayerShuffleMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.player.shuffle.$put> }) =>
        parseResponse(client.me.player.shuffle.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /me/player/volume
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutMePlayerVolumeMutationKey() {
  return ['PUT', '/me/player/volume'] as const
}

/**
 * PUT /me/player/volume
 *
 * Set Playback Volume
 *
 * Set the volume for the user’s current playback device.
 */
export function usePutMePlayerVolume(options?: {
  mutation?: SWRMutationConfiguration<
    | Awaited<
        ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.player.volume.$put>>>>
      >
    | undefined,
    Error,
    Key,
    InferRequestType<typeof client.me.player.volume.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMePlayerVolumeMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.player.volume.$put> }) =>
        parseResponse(client.me.player.volume.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/playlists
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMePlaylistsKey(args: InferRequestType<typeof client.me.playlists.$get>) {
  return ['/me/playlists', args] as const
}

/**
 * GET /me/playlists
 *
 * Get Current User's Playlists
 *
 * Get a list of the playlists owned or followed by the current Spotify
 * user.
 */
export function useGetMePlaylists(
  args: InferRequestType<typeof client.me.playlists.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMePlaylistsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.playlists.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/shows
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMeShowsKey(args: InferRequestType<typeof client.me.shows.$get>) {
  return ['/me/shows', args] as const
}

/**
 * GET /me/shows
 *
 * Get User's Saved Shows
 *
 * Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.
 */
export function useGetMeShows(
  args: InferRequestType<typeof client.me.shows.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMeShowsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.shows.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /me/shows
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutMeShowsMutationKey() {
  return ['PUT', '/me/shows'] as const
}

/**
 * PUT /me/shows
 *
 * Save Shows for Current User
 *
 * Save one or more shows to current Spotify user's library.
 */
export function usePutMeShows(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.shows.$put>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.me.shows.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMeShowsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.shows.$put> }) =>
        parseResponse(client.me.shows.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /me/shows
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getDeleteMeShowsMutationKey() {
  return ['DELETE', '/me/shows'] as const
}

/**
 * DELETE /me/shows
 *
 * Remove User's Saved Shows
 *
 * Delete one or more shows from current Spotify user's library.
 */
export function useDeleteMeShows(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.shows.$delete>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.me.shows.$delete>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMeShowsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.shows.$delete> }) =>
        parseResponse(client.me.shows.$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/shows/contains
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMeShowsContainsKey(
  args: InferRequestType<typeof client.me.shows.contains.$get>,
) {
  return ['/me/shows/contains', args] as const
}

/**
 * GET /me/shows/contains
 *
 * Check User's Saved Shows
 *
 * Check if one or more shows is already saved in the current Spotify user's library.
 */
export function useGetMeShowsContains(
  args: InferRequestType<typeof client.me.shows.contains.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMeShowsContainsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.shows.contains.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/top/{type}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMeTopTypeKey(
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
) {
  return [`/me/top/${args.param.type}`, args] as const
}

/**
 * GET /me/top/{type}
 *
 * Get User's Top Items
 *
 * Get the current user's top artists or tracks based on calculated affinity.
 */
export function useGetMeTopType(
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMeTopTypeKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.top[':type'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/tracks
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMeTracksKey(args: InferRequestType<typeof client.me.tracks.$get>) {
  return ['/me/tracks', args] as const
}

/**
 * GET /me/tracks
 *
 * Get User's Saved Tracks
 *
 * Get a list of the songs saved in the current Spotify user's 'Your Music' library.
 */
export function useGetMeTracks(
  args: InferRequestType<typeof client.me.tracks.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMeTracksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.tracks.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /me/tracks
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutMeTracksMutationKey() {
  return ['PUT', '/me/tracks'] as const
}

/**
 * PUT /me/tracks
 *
 * Save Tracks for Current User
 *
 * Save one or more tracks to the current user's 'Your Music' library.
 */
export function usePutMeTracks(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.tracks.$put>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.me.tracks.$put>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutMeTracksMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.tracks.$put> }) =>
        parseResponse(client.me.tracks.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /me/tracks
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getDeleteMeTracksMutationKey() {
  return ['DELETE', '/me/tracks'] as const
}

/**
 * DELETE /me/tracks
 *
 * Remove User's Saved Tracks
 *
 * Remove one or more tracks from the current user's 'Your Music' library.
 */
export function useDeleteMeTracks(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<ReturnType<typeof parseResponse<Awaited<ReturnType<typeof client.me.tracks.$delete>>>>>,
    Error,
    Key,
    InferRequestType<typeof client.me.tracks.$delete>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteMeTracksMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (_: Key, { arg }: { arg: InferRequestType<typeof client.me.tracks.$delete> }) =>
        parseResponse(client.me.tracks.$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /me/tracks/contains
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetMeTracksContainsKey(
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
) {
  return ['/me/tracks/contains', args] as const
}

/**
 * GET /me/tracks/contains
 *
 * Check User's Saved Tracks
 *
 * Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.
 */
export function useGetMeTracksContains(
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetMeTracksContainsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.me.tracks.contains.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /playlists/{playlist_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetPlaylistsPlaylistIdKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
) {
  return [`/playlists/${args.param.playlist_id}`, args] as const
}

/**
 * GET /playlists/{playlist_id}
 *
 * Get Playlist
 *
 * Get a playlist owned by a Spotify user.
 */
export function useGetPlaylistsPlaylistId(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetPlaylistsPlaylistIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.playlists[':playlist_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /playlists/{playlist_id}
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutPlaylistsPlaylistIdMutationKey() {
  return ['PUT', '/playlists/:playlist_id'] as const
}

/**
 * PUT /playlists/{playlist_id}
 *
 * Change Playlist Details
 *
 * Change a playlist's name and public/private state. (The user must, of
 * course, own the playlist.)
 */
export function usePutPlaylistsPlaylistId(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['$put']>>>
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutPlaylistsPlaylistIdMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.playlists)[':playlist_id']['$put']> },
      ) => parseResponse(client.playlists[':playlist_id'].$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /playlists/{playlist_id}/followers
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutPlaylistsPlaylistIdFollowersMutationKey() {
  return ['PUT', '/playlists/:playlist_id/followers'] as const
}

/**
 * PUT /playlists/{playlist_id}/followers
 *
 * Follow Playlist
 *
 * Add the current user as a follower of a playlist.
 */
export function usePutPlaylistsPlaylistIdFollowers(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['followers']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutPlaylistsPlaylistIdFollowersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>
        },
      ) => parseResponse(client.playlists[':playlist_id'].followers.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /playlists/{playlist_id}/followers
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getDeletePlaylistsPlaylistIdFollowersMutationKey() {
  return ['DELETE', '/playlists/:playlist_id/followers'] as const
}

/**
 * DELETE /playlists/{playlist_id}/followers
 *
 * Unfollow Playlist
 *
 * Remove the current user as a follower of a playlist.
 */
export function useDeletePlaylistsPlaylistIdFollowers(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeletePlaylistsPlaylistIdFollowersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>
        },
      ) => parseResponse(client.playlists[':playlist_id'].followers.$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /playlists/{playlist_id}/followers/contains
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetPlaylistsPlaylistIdFollowersContainsKey(
  args: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
) {
  return [`/playlists/${args.param.playlist_id}/followers/contains`, args] as const
}

/**
 * GET /playlists/{playlist_id}/followers/contains
 *
 * Check if Users Follow Playlist
 *
 * Check to see if one or more Spotify users are following a specified playlist.
 */
export function useGetPlaylistsPlaylistIdFollowersContains(
  args: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ?? (isEnabled ? getGetPlaylistsPlaylistIdFollowersContainsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.playlists[':playlist_id'].followers.contains.$get(args, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /playlists/{playlist_id}/images
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetPlaylistsPlaylistIdImagesKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
) {
  return [`/playlists/${args.param.playlist_id}/images`, args] as const
}

/**
 * GET /playlists/{playlist_id}/images
 *
 * Get Playlist Cover Image
 *
 * Get the current image associated with a specific playlist.
 */
export function useGetPlaylistsPlaylistIdImages(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetPlaylistsPlaylistIdImagesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.playlists[':playlist_id'].images.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /playlists/{playlist_id}/images
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutPlaylistsPlaylistIdImagesMutationKey() {
  return ['PUT', '/playlists/:playlist_id/images'] as const
}

/**
 * PUT /playlists/{playlist_id}/images
 *
 * Add Custom Playlist Cover Image
 *
 * Replace the image used to represent a specific playlist.
 */
export function usePutPlaylistsPlaylistIdImages(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['images']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutPlaylistsPlaylistIdImagesMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']> },
      ) => parseResponse(client.playlists[':playlist_id'].images.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /playlists/{playlist_id}/tracks
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetPlaylistsPlaylistIdTracksKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
) {
  return [`/playlists/${args.param.playlist_id}/tracks`, args] as const
}

/**
 * GET /playlists/{playlist_id}/tracks
 *
 * Get Playlist Items
 *
 * Get full details of the items of a playlist owned by a Spotify user.
 */
export function useGetPlaylistsPlaylistIdTracks(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetPlaylistsPlaylistIdTracksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.playlists[':playlist_id'].tracks.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for PUT /playlists/{playlist_id}/tracks
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPutPlaylistsPlaylistIdTracksMutationKey() {
  return ['PUT', '/playlists/:playlist_id/tracks'] as const
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
export function usePutPlaylistsPlaylistIdTracks(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutPlaylistsPlaylistIdTracksMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']> },
      ) => parseResponse(client.playlists[':playlist_id'].tracks.$put(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /playlists/{playlist_id}/tracks
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostPlaylistsPlaylistIdTracksMutationKey() {
  return ['POST', '/playlists/:playlist_id/tracks'] as const
}

/**
 * POST /playlists/{playlist_id}/tracks
 *
 * Add Items to Playlist
 *
 * Add one or more items to a user's playlist.
 */
export function usePostPlaylistsPlaylistIdTracks(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPlaylistsPlaylistIdTracksMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: { arg: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']> },
      ) => parseResponse(client.playlists[':playlist_id'].tracks.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for DELETE /playlists/{playlist_id}/tracks
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getDeletePlaylistsPlaylistIdTracksMutationKey() {
  return ['DELETE', '/playlists/:playlist_id/tracks'] as const
}

/**
 * DELETE /playlists/{playlist_id}/tracks
 *
 * Remove Playlist Items
 *
 * Remove one or more items from a user's playlist.
 */
export function useDeletePlaylistsPlaylistIdTracks(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeletePlaylistsPlaylistIdTracksMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>
        },
      ) => parseResponse(client.playlists[':playlist_id'].tracks.$delete(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /recommendations
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetRecommendationsKey(
  args: InferRequestType<typeof client.recommendations.$get>,
) {
  return ['/recommendations', args] as const
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
export function useGetRecommendations(
  args: InferRequestType<typeof client.recommendations.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetRecommendationsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.recommendations.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /recommendations/available-genre-seeds
 * Returns structured key [path] for filter-based invalidation
 */
export function getGetRecommendationsAvailableGenreSeedsKey() {
  return ['/recommendations/available-genre-seeds'] as const
}

/**
 * GET /recommendations/available-genre-seeds
 *
 * Get Available Genre Seeds
 *
 * Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).
 */
export function useGetRecommendationsAvailableGenreSeeds(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetRecommendationsAvailableGenreSeedsKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.recommendations['available-genre-seeds'].$get(undefined, clientOptions),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /search
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetSearchKey(args: InferRequestType<typeof client.search.$get>) {
  return ['/search', args] as const
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
export function useGetSearch(
  args: InferRequestType<typeof client.search.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetSearchKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.search.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /shows
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetShowsKey(args: InferRequestType<typeof client.shows.$get>) {
  return ['/shows', args] as const
}

/**
 * GET /shows
 *
 * Get Several Shows
 *
 * Get Spotify catalog information for several shows based on their Spotify IDs.
 */
export function useGetShows(
  args: InferRequestType<typeof client.shows.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetShowsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.shows.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /shows/{id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetShowsIdKey(args: InferRequestType<(typeof client.shows)[':id']['$get']>) {
  return [`/shows/${args.param.id}`, args] as const
}

/**
 * GET /shows/{id}
 *
 * Get Show
 *
 * Get Spotify catalog information for a single show identified by its
 * unique Spotify ID.
 */
export function useGetShowsId(
  args: InferRequestType<(typeof client.shows)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetShowsIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.shows[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /shows/{id}/episodes
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetShowsIdEpisodesKey(
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
) {
  return [`/shows/${args.param.id}/episodes`, args] as const
}

/**
 * GET /shows/{id}/episodes
 *
 * Get Show Episodes
 *
 * Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.
 */
export function useGetShowsIdEpisodes(
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetShowsIdEpisodesKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.shows[':id'].episodes.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /tracks
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetTracksKey(args: InferRequestType<typeof client.tracks.$get>) {
  return ['/tracks', args] as const
}

/**
 * GET /tracks
 *
 * Get Several Tracks
 *
 * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
 */
export function useGetTracks(
  args: InferRequestType<typeof client.tracks.$get>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetTracksKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.tracks.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /tracks/{id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetTracksIdKey(args: InferRequestType<(typeof client.tracks)[':id']['$get']>) {
  return [`/tracks/${args.param.id}`, args] as const
}

/**
 * GET /tracks/{id}
 *
 * Get Track
 *
 * Get Spotify catalog information for a single track identified by its
 * unique Spotify ID.
 */
export function useGetTracksId(
  args: InferRequestType<(typeof client.tracks)[':id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetTracksIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.tracks[':id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{user_id}
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetUsersUserIdKey(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return [`/users/${args.param.user_id}`, args] as const
}

/**
 * GET /users/{user_id}
 *
 * Get User's Profile
 *
 * Get public profile information about a Spotify user.
 */
export function useGetUsersUserId(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersUserIdKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':user_id'].$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /users/{user_id}/playlists
 * Returns structured key [resolvedPath, args] for filter-based invalidation
 */
export function getGetUsersUserIdPlaylistsKey(
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
) {
  return [`/users/${args.param.user_id}/playlists`, args] as const
}

/**
 * GET /users/{user_id}/playlists
 *
 * Get User's Playlists
 *
 * Get a list of the playlists owned or followed by a Spotify user.
 */
export function useGetUsersUserIdPlaylists(
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
  options?: {
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetUsersUserIdPlaylistsKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () => parseResponse(client.users[':user_id'].playlists.$get(args, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /users/{user_id}/playlists
 * Returns key [method, path] to avoid collisions between different methods on same path
 */
export function getPostUsersUserIdPlaylistsMutationKey() {
  return ['POST', '/users/:user_id/playlists'] as const
}

/**
 * POST /users/{user_id}/playlists
 *
 * Create Playlist
 *
 * Create a playlist for a Spotify user. (The playlist will be empty until
 * you [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)
 */
export function usePostUsersUserIdPlaylists(options?: {
  mutation?: SWRMutationConfiguration<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client.users)[':user_id']['playlists']['$post']>>
        >
      >
    >,
    Error,
    Key,
    InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUsersUserIdPlaylistsMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        { arg }: { arg: InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']> },
      ) => parseResponse(client.users[':user_id'].playlists.$post(arg, clientOptions)),
      restMutationOptions,
    ),
  }
}
