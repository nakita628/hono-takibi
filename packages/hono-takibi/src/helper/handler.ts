/**
 * Route handler generation module.
 *
 * Generates skeleton handler files for Hono routes based on OpenAPI operations.
 *
 * Two modes are available:
 * - `makeStubHandlers`: Generates empty stub handlers
 * - `makeMockHandlers`: Generates handlers with faker.js mock responses
 *
 * @module helper/handler
 */
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import { schemaToFaker } from '../generator/test/faker-mapping.js'
import { generateHandlerTestCode } from '../generator/test/index.js'
import { isHttpMethod, isOperation, isOperationWithResponses } from '../guard/index.js'
import type { OpenAPI, Operation, Schema } from '../openapi/index.js'
import { methodPath } from '../utils/index.js'

/* ─────────────────────────────── Ref Collection ─────────────────────────────── */

function makeRefs(schema: Schema, refs: Set<string> = new Set()): Set<string> {
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop()
    if (refName) refs.add(refName)
  }
  if (schema.items) {
    const items = Array.isArray(schema.items) ? schema.items : [schema.items]
    for (const item of items) {
      makeRefs(item, refs)
    }
  }
  if (schema.properties) {
    for (const prop of Object.values(schema.properties)) {
      makeRefs(prop, refs)
    }
  }
  if (schema.allOf) {
    for (const s of schema.allOf) makeRefs(s, refs)
  }
  if (schema.oneOf) {
    for (const s of schema.oneOf) makeRefs(s, refs)
  }
  if (schema.anyOf) {
    for (const s of schema.anyOf) makeRefs(s, refs)
  }
  return refs
}

/* ─────────────────────────────── Mock Generation ─────────────────────────────── */

function makeMockFunction(name: string, schema: Schema, schemas: Record<string, Schema>): string {
  const mockBody = schemaToFaker(schema, undefined, { schemas })
  return `function mock${name}() {\n  return ${mockBody}\n}`
}

function makeResponseInfo(operation: Operation): {
  readonly schema: Schema | undefined
  readonly statusCode: number
} {
  if (!isOperationWithResponses(operation)) {
    return { schema: undefined, statusCode: 200 }
  }
  const responses = operation.responses
  const successResponse = responses['200'] ?? responses['201'] ?? responses['204']
  const responseSchema = successResponse?.content?.['application/json']?.schema
  const statusCode = responses['200'] ? 200 : responses['201'] ? 201 : responses['204'] ? 204 : 200
  return { schema: responseSchema, statusCode }
}

function makeMockHandlerCode(
  routeId: string,
  operation: Operation,
  schemas: Record<string, Schema>,
): {
  readonly content: string
  readonly needsFaker: boolean
  readonly usedRefs: ReadonlySet<string>
} {
  const { schema: responseSchema, statusCode } = makeResponseInfo(operation)

  if (responseSchema) {
    const usedRefs = makeRefs(responseSchema)
    const mockData = schemaToFaker(responseSchema, undefined, { schemas })
    return {
      content: `export const ${routeId}RouteHandler:RouteHandler<typeof ${routeId}Route>=async(c)=>{
  return c.json(${mockData}, ${statusCode})
}`,
      needsFaker: true,
      usedRefs,
    }
  }

  // 204 No Content
  return {
    content: `export const ${routeId}RouteHandler:RouteHandler<typeof ${routeId}Route>=async(c)=>{
  return new Response(null, { status: 204 })
}`,
    needsFaker: false,
    usedRefs: new Set(),
  }
}

/* ─────────────────────────────── Stub Generation ─────────────────────────────── */

function makeStubHandlerCode(routeId: string): string {
  return `export const ${routeId}RouteHandler:RouteHandler<typeof ${routeId}Route>=async(c)=>{}`
}

/* ─────────────────────────────── Path Utilities ─────────────────────────────── */

function makeHandlerFileName(path: string): `${string}.ts` {
  const rawSegment = path.replace(/^\/+/, '').split('/')[0] ?? ''
  const sanitized = rawSegment
    .replace(/\{([^}]+)\}/g, '$1')
    .replace(/[^0-9A-Za-z._-]/g, '_')
    .replace(/^[._-]+|[._-]+$/g, '')
    .replace(/__+/g, '_')
    .replace(/[-._](\w)/g, (_, c: string) => c.toUpperCase())
  const pathName = sanitized === '' ? '__root' : sanitized
  return `${pathName}.ts`
}

function makeTestFileName(fileName: `${string}.ts`): `${string}.ts` {
  return `${fileName.replace(/\.ts$/, '')}.test.ts`
}

function makePaths(output: string): {
  readonly handlerPath: string
  readonly importFrom: string
} {
  const isDot = output === '.' || output === './'
  const baseDir = isDot ? '.' : (output.match(/^(.*)\/[^/]+\.ts$/)?.[1] ?? '.')
  const handlerPath = baseDir === '.' ? 'handlers' : `${baseDir}/handlers`
  const routeEntryBasename = output.match(/[^/]+\.ts$/)?.[0] ?? 'index.ts'
  const importFrom = `../${routeEntryBasename.replace(/\.ts$/, '')}`
  return { handlerPath, importFrom }
}

