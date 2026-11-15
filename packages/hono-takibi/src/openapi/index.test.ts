import fs from 'node:fs'
import net from 'node:net'
import os from 'node:os'
import path from 'node:path'

import SwaggerParser from '@apidevtools/swagger-parser'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { runGenerator, runGeneratorError } from '../testing/index.js'
import { CONNECT_ATTEMPT_TIMEOUT_MS, isLiteralPointer, parseOpenAPI } from './index.js'

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
    fs.writeFileSync(
      input,
      JSON.stringify({
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
      }),
    )
    try {
      await expect(runGenerator(parseOpenAPI(input))).resolves.toBeDefined()
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
  it('gives a connection attempt two seconds while bundling, then puts the default back', async () => {
    const previous = net.getDefaultAutoSelectFamilyAttemptTimeout()
    const document = { openapi: '3.0.0', info: { title: 't', version: '1' }, paths: {} }
    const seen: number[] = []
    const bundle = vi.spyOn(SwaggerParser, 'bundle').mockImplementationOnce(() => {
      seen.push(net.getDefaultAutoSelectFamilyAttemptTimeout())
      return Promise.resolve(document)
    })
    try {
      await expect(runGenerator(parseOpenAPI('https://example.com/openapi.yaml'))).resolves.toBe(
        document,
      )
      expect(seen).toStrictEqual([Math.max(previous, CONNECT_ATTEMPT_TIMEOUT_MS)])
      expect(net.getDefaultAutoSelectFamilyAttemptTimeout()).toBe(previous)
    } finally {
      bundle.mockRestore()
    }
  })

  it('puts the attempt timeout default back when bundling fails', async () => {
    const previous = net.getDefaultAutoSelectFamilyAttemptTimeout()
    const bundle = vi
      .spyOn(SwaggerParser, 'bundle')
      .mockRejectedValueOnce(new Error('Error downloading https://example.com/openapi.yaml: '))
    try {
      await runGeneratorError(parseOpenAPI('https://example.com/openapi.yaml'))
      expect(net.getDefaultAutoSelectFamilyAttemptTimeout()).toBe(previous)
    } finally {
      bundle.mockRestore()
    }
  })

  // #417: OpenAPI 3.1 asks for one of `paths`, `components` and `webhooks`
  it.concurrent('reads a 3.1 document of components alone, with an empty paths', async () => {
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
      const document = await runGenerator(parseOpenAPI(input))
      expect(document.paths).toStrictEqual({})
      expect(document.components?.schemas).toStrictEqual({
        Money: {
          type: 'object',
          required: ['amount', 'currency'],
          properties: {
            amount: { type: 'integer' },
            currency: { $ref: '#/components/schemas/Currency' },
          },
        },
        Currency: { type: 'string' },
      })
    } finally {
      fs.rmSync(directory, { recursive: true, force: true })
    }
  })

  it.concurrent('still rejects a 3.1 document with neither paths, webhooks nor components', async () => {
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

  it.concurrent('still rejects a 3.0 document of components alone, which needs paths', async () => {
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

describe('a $ref key inside a literal (#432)', () => {
  it.concurrent('leaves the $ref keys of examples, defaults and enums as data', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-openapi-'))
    const input = `${directory}/openapi.json` as const
    const content = {
      schema: {
        type: 'object',
        example: { panel: { $ref: '#/spec/panels/a' } },
        examples: [{ $ref: '#/spec/panels/b' }],
        properties: {
          // A property named as a keyword is a schema, and its reference is one.
          example: { $ref: '#/components/schemas/Panel' },
          kind: { default: { $ref: '#/spec/c' }, enum: [{ $ref: '#/spec/d' }] },
        },
      },
      example: { $ref: '#/spec/panels/e' },
      examples: { sample: { value: { content: { $ref: '#/spec/panels/request-rate' } } } },
    }
    const document = {
      openapi: '3.1.0',
      info: { title: 'Example dollar-ref', version: '1.0' },
      paths: {
        '/widgets': {
          post: {
            requestBody: { content: { 'application/json': content } },
            responses: { default: { $ref: '#/components/responses/Failure' } },
          },
        },
      },
      components: {
        schemas: { Panel: { type: 'string' } },
        responses: { Failure: { description: 'failure' } },
      },
    }
    fs.writeFileSync(input, JSON.stringify(document))
    try {
      await expect(runGenerator(parseOpenAPI(input))).resolves.toStrictEqual(document)
    } finally {
      fs.rmSync(directory, { recursive: true, force: true })
    }
  })

  it.concurrent('leaves the literals of a referenced file as data, and bundles the rest', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'takibi-openapi-'))
    const input = `${directory}/openapi.json` as const
    fs.writeFileSync(
      `${directory}/body.json`,
      JSON.stringify({
        content: {
          'application/json': {
            schema: { type: 'object' },
            example: { panel: { $ref: '#/spec/panels/a' } },
          },
        },
      }),
    )
    fs.writeFileSync(
      input,
      JSON.stringify({
        openapi: '3.0.3',
        info: { title: 'Example dollar-ref', version: '1.0' },
        paths: {
          '/widgets': {
            post: {
              requestBody: { $ref: 'body.json' },
              responses: { 200: { description: 'ok' } },
            },
          },
        },
      }),
    )
    try {
      const result = await runGenerator(parseOpenAPI(input))
      expect(result.paths).toStrictEqual({
        '/widgets': {
          post: {
            requestBody: {
              content: {
                'application/json': {
                  schema: { type: 'object' },
                  example: { panel: { $ref: '#/spec/panels/a' } },
                },
              },
            },
            responses: { 200: { description: 'ok' } },
          },
        },
      })
    } finally {
      fs.rmSync(directory, { recursive: true, force: true })
    }
  })

  it.concurrent.each([
    ['#/paths/~1w/post/requestBody/content/application~1json/example', undefined, true],
    ['#/paths/~1w/post/requestBody/content/application~1json/examples/a/value', undefined, true],
    ['#/paths/~1w/post/requestBody/content/application~1json/examples/a', undefined, false],
    ['#/components/examples/example/value/default', undefined, true],
    ['#/components/examples/example', undefined, false],
    ['#/components/schemas/A/default', undefined, true],
    ['#/components/schemas/A/enum/0', undefined, true],
    ['#/components/schemas/A/const', undefined, true],
    ['#/components/schemas/A/examples', [{}], true],
    ['#/components/schemas/A/examples', {}, false],
    ['#/components/schemas/A/properties/example', undefined, false],
    ['#/components/schemas/A/properties/default/properties/enum', undefined, false],
    ['#/components/schemas/A/properties/properties/example', undefined, true],
    ['#/components/schemas/default', undefined, false],
    ['#/paths/~1w/get/responses/default', undefined, false],
    ['#/paths/~1w/get/parameters/0/example', undefined, true],
    ['#/paths/~1w/get/parameters/0/schema', undefined, false],
    ['#', undefined, false],
  ])('isLiteralPointer(%s, %j) is %s', (pointer, value, expected) => {
    expect(isLiteralPointer(pointer, value)).toBe(expected)
  })
})

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
    await expect(runGenerator(parseOpenAPI(TSP_TEST_FILE))).resolves.toBeDefined()
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
    await expect(
      runGenerator(parseOpenAPI(`${TSP_TEST_SUBDIR}/tmp-spec.tsp`)),
    ).resolves.toBeDefined()
  })

  it('typeSpecToOpenAPI Error', { timeout: 10_000 }, async () => {
    const tmpTsp = `import "@typespec`
    fs.writeFileSync(TSP_TEST_FILE, tmpTsp)
    const error = await runGeneratorError(parseOpenAPI(TSP_TEST_FILE))
    expect(error.message).toContain('TypeSpec compile failed')
  })
})
