import { createRoute, z } from '@hono/zod-openapi'

type FacetFiltersType = FacetFiltersType[] | string

type OptionalFiltersType = OptionalFiltersType[] | string

type NumericFiltersType = NumericFiltersType[] | string

type TagFiltersType = TagFiltersType[] | string

type ReRankingApplyFilterType = ReRankingApplyFilterType[] | string

const HighlightedValueSchema = z
  .string()
  .openapi({
    description: 'Highlighted attribute value, including HTML tags.',
    example: '<em>George</em> <em>Clo</em>oney',
  })
  .openapi('HighlightedValue')

const MatchLevelSchema = z
  .enum(['none', 'partial', 'full'])
  .openapi({ description: 'Whether the whole query string matches or only a part.' })
  .openapi('MatchLevel')

type HighlightResultOptionType = {
  value: z.infer<typeof HighlightedValueSchema>
  matchLevel: z.infer<typeof MatchLevelSchema>
  matchedWords: string[]
  fullyHighlighted?: boolean
}

const HighlightResultSchema: z.ZodType<HighlightResultType> = z
  .lazy(() =>
    z.xor([HighlightResultOptionSchema, HighlightResultMapSchema, HighlightResultArraySchema]),
  )
  .openapi('HighlightResult')

type HighlightResultMapType = { [key: string]: z.infer<typeof HighlightResultSchema> }

const HighlightResultOptionSchema: z.ZodType<HighlightResultOptionType> = z
  .strictObject({
    value: HighlightedValueSchema,
    matchLevel: MatchLevelSchema,
    matchedWords: z
      .array(z.string())
      .openapi({
        description: 'List of matched words from the search query.',
        example: ['action'],
      }),
    fullyHighlighted: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'Whether the entire attribute value is highlighted.' }),
  })
  .openapi({
    title: 'highlightResultOption',
    description: 'Surround words that match the query with HTML tags for highlighting.',
    required: ['value', 'matchLevel', 'matchedWords'],
    'x-discriminator-fields': ['matchLevel', 'matchedWords'],
  })
  .openapi('HighlightResultOption')

const HighlightResultMapSchema: z.ZodType<HighlightResultMapType> = z
  .lazy(() =>
    z
      .record(
        z.string(),
        HighlightResultSchema.openapi({ 'x-additionalPropertiesName': 'attribute' }),
      )
      .openapi({
        title: 'highlightResultMap',
        description: 'Surround words that match the query with HTML tags for highlighting.',
        'x-is-free-form': false,
      }),
  )
  .openapi('HighlightResultMap')

const HighlightResultArraySchema: z.ZodType<HighlightResultArrayType> = z
  .lazy(() =>
    z
      .array(HighlightResultSchema)
      .openapi({
        title: 'highlightResultArray',
        description: 'Surround words that match the query with HTML tags for highlighting.',
      }),
  )
  .openapi('HighlightResultArray')

type HighlightResultType =
  | z.infer<typeof HighlightResultOptionSchema>
  | z.infer<typeof HighlightResultMapSchema>
  | z.infer<typeof HighlightResultArraySchema>

type HighlightResultArrayType = z.infer<typeof HighlightResultSchema>[]

type SnippetResultOptionType = {
  value: z.infer<typeof HighlightedValueSchema>
  matchLevel: z.infer<typeof MatchLevelSchema>
}

const SnippetResultSchema: z.ZodType<SnippetResultType> = z
  .lazy(() => z.xor([SnippetResultOptionSchema, SnippetResultMapSchema, SnippetResultArraySchema]))
  .openapi('SnippetResult')

type SnippetResultMapType = { [key: string]: z.infer<typeof SnippetResultSchema> }

const SnippetResultOptionSchema: z.ZodType<SnippetResultOptionType> = z
  .strictObject({ value: HighlightedValueSchema, matchLevel: MatchLevelSchema })
  .openapi({
    title: 'snippetResultOption',
    description: 'Snippets that show the context around a matching search query.',
    required: ['value', 'matchLevel'],
    'x-discriminator-fields': ['matchLevel'],
  })
  .openapi('SnippetResultOption')

const SnippetResultMapSchema: z.ZodType<SnippetResultMapType> = z
  .lazy(() =>
    z
      .record(
        z.string(),
        SnippetResultSchema.openapi({ 'x-additionalPropertiesName': 'attribute' }),
      )
      .openapi({
        title: 'snippetResultMap',
        description: 'Snippets that show the context around a matching search query.',
        'x-is-free-form': false,
      }),
  )
  .openapi('SnippetResultMap')

const SnippetResultArraySchema: z.ZodType<SnippetResultArrayType> = z
  .lazy(() =>
    z
      .array(SnippetResultSchema)
      .openapi({
        title: 'snippetResultArray',
        description: 'Snippets that show the context around a matching search query.',
      }),
  )
  .openapi('SnippetResultArray')

type SnippetResultType =
  | z.infer<typeof SnippetResultOptionSchema>
  | z.infer<typeof SnippetResultMapSchema>
  | z.infer<typeof SnippetResultArraySchema>

type SnippetResultArrayType = z.infer<typeof SnippetResultSchema>[]

const ProcessingTimeMSSchema = z
  .int()
  .openapi({
    description: 'Time the server took to process the request, in milliseconds.',
    example: 20,
  })
  .openapi('ProcessingTimeMS')

const RedirectRuleIndexMetadataSchema = z
  .object({
    source: z.string().openapi({ description: 'Source index for the redirect rule.' }),
    dest: z.string().openapi({ description: 'Destination index for the redirect rule.' }),
    reason: z.string().openapi({ description: 'Reason for the redirect rule.' }),
    succeed: z.boolean().openapi({ description: 'Redirect rule status.' }),
    data: z
      .object({ ruleObjectID: z.string() })
      .openapi({
        title: 'redirectRuleIndexData',
        description: 'Redirect rule data.',
        required: ['ruleObjectID'],
      }),
  })
  .openapi({ required: ['data', 'succeed', 'reason', 'dest', 'source'] })
  .openapi('RedirectRuleIndexMetadata')

const OrderSchema = z
  .array(z.string())
  .openapi({
    description:
      'Explicit order of facets or facet values.\n\nThis setting lets you always show specific facets or facet values at the top of the list.\n',
  })
  .openapi('Order')

const FacetsSchema = z
  .strictObject({ order: OrderSchema.exactOptional() })
  .openapi({ description: 'Order of facet names.' })
  .openapi('Facets')

const SortRemainingBySchema = z
  .enum(['count', 'alpha', 'hidden'])
  .openapi({
    description:
      "Order of facet values that aren't explicitly positioned with the `order` setting.\n\n- `count`.\n  Order remaining facet values by decreasing count.\n  The count is the number of matching records containing this facet value.\n\n- `alpha`.\n  Sort facet values alphabetically.\n\n- `hidden`.\n  Don't show facet values that aren't explicitly positioned.\n",
  })
  .openapi('SortRemainingBy')

const HideSchema = z
  .array(z.string())
  .openapi({ description: 'Hide facet values.' })
  .openapi('Hide')

const ValueSchema = z
  .strictObject({
    order: OrderSchema.exactOptional(),
    sortRemainingBy: SortRemainingBySchema.exactOptional(),
    hide: HideSchema.exactOptional(),
  })
  .openapi('Value')

const ValuesSchema = z
  .record(z.string(), ValueSchema.openapi({ 'x-additionalPropertiesName': 'facet' }))
  .openapi({ description: 'Order of facet values. One object for each facet.' })
  .openapi('Values')

const FacetOrderingSchema = z
  .strictObject({ facets: FacetsSchema.exactOptional(), values: ValuesSchema.exactOptional() })
  .openapi({ description: 'Order of facet names and facet values in your UI.' })
  .openapi('FacetOrdering')

const RedirectURLSchema = z
  .strictObject({ url: z.string().exactOptional() })
  .openapi({ description: 'The redirect rule container.' })
  .openapi('RedirectURL')

const BannerImageUrlSchema = z
  .strictObject({ url: z.string().exactOptional() })
  .openapi({ description: 'URL for an image to show inside a banner.' })
  .openapi('BannerImageUrl')

const BannerImageSchema = z
  .strictObject({
    urls: z.array(BannerImageUrlSchema).exactOptional(),
    title: z.string().exactOptional(),
  })
  .openapi({ description: 'Image to show inside a banner.' })
  .openapi('BannerImage')

const BannerLinkSchema = z
  .strictObject({ url: z.string().exactOptional() })
  .openapi({ description: 'Link for a banner defined in the Merchandising Studio.' })
  .openapi('BannerLink')

const BannerSchema = z
  .strictObject({
    image: BannerImageSchema.exactOptional(),
    link: BannerLinkSchema.exactOptional(),
  })
  .openapi({ description: 'Banner with image and link to redirect users.' })
  .openapi('Banner')

const BannersSchema = z
  .array(BannerSchema)
  .openapi({ description: 'Banners defined in the Merchandising Studio for a given search.' })
  .openapi('Banners')

const WidgetsSchema = z
  .strictObject({ banners: BannersSchema.exactOptional() })
  .openapi({
    description: 'Widgets returned from any rules that are applied to the current search.',
  })
  .openapi('Widgets')

const RenderingContentSchema = z
  .strictObject({
    facetOrdering: FacetOrderingSchema.exactOptional(),
    redirect: RedirectURLSchema.exactOptional(),
    widgets: WidgetsSchema.exactOptional(),
  })
  .openapi({
    description:
      'Extra data that can be used in the search UI.\n\nYou can use this to control aspects of your search UI, such as the order of facet names and values\nwithout changing your frontend code.\n',
    'x-categories': ['Advanced'],
  })
  .openapi('RenderingContent')

const UserDataSchema = z
  .any()
  .default({})
  .openapi({
    example: { settingID: 'f2a7b51e3503acc6a39b3784ffb84300', pluginVersion: '1.6.0' },
    description: 'An object with custom data.\n\nYou can store up to 32kB as custom data.\n',
    'x-categories': ['Advanced'],
  })
  .openapi('UserData')

const BaseSearchResponseSchema = z
  .looseObject({
    abTestID: z
      .int()
      .exactOptional()
      .openapi({
        description:
          'A/B test ID. This is only included in the response for indices that are part of an A/B test.',
      }),
    abTestVariantID: z
      .int()
      .min(1)
      .exactOptional()
      .openapi({
        description:
          'Variant ID. This is only included in the response for indices that are part of an A/B test.',
      }),
    aroundLatLng: z
      .string()
      .regex(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/)
      .exactOptional()
      .openapi({ description: 'Computed geographical location.', example: '40.71,-74.01' }),
    automaticRadius: z
      .string()
      .exactOptional()
      .openapi({ description: 'Distance from a central coordinate provided by `aroundLatLng`.' }),
    exhaustive: z
      .object({
        facetsCount: z
          .boolean()
          .exactOptional()
          .openapi({
            title: 'facetsCount',
            description:
              'Whether the facet count is exhaustive (`true`) or approximate (`false`). See the [related discussion](https://support.algolia.com/hc/articles/4406975248145-Why-are-my-facet-and-hit-counts-not-accurate).',
          }),
        facetValues: z
          .boolean()
          .exactOptional()
          .openapi({
            title: 'facetValues',
            description: 'The value is `false` if not all facet values are retrieved.',
          }),
        nbHits: z
          .boolean()
          .exactOptional()
          .openapi({
            title: 'nbHits',
            description:
              'Whether the `nbHits` is exhaustive (`true`) or approximate (`false`). When the query takes more than 50ms to be processed, the engine makes an approximation. This can happen when using complex filters on millions of records, when typo-tolerance was not exhaustive, or when enough hits have been retrieved (for example, after the engine finds 10,000 exact matches). `nbHits` is reported as non-exhaustive whenever an approximation is made, even if the approximation didn’t, in the end, impact the exhaustivity of the query.',
          }),
        rulesMatch: z
          .boolean()
          .exactOptional()
          .openapi({
            title: 'rulesMatch',
            description:
              'Rules matching exhaustivity. The value is `false` if rules were enable for this query, and could not be fully processed due a timeout. This is generally caused by the number of alternatives (such as typos) which is too large.',
          }),
        typo: z
          .boolean()
          .exactOptional()
          .openapi({
            title: 'typo',
            description:
              'Whether the typo search was exhaustive (`true`) or approximate (`false`). An approximation is done when the typo search query part takes more than 10% of the query budget (ie. 5ms by default) to be processed (this can happen when a lot of typo alternatives exist for the query). This field will not be included when typo-tolerance is entirely disabled.',
          }),
      })
      .exactOptional()
      .openapi({
        title: 'exhaustive',
        description:
          'Whether certain properties of the search response are calculated exhaustive (exact) or approximated.',
      }),
    appliedRules: z
      .array(z.object({}))
      .exactOptional()
      .openapi({ description: 'Rules applied to the query.', title: 'appliedRules' }),
    exhaustiveFacetsCount: z
      .boolean()
      .exactOptional()
      .openapi({
        description: 'See the `facetsCount` field of the `exhaustive` object in the response.',
        deprecated: true,
      }),
    exhaustiveNbHits: z
      .boolean()
      .exactOptional()
      .openapi({
        description: 'See the `nbHits` field of the `exhaustive` object in the response.',
        deprecated: true,
      }),
    exhaustiveTypo: z
      .boolean()
      .exactOptional()
      .openapi({
        description: 'See the `typo` field of the `exhaustive` object in the response.',
        deprecated: true,
      }),
    facets: z
      .record(
        z.string(),
        z
          .record(z.string(), z.int().openapi({ 'x-additionalPropertiesName': 'facet count' }))
          .openapi({ 'x-additionalPropertiesName': 'facet' }),
      )
      .exactOptional()
      .openapi({
        title: 'facets',
        description: 'Facet counts.',
        example: { category: { food: 1, tech: 42 } },
      }),
    facets_stats: z
      .record(
        z.string(),
        z
          .object({
            min: z
              .number()
              .exactOptional()
              .openapi({ description: 'Minimum value in the results.' }),
            max: z
              .number()
              .exactOptional()
              .openapi({ description: 'Maximum value in the results.' }),
            avg: z
              .number()
              .exactOptional()
              .openapi({ description: 'Average facet value in the results.' }),
            sum: z
              .number()
              .exactOptional()
              .openapi({ description: 'Sum of all values in the results.' }),
          })
          .openapi({ title: 'facetStats' }),
      )
      .exactOptional()
      .openapi({ description: 'Statistics for numerical facets.' }),
    index: z
      .string()
      .exactOptional()
      .openapi({ example: 'indexName', description: 'Index name used for the query.' }),
    indexUsed: z
      .string()
      .exactOptional()
      .openapi({
        description:
          "Index name used for the query. During A/B testing, the targeted index isn't always the index used by the query.",
        example: 'indexNameAlt',
      }),
    message: z.string().exactOptional().openapi({ description: 'Warnings about the query.' }),
    nbSortedHits: z
      .int()
      .exactOptional()
      .openapi({
        description: 'Number of hits selected and sorted by the relevant sort algorithm.',
        example: 20,
      }),
    parsedQuery: z
      .string()
      .exactOptional()
      .openapi({
        description:
          'Post-[normalization](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/#what-does-normalization-mean) query string that will be searched.',
        example: 'george clo',
      }),
    processingTimeMS: ProcessingTimeMSSchema.exactOptional(),
    processingTimingsMS: z
      .object({})
      .exactOptional()
      .openapi({
        description:
          'Experimental. List of processing steps and their times, in milliseconds. You can use this list to investigate performance issues.',
      }),
    queryAfterRemoval: z
      .string()
      .exactOptional()
      .openapi({
        description:
          'Markup text indicating which parts of the original query have been removed to retrieve a non-empty result set.',
      }),
    redirect: z
      .object({ index: z.array(RedirectRuleIndexMetadataSchema).exactOptional() })
      .exactOptional()
      .openapi({
        title: 'redirect',
        description:
          '[Redirect results to a URL](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/redirects), this this parameter is for internal use only.\n',
      }),
    renderingContent: RenderingContentSchema.exactOptional(),
    serverTimeMS: z
      .int()
      .exactOptional()
      .openapi({
        description: 'Time the server took to process the request, in milliseconds.',
        example: 20,
      }),
    serverUsed: z
      .string()
      .exactOptional()
      .openapi({
        description: 'Host name of the server that processed the request.',
        example: 'c2-uk-3.algolia.net',
      }),
    userData: UserDataSchema.exactOptional(),
    queryID: z
      .string()
      .exactOptional()
      .openapi({
        description:
          'Unique identifier for the query. This is used for [click analytics](https://www.algolia.com/doc/guides/analytics/click-analytics).',
        example: 'a00dbc80a8d13c4565a442e7e2dca80a',
      }),
    _automaticInsights: z
      .boolean()
      .exactOptional()
      .openapi({
        description: 'Whether automatic events collection is enabled for the application.',
      }),
  })
  .openapi('BaseSearchResponse')

const PageSchema = z
  .int()
  .min(0)
  .default(0)
  .openapi({ description: 'Page of search results to retrieve.', 'x-categories': ['Pagination'] })
  .openapi('Page')

const NbHitsSchema = z
  .int()
  .openapi({ description: 'Number of results (hits).', example: 20 })
  .openapi('NbHits')

const NbPagesSchema = z
  .int()
  .openapi({ description: 'Number of pages of results.', example: 1 })
  .openapi('NbPages')

const HitsPerPageSchema = z
  .int()
  .min(1)
  .max(1000)
  .default(20)
  .openapi({ description: 'Number of hits per page.', 'x-categories': ['Pagination'] })
  .openapi('HitsPerPage')

const SearchPaginationSchema = z
  .strictObject({
    page: PageSchema.exactOptional(),
    nbHits: NbHitsSchema.exactOptional(),
    nbPages: NbPagesSchema.exactOptional(),
    hitsPerPage: HitsPerPageSchema.exactOptional(),
  })
  .openapi('SearchPagination')

const ObjectIDSchema = z
  .string()
  .openapi({ description: 'Unique record identifier.', example: 'test-record-123' })
  .openapi('ObjectID')

const MatchedGeoLocationSchema = z
  .object({
    lat: z.number().exactOptional().openapi({ description: 'Latitude of the matched location.' }),
    lng: z.number().exactOptional().openapi({ description: 'Longitude of the matched location.' }),
    distance: z
      .int()
      .exactOptional()
      .openapi({
        description: 'Distance between the matched location and the search location (in meters).',
      }),
  })
  .openapi('MatchedGeoLocation')

const PersonalizationSchema = z
  .object({
    filtersScore: z.int().exactOptional().openapi({ description: 'The score of the filters.' }),
    rankingScore: z.int().exactOptional().openapi({ description: 'The score of the ranking.' }),
    score: z.int().exactOptional().openapi({ description: 'The score of the event.' }),
  })
  .openapi('Personalization')

const RankingInfoSchema = z
  .strictObject({
    filters: z
      .int()
      .min(0)
      .exactOptional()
      .openapi({ description: 'Whether a filter matched the query.' }),
    firstMatchedWord: z
      .int()
      .min(0)
      .openapi({
        description:
          'Position of the first matched word in the best matching attribute of the record.',
      }),
    geoDistance: z
      .int()
      .min(0)
      .openapi({
        description:
          'Distance between the geo location in the search query and the best matching geo location in the record, divided by the geo precision (in meters).',
      }),
    geoPrecision: z
      .int()
      .min(1)
      .exactOptional()
      .openapi({ description: 'Precision used when computing the geo distance, in meters.' }),
    matchedGeoLocation: MatchedGeoLocationSchema.exactOptional(),
    personalization: PersonalizationSchema.exactOptional(),
    nbExactWords: z.int().min(0).openapi({ description: 'Number of exactly matched words.' }),
    nbTypos: z
      .int()
      .min(0)
      .openapi({ description: 'Number of typos encountered when matching the record.' }),
    promoted: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'Whether the record was promoted by a rule.' }),
    proximityDistance: z
      .int()
      .min(0)
      .exactOptional()
      .openapi({
        description:
          'Number of words between multiple matches in the query plus 1. For single word queries, `proximityDistance` is 0.',
      }),
    userScore: z
      .int()
      .openapi({
        description:
          'Overall ranking of the record, expressed as a single integer. This attribute is internal.',
      }),
    words: z.int().min(1).exactOptional().openapi({ description: 'Number of matched words.' }),
    promotedByReRanking: z
      .boolean()
      .exactOptional()
      .openapi({ description: 'Whether the record is re-ranked.' }),
  })
  .openapi({
    description: "Object with detailed information about the record's ranking.",
    required: ['nbTypos', 'firstMatchedWord', 'geoDistance', 'nbExactWords', 'userScore'],
  })
  .openapi('RankingInfo')

const DistinctSeqIDSchema = z.int().openapi('DistinctSeqID')

const HitSchema = z
  .looseObject({
    objectID: ObjectIDSchema,
    _highlightResult: HighlightResultMapSchema.exactOptional(),
    _snippetResult: SnippetResultMapSchema.exactOptional(),
    _rankingInfo: RankingInfoSchema.exactOptional(),
    _distinctSeqID: DistinctSeqIDSchema.exactOptional(),
  })
  .openapi({
    description:
      'Search result.\n\nA hit is a record from your index, augmented with special attributes for highlighting, snippeting, and ranking.\n',
    'x-is-generic': true,
    'x-is-hit-object': true,
    required: ['objectID'],
  })
  .openapi('Hit')

const QuerySchema = z
  .string()
  .default('')
  .openapi({ description: 'Search query.', 'x-categories': ['Search'] })
  .openapi('Query')

const SearchHitsSchema = z
  .looseObject({
    hits: z
      .array(HitSchema)
      .openapi({
        description:
          'Search results (hits).\n\nHits are records from your index that match the search criteria, augmented with additional attributes, such as, for highlighting.\n',
      }),
    query: QuerySchema,
    params: z
      .string()
      .openapi({
        description: 'URL-encoded string of all search parameters.',
        example: 'query=a&hitsPerPage=20',
      }),
  })
  .openapi({ required: ['hits', 'query', 'params'] })
  .openapi('SearchHits')

type SearchResponseType = z.infer<typeof BaseSearchResponseSchema> &
  z.infer<typeof SearchPaginationSchema> &
  z.infer<typeof SearchHitsSchema>

const SupportedLanguageSchema = z
  .enum([
    'af',
    'ar',
    'az',
    'bg',
    'bn',
    'ca',
    'cs',
    'cy',
    'da',
    'de',
    'el',
    'en',
    'eo',
    'es',
    'et',
    'eu',
    'fa',
    'fi',
    'fo',
    'fr',
    'ga',
    'gl',
    'he',
    'hi',
    'hu',
    'hy',
    'id',
    'is',
    'it',
    'ja',
    'ka',
    'kk',
    'ko',
    'ku',
    'ky',
    'lt',
    'lv',
    'mi',
    'mn',
    'mr',
    'ms',
    'mt',
    'nb',
    'nl',
    'no',
    'ns',
    'pl',
    'ps',
    'pt',
    'pt-br',
    'qu',
    'ro',
    'ru',
    'sk',
    'sq',
    'sv',
    'sw',
    'ta',
    'te',
    'th',
    'tl',
    'tn',
    'tr',
    'tt',
    'uk',
    'ur',
    'uz',
    'zh',
  ])
  .openapi({ description: 'ISO code for a supported language.' })
  .openapi('SupportedLanguage')

const MaxFacetHitsSchema = z
  .int()
  .max(100)
  .default(10)
  .openapi({
    description:
      'Maximum number of facet values to return when [searching for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).',
    'x-categories': ['Advanced'],
  })
  .openapi('MaxFacetHits')

