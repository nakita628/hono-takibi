import path from 'node:path'

import { fmt } from '../format/index.js'
import { mkdir, readdir, readFile, unlink, writeFile } from '../fsp/index.js'
import { schemaToFaker } from '../generator/test/faker-mapping.js'
import { makeHandlerTestCode } from '../generator/test/index.js'
import { defineEntries } from '../generator/zod-openapi-hono/openapi/define/index.js'
import { isHttpMethod, isOperation, isOperationWithResponses } from '../guard/index.js'
import {
  mergeBarrelFile,
  mergeDefineFile,
  mergeHandlerFile,
  mergeTestFile,
} from '../merge/index.js'
import type { OpenAPI, Operation, Schema } from '../openapi/index.js'
import { methodPath } from '../utils/index.js'
import { makeImports, makeModuleSpec } from './code.js'

function makeRefs(schema: Schema, refs: Set<string> = new Set()) {
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
    for (const s of schema.allOf) {
      makeRefs(s, refs)
    }
  }
  if (schema.oneOf) {
    for (const s of schema.oneOf) {
      makeRefs(s, refs)
    }
  }
  if (schema.anyOf) {
    for (const s of schema.anyOf) {
      makeRefs(s, refs)
    }
  }
  return refs
}

function makeMockFunction(name: string, schema: Schema, schemas: { readonly [k: string]: Schema }) {
  const mockBody = schemaToFaker(schema, undefined, { schemas })
  return `function mock${name}() {\n  return ${mockBody}\n}`
}

function makeResponseInfo(operation: Operation) {
  if (!isOperationWithResponses(operation)) {
    return { schema: undefined, statusCode: 200 } as const
  }
  const responses = operation.responses
  const successResponse = responses['200'] ?? responses['201'] ?? responses['204']
  const responseSchema = successResponse?.content?.['application/json']?.schema
  const statusCode = responses['200'] ? 200 : responses['201'] ? 201 : responses['204'] ? 204 : 200
  return { schema: responseSchema, statusCode } as const
}

