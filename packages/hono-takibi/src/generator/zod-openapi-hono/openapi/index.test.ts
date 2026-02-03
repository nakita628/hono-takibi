import { describe, it } from 'vitest'
import type { OpenAPI } from '../../../openapi/index.js'
import { zodOpenAPIHono } from './index.js'

const openapi = {
  openapi: '3.0.3',
  info: {
    title: 'ABC only / components x3 (B -> C -> A)',
    version: '1.0.0',
  },
  paths: {
    '/A/{C}': {
      post: {
        operationId: 'A',
        security: [
          {
            A: [],
          },
        ],
        parameters: [
          {
            $ref: '#/components/parameters/C',
          },
          {
            $ref: '#/components/parameters/B',
          },
          {
            $ref: '#/components/parameters/A',
          },
        ],
        requestBody: {
          $ref: '#/components/requestBodies/A',
        },
        responses: {
          '200': {
            $ref: '#/components/responses/A',
          },
        },
        callbacks: {
          A: {
            $ref: '#/components/callbacks/A',
          },
        },
      },
    },
    '/B/{C}': {
      post: {
        operationId: 'B',
        security: [
          {
            B: [],
          },
        ],
        parameters: [
          {
            $ref: '#/components/parameters/C',
          },
          {
            $ref: '#/components/parameters/B',
          },
          {
            $ref: '#/components/parameters/A',
          },
        ],
        requestBody: {
          $ref: '#/components/requestBodies/B',
        },
        responses: {
          '200': {
            $ref: '#/components/responses/B',
          },
        },
        callbacks: {
          B: {
            $ref: '#/components/callbacks/B',
          },
        },
      },
    },
    '/C/{C}': {
      post: {
        operationId: 'C',
        security: [
          {
            C: [],
          },
        ],
        parameters: [
          {
            $ref: '#/components/parameters/C',
          },
          {
            $ref: '#/components/parameters/B',
          },
          {
            $ref: '#/components/parameters/A',
          },
        ],
        requestBody: {
          $ref: '#/components/requestBodies/C',
        },
        responses: {
          '200': {
            $ref: '#/components/responses/C',
          },
        },
        callbacks: {
          C: {
            $ref: '#/components/callbacks/C',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      B: {
        type: 'object',
        required: ['B', 'C'],
        properties: {
          B: {
            type: 'string',
            format: 'uri',
          },
          C: {
            $ref: '#/components/schemas/C',
          },
        },
      },
      C: {
        type: 'object',
        required: ['B', 'A'],
        properties: {
          B: {
            type: 'string',
            format: 'uri',
          },
          A: {
            $ref: '#/components/schemas/A',
          },
        },
      },
      A: {
        type: 'object',
        required: ['B', 'A'],
        properties: {
          B: {
            type: 'string',
            format: 'uri',
          },
          A: {
            type: 'string',
          },
        },
      },
    },
    parameters: {
      B: {
        name: 'B',
        in: 'query',
        required: false,
        schema: {
          type: 'string',
        },
      },
      C: {
        name: 'C',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
        },
      },
      A: {
        name: 'A',
        in: 'header',
        required: false,
        schema: {
          type: 'string',
        },
      },
    },
    securitySchemes: {
      B: {
        type: 'http',
        scheme: 'bearer',
      },
      C: {
        type: 'http',
        scheme: 'bearer',
      },
      A: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    requestBodies: {
      B: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/B',
            },
            examples: {
              B: {
                $ref: '#/components/examples/B',
              },
            },
          },
        },
      },
      C: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/C',
            },
            examples: {
              C: {
                $ref: '#/components/examples/C',
              },
            },
          },
        },
      },
      A: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/A',
            },
            examples: {
              A: {
                $ref: '#/components/examples/A',
              },
            },
          },
        },
      },
    },
    responses: {
      B: {
        description: 'B',
        headers: {
          B: {
            $ref: '#/components/headers/B',
          },
          C: {
            $ref: '#/components/headers/C',
          },
          A: {
            $ref: '#/components/headers/A',
          },
        },
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/B',
            },
            examples: {
              B: {
                $ref: '#/components/examples/B',
              },
            },
          },
        },
        links: {
          B: {
            $ref: '#/components/links/B',
          },
        },
      },
      C: {
        description: 'C',
        headers: {
          B: {
            $ref: '#/components/headers/B',
          },
          C: {
            $ref: '#/components/headers/C',
          },
          A: {
            $ref: '#/components/headers/A',
          },
        },
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/C',
            },
            examples: {
              C: {
                $ref: '#/components/examples/C',
              },
            },
          },
        },
        links: {
          C: {
            $ref: '#/components/links/C',
          },
        },
      },
      A: {
        description: 'A',
        headers: {
          B: {
            $ref: '#/components/headers/B',
          },
          C: {
            $ref: '#/components/headers/C',
          },
          A: {
            $ref: '#/components/headers/A',
          },
        },
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/A',
            },
            examples: {
              A: {
                $ref: '#/components/examples/A',
              },
            },
          },
        },
        links: {
          A: {
            $ref: '#/components/links/A',
          },
        },
      },
    },
    headers: {
      B: {
        schema: {
          type: 'string',
        },
      },
      C: {
        schema: {
          type: 'string',
        },
      },
      A: {
        schema: {
          type: 'string',
        },
      },
    },
    examples: {
      B: {
        value: {
          B: 'https://example.com/B',
          C: {
            B: 'https://example.com/C',
            A: {
              B: 'https://example.com/A',
              A: 'A',
            },
          },
        },
      },
      C: {
        value: {
          B: 'https://example.com/C',
          A: {
            B: 'https://example.com/A',
            A: 'A',
          },
        },
      },
      A: {
        value: {
          B: 'https://example.com/A',
          A: 'A',
        },
      },
    },
    links: {
      B: {
        operationId: 'B',
      },
      C: {
        operationId: 'C',
      },
      A: {
        operationId: 'A',
      },
    },
    callbacks: {
      B: {
        '{$request.body#/B}': {
          post: {
            requestBody: {
              $ref: '#/components/requestBodies/B',
            },
            responses: {
              '200': {
                $ref: '#/components/responses/B',
              },
            },
          },
        },
      },
      C: {
        '{$request.body#/B}': {
          post: {
            requestBody: {
              $ref: '#/components/requestBodies/C',
            },
            responses: {
              '200': {
                $ref: '#/components/responses/C',
              },
            },
          },
        },
      },
      A: {
        '{$request.body#/B}': {
          post: {
            requestBody: {
              $ref: '#/components/requestBodies/A',
            },
            responses: {
              '200': {
                $ref: '#/components/responses/A',
              },
            },
          },
        },
      },
    },
  },
}