const BaseIndexSettingsSchema = z
  .strictObject({
    attributesForFaceting: z
      .array(z.string())
      .default([])
      .exactOptional()
      .openapi({
        example: [
          'author',
          'filterOnly(isbn)',
          'searchable(edition)',
          'afterDistinct(category)',
          'afterDistinct(searchable(publisher))',
        ],
        description:
          'Attributes used for [faceting](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting).\n\nFacets are attributes that let you categorize search results.\nThey can be used for filtering search results.\nBy default, no attribute is used for faceting.\nAttribute names are case-sensitive.\n\n**Modifiers**\n\n- `filterOnly("ATTRIBUTE")`.\n  Allows the attribute to be used as a filter but doesn\'t evaluate the facet values.\n\n- `searchable("ATTRIBUTE")`.\n  Allows searching for facet values.\n\n- `afterDistinct("ATTRIBUTE")`.\n  Evaluates the facet count _after_ deduplication with `distinct`.\n  This ensures accurate facet counts.\n  You can apply this modifier to searchable facets: `afterDistinct(searchable(ATTRIBUTE))`.\n',
        'x-categories': ['Faceting'],
      }),
    replicas: z
      .array(z.string())
      .default([])
      .exactOptional()
      .openapi({
        example: ['virtual(prod_products_price_asc)', 'dev_products_replica'],
        description:
          'Creates [replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas).\n\nReplicas are copies of a primary index with the same records but different settings, synonyms, or rules.\nIf you want to offer a different ranking or sorting of your search results, you\'ll use replica indices.\nAll index operations on a primary index are automatically forwarded to its replicas.\nTo add a replica index, you must provide the complete set of replicas to this parameter.\nIf you omit a replica from this list, the replica turns into a regular, standalone index that will no longer be synced with the primary index.\n\n**Modifier**\n\n- `virtual("REPLICA")`.\n  Create a virtual replica,\n  Virtual replicas don\'t increase the number of records and are optimized for [Relevant sorting](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/relevant-sort).\n',
        'x-categories': ['Ranking'],
      }),
    paginationLimitedTo: z
      .int()
      .max(20000)
      .default(1000)
      .exactOptional()
      .openapi({
        example: 100,
        description:
          "Maximum number of search results that can be obtained through pagination.\n\nHigher pagination limits might slow down your search.\nFor pagination limits above 1,000, the sorting of results beyond the 1,000th hit can't be guaranteed.\n",
      }),
    unretrievableAttributes: z
      .array(z.string())
      .default([])
      .exactOptional()
      .openapi({
        example: ['total_sales'],
        description:
          "Attributes that can't be retrieved at query time.\n\nThis can be useful if you want to use an attribute for ranking or to [restrict access](https://www.algolia.com/doc/guides/security/api-keys/how-to/user-restricted-access-to-data),\nbut don't want to include it in the search results.\nAttribute names are case-sensitive.\n",
        'x-categories': ['Attributes'],
      }),
    disableTypoToleranceOnWords: z
      .array(z.string())
      .default([])
      .exactOptional()
      .openapi({
        example: ['wheel', '1X2BCD'],
        description:
          'Creates a list of [words which require exact matches](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#turn-off-typo-tolerance-for-certain-words).\nThis also turns off [word splitting and concatenation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/splitting-and-concatenation) for the specified words.\n',
        'x-categories': ['Typos'],
      }),
    attributesToTransliterate: z
      .array(z.string())
      .exactOptional()
      .openapi({
        description:
          'Attributes, for which you want to support [Japanese transliteration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#japanese-transliteration-and-type-ahead).\n\nTransliteration supports searching in any of the Japanese writing systems.\nTo support transliteration, you must set the indexing language to Japanese.\nAttribute names are case-sensitive.\n',
        example: ['name', 'description'],
        'x-categories': ['Languages'],
      }),
    camelCaseAttributes: z
      .array(z.string())
      .default([])
      .exactOptional()
      .openapi({
        example: ['description'],
        description:
          'Attributes for which to split [camel case](https://wikipedia.org/wiki/Camel_case) words.\nAttribute names are case-sensitive.\n',
        'x-categories': ['Languages'],
      }),
    decompoundedAttributes: z
      .object({})
      .default({})
      .exactOptional()
      .openapi({
        example: { de: ['name'] },
        description:
          'Searchable attributes to which Algolia should apply [word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/how-to/customize-segmentation) (decompounding).\nAttribute names are case-sensitive.\n\nCompound words are formed by combining two or more individual words,\nand are particularly prevalent in Germanic languages—for example, "firefighter".\nWith decompounding, the individual components are indexed separately.\n\nYou can specify different lists for different languages.\nDecompounding is supported for these languages:\nDutch (`nl`), German (`de`), Finnish (`fi`), Danish (`da`), Swedish (`sv`), and Norwegian (`no`).\nDecompounding doesn\'t work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark).\nFor example, `Gartenstühle` won\'t be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).\n',
        'x-categories': ['Languages'],
      }),
    indexLanguages: z
      .array(SupportedLanguageSchema)
      .default([])
      .exactOptional()
      .openapi({
        example: ['ja'],
        description:
          "Languages for language-specific processing steps, such as word detection and dictionary settings.\n\n**You should always specify an indexing language.**\nIf you don't specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations).\n",
        'x-categories': ['Languages'],
      }),
    disablePrefixOnAttributes: z
      .array(z.string())
      .default([])
      .exactOptional()
      .openapi({
        example: ['sku'],
        description:
          'Searchable attributes for which you want to turn off [prefix matching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/#adjusting-prefix-search).\nAttribute names are case-sensitive.\n',
        'x-categories': ['Query strategy'],
      }),
    allowCompressionOfIntegerArray: z
      .boolean()
      .default(false)
      .exactOptional()
      .openapi({
        description:
          'Whether arrays with exclusively non-negative integers should be compressed for better performance.\nIf true, the compressed arrays may be reordered.\n',
        'x-categories': ['Performance'],
      }),
    numericAttributesForFiltering: z
      .array(z.string())
      .default([])
      .exactOptional()
      .openapi({
        description:
          'Numeric attributes that can be used as [numerical filters](https://www.algolia.com/doc/guides/managing-results/rules/detecting-intent/how-to/applying-a-custom-filter-for-a-specific-query/#numerical-filters).\nAttribute names are case-sensitive.\n\nBy default, all numeric attributes are available as numerical filters.\nFor faster indexing, reduce the number of numeric attributes.\n\nTo turn off filtering for all numeric attributes, specify an attribute that doesn\'t exist in your index, such as `NO_NUMERIC_FILTERING`.\n\n**Modifier**\n\n- `equalOnly("ATTRIBUTE")`.\n  Support only filtering based on equality comparisons `=` and `!=`.\n',
        example: ['equalOnly(quantity)', 'popularity'],
        'x-categories': ['Performance'],
      }),
    separatorsToIndex: z
      .string()
      .default('')
      .exactOptional()
      .openapi({
        example: '+#',
        description:
          'Control which non-alphanumeric characters are indexed.\n\nBy default, Algolia ignores [non-alphanumeric characters](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes/#handling-non-alphanumeric-characters) like hyphen (`-`), plus (`+`), and parentheses (`(`,`)`).\nTo include such characters, define them with `separatorsToIndex`.\n\nSeparators are all non-letter characters except spaces and currency characters, such as $€£¥.\n\nWith `separatorsToIndex`, Algolia treats separator characters as separate words.\nFor example, in a search for "Disney+", Algolia considers "Disney" and "+" as two separate words.\n',
        'x-categories': ['Typos'],
      }),
    searchableAttributes: z
      .array(z.string())
      .default([])
      .exactOptional()
      .openapi({
        example: ['title,alternative_title', 'author', 'unordered(text)', 'emails.personal'],
        description:
          'Attributes used for searching. Attribute names are case-sensitive.\n\nBy default, all attributes are searchable and the [Attribute](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#attribute) ranking criterion is turned off.\nWith a non-empty list, Algolia only returns results with matches in the selected attributes.\nIn addition, the Attribute ranking criterion is turned on: matches in attributes that are higher in the list of `searchableAttributes` rank first.\nTo make matches in two attributes rank equally, include them in a comma-separated string, such as `"title,alternate_title"`.\nAttributes with the same priority are always unordered.\n\nFor more information, see [Searchable attributes](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/how-to/setting-searchable-attributes).\n\n**Modifier**\n\n- `unordered("ATTRIBUTE")`.\n  Ignore the position of a match within the attribute.\n\nWithout a modifier, matches at the beginning of an attribute rank higher than matches at the end.\n',
        'x-categories': ['Attributes'],
      }),
    userData: UserDataSchema.exactOptional(),
    customNormalization: z
      .record(z.string(), z.record(z.string(), z.string()))
      .exactOptional()
      .openapi({
        description:
          "Characters and their normalized replacements.\nThis overrides Algolia's default [normalization](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization).\n",
        example: { default: { ä: 'ae', ü: 'ue' } },
        'x-categories': ['Languages'],
      }),
    attributeForDistinct: z
      .string()
      .exactOptional()
      .openapi({
        description:
          'Attribute that should be used to establish groups of results.\nAttribute names are case-sensitive.\n\nAll records with the same value for this attribute are considered a group.\nYou can combine `attributeForDistinct` with the `distinct` search parameter to control\nhow many items per group are included in the search results.\n\nIf you want to use the same attribute also for faceting, use the `afterDistinct` modifier of the `attributesForFaceting` setting.\nThis applies faceting _after_ deduplication, which will result in accurate facet counts.\n',
        example: 'url',
      }),
    maxFacetHits: MaxFacetHitsSchema.exactOptional(),
    keepDiacriticsOnCharacters: z
      .string()
      .default('')
      .exactOptional()
      .openapi({
        example: 'øé',
        description:
          'Characters for which diacritics should be preserved.\n\nBy default, Algolia removes diacritics from letters.\nFor example, `é` becomes `e`. If this causes issues in your search,\nyou can specify characters that should keep their diacritics.\n',
        'x-categories': ['Languages'],
      }),
    customRanking: z
      .array(z.string())
      .default([])
      .exactOptional()
      .openapi({
        example: ['desc(popularity)', 'asc(price)'],
        description:
          'Attributes to use as [custom ranking](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking).\nAttribute names are case-sensitive.\n\nThe custom ranking attributes decide which items are shown first if the other ranking criteria are equal.\n\nRecords with missing values for your selected custom ranking attributes are always sorted last.\nBoolean attributes are sorted based on their alphabetical order.\n\n**Modifiers**\n\n- `asc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in ascending order.\n\n- `desc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in descending order.\n\nIf you use two or more custom ranking attributes,\n[reduce the precision](https://www.algolia.com/doc/guides/managing-results/must-do/custom-ranking/how-to/controlling-custom-ranking-metrics-precision) of your first attributes,\nor the other attributes will never be applied.\n',
        'x-categories': ['Ranking'],
      }),
  })
  .openapi('BaseIndexSettings')

const AttributesToRetrieveSchema = z
  .array(z.string())
  .default(['*'])
  .openapi({
    example: ['author', 'title', 'content'],
    description:
      'Attributes to include in the API response\nTo reduce the size of your response, you can retrieve only some of the attributes.\nAttribute names are case-sensitive\n- `*` retrieves all attributes, except attributes included in the `customRanking` and `unretrievableAttributes` settings.\n- To retrieve all attributes except a specific one, prefix the attribute with a dash and combine it with the `*`: `["*", "-ATTRIBUTE"]`.\n- The `objectID` attribute is always included.\n',
    'x-categories': ['Attributes'],
  })
  .openapi('AttributesToRetrieve')

const RelevancyStrictnessSchema = z
  .int()
  .default(100)
  .openapi({
    example: 90,
    description:
      "Relevancy threshold below which less relevant results aren't included in the results\nYou can only set `relevancyStrictness` on [virtual replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/in-depth/replicas/#what-are-virtual-replicas).\nUse this setting to strike a balance between the relevance and number of returned results.\n",
    'x-categories': ['Ranking'],
  })
  .openapi('RelevancyStrictness')

const AttributesToHighlightSchema = z
  .array(z.string())
  .openapi({
    example: ['author', 'title', 'conten', 'content'],
    description:
      'Attributes to highlight\nBy default, all searchable attributes are highlighted.\nUse `*` to highlight all attributes or use an empty array `[]` to turn off highlighting.\nAttribute names are case-sensitive\nWith highlighting, strings that match the search query are surrounded by HTML tags defined by `highlightPreTag` and `highlightPostTag`.\nYou can use this to visually highlight matching parts of a search query in your UI\nFor more information, see [Highlighting and snippeting](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/highlighting-snippeting/js).\n',
    'x-categories': ['Highlighting and Snippeting'],
  })
  .openapi('AttributesToHighlight')

const AttributesToSnippetSchema = z
  .array(z.string())
  .default([])
  .openapi({
    example: ['content:80', 'description'],
    description:
      'Attributes for which to enable snippets.\nAttribute names are case-sensitive\nSnippets provide additional context to matched words.\nIf you enable snippets, they include 10 words, including the matched word.\nThe matched word will also be wrapped by HTML tags for highlighting.\nYou can adjust the number of words with the following notation: `ATTRIBUTE:NUMBER`,\nwhere `NUMBER` is the number of words to be extracted.\n',
    'x-categories': ['Highlighting and Snippeting'],
  })
  .openapi('AttributesToSnippet')

const HighlightPreTagSchema = z
  .string()
  .default('<em>')
  .openapi({
    description:
      'HTML tag to insert before the highlighted parts in all highlighted results and snippets.',
    'x-categories': ['Highlighting and Snippeting'],
  })
  .openapi('HighlightPreTag')

const HighlightPostTagSchema = z
  .string()
  .default('</em>')
  .openapi({
    description:
      'HTML tag to insert after the highlighted parts in all highlighted results and snippets.',
    'x-categories': ['Highlighting and Snippeting'],
  })
  .openapi('HighlightPostTag')

const SnippetEllipsisTextSchema = z
  .string()
  .default('…')
  .openapi({
    description: 'String used as an ellipsis indicator when a snippet is truncated.',
    'x-categories': ['Highlighting and Snippeting'],
  })
  .openapi('SnippetEllipsisText')

const RestrictHighlightAndSnippetArraysSchema = z
  .boolean()
  .default(false)
  .openapi({
    description:
      'Whether to restrict highlighting and snippeting to items that at least partially matched the search query.\nBy default, all items are highlighted and snippeted.\n',
    'x-categories': ['Highlighting and Snippeting'],
  })
  .openapi('RestrictHighlightAndSnippetArrays')

const MinWordSizefor1TypoSchema = z
  .int()
  .default(4)
  .openapi({
    description:
      'Minimum number of characters a word in the search query must contain to accept matches with [one typo](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).',
    'x-categories': ['Typos'],
  })
  .openapi('MinWordSizefor1Typo')

const MinWordSizefor2TyposSchema = z
  .int()
  .default(8)
  .openapi({
    description:
      'Minimum number of characters a word in the search query must contain to accept matches with [two typos](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/in-depth/configuring-typo-tolerance/#configuring-word-length-for-typos).',
    'x-categories': ['Typos'],
  })
  .openapi('MinWordSizefor2Typos')

const TypoToleranceEnumSchema = z
  .enum(['min', 'strict', 'true', 'false'])
  .openapi({
    title: 'typo tolerance',
    description:
      '- `min`. Return matches with the lowest number of typos.\n  For example, if you have matches without typos, only include those.\n  But if there are no matches without typos (with 1 typo), include matches with 1 typo (2 typos).\n- `strict`. Return matches with the two lowest numbers of typos.\n  With `strict`, the Typo ranking criterion is applied first in the `ranking` setting.\n',
  })
  .openapi('TypoToleranceEnum')

const TypoToleranceSchema = z
  .xor([
    z
      .boolean()
      .default(true)
      .openapi({
        description:
          'Whether typo tolerance is active. If true, matches with typos are included in the search results and rank after exact matches.',
      }),
    TypoToleranceEnumSchema,
  ])
  .openapi({
    description:
      'Whether [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance) is enabled and how it is applied.\n\nIf typo tolerance is true, `min`, or `strict`, [word splitting and concatenation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/splitting-and-concatenation) are also active.\n',
    'x-categories': ['Typos'],
  })
  .openapi('TypoTolerance')

const AllowTyposOnNumericTokensSchema = z
  .boolean()
  .default(true)
  .openapi({
    description:
      'Whether to allow typos on numbers in the search query\nTurn off this setting to reduce the number of irrelevant matches\nwhen searching in large sets of similar numbers.\n',
    'x-categories': ['Typos'],
  })
  .openapi('AllowTyposOnNumericTokens')

const DisableTypoToleranceOnAttributesSchema = z
  .array(z.string())
  .default([])
  .openapi({
    example: ['sku'],
    description:
      'Attributes for which you want to turn off [typo tolerance](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance).\nAttribute names are case-sensitive\nReturning only exact matches can help when\n- [Searching in hyphenated attributes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/typo-tolerance/how-to/how-to-search-in-hyphenated-attributes).\n- Reducing the number of matches when you have too many.\n  This can happen with attributes that are long blocks of text, such as product descriptions\nConsider alternatives such as `disableTypoToleranceOnWords` or adding synonyms if your attributes have intentional unusual spellings that might look like typos.\n',
    'x-categories': ['Typos'],
  })
  .openapi('DisableTypoToleranceOnAttributes')

const BooleanStringSchema = z.enum(['true', 'false']).openapi('BooleanString')

const IgnorePluralsSchema = z
  .xor([
    z
      .array(SupportedLanguageSchema)
      .openapi({
        description:
          'ISO code for languages for which this feature should be active.\nThis overrides languages you set with `queryLanguages`.\n',
      }),
    BooleanStringSchema,
    z
      .boolean()
      .default(false)
      .openapi({
        description:
          "If true, `ignorePlurals` is active for all languages included in `queryLanguages`, or for all supported languages, if `queryLanguges` is empty.\nIf false, singulars, plurals, and other declensions won't be considered equivalent.\n",
      }),
  ])
  .openapi({
    description:
      'Treat singular, plurals, and other forms of declensions as equivalent.\nYou should only use this feature for the languages used in your index.\n',
    example: ['ca', 'es'],
    'x-categories': ['Languages'],
  })
  .openapi('IgnorePlurals')

const RemoveStopWordsSchema = z
  .xor([
    z
      .array(SupportedLanguageSchema)
      .openapi({
        description:
          'ISO code for languages for which stop words should be removed. This overrides languages you set in `queryLanguges`.',
      }),
    z
      .boolean()
      .default(false)
      .openapi({
        description:
          'If true, stop words are removed for all languages you included in `queryLanguages`, or for all supported languages, if `queryLanguages` is empty.\nIf false, stop words are not removed.\n',
      }),
  ])
  .openapi({
    description:
      'Removes stop words from the search query.\n\nStop words are common words like articles, conjunctions, prepositions, or pronouns that have little or no meaning on their own.\nIn English, "the", "a", or "and" are stop words.\n\nYou should only use this feature for the languages used in your index.\n',
    example: ['ca', 'es'],
    'x-categories': ['Languages'],
  })
  .openapi('RemoveStopWords')

const QueryLanguagesSchema = z
  .array(SupportedLanguageSchema)
  .default([])
  .openapi({
    example: ['es'],
    description:
      "Languages for language-specific query processing steps such as plurals, stop-word removal, and word-detection dictionaries \nThis setting sets a default list of languages used by the `removeStopWords` and `ignorePlurals` settings.\nThis setting also sets a dictionary for word detection in the logogram-based [CJK](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/normalization/#normalization-for-logogram-based-languages-cjk) languages.\nTo support this, you must place the CJK language **first** \n**You should always specify a query language.**\nIf you don't specify an indexing language, the search engine uses all [supported languages](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages),\nor the languages you specified with the `ignorePlurals` or `removeStopWords` parameters.\nThis can lead to unexpected search results.\nFor more information, see [Language-specific configuration](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations).\n",
    'x-categories': ['Languages'],
  })
  .openapi('QueryLanguages')

const DecompoundQuerySchema = z
  .boolean()
  .default(true)
  .openapi({
    description:
      "Whether to split compound words in the query into their building blocks\nFor more information, see [Word segmentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/language-specific-configurations/#splitting-compound-words).\nWord segmentation is supported for these languages: German, Dutch, Finnish, Swedish, and Norwegian.\nDecompounding doesn't work for words with [non-spacing mark Unicode characters](https://www.charactercodes.net/category/non-spacing_mark).\nFor example, `Gartenstühle` won't be decompounded if the `ü` consists of `u` (U+0075) and `◌̈` (U+0308).\n",
    'x-categories': ['Languages'],
  })
  .openapi('DecompoundQuery')

const EnableRulesSchema = z
  .boolean()
  .default(true)
  .openapi({ description: 'Whether to enable rules.', 'x-categories': ['Rules'] })
  .openapi('EnableRules')

const EnablePersonalizationSchema = z
  .boolean()
  .default(false)
  .openapi({
    description: 'Whether to enable Personalization.',
    'x-categories': ['Personalization'],
  })
  .openapi('EnablePersonalization')

const QueryTypeSchema = z
  .enum(['prefixLast', 'prefixAll', 'prefixNone'])
  .default('prefixLast')
  .openapi({
    description:
      'Determines if and how query words are interpreted as prefixes.\n\nBy default, only the last query word is treated as a prefix (`prefixLast`).\nTo turn off prefix search, use `prefixNone`.\nAvoid `prefixAll`, which treats all query words as prefixes.\nThis might lead to counterintuitive results and makes your search slower.\n\nFor more information, see [Prefix searching](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/prefix-searching).\n',
    'x-categories': ['Query strategy'],
  })
  .openapi('QueryType')

const RemoveWordsIfNoResultsSchema = z
  .enum(['none', 'lastWords', 'firstWords', 'allOptional'])
  .default('none')
  .openapi({
    example: 'firstWords',
    description:
      "Strategy for removing words from the query when it doesn't return any results.\nThis helps to avoid returning empty search results.\n\n- `none`.\n  No words are removed when a query doesn't return results.\n\n- `lastWords`.\n  Treat the last (then second to last, then third to last) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `firstWords`.\n  Treat the first (then second, then third) word as optional,\n  until there are results or at most 5 words have been removed.\n\n- `allOptional`.\n  Treat all words as optional.\n\nFor more information, see [Remove words to improve results](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/in-depth/why-use-remove-words-if-no-results).\n",
    'x-categories': ['Query strategy'],
  })
  .openapi('RemoveWordsIfNoResults')

const ModeSchema = z
  .enum(['neuralSearch', 'keywordSearch'])
  .default('keywordSearch')
  .openapi({
    description:
      'Search mode the index will use to query for results.\n\nThis setting only applies to indices, for which Algolia enabled NeuralSearch for you.\n',
    'x-categories': ['Query strategy'],
  })
  .openapi('Mode')

const SemanticSearchSchema = z
  .object({
    eventSources: z
      .xor([
        z
          .array(z.string())
          .openapi({
            description:
              'Indices from which to collect click and conversion events.\n\nIf null, the current index and all its replicas are used.\n',
          }),
        z.null().nullable(),
      ])
      .exactOptional(),
  })
  .openapi({
    description:
      'Settings for the semantic search part of NeuralSearch.\nOnly used when `mode` is `neuralSearch`.\n',
  })
  .openapi('SemanticSearch')

const AdvancedSyntaxSchema = z
  .boolean()
  .default(false)
  .openapi({
    description:
      'Whether to support phrase matching and excluding words from search queries\nUse the `advancedSyntaxFeatures` parameter to control which feature is supported.\n',
    'x-categories': ['Query strategy'],
  })
  .openapi('AdvancedSyntax')

const OptionalWordsArraySchema = z
  .array(z.string())
  .default([])
  .openapi({
    example: ['blue', 'iphone case'],
    description:
      'List of [optional words](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/#creating-a-list-of-optional-words).',
    'x-categories': ['Query strategy'],
  })
  .openapi('OptionalWordsArray')

const OptionalWordsSchema = z
  .xor([z.string(), z.null().nullable(), OptionalWordsArraySchema])
  .openapi({
    description:
      'Words that should be considered optional when found in the query.\n\nBy default, records must match all words in the search query to be included in the search results.\nAdding optional words can help to increase the number of search results by running an additional search query that doesn\'t include the optional words.\nFor example, if the search query is "action video" and "video" is an optional word,\nthe search engine runs two queries. One for "action video" and one for "action".\nRecords that match all words are ranked higher.\n\nFor a search query with 4 or more words **and** all its words are optional,\nthe number of matched words required for a record to be included in the search results increases for every 1,000 records:\n\n- If `optionalWords` has less than 10 words, the required number of matched words increases by 1:\n  results 1 to 1,000 require 1 matched word, results 1,001 to 2000 need 2 matched words.\n- If `optionalWords` has 10 or more words, the number of required matched words increases by the number of optional words divided by 5 (rounded down).\n  For example, with 18 optional words: results 1 to 1,000 require 1 matched word, results 1,001 to 2000 need 4 matched words.\n\nFor more information, see [Optional words](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/empty-or-insufficient-results/#creating-a-list-of-optional-words).\n',
  })
  .openapi('OptionalWords')

const DisableExactOnAttributesSchema = z
  .array(z.string())
  .default([])
  .openapi({
    example: ['description'],
    description:
      'Searchable attributes for which you want to [turn off the Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes).\nAttribute names are case-sensitive\nThis can be useful for attributes with long values, where the likelihood of an exact match is high,\nsuch as product descriptions.\nTurning off the Exact ranking criterion for these attributes favors exact matching on other attributes.\nThis reduces the impact of individual attributes with a lot of content on ranking.\n',
    'x-categories': ['Query strategy'],
  })
  .openapi('DisableExactOnAttributes')

const ExactOnSingleWordQuerySchema = z
  .enum(['attribute', 'none', 'word'])
  .default('attribute')
  .openapi({
    description:
      'Determines how the [Exact ranking criterion](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/override-search-engine-defaults/in-depth/adjust-exact-settings/#turn-off-exact-for-some-attributes) is computed when the search query has only one word.\n\n- `attribute`.\n  The Exact ranking criterion is 1 if the query word and attribute value are the same.\n  For example, a search for "road" will match the value "road", but not "road trip".\n\n- `none`.\n  The Exact ranking criterion is ignored on single-word searches.\n\n- `word`.\n  The Exact ranking criterion is 1 if the query word is found in the attribute value.\n  The query word must have at least 3 characters and must not be a stop word.\n  Only exact matches will be highlighted,\n  partial and prefix matches won\'t.\n',
    'x-categories': ['Query strategy'],
  })
  .openapi('ExactOnSingleWordQuery')

const AlternativesAsExactSchema = z
  .enum(['ignorePlurals', 'singleWordSynonym', 'multiWordsSynonym', 'ignoreConjugations'])
  .openapi({ 'x-categories': ['Query strategy'] })
  .openapi('AlternativesAsExact')

const IndexSettingsAlternativesAsExactSchema = z
  .array(AlternativesAsExactSchema)
  .default(['ignorePlurals', 'singleWordSynonym'])
  .openapi({
    description:
      'Determine which plurals and synonyms should be considered an exact matches\nBy default, Algolia treats singular and plural forms of a word, and single-word synonyms, as [exact](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#exact) matches when searching.\nFor example\n- "swimsuit" and "swimsuits" are treated the same\n- "swimsuit" and "swimwear" are treated the same (if they are [synonyms](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/#regular-synonyms))\n- `ignorePlurals`.\n  Plurals and similar declensions added by the `ignorePlurals` setting are considered exact matches\n- `singleWordSynonym`.\n  Single-word synonyms, such as "NY" = "NYC", are considered exact matches\n- `multiWordsSynonym`.\n  Multi-word synonyms, such as "NY" = "New York", are considered exact matches.\n',
    'x-categories': ['Query strategy'],
  })
  .openapi('IndexSettingsAlternativesAsExact')

const AdvancedSyntaxFeaturesSchema = z
  .enum(['exactPhrase', 'excludeWords'])
  .openapi({ 'x-categories': ['Query strategy'] })
  .openapi('AdvancedSyntaxFeatures')

const IndexSettingsAdvancedSyntaxFeaturesSchema = z
  .array(AdvancedSyntaxFeaturesSchema)
  .default(['exactPhrase', 'excludeWords'])
  .openapi({
    description:
      'Advanced search syntax features you want to support\n- `exactPhrase`.\n  Phrases in quotes must match exactly.\n  For example, `sparkly blue "iPhone case"` only returns records with the exact string "iPhone case"\n- `excludeWords`.\n  Query words prefixed with a `-` must not occur in a record.\n  For example, `search -engine` matches records that contain "search" but not "engine"\nThis setting only has an effect if `advancedSyntax` is true.\n',
    'x-categories': ['Query strategy'],
  })
  .openapi('IndexSettingsAdvancedSyntaxFeatures')

