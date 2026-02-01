import fs from 'node:fs'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { parseOpenAPI } from './index.js'

describe('parseOpenAPI', () => {
  it.concurrent('should return ok for a valid OpenAPI YAML string', async () => {
    const result = await parseOpenAPI({
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
    } as unknown as string)
    expect(result.ok).toBe(true)
  })

  it.concurrent('should return err for a completely invalid input', async () => {
    const result = await parseOpenAPI('not yaml nor json')
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(typeof result.error).toBe('string')
    }
  })
})

// TypeSpec test
describe('parseOpenAPI TypeSpec', () => {
  beforeEach(() => {
    fs.rmSync('tmp-spec.tsp', { force: true })
    fs.rmSync('packages/hono-takibi/tmp', { recursive: true, force: true })
  })
  afterEach(() => {
    fs.rmSync('tmp-spec.tsp', { force: true })
    fs.rmSync('packages/hono-takibi/tmp', { recursive: true, force: true })
  })
  it('typeSpecToOpenAPI not Error', { timeout: 30000 }, async () => {
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
    fs.writeFileSync('tmp-spec.tsp', tmpTsp)
    const result = await parseOpenAPI('tmp-spec.tsp')
    expect(result.ok).toBe(true)
  })

  it('typeSpecToOpenAPI dir not Error', { timeout: 30000 }, async () => {
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
    fs.mkdirSync('tmp', { recursive: true })
    fs.writeFileSync('tmp/tmp-spec.tsp', tmpTsp)
    const result = await parseOpenAPI('tmp/tmp-spec.tsp')
    expect(result.ok).toBe(true)
  })

  it('typeSpecToOpenAPI Error', { timeout: 10000 }, async () => {
    const tmpTsp = `import "@typespec`
    fs.writeFileSync('tmp-spec.tsp', tmpTsp)
    const result = await parseOpenAPI('tmp-spec.tsp')
    expect(result.ok).toBe(false)
  })
})
