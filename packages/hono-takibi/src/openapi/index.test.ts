import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import SwaggerParser from '@apidevtools/swagger-parser'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { runGenerator, runGeneratorError } from '../testing/index.js'
import { parseOpenAPI } from './index.js'

describe('parseOpenAPI', () => {
  it('includes the resolver error code when a download has no reason text', async () => {
    const url = 'https://example.com:81/openapi.yaml'
    const failure = Object.assign(new Error(`Error downloading ${url}: `), {
      ioErrorCode: 'ETIMEDOUT',
    })
    const bundle = vi.spyOn(SwaggerParser, 'bundle').mockRejectedValueOnce(failure)
    try {
      const error = await runGeneratorError(parseOpenAPI(url))
      expect(error.message).toBe(`Error downloading ${url}: ETIMEDOUT`)
    } finally {
      bundle.mockRestore()
    }
  })

  it('preserves an existing download reason without duplicating its code', async () => {
    const url = 'https://example.com/openapi.yaml'
    const message = `Error downloading ${url}: getaddrinfo ENOTFOUND example.com`
    const bundle = vi
      .spyOn(SwaggerParser, 'bundle')
      .mockRejectedValueOnce(Object.assign(new Error(message), { ioErrorCode: 'ENOTFOUND' }))
    try {
      const error = await runGeneratorError(parseOpenAPI(url))
      expect(error.message).toBe(message)
    } finally {
      bundle.mockRestore()
    }
  })

  it.concurrent('should return ok for a valid OpenAPI JSON file', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-openapi-'))
    const input = `${directory}/openapi.json` as const
    const document = {
      openapi: '3.0.0',
      info: {
        title: 'Test API',
        version: '1.0.0',
      },
      components: {
        schemas: {
          Test: {
            type: 'object',
            required: ['test'],
            properties: {
              test: {
                type: 'string',
              },
            },
          },
        },
      },
      paths: {
        '/test': {
          post: {
            summary: 'Test endpoint',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Test',
                  },
                },
              },
            },
            responses: {
              '200': {
                description: 'Successful test',
              },
            },
          },
        },
      },
    }
    fs.writeFileSync(input, JSON.stringify(document))
    try {
      await expect(runGenerator(parseOpenAPI(input))).resolves.toStrictEqual(document)
    } finally {
      fs.rmSync(directory, { recursive: true, force: true })
    }
  })

  it.concurrent('should return err for a YAML file that will not parse', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-openapi-'))
    const input = `${directory}/broken.yaml` as const
    fs.writeFileSync(input, 'openapi: "3.0.0\ninfo: [unclosed')
    try {
      const error = await runGeneratorError(parseOpenAPI(input))
      expect(error._tag).toBe('OpenAPIError')
      expect(error.message.length).toBeGreaterThan(0)
    } finally {
      fs.rmSync(directory, { recursive: true, force: true })
    }
  })

  it.concurrent('should return err for a JSON file that will not parse', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-openapi-'))
    const input = `${directory}/broken.json` as const
    fs.writeFileSync(input, '{"openapi": "3.0.0",')
    try {
      const error = await runGeneratorError(parseOpenAPI(input))
      expect(error._tag).toBe('OpenAPIError')
      expect(error.message.length).toBeGreaterThan(0)
    } finally {
      fs.rmSync(directory, { recursive: true, force: true })
    }
  })

  it.concurrent('should return err for a document that does not exist', async () => {
    const result = await runGeneratorError(parseOpenAPI('not-yaml-nor-json.yaml'))
    expect(typeof result.message).toBe('string')
  })

  // #395: with IPv6 unreachable, an IPv4 handshake slower than Node's 250 ms attempt timeout
  // ended the download in ETIMEDOUT where curl succeeds
  // swagger-parser asks for `paths` or `webhooks`; the document is taken as it answers.
  it.concurrent('rejects a 3.1 document of components alone, as swagger-parser does', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-openapi-'))
    const input = `${directory}/openapi.yaml` as const
    fs.writeFileSync(
      input,
      [
        'openapi: 3.1.0',
        'info: { title: Shared schemas, version: 1.0.0 }',
        'components:',
        '  schemas:',
        '    Money:',
        '      type: object',
        '      required: [amount, currency]',
        '      properties:',
        '        amount: { type: integer }',
        '        currency: { $ref: "#/components/schemas/Currency" }',
        '    Currency:',
        '      type: string',
        '',
      ].join('\n'),
    )
    try {
      const error = await runGeneratorError(parseOpenAPI(input))
      expect(error.message).toBe(`${input} is not a valid Openapi API definition`)
    } finally {
      fs.rmSync(directory, { recursive: true, force: true })
    }
  })

  it.concurrent('rejects a 3.1 document with neither paths, webhooks nor components', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-openapi-'))
    const input = `${directory}/openapi.yaml` as const
    fs.writeFileSync(input, 'openapi: 3.1.0\ninfo: { title: Nothing, version: 1.0.0 }\n')
    try {
      const error = await runGeneratorError(parseOpenAPI(input))
      expect(error.message).toBe(`${input} is not a valid Openapi API definition`)
    } finally {
      fs.rmSync(directory, { recursive: true, force: true })
    }
  })

  it.concurrent('rejects a 3.0 document of components alone, which needs paths', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-openapi-'))
    const input = `${directory}/openapi.yaml` as const
    fs.writeFileSync(
      input,
      'openapi: 3.0.3\ninfo: { title: Shared schemas, version: 1.0.0 }\ncomponents:\n  schemas:\n    Money: { type: object }\n',
    )
    try {
      const error = await runGeneratorError(parseOpenAPI(input))
      expect(error.message).toBe(`${input} is not a valid Openapi API definition`)
    } finally {
      fs.rmSync(directory, { recursive: true, force: true })
    }
  })
})