const DistinctSchema = z
  .xor([
    z
      .boolean()
      .openapi({
        description:
          'Whether deduplication is turned on. If true, only one member of a group is shown in the search results.',
      }),
    z
      .int()
      .min(0)
      .max(4)
      .default(0)
      .openapi({
        description:
          "Number of members of a group of records to include in the search results.\n\n- Don't use `distinct > 1` for records that might be [promoted by rules](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/promote-hits).\n  The number of hits won't be correct and faceting won't work as expected.\n- With `distinct > 1`, the `hitsPerPage` parameter controls the number of returned groups.\n  For example, with `hitsPerPage: 10` and `distinct: 2`, up to 20 records are returned.\n  Likewise, the `nbHits` response attribute contains the number of returned groups.\n",
      }),
  ])
  .openapi({
    description:
      'Determines how many records of a group are included in the search results.\n\nRecords with the same value for the `attributeForDistinct` attribute are considered a group.\nThe `distinct` setting controls how many members of the group are returned.\nThis is useful for [deduplication and grouping](https://www.algolia.com/doc/guides/managing-results/refine-results/grouping/#introducing-algolias-distinct-feature).\n\nThe `distinct` setting is ignored if `attributeForDistinct` is not set.\n',
    example: 1,
    'x-categories': ['Advanced'],
  })
  .openapi('Distinct')

const ReplaceSynonymsInHighlightSchema = z
  .boolean()
  .default(false)
  .openapi({
    description:
      'Whether to replace a highlighted word with the matched synonym\nBy default, the original words are highlighted even if a synonym matches.\nFor example, with `home` as a synonym for `house` and a search for `home`,\nrecords matching either "home" or "house" are included in the search results,\nand either "home" or "house" are highlighted\nWith `replaceSynonymsInHighlight` set to `true`, a search for `home` still matches the same records,\nbut all occurrences of "house" are replaced by "home" in the highlighted response.\n',
    'x-categories': ['Highlighting and Snippeting'],
  })
  .openapi('ReplaceSynonymsInHighlight')

const MinProximitySchema = z
  .int()
  .min(1)
  .max(7)
  .default(1)
  .openapi({
    description:
      'Minimum proximity score for two matching words\nThis adjusts the [Proximity ranking criterion](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria/#proximity)\nby equally scoring matches that are farther apart\nFor example, if `minProximity` is 2, neighboring matches and matches with one word between them would have the same score.\n',
    'x-categories': ['Advanced'],
  })
  .openapi('MinProximity')

const ResponseFieldsSchema = z
  .array(z.string())
  .default(['*'])
  .openapi({
    description:
      "Properties to include in the API response of search and browse requests\nBy default, all response properties are included.\nTo reduce the response size, you can select which properties should be included\nAn empty list may lead to an empty API response (except properties you can't exclude)\nYou can't exclude these properties:\n`message`, `warning`, `cursor`, `abTestVariantID`,\nor any property added by setting `getRankingInfo` to true\nYour search depends on the `hits` field. If you omit this field, searches won't return any results.\nYour UI might also depend on other properties, for example, for pagination.\nBefore restricting the response size, check the impact on your search experience.\n",
    'x-categories': ['Advanced'],
  })
  .openapi('ResponseFields')

const MaxValuesPerFacetSchema = z
  .int()
  .max(1000)
  .default(100)
  .openapi({
    description: 'Maximum number of facet values to return for each facet.',
    'x-categories': ['Faceting'],
  })
  .openapi('MaxValuesPerFacet')

const SortFacetValuesBySchema = z
  .string()
  .default('count')
  .openapi({
    description:
      "Order in which to retrieve facet values\n- `count`.\n  Facet values are retrieved by decreasing count.\n  The count is the number of matching records containing this facet value\n- `alpha`.\n  Retrieve facet values alphabetically\nThis setting doesn't influence how facet values are displayed in your UI (see `renderingContent`).\nFor more information, see [facet value display](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/facet-display/js).\n",
    'x-categories': ['Faceting'],
  })
  .openapi('SortFacetValuesBy')

const AttributeCriteriaComputedByMinProximitySchema = z
  .boolean()
  .default(false)
  .openapi({
    description:
      'Whether the best matching attribute should be determined by minimum proximity\nThis setting only affects ranking if the Attribute ranking criterion comes before Proximity in the `ranking` setting.\nIf true, the best matching attribute is selected based on the minimum proximity of multiple matches.\nOtherwise, the best matching attribute is determined by the order in the `searchableAttributes` setting.\n',
    'x-categories': ['Advanced'],
  })
  .openapi('AttributeCriteriaComputedByMinProximity')

const EnableReRankingSchema = z
  .boolean()
  .default(true)
  .openapi({
    description:
      'Whether this search will use [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking)\nThis setting only has an effect if you activated Dynamic Re-Ranking for this index in the Algolia dashboard.\n',
    'x-categories': ['Filtering'],
  })
  .openapi('EnableReRanking')

const ReRankingApplyFilterSchema: z.ZodType<ReRankingApplyFilterType> = z
  .lazy(() =>
    z
      .xor([
        z.array(ReRankingApplyFilterSchema),
        z.string().openapi({ 'x-categories': ['Filtering'] }),
      ])
      .openapi({
        description:
          'Restrict [Dynamic Re-Ranking](https://www.algolia.com/doc/guides/algolia-ai/re-ranking) to records that match these filters.\n',
      }),
  )
  .openapi('ReRankingApplyFilter')

const IndexSettingsAsSearchParamsSchema = z
  .strictObject({
    attributesToRetrieve: AttributesToRetrieveSchema.exactOptional(),
    ranking: z
      .array(z.string())
      .default(['typo', 'geo', 'words', 'filters', 'proximity', 'attribute', 'exact', 'custom'])
      .exactOptional()
      .openapi({
        description:
          'Determines the order in which Algolia returns your results.\n\nBy default, each entry corresponds to a [ranking criteria](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria).\nThe tie-breaking algorithm sequentially applies each criterion in the order they\'re specified.\nIf you configure a replica index for [sorting by an attribute](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-by-attribute),\nyou put the sorting attribute at the top of the list.\n\n**Modifiers**\n\n- `asc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in ascending order.\n- `desc("ATTRIBUTE")`.\n  Sort the index by the values of an attribute, in descending order.\n\nBefore you modify the default setting,\nyou should test your changes in the dashboard,\nand by [A/B testing](https://www.algolia.com/doc/guides/ab-testing/what-is-ab-testing).\n',
        'x-categories': ['Ranking'],
      }),
    relevancyStrictness: RelevancyStrictnessSchema.exactOptional(),
    attributesToHighlight: AttributesToHighlightSchema.exactOptional(),
    attributesToSnippet: AttributesToSnippetSchema.exactOptional(),
    highlightPreTag: HighlightPreTagSchema.exactOptional(),
    highlightPostTag: HighlightPostTagSchema.exactOptional(),
    snippetEllipsisText: SnippetEllipsisTextSchema.exactOptional(),
    restrictHighlightAndSnippetArrays: RestrictHighlightAndSnippetArraysSchema.exactOptional(),
    hitsPerPage: HitsPerPageSchema.exactOptional(),
    minWordSizefor1Typo: MinWordSizefor1TypoSchema.exactOptional(),
    minWordSizefor2Typos: MinWordSizefor2TyposSchema.exactOptional(),
    typoTolerance: TypoToleranceSchema.exactOptional(),
    allowTyposOnNumericTokens: AllowTyposOnNumericTokensSchema.exactOptional(),
    disableTypoToleranceOnAttributes: DisableTypoToleranceOnAttributesSchema.exactOptional(),
    ignorePlurals: IgnorePluralsSchema.exactOptional(),
    removeStopWords: RemoveStopWordsSchema.exactOptional(),
    queryLanguages: QueryLanguagesSchema.exactOptional(),
    decompoundQuery: DecompoundQuerySchema.exactOptional(),
    enableRules: EnableRulesSchema.exactOptional(),
    enablePersonalization: EnablePersonalizationSchema.exactOptional(),
    queryType: QueryTypeSchema.exactOptional(),
    removeWordsIfNoResults: RemoveWordsIfNoResultsSchema.exactOptional(),
    mode: ModeSchema.exactOptional(),
    semanticSearch: SemanticSearchSchema.exactOptional(),
    advancedSyntax: AdvancedSyntaxSchema.exactOptional(),
    optionalWords: OptionalWordsSchema.exactOptional(),
    disableExactOnAttributes: DisableExactOnAttributesSchema.exactOptional(),
    exactOnSingleWordQuery: ExactOnSingleWordQuerySchema.exactOptional(),
    alternativesAsExact: IndexSettingsAlternativesAsExactSchema.exactOptional(),
    advancedSyntaxFeatures: IndexSettingsAdvancedSyntaxFeaturesSchema.exactOptional(),
    distinct: DistinctSchema.exactOptional(),
    replaceSynonymsInHighlight: ReplaceSynonymsInHighlightSchema.exactOptional(),
    minProximity: MinProximitySchema.exactOptional(),
    responseFields: ResponseFieldsSchema.exactOptional(),
    maxValuesPerFacet: MaxValuesPerFacetSchema.exactOptional(),
    sortFacetValuesBy: SortFacetValuesBySchema.exactOptional(),
    attributeCriteriaComputedByMinProximity:
      AttributeCriteriaComputedByMinProximitySchema.exactOptional(),
    renderingContent: RenderingContentSchema.exactOptional(),
    enableReRanking: EnableReRankingSchema.exactOptional(),
    reRankingApplyFilter: z.xor([ReRankingApplyFilterSchema, z.null().nullable()]).exactOptional(),
  })
  .openapi('IndexSettingsAsSearchParams')

type IndexSettingsType = z.infer<typeof BaseIndexSettingsSchema> &
  z.infer<typeof IndexSettingsAsSearchParamsSchema>

const KeyStringSchema = z
  .string()
  .openapi({ description: 'API key.', example: '13ad45b4d0a2f6ea65ecbddf6aa260f2' })
  .openapi('KeyString')

const CreatedAtTimestampSchema = z
  .int64()
  .openapi({
    example: 1656345570000,
    description: 'Timestamp when the object was created, in milliseconds since the Unix epoch.',
  })
  .openapi('CreatedAtTimestamp')

const BaseGetApiKeyResponseSchema = z
  .strictObject({ value: KeyStringSchema, createdAt: CreatedAtTimestampSchema })
  .openapi({ required: ['value', 'createdAt'] })
  .openapi('BaseGetApiKeyResponse')

const AclSchema = z
  .enum([
    'addObject',
    'analytics',
    'browse',
    'deleteObject',
    'deleteIndex',
    'editSettings',
    'inference',
    'listIndexes',
    'logs',
    'personalization',
    'recommendation',
    'search',
    'seeUnretrievableAttributes',
    'settings',
    'usage',
    'nluWriteProject',
    'nluReadProject',
    'nluWriteEntity',
    'nluReadEntity',
    'nluWriteIntent',
    'nluReadIntent',
    'nluPrediction',
    'nluReadAnswers',
  ])
  .openapi({ description: 'Access control list permissions.' })
  .openapi('Acl')

const ApiKeySchema = z
  .strictObject({
    acl: z
      .array(AclSchema)
      .default([])
      .openapi({
        description:
          "Permissions that determine the type of API requests this key can make.\nThe required ACL is listed in each endpoint's reference.\nFor more information, see [access control list](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).\n",
        example: ['search', 'addObject'],
      }),
    description: z
      .string()
      .default('')
      .exactOptional()
      .openapi({
        description: 'Description of an API key to help you identify this API key.',
        example: 'Used for indexing by the CLI',
      }),
    indexes: z
      .array(z.string())
      .default([])
      .exactOptional()
      .openapi({
        description:
          'Index names or patterns that this API key can access.\nBy default, an API key can access all indices in the same application.\n\nYou can use leading and trailing wildcard characters (`*`):\n\n- `dev_*` matches all indices starting with "dev_".\n- `*_dev` matches all indices ending with "_dev".\n- `*_products_*` matches all indices containing "_products_".\n',
        example: ['dev_*', 'prod_en_products'],
      }),
    maxHitsPerQuery: z
      .int()
      .default(0)
      .exactOptional()
      .openapi({
        description:
          "Maximum number of results this API key can retrieve in one query.\nBy default, there's no limit.\n",
      }),
    maxQueriesPerIPPerHour: z
      .int()
      .default(0)
      .exactOptional()
      .openapi({
        description:
          "Maximum number of API requests allowed per IP address or [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken) per hour.\n\nIf this limit is reached, the API returns an error with status code `429`.\nBy default, there's no limit.\n",
      }),
    queryParameters: z
      .string()
      .default('')
      .exactOptional()
      .openapi({
        description:
          'Query parameters to add when making API requests with this API key.\n\nTo restrict this API key to specific IP addresses, add the `restrictSources` parameter.\nYou can only add a single source, but you can provide a range of IP addresses.\n\nCreating an API key fails if the request is made from an IP address outside the restricted range.\n',
        example: 'typoTolerance=strict&restrictSources=192.168.1.0/24',
      }),
    referers: z
      .array(z.string())
      .default([])
      .exactOptional()
      .openapi({
        description:
          'Allowed HTTP referrers for this API key.\n\nBy default, all referrers are allowed.\nYou can use leading and trailing wildcard characters (`*`):\n\n- `https://algolia.com/*` allows all referrers starting with "https://algolia.com/"\n- `*.algolia.com` allows all referrers ending with ".algolia.com"\n- `*algolia.com*` allows all referrers in the domain "algolia.com".\n\nLike all HTTP headers, referrers can be spoofed. Don\'t rely on them to secure your data.\nFor more information, see [HTTP referrer restrictions](https://www.algolia.com/doc/guides/security/security-best-practices/#http-referrers-restrictions).\n',
        example: ['*algolia.com*'],
      }),
    validity: z
      .int()
      .default(0)
      .exactOptional()
      .openapi({
        description:
          "Duration (in seconds) after which the API key expires.\nBy default, API keys don't expire.\n",
        example: 86400,
      }),
  })
  .openapi({ description: 'API key object.', required: ['acl'] })
  .openapi('ApiKey')

type GetApiKeyResponseType = z.infer<typeof BaseGetApiKeyResponseSchema> &
  z.infer<typeof ApiKeySchema>

const BuiltInOperationTypeSchema = z
  .enum(['Increment', 'Decrement', 'Add', 'Remove', 'AddUnique', 'IncrementFrom', 'IncrementSet'])
  .openapi({ description: 'How to change the attribute.' })
  .openapi('BuiltInOperationType')

const BuiltInOperationValueSchema = z
  .xor([
    z
      .string()
      .openapi({
        description:
          'A string to append or remove for the `Add`, `Remove`, and `AddUnique` operations.',
      }),
    z
      .int()
      .openapi({ description: 'A number to add, remove, or append, depending on the operation.' }),
  ])
  .openapi('BuiltInOperationValue')

const BuiltInOperationSchema = z
  .strictObject({ _operation: BuiltInOperationTypeSchema, value: BuiltInOperationValueSchema })
  .openapi({
    description: 'Update to perform on the attribute.',
    required: ['_operation', 'value'],
  })
  .openapi('BuiltInOperation')

const AttributeToUpdateSchema = z
  .xor([z.string(), BuiltInOperationSchema])
  .openapi({ 'x-keep-model': true, deprecated: true })
  .openapi('AttributeToUpdate')

const ErrorBaseSchema = z
  .looseObject({
    message: z.string().exactOptional().openapi({ example: 'Invalid Application-Id or API-Key' }),
  })
  .openapi({ description: 'Error.', 'x-keep-model': true })
  .openapi('ErrorBase')

const ParamsAsStringSchema = z
  .string()
  .default('')
  .openapi({
    description: 'Search parameters as a URL-encoded query string.',
    example: 'hitsPerPage=2&getRankingInfo=1',
  })
  .openapi('ParamsAsString')

const SearchParamsStringSchema = z
  .strictObject({ params: ParamsAsStringSchema.exactOptional() })
  .openapi({
    title: 'Search parameters as query string',
    description: 'Search parameters as query string.',
    'x-discriminator-fields': ['params'],
  })
  .openapi('SearchParamsString')

const SearchParamsQuerySchema = z
  .strictObject({ query: QuerySchema.exactOptional() })
  .openapi('SearchParamsQuery')

const SimilarQuerySchema = z
  .string()
  .default('')
  .openapi({
    description:
      'Keywords to be used instead of the search query to conduct a more broader search\nUsing the `similarQuery` parameter changes other settings\n- `queryType` is set to `prefixNone`.\n- `removeStopWords` is set to true.\n- `words` is set as the first ranking criterion.\n- All remaining words are treated as `optionalWords`\nSince the `similarQuery` is supposed to do a broad search, they usually return many results.\nCombine it with `filters` to narrow down the list of results.\n',
    example: 'comedy drama crime Macy Buscemi',
    'x-categories': ['Search'],
  })
  .openapi('SimilarQuery')

const FiltersSchema = z
  .string()
  .openapi({
    description:
      "Filter expression to only include items that match the filter criteria in the response.\n\nYou can use these filter expressions:\n\n- **Numeric filters.** `<facet> <op> <number>`, where `<op>` is one of `<`, `<=`, `=`, `!=`, `>`, `>=`.\n- **Ranges.** `<facet>:<lower> TO <upper>` where `<lower>` and `<upper>` are the lower and upper limits of the range (inclusive).\n- **Facet filters.** `<facet>:<value>` where `<facet>` is a facet attribute (case-sensitive) and `<value>` a facet value.\n- **Tag filters.** `_tags:<value>` or just `<value>` (case-sensitive).\n- **Boolean filters.** `<facet>: true | false`.\n\nYou can combine filters with `AND`, `OR`, and `NOT` operators with the following restrictions:\n\n- You can only combine filters of the same type with `OR`.\n  **Not supported:** `facet:value OR num > 3`.\n- You can't use `NOT` with combinations of filters.\n  **Not supported:** `NOT(facet:value OR facet:value)`\n- You can't combine conjunctions (`AND`) with `OR`.\n  **Not supported:** `facet:value OR (facet:value AND facet:value)`\n\nUse quotes around your filters, if the facet attribute name or facet value has spaces, keywords (`OR`, `AND`, `NOT`), or quotes.\nIf a facet attribute is an array, the filter matches if it matches at least one element of the array.\n\nFor more information, see [Filters](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering).\n",
    example: '(category:Book OR category:Ebook) AND _tags:published',
    'x-categories': ['Filtering'],
  })
  .openapi('Filters')

const FacetFiltersSchema: z.ZodType<FacetFiltersType> = z
  .lazy(() =>
    z
      .xor([z.array(FacetFiltersSchema), z.string()])
      .openapi({
        description:
          "Filter the search by facet values, so that only records with the same facet values are retrieved.\n\n**Prefer using the `filters` parameter, which supports all filter types and combinations with boolean operators.**\n\n- `[filter1, filter2]` is interpreted as `filter1 AND filter2`.\n- `[[filter1, filter2], filter3]` is interpreted as `filter1 OR filter2 AND filter3`.\n- `facet:-value` is interpreted as `NOT facet:value`.\n\nWhile it's best to avoid attributes that start with a `-`, you can still filter them by escaping with a backslash:\n`facet:\\-value`.\n",
        example: [['category:Book', 'category:-Movie'], 'author:John Doe'],
        'x-categories': ['Filtering'],
      }),
  )
  .openapi('FacetFilters')

const OptionalFiltersSchema: z.ZodType<OptionalFiltersType> = z
  .lazy(() =>
    z
      .xor([z.array(OptionalFiltersSchema), z.string()])
      .openapi({
        description:
          "Filters to promote or demote records in the search results.\n\nOptional filters work like facet filters, but they don't exclude records from the search results.\nRecords that match the optional filter rank before records that don't match.\nIf you're using a negative filter `facet:-value`, matching records rank after records that don't match.\n\n- Optional filters don't work on virtual replicas.\n- Optional filters are applied _after_ sort-by attributes.\n- Optional filters are applied _before_ custom ranking attributes (in the default [ranking](https://www.algolia.com/doc/guides/managing-results/relevance-overview/in-depth/ranking-criteria)).\n- Optional filters don't work with numeric attributes.\n",
        example: ['category:Book', 'author:John Doe'],
        'x-categories': ['Filtering'],
      }),
  )
  .openapi('OptionalFilters')

const NumericFiltersSchema: z.ZodType<NumericFiltersType> = z
  .lazy(() =>
    z
      .xor([z.array(NumericFiltersSchema), z.string()])
      .openapi({
        description:
          'Filter by numeric facets.\n\n**Prefer using the `filters` parameter, which supports all filter types and combinations with boolean operators.**\n\nYou can use numeric comparison operators: `<`, `<=`, `=`, `!=`, `>`, `>=`.\nComparisons are precise up to 3 decimals.\nYou can also provide ranges: `facet:<lower> TO <upper>`. The range includes the lower and upper boundaries.\nThe same combination rules apply as for `facetFilters`.\n',
        example: [['inStock = 1', 'deliveryDate < 1441755506'], 'price < 1000'],
        'x-categories': ['Filtering'],
      }),
  )
  .openapi('NumericFilters')

const TagFiltersSchema: z.ZodType<TagFiltersType> = z
  .lazy(() =>
    z
      .xor([z.array(TagFiltersSchema), z.string()])
      .openapi({
        description:
          "Filter the search by values of the special `_tags` attribute.\n\n**Prefer using the `filters` parameter, which supports all filter types and combinations with boolean operators.**\n\nDifferent from regular facets, `_tags` can only be used for filtering (including or excluding records).\nYou won't get a facet count.\nThe same combination and escaping rules apply as for `facetFilters`.\n",
        example: [['Book', 'Movie'], 'SciFi'],
        'x-categories': ['Filtering'],
      }),
  )
  .openapi('TagFilters')

const SumOrFiltersScoresSchema = z
  .boolean()
  .default(false)
  .openapi({
    description:
      'Whether to sum all filter scores\nIf true, all filter scores are summed.\nOtherwise, the maximum filter score is kept.\nFor more information, see [filter scores](https://www.algolia.com/doc/guides/managing-results/refine-results/filtering/in-depth/filter-scoring/#accumulating-scores-with-sumorfiltersscores).\n',
    'x-categories': ['Filtering'],
  })
  .openapi('SumOrFiltersScores')

const RestrictSearchableAttributesSchema = z
  .array(z.string())
  .default([])
  .openapi({
    example: ['title', 'author'],
    description:
      'Restricts a search to a subset of your searchable attributes.\nAttribute names are case-sensitive.\n',
    'x-categories': ['Filtering'],
  })
  .openapi('RestrictSearchableAttributes')

const FacetingAfterDistinctSchema = z
  .boolean()
  .default(false)
  .openapi({
    description:
      "Whether faceting should be applied after deduplication with `distinct`\nThis leads to accurate facet counts when using faceting in combination with `distinct`.\nIt's usually better to use `afterDistinct` modifiers in the `attributesForFaceting` setting,\nas `facetingAfterDistinct` only computes correct facet counts if all records have the same facet values for the `attributeForDistinct`.\n",
    'x-categories': ['Faceting'],
  })
  .openapi('FacetingAfterDistinct')

const LengthSchema = z
  .int()
  .min(0)
  .max(1000)
  .openapi({
    description: 'Number of hits to retrieve (used in combination with `offset`).',
    'x-categories': ['Pagination'],
  })
  .openapi('Length')

const AroundLatLngSchema = z
  .string()
  .default('')
  .openapi({
    description:
      'Coordinates for the center of a circle, expressed as a comma-separated string of latitude and longitude.\n\nOnly records included within a circle around this central location are included in the results.\nThe radius of the circle is determined by the `aroundRadius` and `minimumAroundRadius` settings.\nThis parameter is ignored if you also specify `insidePolygon` or `insideBoundingBox`.\n',
    example: '40.71,-74.01',
    'x-categories': ['Geo-Search'],
  })
  .openapi('AroundLatLng')

const AroundLatLngViaIPSchema = z
  .boolean()
  .default(false)
  .openapi({
    description: "Whether to obtain the coordinates from the request's IP address.",
    'x-categories': ['Geo-Search'],
  })
  .openapi('AroundLatLngViaIP')

const AroundRadiusAllSchema = z
  .literal('all')
  .openapi({
    title: 'all',
    description: "Return all records with a valid `_geoloc` attribute. Don't filter by distance.",
  })
  .openapi('AroundRadiusAll')

const AroundRadiusSchema = z
  .xor([
    z
      .int()
      .min(1)
      .openapi({ description: 'Maximum search radius around a central location in meters.' }),
    AroundRadiusAllSchema,
  ])
  .openapi({
    description:
      'Maximum radius for a search around a central location.\n\nThis parameter works in combination with the `aroundLatLng` and `aroundLatLngViaIP` parameters.\nBy default, the search radius is determined automatically from the density of hits around the central location.\nThe search radius is small if there are many hits close to the central coordinates.\n',
    'x-categories': ['Geo-Search'],
  })
  .openapi('AroundRadius')

const AroundPrecisionFromValueSchema = z
  .array(
    z
      .object({
        from: z
          .int()
          .exactOptional()
          .openapi({
            description:
              'Lower boundary of a range in meters. The Geo ranking criterion considers all records within the range to be equal.',
            example: 20,
          }),
        value: z
          .int()
          .exactOptional()
          .openapi({
            description:
              'Upper boundary of a range in meters. The Geo ranking criterion considers all records within the range to be equal.',
          }),
      })
      .openapi({
        title: 'range',
        description: 'Range object with lower and upper values in meters to define custom ranges.',
      }),
  )
  .openapi({ title: 'range objects' })
  .openapi('AroundPrecisionFromValue')

const AroundPrecisionSchema = z
  .xor([
    z
      .int()
      .default(10)
      .openapi({
        description:
          'Distance in meters to group results by similar distances.\n\nFor example, if you set `aroundPrecision` to 100, records wihin 100 meters to the central coordinate are considered to have the same distance,\nas are records between 100 and 199 meters.\n',
      }),
    AroundPrecisionFromValueSchema,
  ])
  .openapi({
    description:
      'Precision of a coordinate-based search in meters to group results with similar distances.\n\nThe Geo ranking criterion considers all matches within the same range of distances to be equal.\n',
    'x-categories': ['Geo-Search'],
  })
  .openapi('AroundPrecision')

const MinimumAroundRadiusSchema = z
  .int()
  .min(1)
  .openapi({
    description:
      "Minimum radius (in meters) for a search around a location when `aroundRadius` isn't set.",
    'x-categories': ['Geo-Search'],
  })
  .openapi('MinimumAroundRadius')

