import { createRoute, z } from '@hono/zod-openapi'

const CopyrightObjectSchema = z
  .object({
    text: z
      .string()
      .exactOptional()
      .openapi({ description: 'The copyright text for this content.\n' }),
    type: z.string().exactOptional().openapi({
      description:
        'The type of copyright: `C` = the copyright, `P` = the sound recording (performance) copyright.\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'CopyrightObject' })
  .readonly()
  .openapi('CopyrightObject')

const ExternalIdObjectSchema = z
  .object({
    ean: z.string().exactOptional().openapi({
      description:
        '[International Article Number](http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29)\n',
    }),
    isrc: z.string().exactOptional().openapi({
      description:
        '[International Standard Recording Code](http://en.wikipedia.org/wiki/International_Standard_Recording_Code)\n',
    }),
    upc: z.string().exactOptional().openapi({
      description:
        '[Universal Product Code](http://en.wikipedia.org/wiki/Universal_Product_Code)\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'ExternalIdObject' })
  .readonly()
  .openapi('ExternalIdObject')

const ExternalUrlObjectSchema = z
  .object({
    spotify: z.string().exactOptional().openapi({
      description:
        'The [Spotify URL](/documentation/web-api/concepts/spotify-uris-ids) for the object.\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'ExternalUrlObject' })
  .readonly()
  .openapi('ExternalUrlObject')

const ImageObjectSchema = z
  .object({
    height: z
      .int()
      .nullable()
      .openapi({ description: 'The image height in pixels.\n', example: 300 }),
    url: z.string().openapi({
      description: 'The source URL of the image.\n',
      example: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
    }),
    width: z
      .int()
      .nullable()
      .openapi({ description: 'The image width in pixels.\n', example: 300 }),
  })
  .openapi({ required: ['url', 'height', 'width'], 'x-spotify-docs-type': 'ImageObject' })
  .readonly()
  .openapi('ImageObject')

const AlbumRestrictionObjectSchema = z
  .object({
    reason: z.enum(['market', 'product', 'explicit']).exactOptional().openapi({
      description:
        "The reason for the restriction. Albums may be restricted if the content is not available in a given market, to the user's subscription type, or when the user's account is set to not play explicit content.\nAdditional reasons may be added in the future.\n",
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'AlbumRestrictionObject' })
  .readonly()
  .openapi('AlbumRestrictionObject')

const AlbumBaseSchema = z
  .object({
    album_type: z
      .enum(['album', 'single', 'compilation'])
      .openapi({ description: 'The type of the album.\n', example: 'compilation' }),
    available_markets: z.array(z.string()).openapi({
      description:
        'The markets in which the album is available: [ISO 3166-1 alpha-2 country codes](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _**NOTE**: an album is considered available in a market when at least 1 of its tracks is available in that market._\n',
      example: ['CA', 'BR', 'IT'],
    }),
    copyrights: z
      .array(CopyrightObjectSchema)
      .exactOptional()
      .openapi({ description: 'The copyright statements of the album.\n' }),
    external_ids: ExternalIdObjectSchema.exactOptional().openapi({
      description: 'Known external IDs for the album.\n',
    }),
    external_urls: ExternalUrlObjectSchema.openapi({
      description: 'Known external URLs for this album.\n',
    }),
    genres: z
      .array(z.string())
      .exactOptional()
      .openapi({
        description:
          'A list of the genres the album is associated with. If not yet classified, the array is empty.\n',
        example: ['Egg punk', 'Noise rock'],
      }),
    href: z.string().openapi({
      description: 'A link to the Web API endpoint providing full details of the album.\n',
    }),
    id: z.string().openapi({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the album.\n',
      example: '2up3OPMp9Tb4dAKM2erWXQ',
    }),
    images: z
      .array(ImageObjectSchema)
      .openapi({ description: 'The cover art for the album in various sizes, widest first.\n' }),
    label: z
      .string()
      .exactOptional()
      .openapi({ description: 'The label associated with the album.\n' }),
    name: z.string().openapi({
      description:
        'The name of the album. In case of an album takedown, the value may be an empty string.\n',
    }),
    popularity: z.int().exactOptional().openapi({
      description:
        'The popularity of the album. The value will be between 0 and 100, with 100 being the most popular.\n',
    }),
    release_date: z
      .string()
      .openapi({ description: 'The date the album was first released.\n', example: '1981-12' }),
    release_date_precision: z.enum(['year', 'month', 'day']).openapi({
      description: 'The precision with which `release_date` value is known.\n',
      example: 'year',
    }),
    restrictions: AlbumRestrictionObjectSchema.exactOptional().openapi({
      description: 'Included in the response when a content restriction is applied.\n',
    }),
    total_tracks: z
      .int()
      .openapi({ description: 'The number of tracks in the album.', example: 9 }),
    type: z.literal('album').openapi({ description: 'The object type.\n' }),
    uri: z.string().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the album.\n',
      example: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
    }),
  })
  .openapi({
    required: [
      'album_type',
      'total_tracks',
      'available_markets',
      'external_urls',
      'href',
      'id',
      'images',
      'name',
      'release_date',
      'release_date_precision',
      'type',
      'uri',
    ],
  })
  .readonly()
  .openapi('AlbumBase')

const FollowersObjectSchema = z
  .object({
    href: z.string().nullable().exactOptional().openapi({
      description:
        'This will always be set to null, as the Web API does not support it at the moment.\n',
    }),
    total: z.int().exactOptional().openapi({ description: 'The total number of followers.\n' }),
  })
  .openapi({ 'x-spotify-docs-type': 'FollowersObject' })
  .readonly()
  .openapi('FollowersObject')

const ArtistObjectSchema = z
  .object({
    external_urls: ExternalUrlObjectSchema.exactOptional().openapi({
      description: 'Known external URLs for this artist.\n',
    }),
    followers: FollowersObjectSchema.exactOptional().openapi({
      description: 'Information about the followers of the artist.\n',
    }),
    genres: z
      .array(z.string())
      .exactOptional()
      .openapi({
        description:
          'A list of the genres the artist is associated with. If not yet classified, the array is empty.\n',
        example: ['Prog rock', 'Grunge'],
      }),
    href: z.string().exactOptional().openapi({
      description: 'A link to the Web API endpoint providing full details of the artist.\n',
    }),
    id: z.string().exactOptional().openapi({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
    images: z
      .array(ImageObjectSchema)
      .exactOptional()
      .openapi({ description: 'Images of the artist in various sizes, widest first.\n' }),
    name: z.string().exactOptional().openapi({ description: 'The name of the artist.\n' }),
    popularity: z.int().exactOptional().openapi({
      description:
        "The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks.\n",
    }),
    type: z.literal('artist').exactOptional().openapi({ description: 'The object type.\n' }),
    uri: z.string().exactOptional().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'ArtistObject' })
  .readonly()
  .openapi('ArtistObject')

const PagingObjectSchema = z
  .object({
    href: z.string().openapi({
      description: 'A link to the Web API endpoint returning the full result of the request\n',
      example: 'https://api.spotify.com/v1/me/shows?offset=0&limit=20\n',
    }),
    limit: z.int().openapi({
      description:
        'The maximum number of items in the response (as set in the query or by default).\n',
      example: 20,
    }),
    next: z.string().nullable().openapi({
      description: 'URL to the next page of items. ( `null` if none)\n',
      example: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1',
    }),
    offset: z.int().openapi({
      description: 'The offset of the items returned (as set in the query or by default)\n',
      example: 0,
    }),
    previous: z.string().nullable().openapi({
      description: 'URL to the previous page of items. ( `null` if none)\n',
      example: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1',
    }),
    total: z
      .int()
      .openapi({ description: 'The total number of items available to return.\n', example: 4 }),
  })
  .openapi({
    required: ['href', 'items', 'limit', 'next', 'offset', 'previous', 'total'],
    'x-spotify-docs-type': 'PagingObject',
  })
  .readonly()
  .openapi('PagingObject')

const SimplifiedArtistObjectSchema = z
  .object({
    external_urls: ExternalUrlObjectSchema.exactOptional().openapi({
      description: 'Known external URLs for this artist.\n',
    }),
    href: z.string().exactOptional().openapi({
      description: 'A link to the Web API endpoint providing full details of the artist.\n',
    }),
    id: z.string().exactOptional().openapi({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
    name: z.string().exactOptional().openapi({ description: 'The name of the artist.\n' }),
    type: z.literal('artist').exactOptional().openapi({ description: 'The object type.\n' }),
    uri: z.string().exactOptional().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist.\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'SimplifiedArtistObject' })
  .readonly()
  .openapi('SimplifiedArtistObject')

const LinkedTrackObjectSchema = z
  .object({
    external_urls: ExternalUrlObjectSchema.exactOptional().openapi({
      description: 'Known external URLs for this track.\n',
    }),
    href: z.string().exactOptional().openapi({
      description: 'A link to the Web API endpoint providing full details of the track.\n',
    }),
    id: z.string().exactOptional().openapi({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
    type: z.string().exactOptional().openapi({ description: 'The object type: "track".\n' }),
    uri: z.string().exactOptional().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'LinkedTrackObject' })
  .readonly()
  .openapi('LinkedTrackObject')

const TrackRestrictionObjectSchema = z
  .object({
    reason: z.string().exactOptional().openapi({
      description:
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'TrackRestrictionObject' })
  .readonly()
  .openapi('TrackRestrictionObject')

const SimplifiedTrackObjectSchema = z
  .object({
    artists: z.array(SimplifiedArtistObjectSchema).exactOptional().openapi({
      description:
        'The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.',
    }),
    available_markets: z.array(z.string()).exactOptional().openapi({
      description:
        'A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
    }),
    disc_number: z.int().exactOptional().openapi({
      description: 'The disc number (usually `1` unless the album consists of more than one disc).',
    }),
    duration_ms: z
      .int()
      .exactOptional()
      .openapi({ description: 'The track length in milliseconds.' }),
    explicit: z.boolean().exactOptional().openapi({
      description:
        'Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).',
    }),
    external_urls: ExternalUrlObjectSchema.exactOptional().openapi({
      description: 'External URLs for this track.\n',
    }),
    href: z.string().exactOptional().openapi({
      description: 'A link to the Web API endpoint providing full details of the track.',
    }),
    id: z.string().exactOptional().openapi({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
    is_local: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'Whether or not the track is from a local file.\n' }),
    is_playable: z.boolean().exactOptional().openapi({
      description:
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\n',
    }),
    linked_from: LinkedTrackObjectSchema.exactOptional().openapi({
      description:
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied and is only part of the response if the track linking, in fact, exists. The requested track has been replaced with a different track. The track in the `linked_from` object contains information about the originally requested track.',
    }),
    name: z.string().exactOptional().openapi({ description: 'The name of the track.' }),
    preview_url: z
      .string()
      .exactOptional()
      .openapi({
        description: 'A URL to a 30 second preview (MP3 format) of the track.\n',
        'x-spotify-policy-list': [{ $ref: '#/components/x-spotify-policy/StandalonePreview' }],
      }),
    restrictions: TrackRestrictionObjectSchema.exactOptional().openapi({
      description: 'Included in the response when a content restriction is applied.\n',
    }),
    track_number: z.int().exactOptional().openapi({
      description:
        'The number of the track. If an album has several discs, the track number is the number on the specified disc.\n',
    }),
    type: z.string().exactOptional().openapi({ description: 'The object type: "track".\n' }),
    uri: z.string().exactOptional().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'SimplifiedTrackObject' })
  .readonly()
  .openapi('SimplifiedTrackObject')

const PagingSimplifiedTrackObjectSchema = PagingObjectSchema.and(
  z.object({ items: z.array(SimplifiedTrackObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingTrackObject' })
  .readonly()
  .openapi('PagingSimplifiedTrackObject')

const AlbumObjectSchema = AlbumBaseSchema.and(
  z.object({
    artists: z.array(ArtistObjectSchema).exactOptional().openapi({
      description:
        'The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\n',
    }),
    tracks: PagingSimplifiedTrackObjectSchema.exactOptional().openapi({
      description: 'The tracks of the album.\n',
    }),
  }),
)
  .openapi({ 'x-spotify-docs-type': 'AlbumObject' })
  .readonly()
  .openapi('AlbumObject')

const TimeIntervalObjectSchema = z
  .object({
    confidence: z.number().min(0).max(1).exactOptional().openapi({
      description: 'The confidence, from 0.0 to 1.0, of the reliability of the interval.',
      example: 0.925,
    }),
    duration: z.number().exactOptional().openapi({
      description: 'The duration (in seconds) of the time interval.',
      example: 2.18749,
    }),
    start: z.number().exactOptional().openapi({
      description: 'The starting point (in seconds) of the time interval.',
      example: 0.49567,
    }),
  })
  .readonly()
  .openapi('TimeIntervalObject')

const TimeSignatureSchema = z
  .int()
  .min(3)
  .max(7)
  .openapi({
    description:
      'An estimated time signature. The time signature (meter) is a notational convention to specify how many beats are in each bar (or measure). The time signature ranges from 3 to 7 indicating time signatures of "3/4", to "7/4".',
    example: 4,
  })
  .readonly()
  .openapi('TimeSignature')

const SectionObjectSchema = z
  .object({
    confidence: z.number().min(0).max(1).exactOptional().openapi({
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the section\'s "designation".',
      example: 1,
    }),
    duration: z
      .number()
      .exactOptional()
      .openapi({ description: 'The duration (in seconds) of the section.', example: 6.97092 }),
    key: z.int().exactOptional().openapi({
      description:
        'The estimated overall key of the section. The values in this field ranging from 0 to 11 mapping to pitches using standard Pitch Class notation (E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on). If no key was detected, the value is -1.',
      example: 9,
    }),
    key_confidence: z.number().min(0).max(1).exactOptional().openapi({
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the key. Songs with many key changes may correspond to low values in this field.',
      example: 0.297,
    }),
    loudness: z.number().exactOptional().openapi({
      description:
        'The overall loudness of the section in decibels (dB). Loudness values are useful for comparing relative loudness of sections within tracks.',
      example: -14.938,
    }),
    mode: z
      .union([z.literal(-1), z.literal(0), z.literal(1)])
      .exactOptional()
      .openapi({
        description:
          'Indicates the modality (major or minor) of a section, the type of scale from which its melodic content is derived. This field will contain a 0 for "minor", a 1 for "major", or a -1 for no result. Note that the major key (e.g. C major) could more likely be confused with the minor key at 3 semitones lower (e.g. A minor) as both keys carry the same pitches.',
      }),
    mode_confidence: z.number().min(0).max(1).exactOptional().openapi({
      description: 'The confidence, from 0.0 to 1.0, of the reliability of the `mode`.',
      example: 0.471,
    }),
    start: z
      .number()
      .exactOptional()
      .openapi({ description: 'The starting point (in seconds) of the section.', example: 0 }),
    tempo: z.number().exactOptional().openapi({
      description:
        'The overall estimated tempo of the section in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.',
      example: 113.178,
    }),
    tempo_confidence: z.number().min(0).max(1).exactOptional().openapi({
      description:
        "The confidence, from 0.0 to 1.0, of the reliability of the tempo. Some tracks contain tempo changes or sounds which don't contain tempo (like pure speech) which would correspond to a low value in this field.",
      example: 0.647,
    }),
    time_signature: TimeSignatureSchema.exactOptional(),
    time_signature_confidence: z.number().min(0).max(1).exactOptional().openapi({
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`. Sections with time signature changes may correspond to low values in this field.',
      example: 1,
    }),
  })
  .readonly()
  .openapi('SectionObject')

const SegmentObjectSchema = z
  .object({
    confidence: z.number().min(0).max(1).exactOptional().openapi({
      description:
        'The confidence, from 0.0 to 1.0, of the reliability of the segmentation. Segments of the song which are difficult to logically segment (e.g: noise) may correspond to low values in this field.\n',
      example: 0.435,
    }),
    duration: z
      .number()
      .exactOptional()
      .openapi({ description: 'The duration (in seconds) of the segment.', example: 0.19891 }),
    loudness_end: z.number().exactOptional().openapi({
      description:
        'The offset loudness of the segment in decibels (dB). This value should be equivalent to the loudness_start of the following segment.',
      example: 0,
    }),
    loudness_max: z.number().exactOptional().openapi({
      description:
        'The peak loudness of the segment in decibels (dB). Combined with `loudness_start` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.',
      example: -14.25,
    }),
    loudness_max_time: z.number().exactOptional().openapi({
      description:
        'The segment-relative offset of the segment peak loudness in seconds. Combined with `loudness_start` and `loudness_max`, these components can be used to desctibe the "attack" of the segment.',
      example: 0.07305,
    }),
    loudness_start: z.number().exactOptional().openapi({
      description:
        'The onset loudness of the segment in decibels (dB). Combined with `loudness_max` and `loudness_max_time`, these components can be used to describe the "attack" of the segment.',
      example: -23.053,
    }),
    pitches: z
      .array(z.number().min(0).max(1))
      .exactOptional()
      .openapi({
        description:
          'Pitch content is given by a “chroma” vector, corresponding to the 12 pitch classes C, C#, D to B, with values ranging from 0 to 1 that describe the relative dominance of every pitch in the chromatic scale. For example a C Major chord would likely be represented by large values of C, E and G (i.e. classes 0, 4, and 7).\n\nVectors are normalized to 1 by their strongest dimension, therefore noisy sounds are likely represented by values that are all close to 1, while pure tones are described by one value at 1 (the pitch) and others near 0.\nAs can be seen below, the 12 vector indices are a combination of low-power spectrum values at their respective pitch frequencies.\n![pitch vector](https://developer.spotify.com/assets/audio/Pitch_vector.png)\n',
        example: [0.212, 0.141, 0.294],
      }),
    start: z.number().exactOptional().openapi({
      description: 'The starting point (in seconds) of the segment.',
      example: 0.70154,
    }),
    timbre: z
      .array(z.number())
      .exactOptional()
      .openapi({
        description:
          'Timbre is the quality of a musical note or sound that distinguishes different types of musical instruments, or voices. It is a complex notion also referred to as sound color, texture, or tone quality, and is derived from the shape of a segment’s spectro-temporal surface, independently of pitch and loudness. The timbre feature is a vector that includes 12 unbounded values roughly centered around 0. Those values are high level abstractions of the spectral surface, ordered by degree of importance.\n\nFor completeness however, the first dimension represents the average loudness of the segment; second emphasizes brightness; third is more closely correlated to the flatness of a sound; fourth to sounds with a stronger attack; etc. See an image below representing the 12 basis functions (i.e. template segments).\n![timbre basis functions](https://developer.spotify.com/assets/audio/Timbre_basis_functions.png)\n\nThe actual timbre of the segment is best described as a linear combination of these 12 basis functions weighted by the coefficient values: timbre = c1 x b1 + c2 x b2 + ... + c12 x b12, where c1 to c12 represent the 12 coefficients and b1 to b12 the 12 basis functions as displayed below. Timbre vectors are best used in comparison with each other.\n',
        example: [42.115, 64.373, -0.233],
      }),
  })
  .readonly()
  .openapi('SegmentObject')

const KeySchema = z
  .int()
  .min(-1)
  .max(11)
  .openapi({
    description:
      'The key the track is in. Integers map to pitches using standard [Pitch Class notation](https://en.wikipedia.org/wiki/Pitch_class). E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.\n',
    example: 9,
  })
  .readonly()
  .openapi('Key')

const LoudnessSchema = z
  .float32()
  .openapi({
    description:
      'The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.\n',
    example: -5.883,
    'x-spotify-docs-type': 'Float',
  })
  .readonly()
  .openapi('Loudness')

const ModeSchema = z
  .int()
  .openapi({
    description:
      'Mode indicates the modality (major or minor) of a track, the type of scale from which its melodic content is derived. Major is represented by 1 and minor is 0.\n',
    example: 0,
  })
  .readonly()
  .openapi('Mode')

const TempoSchema = z
  .float32()
  .openapi({
    description:
      'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.\n',
    example: 118.211,
    'x-spotify-docs-type': 'Float',
  })
  .readonly()
  .openapi('Tempo')

const AudioAnalysisObjectSchema = z
  .object({
    bars: z.array(TimeIntervalObjectSchema).exactOptional().openapi({
      description:
        'The time intervals of the bars throughout the track. A bar (or measure) is a segment of time defined as a given number of beats.',
    }),
    beats: z.array(TimeIntervalObjectSchema).exactOptional().openapi({
      description:
        'The time intervals of beats throughout the track. A beat is the basic time unit of a piece of music; for example, each tick of a metronome. Beats are typically multiples of tatums.',
    }),
    meta: z
      .object({
        analysis_time: z.number().exactOptional().openapi({
          description: 'The amount of time taken to analyze this track.',
          example: 6.93906,
        }),
        analyzer_version: z.string().exactOptional().openapi({
          description: 'The version of the Analyzer used to analyze this track.',
          example: '4.0.0',
        }),
        detailed_status: z.string().exactOptional().openapi({
          description:
            'A detailed status code for this track. If analysis data is missing, this code may explain why.',
          example: 'OK',
        }),
        input_process: z.string().exactOptional().openapi({
          description: "The method used to read the track's audio data.",
          example: 'libvorbisfile L+R 44100->22050',
        }),
        platform: z.string().exactOptional().openapi({
          description: "The platform used to read the track's audio data.",
          example: 'Linux',
        }),
        status_code: z.int().exactOptional().openapi({
          description:
            'The return code of the analyzer process. 0 if successful, 1 if any errors occurred.',
          example: 0,
        }),
        timestamp: z.int().exactOptional().openapi({
          description: 'The Unix timestamp (in seconds) at which this track was analyzed.',
          example: 1495193577,
        }),
      })
      .exactOptional(),
    sections: z.array(SectionObjectSchema).exactOptional().openapi({
      description:
        'Sections are defined by large variations in rhythm or timbre, e.g. chorus, verse, bridge, guitar solo, etc. Each section contains its own descriptions of tempo, key, mode, time_signature, and loudness.',
    }),
    segments: z.array(SegmentObjectSchema).exactOptional().openapi({
      description: 'Each segment contains a roughly conisistent sound throughout its duration.',
    }),
    tatums: z.array(TimeIntervalObjectSchema).exactOptional().openapi({
      description:
        'A tatum represents the lowest regular pulse train that a listener intuitively infers from the timing of perceived musical events (segments).',
    }),
    track: z
      .object({
        analysis_channels: z.int().exactOptional().openapi({
          description:
            'The number of channels used for analysis. If 1, all channels are summed together to mono before analysis.',
          example: 1,
        }),
        analysis_sample_rate: z.int().exactOptional().openapi({
          description:
            'The sample rate used to decode and analyze this track. May differ from the actual sample rate of this track available on Spotify.',
          example: 22050,
        }),
        code_version: z.number().exactOptional().openapi({
          description:
            'A version number for the Echo Nest Musical Fingerprint format used in the codestring field.',
          example: 3.15,
        }),
        codestring: z.string().exactOptional().openapi({
          description:
            'An [Echo Nest Musical Fingerprint (ENMFP)](https://academiccommons.columbia.edu/doi/10.7916/D8Q248M4) codestring for this track.',
        }),
        duration: z
          .number()
          .exactOptional()
          .openapi({ description: 'Length of the track in seconds.', example: 207.95985 }),
        echoprint_version: z.number().exactOptional().openapi({
          description:
            'A version number for the EchoPrint format used in the echoprintstring field.',
          example: 4.15,
        }),
        echoprintstring: z.string().exactOptional().openapi({
          description:
            'An [EchoPrint](https://github.com/spotify/echoprint-codegen) codestring for this track.',
        }),
        end_of_fade_in: z.number().exactOptional().openapi({
          description:
            "The time, in seconds, at which the track's fade-in period ends. If the track has no fade-in, this will be 0.0.",
          example: 0,
        }),
        key: KeySchema.exactOptional(),
        key_confidence: z.number().min(0).max(1).exactOptional().openapi({
          description: 'The confidence, from 0.0 to 1.0, of the reliability of the `key`.',
          example: 0.408,
        }),
        loudness: LoudnessSchema.exactOptional(),
        mode: ModeSchema.exactOptional(),
        mode_confidence: z.number().min(0).max(1).exactOptional().openapi({
          description: 'The confidence, from 0.0 to 1.0, of the reliability of the `mode`.',
          example: 0.485,
        }),
        num_samples: z.int().exactOptional().openapi({
          description:
            'The exact number of audio samples analyzed from this track. See also `analysis_sample_rate`.',
          example: 4585515,
        }),
        offset_seconds: z.int().exactOptional().openapi({
          description:
            'An offset to the start of the region of the track that was analyzed. (As the entire track is analyzed, this should always be 0.)',
          example: 0,
        }),
        rhythm_version: z.number().exactOptional().openapi({
          description: 'A version number for the Rhythmstring used in the rhythmstring field.',
          example: 1,
        }),
        rhythmstring: z.string().exactOptional().openapi({
          description:
            'A Rhythmstring for this track. The format of this string is similar to the Synchstring.',
        }),
        sample_md5: z
          .string()
          .exactOptional()
          .openapi({ description: 'This field will always contain the empty string.' }),
        start_of_fade_out: z.number().exactOptional().openapi({
          description:
            "The time, in seconds, at which the track's fade-out period starts. If the track has no fade-out, this should match the track's length.",
          example: 201.13705,
        }),
        synch_version: z.number().exactOptional().openapi({
          description: 'A version number for the Synchstring used in the synchstring field.',
          example: 1,
        }),
        synchstring: z.string().exactOptional().openapi({
          description: 'A [Synchstring](https://github.com/echonest/synchdata) for this track.',
        }),
        tempo: TempoSchema.exactOptional(),
        tempo_confidence: z.number().min(0).max(1).exactOptional().openapi({
          description: 'The confidence, from 0.0 to 1.0, of the reliability of the `tempo`.',
          example: 0.73,
        }),
        time_signature: TimeSignatureSchema.exactOptional(),
        time_signature_confidence: z.number().min(0).max(1).exactOptional().openapi({
          description:
            'The confidence, from 0.0 to 1.0, of the reliability of the `time_signature`.',
          example: 0.994,
        }),
        window_seconds: z.int().exactOptional().openapi({
          description:
            'The length of the region of the track was analyzed, if a subset of the track was analyzed. (As the entire track is analyzed, this should always be 0.)',
          example: 0,
        }),
      })
      .exactOptional(),
  })
  .openapi({ 'x-spotify-docs-type': 'AudioAnalysisObject' })
  .readonly()
  .openapi('AudioAnalysisObject')

const AudioFeaturesObjectSchema = z
  .object({
    acousticness: z.float32().min(0).max(1).exactOptional().openapi({
      description:
        'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.\n',
      example: 0.00242,
      'x-spotify-docs-type': 'Float',
    }),
    analysis_url: z.string().exactOptional().openapi({
      description:
        'A URL to access the full audio analysis of this track. An access token is required to access this data.\n',
      example: 'https://api.spotify.com/v1/audio-analysis/2takcwOaAZWiXQijPHIx7B\n',
    }),
    danceability: z.float32().exactOptional().openapi({
      description:
        'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.\n',
      example: 0.585,
      'x-spotify-docs-type': 'Float',
    }),
    duration_ms: z
      .int()
      .exactOptional()
      .openapi({ description: 'The duration of the track in milliseconds.\n', example: 237040 }),
    energy: z.float32().exactOptional().openapi({
      description:
        'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.\n',
      example: 0.842,
      'x-spotify-docs-type': 'Float',
    }),
    id: z.string().exactOptional().openapi({
      description: 'The Spotify ID for the track.\n',
      example: '2takcwOaAZWiXQijPHIx7B',
    }),
    instrumentalness: z.float32().exactOptional().openapi({
      description:
        'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.\n',
      example: 0.00686,
      'x-spotify-docs-type': 'Float',
    }),
    key: KeySchema.exactOptional(),
    liveness: z.float32().exactOptional().openapi({
      description:
        'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.\n',
      example: 0.0866,
      'x-spotify-docs-type': 'Float',
    }),
    loudness: LoudnessSchema.exactOptional(),
    mode: ModeSchema.exactOptional(),
    speechiness: z.float32().exactOptional().openapi({
      description:
        'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.\n',
      example: 0.0556,
      'x-spotify-docs-type': 'Float',
    }),
    tempo: TempoSchema.exactOptional(),
    time_signature: TimeSignatureSchema.exactOptional(),
    track_href: z.string().exactOptional().openapi({
      description: 'A link to the Web API endpoint providing full details of the track.\n',
      example: 'https://api.spotify.com/v1/tracks/2takcwOaAZWiXQijPHIx7B\n',
    }),
    type: z
      .literal('audio_features')
      .exactOptional()
      .openapi({ description: 'The object type.\n' }),
    uri: z.string().exactOptional().openapi({
      description: 'The Spotify URI for the track.\n',
      example: 'spotify:track:2takcwOaAZWiXQijPHIx7B',
    }),
    valence: z.float32().min(0).max(1).exactOptional().openapi({
      description:
        'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).\n',
      example: 0.428,
      'x-spotify-docs-type': 'Float',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'AudioFeaturesObject' })
  .readonly()
  .openapi('AudioFeaturesObject')

const AuthorObjectSchema = z
  .object({
    name: z.string().exactOptional().openapi({ description: 'The name of the author.\n' }),
  })
  .openapi({ 'x-spotify-docs-type': 'AuthorObject' })
  .readonly()
  .openapi('AuthorObject')

const NarratorObjectSchema = z
  .object({
    name: z.string().exactOptional().openapi({ description: 'The name of the Narrator.\n' }),
  })
  .openapi({ 'x-spotify-docs-type': 'NarratorObject' })
  .readonly()
  .openapi('NarratorObject')

const AudiobookBaseSchema = z
  .object({
    authors: z
      .array(AuthorObjectSchema)
      .openapi({ description: 'The author(s) for the audiobook.\n' }),
    available_markets: z.array(z.string()).openapi({
      description:
        'A list of the countries in which the audiobook can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
    }),
    copyrights: z
      .array(CopyrightObjectSchema)
      .openapi({ description: 'The copyright statements of the audiobook.\n' }),
    description: z.string().openapi({
      description:
        'A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
    }),
    edition: z
      .string()
      .exactOptional()
      .openapi({ description: 'The edition of the audiobook.\n', example: 'Unabridged' }),
    explicit: z.boolean().openapi({
      description:
        'Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown).\n',
    }),
    external_urls: ExternalUrlObjectSchema.openapi({
      description: 'External URLs for this audiobook.\n',
    }),
    href: z.string().openapi({
      description: 'A link to the Web API endpoint providing full details of the audiobook.\n',
    }),
    html_description: z.string().openapi({
      description: 'A description of the audiobook. This field may contain HTML tags.\n',
    }),
    id: z.string().openapi({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\n',
    }),
    images: z.array(ImageObjectSchema).openapi({
      description: 'The cover art for the audiobook in various sizes, widest first.\n',
    }),
    languages: z.array(z.string()).openapi({
      description:
        'A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n',
    }),
    media_type: z.string().openapi({ description: 'The media type of the audiobook.\n' }),
    name: z.string().openapi({ description: 'The name of the audiobook.\n' }),
    narrators: z
      .array(NarratorObjectSchema)
      .openapi({ description: 'The narrator(s) for the audiobook.\n' }),
    publisher: z.string().openapi({ description: 'The publisher of the audiobook.\n' }),
    total_chapters: z.int().openapi({ description: 'The number of chapters in this audiobook.\n' }),
    type: z.literal('audiobook').openapi({ description: 'The object type.\n' }),
    uri: z.string().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook.\n',
    }),
  })
  .openapi({
    required: [
      'authors',
      'available_markets',
      'copyrights',
      'description',
      'explicit',
      'external_urls',
      'href',
      'html_description',
      'id',
      'images',
      'languages',
      'media_type',
      'name',
      'narrators',
      'publisher',
      'total_chapters',
      'type',
      'uri',
    ],
  })
  .readonly()
  .openapi('AudiobookBase')

const ChapterRestrictionObjectSchema = z
  .object({
    reason: z.string().exactOptional().openapi({
      description:
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n- `payment_required` - Payment is required to play the content item.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'ChapterRestrictionObject' })
  .readonly()
  .openapi('ChapterRestrictionObject')

const ResumePointObjectSchema = z
  .object({
    fully_played: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'Whether or not the episode has been fully played by the user.\n' }),
    resume_position_ms: z.int().exactOptional().openapi({
      description: "The user's most recent position in the episode in milliseconds.\n",
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'ResumePointObject' })
  .readonly()
  .openapi('ResumePointObject')

const ChapterBaseSchema = z
  .object({
    audio_preview_url: z.string().openapi({
      description:
        'A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.\n',
      example: 'https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17',
      'x-spotify-policy-list': [{ $ref: '#/components/x-spotify-policy/StandalonePreview' }],
    }),
    available_markets: z.array(z.string()).exactOptional().openapi({
      description:
        'A list of the countries in which the chapter can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
    }),
    chapter_number: z.int().openapi({ description: 'The number of the chapter\n', example: 1 }),
    description: z.string().openapi({
      description:
        'A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
      example:
        'A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.\n',
    }),
    duration_ms: z
      .int()
      .openapi({ description: 'The episode length in milliseconds.\n', example: 1686230 }),
    explicit: z.boolean().openapi({
      description:
        'Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).\n',
    }),
    external_urls: ExternalUrlObjectSchema.openapi({
      description: 'External URLs for this episode.\n',
    }),
    href: z.string().openapi({
      description: 'A link to the Web API endpoint providing full details of the episode.\n',
      example: 'https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ',
    }),
    html_description: z.string().openapi({
      description: 'A description of the episode. This field may contain HTML tags.\n',
      example:
        '<p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>\n',
    }),
    id: z.string().openapi({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
      example: '5Xt5DXGzch68nYYamXrNxZ',
    }),
    images: z
      .array(ImageObjectSchema)
      .openapi({ description: 'The cover art for the episode in various sizes, widest first.\n' }),
    is_playable: z.boolean().openapi({
      description: 'True if the episode is playable in the given market. Otherwise false.\n',
    }),
    languages: z.array(z.string()).openapi({
      description:
        'A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\n',
      example: ['fr', 'en'],
    }),
    name: z.string().openapi({
      description: 'The name of the episode.\n',
      example: 'Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators\n',
    }),
    release_date: z.string().openapi({
      description:
        'The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.\n',
      example: '1981-12-15',
    }),
    release_date_precision: z.enum(['year', 'month', 'day']).openapi({
      description: 'The precision with which `release_date` value is known.\n',
      example: 'day',
    }),
    restrictions: ChapterRestrictionObjectSchema.exactOptional().openapi({
      description: 'Included in the response when a content restriction is applied.\n',
    }),
    resume_point: ResumePointObjectSchema.openapi({
      description:
        "The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'.\n",
    }),
    type: z.literal('episode').openapi({ description: 'The object type.\n' }),
    uri: z.string().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
      example: 'spotify:episode:0zLhl3WsOCQHbe1BPTiHgr',
    }),
  })
  .openapi({
    required: [
      'audio_preview_url',
      'chapter_number',
      'description',
      'html_description',
      'duration_ms',
      'explicit',
      'external_urls',
      'href',
      'id',
      'images',
      'is_playable',
      'languages',
      'name',
      'release_date',
      'release_date_precision',
      'resume_point',
      'type',
      'uri',
    ],
  })
  .readonly()
  .openapi('ChapterBase')

const SimplifiedChapterObjectSchema = ChapterBaseSchema.and(z.object({}))
  .openapi({ 'x-spotify-docs-type': 'SimplifiedChapterObject' })
  .readonly()
  .openapi('SimplifiedChapterObject')

const PagingSimplifiedChapterObjectSchema = PagingObjectSchema.and(
  z.object({ items: z.array(SimplifiedChapterObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingSimplifiedChapterObject' })
  .readonly()
  .openapi('PagingSimplifiedChapterObject')

const AudiobookObjectSchema = AudiobookBaseSchema.and(
  z
    .object({
      chapters: PagingSimplifiedChapterObjectSchema.openapi({
        description: 'The chapters of the audiobook.\n',
      }),
    })
    .openapi({ required: ['chapters'] }),
)
  .openapi({ 'x-spotify-docs-type': 'AudiobookObject' })
  .readonly()
  .openapi('AudiobookObject')

const CategoryObjectSchema = z
  .object({
    href: z.string().openapi({
      description: 'A link to the Web API endpoint returning full details of the category.\n',
    }),
    icons: z
      .array(ImageObjectSchema)
      .openapi({ description: 'The category icon, in various sizes.\n' }),
    id: z.string().openapi({
      description:
        'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) of the category.\n',
      example: 'equal',
    }),
    name: z.string().openapi({ description: 'The name of the category.\n', example: 'EQUAL' }),
  })
  .openapi({ required: ['href', 'icons', 'id', 'name'], 'x-spotify-docs-type': 'CategoryObject' })
  .readonly()
  .openapi('CategoryObject')

const SimplifiedAudiobookObjectSchema = AudiobookBaseSchema.and(z.object({}))
  .openapi({ 'x-spotify-docs-type': 'SimplifiedAudiobookObject' })
  .readonly()
  .openapi('SimplifiedAudiobookObject')

const ChapterObjectSchema = ChapterBaseSchema.and(
  z
    .object({
      audiobook: SimplifiedAudiobookObjectSchema.openapi({
        description: 'The audiobook for which the chapter belongs.\n',
      }),
    })
    .openapi({ required: ['audiobook'] }),
)
  .openapi({ 'x-spotify-docs-type': 'ChapterObject' })
  .readonly()
  .openapi('ChapterObject')

const ContextObjectSchema = z
  .object({
    external_urls: ExternalUrlObjectSchema.exactOptional().openapi({
      description: 'External URLs for this context.',
    }),
    href: z.string().exactOptional().openapi({
      description: 'A link to the Web API endpoint providing full details of the track.',
    }),
    type: z
      .string()
      .exactOptional()
      .openapi({ description: 'The object type, e.g. "artist", "playlist", "album", "show".\n' }),
    uri: z.string().exactOptional().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the context.\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'ContextObject' })
  .readonly()
  .openapi('ContextObject')

const DisallowsObjectSchema = z
  .object({
    interrupting_playback: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'Interrupting playback. Optional field.' }),
    pausing: z.boolean().exactOptional().openapi({ description: 'Pausing. Optional field.' }),
    resuming: z.boolean().exactOptional().openapi({ description: 'Resuming. Optional field.' }),
    seeking: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'Seeking playback location. Optional field.' }),
    skipping_next: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'Skipping to the next context. Optional field.' }),
    skipping_prev: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'Skipping to the previous context. Optional field.' }),
    toggling_repeat_context: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'Toggling repeat context flag. Optional field.' }),
    toggling_repeat_track: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'Toggling repeat track flag. Optional field.' }),
    toggling_shuffle: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'Toggling shuffle flag. Optional field.' }),
    transferring_playback: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'Transfering playback between devices. Optional field.' }),
  })
  .openapi({ 'x-spotify-docs-type': 'DisallowsObject' })
  .readonly()
  .openapi('DisallowsObject')

const DeviceObjectSchema = z
  .object({
    id: z.string().nullable().exactOptional().openapi({ description: 'The device ID.' }),
    is_active: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'If this device is the currently active device.' }),
    is_private_session: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'If this device is currently in a private session.' }),
    is_restricted: z.boolean().exactOptional().openapi({
      description:
        'Whether controlling this device is restricted. At present if this is "true" then no Web API commands will be accepted by this device.',
    }),
    name: z.string().exactOptional().openapi({
      description:
        'A human-readable name for the device. Some devices have a name that the user can configure (e.g. \\"Loudest speaker\\") and some devices have a generic name associated with the manufacturer or device model.',
      example: 'Kitchen speaker',
    }),
    type: z.string().exactOptional().openapi({
      description: 'Device type, such as "computer", "smartphone" or "speaker".',
      example: 'computer',
    }),
    volume_percent: z
      .int()
      .min(0)
      .max(100)
      .nullable()
      .exactOptional()
      .openapi({ description: 'The current volume in percent.', example: 59 }),
  })
  .openapi({ 'x-spotify-docs-type': 'DeviceObject' })
  .readonly()
  .openapi('DeviceObject')

const SimplifiedAlbumObjectSchema = AlbumBaseSchema.and(
  z
    .object({
      album_group: z
        .enum(['album', 'single', 'compilation', 'appears_on'])
        .exactOptional()
        .openapi({
          description:
            "The field is present when getting an artist's albums. Compare to album_type this field represents relationship between the artist and the album.\n",
          example: 'compilation',
        }),
      artists: z.array(SimplifiedArtistObjectSchema).openapi({
        description:
          'The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist.\n',
      }),
    })
    .openapi({ required: ['artists'] }),
)
  .openapi({ 'x-spotify-docs-type': 'SimplifiedAlbumObject' })
  .readonly()
  .openapi('SimplifiedAlbumObject')

const TrackObjectSchema = z
  .object({
    album: SimplifiedAlbumObjectSchema.exactOptional().openapi({
      description:
        'The album on which the track appears. The album object includes a link in `href` to full information about the album.\n',
    }),
    artists: z.array(ArtistObjectSchema).exactOptional().openapi({
      description:
        'The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.\n',
    }),
    available_markets: z.array(z.string()).exactOptional().openapi({
      description:
        'A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
    }),
    disc_number: z.int().exactOptional().openapi({
      description:
        'The disc number (usually `1` unless the album consists of more than one disc).\n',
    }),
    duration_ms: z
      .int()
      .exactOptional()
      .openapi({ description: 'The track length in milliseconds.\n' }),
    explicit: z.boolean().exactOptional().openapi({
      description:
        'Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).\n',
    }),
    external_ids: ExternalIdObjectSchema.exactOptional().openapi({
      description: 'Known external IDs for the track.\n',
    }),
    external_urls: ExternalUrlObjectSchema.exactOptional().openapi({
      description: 'Known external URLs for this track.\n',
    }),
    href: z.string().exactOptional().openapi({
      description: 'A link to the Web API endpoint providing full details of the track.\n',
    }),
    id: z.string().exactOptional().openapi({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
    is_local: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'Whether or not the track is from a local file.\n' }),
    is_playable: z.boolean().exactOptional().openapi({
      description:
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied. If `true`, the track is playable in the given market. Otherwise `false`.\n',
    }),
    linked_from: z.object({}).exactOptional().openapi({
      description:
        'Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking) is applied, and the requested track has been replaced with different track. The track in the `linked_from` object contains information about the originally requested track.\n',
    }),
    name: z.string().exactOptional().openapi({ description: 'The name of the track.\n' }),
    popularity: z.int().exactOptional().openapi({
      description:
        'The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.<br/>The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.<br/>Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. _**Note**: the popularity value may lag actual popularity by a few days: the value is not updated in real time._\n',
    }),
    preview_url: z
      .string()
      .exactOptional()
      .openapi({
        description: 'A link to a 30 second preview (MP3 format) of the track. Can be `null`\n',
        'x-spotify-policy-list': [{ $ref: '#/components/x-spotify-policy/StandalonePreview' }],
      }),
    restrictions: TrackRestrictionObjectSchema.exactOptional().openapi({
      description: 'Included in the response when a content restriction is applied.\n',
    }),
    track_number: z.int().exactOptional().openapi({
      description:
        'The number of the track. If an album has several discs, the track number is the number on the specified disc.\n',
    }),
    type: z
      .literal('track')
      .exactOptional()
      .openapi({ description: 'The object type: "track".\n' }),
    uri: z.string().exactOptional().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'TrackObject' })
  .readonly()
  .openapi('TrackObject')

const EpisodeRestrictionObjectSchema = z
  .object({
    reason: z.string().exactOptional().openapi({
      description:
        "The reason for the restriction. Supported values:\n- `market` - The content item is not available in the given market.\n- `product` - The content item is not available for the user's subscription type.\n- `explicit` - The content item is explicit and the user's account is set to not play explicit content.\n\nAdditional reasons may be added in the future.\n**Note**: If you use this field, make sure that your application safely handles unknown values.\n",
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'EpisodeRestrictionObject' })
  .readonly()
  .openapi('EpisodeRestrictionObject')

const EpisodeBaseSchema = z
  .object({
    audio_preview_url: z.string().openapi({
      description:
        'A URL to a 30 second preview (MP3 format) of the episode. `null` if not available.\n',
      example: 'https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17',
      'x-spotify-policy-list': [{ $ref: '#/components/x-spotify-policy/StandalonePreview' }],
    }),
    description: z.string().openapi({
      description:
        'A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
      example:
        'A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.\n',
    }),
    duration_ms: z
      .int()
      .openapi({ description: 'The episode length in milliseconds.\n', example: 1686230 }),
    explicit: z.boolean().openapi({
      description:
        'Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown).\n',
    }),
    external_urls: ExternalUrlObjectSchema.openapi({
      description: 'External URLs for this episode.\n',
    }),
    href: z.string().openapi({
      description: 'A link to the Web API endpoint providing full details of the episode.\n',
      example: 'https://api.spotify.com/v1/episodes/5Xt5DXGzch68nYYamXrNxZ',
    }),
    html_description: z.string().openapi({
      description: 'A description of the episode. This field may contain HTML tags.\n',
      example:
        '<p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>\n',
    }),
    id: z.string().openapi({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
      example: '5Xt5DXGzch68nYYamXrNxZ',
    }),
    images: z
      .array(ImageObjectSchema)
      .openapi({ description: 'The cover art for the episode in various sizes, widest first.\n' }),
    is_externally_hosted: z
      .boolean()
      .openapi({ description: "True if the episode is hosted outside of Spotify's CDN.\n" }),
    is_playable: z.boolean().openapi({
      description: 'True if the episode is playable in the given market. Otherwise false.\n',
    }),
    language: z.string().exactOptional().openapi({
      deprecated: true,
      description:
        'The language used in the episode, identified by a [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. This field is deprecated and might be removed in the future. Please use the `languages` field instead.\n',
      example: 'en',
    }),
    languages: z.array(z.string()).openapi({
      description:
        'A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code.\n',
      example: ['fr', 'en'],
    }),
    name: z.string().openapi({
      description: 'The name of the episode.\n',
      example: 'Starting Your Own Podcast: Tips, Tricks, and Advice From Anchor Creators\n',
    }),
    release_date: z.string().openapi({
      description:
        'The date the episode was first released, for example `"1981-12-15"`. Depending on the precision, it might be shown as `"1981"` or `"1981-12"`.\n',
      example: '1981-12-15',
    }),
    release_date_precision: z.enum(['year', 'month', 'day']).openapi({
      description: 'The precision with which `release_date` value is known.\n',
      example: 'day',
    }),
    restrictions: EpisodeRestrictionObjectSchema.exactOptional().openapi({
      description: 'Included in the response when a content restriction is applied.\n',
    }),
    resume_point: ResumePointObjectSchema.openapi({
      description:
        "The user's most recent position in the episode. Set if the supplied access token is a user token and has the scope 'user-read-playback-position'.\n",
    }),
    type: z.literal('episode').openapi({ description: 'The object type.\n' }),
    uri: z.string().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode.\n',
      example: 'spotify:episode:0zLhl3WsOCQHbe1BPTiHgr',
    }),
  })
  .openapi({
    required: [
      'audio_preview_url',
      'description',
      'html_description',
      'duration_ms',
      'explicit',
      'external_urls',
      'href',
      'id',
      'images',
      'is_externally_hosted',
      'is_playable',
      'languages',
      'name',
      'release_date',
      'release_date_precision',
      'resume_point',
      'type',
      'uri',
    ],
  })
  .readonly()
  .openapi('EpisodeBase')

const ShowBaseSchema = z
  .object({
    available_markets: z.array(z.string()).openapi({
      description:
        'A list of the countries in which the show can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.\n',
    }),
    copyrights: z
      .array(CopyrightObjectSchema)
      .openapi({ description: 'The copyright statements of the show.\n' }),
    description: z.string().openapi({
      description:
        'A description of the show. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed.\n',
    }),
    explicit: z.boolean().openapi({
      description:
        'Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).\n',
    }),
    external_urls: ExternalUrlObjectSchema.openapi({
      description: 'External URLs for this show.\n',
    }),
    href: z.string().openapi({
      description: 'A link to the Web API endpoint providing full details of the show.\n',
    }),
    html_description: z
      .string()
      .openapi({ description: 'A description of the show. This field may contain HTML tags.\n' }),
    id: z.string().openapi({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the show.\n',
    }),
    images: z
      .array(ImageObjectSchema)
      .openapi({ description: 'The cover art for the show in various sizes, widest first.\n' }),
    is_externally_hosted: z.boolean().openapi({
      description:
        "True if all of the shows episodes are hosted outside of Spotify's CDN. This field might be `null` in some cases.\n",
    }),
    languages: z.array(z.string()).openapi({
      description:
        'A list of the languages used in the show, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code.\n',
    }),
    media_type: z.string().openapi({ description: 'The media type of the show.\n' }),
    name: z.string().openapi({ description: 'The name of the episode.\n' }),
    publisher: z.string().openapi({ description: 'The publisher of the show.\n' }),
    total_episodes: z.int().openapi({ description: 'The total number of episodes in the show.\n' }),
    type: z.literal('show').openapi({ description: 'The object type.\n' }),
    uri: z.string().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the show.\n',
    }),
  })
  .openapi({
    required: [
      'available_markets',
      'copyrights',
      'description',
      'explicit',
      'external_urls',
      'href',
      'html_description',
      'id',
      'images',
      'is_externally_hosted',
      'languages',
      'media_type',
      'name',
      'publisher',
      'total_episodes',
      'type',
      'uri',
    ],
  })
  .readonly()
  .openapi('ShowBase')

const SimplifiedShowObjectSchema = ShowBaseSchema.and(z.object({}))
  .openapi({ 'x-spotify-docs-type': 'SimplifiedShowObject' })
  .readonly()
  .openapi('SimplifiedShowObject')

const EpisodeObjectSchema = EpisodeBaseSchema.and(
  z
    .object({
      show: SimplifiedShowObjectSchema.openapi({
        description: 'The show on which the episode belongs.\n',
      }),
    })
    .openapi({ required: ['show'] }),
)
  .openapi({ 'x-spotify-docs-type': 'EpisodeObject' })
  .readonly()
  .openapi('EpisodeObject')

const CurrentlyPlayingContextObjectSchema = z
  .object({
    actions: DisallowsObjectSchema.exactOptional().openapi({
      description:
        'Allows to update the user interface based on which playback actions are available within the current context.\n',
    }),
    context: ContextObjectSchema.exactOptional().openapi({
      description: 'A Context Object. Can be `null`.',
    }),
    currently_playing_type: z.string().exactOptional().openapi({
      description:
        'The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.\n',
    }),
    device: DeviceObjectSchema.exactOptional().openapi({
      description: 'The device that is currently active.\n',
    }),
    is_playing: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'If something is currently playing, return `true`.' }),
    item: z
      .xor([TrackObjectSchema, EpisodeObjectSchema])
      .exactOptional()
      .openapi({
        description: 'The currently playing track or episode. Can be `null`.',
        discriminator: { propertyName: 'type' },
        'x-spotify-docs-type': 'TrackObject | EpisodeObject',
      }),
    progress_ms: z.int().exactOptional().openapi({
      description: 'Progress into the currently playing track or episode. Can be `null`.',
    }),
    repeat_state: z.string().exactOptional().openapi({ description: 'off, track, context' }),
    shuffle_state: z.boolean().exactOptional().openapi({ description: 'If shuffle is on or off.' }),
    timestamp: z
      .int()
      .exactOptional()
      .openapi({ description: 'Unix Millisecond Timestamp when data was fetched.' }),
  })
  .openapi({ 'x-spotify-docs-type': 'CurrentlyPlayingContextObject' })
  .readonly()
  .openapi('CurrentlyPlayingContextObject')

const CurrentlyPlayingObjectSchema = z
  .object({
    context: ContextObjectSchema.exactOptional().openapi({
      description: 'A Context Object. Can be `null`.',
    }),
    currently_playing_type: z.string().exactOptional().openapi({
      description:
        'The object type of the currently playing item. Can be one of `track`, `episode`, `ad` or `unknown`.\n',
    }),
    is_playing: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'If something is currently playing, return `true`.' }),
    item: z
      .xor([TrackObjectSchema, EpisodeObjectSchema])
      .exactOptional()
      .openapi({
        description: 'The currently playing track or episode. Can be `null`.',
        discriminator: { propertyName: 'type' },
        'x-spotify-docs-type': 'TrackObject | EpisodeObject',
      }),
    progress_ms: z.int().exactOptional().openapi({
      description: 'Progress into the currently playing track or episode. Can be `null`.',
    }),
    timestamp: z
      .int()
      .exactOptional()
      .openapi({ description: 'Unix Millisecond Timestamp when data was fetched' }),
  })
  .openapi({ 'x-spotify-docs-type': 'CurrentlyPlayingObject' })
  .readonly()
  .openapi('CurrentlyPlayingObject')

const CursorObjectSchema = z
  .object({
    after: z
      .string()
      .exactOptional()
      .openapi({ description: 'The cursor to use as key to find the next page of items.' }),
    before: z
      .string()
      .exactOptional()
      .openapi({ description: 'The cursor to use as key to find the previous page of items.' }),
  })
  .openapi({ 'x-spotify-docs-type': 'CursorObject' })
  .readonly()
  .openapi('CursorObject')

const CursorPagingObjectSchema = z
  .object({
    cursors: CursorObjectSchema.exactOptional().openapi({
      description: 'The cursors used to find the next set of items.',
    }),
    href: z.string().exactOptional().openapi({
      description: 'A link to the Web API endpoint returning the full result of the request.',
    }),
    limit: z.int().exactOptional().openapi({
      description:
        'The maximum number of items in the response (as set in the query or by default).',
    }),
    next: z
      .string()
      .exactOptional()
      .openapi({ description: 'URL to the next page of items. ( `null` if none)' }),
    total: z
      .int()
      .exactOptional()
      .openapi({ description: 'The total number of items available to return.' }),
  })
  .openapi({ 'x-spotify-docs-type': 'CursorPagingObject' })
  .readonly()
  .openapi('CursorPagingObject')

const PlayHistoryObjectSchema = z
  .object({
    context: ContextObjectSchema.exactOptional().openapi({
      description: 'The context the track was played from.',
    }),
    played_at: z.iso.datetime().exactOptional().openapi({
      description: 'The date and time the track was played.',
      'x-spotify-docs-type': 'Timestamp',
    }),
    track: TrackObjectSchema.exactOptional().openapi({
      description: 'The track the user listened to.',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'PlayHistoryObject' })
  .readonly()
  .openapi('PlayHistoryObject')

const CursorPagingPlayHistoryObjectSchema = CursorPagingObjectSchema.and(
  z.object({ items: z.array(PlayHistoryObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingTrackObject' })
  .readonly()
  .openapi('CursorPagingPlayHistoryObject')

const CursorPagingSimplifiedArtistObjectSchema = CursorPagingObjectSchema.and(
  z.object({ items: z.array(ArtistObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingArtistObject' })
  .readonly()
  .openapi('CursorPagingSimplifiedArtistObject')

const DevicesObjectSchema = z
  .object({
    devices: z
      .array(DeviceObjectSchema)
      .exactOptional()
      .openapi({ description: 'A list of 0..n Device objects' }),
  })
  .openapi({ 'x-spotify-docs-type': 'DevicesObject' })
  .readonly()
  .openapi('DevicesObject')

const ErrorObjectSchema = z
  .object({
    message: z
      .string()
      .openapi({ description: 'A short description of the cause of the error.\n' }),
    status: z.int().min(400).max(599).openapi({
      description:
        'The HTTP status code (also returned in the response header; see [Response Status Codes](/documentation/web-api/concepts/api-calls#response-status-codes) for more information).\n',
    }),
  })
  .openapi({ required: ['status', 'message'], 'x-spotify-docs-type': 'ErrorObject' })
  .readonly()
  .openapi('ErrorObject')

const ExplicitContentSettingsObjectSchema = z
  .object({
    filter_enabled: z.boolean().exactOptional().openapi({
      description: 'When `true`, indicates that explicit content should not be played.\n',
    }),
    filter_locked: z.boolean().exactOptional().openapi({
      description:
        "When `true`, indicates that the explicit content setting is locked and can't be changed by the user.\n",
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'ExplicitContentSettingsObject' })
  .readonly()
  .openapi('ExplicitContentSettingsObject')

const PagingArtistObjectSchema = PagingObjectSchema.and(
  z.object({ items: z.array(ArtistObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingArtistObject' })
  .readonly()
  .openapi('PagingArtistObject')

const PlaylistUserObjectSchema = z
  .object({
    external_urls: ExternalUrlObjectSchema.exactOptional().openapi({
      description: 'Known public external URLs for this user.\n',
    }),
    followers: FollowersObjectSchema.exactOptional().openapi({
      description: 'Information about the followers of this user.\n',
    }),
    href: z
      .string()
      .exactOptional()
      .openapi({ description: 'A link to the Web API endpoint for this user.\n' }),
    id: z.string().exactOptional().openapi({
      description:
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
    type: z.literal('user').exactOptional().openapi({ description: 'The object type.\n' }),
    uri: z.string().exactOptional().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'PlaylistUserObject' })
  .readonly()
  .openapi('PlaylistUserObject')

const PlaylistOwnerObjectSchema = PlaylistUserObjectSchema.and(
  z.object({
    display_name: z.string().nullable().exactOptional().openapi({
      description: "The name displayed on the user's profile. `null` if not available.\n",
    }),
  }),
)
  .readonly()
  .openapi('PlaylistOwnerObject')

const PlaylistTracksRefObjectSchema = z
  .object({
    href: z.string().exactOptional().openapi({
      description:
        "A link to the Web API endpoint where full details of the playlist's tracks can be retrieved.\n",
    }),
    total: z.int().exactOptional().openapi({ description: 'Number of tracks in the playlist.\n' }),
  })
  .openapi({ 'x-spotify-docs-type': 'PlaylistTracksRefObject' })
  .readonly()
  .openapi('PlaylistTracksRefObject')

const SimplifiedPlaylistObjectSchema = z
  .object({
    collaborative: z
      .boolean()
      .exactOptional()
      .openapi({ description: '`true` if the owner allows other users to modify the playlist.\n' }),
    description: z.string().exactOptional().openapi({
      description:
        'The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n',
    }),
    external_urls: ExternalUrlObjectSchema.exactOptional().openapi({
      description: 'Known external URLs for this playlist.\n',
    }),
    href: z.string().exactOptional().openapi({
      description: 'A link to the Web API endpoint providing full details of the playlist.\n',
    }),
    id: z.string().exactOptional().openapi({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
    images: z.array(ImageObjectSchema).exactOptional().openapi({
      description:
        'Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n',
    }),
    name: z.string().exactOptional().openapi({ description: 'The name of the playlist.\n' }),
    owner: PlaylistOwnerObjectSchema.exactOptional().openapi({
      description: 'The user who owns the playlist\n',
    }),
    public: z.boolean().exactOptional().openapi({
      description:
        "The playlist's public/private status: `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
    }),
    snapshot_id: z.string().exactOptional().openapi({
      description:
        'The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n',
    }),
    tracks: PlaylistTracksRefObjectSchema.exactOptional().openapi({
      description:
        "A collection containing a link ( `href` ) to the Web API endpoint where full details of the playlist's tracks can be retrieved, along with the `total` number of tracks in the playlist. Note, a track object may be `null`. This can happen if a track is no longer available.\n",
    }),
    type: z.string().exactOptional().openapi({ description: 'The object type: "playlist"\n' }),
    uri: z.string().exactOptional().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'SimplifiedPlaylistObject' })
  .readonly()
  .openapi('SimplifiedPlaylistObject')

const PagingPlaylistObjectSchema = PagingObjectSchema.and(
  z.object({ items: z.array(SimplifiedPlaylistObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingPlaylistObject' })
  .readonly()
  .openapi('PagingPlaylistObject')

const PagingFeaturedPlaylistObjectSchema = z
  .object({
    message: z.string().exactOptional(),
    playlists: PagingPlaylistObjectSchema.exactOptional(),
  })
  .openapi({ 'x-spotify-docs-type': 'PagingFeaturedPlaylistObject' })
  .readonly()
  .openapi('PagingFeaturedPlaylistObject')

const PlaylistTrackObjectSchema = z
  .object({
    added_at: z.iso.datetime().exactOptional().openapi({
      description:
        'The date and time the track or episode was added. _**Note**: some very old playlists may return `null` in this field._\n',
      'x-spotify-docs-type': 'Timestamp',
    }),
    added_by: PlaylistUserObjectSchema.exactOptional().openapi({
      description:
        'The Spotify user who added the track or episode. _**Note**: some very old playlists may return `null` in this field._\n',
    }),
    is_local: z.boolean().exactOptional().openapi({
      description:
        'Whether this track or episode is a [local file](/documentation/web-api/concepts/playlists/#local-files) or not.\n',
    }),
    track: z
      .xor([TrackObjectSchema, EpisodeObjectSchema])
      .exactOptional()
      .openapi({
        description: 'Information about the track or episode.',
        discriminator: { propertyName: 'type' },
        'x-spotify-docs-type': 'TrackObject | EpisodeObject',
      }),
  })
  .openapi({ 'x-spotify-docs-type': 'PlaylistTrackObject' })
  .readonly()
  .openapi('PlaylistTrackObject')

const PagingPlaylistTrackObjectSchema = PagingObjectSchema.and(
  z.object({ items: z.array(PlaylistTrackObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingPlaylistTrackObject' })
  .readonly()
  .openapi('PagingPlaylistTrackObject')

const SavedAlbumObjectSchema = z
  .object({
    added_at: z.iso.datetime().exactOptional().openapi({
      description:
        'The date and time the album was saved\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
      'x-spotify-docs-type': 'Timestamp',
    }),
    album: AlbumObjectSchema.exactOptional().openapi({
      description: 'Information about the album.',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'SavedAlbumObject' })
  .readonly()
  .openapi('SavedAlbumObject')

const PagingSavedAlbumObjectSchema = PagingObjectSchema.and(
  z.object({ items: z.array(SavedAlbumObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingSavedAlbumObject' })
  .readonly()
  .openapi('PagingSavedAlbumObject')

const SavedEpisodeObjectSchema = z
  .object({
    added_at: z.iso.datetime().exactOptional().openapi({
      description:
        'The date and time the episode was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\n',
      'x-spotify-docs-type': 'Timestamp',
    }),
    episode: EpisodeObjectSchema.exactOptional().openapi({
      description: 'Information about the episode.',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'SavedEpisodeObject' })
  .readonly()
  .openapi('SavedEpisodeObject')

const PagingSavedEpisodeObjectSchema = PagingObjectSchema.and(
  z.object({ items: z.array(SavedEpisodeObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingEpisodeObject' })
  .readonly()
  .openapi('PagingSavedEpisodeObject')

const SavedShowObjectSchema = z
  .object({
    added_at: z.iso.datetime().exactOptional().openapi({
      description:
        'The date and time the show was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
      'x-spotify-docs-type': 'Timestamp',
    }),
    show: SimplifiedShowObjectSchema.exactOptional().openapi({
      description: 'Information about the show.',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'SavedShowObject' })
  .readonly()
  .openapi('SavedShowObject')

const PagingSavedShowObjectSchema = PagingObjectSchema.and(
  z.object({ items: z.array(SavedShowObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingShowObject' })
  .readonly()
  .openapi('PagingSavedShowObject')

const SavedTrackObjectSchema = z
  .object({
    added_at: z.iso.datetime().exactOptional().openapi({
      description:
        'The date and time the track was saved.\nTimestamps are returned in ISO 8601 format as Coordinated Universal Time (UTC) with a zero offset: YYYY-MM-DDTHH:MM:SSZ.\nIf the time is imprecise (for example, the date/time of an album release), an additional field indicates the precision; see for example, release_date in an album object.\n',
      'x-spotify-docs-type': 'Timestamp',
    }),
    track: TrackObjectSchema.exactOptional().openapi({
      description: 'Information about the track.',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'SavedTrackObject' })
  .readonly()
  .openapi('SavedTrackObject')

const PagingSavedTrackObjectSchema = PagingObjectSchema.and(
  z.object({ items: z.array(SavedTrackObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingTrackObject' })
  .readonly()
  .openapi('PagingSavedTrackObject')

const PagingSimplifiedAlbumObjectSchema = PagingObjectSchema.and(
  z.object({ items: z.array(SimplifiedAlbumObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingAlbumObject' })
  .readonly()
  .openapi('PagingSimplifiedAlbumObject')

const PagingSimplifiedArtistObjectSchema = PagingObjectSchema.and(
  z.object({ items: z.array(SimplifiedArtistObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingArtistObject' })
  .readonly()
  .openapi('PagingSimplifiedArtistObject')

const PagingSimplifiedAudiobookObjectSchema = PagingObjectSchema.and(
  z.object({ items: z.array(SimplifiedAudiobookObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingAudiobookObject' })
  .readonly()
  .openapi('PagingSimplifiedAudiobookObject')

const SimplifiedEpisodeObjectSchema = EpisodeBaseSchema.and(z.object({}))
  .openapi({ 'x-spotify-docs-type': 'SimplifiedEpisodeObject' })
  .readonly()
  .openapi('SimplifiedEpisodeObject')

const PagingSimplifiedEpisodeObjectSchema = PagingObjectSchema.and(
  z.object({ items: z.array(SimplifiedEpisodeObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingEpisodeObject' })
  .readonly()
  .openapi('PagingSimplifiedEpisodeObject')

const PagingSimplifiedShowObjectSchema = PagingObjectSchema.and(
  z.object({ items: z.array(SimplifiedShowObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingShowObject' })
  .readonly()
  .openapi('PagingSimplifiedShowObject')

const PagingTrackObjectSchema = PagingObjectSchema.and(
  z.object({ items: z.array(TrackObjectSchema).exactOptional() }),
)
  .openapi({ 'x-spotify-docs-type': 'PagingTrackObject' })
  .readonly()
  .openapi('PagingTrackObject')

const PlayerErrorReasonsSchema = z
  .enum([
    'NO_PREV_TRACK',
    'NO_NEXT_TRACK',
    'NO_SPECIFIC_TRACK',
    'ALREADY_PAUSED',
    'NOT_PAUSED',
    'NOT_PLAYING_LOCALLY',
    'NOT_PLAYING_TRACK',
    'NOT_PLAYING_CONTEXT',
    'ENDLESS_CONTEXT',
    'CONTEXT_DISALLOW',
    'ALREADY_PLAYING',
    'RATE_LIMITED',
    'REMOTE_CONTROL_DISALLOW',
    'DEVICE_NOT_CONTROLLABLE',
    'VOLUME_CONTROL_DISALLOW',
    'NO_ACTIVE_DEVICE',
    'PREMIUM_REQUIRED',
    'UNKNOWN',
  ])
  .openapi({
    description:
      "* `NO_PREV_TRACK` - The command requires a previous track, but there is none in the context.\n* `NO_NEXT_TRACK` - The command requires a next track, but there is none in the context.\n* `NO_SPECIFIC_TRACK` - The requested track does not exist.\n* `ALREADY_PAUSED` - The command requires playback to not be paused.\n* `NOT_PAUSED` - The command requires playback to be paused.\n* `NOT_PLAYING_LOCALLY` - The command requires playback on the local device.\n* `NOT_PLAYING_TRACK` - The command requires that a track is currently playing.\n* `NOT_PLAYING_CONTEXT` - The command requires that a context is currently playing.\n* `ENDLESS_CONTEXT` - The shuffle command cannot be applied on an endless context.\n* `CONTEXT_DISALLOW` - The command could not be performed on the context.\n* `ALREADY_PLAYING` - The track should not be restarted if the same track and context is already playing, and there is a resume point.\n* `RATE_LIMITED` - The user is rate limited due to too frequent track play, also known as cat-on-the-keyboard spamming.\n* `REMOTE_CONTROL_DISALLOW` - The context cannot be remote-controlled.\n* `DEVICE_NOT_CONTROLLABLE` - Not possible to remote control the device.\n* `VOLUME_CONTROL_DISALLOW` - Not possible to remote control the device's volume.\n* `NO_ACTIVE_DEVICE` - Requires an active device and the user has none.\n* `PREMIUM_REQUIRED` - The request is prohibited for non-premium users.\n* `UNKNOWN` - Certain actions are restricted because of unknown reasons.\n",
  })
  .readonly()
  .openapi('PlayerErrorReasons')

const PlayerErrorObjectSchema = z
  .object({
    message: z
      .string()
      .exactOptional()
      .openapi({ description: 'A short description of the cause of the error.\n' }),
    reason: PlayerErrorReasonsSchema,
    status: z.int().exactOptional().openapi({
      description:
        'The HTTP status code. Either `404 NOT FOUND` or `403 FORBIDDEN`.  Also returned in the response header.\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'PlayerErrorObject' })
  .readonly()
  .openapi('PlayerErrorObject')

const PlaylistObjectSchema = z
  .object({
    collaborative: z
      .boolean()
      .exactOptional()
      .openapi({ description: '`true` if the owner allows other users to modify the playlist.\n' }),
    description: z.string().nullable().exactOptional().openapi({
      description:
        'The playlist description. _Only returned for modified, verified playlists, otherwise_ `null`.\n',
    }),
    external_urls: ExternalUrlObjectSchema.exactOptional().openapi({
      description: 'Known external URLs for this playlist.\n',
    }),
    followers: FollowersObjectSchema.exactOptional().openapi({
      description: 'Information about the followers of the playlist.',
    }),
    href: z.string().exactOptional().openapi({
      description: 'A link to the Web API endpoint providing full details of the playlist.\n',
    }),
    id: z.string().exactOptional().openapi({
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
    images: z.array(ImageObjectSchema).exactOptional().openapi({
      description:
        'Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See [Working with Playlists](/documentation/web-api/concepts/playlists). _**Note**: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day._\n',
    }),
    name: z.string().exactOptional().openapi({ description: 'The name of the playlist.\n' }),
    owner: PlaylistOwnerObjectSchema.exactOptional().openapi({
      description: 'The user who owns the playlist\n',
    }),
    public: z.boolean().exactOptional().openapi({
      description:
        "The playlist's public/private status: `true` the playlist is public, `false` the playlist is private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
    }),
    snapshot_id: z.string().exactOptional().openapi({
      description:
        'The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version\n',
    }),
    tracks: PagingPlaylistTrackObjectSchema.exactOptional().openapi({
      description: 'The tracks of the playlist.\n',
    }),
    type: z.string().exactOptional().openapi({ description: 'The object type: "playlist"\n' }),
    uri: z.string().exactOptional().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the playlist.\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'PlaylistObject' })
  .readonly()
  .openapi('PlaylistObject')

const PrivateUserObjectSchema = z
  .object({
    country: z.string().exactOptional().openapi({
      description:
        "The country of the user, as set in the user's account profile. An [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
    }),
    display_name: z.string().exactOptional().openapi({
      description: "The name displayed on the user's profile. `null` if not available.\n",
    }),
    email: z.string().exactOptional().openapi({
      description:
        "The user's email address, as entered by the user when creating their account. _**Important!** This email address is unverified; there is no proof that it actually belongs to the user._ _This field is only available when the current user has granted access to the [user-read-email](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
    }),
    explicit_content: ExplicitContentSettingsObjectSchema.exactOptional().openapi({
      description:
        "The user's explicit content settings. _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n",
    }),
    external_urls: ExternalUrlObjectSchema.exactOptional().openapi({
      description: 'Known external URLs for this user.',
    }),
    followers: FollowersObjectSchema.exactOptional().openapi({
      description: 'Information about the followers of the user.',
    }),
    href: z
      .string()
      .exactOptional()
      .openapi({ description: 'A link to the Web API endpoint for this user.\n' }),
    id: z.string().exactOptional().openapi({
      description:
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for the user.\n',
    }),
    images: z
      .array(ImageObjectSchema)
      .exactOptional()
      .openapi({ description: "The user's profile image." }),
    product: z.string().exactOptional().openapi({
      description:
        'The user\'s Spotify subscription level: "premium", "free", etc. (The subscription level "open" can be considered the same as "free".) _This field is only available when the current user has granted access to the [user-read-private](/documentation/web-api/concepts/scopes/#list-of-scopes) scope._\n',
    }),
    type: z.string().exactOptional().openapi({ description: 'The object type: "user"\n' }),
    uri: z.string().exactOptional().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the user.\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'PrivateUserObject' })
  .readonly()
  .openapi('PrivateUserObject')

const PublicUserObjectSchema = z
  .object({
    display_name: z.string().nullable().exactOptional().openapi({
      description: "The name displayed on the user's profile. `null` if not available.\n",
    }),
    external_urls: ExternalUrlObjectSchema.exactOptional().openapi({
      description: 'Known public external URLs for this user.\n',
    }),
    followers: FollowersObjectSchema.exactOptional().openapi({
      description: 'Information about the followers of this user.\n',
    }),
    href: z
      .string()
      .exactOptional()
      .openapi({ description: 'A link to the Web API endpoint for this user.\n' }),
    id: z.string().exactOptional().openapi({
      description:
        'The [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
    images: z
      .array(ImageObjectSchema)
      .exactOptional()
      .openapi({ description: "The user's profile image.\n" }),
    type: z.literal('user').exactOptional().openapi({ description: 'The object type.\n' }),
    uri: z.string().exactOptional().openapi({
      description:
        'The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for this user.\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'PublicUserObject' })
  .readonly()
  .openapi('PublicUserObject')

const QueueObjectSchema = z
  .object({
    currently_playing: z
      .xor([TrackObjectSchema, EpisodeObjectSchema])
      .exactOptional()
      .openapi({
        description: 'The currently playing track or episode. Can be `null`.',
        discriminator: { propertyName: 'type' },
        'x-spotify-docs-type': 'TrackObject | EpisodeObject',
      }),
    queue: z
      .array(
        z.xor([TrackObjectSchema, EpisodeObjectSchema]).openapi({
          discriminator: { propertyName: 'type' },
          'x-spotify-docs-type': 'TrackObject | EpisodeObject',
        }),
      )
      .exactOptional()
      .openapi({ description: 'The tracks or episodes in the queue. Can be empty.' }),
  })
  .openapi({ 'x-spotify-docs-type': 'QueueObject' })
  .readonly()
  .openapi('QueueObject')

const RecommendationSeedObjectSchema = z
  .object({
    afterFilteringSize: z.int().exactOptional().openapi({
      description:
        'The number of tracks available after min\\_\\* and max\\_\\* filters have been applied.\n',
    }),
    afterRelinkingSize: z.int().exactOptional().openapi({
      description: 'The number of tracks available after relinking for regional availability.\n',
    }),
    href: z.string().exactOptional().openapi({
      description:
        'A link to the full track or artist data for this seed. For tracks this will be a link to a Track Object. For artists a link to an Artist Object. For genre seeds, this value will be `null`.\n',
    }),
    id: z.string().exactOptional().openapi({
      description:
        'The id used to select this seed. This will be the same as the string used in the `seed_artists`, `seed_tracks` or `seed_genres` parameter.\n',
    }),
    initialPoolSize: z
      .int()
      .exactOptional()
      .openapi({ description: 'The number of recommended tracks available for this seed.\n' }),
    type: z.string().exactOptional().openapi({
      description: 'The entity type of this seed. One of `artist`, `track` or `genre`.\n',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'RecommendationSeedObject' })
  .readonly()
  .openapi('RecommendationSeedObject')

const RecommendationsObjectSchema = z
  .object({
    seeds: z
      .array(RecommendationSeedObjectSchema)
      .openapi({ description: 'An array of recommendation seed objects.\n' }),
    tracks: z.array(TrackObjectSchema).openapi({
      description:
        'An array of track object (simplified) ordered according to the parameters supplied.\n',
    }),
  })
  .openapi({ required: ['seeds', 'tracks'], 'x-spotify-docs-type': 'RecommendationsObject' })
  .readonly()
  .openapi('RecommendationsObject')

const ShowObjectSchema = ShowBaseSchema.and(
  z
    .object({
      episodes: PagingSimplifiedEpisodeObjectSchema.openapi({
        description: 'The episodes of the show.\n',
      }),
    })
    .openapi({ required: ['episodes'] }),
)
  .openapi({ 'x-spotify-docs-type': 'ShowObject' })
  .readonly()
  .openapi('ShowObject')

const TuneableTrackObjectSchema = z
  .object({
    acousticness: z.float32().exactOptional().openapi({
      description:
        'A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.\n',
      'x-spotify-docs-type': 'Float',
    }),
    danceability: z.float32().exactOptional().openapi({
      description:
        'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.\n',
      'x-spotify-docs-type': 'Float',
    }),
    duration_ms: z
      .int()
      .exactOptional()
      .openapi({ description: 'The duration of the track in milliseconds.\n' }),
    energy: z.float32().exactOptional().openapi({
      description:
        'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.\n',
      'x-spotify-docs-type': 'Float',
    }),
    instrumentalness: z.float32().exactOptional().openapi({
      description:
        'Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.\n',
      'x-spotify-docs-type': 'Float',
    }),
    key: KeySchema.exactOptional(),
    liveness: z.float32().exactOptional().openapi({
      description:
        'Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.\n',
      'x-spotify-docs-type': 'Float',
    }),
    loudness: LoudnessSchema.exactOptional(),
    mode: ModeSchema.exactOptional(),
    popularity: z.float32().exactOptional().openapi({
      description:
        'The popularity of the track. The value will be between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are. _**Note**: When applying track relinking via the `market` parameter, it is expected to find relinked tracks with popularities that do not match `min_*`, `max_*`and `target_*` popularities. These relinked tracks are accurate replacements for unplayable tracks with the expected popularity scores. Original, non-relinked tracks are available via the `linked_from` attribute of the [relinked track response](/documentation/web-api/concepts/track-relinking)._\n',
      'x-spotify-docs-type': 'Float',
    }),
    speechiness: z.float32().exactOptional().openapi({
      description:
        'Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.\n',
      'x-spotify-docs-type': 'Float',
    }),
    tempo: TempoSchema.exactOptional(),
    time_signature: TimeSignatureSchema.exactOptional(),
    valence: z.float32().exactOptional().openapi({
      description:
        'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).\n',
      'x-spotify-docs-type': 'Float',
    }),
  })
  .openapi({ 'x-spotify-docs-type': 'TuneableTrackObject' })
  .readonly()
  .openapi('TuneableTrackObject')

const PathAlbumIdParamsSchema = z
  .string()
  .openapi({
    param: {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n',
        example: '4aawyAB9vmqN3uQ7FjRGTy',
        title: 'Spotify Album ID',
        type: 'string',
      },
    },
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n',
    example: '4aawyAB9vmqN3uQ7FjRGTy',
    title: 'Spotify Album ID',
  })
  .readonly()

const PathArtistIdParamsSchema = z
  .string()
  .openapi({
    param: {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
        example: '0TnOYISbd1XYRBk9myaseg',
        title: 'Spotify Artist ID',
        type: 'string',
      },
    },
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
    example: '0TnOYISbd1XYRBk9myaseg',
    title: 'Spotify Artist ID',
  })
  .readonly()

const PathAudiobookIdParamsSchema = z
  .string()
  .openapi({
    param: {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
        example: '7iHfbu1YPACw6oZPAFJtqe',
        title: 'Spotify Audiobook ID',
        type: 'string',
      },
    },
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
    example: '7iHfbu1YPACw6oZPAFJtqe',
    title: 'Spotify Audiobook ID',
  })
  .readonly()

const PathChapterIdParamsSchema = z
  .string()
  .openapi({
    param: {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the chapter.\n',
        example: '0D5wENdkdwbqlrHoaJ9g29',
        title: 'Spotify Chapter ID',
        type: 'string',
      },
    },
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the chapter.\n',
    example: '0D5wENdkdwbqlrHoaJ9g29',
    title: 'Spotify Chapter ID',
  })
  .readonly()

const PathPlaylistIdParamsSchema = z
  .string()
  .openapi({
    param: {
      in: 'path',
      name: 'playlist_id',
      required: true,
      schema: {
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        example: '3cEYpjA9oz9GiPac4AsH4n',
        title: 'Playlist ID',
        type: 'string',
      },
    },
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
    example: '3cEYpjA9oz9GiPac4AsH4n',
    title: 'Playlist ID',
  })
  .readonly()

const PathShowIdParamsSchema = z
  .string()
  .openapi({
    param: {
      in: 'path',
      name: 'id',
      required: true,
      schema: {
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
        example: '38bS44xjbVVZ3No3ByF1dJ',
        title: 'Spotify Show ID',
        type: 'string',
      },
    },
    description:
      'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
    example: '38bS44xjbVVZ3No3ByF1dJ',
    title: 'Spotify Show ID',
  })
  .readonly()

const PathUserIdParamsSchema = z
  .string()
  .openapi({
    param: {
      in: 'path',
      name: 'user_id',
      required: true,
      schema: {
        description:
          "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
        example: 'smedjan',
        title: 'User ID',
        type: 'string',
      },
    },
    description:
      "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
    example: 'smedjan',
    title: 'User ID',
  })
  .readonly()

const QueryAdditionalTypesParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: {
      in: 'query',
      name: 'additional_types',
      required: false,
      schema: {
        description:
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
        title: 'Additional Types',
        type: 'string',
      },
    },
    description:
      'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
    title: 'Additional Types',
  })
  .readonly()

const QueryAlbumIdsParamsSchema = z
  .string()
  .openapi({
    param: {
      in: 'query',
      name: 'ids',
      required: true,
      schema: {
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
        example: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',
        title: 'Spotify Album IDs',
        type: 'string',
      },
    },
    description:
      'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
    example: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',
    title: 'Spotify Album IDs',
  })
  .readonly()

const QueryAudiobookIdsParamsSchema = z
  .string()
  .openapi({
    param: {
      in: 'query',
      name: 'ids',
      required: true,
      schema: {
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
        example: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',
        title: 'Spotify Audiobook IDs',
        type: 'string',
      },
    },
    description:
      'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
    example: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',
    title: 'Spotify Audiobook IDs',
  })
  .readonly()

const QueryChapterIdsParamsSchema = z
  .string()
  .openapi({
    param: {
      in: 'query',
      name: 'ids',
      required: true,
      schema: {
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU`. Maximum: 50 IDs.\n',
        example: '0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29',
        title: 'Spotify Chapter IDs',
        type: 'string',
      },
    },
    description:
      'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU`. Maximum: 50 IDs.\n',
    example: '0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29',
    title: 'Spotify Chapter IDs',
  })
  .readonly()

const QueryIncludeGroupsParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: {
      in: 'query',
      name: 'include_groups',
      required: false,
      schema: {
        description:
          'A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>\nValid values are:<br/>- `album`<br/>- `single`<br/>- `appears_on`<br/>- `compilation`<br/>For example: `include_groups=album,single`.\n',
        example: 'single,appears_on',
        title: 'Groups to include (single, album, appears_on, compilation)',
        type: 'string',
      },
    },
    description:
      'A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>\nValid values are:<br/>- `album`<br/>- `single`<br/>- `appears_on`<br/>- `compilation`<br/>For example: `include_groups=album,single`.\n',
    example: 'single,appears_on',
    title: 'Groups to include (single, album, appears_on, compilation)',
  })
  .readonly()

const QueryLimitParamsSchema = z
  .int()
  .min(0)
  .max(50)
  .default(20)
  .exactOptional()
  .openapi({
    param: {
      in: 'query',
      name: 'limit',
      required: false,
      schema: {
        default: 20,
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        example: 10,
        maximum: 50,
        minimum: 0,
        title: 'Limit',
        type: 'integer',
      },
    },
    description: 'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
    example: 10,
    title: 'Limit',
  })
  .readonly()

const QueryMarketParamsSchema = z
  .string()
  .exactOptional()
  .openapi({
    param: {
      in: 'query',
      name: 'market',
      required: false,
      schema: {
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/se/account/overview/).\n',
        example: 'ES',
        title: 'Market',
        type: 'string',
      },
    },
    description:
      'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/se/account/overview/).\n',
    example: 'ES',
    title: 'Market',
  })
  .readonly()

const QueryOffsetParamsSchema = z
  .int()
  .default(0)
  .exactOptional()
  .openapi({
    param: {
      in: 'query',
      name: 'offset',
      required: false,
      schema: {
        default: 0,
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        example: 5,
        title: 'Offset',
        type: 'integer',
      },
    },
    description:
      'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
    example: 5,
    title: 'Offset',
  })
  .readonly()

const QueryShowIdsParamsSchema = z
  .string()
  .openapi({
    param: {
      in: 'query',
      name: 'ids',
      required: true,
      schema: {
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
        example: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ',
        title: 'Ids',
        type: 'string',
      },
    },
    description:
      'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
    example: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ',
    title: 'Ids',
  })
  .readonly()

const QueryTrackIdsParamsSchema = z
  .string()
  .openapi({
    param: {
      in: 'query',
      name: 'ids',
      required: true,
      schema: {
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
        example: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
        title: 'Spotify Track IDs',
        type: 'string',
      },
    },
    description:
      'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
    example: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
    title: 'Spotify Track IDs',
  })
  .readonly()

const Oauth_2_0SecurityScheme = {
  description: 'Spotify supports OAuth 2.0 for authenticating all API requests.',
  flows: {
    authorizationCode: {
      authorizationUrl: 'https://accounts.spotify.com/authorize',
      scopes: {
        'app-remote-control': 'Communicate with the Spotify app on your device.\n',
        'playlist-modify-private': 'Manage your private playlists.\n',
        'playlist-modify-public': 'Manage your public playlists.\n',
        'playlist-read-collaborative': 'Access your collaborative playlists.\n',
        'playlist-read-private': 'Access your private playlists.\n',
        streaming: 'Play content and control playback on your other devices.\n',
        'ugc-image-upload': 'Upload images to Spotify on your behalf.\n',
        'user-follow-modify': 'Manage your saved content.\n',
        'user-follow-read': 'Access your followers and who you are following.\n',
        'user-library-modify': 'Manage your saved content.\n',
        'user-library-read': 'Access your saved content.\n',
        'user-modify-playback-state':
          'Control playback on your Spotify clients and Spotify Connect devices.\n',
        'user-read-currently-playing': 'Read your currently playing content.\n',
        'user-read-email': 'Get your real email address.\n',
        'user-read-playback-position': 'Read your position in content you have played.\n',
        'user-read-playback-state':
          'Read your currently playing content and Spotify Connect devices information.\n',
        'user-read-private': 'Access your subscription details.\n',
        'user-read-recently-played': 'Access your recently played items.\n',
        'user-top-read': 'Read your top artists and content.\n',
      },
      tokenUrl: 'https://accounts.spotify.com/api/token',
    },
  },
  type: 'oauth2',
} as const

const ArrayOfBooleansResponse = {
  description: 'Array of booleans',
  content: {
    'application/json': { schema: z.array(z.boolean()).openapi({ example: [false, true] }) },
  },
} as const

const ArrayOfImagesResponse = {
  description: 'A set of images',
  content: { 'application/json': { schema: z.array(ImageObjectSchema) } },
} as const

const BadRequestResponse = {
  description: 'The request contains malformed data in path, query parameters, or body.\n',
  content: {
    'application/json': {
      schema: z.object({ error: ErrorObjectSchema }).openapi({ required: ['error'] }),
    },
  },
} as const

const CursorPagedArtistsResponse = {
  description: 'A paged set of artists',
  content: {
    'application/json': {
      schema: z
        .object({ artists: CursorPagingSimplifiedArtistObjectSchema })
        .openapi({ required: ['artists'] }),
    },
  },
} as const

const CursorPagedPlayHistoryResponse = {
  description: 'A paged set of tracks',
  content: { 'application/json': { schema: CursorPagingPlayHistoryObjectSchema } },
} as const

const ForbiddenResponse = {
  description:
    "Bad OAuth request (wrong consumer key, bad nonce, expired\ntimestamp...). Unfortunately, re-authenticating the user won't help here.\n",
  content: {
    'application/json': {
      schema: z.object({ error: ErrorObjectSchema }).openapi({ required: ['error'] }),
    },
  },
} as const

const ManyAlbumsResponse = {
  description: 'A set of albums',
  content: {
    'application/json': {
      schema: z.object({ albums: z.array(AlbumObjectSchema) }).openapi({ required: ['albums'] }),
    },
  },
} as const

const ManyArtistsResponse = {
  description: 'A set of artists',
  content: {
    'application/json': {
      schema: z.object({ artists: z.array(ArtistObjectSchema) }).openapi({ required: ['artists'] }),
    },
  },
} as const

const ManyAudioFeaturesResponse = {
  description: 'A set of audio features',
  content: {
    'application/json': {
      schema: z
        .object({ audio_features: z.array(AudioFeaturesObjectSchema) })
        .openapi({ required: ['audio_features'] }),
    },
  },
} as const

const ManyAudiobooksResponse = {
  description: 'A set of audiobooks',
  content: {
    'application/json': {
      schema: z
        .object({ audiobooks: z.array(AudiobookObjectSchema) })
        .openapi({ required: ['audiobooks'] }),
    },
  },
} as const

const ManyChaptersResponse = {
  description: 'A set of chapters',
  content: {
    'application/json': {
      schema: z
        .object({ chapters: z.array(ChapterObjectSchema) })
        .openapi({ required: ['chapters'] }),
    },
  },
} as const

const ManyDevicesResponse = {
  description: 'A set of devices',
  content: {
    'application/json': {
      schema: z.object({ devices: z.array(DeviceObjectSchema) }).openapi({ required: ['devices'] }),
    },
  },
} as const

const ManyEpisodesResponse = {
  description: 'A set of episodes',
  content: {
    'application/json': {
      schema: z
        .object({ episodes: z.array(EpisodeObjectSchema) })
        .openapi({ required: ['episodes'] }),
    },
  },
} as const

const ManyGenresResponse = {
  description: 'A set of genres',
  content: {
    'application/json': {
      schema: z
        .object({ genres: z.array(z.string()).openapi({ example: ['alternative', 'samba'] }) })
        .openapi({ required: ['genres'] }),
    },
  },
} as const

const ManySimplifiedShowsResponse = {
  description: 'A set of shows',
  content: {
    'application/json': {
      schema: z
        .object({ shows: z.array(SimplifiedShowObjectSchema) })
        .openapi({ required: ['shows'] }),
    },
  },
} as const

const ManyTracksResponse = {
  description: 'A set of tracks',
  content: {
    'application/json': {
      schema: z.object({ tracks: z.array(TrackObjectSchema) }).openapi({ required: ['tracks'] }),
    },
  },
} as const

const NotFoundResponse = {
  description: 'The requested resource cannot be found.\n',
  content: {
    'application/json': {
      schema: z.object({ error: ErrorObjectSchema }).openapi({ required: ['error'] }),
    },
  },
} as const

const OneAlbumResponse = {
  description: 'An album',
  content: { 'application/json': { schema: AlbumObjectSchema } },
} as const

const OneArtistResponse = {
  description: 'An artist',
  content: { 'application/json': { schema: ArtistObjectSchema } },
} as const

const OneAudioAnalysisResponse = {
  description: 'Audio analysis for one track',
  content: { 'application/json': { schema: AudioAnalysisObjectSchema } },
} as const

const OneAudioFeaturesResponse = {
  description: 'Audio features for one track',
  content: { 'application/json': { schema: AudioFeaturesObjectSchema } },
} as const

const OneAudiobookResponse = {
  description: 'An Audiobook',
  content: { 'application/json': { schema: AudiobookObjectSchema } },
} as const

const OneCategoryResponse = {
  description: 'A category',
  content: { 'application/json': { schema: CategoryObjectSchema } },
} as const

const OneChapterResponse = {
  description: 'A Chapter',
  content: { 'application/json': { schema: ChapterObjectSchema } },
} as const

const OneCurrentlyPlayingResponse = {
  description: 'Information about playback',
  content: { 'application/json': { schema: CurrentlyPlayingContextObjectSchema } },
} as const

const OneCurrentlyPlayingTrackResponse = {
  description: 'Information about the currently playing track',
  content: { 'application/json': { schema: CurrentlyPlayingContextObjectSchema } },
} as const

const OneEpisodeResponse = {
  description: 'An episode',
  content: { 'application/json': { schema: EpisodeObjectSchema } },
} as const

const OnePlaylistResponse = {
  description: 'A playlist',
  content: { 'application/json': { schema: PlaylistObjectSchema } },
} as const

const OnePrivateUserResponse = {
  description: 'A user',
  content: { 'application/json': { schema: PrivateUserObjectSchema } },
} as const

const OnePublicUserResponse = {
  description: 'A user',
  content: { 'application/json': { schema: PublicUserObjectSchema } },
} as const

const OneRecommendationsResponse = {
  description: 'A set of recommendations',
  content: { 'application/json': { schema: RecommendationsObjectSchema } },
} as const

const OneShowResponse = {
  description: 'A show',
  content: { 'application/json': { schema: ShowObjectSchema } },
} as const

const OneTrackResponse = {
  description: 'A track',
  content: { 'application/json': { schema: TrackObjectSchema } },
} as const

const PagedAlbumsResponse = {
  description: 'A paged set of albums',
  content: {
    'application/json': {
      schema: z
        .object({ albums: PagingSimplifiedAlbumObjectSchema })
        .openapi({ required: ['albums'] }),
    },
  },
} as const

const PagedCategoriesResponse = {
  description: 'A paged set of categories',
  content: {
    'application/json': {
      schema: z.object({ categories: PagingObjectSchema }).openapi({ required: ['categories'] }),
    },
  },
} as const

const PagedFeaturedPlaylistsResponse = {
  description: 'A paged set of playlists',
  content: { 'application/json': { schema: PagingFeaturedPlaylistObjectSchema } },
} as const

const PagedPlaylistsResponse = {
  description: 'A paged set of playlists',
  content: { 'application/json': { schema: PagingPlaylistObjectSchema } },
} as const

const PagingArtistOrTrackObjectResponse = {
  description: 'Pages of artists or tracks',
  content: {
    'application/json': {
      schema: PagingObjectSchema.and(
        z.object({
          items: z
            .array(
              z
                .xor([ArtistObjectSchema, TrackObjectSchema])
                .openapi({ discriminator: { propertyName: 'type' } }),
            )
            .exactOptional(),
        }),
      ),
    },
  },
} as const

const PagingPlaylistTrackObjectResponse = {
  description: 'Pages of tracks',
  content: { 'application/json': { schema: PagingPlaylistTrackObjectSchema } },
} as const

const PagingSavedAlbumObjectResponse = {
  description: 'Pages of albums',
  content: { 'application/json': { schema: PagingSavedAlbumObjectSchema } },
} as const

const PagingSavedEpisodeObjectResponse = {
  description: 'Pages of episodes',
  content: { 'application/json': { schema: PagingSavedEpisodeObjectSchema } },
} as const

const PagingSavedShowObjectResponse = {
  description: 'Pages of shows',
  content: { 'application/json': { schema: PagingSavedShowObjectSchema } },
} as const

const PagingSavedTrackObjectResponse = {
  description: 'Pages of tracks',
  content: { 'application/json': { schema: PagingSavedTrackObjectSchema } },
} as const

const PagingSimplifiedAlbumObjectResponse = {
  description: 'Pages of albums',
  content: { 'application/json': { schema: PagingSimplifiedAlbumObjectSchema } },
} as const

const PagingSimplifiedArtistObjectResponse = {
  description: 'Pages of artists',
  content: { 'application/json': { schema: PagingSimplifiedArtistObjectSchema } },
} as const

const PagingSimplifiedAudiobookObjectResponse = {
  description: 'Pages of audiobooks',
  content: { 'application/json': { schema: PagingSimplifiedAudiobookObjectSchema } },
} as const

const PagingSimplifiedChapterObjectResponse = {
  description: 'Pages of chapters',
  content: { 'application/json': { schema: PagingSimplifiedChapterObjectSchema } },
} as const

const PagingSimplifiedEpisodeObjectResponse = {
  description: 'Pages of episodes',
  content: { 'application/json': { schema: PagingSimplifiedEpisodeObjectSchema } },
} as const

const PagingSimplifiedShowObjectResponse = {
  description: 'Pages of shows',
  content: { 'application/json': { schema: PagingSimplifiedShowObjectSchema } },
} as const

const PagingSimplifiedTrackObjectResponse = {
  description: 'Pages of tracks',
  content: { 'application/json': { schema: PagingSimplifiedTrackObjectSchema } },
} as const

const PlaylistSnapshotIdResponse = {
  description: 'A snapshot ID for the playlist',
  content: {
    'application/json': {
      schema: z.object({ snapshot_id: z.string().exactOptional().openapi({ example: 'abc' }) }),
    },
  },
} as const

const QueueResponse = {
  description: 'Information about the queue',
  content: { 'application/json': { schema: QueueObjectSchema } },
} as const

const SearchItemsResponse = {
  description: 'Search response',
  content: {
    'application/json': {
      schema: z.object({
        albums: PagingSimplifiedAlbumObjectSchema.exactOptional(),
        artists: PagingArtistObjectSchema.exactOptional(),
        audiobooks: PagingSimplifiedAudiobookObjectSchema.exactOptional(),
        episodes: PagingSimplifiedEpisodeObjectSchema.exactOptional(),
        playlists: PagingPlaylistObjectSchema.exactOptional(),
        shows: PagingSimplifiedShowObjectSchema.exactOptional(),
        tracks: PagingTrackObjectSchema.exactOptional(),
      }),
    },
  },
} as const

const TooManyRequestsResponse = {
  description: 'The app has exceeded its rate limits.\n',
  content: {
    'application/json': {
      schema: z.object({ error: ErrorObjectSchema }).openapi({ required: ['error'] }),
    },
  },
} as const

const UnauthorizedResponse = {
  description:
    'Bad or expired token. This can happen if the user revoked a token or\nthe access token has expired. You should re-authenticate the user.\n',
  content: {
    'application/json': {
      schema: z.object({ error: ErrorObjectSchema }).openapi({ required: ['error'] }),
    },
  },
} as const

export const getAlbumsRoute = createRoute({
  method: 'get',
  path: '/albums',
  tags: ['Albums'],
  summary: 'Get Several Albums\n',
  description:
    'Get Spotify catalog information for multiple albums identified by their Spotify IDs.\n',
  operationId: 'get-multiple-albums',
  request: { query: z.object({ ids: QueryAlbumIdsParamsSchema, market: QueryMarketParamsSchema }) },
  responses: {
    200: ManyAlbumsResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getAlbumsIdRoute = createRoute({
  method: 'get',
  path: '/albums/{id}',
  tags: ['Albums'],
  summary: 'Get Album\n',
  description: 'Get Spotify catalog information for a single album.\n',
  operationId: 'get-an-album',
  request: {
    params: z.object({ id: PathAlbumIdParamsSchema }),
    query: z.object({ market: QueryMarketParamsSchema }),
  },
  responses: {
    200: OneAlbumResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getAlbumsIdTracksRoute = createRoute({
  method: 'get',
  path: '/albums/{id}/tracks',
  tags: ['Albums', 'Tracks'],
  summary: 'Get Album Tracks\n',
  description:
    'Get Spotify catalog information about an album’s tracks.\nOptional parameters can be used to limit the number of tracks returned.\n',
  operationId: 'get-an-albums-tracks',
  request: {
    params: z.object({ id: PathAlbumIdParamsSchema }),
    query: z.object({
      market: QueryMarketParamsSchema,
      limit: QueryLimitParamsSchema,
      offset: QueryOffsetParamsSchema,
    }),
  },
  responses: {
    200: PagingSimplifiedTrackObjectResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getArtistsRoute = createRoute({
  method: 'get',
  path: '/artists',
  tags: ['Artists'],
  summary: 'Get Several Artists\n',
  description: 'Get Spotify catalog information for several artists based on their Spotify IDs.\n',
  operationId: 'get-multiple-artists',
  request: {
    query: z.object({
      ids: z.string().openapi({
        param: {
          in: 'query',
          name: 'ids',
          required: true,
          schema: {
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the artists. Maximum: 50 IDs.\n',
            example: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
            title: 'Spotify Artist IDs',
            type: 'string',
          },
        },
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the artists. Maximum: 50 IDs.\n',
        example: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
        title: 'Spotify Artist IDs',
      }),
    }),
  },
  responses: {
    200: ManyArtistsResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getArtistsIdRoute = createRoute({
  method: 'get',
  path: '/artists/{id}',
  tags: ['Artists'],
  summary: 'Get Artist\n',
  description:
    'Get Spotify catalog information for a single artist identified by their unique Spotify ID.\n',
  operationId: 'get-an-artist',
  request: { params: z.object({ id: PathArtistIdParamsSchema }) },
  responses: {
    200: OneArtistResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getArtistsIdAlbumsRoute = createRoute({
  method: 'get',
  path: '/artists/{id}/albums',
  tags: ['Artists', 'Albums'],
  summary: "Get Artist's Albums\n",
  description: "Get Spotify catalog information about an artist's albums.\n",
  operationId: 'get-an-artists-albums',
  request: {
    params: z.object({ id: PathArtistIdParamsSchema }),
    query: z.object({
      include_groups: QueryIncludeGroupsParamsSchema,
      market: QueryMarketParamsSchema,
      limit: QueryLimitParamsSchema,
      offset: QueryOffsetParamsSchema,
    }),
  },
  responses: {
    200: PagingSimplifiedAlbumObjectResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getArtistsIdRelatedArtistsRoute = createRoute({
  method: 'get',
  path: '/artists/{id}/related-artists',
  tags: ['Artists'],
  summary: "Get Artist's Related Artists\n",
  description:
    "Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's [listening history](http://news.spotify.com/se/2010/02/03/related-artists/).\n",
  operationId: 'get-an-artists-related-artists',
  request: { params: z.object({ id: PathArtistIdParamsSchema }) },
  responses: {
    200: ManyArtistsResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getArtistsIdTopTracksRoute = createRoute({
  method: 'get',
  path: '/artists/{id}/top-tracks',
  tags: ['Artists', 'Tracks'],
  summary: "Get Artist's Top Tracks\n",
  description: "Get Spotify catalog information about an artist's top tracks by country.\n",
  operationId: 'get-an-artists-top-tracks',
  request: {
    params: z.object({ id: PathArtistIdParamsSchema }),
    query: z.object({ market: QueryMarketParamsSchema }),
  },
  responses: {
    200: ManyTracksResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getAudioAnalysisIdRoute = createRoute({
  method: 'get',
  path: '/audio-analysis/{id}',
  tags: ['Tracks'],
  summary: "Get Track's Audio Analysis\n",
  description:
    'Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.\n',
  operationId: 'get-audio-analysis',
  request: {
    params: z.object({
      id: z.string().openapi({
        param: {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
            example: '11dFghVXANMlKmJXsNCbNl',
            title: 'Spotify Track ID',
            type: 'string',
          },
        },
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
        example: '11dFghVXANMlKmJXsNCbNl',
        title: 'Spotify Track ID',
      }),
    }),
  },
  responses: {
    200: OneAudioAnalysisResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getAudioFeaturesRoute = createRoute({
  method: 'get',
  path: '/audio-features',
  tags: ['Tracks'],
  summary: "Get Tracks' Audio Features\n",
  description: 'Get audio features for multiple tracks based on their Spotify IDs.\n',
  operationId: 'get-several-audio-features',
  request: {
    query: z.object({
      ids: z.string().openapi({
        param: {
          in: 'query',
          name: 'ids',
          required: true,
          schema: {
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
            example: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
            title: 'Spotify Track IDs',
            type: 'string',
          },
        },
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
        example: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
        title: 'Spotify Track IDs',
      }),
    }),
  },
  responses: {
    200: ManyAudioFeaturesResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getAudioFeaturesIdRoute = createRoute({
  method: 'get',
  path: '/audio-features/{id}',
  tags: ['Tracks'],
  summary: "Get Track's Audio Features\n",
  description:
    'Get audio feature information for a single track identified by its unique\nSpotify ID.\n',
  operationId: 'get-audio-features',
  request: {
    params: z.object({
      id: z.string().openapi({
        param: {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
            example: '11dFghVXANMlKmJXsNCbNl',
            title: 'Spotify Track ID',
            type: 'string',
          },
        },
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
        example: '11dFghVXANMlKmJXsNCbNl',
        title: 'Spotify Track ID',
      }),
    }),
  },
  responses: {
    200: OneAudioFeaturesResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getAudiobooksRoute = createRoute({
  method: 'get',
  path: '/audiobooks',
  tags: ['Audiobooks'],
  summary: 'Get Several Audiobooks\n',
  description:
    'Get Spotify catalog information for several audiobooks identified by their Spotify IDs.<br />\n**Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**\n',
  operationId: 'get-multiple-audiobooks',
  request: {
    query: z.object({ ids: QueryAudiobookIdsParamsSchema, market: QueryMarketParamsSchema }),
  },
  responses: {
    200: ManyAudiobooksResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getAudiobooksIdRoute = createRoute({
  method: 'get',
  path: '/audiobooks/{id}',
  tags: ['Audiobooks'],
  summary: 'Get an Audiobook\n',
  description:
    'Get Spotify catalog information for a single audiobook.<br />\n**Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**\n',
  operationId: 'get-an-audiobook',
  request: {
    params: z.object({ id: PathAudiobookIdParamsSchema }),
    query: z.object({ market: QueryMarketParamsSchema }),
  },
  responses: {
    200: OneAudiobookResponse,
    400: BadRequestResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    404: NotFoundResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getAudiobooksIdChaptersRoute = createRoute({
  method: 'get',
  path: '/audiobooks/{id}/chapters',
  tags: ['Audiobooks', 'Chapters'],
  summary: 'Get Audiobook Chapters\n',
  description:
    "Get Spotify catalog information about an audiobook's chapters.<br />\n**Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**\n",
  operationId: 'get-audiobook-chapters',
  request: {
    params: z.object({ id: PathAudiobookIdParamsSchema }),
    query: z.object({
      market: QueryMarketParamsSchema,
      limit: QueryLimitParamsSchema,
      offset: QueryOffsetParamsSchema,
    }),
  },
  responses: {
    200: PagingSimplifiedChapterObjectResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getBrowseCategoriesRoute = createRoute({
  method: 'get',
  path: '/browse/categories',
  tags: ['Categories'],
  summary: 'Get Several Browse Categories\n',
  description:
    'Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).\n',
  operationId: 'get-categories',
  request: {
    query: z.object({
      country: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'country',
            required: false,
            schema: {
              description:
                'A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter if you want to narrow the list of returned categories to those relevant to a particular country. If omitted, the returned items will be globally relevant.\n',
              example: 'SE',
              title: 'Country',
              type: 'string',
            },
          },
          description:
            'A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter if you want to narrow the list of returned categories to those relevant to a particular country. If omitted, the returned items will be globally relevant.\n',
          example: 'SE',
          title: 'Country',
        }),
      locale: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'locale',
            required: false,
            schema: {
              description:
                'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning "Spanish (Mexico)". Provide this parameter if you want the category metadata returned in a particular language. <br/>\n_**Note**: if `locale` is not supplied, or if the specified language is not available, all strings will be returned in the Spotify default language (American English). The `locale` parameter, combined with the `country` parameter, may give odd results if not carefully matched. For example `country=SE&locale=de_DE` will return a list of categories relevant to Sweden but as German language strings._\n',
              example: 'sv_SE',
              title: 'Locale',
              type: 'string',
            },
          },
          description:
            'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning "Spanish (Mexico)". Provide this parameter if you want the category metadata returned in a particular language. <br/>\n_**Note**: if `locale` is not supplied, or if the specified language is not available, all strings will be returned in the Spotify default language (American English). The `locale` parameter, combined with the `country` parameter, may give odd results if not carefully matched. For example `country=SE&locale=de_DE` will return a list of categories relevant to Sweden but as German language strings._\n',
          example: 'sv_SE',
          title: 'Locale',
        }),
      limit: QueryLimitParamsSchema,
      offset: QueryOffsetParamsSchema,
    }),
  },
  responses: {
    200: PagedCategoriesResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getBrowseCategoriesCategoryIdRoute = createRoute({
  method: 'get',
  path: '/browse/categories/{category_id}',
  tags: ['Categories'],
  summary: 'Get Single Browse Category\n',
  description:
    'Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).\n',
  operationId: 'get-a-category',
  request: {
    params: z.object({
      category_id: z.string().openapi({
        param: {
          in: 'path',
          name: 'category_id',
          required: true,
          schema: {
            description:
              'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
            example: 'dinner',
            title: 'Category ID',
            type: 'string',
          },
        },
        description:
          'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
        example: 'dinner',
        title: 'Category ID',
      }),
    }),
    query: z.object({
      country: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'country',
            required: false,
            schema: {
              description:
                'A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter to ensure that the category exists for a particular country.\n',
              example: 'SE',
              title: 'Country',
              type: 'string',
            },
          },
          description:
            'A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter to ensure that the category exists for a particular country.\n',
          example: 'SE',
          title: 'Country',
        }),
      locale: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'locale',
            required: false,
            schema: {
              description:
                'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
              example: 'sv_SE',
              title: 'Locale',
              type: 'string',
            },
          },
          description:
            'The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._\n',
          example: 'sv_SE',
          title: 'Locale',
        }),
    }),
  },
  responses: {
    200: OneCategoryResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getBrowseCategoriesCategoryIdPlaylistsRoute = createRoute({
  method: 'get',
  path: '/browse/categories/{category_id}/playlists',
  tags: ['Playlists', 'Categories'],
  summary: "Get Category's Playlists\n",
  description: 'Get a list of Spotify playlists tagged with a particular category.\n',
  operationId: 'get-a-categories-playlists',
  request: {
    params: z.object({
      category_id: z.string().openapi({
        param: {
          in: 'path',
          name: 'category_id',
          required: true,
          schema: {
            description:
              'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
            example: 'dinner',
            title: 'Category ID',
            type: 'string',
          },
        },
        description:
          'The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.\n',
        example: 'dinner',
        title: 'Category ID',
      }),
    }),
    query: z.object({
      country: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'country',
            required: false,
            schema: {
              description:
                'A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter to ensure that the category exists for a particular country.\n',
              example: 'SE',
              title: 'Country',
              type: 'string',
            },
          },
          description:
            'A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter to ensure that the category exists for a particular country.\n',
          example: 'SE',
          title: 'Country',
        }),
      limit: QueryLimitParamsSchema,
      offset: QueryOffsetParamsSchema,
    }),
  },
  responses: {
    200: PagedFeaturedPlaylistsResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getBrowseFeaturedPlaylistsRoute = createRoute({
  method: 'get',
  path: '/browse/featured-playlists',
  tags: ['Playlists'],
  summary: 'Get Featured Playlists\n',
  description:
    "Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).\n",
  operationId: 'get-featured-playlists',
  request: {
    query: z.object({
      country: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'country',
            required: false,
            schema: {
              description:
                'A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter if you want the list of returned items to be relevant to a particular country. If omitted, the returned items will be relevant to all countries.\n',
              example: 'SE',
              title: 'Country',
              type: 'string',
            },
          },
          description:
            'A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter if you want the list of returned items to be relevant to a particular country. If omitted, the returned items will be relevant to all countries.\n',
          example: 'SE',
          title: 'Country',
        }),
      locale: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'locale',
            required: false,
            schema: {
              description:
                'The desired language, consisting of a lowercase [ISO 639-1 language code](http://en.wikipedia.org/wiki/ISO_639-1) and an uppercase [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning "Spanish (Mexico)". Provide this parameter if you want the results returned in a particular language (where available). <br/>\n_**Note**: if `locale` is not supplied, or if the specified language is not available, all strings will be returned in the Spotify default language (American English). The `locale` parameter, combined with the `country` parameter, may give odd results if not carefully matched. For example `country=SE&locale=de_DE` will return a list of categories relevant to Sweden but as German language strings._\n',
              example: 'sv_SE',
              title: 'Locale',
              type: 'string',
            },
          },
          description:
            'The desired language, consisting of a lowercase [ISO 639-1 language code](http://en.wikipedia.org/wiki/ISO_639-1) and an uppercase [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning "Spanish (Mexico)". Provide this parameter if you want the results returned in a particular language (where available). <br/>\n_**Note**: if `locale` is not supplied, or if the specified language is not available, all strings will be returned in the Spotify default language (American English). The `locale` parameter, combined with the `country` parameter, may give odd results if not carefully matched. For example `country=SE&locale=de_DE` will return a list of categories relevant to Sweden but as German language strings._\n',
          example: 'sv_SE',
          title: 'Locale',
        }),
      timestamp: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'timestamp',
            required: false,
            schema: {
              description:
                'A timestamp in [ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601): `yyyy-MM-ddTHH:mm:ss`. Use this parameter to specify the user\'s local time to get results tailored for that specific date and time in the day. If not provided, the response defaults to the current UTC time. Example: "2014-10-23T09:00:00" for a user whose local time is 9AM. If there were no featured playlists (or there is no data) at the specified time, the response will revert to the current UTC time.\n',
              example: '2014-10-23T09:00:00',
              title: 'Timestamp',
              type: 'string',
            },
          },
          description:
            'A timestamp in [ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601): `yyyy-MM-ddTHH:mm:ss`. Use this parameter to specify the user\'s local time to get results tailored for that specific date and time in the day. If not provided, the response defaults to the current UTC time. Example: "2014-10-23T09:00:00" for a user whose local time is 9AM. If there were no featured playlists (or there is no data) at the specified time, the response will revert to the current UTC time.\n',
          example: '2014-10-23T09:00:00',
          title: 'Timestamp',
        }),
      limit: QueryLimitParamsSchema,
      offset: QueryOffsetParamsSchema,
    }),
  },
  responses: {
    200: PagedFeaturedPlaylistsResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getBrowseNewReleasesRoute = createRoute({
  method: 'get',
  path: '/browse/new-releases',
  tags: ['Albums'],
  summary: 'Get New Releases\n',
  description:
    'Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).\n',
  operationId: 'get-new-releases',
  request: {
    query: z.object({
      country: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'country',
            required: false,
            schema: {
              description:
                'A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter if you want the list of returned items to be relevant to a particular country. If omitted, the returned items will be relevant to all countries.\n',
              example: 'SE',
              title: 'Country',
              type: 'string',
            },
          },
          description:
            'A country: an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). Provide this parameter if you want the list of returned items to be relevant to a particular country. If omitted, the returned items will be relevant to all countries.\n',
          example: 'SE',
          title: 'Country',
        }),
      limit: QueryLimitParamsSchema,
      offset: QueryOffsetParamsSchema,
    }),
  },
  responses: {
    200: PagedAlbumsResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getChaptersRoute = createRoute({
  method: 'get',
  path: '/chapters',
  tags: ['Chapters'],
  summary: 'Get Several Chapters\n',
  description:
    'Get Spotify catalog information for several chapters identified by their Spotify IDs.<br />\n**Note: Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.**\n',
  operationId: 'get-several-chapters',
  request: {
    query: z.object({ ids: QueryChapterIdsParamsSchema, market: QueryMarketParamsSchema }),
  },
  responses: {
    200: ManyChaptersResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getChaptersIdRoute = createRoute({
  method: 'get',
  path: '/chapters/{id}',
  tags: ['Chapters'],
  summary: 'Get a Chapter\n',
  description:
    'Get Spotify catalog information for a single chapter.<br />\n**Note: Chapters are only available for the US, UK, Ireland, New Zealand and Australia markets.**\n',
  operationId: 'get-a-chapter',
  request: {
    params: z.object({ id: PathChapterIdParamsSchema }),
    query: z.object({ market: QueryMarketParamsSchema }),
  },
  responses: {
    200: OneChapterResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getEpisodesRoute = createRoute({
  method: 'get',
  path: '/episodes',
  tags: ['Episodes'],
  summary: 'Get Several Episodes\n',
  description: 'Get Spotify catalog information for several episodes based on their Spotify IDs.\n',
  operationId: 'get-multiple-episodes',
  request: {
    query: z.object({
      ids: z.string().openapi({
        param: {
          in: 'query',
          name: 'ids',
          required: true,
          schema: {
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
            example: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf',
            title: 'Ids',
            type: 'string',
          },
        },
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
        example: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf',
        title: 'Ids',
      }),
      market: QueryMarketParamsSchema,
    }),
  },
  responses: {
    200: ManyEpisodesResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-read-playback-position'] }],
} as const)

export const getEpisodesIdRoute = createRoute({
  method: 'get',
  path: '/episodes/{id}',
  tags: ['Episodes'],
  summary: 'Get Episode\n',
  description:
    'Get Spotify catalog information for a single episode identified by its\nunique Spotify ID.\n',
  operationId: 'get-an-episode',
  request: {
    params: z.object({
      id: z.string().openapi({
        param: {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.',
            example: '512ojhOuo1ktJprKbVcKyQ',
            title: 'Get an Episode',
            type: 'string',
          },
        },
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.',
        example: '512ojhOuo1ktJprKbVcKyQ',
        title: 'Get an Episode',
      }),
    }),
    query: z.object({ market: QueryMarketParamsSchema }),
  },
  responses: {
    200: OneEpisodeResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-read-playback-position'] }],
} as const)

export const getMarketsRoute = createRoute({
  method: 'get',
  path: '/markets',
  tags: ['Markets'],
  summary: 'Get Available Markets\n',
  description: 'Get the list of markets where Spotify is available.\n',
  operationId: 'get-available-markets',
  responses: {
    200: {
      description: 'A markets object with an array of country codes',
      content: {
        'application/json': {
          schema: z.object({
            markets: z
              .array(z.string())
              .exactOptional()
              .openapi({ example: ['CA', 'BR', 'IT'] }),
          }),
        },
      },
    },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getMeRoute = createRoute({
  method: 'get',
  path: '/me',
  tags: ['Users'],
  summary: "Get Current User's Profile\n",
  description:
    "Get detailed profile information about the current user (including the\ncurrent user's username).\n",
  operationId: 'get-current-users-profile',
  responses: {
    200: OnePrivateUserResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-read-private', 'user-read-email'] }],
} as const)

export const getMeAlbumsRoute = createRoute({
  method: 'get',
  path: '/me/albums',
  tags: ['Albums', 'Library'],
  summary: "Get User's Saved Albums\n",
  description:
    "Get a list of the albums saved in the current Spotify user's 'Your Music' library.\n",
  operationId: 'get-users-saved-albums',
  request: {
    query: z.object({
      limit: QueryLimitParamsSchema,
      offset: QueryOffsetParamsSchema,
      market: QueryMarketParamsSchema,
    }),
  },
  responses: {
    200: PagingSavedAlbumObjectResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-read'] }],
} as const)

export const putMeAlbumsRoute = createRoute({
  method: 'put',
  path: '/me/albums',
  tags: ['Albums', 'Library'],
  summary: 'Save Albums for Current User\n',
  description: "Save one or more albums to the current user's 'Your Music' library.\n",
  operationId: 'save-albums-user',
  request: {
    query: z.object({ ids: QueryAlbumIdsParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z.looseObject({
            ids: z.array(z.string()).exactOptional().openapi({
              description:
                'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: { description: 'The album is saved' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-modify'] }],
} as const)

export const deleteMeAlbumsRoute = createRoute({
  method: 'delete',
  path: '/me/albums',
  tags: ['Albums', 'Library'],
  summary: "Remove Users' Saved Albums\n",
  description: "Remove one or more albums from the current user's 'Your Music' library.\n",
  operationId: 'remove-albums-user',
  request: {
    query: z.object({ ids: QueryAlbumIdsParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z.looseObject({
            ids: z.array(z.string()).exactOptional().openapi({
              description:
                'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: { description: 'Album(s) have been removed from the library' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-modify'] }],
} as const)

export const getMeAlbumsContainsRoute = createRoute({
  method: 'get',
  path: '/me/albums/contains',
  tags: ['Albums', 'Library'],
  summary: "Check User's Saved Albums\n",
  description:
    "Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.\n",
  operationId: 'check-users-saved-albums',
  request: { query: z.object({ ids: QueryAlbumIdsParamsSchema }) },
  responses: {
    200: ArrayOfBooleansResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-read'] }],
} as const)

export const getMeAudiobooksRoute = createRoute({
  method: 'get',
  path: '/me/audiobooks',
  tags: ['Audiobooks', 'Library'],
  summary: "Get User's Saved Audiobooks\n",
  description:
    "Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.\n",
  operationId: 'get-users-saved-audiobooks',
  request: { query: z.object({ limit: QueryLimitParamsSchema, offset: QueryOffsetParamsSchema }) },
  responses: {
    200: PagingSimplifiedAudiobookObjectResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-read'] }],
} as const)

export const putMeAudiobooksRoute = createRoute({
  method: 'put',
  path: '/me/audiobooks',
  tags: ['Audiobooks', 'Library'],
  summary: 'Save Audiobooks for Current User\n',
  description: "Save one or more audiobooks to the current Spotify user's library.\n",
  operationId: 'save-audiobooks-user',
  request: { query: z.object({ ids: QueryAudiobookIdsParamsSchema }) },
  responses: {
    200: { description: 'Audiobook(s) are saved to the library' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-modify'] }],
} as const)

export const deleteMeAudiobooksRoute = createRoute({
  method: 'delete',
  path: '/me/audiobooks',
  tags: ['Audiobooks', 'Library'],
  summary: "Remove User's Saved Audiobooks\n",
  description: "Remove one or more audiobooks from the Spotify user's library.\n",
  operationId: 'remove-audiobooks-user',
  request: { query: z.object({ ids: QueryAudiobookIdsParamsSchema }) },
  responses: {
    200: { description: 'Audiobook(s) have been removed from the library' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-modify'] }],
} as const)

export const getMeAudiobooksContainsRoute = createRoute({
  method: 'get',
  path: '/me/audiobooks/contains',
  tags: ['Audiobooks', 'Library'],
  summary: "Check User's Saved Audiobooks\n",
  description:
    "Check if one or more audiobooks are already saved in the current Spotify user's library.\n",
  operationId: 'check-users-saved-audiobooks',
  request: { query: z.object({ ids: QueryAudiobookIdsParamsSchema }) },
  responses: {
    200: ArrayOfBooleansResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-read'] }],
} as const)

export const getMeEpisodesRoute = createRoute({
  method: 'get',
  path: '/me/episodes',
  tags: ['Episodes', 'Library'],
  summary: "Get User's Saved Episodes\n",
  description:
    "Get a list of the episodes saved in the current Spotify user's library.<br/>\nThis API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).\n",
  operationId: 'get-users-saved-episodes',
  request: {
    query: z.object({
      market: QueryMarketParamsSchema,
      limit: QueryLimitParamsSchema,
      offset: QueryOffsetParamsSchema,
    }),
  },
  responses: {
    200: PagingSavedEpisodeObjectResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-read', 'user-read-playback-position'] }],
} as const)

export const putMeEpisodesRoute = createRoute({
  method: 'put',
  path: '/me/episodes',
  tags: ['Episodes', 'Library'],
  summary: 'Save Episodes for Current User\n',
  description:
    "Save one or more episodes to the current user's library.<br/>\nThis API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).\n",
  operationId: 'save-episodes-user',
  request: {
    query: z.object({
      ids: z.string().openapi({
        param: {
          in: 'query',
          name: 'ids',
          required: true,
          schema: {
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 50 IDs.\n',
            example: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf',
            title: 'Spotify Episodes IDs',
            type: 'string',
          },
        },
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 50 IDs.\n',
        example: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf',
        title: 'Spotify Episodes IDs',
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .looseObject({
              ids: z.array(z.string()).exactOptional().openapi({
                description:
                  'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
              }),
            })
            .openapi({ required: ['uris'] }),
        },
      },
    },
  },
  responses: {
    200: { description: 'Episode saved' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-modify'] }],
} as const)

export const deleteMeEpisodesRoute = createRoute({
  method: 'delete',
  path: '/me/episodes',
  tags: ['Episodes', 'Library'],
  summary: "Remove User's Saved Episodes\n",
  description:
    "Remove one or more episodes from the current user's library.<br/>\nThis API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer).\n",
  operationId: 'remove-episodes-user',
  request: {
    query: z.object({ ids: QueryTrackIdsParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z.looseObject({
            ids: z.array(z.string()).exactOptional().openapi({
              description:
                'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). <br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: { description: 'Episode removed' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-modify'] }],
} as const)

export const getMeEpisodesContainsRoute = createRoute({
  method: 'get',
  path: '/me/episodes/contains',
  tags: ['Episodes', 'Library'],
  summary: "Check User's Saved Episodes\n",
  description:
    "Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.<br/>\nThis API endpoint is in __beta__ and could change without warning. Please share any feedback that you have, or issues that you discover, in our [developer community forum](https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer)..\n",
  operationId: 'check-users-saved-episodes',
  request: {
    query: z.object({
      ids: z.string().openapi({
        param: {
          in: 'query',
          name: 'ids',
          required: true,
          schema: {
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
            example: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf',
            title: 'Spotify Episode IDs',
            type: 'string',
          },
        },
        description:
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.\n',
        example: '77o6BIVlYM3msb4MMIL1jH,0Q86acNRm6V9GYx55SXKwf',
        title: 'Spotify Episode IDs',
      }),
    }),
  },
  responses: {
    200: ArrayOfBooleansResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-read'] }],
} as const)

export const getMeFollowingRoute = createRoute({
  method: 'get',
  path: '/me/following',
  tags: ['Users', 'Library', 'Artists'],
  summary: 'Get Followed Artists\n',
  description: "Get the current user's followed artists.\n",
  operationId: 'get-followed',
  request: {
    query: z.object({
      type: z.literal('artist').openapi({
        param: {
          in: 'query',
          name: 'type',
          required: true,
          schema: {
            description: 'The ID type: currently only `artist` is supported.\n',
            enum: ['artist'],
            example: 'artist',
            title: 'Item Type',
            type: 'string',
          },
        },
        description: 'The ID type: currently only `artist` is supported.\n',
        example: 'artist',
        title: 'Item Type',
      }),
      after: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'after',
            required: false,
            schema: {
              description: 'The last artist ID retrieved from the previous request.\n',
              example: '0I2XqVXqHScXjHhk6AYYRe',
              title: 'After',
              type: 'string',
            },
          },
          description: 'The last artist ID retrieved from the previous request.\n',
          example: '0I2XqVXqHScXjHhk6AYYRe',
          title: 'After',
        }),
      limit: z
        .int()
        .min(0)
        .max(50)
        .default(20)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'limit',
            required: false,
            schema: {
              default: 20,
              description:
                'The maximum number of items to return. Default: 20\\. Minimum: 1\\. Maximum: 50\\.\n',
              example: 10,
              maximum: 50,
              minimum: 0,
              title: 'Limit',
              type: 'integer',
            },
          },
          description:
            'The maximum number of items to return. Default: 20\\. Minimum: 1\\. Maximum: 50\\.\n',
          example: 10,
          title: 'Limit',
        }),
    }),
  },
  responses: {
    200: CursorPagedArtistsResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-follow-read'] }],
} as const)

export const putMeFollowingRoute = createRoute({
  method: 'put',
  path: '/me/following',
  tags: ['Users', 'Artists', 'Library'],
  summary: 'Follow Artists or Users\n',
  description:
    'Add the current user as a follower of one or more artists or other Spotify users.\n',
  operationId: 'follow-artists-users',
  request: {
    query: z.object({
      type: z.enum(['artist', 'user']).openapi({
        param: {
          in: 'query',
          name: 'type',
          required: true,
          schema: {
            description: 'The ID type.\n',
            enum: ['artist', 'user'],
            example: 'artist',
            title: 'Item Type',
            type: 'string',
          },
        },
        description: 'The ID type.\n',
        example: 'artist',
        title: 'Item Type',
      }),
      ids: z.string().openapi({
        param: {
          in: 'query',
          name: 'ids',
          required: true,
          schema: {
            description:
              'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nA maximum of 50 IDs can be sent in one request.\n',
            example: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
            title: 'Spotify IDs',
            type: 'string',
          },
        },
        description:
          'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nA maximum of 50 IDs can be sent in one request.\n',
        example: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
        title: 'Spotify IDs',
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .looseObject({
              ids: z.array(z.string()).openapi({
                description:
                  'A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids).\nFor example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
              }),
            })
            .openapi({ required: ['ids'] }),
        },
      },
    },
  },
  responses: {
    204: { description: 'Artist or user followed' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-follow-modify'] }],
} as const)

export const deleteMeFollowingRoute = createRoute({
  method: 'delete',
  path: '/me/following',
  tags: ['Users', 'Artists', 'Library'],
  summary: 'Unfollow Artists or Users\n',
  description:
    'Remove the current user as a follower of one or more artists or other Spotify users.\n',
  operationId: 'unfollow-artists-users',
  request: {
    query: z.object({
      type: z.enum(['artist', 'user']).openapi({
        param: {
          in: 'query',
          name: 'type',
          required: true,
          schema: {
            description: 'The ID type: either `artist` or `user`.\n',
            enum: ['artist', 'user'],
            example: 'artist',
            title: 'Item Type',
            type: 'string',
          },
        },
        description: 'The ID type: either `artist` or `user`.\n',
        example: 'artist',
        title: 'Item Type',
      }),
      ids: z.string().openapi({
        param: {
          in: 'query',
          name: 'ids',
          required: true,
          schema: {
            description:
              'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
            example: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
            title: 'Spotify IDs',
            type: 'string',
          },
        },
        description:
          'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
        example: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
        title: 'Spotify IDs',
      }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.looseObject({
            ids: z.array(z.string()).exactOptional().openapi({
              description:
                'A JSON array of the artist or user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `{ids:["74ASZWbe4lXaubB36ztrGX", "08td7MxkoHQkXnWAYD8d6Q"]}`. A maximum of 50 IDs can be sent in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: { description: 'Artist or user unfollowed' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-follow-modify'] }],
} as const)

export const getMeFollowingContainsRoute = createRoute({
  method: 'get',
  path: '/me/following/contains',
  tags: ['Users', 'Artists', 'Library'],
  summary: 'Check If User Follows Artists or Users\n',
  description:
    'Check to see if the current user is following one or more artists or other Spotify users.\n',
  operationId: 'check-current-user-follows',
  request: {
    query: z.object({
      type: z.enum(['artist', 'user']).openapi({
        param: {
          in: 'query',
          name: 'type',
          required: true,
          schema: {
            description: 'The ID type: either `artist` or `user`.\n',
            enum: ['artist', 'user'],
            example: 'artist',
            title: 'Item Type',
            type: 'string',
          },
        },
        description: 'The ID type: either `artist` or `user`.\n',
        example: 'artist',
        title: 'Item Type',
      }),
      ids: z.string().openapi({
        param: {
          in: 'query',
          name: 'ids',
          required: true,
          schema: {
            description:
              'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) to check. For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
            example: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
            title: 'Spotify IDs',
            type: 'string',
          },
        },
        description:
          'A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) to check. For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.\n',
        example: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
        title: 'Spotify IDs',
      }),
    }),
  },
  responses: {
    200: ArrayOfBooleansResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-follow-read'] }],
} as const)

export const getMePlayerRoute = createRoute({
  method: 'get',
  path: '/me/player',
  tags: ['Player'],
  summary: 'Get Playback State\n',
  description:
    'Get information about the user’s current playback state, including track or episode, progress, and active device.\n',
  operationId: 'get-information-about-the-users-current-playback',
  request: {
    query: z.object({
      market: QueryMarketParamsSchema,
      additional_types: QueryAdditionalTypesParamsSchema,
    }),
  },
  responses: {
    200: OneCurrentlyPlayingResponse,
    204: { description: 'Playback not available or active' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-read-playback-state'] }],
} as const)

export const putMePlayerRoute = createRoute({
  method: 'put',
  path: '/me/player',
  tags: ['Player'],
  summary: 'Transfer Playback\n',
  description: 'Transfer playback to a new device and determine if it should start playing.\n',
  operationId: 'transfer-a-users-playback',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .looseObject({
              device_ids: z.array(z.string()).openapi({
                description:
                  'A JSON array containing the ID of the device on which playback should be started/transferred.<br/>For example:`{device_ids:["74ASZWbe4lXaubB36ztrGX"]}`<br/>_**Note**: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return `400 Bad Request`_\n',
              }),
              play: z.boolean().exactOptional().openapi({
                description:
                  '**true**: ensure playback happens on new device.<br/>**false** or not provided: keep the current playback state.\n',
              }),
            })
            .openapi({
              example: { device_ids: ['74ASZWbe4lXaubB36ztrGX'] },
              required: ['device_ids'],
            }),
        },
      },
    },
  },
  responses: {
    204: { description: 'Playback transferred' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-modify-playback-state'] }],
} as const)

export const getMePlayerCurrentlyPlayingRoute = createRoute({
  method: 'get',
  path: '/me/player/currently-playing',
  tags: ['Player'],
  summary: 'Get Currently Playing Track\n',
  description: "Get the object currently being played on the user's Spotify account.\n",
  operationId: 'get-the-users-currently-playing-track',
  request: {
    query: z.object({
      market: QueryMarketParamsSchema,
      additional_types: QueryAdditionalTypesParamsSchema,
    }),
  },
  responses: {
    200: OneCurrentlyPlayingTrackResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-read-currently-playing'] }],
} as const)

export const getMePlayerDevicesRoute = createRoute({
  method: 'get',
  path: '/me/player/devices',
  tags: ['Player'],
  summary: 'Get Available Devices\n',
  description: 'Get information about a user’s available devices.\n',
  operationId: 'get-a-users-available-devices',
  responses: {
    200: ManyDevicesResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-read-playback-state'] }],
} as const)

export const postMePlayerNextRoute = createRoute({
  method: 'post',
  path: '/me/player/next',
  tags: ['Player'],
  summary: 'Skip To Next\n',
  description: 'Skips to next track in the user’s queue.\n',
  operationId: 'skip-users-playback-to-next-track',
  request: {
    query: z.object({
      device_id: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'device_id',
            required: false,
            schema: {
              description:
                "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
              example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
              title: 'Device ID',
              type: 'string',
            },
          },
          description:
            "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
          example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
          title: 'Device ID',
        }),
    }),
  },
  responses: {
    204: { description: 'Command sent' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-modify-playback-state'] }],
} as const)

export const putMePlayerPauseRoute = createRoute({
  method: 'put',
  path: '/me/player/pause',
  tags: ['Player'],
  summary: 'Pause Playback\n',
  description: "Pause playback on the user's account.\n",
  operationId: 'pause-a-users-playback',
  request: {
    query: z.object({
      device_id: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'device_id',
            required: false,
            schema: {
              description:
                "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
              example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
              title: 'Device ID',
              type: 'string',
            },
          },
          description:
            "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
          example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
          title: 'Device ID',
        }),
    }),
  },
  responses: {
    204: { description: 'Playback paused' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-modify-playback-state'] }],
} as const)

export const putMePlayerPlayRoute = createRoute({
  method: 'put',
  path: '/me/player/play',
  tags: ['Player'],
  summary: 'Start/Resume Playback\n',
  description: "Start a new context or resume current playback on the user's active device.\n",
  operationId: 'start-a-users-playback',
  request: {
    query: z.object({
      device_id: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'device_id',
            required: false,
            schema: {
              description:
                "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
              example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
              title: 'Device ID',
              type: 'string',
            },
          },
          description:
            "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.",
          example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
          title: 'Device ID',
        }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .looseObject({
              context_uri: z.string().exactOptional().openapi({
                description:
                  'Optional. Spotify URI of the context to play.\nValid contexts are albums, artists & playlists.\n`{context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}`\n',
              }),
              offset: z.looseObject({}).exactOptional().openapi({
                description:
                  'Optional. Indicates from where in the context playback should start. Only available when context_uri corresponds to an album or playlist object\n"position" is zero based and can’t be negative. Example: `"offset": {"position": 5}`\n"uri" is a string representing the uri of the item to start at. Example: `"offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}`\n',
              }),
              position_ms: z.int().exactOptional().openapi({ description: 'integer' }),
              uris: z.array(z.string()).exactOptional().openapi({
                description:
                  'Optional. A JSON array of the Spotify track URIs to play.\nFor example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}`\n',
              }),
            })
            .openapi({
              example: {
                context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
                offset: { position: 5 },
                position_ms: 0,
              },
            }),
        },
      },
    },
  },
  responses: {
    204: { description: 'Playback started' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-modify-playback-state'] }],
} as const)

export const postMePlayerPreviousRoute = createRoute({
  method: 'post',
  path: '/me/player/previous',
  tags: ['Player'],
  summary: 'Skip To Previous\n',
  description: 'Skips to previous track in the user’s queue.\n',
  operationId: 'skip-users-playback-to-previous-track',
  request: {
    query: z.object({
      device_id: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'device_id',
            required: false,
            schema: {
              description:
                "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
              example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
              title: 'Device ID',
              type: 'string',
            },
          },
          description:
            "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
          example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
          title: 'Device ID',
        }),
    }),
  },
  responses: {
    204: { description: 'Command sent' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-modify-playback-state'] }],
} as const)

export const getMePlayerQueueRoute = createRoute({
  method: 'get',
  path: '/me/player/queue',
  tags: ['Player'],
  summary: "Get the User's Queue\n",
  description: "Get the list of objects that make up the user's queue.\n",
  operationId: 'get-queue',
  responses: {
    200: QueueResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-read-playback-state'] }],
} as const)

export const postMePlayerQueueRoute = createRoute({
  method: 'post',
  path: '/me/player/queue',
  tags: ['Player'],
  summary: 'Add Item to Playback Queue\n',
  description: "Add an item to the end of the user's current playback queue.\n",
  operationId: 'add-to-queue',
  request: {
    query: z.object({
      uri: z.string().openapi({
        param: {
          in: 'query',
          name: 'uri',
          required: true,
          schema: {
            description:
              'The uri of the item to add to the queue. Must be a track or an episode uri.\n',
            example: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
            title: 'Spotify URI',
            type: 'string',
          },
        },
        description:
          'The uri of the item to add to the queue. Must be a track or an episode uri.\n',
        example: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
        title: 'Spotify URI',
      }),
      device_id: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'device_id',
            required: false,
            schema: {
              description:
                "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
              example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
              title: 'Device ID',
              type: 'string',
            },
          },
          description:
            "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
          example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
          title: 'Device ID',
        }),
    }),
  },
  responses: {
    204: { description: 'Command received' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-modify-playback-state'] }],
} as const)

export const getMePlayerRecentlyPlayedRoute = createRoute({
  method: 'get',
  path: '/me/player/recently-played',
  tags: ['Player'],
  summary: 'Get Recently Played Tracks\n',
  description:
    "Get tracks from the current user's recently played tracks.\n_**Note**: Currently doesn't support podcast episodes._\n",
  operationId: 'get-recently-played',
  request: {
    query: z.object({
      limit: z
        .int()
        .min(0)
        .max(50)
        .default(20)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'limit',
            required: false,
            schema: {
              default: 20,
              description:
                'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
              example: 10,
              maximum: 50,
              minimum: 0,
              title: 'Limit',
              type: 'integer',
            },
          },
          description:
            'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
          example: 10,
          title: 'Limit',
        }),
      after: z
        .int()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'after',
            required: false,
            schema: {
              description:
                'A Unix timestamp in milliseconds. Returns all items\nafter (but not including) this cursor position. If `after` is specified, `before`\nmust not be specified.\n',
              example: 1484811043508,
              title: 'After',
              type: 'integer',
            },
          },
          description:
            'A Unix timestamp in milliseconds. Returns all items\nafter (but not including) this cursor position. If `after` is specified, `before`\nmust not be specified.\n',
          example: 1484811043508,
          title: 'After',
        }),
      before: z
        .int()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'before',
            required: false,
            schema: {
              description:
                'A Unix timestamp in milliseconds. Returns all items\nbefore (but not including) this cursor position. If `before` is specified,\n`after` must not be specified.\n',
              title: 'Before',
              type: 'integer',
            },
          },
          description:
            'A Unix timestamp in milliseconds. Returns all items\nbefore (but not including) this cursor position. If `before` is specified,\n`after` must not be specified.\n',
          title: 'Before',
        }),
    }),
  },
  responses: {
    200: CursorPagedPlayHistoryResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-read-recently-played'] }],
} as const)

export const putMePlayerRepeatRoute = createRoute({
  method: 'put',
  path: '/me/player/repeat',
  tags: ['Player'],
  summary: 'Set Repeat Mode\n',
  description:
    "Set the repeat mode for the user's playback. Options are repeat-track,\nrepeat-context, and off.\n",
  operationId: 'set-repeat-mode-on-users-playback',
  request: {
    query: z.object({
      state: z.string().openapi({
        param: {
          in: 'query',
          name: 'state',
          required: true,
          schema: {
            description:
              '**track**, **context** or **off**.<br/>\n**track** will repeat the current track.<br/>\n**context** will repeat the current context.<br/>\n**off** will turn repeat off.\n',
            example: 'context',
            title: 'State',
            type: 'string',
          },
        },
        description:
          '**track**, **context** or **off**.<br/>\n**track** will repeat the current track.<br/>\n**context** will repeat the current context.<br/>\n**off** will turn repeat off.\n',
        example: 'context',
        title: 'State',
      }),
      device_id: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'device_id',
            required: false,
            schema: {
              description:
                "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
              example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
              title: 'Device ID',
              type: 'string',
            },
          },
          description:
            "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
          example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
          title: 'Device ID',
        }),
    }),
  },
  responses: {
    204: { description: 'Command sent' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-modify-playback-state'] }],
} as const)

export const putMePlayerSeekRoute = createRoute({
  method: 'put',
  path: '/me/player/seek',
  tags: ['Player'],
  summary: 'Seek To Position\n',
  description: 'Seeks to the given position in the user’s currently playing track.\n',
  operationId: 'seek-to-position-in-currently-playing-track',
  request: {
    query: z.object({
      position_ms: z.int().openapi({
        param: {
          in: 'query',
          name: 'position_ms',
          required: true,
          schema: {
            description:
              'The position in milliseconds to seek to. Must be a\npositive number. Passing in a position that is greater than the length of\nthe track will cause the player to start playing the next song.\n',
            example: 25000,
            title: 'Position (ms)',
            type: 'integer',
          },
        },
        description:
          'The position in milliseconds to seek to. Must be a\npositive number. Passing in a position that is greater than the length of\nthe track will cause the player to start playing the next song.\n',
        example: 25000,
        title: 'Position (ms)',
      }),
      device_id: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'device_id',
            required: false,
            schema: {
              description:
                "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
              example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
              title: 'Device ID',
              type: 'string',
            },
          },
          description:
            "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
          example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
          title: 'Device ID',
        }),
    }),
  },
  responses: {
    204: { description: 'Command sent' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-modify-playback-state'] }],
} as const)

export const putMePlayerShuffleRoute = createRoute({
  method: 'put',
  path: '/me/player/shuffle',
  tags: ['Player'],
  summary: 'Toggle Playback Shuffle\n',
  description: 'Toggle shuffle on or off for user’s playback.\n',
  operationId: 'toggle-shuffle-for-users-playback',
  request: {
    query: z.object({
      state: z.stringbool().openapi({
        param: {
          in: 'query',
          name: 'state',
          required: true,
          schema: {
            description:
              "**true** : Shuffle user's playback.<br/>\n**false** : Do not shuffle user's playback.\n",
            example: true,
            title: 'State',
            type: 'boolean',
          },
        },
        description:
          "**true** : Shuffle user's playback.<br/>\n**false** : Do not shuffle user's playback.\n",
        example: true,
        title: 'State',
      }),
      device_id: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'device_id',
            required: false,
            schema: {
              description:
                "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
              example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
              title: 'Device ID',
              type: 'string',
            },
          },
          description:
            "The id of the device this command is targeting. If\nnot supplied, the user's currently active device is the target.\n",
          example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
          title: 'Device ID',
        }),
    }),
  },
  responses: {
    204: { description: 'Command sent' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-modify-playback-state'] }],
} as const)

export const putMePlayerVolumeRoute = createRoute({
  method: 'put',
  path: '/me/player/volume',
  tags: ['Player'],
  summary: 'Set Playback Volume\n',
  description: 'Set the volume for the user’s current playback device.\n',
  operationId: 'set-volume-for-users-playback',
  request: {
    query: z.object({
      volume_percent: z.int().openapi({
        param: {
          in: 'query',
          name: 'volume_percent',
          required: true,
          schema: {
            description: 'The volume to set. Must be a value from 0 to 100 inclusive.\n',
            example: 50,
            title: 'Volume %',
            type: 'integer',
          },
        },
        description: 'The volume to set. Must be a value from 0 to 100 inclusive.\n',
        example: 50,
        title: 'Volume %',
      }),
      device_id: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'device_id',
            required: false,
            schema: {
              description:
                "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
              example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
              title: 'Device ID',
              type: 'string',
            },
          },
          description:
            "The id of the device this command is targeting. If not supplied, the user's currently active device is the target.\n",
          example: '0d1841b0976bae2a3a310dd74c0f3df354899bc8',
          title: 'Device ID',
        }),
    }),
  },
  responses: {
    204: { description: 'Command sent' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-modify-playback-state'] }],
} as const)

export const getMePlaylistsRoute = createRoute({
  method: 'get',
  path: '/me/playlists',
  tags: ['Playlists', 'Library'],
  summary: "Get Current User's Playlists\n",
  description: 'Get a list of the playlists owned or followed by the current Spotify\nuser.\n',
  operationId: 'get-a-list-of-current-users-playlists',
  request: {
    query: z.object({
      limit: QueryLimitParamsSchema,
      offset: z
        .int()
        .default(0)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'offset',
            required: false,
            schema: {
              default: 0,
              description:
                "'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.'\n",
              example: 5,
              title: 'Offset',
              type: 'integer',
            },
          },
          description:
            "'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.'\n",
          example: 5,
          title: 'Offset',
        }),
    }),
  },
  responses: {
    200: PagedPlaylistsResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['playlist-read-private'] }],
} as const)

export const getMeShowsRoute = createRoute({
  method: 'get',
  path: '/me/shows',
  tags: ['Shows', 'Library'],
  summary: "Get User's Saved Shows\n",
  description:
    "Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.\n",
  operationId: 'get-users-saved-shows',
  request: { query: z.object({ limit: QueryLimitParamsSchema, offset: QueryOffsetParamsSchema }) },
  responses: {
    200: PagingSavedShowObjectResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-read'] }],
} as const)

export const putMeShowsRoute = createRoute({
  method: 'put',
  path: '/me/shows',
  tags: ['Shows', 'Library'],
  summary: 'Save Shows for Current User\n',
  description: "Save one or more shows to current Spotify user's library.\n",
  operationId: 'save-shows-user',
  request: { query: z.object({ ids: QueryShowIdsParamsSchema }) },
  responses: {
    200: { description: 'Show saved' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-modify'] }],
} as const)

export const deleteMeShowsRoute = createRoute({
  method: 'delete',
  path: '/me/shows',
  tags: ['Shows', 'Library'],
  summary: "Remove User's Saved Shows\n",
  description: "Delete one or more shows from current Spotify user's library.\n",
  operationId: 'remove-shows-user',
  request: { query: z.object({ ids: QueryShowIdsParamsSchema, market: QueryMarketParamsSchema }) },
  responses: {
    200: { description: 'Show removed' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-modify'] }],
} as const)

export const getMeShowsContainsRoute = createRoute({
  method: 'get',
  path: '/me/shows/contains',
  tags: ['Shows', 'Library'],
  summary: "Check User's Saved Shows\n",
  description:
    "Check if one or more shows is already saved in the current Spotify user's library.\n",
  operationId: 'check-users-saved-shows',
  request: { query: z.object({ ids: QueryShowIdsParamsSchema }) },
  responses: {
    200: ArrayOfBooleansResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-read'] }],
} as const)

export const getMeTopTypeRoute = createRoute({
  method: 'get',
  path: '/me/top/{type}',
  tags: ['Users', 'Tracks', 'Library'],
  summary: "Get User's Top Items\n",
  description: "Get the current user's top artists or tracks based on calculated affinity.\n",
  operationId: 'get-users-top-artists-and-tracks',
  request: {
    params: z.object({
      type: z.enum(['artists', 'tracks']).openapi({
        param: {
          in: 'path',
          name: 'type',
          required: true,
          schema: {
            description: 'The type of entity to return. Valid values: `artists` or `tracks`\n',
            enum: ['artists', 'tracks'],
            title: 'Type',
            type: 'string',
          },
        },
        description: 'The type of entity to return. Valid values: `artists` or `tracks`\n',
        title: 'Type',
      }),
    }),
    query: z.object({
      time_range: z
        .string()
        .default('medium_term')
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'time_range',
            required: false,
            schema: {
              default: 'medium_term',
              description:
                'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from several years of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
              example: 'medium_term',
              title: 'Time Range',
              type: 'string',
            },
          },
          description:
            'Over what time frame the affinities are computed. Valid values: `long_term` (calculated from several years of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`\n',
          example: 'medium_term',
          title: 'Time Range',
        }),
      limit: QueryLimitParamsSchema,
      offset: QueryOffsetParamsSchema,
    }),
  },
  responses: {
    200: PagingArtistOrTrackObjectResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-top-read'] }],
} as const)

export const getMeTracksRoute = createRoute({
  method: 'get',
  path: '/me/tracks',
  tags: ['Tracks', 'Library'],
  summary: "Get User's Saved Tracks\n",
  description:
    "Get a list of the songs saved in the current Spotify user's 'Your Music' library.\n",
  operationId: 'get-users-saved-tracks',
  request: {
    query: z.object({
      market: QueryMarketParamsSchema,
      limit: QueryLimitParamsSchema,
      offset: QueryOffsetParamsSchema,
    }),
  },
  responses: {
    200: PagingSavedTrackObjectResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-read'] }],
} as const)

export const putMeTracksRoute = createRoute({
  method: 'put',
  path: '/me/tracks',
  tags: ['Tracks', 'Library'],
  summary: 'Save Tracks for Current User\n',
  description: "Save one or more tracks to the current user's 'Your Music' library.\n",
  operationId: 'save-tracks-user',
  request: {
    query: z.object({ ids: QueryTrackIdsParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .looseObject({
              ids: z.array(z.string()).exactOptional().openapi({
                description:
                  'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
              }),
            })
            .openapi({ required: ['uris'] }),
        },
      },
    },
  },
  responses: {
    200: { description: 'Track saved' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-modify'] }],
} as const)

export const deleteMeTracksRoute = createRoute({
  method: 'delete',
  path: '/me/tracks',
  tags: ['Tracks', 'Library'],
  summary: "Remove User's Saved Tracks\n",
  description: "Remove one or more tracks from the current user's 'Your Music' library.\n",
  operationId: 'remove-tracks-user',
  request: {
    query: z.object({ ids: QueryTrackIdsParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z.looseObject({
            ids: z.array(z.string()).exactOptional().openapi({
              description:
                'A JSON array of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]`<br/>A maximum of 50 items can be specified in one request. _**Note**: if the `ids` parameter is present in the query string, any IDs listed here in the body will be ignored._\n',
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: { description: 'Track removed' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-modify'] }],
} as const)

export const getMeTracksContainsRoute = createRoute({
  method: 'get',
  path: '/me/tracks/contains',
  tags: ['Tracks', 'Library'],
  summary: "Check User's Saved Tracks\n",
  description:
    "Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.\n",
  operationId: 'check-users-saved-tracks',
  request: { query: z.object({ ids: QueryTrackIdsParamsSchema }) },
  responses: {
    200: ArrayOfBooleansResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-library-read'] }],
} as const)

export const getPlaylistsPlaylistIdRoute = createRoute({
  method: 'get',
  path: '/playlists/{playlist_id}',
  tags: ['Playlists'],
  summary: 'Get Playlist\n',
  description: 'Get a playlist owned by a Spotify user.\n',
  operationId: 'get-playlist',
  request: {
    params: z.object({ playlist_id: PathPlaylistIdParamsSchema }),
    query: z.object({
      market: QueryMarketParamsSchema,
      fields: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'fields',
            required: false,
            schema: {
              description:
                "Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the playlist''s description and URI: `fields=description,uri`. A dot\nseparator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`.\nUse multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`.\nFields can be excluded by prefixing them with an exclamation mark, for example:\n`fields=tracks.items(track(name,href,album(!name,href)))`\n",
              example: 'items(added_by.id,track(name,href,album(name,href)))',
              title: 'Fields',
              type: 'string',
            },
          },
          description:
            "Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the playlist''s description and URI: `fields=description,uri`. A dot\nseparator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`.\nUse multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`.\nFields can be excluded by prefixing them with an exclamation mark, for example:\n`fields=tracks.items(track(name,href,album(!name,href)))`\n",
          example: 'items(added_by.id,track(name,href,album(name,href)))',
          title: 'Fields',
        }),
      additional_types: QueryAdditionalTypesParamsSchema,
    }),
  },
  responses: {
    200: OnePlaylistResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const putPlaylistsPlaylistIdRoute = createRoute({
  method: 'put',
  path: '/playlists/{playlist_id}',
  tags: ['Playlists', 'Library'],
  summary: 'Change Playlist Details\n',
  description:
    "Change a playlist's name and public/private state. (The user must, of\ncourse, own the playlist.)\n",
  operationId: 'change-playlist-details',
  request: {
    params: z.object({ playlist_id: PathPlaylistIdParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .looseObject({
              collaborative: z.boolean().exactOptional().openapi({
                description:
                  'If `true`, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. <br/>\n_**Note**: You can only set `collaborative` to `true` on non-public playlists._\n',
              }),
              description: z.string().exactOptional().openapi({
                description:
                  'Value for playlist description as displayed in Spotify Clients and in the Web API.\n',
              }),
              name: z.string().exactOptional().openapi({
                description:
                  'The new name for the playlist, for example `"My New Playlist Title"`\n',
              }),
              public: z.boolean().exactOptional().openapi({
                description:
                  'If `true` the playlist will be public, if `false` it will be private.\n',
              }),
            })
            .openapi({
              example: {
                description: 'Updated playlist description',
                name: 'Updated Playlist Name',
                public: false,
              },
            }),
        },
      },
    },
  },
  responses: {
    200: { description: 'Playlist updated' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
} as const)

export const putPlaylistsPlaylistIdFollowersRoute = createRoute({
  method: 'put',
  path: '/playlists/{playlist_id}/followers',
  tags: ['Users', 'Playlists'],
  summary: 'Follow Playlist\n',
  description: 'Add the current user as a follower of a playlist.\n',
  operationId: 'follow-playlist',
  request: {
    params: z.object({ playlist_id: PathPlaylistIdParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .looseObject({
              public: z.boolean().exactOptional().openapi({
                description:
                  "Defaults to `true`. If `true` the playlist will be included in user's public playlists, if `false` it will remain private.\n",
              }),
            })
            .openapi({ example: { public: false } }),
        },
      },
    },
  },
  responses: {
    200: { description: 'Playlist followed' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
} as const)

export const deletePlaylistsPlaylistIdFollowersRoute = createRoute({
  method: 'delete',
  path: '/playlists/{playlist_id}/followers',
  tags: ['Users', 'Playlists'],
  summary: 'Unfollow Playlist\n',
  description: 'Remove the current user as a follower of a playlist.\n',
  operationId: 'unfollow-playlist',
  request: { params: z.object({ playlist_id: PathPlaylistIdParamsSchema }) },
  responses: {
    200: { description: 'Playlist unfollowed' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
} as const)

export const getPlaylistsPlaylistIdFollowersContainsRoute = createRoute({
  method: 'get',
  path: '/playlists/{playlist_id}/followers/contains',
  tags: ['Users', 'Playlists'],
  summary: 'Check if Users Follow Playlist\n',
  description: 'Check to see if one or more Spotify users are following a specified playlist.\n',
  operationId: 'check-if-user-follows-playlist',
  request: {
    params: z.object({ playlist_id: PathPlaylistIdParamsSchema }),
    query: z.object({
      ids: z.string().openapi({
        param: {
          in: 'query',
          name: 'ids',
          required: true,
          schema: {
            description:
              'A comma-separated list of [Spotify User IDs](/documentation/web-api/concepts/spotify-uris-ids) ; the ids of the users that you want to check to see if they follow the playlist. Maximum: 5 ids.\n',
            example: 'jmperezperez,thelinmichael,wizzler',
            title: 'Spotify user IDs',
            type: 'string',
          },
        },
        description:
          'A comma-separated list of [Spotify User IDs](/documentation/web-api/concepts/spotify-uris-ids) ; the ids of the users that you want to check to see if they follow the playlist. Maximum: 5 ids.\n',
        example: 'jmperezperez,thelinmichael,wizzler',
        title: 'Spotify user IDs',
      }),
    }),
  },
  responses: {
    200: ArrayOfBooleansResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getPlaylistsPlaylistIdImagesRoute = createRoute({
  method: 'get',
  path: '/playlists/{playlist_id}/images',
  tags: ['Playlists'],
  summary: 'Get Playlist Cover Image\n',
  description: 'Get the current image associated with a specific playlist.\n',
  operationId: 'get-playlist-cover',
  request: { params: z.object({ playlist_id: PathPlaylistIdParamsSchema }) },
  responses: {
    200: ArrayOfImagesResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const putPlaylistsPlaylistIdImagesRoute = createRoute({
  method: 'put',
  path: '/playlists/{playlist_id}/images',
  tags: ['Playlists'],
  summary: 'Add Custom Playlist Cover Image\n',
  description: 'Replace the image used to represent a specific playlist.\n',
  operationId: 'upload-custom-playlist-cover',
  request: {
    params: z.object({ playlist_id: PathPlaylistIdParamsSchema }),
    body: {
      content: {
        'image/jpeg': {
          schema: z.string().openapi({
            description: 'Base64 encoded JPEG image data, maximum payload size is 256 KB.',
            example:
              '/9j/2wCEABoZGSccJz4lJT5CLy8vQkc9Ozs9R0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0cBHCcnMyYzPSYmPUc9Mj1HR0dEREdHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR0dHR//dAAQAAf/uAA5BZG9iZQBkwAAAAAH/wAARCAABAAEDACIAAREBAhEB/8QASwABAQAAAAAAAAAAAAAAAAAAAAYBAQAAAAAAAAAAAAAAAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAARAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwAAARECEQA/AJgAH//Z',
          }),
        },
      },
    },
  },
  responses: {
    202: { description: 'Image uploaded' },
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [
    { oauth_2_0: ['ugc-image-upload', 'playlist-modify-public', 'playlist-modify-private'] },
  ],
} as const)

export const getPlaylistsPlaylistIdTracksRoute = createRoute({
  method: 'get',
  path: '/playlists/{playlist_id}/tracks',
  tags: ['Playlists', 'Tracks'],
  summary: 'Get Playlist Items\n',
  description: 'Get full details of the items of a playlist owned by a Spotify user.\n',
  operationId: 'get-playlists-tracks',
  request: {
    params: z.object({ playlist_id: PathPlaylistIdParamsSchema }),
    query: z.object({
      market: QueryMarketParamsSchema,
      fields: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'fields',
            required: false,
            schema: {
              description:
                'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
              example: 'items(added_by.id,track(name,href,album(name,href)))',
              title: 'Fields',
              type: 'string',
            },
          },
          description:
            'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
          example: 'items(added_by.id,track(name,href,album(name,href)))',
          title: 'Fields',
        }),
      limit: QueryLimitParamsSchema,
      offset: QueryOffsetParamsSchema,
      additional_types: QueryAdditionalTypesParamsSchema,
    }),
  },
  responses: {
    200: PagingPlaylistTrackObjectResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['playlist-read-private'] }],
} as const)

export const putPlaylistsPlaylistIdTracksRoute = createRoute({
  method: 'put',
  path: '/playlists/{playlist_id}/tracks',
  tags: ['Playlists', 'Tracks'],
  summary: 'Update Playlist Items\n',
  description:
    "Either reorder or replace items in a playlist depending on the request's parameters.\nTo reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.\nTo replace items, include `uris` as either a query parameter or in the request's body.\nReplacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.\n<br/>\n**Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.\nThese operations can't be applied together in a single request.\n",
  operationId: 'reorder-or-replace-playlists-tracks',
  request: {
    params: z.object({ playlist_id: PathPlaylistIdParamsSchema }),
    query: z.object({
      uris: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'uris',
            required: false,
            schema: {
              description:
                'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
              title: 'Spotify Track URIs',
              type: 'string',
            },
          },
          description:
            'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
          title: 'Spotify Track URIs',
        }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .looseObject({
              insert_before: z.int().exactOptional().openapi({
                description:
                  'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
              }),
              range_length: z.int().exactOptional().openapi({
                description:
                  'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
              }),
              range_start: z
                .int()
                .exactOptional()
                .openapi({ description: 'The position of the first item to be reordered.\n' }),
              snapshot_id: z.string().exactOptional().openapi({
                description:
                  "The playlist's snapshot ID against which you want to make the changes.\n",
              }),
              uris: z.array(z.string()).exactOptional(),
            })
            .openapi({ example: { insert_before: 3, range_length: 2, range_start: 1 } }),
        },
      },
    },
  },
  responses: {
    200: PlaylistSnapshotIdResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
} as const)

export const postPlaylistsPlaylistIdTracksRoute = createRoute({
  method: 'post',
  path: '/playlists/{playlist_id}/tracks',
  tags: ['Playlists', 'Tracks'],
  summary: 'Add Items to Playlist\n',
  description: "Add one or more items to a user's playlist.\n",
  operationId: 'add-tracks-to-playlist',
  request: {
    params: z.object({ playlist_id: PathPlaylistIdParamsSchema }),
    query: z.object({
      position: z
        .int()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'position',
            required: false,
            schema: {
              description:
                'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
              example: 0,
              title: 'Position (append by default)',
              type: 'integer',
            },
          },
          description:
            'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
          example: 0,
          title: 'Position (append by default)',
        }),
      uris: z
        .string()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'uris',
            required: false,
            schema: {
              description:
                'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
              example: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M',
              title: 'Spotify Track URIs',
              type: 'string',
            },
          },
          description:
            'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
          example: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M',
          title: 'Spotify Track URIs',
        }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z.looseObject({
            position: z.int().exactOptional().openapi({
              description:
                'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0` ; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they appear in the uris array. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M"], "position": 3}`\n',
            }),
            uris: z.array(z.string()).exactOptional().openapi({
              description:
                'A JSON array of the [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add. For example: `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}`<br/>A maximum of 100 items can be added in one request. _**Note**: if the `uris` parameter is present in the query string, any URIs listed here in the body will be ignored._\n',
            }),
          }),
        },
      },
    },
  },
  responses: {
    201: PlaylistSnapshotIdResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
} as const)

export const deletePlaylistsPlaylistIdTracksRoute = createRoute({
  method: 'delete',
  path: '/playlists/{playlist_id}/tracks',
  tags: ['Playlists', 'Tracks'],
  summary: 'Remove Playlist Items\n',
  description: "Remove one or more items from a user's playlist.\n",
  operationId: 'remove-tracks-playlist',
  request: {
    params: z.object({ playlist_id: PathPlaylistIdParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .object({
              snapshot_id: z.string().exactOptional().openapi({
                description:
                  "The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n",
              }),
              tracks: z
                .array(
                  z.object({
                    uri: z.string().exactOptional().openapi({ description: 'Spotify URI' }),
                  }),
                )
                .openapi({
                  description:
                    'An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "tracks": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n',
                }),
            })
            .openapi({ required: ['tracks'] }),
        },
      },
    },
  },
  responses: {
    200: PlaylistSnapshotIdResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
} as const)

export const getRecommendationsRoute = createRoute({
  method: 'get',
  path: '/recommendations',
  tags: ['Tracks'],
  summary: 'Get Recommendations\n',
  description:
    'Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.\n\nFor artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.\n',
  operationId: 'get-recommendations',
  request: {
    query: z.object({
      limit: z
        .int()
        .min(1)
        .max(100)
        .default(20)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'limit',
            required: false,
            schema: {
              default: 20,
              description:
                'The target size of the list of recommended tracks. For seeds with unusually small pools or when highly restrictive filtering is applied, it may be impossible to generate the requested number of recommended tracks. Debugging information for such cases is available in the response. Default: 20\\. Minimum: 1\\. Maximum: 100.\n',
              example: 10,
              maximum: 100,
              minimum: 1,
              title: 'Limit',
              type: 'integer',
            },
          },
          description:
            'The target size of the list of recommended tracks. For seeds with unusually small pools or when highly restrictive filtering is applied, it may be impossible to generate the requested number of recommended tracks. Debugging information for such cases is available in the response. Default: 20\\. Minimum: 1\\. Maximum: 100.\n',
          example: 10,
          title: 'Limit',
        }),
      market: QueryMarketParamsSchema,
      seed_artists: z.string().openapi({
        param: {
          in: 'query',
          name: 'seed_artists',
          required: true,
          schema: {
            description:
              'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for seed artists.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.\n',
            example: '4NHQUGzhtTLFvgF5SZesLK',
            title: 'Spotify Artist ID Seeds',
            type: 'string',
          },
        },
        description:
          'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for seed artists.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.\n',
        example: '4NHQUGzhtTLFvgF5SZesLK',
        title: 'Spotify Artist ID Seeds',
      }),
      seed_genres: z.string().openapi({
        param: {
          in: 'query',
          name: 'seed_genres',
          required: true,
          schema: {
            description:
              'A comma separated list of any genres in the set of [available genre seeds](#available-genre-seeds).  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.\n',
            example: 'classical,country',
            title: 'Genres Seeds',
            type: 'string',
          },
        },
        description:
          'A comma separated list of any genres in the set of [available genre seeds](#available-genre-seeds).  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.\n',
        example: 'classical,country',
        title: 'Genres Seeds',
      }),
      seed_tracks: z.string().openapi({
        param: {
          in: 'query',
          name: 'seed_tracks',
          required: true,
          schema: {
            description:
              'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for a seed track.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.\n',
            example: '0c6xIDDpzE81m2q797ordA',
            title: 'Spotify Track ID Seeds',
            type: 'string',
          },
        },
        description:
          'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for a seed track.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.\n',
        example: '0c6xIDDpzE81m2q797ordA',
        title: 'Spotify Track ID Seeds',
      }),
      min_acousticness: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'min_acousticness',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
              maximum: 1,
              minimum: 0,
              title: 'Min. Acousticness',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          title: 'Min. Acousticness',
        }),
      max_acousticness: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'max_acousticness',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
              maximum: 1,
              minimum: 0,
              title: 'Max. Acousticness',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          title: 'Max. Acousticness',
        }),
      target_acousticness: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'target_acousticness',
            required: false,
            schema: {
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
              maximum: 1,
              minimum: 0,
              title: 'Target Acousticness',
              type: 'number',
            },
          },
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          title: 'Target Acousticness',
        }),
      min_danceability: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'min_danceability',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
              maximum: 1,
              minimum: 0,
              title: 'Min. Danceability',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          title: 'Min. Danceability',
        }),
      max_danceability: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'max_danceability',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
              maximum: 1,
              minimum: 0,
              title: 'Max. Danceability',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          title: 'Max. Danceability',
        }),
      target_danceability: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'target_danceability',
            required: false,
            schema: {
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
              maximum: 1,
              minimum: 0,
              title: 'Target Danceability',
              type: 'number',
            },
          },
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          title: 'Target Danceability',
        }),
      min_duration_ms: z
        .int()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'min_duration_ms',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
              title: 'Min. Duration (ms)',
              type: 'integer',
            },
          },
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          title: 'Min. Duration (ms)',
        }),
      max_duration_ms: z
        .int()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'max_duration_ms',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
              title: 'Max. Duration (ms)',
              type: 'integer',
            },
          },
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          title: 'Max. Duration (ms)',
        }),
      target_duration_ms: z
        .int()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'target_duration_ms',
            required: false,
            schema: {
              description: 'Target duration of the track (ms)',
              title: 'Target Duration (ms)',
              type: 'integer',
            },
          },
          description: 'Target duration of the track (ms)',
          title: 'Target Duration (ms)',
        }),
      min_energy: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'min_energy',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
              maximum: 1,
              minimum: 0,
              title: 'Min. Energy',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          title: 'Min. Energy',
        }),
      max_energy: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'max_energy',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
              maximum: 1,
              minimum: 0,
              title: 'Max. Energy',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          title: 'Max. Energy',
        }),
      target_energy: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'target_energy',
            required: false,
            schema: {
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
              maximum: 1,
              minimum: 0,
              title: 'Target Energy',
              type: 'number',
            },
          },
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          title: 'Target Energy',
        }),
      min_instrumentalness: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'min_instrumentalness',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
              maximum: 1,
              minimum: 0,
              title: 'Min. Instrumentalness',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          title: 'Min. Instrumentalness',
        }),
      max_instrumentalness: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'max_instrumentalness',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
              maximum: 1,
              minimum: 0,
              title: 'Max. Instrumentalness',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          title: 'Max. Instrumentalness',
        }),
      target_instrumentalness: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'target_instrumentalness',
            required: false,
            schema: {
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
              maximum: 1,
              minimum: 0,
              title: 'Target Instrumentalness',
              type: 'number',
            },
          },
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          title: 'Target Instrumentalness',
        }),
      min_key: z
        .int()
        .min(0)
        .max(11)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'min_key',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
              maximum: 11,
              minimum: 0,
              title: 'Min. Key',
              type: 'integer',
            },
          },
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          title: 'Min. Key',
        }),
      max_key: z
        .int()
        .min(0)
        .max(11)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'max_key',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
              maximum: 11,
              minimum: 0,
              title: 'Max. Key',
              type: 'integer',
            },
          },
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          title: 'Max. Key',
        }),
      target_key: z
        .int()
        .min(0)
        .max(11)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'target_key',
            required: false,
            schema: {
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
              maximum: 11,
              minimum: 0,
              title: 'Target Key',
              type: 'integer',
            },
          },
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          title: 'Target Key',
        }),
      min_liveness: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'min_liveness',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
              maximum: 1,
              minimum: 0,
              title: 'Min. Liveness',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          title: 'Min. Liveness',
        }),
      max_liveness: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'max_liveness',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
              maximum: 1,
              minimum: 0,
              title: 'Max. Liveness',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          title: 'Max. Liveness',
        }),
      target_liveness: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'target_liveness',
            required: false,
            schema: {
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
              maximum: 1,
              minimum: 0,
              title: 'Target Liveness',
              type: 'number',
            },
          },
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          title: 'Target Liveness',
        }),
      min_loudness: z.coerce
        .number()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'min_loudness',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
              title: 'Min. Loudness',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          title: 'Min. Loudness',
        }),
      max_loudness: z.coerce
        .number()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'max_loudness',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
              title: 'Max. Loudness',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          title: 'Max. Loudness',
        }),
      target_loudness: z.coerce
        .number()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'target_loudness',
            required: false,
            schema: {
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
              title: 'Target Loudness',
              type: 'number',
            },
          },
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          title: 'Target Loudness',
        }),
      min_mode: z
        .int()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'min_mode',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
              maximum: 1,
              minimum: 0,
              title: 'Min. Mode',
              type: 'integer',
            },
          },
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          title: 'Min. Mode',
        }),
      max_mode: z
        .int()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'max_mode',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
              maximum: 1,
              minimum: 0,
              title: 'Max. Mode',
              type: 'integer',
            },
          },
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          title: 'Max. Mode',
        }),
      target_mode: z
        .int()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'target_mode',
            required: false,
            schema: {
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
              maximum: 1,
              minimum: 0,
              title: 'Target Mode',
              type: 'integer',
            },
          },
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          title: 'Target Mode',
        }),
      min_popularity: z
        .int()
        .min(0)
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'min_popularity',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
              maximum: 100,
              minimum: 0,
              title: 'Min. Popularity',
              type: 'integer',
            },
          },
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          title: 'Min. Popularity',
        }),
      max_popularity: z
        .int()
        .min(0)
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'max_popularity',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
              maximum: 100,
              minimum: 0,
              title: 'Max. Popularity',
              type: 'integer',
            },
          },
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          title: 'Max. Popularity',
        }),
      target_popularity: z
        .int()
        .min(0)
        .max(100)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'target_popularity',
            required: false,
            schema: {
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
              maximum: 100,
              minimum: 0,
              title: 'Target Popularity',
              type: 'integer',
            },
          },
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          title: 'Target Popularity',
        }),
      min_speechiness: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'min_speechiness',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
              maximum: 1,
              minimum: 0,
              title: 'Min. Speechiness',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          title: 'Min. Speechiness',
        }),
      max_speechiness: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'max_speechiness',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
              maximum: 1,
              minimum: 0,
              title: 'Max. Speechiness',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          title: 'Max. Speechiness',
        }),
      target_speechiness: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'target_speechiness',
            required: false,
            schema: {
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
              maximum: 1,
              minimum: 0,
              title: 'Target Speechiness',
              type: 'number',
            },
          },
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          title: 'Target Speechiness',
        }),
      min_tempo: z.coerce
        .number()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'min_tempo',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
              title: 'Min. Tempo',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          title: 'Min. Tempo',
        }),
      max_tempo: z.coerce
        .number()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'max_tempo',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
              title: 'Max. Tempo',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          title: 'Max. Tempo',
        }),
      target_tempo: z.coerce
        .number()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'target_tempo',
            required: false,
            schema: { description: 'Target tempo (BPM)', title: 'Target Tempo', type: 'number' },
          },
          description: 'Target tempo (BPM)',
          title: 'Target Tempo',
        }),
      min_time_signature: z
        .int()
        .max(11)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'min_time_signature',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
              maximum: 11,
              title: 'Min. Time Signature',
              type: 'integer',
            },
          },
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          title: 'Min. Time Signature',
        }),
      max_time_signature: z
        .int()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'max_time_signature',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
              title: 'Max. Time Signature',
              type: 'integer',
            },
          },
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          title: 'Max. Time Signature',
        }),
      target_time_signature: z
        .int()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'target_time_signature',
            required: false,
            schema: {
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
              title: 'Target Time Signature',
              type: 'integer',
            },
          },
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          title: 'Target Time Signature',
        }),
      min_valence: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'min_valence',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
              maximum: 1,
              minimum: 0,
              title: 'Min. Valence',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          title: 'Min. Valence',
        }),
      max_valence: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'max_valence',
            required: false,
            schema: {
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
              maximum: 1,
              minimum: 0,
              title: 'Max. Valence',
              type: 'number',
            },
          },
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          title: 'Max. Valence',
        }),
      target_valence: z.coerce
        .number()
        .min(0)
        .max(1)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'target_valence',
            required: false,
            schema: {
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
              maximum: 1,
              minimum: 0,
              title: 'Target Valence',
              type: 'number',
            },
          },
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          title: 'Target Valence',
        }),
    }),
  },
  responses: {
    200: OneRecommendationsResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getRecommendationsAvailableGenreSeedsRoute = createRoute({
  method: 'get',
  path: '/recommendations/available-genre-seeds',
  tags: ['Genres'],
  summary: 'Get Available Genre Seeds\n',
  description:
    'Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).\n',
  operationId: 'get-recommendation-genres',
  responses: {
    200: ManyGenresResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getSearchRoute = createRoute({
  method: 'get',
  path: '/search',
  tags: ['Search'],
  summary: 'Search for Item\n',
  description:
    'Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks\nthat match a keyword string.<br />\n**Note: Audiobooks are only available for the US, UK, Ireland, New Zealand and Australia markets.**\n',
  operationId: 'search',
  request: {
    query: z.object({
      q: z.string().openapi({
        param: {
          in: 'query',
          name: 'q',
          required: true,
          schema: {
            description:
              'Your search query.\n\nYou can narrow down your search using field filters. The available filters are `album`, `artist`, `track`, `year`, `upc`, `tag:hipster`, `tag:new`, `isrc`, and `genre`. Each field filter only applies to certain result types.\n\nThe `artist` and `year` filters can be used while searching albums, artists and tracks. You can filter on a single `year` or a range (e.g. 1955-1960).<br />\nThe `album` filter can be used while searching albums and tracks.<br />\nThe `genre` filter can be used while searching artists and tracks.<br />\nThe `isrc` and `track` filters can be used while searching tracks.<br />\nThe `upc`, `tag:new` and `tag:hipster` filters can only be used while searching albums. The `tag:new` filter will return albums released in the past two weeks and `tag:hipster` can be used to return only albums with the lowest 10% popularity.<br />\n',
            example: 'remaster%20track:Doxy%20artist:Miles%20Davis',
            title: 'Query',
            type: 'string',
          },
        },
        description:
          'Your search query.\n\nYou can narrow down your search using field filters. The available filters are `album`, `artist`, `track`, `year`, `upc`, `tag:hipster`, `tag:new`, `isrc`, and `genre`. Each field filter only applies to certain result types.\n\nThe `artist` and `year` filters can be used while searching albums, artists and tracks. You can filter on a single `year` or a range (e.g. 1955-1960).<br />\nThe `album` filter can be used while searching albums and tracks.<br />\nThe `genre` filter can be used while searching artists and tracks.<br />\nThe `isrc` and `track` filters can be used while searching tracks.<br />\nThe `upc`, `tag:new` and `tag:hipster` filters can only be used while searching albums. The `tag:new` filter will return albums released in the past two weeks and `tag:hipster` can be used to return only albums with the lowest 10% popularity.<br />\n',
        example: 'remaster%20track:Doxy%20artist:Miles%20Davis',
        title: 'Query',
      }),
      type: z
        .array(
          z.enum(['album', 'artist', 'playlist', 'track', 'show', 'episode', 'audiobook']).openapi({
            param: {
              explode: false,
              in: 'query',
              name: 'type',
              required: true,
              schema: {
                description:
                  'A comma-separated list of item types to search across. Search results include hits\nfrom all the specified item types. For example: `q=abacab&type=album,track` returns\nboth albums and tracks matching "abacab".\n',
                items: {
                  enum: ['album', 'artist', 'playlist', 'track', 'show', 'episode', 'audiobook'],
                  type: 'string',
                },
                title: 'Item type',
                type: 'array',
              },
            },
          }),
        )
        .openapi({
          param: {
            explode: false,
            in: 'query',
            name: 'type',
            required: true,
            schema: {
              description:
                'A comma-separated list of item types to search across. Search results include hits\nfrom all the specified item types. For example: `q=abacab&type=album,track` returns\nboth albums and tracks matching "abacab".\n',
              items: {
                enum: ['album', 'artist', 'playlist', 'track', 'show', 'episode', 'audiobook'],
                type: 'string',
              },
              title: 'Item type',
              type: 'array',
            },
          },
          description:
            'A comma-separated list of item types to search across. Search results include hits\nfrom all the specified item types. For example: `q=abacab&type=album,track` returns\nboth albums and tracks matching "abacab".\n',
          title: 'Item type',
        }),
      market: QueryMarketParamsSchema,
      limit: z
        .int()
        .min(0)
        .max(50)
        .default(20)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'limit',
            required: false,
            schema: {
              default: 20,
              description: 'The maximum number of results to return in each item type.\n',
              example: 10,
              maximum: 50,
              minimum: 0,
              title: 'Limit',
              type: 'integer',
            },
          },
          description: 'The maximum number of results to return in each item type.\n',
          example: 10,
          title: 'Limit',
        }),
      offset: z
        .int()
        .min(0)
        .max(1000)
        .default(0)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'offset',
            required: false,
            schema: {
              default: 0,
              description:
                'The index of the first result to return. Use\nwith limit to get the next page of search results.\n',
              example: 5,
              maximum: 1000,
              minimum: 0,
              title: 'Offset',
              type: 'integer',
            },
          },
          description:
            'The index of the first result to return. Use\nwith limit to get the next page of search results.\n',
          example: 5,
          title: 'Offset',
        }),
      include_external: z
        .literal('audio')
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'include_external',
            required: false,
            schema: {
              description:
                'If `include_external=audio` is specified it signals that the client can play externally hosted audio content, and marks\nthe content as playable in the response. By default externally hosted audio content is marked as unplayable in the response.\n',
              enum: ['audio'],
              title: 'Include External',
              type: 'string',
            },
          },
          description:
            'If `include_external=audio` is specified it signals that the client can play externally hosted audio content, and marks\nthe content as playable in the response. By default externally hosted audio content is marked as unplayable in the response.\n',
          title: 'Include External',
        }),
    }),
  },
  responses: {
    200: SearchItemsResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getShowsRoute = createRoute({
  method: 'get',
  path: '/shows',
  tags: ['Shows'],
  summary: 'Get Several Shows\n',
  description: 'Get Spotify catalog information for several shows based on their Spotify IDs.\n',
  operationId: 'get-multiple-shows',
  request: { query: z.object({ market: QueryMarketParamsSchema, ids: QueryShowIdsParamsSchema }) },
  responses: {
    200: ManySimplifiedShowsResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getShowsIdRoute = createRoute({
  method: 'get',
  path: '/shows/{id}',
  tags: ['Shows'],
  summary: 'Get Show\n',
  description:
    'Get Spotify catalog information for a single show identified by its\nunique Spotify ID.\n',
  operationId: 'get-a-show',
  request: {
    query: z.object({ market: QueryMarketParamsSchema }),
    params: z.object({ id: PathShowIdParamsSchema }),
  },
  responses: {
    200: OneShowResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-read-playback-position'] }],
} as const)

export const getShowsIdEpisodesRoute = createRoute({
  method: 'get',
  path: '/shows/{id}/episodes',
  tags: ['Shows', 'Episodes'],
  summary: 'Get Show Episodes\n',
  description:
    'Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.\n',
  operationId: 'get-a-shows-episodes',
  request: {
    params: z.object({ id: PathShowIdParamsSchema }),
    query: z.object({
      market: QueryMarketParamsSchema,
      limit: QueryLimitParamsSchema,
      offset: QueryOffsetParamsSchema,
    }),
  },
  responses: {
    200: PagingSimplifiedEpisodeObjectResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['user-read-playback-position'] }],
} as const)

export const getTracksRoute = createRoute({
  method: 'get',
  path: '/tracks',
  tags: ['Tracks'],
  summary: 'Get Several Tracks\n',
  description: 'Get Spotify catalog information for multiple tracks based on their Spotify IDs.\n',
  operationId: 'get-several-tracks',
  request: { query: z.object({ market: QueryMarketParamsSchema, ids: QueryTrackIdsParamsSchema }) },
  responses: {
    200: ManyTracksResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getTracksIdRoute = createRoute({
  method: 'get',
  path: '/tracks/{id}',
  tags: ['Tracks'],
  summary: 'Get Track\n',
  description:
    'Get Spotify catalog information for a single track identified by its\nunique Spotify ID.\n',
  operationId: 'get-track',
  request: {
    params: z.object({
      id: z.string().openapi({
        param: {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
            example: '11dFghVXANMlKmJXsNCbNl',
            title: 'Spotify Track ID',
            type: 'string',
          },
        },
        description:
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
        example: '11dFghVXANMlKmJXsNCbNl',
        title: 'Spotify Track ID',
      }),
    }),
    query: z.object({ market: QueryMarketParamsSchema }),
  },
  responses: {
    200: OneTrackResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getUsersUserIdRoute = createRoute({
  method: 'get',
  path: '/users/{user_id}',
  tags: ['Users'],
  summary: "Get User's Profile\n",
  description: 'Get public profile information about a Spotify user.\n',
  operationId: 'get-users-profile',
  request: { params: z.object({ user_id: PathUserIdParamsSchema }) },
  responses: {
    200: OnePublicUserResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: [] }],
} as const)

export const getUsersUserIdPlaylistsRoute = createRoute({
  method: 'get',
  path: '/users/{user_id}/playlists',
  tags: ['Playlists', 'Users'],
  summary: "Get User's Playlists\n",
  description: 'Get a list of the playlists owned or followed by a Spotify user.\n',
  operationId: 'get-list-users-playlists',
  request: {
    params: z.object({ user_id: PathUserIdParamsSchema }),
    query: z.object({
      limit: QueryLimitParamsSchema,
      offset: z
        .int()
        .default(0)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'offset',
            required: false,
            schema: {
              default: 0,
              description:
                'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.\n',
              example: 5,
              title: 'Offset',
              type: 'integer',
            },
          },
          description:
            'The index of the first playlist to return. Default:\n0 (the first object). Maximum offset: 100.000\\. Use with `limit` to get the\nnext set of playlists.\n',
          example: 5,
          title: 'Offset',
        }),
    }),
  },
  responses: {
    200: PagedPlaylistsResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['playlist-read-private', 'playlist-read-collaborative'] }],
} as const)

export const postUsersUserIdPlaylistsRoute = createRoute({
  method: 'post',
  path: '/users/{user_id}/playlists',
  tags: ['Playlists', 'Library'],
  summary: 'Create Playlist\n',
  description:
    'Create a playlist for a Spotify user. (The playlist will be empty until\nyou [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)\n',
  operationId: 'create-playlist',
  request: {
    params: z.object({ user_id: PathUserIdParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .looseObject({
              collaborative: z.boolean().exactOptional().openapi({
                description:
                  'Defaults to `false`. If `true` the playlist will be collaborative. _**Note**: to create a collaborative playlist you must also set `public` to `false`. To create collaborative playlists you must have granted `playlist-modify-private` and `playlist-modify-public` [scopes](/documentation/web-api/concepts/scopes/#list-of-scopes)._\n',
              }),
              description: z.string().exactOptional().openapi({
                description:
                  'value for playlist description as displayed in Spotify Clients and in the Web API.\n',
              }),
              name: z.string().openapi({
                description:
                  'The name for the new playlist, for example `"Your Coolest Playlist"`. This name does not need to be unique; a user may have several playlists with the same name.\n',
              }),
              public: z.boolean().exactOptional().openapi({
                description:
                  'Defaults to `true`. If `true` the playlist will be public, if `false` it will be private. To be able to create private playlists, the user must have granted the `playlist-modify-private` [scope](/documentation/web-api/concepts/scopes/#list-of-scopes)\n',
              }),
            })
            .openapi({
              example: {
                description: 'New playlist description',
                name: 'New Playlist',
                public: false,
              },
              required: ['name'],
            }),
        },
      },
    },
  },
  responses: {
    201: OnePlaylistResponse,
    401: UnauthorizedResponse,
    403: ForbiddenResponse,
    429: TooManyRequestsResponse,
  },
  security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
} as const)