describe('zodOpenAPIHono', () => {
  it.concurrent('zodOpenAPIHono exportSchema=true, exportType=true', () => {
    zodOpenAPIHono(openapi as unknown as OpenAPI, {
      exportSchemasTypes: false,
      exportSchemas: false,
      exportParametersTypes: false,
      exportParameters: false,
      exportSecuritySchemes: false,
      exportRequestBodies: false,
      exportResponses: false,
      exportHeadersTypes: false,
      exportHeaders: false,
      exportExamples: false,
      exportLinks: false,
      exportCallbacks: false,
    })
  })

  it.concurrent('generates webhooks from OpenAPI 3.1 webhooks section', async () => {
    const { expect } = await import('vitest')
    const openapiWithWebhooks: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Webhook API', version: '1.0.0' },
      paths: {
        '/orders': {
          get: {
            operationId: 'getOrders',
            responses: {
              200: { description: 'OK' },
            },
          },
        },
      },
      webhooks: {
        orderStatusChanged: {
          post: {
            operationId: 'onOrderStatusChanged',
            responses: {
              200: { description: 'Webhook received' },
            },
          },
        },
      },
    }

    const result = zodOpenAPIHono(openapiWithWebhooks, {
      exportSchemasTypes: false,
      exportSchemas: false,
      exportParametersTypes: false,
      exportParameters: false,
      exportSecuritySchemes: false,
      exportRequestBodies: false,
      exportResponses: false,
      exportHeadersTypes: false,
      exportHeaders: false,
      exportExamples: false,
      exportLinks: false,
      exportCallbacks: false,
    })

    expect(result).toBe(`import{createRoute,z}from'@hono/zod-openapi'

export const getOrdersRoute=createRoute({method:'get',path:'/orders',operationId:'getOrders',responses:{200:{description:"OK"}}})

export const orderStatusChangedPostWebhook={method:'post',path:'/orderStatusChanged',operationId:'onOrderStatusChanged',responses:{200:{description:"Webhook received"}}}`)
  })
})