const InsideBoundingBoxArraySchema = z
  .array(z.array(z.number()).length(4))
  .openapi({
    description:
      'Coordinates for a rectangular area in which to search.\n\nEach bounding box is defined by the two opposite points of its diagonal, and expressed as latitude and longitude pair:\n`[p1 lat, p1 long, p2 lat, p2 long]`.\nProvide multiple bounding boxes as nested arrays.\nFor more information, see [rectangular area](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\n',
    example: [
      [47.3165, 4.9665, 47.3424, 5.0201],
      [40.9234, 2.1185, 38.643, 1.9916],
    ],
    'x-categories': ['Geo-Search'],
  })
  .openapi('InsideBoundingBoxArray')

const InsideBoundingBoxSchema = z
  .xor([z.string(), z.null().nullable(), InsideBoundingBoxArraySchema])
  .openapi('InsideBoundingBox')

const InsidePolygonSchema = z
  .array(z.array(z.number()).min(6).max(20000))
  .openapi({
    description:
      'Coordinates of a polygon in which to search.\n\nPolygons are defined by 3 to 10,000 points. Each point is represented by its latitude and longitude.\nProvide multiple polygons as nested arrays.\nFor more information, see [filtering inside polygons](https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/#filtering-inside-rectangular-or-polygonal-areas).\nThis parameter is ignored if you also specify `insideBoundingBox`.\n',
    example: [
      [47.3165, 4.9665, 47.3424, 5.0201, 47.32, 4.9],
      [40.9234, 2.1185, 38.643, 1.9916, 39.2587, 2.0104],
    ],
    'x-categories': ['Geo-Search'],
  })
  .openapi('InsidePolygon')

const NaturalLanguagesSchema = z
  .array(SupportedLanguageSchema)
  .default([])
  .openapi({
    description:
      'ISO language codes that adjust settings that are useful for processing natural language queries (as opposed to keyword searches)\n- Sets `removeStopWords` and `ignorePlurals` to the list of provided languages.\n- Sets `removeWordsIfNoResults` to `allOptional`.\n- Adds a `natural_language` attribute to `ruleContexts` and `analyticsTags`.\n',
    'x-categories': ['Languages'],
  })
  .openapi('NaturalLanguages')

const RuleContextsSchema = z
  .array(z.string())
  .default([])
  .openapi({
    description:
      'Assigns a rule context to the search query\n[Rule contexts](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/how-to/customize-search-results-by-platform/#whats-a-context) are strings that you can use to trigger matching rules.\n',
    example: ['mobile'],
    'x-categories': ['Rules'],
  })
  .openapi('RuleContexts')

const PersonalizationImpactSchema = z
  .int()
  .min(0)
  .max(100)
  .default(100)
  .openapi({
    description:
      'Impact that Personalization should have on this search\nThe higher this value is, the more Personalization determines the ranking compared to other factors.\nFor more information, see [Understanding Personalization impact](https://www.algolia.com/doc/guides/personalization/personalizing-results/in-depth/configuring-personalization/#understanding-personalization-impact).\n',
    'x-categories': ['Personalization'],
  })
  .openapi('PersonalizationImpact')

const UserTokenSchema = z
  .string()
  .openapi({
    description:
      'Unique pseudonymous or anonymous user identifier.\n\nThis helps with analytics and click and conversion events.\nFor more information, see [user token](https://www.algolia.com/doc/guides/sending-events/concepts/usertoken).\n',
    example: 'test-user-123',
    'x-categories': ['Personalization'],
  })
  .openapi('UserToken')

const GetRankingInfoSchema = z
  .boolean()
  .default(false)
  .openapi({
    description: 'Whether the search response should include detailed ranking information.',
    'x-categories': ['Advanced'],
  })
  .openapi('GetRankingInfo')

const SynonymsSchema = z
  .boolean()
  .default(true)
  .openapi({
    description: "Whether to take into account an index's synonyms for this search.",
    'x-categories': ['Advanced'],
  })
  .openapi('Synonyms')

const ClickAnalyticsSchema = z
  .boolean()
  .default(false)
  .openapi({
    description:
      'Whether to include a `queryID` attribute in the response\nThe query ID is a unique identifier for a search query and is required for tracking [click and conversion events](https://www.algolia.com/doc/guides/sending-events/getting-started).\n',
    'x-categories': ['Analytics'],
  })
  .openapi('ClickAnalytics')

const AnalyticsSchema = z
  .boolean()
  .default(true)
  .openapi({
    description: 'Whether this search will be included in Analytics.',
    'x-categories': ['Analytics'],
  })
  .openapi('Analytics')

const AnalyticsTagsSchema = z
  .array(z.string())
  .default([])
  .openapi({
    description:
      'Tags to apply to the query for [segmenting analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments).',
  })
  .openapi('AnalyticsTags')

const PercentileComputationSchema = z
  .boolean()
  .default(true)
  .openapi({
    description: 'Whether to include this search when calculating processing-time percentiles.',
    'x-categories': ['Advanced'],
  })
  .openapi('PercentileComputation')

const EnableABTestSchema = z
  .boolean()
  .default(true)
  .openapi({
    description: 'Whether to enable A/B testing for this search.',
    'x-categories': ['Advanced'],
  })
  .openapi('EnableABTest')

const BaseSearchParamsWithoutQuerySchema = z
  .strictObject({
    similarQuery: SimilarQuerySchema.exactOptional(),
    filters: FiltersSchema.exactOptional(),
    facetFilters: FacetFiltersSchema.exactOptional(),
    optionalFilters: OptionalFiltersSchema.exactOptional(),
    numericFilters: NumericFiltersSchema.exactOptional(),
    tagFilters: TagFiltersSchema.exactOptional(),
    sumOrFiltersScores: SumOrFiltersScoresSchema.exactOptional(),
    restrictSearchableAttributes: RestrictSearchableAttributesSchema.exactOptional(),
    facets: z
      .array(z.string())
      .default([])
      .exactOptional()
      .openapi({
        description:
          'Facets for which to retrieve facet values that match the search criteria and the number of matching facet values\nTo retrieve all facets, use the wildcard character `*`.\nFor more information, see [facets](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#contextual-facet-values-and-counts).\n',
        example: ['*'],
        'x-categories': ['Faceting'],
      }),
    facetingAfterDistinct: FacetingAfterDistinctSchema.exactOptional(),
    page: PageSchema.exactOptional(),
    offset: z
      .int()
      .exactOptional()
      .openapi({
        description: 'Position of the first hit to retrieve.',
        'x-categories': ['Pagination'],
      }),
    length: LengthSchema.exactOptional(),
    aroundLatLng: AroundLatLngSchema.exactOptional(),
    aroundLatLngViaIP: AroundLatLngViaIPSchema.exactOptional(),
    aroundRadius: AroundRadiusSchema.exactOptional(),
    aroundPrecision: AroundPrecisionSchema.exactOptional(),
    minimumAroundRadius: MinimumAroundRadiusSchema.exactOptional(),
    insideBoundingBox: InsideBoundingBoxSchema.exactOptional(),
    insidePolygon: InsidePolygonSchema.exactOptional(),
    naturalLanguages: NaturalLanguagesSchema.exactOptional(),
    ruleContexts: RuleContextsSchema.exactOptional(),
    personalizationImpact: PersonalizationImpactSchema.exactOptional(),
    userToken: UserTokenSchema.exactOptional(),
    getRankingInfo: GetRankingInfoSchema.exactOptional(),
    synonyms: SynonymsSchema.exactOptional(),
    clickAnalytics: ClickAnalyticsSchema.exactOptional(),
    analytics: AnalyticsSchema.exactOptional(),
    analyticsTags: AnalyticsTagsSchema.exactOptional().openapi({ 'x-categories': ['Analytics'] }),
    percentileComputation: PercentileComputationSchema.exactOptional(),
    enableABTest: EnableABTestSchema.exactOptional(),
  })
  .openapi('BaseSearchParamsWithoutQuery')

const BaseSearchParamsSchema = SearchParamsQuerySchema.and(
  BaseSearchParamsWithoutQuerySchema,
).openapi('BaseSearchParams')

const SearchParamsObjectSchema = BaseSearchParamsSchema.and(IndexSettingsAsSearchParamsSchema)
  .openapi({
    title: 'Search parameters as object',
    description: 'Each parameter value, including the `query` must not be larger than 512 bytes.',
  })
  .openapi('SearchParamsObject')

const SearchParamsSchema = z
  .xor([SearchParamsStringSchema, SearchParamsObjectSchema])
  .openapi('SearchParams')

const SearchResponseSchema: z.ZodType<SearchResponseType> = z
  .lazy(() => BaseSearchResponseSchema.and(SearchPaginationSchema).and(SearchHitsSchema))
  .openapi('SearchResponse')

const IndexNameSchema = z
  .string()
  .openapi({ example: 'products', description: 'Index name (case-sensitive).' })
  .openapi('IndexName')

const SearchTypeDefaultSchema = z
  .literal('default')
  .default('default')
  .openapi({
    description:
      '- `default`: perform a search query\n- `facet` [searches for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).\n',
  })
  .openapi('SearchTypeDefault')

const SearchForHitsOptionsSchema = z
  .object({ indexName: IndexNameSchema, type: SearchTypeDefaultSchema.exactOptional() })
  .openapi({ 'x-is-SearchForHitsOptions': true, required: ['indexName'] })
  .openapi('SearchForHitsOptions')

const SearchForHitsSchema = SearchParamsSchema.and(SearchForHitsOptionsSchema).openapi(
  'SearchForHits',
)

const FacetQuerySchema = z
  .string()
  .default('')
  .openapi({ description: "Text to search inside the facet's values.", example: 'george' })
  .openapi('FacetQuery')

const SearchTypeFacetSchema = z
  .literal('facet')
  .default('facet')
  .openapi({
    description:
      '- `default`: perform a search query\n- `facet` [searches for facet values](https://www.algolia.com/doc/guides/managing-results/refine-results/faceting/#search-for-facet-values).\n',
  })
  .openapi('SearchTypeFacet')

const SearchForFacetsOptionsSchema = z
  .object({
    facet: z.string().openapi({ description: 'Facet name.' }),
    indexName: IndexNameSchema,
    facetQuery: FacetQuerySchema.exactOptional(),
    maxFacetHits: MaxFacetHitsSchema.exactOptional(),
    type: SearchTypeFacetSchema,
  })
  .openapi({ required: ['indexName', 'type', 'facet'] })
  .openapi('SearchForFacetsOptions')

const SearchForFacetsSchema = SearchParamsSchema.and(SearchForFacetsOptionsSchema)
  .openapi({ 'x-discriminator-fields': ['facet', 'type'] })
  .openapi('SearchForFacets')

const SearchQuerySchema = z.xor([SearchForHitsSchema, SearchForFacetsSchema]).openapi('SearchQuery')

const SearchStrategySchema = z
  .enum(['none', 'stopIfEnoughMatches'])
  .openapi({
    description:
      'Strategy for multiple search queries:\n\n- `none`. Run all queries.\n- `stopIfEnoughMatches`. Run the queries one by one, stopping as soon as a query matches at least the `hitsPerPage` number of results.\n',
  })
  .openapi('SearchStrategy')

const SearchForFacetValuesResponseSchema = z
  .strictObject({
    facetHits: z
      .array(
        z
          .strictObject({
            value: z.string().openapi({ description: 'Facet value.', example: 'Mobile phone' }),
            highlighted: HighlightedValueSchema,
            count: z
              .int()
              .openapi({
                description:
                  'Number of records with this facet value. [The count may be approximated](https://support.algolia.com/hc/articles/4406975248145-Why-are-my-facet-and-hit-counts-not-accurate).',
              }),
          })
          .openapi({ title: 'facetHits', required: ['value', 'highlighted', 'count'] }),
      )
      .openapi({ description: 'Matching facet values.' }),
    exhaustiveFacetsCount: z
      .boolean()
      .openapi({
        description:
          'Whether the facet count is exhaustive (true) or approximate (false).\nFor more information, see [Why are my facet and hit counts not accurate](https://support.algolia.com/hc/articles/4406975248145-Why-are-my-facet-and-hit-counts-not-accurate).\n',
      }),
    processingTimeMS: ProcessingTimeMSSchema.exactOptional(),
  })
  .openapi({
    required: ['facetHits', 'exhaustiveFacetsCount'],
    'x-discriminator-fields': ['facetHits'],
  })
  .openapi('SearchForFacetValuesResponse')

const SearchResultSchema = z
  .xor([SearchResponseSchema, SearchForFacetValuesResponseSchema])
  .openapi('SearchResult')

const CursorSchema = z
  .strictObject({
    cursor: z
      .string()
      .exactOptional()
      .openapi({
        description:
          'Cursor to get the next page of the response.\n\nThe parameter must match the value returned in the response of a previous request.\nThe last page of the response does not return a `cursor` attribute.\n',
        example: 'jMDY3M2MwM2QwMWUxMmQwYWI0ZTN',
      }),
  })
  .openapi('Cursor')

const BrowseParamsObjectSchema =
  SearchParamsObjectSchema.and(CursorSchema).openapi('BrowseParamsObject')

const BrowseParamsSchema = z
  .xor([
    BrowseParamsObjectSchema.openapi({ title: 'Search parameters as object' }),
    SearchParamsStringSchema,
  ])
  .openapi('BrowseParams')

const BrowsePaginationSchema = z
  .strictObject({
    page: PageSchema.exactOptional(),
    nbHits: NbHitsSchema.exactOptional(),
    nbPages: NbPagesSchema.exactOptional(),
    hitsPerPage: HitsPerPageSchema.exactOptional(),
  })
  .openapi('BrowsePagination')

const BrowseResponseSchema = BaseSearchResponseSchema.and(BrowsePaginationSchema)
  .and(SearchHitsSchema)
  .and(CursorSchema)
  .openapi('BrowseResponse')

const CreatedAtSchema = z
  .string()
  .openapi({ description: 'Date of creation in RFC 3339 format.' })
  .openapi('CreatedAt')

const TaskIDSchema = z
  .int64()
  .openapi({
    example: 1514562690001,
    description:
      "Unique identifier of a task.\n\nA successful API response means that a task was added to a queue.\nIt might not run immediately.\nYou can check the task's progress with the [`task` operation](https://www.algolia.com/doc/rest-api/search/get-task) and this task ID.\n",
  })
  .openapi('TaskID')

const DeletedAtSchema = z
  .string()
  .openapi({
    example: '2023-06-27T14:42:38.831Z',
    description: 'Date and time when the object was deleted, in RFC 3339 format.',
  })
  .openapi('DeletedAt')

const UpdatedAtSchema = z
  .string()
  .openapi({
    example: '2023-07-04T12:49:15Z',
    description: 'Date and time when the object was updated, in RFC 3339 format.',
  })
  .openapi('UpdatedAt')

const DeleteByParamsSchema = z
  .strictObject({
    facetFilters: FacetFiltersSchema.exactOptional(),
    filters: FiltersSchema.exactOptional(),
    numericFilters: NumericFiltersSchema.exactOptional(),
    tagFilters: TagFiltersSchema.exactOptional(),
    aroundLatLng: AroundLatLngSchema.exactOptional(),
    aroundRadius: AroundRadiusSchema.exactOptional(),
    insideBoundingBox: InsideBoundingBoxSchema.exactOptional(),
    insidePolygon: InsidePolygonSchema.exactOptional(),
  })
  .openapi('DeleteByParams')

const UpdatedAtResponseSchema = z
  .strictObject({ taskID: TaskIDSchema, updatedAt: UpdatedAtSchema })
  .openapi({
    description: 'Response, taskID, and update timestamp.',
    required: ['taskID', 'updatedAt'],
  })
  .openapi('UpdatedAtResponse')

const ActionSchema = z
  .enum([
    'addObject',
    'updateObject',
    'partialUpdateObject',
    'partialUpdateObjectNoCreate',
    'deleteObject',
    'delete',
    'clear',
  ])
  .openapi({
    description:
      'Which indexing operation to perform:\n\n- `addObject`: adds records to an index.\n   Equivalent to the "Add a new record (with auto-generated object ID)" operation.\n- `updateObject`: adds or replaces records in an index.\n   Equivalent to the "Add or replace a record" operation.\n- `partialUpdateObject`: adds or updates attributes within records.\n   Equivalent to the "Add or update attributes" operation with the `createIfNoExists` parameter set to true.\n   (If a record with the specified `objectID` doesn\'t exist in the specified index, this action creates adds the record to the index)\n- `partialUpdateObjectNoCreate`: same as `partialUpdateObject`, but with `createIfNoExists` set to false.\n   (A record isn\'t added to the index if its `objectID` doesn\'t exist)\n- `deleteObject`: delete records from an index.\n  Equivalent to the "Delete a record" operation.\n- `delete`. Delete an index. Equivalent to the "Delete an index" operation.\n- `clear`: delete all records from an index. Equivalent to the "Delete all records from an index operation".\n',
  })
  .openapi('Action')

const BatchWriteParamsSchema = z
  .strictObject({
    requests: z.array(
      z
        .strictObject({
          action: ActionSchema,
          body: z
            .object({})
            .openapi({
              description: 'Operation arguments (varies with specified `action`).',
              example: {
                name: 'Betty Jane McCamey',
                company: 'Vita Foods Inc.',
                email: 'betty@mccamey.com',
              },
            }),
        })
        .openapi({ title: 'batchRequest', required: ['action', 'body'] }),
    ),
  })
  .openapi({
    title: 'batchWriteParams',
    description: 'Batch parameters.',
    required: ['requests'],
    example: {
      requests: [
        {
          action: 'addObject',
          body: {
            name: 'Betty Jane McCamey',
            company: 'Vita Foods Inc.',
            email: 'betty@mccamey.com',
          },
        },
        {
          action: 'addObject',
          body: { name: 'Gayla geimer', company: 'Ortman McCain Co.', email: 'gayla@geimer.com' },
        },
      ],
    },
  })
  .openapi('BatchWriteParams')

const ObjectIDsSchema = z
  .array(z.string())
  .openapi({ example: ['record-1', 'record-2'], description: 'Unique record identifiers.' })
  .openapi('ObjectIDs')

const BatchResponseSchema = z
  .strictObject({ taskID: TaskIDSchema, objectIDs: ObjectIDsSchema })
  .openapi({ required: ['taskID', 'objectIDs'] })
  .openapi('BatchResponse')

const IndexSettingsSchema: z.ZodType<IndexSettingsType> = z
  .lazy(() =>
    BaseIndexSettingsSchema.and(IndexSettingsAsSearchParamsSchema).openapi({
      description: 'Index settings.',
    }),
  )
  .openapi('IndexSettings')

const WithPrimarySchema = z
  .strictObject({
    primary: z
      .string()
      .exactOptional()
      .openapi({
        description: 'Replica indices only: the name of the primary index for this replica.\n',
      }),
  })
  .openapi('WithPrimary')

const SettingsResponseSchema =
  IndexSettingsSchema.and(WithPrimarySchema).openapi('SettingsResponse')

const SynonymTypeSchema = z
  .enum([
    'synonym',
    'onewaysynonym',
    'altcorrection1',
    'altcorrection2',
    'placeholder',
    'oneWaySynonym',
    'altCorrection1',
    'altCorrection2',
  ])
  .openapi({ description: 'Synonym type.', example: 'onewaysynonym' })
  .openapi('SynonymType')

const SynonymHitSchema = z
  .strictObject({
    objectID: z
      .string()
      .openapi({ description: 'Unique identifier of a synonym object.', example: 'synonymID' }),
    type: SynonymTypeSchema,
    synonyms: z
      .array(z.string())
      .exactOptional()
      .openapi({
        description: 'Words or phrases considered equivalent.',
        example: ['vehicle', 'auto'],
      }),
    input: z
      .string()
      .exactOptional()
      .openapi({
        description:
          'Word or phrase to appear in query strings (for [`onewaysynonym`s](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/one-way-synonyms)).',
        example: 'car',
      }),
    word: z
      .string()
      .exactOptional()
      .openapi({
        description:
          'Word or phrase to appear in query strings (for [`altcorrection1` and `altcorrection2`](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/synonyms-alternative-corrections)).',
        example: 'car',
      }),
    corrections: z
      .array(z.string())
      .exactOptional()
      .openapi({ description: 'Words to be matched in records.', example: ['vehicle', 'auto'] }),
    placeholder: z
      .string()
      .exactOptional()
      .openapi({
        description:
          '[Placeholder token](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/synonyms-placeholders) to be put inside records.\n',
        example: '<Street>',
      }),
    replacements: z
      .array(z.string())
      .exactOptional()
      .openapi({
        description:
          'Query words that will match the [placeholder token](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/in-depth/synonyms-placeholders).',
        example: ['street', 'st'],
      }),
  })
  .openapi({ description: 'Synonym object.', required: ['objectID', 'type'] })
  .openapi('SynonymHit')

const IdSchema = z
  .string()
  .openapi({ example: '12', description: 'Unique identifier of a synonym object.' })
  .openapi('Id')

const SynonymHitsSchema = z
  .array(SynonymHitSchema)
  .openapi({ description: 'Matching synonyms.' })
  .openapi('SynonymHits')

const SearchSynonymsResponseSchema = z
  .looseObject({ hits: SynonymHitsSchema, nbHits: NbHitsSchema })
  .openapi({ required: ['hits', 'nbHits'] })
  .openapi('SearchSynonymsResponse')

const GetApiKeyResponseSchema: z.ZodType<GetApiKeyResponseType> = z
  .lazy(() => BaseGetApiKeyResponseSchema.and(ApiKeySchema))
  .openapi('GetApiKeyResponse')

const AddApiKeyResponseSchema = z
  .strictObject({ key: KeyStringSchema, createdAt: CreatedAtSchema })
  .openapi({ required: ['key', 'createdAt'] })
  .openapi('AddApiKeyResponse')

const RuleIDSchema = z
  .string()
  .openapi({ title: 'objectID', description: 'Unique identifier of a rule object.' })
  .openapi('RuleID')

const AnchoringSchema = z
  .enum(['is', 'startsWith', 'endsWith', 'contains'])
  .openapi({
    description:
      'Which part of the search query the pattern should match:\n\n- `startsWith`. The pattern must match the beginning of the query.\n- `endsWith`. The pattern must match the end of the query.\n- `is`. The pattern must match the query exactly.\n- `contains`. The pattern must match anywhere in the query.\n\nEmpty queries are only allowed as patterns with `anchoring: is`.\n',
  })
  .openapi('Anchoring')

const ContextSchema = z
  .string()
  .regex(/[A-Za-z0-9_-]+/)
  .openapi({
    description:
      'An additional restriction that only triggers the rule, when the search has the same value as `ruleContexts` parameter.\nFor example, if `context: mobile`, the rule is only triggered when the search request has a matching `ruleContexts: mobile`.\nA rule context must only contain alphanumeric characters.\n',
    example: 'mobile',
  })
  .openapi('Context')

const ConditionSchema = z
  .strictObject({
    pattern: z
      .string()
      .exactOptional()
      .openapi({
        description:
          'Query pattern that triggers the rule.\n\nYou can use either a literal string, or a special pattern `{facet:ATTRIBUTE}`, where `ATTRIBUTE` is a facet name.\nThe rule is triggered if the query matches the literal string or a value of the specified facet.\nFor example, with `pattern: {facet:genre}`, the rule is triggered when users search for a genre, such as "comedy".\n',
        example: '{facet:genre}',
      }),
    anchoring: AnchoringSchema.exactOptional(),
    alternatives: z
      .boolean()
      .default(false)
      .exactOptional()
      .openapi({ description: 'Whether the pattern should match plurals, synonyms, and typos.' }),
    context: ContextSchema.exactOptional(),
    filters: z
      .string()
      .exactOptional()
      .openapi({
        description:
          "Filters that trigger the rule.\n\nYou can add filters using the syntax `facet:value` so that the rule is triggered, when the specific filter is selected.\nYou can use `filters` on its own or combine it with the `pattern` parameter.\nYou can't combine multiple filters with `OR` and you can't use numeric filters.\n",
        example: 'genre:comedy',
      }),
  })
  .openapi('Condition')

const EditTypeSchema = z
  .enum(['remove', 'replace'])
  .openapi({ description: 'Type of edit.' })
  .openapi('EditType')

const EditSchema = z
  .strictObject({
    type: EditTypeSchema.exactOptional(),
    delete: z
      .string()
      .exactOptional()
      .openapi({ description: 'Text or patterns to remove from the query string.' }),
    insert: z
      .string()
      .exactOptional()
      .openapi({
        description: 'Text to be added in place of the deleted text inside the query string.',
      }),
  })
  .openapi('Edit')

const ConsequenceQueryObjectSchema = z
  .strictObject({
    remove: z
      .array(z.string())
      .exactOptional()
      .openapi({ description: 'Words to remove from the search query.' }),
    edits: z
      .array(EditSchema)
      .exactOptional()
      .openapi({ description: 'Changes to make to the search query.' }),
  })
  .openapi('ConsequenceQueryObject')

const ConsequenceQuerySchema = z
  .xor([ConsequenceQueryObjectSchema, z.string()])
  .openapi({
    description:
      'Replace or edit the search query.\n\nIf `consequenceQuery` is a string, the entire search query is replaced with that string.\nIf `consequenceQuery` is an object, it describes incremental edits made to the query.\n',
  })
  .openapi('ConsequenceQuery')

const AutomaticFacetFilterSchema = z
  .strictObject({
    facet: z
      .string()
      .openapi({
        description:
          'Facet name to be applied as filter.\nThe name must match placeholders in the `pattern` parameter.\nFor example, with `pattern: {facet:genre}`, `automaticFacetFilters` must be `genre`.\n',
      }),
    score: z
      .int()
      .default(1)
      .exactOptional()
      .openapi({ description: 'Filter scores to give different weights to individual filters.' }),
    disjunctive: z
      .boolean()
      .default(false)
      .exactOptional()
      .openapi({
        description:
          'Whether the filter is disjunctive or conjunctive.\n\nIf true the filter has multiple matches, multiple occurrences are combined with the logical `OR` operation.\nIf false, multiple occurrences are combined with the logical `AND` operation.\n',
      }),
  })
  .openapi({
    description: 'Filter or optional filter to be applied to the search.',
    required: ['facet'],
  })
  .openapi('AutomaticFacetFilter')

