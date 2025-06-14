import type { OpenAPISpec } from '../src/openapi/index.js'

export const abcdeOpenAPI: OpenAPISpec = {
  openapi: '3.1.0',
  info: {
    title: 'Sample API',
    version: '1.0.0',
  },
  paths: {
    '/example': {
      get: {
        summary: 'Get example data',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/A',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      A: {
        type: 'object',
        required: ['a'],
        properties: {
          a: {
            type: 'string',
            example: 'a',
          },
        },
      },
      B: {
        type: 'object',
        required: ['b'],
        properties: {
          b: {
            type: 'string',
            example: 'b',
          },
        },
      },
      C: {
        type: 'object',
        required: ['c'],
        properties: {
          c: {
            type: 'string',
            example: 'c',
          },
        },
      },
      D: {
        type: 'object',
        required: ['d'],
        properties: {
          d: {
            type: 'string',
            example: 'd',
          },
        },
      },
      E: {
        type: 'object',
        required: ['e'],
        properties: {
          e: {
            type: 'string',
            example: 'e',
          },
        },
      },
    },
  },
}
