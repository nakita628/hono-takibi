/**
 * Zod OpenAPI Hono code generator.
 *
 * Generates complete Hono application code with Zod validation
 * from OpenAPI specifications.
 *
 * ```mermaid
 * flowchart TD
 *   A["zodOpenAPIHono(openapi, options)"] --> B["componentsCode()"]
 *   A --> C["routeCode()"]
 *   B --> D["Schemas + Parameters + Headers + ..."]
 *   C --> E["Route definitions"]
 *   D --> F["Combined output"]
 *   E --> F
 * ```
 *
 * @module generator/zod-openapi-hono
 */
import type { OpenAPI } from '../../../openapi/index.js'
import { componentsCode } from './components/index.js'
import { routeCode } from './routes/index.js'

/**
 * Generates Hono-compatible TypeScript code from an OpenAPI specification.
 *
 * Creates a complete module with:
 * - Zod schemas for all component schemas
 * - Parameter validators
 * - Route definitions with request/response types
 *
 * ```mermaid
 * flowchart LR
 *   subgraph Input
 *     A["OpenAPI Spec"]
 *   end
 *   subgraph Output
 *     B["import { createRoute, z } from '@hono/zod-openapi'"]
 *     C["// Component schemas"]
 *     D["// Route definitions"]
 *   end
 *   A --> B
 *   A --> C
 *   A --> D
 * ```
 *
 * @param openapi - The OpenAPI specification object
 * @param options - Export flags for each component kind
 * @returns The generated TypeScript code string
 *
 * @example
 * ```ts
 * const code = zodOpenAPIHono(openAPI, {
 *   exportSchemas: true,
 *   exportSchemasTypes: true,
 *   // ... other options
 * })
 * // Returns complete TypeScript module with routes and schemas
 * ```
 */
export function zodOpenAPIHono(
  openapi: OpenAPI,
  options: {
    readonly exportSchemasTypes: boolean
    readonly exportSchemas: boolean
    readonly exportParametersTypes: boolean
    readonly exportParameters: boolean
    readonly exportSecuritySchemes: boolean
    readonly exportRequestBodies: boolean
    readonly exportResponses: boolean
    readonly exportHeadersTypes: boolean
    readonly exportHeaders: boolean
    readonly exportExamples: boolean
    readonly exportLinks: boolean
    readonly exportCallbacks: boolean
  },
): string {
  const components = openapi.components ? componentsCode(openapi.components, options) : ''
  return `import{createRoute,z}from'@hono/zod-openapi'\n\n${components}\n\n${routeCode(openapi)}`
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-openapi-hono/openapi/index.ts
if (import.meta.vitest) {
  const { describe, it } = import.meta.vitest

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
  })
}
