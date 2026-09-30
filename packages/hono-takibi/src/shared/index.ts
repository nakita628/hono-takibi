import path from 'node:path'

import SwaggerParser from '@apidevtools/swagger-parser'
import type { PlatformError } from 'effect'
import { Effect, FileSystem, Schema } from 'effect'

import type { Config, TestConfig } from '../config/index.js'
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
  test,
  type,
  webhooks,
} from '../core/index.js'
import { GenerateError } from '../error/index.js'
import type { FormatError } from '../error/index.js'
import { readdir, unlink } from '../file/index.js'
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

export function testJob(openAPI: OpenAPI, config: TestConfig, basePath: string) {
  return {
    name: 'test',
    output: config.output,
    split: false,
    run: (output: string) => test(openAPI, output, config.import, basePath, config.testFramework),
  }
}

export function makeJob(openAPI: OpenAPI, config: Config): readonly Job[] {
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
  // The module a generated file imports the client from: the one it names, or the file
  // `client` generates, reached from where the generated file is written.
  const clientImport = (output: string, named: string | undefined) => {
    if (named !== undefined || generatedClient === undefined) return named ?? ''
    // A file beside the client imports the client itself: the barrel is for the others,
    // and may come to re-export the file that would import it.
    const isBeside = path.dirname(output) === path.dirname(generatedClient.output)
    return generatedImport(
      output,
      isBeside ? generatedClient.output : (clientBarrel ?? generatedClient.output),
      appOutput,
      config.template?.pathAlias,
      defineOn,
    )
  }
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
  const componentsResolve: { readonly [k: string]: { readonly output: string } } | undefined =
    componentsOutput
      ? Object.fromEntries(componentKinds.map((kind) => [kind, { output: componentsOutput }]))
      : rawComponents
        ? Object.fromEntries(
            componentKinds.flatMap((kind) => {
              const value = rawComponents[kind]
              return value ? ([[kind, value]] as const) : []
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
              appEntryImport(output, appOutput, config.template?.pathAlias, defineOn),
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
              clientImport(output, config.rpc?.import),
              config.rpc?.client ?? 'client',
              config.rpc?.parseResponse ?? false,
              config.basePath,
              config.rpc?.docs ?? false,
              grouping,
            ),
        }
      : undefined,
    ...(
      [
        'swr',
        'tanstack-query',
        'preact-query',
        'solid-query',
        'vue-query',
        'svelte-query',
        'angular-query',
      ] as const
    ).map((library) => {
      const cfg = config[library]
      return cfg
        ? {
            name: library,
            output: cfg.output,
            split: false,
            run: (output: string) =>
              hooks(openAPI, output, clientImport(output, cfg.import), library, {
                clientName: cfg.client ?? 'client',
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
              config.template?.test ?? false,
              config.basePath,
              config.template?.pathAlias,
              config.routes?.import,
              config.template?.testFramework,
              config.readonly,
              isSplit,
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
                config.template?.test ?? false,
                config.basePath,
                config.template?.pathAlias,
                config.routes?.import,
                config.template?.define === false ? config.template.routeHandler : false,
                config.template?.testFramework,
                isSplit,
              ),
          }
        : undefined,
  ].filter((job) => job !== undefined)
}