const AutomaticFacetFiltersSchema = z
  .xor([z.array(AutomaticFacetFilterSchema), z.array(z.string())])
  .openapi({
    description:
      'Filter to be applied to the search.\n\nYou can use this to respond to search queries that match a facet value.\nFor example, if users search for "comedy", which matches a facet value of the "genre" facet,\nyou can filter the results to show the top-ranked comedy movies.\n',
  })
  .openapi('AutomaticFacetFilters')

const ParamsSchema = z
  .strictObject({
    query: ConsequenceQuerySchema.exactOptional(),
    automaticFacetFilters: AutomaticFacetFiltersSchema.exactOptional(),
    automaticOptionalFacetFilters: AutomaticFacetFiltersSchema.exactOptional(),
    renderingContent: RenderingContentSchema.exactOptional(),
  })
  .openapi({
    description:
      'Parameters to apply to this search.\n\nYou can use all search parameters, plus special `automaticFacetFilters`, `automaticOptionalFacetFilters`, and `query`.\n',
  })
  .openapi('Params')

const ConsequenceParamsSchema = BaseSearchParamsWithoutQuerySchema.and(
  IndexSettingsAsSearchParamsSchema,
)
  .and(ParamsSchema)
  .openapi('ConsequenceParams')

const PromotePositionSchema = z
  .int()
  .openapi({
    description: 'Position in the search results where you want to show the promoted records.',
    example: 0,
  })
  .openapi('PromotePosition')

const PromoteObjectIDsSchema = z
  .strictObject({
    objectIDs: z
      .array(ObjectIDSchema)
      .max(100)
      .openapi({
        description:
          'Object IDs of the records you want to promote.\n\nThe records are placed as a group at the `position`.\nFor example, if you want to promote four records to position `0`,\nthey will be the first four search results.\n',
      }),
    position: PromotePositionSchema,
  })
  .openapi({
    title: 'objectIDs',
    description: 'Records to promote.',
    required: ['position', 'objectIDs'],
    'x-discriminator-fields': ['objectIDs'],
  })
  .openapi('PromoteObjectIDs')

const PromoteObjectIDSchema = z
  .strictObject({ objectID: ObjectIDSchema, position: PromotePositionSchema })
  .openapi({
    title: 'objectID',
    description: 'Record to promote.',
    required: ['position', 'objectID'],
    'x-discriminator-fields': ['objectID'],
  })
  .openapi('PromoteObjectID')

const PromoteSchema = z.xor([PromoteObjectIDsSchema, PromoteObjectIDSchema]).openapi('Promote')

const ConsequenceSchema = z
  .strictObject({
    params: ConsequenceParamsSchema.exactOptional(),
    promote: z
      .array(PromoteSchema)
      .max(300)
      .exactOptional()
      .openapi({
        description:
          'Records you want to pin to a specific position in the search results.\n\nYou can promote up to 300 records, either individually, or as groups of up to 100 records each.\n',
      }),
    filterPromotes: z
      .boolean()
      .default(false)
      .exactOptional()
      .openapi({
        description:
          'Determines whether promoted records must also match active filters for the consequence to apply.\n\nThis ensures user-applied filters take priority and irrelevant matches aren\'t shown.\nFor example, if you promote a record with `color: red` but the user filters for `color: blue`,\nthe "red" record won\'t be shown.\n\n> In the Algolia dashboard, when you use the **Pin an item** consequence, `filterPromotes` appears as the checkbox: **Pinned items must match active filters to be displayed.** For examples, see [Promote results with rules](https://www.algolia.com/doc/guides/managing-results/rules/merchandising-and-promoting/how-to/promote-hits/#promote-results-matching-active-filters).\n',
      }),
    hide: z
      .array(
        z
          .strictObject({ objectID: ObjectIDSchema })
          .openapi({
            title: 'consequenceHide',
            description: 'Object ID of the record to hide.',
            required: ['objectID'],
          }),
      )
      .max(50)
      .exactOptional()
      .openapi({ description: 'Records you want to hide from the search results.' }),
    userData: z
      .object({})
      .exactOptional()
      .openapi({
        description:
          "A JSON object with custom data that will be appended to the `userData` array in the response.\nThis object isn't interpreted by the API and is limited to 1&nbsp;kB of minified JSON.\n",
        example: { settingID: 'f2a7b51e3503acc6a39b3784ffb84300', pluginVersion: '1.6.0' },
      }),
  })
  .openapi({
    description:
      'Effect of the rule.\n\nFor more information, see [Consequences](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/#consequences).\n',
  })
  .openapi('Consequence')

const TimeRangeSchema = z
  .strictObject({
    from: z
      .int64()
      .exactOptional()
      .openapi({ description: 'When the rule should start to be active, in Unix epoch time.' }),
    until: z
      .int64()
      .exactOptional()
      .openapi({ description: 'When the rule should stop to be active, in Unix epoch time.' }),
  })
  .openapi('TimeRange')

const RuleSchema = z
  .strictObject({
    objectID: RuleIDSchema,
    conditions: z
      .array(ConditionSchema)
      .min(0)
      .max(25)
      .exactOptional()
      .openapi({
        description:
          "Conditions that trigger a rule.\n\nSome consequences require specific conditions or don't require any condition.\nFor more information, see [Conditions](https://www.algolia.com/doc/guides/managing-results/rules/rules-overview/#conditions).\n",
      }),
    consequence: ConsequenceSchema,
    description: z
      .string()
      .exactOptional()
      .openapi({
        description:
          "Description of the rule's purpose to help you distinguish between different rules.",
        example: 'Display a promotional banner',
      }),
    enabled: z
      .boolean()
      .default(true)
      .exactOptional()
      .openapi({ description: 'Whether the rule is active.' }),
    validity: z
      .array(TimeRangeSchema)
      .exactOptional()
      .openapi({ description: 'Time periods when the rule is active.' }),
    tags: z.array(z.string()).exactOptional(),
    scope: z.string().exactOptional(),
  })
  .openapi({ description: 'Rule object.', required: ['objectID', 'consequence'] })
  .openapi('Rule')

const ParametersQuerySchema = z
  .string()
  .default('')
  .openapi({ description: 'Search query for rules.' })
  .openapi('ParametersQuery')

const ParametersPageSchema = z
  .int()
  .min(0)
  .openapi({
    description:
      'Requested page of the API response.\n\nAlgolia uses `page` and `hitsPerPage` to control how search results are displayed ([paginated](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/pagination/js)).\n\n- `hitsPerPage`: sets the number of search results (_hits_) displayed per page.\n- `page`: specifies the page number of the search results you want to retrieve. Page numbering starts at 0, so the first page is `page=0`, the second is `page=1`, and so on.\n\nFor example, to display 10 results per page starting from the third page, set `hitsPerPage` to 10 and `page` to 2.\n',
  })
  .openapi('ParametersPage')

const ParametersHitsPerPageSchema = z
  .int()
  .min(1)
  .max(1000)
  .default(20)
  .openapi({
    description:
      'Maximum number of hits per page.\n\nAlgolia uses `page` and `hitsPerPage` to control how search results are displayed ([paginated](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/pagination/js)).\n\n- `hitsPerPage`: sets the number of search results (_hits_) displayed per page.\n- `page`: specifies the page number of the search results you want to retrieve. Page numbering starts at 0, so the first page is `page=0`, the second is `page=1`, and so on.\n\nFor example, to display 10 results per page starting from the third page, set `hitsPerPage` to 10 and `page` to 2.\n',
  })
  .openapi('ParametersHitsPerPage')

const DictionaryTypeSchema = z.enum(['plurals', 'stopwords', 'compounds']).openapi('DictionaryType')

const DictionaryActionSchema = z
  .enum(['addEntry', 'deleteEntry'])
  .openapi({ description: 'Actions to perform.' })
  .openapi('DictionaryAction')

const DictionaryEntryStateSchema = z
  .enum(['enabled', 'disabled'])
  .default('enabled')
  .openapi({ description: 'Whether a dictionary entry is active.' })
  .openapi('DictionaryEntryState')

const DictionaryEntryTypeSchema = z
  .enum(['custom', 'standard'])
  .openapi({
    description:
      'Whether a dictionary entry is provided by Algolia (standard), or has been added by you (custom).',
  })
  .openapi('DictionaryEntryType')

const DictionaryEntrySchema = z
  .looseObject({
    objectID: z
      .string()
      .openapi({
        description: 'Unique identifier for the dictionary entry.',
        example: '828afd405e1f4fe950b6b98c2c43c032',
      }),
    language: SupportedLanguageSchema.exactOptional(),
    word: z
      .string()
      .exactOptional()
      .openapi({
        description: 'Matching dictionary word for `stopwords` and `compounds` dictionaries.',
        example: 'the',
      }),
    words: z
      .array(z.string())
      .exactOptional()
      .openapi({
        description: 'Matching words in the `plurals` dictionary including declensions.',
        example: ['cheval', 'cheveaux'],
      }),
    decomposition: z
      .array(z.string())
      .exactOptional()
      .openapi({
        description: 'Invividual components of a compound word in the `compounds` dictionary.',
        example: ['kopf', 'schmerz', 'tablette'],
      }),
    state: DictionaryEntryStateSchema.exactOptional(),
    type: DictionaryEntryTypeSchema.exactOptional(),
  })
  .openapi({ description: 'Dictionary entry.', required: ['objectID'] })
  .openapi('DictionaryEntry')

const SearchDictionaryEntriesResponseSchema = z
  .strictObject({
    hits: z
      .array(DictionaryEntrySchema)
      .openapi({ description: 'Dictionary entries matching the search criteria.' }),
    page: ParametersPageSchema,
    nbHits: NbHitsSchema,
    nbPages: NbPagesSchema,
  })
  .openapi({ required: ['hits', 'page', 'nbHits', 'nbPages'] })
  .openapi('SearchDictionaryEntriesResponse')

const StandardEntrySchema = z
  .xor([
    z
      .record(z.string(), z.boolean().openapi({ 'x-additionalPropertiesName': 'language' }))
      .openapi({
        description: 'Key-value pair of a language ISO code and a boolean value.',
        example: { fr: false },
      }),
    z.null().nullable(),
  ])
  .openapi('StandardEntry')

const StandardEntriesSchema = z
  .strictObject({
    plurals: StandardEntrySchema.exactOptional(),
    stopwords: StandardEntrySchema.exactOptional(),
    compounds: StandardEntrySchema.exactOptional(),
  })
  .openapi({
    description:
      'Key-value pairs of [supported language ISO codes](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages) and boolean values.\n',
  })
  .openapi('StandardEntries')

const DictionaryLanguageSchema = z
  .xor([
    z
      .strictObject({
        nbCustomEntries: z
          .int()
          .exactOptional()
          .openapi({ description: 'Number of custom dictionary entries.' }),
      })
      .openapi({
        description:
          "Dictionary type. If `null`, this dictionary type isn't supported for the language.",
      }),
    z.null().nullable(),
  ])
  .openapi('DictionaryLanguage')

const LanguagesSchema = z
  .strictObject({
    plurals: DictionaryLanguageSchema,
    stopwords: DictionaryLanguageSchema,
    compounds: DictionaryLanguageSchema,
  })
  .openapi({ description: 'Dictionary language.', required: ['plurals', 'stopwords', 'compounds'] })
  .openapi('Languages')

const UserIDSchema = z
  .string()
  .regex(/^[a-zA-Z0-9 \-*.]+$/)
  .openapi({
    description: 'Unique identifier of the user who makes the search request.',
    example: 'user1',
  })
  .openapi('UserID')

const UserIdSchema = z
  .object({
    userID: UserIDSchema,
    clusterName: z
      .string()
      .openapi({ description: 'Cluster to which the user is assigned.', example: 'c1-test' }),
    nbRecords: z
      .int()
      .openapi({ description: 'Number of records belonging to the user.', example: 42 }),
    dataSize: z.int().openapi({ description: 'Data size used by the user.', example: 0 }),
  })
  .openapi({
    title: 'userID',
    description: 'Unique user ID.',
    required: ['userID', 'clusterName', 'nbRecords', 'dataSize'],
  })
  .openapi('UserId')

const ClusterNameSchema = z
  .string()
  .openapi({ description: 'Cluster name.', example: 'c11-test' })
  .openapi('ClusterName')

const NbRecordsSchema = z
  .int()
  .openapi({ description: 'Number of records in the cluster.', example: 3 })
  .openapi('NbRecords')

const DataSizeSchema = z
  .int()
  .openapi({
    description: 'Data size taken by all the users assigned to the cluster.',
    example: 481,
  })
  .openapi('DataSize')

const SourceSchema = z
  .object({
    source: z
      .string()
      .openapi({ description: 'IP address range of the source.', example: '10.0.0.1/32' }),
    description: z
      .string()
      .exactOptional()
      .openapi({ description: 'Source description.', example: 'Server subnet' }),
  })
  .openapi({ description: 'Source.', required: ['source'] })
  .openapi('Source')

const SourcesSchema = z.array(SourceSchema).openapi({ description: 'Sources.' }).openapi('Sources')

const LogTypeSchema = z.enum(['all', 'query', 'build', 'error']).default('all').openapi('LogType')

const TaskStatusSchema = z
  .enum(['published', 'notPublished'])
  .openapi({
    description: 'Task status, `published` if the task is completed, `notPublished` otherwise.',
  })
  .openapi('TaskStatus')

const GetTaskResponseSchema = z
  .strictObject({ status: TaskStatusSchema })
  .openapi({ title: 'getTaskResponse', required: ['status'] })
  .openapi('GetTaskResponse')

const OperationTypeSchema = z
  .enum(['move', 'copy'])
  .openapi({ example: 'copy', description: 'Operation to perform on the index.' })
  .openapi('OperationType')

const ScopeTypeSchema = z.enum(['settings', 'synonyms', 'rules']).openapi('ScopeType')

const FetchedIndexSchema = z
  .strictObject({
    name: z.string().openapi({ description: 'Index name.', example: 'movies' }),
    createdAt: z
      .string()
      .openapi({
        description: 'Index creation date. An empty string means that the index has no records.',
        example: '2022-09-19T16:36:44.471Z',
      }),
    updatedAt: UpdatedAtSchema,
    entries: z
      .int()
      .openapi({ description: 'Number of records contained in the index.', example: 100 }),
    dataSize: z
      .int64()
      .openapi({ description: 'Number of bytes of the index in minified format.', example: 48450 }),
    fileSize: z
      .int64()
      .openapi({ description: 'Number of bytes of the index binary file.', example: 112927 }),
    lastBuildTimeS: z.int().openapi({ description: 'Last build time.', example: 3 }),
    numberOfPendingTasks: z
      .int()
      .default(0)
      .openapi({
        description:
          'Number of pending indexing operations. This value is deprecated and should not be used.',
      }),
    pendingTask: z
      .boolean()
      .default(false)
      .openapi({
        description:
          'A boolean which says whether the index has pending tasks. This value is deprecated and should not be used.',
      }),
    primary: z
      .string()
      .exactOptional()
      .openapi({
        description:
          'Only present if the index is a replica. Contains the name of the related primary index.',
        example: 'T02',
      }),
    replicas: z
      .array(z.string())
      .exactOptional()
      .openapi({
        description:
          'Only present if the index is a primary index with replicas. Contains the names of all linked replicas.',
        example: ['T02_push', 'T2replica'],
      }),
    virtual: z
      .boolean()
      .exactOptional()
      .openapi({
        description:
          'Only present if the index is a [virtual replica](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/sort-an-index-alphabetically/#virtual-replicas).',
        'x-categories': ['Ranking'],
      }),
  })
  .openapi({
    required: [
      'name',
      'createdAt',
      'updatedAt',
      'entries',
      'dataSize',
      'fileSize',
      'lastBuildTimeS',
      'pendingTask',
      'numberOfPendingTasks',
    ],
  })
  .openapi('FetchedIndex')

const ListIndicesResponseSchema = z
  .strictObject({
    items: z
      .array(FetchedIndexSchema)
      .openapi({ description: 'All indices in your Algolia application.' }),
    nbPages: z.int().exactOptional().openapi({ description: 'Number of pages.', example: 100 }),
  })
  .openapi({ required: ['items'] })
  .openapi('ListIndicesResponse')

const ApiKeyOperationSchema = z.enum(['add', 'delete', 'update']).openapi('ApiKeyOperation')

const SecuredApiKeyRestrictionsSchema = z
  .strictObject({
    searchParams: SearchParamsObjectSchema.exactOptional(),
    filters: z
      .string()
      .exactOptional()
      .openapi({
        description:
          'Filters that apply to every search made with the secured API key.\nExtra filters added at search time will be combined with `AND`.\nFor example, if you set `group:admin` as fixed filter on your generated API key,\nand add `groups:visitors` to the search query, the complete set of filters will be `group:admin AND groups:visitors`.\n',
      }),
    validUntil: z
      .int64()
      .exactOptional()
      .openapi({
        description:
          'Timestamp when the secured API key expires, measured in seconds since the Unix epoch.',
      }),
    restrictIndices: z
      .array(z.string())
      .exactOptional()
      .openapi({
        description:
          'Index names or patterns that this API key can access.\nBy default, an API key can access all indices in the same application.\n\nYou can use leading and trailing wildcard characters (`*`):\n\n- `dev_*` matches all indices starting with "dev_".\n- `*_dev` matches all indices ending with "_dev".\n- `*_products_*` matches all indices containing "_products_".\n',
      }),
    restrictSources: z
      .string()
      .exactOptional()
      .openapi({
        description:
          'IP network that are allowed to use this key.\n\nYou can only add a single source, but you can provide a range of IP addresses.\nUse this to protect against API key leaking and reuse.\n',
        example: '192.168.1.0/24',
      }),
    userToken: z
      .string()
      .exactOptional()
      .openapi({
        description:
          'Pseudonymous user identifier to restrict usage of this API key to specific users.\n\nBy default, rate limits are set based on IP addresses. This can be an issue if many users search from the same IP address.\nTo avoid this, add a user token to each generated API key.\n',
      }),
  })
  .openapi('SecuredApiKeyRestrictions')

const ReplaceAllObjectsResponseSchema = z
  .strictObject({
    copyOperationResponse: UpdatedAtResponseSchema.openapi({
      description: 'The response of the `operationIndex` request for the `copy` operation.',
    }),
    batchResponses: z
      .array(BatchResponseSchema)
      .openapi({ description: 'The response of the `batch` request(s).' }),
    moveOperationResponse: UpdatedAtResponseSchema.openapi({
      description: 'The response of the `operationIndex` request for the `move` operation.',
    }),
  })
  .openapi({ required: ['copyOperationResponse', 'batchResponses', 'moveOperationResponse'] })
  .openapi('ReplaceAllObjectsResponse')

const RunIDSchema = z
  .string()
  .openapi({
    description: 'Universally unique identifier (UUID) of a task run.',
    example: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
  })
  .openapi('RunID')

const EventIDSchema = z
  .string()
  .openapi({
    description: 'Universally unique identifier (UUID) of an event.',
    example: '6c02aeb1-775e-418e-870b-1faccd4b2c0f',
  })
  .openapi('EventID')

const EventStatusSchema = z
  .xor([
    z.enum(['created', 'started', 'retried', 'failed', 'succeeded', 'critical']),
    z.null().nullable(),
  ])
  .openapi('EventStatus')

const EventTypeSchema = z.enum(['fetch', 'record', 'log', 'transform']).openapi('EventType')

const PublishedAtSchema = z
  .string()
  .openapi({ description: 'Date of publish RFC 3339 format.' })
  .openapi('PublishedAt')

const EventSchema = z
  .strictObject({
    eventID: EventIDSchema,
    runID: RunIDSchema,
    status: EventStatusSchema,
    type: EventTypeSchema,
    batchSize: z
      .int()
      .min(0)
      .multipleOf(1)
      .openapi({ description: 'The extracted record batch size.', example: 10 }),
    data: z.xor([z.looseObject({}), z.null().nullable()]).exactOptional(),
    publishedAt: PublishedAtSchema,
  })
  .openapi({
    description: 'An event describe a step of the task execution flow.',
    required: ['eventID', 'runID', 'status', 'type', 'batchSize', 'publishedAt'],
  })
  .openapi('Event')

const WatchResponseSchema = z
  .strictObject({
    runID: RunIDSchema,
    eventID: EventIDSchema.exactOptional(),
    data: z
      .array(z.object({}))
      .exactOptional()
      .openapi({
        description:
          'This field is always null when used with the Push endpoint.\nWhen used for a source discover or source validate run, it will include the sampled data of the source.\n',
      }),
    events: z
      .array(EventSchema)
      .exactOptional()
      .openapi({
        description: 'in case of error, observability events will be added to the response.',
      }),
    message: z
      .string()
      .exactOptional()
      .openapi({
        description:
          'a message describing the outcome of the operation that has been ran (push, discover or validate) run.',
      }),
    createdAt: CreatedAtSchema.exactOptional(),
  })
  .openapi({ required: ['runID'] })
  .openapi('WatchResponse')

const ReplaceAllObjectsWithTransformationResponseSchema = z
  .strictObject({
    copyOperationResponse: UpdatedAtResponseSchema.openapi({
      description: 'The response of the `operationIndex` request for the `copy` operation.',
    }),
    watchResponses: z
      .array(WatchResponseSchema)
      .openapi({ description: 'The response of the `push` request(s).' }),
    moveOperationResponse: UpdatedAtResponseSchema.openapi({
      description: 'The response of the `operationIndex` request for the `move` operation.',
    }),
  })
  .openapi({ required: ['copyOperationResponse', 'watchResponses', 'moveOperationResponse'] })
  .openapi('ReplaceAllObjectsWithTransformationResponse')

const PathInPathParamsSchema = z
  .string()
  .openapi({
    param: {
      name: 'path',
      in: 'path',
      description: 'Path of the endpoint, for example `1/newFeature`.',
      required: true,
    },
    example: '/keys',
  })

const ParametersParamsSchema = z
  .looseObject({})
  .exactOptional()
  .openapi({
    param: {
      name: 'parameters',
      in: 'query',
      description: 'Query parameters to apply to the current query.',
    },
  })

const IndexNameParamsSchema = z
  .string()
  .openapi({
    param: {
      name: 'indexName',
      in: 'path',
      description: 'Name of the index on which to perform the operation.',
      required: true,
    },
    example: 'ALGOLIA_INDEX_NAME',
  })

const ObjectIDParamsSchema = ObjectIDSchema.openapi({
  param: { name: 'objectID', in: 'path', description: 'Unique record identifier.', required: true },
})

const GetVersionParamsSchema = z
  .int()
  .default(1)
  .exactOptional()
  .openapi({
    param: {
      name: 'getVersion',
      description:
        'When set to 2, the endpoint will not include `synonyms` in the response. This parameter is here for backward compatibility.',
      in: 'query',
    },
  })

const ForwardToReplicasParamsSchema = z
  .boolean()
  .exactOptional()
  .openapi({
    param: {
      in: 'query',
      name: 'forwardToReplicas',
      required: false,
      description: 'Whether changes are applied to replica indices.',
    },
  })

const ParametersObjectIDParamsSchema = z
  .string()
  .openapi({
    param: {
      name: 'objectID',
      in: 'path',
      description: 'Unique identifier of a synonym object.',
      required: true,
    },
    example: 'synonymID',
  })

const ReplaceExistingSynonymsParamsSchema = z
  .boolean()
  .exactOptional()
  .openapi({
    param: {
      in: 'query',
      name: 'replaceExistingSynonyms',
      description:
        'Whether to replace all synonyms in the index with the ones sent with this request.',
    },
  })

const KeyStringParamsSchema = z
  .string()
  .openapi({
    param: { in: 'path', name: 'key', required: true, description: 'API key.' },
    example: 'ALGOLIA_API_KEY',
  })

const ObjectIDRuleParamsSchema = RuleIDSchema.openapi({
  param: {
    in: 'path',
    name: 'objectID',
    description: 'Unique identifier of a rule object.',
    required: true,
  },
})

const ClearExistingRulesParamsSchema = z
  .boolean()
  .exactOptional()
  .openapi({
    param: {
      in: 'query',
      name: 'clearExistingRules',
      required: false,
      description: 'Whether existing rules should be deleted before adding this batch.',
    },
  })

const DictionaryNameParamsSchema = DictionaryTypeSchema.openapi({
  param: {
    in: 'path',
    name: 'dictionaryName',
    description: 'Dictionary type in which to search.',
    required: true,
  },
})

const PageParamsSchema = z
  .xor([
    z
      .int()
      .min(0)
      .exactOptional()
      .openapi({
        param: {
          in: 'query',
          name: 'page',
          description:
            'Requested page of the API response.\nIf `null`, the API response is not paginated.\n',
          required: false,
        },
      }),
    z
      .null()
      .nullable()
      .exactOptional()
      .openapi({
        param: {
          in: 'query',
          name: 'page',
          description:
            'Requested page of the API response.\nIf `null`, the API response is not paginated.\n',
          required: false,
        },
      }),
  ])
  .default(null)
  .exactOptional()
  .openapi({
    param: {
      in: 'query',
      name: 'page',
      description:
        'Requested page of the API response.\nIf `null`, the API response is not paginated.\n',
      required: false,
    },
  })

const HitsPerPageParamsSchema = z
  .int()
  .default(100)
  .exactOptional()
  .openapi({
    param: {
      in: 'query',
      name: 'hitsPerPage',
      description: 'Number of hits per page.',
      required: false,
    },
  })

const UserIDInHeaderParamsSchema = UserIDSchema.openapi({
  param: {
    name: 'X-Algolia-User-ID',
    description: 'Unique identifier of the user who makes the search request.',
    in: 'header',
    required: true,
  },
})

const UserIDInPathParamsSchema = UserIDSchema.openapi({
  param: {
    name: 'userID',
    description: 'Unique identifier of the user who makes the search request.',
    in: 'path',
    required: true,
  },
})

const AppIdSecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'x-algolia-application-id',
  description: 'Your Algolia application ID.',
}

const ApiKeySecurityScheme = {
  type: 'apiKey',
  in: 'header',
  name: 'x-algolia-api-key',
  description:
    "Your Algolia API key with the necessary permissions to make the request.\nPermissions are controlled through access control lists (ACL) and access restrictions.\nThe required ACL to make a request is listed in each endpoint's reference.\n",
}

