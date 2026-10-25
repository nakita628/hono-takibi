import { basename, dirname, relative } from 'node:path'

import { Effect } from 'effect'

import { COMPONENT_NAMES } from '../constants/index.js'
import { mkdir, readdir, readFile, writeFile } from '../file/index.js'
import { fmt } from '../format/index.js'
// Test code generation is deprecated: hono-takibi no longer generates test files.
// import { makeHandlerTestCode, makeHandlerTestContext } from '../generator/test/index.js'
import { defineEntries } from '../generator/zod-openapi-hono/openapi/define/index.js'
import { isHttpMethod, isOperation } from '../guard/index.js'
import {
  collectExportedNames,
  collectInlineRouteNames,
  mergeBarrelFile,
  mergeDefineFile,
  mergeHandlerFile,
  // mergeTestFile,
} from '../merge/index.js'
import type { OpenAPI, Operation } from '../openapi/index.js'
import { routeName, uncapitalizeWord } from '../utils/index.js'
// import { makeImports, makeModuleSpec } from './code.js'
import { makeImports, makeModuleSpec } from './code.js'
import { groupNameOf } from './group.js'
import { appEntryDirectory } from './path.js'

function sanitizeHandlerSegment(segment: string) {
  return segment
    .replaceAll(/\{([^}]+)\}/gu, '$1')
    .replaceAll(/[^0-9A-Za-z._-]/gu, '_')
    .replaceAll(/^[._-]+|[._-]+$/gu, '')
    .replaceAll(/__+/gu, '_')
    .replaceAll(/[-._](\w)/gu, (_, c: string) => c.toUpperCase())
}

/**
 * Derives the handler file name for an operation: the first tag (lower camel case) when
 * present, otherwise the first path segment (`/` → `__root`).
 */
export function makeHandlerFileName(path: string, tags?: readonly string[]): `${string}.ts` {
  const tagName = uncapitalizeWord(sanitizeHandlerSegment(tags?.[0] ?? ''))
  const pathName = sanitizeHandlerSegment(path.replace(/^\/+/u, '').split('/')[0] ?? '')
  const name = tagName !== '' ? tagName : pathName !== '' ? pathName : '__root'
  return `${name}.ts` as const
}

/**
 * The group an operation belongs to: the name of the handler file it is written to, the
 * first tag or else the first segment of the path, `/v2-public/ping` as `v2Public`, and the
 * root `/` as `__root`. A segment that is a word of the language is prefixed the same way,
 * `/delete` as `__delete`.
 */
export function handlerGroupOf(path: string, tags?: readonly string[]) {
  return groupNameOf(makeHandlerFileName(path, tags).replace(/\.ts$/u, ''))
}

function isTsFileName(file: string): file is `${string}.ts` {
  return file.endsWith('.ts')
}

/** The names `collect` finds in one handler file, paired with the file they came from. */
function collectFrom(
  handlerPath: string,
  fileName: `${string}.ts`,
  collect: (code: string) => readonly string[],
) {
  return Effect.gen(function* () {
    const code = yield* readFile(`${handlerPath}/${fileName}`)
    return collect(code ?? '').map((name) => [name, fileName] as const)
  })
}

/**
 * Scans the handler directory (non-recursively) for hand-written files. Returns the file
 * names and, for every codegen key `collect` finds in a file (exported handler / route names,
 * or routes registered on an inline sub-router), the file that already holds it — an existing
 * implementation is regenerated in place rather than re-stubbed under the expected file name.
 */
function scanExistingHandlerFiles(
  handlerPath: string,
  collect: (code: string) => readonly string[],
) {
  return Effect.gen(function* () {
    const fileNames = (yield* readdir(handlerPath))
      .filter(isTsFileName)
      .filter(
        (file) => !file.endsWith('.test.ts') && !file.endsWith('.d.ts') && file !== 'index.ts',
      )
      .toSorted()
    const reads = yield* Effect.all(
      fileNames.map((fileName) => collectFrom(handlerPath, fileName, collect)),
      { concurrency: 'unbounded' },
    )
    const locations = new Map<string, `${string}.ts`>()
    for (const found of reads) {
      for (const [name, fileName] of found) {
        if (!locations.has(name)) locations.set(name, fileName)
      }
    }
    return { fileNames, locations }
  })
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
      // testFileName: makeTestFileName(fileName),
      contents: [],
      routeNames: [],
    }))
}

// Test code generation is deprecated: hono-takibi no longer generates test files.
// function makeTestFileName(fileName: `${string}.ts`): `${string}.ts` {
//   return `${basename(fileName, '.ts')}.test.ts`
// }

