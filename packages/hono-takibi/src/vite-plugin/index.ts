import fsp from 'node:fs/promises'
import path from 'node:path'

import { parseConfig } from '../config/index.js'
import {
  callbacks,
  docs,
  examples,
  headers,
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
  angularQuery,
  preactQuery,
  solidQuery,
  svelteQuery,
  swr,
  takibi,
  tanstackQuery,
  template,
  test,
  type,
  vueQuery,
  webhooks,
} from '../core/index.js'
import { setFormatOptions } from '../format/index.js'
import { isRecord } from '../guard/index.js'
import { parseOpenAPI } from '../openapi/index.js'

type Config = Extract<ReturnType<typeof parseConfig>, { ok: true }>['value']

type ViteDevServer = {
  watcher: {
    add: (paths: string | readonly string[]) => void
    on: (event: 'all', callback: (eventType: string, filePath: string) => void) => void
  }
  ws: { send: (payload: { type: string; [key: string]: unknown }) => void }
  pluginContainer: { resolveId: (moduleId: string) => Promise<{ id: string } | null> }
  moduleGraph: {
    invalidateModule: (module: { id?: string } | null) => void
    invalidateAll: () => void
    getModuleById: (moduleId: string) => { id?: string } | null
  }
  ssrLoadModule: (moduleId: string) => Promise<unknown>
}

function toAbsolutePath(relativePath: string) {
  return path.resolve(process.cwd(), relativePath)
}

function isTypeScriptFile(filePath: string): filePath is `${string}.ts` {
  return filePath.endsWith('.ts')
}

async function readConfigurationWithHotReload(server: ViteDevServer) {
  const absoluteConfigPath = path.resolve(process.cwd(), 'hono-takibi.config.ts')
  try {
    const resolved = await server.pluginContainer.resolveId(absoluteConfigPath)
    const moduleId = resolved?.id
    if (moduleId) {
      const moduleNode = server.moduleGraph.getModuleById(moduleId)
      if (moduleNode) server.moduleGraph.invalidateModule(moduleNode)
    } else {
      server.moduleGraph.invalidateAll()
    }
    const loadedModule = await server.ssrLoadModule(`${absoluteConfigPath}?t=${String(Date.now())}`)
    const defaultExport = isRecord(loadedModule) ? Reflect.get(loadedModule, 'default') : undefined
    if (!(typeof defaultExport === 'object' && defaultExport !== null)) {
      return { ok: false, error: 'Config must export default object' } as const
    }
    const parsed = parseConfig(defaultExport)
    return parsed.ok
      ? ({ ok: true, value: parsed.value } as const)
      : ({ ok: false, error: parsed.error } as const)
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) } as const
  }
}

/**
 * Creates a debounced version of a function.
 *
 * Delays invocation until after the specified milliseconds have elapsed
 * since the last call. Uses WeakMap for cleanup.
 *
 * @param delayMilliseconds - Delay in milliseconds
 * @param callback - Function to debounce
 * @returns Debounced function
 */
function debounce(delayMilliseconds: number, callback: () => void): () => void {
  const timerStorage = new WeakMap<() => void, ReturnType<typeof setTimeout>>()
  const wrappedFunction = (): void => {
    const previousTimer = timerStorage.get(wrappedFunction)
    if (previousTimer !== undefined) clearTimeout(previousTimer)
    timerStorage.set(wrappedFunction, setTimeout(callback, delayMilliseconds))
  }
  return wrappedFunction
}

/**
 * Runs all code generation tasks in parallel based on the provided configuration.
 *
 * @param config - Parsed configuration object
 * @returns Promise resolving to object containing log messages
 */