const BadRequestResponse = {
  description: 'Bad request or request arguments.',
  content: { 'application/json': { schema: ErrorBaseSchema } },
}

const FeatureNotEnabledResponse = {
  description: 'This feature is not enabled on your Algolia account.',
  content: { 'application/json': { schema: ErrorBaseSchema } },
}

const MethodNotAllowedResponse = {
  description: 'Method not allowed with this API key.',
  content: { 'application/json': { schema: ErrorBaseSchema } },
}

const IndexNotFoundResponse = {
  description: 'Index not found.',
  content: { 'application/json': { schema: ErrorBaseSchema } },
}

const DeletedAtResponse = {
  description: 'OK',
  content: {
    'application/json': {
      schema: z
        .strictObject({ taskID: TaskIDSchema, deletedAt: DeletedAtSchema })
        .openapi({
          title: 'deletedAtResponse',
          description: 'Response, taskID, and deletion timestamp.',
          required: ['taskID', 'deletedAt'],
        }),
    },
  },
}

const UpdatedAtWithObjectIdResponse = {
  description: 'OK',
  content: {
    'application/json': {
      schema: z
        .strictObject({
          taskID: TaskIDSchema.exactOptional(),
          updatedAt: UpdatedAtSchema.exactOptional(),
          objectID: ObjectIDSchema.exactOptional(),
        })
        .openapi({
          title: 'updatedAtWithObjectIdResponse',
          description: 'Response, taskID, unique object identifier, and an update timestamp.',
        }),
    },
  },
}

const UpdatedAtResponse = {
  description: 'OK',
  content: { 'application/json': { schema: UpdatedAtResponseSchema } },
}

const CreatedAtResponse = {
  description: 'OK',
  content: {
    'application/json': {
      schema: z
        .strictObject({ createdAt: CreatedAtSchema })
        .openapi({
          title: 'createdAtResponse',
          description: 'Response and creation timestamp.',
          required: ['createdAt'],
        }),
    },
  },
}

const IndexInSameAppResponse = {
  description: 'Indices are in the same application. Use operationIndex instead.',
  content: { 'application/json': { schema: ErrorBaseSchema } },
}

const IndexAlreadyExistsResponse = {
  description: 'Destination index already exists.',
  content: { 'application/json': { schema: ErrorBaseSchema } },
}

