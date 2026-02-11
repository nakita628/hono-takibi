/**
 * Route handler generation module.
 *
 * Generates skeleton handler files for Hono routes based on OpenAPI operations.
 *
 * Two modes are available:
 * - `zodOpenAPIHonoHandler`: Generates empty stub handlers
 * - `mockZodOpenAPIHonoHandler`: Generates handlers with faker.js mock responses
 *
 * @module helper/handler
 */
import { fmt } from '../format/index.js'
import { mkdir, readdir, readFile, unlink, writeFile } from '../fsp/index.js'
import { schemaToFaker } from '../generator/test/faker-mapping.js'
import { makeHandlerTestCode } from '../generator/test/index.js'
import { isHttpMethod, isOperation, isOperationWithResponses } from '../guard/index.js'
import { mergeBarrelFile, mergeHandlerFile, mergeTestFile } from '../merge/index.js'
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

function makePaths(
  output: string,
  pathAlias: string | undefined,
): {
  readonly handlerPath: string
  readonly importFrom: string
  readonly testImportFrom: string
} {
  const isDot = output === '.' || output === './'
  const baseDir = isDot ? '.' : (output.match(/^(.*)\/[^/]+\.ts$/)?.[1] ?? '.')
  const handlerPath = baseDir === '.' ? 'handlers' : `${baseDir}/handlers`
  const routeEntryBasename = output.match(/[^/]+\.ts$/)?.[0] ?? 'index.ts'
  const routeModuleName = routeEntryBasename.replace(/\.ts$/, '')
  const importFrom = pathAlias ? `${pathAlias}/${routeModuleName}` : `../${routeModuleName}`
  const testImportFrom = pathAlias ?? '..'
  return { handlerPath, importFrom, testImportFrom }
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

/* ─────────────────────────────── Stale File Cleanup ─────────────────────────────── */

/**
 * Removes handler files (and their test files) that are no longer in the OpenAPI spec.
 *
 * Compares existing files in the handlers directory with the set of generated filenames.
 * Any `.ts` handler file not in the generated set (excluding `index.ts` and `.test.ts` files)
 * is deleted, along with its corresponding `.test.ts` file.
 */
async function removeStaleFiles(
  handlerPath: string,
  generatedFileNames: ReadonlySet<string>,
): Promise<
  { readonly ok: true; readonly value: undefined } | { readonly ok: false; readonly error: string }
> {
  const readdirResult = await readdir(handlerPath)
  if (!readdirResult.ok) {
    // Directory doesn't exist yet (first generation) — nothing to clean
    return { ok: true, value: undefined }
  }

  const staleFiles = readdirResult.value.filter(
    (file) =>
      file.endsWith('.ts') &&
      !file.endsWith('.test.ts') &&
      file !== 'index.ts' &&
      !generatedFileNames.has(file),
  )

  const results = await Promise.all(
    staleFiles.flatMap((file) => [
      unlink(`${handlerPath}/${file}`),
      unlink(`${handlerPath}/${file.replace(/\.ts$/, '.test.ts')}`),
    ]),
  )

  const firstError = results.find((r) => !r.ok)
  if (firstError && !firstError.ok) return { ok: false, error: firstError.error }

  return { ok: true, value: undefined }
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
export async function zodOpenAPIHonoHandler(
  openapi: OpenAPI,
  output: string,
  test = false,
  pathAlias: string | undefined = undefined,
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

  const { handlerPath, importFrom, testImportFrom } = makePaths(output, pathAlias)

  const mkdirResult = await mkdir(handlerPath)
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }

  const results = await Promise.all([
    ...handlers.map(async (handler) => {
      const fmtResult = await fmt(makeStubFileContent(handler, importFrom))
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error } as const

      const filePath = `${handlerPath}/${handler.fileName}`
      const existingResult = await readFile(filePath)
      if (!existingResult.ok) return { ok: false, error: existingResult.error } as const

      const merged =
        existingResult.value !== null
          ? mergeHandlerFile(existingResult.value, fmtResult.value)
          : fmtResult.value

      const finalFmtResult = await fmt(merged)
      const content = finalFmtResult.ok ? finalFmtResult.value : merged

      const writeResult = await writeFile(filePath, content)
      if (!writeResult.ok) return { ok: false, error: writeResult.error } as const

      if (test) {
        const testContent = makeHandlerTestCode(
          openapi,
          `${handlerPath}/${handler.fileName}`,
          [...handler.routeNames],
          testImportFrom,
        )
        if (testContent) {
          const testFmtResult = await fmt(testContent)
          const testCode = testFmtResult.ok ? testFmtResult.value : testContent
          const testFilePath = `${handlerPath}/${handler.testFileName}`
          const existingTestResult = await readFile(testFilePath)
          if (!existingTestResult.ok) return { ok: false, error: existingTestResult.error } as const
          const mergedTestCode =
            existingTestResult.value !== null
              ? mergeTestFile(existingTestResult.value, testCode)
              : testCode
          const finalFmtResult = await fmt(mergedTestCode)
          const finalTestCode = finalFmtResult.ok ? finalFmtResult.value : mergedTestCode
          const testWriteResult = await writeFile(testFilePath, finalTestCode)
          if (!testWriteResult.ok) return { ok: false, error: testWriteResult.error } as const
        }
      }
      return { ok: true, value: undefined } as const
    }),
    (async () => {
      const fmtResult = await fmt(makeBarrelContent(handlers.map((h) => h.fileName)))
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error } as const

      const barrelPath = `${handlerPath}/index.ts`
      const existingResult = await readFile(barrelPath)
      if (!existingResult.ok) return { ok: false, error: existingResult.error } as const

      const content =
        existingResult.value !== null
          ? mergeBarrelFile(existingResult.value, fmtResult.value)
          : fmtResult.value

      const writeResult = await writeFile(barrelPath, content)
      if (!writeResult.ok) return { ok: false, error: writeResult.error } as const
      return { ok: true, value: undefined } as const
    })(),
  ])

  const firstError = results.find((r) => !r.ok)
  if (firstError) return firstError

  // Remove stale handler files (deleted from OpenAPI)
  const generatedFileNames = new Set(handlers.map((h) => h.fileName))
  const cleanupResult = await removeStaleFiles(handlerPath, generatedFileNames)
  if (!cleanupResult.ok) return { ok: false, error: cleanupResult.error }

  return { ok: true, value: undefined }
}