// TypeSpec test
// Files are created in the package root to resolve TypeSpec libraries from node_modules
const TSP_TEST_DIR = path.resolve(import.meta.dirname, '../..')
const TSP_TEST_FILE = `${TSP_TEST_DIR}/tmp-spec.tsp` as const
const TSP_TEST_SUBDIR = `${TSP_TEST_DIR}/tmp`
// The document both Widget specs below compile to.
const WIDGET_OPENAPI = {
  openapi: '3.0.0',
  info: {
    title: 'Widget Service',
    version: '0.0.0',
  },
  externalDocs: undefined,
  security: undefined,
  tags: [],
  paths: {
    '/{id}': {
      get: {
        operationId: 'read',
        summary: undefined,
        description: undefined,
        parameters: [
          {
            description: undefined,
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          '200': {
            description: 'The request has succeeded.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Widget',
                },
              },
            },
          },
          default: {
            description: 'An unexpected error response.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
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
      LightWidget: {
        type: 'object',
        required: ['kind'],
        properties: {
          kind: {
            type: 'string',
            enum: ['Light'],
          },
        },
        allOf: [
          {
            $ref: '#/components/schemas/WidgetBase',
          },
        ],
      },
      WidgetBase: {
        type: 'object',
        required: ['id', 'weight', 'color'],
        properties: {
          id: {
            type: 'string',
          },
          weight: {
            type: 'integer',
            format: 'int32',
          },
          color: {
            type: 'string',
            enum: ['red', 'blue'],
          },
        },
      },
      HeavyWidget: {
        type: 'object',
        required: ['kind'],
        properties: {
          kind: {
            type: 'string',
            enum: ['Heavy'],
          },
        },
        allOf: [
          {
            $ref: '#/components/schemas/WidgetBase',
          },
        ],
      },
      WidgetHeavy: {
        type: 'object',
        required: ['kind', 'value'],
        properties: {
          kind: {
            type: 'string',
            enum: ['heavy'],
          },
          value: {
            $ref: '#/components/schemas/HeavyWidget',
          },
        },
      },
      WidgetLight: {
        type: 'object',
        required: ['kind', 'value'],
        properties: {
          kind: {
            type: 'string',
            enum: ['light'],
          },
          value: {
            $ref: '#/components/schemas/LightWidget',
          },
        },
      },
      Widget: {
        type: 'object',
        oneOf: [
          {
            $ref: '#/components/schemas/WidgetHeavy',
          },
          {
            $ref: '#/components/schemas/WidgetLight',
          },
        ],
        discriminator: {
          propertyName: 'kind',
          mapping: {
            heavy: '#/components/schemas/WidgetHeavy',
            light: '#/components/schemas/WidgetLight',
          },
        },
      },
      Error: {
        type: 'object',
        required: ['code', 'message'],
        properties: {
          code: {
            type: 'integer',
            format: 'int32',
          },
          message: {
            type: 'string',
          },
        },
      },
      WidgetKind: {
        type: 'string',
        enum: ['Heavy', 'Light'],
      },
    },
  },
}

describe('parseOpenAPI TypeSpec', () => {
  beforeEach(() => {
    fs.rmSync(TSP_TEST_FILE, { force: true })
    fs.rmSync(TSP_TEST_SUBDIR, { recursive: true, force: true })
  })
  afterEach(() => {
    fs.rmSync(TSP_TEST_FILE, { force: true })
    fs.rmSync(TSP_TEST_SUBDIR, { recursive: true, force: true })
  })
  it('typeSpecToOpenAPI not Error', { timeout: 30_000 }, async () => {
    const tmpTsp = `import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

@service(#{ title: "Widget Service" })
namespace DemoService;
using Rest;
using Http;
using OpenAPI;

model WidgetBase {
  @key id: string;
  weight: int32;
  color: "red" | "blue";
}

enum WidgetKind {
  Heavy,
  Light,
}

model HeavyWidget extends WidgetBase {
  kind: WidgetKind.Heavy;
}

model LightWidget extends WidgetBase {
  kind: WidgetKind.Light;
}

@discriminated
union Widget {
  heavy: HeavyWidget,
  light: LightWidget,
}

@error
model Error {
  code: int32;
  message: string;
}

@get op read(@path id: string): Widget | Error;
`
    fs.writeFileSync(TSP_TEST_FILE, tmpTsp)
    const openapi = await runGenerator(parseOpenAPI(TSP_TEST_FILE))
    // TypeSpec builds the document from its own ObjectBuilder class; compare it as plain data.
    expect(structuredClone(openapi)).toStrictEqual(WIDGET_OPENAPI)
  })

  it('typeSpecToOpenAPI dir not Error', { timeout: 30_000 }, async () => {
    const tmpTsp = `import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

@service(#{ title: "Widget Service" })
namespace DemoService;
using Rest;
using Http;
using OpenAPI;

model WidgetBase {
  @key id: string;
  weight: int32;
  color: "red" | "blue";
}

enum WidgetKind {
  Heavy,
  Light,
}

model HeavyWidget extends WidgetBase {
  kind: WidgetKind.Heavy;
}

model LightWidget extends WidgetBase {
  kind: WidgetKind.Light;
}

@discriminated
union Widget {
  heavy: HeavyWidget,
  light: LightWidget,
}

@error
model Error {
  code: int32;
  message: string;
}

@get op read(@path id: string): Widget | Error;
`
    fs.mkdirSync(TSP_TEST_SUBDIR, { recursive: true })
    fs.writeFileSync(`${TSP_TEST_SUBDIR}/tmp-spec.tsp`, tmpTsp)
    const openapi = await runGenerator(parseOpenAPI(`${TSP_TEST_SUBDIR}/tmp-spec.tsp`))
    // TypeSpec builds the document from its own ObjectBuilder class; compare it as plain data.
    expect(structuredClone(openapi)).toStrictEqual(WIDGET_OPENAPI)
  })

  it('typeSpecToOpenAPI Error', { timeout: 10_000 }, async () => {
    const tmpTsp = `import "@typespec`
    fs.writeFileSync(TSP_TEST_FILE, tmpTsp)
    const error = await runGeneratorError(parseOpenAPI(TSP_TEST_FILE))
    expect(error.message).toBe(
      "TypeSpec compile failed:\nUnterminated string literal.\n';' expected.\nCouldn't resolve import \"@typespec\"",
    )
  })
})
