import path from 'node:path'

import SwaggerParser from '@apidevtools/swagger-parser'
import type { PlatformError } from 'effect'
import { Effect, FileSystem, Schema } from 'effect'

// Test code generation is deprecated: hono-takibi no longer generates test files.
// import type { Config, TestConfig } from '../config/index.js'
import type { Config } from '../config/index.js'
import {
  callbacks,
  client,
  components,
  defineTemplate,
  docs,
  examples,
  headers,
  hooks,
  links,
  mediaTypes,
  mock,
  parameters,
  pathItems,
  requestBodies,
  responses,
  route,
  rpc,
  schemas,
  securitySchemes,
  takibi,
  template,
  // test,
  type,
  webhooks,
} from '../core/index.js'
import { GenerateError } from '../error/index.js'
import type { FormatError } from '../error/index.js'
import { exists, readdir, unlink } from '../file/index.js'
import {
  appEntryFile,
  appEntryImport,
  appEntryOutput,
  handlerGroupOf,
  generatedImport,
  isInsideDirectory,
} from '../helper/index.js'
import type { Grouping } from '../helper/index.js'
import type { OpenAPI } from '../openapi/index.js'

type Job = {
  readonly name: string
  readonly output: string
  readonly split: boolean
  readonly run: (
    output: string,
  ) => Effect.Effect<
    string,
    FormatError | GenerateError | PlatformError.PlatformError,
    FileSystem.FileSystem
  >
}

const decodeTypeScriptPath = Schema.decodeUnknownEffect(
  Schema.String.pipe(
    Schema.refine(Schema.is(Schema.TemplateLiteral([Schema.String, '.ts']))),
  ).annotate({
    title: 'Generator output file',
    description: 'The `.ts` path a TypeScript generator writes to.',
    examples: ['./src/routes.ts', './src/schemas/index.ts'],
  }),
)

function typeScriptPath(output: string) {
  return decodeTypeScriptPath(output).pipe(
    Effect.mapError(() => new GenerateError({ message: `Invalid output format: ${output}` })),
  )
}

function runTakibi(
  openAPI: OpenAPI,
  output: string,
  componentsOptions: Parameters<typeof takibi>[2],
) {
  return Effect.gen(function* () {
    return yield* takibi(openAPI, yield* typeScriptPath(output), componentsOptions)
  })
}

function runType(openAPI: OpenAPI, output: string, readonly?: boolean) {
  return Effect.gen(function* () {
    return yield* type(openAPI, yield* typeScriptPath(output), readonly)
  })
}

function cleanSplitDirectory(directory: string) {
  return Effect.gen(function* () {
    const names = yield* readdir(directory)
    yield* Effect.all(
      names
        .filter((name) => name.endsWith('.ts'))
        .map((name) => unlink(path.join(directory, name))),
      { concurrency: 'unbounded' },
    )
  })
}

export function cleanSplitOutputs(directories: readonly string[]) {
  return Effect.all(
    [...new Set(directories)].map((directory) => cleanSplitDirectory(directory)),
    { concurrency: 'unbounded' },
  )
}

const TYPESPEC_IMPORT = /^\s*import\s+"(?<specifier>\.{1,2}\/[^"]*)"/gmu

/**
 * The `.tsp` files reachable from `file` through relative imports, `file` included.
 *
 * Read off the source text rather than asked of the compiler: a compile is the expensive
 * part of a pass, and the only thing wanted here is which files an edit could come from.
 * An import of a directory is its `main.tsp`, as it is to the compiler. A file that
 * cannot be read is still named — it is where the fix will be written.
 */