// The handlers go beside the app entry, which `appEntryDirectory` derives from the routes
// output, and import the routes by the module's name: `routes` for `src/routes.ts`,
// `src/routes/index.ts` and the split directory `src/routes` alike.
function makePaths(output: string, pathAlias: string | undefined, routeImport?: string) {
  const baseDir = appEntryDirectory(output, false)
  const handlerPath = baseDir === '.' ? 'handlers' : `${baseDir}/handlers`
  const moduleName = basename(output.endsWith('/index.ts') ? dirname(output) : output, '.ts')
  const routeModuleName = moduleName === '.' || moduleName === '' ? 'index' : moduleName
  const aliasPrefix = pathAlias?.endsWith('/') ? pathAlias.slice(0, -1) : pathAlias
  const importFrom =
    routeImport ?? (aliasPrefix ? `${aliasPrefix}/${routeModuleName}` : `../${routeModuleName}`)
  // const testImportFrom = aliasPrefix ?? '..'
  // return { handlerPath, importFrom, testImportFrom } as const
  return { handlerPath, importFrom } as const
}

// What the handler of one operation is: the file it goes to, resolved against the existing
// files by the member that file exports for the route (`getUsersRoute` inline,
// `getUsersRouteHandler` in a file of its own), and the code of that member.
function makeHandlerInfo(
  paths: { readonly [k: string]: unknown },
  path: string,
  method: string,
  operation: Operation,
  existing: {
    readonly fileNames: readonly `${string}.ts`[]
    readonly locations: ReadonlyMap<string, `${string}.ts`>
  },
  member: 'Route' | 'RouteHandler',
  body: (routeId: string) => string,
) {
  const routeId = routeName(method, path, paths)
  const fileName = resolveHandlerFileName(
    makeHandlerFileName(path, operation.tags),
    `${routeId}${member}`,
    existing,
  )
  return {
    fileName,
    contents: [body(routeId)],
    routeNames: [`${routeId}Route`],
  } as const
}

