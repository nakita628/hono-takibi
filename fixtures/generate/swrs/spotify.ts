import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
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
export function useGetAlbums(
  args: InferRequestType<typeof client.albums.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.albums.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/albums', args] as const) : null
  return useSWR<InferResponseType<typeof client.albums.$get>, Error>(
    key,
    async () => parseResponse(client.albums.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /albums
 */
export function getGetAlbumsKey(args: InferRequestType<typeof client.albums.$get>) {
  return ['GET', '/albums', args] as const
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.albums)[':id']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/albums/:id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.albums)[':id']['$get']>, Error>(
    key,
    async () => parseResponse(client.albums[':id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /albums/{id}
 */
export function getGetAlbumsIdKey(args: InferRequestType<(typeof client.albums)[':id']['$get']>) {
  return ['GET', '/albums/:id', args] as const
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.albums)[':id']['tracks']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/albums/:id/tracks', args] as const) : null
  return useSWR<InferResponseType<(typeof client.albums)[':id']['tracks']['$get']>, Error>(
    key,
    async () => parseResponse(client.albums[':id'].tracks.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /albums/{id}/tracks
 */
export function getGetAlbumsIdTracksKey(
  args: InferRequestType<(typeof client.albums)[':id']['tracks']['$get']>,
) {
  return ['GET', '/albums/:id/tracks', args] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.artists.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/artists', args] as const) : null
  return useSWR<InferResponseType<typeof client.artists.$get>, Error>(
    key,
    async () => parseResponse(client.artists.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /artists
 */
export function getGetArtistsKey(args: InferRequestType<typeof client.artists.$get>) {
  return ['GET', '/artists', args] as const
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.artists)[':id']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/artists/:id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.artists)[':id']['$get']>, Error>(
    key,
    async () => parseResponse(client.artists[':id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /artists/{id}
 */
export function getGetArtistsIdKey(args: InferRequestType<(typeof client.artists)[':id']['$get']>) {
  return ['GET', '/artists/:id', args] as const
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.artists)[':id']['albums']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/artists/:id/albums', args] as const) : null
  return useSWR<InferResponseType<(typeof client.artists)[':id']['albums']['$get']>, Error>(
    key,
    async () => parseResponse(client.artists[':id'].albums.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /artists/{id}/albums
 */
export function getGetArtistsIdAlbumsKey(
  args: InferRequestType<(typeof client.artists)[':id']['albums']['$get']>,
) {
  return ['GET', '/artists/:id/albums', args] as const
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.artists)[':id']['related-artists']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/artists/:id/related-artists', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.artists)[':id']['related-artists']['$get']>,
    Error
  >(
    key,
    async () => parseResponse(client.artists[':id']['related-artists'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /artists/{id}/related-artists
 */
export function getGetArtistsIdRelatedArtistsKey(
  args: InferRequestType<(typeof client.artists)[':id']['related-artists']['$get']>,
) {
  return ['GET', '/artists/:id/related-artists', args] as const
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.artists)[':id']['top-tracks']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/artists/:id/top-tracks', args] as const) : null
  return useSWR<InferResponseType<(typeof client.artists)[':id']['top-tracks']['$get']>, Error>(
    key,
    async () => parseResponse(client.artists[':id']['top-tracks'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /artists/{id}/top-tracks
 */
export function getGetArtistsIdTopTracksKey(
  args: InferRequestType<(typeof client.artists)[':id']['top-tracks']['$get']>,
) {
  return ['GET', '/artists/:id/top-tracks', args] as const
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client)['audio-analysis'][':id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/audio-analysis/:id', args] as const) : null
  return useSWR<InferResponseType<(typeof client)['audio-analysis'][':id']['$get']>, Error>(
    key,
    async () => parseResponse(client['audio-analysis'][':id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /audio-analysis/{id}
 */
export function getGetAudioAnalysisIdKey(
  args: InferRequestType<(typeof client)['audio-analysis'][':id']['$get']>,
) {
  return ['GET', '/audio-analysis/:id', args] as const
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
    swr?: SWRConfiguration<InferResponseType<(typeof client)['audio-features']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/audio-features', args] as const) : null
  return useSWR<InferResponseType<(typeof client)['audio-features']['$get']>, Error>(
    key,
    async () => parseResponse(client['audio-features'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /audio-features
 */
export function getGetAudioFeaturesKey(
  args: InferRequestType<(typeof client)['audio-features']['$get']>,
) {
  return ['GET', '/audio-features', args] as const
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client)['audio-features'][':id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/audio-features/:id', args] as const) : null
  return useSWR<InferResponseType<(typeof client)['audio-features'][':id']['$get']>, Error>(
    key,
    async () => parseResponse(client['audio-features'][':id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /audio-features/{id}
 */
export function getGetAudioFeaturesIdKey(
  args: InferRequestType<(typeof client)['audio-features'][':id']['$get']>,
) {
  return ['GET', '/audio-features/:id', args] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.audiobooks.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/audiobooks', args] as const) : null
  return useSWR<InferResponseType<typeof client.audiobooks.$get>, Error>(
    key,
    async () => parseResponse(client.audiobooks.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /audiobooks
 */
export function getGetAudiobooksKey(args: InferRequestType<typeof client.audiobooks.$get>) {
  return ['GET', '/audiobooks', args] as const
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.audiobooks)[':id']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/audiobooks/:id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.audiobooks)[':id']['$get']>, Error>(
    key,
    async () => parseResponse(client.audiobooks[':id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /audiobooks/{id}
 */
export function getGetAudiobooksIdKey(
  args: InferRequestType<(typeof client.audiobooks)[':id']['$get']>,
) {
  return ['GET', '/audiobooks/:id', args] as const
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/audiobooks/:id/chapters', args] as const) : null
  return useSWR<InferResponseType<(typeof client.audiobooks)[':id']['chapters']['$get']>, Error>(
    key,
    async () => parseResponse(client.audiobooks[':id'].chapters.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /audiobooks/{id}/chapters
 */
export function getGetAudiobooksIdChaptersKey(
  args: InferRequestType<(typeof client.audiobooks)[':id']['chapters']['$get']>,
) {
  return ['GET', '/audiobooks/:id/chapters', args] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.browse.categories.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/browse/categories', args] as const) : null
  return useSWR<InferResponseType<typeof client.browse.categories.$get>, Error>(
    key,
    async () => parseResponse(client.browse.categories.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /browse/categories
 */
export function getGetBrowseCategoriesKey(
  args: InferRequestType<typeof client.browse.categories.$get>,
) {
  return ['GET', '/browse/categories', args] as const
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.browse.categories)[':category_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/browse/categories/:category_id', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.browse.categories)[':category_id']['$get']>,
    Error
  >(
    key,
    async () => parseResponse(client.browse.categories[':category_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /browse/categories/{category_id}
 */
export function getGetBrowseCategoriesCategoryIdKey(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['$get']>,
) {
  return ['GET', '/browse/categories/:category_id', args] as const
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/browse/categories/:category_id/playlists', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(client.browse.categories[':category_id'].playlists.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /browse/categories/{category_id}/playlists
 */
export function getGetBrowseCategoriesCategoryIdPlaylistsKey(
  args: InferRequestType<(typeof client.browse.categories)[':category_id']['playlists']['$get']>,
) {
  return ['GET', '/browse/categories/:category_id/playlists', args] as const
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.browse)['featured-playlists']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/browse/featured-playlists', args] as const) : null
  return useSWR<InferResponseType<(typeof client.browse)['featured-playlists']['$get']>, Error>(
    key,
    async () => parseResponse(client.browse['featured-playlists'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /browse/featured-playlists
 */
export function getGetBrowseFeaturedPlaylistsKey(
  args: InferRequestType<(typeof client.browse)['featured-playlists']['$get']>,
) {
  return ['GET', '/browse/featured-playlists', args] as const
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.browse)['new-releases']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/browse/new-releases', args] as const) : null
  return useSWR<InferResponseType<(typeof client.browse)['new-releases']['$get']>, Error>(
    key,
    async () => parseResponse(client.browse['new-releases'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /browse/new-releases
 */
export function getGetBrowseNewReleasesKey(
  args: InferRequestType<(typeof client.browse)['new-releases']['$get']>,
) {
  return ['GET', '/browse/new-releases', args] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.chapters.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/chapters', args] as const) : null
  return useSWR<InferResponseType<typeof client.chapters.$get>, Error>(
    key,
    async () => parseResponse(client.chapters.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /chapters
 */
export function getGetChaptersKey(args: InferRequestType<typeof client.chapters.$get>) {
  return ['GET', '/chapters', args] as const
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.chapters)[':id']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/chapters/:id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.chapters)[':id']['$get']>, Error>(
    key,
    async () => parseResponse(client.chapters[':id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /chapters/{id}
 */
export function getGetChaptersIdKey(
  args: InferRequestType<(typeof client.chapters)[':id']['$get']>,
) {
  return ['GET', '/chapters/:id', args] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.episodes.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/episodes', args] as const) : null
  return useSWR<InferResponseType<typeof client.episodes.$get>, Error>(
    key,
    async () => parseResponse(client.episodes.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /episodes
 */
export function getGetEpisodesKey(args: InferRequestType<typeof client.episodes.$get>) {
  return ['GET', '/episodes', args] as const
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.episodes)[':id']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/episodes/:id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.episodes)[':id']['$get']>, Error>(
    key,
    async () => parseResponse(client.episodes[':id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /episodes/{id}
 */
export function getGetEpisodesIdKey(
  args: InferRequestType<(typeof client.episodes)[':id']['$get']>,
) {
  return ['GET', '/episodes/:id', args] as const
}

/**
 * GET /markets
 *
 * Get Available Markets
 *
 * Get the list of markets where Spotify is available.
 */
export function useGetMarkets(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.markets.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/markets'] as const) : null
  return useSWR<InferResponseType<typeof client.markets.$get>, Error>(
    key,
    async () => parseResponse(client.markets.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /markets
 */
export function getGetMarketsKey() {
  return ['GET', '/markets'] as const
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
  swr?: SWRConfiguration<InferResponseType<typeof client.me.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/me'] as const) : null
  return useSWR<InferResponseType<typeof client.me.$get>, Error>(
    key,
    async () => parseResponse(client.me.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me
 */
export function getGetMeKey() {
  return ['GET', '/me'] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.me.albums.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/me/albums', args] as const) : null
  return useSWR<InferResponseType<typeof client.me.albums.$get>, Error>(
    key,
    async () => parseResponse(client.me.albums.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/albums
 */
export function getGetMeAlbumsKey(args: InferRequestType<typeof client.me.albums.$get>) {
  return ['GET', '/me/albums', args] as const
}

/**
 * PUT /me/albums
 *
 * Save Albums for Current User
 *
 * Save one or more albums to the current user's 'Your Music' library.
 */
export function usePutMeAlbums(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.albums.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.albums.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.albums.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.albums.$put>
  >(
    'PUT /me/albums',
    async (_, { arg }) => parseResponse(client.me.albums.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /me/albums
 *
 * Remove Users' Saved Albums
 *
 * Remove one or more albums from the current user's 'Your Music' library.
 */
export function useDeleteMeAlbums(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.albums.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.albums.$delete>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.albums.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.albums.$delete>
  >(
    'DELETE /me/albums',
    async (_, { arg }) => parseResponse(client.me.albums.$delete(arg, options?.client)),
    options?.swr,
  )
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
    swr?: SWRConfiguration<InferResponseType<typeof client.me.albums.contains.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/me/albums/contains', args] as const) : null
  return useSWR<InferResponseType<typeof client.me.albums.contains.$get>, Error>(
    key,
    async () => parseResponse(client.me.albums.contains.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/albums/contains
 */
export function getGetMeAlbumsContainsKey(
  args: InferRequestType<typeof client.me.albums.contains.$get>,
) {
  return ['GET', '/me/albums/contains', args] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.me.audiobooks.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/me/audiobooks', args] as const) : null
  return useSWR<InferResponseType<typeof client.me.audiobooks.$get>, Error>(
    key,
    async () => parseResponse(client.me.audiobooks.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/audiobooks
 */
export function getGetMeAudiobooksKey(args: InferRequestType<typeof client.me.audiobooks.$get>) {
  return ['GET', '/me/audiobooks', args] as const
}

/**
 * PUT /me/audiobooks
 *
 * Save Audiobooks for Current User
 *
 * Save one or more audiobooks to the current Spotify user's library.
 */
export function usePutMeAudiobooks(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.audiobooks.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.audiobooks.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.audiobooks.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.audiobooks.$put>
  >(
    'PUT /me/audiobooks',
    async (_, { arg }) => parseResponse(client.me.audiobooks.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /me/audiobooks
 *
 * Remove User's Saved Audiobooks
 *
 * Remove one or more audiobooks from the Spotify user's library.
 */
export function useDeleteMeAudiobooks(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.audiobooks.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.audiobooks.$delete>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.audiobooks.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.audiobooks.$delete>
  >(
    'DELETE /me/audiobooks',
    async (_, { arg }) => parseResponse(client.me.audiobooks.$delete(arg, options?.client)),
    options?.swr,
  )
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
    swr?: SWRConfiguration<InferResponseType<typeof client.me.audiobooks.contains.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/me/audiobooks/contains', args] as const) : null
  return useSWR<InferResponseType<typeof client.me.audiobooks.contains.$get>, Error>(
    key,
    async () => parseResponse(client.me.audiobooks.contains.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/audiobooks/contains
 */
export function getGetMeAudiobooksContainsKey(
  args: InferRequestType<typeof client.me.audiobooks.contains.$get>,
) {
  return ['GET', '/me/audiobooks/contains', args] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.me.episodes.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/me/episodes', args] as const) : null
  return useSWR<InferResponseType<typeof client.me.episodes.$get>, Error>(
    key,
    async () => parseResponse(client.me.episodes.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/episodes
 */
export function getGetMeEpisodesKey(args: InferRequestType<typeof client.me.episodes.$get>) {
  return ['GET', '/me/episodes', args] as const
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
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.episodes.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.episodes.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.episodes.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.episodes.$put>
  >(
    'PUT /me/episodes',
    async (_, { arg }) => parseResponse(client.me.episodes.$put(arg, options?.client)),
    options?.swr,
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
export function useDeleteMeEpisodes(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.episodes.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.episodes.$delete>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.episodes.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.episodes.$delete>
  >(
    'DELETE /me/episodes',
    async (_, { arg }) => parseResponse(client.me.episodes.$delete(arg, options?.client)),
    options?.swr,
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
export function useGetMeEpisodesContains(
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.me.episodes.contains.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/me/episodes/contains', args] as const) : null
  return useSWR<InferResponseType<typeof client.me.episodes.contains.$get>, Error>(
    key,
    async () => parseResponse(client.me.episodes.contains.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/episodes/contains
 */
export function getGetMeEpisodesContainsKey(
  args: InferRequestType<typeof client.me.episodes.contains.$get>,
) {
  return ['GET', '/me/episodes/contains', args] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.me.following.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/me/following', args] as const) : null
  return useSWR<InferResponseType<typeof client.me.following.$get>, Error>(
    key,
    async () => parseResponse(client.me.following.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/following
 */
export function getGetMeFollowingKey(args: InferRequestType<typeof client.me.following.$get>) {
  return ['GET', '/me/following', args] as const
}

/**
 * PUT /me/following
 *
 * Follow Artists or Users
 *
 * Add the current user as a follower of one or more artists or other Spotify users.
 */
export function usePutMeFollowing(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.following.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.following.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.following.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.following.$put>
  >(
    'PUT /me/following',
    async (_, { arg }) => parseResponse(client.me.following.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /me/following
 *
 * Unfollow Artists or Users
 *
 * Remove the current user as a follower of one or more artists or other Spotify users.
 */
export function useDeleteMeFollowing(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.following.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.following.$delete>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.following.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.following.$delete>
  >(
    'DELETE /me/following',
    async (_, { arg }) => parseResponse(client.me.following.$delete(arg, options?.client)),
    options?.swr,
  )
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
    swr?: SWRConfiguration<InferResponseType<typeof client.me.following.contains.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/me/following/contains', args] as const) : null
  return useSWR<InferResponseType<typeof client.me.following.contains.$get>, Error>(
    key,
    async () => parseResponse(client.me.following.contains.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/following/contains
 */
export function getGetMeFollowingContainsKey(
  args: InferRequestType<typeof client.me.following.contains.$get>,
) {
  return ['GET', '/me/following/contains', args] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.me.player.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/me/player', args] as const) : null
  return useSWR<InferResponseType<typeof client.me.player.$get>, Error>(
    key,
    async () => parseResponse(client.me.player.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/player
 */
export function getGetMePlayerKey(args: InferRequestType<typeof client.me.player.$get>) {
  return ['GET', '/me/player', args] as const
}

/**
 * PUT /me/player
 *
 * Transfer Playback
 *
 * Transfer playback to a new device and determine if it should start playing.
 */
export function usePutMePlayer(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.player.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.player.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.player.$put>
  >(
    'PUT /me/player',
    async (_, { arg }) => parseResponse(client.me.player.$put(arg, options?.client)),
    options?.swr,
  )
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.me.player)['currently-playing']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/me/player/currently-playing', args] as const) : null
  return useSWR<InferResponseType<(typeof client.me.player)['currently-playing']['$get']>, Error>(
    key,
    async () => parseResponse(client.me.player['currently-playing'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/player/currently-playing
 */
export function getGetMePlayerCurrentlyPlayingKey(
  args: InferRequestType<(typeof client.me.player)['currently-playing']['$get']>,
) {
  return ['GET', '/me/player/currently-playing', args] as const
}

/**
 * GET /me/player/devices
 *
 * Get Available Devices
 *
 * Get information about a user’s available devices.
 */
export function useGetMePlayerDevices(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.me.player.devices.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/me/player/devices'] as const) : null
  return useSWR<InferResponseType<typeof client.me.player.devices.$get>, Error>(
    key,
    async () => parseResponse(client.me.player.devices.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/player/devices
 */
export function getGetMePlayerDevicesKey() {
  return ['GET', '/me/player/devices'] as const
}

/**
 * POST /me/player/next
 *
 * Skip To Next
 *
 * Skips to next track in the user’s queue.
 */
export function usePostMePlayerNext(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.next.$post>,
    Error,
    string,
    InferRequestType<typeof client.me.player.next.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.player.next.$post>,
    Error,
    string,
    InferRequestType<typeof client.me.player.next.$post>
  >(
    'POST /me/player/next',
    async (_, { arg }) => parseResponse(client.me.player.next.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PUT /me/player/pause
 *
 * Pause Playback
 *
 * Pause playback on the user's account.
 */
export function usePutMePlayerPause(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.pause.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.player.pause.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.player.pause.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.player.pause.$put>
  >(
    'PUT /me/player/pause',
    async (_, { arg }) => parseResponse(client.me.player.pause.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PUT /me/player/play
 *
 * Start/Resume Playback
 *
 * Start a new context or resume current playback on the user's active device.
 */
export function usePutMePlayerPlay(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.play.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.player.play.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.player.play.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.player.play.$put>
  >(
    'PUT /me/player/play',
    async (_, { arg }) => parseResponse(client.me.player.play.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /me/player/previous
 *
 * Skip To Previous
 *
 * Skips to previous track in the user’s queue.
 */
export function usePostMePlayerPrevious(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.previous.$post>,
    Error,
    string,
    InferRequestType<typeof client.me.player.previous.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.player.previous.$post>,
    Error,
    string,
    InferRequestType<typeof client.me.player.previous.$post>
  >(
    'POST /me/player/previous',
    async (_, { arg }) => parseResponse(client.me.player.previous.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /me/player/queue
 *
 * Get the User's Queue
 *
 * Get the list of objects that make up the user's queue.
 */
export function useGetMePlayerQueue(options?: {
  swr?: SWRConfiguration<InferResponseType<typeof client.me.player.queue.$get>, Error>
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key = options?.enabled !== false ? (['GET', '/me/player/queue'] as const) : null
  return useSWR<InferResponseType<typeof client.me.player.queue.$get>, Error>(
    key,
    async () => parseResponse(client.me.player.queue.$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/player/queue
 */
export function getGetMePlayerQueueKey() {
  return ['GET', '/me/player/queue'] as const
}

/**
 * POST /me/player/queue
 *
 * Add Item to Playback Queue
 *
 * Add an item to the end of the user's current playback queue.
 */
export function usePostMePlayerQueue(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.queue.$post>,
    Error,
    string,
    InferRequestType<typeof client.me.player.queue.$post>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.player.queue.$post>,
    Error,
    string,
    InferRequestType<typeof client.me.player.queue.$post>
  >(
    'POST /me/player/queue',
    async (_, { arg }) => parseResponse(client.me.player.queue.$post(arg, options?.client)),
    options?.swr,
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
export function useGetMePlayerRecentlyPlayed(
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.me.player)['recently-played']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/me/player/recently-played', args] as const) : null
  return useSWR<InferResponseType<(typeof client.me.player)['recently-played']['$get']>, Error>(
    key,
    async () => parseResponse(client.me.player['recently-played'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/player/recently-played
 */
export function getGetMePlayerRecentlyPlayedKey(
  args: InferRequestType<(typeof client.me.player)['recently-played']['$get']>,
) {
  return ['GET', '/me/player/recently-played', args] as const
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
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.repeat.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.player.repeat.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.player.repeat.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.player.repeat.$put>
  >(
    'PUT /me/player/repeat',
    async (_, { arg }) => parseResponse(client.me.player.repeat.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PUT /me/player/seek
 *
 * Seek To Position
 *
 * Seeks to the given position in the user’s currently playing track.
 */
export function usePutMePlayerSeek(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.seek.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.player.seek.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.player.seek.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.player.seek.$put>
  >(
    'PUT /me/player/seek',
    async (_, { arg }) => parseResponse(client.me.player.seek.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PUT /me/player/shuffle
 *
 * Toggle Playback Shuffle
 *
 * Toggle shuffle on or off for user’s playback.
 */
export function usePutMePlayerShuffle(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.shuffle.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.player.shuffle.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.player.shuffle.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.player.shuffle.$put>
  >(
    'PUT /me/player/shuffle',
    async (_, { arg }) => parseResponse(client.me.player.shuffle.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PUT /me/player/volume
 *
 * Set Playback Volume
 *
 * Set the volume for the user’s current playback device.
 */
export function usePutMePlayerVolume(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.player.volume.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.player.volume.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.player.volume.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.player.volume.$put>
  >(
    'PUT /me/player/volume',
    async (_, { arg }) => parseResponse(client.me.player.volume.$put(arg, options?.client)),
    options?.swr,
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
export function useGetMePlaylists(
  args: InferRequestType<typeof client.me.playlists.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.me.playlists.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/me/playlists', args] as const) : null
  return useSWR<InferResponseType<typeof client.me.playlists.$get>, Error>(
    key,
    async () => parseResponse(client.me.playlists.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/playlists
 */
export function getGetMePlaylistsKey(args: InferRequestType<typeof client.me.playlists.$get>) {
  return ['GET', '/me/playlists', args] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.me.shows.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/me/shows', args] as const) : null
  return useSWR<InferResponseType<typeof client.me.shows.$get>, Error>(
    key,
    async () => parseResponse(client.me.shows.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/shows
 */
export function getGetMeShowsKey(args: InferRequestType<typeof client.me.shows.$get>) {
  return ['GET', '/me/shows', args] as const
}

/**
 * PUT /me/shows
 *
 * Save Shows for Current User
 *
 * Save one or more shows to current Spotify user's library.
 */
export function usePutMeShows(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.shows.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.shows.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.shows.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.shows.$put>
  >(
    'PUT /me/shows',
    async (_, { arg }) => parseResponse(client.me.shows.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /me/shows
 *
 * Remove User's Saved Shows
 *
 * Delete one or more shows from current Spotify user's library.
 */
export function useDeleteMeShows(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.shows.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.shows.$delete>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.shows.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.shows.$delete>
  >(
    'DELETE /me/shows',
    async (_, { arg }) => parseResponse(client.me.shows.$delete(arg, options?.client)),
    options?.swr,
  )
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
    swr?: SWRConfiguration<InferResponseType<typeof client.me.shows.contains.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/me/shows/contains', args] as const) : null
  return useSWR<InferResponseType<typeof client.me.shows.contains.$get>, Error>(
    key,
    async () => parseResponse(client.me.shows.contains.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/shows/contains
 */
export function getGetMeShowsContainsKey(
  args: InferRequestType<typeof client.me.shows.contains.$get>,
) {
  return ['GET', '/me/shows/contains', args] as const
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.me.top)[':type']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/me/top/:type', args] as const) : null
  return useSWR<InferResponseType<(typeof client.me.top)[':type']['$get']>, Error>(
    key,
    async () => parseResponse(client.me.top[':type'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/top/{type}
 */
export function getGetMeTopTypeKey(
  args: InferRequestType<(typeof client.me.top)[':type']['$get']>,
) {
  return ['GET', '/me/top/:type', args] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.me.tracks.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/me/tracks', args] as const) : null
  return useSWR<InferResponseType<typeof client.me.tracks.$get>, Error>(
    key,
    async () => parseResponse(client.me.tracks.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/tracks
 */
export function getGetMeTracksKey(args: InferRequestType<typeof client.me.tracks.$get>) {
  return ['GET', '/me/tracks', args] as const
}

/**
 * PUT /me/tracks
 *
 * Save Tracks for Current User
 *
 * Save one or more tracks to the current user's 'Your Music' library.
 */
export function usePutMeTracks(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.tracks.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.tracks.$put>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.tracks.$put>,
    Error,
    string,
    InferRequestType<typeof client.me.tracks.$put>
  >(
    'PUT /me/tracks',
    async (_, { arg }) => parseResponse(client.me.tracks.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /me/tracks
 *
 * Remove User's Saved Tracks
 *
 * Remove one or more tracks from the current user's 'Your Music' library.
 */
export function useDeleteMeTracks(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<typeof client.me.tracks.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.tracks.$delete>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<typeof client.me.tracks.$delete>,
    Error,
    string,
    InferRequestType<typeof client.me.tracks.$delete>
  >(
    'DELETE /me/tracks',
    async (_, { arg }) => parseResponse(client.me.tracks.$delete(arg, options?.client)),
    options?.swr,
  )
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
    swr?: SWRConfiguration<InferResponseType<typeof client.me.tracks.contains.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/me/tracks/contains', args] as const) : null
  return useSWR<InferResponseType<typeof client.me.tracks.contains.$get>, Error>(
    key,
    async () => parseResponse(client.me.tracks.contains.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /me/tracks/contains
 */
export function getGetMeTracksContainsKey(
  args: InferRequestType<typeof client.me.tracks.contains.$get>,
) {
  return ['GET', '/me/tracks/contains', args] as const
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.playlists)[':playlist_id']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/playlists/:playlist_id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.playlists)[':playlist_id']['$get']>, Error>(
    key,
    async () => parseResponse(client.playlists[':playlist_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /playlists/{playlist_id}
 */
export function getGetPlaylistsPlaylistIdKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['$get']>,
) {
  return ['GET', '/playlists/:playlist_id', args] as const
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
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.playlists)[':playlist_id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.playlists)[':playlist_id']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['$put']>
  >(
    'PUT /playlists/:playlist_id',
    async (_, { arg }) =>
      parseResponse(client.playlists[':playlist_id'].$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * PUT /playlists/{playlist_id}/followers
 *
 * Follow Playlist
 *
 * Add the current user as a follower of a playlist.
 */
export function usePutPlaylistsPlaylistIdFollowers(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$put']>
  >(
    'PUT /playlists/:playlist_id/followers',
    async (_, { arg }) =>
      parseResponse(client.playlists[':playlist_id'].followers.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /playlists/{playlist_id}/followers
 *
 * Unfollow Playlist
 *
 * Remove the current user as a follower of a playlist.
 */
export function useDeletePlaylistsPlaylistIdFollowers(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['followers']['$delete']>
  >(
    'DELETE /playlists/:playlist_id/followers',
    async (_, { arg }) =>
      parseResponse(client.playlists[':playlist_id'].followers.$delete(arg, options?.client)),
    options?.swr,
  )
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['contains']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/playlists/:playlist_id/followers/contains', args] as const)
      : null
  return useSWR<
    InferResponseType<(typeof client.playlists)[':playlist_id']['followers']['contains']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.playlists[':playlist_id'].followers.contains.$get(args, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /playlists/{playlist_id}/followers/contains
 */
export function getGetPlaylistsPlaylistIdFollowersContainsKey(
  args: InferRequestType<
    (typeof client.playlists)[':playlist_id']['followers']['contains']['$get']
  >,
) {
  return ['GET', '/playlists/:playlist_id/followers/contains', args] as const
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/playlists/:playlist_id/images', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
    Error
  >(
    key,
    async () => parseResponse(client.playlists[':playlist_id'].images.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /playlists/{playlist_id}/images
 */
export function getGetPlaylistsPlaylistIdImagesKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$get']>,
) {
  return ['GET', '/playlists/:playlist_id/images', args] as const
}

/**
 * PUT /playlists/{playlist_id}/images
 *
 * Add Custom Playlist Cover Image
 *
 * Replace the image used to represent a specific playlist.
 */
export function usePutPlaylistsPlaylistIdImages(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.playlists)[':playlist_id']['images']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.playlists)[':playlist_id']['images']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['images']['$put']>
  >(
    'PUT /playlists/:playlist_id/images',
    async (_, { arg }) =>
      parseResponse(client.playlists[':playlist_id'].images.$put(arg, options?.client)),
    options?.swr,
  )
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/playlists/:playlist_id/tracks', args] as const) : null
  return useSWR<
    InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
    Error
  >(
    key,
    async () => parseResponse(client.playlists[':playlist_id'].tracks.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /playlists/{playlist_id}/tracks
 */
export function getGetPlaylistsPlaylistIdTracksKey(
  args: InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$get']>,
) {
  return ['GET', '/playlists/:playlist_id/tracks', args] as const
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
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$put']>
  >(
    'PUT /playlists/:playlist_id/tracks',
    async (_, { arg }) =>
      parseResponse(client.playlists[':playlist_id'].tracks.$put(arg, options?.client)),
    options?.swr,
  )
}

/**
 * POST /playlists/{playlist_id}/tracks
 *
 * Add Items to Playlist
 *
 * Add one or more items to a user's playlist.
 */
export function usePostPlaylistsPlaylistIdTracks(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$post']>
  >(
    'POST /playlists/:playlist_id/tracks',
    async (_, { arg }) =>
      parseResponse(client.playlists[':playlist_id'].tracks.$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * DELETE /playlists/{playlist_id}/tracks
 *
 * Remove Playlist Items
 *
 * Remove one or more items from a user's playlist.
 */
export function useDeletePlaylistsPlaylistIdTracks(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>,
    Error,
    string,
    InferRequestType<(typeof client.playlists)[':playlist_id']['tracks']['$delete']>
  >(
    'DELETE /playlists/:playlist_id/tracks',
    async (_, { arg }) =>
      parseResponse(client.playlists[':playlist_id'].tracks.$delete(arg, options?.client)),
    options?.swr,
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
export function useGetRecommendations(
  args: InferRequestType<typeof client.recommendations.$get>,
  options?: {
    swr?: SWRConfiguration<InferResponseType<typeof client.recommendations.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/recommendations', args] as const) : null
  return useSWR<InferResponseType<typeof client.recommendations.$get>, Error>(
    key,
    async () => parseResponse(client.recommendations.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /recommendations
 */
export function getGetRecommendationsKey(
  args: InferRequestType<typeof client.recommendations.$get>,
) {
  return ['GET', '/recommendations', args] as const
}

/**
 * GET /recommendations/available-genre-seeds
 *
 * Get Available Genre Seeds
 *
 * Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).
 */
export function useGetRecommendationsAvailableGenreSeeds(options?: {
  swr?: SWRConfiguration<
    InferResponseType<(typeof client.recommendations)['available-genre-seeds']['$get']>,
    Error
  >
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key =
    options?.enabled !== false ? (['GET', '/recommendations/available-genre-seeds'] as const) : null
  return useSWR<
    InferResponseType<(typeof client.recommendations)['available-genre-seeds']['$get']>,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.recommendations['available-genre-seeds'].$get(undefined, options?.client),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /recommendations/available-genre-seeds
 */
export function getGetRecommendationsAvailableGenreSeedsKey() {
  return ['GET', '/recommendations/available-genre-seeds'] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.search.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/search', args] as const) : null
  return useSWR<InferResponseType<typeof client.search.$get>, Error>(
    key,
    async () => parseResponse(client.search.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /search
 */
export function getGetSearchKey(args: InferRequestType<typeof client.search.$get>) {
  return ['GET', '/search', args] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.shows.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/shows', args] as const) : null
  return useSWR<InferResponseType<typeof client.shows.$get>, Error>(
    key,
    async () => parseResponse(client.shows.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /shows
 */
export function getGetShowsKey(args: InferRequestType<typeof client.shows.$get>) {
  return ['GET', '/shows', args] as const
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.shows)[':id']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/shows/:id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.shows)[':id']['$get']>, Error>(
    key,
    async () => parseResponse(client.shows[':id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /shows/{id}
 */
export function getGetShowsIdKey(args: InferRequestType<(typeof client.shows)[':id']['$get']>) {
  return ['GET', '/shows/:id', args] as const
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.shows)[':id']['episodes']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/shows/:id/episodes', args] as const) : null
  return useSWR<InferResponseType<(typeof client.shows)[':id']['episodes']['$get']>, Error>(
    key,
    async () => parseResponse(client.shows[':id'].episodes.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /shows/{id}/episodes
 */
export function getGetShowsIdEpisodesKey(
  args: InferRequestType<(typeof client.shows)[':id']['episodes']['$get']>,
) {
  return ['GET', '/shows/:id/episodes', args] as const
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
    swr?: SWRConfiguration<InferResponseType<typeof client.tracks.$get>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/tracks', args] as const) : null
  return useSWR<InferResponseType<typeof client.tracks.$get>, Error>(
    key,
    async () => parseResponse(client.tracks.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /tracks
 */
export function getGetTracksKey(args: InferRequestType<typeof client.tracks.$get>) {
  return ['GET', '/tracks', args] as const
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.tracks)[':id']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/tracks/:id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.tracks)[':id']['$get']>, Error>(
    key,
    async () => parseResponse(client.tracks[':id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /tracks/{id}
 */
export function getGetTracksIdKey(args: InferRequestType<(typeof client.tracks)[':id']['$get']>) {
  return ['GET', '/tracks/:id', args] as const
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
    swr?: SWRConfiguration<InferResponseType<(typeof client.users)[':user_id']['$get']>, Error>
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key = options?.enabled !== false ? (['GET', '/users/:user_id', args] as const) : null
  return useSWR<InferResponseType<(typeof client.users)[':user_id']['$get']>, Error>(
    key,
    async () => parseResponse(client.users[':user_id'].$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /users/{user_id}
 */
export function getGetUsersUserIdKey(
  args: InferRequestType<(typeof client.users)[':user_id']['$get']>,
) {
  return ['GET', '/users/:user_id', args] as const
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
    swr?: SWRConfiguration<
      InferResponseType<(typeof client.users)[':user_id']['playlists']['$get']>,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false ? (['GET', '/users/:user_id/playlists', args] as const) : null
  return useSWR<InferResponseType<(typeof client.users)[':user_id']['playlists']['$get']>, Error>(
    key,
    async () => parseResponse(client.users[':user_id'].playlists.$get(args, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /users/{user_id}/playlists
 */
export function getGetUsersUserIdPlaylistsKey(
  args: InferRequestType<(typeof client.users)[':user_id']['playlists']['$get']>,
) {
  return ['GET', '/users/:user_id/playlists', args] as const
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
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client.users)[':user_id']['playlists']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client.users)[':user_id']['playlists']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client.users)[':user_id']['playlists']['$post']>
  >(
    'POST /users/:user_id/playlists',
    async (_, { arg }) =>
      parseResponse(client.users[':user_id'].playlists.$post(arg, options?.client)),
    options?.swr,
  )
}
