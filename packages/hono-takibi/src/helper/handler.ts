import { basename, dirname, relative } from 'node:path'

import { fmt } from '../format/index.js'
import { mkdir, readdir, readFile, writeFile } from '../fsp/index.js'
import { makeHandlerTestCode, makeHandlerTestContext } from '../generator/test/index.js'
import { defineEntries } from '../generator/zod-openapi-hono/openapi/define/index.js'
import {
  isHttpMethod,
  isOperation,
  isOperationWithResponses,
  isSchemaArray,
  isSchemaObject,
} from '../guard/index.js'
import {
  collectExportedNames,
  collectInlineRouteNames,
  mergeBarrelFile,
  mergeDefineFile,
  mergeHandlerFile,
  mergeTestFile,
} from '../merge/index.js'
import type { OpenAPI, Operation, Schema } from '../openapi/index.js'
import { methodPath, uncapitalizeWord } from '../utils/index.js'
import { makeImports, makeModuleSpec } from './code.js'
import { schemaToFaker } from './faker.js'

function makeRefs(schema: Schema, refs: Set<string> = new Set()) {
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop()
    if (refName) refs.add(refName)
  }
  if (schema.items) {
    const items = isSchemaArray(schema.items) ? schema.items : [schema.items]
    for (const item of items) {
      if (isSchemaObject(item)) makeRefs(item, refs)
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

function sanitizeHandlerSegment(segment: string) {
  return segment
    .replaceAll(/\{([^}]+)\}/g, '$1')
    .replaceAll(/[^0-9A-Za-z._-]/g, '_')
    .replaceAll(/^[._-]+|[._-]+$/g, '')
    .replaceAll(/__+/g, '_')
    .replaceAll(/[-._](\w)/g, (_, c: string) => c.toUpperCase())
}

/**
 * Derives the handler file name for an operation: the first tag (lower camel case) when
 * present, otherwise the first path segment (`/` → `__root`).
 */
export function makeHandlerFileName(path: string, tags?: readonly string[]): `${string}.ts` {
  const tagName = uncapitalizeWord(sanitizeHandlerSegment(tags?.[0] ?? ''))
  const pathName = sanitizeHandlerSegment(path.replace(/^\/+/, '').split('/')[0] ?? '')
  const name = tagName !== '' ? tagName : pathName !== '' ? pathName : '__root'
  return `${name}.ts`
}

function isTsFileName(file: string): file is `${string}.ts` {
  return file.endsWith('.ts')
}

/**
 * Scans the handler directory (non-recursively) for hand-written files. Returns the file
 * names and, for every codegen key `collect` finds in a file (exported handler / route names,
 * or routes registered on an inline sub-router), the file that already holds it — an existing
 * implementation is regenerated in place rather than re-stubbed under the expected file name.
 */
async function scanExistingHandlerFiles(
  handlerPath: string,
  collect: (code: string) => readonly string[],
) {
  const readdirResult = await readdir(handlerPath)
  if (!readdirResult.ok && !readdirResult.notFound) {
    return { ok: false, error: readdirResult.error } as const
  }
  const fileNames = (readdirResult.ok ? readdirResult.value : [])
    .filter(isTsFileName)
    .filter((file) => !file.endsWith('.test.ts') && !file.endsWith('.d.ts') && file !== 'index.ts')
    .toSorted()
  const reads = await Promise.all(
    fileNames.map(async (fileName) => {
      const readResult = await readFile(`${handlerPath}/${fileName}`)
      if (!readResult.ok) return { ok: false, error: readResult.error } as const
      return {
        ok: true,
        value: collect(readResult.value ?? '').map((name) => [name, fileName] as const),
      } as const
    }),
  )
  const failed = reads.find((result) => !result.ok)
  if (failed && !failed.ok) return { ok: false, error: failed.error } as const
  const locations = new Map<string, `${string}.ts`>()
  for (const result of reads) {
    if (!result.ok) continue
    for (const [name, fileName] of result.value) {
      if (!locations.has(name)) locations.set(name, fileName)
    }
  }
  return { ok: true, value: { fileNames, locations } } as const
}

/**
 * Picks the file a generated export goes to: the file that already holds it, else the
 * expected name when that file exists, else an existing file whose name matches
 * case-insensitively (case-insensitive filesystems), else the expected name.
 */
function resolveHandlerFileName(
  expected: `${string}.ts`,
  key: string,
  existing: {
    readonly fileNames: readonly `${string}.ts`[]
    readonly locations: ReadonlyMap<string, `${string}.ts`>
  },
) {
  const located = existing.locations.get(key)
  if (located) return located
  if (existing.fileNames.includes(expected)) return expected
  const lower = expected.toLowerCase()
  return existing.fileNames.find((file) => file.toLowerCase() === lower) ?? expected
}

/**
 * Files the scan found codegen keys in but that hold no route of the current spec. They are
 * merged against empty generated content so stale declarations and their route imports go
 * away while the file itself — and anything hand-written in it — stays.
 */
function makeOrphanHandlers(
  existing: { readonly locations: ReadonlyMap<string, `${string}.ts`> },
  assignedFileNames: readonly string[],
) {
  return [...new Set(existing.locations.values())]
    .filter((fileName) => !assignedFileNames.includes(fileName))
    .map((fileName) => ({
      fileName,
      testFileName: makeTestFileName(fileName),
      contents: [],
      routeNames: [],
      needsFaker: false,
      usedRefs: new Set<string>(),
    }))
}

function makeTestFileName(fileName: `${string}.ts`): `${string}.ts` {
  return `${basename(fileName, '.ts')}.test.ts`
}

function makePaths(output: string, pathAlias: string | undefined, routeImport?: string) {
  const isDot = output === '.' || output === './'
  const isIndexFile = !isDot && output.endsWith('/index.ts')
  const baseDir = isDot
    ? '.'
    : isIndexFile
      ? (output.match(/^(.*)\/[^/]+\/index\.ts$/)?.[1] ?? '.')
      : (output.match(/^(.*)\/[^/]+\.ts$/)?.[1] ?? '.')
  const handlerPath = baseDir === '.' ? 'handlers' : `${baseDir}/handlers`
  const routeModuleName = isIndexFile
    ? (output.match(/([^/]+)\/index\.ts$/)?.[1] ?? 'index')
    : output.endsWith('.ts')
      ? basename(output, '.ts')
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
  operation: Operation,
  existing: {
    readonly fileNames: readonly `${string}.ts`[]
    readonly locations: ReadonlyMap<string, `${string}.ts`>
  },
): {
  readonly fileName: `${string}.ts`
  readonly testFileName: `${string}.ts`
  readonly contents: readonly string[]
  readonly routeNames: readonly string[]
  readonly needsFaker: false
  readonly usedRefs: ReadonlySet<string>
} {
  const routeId = methodPath(method, path)
  const fileName = resolveHandlerFileName(
    makeHandlerFileName(path, operation.tags),
    `${routeId}Route`,
    existing,
  )
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
  existing: {
    readonly fileNames: readonly `${string}.ts`[]
    readonly locations: ReadonlyMap<string, `${string}.ts`>
  },
): {
  readonly fileName: `${string}.ts`
  readonly testFileName: `${string}.ts`
  readonly contents: readonly string[]
  readonly routeNames: readonly string[]
  readonly needsFaker: boolean
  readonly usedRefs: ReadonlySet<string>
} {
  const routeId = methodPath(method, path)
  const fileName = resolveHandlerFileName(
    makeHandlerFileName(path, operation.tags),
    `${routeId}Route`,
    existing,
  )
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
  const exportName = `${basename(handler.fileName, '.ts')}Handler`
  const routeImports = [...new Set(handler.routeNames)].join(', ')
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
  const exportName = `${basename(handler.fileName, '.ts')}Handler`
  const routeImports = [...new Set(handler.routeNames)].join(', ')
  const importRoutes = routeImports ? `import { ${routeImports} } from '${importFrom}';` : ''
  const fakerImport = handler.needsFaker ? "import { faker } from '@faker-js/faker'\n" : ''
  const importStatements = `import { OpenAPIHono } from '@hono/zod-openapi'\n${fakerImport}${importRoutes}`
  const mockFunctions = [...handler.usedRefs]
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
  operation: Operation,
  existing: {
    readonly fileNames: readonly `${string}.ts`[]
    readonly locations: ReadonlyMap<string, `${string}.ts`>
  },
): {
  readonly fileName: `${string}.ts`
  readonly testFileName: `${string}.ts`
  readonly contents: readonly string[]
  readonly routeNames: readonly string[]
  readonly needsFaker: false
  readonly usedRefs: ReadonlySet<string>
} {
  const routeId = methodPath(method, path)
  const fileName = resolveHandlerFileName(
    makeHandlerFileName(path, operation.tags),
    `${routeId}RouteHandler`,
    existing,
  )
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
  existing: {
    readonly fileNames: readonly `${string}.ts`[]
    readonly locations: ReadonlyMap<string, `${string}.ts`>
  },
) {
  const routeId = methodPath(method, path)
  const fileName = resolveHandlerFileName(
    makeHandlerFileName(path, operation.tags),
    `${routeId}RouteHandler`,
    existing,
  )
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
        routeNames: [...new Set([...existing.routeNames, ...handler.routeNames])],
        needsFaker: existing.needsFaker || handler.needsFaker,
        usedRefs: new Set([...existing.usedRefs, ...handler.usedRefs]),
      })
    } else {
      handlerMap.set(handler.fileName, handler)
    }
  }

  return [...handlerMap.values()]
}