function makeInlineStubHandlerInfo(
  paths: { readonly [k: string]: unknown },
  path: string,
  method: string,
  operation: Operation,
  existing: {
    readonly fileNames: readonly `${string}.ts`[]
    readonly locations: ReadonlyMap<string, `${string}.ts`>
  },
) {
  return makeHandlerInfo(
    paths,
    path,
    method,
    operation,
    existing,
    'Route',
    (routeId) => `.openapi(${routeId}Route,(c)=>{})`,
  )
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

function makeStubHandlerInfo(
  paths: { readonly [k: string]: unknown },
  path: string,
  method: string,
  operation: Operation,
  existing: {
    readonly fileNames: readonly `${string}.ts`[]
    readonly locations: ReadonlyMap<string, `${string}.ts`>
  },
) {
  return makeHandlerInfo(
    paths,
    path,
    method,
    operation,
    existing,
    'RouteHandler',
    (routeId) =>
      `export const ${routeId}RouteHandler:RouteHandler<typeof ${routeId}Route>=async(c)=>{}`,
  )
}

function makeMergedHandlers<
  T extends {
    readonly fileName: `${string}.ts`
    // readonly testFileName: `${string}.ts`
    readonly contents: readonly string[]
    readonly routeNames: readonly string[]
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

function makeBarrelContent(fileNames: readonly string[]) {
  return fileNames.map((h) => `export * from './${basename(h, '.ts')}'`).join('\n')
}

/** oxfmt, keeping the source as-is when it will not parse what we just built. */
function fmtOrKeep(source: string) {
  return fmt(source).pipe(Effect.orElseSucceed(() => source))
}

/**
 * Writes one generated file: format it, merge it into whatever is already on disk,
 * format the merge, write. `merge` is what decides how hand-written code survives, and
 * a merge that oxfmt then rejects is still written — losing the edit would be worse.
 */
function writeMerged(
  filePath: string,
  source: string,
  merge: (existing: string, incoming: string) => string,
) {
  return Effect.gen(function* () {
    const generated = yield* fmt(source)
    const existing = yield* readFile(filePath)
    const merged = existing !== null ? merge(existing, generated) : generated
    yield* writeFile(filePath, yield* fmtOrKeep(merged))
  })
}

// Test code generation is deprecated: hono-takibi no longer generates test files.
// /** As {@link writeMerged}, but generated test code that will not format is kept too. */
// function writeMergedTest(filePath: string, source: string) {
//   return Effect.gen(function* () {
//     const generated = yield* fmtOrKeep(source)
//     const existing = yield* readFile(filePath)
//     const merged = existing !== null ? mergeTestFile(existing, generated) : generated
//     yield* writeFile(filePath, yield* fmtOrKeep(merged))
//   })
// }

/** Writes the `index.ts` that re-exports every handler file, keeping hand-added lines. */
function writeBarrel(handlerPath: string, fileNames: readonly string[]) {
  return Effect.gen(function* () {
    const generated = yield* fmt(makeBarrelContent(fileNames))
    const barrelPath = `${handlerPath}/index.ts`
    const existing = yield* readFile(barrelPath)
    yield* writeFile(
      barrelPath,
      existing !== null ? mergeBarrelFile(existing, generated) : generated,
    )
  })
}

/**
 * Writes one handler file.
 *
 * The three writers below differ only in how the file's contents are built and which merge
 * keeps hand-written code; from there on they are the same, so they share this.
 */
function writeHandler(options: {
  // Test code generation is deprecated: hono-takibi no longer generates test files.
  // readonly openapi: OpenAPI
  readonly handlerPath: string
  readonly handler: {
    readonly fileName: `${string}.ts`
    // readonly testFileName: `${string}.ts`
    readonly routeNames: readonly string[]
  }
  readonly fileContent: string
  readonly merge: (existing: string, incoming: string) => string
  // readonly testImportFrom: string
  // readonly basePath: string
  // readonly testFramework: 'vitest' | 'vite-plus' | 'bun'
  // readonly testContext: ReturnType<typeof makeHandlerTestContext> | undefined
}) {
  return Effect.gen(function* () {
    const filePath = `${options.handlerPath}/${options.handler.fileName}`
    yield* writeMerged(filePath, options.fileContent, options.merge)
    // if (options.testContext === undefined || options.handler.routeNames.length === 0) return
    // const testContent = makeHandlerTestCode(
    //   options.openapi,
    //   filePath,
    //   [...options.handler.routeNames],
    //   options.testImportFrom,
    //   options.basePath,
    //   options.testFramework,
    //   options.testContext,
    // )
    // if (testContent) {
    //   yield* writeMergedTest(`${options.handlerPath}/${options.handler.testFileName}`, testContent)
    // }
  })
}

export function zodOpenAPIHonoHandler(
  openapi: OpenAPI,
  output: string,
  // Test code generation is deprecated: hono-takibi no longer generates test files.
  // test = false,
  pathAlias?: string,
  routeImport?: string,
  routeHandler = false,
  // basePath = '/',
  // testFramework: 'vitest' | 'vite-plus' | 'bun' = 'vitest',
) {
  return Effect.gen(function* () {
    const paths = openapi.paths
    const { handlerPath, importFrom } = makePaths(output, pathAlias, routeImport)
    const existing = yield* scanExistingHandlerFiles(
      handlerPath,
      routeHandler ? (code) => collectExportedNames(code, 'RouteHandler') : collectInlineRouteNames,
    )
    const specHandlers = makeMergedHandlers(
      Object.entries(paths).flatMap(([path, pathItem]) =>
        Object.entries(pathItem)
          .filter(
            (entry): entry is [string, Operation] =>
              isHttpMethod(entry[0]) && isOperation(entry[1]),
          )
          .map(([method, operation]) =>
            routeHandler
              ? makeStubHandlerInfo(paths, path, method, operation, existing)
              : makeInlineStubHandlerInfo(paths, path, method, operation, existing),
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
    // const handlerTestContext = test ? makeHandlerTestContext(openapi) : undefined
    yield* mkdir(handlerPath)
    yield* Effect.all(
      [
        ...handlers.map((handler) =>
          writeHandler({
            // openapi,
            handlerPath,
            handler,
            fileContent: routeHandler
              ? makeStubFileContent(handler, importFrom)
              : makeInlineStubFileContent(handler, importFrom),
            merge: mergeHandlerFile,
            // testImportFrom,
            // basePath,
            // testFramework,
            // testContext: handlerTestContext,
          }),
        ),
        writeBarrel(
          handlerPath,
          handlers.map((h) => h.fileName),
        ),
      ],
      { concurrency: 'unbounded' },
    )
  })
}

/**
 * Resolves, in spec order, the inline handler files (`handlers/<name>.ts`, one sub-router
 * each) the current spec's routes live in — existing registrations win over the tag/path
 * derived name — so the app entry can import and mount exactly those sub-routers.
 */
export function resolveInlineHandlerFileNames(
  openapi: OpenAPI,
  output: string,
  pathAlias?: string,
  routeImport?: string,
) {
  return Effect.gen(function* () {
    const { handlerPath } = makePaths(output, pathAlias, routeImport)
    const existing = yield* scanExistingHandlerFiles(handlerPath, collectInlineRouteNames)
    const fileNames = Object.entries(openapi.paths).flatMap(([path, pathItem]) =>
      Object.entries(pathItem)
        .filter(
          (entry): entry is [string, Operation] => isHttpMethod(entry[0]) && isOperation(entry[1]),
        )
        .map(([method, operation]) =>
          resolveHandlerFileName(
            makeHandlerFileName(path, operation.tags),
            `${routeName(method, path, openapi.paths)}Route`,
            existing,
          ),
        ),
    )
    return [...new Set(fileNames)]
  })
}

/**
 * Generates `defineOpenAPIRoute` files grouped by resource for a Hono app.
 *
 * Each file co-locates `createRoute(...)` with a stub handler inside
 * `defineOpenAPIRoute({ route, handler })`, so routes register via
 * `app.openapiRoutes([...])`. Component schemas are imported from `componentsOutput`.
 */
export function defineOpenAPIRouteHandler(
  openapi: OpenAPI,
  output: string,
  componentsOutput: string,
  // Test code generation is deprecated: hono-takibi no longer generates test files.
  // test = false,
  pathAlias?: string,
  // basePath = '/',
  // testFramework: 'vitest' | 'vite-plus' | 'bun' = 'vitest',
  readonly?: boolean,
  // The name a handler file imports the components by when they are in another package.
  componentsPackage?: (fromFile: string) => string | undefined,
) {
  return Effect.gen(function* () {
    const baseDir = dirname(output)
    const handlerPath = baseDir === '.' ? 'routes' : `${baseDir}/routes`
    const existing = yield* scanExistingHandlerFiles(handlerPath, (code) =>
      collectExportedNames(code, 'Route'),
    )
    const specHandlers = defineEntries(openapi, readonly).reduce<
      ReadonlyMap<
        string,
        {
          readonly fileName: `${string}.ts`
          // readonly testFileName: `${string}.ts`
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
        // testFileName: makeTestFileName(fileName),
        contents: [...(prev?.contents ?? []), entry.code],
        routeNames: [...(prev?.routeNames ?? []), `${entry.name}Route`],
      })
    }, new Map())
    const aliasPrefix = pathAlias?.endsWith('/') ? pathAlias.slice(0, -1) : pathAlias
    // const testImportFrom = aliasPrefix ?? makeModuleSpec(`${handlerPath}/handler.ts`, { output })
    // The alias maps to the app entry's directory; resolve the components module relative to it
    // so nested component dirs keep their path (e.g. `src/api/components` → `@/api/components`).
    const componentsModulePath = componentsOutput.endsWith('/index.ts')
      ? dirname(componentsOutput)
      : componentsOutput.replace(/\.ts$/u, '')
    const componentsImport = aliasPrefix
      ? `${aliasPrefix}/${relative(baseDir, componentsModulePath).replaceAll('\\', '/')}`
      : undefined
    const componentsMap = Object.fromEntries(
      COMPONENT_NAMES.map((kind) => [
        kind,
        {
          output: componentsOutput,
          specifier: (fromFile: string) =>
            componentsPackage?.(fromFile) ??
            componentsImport ??
            makeModuleSpec(fromFile, { output: componentsOutput }),
        },
      ]),
    )
    // const handlerTestContext = test ? makeHandlerTestContext(openapi) : undefined
    yield* mkdir(handlerPath)
    const handlerList = [
      ...specHandlers.values(),
      ...makeOrphanHandlers(existing, [...specHandlers.keys()]),
    ]
    yield* Effect.all(
      [
        ...handlerList.map((handler) =>
          writeHandler({
            // openapi,
            handlerPath,
            handler,
            fileContent: makeImports(
              handler.contents.join('\n\n'),
              `${handlerPath}/${handler.fileName}`,
              componentsMap,
              false,
              ['defineOpenAPIRoute'],
            ),
            merge: mergeDefineFile,
            // testImportFrom,
            // basePath,
            // testFramework,
            // testContext: handlerTestContext,
          }),
        ),
        writeBarrel(
          handlerPath,
          handlerList.map((h) => h.fileName),
        ),
      ],
      { concurrency: 'unbounded' },
    )
  })
}
