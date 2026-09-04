import path from 'node:path'

import type { FileSystem, PlatformError } from 'effect'
import { Effect, Schema } from 'effect'

import type { Config } from '../config/index.js'
import {
  callbacks,
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
import { readdir, unlink } from '../file/index.js'
import type { FormatError } from '../format/index.js'
import type { OpenAPI } from '../openapi/index.js'

/**
 * One generator the config opted in, ready to run.
 *
 * Naming the shape here is what keeps the requirement channel from widening to `any`
 * at the call site: the array below is a union of differently-typed entries, and
 * `Effect.all` over that union would lose the `FileSystem` the caller has to provide.
 */
export type Job = {
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

// Built once and reused, the way `config` builds its own decoder: the schema is the
// same for every job, and there is one call per job.
const decodeTypeScriptPath = Schema.decodeUnknownEffect(
  Schema.String.pipe(Schema.refine(Schema.is(Schema.TemplateLiteral([Schema.String, '.ts'])))),
)

/**
 * Narrows a job's output path to the `${string}.ts` the TypeScript generators ask for.
 *
 * `config` normalises a directory into `<dir>/index.ts` and the split generators build
 * their own paths, so what reaches a job is a plain string; this is where it is checked.
 */
function typeScriptPath(output: string) {
  return decodeTypeScriptPath(output).pipe(
    Effect.mapError(() => new GenerateError({ message: `Invalid output format: ${output}` })),
  )
}

/** `takibi` against a job's output path, once that path is known to be TypeScript. */
function runTakibi(
  openAPI: OpenAPI,
  output: string,
  componentsOptions: Parameters<typeof takibi>[2],
) {
  return Effect.gen(function* () {
    return yield* takibi(openAPI, yield* typeScriptPath(output), componentsOptions)
  })
}

/** `type` against a job's output path, once that path is known to be TypeScript. */
function runType(openAPI: OpenAPI, output: string, readonly?: boolean) {
  return Effect.gen(function* () {
    return yield* type(openAPI, yield* typeScriptPath(output), readonly)
  })
}

/**
 * Empties the generated `.ts` files out of one split output directory.
 *
 * A directory the first run has not created yet reads as empty, which is what `readdir`
 * already answers.
 */
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

/**
 * Empties every split output directory before the generators refill them.
 *
 * A split generator writes one file per entry plus a barrel beside them, and knows only
 * what it writes — so an entry that leaves the document leaves its file behind, orphaned
 * and still importing names the document no longer defines. Removing the section
 * altogether is worse: the generator writes nothing at all and the whole previous
 * directory, barrel included, survives as the answer to a document that no longer says it.
 *
 * A split directory is therefore the generator's, not a place to keep anything by hand.
 * `remove` is only pointed at its direct `.ts` children, never at a subdirectory.
 *
 * This runs before any job writes, never per job as it goes: two jobs can be aimed at one
 * directory, and a clean that lands after a sibling has filled it would take the fresh
 * files with it.
 */
export function cleanSplitOutputs(directories: readonly string[]) {
  return Effect.all(
    [...new Set(directories)].map((directory) => cleanSplitDirectory(directory)),
    { concurrency: 'unbounded' },
  )
}

/**
 * Where the `template` scaffold writes its app entry.
 *
 * In define mode the entry anchors `routes/` and `components/`. When `output` is omitted
 * the anchor is inferred from `components.output` (`<anchor>/<module>`, module being a
 * flat `.ts` file or a `<dir>/index.ts` pair → `<anchor>/index.ts`), else `src/index.ts`.
 *
 * Exported because the derivation is the only output path a caller cannot read straight
 * off the config, and a caller that lists output paths has to agree with `makeJob` about
 * this one or it will report a file the generators do in fact write.
 */
export function appEntryOutput(config: Config) {
  if (config.output !== undefined) return config.output
  if (config.template?.define !== true) return config.routes?.output
  if (config.components?.output === undefined) return 'src/index.ts'
  const container = config.components.output.endsWith('/index.ts')
    ? config.components.output.slice(0, -'/index.ts'.length)
    : config.components.output
  const anchor = container.includes('/') ? container.slice(0, container.lastIndexOf('/')) : ''
  return anchor === '' || anchor === '.' ? 'index.ts' : `${anchor}/index.ts`
}

export function makeJob(openAPI: OpenAPI, config: Config): readonly Job[] {
  const defineOn = config.template?.define === true
  const appOutput = appEntryOutput(config)
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
  // Import-path resolution map keyed by component kind. When `components.output` is set,
  // every kind resolves to that single file; otherwise each kind keeps its per-type config.
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
    config.rpc
      ? {
          name: 'rpc',
          output: config.rpc.output,
          split: config.rpc.split,
          run: (output: string) =>
            rpc(
              openAPI,
              output,
              config.rpc?.import ?? '',
              config.rpc?.split === true,
              config.rpc?.client ?? 'client',
              config.rpc?.parseResponse ?? false,
              config.basePath,
              config.rpc?.docs ?? false,
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
            split: cfg.split,
            run: (output: string) =>
              hooks(openAPI, output, cfg.import, library, {
                split: cfg.split,
                clientName: cfg.client ?? 'client',
              }),
          }
        : undefined
    }),
    config.test
      ? {
          name: 'test',
          output: config.test.output,
          split: false,
          run: (output: string) =>
            test(
              openAPI,
              output,
              config.test?.import ?? '',
              config.basePath,
              config.test?.testFramework,
            ),
        }
      : undefined,
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
              ),
          }
        : undefined,
  ].filter((job) => job !== undefined)
}