function makeStubFileContent(
  handler: {
    readonly contents: readonly string[]
    readonly routeNames: readonly string[]
  },
  importFrom: string,
) {
  const routeTypes = [...new Set(handler.routeNames)].join(', ')
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
  const routeTypes = [...new Set(handler.routeNames)].join(', ')
  const importRouteTypes = routeTypes ? `import type { ${routeTypes} } from '${importFrom}';` : ''
  const fakerImport = handler.needsFaker ? "import { faker } from '@faker-js/faker'\n" : ''
  const importStatements = `import type { RouteHandler } from '@hono/zod-openapi'\n${fakerImport}${importRouteTypes}`
  const mockFunctions = [...handler.usedRefs]
    .filter((refName) => schemas[refName])
    .map((refName) => makeMockFunction(refName, schemas[refName], schemas))
    .join('\n\n')
  return mockFunctions
    ? `${importStatements}\n\n${mockFunctions}\n\n${handler.contents.join('\n\n')}`
    : `${importStatements}\n\n${handler.contents.join('\n\n')}`
}

function makeBarrelContent(fileNames: readonly string[]): string {
  return fileNames.map((h) => `export * from './${basename(h, '.ts')}'`).join('\n')
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
) {
  const paths = openapi.paths
  const { handlerPath, importFrom, testImportFrom } = makePaths(output, pathAlias, routeImport)
  const existingResult = await scanExistingHandlerFiles(
    handlerPath,
    routeHandler ? (code) => collectExportedNames(code, 'RouteHandler') : collectInlineRouteNames,
  )
  if (!existingResult.ok) return { ok: false, error: existingResult.error } as const
  const existing = existingResult.value
  const specHandlers = makeMergedHandlers(
    Object.entries(paths).flatMap(([path, pathItem]) =>
      Object.entries(pathItem)
        .filter(
          (entry): entry is [string, Operation] => isHttpMethod(entry[0]) && isOperation(entry[1]),
        )
        .map(([method, operation]) =>
          routeHandler
            ? makeStubHandlerInfo(path, method, operation, existing)
            : makeInlineStubHandlerInfo(path, method, operation, existing),
        ),
    ),
  )
  const handlers = [
    ...specHandlers,
    ...makeOrphanHandlers(
      existing,
      specHandlers.map((h) => h.fileName),
    ),
  ]
  const handlerTestContext = test ? makeHandlerTestContext(openapi) : undefined
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
      // oxlint-disable-next-line no-shadow -- the inner name is the natural one here
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
      if (handlerTestContext && handler.routeNames.length > 0) {
        const testContent = makeHandlerTestCode(
          openapi,
          `${handlerPath}/${handler.fileName}`,
          [...handler.routeNames],
          testImportFrom,
          basePath,
          testFramework,
          handlerTestContext,
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
          // oxlint-disable-next-line no-shadow -- the inner name is the natural one here
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
      // oxlint-disable-next-line no-shadow -- the inner name is the natural one here
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
  return { ok: true, value: undefined } as const
}

/**
 * Resolves, in spec order, the inline handler files (`handlers/<name>.ts`, one sub-router
 * each) the current spec's routes live in — existing registrations win over the tag/path
 * derived name — so the app entry can import and mount exactly those sub-routers.
 */
export async function resolveInlineHandlerFileNames(
  openapi: OpenAPI,
  output: string,
  pathAlias?: string,
  routeImport?: string,
) {
  const { handlerPath } = makePaths(output, pathAlias, routeImport)
  const existingResult = await scanExistingHandlerFiles(handlerPath, collectInlineRouteNames)
  if (!existingResult.ok) return { ok: false, error: existingResult.error } as const
  const existing = existingResult.value
  const fileNames = Object.entries(openapi.paths).flatMap(([path, pathItem]) =>
    Object.entries(pathItem)
      .filter(
        (entry): entry is [string, Operation] => isHttpMethod(entry[0]) && isOperation(entry[1]),
      )
      .map(([method, operation]) =>
        resolveHandlerFileName(
          makeHandlerFileName(path, operation.tags),
          `${methodPath(method, path)}Route`,
          existing,
        ),
      ),
  )
  return { ok: true, value: [...new Set(fileNames)] } as const
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
) {
  const baseDir = dirname(output)
  const handlerPath = baseDir === '.' ? 'routes' : `${baseDir}/routes`
  const existingResult = await scanExistingHandlerFiles(handlerPath, (code) =>
    collectExportedNames(code, 'Route'),
  )
  if (!existingResult.ok) return { ok: false, error: existingResult.error } as const
  const existing = existingResult.value
  const specHandlers = defineEntries(openapi, readonly).reduce<
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
    const fileName = resolveHandlerFileName(
      makeHandlerFileName(entry.path, entry.tags),
      `${entry.name}Route`,
      existing,
    )
    const prev = acc.get(fileName)
    return new Map(acc).set(fileName, {
      fileName,
      testFileName: makeTestFileName(fileName),
      contents: [...(prev?.contents ?? []), entry.code],
      routeNames: [...(prev?.routeNames ?? []), `${entry.name}Route`],
    })
  }, new Map())
  const aliasPrefix = pathAlias?.endsWith('/') ? pathAlias.slice(0, -1) : pathAlias
  const testImportFrom = aliasPrefix ?? makeModuleSpec(`${handlerPath}/handler.ts`, { output })
  // The alias maps to the app entry's directory; resolve the components module relative to it
  // so nested component dirs keep their path (e.g. `src/api/components` → `@/api/components`).
  const componentsModulePath = componentsOutput.endsWith('/index.ts')
    ? dirname(componentsOutput)
    : componentsOutput.replace(/\.ts$/, '')
  const componentsImport = aliasPrefix
    ? `${aliasPrefix}/${relative(baseDir, componentsModulePath).replaceAll('\\', '/')}`
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
  const handlerTestContext = test ? makeHandlerTestContext(openapi) : undefined
  const mkdirResult = await mkdir(handlerPath)
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error } as const
  const handlerList = [
    ...specHandlers.values(),
    ...makeOrphanHandlers(existing, [...specHandlers.keys()]),
  ]
  const results = await Promise.all([
    ...handlerList.map(async (handler) => {
      const filePath = `${handlerPath}/${handler.fileName}`
      const chain = handler.contents.join('\n\n')
      const fileContent = makeImports(chain, filePath, componentsMap, false, ['defineOpenAPIRoute'])
      const fmtResult = await fmt(fileContent)
      if (!fmtResult.ok) return { ok: false, error: fmtResult.error } as const
      // oxlint-disable-next-line no-shadow -- the inner name is the natural one here
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
      if (handlerTestContext && handler.routeNames.length > 0) {
        const testContent = makeHandlerTestCode(
          openapi,
          `${handlerPath}/${handler.fileName}`,
          [...handler.routeNames],
          testImportFrom,
          basePath,
          testFramework,
          handlerTestContext,
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
      // oxlint-disable-next-line no-shadow -- the inner name is the natural one here
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
  const { handlerPath, importFrom, testImportFrom } = makePaths(output, pathAlias, routeImport)
  const existingResult = await scanExistingHandlerFiles(
    handlerPath,
    routeHandler ? (code) => collectExportedNames(code, 'RouteHandler') : collectInlineRouteNames,
  )
  if (!existingResult.ok) return { ok: false, error: existingResult.error } as const
  const existing = existingResult.value
  const specHandlers = makeMergedHandlers(
    Object.entries(paths).flatMap(([path, pathItem]) =>
      Object.entries(pathItem)
        .filter(
          (entry): entry is [string, Operation] => isHttpMethod(entry[0]) && isOperation(entry[1]),
        )
        .map(([method, operation]) =>
          routeHandler
            ? makeMockHandlerInfo(path, method, operation, schemas, existing)
            : makeInlineMockHandlerInfo(path, method, operation, schemas, existing),
        ),
    ),
  )
  const handlers = [
    ...specHandlers,
    ...makeOrphanHandlers(
      existing,
      specHandlers.map((h) => h.fileName),
    ),
  ]
  const handlerTestContext = test ? makeHandlerTestContext(openapi) : undefined
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
      // oxlint-disable-next-line no-shadow -- the inner name is the natural one here
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
      if (handlerTestContext && handler.routeNames.length > 0) {
        const testContent = makeHandlerTestCode(
          openapi,
          `${handlerPath}/${handler.fileName}`,
          [...handler.routeNames],
          testImportFrom,
          basePath,
          testFramework,
          handlerTestContext,
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
          // oxlint-disable-next-line no-shadow -- the inner name is the natural one here
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
      // oxlint-disable-next-line no-shadow -- the inner name is the natural one here
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
  return { ok: true, value: undefined } as const
}