/* ─────────────────────────────── Handler Info ─────────────────────────────── */

function makeStubHandlerInfo(
  path: string,
  method: string,
): {
  readonly fileName: `${string}.ts`
  readonly testFileName: `${string}.ts`
  readonly contents: readonly string[]
  readonly routeNames: readonly string[]
  readonly needsFaker: false
  readonly usedRefs: ReadonlySet<string>
} {
  const routeId = methodPath(method, path)
  const fileName = makeHandlerFileName(path)
  return {
    fileName,
    testFileName: makeTestFileName(fileName),
    contents: [makeStubHandlerCode(routeId)],
    routeNames: [`${routeId}Route`],
    needsFaker: false,
    usedRefs: new Set(),
  }
}

function makeMockHandlerInfo(
  path: string,
  method: string,
  operation: Operation,
  schemas: Record<string, Schema>,
): {
  readonly fileName: `${string}.ts`
  readonly testFileName: `${string}.ts`
  readonly contents: readonly string[]
  readonly routeNames: readonly string[]
  readonly needsFaker: boolean
  readonly usedRefs: ReadonlySet<string>
} {
  const routeId = methodPath(method, path)
  const fileName = makeHandlerFileName(path)
  const result = makeMockHandlerCode(routeId, operation, schemas)
  return {
    fileName,
    testFileName: makeTestFileName(fileName),
    contents: [result.content],
    routeNames: [`${routeId}Route`],
    needsFaker: result.needsFaker,
    usedRefs: result.usedRefs,
  }
}

function makeMergedHandlers<
  T extends {
    readonly fileName: `${string}.ts`
    readonly testFileName: `${string}.ts`
    readonly contents: readonly string[]
    readonly routeNames: readonly string[]
    readonly needsFaker: boolean
    readonly usedRefs: ReadonlySet<string>
  },
>(handlers: readonly T[]): readonly T[] {
  const handlerMap = new Map<string, T>()

  for (const handler of handlers) {
    const existing = handlerMap.get(handler.fileName)
    if (existing) {
      handlerMap.set(handler.fileName, {
        ...handler,
        contents: [...existing.contents, ...handler.contents],
        routeNames: Array.from(new Set([...existing.routeNames, ...handler.routeNames])),
        needsFaker: existing.needsFaker || handler.needsFaker,
        usedRefs: new Set([...existing.usedRefs, ...handler.usedRefs]),
      })
    } else {
      handlerMap.set(handler.fileName, handler)
    }
  }

  return Array.from(handlerMap.values())
}

/* ─────────────────────────────── File Content ─────────────────────────────── */

function makeStubFileContent(
  handler: {
    readonly contents: readonly string[]
    readonly routeNames: readonly string[]
  },
  importFrom: string,
): string {
  const routeTypes = Array.from(new Set(handler.routeNames)).join(', ')
  const importRouteTypes = routeTypes ? `import type { ${routeTypes} } from '${importFrom}';` : ''
  const importStatements = `import type { RouteHandler } from '@hono/zod-openapi'\n${importRouteTypes}`
  return `${importStatements}\n\n${handler.contents.join('\n\n')}`
}

function makeMockFileContent(
  handler: {
    readonly contents: readonly string[]
    readonly routeNames: readonly string[]
    readonly needsFaker: boolean
    readonly usedRefs: ReadonlySet<string>
  },
  importFrom: string,
  schemas: Record<string, Schema>,
): string {
  const routeTypes = Array.from(new Set(handler.routeNames)).join(', ')
  const importRouteTypes = routeTypes ? `import type { ${routeTypes} } from '${importFrom}';` : ''
  const fakerImport = handler.needsFaker ? "import { faker } from '@faker-js/faker'\n" : ''
  const importStatements = `import type { RouteHandler } from '@hono/zod-openapi'\n${fakerImport}${importRouteTypes}`

  const mockFunctions = Array.from(handler.usedRefs)
    .filter((refName) => schemas[refName])
    .map((refName) => makeMockFunction(refName, schemas[refName], schemas))
    .join('\n\n')

  return mockFunctions
    ? `${importStatements}\n\n${mockFunctions}\n\n${handler.contents.join('\n\n')}`
    : `${importStatements}\n\n${handler.contents.join('\n\n')}`
}

function makeBarrelContent(fileNames: readonly string[]): string {
  return fileNames.map((h) => `export * from './${h.replace(/\.ts$/, '')}'`).join('\n')
}

/* ─────────────────────────────── Stub Handlers (Main) ─────────────────────────────── */