async function runAllGenerationTasks(config: Config) {
  if (config.format) setFormatOptions(config.format)
  const openAPIResult = await parseOpenAPI(config.input)
  if (!openAPIResult.ok) return { logs: [`❌ parseOpenAPI: ${openAPIResult.error}`] }
  const openAPI = openAPIResult.value
  const runSplitAwareJob = async (
    name: string,
    output: string,
    isSplit: boolean,
    generate: (
      absOutput: string,
    ) => Promise<
      { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
    >,
  ) => {
    const absOutput = toAbsolutePath(output)
    if (isSplit) {
      const listTypeScriptFilesShallow = async (directoryPath: string): Promise<string[]> =>
        fsp
          .stat(directoryPath)
          .then((fileStats) =>
            fileStats.isDirectory()
              ? fsp
                  .readdir(directoryPath, { withFileTypes: true })
                  .then((directoryEntries) =>
                    directoryEntries
                      .filter((entry) => entry.isFile() && entry.name.endsWith('.ts'))
                      .map((entry) => path.join(directoryPath, entry.name)),
                  )
              : [],
          )
          .catch(() => [])
      const deleteTypeScriptFiles = async (filePaths: readonly string[]) =>
        Promise.all(
          filePaths.map((filePath) =>
            fsp
              .unlink(filePath)
              .then(() => filePath)
              .catch(() => null),
          ),
        ).then((results) => results.filter((result) => result !== null))
      const beforeFiles = await listTypeScriptFilesShallow(absOutput)
      await deleteTypeScriptFiles(beforeFiles)
    }
    const result = await generate(absOutput)
    if (!result.ok) return `❌ ${name}: ${result.error}`
    return `✅ ${name}${isSplit ? '(split)' : ''} -> ${absOutput}`
  }

  function makeZodOpenAPIJob() {
    if (!config['zod-openapi']?.output) return undefined
    const outputPath = toAbsolutePath(config['zod-openapi']?.output)
    return (async () => {
      if (!isTypeScriptFile(outputPath))
        return `❌ zod-openapi: Invalid output format: ${outputPath}`
      const result = await takibi(openAPI, outputPath, {
        ...(config['zod-openapi']?.readonly !== undefined
          ? { readonly: config['zod-openapi'].readonly }
          : {}),
        exportSchemasTypes: config['zod-openapi']?.exportSchemasTypes ?? false,
        exportSchemas: config['zod-openapi']?.exportSchemas ?? false,
        exportParametersTypes: config['zod-openapi']?.exportParametersTypes ?? false,
        exportParameters: config['zod-openapi']?.exportParameters ?? false,
        exportSecuritySchemes: config['zod-openapi']?.exportSecuritySchemes ?? false,
        exportRequestBodies: config['zod-openapi']?.exportRequestBodies ?? false,
        exportResponses: config['zod-openapi']?.exportResponses ?? false,
        exportHeadersTypes: config['zod-openapi']?.exportHeadersTypes ?? false,
        exportHeaders: config['zod-openapi']?.exportHeaders ?? false,
        exportExamples: config['zod-openapi']?.exportExamples ?? false,
        exportLinks: config['zod-openapi']?.exportLinks ?? false,
        exportCallbacks: config['zod-openapi']?.exportCallbacks ?? false,
        exportPathItems: config['zod-openapi']?.exportPathItems ?? false,
        exportMediaTypes: config['zod-openapi']?.exportMediaTypes ?? false,
        exportMediaTypesTypes: config['zod-openapi']?.exportMediaTypesTypes ?? false,
      })
      return result.ok ? `✅ zod-openapi -> ${outputPath}` : `❌ zod-openapi: ${result.error}`
    })()
  }

  function makeSchemaJob() {
    if (!config['zod-openapi']?.components?.schemas) return undefined
    return runSplitAwareJob(
      'schemas',
      config['zod-openapi']?.components?.schemas?.output,
      config['zod-openapi']?.components?.schemas?.split === true,
      (out) =>
        schemas(
          openAPI.components?.schemas,
          out,
          config['zod-openapi']?.components?.schemas?.split === true,
          config['zod-openapi']?.components?.schemas?.exportTypes === true,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  function makeParametersJob() {
    if (!config['zod-openapi']?.components?.parameters) return undefined
    return runSplitAwareJob(
      'parameters',
      config['zod-openapi']?.components?.parameters?.output,
      config['zod-openapi']?.components?.parameters?.split === true,
      (out) =>
        parameters(
          openAPI.components?.parameters,
          out,
          config['zod-openapi']?.components?.parameters?.split === true,
          config['zod-openapi']?.components?.parameters?.exportTypes === true,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  function makeHeadersJob() {
    if (!config['zod-openapi']?.components?.headers) return undefined
    return runSplitAwareJob(
      'headers',
      config['zod-openapi']?.components?.headers?.output,
      config['zod-openapi']?.components?.headers?.split === true,
      (out) =>
        headers(
          openAPI.components?.headers,
          out,
          config['zod-openapi']?.components?.headers?.split === true,
          config['zod-openapi']?.components?.headers?.exportTypes === true,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  function makeExamplesJob() {
    if (!config['zod-openapi']?.components?.examples) return undefined
    return runSplitAwareJob(
      'examples',
      config['zod-openapi']?.components?.examples?.output,
      config['zod-openapi']?.components?.examples?.split === true,
      (out) =>
        examples(
          openAPI.components?.examples,
          out,
          config['zod-openapi']?.components?.examples?.split === true,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  function makeLinksJob() {
    if (!config['zod-openapi']?.components?.links) return undefined
    return runSplitAwareJob(
      'links',
      config['zod-openapi']?.components?.links?.output,
      config['zod-openapi']?.components?.links?.split === true,
      (out) =>
        links(
          openAPI.components?.links,
          out,
          config['zod-openapi']?.components?.links?.split === true,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  function makeCallbacksJob() {
    if (!config['zod-openapi']?.components?.callbacks) return undefined
    return runSplitAwareJob(
      'callbacks',
      config['zod-openapi']?.components?.callbacks?.output,
      config['zod-openapi']?.components?.callbacks?.split === true,
      (out) =>
        callbacks(
          openAPI.components?.callbacks,
          out,
          config['zod-openapi']?.components?.callbacks?.split === true,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  function makeSecuritySchemesJob() {
    if (!config['zod-openapi']?.components?.securitySchemes) return undefined
    return runSplitAwareJob(
      'securitySchemes',
      config['zod-openapi']?.components?.securitySchemes?.output,
      config['zod-openapi']?.components?.securitySchemes?.split === true,
      (out) =>
        securitySchemes(
          openAPI.components?.securitySchemes,
          out,
          config['zod-openapi']?.components?.securitySchemes?.split === true,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  function makeRequestBodiesJob() {
    if (!config['zod-openapi']?.components?.requestBodies) return undefined
    return runSplitAwareJob(
      'requestBodies',
      config['zod-openapi']?.components?.requestBodies?.output,
      config['zod-openapi']?.components?.requestBodies?.split === true,
      (out) =>
        requestBodies(
          openAPI.components?.requestBodies,
          out,
          config['zod-openapi']?.components?.requestBodies?.split === true,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  function makeResponsesJob() {
    if (!config['zod-openapi']?.components?.responses) return undefined
    return runSplitAwareJob(
      'responses',
      config['zod-openapi']?.components?.responses?.output,
      config['zod-openapi']?.components?.responses?.split === true,
      (out) =>
        responses(
          openAPI.components?.responses,
          out,
          config['zod-openapi']?.components?.responses?.split === true,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  function makePathItemsJob() {
    if (!config['zod-openapi']?.components?.pathItems) return undefined
    return runSplitAwareJob(
      'pathItems',
      config['zod-openapi']?.components?.pathItems?.output,
      config['zod-openapi']?.components?.pathItems?.split === true,
      (out) =>
        pathItems(
          openAPI.components ?? {},
          { output: out, split: config['zod-openapi']?.components?.pathItems?.split ?? false },
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  function makeMediaTypesJob() {
    if (!config['zod-openapi']?.components?.mediaTypes) return undefined
    return runSplitAwareJob(
      'mediaTypes',
      config['zod-openapi']?.components?.mediaTypes?.output,
      config['zod-openapi']?.components?.mediaTypes?.split === true,
      (out) =>
        mediaTypes(
          openAPI.components?.mediaTypes,
          out,
          config['zod-openapi']?.components?.mediaTypes?.split === true,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  function makeWebhooksJob() {
    if (!config['zod-openapi']?.components?.webhooks) return undefined
    return runSplitAwareJob(
      'webhooks',
      config['zod-openapi']?.components?.webhooks?.output,
      config['zod-openapi']?.components?.webhooks?.split === true,
      (out) =>
        webhooks(
          openAPI,
          { output: out, split: config['zod-openapi']?.components?.webhooks?.split ?? false },
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  function makeRoutesJob() {
    if (!config['zod-openapi']?.routes) return undefined
    return runSplitAwareJob(
      'routes',
      config['zod-openapi']?.routes?.output,
      config['zod-openapi']?.routes?.split === true,
      (out) =>
        route(
          openAPI,
          { output: out, split: config['zod-openapi']?.routes?.split ?? false },
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  function makeTypeJob() {
    if (!config.type) return undefined
    return (async () => {
      const outputPath = toAbsolutePath(config.type?.output ?? '')
      if (!isTypeScriptFile(outputPath)) return `❌ type: Invalid output format: ${outputPath}`
      const result = await type(openAPI, outputPath, config.type?.readonly)
      return result.ok ? `✅ type -> ${outputPath}` : `❌ type: ${result.error}`
    })()
  }

  function makeRpcJob() {
    if (!config.rpc) return undefined
    return runSplitAwareJob('rpc', config.rpc?.output ?? '', config.rpc?.split === true, (out) =>
      rpc(
        openAPI,
        out,
        config.rpc?.import ?? '',
        config.rpc?.split === true,
        config.rpc?.client ?? 'client',
        config.rpc?.parseResponse ?? false,
        config.basePath,
      ),
    )
  }

  const makeQueryJob = (
    name: string,
    cfg:
      | typeof config.swr
      | (typeof config)['tanstack-query']
      | (typeof config)['svelte-query']
      | (typeof config)['vue-query']
      | (typeof config)['preact-query']
      | (typeof config)['solid-query']
      | (typeof config)['angular-query'],
    fn:
      | typeof swr
      | typeof tanstackQuery
      | typeof svelteQuery
      | typeof vueQuery
      | typeof preactQuery
      | typeof solidQuery
      | typeof angularQuery,
  ) => {
    if (!cfg) return undefined
    return runSplitAwareJob(name, cfg.output, cfg.split === true, (out) =>
      fn(openAPI, out, cfg.import, cfg.split === true, cfg.client ?? 'client'),
    )
  }

  function makeTestJob() {
    if (!config.test) return undefined
    return (async () => {
      const outputPath = toAbsolutePath(config.test?.output ?? '')
      const result = await test(
        openAPI,
        outputPath,
        config.test?.import ?? '',
        config.basePath ?? '/',
        config.test?.testFramework,
      )
      return result.ok ? `✅ test -> ${outputPath}` : `❌ test: ${result.error}`
    })()
  }

  function makeMockJob() {
    if (!config.mock) return undefined
    return (async () => {
      const outputPath = toAbsolutePath(config.mock?.output ?? '')
      const result = await mock(
        openAPI,
        outputPath,
        config.basePath ?? '/',
        config['zod-openapi']?.readonly,
      )
      return result.ok ? `✅ mock -> ${outputPath}` : `❌ mock: ${result.error}`
    })()
  }

  function makeDocsJob() {
    if (!config.docs) return undefined
    return (async () => {
      const outputPath = toAbsolutePath(config.docs?.output ?? '')
      const result = await docs(
        openAPI,
        outputPath,
        config.docs?.entry ?? 'src/index.ts',
        config.basePath ?? '/',
        config.docs?.curl,
        config.docs?.baseUrl,
      )
      return result.ok ? `✅ docs -> ${outputPath}` : `❌ docs: ${result.error}`
    })()
  }

  function makeTemplateJob() {
    const tmpl = config['zod-openapi']?.template
    if (!tmpl) return undefined
    const routeOutputPath = config['zod-openapi']?.output ?? config['zod-openapi']?.routes?.output
    if (!routeOutputPath) return undefined
    return (async () => {
      const absPath = toAbsolutePath(routeOutputPath)
      if (!isTypeScriptFile(absPath)) return `❌ template: Invalid output format: ${absPath}`
      const result = await template(
        openAPI,
        absPath,
        tmpl.test,
        config.basePath ?? '/',
        tmpl.pathAlias,
        config['zod-openapi']?.routes?.import,
        tmpl.routeHandler,
        tmpl.testFramework,
      )
      return result.ok ? `✅ template -> ${absPath}` : `❌ template: ${result.error}`
    })()
  }

  const jobs = [
    makeZodOpenAPIJob(),
    makeSchemaJob(),
    makeParametersJob(),
    makeHeadersJob(),
    makeExamplesJob(),
    makeLinksJob(),
    makeCallbacksJob(),
    makeSecuritySchemesJob(),
    makeRequestBodiesJob(),
    makeResponsesJob(),
    makePathItemsJob(),
    makeMediaTypesJob(),
    makeWebhooksJob(),
    makeRoutesJob(),
    makeTypeJob(),
    makeRpcJob(),
    makeQueryJob('swr', config.swr, swr),
    makeQueryJob('tanstack-query', config['tanstack-query'], tanstackQuery),
    makeQueryJob('svelte-query', config['svelte-query'], svelteQuery),
    makeQueryJob('vue-query', config['vue-query'], vueQuery),
    makeQueryJob('preact-query', config['preact-query'], preactQuery),
    makeQueryJob('solid-query', config['solid-query'], solidQuery),
    makeQueryJob('angular-query', config['angular-query'], angularQuery),
    makeTestJob(),
    makeMockJob(),
    makeDocsJob(),
    makeTemplateJob(),
  ].filter((job) => job !== undefined)
  return Promise.all(jobs).then((logs) => ({ logs }))
}

/**
 * Adds glob patterns to the Vite file watcher.
 *
 * Watches the input file and related files (.yaml, .json, .tsp) in the
 * same directory for changes.
 *
 * @param server - Vite dev server instance
 * @param absoluteInputPath - Absolute path to the input OpenAPI file
 * @returns The input directory path for use in change detection
 */
function addInputGlobsToWatcher(server: ViteDevServer, absoluteInputPath: string): string {
  const inputDirectory = path.dirname(absoluteInputPath)
  const watchPatterns: string[] = [
    absoluteInputPath,
    path.join(inputDirectory, '**/*.yaml'),
    path.join(inputDirectory, '**/*.json'),
    path.join(inputDirectory, '**/*.tsp'),
  ]
  server.watcher.add(watchPatterns)
  return inputDirectory
}

function extractOutputPaths(config: Config): readonly string[] {
  return [
    config['zod-openapi']?.output,
    config['zod-openapi']?.components?.schemas?.output,
    config['zod-openapi']?.components?.parameters?.output,
    config['zod-openapi']?.components?.headers?.output,
    config['zod-openapi']?.components?.examples?.output,
    config['zod-openapi']?.components?.links?.output,
    config['zod-openapi']?.components?.callbacks?.output,
    config['zod-openapi']?.components?.securitySchemes?.output,
    config['zod-openapi']?.components?.requestBodies?.output,
    config['zod-openapi']?.components?.responses?.output,
    config['zod-openapi']?.components?.pathItems?.output,
    config['zod-openapi']?.components?.mediaTypes?.output,
    config['zod-openapi']?.components?.webhooks?.output,
    config['zod-openapi']?.routes?.output,
    config.type?.output,
    config.rpc?.output,
    config.swr?.output,
    config['tanstack-query']?.output,
    config['svelte-query']?.output,
    config['vue-query']?.output,
    config['preact-query']?.output,
    config['solid-query']?.output,
    config['angular-query']?.output,
    config.test?.output,
    config.mock?.output,
    config.docs?.output,
  ]
    .filter((outputPath) => outputPath !== undefined)
    .map(toAbsolutePath)
}

export function honoTakibiVite(): any {
  const pluginState: {
    current: Config | null
    previous: Config | null
    inputDirectory: string | null
  } = {
    current: null,
    previous: null,
    inputDirectory: null,
  }
  const absoluteConfigFilePath = path.resolve(process.cwd(), 'hono-takibi.config.ts')
  const runGeneration = async () => {
    if (!pluginState.current) return
    console.log('🔥 hono-takibi')
    const { logs } = await runAllGenerationTasks(pluginState.current)
    for (const logMessage of logs) console.log(logMessage)
  }
  const runGenerationAndReload = async (server?: ViteDevServer) => {
    await runGeneration()
    if (server) server.ws.send({ type: 'full-reload' })
  }
  const handleConfigurationChange = async (server: ViteDevServer) => {
    const nextConfiguration = await readConfigurationWithHotReload(server)
    if (!nextConfiguration.ok) {
      console.error(`❌ config: ${nextConfiguration.error}`)
      return
    }
    if (pluginState.current) {
      const cleanupStaleOutputs = async (
        previousConfiguration: Config,
        currentConfiguration: Config,
      ) => {
        const previousPaths = new Set(extractOutputPaths(previousConfiguration))
        const currentPaths = new Set(extractOutputPaths(currentConfiguration))
        const stalePaths = [...previousPaths].filter((stalePath) => !currentPaths.has(stalePath))
        const cleanupResults = await Promise.all(
          stalePaths.map(async (stalePath): Promise<string | null> => {
            const fileStats = await fsp.stat(stalePath).catch(() => null)
            if (!fileStats) return null
            if (fileStats.isDirectory()) {
              await fsp.rm(stalePath, { recursive: true, force: true }).catch(() => {})
              return stalePath
            }
            if (fileStats.isFile() && (stalePath.endsWith('.ts') || stalePath.endsWith('.md'))) {
              await fsp.unlink(stalePath).catch(() => {})
              return stalePath
            }
            return null
          }),
        )
        return cleanupResults.filter((result) => result !== null)
      }
      const cleanedPaths = await cleanupStaleOutputs(pluginState.current, nextConfiguration.value)
      for (const cleanedPath of cleanedPaths) console.log(`✅ cleanup: ${cleanedPath}`)
    }
    pluginState.previous = pluginState.current
    pluginState.current = nextConfiguration.value
    pluginState.inputDirectory = addInputGlobsToWatcher(
      server,
      toAbsolutePath(pluginState.current.input),
    )
    await runGenerationAndReload(server)
  }
  const vitePlugin = {
    name: 'hono-takibi-vite',
    handleHotUpdate(context: { file: string; server: ViteDevServer }) {
      const absoluteFilePath = path.resolve(context.file)
      if (absoluteFilePath === path.resolve(process.cwd(), 'hono-takibi.config.ts')) {
        console.log('config changed (hot-update)')
        handleConfigurationChange(context.server).catch((error) =>
          console.error('❌ hot-update error:', error),
        )
        return []
      }
      return
    },
    async buildStart() {
      // Dev-only: handled by configureServer
    },
    configureServer(server: ViteDevServer) {
      ;(async () => {
        const initialConfiguration = await readConfigurationWithHotReload(server)
        if (!initialConfiguration.ok) {
          console.error(`❌ config: ${initialConfiguration.error}`)
          return
        }
        pluginState.current = initialConfiguration.value
        pluginState.inputDirectory = addInputGlobsToWatcher(
          server,
          toAbsolutePath(pluginState.current.input),
        )
        server.watcher.add(absoluteConfigFilePath)
        // 200ms debounce: editors emit multiple fs events on save, and batch file changes
        // (e.g. git checkout) would otherwise trigger redundant regeneration cycles.
        const debouncedRunGeneration = debounce(200, () => void runGenerationAndReload(server))

        server.watcher.on('all', async (_eventType, filePath) => {
          const absoluteChangedPath = path.resolve(filePath)
          if (absoluteChangedPath === absoluteConfigFilePath) {
            console.log('config changed (watch)')
            await handleConfigurationChange(server)
            return
          }
          if (
            pluginState.inputDirectory &&
            absoluteChangedPath.startsWith(pluginState.inputDirectory) &&
            (absoluteChangedPath.endsWith('.yaml') ||
              absoluteChangedPath.endsWith('.json') ||
              absoluteChangedPath.endsWith('.tsp'))
          ) {
            debouncedRunGeneration()
          }
        })
        await runGenerationAndReload(server)
      })().catch((e) => console.error('❌ watch error:', e))
    },
  }
  return vitePlugin
}