export const getPathRoute = createRoute({
  method: 'get',
  path: '/{path}',
  tags: ['search'],
  summary: 'Send requests to the Algolia REST API',
  description: 'This method lets you send requests to the Algolia REST API.',
  operationId: 'customGet',
  request: {
    params: z.object({ path: PathInPathParamsSchema }),
    query: z.object({ parameters: ParametersParamsSchema }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: z.object({}) } } },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const putPathRoute = createRoute({
  method: 'put',
  path: '/{path}',
  tags: ['search'],
  summary: 'Send requests to the Algolia REST API',
  description: 'This method lets you send requests to the Algolia REST API.',
  operationId: 'customPut',
  request: {
    params: z.object({ path: PathInPathParamsSchema }),
    query: z.object({ parameters: ParametersParamsSchema }),
    body: {
      description: 'Parameters to send with the custom request.',
      content: { 'application/json': { schema: z.object({}) } },
    },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: z.object({}) } } },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const postPathRoute = createRoute({
  method: 'post',
  path: '/{path}',
  tags: ['search'],
  summary: 'Send requests to the Algolia REST API',
  description: 'This method lets you send requests to the Algolia REST API.',
  operationId: 'customPost',
  request: {
    params: z.object({ path: PathInPathParamsSchema }),
    query: z.object({ parameters: ParametersParamsSchema }),
    body: {
      description: 'Parameters to send with the custom request.',
      content: { 'application/json': { schema: z.object({}) } },
    },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: z.object({}) } } },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const deletePathRoute = createRoute({
  method: 'delete',
  path: '/{path}',
  tags: ['search'],
  summary: 'Send requests to the Algolia REST API',
  description: 'This method lets you send requests to the Algolia REST API.',
  operationId: 'customDelete',
  request: {
    params: z.object({ path: PathInPathParamsSchema }),
    query: z.object({ parameters: ParametersParamsSchema }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: z.object({}) } } },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesIndexNameQueryRoute = createRoute({
  method: 'post',
  path: '/1/indexes/{indexName}/query',
  tags: ['search'],
  summary: 'Search an index',
  description:
    'Searches a single index and returns matching search results as hits.\n\nThis method lets you retrieve up to 1,000 hits.\nIf you need more, use the [`browse` operation](https://www.algolia.com/doc/rest-api/search/browse) or increase the `paginatedLimitedTo` index setting.\n',
  operationId: 'searchSingleIndex',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema }),
    body: { content: { 'application/json': { schema: SearchParamsSchema } } },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: SearchResponseSchema } } },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesQueriesRoute = createRoute({
  method: 'post',
  path: '/1/indexes/*/queries',
  tags: ['search'],
  summary: 'Search multiple indices',
  description:
    'Sends multiple search requests to one or more indices.\n\nThis can be useful in these cases:\n\n- Different indices for different purposes, such as, one index for products, another one for marketing content.\n- Multiple searches to the same index—for example, with different filters.\n\nUse the helper `searchForHits` or `searchForFacets` to get the results in a more convenient format, if you already know the return type you want.\n',
  operationId: 'search',
  request: {
    body: {
      description:
        'Muli-search request body. Results are returned in the same order as the requests.',
      content: {
        'application/json': {
          schema: z
            .strictObject({
              requests: z.array(SearchQuerySchema),
              strategy: SearchStrategySchema.exactOptional(),
            })
            .openapi({ title: 'searchMethodParams', required: ['requests'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({ results: z.array(SearchResultSchema) })
            .openapi({ title: 'searchResponses', required: ['results'] }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesIndexNameFacetsFacetNameQueryRoute = createRoute({
  method: 'post',
  path: '/1/indexes/{indexName}/facets/{facetName}/query',
  tags: ['search'],
  summary: 'Search for facet values',
  description:
    "Searches for values of a specified facet attribute.\n\n- By default, facet values are sorted by decreasing count.\n  You can adjust this with the `sortFacetValueBy` parameter.\n- Searching for facet values doesn't work if you have **more than 65 searchable facets and searchable attributes combined**.\n",
  operationId: 'searchForFacetValues',
  request: {
    params: z.object({
      indexName: IndexNameParamsSchema,
      facetName: z
        .string()
        .openapi({
          param: {
            name: 'facetName',
            description:
              'Facet attribute in which to search for values.\n\nThis attribute must be included in the `attributesForFaceting` index setting with the `searchable()` modifier.\n',
            in: 'path',
            required: true,
          },
        }),
    }),
    body: {
      content: {
        'application/json': {
          schema: z
            .strictObject({
              params: ParamsAsStringSchema.exactOptional(),
              facetQuery: FacetQuerySchema.exactOptional(),
              maxFacetHits: MaxFacetHitsSchema.exactOptional(),
            })
            .openapi({ title: 'searchForFacetValuesRequest' }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: SearchForFacetValuesResponseSchema } },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesIndexNameBrowseRoute = createRoute({
  method: 'post',
  path: '/1/indexes/{indexName}/browse',
  tags: ['search'],
  summary: 'Browse for records',
  description:
    "Retrieves records from an index, up to 1,000 per request.\n\nWhile searching retrieves _hits_ (records augmented with attributes for highlighting and ranking details),\nbrowsing _just_ returns matching records.\nThis can be useful if you want to export your indices.\n\n- The Analytics API doesn't collect data when using `browse`.\n- Records are ranked by attributes and custom ranking.\n- There's no ranking for: typo-tolerance, number of matched words, proximity, geo distance.\n\nBrowse requests automatically apply these settings:\n\n- `advancedSyntax`: `false`\n- `attributesToHighlight`: `[]`\n- `attributesToSnippet`: `[]`\n- `distinct`: `false`\n- `enablePersonalization`: `false`\n- `enableRules`: `false`\n- `facets`: `[]`\n- `getRankingInfo`: `false`\n- `ignorePlurals`: `false`\n- `optionalFilters`: `[]`\n- `typoTolerance`: `true` or `false` (`min` and `strict` evaluate to `true`)\n\nIf you send these parameters with your browse requests, they'll be ignored.\n",
  operationId: 'browse',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema }),
    body: { content: { 'application/json': { schema: BrowseParamsSchema } } },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: BrowseResponseSchema } } },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesIndexNameRoute = createRoute({
  method: 'post',
  path: '/1/indexes/{indexName}',
  tags: ['search'],
  summary: 'Add a new record (with auto-generated object ID)',
  description:
    "Adds a record to an index or replaces it.\n\n- If the record doesn't have an object ID, a new record with an auto-generated object ID is added to your index.\n- If a record with the specified object ID exists, the existing record is replaced.\n- If a record with the specified object ID doesn't exist, a new record is added to your index.\n- If you add a record to an index that doesn't exist yet, a new index is created.\n\nTo update _some_ attributes of a record, use the [`partial` operation](https://www.algolia.com/doc/rest-api/search/partial-update-object).\nTo add, update, or replace multiple records, use the [`batch` operation](https://www.algolia.com/doc/rest-api/search/batch).\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
  operationId: 'saveObject',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema }),
    body: {
      description:
        'The record. A schemaless object with attributes that are useful in the context of search and discovery.',
      content: {
        'application/json': {
          schema: z
            .object({})
            .openapi({
              example: { objectID: 'blackTShirt', name: 'Black T-shirt', color: '#000000' },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Created',
      content: {
        'application/json': {
          schema: z
            .strictObject({
              createdAt: CreatedAtSchema,
              taskID: TaskIDSchema,
              objectID: ObjectIDSchema.exactOptional(),
            })
            .openapi({ title: 'saveObjectResponse', required: ['taskID', 'createdAt'] }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const delete1IndexesIndexNameRoute = createRoute({
  method: 'delete',
  path: '/1/indexes/{indexName}',
  tags: ['search'],
  summary: 'Delete an index',
  description:
    "Deletes an index and all its settings.\n\n- Deleting an index doesn't delete its analytics data.\n- If you try to delete a non-existing index, the operation is ignored without warning.\n- If the index you want to delete has replica indices, the replicas become independent indices.\n- If the index you want to delete is a replica index, you must first unlink it from its primary index before you can delete it.\n  For more information, see [Delete replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/deleting-replicas).\n",
  externalDocs: {
    url: 'https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/delete-indices',
    description: 'Delete indices.',
  },
  operationId: 'deleteIndex',
  request: { params: z.object({ indexName: IndexNameParamsSchema }) },
  responses: {
    200: DeletedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const get1IndexesIndexNameObjectIDRoute = createRoute({
  method: 'get',
  path: '/1/indexes/{indexName}/{objectID}',
  tags: ['search'],
  summary: 'Retrieve a record',
  description:
    'Retrieves one record by its object ID.\n\nTo retrieve more than one record, use the [`objects` operation](https://www.algolia.com/doc/rest-api/search/get-objects).\n',
  operationId: 'getObject',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema, objectID: ObjectIDParamsSchema }),
    query: z.object({
      attributesToRetrieve: z
        .array(
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'attributesToRetrieve',
                in: 'query',
                description:
                  "Attributes to include with the records in the response.\nThis is useful to reduce the size of the API response.\nBy default, all retrievable attributes are returned.\n\n`objectID` is always retrieved.\n\nAttributes included in `unretrievableAttributes`\nwon't be retrieved unless the request is authenticated with the admin API key.\n",
              },
            }),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'attributesToRetrieve',
            in: 'query',
            description:
              "Attributes to include with the records in the response.\nThis is useful to reduce the size of the API response.\nBy default, all retrievable attributes are returned.\n\n`objectID` is always retrieved.\n\nAttributes included in `unretrievableAttributes`\nwon't be retrieved unless the request is authenticated with the admin API key.\n",
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({})
            .openapi({ description: 'The requested record.', 'x-is-generic': true }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const put1IndexesIndexNameObjectIDRoute = createRoute({
  method: 'put',
  path: '/1/indexes/{indexName}/{objectID}',
  tags: ['search'],
  summary: 'Add or replace a record',
  description:
    'If a record with the specified object ID exists, the existing record is replaced.\nOtherwise, a new record is added to the index.\n\nIf you want to use auto-generated object IDs, use the [`saveObject` operation](https://www.algolia.com/doc/rest-api/search/save-object).\nTo update _some_ attributes of an existing record, use the [`partial` operation](https://www.algolia.com/doc/rest-api/search/partial-update-object) instead.\nTo add, update, or replace multiple records, use the [`batch` operation](https://www.algolia.com/doc/rest-api/search/batch).\n',
  operationId: 'addOrUpdateObject',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema, objectID: ObjectIDParamsSchema }),
    body: {
      description:
        'The record. A schemaless object with attributes that are useful in the context of search and discovery.',
      content: {
        'application/json': {
          schema: z
            .object({})
            .openapi({
              example: { objectID: 'blackTShirt', name: 'Black T-shirt', color: '#000000' },
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: UpdatedAtWithObjectIdResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const delete1IndexesIndexNameObjectIDRoute = createRoute({
  method: 'delete',
  path: '/1/indexes/{indexName}/{objectID}',
  tags: ['search'],
  summary: 'Delete a record',
  description:
    'Deletes a record by its object ID.\n\nTo delete more than one record, use the [`batch` operation](https://www.algolia.com/doc/rest-api/search/batch).\nTo delete records matching a query, use the [`deleteBy` operation](https://www.algolia.com/doc/rest-api/search/delete-by).\n',
  operationId: 'deleteObject',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema, objectID: ObjectIDParamsSchema }),
  },
  responses: {
    200: DeletedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesIndexNameDeleteByQueryRoute = createRoute({
  method: 'post',
  path: '/1/indexes/{indexName}/deleteByQuery',
  tags: ['search'],
  summary: 'Delete records matching a filter',
  description:
    "This operation doesn't accept empty filters.\n\nThis operation is resource-intensive.\nYou should only use it if you can't get the object IDs of the records you want to delete.\nIt's more efficient to get a list of object IDs with the [`browse` operation](https://www.algolia.com/doc/rest-api/search/browse),\nand then delete the records using the [`batch` operation](https://www.algolia.com/doc/rest-api/search/batch).\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
  externalDocs: {
    url: 'https://support.algolia.com/hc/articles/16385098766353-Should-I-use-the-deleteBy-method-for-deleting-records-that-match-a-query',
    description: 'Should I use the deleteBy method for deleting records.',
  },
  operationId: 'deleteBy',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema }),
    body: { content: { 'application/json': { schema: DeleteByParamsSchema } }, required: true },
  },
  responses: {
    200: UpdatedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesIndexNameClearRoute = createRoute({
  method: 'post',
  path: '/1/indexes/{indexName}/clear',
  tags: ['search'],
  summary: 'Delete all records from an index',
  description:
    'Deletes only the records from an index while keeping settings, synonyms, and rules.\nThis operation is resource-intensive and subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n',
  operationId: 'clearObjects',
  request: { params: z.object({ indexName: IndexNameParamsSchema }) },
  responses: {
    200: UpdatedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesIndexNameObjectIDPartialRoute = createRoute({
  method: 'post',
  path: '/1/indexes/{indexName}/{objectID}/partial',
  tags: ['search'],
  summary: 'Add or update attributes',
  description:
    "Adds new attributes to a record, or updates existing ones.\n\n- If a record with the specified object ID doesn't exist,\n  a new record is added to the index **if** `createIfNotExists` is true.\n- If the index doesn't exist yet, this method creates a new index.\n- You can use any first-level attribute but not nested attributes.\n  If you specify a nested attribute, this operation replaces its first-level ancestor.\n\nTo update an attribute without pushing the entire record, you can use these built-in operations.\nThese operations can be helpful if you don't have access to your initial data.\n\n- Increment: increment a numeric attribute\n- Decrement: decrement a numeric attribute\n- Add: append a number or string element to an array attribute\n- Remove: remove all matching number or string elements from an array attribute made of numbers or strings\n- AddUnique: add a number or string element to an array attribute made of numbers or strings only if it's not already present\n- IncrementFrom: increment a numeric integer attribute only if the provided value matches the current value, and otherwise ignore the whole object update. For example, if you pass an IncrementFrom value of 2 for the version attribute, but the current value of the attribute is 1, the engine ignores the update. If the object doesn't exist, the engine only creates it if you pass an IncrementFrom value of 0.\n- IncrementSet: increment a numeric integer attribute only if the provided value is greater than the current value, and otherwise ignore the whole object update. For example, if you pass an IncrementSet value of 2 for the version attribute, and the current value of the attribute is 1, the engine updates the object. If the object doesn't exist yet, the engine only creates it if you pass an IncrementSet value greater than 0.\n\nYou can specify an operation by providing an object with the attribute to update as the key and its value being an object with the following properties:\n\n- _operation: the operation to apply on the attribute\n- value: the right-hand side argument to the operation, for example, increment or decrement step, value to add or remove.\n\nWhen updating multiple attributes or using multiple operations targeting the same record, you should use a single partial update for faster processing.\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
  operationId: 'partialUpdateObject',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema, objectID: ObjectIDParamsSchema }),
    query: z.object({
      createIfNotExists: z
        .stringbool()
        .default(true)
        .exactOptional()
        .openapi({
          param: {
            name: 'createIfNotExists',
            description: "Whether to create a new record if it doesn't exist.",
            in: 'query',
          },
        }),
    }),
    body: {
      description: 'Attributes with their values.',
      content: {
        'application/json': {
          schema: z.object({}).openapi({ description: 'Attributes to update.' }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: UpdatedAtWithObjectIdResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesIndexNameBatchRoute = createRoute({
  method: 'post',
  path: '/1/indexes/{indexName}/batch',
  tags: ['search'],
  summary: 'Batch indexing operations on one index',
  description:
    "Adds, updates, or deletes records in one index with a single API request.\n\nBatching index updates reduces latency and increases data integrity.\n\n- Actions are applied in the order they're specified.\n- Actions are equivalent to the individual API requests of the same name.\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
  operationId: 'batch',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema }),
    body: { content: { 'application/json': { schema: BatchWriteParamsSchema } }, required: true },
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: BatchResponseSchema } } },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesBatchRoute = createRoute({
  method: 'post',
  path: '/1/indexes/*/batch',
  tags: ['search'],
  summary: 'Batch indexing operations on multiple indices',
  description:
    'Adds, updates, or deletes records in multiple indices with a single API request.\n\n- Actions are applied in the order they are specified.\n- Actions are equivalent to the individual API requests of the same name.\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n',
  operationId: 'multipleBatch',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .strictObject({
              requests: z.array(
                z
                  .strictObject({
                    action: ActionSchema,
                    body: z
                      .object({})
                      .exactOptional()
                      .openapi({
                        description: 'Operation arguments (varies with specified `action`).',
                      }),
                    indexName: IndexNameSchema,
                  })
                  .openapi({ title: 'multipleBatchRequest', required: ['action', 'indexName'] }),
              ),
            })
            .openapi({
              title: 'batchParams',
              description: 'Batch parameters.',
              required: ['requests'],
            }),
          examples: {
            batch: {
              summary: 'Batch indexing request to two indices',
              value: {
                requests: [
                  {
                    action: 'addObject',
                    indexName: 'contacts',
                    body: {
                      name: 'Betty Jane McCamey',
                      company: 'Vita Foods Inc.',
                      email: 'betty@mccamey.com',
                    },
                  },
                  {
                    action: 'addObject',
                    indexName: 'public_contacts',
                    body: {
                      name: 'Gayla Geimer',
                      company: 'Ortman McCain Co.',
                      email: 'gayla@geimer.com',
                    },
                  },
                ],
              },
            },
          },
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({
              taskID: z
                .record(z.string(), TaskIDSchema)
                .openapi({ description: 'Task IDs. One for each index.' }),
              objectIDs: ObjectIDsSchema,
            })
            .openapi({ title: 'multipleBatchResponse', required: ['taskID', 'objectIDs'] }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesObjectsRoute = createRoute({
  method: 'post',
  path: '/1/indexes/*/objects',
  tags: ['search'],
  summary: 'Retrieve records',
  description:
    'Retrieves one or more records, potentially from different indices.\n\nRecords are returned in the same order as the requests.\n',
  operationId: 'getObjects',
  request: {
    body: {
      description: 'Request object.',
      content: {
        'application/json': {
          schema: z
            .strictObject({
              requests: z.array(
                z
                  .strictObject({
                    attributesToRetrieve: z
                      .array(z.string())
                      .exactOptional()
                      .openapi({
                        description:
                          'Attributes to retrieve.\nIf not specified, all retrievable attributes are returned.\n',
                        example: ['author', 'title', 'content'],
                      }),
                    objectID: z
                      .string()
                      .openapi({
                        description: 'Object ID for the record to retrieve.',
                        example: 'product-1',
                      }),
                    indexName: z
                      .string()
                      .openapi({
                        description: 'Index from which to retrieve the records.',
                        example: 'books',
                      }),
                  })
                  .openapi({
                    title: 'getObjectsRequest',
                    description: 'Request body for retrieving records.',
                    required: ['objectID', 'indexName'],
                  }),
              ),
            })
            .openapi({
              title: 'getObjectsParams',
              description: 'Request parameters.',
              required: ['requests'],
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({
              message: z
                .string()
                .exactOptional()
                .openapi({
                  description: 'An optional status message.',
                  example: 'Index INDEX_NAME does not exist.',
                }),
              results: z
                .array(
                  z.object({}).openapi({ description: 'Retrieved record.', 'x-is-generic': true }),
                )
                .openapi({ description: 'Retrieved records.' }),
            })
            .openapi({ title: 'getObjectsResponse', required: ['results'] }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const get1IndexesIndexNameSettingsRoute = createRoute({
  method: 'get',
  path: '/1/indexes/{indexName}/settings',
  tags: ['search'],
  summary: 'Retrieve index settings',
  description: 'Retrieves an object with non-null index settings.',
  operationId: 'getSettings',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema }),
    query: z.object({ getVersion: GetVersionParamsSchema }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: SettingsResponseSchema } } },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const put1IndexesIndexNameSettingsRoute = createRoute({
  method: 'put',
  path: '/1/indexes/{indexName}/settings',
  tags: ['search'],
  summary: 'Update index settings',
  description:
    "Update the specified index settings.\n\nIndex settings that you don't specify are left unchanged.\nSpecify `null` to reset a setting to its default value.\n\nFor best performance, update the index settings before you add new records to your index.\n",
  operationId: 'setSettings',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema }),
    query: z.object({ forwardToReplicas: ForwardToReplicasParamsSchema }),
    body: { content: { 'application/json': { schema: IndexSettingsSchema } }, required: true },
  },
  responses: {
    200: UpdatedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const get1IndexesIndexNameSynonymsObjectIDRoute = createRoute({
  method: 'get',
  path: '/1/indexes/{indexName}/synonyms/{objectID}',
  tags: ['search'],
  summary: 'Retrieve a synonym',
  description:
    'Retrieves a synonym by its ID.\nTo find the object IDs for your synonyms,\nuse the [`search` operation](https://www.algolia.com/doc/rest-api/search/search-synonyms).\n',
  operationId: 'getSynonym',
  request: {
    params: z.object({
      indexName: IndexNameParamsSchema,
      objectID: ParametersObjectIDParamsSchema,
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: SynonymHitSchema } } },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const put1IndexesIndexNameSynonymsObjectIDRoute = createRoute({
  method: 'put',
  path: '/1/indexes/{indexName}/synonyms/{objectID}',
  tags: ['search'],
  summary: 'Create or replace a synonym',
  description:
    "If a synonym with the specified object ID doesn't exist, Algolia adds a new one.\nOtherwise, the existing synonym is replaced.\nTo add multiple synonyms in a single API request, use the [`batch` operation](https://www.algolia.com/doc/rest-api/search/save-synonyms).\n",
  operationId: 'saveSynonym',
  request: {
    params: z.object({
      indexName: IndexNameParamsSchema,
      objectID: ParametersObjectIDParamsSchema,
    }),
    query: z.object({ forwardToReplicas: ForwardToReplicasParamsSchema }),
    body: { content: { 'application/json': { schema: SynonymHitSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({ taskID: TaskIDSchema, updatedAt: UpdatedAtSchema, id: IdSchema })
            .openapi({ title: 'saveSynonymResponse', required: ['taskID', 'updatedAt', 'id'] }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const delete1IndexesIndexNameSynonymsObjectIDRoute = createRoute({
  method: 'delete',
  path: '/1/indexes/{indexName}/synonyms/{objectID}',
  tags: ['search'],
  summary: 'Delete a synonym',
  description:
    'Deletes a synonym by its ID.\nTo find the object IDs of your synonyms, use the [`search` operation](https://www.algolia.com/doc/rest-api/search/search-synonyms).\n',
  operationId: 'deleteSynonym',
  request: {
    params: z.object({
      indexName: IndexNameParamsSchema,
      objectID: ParametersObjectIDParamsSchema,
    }),
    query: z.object({ forwardToReplicas: ForwardToReplicasParamsSchema }),
  },
  responses: {
    200: DeletedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesIndexNameSynonymsBatchRoute = createRoute({
  method: 'post',
  path: '/1/indexes/{indexName}/synonyms/batch',
  tags: ['search'],
  summary: 'Create or replace synonyms',
  description:
    "If a synonym with the `objectID` doesn't exist, Algolia adds a new one.\nOtherwise, existing synonyms are replaced.\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
  operationId: 'saveSynonyms',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema }),
    query: z.object({
      forwardToReplicas: ForwardToReplicasParamsSchema,
      replaceExistingSynonyms: ReplaceExistingSynonymsParamsSchema,
    }),
    body: { content: { 'application/json': { schema: SynonymHitsSchema } }, required: true },
  },
  responses: {
    200: UpdatedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesIndexNameSynonymsClearRoute = createRoute({
  method: 'post',
  path: '/1/indexes/{indexName}/synonyms/clear',
  tags: ['search'],
  summary: 'Delete all synonyms',
  description: 'Deletes all synonyms from the index.',
  operationId: 'clearSynonyms',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema }),
    query: z.object({ forwardToReplicas: ForwardToReplicasParamsSchema }),
  },
  responses: {
    200: UpdatedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesIndexNameSynonymsSearchRoute = createRoute({
  method: 'post',
  path: '/1/indexes/{indexName}/synonyms/search',
  tags: ['search'],
  summary: 'Search for synonyms',
  description: 'Searches for synonyms in your index.',
  operationId: 'searchSynonyms',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema }),
    body: {
      description: 'Body of the `searchSynonyms` operation.',
      content: {
        'application/json': {
          schema: z
            .strictObject({
              query: QuerySchema.exactOptional(),
              type: SynonymTypeSchema.exactOptional(),
              page: PageSchema.exactOptional(),
              hitsPerPage: HitsPerPageSchema.exactOptional(),
            })
            .openapi({ title: 'searchSynonymsParams' }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: SearchSynonymsResponseSchema } },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const get1KeysRoute = createRoute({
  method: 'get',
  path: '/1/keys',
  tags: ['search'],
  summary: 'List API keys',
  description:
    'Lists all API keys associated with your Algolia application, including their permissions and restrictions.',
  operationId: 'listApiKeys',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({
              keys: z.array(GetApiKeyResponseSchema).openapi({ description: 'API keys.' }),
            })
            .openapi({ title: 'listApiKeysResponse', required: ['keys'] }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1KeysRoute = createRoute({
  method: 'post',
  path: '/1/keys',
  tags: ['search'],
  summary: 'Create an API key',
  description: 'Creates a new API key with specific permissions and restrictions.',
  operationId: 'addApiKey',
  request: { body: { content: { 'application/json': { schema: ApiKeySchema } }, required: true } },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: AddApiKeyResponseSchema } },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const get1KeysKeyRoute = createRoute({
  method: 'get',
  path: '/1/keys/{key}',
  tags: ['search'],
  summary: 'Retrieve API key permissions',
  description:
    "Gets the permissions and restrictions of an API key.\n\nWhen authenticating with the admin API key, you can request information for any of your application's keys.\nWhen authenticating with other API keys, you can only retrieve information for that key,\nwith the description replaced by `<redacted>`.\n",
  operationId: 'getApiKey',
  request: { params: z.object({ key: KeyStringParamsSchema }) },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: GetApiKeyResponseSchema } },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const put1KeysKeyRoute = createRoute({
  method: 'put',
  path: '/1/keys/{key}',
  tags: ['search'],
  summary: 'Update an API key',
  description:
    'Replaces the permissions of an existing API key.\n\nAny unspecified attribute resets that attribute to its default value.\n',
  operationId: 'updateApiKey',
  request: {
    params: z.object({ key: KeyStringParamsSchema }),
    body: { content: { 'application/json': { schema: ApiKeySchema } }, required: true },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({ key: KeyStringSchema, updatedAt: UpdatedAtSchema })
            .openapi({ title: 'updateApiKeyResponse', required: ['key', 'updatedAt'] }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const delete1KeysKeyRoute = createRoute({
  method: 'delete',
  path: '/1/keys/{key}',
  tags: ['search'],
  summary: 'Delete an API key',
  description: 'Deletes the API key.',
  operationId: 'deleteApiKey',
  request: { params: z.object({ key: KeyStringParamsSchema }) },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({ deletedAt: DeletedAtSchema })
            .openapi({ title: 'deleteApiKeyResponse', required: ['deletedAt'] }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1KeysKeyRestoreRoute = createRoute({
  method: 'post',
  path: '/1/keys/{key}/restore',
  tags: ['search'],
  summary: 'Restore an API key',
  description:
    "Restores a deleted API key.\n\nRestoring resets the `validity` attribute to `0`.\n\nAlgolia stores up to 1,000 API keys per application.\nIf you create more, the oldest API keys are deleted and can't be restored.\n",
  operationId: 'restoreApiKey',
  request: { params: z.object({ key: KeyStringParamsSchema }) },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: AddApiKeyResponseSchema } },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const get1IndexesIndexNameRulesObjectIDRoute = createRoute({
  method: 'get',
  path: '/1/indexes/{indexName}/rules/{objectID}',
  tags: ['search'],
  summary: 'Retrieve a rule',
  description:
    'Retrieves a rule by its ID.\nTo find the object ID of rules, use the [`search` operation](https://www.algolia.com/doc/rest-api/search/search-rules).\n',
  operationId: 'getRule',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema, objectID: ObjectIDRuleParamsSchema }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: RuleSchema } } },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const put1IndexesIndexNameRulesObjectIDRoute = createRoute({
  method: 'put',
  path: '/1/indexes/{indexName}/rules/{objectID}',
  tags: ['search'],
  summary: 'Create or replace a rule',
  description:
    "If a rule with the specified object ID doesn't exist, it's created.\nOtherwise, the existing rule is replaced.\n\nTo create or update more than one rule, use the [`batch` operation](https://www.algolia.com/doc/rest-api/search/save-rules).\n",
  operationId: 'saveRule',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema, objectID: ObjectIDRuleParamsSchema }),
    query: z.object({ forwardToReplicas: ForwardToReplicasParamsSchema }),
    body: { content: { 'application/json': { schema: RuleSchema } }, required: true },
  },
  responses: {
    200: UpdatedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const delete1IndexesIndexNameRulesObjectIDRoute = createRoute({
  method: 'delete',
  path: '/1/indexes/{indexName}/rules/{objectID}',
  tags: ['search'],
  summary: 'Delete a rule',
  description:
    'Deletes a rule by its ID.\nTo find the object ID for rules,\nuse the [`search` operation](https://www.algolia.com/doc/rest-api/search/search-rules).\n',
  operationId: 'deleteRule',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema, objectID: ObjectIDRuleParamsSchema }),
    query: z.object({ forwardToReplicas: ForwardToReplicasParamsSchema }),
  },
  responses: {
    200: UpdatedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesIndexNameRulesBatchRoute = createRoute({
  method: 'post',
  path: '/1/indexes/{indexName}/rules/batch',
  tags: ['search'],
  summary: 'Create or update rules',
  description:
    "Create or update multiple rules.\n\nIf a rule with the specified object ID doesn't exist, Algolia creates a new one.\nOtherwise, existing rules are replaced.\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
  operationId: 'saveRules',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema }),
    query: z.object({
      forwardToReplicas: ForwardToReplicasParamsSchema,
      clearExistingRules: ClearExistingRulesParamsSchema,
    }),
    body: {
      content: {
        'application/json': {
          schema: z.array(RuleSchema).openapi({ description: 'Rules to add or replace.' }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: UpdatedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesIndexNameRulesClearRoute = createRoute({
  method: 'post',
  path: '/1/indexes/{indexName}/rules/clear',
  tags: ['search'],
  summary: 'Delete all rules',
  description: 'Deletes all rules from the index.',
  operationId: 'clearRules',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema }),
    query: z.object({ forwardToReplicas: ForwardToReplicasParamsSchema }),
  },
  responses: {
    200: UpdatedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesIndexNameRulesSearchRoute = createRoute({
  method: 'post',
  path: '/1/indexes/{indexName}/rules/search',
  tags: ['search'],
  summary: 'Search for rules',
  description: 'Searches for rules in your index.',
  operationId: 'searchRules',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .strictObject({
              query: ParametersQuerySchema.exactOptional(),
              anchoring: AnchoringSchema.exactOptional(),
              context: z
                .string()
                .exactOptional()
                .openapi({
                  description: 'Only return rules that match the context (exact match).',
                  example: 'mobile',
                }),
              page: ParametersPageSchema.exactOptional(),
              hitsPerPage: ParametersHitsPerPageSchema.exactOptional(),
              enabled: z
                .xor([
                  z
                    .boolean()
                    .openapi({
                      description:
                        'If `true`, return only enabled rules.\nIf `false`, return only inactive rules.\nBy default, _all_ rules are returned.\n',
                    }),
                  z.null().nullable(),
                ])
                .default(null)
                .exactOptional(),
            })
            .openapi({ title: 'searchRulesParams', description: 'Rules search parameters.' }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({
              hits: z
                .array(RuleSchema)
                .openapi({ description: 'Rules that matched the search criteria.' }),
              nbHits: z
                .int()
                .openapi({ description: 'Number of rules that matched the search criteria.' }),
              page: z.int().openapi({ description: 'Current page.' }),
              nbPages: z.int().openapi({ description: 'Number of pages.' }),
            })
            .openapi({
              title: 'searchRulesResponse',
              required: ['hits', 'nbHits', 'page', 'nbPages'],
            }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1DictionariesDictionaryNameBatchRoute = createRoute({
  method: 'post',
  path: '/1/dictionaries/{dictionaryName}/batch',
  tags: ['search'],
  summary: 'Add or delete dictionary entries',
  description:
    'Adds or deletes multiple entries from your plurals, segmentation, or stop word dictionaries.',
  operationId: 'batchDictionaryEntries',
  request: {
    params: z.object({ dictionaryName: DictionaryNameParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .strictObject({
              clearExistingDictionaryEntries: z
                .boolean()
                .default(false)
                .exactOptional()
                .openapi({
                  description:
                    'Whether to replace all custom entries in the dictionary with the ones sent with this request.',
                }),
              requests: z
                .array(
                  z
                    .strictObject({ action: DictionaryActionSchema, body: DictionaryEntrySchema })
                    .openapi({
                      title: 'batchDictionaryEntriesRequest',
                      required: ['action', 'body'],
                    }),
                )
                .openapi({ description: 'List of additions and deletions to your dictionaries.' }),
            })
            .openapi({
              title: 'batchDictionaryEntriesParams',
              description: 'Request body for updating dictionary entries.',
              required: ['requests'],
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: UpdatedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1DictionariesDictionaryNameSearchRoute = createRoute({
  method: 'post',
  path: '/1/dictionaries/{dictionaryName}/search',
  tags: ['search'],
  summary: 'Search dictionary entries',
  description: 'Searches for standard and custom dictionary entries.',
  operationId: 'searchDictionaryEntries',
  request: {
    params: z.object({ dictionaryName: DictionaryNameParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .strictObject({
              query: QuerySchema,
              page: PageSchema.exactOptional(),
              hitsPerPage: HitsPerPageSchema.exactOptional(),
              language: SupportedLanguageSchema.exactOptional(),
            })
            .openapi({
              title: 'searchDictionaryEntriesParams',
              description: 'Search parameter.',
              required: ['query'],
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: SearchDictionaryEntriesResponseSchema } },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const get1DictionariesSettingsRoute = createRoute({
  method: 'get',
  path: '/1/dictionaries/*/settings',
  tags: ['search'],
  summary: 'Retrieve dictionary settings',
  description: 'Retrieves the languages for which standard dictionary entries are turned off.',
  operationId: 'getDictionarySettings',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({ disableStandardEntries: StandardEntriesSchema })
            .openapi({
              title: 'getDictionarySettingsResponse',
              required: ['disableStandardEntries'],
            }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const put1DictionariesSettingsRoute = createRoute({
  method: 'put',
  path: '/1/dictionaries/*/settings',
  tags: ['search'],
  summary: 'Update dictionary settings',
  description: 'Turns standard stop word dictionary entries on or off for a given language.',
  operationId: 'setDictionarySettings',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .strictObject({ disableStandardEntries: StandardEntriesSchema })
            .openapi({
              title: 'dictionarySettingsParams',
              description:
                'Turn on or off the built-in Algolia stop words for a specific language.\n',
              required: ['disableStandardEntries'],
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: UpdatedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const get1DictionariesLanguagesRoute = createRoute({
  method: 'get',
  path: '/1/dictionaries/*/languages',
  tags: ['search'],
  summary: 'List available languages',
  description:
    'Lists supported languages with their supported dictionary types and number of custom entries.\n',
  externalDocs: {
    url: 'https://www.algolia.com/doc/guides/managing-results/optimize-search-results/handling-natural-languages-nlp/in-depth/supported-languages',
    description: 'Supported languages.',
  },
  operationId: 'getDictionaryLanguages',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .record(
              z.string(),
              LanguagesSchema.openapi({ 'x-additionalPropertiesName': 'language' }),
            )
            .openapi({ title: 'getDictionaryLanguagesResponse' }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const get1ClustersMappingRoute = createRoute({
  method: 'get',
  path: '/1/clusters/mapping',
  tags: ['search'],
  summary: 'List user IDs',
  description:
    "Lists the userIDs assigned to a multi-cluster application.\n\nSince it can take a few seconds to get the data from the different clusters,\nthe response isn't real-time.\n",
  operationId: 'listUserIds',
  request: { query: z.object({ page: PageParamsSchema, hitsPerPage: HitsPerPageParamsSchema }) },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ userIDs: z.array(UserIdSchema).openapi({ description: 'User IDs.' }) })
            .openapi({
              title: 'listUserIdsResponse',
              description: 'User ID data.',
              required: ['userIDs'],
            }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
  deprecated: true,
})

export const post1ClustersMappingRoute = createRoute({
  method: 'post',
  path: '/1/clusters/mapping',
  tags: ['search'],
  summary: 'Assign or move a user ID',
  description:
    'Assigns or moves a user ID to a cluster.\n\nThe time it takes to move a user is proportional to the amount of data linked to the user ID.\n',
  operationId: 'assignUserId',
  request: {
    headers: z.object({ 'X-Algolia-User-ID': UserIDInHeaderParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .strictObject({ cluster: ClusterNameSchema })
            .openapi({
              title: 'assignUserIdParams',
              description: 'Assign userID parameters.',
              required: ['cluster'],
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: CreatedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
  deprecated: true,
})

export const post1ClustersMappingBatchRoute = createRoute({
  method: 'post',
  path: '/1/clusters/mapping/batch',
  tags: ['search'],
  summary: 'Assign multiple userIDs',
  description:
    "Assigns multiple user IDs to a cluster.\n\n**You can't move users with this operation**.\n",
  operationId: 'batchAssignUserIds',
  request: {
    headers: z.object({ 'X-Algolia-User-ID': UserIDInHeaderParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .strictObject({
              cluster: ClusterNameSchema,
              users: z
                .array(z.string())
                .openapi({
                  description: 'User IDs to assign.',
                  example: ['einstein', 'bohr', 'feynman'],
                }),
            })
            .openapi({
              title: 'batchAssignUserIdsParams',
              description: 'Assign userID parameters.',
              required: ['cluster', 'users'],
            }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: CreatedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
  deprecated: true,
})

export const get1ClustersMappingTopRoute = createRoute({
  method: 'get',
  path: '/1/clusters/mapping/top',
  tags: ['search'],
  summary: 'Get top user IDs',
  description:
    "Get the IDs of the 10 users with the highest number of records per cluster.\n\nSince it can take a few seconds to get the data from the different clusters,\nthe response isn't real-time.\n",
  operationId: 'getTopUserIds',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({
              topUsers: z
                .array(
                  z.record(
                    z.string(),
                    z.array(UserIdSchema).openapi({ 'x-additionalPropertiesName': 'cluster' }),
                  ),
                )
                .openapi({
                  description:
                    'Key-value pairs with cluster names as keys and lists of users with the highest number of records per cluster as values.',
                }),
            })
            .openapi({
              title: 'getTopUserIdsResponse',
              description: 'User IDs and clusters.',
              required: ['topUsers'],
            }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
  deprecated: true,
})

export const get1ClustersMappingUserIDRoute = createRoute({
  method: 'get',
  path: '/1/clusters/mapping/{userID}',
  tags: ['search'],
  summary: 'Retrieve user ID',
  description:
    "Returns the user ID data stored in the mapping.\n\nSince it can take a few seconds to get the data from the different clusters,\nthe response isn't real-time.\n",
  operationId: 'getUserId',
  request: { params: z.object({ userID: UserIDInPathParamsSchema }) },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: UserIdSchema } } },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
  deprecated: true,
})

export const delete1ClustersMappingUserIDRoute = createRoute({
  method: 'delete',
  path: '/1/clusters/mapping/{userID}',
  tags: ['search'],
  summary: 'Delete user ID',
  description: 'Deletes a user ID and its associated data from the clusters.',
  operationId: 'removeUserId',
  request: { params: z.object({ userID: UserIDInPathParamsSchema }) },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({ deletedAt: DeletedAtSchema })
            .openapi({ title: 'removeUserIdResponse', required: ['deletedAt'] }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
  deprecated: true,
})

export const get1ClustersRoute = createRoute({
  method: 'get',
  path: '/1/clusters',
  tags: ['search'],
  summary: 'List clusters',
  description: 'Lists the available clusters in a multi-cluster setup.',
  operationId: 'listClusters',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({
              topUsers: z
                .array(ClusterNameSchema)
                .openapi({
                  description:
                    'Key-value pairs with cluster names as keys and lists of users with the highest number of records per cluster as values.',
                }),
            })
            .openapi({
              title: 'listClustersResponse',
              description: 'Clusters.',
              required: ['topUsers'],
            }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
  deprecated: true,
})

export const post1ClustersMappingSearchRoute = createRoute({
  method: 'post',
  path: '/1/clusters/mapping/search',
  tags: ['search'],
  summary: 'Search for user IDs',
  description:
    "Since it can take a few seconds to get the data from the different clusters,\nthe response isn't real-time.\n\nTo ensure rapid updates, the user IDs index isn't built at the same time as the mapping. Instead, it's built every 12 hours, at the same time as the update of user ID usage. For example, if you add or move a user ID, the search will show an old value until the next time the mapping is rebuilt (every 12 hours).\n",
  operationId: 'searchUserIds',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z
            .strictObject({
              query: z.string(),
              clusterName: ClusterNameSchema.exactOptional(),
              page: PageSchema.exactOptional(),
              hitsPerPage: HitsPerPageSchema.exactOptional(),
            })
            .openapi({ title: 'searchUserIdsParams', description: 'OK', required: ['query'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({
              hits: z
                .array(
                  z
                    .object({
                      userID: UserIDSchema,
                      clusterName: ClusterNameSchema,
                      nbRecords: NbRecordsSchema,
                      dataSize: DataSizeSchema,
                      objectID: z
                        .string()
                        .openapi({ description: 'userID of the requested user. Same as userID.' }),
                      _highlightResult: z
                        .object({
                          userID: HighlightResultSchema,
                          clusterName: HighlightResultSchema,
                        })
                        .openapi({
                          title: 'userHighlightResult',
                          required: ['userID', 'clusterName'],
                        }),
                    })
                    .openapi({
                      title: 'userHit',
                      required: [
                        'userID',
                        'clusterName',
                        'nbRecords',
                        'dataSize',
                        'objectID',
                        '_highlightResult',
                      ],
                    }),
                )
                .openapi({ description: 'User objects that match the query.' }),
              nbHits: NbHitsSchema,
              page: PageSchema,
              hitsPerPage: ParametersHitsPerPageSchema,
              updatedAt: UpdatedAtSchema,
            })
            .openapi({
              title: 'searchUserIdsResponse',
              description: 'userIDs data.',
              required: ['hits', 'nbHits', 'page', 'hitsPerPage', 'updatedAt'],
            }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
  deprecated: true,
})

export const get1ClustersMappingPendingRoute = createRoute({
  method: 'get',
  path: '/1/clusters/mapping/pending',
  tags: ['search'],
  summary: 'Get migration and user mapping status',
  description:
    'To determine when the time-consuming process of creating a large batch of users or migrating users from one cluster to another is complete, this operation retrieves the status of the process.\n',
  operationId: 'hasPendingMappings',
  request: {
    query: z.object({
      getClusters: z
        .stringbool()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'getClusters',
            description: "Whether to include the cluster's pending mapping state in the response.",
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({
              pending: z
                .boolean()
                .openapi({
                  description:
                    'Whether there are clusters undergoing migration, creation, or deletion.',
                }),
              clusters: z
                .record(z.string(), z.array(z.string()))
                .exactOptional()
                .openapi({
                  description: 'Cluster pending mapping state: migrating, creating, deleting.\n',
                }),
            })
            .openapi({ title: 'hasPendingMappingsResponse', required: ['pending'] }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
  deprecated: true,
})

export const get1SecuritySourcesRoute = createRoute({
  method: 'get',
  path: '/1/security/sources',
  tags: ['search'],
  summary: 'List allowed sources',
  description: 'Retrieves all allowed IP addresses with access to your application.',
  operationId: 'getSources',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: SourcesSchema } } },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const put1SecuritySourcesRoute = createRoute({
  method: 'put',
  path: '/1/security/sources',
  tags: ['search'],
  summary: 'Replace allowed sources',
  description: 'Replaces the list of allowed sources.',
  operationId: 'replaceSources',
  request: {
    body: {
      description: 'Allowed sources.',
      content: { 'application/json': { schema: SourcesSchema } },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({ updatedAt: UpdatedAtSchema })
            .openapi({ title: 'replaceSourceResponse', required: ['updatedAt'] }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1SecuritySourcesAppendRoute = createRoute({
  method: 'post',
  path: '/1/security/sources/append',
  tags: ['search'],
  summary: 'Add a source',
  description: 'Adds a source to the list of allowed sources.',
  operationId: 'appendSource',
  request: {
    body: {
      description: 'Source to add.',
      content: { 'application/json': { schema: SourceSchema } },
      required: true,
    },
  },
  responses: {
    200: CreatedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const delete1SecuritySourcesSourceRoute = createRoute({
  method: 'delete',
  path: '/1/security/sources/{source}',
  tags: ['search'],
  summary: 'Delete a source',
  description: 'Deletes a source from the list of allowed sources.',
  operationId: 'deleteSource',
  request: {
    params: z.object({
      source: z
        .string()
        .openapi({
          param: {
            name: 'source',
            in: 'path',
            required: true,
            description: 'IP address range of the source.',
          },
          example: '10.0.0.1/32',
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({ deletedAt: DeletedAtSchema })
            .openapi({ title: 'deleteSourceResponse', required: ['deletedAt'] }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const get1LogsRoute = createRoute({
  method: 'get',
  path: '/1/logs',
  tags: ['search'],
  summary: 'Retrieve log entries',
  description:
    "The request must be authenticated by an API key with the [`logs` ACL](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).\n\n- Logs are held for the last seven days.\n- Up to 1,000 API requests per server are logged.\n- This request counts towards your [operations quota](https://support.algolia.com/hc/articles/17245378392977-How-does-Algolia-count-records-and-operations) but doesn't appear in the logs itself.\n",
  operationId: 'getLogs',
  request: {
    query: z.object({
      offset: z
        .int()
        .default(0)
        .exactOptional()
        .openapi({
          param: {
            name: 'offset',
            in: 'query',
            description: 'First log entry to retrieve. The most recent entries are listed first.',
          },
        }),
      length: z
        .int()
        .max(1000)
        .default(10)
        .exactOptional()
        .openapi({
          param: {
            name: 'length',
            in: 'query',
            description: 'Maximum number of entries to retrieve.',
          },
        }),
      indexName: z
        .xor([
          z
            .string()
            .exactOptional()
            .openapi({
              param: {
                name: 'indexName',
                in: 'query',
                description:
                  'Index for which to retrieve log entries.\nBy default, log entries are retrieved for all indices.\n',
                example: 'products',
              },
            }),
          z
            .null()
            .nullable()
            .exactOptional()
            .openapi({
              param: {
                name: 'indexName',
                in: 'query',
                description:
                  'Index for which to retrieve log entries.\nBy default, log entries are retrieved for all indices.\n',
                example: 'products',
              },
            }),
        ])
        .exactOptional()
        .openapi({
          param: {
            name: 'indexName',
            in: 'query',
            description:
              'Index for which to retrieve log entries.\nBy default, log entries are retrieved for all indices.\n',
            example: 'products',
          },
        }),
      type: LogTypeSchema.exactOptional().openapi({
        param: {
          name: 'type',
          in: 'query',
          description:
            'Type of log entries to retrieve.\nBy default, all log entries are retrieved.\n',
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .strictObject({
              logs: z.array(
                z
                  .object({
                    timestamp: z
                      .string()
                      .openapi({
                        description: 'Date and time of the API request, in RFC 3339 format.',
                        example: '2023-03-08T12:34:56Z',
                      }),
                    method: z
                      .string()
                      .openapi({ description: 'HTTP method of the request.', example: 'GET' }),
                    answer_code: z
                      .string()
                      .openapi({
                        description: 'HTTP status code of the response.',
                        example: '200',
                      }),
                    query_body: z
                      .string()
                      .max(1000)
                      .openapi({
                        description: 'Request body.',
                        example:
                          '{\\n \\"requests\\": [\\n  {\\n   \\"indexName\\": \\"best_buy\\",\\n   \\"params\\": \\"query=&hitsPerPage=10&page=0&attributesToRetrieve=*&highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&getRankingInfo=1&facets=%5B%22brand%22%2C%22categories%22%2C%22free_shipping%22%2C%22type%22%5D&tagFilters=\\"\\n  }\\n ]\\n}\\n',
                      }),
                    answer: z
                      .string()
                      .max(1000)
                      .openapi({
                        description: 'Response body.',
                        example:
                          '\'n{\\n "results": [\\n  {\\n   "hits": [\\n    {\\n     "name": "Amazon - Fire TV Stick",\\n     "description": "Amazon Fire TV Stick connects to your TV\'s HDMI port. Just grab and go to enjoy Netflix, Prime Instant Video, Hulu Plus, YouTube.com, music, and much more.",\\n     "brand": "Amazon",\\n     "categories": [\\n      "TV & Home Theater",\\n      "Streaming Media Players"\\n     ],\\n     "hierarchicalCategories": {\\n      "lvl0": "TV & Home Theater",\\n      "lvl1": "TV & Home Theater > Streaming Media Players"\\n     },\\n     "type": "Streaming media player",\\n     "price": 39.99,\\n     "price_range": "1 }\\n   ]\\n  }\\n ]\\n}\'\n',
                      }),
                    url: z
                      .string()
                      .openapi({ description: 'URL of the API endpoint.', example: '/1/indexes' }),
                    ip: z
                      .ipv4()
                      .openapi({
                        description: 'IP address of the client that performed the request.',
                        example: '93.184.216.34',
                      }),
                    query_headers: z
                      .string()
                      .openapi({
                        description: 'Request headers (API keys are obfuscated).',
                        example:
                          'User-Agent: curl/7.24.0 (x86_64-apple-darwin12.0) libcurl/7.24.0 OpenSSL/0.9.8x zlib/1.2.5\\nHost: example.com\\nAccept: */*\\nContent-Type: application/json; charset=utf-8\\nX-Algolia-API-Key: 20f***************************\\nX-Algolia-Application-Id: MyApplicationID\\n',
                      }),
                    sha1: z
                      .string()
                      .openapi({
                        description: 'SHA1 signature of the log entry.',
                        example: '26c53bd7e38ca71f4741b71994cd94a600b7ac68',
                      }),
                    nb_api_calls: z
                      .string()
                      .exactOptional()
                      .openapi({ description: 'Number of API requests.', example: '1' }),
                    processing_time_ms: z
                      .string()
                      .openapi({
                        description:
                          "Processing time for the query in milliseconds.\nThis doesn't include latency due to the network.\n",
                        example: '2',
                      }),
                    index: z
                      .string()
                      .exactOptional()
                      .openapi({
                        description: 'Index targeted by the query.',
                        example: 'products',
                      }),
                    query_params: z
                      .string()
                      .exactOptional()
                      .openapi({
                        description: 'Query parameters sent with the request.',
                        example: 'query=georgia&attributesToRetrieve=name,city,country',
                      }),
                    query_nb_hits: z
                      .string()
                      .exactOptional()
                      .openapi({
                        description: 'Number of search results (hits) returned for the query.',
                        example: '1',
                      }),
                    inner_queries: z
                      .array(
                        z
                          .object({
                            index_name: z
                              .string()
                              .exactOptional()
                              .openapi({
                                description: 'Index targeted by the query.',
                                example: 'products',
                              }),
                            user_token: z
                              .string()
                              .exactOptional()
                              .openapi({
                                description: 'A user identifier.',
                                example: '93.189.166.128',
                              }),
                            query_id: z
                              .string()
                              .exactOptional()
                              .openapi({
                                description: 'Unique query identifier.',
                                example: '96f59a3145dd9bd8963dc223950507c8',
                              }),
                          })
                          .openapi({ title: 'logQuery' }),
                      )
                      .exactOptional()
                      .openapi({ description: 'Queries performed for the given request.' }),
                  })
                  .openapi({
                    title: 'log',
                    required: [
                      'timestamp',
                      'method',
                      'answer_code',
                      'query_body',
                      'answer',
                      'url',
                      'ip',
                      'query_headers',
                      'sha1',
                      'processing_time_ms',
                    ],
                  }),
              ),
            })
            .openapi({ title: 'getLogsResponse', required: ['logs'] }),
        },
      },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const get1TaskTaskIDRoute = createRoute({
  method: 'get',
  path: '/1/task/{taskID}',
  tags: ['search'],
  summary: 'Check application task status',
  description: 'Checks the status of a given application task.\n',
  operationId: 'getAppTask',
  request: {
    params: z.object({
      taskID: z
        .int64()
        .openapi({
          param: {
            name: 'taskID',
            in: 'path',
            description: 'Unique task identifier.',
            required: true,
          },
          example: 1506303845001,
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: GetTaskResponseSchema } } },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
  },
})

export const get1IndexesIndexNameTaskTaskIDRoute = createRoute({
  method: 'get',
  path: '/1/indexes/{indexName}/task/{taskID}',
  tags: ['search'],
  summary: 'Check task status',
  description:
    "Checks the status of a given task.\n\nIndexing tasks are asynchronous.\nWhen you add, update, or delete records or indices,\na task is created on a queue and completed depending on the load on the server.\n\nThe indexing tasks' responses include a task ID that you can use to check the status.\n",
  operationId: 'getTask',
  request: {
    params: z.object({
      indexName: IndexNameParamsSchema,
      taskID: z
        .int64()
        .openapi({
          param: {
            name: 'taskID',
            in: 'path',
            description: 'Unique task identifier.',
            required: true,
          },
          example: 1506303845001,
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: GetTaskResponseSchema } } },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const post1IndexesIndexNameOperationRoute = createRoute({
  method: 'post',
  path: '/1/indexes/{indexName}/operation',
  tags: ['search'],
  summary: 'Copy or move an index',
  description:
    "Copies or moves (renames) an index within the same Algolia application.\n\n- Existing destination indices are overwritten, except for their analytics data.\n- If the destination index doesn't exist yet, it'll be created.\n- This operation is resource-intensive.\n\n**Copy**\n\n- Copying a source index that doesn't exist creates a new index with 0 records and default settings.\n- The API keys of the source index are merged with the existing keys in the destination index.\n- You can't copy the `enableReRanking`, `mode`, and `replicas` settings.\n- You can't copy to a destination index that already has replicas.\n- Be aware of the [size limits](https://www.algolia.com/doc/guides/scaling/algolia-service-limits/#application-record-and-index-limits).\n- Related guide: [Copy indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/copy-indices)\n\n**Move**\n\n- Moving a source index that doesn't exist is ignored without returning an error.\n- When moving an index, the analytics data keeps its original name, and a new set of analytics data is started for the new name.\n  To access the original analytics in the dashboard, create an index with the original name.\n- If the destination index has replicas, moving will overwrite the existing index and copy the data to the replica indices.\n- Related guide: [Move indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/move-indices).\n\nThis operation is subject to [indexing rate limits](https://support.algolia.com/hc/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n",
  operationId: 'operationIndex',
  request: {
    params: z.object({ indexName: IndexNameParamsSchema }),
    body: {
      content: {
        'application/json': {
          schema: z
            .strictObject({
              operation: OperationTypeSchema,
              destination: IndexNameSchema,
              scope: z
                .array(ScopeTypeSchema)
                .exactOptional()
                .openapi({
                  description:
                    '**Only for copying.**\n\nIf you specify a scope, only the selected scopes are copied. Records and the other scopes are left unchanged.\nIf you omit the `scope` parameter, everything is copied: records, settings, synonyms, and rules.\n',
                }),
            })
            .openapi({ title: 'operationIndexParams', required: ['operation', 'destination'] }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: UpdatedAtResponse,
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const get1IndexesRoute = createRoute({
  method: 'get',
  path: '/1/indexes',
  tags: ['search'],
  summary: 'List indices',
  description:
    'Lists all indices in the current Algolia application.\n\nThe request follows any index restrictions of the API key you use to make the request.\n',
  operationId: 'listIndices',
  request: { query: z.object({ page: PageParamsSchema, hitsPerPage: HitsPerPageParamsSchema }) },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: ListIndicesResponseSchema } },
    },
    400: BadRequestResponse,
    402: FeatureNotEnabledResponse,
    403: MethodNotAllowedResponse,
    404: IndexNotFoundResponse,
  },
})

export const getWaitForApiKeyRoute = createRoute({
  method: 'get',
  path: '/waitForApiKey',
  tags: ['search'],
  summary: 'Wait for an API key operation',
  description: 'Waits for an API key to be added, updated, or deleted.',
  operationId: 'waitForApiKey',
  request: {
    query: z.object({
      key: z
        .string()
        .openapi({
          param: { in: 'query', name: 'key', description: 'API key to wait for.', required: true },
        }),
      operation: ApiKeyOperationSchema.openapi({
        param: {
          in: 'query',
          name: 'operation',
          description: 'Whether the API key was created, updated, or deleted.',
          required: true,
        },
      }),
      apiKey: ApiKeySchema.exactOptional().openapi({
        param: {
          in: 'query',
          name: 'apiKey',
          description:
            'Used to compare fields of the `getApiKey` response on an `update` operation, to check if the `key` has been updated.',
          required: false,
        },
      }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: GetApiKeyResponseSchema } },
    },
    400: IndexNotFoundResponse,
  },
})

export const getWaitForTaskRoute = createRoute({
  method: 'get',
  path: '/waitForTask',
  tags: ['search'],
  summary: 'Wait for operation to complete',
  description:
    'Wait for a task to complete to ensure synchronized index updates.\n\nAll Algolia write operations are asynchronous. When you make a request for a write operation, for example, to add or update records in your index, Algolia creates a task on a queue and returns a taskID. The task itself runs separately, depending on the server load.\n',
  operationId: 'waitForTask',
  request: {
    query: z.object({
      indexName: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'indexName',
            description: 'The name of the index on which the operation was performed.',
            required: true,
          },
        }),
      taskID: z
        .int64()
        .openapi({
          param: {
            in: 'query',
            name: 'taskID',
            description: 'The taskID returned by the operation.',
            required: true,
          },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: GetTaskResponseSchema } } },
    400: IndexNotFoundResponse,
  },
})

export const getWaitForAppTaskRoute = createRoute({
  method: 'get',
  path: '/waitForAppTask',
  tags: ['search'],
  summary: 'Wait for application-level operation to complete',
  description: 'Wait for a application-level task to complete.',
  operationId: 'waitForAppTask',
  request: {
    query: z.object({
      taskID: z
        .int64()
        .openapi({
          param: {
            in: 'query',
            name: 'taskID',
            description: 'The taskID returned by the operation.',
            required: true,
          },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: GetTaskResponseSchema } } },
    400: IndexNotFoundResponse,
  },
})

export const getBrowseObjectsRoute = createRoute({
  method: 'get',
  path: '/browseObjects',
  tags: ['search'],
  summary: 'Get all records from an index',
  description:
    "You can use the browse method to get records from an index—for example, to export your index as a backup. To export all records, use an empty query.\n\nUse browse instead of search when exporting records from your index, when ranking, or analytics, isn't important. The Analytics API doesn't collect data when using browse.\n\nDon't use this method for building a search UI. Use search instead.\n",
  operationId: 'browseObjects',
  request: {
    query: z.object({
      indexName: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'indexName',
            description: 'The name of the index on which the operation was performed.',
            required: true,
          },
        }),
      browseParams: BrowseParamsObjectSchema.openapi({
        param: {
          in: 'query',
          name: 'browseParams',
          description: 'Browse parameters.',
          required: true,
        },
      }),
    }),
  },
  responses: { 204: { description: 'No content.' }, 400: IndexNotFoundResponse },
})

export const getGenerateSecuredApiKeyRoute = createRoute({
  method: 'get',
  path: '/generateSecuredApiKey',
  tags: ['search'],
  summary: 'Create secured API keys',
  description:
    "Generates a secured API key without any requests to Algolia's servers.\n\nSecured API keys are API keys that you generate on your server without any API request to Algolia.\nSecured API keys help in environments where you can't easily update the client-side code, such as mobile apps,\nor when you need to restrict access to a part of your index for every user.\n\nWhen your users start searching, instead of using the Search API key, they request a short-lived secured API key from your server.\nOn your server, you use this method to create a secured API key, with any restrictions you'd like, such as filters, index access restrictions,\nor expiration times. The API key gets longer the more restrictions you add.\nYour users then use the secured API key to search with Algolia.\n\nYou can't create secured API keys from other secured API keys or from your Admin API key.\nThe generated API key can have the same restrictions as the parent API key, or be more restrictive.\n",
  operationId: 'generateSecuredApiKey',
  request: {
    query: z.object({
      parentApiKey: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'parentApiKey',
            description: 'API key from which the secured API key will inherit its restrictions.',
            required: true,
          },
        }),
      restrictions: SecuredApiKeyRestrictionsSchema.openapi({
        param: {
          in: 'query',
          name: 'restrictions',
          description: 'Restrictions to add to the API key.',
          required: true,
        },
      }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: z.string() } } },
    400: IndexNotFoundResponse,
  },
})

export const getAccountCopyIndexRoute = createRoute({
  method: 'get',
  path: '/accountCopyIndex',
  tags: ['search'],
  summary:
    'Copies the given `sourceIndexName` records, rules and synonyms to an other Algolia application for the given `destinationIndexName`',
  description:
    'Copies the given `sourceIndexName` records, rules and synonyms to an other Algolia application for the given `destinationIndexName`.\n',
  operationId: 'accountCopyIndex',
  request: {
    query: z.object({
      sourceIndexName: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'sourceIndexName',
            description: 'The name of the index to copy.',
            required: true,
          },
        }),
      destinationAppID: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'destinationAppID',
            description: 'The application ID to write the index to.',
            required: true,
          },
        }),
      destinationApiKey: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'destinationApiKey',
            description:
              'The API Key of the `destinationAppID` to write the index to, must have write ACLs.',
            required: true,
          },
        }),
      destinationIndexName: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'destinationIndexName',
            description: 'The name of the index to write the copied index to.',
            required: true,
          },
        }),
      batchSize: z
        .int()
        .default(1000)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'batchSize',
            description: 'The size of the chunk of `objects`. Defaults to 1000.',
            required: false,
          },
        }),
    }),
  },
  responses: {
    400: IndexInSameAppResponse,
    403: IndexAlreadyExistsResponse,
    404: IndexNotFoundResponse,
  },
})

export const getReplaceAllObjectsRoute = createRoute({
  method: 'get',
  path: '/replaceAllObjects',
  tags: ['search'],
  summary: 'Replace all records in an index',
  description:
    "This method replaces all records in an index without interrupting ongoing searches.\n\nIt combines [batch](https://www.algolia.com/doc/rest-api/search/batch) and [copy/move](https://www.algolia.com/doc/rest-api/search/operation-index) index operations:\n1. Copy settings, synonyms, and rules to a temporary index.\n2. Add the records from the `objects` parameter to the temporary index.\n3. Replace the original index with the temporary one.\n\nIf there's an error during one of these steps, the temporary index is deleted if your API key has the `deleteIndex` ACL.\n\nIf your API key restricts access to specific indices, make sure it also grants access to the temporary index INDEX_NAME_tmp_* (replace INDEX_NAME with the name of your original index).\n\nThis method is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).\n\nThe response includes the results of the individual API requests.\n\nThis method creates a temporary index: your record count is temporarily doubled. Algolia doesn't count the three days with the highest number of records towards your monthly usage.\n",
  operationId: 'replaceAllObjects',
  request: {
    query: z.object({
      indexName: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'indexName',
            description: 'The `indexName` to replace `objects` in.',
            required: true,
          },
        }),
      objects: z
        .array(
          z
            .object({})
            .openapi({
              param: {
                in: 'query',
                name: 'objects',
                description: 'List of objects to replace the current objects with.',
                required: true,
              },
            }),
        )
        .openapi({
          param: {
            in: 'query',
            name: 'objects',
            description: 'List of objects to replace the current objects with.',
            required: true,
          },
        }),
      batchSize: z
        .int()
        .default(1000)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'batchSize',
            description:
              'The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.',
            required: false,
          },
        }),
      scopes: z
        .array(ScopeTypeSchema)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'scopes',
            description:
              'List of scopes to keep in the index. Defaults to `settings`, `synonyms`, and `rules`.',
            required: false,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: ReplaceAllObjectsResponseSchema } },
    },
    400: IndexNotFoundResponse,
  },
})

export const getReplaceAllObjectsWithTransformationRoute = createRoute({
  method: 'get',
  path: '/replaceAllObjectsWithTransformation',
  tags: ['search'],
  summary: 'Replace all records in an index',
  description:
    "Replace all records from your index with a new set of records by leveraging the Transformation pipeline setup in the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push).\n\nThis method lets you replace all records in your index without downtime. It performs these operations:\n  1. Copy settings, synonyms, and rules from your original index to a temporary index.\n  2. Add your new records to the temporary index.\n  3. Replace your original index with the temporary index.\n\nUse the safe parameter to ensure that these (asynchronous) operations are performed in sequence.\nIf there's an error duing one of these steps, the temporary index won't be deleted.\nThis operation is rate-limited.\nThis method creates a temporary index: your record count is temporarily doubled. Algolia doesn't count the three days with the highest number of records towards your monthly usage.\nIf you're on a legacy plan (before July 2020), this method counts two operations towards your usage (in addition to the number of records): copySettings and moveIndex.\nThe API key you use for this operation must have access to the index YourIndex and the temporary index YourIndex_tmp.\n",
  operationId: 'replaceAllObjectsWithTransformation',
  request: {
    query: z.object({
      indexName: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'indexName',
            description: 'The `indexName` to replace `objects` in.',
            required: true,
          },
        }),
      objects: z
        .array(
          z
            .object({})
            .openapi({
              param: {
                in: 'query',
                name: 'objects',
                description: 'List of objects to replace the current objects with.',
                required: true,
              },
            }),
        )
        .openapi({
          param: {
            in: 'query',
            name: 'objects',
            description: 'List of objects to replace the current objects with.',
            required: true,
          },
        }),
      batchSize: z
        .int()
        .default(1000)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'batchSize',
            description:
              'The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.',
            required: false,
          },
        }),
      scopes: z
        .array(ScopeTypeSchema)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'scopes',
            description:
              'List of scopes to kepp in the index. Defaults to `settings`, `synonyms`, and `rules`.',
            required: false,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': { schema: ReplaceAllObjectsWithTransformationResponseSchema },
      },
    },
    400: IndexNotFoundResponse,
  },
})

export const getChunkedBatchRoute = createRoute({
  method: 'get',
  path: '/chunkedBatch',
  tags: ['search'],
  summary: 'Replace all records in an index',
  description:
    'Helper: Chunks the given `objects` list in subset of 1000 elements max in order to make it fit in `batch` requests.\n',
  operationId: 'chunkedBatch',
  request: {
    query: z.object({
      indexName: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'indexName',
            description: 'The `indexName` to replace `objects` in.',
            required: true,
          },
        }),
      objects: z
        .array(
          z
            .object({})
            .openapi({
              param: {
                in: 'query',
                name: 'objects',
                description: 'List of objects to replace the current objects with.',
                required: true,
              },
            }),
        )
        .openapi({
          param: {
            in: 'query',
            name: 'objects',
            description: 'List of objects to replace the current objects with.',
            required: true,
          },
        }),
      action: ActionSchema.exactOptional().openapi({
        param: {
          in: 'query',
          name: 'action',
          description:
            'The `batch` `action` to perform on the given array of `objects`, defaults to `addObject`.',
          required: false,
        },
      }),
      waitForTasks: z
        .stringbool()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'waitForTasks',
            description:
              'Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.',
            required: false,
          },
        }),
      batchSize: z
        .int()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'batchSize',
            description:
              'The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.',
            required: false,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.array(BatchResponseSchema) } },
    },
    400: IndexNotFoundResponse,
  },
})

export const getSaveObjectsRoute = createRoute({
  method: 'get',
  path: '/saveObjects',
  tags: ['search'],
  summary: 'Saves the given array of objects in the given index',
  description:
    'Helper: Saves the given array of objects in the given index. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.\n',
  operationId: 'saveObjects',
  request: {
    query: z.object({
      indexName: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'indexName',
            description: 'The `indexName` to save `objects` into.',
            required: true,
          },
        }),
      objects: z
        .array(
          z
            .object({})
            .openapi({
              param: {
                in: 'query',
                name: 'objects',
                description: 'The objects to save in the index.',
                required: true,
              },
            }),
        )
        .openapi({
          param: {
            in: 'query',
            name: 'objects',
            description: 'The objects to save in the index.',
            required: true,
          },
        }),
      waitForTasks: z
        .stringbool()
        .default(false)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'waitForTasks',
            description:
              'Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.',
            required: false,
          },
        }),
      batchSize: z
        .int()
        .default(1000)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'batchSize',
            description:
              'The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.',
            required: false,
          },
        }),
      requestOptions: z
        .object({})
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'requestOptions',
            description: 'The request options to pass to the `batch` method.',
            required: false,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.array(BatchResponseSchema) } },
    },
    400: IndexNotFoundResponse,
  },
})

export const getSaveObjectsWithTransformationRoute = createRoute({
  method: 'get',
  path: '/saveObjectsWithTransformation',
  tags: ['search'],
  summary:
    'Save objects to an Algolia index by leveraging the Transformation pipeline setup using the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push)',
  description:
    'Helper: Similar to the `saveObjects` method but requires a Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push) to be created first, in order to transform records before indexing them to Algolia. The `region` must have been passed to the client instantiation method.\n',
  operationId: 'saveObjectsWithTransformation',
  request: {
    query: z.object({
      indexName: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'indexName',
            description: 'The `indexName` to save `objects` into.',
            required: true,
          },
        }),
      objects: z
        .array(
          z
            .object({})
            .openapi({
              param: {
                in: 'query',
                name: 'objects',
                description: 'The objects to save in the index.',
                required: true,
              },
            }),
        )
        .openapi({
          param: {
            in: 'query',
            name: 'objects',
            description: 'The objects to save in the index.',
            required: true,
          },
        }),
      waitForTasks: z
        .stringbool()
        .default(false)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'waitForTasks',
            description:
              'Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.',
            required: false,
          },
        }),
      batchSize: z
        .int()
        .default(1000)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'batchSize',
            description:
              'The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.',
            required: false,
          },
        }),
      requestOptions: z
        .object({})
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'requestOptions',
            description: 'The request options to pass to the `batch` method.',
            required: false,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.array(WatchResponseSchema) } },
    },
    400: IndexNotFoundResponse,
  },
})

export const postDeleteObjectsRoute = createRoute({
  method: 'post',
  path: '/deleteObjects',
  tags: ['search'],
  summary: 'Deletes every records for the given objectIDs',
  description:
    'Helper: Deletes every records for the given objectIDs. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objectIDs in it.\n',
  operationId: 'deleteObjects',
  request: {
    query: z.object({
      indexName: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'indexName',
            description: 'The `indexName` to delete `objectIDs` from.',
            required: true,
          },
        }),
      objectIDs: z
        .array(
          z
            .string()
            .openapi({
              param: {
                in: 'query',
                name: 'objectIDs',
                description: 'The objectIDs to delete.',
                required: true,
              },
            }),
        )
        .openapi({
          param: {
            in: 'query',
            name: 'objectIDs',
            description: 'The objectIDs to delete.',
            required: true,
          },
        }),
      waitForTasks: z
        .stringbool()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'waitForTasks',
            description:
              'Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.',
            required: false,
          },
        }),
      batchSize: z
        .int()
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'batchSize',
            description:
              'The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.',
            required: false,
          },
        }),
      requestOptions: z
        .object({})
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'requestOptions',
            description: 'The request options to pass to the `batch` method.',
            required: false,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.array(BatchResponseSchema) } },
    },
    400: IndexNotFoundResponse,
  },
})

export const postPartialUpdateObjectsRoute = createRoute({
  method: 'post',
  path: '/partialUpdateObjects',
  tags: ['search'],
  summary:
    'Replaces object content of all the given objects according to their respective `objectID` field',
  description:
    'Helper: Replaces object content of all the given objects according to their respective `objectID` field. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.\n',
  operationId: 'partialUpdateObjects',
  request: {
    query: z.object({
      indexName: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'indexName',
            description: 'The `indexName` where to update `objects`.',
            required: true,
          },
        }),
      objects: z
        .array(
          z
            .object({})
            .openapi({
              param: {
                in: 'query',
                name: 'objects',
                description: 'The objects to update.',
                required: true,
              },
            }),
        )
        .openapi({
          param: {
            in: 'query',
            name: 'objects',
            description: 'The objects to update.',
            required: true,
          },
        }),
      createIfNotExists: z
        .stringbool()
        .default(false)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'createIfNotExists',
            description:
              'To be provided if non-existing objects are passed, otherwise, the call will fail.',
            required: false,
          },
        }),
      waitForTasks: z
        .stringbool()
        .default(false)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'waitForTasks',
            description:
              'Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.',
            required: false,
          },
        }),
      batchSize: z
        .int()
        .default(1000)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'batchSize',
            description:
              'The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.',
            required: false,
          },
        }),
      requestOptions: z
        .object({})
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'requestOptions',
            description: 'The request options to pass to the `batch` method.',
            required: false,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.array(BatchResponseSchema) } },
    },
    400: IndexNotFoundResponse,
  },
})

export const postPartialUpdateObjectsWithTransformationRoute = createRoute({
  method: 'post',
  path: '/partialUpdateObjectsWithTransformation',
  tags: ['search'],
  summary:
    'Save objects to an Algolia index by leveraging the Transformation pipeline setup using the Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push)',
  description:
    'Helper: Similar to the `partialUpdateObjects` method but requires a Push connector (https://www.algolia.com/doc/guides/sending-and-managing-data/send-and-update-your-data/connectors/push) to be created first, in order to transform records before indexing them to Algolia. The `region` must have been passed to the client instantiation method.\n',
  operationId: 'partialUpdateObjectsWithTransformation',
  request: {
    query: z.object({
      indexName: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'indexName',
            description: 'The `indexName` where to update `objects`.',
            required: true,
          },
        }),
      objects: z
        .array(
          z
            .object({})
            .openapi({
              param: {
                in: 'query',
                name: 'objects',
                description: 'The objects to update.',
                required: true,
              },
            }),
        )
        .openapi({
          param: {
            in: 'query',
            name: 'objects',
            description: 'The objects to update.',
            required: true,
          },
        }),
      createIfNotExists: z
        .stringbool()
        .default(false)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'createIfNotExists',
            description:
              'To be provided if non-existing objects are passed, otherwise, the call will fail.',
            required: false,
          },
        }),
      waitForTasks: z
        .stringbool()
        .default(false)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'waitForTasks',
            description:
              'Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.',
            required: false,
          },
        }),
      batchSize: z
        .int()
        .default(1000)
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'batchSize',
            description:
              'The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.',
            required: false,
          },
        }),
      requestOptions: z
        .object({})
        .exactOptional()
        .openapi({
          param: {
            in: 'query',
            name: 'requestOptions',
            description: 'The request options to pass to the `batch` method.',
            required: false,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.array(WatchResponseSchema) } },
    },
    400: IndexNotFoundResponse,
  },
})

export const getIndexExistsRoute = createRoute({
  method: 'get',
  path: '/indexExists',
  tags: ['search'],
  summary: 'Check if an index exists or not',
  description:
    "You can initialize an index with any name. The index is created on Algolia's servers when you add objects or set settings. To prevent accidentally creating new indices, or changing existing indices, you can use the exists method. The exists method returns a boolean that indicates whether an initialized index has been created.\n",
  operationId: 'indexExists',
  request: {
    query: z.object({
      indexName: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'indexName',
            description: 'The name of the index to check.',
            required: true,
          },
        }),
    }),
  },
  responses: {
    200: { description: 'Index exists.', content: { 'application/json': { schema: z.boolean() } } },
  },
})

export const getSetClientApiKeyRoute = createRoute({
  method: 'get',
  path: '/setClientApiKey',
  tags: ['search'],
  summary: 'Switch the API key used to authenticate requests',
  description: 'Switch the API key used to authenticate requests.\n',
  operationId: 'setClientApiKey',
  request: {
    query: z.object({
      apiKey: z
        .string()
        .openapi({
          param: {
            in: 'query',
            name: 'apiKey',
            description: 'API key to be used from now on.',
            required: true,
          },
        }),
    }),
  },
  responses: { 204: { description: 'No content.' } },
})
