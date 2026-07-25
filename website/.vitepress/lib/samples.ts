export const DEFAULT_GENERATE_OPTIONS = {
  exportSchemas: false,
  exportSchemasTypes: false,
  exportResponses: false,
  exportParameters: false,
  exportParametersTypes: false,
  exportExamples: false,
  exportRequestBodies: false,
  exportHeaders: false,
  exportHeadersTypes: false,
  exportSecuritySchemes: false,
  exportLinks: false,
  exportCallbacks: false,
  exportPathItems: false,
  exportMediaTypes: false,
  exportMediaTypesTypes: false,
}

export const SAMPLES = [
  {
    name: 'TypeSpec',
    mode: 'typespec',
    language: 'typespec',
    path: 'file:///main.tsp',
    source: `import "@typespec/http";

using Http;

@service(#{ title: "Hono Takibi API" })
namespace HonoTakibi;

@example(#{ message: "Hono Takibi🔥" })
model Message {
  message: string;
}

@get op welcome(): Message;
`,
  },
  {
    name: 'OpenAPI (YAML)',
    mode: 'yaml',
    language: 'yaml',
    path: 'file:///main.yaml',
    source: `openapi: 3.1.0
info:
  title: Hono Takibi API
  version: '1.0.0'
paths:
  /:
    get:
      summary: Welcome
      description: Returns a welcome message from Hono Takibi.
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Hono Takibi🔥
                required:
                  - message
`,
  },
  {
    name: 'OpenAPI (JSON)',
    mode: 'json',
    language: 'json',
    path: 'file:///main.json',
    source: `{
  "openapi": "3.1.0",
  "info": { "title": "Hono Takibi API", "version": "1.0.0" },
  "paths": {
    "/": {
      "get": {
        "summary": "Welcome",
        "description": "Returns a welcome message from Hono Takibi.",
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Message" }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Message": {
        "type": "object",
        "properties": {
          "message": { "type": "string", "example": "Hono Takibi🔥" }
        },
        "required": ["message"]
      }
    }
  }
}
`,
  },
] as const
