import { afterAll, describe, it, expect } from 'vitest'
import { typeSpecToOpenAPI } from '.'
import fs from 'node:fs'

// Test run
// pnpm vitest run ./src/typespec/index.test.ts

describe('typeSpecToOpenAPI', () => {
  afterAll(() => {
    fs.rmSync('tmp-spec.tsp', { force: true })
    fs.rmSync('tmp', { recursive: true, force: true })
  })
  it('typeSpecToOpenAPI not Error', async () => {
    const tmpSpec = `import "@typespec/http";
import "@typespec/rest";

@service(#{ title: "Widget Service" })
namespace DemoService;

using Http;
using Rest;

model Widget {
  @key id: string;
  weight: int32;
  color: "red" | "blue";
}

@error
model Error {
  code: int32;
  message: string;
}

interface WidgetService extends Resource.ResourceOperations<Widget, Error> {
  @get @route("customGet") customGet(): Widget;
}
`
    fs.writeFileSync('tmp-spec.tsp', tmpSpec)
    await expect(typeSpecToOpenAPI('tmp-spec.tsp')).resolves.not.toThrow()
  })

  it('typeSpecToOpenAPI dir not Error', async () => {
    const tmpSpec = `import "@typespec/http";
import "@typespec/rest";

@service(#{ title: "Widget Service" })
namespace DemoService;

using Http;
using Rest;

model Widget {
  @key id: string;
  weight: int32;
  color: "red" | "blue";
}

@error
model Error {
  code: int32;
  message: string;
}

interface WidgetService extends Resource.ResourceOperations<Widget, Error> {
  @get @route("customGet") customGet(): Widget;
}
`
    fs.mkdirSync('tmp', { recursive: true })
    fs.writeFileSync('tmp/tmp-spec.tsp', tmpSpec)
    await expect(typeSpecToOpenAPI('tmp/tmp-spec.tsp')).resolves.not.toThrow()
  })

  it('typeSpecToOpenAPI Error', async () => {
    const tmpSpec = `import "@typespec/http";
import "@typespec/rest";

@service(#{ title: "Widget Service" })
namespace DemoService;

using Http;
using Rest;

model Widget {
  @key id: string;
  weight: int32;
  color: "red" | "blue";
}

@error
model Error {
  code: int32;
  message: strin
}

interface WidgetService extends Resource.ResourceOperations<Widget, Error> {
  @get @route("customGet") customGet(): Widget;
}
`
    fs.writeFileSync('tmp-spec.tsp', tmpSpec)
    await expect(typeSpecToOpenAPI('tmp-spec.tsp')).rejects.toThrow('TypeSpec compile failed')
  })
})
