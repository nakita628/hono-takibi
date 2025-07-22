import fs from 'node:fs'
import { afterAll, describe, expect, it } from 'vitest'
import { typeSpecToOpenAPI } from '.'

// Test run
// pnpm vitest run ./src/typespec/index.test.ts

describe('typeSpecToOpenAPI', () => {
  afterAll(() => {
    fs.rmSync('tmp-spec.tsp', { force: true })
    fs.rmSync('tmp', { recursive: true, force: true })
  })
  it('typeSpecToOpenAPI not Error', async () => {
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
    await expect(typeSpecToOpenAPI('tmp-spec.tsp')).resolves.not.toThrow()
  })

  it('typeSpecToOpenAPI dir not Error', async () => {
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
    await expect(typeSpecToOpenAPI('tmp/tmp-spec.tsp')).resolves.not.toThrow()
  })

  it('typeSpecToOpenAPI Error', async () => {
    const tmpTsp = `import "@typespec`
    fs.writeFileSync('tmp-spec.tsp', tmpTsp)
    await expect(typeSpecToOpenAPI('tmp-spec.tsp')).rejects.toThrow('TypeSpec compile failed')
  })
})