/**
 * Generates empty stub handler files for a Hono app.
 *
 * @param openapi - The OpenAPI specification object.
 * @param output - The output directory or file path for generated handlers.
 * @param test - Whether to generate corresponding test files.
 * @returns A `Result` indicating success or error with message.
 */
export async function makeStubHandlers(
  openapi: OpenAPI,
  output: string,
  test = false,
): Promise<
  { readonly ok: true; readonly value: undefined } | { readonly ok: false; readonly error: string }
> {
  const paths = openapi.paths

  const handlers = makeMergedHandlers(
    Object.entries(paths).flatMap(([path, pathItem]) =>
      Object.entries(pathItem)
        .filter(
          (entry): entry is [string, Operation] => isHttpMethod(entry[0]) && isOperation(entry[1]),
        )
        .map(([method]) => makeStubHandlerInfo(path, method)),
    ),
  )

  const { handlerPath, importFrom } = makePaths(output)

  const mkdirResult = await mkdir(handlerPath)
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }

  const results = await Promise.all([
    ...handlers.map(async (handler) => {
      const fmtResult = await fmt(makeStubFileContent(handler, importFrom))
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error } as const
      const writeResult = await writeFile(`${handlerPath}/${handler.fileName}`, fmtResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error } as const

      if (test) {
        const testContent = generateHandlerTestCode(
          openapi,
          `${handlerPath}/${handler.fileName}`,
          [...handler.routeNames],
          '..',
        )
        if (testContent) {
          const testFmtResult = await fmt(testContent)
          const testCode = testFmtResult.ok ? testFmtResult.value : testContent
          const testWriteResult = await writeFile(
            `${handlerPath}/${handler.testFileName}`,
            testCode,
          )
          if (!testWriteResult.ok) return { ok: false, error: testWriteResult.error } as const
        }
      }
      return { ok: true, value: undefined } as const
    }),
    (async () => {
      const fmtResult = await fmt(makeBarrelContent(handlers.map((h) => h.fileName)))
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error } as const
      const writeResult = await writeFile(`${handlerPath}/index.ts`, fmtResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error } as const
      return { ok: true, value: undefined } as const
    })(),
  ])

  const firstError = results.find((r) => !r.ok)
  if (firstError) return firstError

  return { ok: true, value: undefined }
}

/* ─────────────────────────────── Mock Handlers (Main) ─────────────────────────────── */

/**
 * Generates mock handler files with faker.js responses for a Hono app.
 *
 * @param openapi - The OpenAPI specification object.
 * @param output - The output directory or file path for generated handlers.
 * @param test - Whether to generate corresponding test files.
 * @returns A `Result` indicating success or error with message.
 */
export async function makeMockHandlers(
  openapi: OpenAPI,
  output: string,
  test: boolean,
): Promise<
  { readonly ok: true; readonly value: undefined } | { readonly ok: false; readonly error: string }
> {
  const paths = openapi.paths
  const schemas = openapi.components?.schemas ?? {}

  const handlers = makeMergedHandlers(
    Object.entries(paths).flatMap(([path, pathItem]) =>
      Object.entries(pathItem)
        .filter(
          (entry): entry is [string, Operation] => isHttpMethod(entry[0]) && isOperation(entry[1]),
        )
        .map(([method, operation]) => makeMockHandlerInfo(path, method, operation, schemas)),
    ),
  )

  const { handlerPath, importFrom } = makePaths(output)

  const mkdirResult = await mkdir(handlerPath)
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }

  const results = await Promise.all([
    ...handlers.map(async (handler) => {
      const fmtResult = await fmt(makeMockFileContent(handler, importFrom, schemas))
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error } as const
      const writeResult = await writeFile(`${handlerPath}/${handler.fileName}`, fmtResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error } as const

      if (test) {
        const testContent = generateHandlerTestCode(
          openapi,
          `${handlerPath}/${handler.fileName}`,
          [...handler.routeNames],
          '..',
        )
        if (testContent) {
          const testFmtResult = await fmt(testContent)
          const testCode = testFmtResult.ok ? testFmtResult.value : testContent
          const testWriteResult = await writeFile(
            `${handlerPath}/${handler.testFileName}`,
            testCode,
          )
          if (!testWriteResult.ok) return { ok: false, error: testWriteResult.error } as const
        }
      }
      return { ok: true, value: undefined } as const
    }),
    (async () => {
      const fmtResult = await fmt(makeBarrelContent(handlers.map((h) => h.fileName)))
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error } as const
      const writeResult = await writeFile(`${handlerPath}/index.ts`, fmtResult.value)
      if (!writeResult.ok) return { ok: false, error: writeResult.error } as const
      return { ok: true, value: undefined } as const
    })(),
  ])

  const firstError = results.find((r) => !r.ok)
  if (firstError) return firstError

  return { ok: true, value: undefined }
}

// Legacy alias for backward compatibility
export { makeStubHandlers as zodOpenAPIHonoHandler }
export { makeMockHandlers as mockZodOpenAPIHonoHandler }
