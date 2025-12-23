import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../../openapi'
import { zodOpenAPIHono } from './index.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/index.test.ts

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
    const result = zodOpenAPIHono(openapi as unknown as OpenAPI, {
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

    const expected = `import { createRoute, z } from '@hono/zod-openapi'

const ASchema = z.object({B:z.url(),A:z.string()}).openapi('A')



const CSchema = z.object({B:z.url(),A:ASchema}).openapi('C')



const BSchema = z.object({B:z.url(),C:CSchema}).openapi('B')



const BParamsSchema = z.string().optional().openapi({param:{in:"query",name:"B",required:false}})



const CParamsSchema = z.string().openapi({param:{in:"path",name:"C",required:true}})



const AParamsSchema = z.string().optional().openapi({param:{in:"header",name:"A",required:false}})



const BSecurityScheme = {"type":"http","scheme":"bearer"}

const CSecurityScheme = {"type":"http","scheme":"bearer"}

const ASecurityScheme = {"type":"http","scheme":"bearer"}

const BRequestBody = {required:true,content:{"application/json":{schema:BSchema,examples:{"B":{$ref:"#/components/examples/B"}}}}}

const CRequestBody = {required:true,content:{"application/json":{schema:CSchema,examples:{"C":{$ref:"#/components/examples/C"}}}}}

const ARequestBody = {required:true,content:{"application/json":{schema:ASchema,examples:{"A":{$ref:"#/components/examples/A"}}}}}

const BResponse = {description:"B",headers:z.object({"B":z.string(),"C":z.string(),"A":z.string()}),links:{"B":{$ref:"#/components/links/B"}},content:{"application/json":{schema:BSchema,examples:{"B":{$ref:"#/components/examples/B"}}}}}

const CResponse = {description:"C",headers:z.object({"B":z.string(),"C":z.string(),"A":z.string()}),links:{"C":{$ref:"#/components/links/C"}},content:{"application/json":{schema:CSchema,examples:{"C":{$ref:"#/components/examples/C"}}}}}

const AResponse = {description:"A",headers:z.object({"B":z.string(),"C":z.string(),"A":z.string()}),links:{"A":{$ref:"#/components/links/A"}},content:{"application/json":{schema:ASchema,examples:{"A":{$ref:"#/components/examples/A"}}}}}

const BHeaderSchema = z.string()

const CHeaderSchema = z.string()

const AHeaderSchema = z.string()

const BExample = {"value":{"B":"https://example.com/B","C":{"B":"https://example.com/C","A":{"B":"https://example.com/A","A":"A"}}}}

const CExample = {"value":{"B":"https://example.com/C","A":{"B":"https://example.com/A","A":"A"}}}

const AExample = {"value":{"B":"https://example.com/A","A":"A"}}

const BLink = {"operationId":"B"}

const CLink = {"operationId":"C"}

const ALink = {"operationId":"A"}

const BCallbacks = {"{$request.body#/B}":{post:{requestBody:BRequestBody,responses:{"200":BResponse}}}}

const CCallbacks = {"{$request.body#/B}":{post:{requestBody:CRequestBody,responses:{"200":CResponse}}}}

const ACallbacks = {"{$request.body#/B}":{post:{requestBody:ARequestBody,responses:{"200":AResponse}}}}

export const postACRoute=createRoute({method:'post',path:'/A/{C}',operationId:'A',security:[{"A":[]}],callbacks:{"A":ACallbacks},request:{body:ARequestBody,params:z.object({C:CParamsSchema}),query:z.object({B:BParamsSchema}),headers:z.object({A:AParamsSchema})},responses:{200:AResponse,}})

export const postBCRoute=createRoute({method:'post',path:'/B/{C}',operationId:'B',security:[{"B":[]}],callbacks:{"B":BCallbacks},request:{body:BRequestBody,params:z.object({C:CParamsSchema}),query:z.object({B:BParamsSchema}),headers:z.object({A:AParamsSchema})},responses:{200:BResponse,}})

export const postCCRoute=createRoute({method:'post',path:'/C/{C}',operationId:'C',security:[{"C":[]}],callbacks:{"C":CCallbacks},request:{body:CRequestBody,params:z.object({C:CParamsSchema}),query:z.object({B:BParamsSchema}),headers:z.object({A:AParamsSchema})},responses:{200:CResponse,}})`

    expect(result).toBe(expected)
  })
})