function typeSpecSources(
  file: string,
  seen: ReadonlySet<string>,
): Effect.Effect<ReadonlySet<string>, never, FileSystem.FileSystem> {
  return Effect.gen(function* () {
    if (seen.has(file)) return seen
    const fs = yield* FileSystem.FileSystem
    const info = yield* fs.stat(file).pipe(Effect.orElseSucceed(() => null))
    if (info?.type === 'Directory') return yield* typeSpecSources(path.join(file, 'main.tsp'), seen)
    const source = file.endsWith('.tsp')
      ? yield* fs.readFileString(file).pipe(Effect.orElseSucceed(() => ''))
      : ''
    const imports = [...source.matchAll(TYPESPEC_IMPORT)]
      .map((match) => match.groups?.specifier)
      .filter((specifier) => specifier !== undefined)
      .map((specifier) => path.resolve(path.dirname(file), specifier))
    return yield* Effect.reduce(
      imports,
      (): ReadonlySet<string> => new Set([...seen, file]),
      (found, imported) => typeSpecSources(imported, found),
    )
  })
}

/**
 * The files the document at `input` reads from that sit outside its own directory.
 *
 * For a watcher, and only for a watcher. A `$ref` or a TypeSpec `import` can reach a file
 * anywhere on disk, so watching the directory `input` sits in misses some of the edits
 * that change the output; these are the files it misses.
 *
 * Nothing here feeds generation. `parseOpenAPI` still reads the document with `bundle`,
 * which is what folds a split document into one; this asks `resolve`, which stops after
 * reading the files `bundle` would go on to fold. The two read the same files, so the
 * list is the one `bundle` works from, without paying for a document nobody uses — and
 * an edit to one of them reruns the pass, where `bundle` picks the new contents up.
 *
 * Nothing under `node_modules` is named: a library the document imports is not
 * something the user edits. Fails when the document cannot be read, so the caller can
 * keep the list it already has rather than trust a partial one.
 */
export function outsideSources(input: string) {
  return Effect.gen(function* () {
    const files = input.endsWith('.tsp')
      ? [...(yield* typeSpecSources(path.resolve(input), new Set()))]
      : yield* Effect.tryPromise({
          try: async () => {
            const references = await SwaggerParser.resolve(input)
            return references.paths('file')
          },
          catch: (error) =>
            new GenerateError({ message: error instanceof Error ? error.message : String(error) }),
        })
    const inputDirectory = path.dirname(path.resolve(input))
    return [...new Set(files.map((file) => path.resolve(file)))]
      .filter(
        (file) =>
          file !== path.resolve(input) &&
          !isInsideDirectory(inputDirectory, file) &&
          !file.split(path.sep).includes('node_modules'),
      )
      .toSorted()
  })
}

// Test code generation is deprecated: hono-takibi no longer generates test files.
// export function testJob(openAPI: OpenAPI, config: TestConfig, basePath: string) {
//   return {
//     name: 'test',
//     output: config.output,
//     split: false,
//     run: (output: string) => test(openAPI, output, config.import, basePath, config.testFramework),
//   }
// }

