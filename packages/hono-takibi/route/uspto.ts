import { createRoute, z } from '@hono/zod-openapi'

const DataSetListSchema = z
  .object({
    total: z.number().int(),
    apis: z.array(
      z
        .object({
          apiKey: z.string(),
          apiVersionNumber: z.string(),
          apiUrl: z.string(),
          apiDocumentationUrl: z.string(),
        })
        .partial(),
    ),
  })
  .partial()
  .openapi('dataSetList')

export const getRoute = createRoute({
  tags: ['metadata'],
  method: 'get',
  path: '/',
  summary: 'List available data sets',
  responses: {
    200: {
      description: 'Returns a list of data sets',
      content: { 'application/json': { schema: DataSetListSchema } },
    },
  },
})

export const getDatasetVersionFieldsRoute = createRoute({
  tags: ['metadata'],
  method: 'get',
  path: '/{dataset}/{version}/fields',
  summary:
    'Provides the general information about the API and the list of fields that can be used to query the dataset.',
  description:
    "This GET API returns the list of all the searchable field names that are in the oa_citations. Please see the 'fields' attribute which returns an array of field names. Each field or a combination of fields can be searched using the syntax options shown below.",
  request: { params: z.object({ dataset: z.string(), version: z.string() }) },
  responses: {
    200: {
      description:
        'The dataset API for the given version is found and it is accessible to consume.',
      content: { 'application/json': { schema: z.string() } },
    },
    404: {
      description:
        'The combination of dataset name and version is not found in the system or it is not published yet to be consumed by public.',
      content: { 'application/json': { schema: z.string() } },
    },
  },
})

export const postDatasetVersionRecordsRoute = createRoute({
  tags: ['search'],
  method: 'post',
  path: '/{dataset}/{version}/records',
  summary: 'Provides search capability for the data set with the given search criteria.',
  description:
    "This API is based on Solr/Lucene Search. The data is indexed using SOLR. This GET API returns the list of all the searchable field names that are in the Solr Index. Please see the 'fields' attribute which returns an array of field names. Each field or a combination of fields can be searched using the Solr/Lucene Syntax. Please refer https://lucene.apache.org/core/3_6_2/queryparsersyntax.html#Overview for the query syntax. List of field names that are searchable can be determined using above GET api.",
  request: {
    body: {
      required: false,
      content: {
        'application/x-www-form-urlencoded': {
          schema: z.object({
            criteria: z.string().default('*:*'),
            start: z.number().int().optional(),
            rows: z.number().int().default(100).optional(),
          }),
        },
      },
    },
    params: z.object({
      version: z.string().default('v1'),
      dataset: z.string().default('oa_citations'),
    }),
  },
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: z.array(z.record(z.string(), z.object({}))) } },
    },
    404: { description: 'No matching record found for the given criteria.' },
  },
})
