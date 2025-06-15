import { createRoute, z } from '@hono/zod-openapi'

const DataSetListSchema = z
  .object({
    total: z.number().int(),
    apis: z.array(
      z
        .object({
          apiKey: z.string().openapi({ description: 'To be used as a dataset parameter value' }),
          apiVersionNumber: z
            .string()
            .openapi({ description: 'To be used as a version parameter value' }),
          apiUrl: z.string().openapi({ description: "The URL describing the dataset's fields" }),
          apiDocumentationUrl: z
            .string()
            .openapi({ description: 'A URL to the API console for each API' }),
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
  operationId: 'list-data-sets',
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
  operationId: 'list-searchable-fields',
  summary:
    'Provides the general information about the API and the list of fields that can be used to query the dataset.',
  description:
    "This GET API returns the list of all the searchable field names that are in the oa_citations. Please see the 'fields' attribute which returns an array of field names. Each field or a combination of fields can be searched using the syntax options shown below.",
  request: {
    params: z.object({
      dataset: z.string().openapi({ param: { in: 'path', name: 'dataset', required: true } }),
      version: z.string().openapi({ param: { in: 'path', name: 'version', required: true } }),
    }),
  },
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
  operationId: 'perform-search',
  summary: 'Provides search capability for the data set with the given search criteria.',
  description:
    "This API is based on Solr/Lucene Search. The data is indexed using SOLR. This GET API returns the list of all the searchable field names that are in the Solr Index. Please see the 'fields' attribute which returns an array of field names. Each field or a combination of fields can be searched using the Solr/Lucene Syntax. Please refer https://lucene.apache.org/core/3_6_2/queryparsersyntax.html#Overview for the query syntax. List of field names that are searchable can be determined using above GET api.",
  request: {
    body: {
      required: false,
      content: {
        'application/x-www-form-urlencoded': {
          schema: z.object({
            criteria: z
              .string()
              .default('*:*')
              .openapi({
                description:
                  "Uses Lucene Query Syntax in the format of propertyName:value, propertyName:[num1 TO num2] and date range format: propertyName:[yyyyMMdd TO yyyyMMdd]. In the response please see the 'docs' element which has the list of record objects. Each record structure would consist of all the fields and their corresponding values.",
              }),
            start: z
              .number()
              .int()
              .openapi({ description: 'Starting record number. Default value is 0.' })
              .optional(),
            rows: z
              .number()
              .int()
              .default(100)
              .openapi({
                description:
                  "Specify number of rows to be returned. If you run the search with default values, in the response you will see 'numFound' attribute which will tell the number of records available in the dataset.",
              })
              .optional(),
          }),
        },
      },
    },
    params: z.object({
      version: z
        .string()
        .default('v1')
        .openapi({ param: { in: 'path', name: 'version', required: true } }),
      dataset: z
        .string()
        .default('oa_citations')
        .openapi({ param: { in: 'path', name: 'dataset', required: true } }),
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