const COMPONENT_KINDS = [
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

const HOOK_KINDS = [
  'swr',
  'tanstack-query',
  'preact-query',
  'solid-query',
  'vue-query',
  'svelte-query',
  'angular-query',
] as const

/** The directory of the nearest `package.json` above `file`, or `undefined` when there is none. */
function packageRootOf(file: string) {
  return Effect.gen(function* () {
    const directories: string[] = []
    for (let dir = path.dirname(path.resolve(file)); ; dir = path.dirname(dir)) {
      directories.push(dir)
      if (path.dirname(dir) === dir) break
    }
    // A directory that is not there yet, or a path under a file, holds no package.json.
    const found = yield* Effect.forEach(directories, (dir) =>
      exists(path.join(dir, 'package.json')).pipe(Effect.orElseSucceed(() => false)),
    )
    return directories.find((_, index) => found[index])
  })
}

type Target = { readonly output: string; readonly package?: string; readonly split?: boolean }

/**
 * Which component kinds the generated file of a kind can import. Routes, webhooks,
 * callbacks and path items hold whole operations and can import any kind; the others
 * import only what their objects can refer to. Schemas, examples, links and security
 * schemes import no other kind.
 */
const COMPONENT_IMPORTS: { readonly [K in (typeof COMPONENT_KINDS)[number]]: readonly string[] } = {
  schemas: [],
  examples: [],
  links: [],
  securitySchemes: [],
  parameters: ['schemas', 'examples', 'mediaTypes'],
  headers: ['schemas', 'examples', 'mediaTypes'],
  requestBodies: ['schemas', 'examples', 'mediaTypes'],
  mediaTypes: ['schemas', 'examples'],
  responses: ['schemas', 'examples', 'headers', 'links', 'mediaTypes'],
  callbacks: [...COMPONENT_KINDS],
  pathItems: [...COMPONENT_KINDS],
}

/** Whether a file written by `from` can import the component target named `name`. */
function importsComponent(from: string, name: string) {
  if (name === 'components.output') return true
  const kind = name.replace(/^components\./u, '')
  if (!from.startsWith('components.')) return true
  const own = COMPONENT_KINDS.find((candidate) => `components.${candidate}` === from)
  return own === undefined || COMPONENT_IMPORTS[own].includes(kind)
}

/** The targets of a config that other generated files import, by the name the config gives them. */
function importTargets(config: Config) {
  const kinds = COMPONENT_KINDS.flatMap((kind) => {
    const value = config.components?.[kind]
    return value ? [[`components.${kind}`, value] as const] : []
  })
  const componentTargets: readonly (readonly [string, Target])[] = config.components?.output
    ? [
        [
          'components.output',
          {
            output: config.components.output,
            ...(config.components.package === undefined
              ? {}
              : { package: config.components.package }),
          },
        ],
      ]
    : kinds
  const routes: Target | undefined =
    config.routes ??
    (config.output !== undefined && config.template?.define !== true
      ? { output: config.output }
      : undefined)
  const hookTargets: readonly (readonly [string, Target])[] = HOOK_KINDS.flatMap((kind) => {
    const value = config[kind]
    return value ? [[kind, value] as const] : []
  })
  return {
    routes,
    webhooks: config.webhooks,
    components: componentTargets,
    client: config.client,
    rpc: config.rpc,
    hooks: hookTargets,
  }
}

/**
 * The package each generated file is written into, as `makeJob` wants it: a file imports
 * another one of its package relatively, and one of another package by that one's
 * `package`. A package is what the nearest `package.json` above an output delimits, and
 * a generated file belongs to the package of the output it is written under.
 *
 * Fails when a file would import another package that names no `package`: the import
 * could not be written.
 */
export function packageRoots(config: Config) {
  return Effect.gen(function* () {
    const targets = importTargets(config)
    const appOutput = appEntryOutput(config)
    const defineOn = config.template?.define === true
    const appEntry = appOutput === undefined ? undefined : appEntryFile(appOutput, defineOn)
    // The directories generated files are written into: a split output is a directory of
    // its own, every other output is a file in one.
    const splitDirectory = (target: Target | undefined) =>
      target !== undefined && 'split' in target && target.split
        ? path.resolve(target.output)
        : undefined
    const files = [
      appEntry,
      targets.client?.output,
      targets.rpc?.output,
      ...targets.hooks.map(([, target]) => target.output),
      config.type?.output,
      config.mock?.output,
      config.docs?.output,
    ].filter((output) => output !== undefined)
    const directories = [
      ...new Set([
        ...files.map((file) => path.dirname(path.resolve(file))),
        ...[
          targets.routes,
          targets.webhooks,
          ...targets.components.map(([, target]) => target),
        ].map(
          (target) =>
            splitDirectory(target) ??
            (target === undefined ? undefined : path.dirname(path.resolve(target.output))),
        ),
      ]),
    ].filter((dir) => dir !== undefined)
    const roots = yield* Effect.forEach(directories, (dir) => packageRootOf(path.join(dir, 'x')))
    const known = directories.map((dir, index) => [dir, roots[index]] as const)
    const packageRoot = (file: string) => {
      const resolved = path.resolve(file)
      // An output that is a known directory is asked about as that directory; anything
      // else is a file in one.
      const dir = known.some(([candidate]) => candidate === resolved)
        ? resolved
        : path.dirname(resolved)
      // The longest known directory the file sits under: a split directory inside `src`
      // may be a package of its own.
      const match = known
        .filter(([candidate]) => dir === candidate || isInsideDirectory(candidate, dir))
        .toSorted((a, b) => b[0].length - a[0].length)[0]
      return match?.[1]
    }
    // Who imports whom: every edge that crosses a package needs the target's `package`.
    const scaffold: Target | undefined =
      appEntry !== undefined && config.template !== undefined ? { output: appEntry } : undefined
    // The scaffold imports components only with define, where route and handler are one file.
    const importers: readonly (readonly [string, Target | undefined])[] = [
      ['routes', targets.routes],
      ['webhooks', targets.webhooks],
      ...targets.components,
      ...(defineOn ? [['template', scaffold] as const] : []),
    ]
    const clientTarget = targets.client
    const edges: readonly (readonly [string, Target, string, Target])[] = [
      ...importers.flatMap(([from, importer]) =>
        importer === undefined
          ? []
          : targets.components
              .filter(([name]) => name !== from && importsComponent(from, name))
              .map(([name, target]) => [from, importer, name, target] as const),
      ),
      ...(scaffold !== undefined && targets.routes !== undefined
        ? [['template', scaffold, 'routes', targets.routes] as const]
        : []),
      ...(clientTarget === undefined
        ? []
        : [
            ...(targets.rpc === undefined
              ? []
              : [['rpc', targets.rpc, 'client', clientTarget] as const]),
            ...targets.hooks.map(
              ([name, target]) => [name, target, 'client', clientTarget] as const,
            ),
          ]),
    ]
    const missing = edges.find(
      ([, importer, , target]) =>
        packageRoot(importer.output) !== packageRoot(target.output) && target.package === undefined,
    )
    if (missing !== undefined) {
      const [from, , name, target] = missing
      return yield* new GenerateError({
        message: `${from} imports ${name} from another package: set ${name}.package to the name of the package ${target.output} is written into.`,
      })
    }
    if (
      clientTarget !== undefined &&
      appEntry !== undefined &&
      clientTarget.import === undefined &&
      packageRoot(clientTarget.output) !== packageRoot(appEntry)
    ) {
      return yield* new GenerateError({
        message:
          'client imports the app from another package: set client.import to the name of the package the app is written into.',
      })
    }
    return packageRoot
  })
}

export function makeJob(
  openAPI: OpenAPI,
  config: Config,
  // The package root of a generated file, when it is known. Left out, every file is taken
  // to be in the package of the client.
  packageRoot: (file: string) => string | undefined = () => undefined,
): readonly Job[] {
  const defineOn = config.template?.define === true
  const appOutput = appEntryOutput(config)
  const isSplit = config.template?.split === true
  // What divides a split application: the handler file where the handlers register their
  // routes themselves, which goes by the first tag, and the first segment of the path
  // otherwise. Both are named the way a handler file is.
  const isInline = config.template?.define === false && !config.template.routeHandler
  const grouping: Grouping | undefined = isSplit
    ? isInline
      ? handlerGroupOf
      : (endpoint) => handlerGroupOf(endpoint)
    : undefined
  // A client that is not an `index.ts` is re-exported by the `index.ts` beside it, and
  // imported through it — unless that file is what another generator writes.
  const generatedClient = config.client
  const clientBarrel = (() => {
    const output = generatedClient?.output
    if (output === undefined || path.basename(output) === 'index.ts') return undefined
    const barrel = path.join(path.dirname(output), 'index.ts')
    const written = [
      appOutput === undefined ? undefined : appEntryFile(appOutput, defineOn),
      config.output,
      config.routes?.output,
      config.webhooks?.output,
      config.components?.output,
      ...Object.values(config.components ?? {}).map((target) =>
        typeof target === 'object' ? target.output : undefined,
      ),
      config.type?.output,
      config.rpc?.output,
      config.swr?.output,
      config['tanstack-query']?.output,
      config['preact-query']?.output,
      config['solid-query']?.output,
      config['vue-query']?.output,
      config['svelte-query']?.output,
      config['angular-query']?.output,
      config.mock?.output,
    ]
    return written.some((file) => file !== undefined && path.normalize(file) === barrel)
      ? undefined
      : barrel
  })()
  // How a generated file imports a target: relatively inside its package, under the path
  // alias when the target is in the directory of the app entry, and by the target's
  // `package` from another package (`packageRoots` has seen to it that one is named).
  const specifierOf =
    (target: { readonly output: string; readonly package?: string }) => (from: string) => {
      const sameRoot = packageRoot(from) === packageRoot(target.output)
      return !sameRoot && target.package !== undefined
        ? target.package
        : generatedImport(
            from,
            target.output,
            appOutput,
            sameRoot ? config.pathAlias : undefined,
            defineOn,
          )
    }
  // The path alias is the alias of the package of the app: a file written into another
  // package does not use it.
  const aliasFor = (output: string) =>
    appOutput !== undefined && packageRoot(output) === packageRoot(appOutput)
      ? config.pathAlias
      : undefined
  // The module a generated file imports the client from: the file `client` generates,
  // through the barrel beside it unless the file is beside it too — the barrel is for the
  // others, and may come to re-export the file that would import it.
  const clientImport = (output: string) => {
    if (generatedClient === undefined) return ''
    const isBeside = path.dirname(output) === path.dirname(generatedClient.output)
    return specifierOf({
      output: isBeside ? generatedClient.output : (clientBarrel ?? generatedClient.output),
      ...(generatedClient.package === undefined ? {} : { package: generatedClient.package }),
    })(output)
  }
  // The routes the scaffold imports: named only when they are in another package, since a
  // relative or aliased specifier is worked out where each file is written.
  const routesTarget: Target | undefined =
    config.routes ?? (config.output && !defineOn ? { output: config.output } : undefined)
  const routeImport =
    routesTarget?.package !== undefined &&
    appOutput !== undefined &&
    packageRoot(appEntryFile(appOutput, defineOn)) !== packageRoot(routesTarget.output)
      ? routesTarget.package
      : undefined
  const componentsOutput =
    config.components?.output ??
    (defineOn && appOutput ? `${path.dirname(appOutput)}/components/index.ts` : undefined)
  // OpenAPI 3.x Components Object kinds, in declaration / config-field order.
  const componentKinds = [
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
  const rawComponents = config.components
  const componentsResolve:
    | {
        readonly [k: string]: {
          readonly output: string
          readonly split?: boolean
          readonly specifier: (fromFile: string) => string
        }
      }
    | undefined = componentsOutput
    ? Object.fromEntries(
        componentKinds.map((kind) => [
          kind,
          {
            output: componentsOutput,
            specifier: specifierOf({
              output: componentsOutput,
              ...(config.components?.package === undefined
                ? {}
                : { package: config.components.package }),
            }),
          },
        ]),
      )
    : rawComponents
      ? Object.fromEntries(
          componentKinds.flatMap((kind) => {
            const value = rawComponents[kind]
            return value
              ? ([
                  [
                    kind,
                    { output: value.output, split: value.split, specifier: specifierOf(value) },
                  ],
                ] as const)
              : []
          }),
        )
      : undefined
  return [
    config.output && !defineOn
      ? {
          name: 'zod-openapi',
          output: config.output,
          split: false,
          run: (output: string) =>
            runTakibi(openAPI, output, {
              ...(config.readonly !== undefined ? { readonly: config.readonly } : {}),
              exportSchemas: config.exportSchemas,
              exportSchemasTypes: config.exportSchemasTypes,
              exportResponses: config.exportResponses,
              exportParameters: config.exportParameters,
              exportParametersTypes: config.exportParametersTypes,
              exportExamples: config.exportExamples,
              exportRequestBodies: config.exportRequestBodies,
              exportHeaders: config.exportHeaders,
              exportHeadersTypes: config.exportHeadersTypes,
              exportSecuritySchemes: config.exportSecuritySchemes,
              exportLinks: config.exportLinks,
              exportCallbacks: config.exportCallbacks,
              exportPathItems: config.exportPathItems,
              exportMediaTypes: config.exportMediaTypes,
              exportMediaTypesTypes: config.exportMediaTypesTypes,
            }),
        }
      : undefined,
    config.webhooks
      ? {
          name: 'webhooks',
          output: config.webhooks.output,
          split: config.webhooks.split,
          run: (output: string) =>
            webhooks(
              openAPI,
              { output, split: config.webhooks?.split === true },
              componentsResolve,
              config.readonly,
            ),
        }
      : undefined,
    componentsOutput
      ? {
          name: 'components',
          output: componentsOutput,
          split: false,
          run: (output: string) => components(openAPI, output, config.readonly),
        }
      : undefined,
    config.components?.schemas
      ? {
          name: 'schemas',
          output: config.components.schemas.output,
          split: config.components.schemas.split,
          run: (output: string) =>
            schemas(
              openAPI.components?.schemas,
              output,
              config.components?.schemas?.split === true,
              config.components?.schemas?.exportTypes === true,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.parameters
      ? {
          name: 'parameters',
          output: config.components.parameters.output,
          split: config.components.parameters.split,
          run: (output: string) =>
            parameters(
              openAPI.components?.parameters,
              output,
              config.components?.parameters?.split === true,
              config.components?.parameters?.exportTypes === true,
              componentsResolve,
              config.readonly,
              openAPI.components?.schemas,
            ),
        }
      : undefined,
    config.components?.headers
      ? {
          name: 'headers',
          output: config.components.headers.output,
          split: config.components.headers.split,
          run: (output: string) =>
            headers(
              openAPI.components?.headers,
              output,
              config.components?.headers?.split === true,
              config.components?.headers?.exportTypes === true,
              componentsResolve,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.examples
      ? {
          name: 'examples',
          output: config.components.examples.output,
          split: config.components.examples.split,
          run: (output: string) =>
            examples(
              openAPI.components?.examples,
              output,
              config.components?.examples?.split === true,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.links
      ? {
          name: 'links',
          output: config.components.links.output,
          split: config.components.links.split,
          run: (output: string) =>
            links(
              openAPI.components?.links,
              output,
              config.components?.links?.split === true,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.callbacks
      ? {
          name: 'callbacks',
          output: config.components.callbacks.output,
          split: config.components.callbacks.split,
          run: (output: string) =>
            callbacks(
              openAPI.components?.callbacks,
              output,
              config.components?.callbacks?.split === true,
              componentsResolve,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.pathItems
      ? {
          name: 'pathItems',
          output: config.components.pathItems.output,
          split: config.components.pathItems.split,
          run: (output: string) =>
            pathItems(
              openAPI.components ?? {},
              { output, split: config.components?.pathItems?.split === true },
              componentsResolve,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.mediaTypes
      ? {
          name: 'mediaTypes',
          output: config.components.mediaTypes.output,
          split: config.components.mediaTypes.split,
          run: (output: string) =>
            mediaTypes(
              openAPI.components?.mediaTypes,
              output,
              config.components?.mediaTypes?.split === true,
              config.readonly,
              componentsResolve,
            ),
        }
      : undefined,
    config.components?.securitySchemes
      ? {
          name: 'securitySchemes',
          output: config.components.securitySchemes.output,
          split: config.components.securitySchemes.split,
          run: (output: string) =>
            securitySchemes(
              openAPI.components?.securitySchemes,
              output,
              config.components?.securitySchemes?.split === true,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.requestBodies
      ? {
          name: 'requestBodies',
          output: config.components.requestBodies.output,
          split: config.components.requestBodies.split,
          run: (output: string) =>
            requestBodies(
              openAPI.components?.requestBodies,
              output,
              config.components?.requestBodies?.split === true,
              componentsResolve,
              config.readonly,
              openAPI.components?.schemas,
            ),
        }
      : undefined,
    config.components?.responses
      ? {
          name: 'responses',
          output: config.components.responses.output,
          split: config.components.responses.split,
          run: (output: string) =>
            responses(
              openAPI.components?.responses,
              output,
              config.components?.responses?.split === true,
              componentsResolve,
              config.readonly,
            ),
        }
      : undefined,
    config.routes
      ? {
          name: 'routes',
          output: config.routes.output,
          split: config.routes.split,
          run: (output: string) =>
            route(
              openAPI,
              { output, split: config.routes?.split === true },
              componentsResolve,
              config.readonly,
            ),
        }
      : undefined,
    config.type
      ? {
          name: 'type',
          output: config.type.output,
          split: false,
          run: (output: string) => runType(openAPI, output, config.type?.readonly),
        }
      : undefined,
    generatedClient && config.template && appOutput
      ? {
          name: 'client',
          output: generatedClient.output,
          split: false,
          run: (output: string) =>
            client(
              openAPI,
              output,
              generatedClient.import ??
                appEntryImport(output, appOutput, aliasFor(output), defineOn),
              generatedClient.baseUrl,
              config.basePath,
              grouping,
              clientBarrel === undefined ? undefined : path.join(path.dirname(output), 'index.ts'),
            ),
        }
      : undefined,
    config.rpc
      ? {
          name: 'rpc',
          output: config.rpc.output,
          split: false,
          run: (output: string) =>
            rpc(
              openAPI,
              output,
              clientImport(output),
              'client',
              config.rpc?.parseResponse ?? false,
              config.basePath,
              config.rpc?.docs ?? false,
              grouping,
            ),
        }
      : undefined,
    ...HOOK_KINDS.map((library) => {
      const cfg = config[library]
      return cfg
        ? {
            name: library,
            output: cfg.output,
            split: false,
            run: (output: string) =>
              hooks(openAPI, output, clientImport(output), library, {
                ...(grouping === undefined ? {} : { grouping }),
                basePath: config.basePath,
              }),
          }
        : undefined
    }),
    config.mock
      ? {
          name: 'mock',
          output: config.mock.output,
          split: false,
          run: (output: string) =>
            mock(openAPI, output, config.basePath, {
              ...config.mock,
              ...(config.readonly !== undefined ? { readonly: config.readonly } : {}),
            }),
        }
      : undefined,
    config.docs
      ? {
          name: 'docs',
          output: config.docs.output,
          split: false,
          run: (output: string) =>
            docs(
              openAPI,
              output,
              config.docs?.entry,
              config.basePath,
              config.docs?.curl,
              config.docs?.baseUrl,
            ),
        }
      : undefined,
    config.template && defineOn && appOutput && componentsOutput
      ? {
          name: 'template',
          output: appOutput,
          split: false,
          run: (output: string) =>
            defineTemplate(
              openAPI,
              output,
              componentsOutput,
              // config.template?.test ?? false,
              config.basePath,
              config.pathAlias,
              routeImport,
              // config.template?.testFramework,
              config.readonly,
              isSplit,
              (from: string) =>
                config.components?.package !== undefined &&
                packageRoot(from) !== packageRoot(componentsOutput)
                  ? config.components.package
                  : undefined,
            ),
        }
      : config.template && !defineOn && appOutput
        ? {
            name: 'template',
            output: appOutput,
            split: false,
            run: (output: string) =>
              template(
                openAPI,
                output,
                // config.template?.test ?? false,
                config.basePath,
                config.pathAlias,
                routeImport,
                config.template?.define === false ? config.template.routeHandler : false,
                // config.template?.testFramework,
                isSplit,
              ),
          }
        : undefined,
  ].filter((job) => job !== undefined)
}