/* ─────────────────────────────── Mock Handlers (Main) ─────────────────────────────── */

/**
 * Generates mock handler files with faker.js responses for a Hono app.
 *
 * @param openapi - The OpenAPI specification object.
 * @param output - The output directory or file path for generated handlers.
 * @param test - Whether to generate corresponding test files.
 * @param pathAlias - Optional path alias prefix for import paths.
 * @returns A `Result` indicating success or error with message.
 */
export async function mockZodOpenAPIHonoHandler(
  openapi: OpenAPI,
  output: string,
  test: boolean,
  pathAlias: string | undefined = undefined,
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

  const { handlerPath, importFrom, testImportFrom } = makePaths(output, pathAlias)

  const mkdirResult = await mkdir(handlerPath)
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }

  const results = await Promise.all([
    ...handlers.map(async (handler) => {
      const fmtResult = await fmt(makeMockFileContent(handler, importFrom, schemas))
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error } as const

      const filePath = `${handlerPath}/${handler.fileName}`
      const existingResult = await readFile(filePath)
      if (!existingResult.ok) return { ok: false, error: existingResult.error } as const

      const merged =
        existingResult.value !== null
          ? mergeHandlerFile(existingResult.value, fmtResult.value)
          : fmtResult.value

      const finalFmtResult = await fmt(merged)
      const content = finalFmtResult.ok ? finalFmtResult.value : merged

      const writeResult = await writeFile(filePath, content)
      if (!writeResult.ok) return { ok: false, error: writeResult.error } as const

      if (test) {
        const testContent = makeHandlerTestCode(
          openapi,
          `${handlerPath}/${handler.fileName}`,
          [...handler.routeNames],
          testImportFrom,
        )
        if (testContent) {
          const testFmtResult = await fmt(testContent)
          const testCode = testFmtResult.ok ? testFmtResult.value : testContent
          const testFilePath = `${handlerPath}/${handler.testFileName}`
          const existingTestResult = await readFile(testFilePath)
          if (!existingTestResult.ok) return { ok: false, error: existingTestResult.error } as const
          const mergedTestCode =
            existingTestResult.value !== null
              ? mergeTestFile(existingTestResult.value, testCode)
              : testCode
          const finalFmtResult = await fmt(mergedTestCode)
          const finalTestCode = finalFmtResult.ok ? finalFmtResult.value : mergedTestCode
          const testWriteResult = await writeFile(testFilePath, finalTestCode)
          if (!testWriteResult.ok) return { ok: false, error: testWriteResult.error } as const
        }
      }
      return { ok: true, value: undefined } as const
    }),
    (async () => {
      const fmtResult = await fmt(makeBarrelContent(handlers.map((h) => h.fileName)))
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error } as const

      const barrelPath = `${handlerPath}/index.ts`
      const existingResult = await readFile(barrelPath)
      if (!existingResult.ok) return { ok: false, error: existingResult.error } as const

      const content =
        existingResult.value !== null
          ? mergeBarrelFile(existingResult.value, fmtResult.value)
          : fmtResult.value

      const writeResult = await writeFile(barrelPath, content)
      if (!writeResult.ok) return { ok: false, error: writeResult.error } as const
      return { ok: true, value: undefined } as const
    })(),
  ])

  const firstError = results.find((r) => !r.ok)
  if (firstError) return firstError

  // Remove stale handler files (deleted from OpenAPI)
  const generatedFileNames = new Set(handlers.map((h) => h.fileName))
  const cleanupResult = await removeStaleFiles(handlerPath, generatedFileNames)
  if (!cleanupResult.ok) return { ok: false, error: cleanupResult.error }

  return { ok: true, value: undefined }
}