function makeMockHandlerCode(
  routeId: string,
  operation: Operation,
  schemas: { readonly [k: string]: Schema },
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
}` as const,
      needsFaker: true,
      usedRefs,
    } as const
  }
  return {
    content: `export const ${routeId}RouteHandler:RouteHandler<typeof ${routeId}Route>=async(_c)=>{
  return new Response(null, { status: 204 })
}` as const,
    needsFaker: false,
    usedRefs: new Set(),
  } as const
}

function makeStubHandlerCode(routeId: string) {
  return `export const ${routeId}RouteHandler:RouteHandler<typeof ${routeId}Route>=async(c)=>{}`
}

export function makeHandlerFileName(path: string): `${string}.ts` {
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
  return `${path.basename(fileName, '.ts')}.test.ts`
}

function makePaths(
  output: string,
  pathAlias: string | undefined,
  routeImport?: string,
  handlerDir?: string,
) {
  const isDot = output === '.' || output === './'
  const isIndexFile = !isDot && output.endsWith('/index.ts')
  const baseDir = isDot
    ? '.'
    : isIndexFile
      ? (output.match(/^(.*)\/[^/]+\/index\.ts$/)?.[1] ?? '.')
      : (output.match(/^(.*)\/[^/]+\.ts$/)?.[1] ?? '.')
  const handlerPath = handlerDir ?? (baseDir === '.' ? 'handlers' : `${baseDir}/handlers`)
  const routeModuleName = isIndexFile
    ? (output.match(/([^/]+)\/index\.ts$/)?.[1] ?? 'index')
    : output.endsWith('.ts')
      ? path.basename(output, '.ts')
      : 'index'
  const aliasPrefix = pathAlias?.endsWith('/') ? pathAlias.slice(0, -1) : pathAlias
  const importFrom =
    routeImport ?? (aliasPrefix ? `${aliasPrefix}/${routeModuleName}` : `../${routeModuleName}`)
  const testImportFrom = aliasPrefix ?? '..'
  return { handlerPath, importFrom, testImportFrom } as const
}

function makeInlineStubContent(routeId: string) {
  return `.openapi(${routeId}Route,(c)=>{})`
}

function makeInlineMockContent(
  routeId: string,
  operation: Operation,
  schemas: { readonly [k: string]: Schema },
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
      content: `.openapi(${routeId}Route,async(c)=>{return c.json(${mockData},${statusCode})})`,
      needsFaker: true,
      usedRefs,
    } as const
  }
  return {
    content: `.openapi(${routeId}Route,async(_c)=>{return new Response(null,{status:204})})`,
    needsFaker: false,
    usedRefs: new Set(),
  } as const
}

function makeInlineStubHandlerInfo(
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
    contents: [makeInlineStubContent(routeId)],
    routeNames: [`${routeId}Route`],
    needsFaker: false,
    usedRefs: new Set(),
  } as const
}

function makeInlineMockHandlerInfo(
  path: string,
  method: string,
  operation: Operation,
  schemas: { readonly [k: string]: Schema },
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
  const result = makeInlineMockContent(routeId, operation, schemas)
  return {
    fileName,
    testFileName: makeTestFileName(fileName),
    contents: [result.content],
    routeNames: [`${routeId}Route`],
    needsFaker: result.needsFaker,
    usedRefs: result.usedRefs,
  }
}

function makeInlineStubFileContent(
  handler: {
    readonly fileName: `${string}.ts`
    readonly contents: readonly string[]
    readonly routeNames: readonly string[]
  },
  importFrom: string,
) {
  const exportName = `${path.basename(handler.fileName, '.ts')}Handler`
  const routeImports = Array.from(new Set(handler.routeNames)).join(', ')
  const importRoutes = routeImports ? `import { ${routeImports} } from '${importFrom}';` : ''
  const importStatements = `import { OpenAPIHono } from '@hono/zod-openapi'\n${importRoutes}`
  const chain = handler.contents.join('\n')
  return `${importStatements}\n\nconst app = new OpenAPIHono()\n\nexport const ${exportName} = app\n${chain}`
}

function makeInlineMockFileContent(
  handler: {
    readonly fileName: `${string}.ts`
    readonly contents: readonly string[]
    readonly routeNames: readonly string[]
    readonly needsFaker: boolean
    readonly usedRefs: ReadonlySet<string>
  },
  importFrom: string,
  schemas: { readonly [k: string]: Schema },
) {
  const exportName = `${path.basename(handler.fileName, '.ts')}Handler`
  const routeImports = Array.from(new Set(handler.routeNames)).join(', ')
  const importRoutes = routeImports ? `import { ${routeImports} } from '${importFrom}';` : ''
  const fakerImport = handler.needsFaker ? "import { faker } from '@faker-js/faker'\n" : ''
  const importStatements = `import { OpenAPIHono } from '@hono/zod-openapi'\n${fakerImport}${importRoutes}`
  const mockFunctions = Array.from(handler.usedRefs)
    .filter((refName) => schemas[refName])
    .map((refName) => makeMockFunction(refName, schemas[refName], schemas))
    .join('\n\n')
  const appDecl = 'const app = new OpenAPIHono()'
  const chain = handler.contents.join('\n')
  const body = `export const ${exportName} = app\n${chain}`
  return mockFunctions
    ? `${importStatements}\n\n${appDecl}\n\n${mockFunctions}\n\n${body}`
    : `${importStatements}\n\n${appDecl}\n\n${body}`
}

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
  } as const
}

function makeMockHandlerInfo(
  path: string,
  method: string,
  operation: Operation,
  schemas: { readonly [k: string]: Schema },
) {
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
  } as const
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

function makeStubFileContent(
  handler: {
    readonly contents: readonly string[]
    readonly routeNames: readonly string[]
  },
  importFrom: string,
) {
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
  schemas: { readonly [k: string]: Schema },
) {
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
  return fileNames.map((h) => `export * from './${path.basename(h, '.ts')}'`).join('\n')
}

/**
 * Removes handler files (and their test files) that are no longer in the OpenAPI spec.
 *
 * Compares existing files in the handlers directory with the set of generated filenames.
 * Any `.ts` handler file not in the generated set (excluding `index.ts` and `.test.ts` files)
 * is deleted, along with its corresponding `.test.ts` file.
 */
async function removeStaleFiles(handlerPath: string, generatedFileNames: ReadonlySet<string>) {
  const readdirResult = await readdir(handlerPath)
  if (!readdirResult.ok) {
    if (readdirResult.notFound) {
      return { ok: true, value: undefined } as const
    }
    return { ok: false, error: readdirResult.error } as const
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
      unlink(`${handlerPath}/${path.basename(file, '.ts')}.test.ts`),
    ]),
  )
  const e = results.find((result) => !result.ok)
  if (e) return e
  return { ok: true, value: undefined } as const
}

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
  pathAlias?: string,
  routeImport?: string,
  routeHandler = false,
  basePath = '/',
  testFramework: 'vitest' | 'vite-plus' | 'bun' = 'vitest',
  handlerDir?: string,
) {
  const paths = openapi.paths
  const handlers = makeMergedHandlers(
    Object.entries(paths).flatMap(([path, pathItem]) =>
      Object.entries(pathItem)
        .filter((entry) => isHttpMethod(entry[0]) && isOperation(entry[1]))
        .map(([method]) =>
          routeHandler
            ? makeStubHandlerInfo(path, method)
            : makeInlineStubHandlerInfo(path, method),
        ),
    ),
  )
  const { handlerPath, importFrom, testImportFrom } = makePaths(
    output,
    pathAlias,
    routeImport,
    handlerDir,
  )
  const mkdirResult = await mkdir(handlerPath)
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error } as const
  const results = await Promise.all([
    ...handlers.map(async (handler) => {
      const fileContent = routeHandler
        ? makeStubFileContent(handler, importFrom)
        : makeInlineStubFileContent(handler, importFrom)
      const fmtResult = await fmt(fileContent)
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
          basePath,
          testFramework,
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
  const e = results.find((result) => !result.ok)
  if (e) return e
  const generatedFileNames = new Set(handlers.map((h) => h.fileName))
  const cleanupResult = await removeStaleFiles(handlerPath, generatedFileNames)
  if (!cleanupResult.ok) return { ok: false, error: cleanupResult.error } as const
  return { ok: true, value: undefined } as const
}

/**
 * Generates `defineOpenAPIRoute` files grouped by resource for a Hono app.
 *
 * Each file co-locates `createRoute(...)` with a stub handler inside
 * `defineOpenAPIRoute({ route, handler })`, so routes register via
 * `app.openapiRoutes([...])`. Component schemas are imported from `componentsOutput`.
 *
 * @param openapi - The OpenAPI specification object.
 * @param output - The app entry file path (e.g. `./src/index.ts`).
 * @param componentsOutput - The components module path schemas are imported from.
 * @returns A `Result` indicating success or error with message.
 */
export async function defineOpenAPIRouteHandler(
  openapi: OpenAPI,
  output: string,
  componentsOutput: string,
  test = false,
  pathAlias?: string,
  basePath = '/',
  testFramework: 'vitest' | 'vite-plus' | 'bun' = 'vitest',
  readonly?: boolean,
  handlerDir?: string,
) {
  const handlers = defineEntries(openapi, readonly).reduce<
    ReadonlyMap<
      string,
      {
        readonly fileName: `${string}.ts`
        readonly testFileName: `${string}.ts`
        readonly contents: readonly string[]
        readonly routeNames: readonly string[]
      }
    >
  >((acc, entry) => {
    const fileName = makeHandlerFileName(entry.path)
    const prev = acc.get(fileName)
    return new Map(acc).set(fileName, {
      fileName,
      testFileName: makeTestFileName(fileName),
      contents: [...(prev?.contents ?? []), entry.code],
      routeNames: [...(prev?.routeNames ?? []), `${entry.name}Route`],
    })
  }, new Map())
  const baseDir = path.dirname(output)
  const handlerPath = handlerDir ?? (baseDir === '.' ? 'handlers' : `${baseDir}/handlers`)
  const aliasPrefix = pathAlias?.endsWith('/') ? pathAlias.slice(0, -1) : pathAlias
  const testImportFrom = aliasPrefix ?? makeModuleSpec(`${handlerPath}/handler.ts`, { output })
  // The alias maps to the app entry's directory; resolve the components module relative to it
  // so nested component dirs keep their path (e.g. `src/api/components` → `@/api/components`).
  const componentsModulePath = componentsOutput.endsWith('/index.ts')
    ? path.dirname(componentsOutput)
    : componentsOutput.replace(/\.ts$/, '')
  const componentsImport = aliasPrefix
    ? `${aliasPrefix}/${path.relative(baseDir, componentsModulePath).replaceAll('\\', '/')}`
    : undefined
  const componentsMap = Object.fromEntries(
    (
      [
        'schemas',
        'responses',
        'parameters',
        'examples',
        'requestBodies',
        'headers',
        'securitySchemes',
        'links',
        'callbacks',
        'pathItems',
        'mediaTypes',
      ] as const
    ).map((kind) => [
      kind,
      { output: componentsOutput, ...(componentsImport ? { import: componentsImport } : {}) },
    ]),
  )
  const mkdirResult = await mkdir(handlerPath)
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error } as const
  const handlerList = [...handlers.values()]
  const results = await Promise.all([
    ...handlerList.map(async (handler) => {
      const filePath = `${handlerPath}/${handler.fileName}`
      const chain = handler.contents.join('\n\n')
      const fileContent = makeImports(chain, filePath, componentsMap, false, ['defineOpenAPIRoute'])
      const fmtResult = await fmt(fileContent)
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error } as const
      const existingResult = await readFile(filePath)
      if (!existingResult.ok) return { ok: false, error: existingResult.error } as const
      const merged =
        existingResult.value !== null
          ? mergeDefineFile(existingResult.value, fmtResult.value)
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
          basePath,
          testFramework,
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
          const finalTestFmt = await fmt(mergedTestCode)
          const finalTestCode = finalTestFmt.ok ? finalTestFmt.value : mergedTestCode
          const testWriteResult = await writeFile(testFilePath, finalTestCode)
          if (!testWriteResult.ok) return { ok: false, error: testWriteResult.error } as const
        }
      }
      return { ok: true, value: undefined } as const
    }),
    (async () => {
      const fmtResult = await fmt(makeBarrelContent(handlerList.map((h) => h.fileName)))
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
  const e = results.find((result) => !result.ok)
  if (e) return e
  const generatedFileNames = new Set(handlerList.map((h) => h.fileName))
  const cleanupResult = await removeStaleFiles(handlerPath, generatedFileNames)
  if (!cleanupResult.ok) return { ok: false, error: cleanupResult.error } as const
  return { ok: true, value: undefined } as const
}

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
  pathAlias?: string,
  routeImport?: string,
  routeHandler = false,
  basePath = '/',
  testFramework: 'vitest' | 'vite-plus' | 'bun' = 'vitest',
) {
  const paths = openapi.paths
  const schemas = openapi.components?.schemas ?? {}
  const handlers = makeMergedHandlers(
    Object.entries(paths).flatMap(([path, pathItem]) =>
      Object.entries(pathItem)
        .filter(
          (entry): entry is [string, Operation] => isHttpMethod(entry[0]) && isOperation(entry[1]),
        )
        .map(([method, operation]) =>
          routeHandler
            ? makeMockHandlerInfo(path, method, operation, schemas)
            : makeInlineMockHandlerInfo(path, method, operation, schemas),
        ),
    ),
  )
  const { handlerPath, importFrom, testImportFrom } = makePaths(output, pathAlias, routeImport)
  const mkdirResult = await mkdir(handlerPath)
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error } as const
  const results = await Promise.all([
    ...handlers.map(async (handler) => {
      const fileContent = routeHandler
        ? makeMockFileContent(handler, importFrom, schemas)
        : makeInlineMockFileContent(handler, importFrom, schemas)
      const fmtResult = await fmt(fileContent)
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
          basePath,
          testFramework,
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
  const e = results.find((result) => !result.ok)
  if (e) return e
  const generatedFileNames = new Set(handlers.map((h) => h.fileName))
  const cleanupResult = await removeStaleFiles(handlerPath, generatedFileNames)
  if (!cleanupResult.ok) return { ok: false, error: cleanupResult.error } as const
  return { ok: true, value: undefined } as const
}
